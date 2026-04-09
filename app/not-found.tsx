import type { Metadata } from 'next'
import NotFoundExperience from '@/components/NotFoundExperience'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Página no encontrada',
  description:
    'La página solicitada no se encontró. Explora casos de estudio, apps y trabajo en sistemas de IA de Raúl Mermans.',
  path: '/404',
  canonicalPath: '/404',
  noIndex: true,
  absoluteTitle: true,
})

export default function NotFound() {
  return <NotFoundExperience />
}
