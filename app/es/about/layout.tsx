import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Sobre Mí',
  description:
    'Raúl Mermans usa código, datos, producto y criterio de marca para convertir problemas complejos en herramientas y experiencias usables.',
  path: '/about',
  locale: 'es',
  image: {
    url: '/images/about/profile.webp',
    alt: 'Retrato de Raúl Mermans',
  },
  type: 'profile',
  keywords: ['sobre Raúl Mermans', 'IA aplicada', 'producto', 'datos', 'CRM', 'sistemas de marca'],
})

export default function SpanishAboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
