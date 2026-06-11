import type { Metadata } from 'next'
import HomePage from '../page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Integraciones de IA para Sistemas Creativos, Flujos de Marca y Ejecución Cultural',
  description:
    'Sistemas de IA aplicada, capas de automatización y herramientas internas para equipos creativos, marcas y proyectos culturales que necesitan ejecutar más rápido con criterio, control y coherencia de marca.',
  path: '/',
  locale: 'es',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Portfolio de Raúl Mermans',
  },
  keywords: ['sistemas creativos con IA', 'integraciones de IA', 'flujos de marca', 'herramientas creativas internas', 'sistemas de campaña con IA', 'inteligencia de marca'],
})

export default function SpanishHomePage() {
  return <HomePage />
}
