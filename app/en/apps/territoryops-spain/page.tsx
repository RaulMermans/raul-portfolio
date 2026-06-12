import type { Metadata } from 'next'
import { AppDetailPageView, getAppDetailMetadata } from '../../../apps/app-detail-shared'

export const metadata: Metadata = getAppDetailMetadata('territoryops-spain', 'en')

export default function EnglishTerritoryOpsSpainAppPage() {
  return <AppDetailPageView params={{ slug: 'territoryops-spain' }} locale="en" />
}
