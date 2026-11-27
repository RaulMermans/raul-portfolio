import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Fotografía',
  description:
    'Fotografía de Raúl Mermans, editada en series completas sobre Marruecos, la costa y momentos encontrados a pie.',
  path: '/photography',
  locale: 'es',
  image: {
    url: '/images/photography/landscape/Landscape7.webp',
    alt: 'Dunas fotografiadas por Raúl Mermans',
  },
  keywords: ['portfolio de fotografía', 'fotografía editorial', 'fotografía de marca'],
})

export default function PhotographyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="photography-layout">
      <StructuredData
        type="CollectionPage"
        data={{
          '@id': `${siteConfig.url}/#photography-page-es`,
          name: 'Fotografía de Raúl Mermans',
          description:
            'Fotografía de Raúl Mermans, editada en series completas sobre Marruecos, la costa y momentos encontrados a pie.',
          url: absoluteRouteUrl('/photography'),
        }}
      />
      {children}
    </div>
  )
}
