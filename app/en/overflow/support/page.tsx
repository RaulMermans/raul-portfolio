import { OverflowLegalPageView, getOverflowLegalMetadata } from '../../../overflow/overflow-legal-shared'

export const metadata = getOverflowLegalMetadata('support', 'en')

export default function EnglishOverflowSupportPage() {
  return <OverflowLegalPageView page="support" locale="en" />
}
