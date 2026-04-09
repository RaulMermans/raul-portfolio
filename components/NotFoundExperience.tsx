'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'

export default function NotFoundExperience() {
  const orbRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLElement>(null)
  const glitchWrapperRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const copy =
    locale === 'es'
      ? {
          back: 'Volver',
          label: 'Escena no encontrada',
          message:
            'Este fotograma parece haberse salido del carrete. Si buscabas una URL antigua de proyecto, la estructura del portfolio ha cambiado. Volvamos a las páginas con mejor prueba.',
          home: 'Volver al inicio',
          caseStudies: 'Casos de estudio',
        }
      : {
          back: 'Back',
          label: 'Scene Not Found',
          message:
            "This frame seems to be missing from the reel. If you were looking for an older project URL, the portfolio structure has changed. Let's get you back to the strongest proof pages.",
          home: 'Return Home',
          caseStudies: 'Case Studies',
        }

  useEffect(() => {
    const pageElement = pageRef.current
    const orbElement = orbRef.current

    const handleMouseMove = (e: MouseEvent) => {
      if (!orbElement || !pageElement) return

      const rect = pageElement.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      orbElement.style.transform = `translate(calc(-50% + ${x * 30}px), calc(-50% + ${y * 30}px)) scale(1)`
    }

    if (pageElement && window.matchMedia('(hover: hover)').matches) {
      pageElement.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    const triggerGlitch = () => {
      if (glitchWrapperRef.current) {
        glitchWrapperRef.current.style.animation = 'none'
        void glitchWrapperRef.current.offsetHeight
        glitchWrapperRef.current.style.animation = ''
      }

      const nextGlitch = 3000 + Math.random() * 5000
      window.setTimeout(triggerGlitch, nextGlitch)
    }

    const glitchTimer = window.setTimeout(triggerGlitch, 2000)

    return () => {
      window.clearTimeout(glitchTimer)

      if (pageElement) {
        pageElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <>
      <div className="scanlines" aria-hidden="true"></div>

      <div className="sprockets sprockets--left" aria-hidden="true">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="sprocket"></div>
        ))}
      </div>

      <div className="sprockets sprockets--right" aria-hidden="true">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="sprocket"></div>
        ))}
      </div>

      <Link href={localizePath('/', locale)} className="back-link">
        <span className="back-link__arrow">←</span>
        <span>{copy.back}</span>
      </Link>

      <div className="frame-counter" aria-hidden="true">
        <div className="frame-counter__dot"></div>
        <span className="frame-counter__number">
          FRM <span>0000</span>
        </span>
      </div>

      <main id="main-content" ref={pageRef} className="page-404" role="main">
        <div className="error-display">
          <div ref={glitchWrapperRef} className="glitch-wrapper" data-text="404">
            <h1 className="error-number">
              <span className="digit">4</span>
              <span className="digit digit--zero">
                0
                <div ref={orbRef} className="orb" aria-hidden="true"></div>
              </span>
              <span className="digit">4</span>
            </h1>
          </div>
        </div>

        <div className="content">
          <span className="label">{copy.label}</span>
          <p className="message">{copy.message}</p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            <Link href={localizePath('/', locale)} className="btn">
              <span>{copy.home}</span>
              <span className="btn__arrow">→</span>
            </Link>
            <Link href={localizePath('/case-studies', locale)} className="btn">
              <span>{copy.caseStudies}</span>
              <span className="btn__arrow">→</span>
            </Link>
            <Link href={localizePath('/apps/overflow', locale)} className="btn">
              <span>Overflow</span>
              <span className="btn__arrow">→</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
