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

export const metadata: Metadata = {
  title: 'RulesPal',
  description: 'Board game rules answered by your AI pal.',
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
