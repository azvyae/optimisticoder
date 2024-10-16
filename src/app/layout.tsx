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
import { Footer } from '@/components/footer/footer';
import type { Theme } from '@/types/common';
import { cookies } from 'next/headers';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? `http://localhost:3000`,
  ),
  title: {
    template: '%s | Optimisticoder',
    default: "It's your own code | Optimisticoder",
  },
  description:
    "Welcome to Optimisticoder, it's your code, be an optimist! Find new insights, tips, or other case studies related to programming and tech here.",
  keywords: 'blog, portfolio, programming, code, azvya, erstevan',
  twitter: {
    title: "It's your own code | Optimisticoder",
    site: 'https://optimisticoder.com',
    description:
      "Welcome to Optimisticoder, it's your code, be an optimist! Find new insights, tips, or other case studies related to programming and tech here.",
    images: ['/static/opengraph/optimisticoder-dark.jpg'],
  },
  openGraph: {
    title: "It's your own code | Optimisticoder",
    url: 'https://optimisticoder.com',
    description:
      "Welcome to Optimisticoder, it's your code, be an optimist! Find new insights, tips, or other case studies related to programming and tech here.",
    siteName: 'Optimisticoder',
    images: ['/static/opengraph/optimisticoder-dark.jpg'],
  },
};

export default function Root({ children }: { children: React.ReactNode }) {
  const defaultTheme = cookies().get('theme')?.value as Theme;
  return (
    <html lang="en" className={defaultTheme === 'dark' ? 'dark' : ''}>
      <body
        className={`${jebrainsMono.variable} ${ebGaramond.variable} transition-colors duration-500 bg-[#FAFBFC] dark:bg-bgdark`}
      >
        <Navbar />

        {children}
        <Footer />
        <ClientProvider />
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://autoback.link/autobacklink.js?ref=optimisticoder.com"
          defer
          async
        />
      </body>
    </html>
  );
}
