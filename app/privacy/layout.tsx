import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Raúl Mermans portfolio website. Learn how we collect, use, and protect your personal information.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy — Raúl Mermans',
    description: 'Privacy Policy for Raúl Mermans portfolio website. Learn how we collect, use, and protect your personal information.',
    url: `${baseUrl}/privacy`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/privacy`,
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

