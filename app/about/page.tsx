'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import Socials from '@/components/Socials'
import RevealOnScroll from '@/components/RevealOnScroll'
import { getSiteCopy } from '@/data/site-copy'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'

export default function AboutPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const copy = getSiteCopy(locale).aboutPage
  return (
    <>
      <RevealOnScroll />
      <Header locale={locale} />

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
                <p className="label about-hero__label">{copy.label}</p>
              </div>

              <h1 className="about-hero__title reveal reveal-delay-1">
                {copy.title}
              </h1>

              <div className="about-hero__text reveal reveal-delay-2">
                {locale === 'es' ? (
                  <>
                    <p>
                      Llegué a este sector desde el mundo de los negocios y aprendí de forma autodidacta a crear
                      los sistemas que los equipos realmente necesitan. Hoy diseño{' '}
                      <Link href={localizePath('/case-studies', locale)} className="highlight">
                        flujos de trabajo con IA
                      </Link>
                      , <span className="highlight">capas de automatización</span> e{' '}
                      <Link href={localizePath('/apps/overflow', locale)} className="highlight">
                        interfaces orientadas a producto
                      </Link>
                      ... Mi valor diferencial es la combinación de{' '}
                      <span className="highlight">pensamiento sistémico</span>,{' '}
                      <span className="highlight">implementación práctica</span> y un{' '}
                      <span className="highlight">criterio creativo</span> lo suficientemente sólido como
                      para mantener un resultado coherente, útil y listo para desplegarse.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      I came into this work through <span className="highlight">business</span>, then taught
                      myself how to build what teams actually need when strategy has to become execution.
                      Today I design{' '}
                      <Link href={localizePath('/case-studies', locale)} className="highlight">
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
                      <Link href={localizePath('/apps/overflow', locale)} className="highlight">
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
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <Contact locale={locale} />

        {/* Socials Section */}
        <Socials locale={locale} />

      </main>

      {/* Footer */}
      <Footer locale={locale} />
    </>
  )
}
