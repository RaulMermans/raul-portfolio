import { getCaseStudies, type CaseStudy } from '@/data/case-studies'
import type { Locale } from '@/lib/i18n'
import { localizePath } from '@/lib/i18n'

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

function findStudy(caseStudies: CaseStudy[], slug: string) {
  return caseStudies.find(study => study.slug === slug)
}

function projectFromStudy(
  study: CaseStudy | undefined,
  fallbackLabel: string
): CategoryProject[] {
  if (!study) return []

  return [
    {
      title: study.title,
      label: study.subtitle ?? fallbackLabel,
      description: study.description,
      image: study.image,
      href: study.href,
    },
  ]
}

export function getCaseStudyCategories(locale: Locale): CaseStudyCategory[] {
  const isSpanish = locale === 'es'
  const caseStudies = getCaseStudies(locale)
  const campaignPulse = findStudy(caseStudies, 'campaign-pulse')
  const demandOs = findStudy(caseStudies, 'demandos')
  const campaignSandbox = findStudy(caseStudies, 'campaign-sandbox')
  const dataBriefAi = findStudy(caseStudies, 'data-brief-ai')
  const websiteAuditor = findStudy(caseStudies, 'website-auditor')
  const benchmarkDashboard = findStudy(caseStudies, 'benchmark-dashboard')
  const aiSports = findStudy(caseStudies, 'ai-sports')
  const remoria = findStudy(caseStudies, 'remoria')
  const blogAgent = findStudy(caseStudies, 'blogagent')
  const territoryOps = findStudy(caseStudies, 'territoryops-spain')
  const raulPortfolio = findStudy(caseStudies, 'raul-portfolio')
  const indexHref = localizePath('/case-studies', locale)

  return [
    {
      slug: 'data-systems',
      title: isSpanish ? 'Sistemas de inteligencia' : 'Intelligence Systems',
      eyebrow: isSpanish ? 'Marketing y operaciones' : 'Marketing and operations',
      description: isSpanish
        ? 'Sistemas que convierten datos operativos, campañas y benchmarks en señales de decisión.'
        : 'Systems that turn operational data, campaigns, and benchmarks into decision signals.',
      href: indexHref,
      projects: [
        ...projectFromStudy(campaignPulse, isSpanish ? 'Inteligencia de marketing' : 'Marketing intelligence'),
        ...projectFromStudy(demandOs, isSpanish ? 'Machine learning / Producto de datos' : 'Machine learning / Data product'),
        ...projectFromStudy(benchmarkDashboard, isSpanish ? 'Producto de datos / Intelligence system' : 'Data product / Intelligence system'),
        ...projectFromStudy(territoryOps, isSpanish ? 'Herramienta de workflow / Inteligencia territorial' : 'Workflow tool / Territorial intelligence'),
      ],
    },
    {
      slug: 'ai-systems-agents',
      title: isSpanish ? 'Flujos con IA' : 'AI Workflows',
      eyebrow: isSpanish ? 'IA acotada' : 'Bounded AI',
      description: isSpanish
        ? 'Flujos donde la IA trabaja dentro de límites, evidencias, revisión humana y contratos claros.'
        : 'Workflows where AI operates inside limits, evidence, human review, and clear contracts.',
      href: indexHref,
      projects: [
        ...projectFromStudy(campaignSandbox, isSpanish ? 'Estrategia de campaña / IA acotada' : 'Campaign strategy / Bounded AI'),
        ...projectFromStudy(dataBriefAi, isSpanish ? 'IA acotada / Producto de datos' : 'Bounded AI / Data product'),
        ...projectFromStudy(websiteAuditor, isSpanish ? 'IA acotada / Herramienta de workflow' : 'Bounded AI / Workflow tool'),
        ...projectFromStudy(blogAgent, isSpanish ? 'IA acotada / Herramienta de workflow' : 'Bounded AI / Workflow tool'),
      ],
    },
    {
      slug: 'brand-systems',
      title: isSpanish ? 'Sistemas de marca' : 'Brand Systems',
      eyebrow: isSpanish ? 'Identidad y reglas' : 'Identity and rules',
      description: isSpanish
        ? 'Sistemas de identidad, posicionamiento y reglas visuales diseñados para sostener coherencia.'
        : 'Identity, positioning, and visual-rule systems designed to preserve coherence.',
      href: indexHref,
      projects: [
        ...projectFromStudy(remoria, isSpanish ? 'Sistema de marca' : 'Brand system'),
        ...projectFromStudy(raulPortfolio, isSpanish ? 'Sistema de portfolio / Marca personal' : 'Portfolio system / Personal brand'),
      ],
    },
    {
      slug: 'campaign-systems',
      title: isSpanish ? 'Producción creativa' : 'Creative Production',
      eyebrow: isSpanish ? 'Campañas y superficies' : 'Campaigns and surfaces',
      description: isSpanish
        ? 'Sistemas para estrategia, variación visual y consistencia de campaña con control humano.'
        : 'Systems for strategy, visual variation, and campaign consistency with human control.',
      href: indexHref,
      projects: [
        ...projectFromStudy(campaignSandbox, isSpanish ? 'Estrategia de campaña' : 'Campaign strategy'),
        ...projectFromStudy(aiSports, isSpanish ? 'Producción creativa' : 'Creative production'),
        ...projectFromStudy(remoria, isSpanish ? 'Mundo visual de marca' : 'Brand visual world'),
      ],
    },
    {
      slug: 'product-tools',
      title: isSpanish ? 'Herramientas de producto' : 'Product Tools',
      eyebrow: isSpanish ? 'Superficies operativas' : 'Operational surfaces',
      description: isSpanish
        ? 'Herramientas internas, demos y superficies de producto construidas para probar lógica de workflow.'
        : 'Internal tools, demos, and product surfaces built to test workflow logic.',
      href: indexHref,
      projects: [
        ...projectFromStudy(campaignPulse, isSpanish ? 'Producto de datos' : 'Data product'),
        ...projectFromStudy(demandOs, isSpanish ? 'Producto ML' : 'ML product'),
        ...projectFromStudy(dataBriefAi, isSpanish ? 'Producto de reporting' : 'Reporting product'),
        ...projectFromStudy(websiteAuditor, isSpanish ? 'Herramienta de auditoría' : 'Audit tool'),
        ...projectFromStudy(territoryOps, isSpanish ? 'Herramienta de workflow' : 'Workflow tool'),
      ],
    },
  ]
}

export function getCaseStudyCategory(locale: Locale, slug: CaseStudyCategorySlug) {
  return getCaseStudyCategories(locale).find(category => category.slug === slug)
}
