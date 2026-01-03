import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'Remoria — Raúl Mermans',
  description:
    'A poetic fragrance house rooted in Roman legacy, Spanish lyricism, and Mediterranean light—where scent becomes memory and design becomes relic.',
  openGraph: {
    title: 'Remoria — Raúl Mermans',
    description: 'A story-driven fragrance world where Mediterranean warmth meets timeless restraint.',
    type: 'article',
    url: `${baseUrl}/case-studies/remoria`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remoria — Raúl Mermans',
    description: 'A story-driven fragrance world where Mediterranean warmth meets timeless restraint.',
  },
}

export default function RemoriaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

