'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import NextCaseStudy from '@/components/NextCaseStudy'
import StructuredData from '@/components/StructuredData'

export default function AISportsCampaignPage() {
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
          headline: 'AI Sports Campaign',
          description:
            'A Creative Direction Engine built in n8n—swap casting and wardrobe while locking the shot. Campaign-grade coherence from generative AI.',
          image: `${baseUrl}/images/placeholders/ai-sports-hero.webp`,
          datePublished: '2026-01-01',
          dateModified: '2026-01-01',
          url: `${baseUrl}/case-studies/ai-sports`,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/case-studies/ai-sports`,
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
            src="/images/placeholders/ai-sports-hero.webp"
            alt="AI Sports Campaign hero image placeholder"
            fill
            priority
            quality={90}
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="hero__overlay"></div>
        <div className="hero__content">
          <h1 className="hero__title">AI Sports<br />Campaign</h1>
          <p className="hero__tagline">A Creative Direction Engine.</p>
          <p className="hero__subtitle">AI Automation System & Creative Direction • 2026</p>
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
                <span className="overview__meta-value">AI Automation System</span>
              </div>
              <div className="overview__meta-item">
                <span className="overview__meta-label">Role</span>
                <span className="overview__meta-value">System Design & Creative Direction</span>
              </div>
              <div className="overview__meta-item">
                <span className="overview__meta-label">Tools</span>
                <span className="overview__meta-value">n8n, Generative Image API, Reference Conditioning</span>
              </div>
              <div className="overview__meta-item overview__meta-item--full">
                <span className="overview__meta-label">Deliverables</span>
                <span className="overview__meta-value">
                  n8n Workflow, Input Spec, Consistency Guardrails, Campaign Demo Outputs
                </span>
              </div>
            </div>

            <div className="overview__content reveal reveal-delay-1">
              <p className="overview__text">
                Everyone can generate &quot;cool&quot; images now. Almost no one can generate consistent campaigns. I built a
                custom n8n automation—a Creative Direction Engine—that takes one reference campaign shot and lets me swap the
                model and wardrobe while keeping lighting, environment, and shot DNA stable. The result is campaign-grade
                coherence produced in minutes—iteration becomes a repeatable loop instead of a re-shoot problem.
              </p>
              <p className="overview__intent">
                Turn creative direction from &quot;slot machine outcomes&quot; into a system you can run on purpose.
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
            Generative AI gives you images.<br />
            It doesn&apos;t give you campaigns.
          </h2>
          <div className="challenge__divider reveal reveal-delay-2"></div>
          <p className="challenge__text reveal reveal-delay-3">
            The baseline problem with generative image workflows is drift: change one thing and everything changes—lighting,
            texture, camera feel, even the &quot;world&quot; itself. That&apos;s fine for one-off visuals, but campaigns demand
            continuity: the audience should feel like every asset came from the same production. The challenge wasn&apos;t making
            a single strong image. It was building a workflow where the scene stays constant while casting and wardrobe stay
            editable.
          </p>
          <div className="challenge__criteria reveal reveal-delay-4">
            <p className="challenge__criteria-label">Success Criteria</p>
            <p className="challenge__criteria-item">
              Outputs must read as one campaign, not separate &quot;generations&quot;
            </p>
            <p className="challenge__criteria-item">Swap model + wardrobe without rebuilding prompts from scratch</p>
            <p className="challenge__criteria-item">Keep shot anchors stable: environment, lighting, framing, texture</p>
            <p className="challenge__criteria-item">Produce usable variants fast enough for real marketing iteration</p>
          </div>
        </div>
      </section>

      {/* Full Bleed Image 1 */}
      <div className="full-image">
        <Image
          src="/images/placeholders/ai-sports-full-1.webp"
          alt="AI Sports Campaign image placeholder 1"
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
              <strong>Make it usable: a system, not a poster.</strong> The key insight: campaign consistency comes from
              constraints, not creativity-by-prompt. I designed the automation around a &quot;constants vs variables&quot; model—first
              locking the non-negotiables of the reference shot, then giving controlled flexibility to casting and wardrobe. The
              workflow ingests three visual inputs and routes them through a repeatable pipeline that prioritizes continuity over
              novelty. Output selection stays human-led: I pick the final based on realism, brand fit, and product readability—because
              campaigns are edited, not merely generated.
            </p>

            <div className="approach__tools">
              <p className="approach__tools-label">Stack</p>
              <div className="approach__tools-list">
                <span className="approach__tool">n8n</span>
                <span className="approach__tool">Generative API</span>
                <span className="approach__tool">Reference Conditioning</span>
                <span className="approach__tool">Prompt Schema</span>
                <span className="approach__tool">Output Versioning</span>
              </div>
            </div>
          </div>

          {/* Row 2: How It Works */}
          <div className="approach__system reveal reveal-delay-2">
            <p className="approach__system-label">How It Works</p>
            <div className="approach__system-grid">
              <div className="approach__system-item">
                <p className="approach__system-title">The Variable</p>
                <p className="approach__system-desc">
                  Casting (new model reference) + wardrobe (clothing/product references)
                </p>
              </div>
              <div className="approach__system-item">
                <p className="approach__system-title">The Constant</p>
                <p className="approach__system-desc">
                  Reference shot&apos;s lighting logic, environment, framing, and &quot;same shoot&quot; texture cues
                </p>
              </div>
              <div className="approach__system-item">
                <p className="approach__system-title">The Output</p>
                <p className="approach__system-desc">
                  Small set of campaign-consistent variants ready for creative selection
                </p>
              </div>
            </div>
          </div>

          {/* Row 3: Iteration Proof */}
          <div className="approach__iteration reveal reveal-delay-3">
            <div className="iteration">
              <p className="iteration__label">Iteration Proof</p>

              <div className="iteration__grid">
                <div className="iteration__item">
                  <p className="iteration__title">What Changed</p>
                  <p className="iteration__text">
                    Separation of &quot;scene anchors&quot; vs &quot;editable attributes&quot; in workflow logic
                  </p>
                </div>

                <div className="iteration__item">
                  <p className="iteration__title">Why</p>
                  <p className="iteration__text">
                    Early tests produced strong images that still looked like different shoots—drift compounded fast
                  </p>
                </div>

                <div className="iteration__item">
                  <p className="iteration__title">Decision Rule</p>
                  <p className="iteration__text">
                    Continuity wins over &quot;cool.&quot; If background, lighting, or feel changes, the output fails—because campaigns
                    are built on sameness with intentional variation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Deliverables */}
          <div className="deliverables reveal">
            <p className="deliverables__label">Deliverable Rationale</p>
            <div className="deliverables__grid">
              <div className="deliverables__item">
                <span className="deliverables__name">Automation Pipeline</span>
                <span className="deliverables__why">Turns the process into a repeatable asset, not a manual ritual</span>
              </div>
              <div className="deliverables__item">
                <span className="deliverables__name">3-Input Spec</span>
                <span className="deliverables__why">Makes creative direction explicit and portable</span>
              </div>
              <div className="deliverables__item">
                <span className="deliverables__name">Guardrails + Checklist</span>
                <span className="deliverables__why">Enforces campaign continuity, prevents AI drift</span>
              </div>
              <div className="deliverables__item">
                <span className="deliverables__name">Campaign Demo</span>
                <span className="deliverables__why">Proves the system under high-scrutiny conditions</span>
              </div>
            </div>
          </div>

          <div className="approach__images">
            <div className="approach__image reveal">
              <Image
                src="/images/placeholders/ai-sports-approach-1.webp"
                alt="AI Sports Campaign approach image placeholder 1"
                fill
                quality={90}
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="approach__image reveal reveal-delay-1">
              <Image
                src="/images/placeholders/ai-sports-approach-2.webp"
                alt="AI Sports Campaign approach image placeholder 2"
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
            src="/images/placeholders/ai-sports-feature.webp"
            alt="AI Sports Campaign feature image placeholder"
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
                  src="/images/placeholders/ai-sports-gallery-1.webp"
                  alt="AI Sports Campaign gallery image placeholder 1"
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="gallery__item reveal reveal-delay-1">
                <Image
                  src="/images/placeholders/ai-sports-gallery-2.webp"
                  alt="AI Sports Campaign gallery image placeholder 2"
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="gallery__item reveal reveal-delay-2">
                <Image
                  src="/images/placeholders/ai-sports-gallery-3.webp"
                  alt="AI Sports Campaign gallery image placeholder 3"
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
                  src="/images/placeholders/ai-sports-gallery-4.webp"
                  alt="AI Sports Campaign gallery image placeholder 4"
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="gallery__item reveal reveal-delay-1">
                <Image
                  src="/images/placeholders/ai-sports-gallery-5.webp"
                  alt="AI Sports Campaign gallery image placeholder 5"
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
          src="/images/placeholders/ai-sports-full-2.webp"
          alt="AI Sports Campaign image placeholder 2"
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
              The system makes campaign iteration fast and controllable: you can adapt casting and styling while keeping the visual
              world consistent. It replaces &quot;generate until lucky&quot; with a repeatable creative loop—inputs go in, coherent
              variants come out in minutes, and the final is chosen through judgment, not randomness. Practically, it enables
              campaign-level decisions without campaign-level burn rate.
            </p>

            <div className="results__takeaway reveal reveal-delay-2">
              <p className="results__takeaway-text">
                This isn&apos;t just prompting—it&apos;s automated infrastructure for repeatable creative direction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <NextCaseStudy currentHref="/case-studies/ai-sports" />
    </>
  )
}

