import type { Metadata } from 'next'
import { TechnicalPortfolio } from '@/components/PortfolioTracks'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Portfolio técnico',
  description: 'Software, sistemas de IA, productos de datos y casos de estudio de Raúl Mermans, con evidencia y límites claros.',
  path: '/technical',
  locale: 'es',
  image: { url: '/images/case-studies/relay/cover-editorial.webp', alt: 'Visual del proyecto Relay' },
})

export default function Page() { return <TechnicalPortfolio locale="es" /> }
