'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Reveal from './Reveal'

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current)
      }
    }
  }, [])

  return (
    <section id="about" className="about flex items-center bg-cream-warm p-8 min-h-screen" aria-labelledby="about-title">
      <div className="about__inner grid grid-cols-1 gap-12 max-w-[1200px] mx-auto w-full md:grid-cols-2 md:items-center md:gap-20">
        <div className="about__image-wrapper relative max-w-[450px] md:max-w-full">
          <div
            ref={imageRef}
            className="about__image relative aspect-[3/4] overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-cream-warm before:z-[2] before:scale-y-100 before:origin-top before:transition-transform before:duration-1000 before:ease-out before:revealed:scale-y-0 before:revealed:origin-bottom"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85"
              alt="Portrait of Raúl Mermans"
              loading="lazy"
              className="grayscale-[15%] contrast-[1.02] transition-all duration-600 ease-out hover:grayscale-0 hover:contrast-100 hover:scale-105"
            />
          </div>
          <div className="about__frame absolute -top-[15px] -left-[15px] right-[15px] bottom-[15px] border border-ink-faint pointer-events-none opacity-0 transition-opacity duration-600 delay-500 revealed:opacity-50 hover:opacity-50" />
        </div>
        <div className="about__content py-4">
          <Reveal>
            <p className="about__label font-mono text-xs tracking-[0.4em] uppercase text-ink-faint mb-6">About</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 id="about-title" className="about__headline font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-[0.95] uppercase mb-6">
              Visual Storyteller
              <br />
              Based in Spain
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="about__text text-base leading-[1.85] text-ink-soft max-w-[45ch]">
              Working at the intersection of photography, brand identity, and AI-powered creatives. Creating visual
              narratives that resonate beyond aesthetics — from traditional photography to cutting-edge generative art.
            </p>
            
            <div className="about__belief my-6 py-6 border-t border-cream-dark">
              <p className="about__belief-text font-body text-[clamp(1.1rem,2vw,1.25rem)] font-medium leading-[1.6] text-ink">
                I believe great work doesn&apos;t just capture moments — it <span className="text-accent">creates meaning</span> and drives real results.
              </p>
            </div>
          </Reveal>
          <Reveal delay={3}>
            <Link
              href="/about"
              className="btn btn--arrow inline-flex items-center gap-3 font-mono text-xs tracking-[0.1em] uppercase text-ink-soft px-5 py-3 border border-cream-dark bg-transparent min-h-[44px] transition-all duration-300 hover:text-accent hover:border-accent hover:bg-accent/4 after:content-['→'] after:transition-transform after:duration-300 hover:after:translate-x-1"
            >
              Read More
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

