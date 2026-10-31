import type { Metadata, Viewport } from 'next';
import { Suspense, type ReactNode } from 'react';
import { Fraunces, Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { AnalyticsTracker } from '@/components/analytics/AnalyticsTracker';
import { SITE, SITE_URL } from '@/lib/site';
import './globals.css';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces-src', display: 'swap', axes: ['opsz'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter-src', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#27187E',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        {children}
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
      </body>
      <GoogleAnalytics gaId="G-6HTG77KYML" />
    </html>
  );
}
