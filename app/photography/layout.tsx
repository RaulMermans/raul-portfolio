import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'Photography',
  description: 'Photography work by Raúl Mermans — Landscape, Architecture, and Street photography collections. Visual storytelling through street photography and architectural imagery.',
  openGraph: {
    title: 'Photography — Raúl Mermans',
    description: 'Photography work by Raúl Mermans — Landscape, Architecture, and Street photography collections.',
    url: `${baseUrl}/photography`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photography — Raúl Mermans',
    description: 'Photography work by Raúl Mermans — Landscape, Architecture, and Street photography collections.',
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

