import type { Metadata, Viewport } from 'next';
import { Work_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

import './globals.css';
import { ThemeProvider } from '@/app/ui/theme-provider';
import { CSPostHogProvider } from './providers';

const font = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
});

const siteUrl = 'https://rulespal.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'RulesPal — Board Game Rules Answered by AI',
    template: '%s | RulesPal',
  },
  description:
    'Get instant answers to board game rules questions and read full rulebooks for hundreds of games. RulesPal is your AI board game rules pal.',
  applicationName: 'RulesPal',
  keywords: [
    'board game rules',
    'rulebook',
    'how to play',
    'board game FAQ',
    'game rules explained',
    'RulesPal',
  ],
  authors: [{ name: 'Boris Yankov', url: 'https://x.com/borisyankov' }],
  creator: 'Boris Yankov',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'RulesPal',
    url: siteUrl,
    title: 'RulesPal — Board Game Rules Answered by AI',
    description:
      'Get instant answers to board game rules questions and read full rulebooks for hundreds of games.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RulesPal — Board Game Rules Answered by AI',
    description:
      'Get instant answers to board game rules questions and read full rulebooks for hundreds of games.',
    creator: '@borisyankov',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  interactiveWidget: 'resizes-content',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <CSPostHogProvider>
        <body className={`min-h-screen ${font.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-screen flex-col pt-16 px-2">
              {children}
            </div>
          </ThemeProvider>
          <Analytics />
        </body>
      </CSPostHogProvider>
    </html>
  );
}
