import type { Metadata } from 'next';
import {
  COMPANY,
  LegalDocument,
  LegalSection,
} from '../legal.document';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Privacy Policy - Mamito',
  description:
    'How Mamito by FidelLab collects, uses, stores and deletes your data, including data received from TikTok and other connected social platforms.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy - Mamito',
    url: '/privacy',
    siteName: 'Mamito',
    images: ['/og-image.png'],
  },
};

const Mail = () => <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>;

const sections: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <>
        <p>
          Mamito (&quot;Mamito&quot;, &quot;we&quot;, &quot;us&quot;) is a
          social media scheduling and publishing service operated by{' '}
          <strong>FidelLab</strong>, {COMPANY.address}. Mamito is available at{' '}
          <a href={COMPANY.site}>{COMPANY.site}</a>.
        </p>
        <p>
          FidelLab is the data controller for the personal data described in
          this Privacy Policy. If you have any question about your data, contact
          us at <Mail />.
        </p>
      </>
    ),
  },
  {
    id: 'data-we-collect',
    title: 'Data we collect',
    body: (
      <>
        <p>We collect only the data needed to run the service:</p>
        <ul>
          <li>
            <strong>Account data</strong> – your name, email address, password
            (stored as a salted hash, never in plain text), organization name,
            time zone and language preference.
          </li>
          <li>
            <strong>Content you create</strong> – posts, captions, images,
            videos, comments, schedules and settings you add to Mamito.
          </li>
          <li>
            <strong>Connected social accounts</strong> – the access and refresh
            tokens issued by each platform you connect, and the basic profile
            information described below.
          </li>
          <li>
            <strong>Technical data</strong> – IP address, browser type and
            server logs, used for security, debugging and abuse prevention.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'tiktok-data',
    title: 'Data we receive from TikTok',
    body: (
      <>
        <p>
          When you choose to connect a TikTok account, you sign in on TikTok and
          approve the permissions Mamito requests. Through the TikTok API we
          then receive:
        </p>
        <div className="legal-table">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>TikTok scope</th>
                <th>Why we use it</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Open ID, avatar and display name</td>
                <td>user.info.basic</td>
                <td>
                  To identify the connected account and show it in your Mamito
                  dashboard so you can pick where to publish.
                </td>
              </tr>
              <tr>
                <td>Profile information (username / profile link)</td>
                <td>user.info.profile</td>
                <td>
                  To display your TikTok handle and link to your profile and
                  published videos.
                </td>
              </tr>
              <tr>
                <td>
                  Account statistics (followers, following, likes, video count)
                </td>
                <td>user.info.stats</td>
                <td>
                  To show you analytics about your own account inside Mamito.
                </td>
              </tr>
              <tr>
                <td>
                  Your video list and per-video metrics (views, likes, comments,
                  shares)
                </td>
                <td>video.list</td>
                <td>
                  To show the performance of your videos and confirm that posts
                  published through Mamito went live.
                </td>
              </tr>
              <tr>
                <td>Video upload and publishing</td>
                <td>video.upload, video.publish</td>
                <td>
                  To send the videos or photos you prepare in Mamito to your
                  TikTok account, as a draft or a direct post.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>
            We upload or publish content to TikTok only when you take an action
          </strong>{' '}
          – by pressing &quot;Add to calendar&quot; / &quot;Post now&quot; or by
          scheduling a post for a time you choose. Before each TikTok post you
          choose the privacy level, interaction settings (comments, duet,
          stitch) and content disclosure options required by TikTok. Mamito
          never posts on your behalf without your instruction and never
          modifies or deletes content already on your TikTok account.
        </p>
        <p>
          TikTok data is used only to provide the features described above to
          you. It is not used for advertising, profiling or training of AI
          models, and it is not shared with other Mamito users.
        </p>
      </>
    ),
  },
  {
    id: 'other-platforms',
    title: 'Other connected platforms',
    body: (
      <p>
        If you connect other platforms (for example Instagram, Facebook,
        LinkedIn, YouTube, X or Telegram), we receive similar basic profile
        information, access tokens and, where you request them, analytics for
        your own accounts. These are used only to publish content you schedule
        and to show you your own statistics. Your use of each platform is also
        governed by that platform&apos;s own terms and privacy policy.
      </p>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How we use your data',
    body: (
      <ul>
        <li>To create and secure your account and let you sign in.</li>
        <li>
          To schedule, upload and publish the content you prepare to the
          accounts you connect.
        </li>
        <li>To display analytics about your own accounts and posts.</li>
        <li>
          To send service emails (for example account activation, password
          reset and post failure notifications).
        </li>
        <li>To keep the service secure, prevent abuse and fix problems.</li>
        <li>To comply with legal obligations.</li>
      </ul>
    ),
  },
  {
    id: 'tokens-security',
    title: 'Token storage and security',
    body: (
      <>
        <p>
          Access and refresh tokens for connected platforms are stored in our
          database on servers we control, are only used by the Mamito backend to
          call the platform&apos;s official API on your behalf, and are never
          shown to other users or sent to third parties.
        </p>
        <ul>
          <li>All traffic to Mamito is encrypted with HTTPS (TLS).</li>
          <li>
            Passwords are hashed; sessions use signed, HTTP-only, secure
            cookies.
          </li>
          <li>
            The database and job services are not exposed to the internet and
            are reachable only from the Mamito application.
          </li>
          <li>
            Access to production systems is limited to authorized FidelLab
            staff.
          </li>
          <li>
            Tokens are refreshed automatically and are deleted when you
            disconnect the account or delete your Mamito account.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'sharing',
    title: 'Sharing and selling of data',
    body: (
      <>
        <p>
          <strong>We do not sell, rent or trade your personal data</strong>,
          including any data received from TikTok. We share data only:
        </p>
        <ul>
          <li>
            with the social platform you are publishing to, limited to the
            content and settings you choose to send;
          </li>
          <li>
            with infrastructure providers that host our servers, under
            confidentiality obligations and only as needed to run the service;
          </li>
          <li>
            when required by law, court order or to protect the rights and
            safety of our users.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'Data retention',
    body: (
      <ul>
        <li>
          Account data and content are kept while your account is active.
        </li>
        <li>
          TikTok and other platform tokens and profile data are kept while the
          account is connected and deleted when you disconnect it.
        </li>
        <li>
          Cached analytics are refreshed from the platform and are not kept
          longer than needed to show them to you.
        </li>
        <li>
          When you delete your account, we delete your personal data and
          content within 30 days, except where we must keep limited records to
          comply with the law. Backups are overwritten on a rolling basis
          within 30 days.
        </li>
        <li>Server logs are kept for up to 90 days.</li>
      </ul>
    ),
  },
  {
    id: 'disconnect-delete',
    title: 'Disconnecting TikTok and deleting your data',
    body: (
      <>
        <p>You are in control of your data at all times:</p>
        <ul>
          <li>
            <strong>Disconnect TikTok in Mamito:</strong> open the calendar,
            click the menu on your TikTok channel avatar and choose{' '}
            <em>Delete</em> (scheduled posts for that channel must be deleted
            first). Mamito immediately stops using the account and deletes its
            access and refresh tokens. You can also choose{' '}
            <em>Disable Channel</em> to pause publishing without removing it.
          </li>
          <li>
            <strong>Revoke access on TikTok:</strong> in the TikTok app go to{' '}
            <em>
              Profile → Menu → Settings and privacy → Security → Manage app
              permissions
            </em>
            , select Mamito and remove access.
          </li>
          <li>
            <strong>Request deletion:</strong> email <Mail /> from the email
            address of your Mamito account with the subject &quot;Delete my
            data&quot;. We will delete your account, connected-account data and
            content within 30 days and confirm by email.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: (
      <p>
        Depending on where you live, you may have the right to access, correct,
        export or delete your personal data, to object to or restrict its
        processing and to withdraw consent at any time. To exercise these
        rights, contact <Mail />. We respond within 30 days.
      </p>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: (
      <p>
        Mamito uses only the cookies needed to run the service – to keep you
        signed in, remember your language and preferences and protect against
        abuse. We do not use advertising cookies.
      </p>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <p>
        Mamito is not intended for children under 13 (or the minimum age
        required in your country), and we do not knowingly collect their data.
        If you believe a child has provided us data, contact us and we will
        delete it.
      </p>
    ),
  },
  {
    id: 'international',
    title: 'International transfers',
    body: (
      <p>
        Your data may be processed on servers located outside your country. We
        take reasonable steps to make sure it receives the same level of
        protection described in this policy.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We may update this Privacy Policy from time to time. We will post the
        new version on this page with a new &quot;Last updated&quot; date and,
        for significant changes, notify you by email or in the app.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <p>
        <strong>FidelLab – Mamito</strong>
        <br />
        {COMPANY.address}
        <br />
        Email: <Mail />
        <br />
        Website: <a href={COMPANY.site}>{COMPANY.site}</a>
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      current="privacy"
      title="Privacy Policy"
      intro={
        <>
          This Privacy Policy explains what information <strong>Mamito</strong>
          , a service by <strong>FidelLab</strong>, collects when you use it –
          including data received from TikTok when you connect your TikTok
          account – how we use and protect it, and how you can disconnect your
          accounts and delete your data.
        </>
      }
      sections={sections}
    />
  );
}
