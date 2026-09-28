import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'Benchmark Intelligence Engine — Motor benchmark desde datos raw'
const description =
  'Caso de estudio: motor benchmark público y seguro que convierte 480 observaciones mensuales sintéticas en cuota del set benchmark, rankings, diagnóstico de monetización, agregación y forecasts locales de escenario.'

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/benchmark-dashboard',
  locale: 'es',
  image: {
    url: '/images/case-studies/case-studies-thumbnail.webp',
    alt: 'Benchmark Intelligence Engine — caso de estudio de Raúl Mermans',
  },
  type: 'article',
  keywords: [
    'benchmark intelligence engine',
    'producto de datos',
    'inteligencia de negocio',
    'source_monthly',
    'datos sintéticos',
    'forecast local',
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
        name: 'Benchmark Intelligence Engine',
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
          name: 'Benchmark Intelligence Engine',
          description,
          url: absoluteRouteUrl('/es/case-studies/benchmark-dashboard'),
          mainEntityOfPage: absoluteRouteUrl('/es/case-studies/benchmark-dashboard'),
          image: absoluteUrl('/images/case-studies/case-studies-thumbnail.webp'),
          articleSection: 'Casos de estudio',
          keywords: [
            'benchmark intelligence engine',
            'producto de datos',
            'inteligencia de negocio',
            'source_monthly',
            'datos sintéticos',
            'forecast local',
          ],
        }}
      />
      {children}
    </>
  )
}
