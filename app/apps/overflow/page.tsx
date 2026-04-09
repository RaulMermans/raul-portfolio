import type { Metadata } from 'next'
import { OverflowPageView, getOverflowMetadata } from './overflow-page-shared'

export const metadata: Metadata = getOverflowMetadata()

export default function OverflowPage() {
  return <OverflowPageView locale="en" />
}
