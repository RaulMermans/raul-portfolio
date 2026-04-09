import type { Metadata } from 'next'
import { AppsPageView, getAppsPageMetadata } from '../../apps/apps-page-shared'

export const metadata: Metadata = getAppsPageMetadata('en')

export default function EnglishAppsPage() {
  return <AppsPageView locale="en" />
}
