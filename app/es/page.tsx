import type { Metadata } from 'next'
import HomePage from '../page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Estrategia Creativa entre Marca, Marketing, Cultura, Datos y Tecnología',
  description:
    'Raúl Mermans es un estratega creativo multidisciplinar que trabaja entre marca, marketing, cultura, datos, diseño, productos digitales y tecnología emergente.',
  path: '/',
  locale: 'es',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Portfolio de Raúl Mermans',
  },
  keywords: ['estrategia creativa', 'estrategia de marca', 'estrategia de marketing', 'datos y analítica', 'dirección creativa', 'IA y tecnología emergente'],
})

export default function SpanishHomePage() {
  return <HomePage />
}
