'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import { caseStudies } from '@/data/case-studies'

export default function CaseStudiesPage() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

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

    sectionsRef.current.forEach((section) => {
      if (section) {
        const content = section.querySelector('.case-study-section__content')
        if (content) observer.observe(content)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="grain" aria-hidden="true"></div>

      <Header />

      <main id="main-content" role="main" className="case-studies-scroll">
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
                alt=""
                fill
                quality={90}
                sizes="100vw"
                className="case-study-section__image"
                priority={index === 0}
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
              <Link href={study.href} className="case-study-section__cta">
                View Project
                <span className="case-study-section__cta-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        ))}
      </main>
    </>
  )
}
