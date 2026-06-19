import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'Website Audit Agent — Flujo de Auditoría IA Basado en Evidencia'
const description =
  'Caso técnico de Website Audit Agent, un flujo de auditoría web basado en evidencia que separa scoring determinista y síntesis LLM acotada.'
const image = '/images/case-studies/website-auditor/thumb/thumb.webp'
const keywords = [
  'website audit agent',
  'flujo de auditoría IA',
  'scoring determinista',
  'síntesis LLM acotada',
  'inteligencia comercial',
  'sistema de IA basado en evidencia',
]

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/website-auditor',
  locale: 'es',
  image: {
    url: image,
    alt: 'Caso de estudio Website Audit Agent por Raúl Mermans',
  },
  type: 'article',
  keywords,
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
        name: 'Website Audit Agent',
        item: `${siteConfig.url}/es/case-studies/website-auditor`,
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
}

export default function SpanishWebsiteAuditorLayout({
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
          '@id': `${siteConfig.url}/#website-auditor-case-study-es`,
          headline: title,
          name: 'Website Audit Agent',
          description,
          url: absoluteRouteUrl('/es/case-studies/website-auditor'),
          mainEntityOfPage: absoluteRouteUrl('/es/case-studies/website-auditor'),
          image: absoluteUrl(image),
          articleSection: 'Casos de estudio',
          keywords,
        }}
      />
      {children}
    </>
  )
}
