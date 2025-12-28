'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import CustomCursor from '@/components/CustomCursor'

// ========================================
// CASE STUDIES DATA
// ========================================
// Add your case studies here!
// Each case study needs:
// - title: Project title
// - tag: Category/tag
// - description: Brief description
// - image: Cover image URL
// - href: Link to full case study page
// - theme: Background color theme ('theme-0' or 'theme-1')
// ========================================

const caseStudies = [
  {
    id: 0,
    title: 'AI Sports Campaign',
    tag: 'AI-Powered Creatives',
    description: 'A groundbreaking visual campaign merging AI-generated imagery with athletic excellence. Pushing the boundaries of sports marketing.',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&q=85',
    href: '/case-studies/ai-sports-campaign',
    theme: 'theme-0', // Dark blue
  },
  {
    id: 1,
    title: 'Remoria',
    tag: 'Creative Direction & Brand Aesthetics',
    description: 'A comprehensive brand identity project exploring classical aesthetics and contemporary design. Building visual systems that create lasting impressions.',
    image: 'https://cdn.prod.website-files.com/684986ace7f70737d22e9ad4/68ea1426aec5fcea21bea0a9_Remoria.jpg',
    href: '/case-studies/remoria',
    theme: 'theme-1', // Dark red
  },
  // Add more case studies here...
]

