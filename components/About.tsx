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
                Llegué a este trabajo desde el negocio y luego aprendí a construir los sistemas
                que los equipos realmente necesitan. Hoy diseño <span className="highlight">flujos de IA</span>,{' '}
                <span className="highlight">capas de automatización</span> e{' '}
                <span className="highlight">interfaces con mentalidad de producto</span> para marketing, CRM, contenido
                y ejecución creativa. Mi ventaja está en la combinación de{' '}
                <span className="highlight">pensamiento sistémico</span>,{' '}
                <span className="highlight">implementación práctica</span> y{' '}
                <span className="highlight">criterio creativo</span> suficiente para que el resultado
                sea coherente, útil y digno de desplegarse.
              </>
            ) : (
              <>
                I came into this work through business, then taught myself how to build the
                systems teams actually need. Today I design <span className="highlight">AI workflows</span>,{' '}
                <span className="highlight">automation layers</span>, and{' '}
                <span className="highlight">product-minded interfaces</span> for marketing, CRM, content,
                and creative execution. My edge is the combination of{' '}
                <span className="highlight">systems thinking</span>,{' '}
                <span className="highlight">practical implementation</span>, and{' '}
                <span className="highlight">creative judgment</span> strong enough to keep the output
                coherent, useful, and worth deploying.
              </>
            )}
          </p>
          
          <Link 
            href={localizePath('/about', locale)} 
            className="btn btn--arrow reveal reveal-delay-3"
            aria-label="Read more about Raúl Mermans"
          >
            {copy.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
