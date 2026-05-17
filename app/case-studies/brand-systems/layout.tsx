import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Sistemas de Marca',
  description:
    'Casos de estudio de sistemas de marca de Raúl Mermans: identidades, reglas visuales y lógica de marca diseñadas para escalar con precisión y coherencia.',
  path: '/case-studies/brand-systems',
  locale: 'es',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Casos de estudio de sistemas de marca por Raúl Mermans',
  },
  keywords: ['sistemas de marca', 'identidad visual', 'dirección creativa', 'branding'],
})

export default function BrandSystemsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
