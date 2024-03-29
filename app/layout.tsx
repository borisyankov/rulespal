import type { Metadata, Viewport } from "next";
import { Work_Sans } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';

import "./globals.css";
import { ThemeProvider } from "@/app/ui/theme-provider";

const font = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "RulesPal",
  description: "Rules for board games, answered by your AI pal.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`h-full ${font.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
