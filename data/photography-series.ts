import { PHOTOGRAPHY_IMAGES, type PhotographyPhoto } from '@/data/photography'
import type { Locale } from '@/lib/i18n'

type Localized = Record<Locale, string>

export interface PhotographySeries {
  slug: string
  coverLayout: 'split' | 'panorama'
  title: Localized
  deck: Localized
  photos: PhotographyPhoto[]
}

const landscape = (number: number) => PHOTOGRAPHY_IMAGES.landscape[number - 1]
const building = (number: number) => PHOTOGRAPHY_IMAGES.architecture[number - 1]
const street = (number: number) => PHOTOGRAPHY_IMAGES.street.find((photo) => photo.src.endsWith(`/Street${number}.webp`))!
const golden = (number: number) => PHOTOGRAPHY_IMAGES.golden[number - 1]
const coast = (number: number) => PHOTOGRAPHY_IMAGES.coast[number - 1]

export const PHOTOGRAPHY_SERIES: readonly PhotographySeries[] = [
  {
    slug: 'morocco',
    coverLayout: 'split',
    title: { en: 'Morocco', es: 'Marruecos' },
    deck: {
      en: 'A journey between open ground, lived-in streets, and the last light on walls.',
      es: 'Un recorrido entre espacios abiertos, calles habitadas y la última luz sobre los muros.',
    },
    photos: [
      landscape(7), landscape(8), street(9), building(7), landscape(10),
      street(10), building(6), landscape(11), street(11), building(8),
      landscape(12), street(12), street(13), building(9), street(14),
      landscape(6), street(15), landscape(9), building(13), street(8),
      landscape(16),
    ],
  },
  {
    slug: 'the-waterline',
    coverLayout: 'panorama',
    title: { en: 'The Waterline', es: 'La línea del agua' },
    deck: {
      en: 'The sea and its horizon, seen from shore, cliff, and open water.',
      es: 'El mar y su horizonte, desde la orilla, el acantilado y el agua abierta.',
    },
    photos: [
      landscape(18), street(22), landscape(14), landscape(5),
      street(7), landscape(4), street(17), landscape(15), coast(5),
      coast(1), coast(2), coast(8), coast(6), coast(7),
    ],
  },
  {
    slug: 'golden',
    coverLayout: 'split',
    title: { en: 'Golden', es: 'Golden' },
    deck: {
      en: 'Low sun, silhouettes, and light moving across the sea.',
      es: 'Sol bajo, siluetas y luz sobre el mar.',
    },
    photos: [golden(1), golden(2), golden(3), golden(5), golden(4)],
  },
]

export function getPhotographySeries(slug: string) {
  return PHOTOGRAPHY_SERIES.find((series) => series.slug === slug)
}
