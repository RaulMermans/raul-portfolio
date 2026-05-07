'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getCaseStudyCategories } from '@/data/case-study-categories'
import { type Locale, getLocaleFromPath, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { absoluteRouteUrl, siteConfig } from '@/lib/metadata'

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
  const categories = getCaseStudyCategories(locale)
  const schemas = getSchemas(locale)
  const isSpanish = locale === 'es'
  const introCopy = isSpanish
    ? 'Elige una línea de trabajo para ver los proyectos, sistemas y decisiones detrás de cada caso.'
    : 'Choose a workstream to see the projects, systems, and decisions behind each case.'
  const categoryAction = isSpanish ? 'Ver proyectos' : 'View projects'

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" role="main" className="case-studies-index case-studies-index--menu">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.collection) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }}
        />
        <section className="case-studies-index__intro" aria-labelledby="case-studies-heading">
          <h1 id="case-studies-heading" className="case-studies-index__title">
            {isSpanish ? 'Casos de estudio' : 'Case Studies'}
          </h1>
          <p className="case-studies-index__prompt">{introCopy}</p>
        </section>

        <nav className="case-study-category-menu" aria-label={isSpanish ? 'Categorías de casos de estudio' : 'Case study categories'}>
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={category.href}
              className="case-study-category-menu__row"
              aria-label={isSpanish ? `Ver proyectos de ${category.title}` : `View ${category.title} projects`}
            >
              <span className="case-study-category-menu__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="case-study-category-menu__content">
                <span className="case-study-category-menu__eyebrow">{category.eyebrow}</span>
                <span className="case-study-category-menu__title">{category.title}</span>
              </span>
              <span className="case-study-category-menu__action" aria-hidden="true">
                <span>{categoryAction}</span>
                <span className="case-study-category-menu__arrow">→</span>
              </span>
            </Link>
          ))}
        </nav>
      </main>
      <Footer locale={locale} />
    </>
  )
}
