import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

export const metadata: Metadata = {
  title: 'Photography',
  description: 'Photography work by Raúl Mermans — Landscape, Architecture, and Street photography collections.',
  openGraph: {
    title: 'Photography — Raúl Mermans',
    description: 'Photography work by Raúl Mermans — Landscape and Architecture collections.',
    url: `${baseUrl}/photography`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photography — Raúl Mermans',
    description: 'Photography work by Raúl Mermans — Landscape and Architecture collections.',
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

