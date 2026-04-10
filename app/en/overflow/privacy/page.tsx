import { OverflowLegalPageView, getOverflowLegalMetadata } from '../../../overflow/overflow-legal-shared'

export const metadata = getOverflowLegalMetadata('privacy', 'en')

export default function EnglishOverflowPrivacyPage() {
  return <OverflowLegalPageView page="privacy" locale="en" />
}