export default function CaseStudiesPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const filmstripRef = useRef<HTMLElement>(null)

  const TOTAL = caseStudies.length

  useEffect(() => {
    positionTrack(currentIndex)
  }, [currentIndex])

  const positionTrack = (index: number) => {
    if (!trackRef.current || !filmstripRef.current) return
    const h = filmstripRef.current.offsetHeight
    const cardH = trackRef.current.querySelector('.card')?.getBoundingClientRect().height || 0
    const gap = 48
    const offset = h / 2 - cardH / 2 - index * (cardH + gap)
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-50%) translateY(${offset}px)`
    }
  }

  const goTo = (index: number) => {
    if (isAnimating) return
    if (index < 0 || index >= TOTAL) return
    if (index === currentIndex) return

    setIsAnimating(true)
    if (!hasScrolled) {
      setHasScrolled(true)
    }

    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  useEffect(() => {
    let lastScroll = Date.now()
    const COOLDOWN = 600

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastScroll < COOLDOWN || isAnimating) return

      const delta = e.deltaY
      if (delta > 20 && currentIndex < TOTAL - 1) {
        lastScroll = now
        goTo(currentIndex + 1)
      } else if (delta < -20 && currentIndex > 0) {
        lastScroll = now
        goTo(currentIndex - 1)
      }
    }

    document.addEventListener('wheel', handleWheel, { passive: true })

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return
      if ((e.key === 'ArrowDown' || e.key === 'ArrowRight') && currentIndex < TOTAL - 1) {
        e.preventDefault()
        goTo(currentIndex + 1)
      } else if ((e.key === 'ArrowUp' || e.key === 'ArrowLeft') && currentIndex > 0) {
        e.preventDefault()
        goTo(currentIndex - 1)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, isAnimating, TOTAL])

  useEffect(() => {
    const handleResize = () => positionTrack(currentIndex)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentIndex])

  const currentStudy = caseStudies[currentIndex]
  const bgTheme = currentStudy?.theme || 'theme-0'

  return (
    <>
      <CustomCursor />
      <div className="grain" aria-hidden="true"></div>

      {/* Background with crossfade */}
      <div className="fixed inset-0 -z-[1]">
        <div className="absolute inset-0 bg-[#1A2744]"></div>
        <div
          className={`absolute inset-0 transition-opacity duration-[1.2s] ease-in-out ${
            bgTheme === 'theme-1' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ background: bgTheme === 'theme-1' ? '#8B2635' : '#1A2744' }}
        ></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center p-8 md:p-6 opacity-0 animate-[fadeSlideDown_0.8s_ease-out_0.1s_forwards]">
        <Link href="/" className="font-mono text-sm tracking-[0.15em] uppercase text-cream hover:opacity-60 transition-opacity">
          RM
        </Link>
        <nav className="hidden md:flex gap-8" aria-label="Primary navigation">
          {['/#work', '/#about', '/#services', '/#contact'].map((href) => (
            <a
              key={href}
              href={href}
              className="font-mono text-xs tracking-[0.1em] uppercase text-white/50 hover:text-cream transition-colors"
            >
              {href.slice(2).charAt(0).toUpperCase() + href.slice(3)}
            </a>
          ))}
        </nav>
      </header>

      {/* Main Layout */}
      <main className="grid grid-cols-1 md:grid-cols-2 h-screen h-[100dvh]">
        {/* Content Section */}
        <section className="flex flex-col justify-center p-12 md:p-16 relative">
          {caseStudies.map((study, index) => (
            <article
              key={study.id}
              className={`absolute left-12 md:left-16 right-12 md:right-16 transition-all duration-900 ease-out ${
                index === currentIndex
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-[60px] pointer-events-none'
              }`}
            >
              <h1 className="font-display text-[clamp(4rem,12vw,11rem)] leading-[0.85] tracking-[-0.02em] uppercase text-white/10 mb-5">
                {study.title}
              </h1>
              <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-white/40 mb-5">
                {study.tag}
              </p>
              <p className="text-base leading-[1.75] text-white/60 max-w-[40ch] mb-8">
                {study.description}
              </p>
              <Link href={study.href} className="cta-link group inline-flex items-center gap-4 font-mono text-xs tracking-[0.1em] uppercase text-white/70 hover:text-cream relative py-3">
                <span className="absolute -left-4 top-1/2 w-1 h-1 bg-cream rounded-full -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                <span className="relative transition-transform duration-400 group-hover:translate-x-1">Open Case Study</span>
                <span className="cta-arrow relative w-6 h-3 overflow-hidden">
                  <svg className="absolute top-0 left-0 w-5 h-3 transition-transform duration-400 group-hover:translate-x-6" viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 6H19M14 1L19 6L14 11"/>
                  </svg>
                  <svg className="absolute top-0 left-0 w-5 h-3 -translate-x-6 transition-transform duration-400 group-hover:translate-x-0" viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 6H19M14 1L19 6L14 11"/>
                  </svg>
                </span>
                <span className="absolute left-0 bottom-0 h-px w-0 bg-cream group-hover:w-full transition-all duration-500 ease-out"></span>
              </Link>
            </article>
          ))}
        </section>

        {/* Filmstrip Section */}
        <section ref={filmstripRef} className="relative overflow-hidden md:order-1">
          <div ref={trackRef} className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-12 p-12 transition-transform duration-1000 ease-out">
            {caseStudies.map((study, index) => (
              <article
                key={study.id}
                onClick={() => {
                  if (index === currentIndex) {
                    window.location.href = study.href
                  } else {
                    goTo(index)
                  }
                }}
                className={`card flex-shrink-0 w-[clamp(280px,28vw,460px)] aspect-[4/5] rounded-xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)] cursor-pointer transition-all duration-1000 ease-out ${
                  index === currentIndex
                    ? 'opacity-100 saturate-100 brightness-100 shadow-[0_50px_100px_-25px_rgba(0,0,0,0.5)] scale-100'
                    : 'opacity-30 saturate-[0.3] brightness-[0.6] scale-[0.88]'
                } ${index % 2 === 0 ? 'rotate-[2deg]' : '-rotate-[2deg]'} ${
                  index === currentIndex ? (index % 2 === 0 ? 'md:rotate-[3deg]' : 'md:-rotate-[3deg]') : ''
                }`}
                style={{
                  animation: index === currentIndex ? 'slowZoom 20s ease-in-out infinite alternate' : 'none',
                }}
              >
                <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Navigation Dots */}
      <nav className="fixed right-10 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-5 opacity-0 animate-[fadeSlideLeft_0.6s_ease-out_0.9s_forwards]" aria-label="Case study navigation">
        {caseStudies.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className="w-11 h-5 bg-transparent border-none flex items-center justify-end cursor-pointer group"
            aria-label={`Go to case study ${index + 1}`}
          >
            <span
              className={`w-1.5 h-1.5 bg-white/30 rounded-sm transition-all duration-400 ${
                index === currentIndex
                  ? 'bg-cream h-6'
                  : 'group-hover:bg-white/50'
              }`}
            />
          </button>
        ))}
      </nav>

      {/* Counter */}
      <div className="fixed left-12 bottom-10 z-[100] font-mono text-xs text-white/40 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_1s_forwards]">
        <span className="text-xl text-cream">{String(currentIndex + 1).padStart(2, '0')}</span>/{String(TOTAL).padStart(2, '0')}
      </div>

      {/* Scroll Hint */}
      {!hasScrolled && (
        <div className="fixed left-1/2 bottom-10 -translate-x-1/2 z-[100] flex flex-col items-center gap-3 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-white/30 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_1.2s_forwards] hidden md:flex">
          <div className="w-5 h-8 border-[1.5px] border-white/30 rounded-[10px] relative">
            <div className="absolute top-1.5 left-1/2 w-0.5 h-1.5 bg-white/50 rounded-sm -translate-x-1/2 animate-[scrollDot_1.5s_ease-in-out_infinite]"></div>
          </div>
          <span>Scroll</span>
        </div>
      )}
    </>
  )
}

