import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Visuales',
  description:
    'Visuales con IA, portadas y conceptos visuales de Raúl Mermans, mostrando los sistemas de imagen y la experimentación creativa detrás de su práctica.',
  path: '/visuals',
  locale: 'es',
  image: {
    url: '/images/sections/visuals-bg.webp',
    alt: 'Visuales con IA de Raúl Mermans',
  },
  keywords: ['visuales con IA', 'portadas', 'conceptos visuales', 'experimentos creativos'],
})

export default function SpanishVisualsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <StructuredData
        type="CollectionPage"
        data={{
          '@id': `${siteConfig.url}/#visuals-page-es`,
          name: 'Visuales de Raúl Mermans',
          description:
            'Visuales con IA, portadas y conceptos visuales de Raúl Mermans, mostrando los sistemas de imagen y la experimentación creativa detrás de su práctica.',
          url: absoluteRouteUrl('/es/visuals'),
        }}
      />
      {children}
    </>
  )
}
