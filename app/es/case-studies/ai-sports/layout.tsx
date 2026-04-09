import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Caso de Estudio de Campaña Deportiva con IA',
  description:
    'Caso de estudio de campaña deportiva con IA por Raúl Mermans, mostrando un sistema de imágenes con n8n para casting, estilismo y dirección consistentes.',
  path: '/case-studies/ai-sports',
  locale: 'es',
  image: {
    url: '/images/case-studies/ai-sports/hero/hero.webp',
    alt: 'Caso de estudio AI Sports Campaign por Raúl Mermans',
  },
  type: 'article',
  keywords: ['campaña con IA', 'automatización n8n', 'sistema de imágenes'],
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
        name: 'AI Sports Campaign',
        item: `${siteConfig.url}/es/case-studies/ai-sports`,
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
}

export default function SpanishAISportsCampaignLayout({
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
          '@id': `${siteConfig.url}/#ai-sports-case-study-es`,
          headline: 'Caso de Estudio de Campaña Deportiva con IA',
          name: 'AI Sports Campaign',
          description:
            'Caso de estudio de campaña deportiva con IA por Raúl Mermans, mostrando un sistema de imágenes con n8n para casting, estilismo y dirección consistentes.',
          url: absoluteRouteUrl('/es/case-studies/ai-sports'),
          mainEntityOfPage: absoluteRouteUrl('/es/case-studies/ai-sports'),
          image: absoluteUrl('/images/case-studies/ai-sports/hero/hero.webp'),
          articleSection: 'Casos de estudio',
          keywords: ['campaña con IA', 'automatización n8n', 'sistema de imágenes'],
        }}
      />
      {children}
    </>
  )
}
