import { OverflowLegalPageView, getOverflowLegalMetadata } from '../../../overflow/overflow-legal-shared'

export const metadata = getOverflowLegalMetadata('support', 'es')

export default function SpanishOverflowSupportPage() {
  return <OverflowLegalPageView page="support" locale="es" />
}
