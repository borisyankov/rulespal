import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Slabo_13px } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const slabo = Slabo_13px({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'RulesFTW',
  description: 'Rules for board games, answered by AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={slabo.className}>{children}</body>
    </html>
  )
}
