import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Raúl Mermans — Visual Storyteller based in Spain, specializing in photography, brand identity, and AI-powered creatives.',
  openGraph: {
    title: 'About — Raúl Mermans',
    description: 'Learn more about Raúl Mermans — Visual Storyteller based in Spain.',
    url: `${baseUrl}/about`,
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'About — Raúl Mermans',
    description: 'Learn more about Raúl Mermans — Visual Storyteller based in Spain.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

