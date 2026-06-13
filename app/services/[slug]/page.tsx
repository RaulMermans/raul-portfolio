import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceLandingPage from '@/components/services/ServiceLandingPage'
import { getServiceLanding, getServiceLandings } from '@/data/service-landings'
import { absoluteRouteUrl, buildPageMetadata } from '@/lib/metadata'

type ServicePageProps = {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return getServiceLandings('es').map((service) => ({
    slug: service.slug,
  }))
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getServiceLanding('es', params.slug)

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
        'es-ES': absoluteRouteUrl(service.href),
        'en-US': absoluteRouteUrl(service.alternateHref),
      },
    },
  }
}

export default function SpanishServicePage({ params }: ServicePageProps) {
  const service = getServiceLanding('es', params.slug)

  if (!service) {
    notFound()
  }

  return <ServiceLandingPage service={service} />
}
