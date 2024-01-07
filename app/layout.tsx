import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserratt = Montserrat({ subsets: ["latin"], weight: "400" });

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
      <body className={`h-full ${montserratt.className}`}>{children}</body>
    </html>
  );
}
