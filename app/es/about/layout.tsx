import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Sobre Mí',
  description:
    'Sobre Raúl Mermans: constructor de sistemas de IA aplicada con lógica de producto, inteligencia de marca y criterio creativo.',
  path: '/about',
  locale: 'es',
  image: {
    url: '/images/about/profile.webp',
    alt: 'Retrato de Raúl Mermans',
  },
  type: 'profile',
  keywords: ['sobre Raúl Mermans', 'sistemas de IA aplicada', 'inteligencia de marca'],
})

export default function SpanishAboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
