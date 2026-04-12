'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
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
        <section className="about-hero">
          <div className="about-hero__container">
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

            <div className="about-hero__content">
              <div className="about-hero__header reveal">
                <p className="label about-hero__label">{copy.label}</p>
              </div>

              <h1 className="about-hero__title reveal reveal-delay-1">{copy.title}</h1>

              <div className="about-hero__text reveal reveal-delay-2">
                {locale === 'es' ? (
                  <>
                    <p>
                      Diseño sistemas de IA para equipos que ya tienen objetivos, presión real por ejecutar
                      y demasiados pasos manuales entre ambas cosas. Mi trabajo consiste en convertir esa
                      fricción en una arquitectura clara: qué se automatiza, qué se revisa, qué se mide y
                      cómo se usa de verdad.
                    </p>

                    <p>
                      Pienso con lógica de negocio y construyo con criterio de producto. Eso significa
                      mapear cuellos de botella, definir guardrails y diseñar la capa operativa que conecta{' '}
                      <Link href={localizePath('/case-studies', locale)} className="highlight">
                        sistemas de IA
                      </Link>
                      , <span className="highlight">automatización</span> e{' '}
                      <Link href={localizePath('/apps/overflow', locale)} className="highlight">
                        interfaces orientadas a producto
                      </Link>
                      . Busco que el sistema no solo funcione, sino que el equipo pueda mantenerlo con más
                      velocidad, control y consistencia.
                    </p>

                    <p>
                      También aporto <span className="highlight">rigor creativo</span>. Mi experiencia en
                      identidad, dirección visual e imagen me ayuda a mantener calidad dentro del sistema:
                      para que el resultado no se sienta como una demo técnica, sino como una herramienta útil,
                      coherente y comercialmente creíble para un equipo real.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      I design AI systems for teams that already have goals, pressure, and too many manual
                      steps between the two. My work is about turning that friction into a clear operating
                      architecture: what gets automated, what stays reviewed, what gets measured, and how the
                      system is actually used day to day.
                    </p>

                    <p>
                      I think with business logic and build with product judgment. That means mapping
                      bottlenecks, defining guardrails, and shaping the operating layer that connects{' '}
                      <Link href={localizePath('/case-studies', locale)} className="highlight">
                        AI systems
                      </Link>
                      , <span className="highlight">automation</span>, and{' '}
                      <Link href={localizePath('/apps/overflow', locale)} className="highlight">
                        product-minded implementation
                      </Link>
                      . The goal is not novelty. It is better execution with more speed, control, and consistency.
                    </p>

                    <p>
                      Creative rigor still matters. My background in brand systems, visuals, and image-making
                      acts as <span className="highlight">quality control inside the system</span>. It helps me
                      decide what should stay human, what should feel restrained, and what makes an output
                      commercially credible for a real team instead of just impressive in a demo.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <Contact locale={locale} />
      </main>

      <Footer locale={locale} />
    </>
  )
}
