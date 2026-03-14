'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const sections = [
  {
    id: 'case-studies',
    index: '01',
    title: 'Case Studies',
    description: 'The stories behind the work. Brand campaigns, creative direction, and the strategic thinking that shaped them. Each case study reveals the process from concept to measurable impact.',
    href: '/case-studies',
    image: '/images/sections/case-studies-bg.webp',
  },
  {
    id: 'apps',
    index: '02',
    title: 'Apps',
    description: 'Productivity tools and vibe-coded apps built fast with AI, designed to feel intentional. Each product moves from idea to launch-ready experience at full speed without cutting corners.',
    href: '/apps',
    image: '/images/sections/apps-bg-v2.webp',
  },
  {
    id: 'photography',
    index: '03',
    title: 'Photography',
    description: 'Street scenes, urban narratives, and architectural moments. Visual storytelling that captures the pulse of cities and helps brands convert visual interest into lasting engagement.',
    href: '/photography',
    image: '/images/sections/photography-bg.webp',
  },
  {
    id: 'visuals',
    index: '04',
    title: 'Visuals',
    description: 'AI art, album covers, and creative experiments. Digital pieces that push the boundaries of what\'s possible through AI-human collaboration to create truly unique brand assets.',
    href: '/visuals',
    image: '/images/sections/visuals-bg.webp',
  },
]

export default function SectionCards() {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const didDragRef = useRef(false)

  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)

  const applyDepth = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const centerX = containerRect.left + containerRect.width / 2
    const wrappers = container.querySelectorAll<HTMLElement>('.section-card-tilt-wrapper')

    wrappers.forEach((wrapper) => {
      const rect = wrapper.getBoundingClientRect()
      const cardCenterX = rect.left + rect.width / 2
      const offset = cardCenterX - centerX
      const maxDist = containerRect.width / 2
      const ratio = Math.min(Math.abs(offset) / maxDist, 1)
      // Signed ratio for directional rotation
      const signedRatio = Math.min(Math.max(offset / maxDist, -1), 1)

      // Scale: 1.05 at center → 0.88 at far edges
      const scale = 1.05 - ratio * 0.17
      // Opacity: 1 at center → 0.5 at far edges
      const opacity = 1 - ratio * 0.5
      // Y-axis rotation: 0° at center → ±12° at edges (cards turn away)
      const rotateY = signedRatio * -12
      // Vertical shift: center card lifts slightly
      const translateY = ratio * 16
      // Z translation: push side cards back
      const translateZ = -ratio * 80
      // Blur on distant cards
      const blur = ratio * 2

      wrapper.style.transform = `perspective(1200px) rotateY(${rotateY}deg) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`
      wrapper.style.opacity = `${opacity}`
      wrapper.style.filter = blur > 0.3 ? `blur(${blur}px)` : 'none'
      wrapper.style.zIndex = `${Math.round((1 - ratio) * 10)}`
    })
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const frame = window.requestAnimationFrame(() => {
      container.scrollTo({ left: 0, behavior: 'auto' })
      setIsAtStart(true)
      setIsAtEnd(container.scrollWidth <= container.clientWidth + 5)
      applyDepth()
    })

    return () => window.cancelAnimationFrame(frame)
  }, [applyDepth])

  // Drag to scroll
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let isDragging = false
    let startX = 0
    let scrollStart = 0
    const DRAG_THRESHOLD = 5

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      isDragging = true
      didDragRef.current = false
      startX = e.clientX
      scrollStart = container.scrollLeft
      container.style.scrollBehavior = 'auto'
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return
      const dx = e.clientX - startX
      if (Math.abs(dx) > DRAG_THRESHOLD) {
        didDragRef.current = true
        container.style.cursor = 'grabbing'
        e.preventDefault()
      }
      if (didDragRef.current) {
        container.scrollLeft = scrollStart - dx
      }
    }

    const onPointerUp = () => {
      isDragging = false
      container.style.cursor = ''
      container.style.scrollBehavior = 'smooth'
    }

    container.addEventListener('pointerdown', onPointerDown)
    container.addEventListener('pointermove', onPointerMove, { passive: false })
    container.addEventListener('pointerup', onPointerUp)
    container.addEventListener('pointercancel', onPointerUp)

    return () => {
      container.removeEventListener('pointerdown', onPointerDown)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerup', onPointerUp)
      container.removeEventListener('pointercancel', onPointerUp)
    }
  }, [])

  // Depth transforms and start/end check on scroll
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const checkScroll = () => {
      setIsAtStart(container.scrollLeft <= 5)
      setIsAtEnd(Math.abs(container.scrollWidth - container.clientWidth - container.scrollLeft) <= 5)
    }

    const handleScroll = () => {
      applyDepth()
      checkScroll()
    }

    applyDepth()
    checkScroll()
    container.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [applyDepth])

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px 0px' }
    )

    document.querySelectorAll('.section-card').forEach((el) => revealObserver.observe(el))
    return () => revealObserver.disconnect()
  }, [])

  const getScrollStep = () => {
    const container = scrollRef.current
    if (!container) return 300

    const card = container.querySelector<HTMLElement>('.section-card-tilt-wrapper')
    if (!card) return 300

    const styles = window.getComputedStyle(container)
    const gapValue = styles.gap || styles.columnGap || '0'
    const gap = Number.parseFloat(gapValue) || 0

    return card.clientWidth + gap
  }

  const scrollPrev = () => {
    const container = scrollRef.current
    if (!container) return

    container.scrollBy({ left: -getScrollStep(), behavior: 'smooth' })
  }

  const scrollNext = () => {
    const container = scrollRef.current
    if (!container) return

    container.scrollBy({ left: getScrollStep(), behavior: 'smooth' })
  }

  return (
    <section id="work" className="section-cards-container">
      <div className="section-cards-controls">
        <button 
          type="button"
          onClick={scrollPrev} 
          disabled={isAtStart} 
          className="section-cards-nav section-cards-nav--prev" 
          aria-label="Previous card"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button 
          type="button"
          onClick={scrollNext} 
          disabled={isAtEnd} 
          className="section-cards-nav section-cards-nav--next" 
          aria-label="Next card"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <div className="section-cards-grid" ref={scrollRef}>
        {sections.map((section, idx) => (
          <div key={section.id} className="section-card-tilt-wrapper">
            <Link
              href={section.href}
              className="section-card"
              data-card={section.id}
              aria-labelledby={`section-${idx + 1}-title`}
              prefetch={true}
              draggable={false}
              onMouseEnter={() => router.prefetch(section.href)}
              onClick={(e) => {
                if (didDragRef.current) {
                  e.preventDefault()
                  didDragRef.current = false
                }
              }}
            >
              <div className="section-card__image-wrapper">
                <Image
                  src={section.image}
                  alt={`${section.title} background`}
                  fill
                  priority={idx === 0}
                  loading={idx === 0 ? undefined : 'lazy'}
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  style={{ objectFit: 'cover' }}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <div className="section-card__overlay"></div>
              </div>
              <div className="section-card__content">
                <span className="section-card__index" aria-hidden="true">{section.index}</span>
                <h2 id={`section-${idx + 1}-title`} className="section-card__title">
                  {section.title}
                </h2>
                <p className="section-card__desc reveal reveal-delay-1">
                  {section.description}
                </p>
                <span className="section-card__cta reveal reveal-delay-2">
                  explore <span>→</span>
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
