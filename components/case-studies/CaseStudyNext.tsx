'use client'

import Link from 'next/link'
import Image from 'next/image'
import { getRelatedCaseStudies } from '@/data/case-studies'
import { type Locale } from '@/lib/i18n'

interface CaseStudy {
  title: string
  href: string
  subtitle?: string
  image?: string
}

interface CaseStudyNextProps {
  nextCaseStudy?: CaseStudy
  currentHref?: string
  accentColor?: string
  locale?: Locale
}

export default function CaseStudyNext({
  nextCaseStudy,
  currentHref,
  accentColor,
  locale = 'en',
}: CaseStudyNextProps) {
  const related = currentHref
    ? getRelatedCaseStudies(currentHref, locale)
    : nextCaseStudy
      ? [nextCaseStudy]
      : []

  if (related.length === 0) return null

  const label = locale === 'es' ? 'Sistemas relacionados' : 'Related systems'
  const description =
    locale === 'es'
      ? 'Continúa por una lógica de producto, prueba o dirección creativa relacionada.'
      : 'Continue through a related product, proof, or creative-direction logic.'
  const viewLabel = locale === 'es' ? 'Ver caso' : 'View case study'

  return (
    <section
      className="case-study-next-new"
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      <div className="case-study-next-new__container">
        <header className="case-study-next-new__header">
          <p className="case-study-next-new__label">{label}</p>
          <p>{description}</p>
        </header>
        <div className="case-study-next-new__grid">
          {related.map(study => (
            <Link
              key={study.href}
              href={study.href}
              className="case-study-next-new__card"
            >
              {study.image && (
                <span className="case-study-next-new__preview-image">
                  <Image
                    src={study.image}
                    alt=""
                    fill
                    quality={85}
                    sizes="(max-width: 720px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    className="case-study-next-new__preview-img"
                  />
                </span>
              )}
              <span className="case-study-next-new__card-copy">
                <span className="case-study-next-new__meta">
                  {study.subtitle}
                </span>
                <strong className="case-study-next-new__title">
                  {study.title}
                </strong>
                <span className="case-study-next-new__view">{viewLabel} →</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
