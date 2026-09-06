import { OverflowLegalPageView, getOverflowLegalMetadata } from '../../../../(es)/overflow/overflow-legal-shared'

export const metadata = getOverflowLegalMetadata('privacy', 'en')

export default function EnglishOverflowPrivacyPage() {
  return <OverflowLegalPageView page="privacy" locale="en" />
}
