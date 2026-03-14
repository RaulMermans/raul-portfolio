import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'Visuals',
  description: 'Visual art and creative works by Raúl Mermans — AI-generated art, album covers, and digital compositions.',
  openGraph: {
    title: 'Visuals — Raúl Mermans',
    description: 'Visual art and creative works by Raúl Mermans — AI-generated art, album covers, and digital compositions.',
    url: `${baseUrl}/visuals`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visuals — Raúl Mermans',
    description: 'Visual art and creative works by Raúl Mermans — AI-generated art, album covers, and digital compositions.',
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

