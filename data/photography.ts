export type PhotographyCategory = 'landscape' | 'architecture' | 'street'

export interface PhotographyPhoto {
  src: string
  alt: string
  category: PhotographyCategory
  width: number
  height: number
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
  [16, 2044, 2965],
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
  label: string,
  meta: readonly (readonly [number, number, number])[]
): PhotographyPhoto[] {
  return meta.map(([index, width, height]) => ({
    src: `/images/photography/${folderName}/${filePrefix}${index}.webp`,
    alt: `${label} photography ${index}`,
    category,
    width,
    height,
  }))
}

export const PHOTOGRAPHY_IMAGES = {
  landscape: buildPhotos('landscape', 'landscape', 'Landscape', 'Landscape', landscapeMeta),
  architecture: buildPhotos('architecture', 'architecture', 'Arquitecture', 'Architecture', architectureMeta),
  street: buildPhotos('street', 'street', 'Street', 'Street', streetMeta),
} satisfies Record<PhotographyCategory, PhotographyPhoto[]>
