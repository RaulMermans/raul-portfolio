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
    href: '/projects/photography',
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1920&q=85',
  },
  {
    id: 'visuals',
    index: '03',
    title: 'Visuals',
    description: 'AI art, album covers, and experiments. Digital pieces made for clients, or just because.',
    href: '/visuals',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=85',
  },
]

export default function SectionCards() {
  const sectionBgsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const updateParallax = () => {
      sectionBgsRef.current.forEach((bg) => {
        if (!bg) return
        const section = bg.closest('section')
        if (!section) return
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const scrollProgress = -rect.top / window.innerHeight
          bg.style.transform = `translateY(${scrollProgress * 40}px) scale(1.05)`
        }
      })
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
          id={section.id}
          className="section-card group flex bg-ink min-h-screen min-h-[100svh] relative scroll-snap-start"
          aria-labelledby={`section-${idx + 1}-title`}
        >
          <div
            ref={(el) => {
              if (el) sectionBgsRef.current[idx] = el
            }}
            className="section-card__bg absolute inset-0 brightness-[0.5] saturate-[0.85] scale-105 transition-[filter,transform] duration-[1.2s] ease-out group-hover:brightness-[0.7] group-hover:saturate-100 group-hover:scale-110"
          >
            <img src={section.image} alt="" loading={idx === 0 ? 'eager' : 'lazy'} />
          </div>
          <div className="section-card__overlay absolute inset-0 z-[1]" style={{
            background: 'linear-gradient(to top, rgba(26,23,20,0.95) 0%, rgba(26,23,20,0.6) 30%, rgba(26,23,20,0.3) 50%, rgba(26,23,20,0.1) 70%, transparent 100%)',
          }} />
          <div className="section-card__content relative z-[2] w-full flex flex-col justify-end p-8 md:p-16 text-cream">
            <span
              className="section-card__index absolute top-1/2 right-6 md:right-16 -translate-y-1/2 font-display text-[clamp(14rem,35vw,22rem)] leading-[0.7] text-white/[0.06] pointer-events-none transition-opacity duration-600 ease-out group-hover:opacity-[1.5]"
              aria-hidden="true"
            >
              {section.index}
            </span>
            <h2 id={`section-${idx + 1}-title`} className="section-card__title font-display text-[clamp(3.5rem,12vw,8rem)] leading-[0.9] tracking-[-0.02em] uppercase max-w-[12ch]">
              <Reveal>{section.title}</Reveal>
            </h2>
            <p className="section-card__desc text-[1.125rem] text-white/60 mt-4 max-w-[38ch] leading-[1.6]">
              <Reveal delay={1}>{section.description}</Reveal>
            </p>
          </div>
          <span
            className="section-card__view absolute bottom-8 md:bottom-16 right-8 md:right-16 w-[120px] h-[120px] border border-white/20 rounded-full flex items-center justify-center font-mono text-xs tracking-[0.1em] uppercase text-cream opacity-0 scale-0 -rotate-90 transition-all duration-600 z-[2] overflow-hidden group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0"
            aria-hidden="true"
          >
            Explore
          </span>
          <Link
            href={section.href}
            className="section-card__link absolute inset-0 z-[3]"
            aria-label={`Explore ${section.title}`}
          />
        </section>
      ))}
    </>
  )
}

