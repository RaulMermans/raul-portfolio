// =============================================
// AI SPORTS CAMPAIGN - CASE STUDY PAGE
// Modern, UX-driven case study showcase
// =============================================

'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getCaseStudyContent } from '@/data/case-studies-content'
import { caseStudies } from '@/data/case-studies'
import '@/styles/case-study.css'

export default function AISportsCampaignPage() {
  const content = getCaseStudyContent('ai-sports')
  const nextCaseStudy = caseStudies.find((cs) => cs.href === '/case-studies/remoria')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Smooth scroll reveal animations
    const reveals = document.querySelectorAll('.case-study-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    reveals.forEach((el) => observer.observe(el))

    // Header scroll effect
    const header = document.getElementById('header')
    const handleScroll = () => {
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!content) {
    return <div>Case study not found</div>
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="grain" aria-hidden="true"></div>

      <Header />

      <main id="main-content" className="case-study-page">
        {/* Hero Section */}
        <section className="case-study-hero">
          <div className="case-study-hero__image">
            <Image
              src={content.hero.image.src}
              alt={content.hero.image.alt}
              fill
              priority
              quality={content.hero.image.quality ?? 90}
              sizes={content.hero.image.sizes ?? '100vw'}
              style={{ objectFit: 'cover' }}
            />
            <div className="case-study-hero__overlay"></div>
          </div>
          <div className="case-study-hero__content">
            <div className="case-study-hero__inner">
              <h1 className="case-study-hero__title case-study-reveal">
                {content.hero.title}
              </h1>
              {content.hero.subtitle && (
                <p className="case-study-hero__subtitle case-study-reveal">
                  {content.hero.subtitle}
                </p>
              )}
              {content.hero.description && (
                <p className="case-study-hero__description case-study-reveal">
                  {content.hero.description}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Overview Section */}
        {content.overview && (
          <section className="case-study-section case-study-section--light">
            <div className="case-study-section__inner">
              {content.overview.title && (
                <h2 className="case-study-section__title case-study-reveal">
                  {content.overview.title}
                </h2>
              )}
              <div className="case-study-overview">
                {content.overview.meta && content.overview.meta.length > 0 && (
                  <div className="case-study-overview__meta case-study-reveal">
                    {content.overview.meta.map((item, index) => (
                      <div key={index} className="case-study-meta">
                        <span className="case-study-meta__label">{item.label}</span>
                        <span className="case-study-meta__value">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="case-study-overview__content case-study-reveal">
                  <p className="case-study-overview__text">{content.overview.description}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Content Sections */}
        {content.sections &&
          content.sections.map((section, index) => (
            <section
              key={index}
              className={`case-study-section ${
                index % 2 === 0
                  ? 'case-study-section--light'
                  : 'case-study-section--dark'
              }`}
            >
              <div className="case-study-section__inner">
                {section.title && (
                  <h2 className="case-study-section__title case-study-reveal">
                    {section.title}
                  </h2>
                )}
                <div className="case-study-section__content case-study-reveal">
                  {Array.isArray(section.content) ? (
                    section.content.map((para, pIndex) => (
                      <p key={pIndex}>{para}</p>
                    ))
                  ) : (
                    <p>{section.content}</p>
                  )}
                </div>
                {section.image && (
                  <div className="case-study-section__image case-study-reveal">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      quality={section.image.quality ?? 90}
                      sizes={section.image.sizes ?? '(max-width: 1200px) 100vw, 1200px'}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
              </div>
            </section>
          ))}

        {/* Gallery Section */}
        {content.gallery && content.gallery.length > 0 && (
          <section className="case-study-section case-study-section--light">
            <div className="case-study-section__inner">
              <h2 className="case-study-section__title case-study-reveal">Gallery</h2>
              <div className="case-study-gallery">
                {content.gallery.map((image, index) => (
                  <div
                    key={index}
                    className={`case-study-gallery__item case-study-reveal`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      quality={image.quality ?? 90}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Next Case Study */}
        {nextCaseStudy && (
          <section className="case-study-next case-study-section--dark">
            <div className="case-study-next__inner">
              <p className="case-study-next__label case-study-reveal">Next Project</p>
              <Link href={nextCaseStudy.href} className="case-study-next__link">
                <h2 className="case-study-next__title case-study-reveal">
                  {nextCaseStudy.title}
                </h2>
                {nextCaseStudy.subtitle && (
                  <p className="case-study-next__subtitle case-study-reveal">
                    {nextCaseStudy.subtitle}
                  </p>
                )}
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}

