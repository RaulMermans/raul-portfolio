import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'Visuals',
  description:
    'Browse visual art by Raúl Mermans, from AI-generated artwork and album covers to digital concepts built for music, culture, and striking online releases.',
  openGraph: {
    title: 'Visuals — Raúl Mermans',
    description:
      'Browse visual art by Raúl Mermans, from AI-generated artwork and album covers to digital concepts built for music, culture, and striking online releases.',
    url: `${baseUrl}/visuals`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visuals — Raúl Mermans',
    description:
      'Browse visual art by Raúl Mermans, from AI-generated artwork and album covers to digital concepts built for music, culture, and striking online releases.',
  },
  alternates: {
    canonical: `${baseUrl}/visuals`,
  },
}

export default function VisualsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
