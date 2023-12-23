import type { Metadata } from 'next'
import { Slabo_13px } from 'next/font/google'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserratt = Montserrat({ subsets: ['latin'] })
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
      <body className={montserratt.className}>{children}</body>
    </html>
  )
}
