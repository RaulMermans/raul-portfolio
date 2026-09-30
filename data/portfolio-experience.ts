/**
 * Canonical experience registry. Routes own navigation and reading contracts;
 * projects own only their evidence language and one scoped accent.
 */
export const DISCIPLINES = [
  'creative',
  'data-research',
  'business-intelligence',
  'ai-automation',
  'digital-product',
  'photography',
] as const

export type Discipline = (typeof DISCIPLINES)[number]

export const PAGE_FAMILIES = [
  'home',
  'about',
  'services-index',
  'service-detail',
  'case-studies-index',
  'case-study',
  'apps-index',
  'app-detail',
  'photography',
  'visual-work',
  'utility',
] as const

export type PageFamily = (typeof PAGE_FAMILIES)[number]
export type PresentationFamily =
  | 'creative-marketing'
  | 'technical-product'
export type LocaleCode = 'es' | 'en'

/** Browsing groups for the case-study index; separate from project disciplines. */
export const CASE_STUDY_CATEGORIES = [
  { id: 'creative-work', label: { en: 'Creative Work', es: 'Trabajo creativo' }, description: { en: 'Brands, campaigns, and visual ideas in context.', es: 'Marcas, campañas e ideas visuales en contexto.' } },
  { id: 'ai-systems', label: { en: 'AI Systems & Agents', es: 'Sistemas y agentes de IA' }, description: { en: 'Bounded agents, local AI, and evidence-led workflows.', es: 'Agentes acotados, IA local y flujos basados en evidencia.' } },
  { id: 'software-products', label: { en: 'Software & Products', es: 'Software y productos' }, description: { en: 'Tools and digital products built around real tasks.', es: 'Herramientas y productos digitales para tareas concretas.' } },
  { id: 'data-analytics', label: { en: 'Data Analytics', es: 'Análisis de datos' }, description: { en: 'Models, reporting, and decision-support systems.', es: 'Modelos, informes y sistemas de apoyo a decisiones.' } },
] as const

export type CaseStudyCategory = (typeof CASE_STUDY_CATEGORIES)[number]['id']

/** Presentation affects evidence composition only and is derived from discipline. */
export const PRESENTATION_FAMILY_BY_DISCIPLINE: Record<Discipline, PresentationFamily> = {
  creative: 'creative-marketing',
  'data-research': 'technical-product',
  'business-intelligence': 'technical-product',
  'ai-automation': 'technical-product',
  'digital-product': 'technical-product',
  photography: 'creative-marketing',
}

export const DISCIPLINE_LABELS: Record<Discipline, Record<LocaleCode, string>> = {
  creative: { en: 'Creative', es: 'Creativo' },
  'data-research': { en: 'Data & Research', es: 'Datos e investigación' },
  'business-intelligence': { en: 'Business Intelligence', es: 'Business Intelligence' },
  'ai-automation': { en: 'AI & Automation', es: 'IA y automatización' },
  'digital-product': { en: 'Digital Products', es: 'Productos digitales' },
  photography: { en: 'Photography / Visual Work', es: 'Fotografía / trabajo visual' },
}

export type PublicRoute = {
  route: string
  locales: readonly LocaleCode[]
  pageFamily: PageFamily
  mobileRequired: true
  visualRegressionRequired: boolean
}

/** Route patterns intentionally cover dynamic leaves without duplicating each locale. */
export const PUBLIC_ROUTE_REGISTRY: readonly PublicRoute[] = [
  { route: '/', locales: ['es', 'en'], pageFamily: 'home', mobileRequired: true, visualRegressionRequired: true },
  { route: '/about', locales: ['es', 'en'], pageFamily: 'about', mobileRequired: true, visualRegressionRequired: true },
  { route: '/services/[slug]', locales: ['es', 'en'], pageFamily: 'service-detail', mobileRequired: true, visualRegressionRequired: true },
  { route: '/case-studies', locales: ['es', 'en'], pageFamily: 'case-studies-index', mobileRequired: true, visualRegressionRequired: true },
  { route: '/case-studies/[slug]', locales: ['es', 'en'], pageFamily: 'case-study', mobileRequired: true, visualRegressionRequired: true },
  { route: '/apps', locales: ['es', 'en'], pageFamily: 'apps-index', mobileRequired: true, visualRegressionRequired: true },
  { route: '/apps/[slug]', locales: ['es', 'en'], pageFamily: 'app-detail', mobileRequired: true, visualRegressionRequired: true },
  { route: '/photography', locales: ['es', 'en'], pageFamily: 'photography', mobileRequired: true, visualRegressionRequired: true },
  { route: '/visuals', locales: ['es', 'en'], pageFamily: 'visual-work', mobileRequired: true, visualRegressionRequired: true },
  { route: '/privacy', locales: ['es', 'en'], pageFamily: 'utility', mobileRequired: true, visualRegressionRequired: false },
  { route: '/terms', locales: ['es', 'en'], pageFamily: 'utility', mobileRequired: true, visualRegressionRequired: false },
  { route: '/overflow/[slug]', locales: ['es', 'en'], pageFamily: 'utility', mobileRequired: true, visualRegressionRequired: false },
] as const

