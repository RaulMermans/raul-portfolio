'use client'

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type TransitionEvent,
} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getSiteCopy } from '@/data/site-copy'
import { type Locale, localizePath } from '@/lib/i18n'
import styles from './SectionCards.module.css'

function getSlideStyle(relativeIndex: number): CSSProperties {
  const absIndex = Math.abs(relativeIndex)

  if (relativeIndex === 0) {
    return {
      opacity: 1,
      filter: 'none',
      transform: 'translateY(0px) scale(1) rotateY(0deg)',
      zIndex: 4,
    }
  }

  if (absIndex === 1) {
    return {
      opacity: 0.56,
      filter: 'blur(0.8px) saturate(0.92)',
      transform: `translateY(22px) scale(0.89) rotateY(${relativeIndex > 0 ? '-18deg' : '18deg'})`,
      zIndex: 3,
    }
  }

  return {
    opacity: 0.18,
    filter: 'blur(3px) saturate(0.78)',
    transform: `translateY(42px) scale(0.76) rotateY(${relativeIndex > 0 ? '-30deg' : '30deg'})`,
    zIndex: 2,
    pointerEvents: 'none',
  }
}

interface SectionCardsProps {
  locale?: Locale
}

export default function SectionCards({ locale = 'en' }: SectionCardsProps) {
  const router = useRouter()
  const copy = useMemo(() => getSiteCopy(locale).home.sectionCards, [locale])
  const sections = useMemo(
    () => copy.sections.map((section) => ({
      ...section,
      href: localizePath(
        section.id === 'case-studies'
          ? '/case-studies'
          : section.id === 'apps'
            ? '/apps'
            : section.id === 'photography'
              ? '/photography'
              : '/visuals',
        locale,
      ),
      image:
        section.id === 'case-studies'
          ? '/images/sections/case-studies-bg.webp'
          : section.id === 'apps'
            ? '/images/sections/apps-bg-v2.webp'
            : section.id === 'photography'
              ? '/images/sections/photography-bg.webp'
              : '/images/sections/visuals-bg.webp',
      accent:
        section.id === 'case-studies'
          ? '#b94a53'
          : section.id === 'apps'
            ? '#3f9f8b'
            : section.id === 'photography'
              ? '#9c7847'
              : '#d86d43',
    })),
    [copy.sections, locale]
  )
  const loopedSections = useMemo(
    () => [sections[sections.length - 1], ...sections, sections[0]],
    [sections]
  )
  const gridId = useId()
  const pointerStartXRef = useRef<number | null>(null)
  const pointerDeltaXRef = useRef(0)
  const didSwipeRef = useRef(false)
  const rafIdsRef = useRef<number[]>([])

  const [visualIndex, setVisualIndex] = useState(1)
  const [transitionsEnabled, setTransitionsEnabled] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const activeIndex = (visualIndex - 1 + sections.length) % sections.length
  const previousIndex = (activeIndex - 1 + sections.length) % sections.length
  const nextIndex = (activeIndex + 1) % sections.length

  useEffect(() => {
    const rafIds = rafIdsRef.current

    return () => {
      rafIds.forEach((id) => window.cancelAnimationFrame(id))
    }
  }, [])

  useEffect(() => {
    ;[activeIndex, previousIndex, nextIndex].forEach((index) => {
      router.prefetch(sections[index].href)
    })
  }, [activeIndex, nextIndex, previousIndex, router, sections])

  const finishWrapReset = useCallback((nextVisualIndex: number) => {
    setTransitionsEnabled(false)
    setVisualIndex(nextVisualIndex)

    const firstFrame = window.requestAnimationFrame(() => {
      const secondFrame = window.requestAnimationFrame(() => {
        setTransitionsEnabled(true)
        setIsTransitioning(false)
      })
      rafIdsRef.current.push(secondFrame)
    })

    rafIdsRef.current.push(firstFrame)
  }, [])

  const goToVisualIndex = useCallback(
    (nextVisualIndex: number) => {
      if (isTransitioning) return

      setTransitionsEnabled(true)
      setIsTransitioning(true)
      setVisualIndex(nextVisualIndex)
    },
    [isTransitioning]
  )

  const goNext = useCallback(() => {
    goToVisualIndex(visualIndex + 1)
  }, [goToVisualIndex, visualIndex])

  const goPrev = useCallback(() => {
    goToVisualIndex(visualIndex - 1)
  }, [goToVisualIndex, visualIndex])

  const handleTrackTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return

    if (visualIndex === 0) {
      finishWrapReset(sections.length)
      return
    }

    if (visualIndex === loopedSections.length - 1) {
      finishWrapReset(1)
      return
    }

    setIsTransitioning(false)
  }

  const handleStageKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrev()
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary) return

    pointerStartXRef.current = event.clientX
    pointerDeltaXRef.current = 0
    didSwipeRef.current = false
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartXRef.current === null) return

    pointerDeltaXRef.current = event.clientX - pointerStartXRef.current

    if (Math.abs(pointerDeltaXRef.current) > 12) {
      didSwipeRef.current = true
    }
  }

  const handlePointerEnd = () => {
    if (pointerStartXRef.current === null) return

    const deltaX = pointerDeltaXRef.current

    if (Math.abs(deltaX) > 56) {
      if (deltaX < 0) {
        goNext()
      } else {
        goPrev()
      }
    }

    pointerStartXRef.current = null
    pointerDeltaXRef.current = 0
  }

  const handleCardClick = (
    event: MouseEvent<HTMLAnchorElement>,
    slideIndex: number,
    isActiveSlide: boolean
  ) => {
    if (didSwipeRef.current) {
      event.preventDefault()
      didSwipeRef.current = false
      return
    }

    if (!isActiveSlide) {
      event.preventDefault()
      goToVisualIndex(slideIndex)
    }
  }

  const totalLabel = sections.length.toString().padStart(2, '0')
  const trackStyle: CSSProperties = {
    transform: `translateX(calc(-${visualIndex} * (var(--section-card-width) + var(--section-card-gap))))`,
    transitionDuration: transitionsEnabled ? undefined : '0ms',
  }

  return (
    <section id="work" className={styles.container} data-home-section="work">
      <div className={styles.desktopCarousel}>
        <div className={styles.controls}>
          <button
            type="button"
            onClick={goPrev}
            disabled={isTransitioning}
            className={`${styles.nav} ${styles.navPrev}`}
            aria-controls={gridId}
            aria-label={`${copy.prev} ${sections[previousIndex].title}`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={isTransitioning}
            className={`${styles.nav} ${styles.navNext}`}
            aria-controls={gridId}
            aria-label={`${copy.next} ${sections[nextIndex].title}`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div
          id={gridId}
          className={styles.stage}
          role="region"
          aria-roledescription="carousel"
          aria-label={locale === 'es' ? 'Proyectos seleccionados' : 'Selected projects'}
          tabIndex={0}
          onKeyDown={handleStageKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onPointerLeave={handlePointerEnd}
        >
          <p className={styles.srOnly} aria-live="polite">
            {locale === 'es' ? 'Mostrando' : 'Showing'} {activeIndex + 1} {locale === 'es' ? 'de' : 'of'} {sections.length}: {sections[activeIndex].title}
          </p>

          <div className={styles.track} style={trackStyle} onTransitionEnd={handleTrackTransitionEnd}>
            {loopedSections.map((section, slideIndex) => {
              const relativeIndex = slideIndex - visualIndex
              const isActiveSlide = relativeIndex === 0
              const slideStyle = getSlideStyle(relativeIndex)
              const titleId = `${gridId}-title-${slideIndex}`

              return (
                <div
                  key={`${section.id}-${slideIndex}`}
                  className={styles.slide}
                  style={slideStyle}
                  aria-hidden={Math.abs(relativeIndex) > 1}
                >
                  <Link
                    href={section.href}
                    className={styles.card}
                    style={{ '--section-accent': section.accent } as CSSProperties}
                    aria-labelledby={titleId}
                    aria-current={isActiveSlide ? 'true' : undefined}
                    tabIndex={isActiveSlide ? 0 : -1}
                    prefetch={false}
                    draggable={false}
                    onMouseEnter={() => router.prefetch(section.href)}
                    onFocus={() => router.prefetch(section.href)}
                    onClick={(event) => handleCardClick(event, slideIndex, isActiveSlide)}
                  >
                    <div className={styles.content}>
                      <div className={styles.contentTop}>
                        <div className={styles.indexRow} aria-hidden="true">
                          <span className={styles.index}>{section.index}</span>
                          <span className={styles.count}>/ {totalLabel}</span>
                        </div>
                        <p className={styles.eyebrow}>{section.eyebrow}</p>
                      </div>

                      <div className={styles.copy}>
                        <h2 id={titleId} className={styles.title}>
                          {section.title}
                        </h2>
                        <p className={styles.description}>{section.description}</p>
                      </div>

                      <span className={styles.cta}>
                        <span>{copy.viewLabel}</span>
                        <span className={styles.ctaLine} aria-hidden="true" />
                        <span className={styles.ctaArrow} aria-hidden="true">
                          ↗
                        </span>
                      </span>
                    </div>

                    <div className={styles.imageWrapper}>
                      <Image
                        src={section.image}
                        alt={`${section.title} preview image`}
                        fill
                        priority={slideIndex === 1}
                        loading={slideIndex === 1 ? undefined : 'lazy'}
                        quality={88}
                        sizes="(max-width: 1200px) 82vw, 980px"
                        style={{ objectFit: 'cover' }}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      <div className={styles.imageScrim} />
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <nav
        className={styles.mobileGrid}
        aria-label={locale === 'es' ? 'Proyectos seleccionados' : 'Selected projects'}
        data-mobile-audit="section-card-list"
      >
        {sections.map((section, sectionIndex) => {
          const titleId = `${gridId}-mobile-title-${sectionIndex}`

          return (
            <Link
              key={section.id}
              href={section.href}
              className={`${styles.card} ${styles.mobileCard}`}
              style={{ '--section-accent': section.accent } as CSSProperties}
              aria-labelledby={titleId}
              prefetch={false}
              onMouseEnter={() => router.prefetch(section.href)}
              onFocus={() => router.prefetch(section.href)}
            >
              <div className={styles.content}>
                <div className={styles.contentTop}>
                  <div className={styles.indexRow} aria-hidden="true">
                    <span className={styles.index}>{section.index}</span>
                    <span className={styles.count}>/ {totalLabel}</span>
                  </div>
                  <p className={styles.eyebrow}>{section.eyebrow}</p>
                </div>

                <div className={styles.copy}>
                  <h2 id={titleId} className={styles.title}>
                    {section.title}
                  </h2>
                  <p className={styles.description}>{section.description}</p>
                </div>

                <span className={styles.cta}>
                  <span>{copy.viewLabel}</span>
                  <span className={styles.ctaLine} aria-hidden="true" />
                  <span className={styles.ctaArrow} aria-hidden="true">
                    ↗
                  </span>
                </span>
              </div>

              <div className={styles.imageWrapper}>
                <Image
                  src={section.image}
                  alt={`${section.title} preview image`}
                  fill
                  priority={sectionIndex === 0}
                  loading={sectionIndex === 0 ? undefined : 'lazy'}
                  quality={84}
                  sizes="calc(100vw - 2rem)"
                  style={{ objectFit: 'cover' }}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <div className={styles.imageScrim} />
              </div>
            </Link>
          )
        })}
      </nav>
    </section>
  )
}
