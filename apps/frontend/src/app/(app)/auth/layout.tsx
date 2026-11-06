import { getT } from '@gitroom/react/translation/get.translation.service.backend';

export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import loadDynamic from 'next/dynamic';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
import { MantineWrapper } from '@gitroom/react/helpers/mantine.wrapper';
import { Toaster } from '@gitroom/react/toaster/toaster';
const ReturnUrlComponent = loadDynamic(() => import('./return.url.component'));

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="12" fill="#ff6a2b" fillOpacity="0.14" />
    <path
      d="M7 12.5l3.2 3.2L17 9"
      stroke="#ee5a1c"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getT();

  return (
    <MantineWrapper>
      <Toaster />
      <ReturnUrlComponent />
      <div className="relative flex min-h-screen w-screen gap-[12px] bg-[#14161c] p-[12px] text-white mobile:p-0">
        {/* Brand panel */}
        <div className="relative hidden flex-1 overflow-hidden rounded-[20px] bg-[#fff8f3] lg:flex">
          <div className="pointer-events-none absolute -end-[120px] -top-[120px] h-[420px] w-[420px] rounded-full bg-[#ff8a0b]/25 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-[160px] -start-[100px] h-[440px] w-[440px] rounded-full bg-[#ff5b51]/20 blur-[100px]" />
          <div className="relative z-[1] flex w-full flex-col justify-between p-[48px] text-[#1f2430]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mamito-logo.png" alt="Mamito" className="h-[110px] w-auto self-start" />
            <div className="max-w-[520px]">
              <div className="mb-[14px] inline-flex items-center gap-[8px] rounded-full border border-[#ffd9c2] bg-white/70 px-[12px] py-[5px] text-[13px] font-[600] text-[#c2410c]">
                <span className="h-[7px] w-[7px] rounded-full bg-[#ff6a2b]" />
                {t('mamito_tagline_badge', 'Social media, simplified')}
              </div>
              <h2 className="text-[44px] font-[800] leading-[1.08] tracking-[-0.02em]">
                {t('mamito_tagline_1', 'Plan, publish and grow')}{' '}
                <span className="bg-gradient-to-r from-[#ff8a0b] to-[#ff5b51] bg-clip-text text-transparent">
                  {t('mamito_tagline_2', 'everywhere at once.')}
                </span>
              </h2>
              <p className="mt-[16px] text-[17px] leading-[1.6] text-[#5b6170]">
                {t(
                  'mamito_tagline_description',
                  'Schedule posts for TikTok, Instagram, Facebook, LinkedIn, YouTube and more from one calendar, and see what works.'
                )}
              </p>
              <ul className="mt-[28px] flex flex-col gap-[12px] text-[15px] font-[500] text-[#3f4654]">
                <li className="flex items-center gap-[10px]">
                  <Check />
                  {t('mamito_feature_1', 'One calendar for all your channels')}
                </li>
                <li className="flex items-center gap-[10px]">
                  <Check />
                  {t('mamito_feature_2', 'Publish only when you say so')}
                </li>
                <li className="flex items-center gap-[10px]">
                  <Check />
                  {t('mamito_feature_3', 'Analytics for every post')}
                </li>
              </ul>
            </div>
            <div className="text-[13px] text-[#8a8f99]">
              &copy; {new Date().getFullYear()} Mamito by FidelLab &middot; Bole,
              Addis Ababa, Ethiopia
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="flex flex-1 flex-col rounded-[20px] border border-[#2b303c] bg-[#1c1f27] px-[20px] py-[40px] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] lg:w-[560px] lg:flex-none mobile:rounded-none mobile:border-0">
          <div className="mx-auto flex h-full w-full max-w-[420px] flex-col justify-center gap-[24px] text-white">
            <div className="lg:hidden">
              <LogoTextComponent />
            </div>
            <div className="flex">{children}</div>
            <div className="mamito-footer flex flex-wrap items-center justify-center gap-x-[16px] gap-y-[6px] pt-[8px] text-[13px] text-[#9ba3b4]">
              <a href="/terms" target="_blank" rel="noopener">
                {t('terms_of_service', 'Terms of Service')}
              </a>
              <span className="text-[#3a4050]">&bull;</span>
              <a href="/privacy" target="_blank" rel="noopener">
                {t('privacy_policy', 'Privacy Policy')}
              </a>
              <span className="text-[#3a4050]">&bull;</span>
              <a href="mailto:support@fidellab.com">
                {t('support', 'Support')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </MantineWrapper>
  );
}
