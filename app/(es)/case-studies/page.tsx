'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { type CSSProperties, useMemo, useState } from 'react'
import { getCaseStudies } from '@/data/case-studies'
import {
  DISCIPLINES,
  DISCIPLINE_LABELS,
  PROJECT_EXPERIENCE,
  type Discipline,
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
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline | 'all'>('all')
  const schemas = getSchemas(locale)
  const isSpanish = locale === 'es'
  const heading = isSpanish ? 'Casos de estudio' : 'Case Studies'
  const intro = isSpanish
    ? 'Productos, campañas y sistemas de marca. Cada caso sigue el trabajo desde el contexto hasta las decisiones, pruebas y límites que le dieron forma.'
    : 'Products, campaigns, and brand systems. Each case follows the work from context to the decisions, evidence, and limits that shaped it.'
  const studiesBySlug = useMemo(
    () => new Map(caseStudies.map((study) => [study.slug, study])),
    [caseStudies],
  )
  const visibleProjects = PROJECT_EXPERIENCE.filter(
    (project) => activeDiscipline === 'all' || project.primaryDiscipline === activeDiscipline,
  )
  const visibleStudies = visibleProjects
    .map((project) => studiesBySlug.get(project.slug))
    .filter((study): study is NonNullable<typeof study> => Boolean(study))
  const activeLabel = activeDiscipline === 'all'
    ? isSpanish ? 'Todos los trabajos' : 'All work'
    : DISCIPLINE_LABELS[activeDiscipline][locale]
  const activeDescription = activeDiscipline === 'all'
    ? isSpanish
      ? 'Todos los proyectos se agrupan por su disciplina principal.'
      : 'Every project is grouped by its primary discipline.'
    : isSpanish
      ? `Proyectos cuya disciplina principal es ${activeLabel}.`
      : `Projects whose primary discipline is ${activeLabel}.`

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
          <div className="case-studies-index__toolbar" aria-label={isSpanish ? 'Filtrar casos por disciplina' : 'Filter case studies by discipline'}>
            <div className="case-studies-index__filters" role="group">
              <button
                type="button"
                className={`case-studies-index__filter${activeDiscipline === 'all' ? ' is-active' : ''}`}
                onClick={() => setActiveDiscipline('all')}
                aria-pressed={activeDiscipline === 'all'}
              >
                {isSpanish ? 'Todos' : 'All'}
              </button>
              {DISCIPLINES.map((discipline) => (
                <button
                  key={discipline}
                  type="button"
                  className={`case-studies-index__filter${activeDiscipline === discipline ? ' is-active' : ''}`}
                  onClick={() => setActiveDiscipline(discipline)}
                  aria-pressed={activeDiscipline === discipline}
                >
                  {DISCIPLINE_LABELS[discipline][locale]}
                </button>
              ))}
            </div>
            <p className="case-studies-index__count" aria-live="polite">
              {visibleStudies.length} {isSpanish ? 'proyectos' : 'projects'}
            </p>
          </div>
          <section className="case-study-gallery-group" aria-labelledby="case-study-group-discipline">
            <header className="case-study-gallery-group__header">
              <p>{isSpanish ? 'Disciplina principal' : 'Primary discipline'}</p>
              <h2 id="case-study-group-discipline">{activeLabel}</h2>
              <span>{activeDescription}</span>
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
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
