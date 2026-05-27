import type { Locale } from '@/lib/i18n'
import { localizePath, stripLocaleFromPath } from '@/lib/i18n'

export interface CaseStudy {
  id: number
  slug: string
  title: string
  description: string
  image: string
  imageWidth: number
  imageHeight: number
  href: string
  color: string
  subtitle?: string
  mood?: string[]
}

export const MOODS = ['All', 'minimal', 'bold', 'editorial', 'tech'] as const

const caseStudyEntries = {
  en: [
    {
      id: 5,
      slug: 'raul-portfolio',
      title: 'Raul Mermans Portfolio',
      description:
        'Personal brand system for strategy, AI/product work, photography, and visual experimentation.',
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
        'Reusable dashboard template for rankings, trends, and forecasts.',
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
        'n8n campaign workflow for consistent casting and art direction.',
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
        'Luxury brand system built around identity, restraint, and story.',
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
        'Bounded AI workflow for grounded spreadsheet reports.',
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
        'Evidence-backed audit workflow for UX, SEO, performance, content, and prospect intelligence.',
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
        'Sistema de marca personal para estrategia, trabajo de IA/producto, fotografía y experimentación visual.',
      image: '/images/case-studies/case-studies-thumbnail.webp',
      imageWidth: 3000,
      imageHeight: 2000,
      color: 'var(--color-1)',
      subtitle: 'Sistemas de marca / Identidad digital / Arquitectura de portfolio',
      mood: ['minimal', 'editorial'],
    },
    {
      id: 3,
      slug: 'benchmark-dashboard',
      title: 'Benchmark Dashboard Template',
      description:
        'Dashboard reutilizable para rankings, tendencias y forecast.',
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
      title: 'Campaña deportiva con IA',
      description:
        'Flujo en n8n para campañas con casting y dirección consistentes.',
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
        'Sistema de marca premium basado en identidad, contención y relato.',
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
        'Flujo de IA acotado para informes fundamentados desde CSV/XLSX.',
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
        'Flujo de auditoría basado en evidencia para UX, SEO, rendimiento, contenido e inteligencia comercial.',
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
