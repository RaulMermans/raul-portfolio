import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'Photography',
  description:
    'Explore photography by Raúl Mermans, a supporting craft practice in composition, restraint, and visual judgment alongside his broader AI systems work.',
  openGraph: {
    title: 'Photography — Raúl Mermans',
    description:
      'Explore photography by Raúl Mermans, a supporting craft practice in composition, restraint, and visual judgment alongside his broader AI systems work.',
    url: `${baseUrl}/photography`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photography — Raúl Mermans',
    description:
      'Explore photography by Raúl Mermans, a supporting craft practice in composition, restraint, and visual judgment alongside his broader AI systems work.',
  },
  alternates: {
    canonical: `${baseUrl}/photography`,
  },
}

export default function PhotographyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="photography-layout">
      {children}
    </div>
  )
}
