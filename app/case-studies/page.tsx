'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { type FormEvent, useMemo, useState } from 'react'
import { getCaseStudies } from '@/data/case-studies'
import {
  getCaseStudyCategories,
  type CaseStudyCategorySlug,
} from '@/data/case-study-categories'
import { type Locale, getLocaleFromPath, localizePath } from '@/lib/i18n'
import { absoluteRouteUrl, siteConfig } from '@/lib/metadata'

type FilterKey = 'all' | CaseStudyCategorySlug

const tileVariants = ['portrait', 'landscape', 'square', 'tall'] as const
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
        ? 'Casos de estudio de Raúl Mermans sobre campañas, inteligencia de marketing, productos digitales, marca, dirección visual y herramientas asistidas por IA.'
        : 'Case studies by Raúl Mermans spanning campaigns, marketing intelligence, digital products, brand thinking, visual direction, and AI-assisted tools.',
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
  const orderedStudies = caseStudies
  const schemas = getSchemas(locale)
  const isSpanish = locale === 'es'
  const browserTitle = isSpanish ? 'Casos de estudio' : 'Case Studies'
  const browserLead = isSpanish
    ? 'Campañas, datos, productos digitales, marca y herramientas asistidas por IA construidos alrededor de una oportunidad concreta.'
    : 'Campaigns, data, digital products, brand work, and AI-assisted tools built around a specific opportunity.'
  const filterLabel = isSpanish
    ? 'Filtrar casos de estudio'
    : 'Filter case studies'
  const allLabel = isSpanish ? 'Todos' : 'All'
  const readCase = isSpanish ? 'Ver caso' : 'View Case Study'
  const seeLabel = isSpanish ? 'Quiero ver...' : 'I want to see...'
  const goLabel = isSpanish
    ? 'Ir a los casos filtrados'
    : 'Go to filtered case studies'

  const studyCategoryMap = useMemo(() => {
    const map = new Map<
      string,
      Array<{ slug: CaseStudyCategorySlug; title: string; label: string }>
    >()

    categories.forEach(category => {
      category.projects.forEach(project => {
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
      categories.filter(category =>
        category.projects.some(
          project =>
            project.href &&
            caseStudies.some(study => study.href === project.href)
        )
      ),
    [caseStudies, categories]
  )

  const visibleStudies = useMemo(() => {
    if (activeFilter === 'all') return orderedStudies

    return orderedStudies.filter(study =>
      studyCategoryMap
        .get(study.href)
        ?.some(category => category.slug === activeFilter)
    )
  }, [activeFilter, orderedStudies, studyCategoryMap])

  const handleBrowserSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    document
      .getElementById('case-study-grid')
      ?.scrollIntoView({ block: 'start' })
  }

  return (
    <>
      <Header locale={locale} />
      <main
        id="main-content"
        role="main"
        className="case-studies-index case-studies-index--browser"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemas.collection),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemas.breadcrumb),
          }}
        />
        <section
          className="case-study-browser__chrome"
          aria-labelledby="case-studies-heading"
          data-mobile-audit="case-study-browser"
        >
          <div className="case-study-browser__intro">
            <p className="case-study-browser__eyebrow">
              {isSpanish ? 'Portafolio seleccionado' : 'Selected portfolio'}
            </p>
            <h1 id="case-studies-heading">{browserTitle}</h1>
            <p>{browserLead}</p>
          </div>
          <div className="case-study-browser__actions">
            <form
              className="case-study-browser__control"
              aria-label={filterLabel}
              onSubmit={handleBrowserSubmit}
            >
              <label className="visually-hidden" htmlFor="case-study-filter">
                {filterLabel}
              </label>
              <span
                className="case-study-browser__placeholder"
                aria-hidden="true"
              >
                {seeLabel}
              </span>
              <select
                id="case-study-filter"
                className="case-study-browser__select"
                value={activeFilter}
                onChange={event =>
                  setActiveFilter(event.target.value as FilterKey)
                }
              >
                <option value="all">{allLabel}</option>
                {categoryFilters.map(category => (
                  <option key={category.slug} value={category.slug}>
                    {category.title}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="case-study-browser__submit"
                aria-label={goLabel}
              >
                <span aria-hidden="true">→</span>
              </button>
            </form>
          </div>
        </section>

        <section
          id="case-study-grid"
          className="case-study-project-grid"
          aria-label={isSpanish ? 'Proyectos' : 'Projects'}
          data-mobile-audit="case-study-grid"
        >
          {visibleStudies.map((study, index) => {
            const variant =
              tileVariants[(study.id + index) % tileVariants.length]

            return (
              <Link
                key={study.href}
                href={study.href}
                className={`case-study-project-tile case-study-project-tile--${variant}`}
                aria-label={
                  isSpanish
                    ? `Ver caso de estudio: ${study.title}`
                    : `View case study: ${study.title}`
                }
                data-mobile-audit="case-study-card"
              >
                <span className="case-study-project-tile__frame">
                  <Image
                    src={study.image}
                    alt=""
                    width={study.imageWidth}
                    height={study.imageHeight}
                    sizes="(max-width: 560px) 100vw, (max-width: 880px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="case-study-project-tile__image"
                    priority={index < 2}
                  />
                  <span
                    className="case-study-project-tile__reveal"
                    aria-hidden="true"
                  >
                    <span>{study.cta ?? readCase}</span>
                    <span className="case-study-project-tile__arrow">→</span>
                  </span>
                </span>
                <span className="case-study-project-tile__caption">
                  <span className="case-study-project-tile__meta">
                    {study.category && <span>{study.category}</span>}
                    {study.proofTags?.slice(0, 2).map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                  <span className="case-study-project-tile__title">
                    {study.title}
                  </span>
                  <span className="case-study-project-tile__description">
                    {study.description}
                  </span>
                  {study.commercialRelevance && (
                    <span className="case-study-project-tile__description case-study-project-tile__description--commercial">
                      {study.commercialRelevance}
                    </span>
                  )}
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
