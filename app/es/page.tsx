import type { Metadata } from 'next'
import HomePage from '../page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Sistemas de IA para Equipos de Marca y Creatividad',
  description:
    'Raúl Mermans diseña y construye sistemas de IA para equipos de marca y creatividad, desde la estrategia de flujos y el diseño de interfaz hasta herramientas internas funcionales.',
  path: '/',
  locale: 'es',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Portfolio de Raúl Mermans',
  },
  keywords: ['sistemas creativos con IA', 'integraciones de IA', 'flujos de marca', 'herramientas creativas internas', 'sistemas de campaña con IA', 'sistemas de marca'],
})

export default function SpanishHomePage() {
  return <HomePage />
}
