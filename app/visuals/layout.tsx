import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

export const metadata: Metadata = {
  title: 'Visuals',
  description: 'A curated collection of AI art, album covers, and digital experiments by Raúl Mermans.',
  openGraph: {
    title: 'Visuals — Raúl Mermans',
    description: 'A curated collection of AI art, album covers, and digital experiments by Raúl Mermans.',
    url: `${baseUrl}/visuals`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visuals — Raúl Mermans',
    description: 'A curated collection of AI art, album covers, and digital experiments by Raúl Mermans.',
  },
}

export default function VisualsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="visuals-layout">
      {children}
    </div>
  )
}

