import type { Metadata } from 'next'
import {
  AppDetailPageView,
  type AppPageProps,
  getAppDetailMetadata,
  getAppStaticParams,
} from '../../../apps/app-detail-shared'

export const dynamicParams = false

export function generateStaticParams() {
  return getAppStaticParams()
}

export function generateMetadata({ params }: AppPageProps): Metadata {
  return getAppDetailMetadata(params.slug, 'en')
}

export default function EnglishAppDetailPage(props: AppPageProps) {
  return <AppDetailPageView {...props} locale="en" />
}
