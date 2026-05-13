'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { getCaseStudies, type CaseStudy } from '@/data/case-studies'
import { getCaseStudyCategories, type CaseStudyCategorySlug } from '@/data/case-study-categories'
import { type Locale, getLocaleFromPath, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { absoluteRouteUrl, siteConfig } from '@/lib/metadata'

type FilterKey = 'all' | CaseStudyCategorySlug

const tileVariants = ['portrait', 'landscape', 'square', 'tall'] as const

function shuffleCaseStudies(studies: CaseStudy[], locale: Locale) {
  const storageKey = `case-studies-order-${locale}`
  const currentHrefs = studies.map((study) => study.href)
  let stored: string | null = null

  try {
    stored = window.sessionStorage.getItem(storageKey)
  } catch {
    stored = null
  }

  if (stored) {
    try {
      const storedHrefs = JSON.parse(stored) as string[]
      const hasSameProjects =
        storedHrefs.length === currentHrefs.length &&
        currentHrefs.every((href) => storedHrefs.includes(href))

      if (hasSameProjects) {
        return storedHrefs
          .map((href) => studies.find((study) => study.href === href))
          .filter((study): study is CaseStudy => Boolean(study))
      }
    } catch {
      // Ignore invalid session state and create a fresh order below.
    }
  }

  const shuffled = [...studies]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const currentStudy = shuffled[index]
    shuffled[index] = shuffled[randomIndex]
    shuffled[randomIndex] = currentStudy
  }

  try {
    window.sessionStorage.setItem(storageKey, JSON.stringify(shuffled.map((study) => study.href)))
  } catch {
    // Session storage is an enhancement; the shuffled in-memory order still works.
  }

  return shuffled
}

function getSchemas(locale: Locale) {
  const isSpanish = locale === 'es'
  const localizedHome = localizePath('/', locale)
  const localizedCaseStudies = localizePath('/case-studies', locale)

  return {
    collection: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${siteConfig.url}/#case-studies-page`,
      name: isSpanish ? 'Casos de estudio' : 'Case Studies',
      description: isSpanish
        ? 'Casos de estudio de Raúl Mermans sobre sistemas de IA, flujos de automatización, sistemas de marca y ejecución creativa con criterio de producto.'
        : 'Case studies by Raúl Mermans covering AI systems, automation workflows, brand systems, and product-minded creative execution.',
      url: absoluteRouteUrl(localizedCaseStudies),
      isPartOf: { '@type': 'WebSite', '@id': `${siteConfig.url}/#website` },
      about: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isSpanish ? 'Inicio' : 'Home',
          item: absoluteRouteUrl(localizedHome),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: isSpanish ? 'Casos de estudio' : 'Case Studies',
          item: absoluteRouteUrl(localizedCaseStudies),
        },
      ],
    },
  }
}

