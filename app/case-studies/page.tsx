'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { type CSSProperties, useMemo } from 'react'
import { getCaseStudies } from '@/data/case-studies'
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
  const schemas = getSchemas(locale)
  const isSpanish = locale === 'es'
  const heading = isSpanish ? 'Casos de estudio' : 'Case Studies'

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
        <section
          id="case-study-grid"
          className="case-study-thumbnail-gallery"
          aria-labelledby="case-studies-heading"
          data-mobile-audit="case-study-grid"
        >
          <div className="case-study-project-grid">
            <h1 id="case-studies-heading" className="visually-hidden">
              {heading}
            </h1>
            {caseStudies.map((study, index) => {
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
      </main>
      <Footer locale={locale} />
    </>
  )
}
