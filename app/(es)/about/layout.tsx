import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Sobre Mí',
  description:
    'Raúl Mermans construye entre IA, producto, datos y sistemas creativos, con una base en negocio y marketing y estudios actuales de Big Data.',
  path: '/about',
  locale: 'es',
  image: {
    url: '/images/about/profile.webp',
    alt: 'Retrato de Raúl Mermans',
  },
  type: 'profile',
  keywords: ['sobre Raúl Mermans', 'sistemas de IA', 'producto', 'datos', 'Big Data', 'sistemas de marca'],
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
