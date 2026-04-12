import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServicePageShared from '../service-page-shared'
import { getServicePageData, isServiceSlug, serviceSlugs } from '@/data/services'
import { buildPageMetadata } from '@/lib/metadata'

interface ServiceRoutePageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: ServiceRoutePageProps): Metadata {
  if (!isServiceSlug(params.slug)) {
    return {}
  }

  const service = getServicePageData('es', params.slug)

  return buildPageMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
    locale: 'es',
    keywords: [service.title.toLowerCase(), 'servicios de IA', 'automatización para marcas'],
  })
}

export default function ServiceRoutePage({ params }: ServiceRoutePageProps) {
  if (!isServiceSlug(params.slug)) {
    notFound()
  }

  return <ServicePageShared locale="es" slug={params.slug} />
}
