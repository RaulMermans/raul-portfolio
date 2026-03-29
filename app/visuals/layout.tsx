import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'Visuals',
  description:
    'Browse AI visuals, album covers, and image experiments by Raúl Mermans, part of a broader practice in AI systems and creative infrastructure.',
  openGraph: {
    title: 'Visuals — Raúl Mermans',
    description:
      'Browse AI visuals, album covers, and image experiments by Raúl Mermans, part of a broader practice in AI systems and creative infrastructure.',
    url: `${baseUrl}/visuals`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visuals — Raúl Mermans',
    description:
      'Browse AI visuals, album covers, and image experiments by Raúl Mermans, part of a broader practice in AI systems and creative infrastructure.',
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
