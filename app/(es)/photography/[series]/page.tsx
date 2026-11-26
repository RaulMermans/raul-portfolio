import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PhotographyEssay } from '@/components/PhotographyExperience'
import { getPhotographySeries, PHOTOGRAPHY_SERIES } from '@/data/photography-series'
import { buildPageMetadata } from '@/lib/metadata'

type Props = { params: Promise<{ series: string }> }

export function generateStaticParams() {
  return PHOTOGRAPHY_SERIES.map((series) => ({ series: series.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { series: slug } = await params
  const series = getPhotographySeries(slug)
  if (!series) notFound()
  return buildPageMetadata({
    title: `${series.title.es} | Fotografía de Raúl Mermans`,
    description: series.deck.es,
    path: `/photography/${slug}`,
    locale: 'es',
    image: { url: series.photos[0].src, alt: series.photos[0].alt.es },
  })
}

export default async function PhotographySeriesPage({ params }: Props) {
  const { series: slug } = await params
  const series = getPhotographySeries(slug)
  if (!series) notFound()
  return <PhotographyEssay locale="es" series={series} />
}
