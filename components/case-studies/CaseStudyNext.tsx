'use client'

import Link from 'next/link'

interface CaseStudy {
  title: string
  href: string
  subtitle?: string
}

interface CaseStudyNextProps {
  nextCaseStudy?: CaseStudy
  accentColor?: string
}

export default function CaseStudyNext({ nextCaseStudy, accentColor }: CaseStudyNextProps) {
  if (!nextCaseStudy) return null

  return (
    <section className="case-study-next-new">
      <div className="case-study-next-new__container">
        <div className="case-study-next-new__divider"></div>
        <div className="case-study-next-new__content">
          <p className="case-study-next-new__label">Next Project</p>
          <Link 
            href={nextCaseStudy.href} 
            className="case-study-next-new__link"
          >
            <h2 className="case-study-next-new__title">{nextCaseStudy.title}</h2>
            {nextCaseStudy.subtitle && (
              <p className="case-study-next-new__subtitle">{nextCaseStudy.subtitle}</p>
            )}
            <div className="case-study-next-new__arrow">→</div>
          </Link>
        </div>
      </div>
    </section>
  )
}

