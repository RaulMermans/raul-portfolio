// =============================================
// AI SPORTS CAMPAIGN - CASE STUDY PAGE
// Detailed structure matching types and CSS
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

    // Add on-dark class to header elements for contrast
    const logo = document.querySelector('.ui__logo')
    const nav = document.querySelector('.ui__nav')
    const menuBtn = document.querySelector('.ui__menu-btn')
    if (logo) logo.classList.add('on-dark')
    if (nav) nav.classList.add('on-dark')
    if (menuBtn) menuBtn.classList.add('on-dark')

    // Smooth scroll reveal animations
    const reveals = document.querySelectorAll('.reveal')
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

    return () => {
      observer.disconnect()
      // Cleanup on-dark classes on unmount
      if (logo) logo.classList.remove('on-dark')
      if (nav) nav.classList.remove('on-dark')
      if (menuBtn) menuBtn.classList.remove('on-dark')
    }
  }, [])

  if (!content) {
    return <div>Case study not found</div>
  }

  const isGold = content.accentColor === 'var(--gold)'

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
              <h1 className="case-study-hero__title">{content.hero.title}</h1>
              {content.hero.tagline && (
                <p className="case-study-hero__subtitle">{content.hero.tagline}</p>
              )}
              {content.hero.subtitle && (
                <p className="case-study-hero__description">{content.hero.subtitle}</p>
              )}
            </div>
          </div>
        </section>

        {/* Overview Section */}
        {content.overview && (
          <section className="case-study-section case-study-section--light">
            <div className="case-study-section__inner">
              <div className="overview">
                {content.overview.meta && content.overview.meta.length > 0 && (
                  <div className="overview__meta">
                    {content.overview.meta.map((item, index) => (
                      <div
                        key={index}
                        className={`overview__meta-item ${
                          item.label === 'Deliverables' ? 'overview__meta-item--full' : ''
                        }`}
                      >
                        <div className="overview__meta-label">{item.label}</div>
                        <div className="overview__meta-value">{item.value}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="overview__content">
                  <p className="overview__text">{content.overview.description}</p>
                  {content.overview.intentQuote && (
                    <p
                      className="overview__intent"
                      data-gold={isGold ? '' : undefined}
                    >
                      {content.overview.intentQuote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Challenge Section */}
        {content.challenge && (
          <section className="case-study-section case-study-section--dark">
            <div className="case-study-section__inner">
              <h2 className="challenge__quote">{content.challenge.quote}</h2>
              <div className="challenge__divider"></div>
              <p className="challenge__text">{content.challenge.context}</p>
              {content.challenge.successCriteria && content.challenge.successCriteria.length > 0 && (
                <div className="challenge__criteria">
                  <div className="challenge__criteria-label">Success Criteria:</div>
                  {content.challenge.successCriteria.map((criterion, index) => (
                    <div
                      key={index}
                      className="challenge__criteria-item"
                      data-gold={isGold ? '' : undefined}
                    >
                      {criterion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Full Bleed Images */}
        {content.fullBleedImages && content.fullBleedImages.length > 0 && (
          <section className="case-study-section">
            {content.fullBleedImages.map((image, index) => (
              <div key={index} className="full-image">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  quality={image.quality ?? 90}
                  sizes={image.sizes ?? '100vw'}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </section>
        )}

        {/* Approach Section */}
        {content.approach && (
          <section className="case-study-section case-study-section--light">
            <div className="case-study-section__inner">
              <div className="approach__header">
                <p className="approach__text">{content.approach.text}</p>
                {content.approach.tools && content.approach.tools.length > 0 && (
                  <div className="approach__tools">
                    <div className="approach__tools-label">Tools</div>
                    <div className="approach__tools-list">
                      {content.approach.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="approach__tool"
                          data-gold={isGold ? '' : undefined}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* System Module */}
              {content.approach.system && (
                <div className="approach__system">
                  <div className="approach__system-label">{content.approach.system.label}</div>
                  <div className="approach__system-grid">
                    {content.approach.system.items.map((item, index) => (
                      <div key={index} className="approach__system-item">
                        <div
                          className="approach__system-title"
                          data-gold={isGold ? '' : undefined}
                        >
                          {item.title}
                        </div>
                        <div className="approach__system-desc">{item.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Iteration Proof Module */}
              {content.approach.iterationProof && (
                <div className="approach__iteration">
                  <div className="iteration">
                    <div className="iteration__label">{content.approach.iterationProof.label}</div>
                    <div className="iteration__grid">
                      {content.approach.iterationProof.items.map((item, index) => (
                        <div key={index} className="iteration__item">
                          <div className="iteration__title">{item.title}</div>
                          <div className="iteration__text">{item.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Deliverables */}
              {content.approach.deliverables && content.approach.deliverables.length > 0 && (
                <div className="deliverables">
                  <div className="deliverables__label">Deliverables</div>
                  <div className="deliverables__grid">
                    {content.approach.deliverables.map((deliverable, index) => (
                      <div key={index} className="deliverables__item">
                        <div className="deliverables__name">{deliverable.name}</div>
                        <div className="deliverables__why">{deliverable.rationale}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Approach Images */}
              {content.approach.images && content.approach.images.length > 0 && (
                <div className="approach__images">
                  {content.approach.images.map((image, index) => (
                    <div key={index} className="approach__image">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        quality={image.quality ?? 90}
                        sizes={image.sizes ?? '(max-width: 768px) 100vw, 50vw'}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Feature Image */}
        {content.featureImage && (
          <section className="feature">
            <div className="feature__image">
              <Image
                src={content.featureImage.src}
                alt={content.featureImage.alt}
                fill
                quality={content.featureImage.quality ?? 90}
                sizes={content.featureImage.sizes ?? '(max-width: 1400px) 100vw, 1400px'}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {content.gallery && content.gallery.rows && content.gallery.rows.length > 0 && (
          <section className="case-study-section case-study-section--light">
            <div className="case-study-section__inner">
              <h2 className="gallery__title">Gallery</h2>
              <div className="gallery__grid">
                {content.gallery.rows.flatMap((row) => row.items).slice(0, 4).map((image, index) => (
                  <div key={index} className="gallery__item">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      quality={image.quality ?? 90}
                      sizes={image.sizes ?? '(max-width: 768px) 100vw, 50vw'}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Results Section */}
        {content.results && (
          <section className="case-study-section case-study-section--dark">
            <div className="case-study-section__inner">
              <div className="results">
                <p className="results__text">{content.results.text}</p>
                <div className="results__takeaway" data-gold={isGold ? '' : undefined}>
                  <p className="results__takeaway-text">{content.results.takeawayQuote}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Next Case Study */}
        {nextCaseStudy && (
          <section className="next">
            <div className="next__inner">
              <p className="next__label">Next Project</p>
              <Link href={nextCaseStudy.href} className="next__link">
                <h2 className="next__title">{nextCaseStudy.title}</h2>
                {nextCaseStudy.subtitle && (
                  <p className="next__subtitle">{nextCaseStudy.subtitle}</p>
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
