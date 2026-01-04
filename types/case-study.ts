// =============================================
// CASE STUDY TYPE DEFINITIONS
// =============================================

export type CaseStudyImageType = 'hero' | 'thumb' | 'approach' | 'gallery' | 'feature' | 'full'

export interface CaseStudyImage {
  src: string
  alt: string
  quality?: number
  sizes?: string
  objectPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right'
}

export interface HeroSection {
  title: string
  tagline: string
  subtitle: string
  image: CaseStudyImage
}

export interface OverviewMetaItem {
  label: string
  value: string
  fullWidth?: boolean
}

export interface OverviewSection {
  meta: OverviewMetaItem[]
  text: string
  intent: string
  variant?: 'default' | 'gold'
}

export interface ChallengeSection {
  quote: string
  text: string
  criteria: string[]
  variant?: 'default' | 'gold'
}

export interface ApproachTool {
  name: string
  variant?: 'default' | 'gold'
}

export interface ApproachSystemItem {
  title: string
  description: string
  variant?: 'default' | 'gold'
}

export interface ApproachSystem {
  label: string
  items: ApproachSystemItem[]
}

export interface IterationItem {
  title: string
  text: string
}

export interface Deliverable {
  name: string
  why: string
}

export interface AestheticItem {
  label: string
  value: string
  colorSwatch?: string
}

export interface VoiceTrait {
  name: string
}

export interface ApproachModule {
  aesthetic?: {
    header: string
    items: AestheticItem[]
  }
  voice?: {
    label: string
    traits: VoiceTrait[]
    signature: string
  }
}

export interface ObsessionSection {
  label: string
  text: string
}

export interface ApproachSection {
  text: string
  tools: ApproachTool[]
  system?: ApproachSystem
  iteration?: {
    label: string
    items: IterationItem[]
  }
  deliverables?: {
    label: string
    items: Deliverable[]
  }
  modules?: ApproachModule
  obsession?: ObsessionSection
  images?: CaseStudyImage[]
}

export interface GalleryRow {
  type: '3' | '2' | 'asymmetric'
  items: CaseStudyImage[]
}

export interface GallerySection {
  rows: GalleryRow[]
}

export interface ResultsSection {
  text: string
  takeaway: string
  variant?: 'default' | 'gold'
}

export interface CaseStudyContent {
  id: string
  hero: HeroSection
  overview: OverviewSection
  challenge: ChallengeSection
  fullImages?: CaseStudyImage[]
  approach: ApproachSection
  feature?: CaseStudyImage
  gallery?: GallerySection
  results: ResultsSection
  structuredData: {
    headline: string
    description: string
    datePublished: string
    dateModified: string
  }
}

