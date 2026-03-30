import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

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
  absoluteTitle: true,
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
      <StructuredData
        type="Article"
        data={{
          '@id': `${siteConfig.url}/#remoria-case-study`,
          headline: 'Remoria Case Study',
          name: 'Remoria',
          description:
            'Remoria case study by Raúl Mermans, exploring how brand systems, visual restraint, and creative infrastructure scale a premium world.',
          url: absoluteRouteUrl('/case-studies/remoria'),
          mainEntityOfPage: absoluteRouteUrl('/case-studies/remoria'),
          image: absoluteUrl('/images/case-studies/remoria/hero/hero.webp'),
          articleSection: 'Case Studies',
          keywords: ['brand system case study', 'creative direction', 'Remoria'],
        }}
      />
      {children}
    </>
  )
}
