'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getCaseStudies } from '@/data/case-studies'
import { type Locale } from '@/lib/i18n'

interface NextCaseStudyProps {
  currentHref: string
  locale?: Locale
}

export default function NextCaseStudy({ currentHref, locale = 'en' }: NextCaseStudyProps) {
  const caseStudies = getCaseStudies(locale)
  // Find the next case study (loops back to first if at end)
  const currentIndex = caseStudies.findIndex((cs) => cs.href === currentHref)
  const nextIndex = (currentIndex + 1) % caseStudies.length
  const nextStudy = caseStudies[nextIndex]

  if (!nextStudy) return null

  return (
    <section className="next">
      <p className="next__label reveal">{locale === 'es' ? 'Siguiente proyecto' : 'Next Project'}</p>
      <Link href={nextStudy.href} className="next__link">
        <h2 className="next__title reveal reveal-delay-1">{nextStudy.title}</h2>
        <p className="next__subtitle reveal reveal-delay-2">{nextStudy.subtitle || (locale === 'es' ? 'Caso de estudio' : 'Case Study')}</p>
        <div className="next__image reveal reveal-delay-3">
          <Image
            src={nextStudy.image}
            alt={`${nextStudy.title} preview`}
            fill
            sizes="800px"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <span className="next__cta reveal reveal-delay-4">
          {locale === 'es' ? 'Ver proyecto' : 'View Project'} <span className="next__cta-arrow">→</span>
        </span>
      </Link>
    </section>
  )
}
