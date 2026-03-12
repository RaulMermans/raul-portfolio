'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
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

function TodayScreen() {
  return (
    <div className="h-full px-5 pt-3">
      <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: MUTED, fontFamily: MONO }}>
        Tuesday, Mar 12
      </p>
      <h3 className="mt-1 text-[21px] font-semibold" style={{ color: INK }}>
        Good morning
      </h3>

      {/* Session card */}
      <div className="mt-5 rounded-2xl bg-white p-4" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <p className="text-[9px] uppercase tracking-[0.16em]" style={{ color: MUTED, fontFamily: MONO }}>
          Today&apos;s session
        </p>
        <p className="mt-2 text-[15px] font-medium" style={{ color: INK }}>
          Upper Body Push
        </p>
        <div className="mt-1 flex gap-3 text-[11px]" style={{ color: BODY }}>
          <span>4 exercises</span>
          <span>&middot;</span>
          <span>~45 min</span>
        </div>
        <button
          className="mt-4 w-full rounded-xl py-2.5 text-[12px] font-medium text-white"
          style={{ background: ACCENT }}
        >
          Start session
        </button>
      </div>

      {/* Stat cards */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white p-3.5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <p className="text-[20px] font-semibold" style={{ color: ACCENT }}>
            12
          </p>
          <p className="text-[10px]" style={{ color: MUTED }}>
            Day streak
          </p>
        </div>
        <div className="rounded-2xl bg-white p-3.5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <p className="text-[20px] font-semibold" style={{ color: INK }}>
            3
          </p>
          <p className="text-[10px]" style={{ color: MUTED }}>
            PRs this week
          </p>
        </div>
      </div>

      {/* Upcoming */}
      <div className="mt-3 rounded-2xl bg-white p-3.5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <p className="text-[9px] uppercase tracking-[0.14em]" style={{ color: MUTED, fontFamily: MONO }}>
          Tomorrow
        </p>
        <p className="mt-1.5 text-[13px] font-medium" style={{ color: INK }}>
          Lower Body &middot; Pull
        </p>
        <p className="mt-0.5 text-[11px]" style={{ color: BODY }}>
          5 exercises &middot; ~55 min
        </p>
      </div>
    </div>
  )
}

function LogScreen() {
  const sets = [
    { n: 1, kg: '80', reps: '8', done: true },
    { n: 2, kg: '85', reps: '6', done: true },
    { n: 3, kg: '85', reps: '5', done: false },
  ]
  return (
    <div className="h-full px-5 pt-3">
      <button className="text-[12px]" style={{ color: ACCENT }}>
        &larr; Back
      </button>
      <h3 className="mt-3 text-[19px] font-semibold" style={{ color: INK }}>
        Bench Press
      </h3>
      <p className="mt-0.5 text-[11px]" style={{ color: MUTED }}>
        Flat &middot; Barbell
      </p>

      {/* Set table */}
      <div className="mt-5">
        <div className="mb-2 flex gap-2 text-[9px] uppercase tracking-[0.12em]" style={{ color: MUTED, fontFamily: MONO }}>
          <span className="w-8">Set</span>
          <span className="flex-1">kg</span>
          <span className="flex-1">Reps</span>
          <span className="w-8" />
        </div>
        {sets.map((s) => (
          <div
            key={s.n}
            className="mb-2 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}
          >
            <span className="w-8 text-[12px] font-medium" style={{ color: MUTED }}>
              {s.n}
            </span>
            <span className="flex-1 text-[14px] font-medium" style={{ color: INK }}>
              {s.kg}
            </span>
            <span className="flex-1 text-[14px] font-medium" style={{ color: INK }}>
              {s.reps}
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full text-[11px]"
              style={{
                background: s.done ? ACCENT : 'transparent',
                color: s.done ? '#fff' : MUTED,
                border: s.done ? 'none' : `1.5px solid ${MUTED}`,
              }}
            >
              {s.done ? '✓' : ''}
            </span>
          </div>
        ))}
      </div>

      <button
        className="mt-3 w-full rounded-xl border py-2.5 text-[12px] font-medium"
        style={{ borderColor: 'rgba(26,23,20,0.1)', color: BODY }}
      >
        + Add set
      </button>

      {/* Rest timer */}
      <div className="mt-5 flex items-center justify-between rounded-2xl bg-white px-4 py-3" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div>
          <p className="text-[9px] uppercase tracking-[0.12em]" style={{ color: MUTED, fontFamily: MONO }}>
            Rest timer
          </p>
          <p className="mt-1 text-[18px] font-semibold" style={{ color: INK, fontFamily: MONO }}>
            1:42
          </p>
        </div>
        <div className="h-9 w-9 rounded-full flex items-center justify-center" style={{ background: ACCENT_SOFT }}>
          <div className="h-3 w-3 rounded-sm" style={{ background: ACCENT }} />
        </div>
      </div>
    </div>
  )
}

