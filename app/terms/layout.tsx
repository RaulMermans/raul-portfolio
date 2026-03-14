import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the Terms of Service for Raúl Mermans to understand the rules, limitations, and responsibilities that apply when you use this portfolio website.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms of Service — Raúl Mermans',
    description:
      'Read the Terms of Service for Raúl Mermans to understand the rules, limitations, and responsibilities that apply when you use this portfolio website.',
    url: `${baseUrl}/terms`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/terms`,
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
