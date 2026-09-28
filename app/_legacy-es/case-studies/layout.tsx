import type { Metadata } from 'next'
import '@/styles/case-study-new.css'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Casos de Estudio',
  description:
    'Casos de estudio de Raúl Mermans sobre campañas, inteligencia de marketing, productos digitales, marca, dirección visual y herramientas asistidas por IA.',
  path: '/case-studies',
  locale: 'es',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Casos de estudio de Raúl Mermans',
  },
  keywords: ['casos de estudio', 'estrategia creativa', 'inteligencia de marketing', 'productos digitales', 'dirección visual', 'herramientas asistidas por IA'],
})

export default function SpanishCaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
