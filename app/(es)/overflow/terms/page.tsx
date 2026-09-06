import { OverflowLegalPageView, getOverflowLegalMetadata } from '../overflow-legal-shared'

export const metadata = getOverflowLegalMetadata('terms', 'es')

export default function OverflowTermsPage() {
  return <OverflowLegalPageView page="terms" locale="es" />
}
