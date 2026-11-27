import type { Metadata } from 'next'
import { TechnicalPortfolio } from '@/components/PortfolioTracks'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Technical Portfolio',
  description: 'Software, AI systems, data products, and case studies by Raúl Mermans, with evidence and clear limits.',
  path: '/technical',
  locale: 'en',
  image: { url: '/images/case-studies/relay/cover-editorial.webp', alt: 'Relay project visual' },
})

export default function Page() { return <TechnicalPortfolio locale="en" /> }
