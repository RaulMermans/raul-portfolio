import { getCaseStudies, type CaseStudy } from '@/data/case-studies'
import {
  DISCIPLINE_LABELS,
  PROJECT_EXPERIENCE,
  type Discipline,
  type ProjectExperience,
} from '@/data/portfolio-experience'
import type { Locale } from '@/lib/i18n'
import { localizePath } from '@/lib/i18n'

/** Legacy URLs now identify editorial collections, never a primary taxonomy. */
export type CaseStudyCategorySlug =
  | 'ai-systems-agents'
  | 'campaign-systems'
  | 'brand-systems'
  | 'data-systems'
  | 'product-tools'

export type CategoryProject = {
  title: string
  description: string
  label: string
  image: string
  href?: string
}

export type CaseStudyCategory = {
  slug: CaseStudyCategorySlug
  title: string
  eyebrow: string
  description: string
  href: string
  projects: CategoryProject[]
}

type CuratedCollection = Omit<CaseStudyCategory, 'href' | 'projects' | 'eyebrow'> & {
  disciplines?: readonly Discipline[]
  capabilities?: readonly string[]
}

const collections: Record<Locale, readonly CuratedCollection[]> = {
  en: [
    { slug: 'data-systems', title: 'Intelligence Systems', description: 'A curated collection of systems that turn operational data, campaigns, and benchmarks into decision signals.', disciplines: ['business-intelligence', 'data-research'] },
    { slug: 'ai-systems-agents', title: 'AI Workflows', description: 'A curated collection of workflows where AI operates inside limits, evidence, human review, and clear contracts.', disciplines: ['ai-automation'], capabilities: ['AI systems', 'Workflow design'] },
    { slug: 'brand-systems', title: 'Brand Systems', description: 'A curated collection of identity, positioning, and visual-rule systems designed to preserve coherence.', capabilities: ['Brand systems', 'Creative direction', 'Portfolio architecture'] },
    { slug: 'campaign-systems', title: 'Creative Production', description: 'A curated collection of campaign strategy, visual variation, and production systems with human control.', disciplines: ['creative'], capabilities: ['Campaign strategy'] },
    { slug: 'product-tools', title: 'Product Tools', description: 'A curated collection of operational demos and product surfaces built to test workflow logic.', disciplines: ['digital-product', 'business-intelligence', 'ai-automation'] },
  ],
  es: [
    { slug: 'data-systems', title: 'Sistemas de inteligencia', description: 'Una colección curada de sistemas que convierten datos operativos, campañas y benchmarks en señales de decisión.', disciplines: ['business-intelligence', 'data-research'] },
    { slug: 'ai-systems-agents', title: 'Flujos con IA', description: 'Una colección curada de flujos donde la IA trabaja dentro de límites, evidencias, revisión humana y contratos claros.', disciplines: ['ai-automation'], capabilities: ['AI systems', 'Workflow design'] },
    { slug: 'brand-systems', title: 'Sistemas de marca', description: 'Una colección curada de sistemas de identidad, posicionamiento y reglas visuales diseñados para sostener coherencia.', capabilities: ['Brand systems', 'Creative direction', 'Portfolio architecture'] },
    { slug: 'campaign-systems', title: 'Producción creativa', description: 'Una colección curada de estrategia de campaña, variación visual y sistemas de producción con control humano.', disciplines: ['creative'], capabilities: ['Campaign strategy'] },
    { slug: 'product-tools', title: 'Herramientas de producto', description: 'Una colección curada de demos operativas y superficies de producto construidas para probar lógica de workflow.', disciplines: ['digital-product', 'business-intelligence', 'ai-automation'] },
  ],
}

function includesProject(collection: CuratedCollection, project: ProjectExperience) {
  return Boolean(
    collection.disciplines?.includes(project.primaryDiscipline) ||
      collection.capabilities?.some((capability) => project.secondaryCapabilities.includes(capability)),
  )
}

function projectFromStudy(study: CaseStudy | undefined, project: ProjectExperience, locale: Locale): CategoryProject[] {
  if (!study) return []

  return [{
    title: study.title,
    label: project.secondaryCapabilities[0] ?? DISCIPLINE_LABELS[project.primaryDiscipline][locale],
    description: study.description,
    image: study.image,
    href: study.href,
  }]
}

export function getCaseStudyCategories(locale: Locale): CaseStudyCategory[] {
  const studiesBySlug = new Map(getCaseStudies(locale).map((study) => [study.slug, study]))
  const indexHref = localizePath('/case-studies', locale)

  return collections[locale].map((collection) => ({
    slug: collection.slug,
    title: collection.title,
    eyebrow: locale === 'es' ? 'Colección curada' : 'Curated collection',
    description: collection.description,
    href: indexHref,
    projects: PROJECT_EXPERIENCE
      .filter((project) => includesProject(collection, project))
      .flatMap((project) => projectFromStudy(studiesBySlug.get(project.slug), project, locale)),
  }))
}

export function getCaseStudyCategory(locale: Locale, slug: CaseStudyCategorySlug) {
  return getCaseStudyCategories(locale).find((category) => category.slug === slug)
}
