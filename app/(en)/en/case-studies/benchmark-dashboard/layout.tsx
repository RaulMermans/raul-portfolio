import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'Benchmark Intelligence Engine — Raw-data benchmark intelligence'
const description =
  'Case study: a public-safe benchmark engine that turns 480 synthetic monthly observations into tracked benchmark-set share, rankings, monetization diagnostics, aggregation, and local scenario forecasts.'

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/benchmark-dashboard',
  locale: 'en',
  image: {
    url: '/images/case-studies/case-studies-thumbnail.webp',
    alt: 'Benchmark Intelligence Engine case study by Raúl Mermans',
  },
  type: 'article',
  keywords: [
    'benchmark intelligence engine',
    'data product',
    'business intelligence',
    'source_monthly',
    'synthetic benchmark data',
    'local scenario forecast',
  ],
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
        item: `${siteConfig.url}/en`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Case Studies',
        item: `${siteConfig.url}/en/case-studies`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Benchmark Intelligence Engine',
        item: `${siteConfig.url}/en/case-studies/benchmark-dashboard`,
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
}

export default function EnglishBenchmarkDashboardLayout({
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
          '@id': `${siteConfig.url}/#benchmark-dashboard-case-study-en`,
          headline: title,
          name: 'Benchmark Intelligence Engine',
          description,
          url: absoluteRouteUrl('/en/case-studies/benchmark-dashboard'),
          mainEntityOfPage: absoluteRouteUrl('/en/case-studies/benchmark-dashboard'),
          image: absoluteUrl('/images/case-studies/case-studies-thumbnail.webp'),
          articleSection: 'Case Studies',
          keywords: [
            'benchmark intelligence engine',
            'data product',
            'business intelligence',
            'source_monthly',
            'synthetic benchmark data',
            'local scenario forecast',
          ],
        }}
      />
      {children}
    </>
  )
}
