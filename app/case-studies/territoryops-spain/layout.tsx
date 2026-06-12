import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'TerritoryOps Spain — Atlas privado para decisiones inmobiliarias'
const description =
  'Caso de estudio de una consola interna local-first que organiza oportunidades inmobiliarias en España mediante mapa, tabla, pipeline y lógica de seguimiento.'

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/territoryops-spain',
  locale: 'es',
  image: {
    url: '/images/case-studies/case-studies-thumbnail.webp',
    alt: 'TerritoryOps Spain — caso de estudio de Raúl Mermans',
  },
  type: 'article',
  keywords: [
    'herramienta interna',
    'prototipo de producto',
    'operaciones inmobiliarias',
    'mapa Leaflet',
    'local-first',
    'inteligencia de negocio',
  ],
  absoluteTitle: true,
})

export default function TerritoryOpsSpainLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteRouteUrl('/case-studies/territoryops-spain')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Casos de estudio', item: `${siteConfig.url}/case-studies` },
      { '@type': 'ListItem', position: 3, name: 'TerritoryOps Spain', item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <StructuredData
        type="Article"
        data={{
          '@id': `${siteConfig.url}/#territoryops-spain-case-study`,
          headline: title,
          name: 'TerritoryOps Spain',
          description,
          url,
          mainEntityOfPage: url,
          image: absoluteUrl('/images/case-studies/case-studies-thumbnail.webp'),
          articleSection: 'Casos de estudio',
          keywords: ['herramienta interna', 'prototipo de producto', 'operaciones inmobiliarias', 'local-first'],
        }}
      />
      {children}
    </>
  )
}
