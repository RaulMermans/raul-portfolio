import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Raúl Mermans — Visual Storyteller based in Spain, specializing in photography, brand identity, and AI-powered creatives.',
  openGraph: {
    title: 'About — Raúl Mermans',
    description: 'Learn more about Raúl Mermans — Visual Storyteller based in Spain, specializing in photography, brand identity, and AI-powered creatives.',
    url: `${baseUrl}/about`,
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Raúl Mermans',
    description: 'Learn more about Raúl Mermans — Visual Storyteller based in Spain, specializing in photography, brand identity, and AI-powered creatives.',
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
