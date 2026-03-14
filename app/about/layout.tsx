import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Raúl Mermans, a creative director in Spain building brand systems, visual storytelling, and automation for cultural brands that need strategy and execution.',
  openGraph: {
    title: 'About — Raúl Mermans',
    description:
      'Meet Raúl Mermans, a creative director in Spain building brand systems, visual storytelling, and automation for cultural brands that need strategy and execution.',
    url: `${baseUrl}/about`,
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Raúl Mermans',
    description:
      'Meet Raúl Mermans, a creative director in Spain building brand systems, visual storytelling, and automation for cultural brands that need strategy and execution.',
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
