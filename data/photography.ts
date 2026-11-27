export type PhotographyCategory = 'landscape' | 'architecture' | 'street'

export interface PhotographyPhoto {
  src: string
  alt: Record<'en' | 'es', string>
  category: PhotographyCategory
  width: number
  height: number
}

const RESPONSIVE_WIDTHS = [480, 768, 1200, 1600, 2400] as const

export function getPhotoDerivatives(photo: PhotographyPhoto, format: 'avif' | 'webp') {
  const derivativeBase = photo.src
    .replace('/images/photography/', '/images/derived/photography/')
    .replace(/\.webp$/, '')

  return RESPONSIVE_WIDTHS
    .filter((width) => width <= photo.width)
    .map((width) => `${derivativeBase}-${width}.${format} ${width}w`)
    .join(', ')
}

const landscapeMeta = [
  [1, 2080, 3120],
  [2, 1979, 2969],
  [3, 3120, 2080],
  [4, 1925, 2888],
  [5, 3108, 2072],
  [6, 2080, 3120],
  [7, 2080, 3120],
  [8, 2014, 3021],
  [9, 1923, 2885],
  [10, 3120, 1740],
  [11, 3044, 2029],
  [12, 3068, 2045],
  [13, 3120, 2080],
  [14, 3100, 1796],
  [15, 3104, 2069],
  [16, 2080, 3120],
  [17, 2080, 3120],
  [18, 3120, 2080],
] as const

const architectureMeta = [
  [1, 2041, 3061],
  [2, 4160, 6240],
  [3, 2031, 3047],
  [4, 2080, 3120],
  [5, 2080, 3120],
  [6, 2080, 3120],
  [7, 1721, 2581],
  [8, 2065, 3097],
  [9, 1967, 2973],
  [10, 2079, 3119],
  [11, 4160, 6240],
  [12, 2021, 3031],
  [13, 2080, 3120],
  [14, 2080, 3120],
  [15, 1942, 2861],
  [16, 2080, 3120],
] as const

const streetMeta = [
  [1, 1999, 2999],
  [2, 2080, 3120],
  [3, 3120, 2080],
  [4, 2080, 3120],
  [5, 2080, 3120],
  [6, 2043, 3065],
  [7, 2024, 3036],
  [8, 2080, 3120],
  [9, 2080, 3120],
  [10, 2080, 3120],
  [11, 2024, 3036],
  [12, 2074, 3111],
  [13, 2080, 3120],
  [14, 2043, 3065],
  [15, 2892, 1928],
  [17, 2080, 2730],
  [18, 2080, 3120],
  [19, 2914, 1943],
  [20, 2080, 3120],
  [21, 2011, 3016],
  [22, 1939, 2619],
  [23, 2080, 3120],
  [24, 2080, 3120],
  [25, 2080, 3120],
  [26, 2015, 3022],
] as const

function buildPhotos(
  category: PhotographyCategory,
  folderName: string,
  filePrefix: string,
  meta: readonly (readonly [number, number, number])[]
): PhotographyPhoto[] {
  return meta.map(([index, width, height]) => ({
    src: `/images/photography/${folderName}/${filePrefix}${index}.webp`,
    alt: buildPhotoAlt(category, width, height),
    category,
    width,
    height,
  }))
}

function buildPhotoAlt(
  category: PhotographyCategory,
  width: number,
  height: number
): Record<'en' | 'es', string> {
  const framing = width > height ? 'wide' : 'vertical'
  const encuadre = width > height ? 'Encuadre amplio' : 'Encuadre vertical'

  if (category === 'landscape') {
    return {
      en: `${framing} landscape study of land, light, and distance.`,
      es: `${encuadre} de paisaje que estudia terreno, luz y distancia.`,
    }
  }

  if (category === 'architecture') {
    return {
      en: `${framing} architectural study of structure, light, and scale.`,
      es: `${encuadre} de arquitectura que estudia estructura, luz y escala.`,
    }
  }

  return {
    en: `${framing} street photograph of an everyday urban scene.`,
    es: `${encuadre} de una escena urbana cotidiana.`,
  }
}

