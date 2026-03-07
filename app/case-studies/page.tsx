'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { caseStudies } from '@/data/case-studies'

export default function CaseStudiesPage() {
  const router = useRouter()
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
