import type { Metadata } from 'next'
import { AppsPageView, getAppsPageMetadata } from './apps-page-shared'

export const metadata: Metadata = getAppsPageMetadata('es')

export default function AppsPage() {
  return <AppsPageView locale="es" />
}
