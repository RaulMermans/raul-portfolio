import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Raúl Mermans, an applied AI systems builder designing agents, automation, and creative infrastructure for modern brands and teams.',
  openGraph: {
    title: 'About — Raúl Mermans',
    description:
      'About Raúl Mermans, an applied AI systems builder designing agents, automation, and creative infrastructure for modern brands and teams.',
    url: `${baseUrl}/about`,
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Raúl Mermans',
    description:
      'About Raúl Mermans, an applied AI systems builder designing agents, automation, and creative infrastructure for modern brands and teams.',
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
