import type { Metadata } from 'next'
import HomePage from '../page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Sistemas de IA y Dirección Creativa',
  description:
    'Raúl Mermans diseña sistemas de IA, automatizaciones y capas de producto para marcas modernas con criterio creativo y ejecución calmada.',
  path: '/',
  locale: 'es',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Portfolio de Raúl Mermans',
  },
  keywords: ['sistemas de IA', 'automatización', 'dirección creativa', 'portfolio'],
})

export default function SpanishHomePage() {
  return <HomePage />
}
