import {
  AppDetailPageView,
  getAppDetailMetadata,
  getAppStaticParams,
} from '../../../apps/app-detail-shared'

interface AppPageProps {
  params: {
    slug: string
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  return getAppStaticParams()
}

export function generateMetadata({ params }: AppPageProps) {
  return getAppDetailMetadata(params.slug, 'es')
}

export default function SpanishAppDetailPage(props: AppPageProps) {
  return <AppDetailPageView {...props} locale="es" />
}
