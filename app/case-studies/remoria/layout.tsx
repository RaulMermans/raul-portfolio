import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'Remoria — Raúl Mermans',
  description:
    'A poetic fragrance house rooted in Roman legacy, Spanish lyricism, and Mediterranean light—where scent becomes memory and design becomes relic. Brand identity and creative direction.',
  openGraph: {
    title: 'Remoria — Raúl Mermans',
    description: 'A poetic fragrance house rooted in Roman legacy, Spanish lyricism, and Mediterranean light—where scent becomes memory and design becomes relic.',
    type: 'article',
    url: `${baseUrl}/case-studies/remoria`,
    publishedTime: '2026-01-01',
    authors: ['Raúl Mermans'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remoria — Raúl Mermans',
    description: 'A poetic fragrance house rooted in Roman legacy, Spanish lyricism, and Mediterranean light—where scent becomes memory and design becomes relic.',
  },
  alternates: {
    canonical: `${baseUrl}/case-studies/remoria`,
  },
}

function BreadcrumbSchema() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Case Studies',
        item: `${baseUrl}/case-studies`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Remoria',
        item: `${baseUrl}/case-studies/remoria`,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}

export default function RemoriaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema />
      {children}
    </>
  )
}

