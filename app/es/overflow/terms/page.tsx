import { OverflowLegalPageView, getOverflowLegalMetadata } from '../../../overflow/overflow-legal-shared'

export const metadata = getOverflowLegalMetadata('terms', 'es')

export default function SpanishOverflowTermsPage() {
  return <OverflowLegalPageView page="terms" locale="es" />
}
