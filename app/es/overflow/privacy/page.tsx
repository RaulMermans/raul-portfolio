import { OverflowLegalPageView, getOverflowLegalMetadata } from '../../../overflow/overflow-legal-shared'

export const metadata = getOverflowLegalMetadata('privacy', 'es')

export default function SpanishOverflowPrivacyPage() {
  return <OverflowLegalPageView page="privacy" locale="es" />
}
