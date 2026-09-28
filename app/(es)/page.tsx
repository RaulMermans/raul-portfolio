import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Raúl Mermans | Sistemas de IA, productos y estrategia creativa',
  description:
    'Raúl Mermans construye sistemas de IA, productos digitales y herramientas de inteligencia de negocio junto con marcas, proyectos propios y trabajo creativo.',
  path: '/',
  locale: 'es',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Portfolio de Raúl Mermans',
  },
  keywords: ['estrategia de marca', 'dirección creativa', 'productos digitales', 'sistemas creativos'],
  absoluteTitle: true,
})


export default function Page() {
  return <HomePage locale="es" />
}
