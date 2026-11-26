import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Raúl Mermans | Portfolio técnico y creativo',
  description:
    'Conoce a Raúl Mermans y elige entre su portfolio técnico de software, IA y datos, o su portfolio creativo de fotografía e identidad visual.',
  path: '/',
  locale: 'es',
  image: {
    url: '/images/photography/landscape/Landscape18.webp',
    alt: 'Velero en un mar brumoso al atardecer, fotografiado por Raúl Mermans',
  },
  keywords: ['Raúl Mermans', 'portfolio técnico', 'portfolio creativo', 'sistemas de IA', 'fotografía'],
  absoluteTitle: true,
})


export default function Page() {
  return <HomePage locale="es" />
}