export type ProjectExperience = {
  slug: string
  title: string
  primaryDiscipline: Discipline
  caseStudyCategory: CaseStudyCategory
  secondaryCapabilities: readonly string[]
  relatedServices: readonly string[]
  accent: string
  year: string
  status: string
}

/** The only registry for a project's discipline, commercial relation, and scope. */
export const PROJECT_EXPERIENCE: readonly ProjectExperience[] = [
  { slug: 'halo-control', title: 'HALO Control', primaryDiscipline: 'ai-automation', caseStudyCategory: 'ai-systems', secondaryCapabilities: ['Local inference', 'Control plane', 'Observability'], relatedServices: ['ai-integrations', 'product-prototypes'], accent: 'var(--accent)', year: '2026', status: 'Public architecture edition' },
  { slug: 'bi-notebook-lab', title: 'BI Notebook Lab', primaryDiscipline: 'business-intelligence', caseStudyCategory: 'data-analytics', secondaryCapabilities: ['Semantic modeling', 'BI education', 'Evaluation'], relatedServices: ['product-prototypes'], accent: 'var(--accent)', year: '2026', status: 'Public V1' },
  { slug: 'local-ai-coding-agent', title: 'Local AI Coding Agent', primaryDiscipline: 'ai-automation', caseStudyCategory: 'ai-systems', secondaryCapabilities: ['Local inference', 'Evaluation', 'Tool calling'], relatedServices: ['ai-integrations', 'product-prototypes'], accent: 'var(--accent)', year: '2026', status: 'Private prototype' },
  { slug: 'iris', title: 'IRIS', primaryDiscipline: 'ai-automation', caseStudyCategory: 'ai-systems', secondaryCapabilities: ['Agent orchestration', 'Memory', 'Recovery'], relatedServices: ['ai-integrations', 'product-prototypes'], accent: 'var(--accent)', year: '2026', status: 'Private system / public architecture' },
  { slug: 'ai-sports', title: 'AI Sports Campaign', primaryDiscipline: 'creative', caseStudyCategory: 'creative-work', secondaryCapabilities: ['Creative operations', 'AI systems'], relatedServices: ['ai-integrations'], accent: 'var(--color-0)', year: '2025', status: 'Case study' },
  { slug: 'remoria', title: 'Remoria', primaryDiscipline: 'creative', caseStudyCategory: 'creative-work', secondaryCapabilities: ['Brand systems', 'Creative direction'], relatedServices: ['brand-systems'], accent: 'var(--color-1)', year: '2025', status: 'Case study' },
  { slug: 'relay', title: 'Relay', primaryDiscipline: 'business-intelligence', caseStudyCategory: 'data-analytics', secondaryCapabilities: ['Marketing intelligence', 'Data quality'], relatedServices: ['product-prototypes'], accent: 'var(--accent)', year: '2025', status: 'Private beta' },
  { slug: 'opstwin', title: 'OpsTwin', primaryDiscipline: 'business-intelligence', caseStudyCategory: 'software-products', secondaryCapabilities: ['Simulation', 'Decision support'], relatedServices: ['product-prototypes'], accent: 'var(--accent)', year: '2025', status: 'Prototype' },
  { slug: 'searchsignal', title: 'SearchSignal', primaryDiscipline: 'data-research', caseStudyCategory: 'software-products', secondaryCapabilities: ['Information architecture', 'Catalog readiness'], relatedServices: ['product-prototypes', 'web-development'], accent: 'var(--color-0)', year: '2025', status: 'Demonstrator' },
  { slug: 'demandos', title: 'DemandOS', primaryDiscipline: 'business-intelligence', caseStudyCategory: 'data-analytics', secondaryCapabilities: ['Forecasting', 'Machine learning'], relatedServices: ['product-prototypes'], accent: 'var(--accent)', year: '2025', status: 'Prototype' },
  { slug: 'campaign-pulse', title: 'Campaign Pulse', primaryDiscipline: 'business-intelligence', caseStudyCategory: 'data-analytics', secondaryCapabilities: ['Marketing analytics', 'Data product'], relatedServices: ['product-prototypes'], accent: 'var(--accent)', year: '2025', status: 'Prototype' },
  { slug: 'campaign-sandbox', title: 'Campaign Sandbox', primaryDiscipline: 'creative', caseStudyCategory: 'creative-work', secondaryCapabilities: ['Campaign strategy', 'Workflow design'], relatedServices: ['creative-automation', 'ai-integrations'], accent: 'var(--accent)', year: '2025', status: 'Case study' },
  { slug: 'data-brief-ai', title: 'Data Brief AI', primaryDiscipline: 'ai-automation', caseStudyCategory: 'ai-systems', secondaryCapabilities: ['Reporting', 'Data validation'], relatedServices: ['ai-integrations', 'product-prototypes'], accent: 'var(--accent)', year: '2025', status: 'Prototype' },
  { slug: 'website-auditor', title: 'Website Audit Agent', primaryDiscipline: 'ai-automation', caseStudyCategory: 'ai-systems', secondaryCapabilities: ['UX audit', 'Evaluation'], relatedServices: ['ai-integrations', 'web-development'], accent: 'var(--accent)', year: '2025', status: 'Prototype' },
  { slug: 'benchmark-dashboard', title: 'Benchmark Dashboard', primaryDiscipline: 'business-intelligence', caseStudyCategory: 'data-analytics', secondaryCapabilities: ['Benchmarking', 'Dashboards'], relatedServices: ['product-prototypes'], accent: 'var(--accent)', year: '2025', status: 'Case study' },
  { slug: 'blogagent', title: 'Blog Agent', primaryDiscipline: 'ai-automation', caseStudyCategory: 'ai-systems', secondaryCapabilities: ['Content workflow', 'Automation'], relatedServices: ['ai-integrations'], accent: 'var(--accent)', year: '2025', status: 'Prototype' },
  { slug: 'territoryops-spain', title: 'TerritoryOps Spain', primaryDiscipline: 'digital-product', caseStudyCategory: 'software-products', secondaryCapabilities: ['Territory planning', 'Operations'], relatedServices: ['web-development', 'product-prototypes'], accent: 'var(--accent)', year: '2025', status: 'Prototype' },
  { slug: 'raul-portfolio', title: 'Raul Mermans Portfolio', primaryDiscipline: 'digital-product', caseStudyCategory: 'software-products', secondaryCapabilities: ['Portfolio architecture', 'Brand systems'], relatedServices: ['web-development', 'brand-systems'], accent: 'var(--color-1)', year: '2025', status: 'Live' },
] as const

export function getProjectExperience(slug: string) {
  return PROJECT_EXPERIENCE.find((project) => project.slug === slug)
}

export function getProjectsForService(serviceSlug: string) {
  return PROJECT_EXPERIENCE.filter((project) => project.relatedServices.includes(serviceSlug))
}

export function getProjectsForDiscipline(discipline: Discipline) {
  return PROJECT_EXPERIENCE.filter((project) => project.primaryDiscipline === discipline)
}

export function getPresentationFamilyForDiscipline(discipline: Discipline) {
  return PRESENTATION_FAMILY_BY_DISCIPLINE[discipline]
}

export function getPresentationFamilyForProject(slug: string) {
  const project = getProjectExperience(slug)
  if (!project) throw new Error(`Unknown project experience: ${slug}`)
  return getPresentationFamilyForDiscipline(project.primaryDiscipline)
}

export const VISUAL_REGRESSION_MATRIX = [
  '/',
  '/services/web-development',
  '/about',
  '/case-studies',
  '/case-studies/remoria',
  '/case-studies/opstwin',
  '/case-studies/halo-control',
  '/case-studies/bi-notebook-lab',
  '/apps',
  '/photography',
] as const
