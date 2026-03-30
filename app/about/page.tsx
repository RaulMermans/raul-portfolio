import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import Socials from '@/components/Socials'
import RevealOnScroll from '@/components/RevealOnScroll'

export default function AboutPage() {
  return (
    <>
      <RevealOnScroll />
      <Header />

      <main id="main-content" role="main">
        {/* Hero/Bio Section */}
        <section className="about-hero">
          <div className="about-hero__container">
            {/* Image Section */}
            <div className="about-hero__image-wrapper reveal">
              <div className="about-hero__image" style={{ aspectRatio: '3/4' }}>
                <Image
                  src="/images/about/profile.webp"
                  alt="Raúl Mermans"
                  fill
                  priority
                  quality={85}
                  sizes="(max-width: 900px) 100vw, 500px"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  className="about-hero__img"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="about-hero__content">
              <div className="about-hero__header reveal">
                <p className="label about-hero__label">About</p>
              </div>

              <h1 className="about-hero__title reveal reveal-delay-1">
                Applied AI Systems, Built With Taste
              </h1>

              <div className="about-hero__text reveal reveal-delay-2">
                <p>
                  I came into this work through <span className="highlight">business</span>, then taught
                  myself how to build what teams actually need when strategy has to become execution.
                  Today I design{' '}
                  <Link href="/case-studies" className="highlight">
                    AI systems
                  </Link>
                  ,{' '}
                  <span className="highlight">agentic workflows</span>, and{' '}
                  <span className="highlight">automation infrastructure</span> for marketing, CRM,
                  content, and creative operations.
                </p>

                <p>
                  I&apos;m less interested in one-off AI outputs than in the system behind them:
                  where work gets routed, where judgment lives, what should be automated, and
                  how an interface makes the whole thing usable. That means{' '}
                  <span className="highlight">workflow logic</span>,{' '}
                  <span className="highlight">orchestration</span>,{' '}
                  <span className="highlight">internal tools</span>, and{' '}
                  <Link href="/apps/overflow" className="highlight">
                    product-minded implementation
                  </Link>
                  .
                </p>

                <p>
                  Creative taste still matters. My background in brand, visuals, and image-making
                  is useful because it acts as <span className="highlight">quality control inside the system</span>.
                  It helps me decide what should feel restrained, what should stay human, and what
                  makes an output <span className="highlight">commercially credible</span> rather than merely new.
                </p>

                <p>
                  I work best with modern brands and teams that need{' '}
                  <span className="highlight">sharper execution</span>,{' '}
                  <span className="highlight">better workflows</span>, and infrastructure they can
                  actually use. If the problem sits between marketing, CRM, content, operations,
                  and creative execution, that&apos;s usually where I&apos;m most useful.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <Contact />

        {/* Socials Section */}
        <Socials />

      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
