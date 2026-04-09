import type { Metadata } from 'next'
import PrivacyPolicy from '../../privacy/page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Política de Privacidad',
  description:
    'Política de Privacidad de Raúl Mermans sobre cómo se recopilan, usan y protegen las solicitudes de contacto, los datos analíticos y la información personal.',
  path: '/privacy',
  locale: 'es',
  noIndex: true,
})

export default function SpanishPrivacyPolicyPage() {
  return <PrivacyPolicy />
}
