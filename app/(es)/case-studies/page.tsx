'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { type CSSProperties, useMemo, useState } from 'react'
import { getCaseStudies } from '@/data/case-studies'
import {
  CASE_STUDY_CATEGORIES,
  PROJECT_EXPERIENCE,
  type CaseStudyCategory,
} from '@/data/portfolio-experience'
import { type Locale, getLocaleFromPath, localizePath } from '@/lib/i18n'
import { absoluteRouteUrl, siteConfig } from '@/lib/metadata'

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
        ? 'Casos de estudio de sistemas propios de IA, inteligencia de negocio, productos digitales y trabajo creativo de Raúl Mermans.'
        : 'Case studies of independent AI systems, business intelligence, digital products, and creative work by Raúl Mermans.',
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
  const [activeCategory, setActiveCategory] = useState<CaseStudyCategory | 'all'>('all')
  const schemas = getSchemas(locale)
  const isSpanish = locale === 'es'
  const heading = isSpanish ? 'Casos de estudio' : 'Case Studies'
  const intro = isSpanish
    ? 'Sistemas propios de IA, productos de datos y trabajo creativo. Cada caso muestra lo construido, la evidencia disponible y sus límites.'
    : 'Independent AI systems, data products, and creative work. Each case shows what was built, the available evidence, and its limits.'
  const categoryBySlug = useMemo(
    () => new Map(PROJECT_EXPERIENCE.map((project) => [project.slug, project.caseStudyCategory])),
    [],
  )
  const groups = CASE_STUDY_CATEGORIES.map((category, index) => ({
    ...category,
    index: String(index + 1).padStart(2, '0'),
    studies: caseStudies.filter((study) => categoryBySlug.get(study.slug) === category.id),
  }))
  const visibleStudies = activeCategory === 'all'
    ? caseStudies
    : caseStudies.filter((study) => categoryBySlug.get(study.slug) === activeCategory)
  const visibleCount = visibleStudies.length


  return (
    <>
      <Header locale={locale} />
      <main
        id="main-content"
        role="main"
        className="case-studies-index case-studies-index--gallery"
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
        <section className="ui-page-intro" aria-labelledby="case-studies-heading">
          <div className="ui-page-intro__container">
            <div className="ui-page-intro__content">
              <p className="ui-eyebrow">
                {isSpanish ? 'Trabajo seleccionado' : 'Selected work'}
              </p>
              <h1 id="case-studies-heading">{heading}</h1>
              <p>{intro}</p>
            </div>
          </div>
        </section>
        <section
          id="case-study-grid"
          className="case-study-thumbnail-gallery"
          aria-labelledby="case-studies-heading"
          data-mobile-audit="case-study-grid"
        >
          <div className="case-studies-index__toolbar">
            <p className="case-studies-index__browse-label">{isSpanish ? 'Explorar por área' : 'Browse by practice'}</p>
            <div className="case-studies-index__browse-meta">
              <button
                type="button"
                className="case-studies-index__all"
                onClick={() => setActiveCategory('all')}
                aria-pressed={activeCategory === 'all'}
                aria-controls="case-study-results"
              >
                {isSpanish ? 'Ver todos' : 'View all'}
              </button>
              <p className="case-studies-index__count" aria-live="polite">
                {visibleCount} {isSpanish ? 'proyectos' : 'projects'}
              </p>
            </div>
          </div>
          <div className="case-studies-index__categories" role="group" aria-label={isSpanish ? 'Categorías de casos de estudio' : 'Case study categories'}>
            {groups.map((group) => (
              <button
                key={group.id}
                type="button"
                className={`case-studies-index__category${activeCategory === group.id ? ' is-active' : ''}`}
                onClick={() => setActiveCategory(group.id)}
                aria-pressed={activeCategory === group.id}
                aria-controls="case-study-results"
                data-category-selector={group.id}
              >
                <span className="case-studies-index__category-index">{group.index} / 04</span>
                <span className="case-studies-index__category-title">{group.label[locale]}</span>
                <span className="case-studies-index__category-count">{group.studies.length} {isSpanish ? 'proyectos' : 'projects'}</span>
              </button>
            ))}
          </div>
          <div id="case-study-results" className="case-studies-index__results">
          <section className="case-study-gallery-group" aria-labelledby="case-study-grid-title">
            <header className="case-study-gallery-group__header">
              <p>{isSpanish ? '01 / Trabajo' : '01 / Work'}</p>
              <h2 id="case-study-grid-title">{activeCategory === 'all' ? (isSpanish ? 'Sistemas seleccionados y archivo' : 'Selected systems and archive') : CASE_STUDY_CATEGORIES.find((category) => category.id === activeCategory)?.label[locale]}</h2>
              <span>{isSpanish ? 'Ordenados por la evidencia que aportan al perfil.' : 'Ordered by the evidence each project brings to the profile.'}</span>
            </header>
            <div className="case-study-project-grid">
              {visibleStudies.map((study, index) => {
              const variant =
                tileVariants[(study.id + index) % tileVariants.length]
              const thumbnailStyle = {
                '--case-study-thumbnail-ratio': `${study.imageWidth} / ${study.imageHeight}`,
              } as CSSProperties

              return (
                <Link
                  key={study.href}
                  href={study.href}
                  className={`case-study-project-tile case-study-project-tile--${variant}`}
                  style={thumbnailStyle}
                  aria-label={
                    isSpanish
                      ? `Ver caso de estudio: ${study.title}`
                      : `View case study: ${study.title}`
                  }
                  data-mobile-audit="case-study-card"
                  data-project-category={categoryBySlug.get(study.slug)}
                >
                  <span className="case-study-project-tile__frame">
                    <Image
                      src={study.image}
                      alt=""
                      width={study.imageWidth}
                      height={study.imageHeight}
                      sizes="(max-width: 560px) 50vw, (max-width: 980px) 34vw, 50vw"
                      className="case-study-project-tile__image"
                      priority={index < 2}
                    />
                  </span>
                  <span className="case-study-project-tile__caption">
                    <span className="case-study-project-tile__title">
                      {study.title}
                    </span>
                  </span>
                </Link>
              )
              })}
            </div>
          </section>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
