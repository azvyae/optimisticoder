import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { EB_Garamond, JetBrains_Mono } from 'next/font/google';

const jebrainsMono = JetBrains_Mono({
  weight: ['300', '400', '500', '700', '800'],
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

const ebGaramond = EB_Garamond({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-eb-garamond',
});

import { Navbar } from '@/components/navigation/navbar';
import { ClientProvider } from '@/providers/client-provider';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? `http://localhost:3000`,
  ),
  title: {
    template: '%s | Optimisticoder',
    default: "It's your own code | Optimisticoder",
  },
  description:
    "Welcome to Optimisticoder, it's your code, be optimist! Find new insights, tips, or other case studies related to programming and tech here.",
  keywords: 'blog, portfolio, programming, code, azvya, erstevan',
  openGraph: {
    title: "It's your own code | Optimisticoder",
    url: 'https:optimisticoder.com',
    description:
      "Welcome to Optimisticoder, it's your code, be optimist! Find new insights, tips, or other case studies related to programming and tech here.",
    siteName: 'Optimisticoder',
    images: ['/static/opengraph/optimisticoder-dark.jpg'],
  },
};

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${jebrainsMono.variable} ${ebGaramond.variable} transition-colors duration-500 bg-light dark:bg-bgdark`}
      >
        <Navbar />

        {children}
        <ClientProvider />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
