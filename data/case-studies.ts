import type { Locale } from '@/lib/i18n'
import { localizePath, stripLocaleFromPath } from '@/lib/i18n'

export interface CaseStudy {
  id: number
  slug: string
  title: string
  description: string
  commercialRelevance?: string
  tags?: string[]
  cta?: string
  image: string
  imageWidth: number
  imageHeight: number
  href: string
  color: string
  subtitle?: string
  mood?: string[]
}

export const MOODS = ['All', 'minimal', 'bold', 'editorial', 'tech'] as const

type CaseStudyEntry = Omit<CaseStudy, 'href'>

const caseStudyEntries: Record<Locale, CaseStudyEntry[]> = {
  en: [
    {
      id: 5,
      slug: 'raul-portfolio',
      title: 'Raul Mermans Portfolio',
      description:
        'Digital identity system for case studies, visual work, and technical proof.',
      commercialRelevance:
        'For presenting multidisciplinary work with clearer narrative structure.',
      tags: ['Portfolio System', 'Brand Architecture', 'Technical Proof'],
      cta: 'View Case Study',
      image: '/images/case-studies/case-studies-thumbnail.webp',
      imageWidth: 3000,
      imageHeight: 2000,
      color: 'var(--color-1)',
      subtitle: 'Brand Systems / Digital Identity / Portfolio Architecture',
      mood: ['minimal', 'editorial'],
    },
    {
      id: 3,
      slug: 'benchmark-dashboard',
      title: 'Benchmark Dashboard Template',
      description:
        'Competitive intelligence dashboard for market and positioning signals.',
      commercialRelevance:
        'For repeatable competitor analysis and clearer executive readouts.',
      tags: ['Benchmarking', 'Market Intelligence', 'Brand Strategy'],
      cta: 'View System Logic',
      image: '/images/case-studies/benchmark-dashboard/thumb/thumb.webp',
      imageWidth: 1536,
      imageHeight: 1024,
      color: 'var(--color-0)',
      subtitle: 'Data product / Business intelligence dashboard',
      mood: ['minimal', 'tech'],
    },
    {
      id: 0,
      slug: 'ai-sports',
      title: 'AI Sports Campaign',
      description:
        'AI campaign workflow for controlled visual iteration.',
      commercialRelevance:
        'For faster variants without losing campaign continuity.',
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
        'Luxury fragrance identity system with scalable creative rules.',
      commercialRelevance:
        'For keeping product stories, packaging, and content coherent.',
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
      id: 2,
      slug: 'data-brief-ai',
      title: 'DataBrief AI',
      description:
        'AI reporting system for grounded spreadsheet briefs.',
      commercialRelevance:
        'For faster reporting from messy CSV or XLSX files.',
      tags: ['AI Reporting', 'Data Analysis', 'Decision Support'],
      cta: 'View System Logic',
      image: '/images/case-studies/data-brief-ai/thumb/thumb.webp',
      imageWidth: 1254,
      imageHeight: 1254,
      color: 'var(--accent)',
      subtitle: 'AI Systems / Analytics Workflow',
      mood: ['minimal', 'tech'],
    },
    {
      id: 4,
      slug: 'website-auditor',
      title: 'Website Audit Agent',
      description:
        'Evidence-first AI workflow for website audits.',
      commercialRelevance:
        'For faster UX, SEO, and conversion diagnostics.',
      tags: ['Website Audit', 'AI Evaluation', 'Conversion'],
      cta: 'View System Logic',
      image: '/images/case-studies/website-auditor/thumb/thumb.webp',
      imageWidth: 1672,
      imageHeight: 941,
      color: 'var(--accent)',
      subtitle: 'AI Systems / Audit Workflow',
      mood: ['minimal', 'tech'],
    },
  ],
  es: [
    {
      id: 5,
      slug: 'raul-portfolio',
      title: 'Raul Mermans Portfolio',
      description:
        'Sistema de identidad para casos, visuales y prueba técnica.',
      image: '/images/case-studies/case-studies-thumbnail.webp',
      imageWidth: 3000,
      imageHeight: 2000,
      color: 'var(--color-1)',
      subtitle: 'Sistemas de marca / Identidad digital / Arquitectura de portafolio',
      mood: ['minimal', 'editorial'],
    },
    {
      id: 3,
      slug: 'benchmark-dashboard',
      title: 'Benchmark Dashboard Template',
      description:
        'Panel de inteligencia competitiva para señales de mercado y posicionamiento.',
      image: '/images/case-studies/benchmark-dashboard/thumb/thumb.webp',
      imageWidth: 1536,
      imageHeight: 1024,
      color: 'var(--color-0)',
      subtitle: 'Producto de datos / Inteligencia de negocio',
      mood: ['minimal', 'tech'],
    },
    {
      id: 0,
      slug: 'ai-sports',
      title: 'Campaña deportiva con IA',
      description:
        'Flujo de campaña con iteración visual controlada.',
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
        'Sistema de identidad premium con reglas creativas escalables.',
      image: '/images/case-studies/remoria/thumb/thumb.webp',
      imageWidth: 1536,
      imageHeight: 1024,
      color: 'var(--color-1)',
      subtitle: 'Diseño de sistema de marca e infraestructura creativa',
      mood: ['minimal', 'editorial'],
    },
    {
      id: 2,
      slug: 'data-brief-ai',
      title: 'DataBrief AI',
      description:
        'Sistema de informes contrastados desde CSV/XLSX.',
      image: '/images/case-studies/data-brief-ai/thumb/thumb.webp',
      imageWidth: 1254,
      imageHeight: 1254,
      color: 'var(--accent)',
      subtitle: 'Sistemas de IA / Flujo analítico',
      mood: ['minimal', 'tech'],
    },
    {
      id: 4,
      slug: 'website-auditor',
      title: 'Website Audit Agent',
      description:
        'Flujo de auditoría web con evidencia y síntesis acotada.',
      image: '/images/case-studies/website-auditor/thumb/thumb.webp',
      imageWidth: 1672,
      imageHeight: 941,
      color: 'var(--accent)',
      subtitle: 'Sistemas de IA / Flujo de auditoría',
      mood: ['minimal', 'tech'],
    },
  ],
}

export function getCaseStudies(locale: Locale): CaseStudy[] {
  return caseStudyEntries[locale].map((study) => ({
    id: study.id,
    slug: study.slug,
    title: study.title,
    description: study.description,
    commercialRelevance: study.commercialRelevance,
    tags: study.tags,
    cta: study.cta,
    image: study.image,
    imageWidth: study.imageWidth,
    imageHeight: study.imageHeight,
    href: localizePath(`/case-studies/${study.slug}`, locale),
    color: study.color,
    subtitle: study.subtitle,
    mood: study.mood,
  }))
}

export function getRandomCaseStudy(currentHref: string, locale: Locale): CaseStudy {
  const caseStudies = getCaseStudies(locale)
  const currentPath = stripLocaleFromPath(currentHref)
  const available = caseStudies.filter((cs) => stripLocaleFromPath(cs.href) !== currentPath)

  if (available.length === 0) {
    return caseStudies[0]
  }

  const randomIndex = Math.floor(Math.random() * available.length)
  return available[randomIndex]
}
