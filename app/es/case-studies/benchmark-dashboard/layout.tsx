import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'Benchmark Dashboard Template — Data product / Business intelligence dashboard'
const description =
  'Caso de estudio: un dashboard público y reutilizable construido con React, Vite, Tailwind CSS y Recharts que convierte datos mock de benchmark en rankings, tendencias, comparativas y escenarios de forecast.'

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/benchmark-dashboard',
  locale: 'es',
  image: {
    url: '/images/case-studies/case-studies-thumbnail.webp',
    alt: 'Benchmark Dashboard Template — caso de estudio de Raúl Mermans',
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
        name: 'Inicio',
        item: `${siteConfig.url}/es`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Casos de estudio',
        item: `${siteConfig.url}/es/case-studies`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Sistemas de datos',
        item: `${siteConfig.url}/es/case-studies/data-systems`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Benchmark Dashboard Template',
        item: `${siteConfig.url}/es/case-studies/benchmark-dashboard`,
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
}

export default function SpanishBenchmarkDashboardLayout({
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
          '@id': `${siteConfig.url}/#benchmark-dashboard-case-study-es`,
          headline: title,
          name: 'Benchmark Dashboard Template',
          description,
          url: absoluteRouteUrl('/es/case-studies/benchmark-dashboard'),
          mainEntityOfPage: absoluteRouteUrl('/es/case-studies/benchmark-dashboard'),
          image: absoluteUrl('/images/case-studies/case-studies-thumbnail.webp'),
          articleSection: 'Casos de estudio',
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
