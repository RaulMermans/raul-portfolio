import type { Metadata } from 'next'
import { buildPageMetadata, siteConfig } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Remoria Case Study',
  description:
    'Remoria case study by Raúl Mermans, exploring how brand systems, visual restraint, and creative infrastructure scale a premium world.',
  path: '/case-studies/remoria',
  image: {
    url: '/images/case-studies/remoria/hero/hero.webp',
    alt: 'Remoria case study by Raúl Mermans',
  },
  type: 'article',
  keywords: ['brand system case study', 'creative direction', 'Remoria'],
})

function BreadcrumbSchema() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Case Studies',
        item: `${siteConfig.url}/case-studies`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Remoria',
        item: `${siteConfig.url}/case-studies/remoria`,
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
