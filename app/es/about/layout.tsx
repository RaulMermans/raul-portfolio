import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Sobre Mí',
  description:
    'Sobre Raúl Mermans: estratega creativo multidisciplinar entre marca, marketing, cultura, datos, diseño, productos digitales y tecnología emergente.',
  path: '/about',
  locale: 'es',
  image: {
    url: '/images/about/profile.webp',
    alt: 'Retrato de Raúl Mermans',
  },
  type: 'profile',
  keywords: ['sobre Raúl Mermans', 'estrategia creativa', 'marketing', 'marca', 'datos', 'dirección creativa'],
})

export default function SpanishAboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
