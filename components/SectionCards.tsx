'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Reveal from './Reveal'

const sections = [
  {
    id: 'case-studies',
    index: '01',
    title: 'Case Studies',
    description: 'The stories behind the work. Brand campaigns, creative direction, and the thinking that shaped them.',
    href: '/case-studies',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=85',
  },
  {
    id: 'photography',
    index: '02',
    title: 'Photography',
    description: 'Places, faces, quiet moments. From Moroccan medinas to intimate portraits — images that stay with you.',
    href: '/photography',
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1920&q=85',
  },
  {
    id: 'visuals',
    index: '03',
    title: 'Visuals',
    description: 'AI art, album covers, and experiments. Digital pieces made for clients, or just because.',
    href: '/visuals',
    image: '/images/sections/visuals-bg.webp', // Replace with your custom image
  },
]

export default function SectionCards() {
  const sectionBgsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
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
          >
            <img src={section.image} alt="" loading={idx === 0 ? 'eager' : 'lazy'} />
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
          <Link
            href={section.href}
            className="section-card__link"
            aria-label={`Explore ${section.title}`}
          ></Link>
        </section>
      ))}
    </>
  )
}

