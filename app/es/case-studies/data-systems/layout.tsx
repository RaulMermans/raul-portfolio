import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Inteligencia de Negocio',
  description:
    'Casos de estudio de sistemas de datos e inteligencia de negocio de Raúl Mermans: dashboards, benchmarks e interfaces de lectura estratégica que convierten datos en decisiones claras.',
  path: '/case-studies/data-systems',
  locale: 'es',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Casos de estudio de sistemas de datos por Raúl Mermans',
  },
  keywords: ['sistemas de datos', 'inteligencia de negocio', 'dashboards', 'benchmark'],
})

export default function SpanishDataSystemsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
