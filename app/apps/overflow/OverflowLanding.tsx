'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/* ============================================
   CONSTANTS
   ============================================ */

const ACCENT = '#8B9D83'
const ACCENT_SOFT = 'rgba(139, 157, 131, 0.10)'
const ACCENT_MUTED = 'rgba(139, 157, 131, 0.45)'
const INK = '#1A1714'
const MUTED = 'rgba(26, 23, 20, 0.40)'
const BODY = 'rgba(26, 23, 20, 0.62)'
const DISPLAY = 'var(--font-display), "Bebas Neue", Impact, sans-serif'
const MONO = 'var(--font-mono), "Space Mono", monospace'
const TESTFLIGHT = 'https://testflight.apple.com/join/t7jQjsCx'

/* ============================================
   HOOKS
   ============================================ */

function useInView(threshold = 0.18) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.unobserve(el)
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, visible }
}

/* ============================================
   REVEAL WRAPPER
   ============================================ */

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

/* ============================================
   IPHONE FRAME
   ============================================ */

function IPhoneFrame({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative mx-auto shrink-0 ${className}`}
      style={{ width: 272, height: 556 }}
    >
      {/* Outer frame */}
      <div
        className="absolute inset-0 rounded-[50px]"
        style={{
          background: INK,
          boxShadow: '0 24px 80px rgba(26,23,20,0.18), 0 8px 24px rgba(26,23,20,0.12)',
        }}
      />
      {/* Screen */}
      <div className="absolute inset-[3px] overflow-hidden rounded-[47px]" style={{ background: '#F8F7F5' }}>
        {/* Dynamic Island */}
        <div className="relative z-10 flex justify-center pt-[11px]">
          <div className="h-[26px] w-[100px] rounded-full" style={{ background: INK }} />
        </div>
        {/* Content */}
        <div className="absolute inset-0 overflow-hidden pt-[46px] pb-[22px]">{children}</div>
        {/* Home indicator */}
        <div
          className="absolute bottom-[7px] left-1/2 h-[4px] w-[110px] -translate-x-1/2 rounded-full"
          style={{ background: INK, opacity: 0.18 }}
        />
      </div>
    </div>
  )
}

/* ============================================
   APP SCREEN MOCKUPS
   ============================================ */

function ScreenImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={`/images/apps/overflow/${src}`}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        priority={src === 'Today-tab.webp'}
      />
    </div>
  )
}

/* ============================================
   FEATURE DATA
   ============================================ */

const features = [
  {
    number: '01',
    eyebrow: 'Effortless input',
    title: 'Log without thinking twice.',
    body: 'Tap, select, done. Overflow removes every unnecessary step between you and your training data. No templates to configure. No decisions to make before your first rep.',
  },
  {
    number: '02',
    eyebrow: 'Weekly structure',
    title: 'Routines that hold shape.',
    body: 'Build weekly structures that flex when life does. Your program stays visible, not buried in menus. Move sessions, swap days, and adjust volume without losing the thread.',
  },
  {
    number: '03',
    eyebrow: 'Measured progress',
    title: 'Progress you can feel.',
    body: 'Weekly volume. Personal records. Streaks that mean something. See your trajectory through clean, calm data instead of drowning in charts you never read.',
  },
  {
    number: '04',
    eyebrow: 'Quiet reflection',
    title: 'Reflection, not pressure.',
    body: 'No leaderboards. No guilt mechanics. No aggressive notifications. Just a quiet, considered record of the work you have done and the shape it is taking.',
  },
]

const demoScreens = [
  {
    title: 'Your training at a glance.',
    body: 'The Today screen is the heartbeat of Overflow. One calm surface showing your plan, your streak, and your next move. No dashboard. No decision fatigue.',
    label: 'Today',
    image: 'Today-tab.webp',
  },
  {
    title: 'Build your structure.',
    body: 'Design routines tailored to your goals. Add exercises, set target volumes, and craft a plan that holds shape without being rigid.',
    label: 'Create',
    image: 'routine-creator.webp',
  },
  {
    title: 'Map out your week.',
    body: 'Assign routines to specific days to build a balanced schedule. Adjust freely when life happens, so your plan flexes with you.',
    label: 'Schedule',
    image: 'schedule-routine.webp',
  },
  {
    title: 'Keep the big picture.',
    body: 'Review your upcoming schedule at a glance. Move sessions around, mark rest days, and ensure you are always prepared for what is next.',
    label: 'Calendar',
    image: 'Calendar-tab.webp',
  },
  {
    title: 'See your trajectory.',
    body: 'Weekly volume charts, personal records, and consistency streaks. Progress in Overflow is always calm, never competitive.',
    label: 'Milestones',
    image: 'Milestones.webp',
  },
]

const principles = [
  {
    title: 'Calm by default',
    body: 'Every pixel earns its place. Overflow strips away the unnecessary so the interface disappears and the training stays.',
  },
  {
    title: 'Structure, not rigidity',
    body: 'Plans should guide, not constrain. Flexibility is built into every routine, every schedule, every interaction.',
  },
  {
    title: 'Progress, not pressure',
    body: 'Growth is a trajectory, not a competition. Overflow measures what matters and presents it without anxiety.',
  },
]

/* ============================================
   MAIN COMPONENT
   ============================================ */


export default function OverflowLanding() {
  const [activeScreen, setActiveScreen] = useState(0)
  const [heroReady, setHeroReady] = useState(false)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Sticky scroll demo observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = panelRefs.current.indexOf(entry.target as HTMLDivElement)
            if (idx !== -1) setActiveScreen(idx)
          }
        })
      },
      { threshold: 0.55 },
    )

    panelRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main style={{ background: 'var(--cream)', color: INK }}>

        {/* ============================
            SECTION 1 — HERO
            ============================ */}
        <section className="relative overflow-hidden" style={{ borderBottom: '1px solid var(--cream-dark)' }}>
          <div className="relative mx-auto max-w-[1400px] px-6 pb-20 pt-32 md:px-10 lg:pb-28 lg:pt-40">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr,auto]">
              {/* Copy */}
              <div className="max-w-2xl">
                <div
                  style={{
                    opacity: heroReady ? 1 : 0,
                    transform: heroReady ? 'translateY(0)' : 'translateY(24px)',
                    transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
                  }}
                >
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.3em]"
                    style={{ color: ACCENT, fontFamily: MONO }}
                  >
                    Performance journal for iPhone
                  </p>
                </div>

                <h1
                  className="mt-5 text-[clamp(3.4rem,8.5vw,7.2rem)] uppercase leading-[0.88]"
                  style={{
                    fontFamily: DISPLAY,
                    opacity: heroReady ? 1 : 0,
                    transform: heroReady ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s',
                  }}
                >
                  Train with
                  <br />
                  quiet confidence.
                </h1>

                <p
                  className="mt-6 max-w-lg text-[1.1rem] leading-8"
                  style={{
                    color: BODY,
                    opacity: heroReady ? 1 : 0,
                    transform: heroReady ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s',
                  }}
                >
                  Overflow is a calm performance journal for iPhone. Track workouts, build routines,
                  and measure progress — without the noise.
                </p>

                <div
                  className="mt-10 flex flex-wrap gap-4"
                  style={{
                    opacity: heroReady ? 1 : 0,
                    transform: heroReady ? 'translateY(0)' : 'translateY(16px)',
                    transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s',
                  }}
                >
                  <a
                    href={TESTFLIGHT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: INK, color: 'var(--cream)' }}
                  >
                    Join the beta
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 13L13 1M13 1H4M13 1v9" />
                    </svg>
                  </a>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center rounded-full px-7 py-3.5 text-sm font-medium transition duration-300 hover:-translate-y-0.5"
                    style={{ border: '1px solid var(--cream-dark)', color: INK }}
                  >
                    See how it works
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div
                className="hidden lg:block overflow-phone-hero"
                style={{
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? 'translateY(0)' : 'translateY(60px)',
                  transition: 'all 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s',
                }}
              >
                <IPhoneFrame>
                  <ScreenImage src="Today-tab.webp" alt="Today Screen" />
                </IPhoneFrame>
              </div>
            </div>
          </div>
        </section>

        {/* ============================
            SECTION 2 — TODAY IS THE HEARTBEAT
            ============================ */}
        <section className="py-24 lg:py-32" id="how-it-works">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="grid items-center gap-16 lg:grid-cols-[1fr,auto]">
              <div className="max-w-2xl">
                <Reveal>
                  <p
                    className="text-[0.65rem] uppercase tracking-[0.32em]"
                    style={{ color: MUTED, fontFamily: MONO }}
                  >
                    The heartbeat
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2
                    className="mt-4 text-[clamp(2.6rem,5.5vw,4.8rem)] uppercase leading-[0.9]"
                    style={{ fontFamily: DISPLAY }}
                  >
                    Today is your
                    <br />
                    only screen.
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-6 max-w-lg text-base leading-7" style={{ color: BODY }}>
                    No dashboards. No decision fatigue. Overflow starts with one calm surface that shows
                    your plan, your streak, and your next set. Everything you need — nothing you don&apos;t.
                  </p>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
                    {[
                      { value: '1', label: 'Screen to start' },
                      { value: '<3s', label: 'To first rep' },
                      { value: '0', label: 'Decisions needed' },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-2xl px-4 py-4" style={{ background: ACCENT_SOFT }}>
                        <p className="text-[1.3rem] font-semibold" style={{ color: ACCENT }}>
                          {stat.value}
                        </p>
                        <p className="mt-1 text-[0.65rem] uppercase tracking-[0.1em]" style={{ color: MUTED }}>
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* Phone — visible on mobile too */}
              <Reveal delay={0.2}>
                <div className="mx-auto lg:mx-0">
                  <IPhoneFrame>
                  <ScreenImage src="Today-tab.webp" alt="Today Screen" />
                </IPhoneFrame>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================
            SECTION 3 — FEATURE CHAPTERS
            ============================ */}
        <section className="py-20 lg:py-28" style={{ borderTop: '1px solid var(--cream-dark)' }}>
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <Reveal>
              <p
                className="text-[0.65rem] uppercase tracking-[0.32em]"
                style={{ color: MUTED, fontFamily: MONO }}
              >
                How it works
              </p>
            </Reveal>

            <div className="mt-16 space-y-20 lg:space-y-28">
              {features.map((feat, i) => (
                <Reveal key={feat.number} delay={0.1}>
                  <div
                    className={`grid items-start gap-8 lg:grid-cols-2 lg:gap-16 ${
                      i % 2 === 1 ? 'lg:[direction:rtl]' : ''
                    }`}
                  >
                    <div className={i % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                      <div className="flex items-baseline gap-3">
                        <span
                          className="text-[0.65rem] tracking-[0.2em]"
                          style={{ color: ACCENT, fontFamily: MONO }}
                        >
                          {feat.number}
                        </span>
                        <span
                          className="text-[0.62rem] uppercase tracking-[0.26em]"
                          style={{ color: MUTED, fontFamily: MONO }}
                        >
                          {feat.eyebrow}
                        </span>
                      </div>
                      <h3
                        className="mt-4 text-[clamp(2rem,3.8vw,3.2rem)] uppercase leading-[0.92]"
                        style={{ fontFamily: DISPLAY }}
                      >
                        {feat.title}
                      </h3>
                      <p className="mt-5 max-w-lg text-base leading-7" style={{ color: BODY }}>
                        {feat.body}
                      </p>
                    </div>

                    {/* Visual accent */}
                    <div className={`flex items-center justify-center ${i % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                      <div
                        className="flex h-48 w-full max-w-sm items-center justify-center rounded-3xl lg:h-64"
                        style={{ background: ACCENT_SOFT }}
                      >
                        <span
                          className="text-[clamp(4rem,8vw,6rem)] font-semibold leading-none"
                          style={{ color: `${ACCENT}30`, fontFamily: DISPLAY }}
                        >
                          {feat.number}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================
            SECTION 4 — STICKY IPHONE DEMO
            ============================ */}
        <section
          className="py-20 lg:py-28"
          style={{ background: 'var(--cream-dark)', borderTop: '1px solid rgba(26,23,20,0.06)' }}
        >
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <Reveal>
              <p
                className="text-[0.65rem] uppercase tracking-[0.32em]"
                style={{ color: MUTED, fontFamily: MONO }}
              >
                Product walkthrough
              </p>
              <h2
                className="mt-4 max-w-3xl text-[clamp(2.6rem,5.5vw,4.6rem)] uppercase leading-[0.9]"
                style={{ fontFamily: DISPLAY }}
              >
                Four surfaces. One calm experience.
              </h2>
            </Reveal>

            <div className="mt-16 grid gap-12 lg:grid-cols-[auto,1fr] lg:gap-20">
              {/* Sticky phone */}
              <div className="hidden lg:block lg:sticky lg:top-32 lg:self-start">
                <IPhoneFrame>
                  <div className="relative h-full">
                    {demoScreens.map((screen, i) => (
                      <div
                        key={i}
                        className="absolute inset-0"
                        style={{
                          opacity: activeScreen === i ? 1 : 0,
                          transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
                        }}
                      >
                        <ScreenImage src={screen.image} alt={screen.label} />
                      </div>
                    ))}
                  </div>
                </IPhoneFrame>
              </div>

              {/* Scrolling panels */}
              <div className="space-y-4 lg:space-y-0">
                {demoScreens.map((panel, i) => (
                  <div
                    key={panel.label}
                    ref={(el) => { panelRefs.current[i] = el }}
                    className="flex flex-col justify-center rounded-3xl p-6 lg:min-h-[70vh] lg:rounded-none lg:p-10"
                    style={{
                      background: i === activeScreen ? 'rgba(255,255,255,0.5)' : 'transparent',
                      transition: 'background 0.4s ease',
                    }}
                  >
                    {/* Mobile phone inline */}
                    <div className="mb-8 lg:hidden">
                      <IPhoneFrame className="!w-[220px] !h-[450px] [&_*]:!text-[85%]">
                        <ScreenImage src={panel.image} alt={panel.label} />
                      </IPhoneFrame>
                    </div>

                    <span
                      className="inline-block rounded-full px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] self-start"
                      style={{ background: ACCENT_SOFT, color: ACCENT, fontFamily: MONO }}
                    >
                      {panel.label}
                    </span>
                    <h3
                      className="mt-4 text-[clamp(1.8rem,3.4vw,2.8rem)] uppercase leading-[0.92]"
                      style={{ fontFamily: DISPLAY }}
                    >
                      {panel.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-base leading-7" style={{ color: BODY }}>
                      {panel.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================
            SECTION 5 — PROGRESS METRICS
            ============================ */}
        <section className="py-24 lg:py-32" style={{ borderTop: '1px solid var(--cream-dark)' }}>
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <Reveal>
              <p
                className="text-[0.65rem] uppercase tracking-[0.32em]"
                style={{ color: MUTED, fontFamily: MONO }}
              >
                Measured progress
              </p>
              <h2
                className="mt-4 max-w-3xl text-[clamp(2.6rem,5.5vw,4.6rem)] uppercase leading-[0.9]"
                style={{ fontFamily: DISPLAY }}
              >
                The numbers that actually matter.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7" style={{ color: BODY }}>
                Overflow tracks volume, consistency, and personal records. No vanity metrics.
                No social pressure. Just a clear picture of the work you&apos;re putting in.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  value: 'Volume',
                  desc: 'Total weight moved per session, per week, per cycle. The most honest measure of output.',
                  accent: true,
                },
                {
                  value: 'Streaks',
                  desc: 'Consecutive training days that count. A quiet reminder that consistency compounds.',
                  accent: false,
                },
                {
                  value: 'Records',
                  desc: 'Personal bests surfaced automatically. No manual tagging. Overflow remembers for you.',
                  accent: false,
                },
                {
                  value: 'Trends',
                  desc: 'Weekly and monthly views that show trajectory without overwhelming detail.',
                  accent: true,
                },
              ].map((metric, i) => (
                <Reveal key={metric.value} delay={i * 0.08}>
                  <div
                    className="rounded-[28px] p-6 transition-transform duration-300 hover:-translate-y-1"
                    style={{
                      background: metric.accent ? ACCENT_SOFT : 'var(--cream-light, rgba(255,255,255,0.5))',
                      border: '1px solid var(--cream-dark)',
                    }}
                  >
                    <h3
                      className="text-[1.5rem] font-semibold"
                      style={{ color: metric.accent ? ACCENT : INK }}
                    >
                      {metric.value}
                    </h3>
                    <p className="mt-3 text-sm leading-6" style={{ color: BODY }}>
                      {metric.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================
            SECTION 6 — DESIGN PRINCIPLES
            ============================ */}
        <section
          className="py-24 lg:py-32"
          style={{ background: INK }}
        >
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <Reveal>
              <p
                className="text-[0.65rem] uppercase tracking-[0.32em]"
                style={{ color: ACCENT_MUTED, fontFamily: MONO }}
              >
                Product craft
              </p>
              <h2
                className="mt-4 max-w-3xl text-[clamp(2.6rem,5.5vw,4.6rem)] uppercase leading-[0.9]"
                style={{ fontFamily: DISPLAY, color: 'var(--cream)' }}
              >
                Designed with restraint.
              </h2>
            </Reveal>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.1}>
                  <div
                    className="rounded-[28px] p-6 lg:p-8"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <h3
                      className="text-[1.3rem] font-medium"
                      style={{ color: 'var(--cream)' }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================
            SECTION 7 — CLOSING CTA
            ============================ */}
        <section className="py-28 lg:py-36" style={{ borderTop: '1px solid var(--cream-dark)' }}>
          <div className="mx-auto max-w-[1400px] px-6 text-center md:px-10">
            <Reveal>
              <p
                className="text-[0.65rem] uppercase tracking-[0.32em]"
                style={{ color: ACCENT, fontFamily: MONO }}
              >
                Private beta
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="mx-auto mt-5 max-w-3xl text-[clamp(2.8rem,6vw,5.4rem)] uppercase leading-[0.88]"
                style={{ fontFamily: DISPLAY }}
              >
                Start training with intention.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-md text-base leading-7" style={{ color: BODY }}>
                Overflow is in private beta for iPhone. Join early, shape the product,
                and train with a journal that respects your focus.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href={TESTFLIGHT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: INK, color: 'var(--cream)' }}
                >
                  Join the beta on TestFlight
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 13L13 1M13 1H4M13 1v9" />
                  </svg>
                </a>
                <Link
                  href="/apps"
                  className="inline-flex items-center rounded-full px-7 py-4 text-sm font-medium transition duration-300 hover:-translate-y-0.5"
                  style={{ border: '1px solid var(--cream-dark)', color: INK }}
                >
                  Back to apps
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
