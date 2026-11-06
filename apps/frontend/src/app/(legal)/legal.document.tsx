import { ReactNode } from 'react';

export const COMPANY = {
  product: 'Mamito',
  company: 'FidelLab',
  address: 'Bole, Addis Ababa, Ethiopia',
  email: 'support@fidellab.com',
  site: 'https://mamito.fidellab.com',
  effective: 'November 6, 2026',
};

export type LegalSection = { id: string; title: string; body: ReactNode };

export const LegalDocument = ({
  title,
  intro,
  sections,
  current,
}: {
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
  current: 'terms' | 'privacy';
}) => {
  return (
    <div className="min-h-screen bg-[#fbf8f5] text-[#1f2430]">
      <header className="sticky top-0 z-10 border-b border-[#efe6de] bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-[68px] max-w-[1100px] items-center justify-between px-[20px]">
          <a href="/" className="flex items-center gap-[10px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mamito-icon.png" alt="Mamito" className="h-[36px] w-auto" />
            <span className="text-[20px] font-[700] tracking-[-0.01em]">
              Mamito
              <span className="ms-[6px] text-[13px] font-[500] text-[#8a8f99]">
                by FidelLab
              </span>
            </span>
          </a>
          <nav className="flex items-center gap-[6px] text-[14px] font-[600]">
            <a
              href="/terms"
              className={
                current === 'terms'
                  ? 'rounded-full bg-[#fff0e6] px-[14px] py-[7px] text-[#e8561a]'
                  : 'rounded-full px-[14px] py-[7px] text-[#5b6170] hover:text-[#1f2430]'
              }
            >
              Terms
            </a>
            <a
              href="/privacy"
              className={
                current === 'privacy'
                  ? 'rounded-full bg-[#fff0e6] px-[14px] py-[7px] text-[#e8561a]'
                  : 'rounded-full px-[14px] py-[7px] text-[#5b6170] hover:text-[#1f2430]'
              }
            >
              Privacy
            </a>
            <a
              href="/auth/login"
              className="ms-[6px] rounded-full bg-gradient-to-r from-[#ff8a0b] to-[#ff5b51] px-[16px] py-[7px] text-white shadow-[0_6px_18px_rgba(255,106,43,0.35)] mobile:hidden"
            >
              Sign in
            </a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[#efe6de] bg-white">
        <div className="pointer-events-none absolute -top-[120px] end-[-80px] h-[320px] w-[320px] rounded-full bg-[#ff8a0b]/15 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-[140px] start-[-60px] h-[300px] w-[300px] rounded-full bg-[#ff5b51]/10 blur-[80px]" />
        <div className="relative mx-auto max-w-[1100px] px-[20px] py-[48px]">
          <div className="text-[13px] font-[700] uppercase tracking-[0.12em] text-[#e8561a]">
            Legal
          </div>
          <h1 className="mt-[8px] text-[40px] font-[800] leading-[1.1] tracking-[-0.02em] mobile:text-[30px]">
            {title}
          </h1>
          <p className="mt-[12px] text-[15px] text-[#5b6170]">
            Effective date: {COMPANY.effective} &middot; Last updated:{' '}
            {COMPANY.effective}
          </p>
        </div>
      </section>

      <main className="mx-auto flex max-w-[1100px] gap-[40px] px-[20px] py-[40px] mobile:flex-col">
        <aside className="w-[240px] shrink-0 mobile:w-full">
          <div className="sticky top-[92px] rounded-[16px] border border-[#efe6de] bg-white p-[16px]">
            <div className="mb-[8px] text-[12px] font-[700] uppercase tracking-[0.1em] text-[#8a8f99]">
              On this page
            </div>
            <ol className="flex flex-col gap-[2px] text-[14px]">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block rounded-[8px] px-[8px] py-[6px] text-[#5b6170] hover:bg-[#fff0e6] hover:text-[#e8561a]"
                  >
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <article className="legal-prose min-w-0 flex-1 rounded-[20px] border border-[#efe6de] bg-white p-[40px] text-[15.5px] leading-[1.75] text-[#3f4654] shadow-[0_10px_40px_rgba(31,36,48,0.04)] mobile:p-[22px]">
          <div className="mb-[28px] rounded-[14px] border border-[#ffd9c2] bg-[#fff7f1] p-[18px] text-[15px] text-[#4a3a30]">
            {intro}
          </div>
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-[92px] pb-[8px]">
              <h2 className="mb-[10px] mt-[28px] text-[21px] font-[700] tracking-[-0.01em] text-[#1f2430]">
                <span className="me-[8px] text-[#ff6a2b]">{i + 1}.</span>
                {s.title}
              </h2>
              {s.body}
            </section>
          ))}
        </article>
      </main>

      <footer className="border-t border-[#efe6de] bg-white">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-[12px] px-[20px] py-[24px] text-[13px] text-[#8a8f99]">
          <div>
            &copy; {new Date().getFullYear()} {COMPANY.product} by{' '}
            {COMPANY.company} &middot; {COMPANY.address}
          </div>
          <div className="flex gap-[16px]">
            <a href="/terms" className="hover:text-[#e8561a]">
              Terms of Service
            </a>
            <a href="/privacy" className="hover:text-[#e8561a]">
              Privacy Policy
            </a>
            <a href={`mailto:${COMPANY.email}`} className="hover:text-[#e8561a]">
              {COMPANY.email}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
