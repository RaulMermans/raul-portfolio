import type { Locale } from '@/lib/i18n'
import { localizePath, stripLocaleFromPath } from '@/lib/i18n'
import {
  CASE_STUDY_ORDER,
  getCaseStudyEditorial,
} from '@/data/case-study-editorial'

export interface CaseStudy {
  id: number
  slug: string
  title: string
  description: string
  commercialRelevance?: string
  tags?: string[]
  status?: string
  cta?: string
  image: string
  imageWidth: number
  imageHeight: number
  href: string
  color: string
  subtitle?: string
  mood?: string[]
  githubUrl?: string
  liveUrl?: string
  category?: string
  proofTags?: string[]
}

export const MOODS = ['All', 'minimal', 'bold', 'editorial', 'tech'] as const

type CaseStudyEntry = Omit<CaseStudy, 'href'>

const caseStudyEntries: Record<Locale, CaseStudyEntry[]> = {
  en: [
    {
      id: 11,
      slug: 'opstwin',
      title: 'OpsTwin',
      description:
        'Operational simulation and decision lab for comparing service-workflow changes under matched simulated conditions.',
      commercialRelevance:
        'Shows how teams can examine staffing and workflow tradeoffs before a live operational pilot, without presenting simulation evidence as certainty.',
      tags: [
        'Simulation',
        'Decision support',
        'Operations',
        'Next.js',
        'FastAPI',
        'Python',
      ],
      status: 'Deployed product prototype',
      cta: 'View case study',
      image: '/images/case-studies/opstwin/thumb.svg',
      imageWidth: 1600,
      imageHeight: 1000,
      color: 'var(--accent)',
      subtitle: 'Operational simulation / Decision-support product',
      mood: ['minimal', 'tech', 'editorial'],
      githubUrl: 'https://github.com/RaulMermans/OpsTwin.git',
      liveUrl: 'https://ops-twin.vercel.app',
    },
    {
      id: 10,
      slug: 'demandos',
      title: 'DemandOS',
      description:
        'A deterministic ML system that turns raw synthetic commerce records into demand forecasts, stockout-risk signals, and internal reorder recommendations.',
      commercialRelevance:
        'Shows how inventory intelligence can stay auditable: raw records in, computed planning signals out, and no autonomous purchasing in between.',
      tags: [
        'Machine Learning',
        'Operations Intelligence',
        'Forecasting',
        'Inventory Risk',
        'Live demo',
        'GitHub',
        'Tests',
        'Synthetic data',
      ],
      status: 'Public portfolio prototype',
      cta: 'View Case Study',
      image: '/images/case-studies/demandos/thumb/thumb.webp',
      imageWidth: 1254,
      imageHeight: 1254,
      color: 'var(--accent)',
      subtitle: 'Machine Learning / Inventory Intelligence',
      mood: ['minimal', 'tech', 'editorial'],
      githubUrl: 'https://github.com/RaulMermans/demand-OS',
      liveUrl: 'https://demand-os-three.vercel.app',
    },
    {
      id: 9,
      slug: 'campaign-pulse',
      title: 'Campaign Pulse',
      description:
        'A marketing intelligence product designed to turn campaign and audience activity into clearer commercial decisions.',
      commercialRelevance:
        'Explores how campaign teams can move from scattered activity to a more legible commercial picture, before technical implementation becomes the story.',
      tags: [
        'Next.js',
        'TypeScript',
        'Recharts',
        'CSV adapters',
        'Deterministic analytics',
      ],
      status: 'Portfolio-ready / local-first prototype',
      cta: 'View Case Study',
      image: '/images/case-studies/campaign-pulse/thumb/thumb.webp',
      imageWidth: 1254,
      imageHeight: 1254,
      color: 'var(--accent)',
      subtitle: 'Marketing intelligence / Data product',
      mood: ['minimal', 'tech', 'editorial'],
      githubUrl: 'https://github.com/RaulMermans/campaign-pulse',
      liveUrl: 'https://campaign-pulse.vercel.app/',
    },
    {
      id: 0,
      slug: 'ai-sports',
      title: 'AI Sports Campaign',
      description:
        'AI campaign workflow for controlled visual iteration and campaign consistency.',
      commercialRelevance:
        'For creative teams that need faster visual variants without losing art direction, continuity, or brand control.',
      tags: ['AI Campaign System', 'Creative Operations', 'Brand Consistency'],
      cta: 'View Case Study',
      image: '/images/case-studies/ai-sports/thumb/thumb.webp',
      imageWidth: 2752,
      imageHeight: 1536,
      color: 'var(--color-0)',
      subtitle: 'AI System Design & Creative Operations',
      mood: ['bold', 'tech'],
    },
    {
      id: 1,
      slug: 'remoria',
      title: 'Remoria',
      description:
        'Luxury fragrance identity system with scalable creative and AI-ready brand rules.',
      commercialRelevance:
        'For brands that need product stories, packaging, content, and AI-assisted outputs to stay coherent.',
      tags: ['Brand System', 'Creative Direction', 'Luxury Identity'],
      cta: 'View Case Study',
      image: '/images/case-studies/remoria/thumb/thumb.webp',
      imageWidth: 1536,
      imageHeight: 1024,
      color: 'var(--color-1)',
      subtitle: 'Brand System Design & Creative Infrastructure',
      mood: ['minimal', 'editorial'],
    },
    {
      id: 5,
      slug: 'raul-portfolio',
      title: 'Raul Mermans Portfolio',
      description:
        'Digital identity system for case studies, visual work, and technical proof.',
      commercialRelevance:
        'For presenting multidisciplinary creative and technical work through a clearer system of proof.',
      tags: ['Portfolio System', 'Brand Architecture', 'Technical Proof'],
      cta: 'View Case Study',
      image: '/images/case-studies/raul-portfolio/thumb/thumb.webp',
      imageWidth: 3014,
      imageHeight: 1516,
      color: 'var(--color-1)',
      subtitle: 'Brand Systems / Digital Identity / Portfolio Architecture',
      mood: ['minimal', 'editorial'],
      githubUrl: 'https://github.com/RaulMermans/raul-portfolio',
      liveUrl: 'https://www.raulmermans.com',
    },
    {
      id: 4,
      slug: 'website-auditor',
      title: 'Website Audit Agent',
      description:
        'Evidence-first AI workflow for website and experience audits.',
      commercialRelevance:
        'For teams that need faster digital diagnostics without unsupported AI feedback.',
      tags: ['Website Audit', 'AI Evaluation', 'Experience Diagnostics'],
      cta: 'View System Logic',
      image: '/images/case-studies/website-auditor/thumb/thumb.webp',
      imageWidth: 1672,
      imageHeight: 941,
      color: 'var(--accent)',
      subtitle: 'AI Systems / Audit Workflow',
      mood: ['minimal', 'tech'],
      githubUrl: 'https://github.com/RaulMermans/website-auditor',
    },
    {
      id: 7,
      slug: 'campaign-sandbox',
      title: 'Campaign Sandbox',
      description:
        'A new model for how creative teams develop, compare, and strengthen campaign ideas.',
      commercialRelevance:
        'Shows how a better creative workflow can make space for strategic comparison, stronger ideas, and human judgment before production begins.',
      tags: [
        'AI Workflows',
        'Creative Strategy',
        'Next.js',
        'TypeScript',
        'OpenAI',
        'Evaluation & Guardrails',
      ],
      status: 'Finished internal v1',
      cta: 'Read case study',
      image: '/images/case-studies/campaign-sandbox/thumb/thumb.webp',
      imageWidth: 1672,
      imageHeight: 941,
      color: 'var(--accent)',
      subtitle: 'Internal AI Strategy Workspace',
      mood: ['minimal', 'tech', 'editorial'],
      githubUrl: 'https://github.com/RaulMermans/campaign-sandbox',
    },
    {
      id: 8,
      slug: 'blogagent',
      title: 'BlogAgent',
      description:
        'AI editorial workflow for generating copy-ready blog drafts with research, candidate validation, review, and human control.',
      commercialRelevance:
        'For editorial teams that need faster first drafts without giving up source awareness, recommendation constraints, or human review.',
      tags: [
        'Agentic workflow',
        'LLM systems',
        'Editorial AI',
        'Source-aware drafting',
        'Human-in-the-loop',
        'Python',
        'FastAPI',
      ],
      status: 'Public repo / portfolio case study',
      cta: 'View Case Study',
      image: '/images/case-studies/blogagent/thumb/thumb.webp',
      imageWidth: 1254,
      imageHeight: 1254,
      color: 'var(--accent)',
      subtitle: 'AI Systems & Agents / Editorial Workflow',
      mood: ['minimal', 'tech', 'editorial'],
      githubUrl: 'https://github.com/RaulMermans/BlogAgent',
    },
    {
      id: 6,
      slug: 'territoryops-spain',
      title: 'TerritoryOps Spain',
      description:
        'Private atlas and operational console for managing real estate opportunities by location, status, follow-up, and deal stage.',
      commercialRelevance:
        'For validating how a focused internal tool can turn fragmented location research into a clear operating workflow.',
      tags: ['Internal Tool', 'Product Prototype', 'Real Estate Operations'],
      cta: 'View Case Study',
      image: '/images/case-studies/territoryops-spain/thumb/thumb.webp',
      imageWidth: 1672,
      imageHeight: 941,
      color: 'var(--color-0)',
      subtitle: 'Internal tool / Product prototype / Business intelligence',
      mood: ['minimal', 'tech', 'editorial'],
      githubUrl: 'https://github.com/RaulMermans/territoryops-spain',
      liveUrl: 'https://territoryops-spain.vercel.app',
    },
    {
      id: 2,
      slug: 'data-brief-ai',
      title: 'DataBrief AI',
      description:
        'Bounded AI reporting system for grounded spreadsheet briefs.',
      commercialRelevance:
        'For teams that need faster interpretation of messy data without unsupported AI claims.',
      tags: ['AI Reporting', 'Data Analysis', 'Decision Support'],
      cta: 'View System Logic',
      image: '/images/case-studies/data-brief-ai/thumb/thumb.webp',
      imageWidth: 1254,
      imageHeight: 1254,
      color: 'var(--accent)',
      subtitle: 'AI Systems / Analytics Workflow',
      mood: ['minimal', 'tech'],
      githubUrl: 'https://github.com/RaulMermans/DataBrief-AI.git',
      liveUrl: 'https://data-brief-ai-sigma.vercel.app',
    },
    {
      id: 3,
      slug: 'benchmark-dashboard',
      title: 'Benchmark Intelligence Engine',
      description:
        'Raw-data benchmark intelligence engine for tracked share, rankings, monetization diagnostics, aggregation, and scenario projections.',
      commercialRelevance:
        'For repeatable benchmark analysis, public-safe data-product storytelling, and clearer strategic readouts.',
      tags: ['Benchmarking', 'Market Intelligence', 'Data Product'],
      cta: 'View System Logic',
      image: '/images/case-studies/benchmark-dashboard/thumb/thumb.webp',
      imageWidth: 1536,
      imageHeight: 1024,
      color: 'var(--color-0)',
      subtitle: 'Raw-data benchmark intelligence engine',
      mood: ['minimal', 'tech'],
      githubUrl: 'https://github.com/RaulMermans/benchmark_dashboard',
      liveUrl: 'https://benchmark-dashboard-tb47.vercel.app/',
    },
  ],
  es: [
    {
      id: 11,
      slug: 'opstwin',
      title: 'OpsTwin',
      description:
        'Laboratorio de simulación operativa y apoyo a decisiones para comparar cambios de servicio bajo condiciones simuladas equivalentes.',
      commercialRelevance:
        'Muestra cómo examinar compensaciones de plantilla y workflow antes de un piloto operativo, sin presentar la simulación como certeza.',
      tags: [
        'Simulación',
        'Apoyo a decisiones',
        'Operaciones',
        'Next.js',
        'FastAPI',
        'Python',
      ],
      status: 'Prototipo de producto desplegado',
      cta: 'Ver caso de estudio',
      image: '/images/case-studies/opstwin/thumb.svg',
      imageWidth: 1600,
      imageHeight: 1000,
      color: 'var(--accent)',
      subtitle: 'Simulación operativa / Producto de apoyo a decisiones',
      mood: ['minimal', 'tech', 'editorial'],
      githubUrl: 'https://github.com/RaulMermans/OpsTwin.git',
      liveUrl: 'https://ops-twin.vercel.app',
    },
    {
      id: 10,
      slug: 'demandos',
      title: 'DemandOS',
      description:
        'Prototipo de machine learning para previsión de demanda, riesgo de stockout y recomendaciones internas de reposición sobre datos sintéticos de comercio.',
      commercialRelevance:
        'Muestra cómo mantener auditable la inteligencia de inventario: registros raw, señales de planificación calculadas y ninguna compra autónoma entre medias.',
      tags: [
        'Machine Learning',
        'Inteligencia operativa',
        'Forecasting',
        'Riesgo de inventario',
        'Demo',
        'GitHub',
        'Tests',
        'Datos sintéticos',
      ],
      status: 'Prototipo público de portfolio',
      cta: 'Ver caso',
      image: '/images/case-studies/demandos/thumb/thumb.webp',
      imageWidth: 1254,
      imageHeight: 1254,
      color: 'var(--accent)',
      subtitle: 'Machine Learning / Inventory Intelligence',
      mood: ['minimal', 'tech', 'editorial'],
      githubUrl: 'https://github.com/RaulMermans/demand-OS',
      liveUrl: 'https://demand-os-three.vercel.app',
    },
    {
      id: 9,
      slug: 'campaign-pulse',
      title: 'Campaign Pulse',
      description:
        'Un producto de inteligencia de marketing diseñado para convertir la actividad de campañas y audiencias en decisiones comerciales más claras.',
      commercialRelevance:
        'Explora cómo los equipos de campaña pueden pasar de actividad dispersa a una visión comercial más legible antes de que la implementación técnica sea el centro del relato.',
      tags: [
        'Next.js',
        'TypeScript',
        'Recharts',
        'Adaptadores CSV',
        'Analítica determinista',
      ],
      status: 'Listo para portfolio / prototipo local-first',
      cta: 'Ver caso',
      image: '/images/case-studies/campaign-pulse/thumb/thumb.webp',
      imageWidth: 1254,
      imageHeight: 1254,
      color: 'var(--accent)',
      subtitle: 'Inteligencia de marketing / Producto de datos',
      mood: ['minimal', 'tech', 'editorial'],
      githubUrl: 'https://github.com/RaulMermans/campaign-pulse',
      liveUrl: 'https://campaign-pulse.vercel.app/',
    },
    {
      id: 0,
      slug: 'ai-sports',
      title: 'Campaña deportiva con IA',
      description:
        'Flujo de campaña con IA para iteración visual controlada y consistencia de campaña.',
      commercialRelevance:
        'Para equipos creativos que necesitan variantes visuales más rápidas sin perder dirección de arte, continuidad ni control de marca.',
      tags: [
        'Sistema de campaña IA',
        'Operaciones creativas',
        'Consistencia de marca',
      ],
      cta: 'Ver caso',
      image: '/images/case-studies/ai-sports/thumb/thumb.webp',
      imageWidth: 2752,
      imageHeight: 1536,
      color: 'var(--color-0)',
      subtitle: 'Diseño de sistema de IA y operaciones creativas',
      mood: ['bold', 'tech'],
    },
    {
      id: 1,
      slug: 'remoria',
      title: 'Remoria',
      description:
        'Sistema de identidad de fragancia de lujo con reglas creativas escalables y preparadas para IA.',
      commercialRelevance:
        'Para marcas que necesitan coherencia entre relato de producto, packaging, contenido y resultados asistidos por IA.',
      tags: ['Sistema de marca', 'Dirección creativa', 'Identidad de lujo'],
      cta: 'Ver caso',
      image: '/images/case-studies/remoria/thumb/thumb.webp',
      imageWidth: 1536,
      imageHeight: 1024,
      color: 'var(--color-1)',
      subtitle: 'Diseño de sistema de marca e infraestructura creativa',
      mood: ['minimal', 'editorial'],
    },
    {
      id: 5,
      slug: 'raul-portfolio',
      title: 'Raul Mermans Portfolio',
      description:
        'Sistema de identidad digital para casos, visuales y prueba técnica.',
      commercialRelevance:
        'Para presentar trabajo creativo y técnico multidisciplinar mediante un sistema de prueba más claro.',
      tags: ['Sistema de portfolio', 'Arquitectura de marca', 'Prueba técnica'],
      cta: 'Ver caso',
      image: '/images/case-studies/raul-portfolio/thumb/thumb.webp',
      imageWidth: 3014,
      imageHeight: 1516,
      color: 'var(--color-1)',
      subtitle:
        'Sistemas de marca / Identidad digital / Arquitectura de portafolio',
      mood: ['minimal', 'editorial'],
      githubUrl: 'https://github.com/RaulMermans/raul-portfolio',
      liveUrl: 'https://www.raulmermans.com',
    },
    {
      id: 4,
      slug: 'website-auditor',
      title: 'Website Audit Agent',
      description: 'Flujo de auditoría web y experiencia basado en evidencia.',
      commercialRelevance:
        'Para equipos que necesitan diagnósticos digitales más rápidos sin feedback de IA sin respaldo.',
      tags: ['Auditoría web', 'Evaluación IA', 'Diagnóstico de experiencia'],
      cta: 'Ver lógica del sistema',
      image: '/images/case-studies/website-auditor/thumb/thumb.webp',
      imageWidth: 1672,
      imageHeight: 941,
      color: 'var(--accent)',
      subtitle: 'Sistemas de IA / Flujo de auditoría',
      mood: ['minimal', 'tech'],
      githubUrl: 'https://github.com/RaulMermans/website-auditor',
    },
    {
      id: 7,
      slug: 'campaign-sandbox',
      title: 'Campaign Sandbox',
      description:
        'Un nuevo modelo para que los equipos creativos desarrollen, comparen y fortalezcan ideas de campaña.',
      commercialRelevance:
        'Muestra cómo un mejor flujo creativo puede abrir espacio para la comparación estratégica, ideas más sólidas y criterio humano antes de empezar la producción.',
      tags: [
        'Flujos IA',
        'Estrategia creativa',
        'Next.js',
        'TypeScript',
        'OpenAI',
        'Evaluación y guardrails',
      ],
      status: 'v1 interna finalizada',
      cta: 'Leer caso',
      image: '/images/case-studies/campaign-sandbox/thumb/thumb.webp',
      imageWidth: 1672,
      imageHeight: 941,
      color: 'var(--accent)',
      subtitle: 'Espacio interno de estrategia con IA',
      mood: ['minimal', 'tech', 'editorial'],
      githubUrl: 'https://github.com/RaulMermans/campaign-sandbox',
    },
    {
      id: 8,
      slug: 'blogagent',
      title: 'BlogAgent',
      description:
        'Flujo editorial con IA para generar borradores de blog copy-ready, con investigación, validación de candidatos, revisión y control humano.',
      commercialRelevance:
        'Para equipos editoriales que necesitan primeros borradores más rápidos sin perder trazabilidad de fuentes, restricciones de recomendación ni revisión humana.',
      tags: [
        'Agentic workflow',
        'LLM systems',
        'Editorial AI',
        'Source-aware drafting',
        'Human-in-the-loop',
        'Python',
        'FastAPI',
      ],
      status: 'Repo público / caso de portfolio',
      cta: 'Ver caso',
      image: '/images/case-studies/blogagent/thumb/thumb.webp',
      imageWidth: 1254,
      imageHeight: 1254,
      color: 'var(--accent)',
      subtitle: 'Sistemas de IA y agentes / Flujo editorial',
      mood: ['minimal', 'tech', 'editorial'],
      githubUrl: 'https://github.com/RaulMermans/BlogAgent',
    },
    {
      id: 6,
      slug: 'territoryops-spain',
      title: 'TerritoryOps Spain',
      description:
        'Atlas privado y consola operativa para gestionar oportunidades inmobiliarias por ubicación, estado, seguimiento y fase.',
      commercialRelevance:
        'Para validar cómo una herramienta interna enfocada convierte investigación dispersa de ubicaciones en un flujo operativo claro.',
      tags: [
        'Herramienta interna',
        'Prototipo de producto',
        'Operaciones inmobiliarias',
      ],
      cta: 'Ver caso',
      image: '/images/case-studies/territoryops-spain/thumb/thumb.webp',
      imageWidth: 1672,
      imageHeight: 941,
      color: 'var(--color-0)',
      subtitle:
        'Herramienta interna / Prototipo de producto / Inteligencia de negocio',
      mood: ['minimal', 'tech', 'editorial'],
      githubUrl: 'https://github.com/RaulMermans/territoryops-spain',
      liveUrl: 'https://territoryops-spain.vercel.app',
    },
    {
      id: 2,
      slug: 'data-brief-ai',
      title: 'DataBrief AI',
      description:
        'Sistema de reporting IA acotado para briefs de hojas de cálculo con fundamento.',
      commercialRelevance:
        'Para equipos que necesitan interpretar datos desordenados más rápido sin afirmaciones de IA sin respaldo.',
      tags: ['Reporting IA', 'Análisis de datos', 'Apoyo a decisión'],
      cta: 'Ver lógica del sistema',
      image: '/images/case-studies/data-brief-ai/thumb/thumb.webp',
      imageWidth: 1254,
      imageHeight: 1254,
      color: 'var(--accent)',
      subtitle: 'Sistemas de IA / Flujo analítico',
      mood: ['minimal', 'tech'],
      githubUrl: 'https://github.com/RaulMermans/DataBrief-AI.git',
      liveUrl: 'https://data-brief-ai-sigma.vercel.app',
    },
    {
      id: 3,
      slug: 'benchmark-dashboard',
      title: 'Benchmark Intelligence Engine',
      description:
        'Motor de inteligencia benchmark desde datos raw para cuota, rankings, monetización, agregación y escenarios.',
      commercialRelevance:
        'Para análisis benchmark repetible, storytelling de producto de datos publicable y lecturas estratégicas más claras.',
      tags: ['Benchmarking', 'Inteligencia de mercado', 'Producto de datos'],
      cta: 'Ver lógica del sistema',
      image: '/images/case-studies/benchmark-dashboard/thumb/thumb.webp',
      imageWidth: 1536,
      imageHeight: 1024,
      color: 'var(--color-0)',
      subtitle: 'Motor benchmark desde datos raw',
      mood: ['minimal', 'tech'],
      githubUrl: 'https://github.com/RaulMermans/benchmark_dashboard',
      liveUrl: 'https://benchmark-dashboard-tb47.vercel.app/',
    },
  ],
}

