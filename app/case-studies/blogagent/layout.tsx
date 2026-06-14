import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'BlogAgent — Flujo editorial con IA | Raúl Mermans'
const description =
  'Flujo editorial con IA para generar borradores de blog copy-ready, con investigación, validación de candidatos, revisión y control humano.'
const image = '/images/case-studies/blogagent/thumb/thumb.svg'
const keywords = [
  'BlogAgent',
  'agentic workflow',
  'LLM systems',
  'editorial AI',
  'source-aware drafting',
  'human-in-the-loop',
  'Python',
  'FastAPI',
]

const baseMetadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/blogagent',
  locale: 'es',
  image: {
    url: image,
    alt: 'BlogAgent, flujo editorial con IA',
    width: 1600,
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

export default function BlogAgentLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteRouteUrl('/case-studies/blogagent')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Casos de estudio', item: `${siteConfig.url}/case-studies` },
      { '@type': 'ListItem', position: 3, name: 'BlogAgent', item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <StructuredData
        type="Article"
        data={{
          '@id': `${siteConfig.url}/#blogagent-case-study`,
          headline: title,
          name: 'BlogAgent',
          description,
          url,
          mainEntityOfPage: url,
          image: absoluteUrl(image),
          articleSection: 'Casos de estudio',
          keywords,
          datePublished: '2026-06-14',
          dateModified: '2026-06-14',
        }}
      />
      {children}
    </>
  )
}
