'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Reveal from './Reveal'

const sections = [
  {
    id: 'case-studies',
    index: '01',
    title: 'Case Studies',
    description: 'The stories behind the work. Brand campaigns, creative direction, and the thinking that shaped them.',
    href: '/case-studies',
    image: '/images/sections/case-studies-bg.webp',
  },
  {
    id: 'photography',
    index: '02',
    title: 'Photography',
    description: 'Street scenes, urban narratives, and architectural moments. Visual storytelling that captures the pulse of cities and the poetry of everyday life.',
    href: '/photography',
    image: '/images/sections/photography-bg.webp',
  },
  {
    id: 'visuals',
    index: '03',
    title: 'Visuals',
    description: 'AI art, album covers, and experiments. Digital pieces made for clients, or just because.',
    href: '/visuals',
    image: '/images/sections/visuals-bg.webp',
  },
]

export default function SectionCards() {
  const sectionBgsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Disable parallax on mobile for better performance
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    let ticking = false
    const viewportHeight = window.innerHeight
    
    const updateParallax = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          sectionBgsRef.current.forEach((bg) => {
            if (!bg) return
            const section = bg.closest('section')
            if (!section) return
            const rect = section.getBoundingClientRect()
            if (rect.top < viewportHeight && rect.bottom > 0) {
              const scrollProgress = -rect.top / viewportHeight
              bg.style.transform = `translateY(${scrollProgress * 40}px) scale(1.05)`
            }
          })
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', updateParallax, { passive: true })
    updateParallax()

    return () => window.removeEventListener('scroll', updateParallax)
  }, [])

  return (
    <>
      {sections.map((section, idx) => (
        <section
          key={section.id}
          id={idx === 0 ? 'work' : section.id}
          className="section-card"
          aria-labelledby={`section-${idx + 1}-title`}
        >
          <div
            ref={(el) => {
              if (el) sectionBgsRef.current[idx] = el
            }}
            className="section-card__bg"
            style={{ position: 'relative', width: '100%', height: '100%' }}
          >
            <Image
              src={section.image}
              alt={`${section.title} background`}
              fill
              priority={idx <= 1}
              quality={85}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
          <div className="section-card__overlay"></div>
          <div className="section-card__content">
            <span className="section-card__index" aria-hidden="true">{section.index}</span>
            <h2 id={`section-${idx + 1}-title`} className="section-card__title reveal">
              {section.title}
            </h2>
            <p className="section-card__desc reveal reveal-delay-1">
              {section.description}
            </p>
          </div>
          <span className="section-card__view" aria-hidden="true">Explore</span>
          {section.href === '#' ? (
            <div
              className="section-card__link"
              aria-label={`${section.title} - Coming soon`}
              style={{ cursor: 'not-allowed', opacity: 0.7 }}
            ></div>
          ) : (
            <Link
              href={section.href}
              className="section-card__link"
              aria-label={`Explore ${section.title}`}
            ></Link>
          )}
        </section>
      ))}
    </>
  )
}

