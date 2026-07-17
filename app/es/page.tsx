import type { Metadata } from 'next'
import HomePage from '../page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'IA, Producto, Datos y Sistemas de Marca',
  description:
    'Raúl Mermans construye productos con IA, herramientas de decisión y sistemas de marca entre negocio, tecnología y cultura.',
  path: '/',
  locale: 'es',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Portfolio de Raúl Mermans',
  },
  keywords: ['IA aplicada', 'productos digitales', 'inteligencia de datos', 'sistemas CRM', 'sistemas de marca'],
})

export default function SpanishHomePage() {
  return <HomePage />
}
