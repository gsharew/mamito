#!/usr/bin/env bash
# update-mamito.sh - pull new Postiz features into Mamito, rebuild and redeploy.
#
# Usage:
#   ./update-mamito.sh                 # merge latest upstream Postiz main, build, deploy
#   ./update-mamito.sh v2.26.0         # merge a specific Postiz release tag instead
#   ./update-mamito.sh --deploy-only   # no merge: just build + deploy the current branch
#   ./update-mamito.sh --no-deploy     # merge + rebrand + push, but don't build/deploy
#
# Steps: backup DB -> sync main with Postiz -> merge into mamito-branding ->
# re-apply "Postiz" -> "Mamito" rename -> push to GitHub -> build image ->
# switch the running container -> health check (auto rollback on failure) ->
# remove old images (keeps the previous one for manual rollback).
#
# Run it as your normal user (not with sudo); it calls sudo for docker itself.

set -euo pipefail

REPO="${REPO:-$HOME/mamito}"
DEPLOY_DIR="${DEPLOY_DIR:-/opt/postiz}"
BACKUP_DIR="${BACKUP_DIR:-/opt/postiz-backups}"
BRANCH="mamito-branding"
UPSTREAM_URL="https://github.com/gitroomhq/postiz-app.git"
MIN_FREE_GB=9          # a build needs ~8 GB of free disk
LOCAL_PORT=8081        # Caddy listens here (see docker-compose.yml)

REF="upstream/main"; DO_SYNC=1; DO_DEPLOY=1
for arg in "$@"; do
  case "$arg" in
    --deploy-only) DO_SYNC=0 ;;
    --no-deploy)   DO_DEPLOY=0 ;;
    -h|--help)     sed -n '2,16p' "$0"; exit 0 ;;
    -*)            echo "Unknown option: $arg" >&2; exit 1 ;;
    *)             REF="$arg" ;;
  esac
done

