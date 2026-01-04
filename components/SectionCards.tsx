'use client'

import { useEffect } from 'react'
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
  useEffect(() => {
    // Set up reveal animations
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px 0px' }
    )

    document.querySelectorAll('.section-card').forEach((el) => revealObserver.observe(el))

    return () => revealObserver.disconnect()
  }, [])

  return (
    <section id="work" className="section-cards-container">
      <div className="section-cards-grid">
        {sections.map((section, idx) => (
          <Link
            key={section.id}
            href={section.href}
            className="section-card"
            aria-labelledby={`section-${idx + 1}-title`}
          >
            <div className="section-card__image-wrapper">
              <Image
                src={section.image}
                alt={`${section.title} background`}
                fill
                priority={idx <= 1}
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="section-card__overlay"></div>
            </div>
            <div className="section-card__content">
              <span className="section-card__index" aria-hidden="true">{section.index}</span>
              <h1 id={`section-${idx + 1}-title`} className="section-card__title reveal">
                {section.title}
              </h1>
              <p className="section-card__desc reveal reveal-delay-1">
                {section.description}
              </p>
              <span className="section-card__cta reveal reveal-delay-2">
                explore <span>→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

