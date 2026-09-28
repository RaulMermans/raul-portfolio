import type { Metadata } from 'next'
import '@/styles/case-study-new.css'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Casos de Estudio',
  description:
    'Sistemas propios de IA, inteligencia de negocio, productos digitales y trabajo creativo de Raúl Mermans, con arquitectura, evidencia y límites explícitos.',
  path: '/case-studies',
  locale: 'es',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Casos de estudio de Raúl Mermans',
  },
  keywords: ['casos de estudio', 'sistemas de IA', 'sistemas de marca'],
})

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
