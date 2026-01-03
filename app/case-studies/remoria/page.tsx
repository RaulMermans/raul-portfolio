'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import NextCaseStudy from '@/components/NextCaseStudy'
import StructuredData from '@/components/StructuredData'

export default function RemoriaPage() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Header scroll effect
    const header = document.getElementById('header')
    const handleScroll = () => {
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('scrolled')
        } else {
          header.classList.remove('scrolled')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Reveal animations
    const reveals = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
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

    reveals.forEach((el) => revealObserver.observe(el))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      revealObserver.disconnect()
    }
  }, [])

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

  return (
    <>
      <StructuredData
        type="Article"
        data={{
          headline: 'Remoria',
          description:
            'A poetic fragrance house rooted in Roman legacy, Spanish lyricism, and Mediterranean light—where scent becomes memory and design becomes relic.',
          image: `${baseUrl}/images/case-studies/remoria/hero.webp`,
          datePublished: '2026-01-01',
          dateModified: '2026-01-01',
          url: `${baseUrl}/case-studies/remoria`,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/case-studies/remoria`,
          },
        }}
      />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="grain" aria-hidden="true"></div>

      {/* Header */}
      <header className="header case-study-header" id="header">
        <a href="/" className="header__logo">
          Raúl Mermans
        </a>
        <nav className="header__nav">
          <a href="/#work">Work</a>
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero case-study-hero">
        <div className="hero__letterbox hero__letterbox--top"></div>
        <div className="hero__bg">
          <Image
            src="/images/case-studies/remoria/hero.webp"
            alt="Remoria hero image placeholder"
            fill
            priority
            quality={90}
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="hero__overlay"></div>
        <div className="hero__content">
          <h1 className="hero__title">Remoria</h1>
          <p className="hero__tagline">A Fragrance House Etched in Memory</p>
          <p className="hero__subtitle">Brand Identity & Creative Direction • 2026</p>
        </div>
        <div className="hero__scroll">
          <span>Scroll</span>
          <div className="hero__scroll-line"></div>
        </div>
        <div className="hero__letterbox hero__letterbox--bottom"></div>
      </section>

      {/* Overview */}
      <section className="section section--light">
        <div className="section__inner">
          <div className="overview">
            <div className="overview__meta reveal">
              <div className="overview__meta-item">
                <span className="overview__meta-label">Type</span>
                <span className="overview__meta-value">Luxury Brand Identity (Fragrance)</span>
              </div>
              <div className="overview__meta-item">
                <span className="overview__meta-label">Role</span>
                <span className="overview__meta-value">Creative Direction & Brand Aesthetics</span>
              </div>
              <div className="overview__meta-item">
                <span className="overview__meta-label">Tools</span>
                <span className="overview__meta-value">Illustrator, Photoshop, Figma, Pinterest</span>
              </div>
              <div className="overview__meta-item overview__meta-item--full">
                <span className="overview__meta-label">Deliverables</span>
                <span className="overview__meta-value">
                  Visual Identity System, Tone of Voice, Packaging Concept, Moodboard, Color Palette, Brand Storytelling
                </span>
              </div>
            </div>

            <div className="overview__content reveal reveal-delay-1">
              <p className="overview__text">
                REMORIA is a story-driven fragrance house inspired by Roman legacy, Spanish lyricism, and Mediterranean warmth. I
                designed a complete visual and verbal world where scent functions like a relic—quiet, intimate, and emotionally
                precise. The result is an understated luxury identity built to linger through structure, texture, and silence.
              </p>
              <p className="overview__intent" data-gold>
                To make the brand feel like an artifact rediscovered—warm, silent, and unforgettable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="section section--dark">
        <div className="section__inner">
          <p className="section__label reveal">The Challenge</p>
          <h2 className="challenge__quote reveal reveal-delay-1">
            What if memory<br />
            was a brand?
          </h2>
          <div className="challenge__divider reveal reveal-delay-2"></div>
          <p className="challenge__text reveal reveal-delay-3">
            The goal was to create a fragrance identity that communicates luxury without spectacle—built on emotion, restraint, and
            legacy rather than trend. REMORIA needed to feel monumental yet intimate: classical in reference, modern in execution,
            and softened by Mediterranean light and materiality. The challenge was coherence—ensuring typography, palette, textures,
            and copy all carried the same quiet weight. Success meant the brand could be felt before it was explained.
          </p>
          <div className="challenge__criteria reveal reveal-delay-4">
            <p className="challenge__criteria-label">Success Criteria</p>
            <p className="challenge__criteria-item" data-gold>Feel timeless, not retro.</p>
            <p className="challenge__criteria-item" data-gold>Signal premium through restraint, not ornament.</p>
            <p className="challenge__criteria-item" data-gold>Build a system that scales across future scents and stories.</p>
          </div>
        </div>
      </section>

      {/* Full Bleed Image 1 */}
      <div className="full-image">
        <Image
          src="/images/case-studies/remoria/full-1.webp"
          alt="Remoria image placeholder 1"
          fill
          quality={90}
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* The Approach */}
      <section className="section section--light">
        <div className="section__inner">
          <p className="section__label reveal">The Approach</p>

          {/* Row 1: Text + Tools */}
          <div className="approach__header reveal reveal-delay-1">
            <p className="approach__text">
              <strong>Luxury as restraint: let the brand whisper, not shout.</strong> I anchored REMORIA in narrative
              strategy—memory, myth, and place—then translated those themes into a minimal, sculptural identity language.
              Roman-inspired serif forms established permanence, while Mediterranean warmth kept the brand human and sensual. The
              palette was built from stone, patina, and gilded accents to evoke time-worn elegance without heaviness. Copy was
              treated like fragrance: sparse, lyrical, and deliberate—more suggestion than statement.
            </p>

            <div className="approach__tools">
              <p className="approach__tools-label">Tools</p>
              <div className="approach__tools-list">
                <span className="approach__tool" data-gold>Adobe Illustrator</span>
                <span className="approach__tool" data-gold>Photoshop</span>
                <span className="approach__tool" data-gold>Figma</span>
                <span className="approach__tool" data-gold>Pinterest</span>
              </div>
            </div>
          </div>

          {/* Row 2: Brand System */}
          <div className="approach__system reveal reveal-delay-2">
            <p className="approach__system-label">The Brand System</p>
            <div className="approach__system-grid">
              <div className="approach__system-item">
                <p className="approach__system-title" data-gold>The Variable</p>
                <p className="approach__system-desc">Each fragrance narrative (place, emotion, notes)</p>
              </div>
              <div className="approach__system-item">
                <p className="approach__system-title" data-gold>The Constant</p>
                <p className="approach__system-desc">Restraint, timeless structure, tactile elegance</p>
              </div>
              <div className="approach__system-item">
                <p className="approach__system-title" data-gold>The Output</p>
                <p className="approach__system-desc">A scalable luxury identity + storytelling framework</p>
              </div>
            </div>
          </div>

          {/* Row 3: Aesthetic + Voice side by side */}
          <div className="approach__modules reveal reveal-delay-3">
            {/* Aesthetic System */}
            <div className="aesthetic">
              <p className="aesthetic__header">Visual System</p>
              <div className="aesthetic__item">
                <span className="aesthetic__label">Typography</span>
                <span className="aesthetic__value">Sculptural serif, classical inscription</span>
              </div>
              <div className="aesthetic__item">
                <span className="aesthetic__label">Color</span>
                <span className="aesthetic__value">
                  <span className="aesthetic__color">
                    <span className="aesthetic__swatch" style={{ background: '#C6A877' }}></span>
                    Stone, patina, Antique Gold
                  </span>
                </span>
              </div>
              <div className="aesthetic__item">
                <span className="aesthetic__label">Composition</span>
                <span className="aesthetic__value">Editorial spacing, calm rhythm</span>
              </div>
              <div className="aesthetic__item">
                <span className="aesthetic__label">Materials</span>
                <span className="aesthetic__value">Frosted glass, aged paper, wood</span>
              </div>
            </div>

            {/* Voice */}
            <div className="voice">
              <p className="voice__label">Brand Voice</p>
              <div className="voice__traits">
                <span className="voice__trait">Poetic</span>
                <span className="voice__trait">Restrained</span>
                <span className="voice__trait">Intimate</span>
                <span className="voice__trait">Composed</span>
              </div>
              <p className="voice__signature">A scent to remember what words could not.</p>
            </div>
          </div>

          {/* Row 4: The Detail */}
          <div className="obsession reveal">
            <p className="obsession__label">The Detail</p>
            <p className="obsession__text">
              Antique Gold is used like gilding on an artifact—rare, precise, never decorative. That restraint turns every highlight
              into a memory marker.
            </p>
          </div>

          {/* Row 5: Images */}
          <div className="approach__images">
            <div className="approach__image reveal">
              <Image
                src="/images/case-studies/remoria/approach-1.webp"
                alt="Remoria approach image placeholder 1"
                fill
                quality={90}
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="approach__image reveal reveal-delay-1">
              <Image
                src="/images/case-studies/remoria/approach-2.webp"
                alt="Remoria approach image placeholder 2"
                fill
                quality={90}
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Image */}
      <section className="feature">
        <div className="feature__image reveal">
          <Image
            src="/images/case-studies/remoria/feature.webp"
            alt="Remoria feature image placeholder"
            fill
            quality={95}
            sizes="(max-width: 1400px) 100vw, 1400px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* Gallery */}
      <section className="section section--light">
        <div className="section__inner">
          <div className="gallery__grid">
            <div className="gallery__row--3">
              <div className="gallery__item reveal">
                <Image
                  src="/images/case-studies/remoria/gallery-1.webp"
                  alt="Remoria gallery image placeholder 1"
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="gallery__item reveal reveal-delay-1">
                <Image
                  src="/images/case-studies/remoria/gallery-2.webp"
                  alt="Remoria gallery image placeholder 2"
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="gallery__item reveal reveal-delay-2">
                <Image
                  src="/images/case-studies/remoria/gallery-3.webp"
                  alt="Remoria gallery image placeholder 3"
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="gallery__row--asymmetric">
              <div className="gallery__item gallery__item--wide reveal">
                <Image
                  src="/images/case-studies/remoria/gallery-4.webp"
                  alt="Remoria gallery image placeholder 4"
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="gallery__item reveal reveal-delay-1">
                <Image
                  src="/images/case-studies/remoria/gallery-5.webp"
                  alt="Remoria gallery image placeholder 5"
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Bleed Image 2 */}
      <div className="full-image">
        <Image
          src="/images/case-studies/remoria/full-2.webp"
          alt="Remoria image placeholder 2"
          fill
          quality={90}
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Results */}
      <section className="section section--dark">
        <div className="section__inner">
          <p className="section__label reveal">The Takeaway</p>

          <div className="results">
            <p className="results__text reveal reveal-delay-1">
              REMORIA delivered a complete luxury brand world—identity, voice, and aesthetic system—built to scale without losing
              its atmosphere. It proves that emotional restraint can communicate premium more convincingly than overt signals. The
              work establishes a foundation for future fragrances to live as chapters of the same mythology.
            </p>

            <div className="results__takeaway reveal reveal-delay-2" data-gold>
              <p className="results__takeaway-text">Luxury isn&apos;t loud—it lingers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <NextCaseStudy currentHref="/case-studies/remoria" />
    </>
  )
}

