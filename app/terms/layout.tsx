import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Raúl Mermans portfolio website. Read our terms and conditions for using this website.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms of Service — Raúl Mermans',
    description: 'Terms of Service for Raúl Mermans portfolio website.',
    url: `${baseUrl}/terms`,
    type: 'website',
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

