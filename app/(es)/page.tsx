import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Raúl Mermans | Sistemas de IA, Producto y Datos',
  description:
    'Raúl Mermans construye sistemas de IA, productos de datos y herramientas de apoyo a decisiones con criterio de negocio, ejecución técnica y dirección creativa.',
  path: '/',
  locale: 'es',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Portfolio de Raúl Mermans',
  },
  keywords: ['sistemas de IA', 'producto', 'datos', 'inteligencia para la decisión', 'estrategia creativa'],
  absoluteTitle: true,
})


export default function Page() {
  return <HomePage locale="es" />
}
