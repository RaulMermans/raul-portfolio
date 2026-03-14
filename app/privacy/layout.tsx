import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the Privacy Policy for Raúl Mermans to understand how portfolio inquiries, analytics data, and personal information are collected, used, and protected.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy — Raúl Mermans',
    description:
      'Read the Privacy Policy for Raúl Mermans to understand how portfolio inquiries, analytics data, and personal information are collected, used, and protected.',
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
