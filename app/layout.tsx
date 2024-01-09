import type { Metadata, Viewport } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";

const mplus = M_PLUS_Rounded_1c({ 
  subsets: ["latin"], 
  weight: ['400', '500'],
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
      <body className={`h-full ${mplus.className}`}>{children}</body>
    </html>
  );
}
