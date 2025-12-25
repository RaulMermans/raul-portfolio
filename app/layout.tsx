import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Raul Portfolio',
  description: 'Personal portfolio website showcasing projects and skills',
  keywords: ['portfolio', 'developer', 'web development'],
  authors: [{ name: 'Raul' }],
  openGraph: {
    title: 'Raul Portfolio',
    description: 'Personal portfolio website',
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}

