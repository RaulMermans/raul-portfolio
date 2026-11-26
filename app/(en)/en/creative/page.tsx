import type { Metadata } from 'next'
import { CreativePortfolio } from '@/components/PortfolioTracks'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Creative Portfolio',
  description: 'Photography in series, identities, and visual studies by Raúl Mermans, edited as a collection.',
  path: '/creative',
  locale: 'en',
  image: { url: '/images/photography/landscape/Landscape7.webp', alt: 'Raúl Mermans photograph of Morocco' },
})

export default function Page() { return <CreativePortfolio locale="en" /> }
