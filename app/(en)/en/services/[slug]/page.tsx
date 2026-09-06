import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceLandingPage from '@/components/services/ServiceLandingPage'
import { getServiceLanding, getServiceLandings } from '@/data/service-landings'
import { absoluteRouteUrl, buildPageMetadata } from '@/lib/metadata'

type ServicePageProps = {
  params: Promise<{
    slug: string
  }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return getServiceLandings('en').map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceLanding('en', slug)

  if (!service) {
    return {}
  }

  const metadata = buildPageMetadata({
    title: service.title,
    description: service.metaDescription,
    path: service.href,
    locale: service.locale,
    keywords: service.keywords,
    absoluteTitle: true,
  })

  return {
    ...metadata,
    title: { absolute: service.metaTitle },
    openGraph: metadata.openGraph
      ? {
          ...metadata.openGraph,
          title: service.metaTitle,
          url: absoluteRouteUrl(service.href),
        }
      : undefined,
    twitter: metadata.twitter
      ? {
          ...metadata.twitter,
          title: service.metaTitle,
        }
      : undefined,
    alternates: {
      canonical: absoluteRouteUrl(service.href),
      languages: {
        'en-US': absoluteRouteUrl(service.href),
        'es-ES': absoluteRouteUrl(service.alternateHref),
        'x-default': absoluteRouteUrl(service.alternateHref),
      },
    },
  }
}

export default async function EnglishServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceLanding('en', slug)

  if (!service) {
    notFound()
  }

  return <ServiceLandingPage service={service} />
}