say()  { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m[!] %s\033[0m\n' "$*"; }
die()  { printf '\033[1;31m[x] %s\033[0m\n' "$*" >&2; exit 1; }

[ "$(id -u)" -ne 0 ] || die "Run as your normal user, not root (git needs your GitHub SSH key)."
sudo -v || die "sudo is required for docker."
cd "$REPO"

DOMAIN="$(sudo grep -E '^DOMAIN=' "$DEPLOY_DIR/.env" | cut -d= -f2- | tr -d '"'\''\r')"
[ -n "$DOMAIN" ] || die "Could not read DOMAIN from $DEPLOY_DIR/.env"

# ---------------------------------------------------------------- 1. git sync
if [ "$DO_SYNC" -eq 1 ]; then
  [ -z "$(git status --porcelain)" ] || die "Uncommitted changes in $REPO. Commit or stash them first."
  git remote get-url upstream >/dev/null 2>&1 || git remote add upstream "$UPSTREAM_URL"

  say "Fetching Postiz (upstream) and your fork (origin)"
  git fetch --quiet upstream --tags
  git fetch --quiet origin
  git rev-parse --verify --quiet "$REF^{commit}" >/dev/null || die "Unknown ref '$REF' (try a tag like v2.26.0)."

  if [ "$REF" = "upstream/main" ]; then
    say "Updating main to match Postiz"
    git checkout --quiet main
    git merge --ff-only --quiet upstream/main || die "main has commits Postiz doesn't. Keep main clean; put changes on $BRANCH."
    git push --quiet origin main
  fi

  git checkout --quiet "$BRANCH"
  NEW=$(git rev-list --count "$BRANCH..$REF")
  if [ "$NEW" -eq 0 ]; then
    say "Already up to date with $REF (nothing new from Postiz)"
  else
    say "Merging $NEW new Postiz commit(s) from $REF into $BRANCH"
    if ! git merge --no-edit -m "Merge Postiz $REF into $BRANCH" "$REF"; then
      echo
      warn "Merge conflict. These files were changed by both Postiz and Mamito:"
      git diff --name-only --diff-filter=U | sed 's/^/      /'
      cat <<EOF

  Fix it like this:
    1. Open each file above, keep the Mamito version of the conflicting lines
       (look for <<<<<<< ======= >>>>>>> markers).
    2. git add <files> && git commit --no-edit
    3. Re-run:  ./update-mamito.sh --deploy-only
  Or cancel the merge with:  git merge --abort
EOF
      exit 1
    fi
  fi

  say "Re-applying Postiz -> Mamito rename to any new text"
  FILES=$(grep -rIl --exclude-dir=node_modules "Postiz" apps libraries \
            --include='*.ts' --include='*.tsx' --include='*.json' || true)
  if [ -n "$FILES" ]; then
    echo "$FILES" | xargs sed -i 's/Postiz/Mamito/g'
    for f in libraries/react-shared-libraries/src/translation/locales/*/translation.json; do
      python3 -c "import json,sys; json.load(open(sys.argv[1]))" "$f" || die "Rename broke JSON in $f"
    done
    git commit --quiet -am "Rebrand new Postiz strings to Mamito"
    echo "   renamed in $(echo "$FILES" | wc -l) file(s)"
  else
    echo "   nothing to rename"
  fi

  say "Pushing $BRANCH to GitHub"
  git push --quiet origin "$BRANCH"
else
  git checkout --quiet "$BRANCH"
fi

[ "$DO_DEPLOY" -eq 1 ] || { say "Done (--no-deploy: skipped build and deploy)"; exit 0; }

# ---------------------------------------------------------------- 2. build
SHA=$(git rev-parse --short=8 HEAD)
IMAGE="mamito:$SHA"
OLD_IMAGE=$(sudo grep -oE 'image: mamito:[^[:space:]]+' "$DEPLOY_DIR/docker-compose.yml" | head -1 | cut -d' ' -f2 || true)

if [ "$OLD_IMAGE" = "$IMAGE" ] && sudo docker image inspect "$IMAGE" >/dev/null 2>&1; then
  say "$IMAGE is already running, nothing to deploy"; exit 0
fi

say "Freeing disk space before the build"
sudo docker builder prune -af >/dev/null
# delete mamito images that are neither running nor the current rollback target
for img in $(sudo docker images --format '{{.Repository}}:{{.Tag}}' mamito); do
  case "$img" in "$OLD_IMAGE"|mamito:latest) ;; *) sudo docker rmi "$img" >/dev/null 2>&1 || true ;; esac
done
FREE_GB=$(df -BG --output=avail / | tail -1 | tr -dc 0-9)
if [ "$FREE_GB" -lt "$MIN_FREE_GB" ]; then
  die "Only ${FREE_GB}G free, need ${MIN_FREE_GB}G. Free space (e.g. old backups in $BACKUP_DIR, journalctl --vacuum-size=100M) and retry with --deploy-only."
fi
echo "   ${FREE_GB}G free"

say "Building $IMAGE (takes ~20-30 min)"
LOG="$REPO/.build-$SHA.log"
if ! sudo DOCKER_BUILDKIT=1 docker build -f Dockerfile.dev \
      --build-arg NEXT_PUBLIC_VERSION="mamito-$SHA" -t "$IMAGE" . >"$LOG" 2>&1; then
  tail -30 "$LOG"
  die "Build failed (full log: $LOG). The running site was not touched."
fi
rm -f "$LOG"
sudo docker builder prune -af >/dev/null

# ---------------------------------------------------------------- 3. backup + deploy
say "Backing up the database"
BK="$BACKUP_DIR/$(date +%Y%m%d-%H%M%S)-pre-$SHA"
sudo mkdir -p "$BK"
sudo docker exec postiz-postgres pg_dump -U postiz-user -d postiz-db -Fc | sudo tee "$BK/postiz-db.dump" >/dev/null
sudo cp "$DEPLOY_DIR/docker-compose.yml" "$DEPLOY_DIR/.env" "$BK/"
sudo chmod -R go-rwx "$BK"
echo "   $BK"

switch_to() {
  sudo sed -i -E "s#image: mamito:[^[:space:]]+#image: $1#" "$DEPLOY_DIR/docker-compose.yml"
  (cd "$DEPLOY_DIR" && sudo docker compose up -d postiz >/dev/null 2>&1)
}

healthy() {
  local web api
  for _ in $(seq 1 60); do
    web=$(curl -s -o /dev/null -w '%{http_code}' -H "Host: $DOMAIN" "http://127.0.0.1:$LOCAL_PORT/auth/login" || true)
    api=$(curl -s -o /dev/null -w '%{http_code}' -H "Host: $DOMAIN" "http://127.0.0.1:$LOCAL_PORT/api/user/self" || true)
    [ "$web" = 200 ] && [ "$api" = 401 ] && return 0
    sleep 5
  done
  echo "   last status: login=$web api=$api"; return 1
}

say "Switching the site to $IMAGE (about 1 minute of downtime)"
switch_to "$IMAGE"
if healthy; then
  sudo docker tag "$IMAGE" mamito:latest
  say "Mamito is live on $IMAGE at https://$DOMAIN"
  if curl -s -H "Host: $DOMAIN" "http://127.0.0.1:$LOCAL_PORT/auth/login" | grep -q Postiz; then
    warn "The login page still contains 'Postiz' somewhere; check it."
  fi
  [ -n "$OLD_IMAGE" ] && [ "$OLD_IMAGE" != "$IMAGE" ] && \
    echo "   Previous image $OLD_IMAGE kept for rollback (deleted automatically next update)."
  echo "   Rollback: sudo sed -i 's#image: mamito:.*#image: $OLD_IMAGE#' $DEPLOY_DIR/docker-compose.yml && (cd $DEPLOY_DIR && sudo docker compose up -d postiz)"
else
  sudo docker logs --tail 40 postiz 2>&1 | sed 's/^/   | /'
  if [ -n "$OLD_IMAGE" ]; then
    warn "New version failed its health check. Rolling back to $OLD_IMAGE"
    switch_to "$OLD_IMAGE"
    healthy && warn "Rolled back; the site is running $OLD_IMAGE again." || warn "Rollback also unhealthy; check 'sudo docker logs postiz'."
    warn "If the new version changed the database, restore with: $BK/postiz-db.dump"
  fi
  die "Deploy of $IMAGE failed."
fi
