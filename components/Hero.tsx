'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const orbMainRef = useRef<HTMLDivElement>(null)
  const orbSecondaryRef = useRef<HTMLDivElement>(null)
  const orbTertiaryRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const isDesktop = window.matchMedia('(hover: hover)').matches
    if (!isDesktop) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      if (orbMainRef.current) {
        orbMainRef.current.style.transform = `translate(calc(-50% + ${x * 25}px), calc(-50% + ${y * 25}px))`
      }
      if (orbSecondaryRef.current) {
        orbSecondaryRef.current.style.transform = `translate(${x * 40}px, ${y * 40}px)`
      }
      if (orbTertiaryRef.current) {
        orbTertiaryRef.current.style.transform = `translate(${x * 15}px, ${y * 15}px)`
      }
    }

    hero.addEventListener('mousemove', handleMouseMove)
    return () => hero.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const name = 'RAÚL'
  const surname = 'MERMANS'
  const nameLetters = name.split('')
  const surnameLetters = surname.split('')

  return (
    <section
      ref={heroRef}
      className="hero min-h-screen flex flex-col justify-center items-center text-center bg-cream p-6 relative overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="hero__gradient absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          ref={orbMainRef}
          className="hero__orb hero__orb--main absolute w-[70vmax] h-[70vmax] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] opacity-35 transition-transform duration-500 ease-out"
          style={{
            background: 'radial-gradient(circle at 40% 40%, #FFAA88 0%, #FFB5A0 40%, #E8D0C8 70%, transparent 100%)',
          }}
        />
        <div
          ref={orbSecondaryRef}
          className="hero__orb hero__orb--secondary absolute w-[50vmax] h-[50vmax] -top-[10%] -right-[20%] rounded-full blur-[120px] opacity-25"
          style={{
            background: 'radial-gradient(circle, #FFD4C4 0%, #FFC4B0 50%, transparent 100%)',
          }}
        />
        <div
          ref={orbTertiaryRef}
          className="hero__orb hero__orb--tertiary absolute w-[40vmax] h-[40vmax] -bottom-[15%] -left-[10%] rounded-full blur-[120px] opacity-20"
          style={{
            background: 'radial-gradient(circle, #E8D8F0 0%, #D8C8E8 50%, transparent 100%)',
          }}
        />
      </div>

      <div className="hero__content relative z-[2] w-full max-w-[1200px]">
        <p className="hero__label font-mono text-xs tracking-[0.5em] uppercase text-ink-muted mb-6 opacity-0 translate-y-5 animate-[slideUp_0.8s_ease-out_0.2s_forwards]">
          Visual Storyteller
        </p>

        <h1
          id="hero-title"
          className="hero__name font-display text-[clamp(3rem,13vw,11rem)] leading-[0.88] tracking-[-0.02em] uppercase text-ink transition-[letter-spacing] duration-600 hover:tracking-[0.01em]"
        >
          <span className="hero__line block overflow-hidden">
            {nameLetters.map((letter, i) => (
              <span
                key={i}
                className="hero__letter inline-block translate-y-full animate-[revealLetter_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${0.3 + i * 0.06}s` }}
              >
                {letter}
              </span>
            ))}
          </span>
          <span className="hero__line block overflow-hidden">
            {surnameLetters.map((letter, i) => (
              <span
                key={i}
                className="hero__letter inline-block translate-y-full animate-[revealLetter_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${0.5 + i * 0.05}s` }}
              >
                {letter}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero__role font-mono text-xs tracking-[0.3em] uppercase text-ink-muted mt-4 opacity-0 translate-y-5 animate-[slideUp_0.8s_ease-out_1s_forwards]">
          Photography · Brand Identity · AI-Powered Creatives
        </p>

        <p className="hero__tagline font-body text-[clamp(1rem,2vw,1.25rem)] italic text-ink-soft mt-6 max-w-[36ch] mx-auto leading-relaxed opacity-0 translate-y-5 animate-[slideUp_0.8s_ease-out_1.15s_forwards]">
          &quot;Crafting visual stories that move people and elevate brands.&quot;
        </p>
      </div>

      <div className="hero__scroll absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 animate-[slideUp_0.8s_ease-out_1.3s_forwards]" aria-hidden="true">
        <span className="hero__scroll-text font-mono text-xs tracking-[0.25em] uppercase text-ink-faint">Scroll</span>
        <div className="hero__scroll-line w-px h-10 bg-gradient-to-b from-ink-faint to-transparent animate-[scrollPulse_2.5s_ease-in-out_infinite_1.8s]"></div>
      </div>
    </section>
  )
}

