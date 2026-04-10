import { OverflowLegalPageView, getOverflowLegalMetadata } from '../overflow-legal-shared'

export const metadata = getOverflowLegalMetadata('support', 'es')

export default function OverflowSupportPage() {
  return <OverflowLegalPageView page="support" locale="es" />
}
