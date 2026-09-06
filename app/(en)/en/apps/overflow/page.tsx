import type { Metadata } from 'next'
import { OverflowPageView, getOverflowMetadata } from '../../../../(es)/apps/overflow/overflow-page-shared'

export const metadata: Metadata = getOverflowMetadata('en')

export default function EnglishOverflowPage() {
  return <OverflowPageView locale="en" />
}
