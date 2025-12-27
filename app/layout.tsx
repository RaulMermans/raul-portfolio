import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans, Space_Mono } from 'next/font/google'
import '../styles/globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-body',
})

const spaceMono = Space_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Raúl Mermans — Visual Storyteller',
  description: 'Visual Storyteller — Photography, Brand Identity, AI-Powered Creatives. Based in Spain.',
  keywords: ['photography', 'brand identity', 'AI creatives', 'visual storytelling', 'Spain'],
  authors: [{ name: 'Raúl Mermans' }],
  openGraph: {
    title: 'Raúl Mermans — Visual Storyteller',
    description: 'Visual Storyteller — Photography, Brand Identity, AI-Powered Creatives. Based in Spain.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable}`}>
        <div className="grain" aria-hidden="true"></div>
        {children}
      </body>
    </html>
  )
}

