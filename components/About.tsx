'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

    const imageElement = imageRef.current
    if (imageElement) {
      observer.observe(imageElement)
    }

    return () => {
      if (imageElement) {
        observer.unobserve(imageElement)
      }
    }
  }, [])

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="about__inner">
        <div className="about__image-wrapper">
          <div ref={imageRef} className="about__image" id="about-image" style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src="/images/about/profile.webp"
              alt="Portrait of Raúl Mermans"
              fill
              quality={90}
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="about__frame"></div>
        </div>
        <div className="about__content">
          <p className="label about__label reveal">About</p>
          <h2 id="about-title" className="about__headline reveal reveal-delay-1">
            Digital Systems & Creative Direction
          </h2>
          <div className="about__text reveal reveal-delay-2">
            <p>
              I build brand systems that turn cultural momentum into business outcomes. My background is in business administration, but I&apos;m self-taught in what actually moves the needle: brand strategy, visual storytelling, technical automation, and the frameworks that connect them.
            </p>
            <p>
              Most people separate creative vision from technical execution. I don&apos;t. I&apos;ve built photography projects that function as brand narratives, designed identity systems that scale across platforms, and automated workflows that turn trend analysis into actionable content strategies. The thread connecting all of it is treating culture as a system you can read, interpret, and build with.
            </p>
            <p>
              My work lives in the space between what a brand says and how it operates. I develop visual identities for cultural brands, architect automation systems for content and marketing, and translate emerging trends into strategies that create demand rather than chase it. I&apos;m interested in building the invisible infrastructure that makes a brand feel inevitable.
            </p>
            <p>
              I work best with people who understand that the gap between where culture is moving and where most brands are stuck is an opportunity, not a problem. If you&apos;re building something that requires both strategic thinking and hands-on execution, let&apos;s talk.
            </p>
          </div>
          
          <Link 
            href="/about" 
            className="btn btn--arrow reveal reveal-delay-3"
            aria-label="Read more about Raúl Mermans"
          >
            Read More
          </Link>
        </div>
      </div>
    </section>
  )
}

