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
  | 'hybrid'
export type LocaleCode = 'es' | 'en'

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
  secondaryCapabilities: readonly string[]
  relatedServices: readonly string[]
  presentationFamily: PresentationFamily
  accent: string
  year: string
  status: string
}

/** The only registry for a project's discipline, commercial relation, and scope. */
export const PROJECT_EXPERIENCE: readonly ProjectExperience[] = [
  { slug: 'ai-sports', title: 'AI Sports Campaign', primaryDiscipline: 'creative', secondaryCapabilities: ['Creative operations', 'AI systems'], relatedServices: ['ai-integrations'], presentationFamily: 'creative-marketing', accent: 'var(--color-0)', year: '2025', status: 'Case study' },
  { slug: 'remoria', title: 'Remoria', primaryDiscipline: 'creative', secondaryCapabilities: ['Brand systems', 'Creative direction'], relatedServices: ['creative-direction'], presentationFamily: 'creative-marketing', accent: 'var(--color-1)', year: '2025', status: 'Case study' },
  { slug: 'relay', title: 'Relay', primaryDiscipline: 'business-intelligence', secondaryCapabilities: ['Marketing intelligence', 'Data quality'], relatedServices: ['data-analytics'], presentationFamily: 'technical-product', accent: 'var(--accent)', year: '2025', status: 'Private beta' },
  { slug: 'opstwin', title: 'OpsTwin', primaryDiscipline: 'business-intelligence', secondaryCapabilities: ['Simulation', 'Decision support'], relatedServices: ['data-analytics'], presentationFamily: 'technical-product', accent: 'var(--accent)', year: '2025', status: 'Prototype' },
  { slug: 'searchsignal', title: 'SearchSignal', primaryDiscipline: 'data-research', secondaryCapabilities: ['Information architecture', 'Catalog readiness'], relatedServices: ['data-analytics', 'web-development'], presentationFamily: 'technical-product', accent: 'var(--color-0)', year: '2025', status: 'Demonstrator' },
  { slug: 'demandos', title: 'DemandOS', primaryDiscipline: 'business-intelligence', secondaryCapabilities: ['Forecasting', 'Machine learning'], relatedServices: ['data-analytics'], presentationFamily: 'technical-product', accent: 'var(--accent)', year: '2025', status: 'Prototype' },
  { slug: 'campaign-pulse', title: 'Campaign Pulse', primaryDiscipline: 'business-intelligence', secondaryCapabilities: ['Marketing analytics', 'Data product'], relatedServices: ['data-analytics'], presentationFamily: 'technical-product', accent: 'var(--accent)', year: '2025', status: 'Prototype' },
  { slug: 'campaign-sandbox', title: 'Campaign Sandbox', primaryDiscipline: 'creative', secondaryCapabilities: ['Campaign strategy', 'Workflow design'], relatedServices: ['creative-direction', 'ai-integrations'], presentationFamily: 'hybrid', accent: 'var(--accent)', year: '2025', status: 'Case study' },
  { slug: 'data-brief-ai', title: 'Data Brief AI', primaryDiscipline: 'ai-automation', secondaryCapabilities: ['Reporting', 'Data validation'], relatedServices: ['ai-integrations', 'data-analytics'], presentationFamily: 'technical-product', accent: 'var(--accent)', year: '2025', status: 'Prototype' },
  { slug: 'website-auditor', title: 'Website Audit Agent', primaryDiscipline: 'ai-automation', secondaryCapabilities: ['UX audit', 'Evaluation'], relatedServices: ['ai-integrations', 'web-development'], presentationFamily: 'technical-product', accent: 'var(--accent)', year: '2025', status: 'Prototype' },
  { slug: 'benchmark-dashboard', title: 'Benchmark Dashboard', primaryDiscipline: 'business-intelligence', secondaryCapabilities: ['Benchmarking', 'Dashboards'], relatedServices: ['data-analytics'], presentationFamily: 'technical-product', accent: 'var(--accent)', year: '2025', status: 'Case study' },
  { slug: 'blogagent', title: 'Blog Agent', primaryDiscipline: 'ai-automation', secondaryCapabilities: ['Content workflow', 'Automation'], relatedServices: ['ai-integrations'], presentationFamily: 'technical-product', accent: 'var(--accent)', year: '2025', status: 'Prototype' },
  { slug: 'territoryops-spain', title: 'TerritoryOps Spain', primaryDiscipline: 'digital-product', secondaryCapabilities: ['Territory planning', 'Operations'], relatedServices: ['web-development', 'data-analytics'], presentationFamily: 'technical-product', accent: 'var(--accent)', year: '2025', status: 'Prototype' },
  { slug: 'raul-portfolio', title: 'Raul Mermans Portfolio', primaryDiscipline: 'digital-product', secondaryCapabilities: ['Portfolio architecture', 'Brand systems'], relatedServices: ['web-development', 'creative-direction'], presentationFamily: 'hybrid', accent: 'var(--color-1)', year: '2025', status: 'Live' },
] as const

export function getProjectsForService(serviceSlug: string) {
  return PROJECT_EXPERIENCE.filter((project) => project.relatedServices.includes(serviceSlug))
}

export const VISUAL_REGRESSION_MATRIX = [
  '/',
  '/services/web-development',
  '/about',
  '/case-studies',
  '/case-studies/remoria',
  '/case-studies/opstwin',
  '/apps',
  '/photography',
] as const
