import type { Metadata } from 'next'
import { AppsPageView, getAppsPageMetadata } from './apps-page-shared'

export const metadata: Metadata = getAppsPageMetadata()

export default function AppsPage() {
  return <AppsPageView locale="en" />
}
