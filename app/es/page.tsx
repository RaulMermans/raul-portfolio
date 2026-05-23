import type { Metadata } from 'next'
import HomePage from '../page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Sistemas de IA Aplicada y Flujos con Agentes',
  description:
    'Raúl Mermans construye sistemas de IA aplicada, flujos con agentes y herramientas internas para marcas y equipos con lógica de producto e inteligencia de marca.',
  path: '/',
  locale: 'es',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Portfolio de Raúl Mermans',
  },
  keywords: ['sistemas de IA aplicada', 'flujos con agentes', 'herramientas internas de IA', 'inteligencia de marca'],
})

export default function SpanishHomePage() {
  return <HomePage />
}
