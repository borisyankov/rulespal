import type { Metadata, Viewport } from "next";
import { Noto_Sans } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/app/ui/theme-provider";

const noto = Noto_Sans({
  style: ["normal", "italic"],
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
    <html lang="en">
      <body className={`h-full ${noto.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
