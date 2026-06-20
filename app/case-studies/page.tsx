'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { type FormEvent, useMemo, useState } from 'react'
import { getCaseStudies } from '@/data/case-studies'
import { getCaseStudyCategories, type CaseStudyCategorySlug } from '@/data/case-study-categories'
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
  const orderedStudies = caseStudies
  const schemas = getSchemas(locale)
  const isSpanish = locale === 'es'
  const browserTitle = isSpanish ? 'Casos de estudio' : 'Case Studies'
  const browserLead = isSpanish
    ? 'Sistemas, interfaces y trabajo de marca construidos alrededor de prueba, contención y ejecución.'
    : 'Systems, interfaces, and brand work built around proof, restraint, and execution.'
  const filterLabel = isSpanish ? 'Filtrar casos de estudio' : 'Filter case studies'
  const allLabel = isSpanish ? 'Todos' : 'All'
  const readCase = isSpanish ? 'Ver caso' : 'View Case Study'
  const seeLabel = isSpanish ? 'Quiero ver...' : 'I want to see...'
  const goLabel = isSpanish ? 'Ir a los casos filtrados' : 'Go to filtered case studies'

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

  const handleBrowserSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    document.getElementById('case-study-grid')?.scrollIntoView({ block: 'start' })
  }

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" role="main" className="case-studies-index case-studies-index--browser">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.collection) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }}
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
            <form className="case-study-browser__control" aria-label={filterLabel} onSubmit={handleBrowserSubmit}>
              <label className="visually-hidden" htmlFor="case-study-filter">
                {filterLabel}
              </label>
              <span className="case-study-browser__placeholder" aria-hidden="true">
                {seeLabel}
              </span>
              <select
                id="case-study-filter"
                className="case-study-browser__select"
                value={activeFilter}
                onChange={(event) => setActiveFilter(event.target.value as FilterKey)}
              >
                <option value="all">{allLabel}</option>
                {categoryFilters.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.title}
                  </option>
                ))}
              </select>
              <button type="submit" className="case-study-browser__submit" aria-label={goLabel}>
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
            const variant = tileVariants[(study.id + index) % tileVariants.length]

            return (
              <article
                key={study.href}
                className={`case-study-project-tile case-study-project-tile--${variant}`}
                data-mobile-audit="case-study-card"
              >
                <Link
                  href={study.href}
                  className="case-study-project-tile__main"
                  aria-label={isSpanish ? `Ver caso de estudio: ${study.title}` : `View case study: ${study.title}`}
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
                    <span className="case-study-project-tile__reveal" aria-hidden="true">
                      <span>{study.cta ?? readCase}</span>
                      <span className="case-study-project-tile__arrow">→</span>
                    </span>
                  </span>
                  <span className="case-study-project-tile__caption">
                    <span className="case-study-project-tile__title">{study.title}</span>
                    {study.slug === 'campaign-pulse' ? (
                      <>
                        <span className="case-study-project-tile__meta">{study.subtitle}</span>
                        <span className="case-study-project-tile__description">{study.description}</span>
                        {study.status ? <span className="case-study-project-tile__status">{study.status}</span> : null}
                        <span className="case-study-project-tile__tags">
                          {study.tags?.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
                        </span>
                      </>
                    ) : null}
                  </span>
                </Link>
                {study.slug === 'campaign-pulse' ? (
                  <span className="case-study-project-tile__external-links" aria-label={isSpanish ? 'Enlaces externos de Campaign Pulse' : 'Campaign Pulse external links'}>
                    {study.liveUrl ? <a href={study.liveUrl} target="_blank" rel="noreferrer">{isSpanish ? 'Demo ↗' : 'Live demo ↗'}</a> : null}
                    {study.githubUrl ? <a href={study.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a> : null}
                  </span>
                ) : null}
              </article>
            )
          })}
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
