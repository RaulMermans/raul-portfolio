import type { Metadata } from 'next'
import {
  AppDetailPageView,
  type AppRoutePageProps,
  getAppDetailMetadata,
  getAppStaticParams,
} from '../app-detail-shared'

export const dynamicParams = false

export function generateStaticParams() {
  return getAppStaticParams()
}

export async function generateMetadata({ params }: AppRoutePageProps): Promise<Metadata> {
  const { slug } = await params
  return getAppDetailMetadata(slug, 'es')
}

export default async function AppDetailPage({ params }: AppRoutePageProps) {
  return <AppDetailPageView params={await params} locale="es" />
}
