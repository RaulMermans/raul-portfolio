import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Photography',
  description:
    'Photography by Raúl Mermans, showcasing the visual judgment, composition, and restraint that support his broader AI systems and creative work.',
  path: '/photography',
  image: {
    url: '/images/sections/photography-bg.webp',
    alt: 'Photography gallery by Raúl Mermans',
  },
  keywords: ['photography portfolio', 'editorial photography', 'brand photography'],
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
          '@id': `${siteConfig.url}/#photography-page`,
          name: 'Photography by Raúl Mermans',
          description:
            'Photography by Raúl Mermans, showcasing the visual judgment, composition, and restraint that support his broader AI systems and creative work.',
          url: absoluteRouteUrl('/photography'),
        }}
      />
      {children}
    </div>
  )
}
