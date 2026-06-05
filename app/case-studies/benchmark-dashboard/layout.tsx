import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'Benchmark Dashboard Template — Producto de datos / Inteligencia de negocio'
const description =
  'Caso de estudio: un panel público y reutilizable construido con React, Vite, Tailwind CSS y Recharts que convierte datos sintéticos de benchmark en rankings, tendencias, comparativas y escenarios de previsión.'

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
    'panel benchmark',
    'producto de datos',
    'inteligencia de negocio',
    'React Recharts',
    'datos sintéticos',
    'panel reutilizable',
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
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Casos de estudio',
        item: `${siteConfig.url}/case-studies`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Benchmark Dashboard Template',
        item: `${siteConfig.url}/case-studies/benchmark-dashboard`,
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
}

export default function BenchmarkDashboardLayout({
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
          '@id': `${siteConfig.url}/#benchmark-dashboard-case-study`,
          headline: title,
          name: 'Benchmark Dashboard Template',
          description,
          url: absoluteRouteUrl('/case-studies/benchmark-dashboard'),
          mainEntityOfPage: absoluteRouteUrl('/case-studies/benchmark-dashboard'),
          image: absoluteUrl('/images/case-studies/case-studies-thumbnail.webp'),
          articleSection: 'Casos de estudio',
          keywords: [
            'panel benchmark',
            'producto de datos',
            'inteligencia de negocio',
            'React Recharts',
            'datos sintéticos',
          ],
        }}
      />
      {children}
    </>
  )
}
