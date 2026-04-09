'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { getSiteCopy } from '@/data/site-copy'
import { getCaseStudies } from '@/data/case-studies'
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
  const router = useRouter()
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const copy = getSiteCopy(locale).caseStudiesUi
  const caseStudies = getCaseStudies(locale)
  const schemas = getSchemas(locale)

  // Simple reveal animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )

    const timer = setTimeout(() => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          const content = section.querySelector('.case-study-section__content')
          if (content) observer.observe(content)
        }
      })
    }, 0)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" role="main" className="case-studies-scroll">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.collection) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }}
        />
        <section
          aria-labelledby="case-studies-heading"
          style={{
            padding: 'calc(var(--header-height) + 4rem) clamp(1.5rem, 4vw, 4rem) 4rem',
            background: 'var(--cream)',
            color: 'var(--ink)',
          }}
        >
          <div style={{ maxWidth: '54rem', margin: '0 auto' }}>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-mono), "Space Mono", monospace',
                fontSize: '0.72rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
              }}
            >
              {copy.pageEyebrow}
            </p>
            <h1
              id="case-studies-heading"
              style={{
                margin: '1rem 0 1.25rem',
                fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif',
                fontSize: 'clamp(3.4rem, 8vw, 6.4rem)',
                lineHeight: 0.9,
                textTransform: 'uppercase',
              }}
            >
              {copy.pageTitle}
            </h1>
            <p
              style={{
                margin: 0,
                maxWidth: '44rem',
                fontSize: '1.08rem',
                lineHeight: 1.8,
                color: 'var(--ink-soft)',
              }}
            >
              {copy.pageDescription}
            </p>
          </div>
        </section>
        {caseStudies.map((study, index) => (
          <section
            key={study.id}
            ref={(el) => { sectionsRef.current[index] = el }}
            className="case-study-section"
            aria-labelledby={`case-study-title-${study.id}`}
          >
            {/* Full-bleed Background Image */}
            <div className="case-study-section__media">
              <Image
                src={study.image}
                alt={`${study.title} — ${study.subtitle ?? 'Case study'}`}
                fill
                quality={80}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                className="case-study-section__image"
                priority={index === 0}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="case-study-section__gradient" aria-hidden="true" />
            </div>

            {/* Content */}
            <div className="case-study-section__content">
              <h2 
                id={`case-study-title-${study.id}`}
                className="case-study-section__title"
              >
                {study.title}
              </h2>
              <p className="case-study-section__description">
                {study.description}
              </p>
              <Link
                href={study.href}
                className="case-study-section__cta"
                prefetch={true}
                onMouseEnter={() => router.prefetch(study.href)}
              >
                {copy.viewProject}
                <span className="case-study-section__cta-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        ))}
      </main>
      <Footer locale={locale} />
    </>
  )
}
