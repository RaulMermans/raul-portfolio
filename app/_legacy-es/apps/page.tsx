import { AppsPageView, getAppsPageMetadata } from '@/app/(es)/apps/apps-page-shared'

export const metadata = getAppsPageMetadata('es')

export default function SpanishAppsPage() {
  return <AppsPageView locale="es" />
}
