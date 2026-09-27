// =============================================
// CASE STUDY TYPE DEFINITIONS
// Detailed structure matching CSS and content requirements
// =============================================

export interface CaseStudyImage {
  src: string
  alt: string
  caption?: string
  quality?: number
  sizes?: string
}

export interface CaseStudyHero {
  title: string
  tagline?: string
  subtitle?: string
  description?: string
  image: CaseStudyImage
}

export interface CaseStudyMeta {
  label: string
  value: string
}

export interface CaseStudyOverview {
  title?: string
  description: string
  intentQuote?: string
  meta?: CaseStudyMeta[]
}

export interface CaseStudyChallenge {
  quote: string
  context: string
  successCriteria: string[]
}

export interface CaseStudyApproachModuleItem {
  title: string
  description: string
}

export interface CaseStudyApproachModule {
  label: string
  items: CaseStudyApproachModuleItem[]
}

export interface CaseStudyApproachDeliverable {
  name: string
  rationale: string
}

export interface CaseStudyApproach {
  text: string
  tools: string[]
  system?: CaseStudyApproachModule
  iterationProof?: CaseStudyApproachModule
  deliverables?: CaseStudyApproachDeliverable[]
  images?: CaseStudyImage[]
}

export interface CaseStudyResults {
  text: string
  takeawayQuote: string
}

export interface CaseStudyGalleryRow {
  layout: '3-col' | '2-col' | 'asymmetric'
  items: CaseStudyImage[]
}

export type CaseStudyLayoutVariant = 'default' | 'wide' | 'compact'

export interface CaseStudyContent {
  id: string
  accentColor?: string
  layoutVariant?: CaseStudyLayoutVariant
  hero: CaseStudyHero
  overview?: CaseStudyOverview
  challenge?: CaseStudyChallenge
  fullBleedImages?: CaseStudyImage[]
  approach?: CaseStudyApproach
  featureImage?: CaseStudyImage
  gallery?: {
    rows: CaseStudyGalleryRow[]
  }
  results?: CaseStudyResults
}
