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
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="about__inner">
        <div className="about__image-wrapper">
          <div ref={imageRef} className="about__image" id="about-image">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85"
              alt="Portrait of Raúl Mermans"
              loading="lazy"
            />
          </div>
          <div className="about__frame"></div>
        </div>
        <div className="about__content">
          <p className="label about__label reveal">About</p>
          <h2 id="about-title" className="about__headline reveal reveal-delay-1">
            Visual Storyteller<br/>Based in Spain
          </h2>
          <p className="about__text reveal reveal-delay-2">
            Working at the intersection of photography, brand identity, and AI-powered creatives. Creating visual narratives that resonate beyond aesthetics — from traditional photography to cutting-edge generative art.
          </p>
          
          <div className="about__belief reveal reveal-delay-2">
            <p className="about__belief-text">
              I believe great work doesn&apos;t just capture moments — it <span>creates meaning</span> and drives real results.
            </p>
          </div>
          
          <Link href="/about" className="btn btn--arrow reveal reveal-delay-3">Read More</Link>
        </div>
      </div>
    </section>
  )
}

