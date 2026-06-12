import type { Metadata } from 'next'
import { AppDetailPageView, getAppDetailMetadata } from '../app-detail-shared'

export const metadata: Metadata = getAppDetailMetadata('territoryops-spain', 'es')

export default function TerritoryOpsSpainAppPage() {
  return <AppDetailPageView params={{ slug: 'territoryops-spain' }} locale="es" />
}