export function getCaseStudies(locale: Locale): CaseStudy[] {
  // Strategic portfolio order lives in CASE_STUDY_ORDER so the hierarchy can be
  // switched for a different role focus without rewriting localized entries.
  const rank = new Map<string, number>(
    CASE_STUDY_ORDER.map((slug, index) => [slug, index])
  )

  return caseStudyEntries[locale]
    .map(study => {
      const editorial = getCaseStudyEditorial(study.slug)

      return {
        id: study.id,
        slug: study.slug,
        title: study.title,
        description: study.description,
        commercialRelevance: study.commercialRelevance,
        tags: study.tags,
        status: study.status,
        cta: study.cta,
        image: study.image,
        imageWidth: study.imageWidth,
        imageHeight: study.imageHeight,
        href: localizePath(`/case-studies/${study.slug}`, locale),
        color: study.color,
        subtitle: study.subtitle,
        mood: study.mood,
        githubUrl: study.githubUrl,
        liveUrl: study.liveUrl,
        category: editorial?.category[locale],
        proofTags: editorial?.proofTags[locale],
      }
    })
    .sort((a, b) => (rank.get(a.slug) ?? 999) - (rank.get(b.slug) ?? 999))
}

export function getRelatedCaseStudies(
  currentHref: string,
  locale: Locale
): CaseStudy[] {
  const caseStudies = getCaseStudies(locale)
  const currentPath = stripLocaleFromPath(currentHref)
  const currentSlug = currentPath.split('/').filter(Boolean).at(-1) ?? ''
  const relatedSlugs = getCaseStudyEditorial(currentSlug)?.related ?? []

  const related = relatedSlugs
    .map(slug => caseStudies.find(study => study.slug === slug))
    .filter((study): study is CaseStudy => Boolean(study))

  if (related.length > 0) return related

  return caseStudies
    .filter(study => stripLocaleFromPath(study.href) !== currentPath)
    .slice(0, 2)
}
