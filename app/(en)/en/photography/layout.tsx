import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Photography',
  description:
    'Photography by Raúl Mermans, edited into complete series on Morocco, the coast, and moments found on foot.',
  path: '/photography',
  locale: 'en',
  image: {
    url: '/images/photography/landscape/Landscape7.webp',
    alt: 'Sand dunes photographed by Raúl Mermans',
  },
  keywords: ['photography portfolio', 'editorial photography', 'brand photography'],
})

export default function EnglishPhotographyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="photography-layout">
      <StructuredData
        type="CollectionPage"
        data={{
          '@id': `${siteConfig.url}/#photography-page-en`,
          name: 'Photography by Raúl Mermans',
          description:
            'Photography by Raúl Mermans, edited into complete series on Morocco, the coast, and moments found on foot.',
          url: absoluteRouteUrl('/en/photography'),
        }}
      />
      {children}
    </div>
  )
}
