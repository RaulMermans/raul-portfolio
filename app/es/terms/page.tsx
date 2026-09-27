import type { Metadata } from 'next'
import TermsOfService from '../../terms/page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Términos de Servicio',
  description:
    'Términos de Servicio de Raúl Mermans sobre las reglas, limitaciones y responsabilidades aplicables al uso de este sitio portfolio.',
  path: '/terms',
  locale: 'es',
  noIndex: true,
})

export default function SpanishTermsOfServicePage() {
  return <TermsOfService />
}
