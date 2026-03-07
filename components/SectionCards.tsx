'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Tilt from 'react-parallax-tilt'
import Reveal from './Reveal'

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
    id: 'photography',
    index: '02',
    title: 'Photography',
    description: 'Street scenes, urban narratives, and architectural moments. Visual storytelling that captures the pulse of cities and helps brands convert visual interest into lasting engagement.',
    href: '/photography',
    image: '/images/sections/photography-bg.webp',
  },
  {
    id: 'visuals',
    index: '03',
    title: 'Visuals',
    description: 'AI art, album covers, and creative experiments. Digital pieces that push the boundaries of what\'s possible through AI-human collaboration to create truly unique brand assets.',
    href: '/visuals',
    image: '/images/sections/visuals-bg.webp',
  },
]

export default function SectionCards() {
  const router = useRouter()

  useEffect(() => {
    // Set up reveal animations — unobserve after visible to avoid wasted callbacks
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

  return (
    <section id="work" className="section-cards-container">
      <div className="section-cards-grid">
        {sections.map((section, idx) => (
          <Tilt
            key={section.id}
            tiltMaxAngleX={4}
            tiltMaxAngleY={4}
            perspective={1000}
            scale={1.02}
            transitionSpeed={2500}
            className="section-card-tilt-wrapper"
          >
            <Link
              href={section.href}
              className="section-card"
              data-card={section.id}
              aria-labelledby={`section-${idx + 1}-title`}
              prefetch={true}
              onMouseEnter={() => router.prefetch(section.href)}
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
          </Tilt>
        ))}
      </div>
    </section>
  )
}

