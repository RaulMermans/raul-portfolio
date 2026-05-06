import { getCaseStudies, type CaseStudy } from '@/data/case-studies'
import type { Locale } from '@/lib/i18n'
import { localizePath } from '@/lib/i18n'

export type CaseStudyCategorySlug = 'ai-systems-agents' | 'campaign-systems' | 'brand-systems'

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

const placeholderImage = '/images/case-studies/case-studies-thumbnail.webp'

function findStudy(caseStudies: CaseStudy[], hrefPart: string) {
  return caseStudies.find((study) => study.href.includes(hrefPart))
}

export function getCaseStudyCategories(locale: Locale): CaseStudyCategory[] {
  const isSpanish = locale === 'es'
  const caseStudies = getCaseStudies(locale)
  const aiSports = findStudy(caseStudies, 'ai-sports')
  const remoria = findStudy(caseStudies, 'remoria')
  const dataBriefAi = findStudy(caseStudies, 'data-brief-ai')

  return [
    {
      slug: 'ai-systems-agents',
      title: isSpanish ? 'Sistemas de IA y agentes' : 'AI Systems & Agents',
      eyebrow: isSpanish ? 'Nueva categoría' : 'New category',
      description: isSpanish
        ? 'Agentes y sistemas aplicados que convierten análisis, auditoría y decisiones repetibles en flujos utilizables.'
        : 'Applied agents and systems that turn analysis, audits, and repeatable decisions into usable workflows.',
      href: localizePath('/case-studies/ai-systems-agents', locale),
      projects: [
        dataBriefAi
          ? {
              title: dataBriefAi.title,
              label: dataBriefAi.subtitle ?? (isSpanish ? 'Flujo analítico con IA' : 'AI analytics workflow'),
              description: dataBriefAi.description,
              image: dataBriefAi.image,
              href: dataBriefAi.href,
            }
          : {
              title: 'DataBrief AI',
              label: isSpanish ? 'Flujo analítico con IA' : 'AI analytics workflow',
              description: isSpanish
                ? 'Flujo acotado para convertir hojas de cálculo en informes fundamentados.'
                : 'A bounded workflow for turning spreadsheets into grounded reports.',
              image: placeholderImage,
            },
        {
          title: 'Website Auditor',
          label: isSpanish ? 'Agente de auditoría' : 'Audit agent',
          description: isSpanish
            ? 'Flujo de auditoría para detectar oportunidades de UX, SEO, rendimiento y contenido en una web.'
            : 'An audit workflow for surfacing UX, SEO, performance, and content opportunities across a website.',
          image: placeholderImage,
        },
      ],
    },
    {
      slug: 'campaign-systems',
      title: isSpanish ? 'Sistemas de campaña' : 'Campaign Systems',
      eyebrow: isSpanish ? 'Ejecución creativa' : 'Creative execution',
      description: isSpanish
        ? 'Infraestructura para mantener consistencia visual, narrativa y operativa en campañas de ritmo rápido.'
        : 'Infrastructure for keeping visual, narrative, and operational consistency inside fast-moving campaigns.',
      href: localizePath('/case-studies/campaign-systems', locale),
      projects: aiSports
        ? [
            {
              title: aiSports.title,
              label: aiSports.subtitle ?? (isSpanish ? 'Sistema de campaña con IA' : 'AI campaign system'),
              description: aiSports.description,
              image: aiSports.image,
              href: aiSports.href,
            },
          ]
        : [],
    },
    {
      slug: 'brand-systems',
      title: isSpanish ? 'Sistemas de marca' : 'Brand Systems',
      eyebrow: isSpanish ? 'Identidad escalable' : 'Scalable identity',
      description: isSpanish
        ? 'Identidades, reglas visuales y lógica de marca pensadas para escalar sin perder precisión.'
        : 'Identities, visual rules, and brand logic designed to scale without losing precision.',
      href: localizePath('/case-studies/brand-systems', locale),
      projects: remoria
        ? [
            {
              title: remoria.title,
              label: remoria.subtitle ?? (isSpanish ? 'Sistema de marca' : 'Brand system'),
              description: remoria.description,
              image: remoria.image,
              href: remoria.href,
            },
          ]
        : [],
    },
  ]
}

export function getCaseStudyCategory(locale: Locale, slug: CaseStudyCategorySlug) {
  return getCaseStudyCategories(locale).find((category) => category.slug === slug)
}
