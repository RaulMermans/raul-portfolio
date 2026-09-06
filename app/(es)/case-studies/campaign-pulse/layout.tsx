import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'Campaign Pulse — Marketing Intelligence Case Study'
const description =
  'A local-first marketing intelligence command center for newsletter performance, CSV ingestion, target-aware analytics, audience pressure, and monthly operating reports.'
const image = '/images/case-studies/campaign-pulse/overview.png'
const keywords = [
  'Campaign Pulse',
  'marketing intelligence',
  'data product',
  'newsletter analytics',
  'CSV adapter',
  'audience pressure',
  'target-aware analytics',
  'local-first prototype',
]

const baseMetadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/campaign-pulse',
  locale: 'es',
  image: {
    url: image,
    alt: 'Campaign Pulse marketing intelligence command center overview',
    width: 1440,
    height: 1000,
  },
  type: 'article',
  keywords,
  absoluteTitle: true,
})

export const metadata: Metadata = {
  ...baseMetadata,
  title: { absolute: title },
  openGraph: { ...baseMetadata.openGraph, title },
  twitter: { ...baseMetadata.twitter, title },
}

export default function CampaignPulseLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteRouteUrl('/case-studies/campaign-pulse')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Casos de estudio', item: `${siteConfig.url}/case-studies` },
      { '@type': 'ListItem', position: 3, name: 'Campaign Pulse', item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <StructuredData
        type="Article"
        data={{
          '@id': `${siteConfig.url}/#campaign-pulse-case-study`,
          headline: title,
          name: 'Campaign Pulse',
          description,
          url,
          mainEntityOfPage: url,
          image: absoluteUrl(image),
          articleSection: 'Case Studies',
          keywords,
        }}
      />
      {children}
    </>
  )
}
