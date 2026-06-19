import type { Metadata } from 'next'
import {
  AppDetailPageView,
  type AppPageProps,
  getAppDetailMetadata,
  getAppStaticParams,
} from '../app-detail-shared'

export const dynamicParams = false

export function generateStaticParams() {
  return getAppStaticParams()
}

export function generateMetadata({ params }: AppPageProps): Metadata {
  return getAppDetailMetadata(params.slug, 'es')
}

export default function AppDetailPage(props: AppPageProps) {
  return <AppDetailPageView {...props} locale="es" />
}
