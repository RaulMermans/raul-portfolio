import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'Benchmark Dashboard Template — Data product / Business intelligence dashboard'
const description =
  'Case study: a reusable public dashboard built with React, Vite, Tailwind CSS, and Recharts that transforms mock benchmark data into rankings, trends, comparisons, and forecast scenarios.'

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/benchmark-dashboard',
  locale: 'en',
  image: {
    url: '/images/case-studies/case-studies-thumbnail.webp',
    alt: 'Benchmark Dashboard Template case study by Raúl Mermans',
  },
  type: 'article',
  keywords: [
    'benchmark dashboard',
    'data product',
    'business intelligence',
    'React Recharts dashboard',
    'mock data dashboard',
    'connector-ready dashboard',
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
        name: 'Benchmark Dashboard Template',
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
          name: 'Benchmark Dashboard Template',
          description,
          url: absoluteRouteUrl('/en/case-studies/benchmark-dashboard'),
          mainEntityOfPage: absoluteRouteUrl('/en/case-studies/benchmark-dashboard'),
          image: absoluteUrl('/images/case-studies/case-studies-thumbnail.webp'),
          articleSection: 'Case Studies',
          keywords: [
            'benchmark dashboard',
            'data product',
            'business intelligence',
            'React Recharts',
            'mock data',
          ],
        }}
      />
      {children}
    </>
  )
}
