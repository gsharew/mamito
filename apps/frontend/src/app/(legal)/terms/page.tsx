import type { Metadata } from 'next';
import {
  COMPANY,
  LegalDocument,
  LegalSection,
} from '../legal.document';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Terms of Service - Mamito',
  description:
    'The terms that govern your use of Mamito, the social media scheduling and publishing service by FidelLab.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service - Mamito',
    url: '/terms',
    siteName: 'Mamito',
    images: ['/og-image.png'],
  },
};

const Mail = () => <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>;

const sections: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of these terms',
    body: (
      <p>
        These Terms of Service (&quot;Terms&quot;) are an agreement between you
        and <strong>FidelLab</strong>, {COMPANY.address} (&quot;FidelLab&quot;,
        &quot;we&quot;, &quot;us&quot;), for the use of Mamito at{' '}
        <a href={COMPANY.site}>{COMPANY.site}</a> (the &quot;Service&quot;). By
        creating an account or using the Service you agree to these Terms and
        to our <a href="/privacy">Privacy Policy</a>. If you use the Service on
        behalf of an organization, you confirm you are authorized to accept
        these Terms for it.
      </p>
    ),
  },
  {
    id: 'service',
    title: 'Description of the service',
    body: (
      <>
        <p>
          Mamito is a social media management tool that lets you connect your
          own social media accounts – such as TikTok, Instagram, Facebook,
          LinkedIn, YouTube, X and Telegram – and:
        </p>
        <ul>
          <li>create, edit and preview posts, videos and images;</li>
          <li>publish them immediately or schedule them for a later time;</li>
          <li>collaborate with your team in a shared workspace; and</li>
          <li>view analytics for your own accounts and posts.</li>
        </ul>
        <p>
          Mamito connects to each platform only through its official API and
          only after you authorize it. Content is published to a platform only
          when you instruct the Service to do so.
        </p>
      </>
    ),
  },
  {
    id: 'accounts',
    title: 'Your account',
    body: (
      <ul>
        <li>
          You must be at least 13 years old (or the minimum age in your
          country) and able to form a binding contract.
        </li>
        <li>
          You must give accurate information and keep your password secure.
          You are responsible for all activity under your account.
        </li>
        <li>
          Tell us immediately at <Mail /> if you suspect unauthorized use of
          your account.
        </li>
      </ul>
    ),
  },
  {
    id: 'responsibilities',
    title: 'Your responsibilities and acceptable use',
    body: (
      <>
        <p>You agree that you will not use the Service to:</p>
        <ul>
          <li>
            publish content that is illegal, infringing, defamatory, hateful,
            harassing, sexually exploitative, violent or misleading;
          </li>
          <li>send spam, artificially inflate engagement or impersonate others;</li>
          <li>
            connect or post to social accounts you do not own or are not
            authorized to manage;
          </li>
          <li>
            violate the terms, community guidelines or developer policies of
            any connected platform;
          </li>
          <li>
            interfere with, scrape, reverse engineer or overload the Service,
            or try to access other users&apos; data.
          </li>
        </ul>
        <p>
          You are solely responsible for the content you create, schedule and
          publish through Mamito and for any required disclosures (for example
          branded or promotional content).
        </p>
      </>
    ),
  },
  {
    id: 'tiktok',
    title: 'Compliance with TikTok and other platforms',
    body: (
      <>
        <p>
          When you connect a TikTok account you also agree to TikTok&apos;s{' '}
          <a
            href="https://www.tiktok.com/legal/page/global/terms-of-service/en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
          ,{' '}
          <a
            href="https://www.tiktok.com/community-guidelines"
            target="_blank"
            rel="noopener noreferrer"
          >
            Community Guidelines
          </a>{' '}
          and{' '}
          <a
            href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Music Usage Confirmation
          </a>
          . In particular:
        </p>
        <ul>
          <li>
            each TikTok post is created only after you review it and choose its
            privacy level, interaction settings and content disclosure options;
          </li>
          <li>
            TikTok may limit, reject or remove content, or apply posting limits,
            and Mamito cannot override TikTok&apos;s decisions;
          </li>
          <li>
            you can revoke Mamito&apos;s access at any time from Mamito or from
            your TikTok settings, as described in our{' '}
            <a href="/privacy#disconnect-delete">Privacy Policy</a>.
          </li>
        </ul>
        <p>
          The same applies to every other platform you connect: your use of it
          is governed by that platform&apos;s own terms. Mamito is not
          affiliated with, endorsed or sponsored by TikTok or any other social
          platform; their names and logos are trademarks of their owners.
        </p>
      </>
    ),
  },
  {
    id: 'content',
    title: 'Content ownership',
    body: (
      <>
        <p>
          <strong>You keep all rights to your content.</strong> By using the
          Service you give FidelLab a limited, non-exclusive, worldwide,
          royalty-free licence to host, store, process, resize or transcode and
          transmit your content only as needed to provide the Service to you –
          for example, to upload a video you scheduled to TikTok. This licence
          ends when you delete the content or your account, except for copies
          already published to a platform at your request.
        </p>
        <p>
          You confirm that you own or have the necessary rights (including
          music, images and the likeness of people) to everything you publish.
        </p>
        <p>
          The Mamito name, logo and service design are owned by FidelLab.
          Portions of the Service are based on open-source software that
          remains available under its respective licence.
        </p>
      </>
    ),
  },
  {
    id: 'availability',
    title: 'Availability and changes',
    body: (
      <p>
        We work to keep Mamito available and reliable but do not guarantee
        uninterrupted service. Platforms may change or restrict their APIs, which
        can affect some features. We may modify, suspend or discontinue features
        and will try to give reasonable notice of significant changes.
      </p>
    ),
  },
  {
    id: 'termination',
    title: 'Suspension and termination',
    body: (
      <>
        <p>
          You may stop using the Service and delete your connected channels at
          any time, and you may ask us to close your account and delete your
          data by emailing <Mail />.
        </p>
        <p>
          We may suspend or terminate your access, with or without notice, if
          you breach these Terms or a platform&apos;s terms, if your use
          creates risk or legal exposure for us or other users, or if required
          by law. On termination your right to use the Service ends and we will
          delete your data as described in the{' '}
          <a href="/privacy#retention">Privacy Policy</a>.
        </p>
      </>
    ),
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer of warranties',
    body: (
      <p>
        The Service is provided &quot;as is&quot; and &quot;as available&quot;.
        To the fullest extent permitted by law, FidelLab disclaims all
        warranties, express or implied, including merchantability, fitness for a
        particular purpose and non-infringement. We do not guarantee that a
        post will be accepted, published at an exact time, or reach a particular
        audience on any platform.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    body: (
      <p>
        To the fullest extent permitted by law, FidelLab and its team will not
        be liable for any indirect, incidental, special, consequential or
        punitive damages, or for loss of profits, revenue, data, followers or
        goodwill, arising from your use of or inability to use the Service, or
        from actions taken by a third-party platform. Our total liability for
        any claim relating to the Service is limited to the greater of the
        amount you paid us for the Service in the 12 months before the claim or
        USD 50.
      </p>
    ),
  },
  {
    id: 'indemnity',
    title: 'Indemnification',
    body: (
      <p>
        You agree to indemnify and hold FidelLab harmless from claims,
        damages and expenses (including reasonable legal fees) arising from
        your content, your use of the Service or your breach of these Terms or
        of a platform&apos;s terms.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Governing law',
    body: (
      <p>
        These Terms are governed by the laws of the Federal Democratic Republic
        of Ethiopia. Any dispute will be handled by the competent courts of
        Addis Ababa, unless mandatory consumer law in your country provides
        otherwise.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: (
      <p>
        We may update these Terms from time to time. The new version will be
        posted on this page with an updated date. If the changes are material
        we will notify you by email or in the app. Continuing to use the
        Service after changes take effect means you accept them.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
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

export default function TermsPage() {
  return (
    <LegalDocument
      current="terms"
      title="Terms of Service"
      intro={
        <>
          Welcome to <strong>Mamito</strong>, a social media scheduling and
          publishing service by <strong>FidelLab</strong>. Please read these
          Terms carefully – they explain your rights and responsibilities when
          you use Mamito, including when you connect your TikTok account.
        </>
      }
      sections={sections}
    />
  );
}
