'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const ACCENT_PRIMARY = '#813E3A'
const ACCENT_PRIMARY_SOFT = 'rgba(129, 62, 58, 0.12)'
const ACCENT_SECONDARY = '#B59345'
const ACCENT_SECONDARY_SOFT = 'rgba(181, 147, 69, 0.16)'
const ACCENT_TERTIARY = '#9E6C6E'
const ACCENT_TERTIARY_SOFT = 'rgba(158, 108, 110, 0.14)'
const INK = '#1A1209'
const BODY = 'rgba(26, 18, 9, 0.76)'
const MUTED = 'rgba(26, 18, 9, 0.5)'
const SURFACE = '#FFFFFF'
const SURFACE_SOFT = '#F7F3EE'
const SURFACE_WARM = '#EDE8DF'
const CTA_DARK = '#2A1210'
const HERO_GLOW =
  'linear-gradient(180deg, rgba(158, 108, 110, 0.18) 0%, rgba(247, 243, 238, 0) 64%)'
const BODY_FONT = 'var(--font-body), "DM Sans", system-ui, sans-serif'
const READING = 'var(--font-reading), "Source Serif 4", Georgia, serif'
const MONO = 'var(--font-mono), "Space Mono", monospace'
const DEVICE_RATIO = 556 / 272
const TESTFLIGHT = 'https://testflight.apple.com/join/t7jQjsCx'

const PRACTICAL_QUESTIONS = [
  'What should I do today?',
  'What routines already exist?',
  'Where do they fit this week?',
  'What changed on the calendar?',
  'What is the work adding up to?',
]

type StoryCallout = {
  title: string
  body: string
  top: string
  side: 'left' | 'right'
}

type StoryBeat = {
  id: string
  label: string
  kind: 'Surface' | 'Action'
  screen: string
  alt: string
  headline: string
  body: string
  proof: string[]
  callouts: StoryCallout[]
  detailNote: string
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mediaQuery.matches)

    update()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', update)
      return () => mediaQuery.removeEventListener('change', update)
    }

    mediaQuery.addListener(update)
    return () => mediaQuery.removeListener(update)
  }, [])

  return reducedMotion
}

