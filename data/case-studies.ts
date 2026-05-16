import type { Locale } from '@/lib/i18n'
import { localizePath } from '@/lib/i18n'

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
      id: 3,
      slug: 'benchmark-dashboard',
      title: 'Benchmark Dashboard Template',
      description:
        'A reusable intelligence interface built with React, Vite, Tailwind CSS, and Recharts. Transforms mock benchmark data into rankings, trends, comparisons, events, and forecast scenarios.',
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
        'An AI campaign system built in n8n to keep casting, wardrobe, and art direction consistent across fast-moving sports marketing outputs.',
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
        'A brand system case study showing how identity logic, restraint, and creative infrastructure can scale a premium world without losing coherence.',
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
        'A bounded AI analytics workflow that turns CSV/XLSX uploads into structured, grounded business reports through semantic role detection, controlled Python execution, bounded repair, and exportable outputs.',
      image: '/images/case-studies/data-brief-ai/thumb/thumb.webp',
      imageWidth: 1254,
      imageHeight: 1254,
      color: 'var(--accent)',
      subtitle: 'AI Systems / Analytics Workflow',
      mood: ['minimal', 'tech'],
    },
  ],
  es: [
    {
      id: 3,
      slug: 'benchmark-dashboard',
      title: 'Benchmark Dashboard Template',
      description:
        'Una interfaz de inteligencia reutilizable construida con React, Vite, Tailwind CSS y Recharts. Transforma datos mock de benchmark en rankings, tendencias, comparativas, eventos y escenarios de forecast.',
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
        'Un sistema de campaña con IA construido en n8n para mantener consistentes el casting, el vestuario y la dirección de arte en piezas de marketing deportivo de ritmo rápido.',
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
        'Un caso de sistema de marca que muestra cómo la lógica de identidad, la contención y la infraestructura creativa pueden escalar un mundo premium sin perder coherencia.',
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
        'Un flujo de analítica con IA acotado que convierte CSV/XLSX en informes de negocio estructurados y fundamentados mediante detección semántica, ejecución controlada de Python, reparación limitada y exportaciones.',
      image: '/images/case-studies/data-brief-ai/thumb/thumb.webp',
      imageWidth: 1254,
      imageHeight: 1254,
      color: 'var(--accent)',
      subtitle: 'Sistemas de IA / Flujo analítico',
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

  if (typeof window === 'undefined') {
    const available = caseStudies.filter((cs) => cs.href !== currentHref)
    return available[0] || caseStudies[0]
  }

  const storageKey = `next-case-study-${locale}-${currentHref}`
  const stored = sessionStorage.getItem(storageKey)

  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      const found = caseStudies.find((cs) => cs.href === parsed.href && cs.href !== currentHref)
      if (found) {
        return found
      }
    } catch {
      // Ignore invalid stored state.
    }
  }

  const available = caseStudies.filter((cs) => cs.href !== currentHref)
  if (available.length === 0) {
    return caseStudies[0]
  }

  const randomIndex = Math.floor(Math.random() * available.length)
  const selected = available[randomIndex]
  sessionStorage.setItem(storageKey, JSON.stringify(selected))

  return selected
}
