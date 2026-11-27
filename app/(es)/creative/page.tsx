import type { Metadata } from 'next'
import { CreativePortfolio } from '@/components/PortfolioTracks'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Portfolio creativo',
  description: 'Fotografía en series, identidades y estudios visuales de Raúl Mermans, editados como una colección.',
  path: '/creative',
  locale: 'es',
  image: { url: '/images/photography/landscape/Landscape7.webp', alt: 'Fotografía de Marruecos de Raúl Mermans' },
})

export default function Page() { return <CreativePortfolio locale="es" /> }
