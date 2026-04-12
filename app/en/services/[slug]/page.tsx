import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServicePageShared from '../../../services/service-page-shared'
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

  const service = getServicePageData('en', params.slug)

  return buildPageMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
    locale: 'en',
    keywords: [service.title.toLowerCase(), 'AI services', 'automation for brands'],
  })
}

export default function EnglishServiceRoutePage({ params }: ServiceRoutePageProps) {
  if (!isServiceSlug(params.slug)) {
    notFound()
  }

  return <ServicePageShared locale="en" slug={params.slug} />
}
