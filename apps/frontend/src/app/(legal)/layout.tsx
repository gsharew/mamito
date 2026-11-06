import '../global.scss';
import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { jakartaSans } from '@gitroom/frontend/fonts/plus-jakarta-sans/plus.jakarta.sans.font';

const siteUrl = process.env.FRONTEND_URL || 'https://mamito.fidellab.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Mamito',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export const viewport: Viewport = { themeColor: '#ff6a2b' };

// Public, standalone layout for the legal pages: no login, no app chrome.
export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakartaSans.className} light legal-page`}>
        {children}
      </body>
    </html>
  );
}
