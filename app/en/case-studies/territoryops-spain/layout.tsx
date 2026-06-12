import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'TerritoryOps Spain — Private atlas for real estate decisions'
const description =
  'Case study of a local-first internal control console that organizes real estate opportunities across Spain through map, table, pipeline, and follow-up logic.'

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/territoryops-spain',
  locale: 'en',
  image: {
    url: '/images/case-studies/case-studies-thumbnail.webp',
    alt: 'TerritoryOps Spain case study by Raúl Mermans',
  },
  type: 'article',
  keywords: [
    'internal tool',
    'product prototype',
    'real estate operations',
    'Leaflet map',
    'local-first',
    'business intelligence',
  ],
  absoluteTitle: true,
})

export default function EnglishTerritoryOpsSpainLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteRouteUrl('/en/case-studies/territoryops-spain')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/en` },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${siteConfig.url}/en/case-studies` },
      { '@type': 'ListItem', position: 3, name: 'TerritoryOps Spain', item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <StructuredData
        type="Article"
        data={{
          '@id': `${siteConfig.url}/#territoryops-spain-case-study-en`,
          headline: title,
          name: 'TerritoryOps Spain',
          description,
          url,
          mainEntityOfPage: url,
          image: absoluteUrl('/images/case-studies/case-studies-thumbnail.webp'),
          articleSection: 'Case Studies',
          keywords: ['internal tool', 'product prototype', 'real estate operations', 'local-first'],
        }}
      />
      {children}
    </>
  )
}
