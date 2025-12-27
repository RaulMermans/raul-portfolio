'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Reveal from './Reveal'

const projects = [
  {
    id: 1,
    index: '01',
    meta: '2024 — AI Campaign',
    title: 'Synthetic Athletes',
    type: 'AI-Generated Marketing Campaign',
    tags: ['AI Art', 'Campaign', 'Sports'],
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1920&q=85',
    href: '/projects/synthetic-athletes',
    featured: true,
  },
  {
    id: 2,
    index: '02',
    meta: '2024 — Photography',
    title: 'A Journey Across Morocco',
    type: 'Visual Storytelling',
    tags: ['Travel', 'Documentary', 'Culture'],
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1920&q=85',
    href: '/projects/morocco',
    featured: false,
  },
  {
    id: 3,
    index: '03',
    meta: '2023–2024 — Design',
    title: 'Album Cover Arts',
    type: 'Music Visual Identity',
    tags: ['Album Art', 'Branding', 'Collection'],
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=1920&q=85',
    href: '/projects/album-covers',
    featured: false,
  },
]

export default function ProjectSection() {
  const projectBgsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const updateParallax = () => {
      projectBgsRef.current.forEach((bg) => {
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
      {projects.map((project) => (
        <section
          key={project.id}
          id={project.id === 1 ? 'work' : undefined}
          className={`project group flex bg-ink min-h-screen relative ${
            project.featured ? 'project--featured' : ''
          }`}
          aria-labelledby={`project-${project.id}-title`}
        >
          <div
            ref={(el) => {
              if (el) projectBgsRef.current[project.id - 1] = el
            }}
            className="project__bg absolute inset-0 brightness-[0.55] saturate-90 scale-105 transition-[filter,transform] duration-[1.2s] ease-out group-hover:brightness-75 group-hover:saturate-100 group-hover:scale-110"
          >
            <img src={project.image} alt="" loading={project.id === 1 ? 'eager' : 'lazy'} />
          </div>
          <div
            className="project__overlay absolute inset-0 z-[1]"
            style={{
              background:
                'linear-gradient(to top, rgba(26,23,20,0.95) 0%, rgba(26,23,20,0.5) 35%, rgba(26,23,20,0.15) 60%, transparent 100%)',
            }}
          />
          <div className="project__content relative z-[2] w-full flex flex-col justify-end p-8 text-cream">
            <span
              className={`project__index absolute top-1/2 right-6 -translate-y-1/2 font-display text-[clamp(12rem,30vw,18rem)] leading-[0.7] text-white/7 pointer-events-none transition-colors duration-600 group-hover:text-white/12 ${
                project.featured ? 'text-[clamp(14rem,35vw,22rem)]' : ''
              }`}
              aria-hidden="true"
            >
              {project.index}
            </span>
            <Reveal>
              <p className="project__meta font-mono text-xs tracking-[0.2em] uppercase text-[#FFB5A0] mb-3">
                {project.meta}
              </p>
            </Reveal>
            <Reveal delay={1}>
              <h2
                id={`project-${project.id}-title`}
                className={`project__title font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.92] tracking-[-0.01em] uppercase max-w-[14ch] ${
                  project.featured ? 'text-[clamp(3.5rem,10vw,7rem)]' : ''
                }`}
              >
                {project.title}
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="project__type text-base text-white/55 mt-3">{project.type}</p>
            </Reveal>
            <Reveal delay={3}>
              <div className="project__tags flex gap-2 mt-4 flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="project__tag font-mono text-xs tracking-[0.05em] uppercase text-white/60 px-3 py-2 border border-white/15 bg-white/3"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <span
            className="project__view absolute bottom-8 right-8 w-[100px] h-[100px] border border-white/20 rounded-full flex items-center justify-center font-mono text-xs tracking-[0.1em] uppercase text-cream opacity-0 scale-0 -rotate-90 transition-all duration-600 z-[2] overflow-hidden group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0"
            aria-hidden="true"
          >
            View
          </span>
          <Link
            href={project.href}
            className="project__link absolute inset-0 z-[3]"
            aria-label={`View ${project.title} project`}
          />
        </section>
      ))}
    </>
  )
}

