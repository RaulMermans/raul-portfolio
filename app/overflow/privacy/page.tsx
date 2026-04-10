import { OverflowLegalPageView, getOverflowLegalMetadata } from '../overflow-legal-shared'

export const metadata = getOverflowLegalMetadata('privacy', 'es')

export default function OverflowPrivacyPage() {
  return <OverflowLegalPageView page="privacy" locale="es" />
}
