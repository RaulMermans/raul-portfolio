import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Sobre Mí',
  description:
    'Sobre Raúl Mermans: diseño y construcción de sistemas de IA para equipos de marca y creatividad, desde estrategia hasta prototipos funcionales.',
  path: '/about',
  locale: 'es',
  image: {
    url: '/images/about/profile.webp',
    alt: 'Retrato de Raúl Mermans',
  },
  type: 'profile',
  keywords: ['sobre Raúl Mermans', 'CRM', 'sistemas de IA', 'sistemas de marca', 'prototipos de producto'],
})

export default function SpanishAboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