function useInView({
  threshold = 0.06,
  rootMargin = '0px 0px 14% 0px',
}: {
  threshold?: number
  rootMargin?: string
} = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, visible }
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const reducedMotion = useReducedMotion()
  const { ref, visible } = useInView(
    reducedMotion
      ? { threshold: 0.01, rootMargin: '0px' }
      : { threshold: 0.06, rootMargin: '0px 0px 14% 0px' },
  )

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: reducedMotion ? 'none' : visible ? 'translateY(0)' : 'translateY(30px)',
        transition: reducedMotion
          ? 'none'
          : `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

function IPhoneFrame({
  children,
  className = '',
  width = 272,
}: {
  children: React.ReactNode
  className?: string
  width?: number
}) {
  const height = Math.round(width * DEVICE_RATIO)
  const outerRadius = Math.round(width * 0.184)
  const innerInset = Math.max(3, Math.round(width * 0.011))
  const innerRadius = outerRadius - innerInset
  const islandWidth = Math.round(width * 0.368)
  const islandHeight = Math.round(width * 0.096)
  const islandTop = Math.round(width * 0.04)
  const topGlowHeight = Math.round(width * 0.338)
  const bottomBarWidth = Math.round(width * 0.404)
  const bottomBarHeight = Math.max(4, Math.round(width * 0.015))
  const bottomBarBottom = Math.max(7, Math.round(width * 0.026))

  return (
    <div
      className={`relative mx-auto shrink-0 ${className}`}
      style={{ width, height }}
    >
      <div
        className="absolute inset-0"
        style={{
          borderRadius: outerRadius,
          background: '#12100F',
          boxShadow: '0 24px 80px rgba(26,18,9,0.18), 0 8px 24px rgba(26,18,9,0.12)',
        }}
      />
      <div
        className="absolute overflow-hidden"
        style={{
          inset: innerInset,
          borderRadius: innerRadius,
          background: SURFACE_SOFT,
        }}
      >
        <div className="absolute inset-0 overflow-hidden">{children}</div>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10"
          style={{
            height: topGlowHeight,
            background:
              'linear-gradient(180deg, rgba(255,250,245,0.16) 0%, rgba(255,250,245,0.07) 46%, rgba(255,250,245,0) 100%)',
          }}
        />
        <div
          className="relative z-10 flex justify-center"
          style={{ paddingTop: islandTop }}
        >
          <div
            style={{
              width: islandWidth,
              height: islandHeight,
              borderRadius: 999,
              background: '#12100F',
            }}
          />
        </div>
        <div
          className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 rounded-full"
          style={{
            bottom: bottomBarBottom,
            width: bottomBarWidth,
            height: bottomBarHeight,
            background: '#12100F',
            opacity: 0.18,
          }}
        />
      </div>
    </div>
  )
}

function ScreenImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={`/images/apps/overflow/${src}`}
        alt={alt}
        fill
        priority={src === 'Today-tab.webp'}
        sizes="(max-width: 768px) 82vw, 320px"
        style={{ objectFit: 'cover', objectPosition: 'top center' }}
      />
    </div>
  )
}

function Eyebrow({ children, tint = MUTED }: { children: React.ReactNode; tint?: string }) {
  return (
    <p
      className="text-[0.68rem] uppercase tracking-[0.26em]"
      style={{ color: tint, fontFamily: MONO }}
    >
      {children}
    </p>
  )
}

function AnnotatedPhone({
  image,
  alt,
  annotations = [],
  width = 272,
}: {
  image: string
  alt: string
  annotations?: StoryCallout[]
  width?: number
}) {
  return (
    <div className="relative mx-auto w-full max-w-[490px] px-0 py-4 xl:px-10">
      <IPhoneFrame width={width}>
        <ScreenImage src={image} alt={alt} />
      </IPhoneFrame>

      {annotations.map((annotation) => (
        <div
          key={`${annotation.side}-${annotation.title}`}
          className="absolute hidden max-w-[148px] rounded-[18px] px-3 py-2.5 xl:block"
          style={{
            top: annotation.top,
            left: annotation.side === 'left' ? 0 : 'auto',
            right: annotation.side === 'right' ? 0 : 'auto',
            background: 'rgba(255,255,255,0.84)',
            border: '1px solid rgba(129, 62, 58, 0.12)',
            boxShadow: '0 8px 20px rgba(26,18,9,0.05)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <p className="text-[0.67rem] font-medium leading-4" style={{ color: ACCENT_PRIMARY, fontFamily: BODY_FONT }}>
            {annotation.title}
          </p>
          <p className="mt-1 text-[0.72rem] leading-[1.3]" style={{ color: BODY, fontFamily: BODY_FONT }}>
            {annotation.body}
          </p>
        </div>
      ))}
    </div>
  )
}

function MotionSwap({
  changeKey,
  children,
  className = '',
}: {
  changeKey: string
  children: React.ReactNode
  className?: string
}) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || reducedMotion) return

    const animation = element.animate(
      [
        { opacity: 0.56, transform: 'translateY(14px) scale(0.985)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' },
      ],
      {
        duration: 320,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    )

    return () => animation.cancel()
  }, [changeKey, reducedMotion])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

const heroMeta = [
  { label: 'Platform', value: 'iPhone' },
  { label: 'Stage', value: 'Private beta' },
  { label: 'Type', value: 'Workout tracking' },
]

const snapshotCards = [
  {
    label: 'What it is',
    value: 'A workout tracker built around routines, scheduling, and fast starts.',
  },
  {
    label: 'Who it is for',
    value: 'People who already train and want clearer structure, not hype.',
  },
  {
    label: 'Why it feels different',
    value: 'The next action stays obvious, the week stays visible, and progress stays calm.',
  },
]

const systemFlow = ['Create', 'Schedule', 'Today', 'Session', 'Review']

const storyBeats: StoryBeat[] = [
  {
    id: 'today',
    label: 'Today',
    kind: 'Surface',
    screen: 'Today-tab.webp',
    alt: 'Overflow Today screen showing the week, next workout, and a start workout action.',
    headline: 'Open to the next workout.',
    body: 'Today shows the next session, the week, and the fastest way into the workout.',
    proof: [
      'The next workout is explicit.',
      'Weekly cadence stays visible.',
      'One primary action starts the session.',
    ],
    callouts: [
      {
        title: 'Week cadence',
        body: 'The week is visible without turning the screen into a dashboard.',
        top: '20%',
        side: 'left',
      },
      {
        title: 'Next workout',
        body: 'The plan is framed as the next action instead of a buried detail.',
        top: '46%',
        side: 'right',
      },
      {
        title: 'Start now',
        body: 'One clear action moves the user directly into the session flow.',
        top: '71%',
        side: 'left',
      },
    ],
    detailNote:
      'Today works as the operational home. When motivation is low, the next move is still obvious.',
  },
  {
    id: 'create',
    label: 'Create',
    kind: 'Action',
    screen: 'routine-creator.webp',
    alt: 'Overflow routine creation screen with warmup, main, and cooldown sections.',
    headline: 'Build routines once.',
    body: 'Create turns exercises into reusable templates with clear sections and repeatable structure.',
    proof: [
      'Warmup, main work, and cooldown are explicit.',
      'The routine becomes reusable, not disposable.',
      'The screen stays focused on one task.',
    ],
    callouts: [
      {
        title: 'Sectioned routine',
        body: 'Structure is visible before anything touches the calendar.',
        top: '22%',
        side: 'left',
      },
      {
        title: 'Reusable block',
        body: 'A saved routine becomes something the week can keep reusing.',
        top: '51%',
        side: 'right',
      },
      {
        title: 'Focused composition',
        body: 'The interface stays narrow enough that planning does not feel heavy.',
        top: '74%',
        side: 'left',
      },
    ],
    detailNote:
      'Once a routine exists, planning stops starting from zero each week.',
  },
  {
    id: 'schedule',
    label: 'Schedule',
    kind: 'Action',
    screen: 'schedule-routine.webp',
    alt: 'Overflow schedule flow showing a routine picker and a date-specific scheduling action.',
    headline: 'Put routines on real dates.',
    body: 'Schedule drops a routine onto a day and keeps it easy to move when the week changes.',
    proof: [
      'The routine picker stays date-specific.',
      'Scheduling is a direct action, not a hidden setting.',
      'The week can move without losing shape.',
    ],
    callouts: [
      {
        title: 'Date context',
        body: 'The user is always scheduling in relation to a real day.',
        top: '21%',
        side: 'right',
      },
      {
        title: 'Routine picker',
        body: 'Existing routines are close at hand when the week is being arranged.',
        top: '51%',
        side: 'left',
      },
      {
        title: 'Direct commitment',
        body: 'The action is clear enough that planning does not become its own workflow.',
        top: '73%',
        side: 'right',
      },
    ],
    detailNote:
      'This is where flexibility becomes real. The week can adjust without feeling broken.',
  },
  {
    id: 'calendar',
    label: 'Calendar',
    kind: 'Surface',
    screen: 'Calendar-tab.webp',
    alt: 'Overflow Calendar tab showing a monthly view with planned and completed markers.',
    headline: 'See the month clearly.',
    body: 'Calendar shows spacing, adherence, and day-level context in one place.',
    proof: [
      'Planned and completed states are distinct.',
      'Month navigation stays simple.',
      'The week keeps its shape over time.',
    ],
    callouts: [
      {
        title: 'Month view',
        body: 'The user can read rhythm and spacing without leaving the calendar.',
        top: '21%',
        side: 'left',
      },
      {
        title: 'State markers',
        body: 'Planned work and completed work remain visually distinct.',
        top: '48%',
        side: 'right',
      },
      {
        title: 'Planning memory',
        body: 'The calendar holds context that would otherwise live in the user head.',
        top: '74%',
        side: 'left',
      },
    ],
    detailNote:
      'Calendar gives the plan memory. The user can see what held and what moved.',
  },
  {
    id: 'milestones',
    label: 'Milestones',
    kind: 'Surface',
    screen: 'Milestones.webp',
    alt: 'Overflow milestones screen showing completed milestones and progress toward future milestones.',
    headline: 'Keep progress useful.',
    body: 'Milestones shows records, streaks, and longer arcs without turning training into a reward loop.',
    proof: [
      'Milestones connect to real training events.',
      'Progress stays visible without hype.',
      'The feedback supports continuity, not pressure.',
    ],
    callouts: [
      {
        title: 'Completed markers',
        body: 'Past work is recorded as evidence rather than applause.',
        top: '21%',
        side: 'right',
      },
      {
        title: 'What builds next',
        body: 'The screen shows what is accumulating without shouting about it.',
        top: '49%',
        side: 'left',
      },
      {
        title: 'Quiet feedback',
        body: 'The language supports consistency instead of reward loops.',
        top: '74%',
        side: 'right',
      },
    ],
    detailNote:
      'Progress is there to orient the user, not to push them.',
  },
]

const weekFlow = [
  {
    step: '01',
    label: 'Set structure',
    body: 'Build reusable routines first.',
    link: 'Create',
  },
  {
    step: '02',
    label: 'Place sessions',
    body: 'Assign them to real days.',
    link: 'Schedule',
  },
  {
    step: '03',
    label: 'Start from Today',
    body: 'Open to the next workout and begin.',
    link: 'Today',
  },
  {
    step: '04',
    label: 'Review the week',
    body: 'Review what happened and what is building.',
    link: 'Review',
  },
]

const decisionRows = [
  {
    decision: 'One operational home',
    alternative: 'Most fitness apps open with dashboards you have to interpret.',
    impact: 'Overflow keeps the next action obvious.',
  },
  {
    decision: 'Reusable routines plus flexible scheduling',
    alternative: 'Rigid plans break the moment the week changes.',
    impact: 'The user can move sessions without losing structure.',
  },
  {
    decision: 'A smaller set of progress signals',
    alternative: 'Big analytics suites create more reading than clarity.',
    impact: 'Progress stays easy to read and act on.',
  },
  {
    decision: 'Quiet continuity over reward-heavy motivation',
    alternative: 'Gamified pressure can make training feel performative.',
    impact: 'The product supports consistency without extra noise.',
  },
]

const betaPoints = [
  'For people who want a clearer weekly rhythm.',
  'For people who prefer structure over hype.',
  'For training habits that need continuity, not pressure.',
]

function StickyShowcase({ beats }: { beats: StoryBeat[] }) {
  const reducedMotion = useReducedMotion()
  const [activeBeatId, setActiveBeatId] = useState(beats[0]?.id ?? '')
  const mobileTabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    if (!beats[0]) return
    setActiveBeatId((current) => current || beats[0].id)
  }, [beats])

  const activeBeat = beats.find((beat) => beat.id === activeBeatId) ?? beats[0]

  const handleBeatSelect = (id: string) => {
    setActiveBeatId(id)
  }

  const getTabId = (id: string) => `product-story-mobile-tab-${id}`
  const getPanelId = () => 'product-story-mobile-panel'

  const focusTab = (id: string) => {
    mobileTabRefs.current[id]?.focus()
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentId: string) => {
    const currentIndex = beats.findIndex((beat) => beat.id === currentId)
    if (currentIndex === -1) return

    let nextIndex = currentIndex

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % beats.length
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + beats.length) % beats.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = beats.length - 1
        break
      default:
        return
    }

    event.preventDefault()

    const nextId = beats[nextIndex]?.id
    if (!nextId) return

    setActiveBeatId(nextId)
    focusTab(nextId)
  }

  return (
    <section
      id="product-story"
      className="py-20 lg:py-24"
      style={{
        borderTop: '1px solid var(--cream-dark)',
        borderBottom: '1px solid var(--cream-dark)',
        scrollMarginTop: 120,
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <Eyebrow>Product story</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[620px]">
              <h2
                className="text-[clamp(2.15rem,5vw,4.25rem)] leading-[0.97]"
                style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
              >
                Five screens explain the system.
              </h2>
              <p className="mt-5 max-w-2xl text-[1rem] leading-7" style={{ color: BODY }}>
                Build the routine, place it into the week, start from Today, then review what happened.
              </p>
            </div>

            <div className="flex max-w-[430px] flex-wrap items-center gap-2">
              {systemFlow.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <span
                    className="rounded-full px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.16em]"
                    style={{
                      background: index === 2 ? ACCENT_PRIMARY_SOFT : 'rgba(255,255,255,0.72)',
                      border: '1px solid rgba(129, 62, 58, 0.12)',
                      color: index === 2 ? ACCENT_PRIMARY : MUTED,
                      fontFamily: MONO,
                    }}
                  >
                    {step}
                  </span>
                  {index < systemFlow.length - 1 ? (
                    <span className="text-sm" style={{ color: MUTED }}>
                      {'->'}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 lg:hidden">
          <div className="overflow-x-auto pb-2">
            <div
              role="tablist"
              aria-label="Overflow product story screens"
              className="flex min-w-max gap-2"
            >
              {beats.map((beat) => {
                const isActive = beat.id === activeBeat.id

                return (
                  <button
                    key={beat.id}
                    ref={(node) => {
                      mobileTabRefs.current[beat.id] = node
                    }}
                    id={getTabId(beat.id)}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={getPanelId()}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleBeatSelect(beat.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, beat.id)}
                    className="rounded-full px-4 py-2 text-sm transition duration-300"
                    style={{
                      background: isActive ? CTA_DARK : 'rgba(255,255,255,0.72)',
                      border: isActive ? '1px solid transparent' : '1px solid var(--cream-dark)',
                      color: isActive ? 'var(--cream)' : INK,
                    }}
                  >
                    {beat.label}
                  </button>
                )
              })}
            </div>
          </div>

          <Reveal delay={0.1}>
            <MotionSwap changeKey={`mobile-${activeBeat.id}`}>
              <div
                id={getPanelId()}
                role="tabpanel"
                aria-labelledby={getTabId(activeBeat.id)}
                aria-live="polite"
                tabIndex={0}
                className="mt-6 rounded-[32px] p-5"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(247,243,238,0.96) 100%)',
                  border: '1px solid rgba(129, 62, 58, 0.12)',
                  boxShadow: '0 16px 40px rgba(26,18,9,0.06)',
                }}
              >
                <div className="relative mx-auto max-w-[320px]">
                  <div
                    className="absolute inset-x-6 bottom-4 top-16 rounded-[48px] blur-3xl"
                    style={{ background: 'rgba(158, 108, 110, 0.18)' }}
                    aria-hidden="true"
                  />
                  <AnnotatedPhone
                    image={activeBeat.screen}
                    alt={activeBeat.alt}
                    annotations={activeBeat.callouts}
                    width={280}
                  />
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em]"
                      style={{ background: ACCENT_PRIMARY_SOFT, color: ACCENT_PRIMARY, fontFamily: MONO }}
                    >
                      {activeBeat.kind}
                    </span>
                    <span
                      className="text-[0.75rem] uppercase tracking-[0.18em]"
                      style={{ color: MUTED, fontFamily: MONO }}
                    >
                      {activeBeat.label}
                    </span>
                  </div>

                  <h3
                    className="mt-4 text-[1.6rem] leading-[1.02]"
                    style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
                  >
                    {activeBeat.headline}
                  </h3>
                  <p className="mt-3 text-[0.98rem] leading-7" style={{ color: BODY }}>
                    {activeBeat.body}
                  </p>

                  <ul className="mt-5 grid gap-2">
                    {activeBeat.proof.map((item) => (
                      <li
                        key={item}
                        className="rounded-[18px] px-4 py-3 text-sm"
                        style={{
                          background: SURFACE,
                          border: '1px solid rgba(129, 62, 58, 0.12)',
                          color: BODY,
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <details
                    className="mt-5 rounded-[20px] px-4 py-3"
                    style={{
                      background: 'rgba(255,255,255,0.68)',
                      border: '1px solid rgba(129, 62, 58, 0.12)',
                    }}
                  >
                    <summary
                      className="flex list-none cursor-pointer items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden"
                      style={{ color: INK }}
                    >
                      Why this matters
                      <span style={{ color: MUTED }}>+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-6" style={{ color: BODY }}>
                      {activeBeat.detailNote}
                    </p>
                  </details>
                </div>
              </div>
            </MotionSwap>
          </Reveal>
        </div>

        <div className="mt-14 hidden lg:block">
          <div className="space-y-6">
            {beats.map((beat, index) => (
              <Reveal key={beat.id} delay={index * 0.04}>
                <article
                  className="rounded-[34px] p-6 lg:grid lg:grid-cols-[minmax(0,0.74fr),minmax(0,1.06fr)] lg:items-center lg:gap-10 lg:p-8"
                  style={{
                    background: index % 2 === 0 ? SURFACE : 'rgba(255,255,255,0.72)',
                    border: '1px solid rgba(129, 62, 58, 0.12)',
                    boxShadow: '0 14px 36px rgba(26,18,9,0.05)',
                  }}
                >
                  <div className="relative mx-auto w-full max-w-[360px]">
                    <div
                      className="absolute inset-x-8 bottom-6 top-16 rounded-[56px] blur-3xl"
                      style={{ background: 'rgba(158, 108, 110, 0.18)' }}
                      aria-hidden="true"
                    />
                    <AnnotatedPhone
                      image={beat.screen}
                      alt={beat.alt}
                      annotations={beat.callouts}
                      width={292}
                    />
                  </div>

                  <div className="mt-2 lg:mt-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[0.75rem]"
                          style={{
                            background: ACCENT_PRIMARY_SOFT,
                            color: ACCENT_PRIMARY,
                            fontFamily: MONO,
                          }}
                        >
                          0{index + 1}
                        </span>
                        <div>
                          <p
                            className="text-[0.72rem] uppercase tracking-[0.18em]"
                            style={{ color: MUTED, fontFamily: MONO }}
                          >
                            {beat.label}
                          </p>
                          <p className="mt-1 text-sm" style={{ color: INK }}>
                            {beat.kind}
                          </p>
                        </div>
                      </div>
                    </div>

                    <h3
                      className="mt-5 text-[1.7rem] leading-[1.02]"
                      style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
                    >
                      {beat.headline}
                    </h3>

                    <p className="mt-3 max-w-xl text-[0.98rem] leading-7" style={{ color: BODY }}>
                      {beat.body}
                    </p>

                    <ul className="mt-5 grid gap-3 xl:grid-cols-3">
                      {beat.proof.map((item) => (
                        <li
                          key={item}
                          className="rounded-[18px] px-4 py-3 text-sm"
                          style={{
                            background: SURFACE_SOFT,
                            border: '1px solid rgba(129, 62, 58, 0.1)',
                            color: BODY,
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    <details
                      className="mt-5 rounded-[20px] px-4 py-3"
                      style={{
                        background: 'rgba(247,243,238,0.82)',
                        border: '1px solid rgba(129, 62, 58, 0.12)',
                      }}
                    >
                      <summary
                        className="flex list-none cursor-pointer items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden"
                        style={{ color: INK }}
                      >
                        Why this matters
                        <span style={{ color: MUTED }}>+</span>
                      </summary>
                      <p className="mt-3 text-sm leading-6" style={{ color: BODY }}>
                        {beat.detailNote}
                      </p>
                    </details>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function OverflowLanding() {
  return (
    <>
      <Header />

      <main id="main-content" style={{ background: 'var(--cream)', color: INK, fontFamily: BODY_FONT }}>
        <section
          className="relative overflow-hidden"
          style={{
            borderBottom: '1px solid var(--cream-dark)',
            background: HERO_GLOW,
          }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[380px]"
            style={{
              background:
                'radial-gradient(circle at 18% 0%, rgba(181,147,69,0.18), transparent 46%), radial-gradient(circle at 82% 8%, rgba(158,108,110,0.22), transparent 42%)',
            }}
          />

          <div className="relative mx-auto max-w-[1400px] px-6 pb-20 pt-32 md:px-10 lg:pb-24 lg:pt-40">
            <div className="grid items-center gap-12 xl:gap-16 lg:grid-cols-[minmax(0,0.96fr),minmax(320px,0.72fr)]">
              <div className="max-w-[640px]">
                <Reveal>
                  <Eyebrow tint={ACCENT_PRIMARY}>Overflow case study</Eyebrow>
                </Reveal>

                <Reveal delay={0.08}>
                  <h1
                    className="mt-5 max-w-[11ch] text-[clamp(2.9rem,6.1vw,5.1rem)] leading-[0.92]"
                    style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
                  >
                    Overflow makes a training week easier to follow.
                  </h1>
                </Reveal>

                <Reveal delay={0.16}>
                  <p className="mt-6 max-w-2xl text-[1.08rem] leading-8" style={{ color: BODY }}>
                    It is an iPhone workout tracker for building routines, placing them into the week,
                    starting sessions fast, and checking progress without the usual noise.
                  </p>
                </Reveal>

                <Reveal delay={0.24}>
                  <p className="mt-5 max-w-xl text-[0.98rem] leading-7" style={{ color: MUTED }}>
                    It is for people who already want to train and need a system that is easy to return to.
                  </p>
                </Reveal>

                <Reveal delay={0.32}>
                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {heroMeta.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-[22px] px-4 py-4"
                        style={{
                          background: 'rgba(255,255,255,0.72)',
                          border: '1px solid rgba(129, 62, 58, 0.12)',
                          boxShadow: '0 10px 30px rgba(26,18,9,0.04)',
                        }}
                      >
                        <p className="text-[0.68rem] uppercase tracking-[0.18em]" style={{ color: MUTED, fontFamily: MONO }}>
                          {item.label}
                        </p>
                        <p className="mt-2 text-[0.98rem] font-medium" style={{ color: INK }}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.4}>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <a
                      href={TESTFLIGHT}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ background: CTA_DARK, color: 'var(--cream)' }}
                    >
                      Join the beta
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 13L13 1M13 1H4M13 1v9" />
                      </svg>
                    </a>
                    <a
                      href="#product-story"
                      className="inline-flex items-center rounded-full px-7 py-3.5 text-sm font-medium transition duration-300 hover:-translate-y-0.5"
                      style={{ border: '1px solid var(--cream-dark)', color: INK }}
                    >
                      See the product flow
                    </a>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.18}>
                <div className="relative mx-auto w-full max-w-[360px] lg:justify-self-end xl:max-w-[380px]">
                  <div
                    className="absolute inset-x-5 bottom-2 top-16 rounded-[56px] blur-3xl"
                    style={{ background: 'rgba(158, 108, 110, 0.18)' }}
                    aria-hidden="true"
                  />

                  <IPhoneFrame width={300}>
                    <ScreenImage src="Today-tab.webp" alt="Overflow Today screen" />
                  </IPhoneFrame>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-10 pb-10 lg:-mt-12 lg:pb-12">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="grid gap-4 lg:grid-cols-3">
              {snapshotCards.map((card, index) => (
                <Reveal key={card.label} delay={index * 0.05}>
                  <article
                    className="h-full rounded-[28px] px-5 py-5"
                    style={{
                      background: index === 1 ? SURFACE_WARM : SURFACE,
                      border: '1px solid rgba(129, 62, 58, 0.12)',
                      boxShadow: '0 12px 34px rgba(26,18,9,0.05)',
                    }}
                  >
                    <Eyebrow tint={index === 2 ? ACCENT_PRIMARY : MUTED}>{card.label}</Eyebrow>
                    <p className="mt-4 text-[1rem] leading-7" style={{ color: INK }}>
                      {card.value}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <StickyShowcase beats={storyBeats} />

        <section
          id="week-flow"
          className="py-20 lg:py-24"
          style={{
            borderBottom: '1px solid var(--cream-dark)',
            background: 'linear-gradient(180deg, rgba(247,243,238,1) 0%, rgba(237,232,223,0.9) 100%)',
            scrollMarginTop: 120,
          }}
        >
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <Reveal>
              <Eyebrow>A week with Overflow</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-[620px]">
                  <h2
                    className="text-[clamp(2.15rem,5vw,4rem)] leading-[0.97]"
                    style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
                  >
                    Built for the week, not the tap.
                  </h2>
                </div>

                <p className="max-w-[460px] text-[0.98rem] leading-7" style={{ color: BODY }}>
                  Set the structure, place the sessions, start from Today, then review what held.
                </p>
              </div>
            </Reveal>

            <div className="relative mt-12">
              <div
                className="pointer-events-none absolute left-10 right-10 top-10 hidden h-px lg:block"
                style={{ background: 'rgba(129, 62, 58, 0.12)' }}
                aria-hidden="true"
              />

              <div className="grid gap-4 lg:grid-cols-4">
                {weekFlow.map((item, index) => (
                  <Reveal key={item.step} delay={index * 0.06} className="h-full">
                    <article
                      className="relative flex h-full min-h-[19rem] flex-col rounded-[28px] p-5 lg:min-h-[20rem] lg:p-6"
                      style={{
                        background: SURFACE,
                        border: '1px solid rgba(129, 62, 58, 0.12)',
                        boxShadow: '0 10px 28px rgba(26,18,9,0.04)',
                      }}
                    >
                      <span
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[0.75rem]"
                        style={{
                          background: index === 2 ? ACCENT_PRIMARY_SOFT : ACCENT_SECONDARY_SOFT,
                          color: index === 2 ? ACCENT_PRIMARY : ACCENT_SECONDARY,
                          fontFamily: MONO,
                        }}
                      >
                        {item.step}
                      </span>
                      <h3 className="mt-5 text-[1.1rem] leading-6" style={{ color: INK, fontWeight: 600 }}>
                        {item.label}
                      </h3>
                      <p className="mt-3 text-sm leading-6" style={{ color: BODY }}>
                        {item.body}
                      </p>
                      <div className="mt-auto pt-5">
                        <span
                          className="rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em]"
                          style={{ background: ACCENT_PRIMARY_SOFT, color: ACCENT_PRIMARY, fontFamily: MONO }}
                        >
                          {item.link}
                        </span>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24" style={{ borderBottom: '1px solid var(--cream-dark)' }}>
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <Reveal>
              <Eyebrow>Decision rationale</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="mt-4 max-w-4xl text-[clamp(2.15rem,5vw,4rem)] leading-[0.97]"
                style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
              >
                The calm feeling comes from a few tight product rules.
              </h2>
            </Reveal>

            <div
              className="mt-12 overflow-hidden rounded-[30px]"
              style={{
                border: '1px solid rgba(129, 62, 58, 0.12)',
                background: SURFACE,
                boxShadow: '0 12px 32px rgba(26,18,9,0.04)',
              }}
            >
              <div
                className="hidden lg:grid lg:grid-cols-[minmax(0,0.9fr),minmax(0,0.95fr),minmax(0,1.05fr)] lg:items-start lg:px-6 lg:py-4"
                style={{ borderBottom: '1px solid rgba(129, 62, 58, 0.12)' }}
              >
                <Eyebrow tint={ACCENT_PRIMARY}>Decision</Eyebrow>
                <Eyebrow>Typical pattern</Eyebrow>
                <Eyebrow tint={ACCENT_SECONDARY}>Why it matters</Eyebrow>
              </div>

              <div>
                {decisionRows.map((row, index) => (
                  <Reveal key={row.decision} delay={index * 0.04}>
                    <article
                      className="grid gap-4 px-5 py-5 lg:grid-cols-[minmax(0,0.9fr),minmax(0,0.95fr),minmax(0,1.05fr)] lg:items-start lg:px-6 lg:py-6"
                      style={{
                        borderBottom:
                          index < decisionRows.length - 1
                            ? '1px solid rgba(129, 62, 58, 0.12)'
                            : 'none',
                        background: index % 2 === 0 ? SURFACE : 'rgba(247,243,238,0.72)',
                      }}
                    >
                      <div className="flex h-full flex-col justify-start">
                        <div className="lg:hidden">
                          <Eyebrow tint={ACCENT_PRIMARY}>Decision</Eyebrow>
                        </div>
                        <p className="mt-2 text-[0.98rem] leading-7 lg:mt-0" style={{ color: INK, fontWeight: 500 }}>
                          {row.decision}
                        </p>
                      </div>

                      <div className="flex h-full flex-col justify-start">
                        <div className="lg:hidden">
                          <Eyebrow>Typical pattern</Eyebrow>
                        </div>
                        <p className="mt-2 text-[0.98rem] leading-7 lg:mt-0" style={{ color: BODY }}>
                          {row.alternative}
                        </p>
                      </div>

                      <div className="flex h-full flex-col justify-start">
                        <div className="lg:hidden">
                          <Eyebrow tint={ACCENT_SECONDARY}>Why it matters</Eyebrow>
                        </div>
                        <p className="mt-2 text-[0.98rem] leading-7 lg:mt-0" style={{ color: BODY }}>
                          {row.impact}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-16" style={{ borderBottom: '1px solid var(--cream-dark)' }}>
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <Reveal>
              <details
                className="rounded-[32px] p-6 lg:p-8"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(247,243,238,0.96) 100%)',
                  border: '1px solid rgba(129, 62, 58, 0.12)',
                  boxShadow: '0 12px 32px rgba(26,18,9,0.04)',
                }}
              >
                <summary className="list-none cursor-pointer [&::-webkit-details-marker]:hidden">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h2
                        className="text-[1.8rem] leading-[1.04]"
                        style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
                      >
                        Open case study notes
                      </h2>
                    </div>
                    <span
                      className="inline-flex items-center self-start rounded-full px-4 py-2 text-sm lg:self-auto"
                      style={{
                        background: 'rgba(255,255,255,0.82)',
                        border: '1px solid rgba(129, 62, 58, 0.12)',
                        color: INK,
                      }}
                    >
                      Open notes
                    </span>
                  </div>
                </summary>

                <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.78fr),minmax(0,1.22fr)] lg:gap-8">
                  <div className="space-y-4">
                    <p className="text-[0.98rem] leading-7" style={{ color: BODY }}>
                      Overflow is built around practical training questions, a visible weekly model, and
                      progress that orients without pressuring the user.
                    </p>

                    <div
                      className="rounded-[26px] p-5"
                      style={{
                        background: SURFACE,
                        border: '1px solid rgba(129, 62, 58, 0.12)',
                      }}
                    >
                      <Eyebrow>Questions the product answers</Eyebrow>
                      <ul className="mt-4 space-y-2">
                        {PRACTICAL_QUESTIONS.map((question) => (
                          <li key={question} className="text-sm leading-6" style={{ color: BODY }}>
                            {question}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div
                        className="rounded-[24px] p-5"
                        style={{
                          background: SURFACE,
                          border: '1px solid rgba(129, 62, 58, 0.12)',
                        }}
                      >
                        <Eyebrow tint={ACCENT_PRIMARY}>Surfaces</Eyebrow>
                        <p className="mt-3 text-sm leading-6" style={{ color: BODY }}>
                          Today, Calendar, and Milestones keep the system readable.
                        </p>
                      </div>
                      <div
                        className="rounded-[24px] p-5"
                        style={{
                          background: SURFACE,
                          border: '1px solid rgba(129, 62, 58, 0.12)',
                        }}
                      >
                        <Eyebrow tint={ACCENT_SECONDARY}>Actions</Eyebrow>
                        <p className="mt-3 text-sm leading-6" style={{ color: BODY }}>
                          Create and Schedule shape the plan before the workout starts.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {storyBeats.map((beat, index) => (
                      <article
                        key={beat.id}
                        className="rounded-[24px] p-5"
                        style={{
                          background: index % 2 === 0 ? SURFACE : 'rgba(255,255,255,0.68)',
                          border: '1px solid rgba(129, 62, 58, 0.12)',
                        }}
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className="rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em]"
                            style={{
                              background: beat.kind === 'Surface' ? ACCENT_PRIMARY_SOFT : ACCENT_SECONDARY_SOFT,
                              color: beat.kind === 'Surface' ? ACCENT_PRIMARY : ACCENT_SECONDARY,
                              fontFamily: MONO,
                            }}
                          >
                            {beat.kind}
                          </span>
                          <span className="text-[0.75rem] uppercase tracking-[0.18em]" style={{ color: MUTED, fontFamily: MONO }}>
                            {beat.label}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-6" style={{ color: BODY }}>
                          {beat.detailNote}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </details>
            </Reveal>
          </div>
        </section>

        <section className="py-24 lg:py-28">
          <div className="mx-auto max-w-[1100px] px-6 text-center md:px-10">
            <Reveal>
              <Eyebrow tint={ACCENT_PRIMARY}>Private beta</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="mx-auto mt-5 max-w-4xl text-[clamp(2.3rem,5.2vw,4.8rem)] leading-[0.95]"
                style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
              >
                Try it for a real week.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-2xl text-[1rem] leading-7" style={{ color: BODY }}>
                Schedule real sessions, return to the app through the week, and see if it makes the rhythm
                easier to hold together.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mx-auto mt-8 grid max-w-4xl gap-3 md:grid-cols-3">
                {betaPoints.map((point, index) => (
                  <div
                    key={point}
                    className="rounded-[22px] px-4 py-4 text-sm"
                    style={{
                      background: index === 1 ? ACCENT_SECONDARY_SOFT : ACCENT_PRIMARY_SOFT,
                      color: index === 1 ? ACCENT_SECONDARY : ACCENT_PRIMARY,
                    }}
                  >
                    {point}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={TESTFLIGHT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: CTA_DARK, color: 'var(--cream)' }}
                >
                  Join the beta on TestFlight
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
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
