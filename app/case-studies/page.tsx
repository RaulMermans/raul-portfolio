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
        <section className="case-study-category-menu" aria-labelledby="case-studies-heading">
          <h1 id="case-studies-heading" className="sr-only">
            {isSpanish ? 'Casos de estudio por categoría' : 'Case studies by category'}
          </h1>
          {categories.map((category) => (
            <Link key={category.slug} href={category.href} className="case-study-category-menu__row">
              <span>{category.title}</span>
            </Link>
          ))}
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