export const PHOTOGRAPHY_IMAGES = {
  landscape: buildPhotos('landscape', 'landscape', 'Landscape', landscapeMeta),
  architecture: buildPhotos('architecture', 'architecture', 'Arquitecture', architectureMeta),
  street: buildPhotos('street', 'street', 'Street', streetMeta),
  golden: [
    {
      src: '/images/photography/golden/DSCF9773.webp',
      alt: { en: 'A fisherman silhouetted against a gold sky and the sea.', es: 'Un pescador recortado contra el cielo dorado y el mar.' },
      category: 'landscape', width: 2049, height: 3073,
    },
    {
      src: '/images/photography/golden/DSCF9772.webp',
      alt: { en: 'The low sun reflected across the water beyond a dark shore.', es: 'El sol bajo reflejado en el agua tras una orilla oscura.' },
      category: 'landscape', width: 2036, height: 3054,
    },
    {
      src: '/images/photography/golden/DSCF9785.webp',
      alt: { en: 'Sunlight scattered across small waves.', es: 'La luz del sol dispersa sobre las olas pequeñas.' },
      category: 'landscape', width: 2080, height: 3120,
    },
    {
      src: '/images/photography/golden/DSCF9775.webp',
      alt: { en: 'A cargo ship on the horizon beneath a fading peach sky.', es: 'Un carguero en el horizonte bajo un cielo color melocotón.' },
      category: 'landscape', width: 2400, height: 1600,
    },
    {
      src: '/images/photography/golden/DSCF9853.webp',
      alt: { en: 'The last sunlight behind a mountain, reflected on the sea beyond dark shoreline rocks.', es: 'La última luz tras una montaña se refleja en el mar, más allá de las rocas oscuras de la orilla.' },
      category: 'landscape', width: 2400, height: 1600,
    },
  ],
  coast: [
    {
      src: '/images/photography/coast/DSCF9844.webp',
      alt: { en: 'Two sailboats on calm water beneath a clouded sky.', es: 'Dos veleros sobre el agua en calma bajo un cielo nublado.' },
      category: 'landscape', width: 2019, height: 3028,
    },
    {
      src: '/images/photography/coast/DSCF9754.webp',
      alt: { en: 'A cruise ship and smaller boats in the harbour.', es: 'Un crucero y varios barcos pequeños en el puerto.' },
      category: 'landscape', width: 2400, height: 1600,
    },
    {
      src: '/images/photography/coast/DSCF9838.webp',
      alt: { en: 'A ship in port, framed by masts and waterfront buildings.', es: 'Un barco en el puerto, entre mástiles y edificios del paseo marítimo.' },
      category: 'landscape', width: 2080, height: 3120,
    },
    {
      src: '/images/photography/coast/DSCF9810.webp',
      alt: { en: 'Two fishmongers working at a seafood counter.', es: 'Dos pescaderos trabajando en un puesto de pescado.' },
      category: 'street', width: 2080, height: 3120,
    },
    {
      src: '/images/photography/coast/DSCF9857.webp',
      alt: { en: 'A pale rock face beside still water under a pastel evening sky.', es: 'Una pared de roca clara junto al agua en calma bajo un cielo pastel al atardecer.' },
      category: 'landscape', width: 1946, height: 2919,
    },
    {
      src: '/images/photography/coast/DSCF9860.webp',
      alt: { en: 'A lone sailboat on a calm sea beneath a wide, muted evening sky.', es: 'Un velero solitario sobre el mar en calma bajo un amplio cielo de atardecer.' },
      category: 'landscape', width: 2400, height: 1600,
    },
    {
      src: '/images/photography/coast/DSCF9861.webp',
      alt: { en: 'A small motorboat crosses still water at dusk, leaving a narrow wake.', es: 'Una pequeña lancha cruza el agua en calma al anochecer y deja una estela estrecha.' },
      category: 'landscape', width: 2400, height: 1600,
    },
    {
      src: '/images/photography/coast/DSCF9849.webp',
      alt: { en: 'A sunlit coastal rock above the sea, with the horizon beyond.', es: 'Una roca costera iluminada por el sol sobre el mar, con el horizonte al fondo.' },
      category: 'landscape', width: 1880, height: 2820,
    },
  ],
} satisfies Record<PhotographyCategory | 'golden' | 'coast', PhotographyPhoto[]>
