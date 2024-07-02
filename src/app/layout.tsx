import type { Metadata } from 'next';
import { EB_Garamond, JetBrains_Mono } from 'next/font/google';
import React from 'react';

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

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './globals.css';
import { ClientProvider } from '@/providers/client-provider';

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
    images: [
      '/img/opengraph/optimisticoder-bright.jpg',
      '/img/opengraph/optimisticoder-dark.jpg',
    ],
  },
};

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jebrainsMono.variable} ${ebGaramond.variable}`}>
        {children}
        <ClientProvider />
      </body>
    </html>
  );
}
