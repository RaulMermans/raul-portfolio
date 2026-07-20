import type { Metadata } from 'next'
import HomePage from '../page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Raul Mermans — Emprendedor y creador',
  description:
    'Raul Mermans construye marcas, productos y nuevos proyectos entre la cultura, el negocio, la narrativa y la tecnología.',
  path: '/',
  locale: 'es',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Portfolio de Raúl Mermans',
  },
  keywords: ['emprendedor', 'creador', 'marcas', 'productos', 'nuevos proyectos'],
  absoluteTitle: true,
})

export default function SpanishHomePage() {
  return <HomePage />
}