export default function CaseStudiesPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const caseStudies = useMemo(() => getCaseStudies(locale), [locale])
  const categories = useMemo(() => getCaseStudyCategories(locale), [locale])
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [orderedStudies, setOrderedStudies] = useState(caseStudies)
  const schemas = getSchemas(locale)
  const isSpanish = locale === 'es'
  const introCopy = isSpanish
    ? 'Todos los proyectos aparecen directamente. Filtra por línea de trabajo cuando quieras acotar el tipo de sistema.'
    : 'All projects appear directly. Filter by workstream when you want to narrow the kind of system.'
  const filterLabel = isSpanish ? 'Filtrar casos de estudio' : 'Filter case studies'
  const allLabel = isSpanish ? 'Todos' : 'All'
  const readCase = isSpanish ? 'Ver caso' : 'Read case'
  const resultLabel = isSpanish ? 'Mostrando' : 'Showing'

  const studyCategoryMap = useMemo(() => {
    const map = new Map<string, Array<{ slug: CaseStudyCategorySlug; title: string; label: string }>>()

    categories.forEach((category) => {
      category.projects.forEach((project) => {
        if (!project.href) return

        const current = map.get(project.href) ?? []
        current.push({
          slug: category.slug,
          title: category.title,
          label: project.label,
        })
        map.set(project.href, current)
      })
    })

    return map
  }, [categories])

  const categoryFilters = useMemo(
    () =>
      categories.filter((category) =>
        category.projects.some((project) =>
          project.href && caseStudies.some((study) => study.href === project.href),
        ),
      ),
    [caseStudies, categories],
  )

  const visibleStudies = useMemo(() => {
    if (activeFilter === 'all') return orderedStudies

    return orderedStudies.filter((study) =>
      studyCategoryMap.get(study.href)?.some((category) => category.slug === activeFilter),
    )
  }, [activeFilter, orderedStudies, studyCategoryMap])

  useEffect(() => {
    setActiveFilter('all')
    setOrderedStudies(shuffleCaseStudies(caseStudies, locale))
  }, [caseStudies, locale])

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" role="main" className="case-studies-index case-studies-index--gallery">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.collection) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }}
        />
        <section className="case-studies-index__intro" aria-labelledby="case-studies-heading">
          <p className="case-studies-index__eyebrow">{isSpanish ? 'Trabajo seleccionado' : 'Selected work'}</p>
          <div className="case-studies-index__hero-grid">
            <h1 id="case-studies-heading" className="case-studies-index__title">
              {isSpanish ? 'Casos de estudio' : 'Case Studies'}
            </h1>
            <p className="case-studies-index__prompt">{introCopy}</p>
          </div>
          <div className="case-studies-index__toolbar" aria-label={filterLabel}>
            <div className="case-studies-index__filters">
              <button
                type="button"
                className={`case-studies-index__filter ${activeFilter === 'all' ? 'is-active' : ''}`}
                aria-pressed={activeFilter === 'all'}
                onClick={() => setActiveFilter('all')}
              >
                {allLabel}
              </button>
              {categoryFilters.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  className={`case-studies-index__filter ${activeFilter === category.slug ? 'is-active' : ''}`}
                  aria-pressed={activeFilter === category.slug}
                  onClick={() => setActiveFilter(category.slug)}
                >
                  {category.title}
                </button>
              ))}
            </div>
            <p className="case-studies-index__count" aria-live="polite">
              {resultLabel} {visibleStudies.length}/{caseStudies.length}
            </p>
          </div>
        </section>

        <section className="case-study-project-grid" aria-label={isSpanish ? 'Proyectos' : 'Projects'}>
          {visibleStudies.map((study, index) => {
            const studyCategories = studyCategoryMap.get(study.href) ?? []
            const primaryLabel = studyCategories[0]?.label ?? study.subtitle ?? readCase
            const categoryLabel = studyCategories.map((category) => category.title).join(' / ')
            const variant = tileVariants[(study.id + index) % tileVariants.length]

            return (
              <Link
                key={study.href}
                href={study.href}
                className={`case-study-project-tile case-study-project-tile--${variant}`}
                aria-label={isSpanish ? `Ver caso de estudio: ${study.title}` : `Read case study: ${study.title}`}
              >
                <span className="case-study-project-tile__frame">
                  <Image
                    src={study.image}
                    alt=""
                    fill
                    sizes="(max-width: 560px) 100vw, (max-width: 880px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="case-study-project-tile__image"
                    priority={index < 2}
                  />
                  <span className="case-study-project-tile__reveal" aria-hidden="true">
                    <span>{readCase}</span>
                    <span className="case-study-project-tile__arrow">→</span>
                  </span>
                </span>
                <span className="case-study-project-tile__caption">
                  <span className="case-study-project-tile__meta">
                    <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <span aria-hidden="true">/</span>
                    <span>{categoryLabel || primaryLabel}</span>
                  </span>
                  <span className="case-study-project-tile__title">{study.title}</span>
                  <span className="case-study-project-tile__description">{study.description}</span>
                </span>
              </Link>
            )
          })}
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