function ProgressScreen() {
  const bars = [65, 80, 45, 90, 70, 30, 0]
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  return (
    <div className="h-full px-5 pt-3">
      <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: MUTED, fontFamily: MONO }}>
        This week
      </p>
      <h3 className="mt-1 text-[19px] font-semibold" style={{ color: INK }}>
        Progress
      </h3>

      {/* Volume chart */}
      <div className="mt-5 rounded-2xl bg-white p-4" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <p className="text-[9px] uppercase tracking-[0.12em]" style={{ color: MUTED, fontFamily: MONO }}>
          Volume (kg)
        </p>
        <div className="mt-4 flex items-end justify-between gap-2" style={{ height: 80 }}>
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className="w-full rounded-md"
                style={{
                  height: `${Math.max(h, 4)}%`,
                  background: h > 0 ? (i === 3 ? ACCENT : `${ACCENT}66`) : 'rgba(26,23,20,0.06)',
                }}
              />
              <span className="text-[8px]" style={{ color: MUTED }}>{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white p-3.5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <p className="text-[18px] font-semibold" style={{ color: INK }}>
            12,450
          </p>
          <p className="text-[10px]" style={{ color: MUTED }}>
            Total volume (kg)
          </p>
        </div>
        <div className="rounded-2xl bg-white p-3.5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <p className="text-[18px] font-semibold" style={{ color: ACCENT }}>
            5
          </p>
          <p className="text-[10px]" style={{ color: MUTED }}>
            Sessions
          </p>
        </div>
      </div>

      {/* PRs */}
      <div className="mt-3 rounded-2xl bg-white p-3.5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <p className="text-[9px] uppercase tracking-[0.12em]" style={{ color: MUTED, fontFamily: MONO }}>
          Recent PRs
        </p>
        <div className="mt-2 space-y-2">
          {['Bench Press — 92.5 kg', 'Squat — 120 kg', 'OHP — 55 kg'].map((pr) => (
            <div key={pr} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
              <span className="text-[12px]" style={{ color: INK }}>{pr}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RoutinesScreen() {
  const week = [
    { day: 'Mon', label: 'Push', active: true },
    { day: 'Tue', label: 'Pull', active: false },
    { day: 'Wed', label: 'Rest', active: false, rest: true },
    { day: 'Thu', label: 'Legs', active: false },
    { day: 'Fri', label: 'Upper', active: false },
    { day: 'Sat', label: 'Rest', active: false, rest: true },
    { day: 'Sun', label: 'Rest', active: false, rest: true },
  ]
  return (
    <div className="h-full px-5 pt-3">
      <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: MUTED, fontFamily: MONO }}>
        Routine
      </p>
      <h3 className="mt-1 text-[19px] font-semibold" style={{ color: INK }}>
        This week
      </h3>

      {/* Week pills */}
      <div className="mt-5 flex gap-1.5">
        {week.map((d) => (
          <div
            key={d.day}
            className="flex-1 rounded-xl py-2 text-center"
            style={{
              background: d.active ? ACCENT : d.rest ? 'rgba(26,23,20,0.03)' : 'white',
              color: d.active ? '#fff' : d.rest ? MUTED : INK,
              boxShadow: d.active ? 'none' : d.rest ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            <p className="text-[8px] uppercase tracking-wider">{d.day}</p>
            <p className="mt-0.5 text-[10px] font-medium">{d.label}</p>
          </div>
        ))}
      </div>

      {/* Routine cards */}
      {[
        { name: 'Upper Body Push', exercises: 4, time: '45 min', color: ACCENT },
        { name: 'Lower Body Pull', exercises: 5, time: '55 min', color: '#A39585' },
        { name: 'Full Upper', exercises: 6, time: '60 min', color: '#8B95A3' },
      ].map((routine) => (
        <div
          key={routine.name}
          className="mt-3 flex items-center gap-3 rounded-2xl bg-white p-3.5"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
        >
          <div className="h-10 w-10 rounded-xl" style={{ background: `${routine.color}18` }}>
            <div className="flex h-full w-full items-center justify-center rounded-xl">
              <div className="h-4 w-4 rounded-md" style={{ background: routine.color }} />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-medium" style={{ color: INK }}>{routine.name}</p>
            <p className="text-[10px]" style={{ color: MUTED }}>
              {routine.exercises} exercises &middot; {routine.time}
            </p>
          </div>
        </div>
      ))}
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
  },
  {
    title: 'Every set, tracked.',
    body: 'Log weight, reps, and rest with minimal taps. Overflow learns your patterns so each session starts smarter than the last.',
    label: 'Log',
  },
  {
    title: 'See your trajectory.',
    body: 'Weekly volume charts, personal records, and consistency streaks. Progress in Overflow is always calm, never competitive.',
    label: 'Progress',
  },
  {
    title: 'Your week, planned.',
    body: 'Build routines that map to your real life. Move sessions around, mark rest days, and keep the big picture visible at all times.',
    label: 'Routines',
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

const screens = [TodayScreen, LogScreen, ProgressScreen, RoutinesScreen]

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

  const ActiveScreen = screens[activeScreen]

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
                  <TodayScreen />
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
                    <TodayScreen />
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
                    {screens.map((Screen, i) => (
                      <div
                        key={i}
                        className="absolute inset-0"
                        style={{
                          opacity: activeScreen === i ? 1 : 0,
                          transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
                        }}
                      >
                        <Screen />
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
                        {(() => { const S = screens[i]; return <S /> })()}
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
