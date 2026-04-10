import { OverflowLegalPageView, getOverflowLegalMetadata } from '../../../overflow/overflow-legal-shared'

export const metadata = getOverflowLegalMetadata('terms', 'en')

export default function EnglishOverflowTermsPage() {
  return <OverflowLegalPageView page="terms" locale="en" />
}
