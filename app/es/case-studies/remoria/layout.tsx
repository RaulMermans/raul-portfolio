import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Caso de Estudio de Remoria',
  description:
    'Caso de estudio de Remoria por Raúl Mermans, sobre cómo un sistema de marca, la contención visual y la infraestructura creativa escalan un mundo premium.',
  path: '/case-studies/remoria',
  locale: 'es',
  image: {
    url: '/images/case-studies/remoria/hero/hero.webp',
    alt: 'Caso de estudio de Remoria por Raúl Mermans',
  },
  type: 'article',
  keywords: ['caso de estudio de marca', 'dirección creativa', 'Remoria'],
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
        name: 'Remoria',
        item: `${siteConfig.url}/es/case-studies/remoria`,
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
}

export default function SpanishRemoriaLayout({
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
          '@id': `${siteConfig.url}/#remoria-case-study-es`,
          headline: 'Caso de Estudio de Remoria',
          name: 'Remoria',
          description:
            'Caso de estudio de Remoria por Raúl Mermans, sobre cómo un sistema de marca, la contención visual y la infraestructura creativa escalan un mundo premium.',
          url: absoluteRouteUrl('/es/case-studies/remoria'),
          mainEntityOfPage: absoluteRouteUrl('/es/case-studies/remoria'),
          image: absoluteUrl('/images/case-studies/remoria/hero/hero.webp'),
          articleSection: 'Casos de estudio',
          keywords: ['caso de estudio de marca', 'dirección creativa', 'Remoria'],
        }}
      />
      {children}
    </>
  )
}
