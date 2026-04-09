import type { Metadata } from 'next'
import AboutPage from '../../about/page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Sobre Mí',
  description:
    'Sobre Raúl Mermans: arquitecto de sistemas de IA aplicada que combina criterio creativo, diseño de automatizaciones y visión de producto.',
  path: '/about',
  locale: 'es',
  image: {
    url: '/images/about/profile.webp',
    alt: 'Retrato de Raúl Mermans',
  },
  type: 'profile',
  keywords: ['sobre Raúl Mermans', 'sistemas de IA aplicada', 'infraestructura creativa'],
})

export default function SpanishAboutPage() {
  return <AboutPage />
}
