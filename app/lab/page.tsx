import type { Metadata } from 'next'
import LabPageShared from './lab-page-shared'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Lab',
  description:
    'Archivo de productos, experimentos, visuales y trabajo paralelo de Raúl Mermans, separado del recorrido principal de consultoría.',
  path: '/lab',
  locale: 'es',
  keywords: ['lab', 'experimentos', 'apps', 'productos'],
})

export default function LabPage() {
  return <LabPageShared locale="es" />
}
