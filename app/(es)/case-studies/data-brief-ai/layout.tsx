import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'DataBrief AI — Flujo de Analítica con IA Acotada'
const description =
  'Caso técnico de DataBrief AI, un flujo de analítica con IA acotada que convierte CSV/XLSX en informes de negocio fundamentados.'

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/data-brief-ai',
  locale: 'es',
  image: {
    url: '/images/case-studies/data-brief-ai/thumb/thumb.webp',
    alt: 'DataBrief AI case study by Raúl Mermans',
  },
  type: 'article',
  keywords: [
    'DataBrief AI',
    'flujo de IA acotado',
    'analítica con IA',
    'ejecución Python controlada',
    'detección semántica de roles',
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
        name: 'DataBrief AI',
        item: `${siteConfig.url}/case-studies/data-brief-ai`,
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
}

export default function DataBriefAiLayout({
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
          '@id': `${siteConfig.url}/#data-brief-ai-case-study`,
          headline: title,
          name: 'DataBrief AI',
          description,
          url: absoluteRouteUrl('/case-studies/data-brief-ai'),
          mainEntityOfPage: absoluteRouteUrl('/case-studies/data-brief-ai'),
          image: absoluteUrl('/images/case-studies/data-brief-ai/thumb/thumb.webp'),
          articleSection: 'Casos de estudio',
          keywords: [
            'DataBrief AI',
            'flujo de analítica con IA acotada',
            'ejecución Python controlada',
            'detección semántica de roles',
          ],
        }}
      />
      {children}
    </>
  )
}
