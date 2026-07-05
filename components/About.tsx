'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getSiteCopy } from '@/data/site-copy'
import { type Locale, localizePath } from '@/lib/i18n'
import Reveal from './Reveal'

interface AboutProps {
  locale?: Locale
}

export default function About({ locale = 'en' }: AboutProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  const copy = getSiteCopy(locale).home.aboutPreview

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    const imageElement = imageRef.current
    if (imageElement) {
      observer.observe(imageElement)
    }

    return () => {
      if (imageElement) {
        observer.unobserve(imageElement)
      }
    }
  }, [])

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="about__inner">
        <div className="about__image-wrapper">
          <div ref={imageRef} className="about__image" id="about-image" style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src="/images/about/profile.webp"
              alt="Portrait of Raúl Mermans"
              fill
              loading="lazy"
              quality={80}
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="about__frame"></div>
        </div>
        <div className="about__content">
          <p className="label about__label reveal">{copy.label}</p>
          <h2 id="about-title" className="about__headline reveal reveal-delay-1">
            {copy.title}
          </h2>
          <p className="about__text reveal reveal-delay-2">
            {locale === 'es' ? (
              <>
                Construyo <span className="highlight">herramientas asistidas por IA</span>,{' '}
                <span className="highlight">lógica CRM</span> y{' '}
                <span className="highlight">workflows de marca</span> que convierten inputs dispersos
                en decisiones más claras sin perder criterio visual ni control humano.
              </>
            ) : (
              <>
                I build <span className="highlight">AI-assisted tools</span>,{' '}
                <span className="highlight">CRM logic</span>, and{' '}
                <span className="highlight">brand workflows</span> that turn scattered inputs into clearer
                decisions without losing visual judgment or human control.
              </>
            )}
          </p>
          
          <Link
            href={localizePath('/about', locale)}
            className="btn btn--arrow reveal reveal-delay-3"
            aria-label={locale === 'es' ? 'Leer más sobre Raúl Mermans' : 'Read more about Raúl Mermans'}
          >
            {copy.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
