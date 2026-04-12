import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Sobre Mí',
  description:
    'Sobre Raúl Mermans: arquitecto de sistemas de IA que combina lógica de negocio, implementación práctica y criterio creativo para equipos reales.',
  path: '/about',
  locale: 'es',
  image: {
    url: '/images/about/profile.webp',
    alt: 'Retrato de Raúl Mermans',
  },
  type: 'profile',
  keywords: ['sobre Raúl Mermans', 'sistemas de IA', 'automatización para equipos', 'criterio creativo'],
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
