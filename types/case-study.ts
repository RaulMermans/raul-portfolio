// =============================================
// CASE STUDY TYPE DEFINITIONS
// Clean, flexible structure for case study content
// =============================================

export interface CaseStudyImage {
  src: string
  alt: string
  quality?: number
  sizes?: string
}

export interface CaseStudyHero {
  title: string
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
  meta?: CaseStudyMeta[]
}

export interface CaseStudySection {
  title?: string
  content: string | string[]
  image?: CaseStudyImage
}

export interface CaseStudyContent {
  id: string
  hero: CaseStudyHero
  overview?: CaseStudyOverview
  sections?: CaseStudySection[]
  gallery?: CaseStudyImage[]
}

