'use client'

import { useEffect, useRef, useState } from 'react'
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
const HERO_GLOW = 'linear-gradient(180deg, rgba(158, 108, 110, 0.18) 0%, rgba(247, 243, 238, 0) 64%)'
const BODY_FONT = 'var(--font-body), "DM Sans", system-ui, sans-serif'
const READING = 'var(--font-reading), "Source Serif 4", Georgia, serif'
const MONO = 'var(--font-mono), "Space Mono", monospace'
const TESTFLIGHT = 'https://testflight.apple.com/join/t7jQjsCx'

type ChapterCard = {
  title: string
  body: string
}

type ChapterAnnotation = {
  title: string
  body: string
  top: string
  side: 'left' | 'right'
}

type Chapter = {
  id: string
  number: string
  kind: 'Surface' | 'Action'
  label: string
  title: string
  summary: string
  image: string
  alt: string
  cards: ChapterCard[]
  proof: string[]
  annotations?: ChapterAnnotation[]
}

function useInView(threshold = 0.18) {
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
      { threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

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
  const { ref, visible } = useInView()

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

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
      <div
        className="absolute inset-0 rounded-[50px]"
        style={{
          background: '#12100F',
          boxShadow: '0 24px 80px rgba(26,18,9,0.18), 0 8px 24px rgba(26,18,9,0.12)',
        }}
      />
      <div className="absolute inset-[3px] overflow-hidden rounded-[47px]" style={{ background: SURFACE_SOFT }}>
        <div className="relative z-10 flex justify-center pt-[11px]">
          <div className="h-[26px] w-[100px] rounded-full" style={{ background: '#12100F' }} />
        </div>
        <div className="absolute inset-0 overflow-hidden pt-[46px] pb-[22px]">{children}</div>
        <div
          className="absolute bottom-[7px] left-1/2 h-[4px] w-[110px] -translate-x-1/2 rounded-full"
          style={{ background: '#12100F', opacity: 0.18 }}
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
        sizes="(max-width: 768px) 220px, 272px"
        style={{ objectFit: 'cover' }}
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

function InfoCard({
  title,
  body,
  accent = ACCENT_PRIMARY_SOFT,
}: {
  title: string
  body: string
  accent?: string
}) {
  return (
    <article
      className="rounded-[26px] p-5"
      style={{
        background: SURFACE,
        border: '1px solid var(--cream-dark)',
        boxShadow: '0 12px 32px rgba(26,18,9,0.05)',
      }}
    >
      <div className="mb-4 h-1.5 w-12 rounded-full" style={{ background: accent }} />
      <h3 className="text-[1rem] font-medium" style={{ color: INK, fontFamily: BODY_FONT }}>
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6" style={{ color: BODY, fontFamily: BODY_FONT }}>
        {body}
      </p>
    </article>
  )
}

function AnnotatedPhone({
  image,
  alt,
  annotations = [],
}: {
  image: string
  alt: string
  annotations?: ChapterAnnotation[]
}) {
  return (
    <div className="relative mx-auto w-full max-w-[430px] px-0 py-4 xl:px-12">
      <IPhoneFrame>
        <ScreenImage src={image} alt={alt} />
      </IPhoneFrame>

      {annotations.map((annotation) => (
        <div
          key={`${annotation.side}-${annotation.title}`}
          className="absolute hidden max-w-[176px] rounded-[22px] p-4 xl:block"
          style={{
            top: annotation.top,
            left: annotation.side === 'left' ? 0 : 'auto',
            right: annotation.side === 'right' ? 0 : 'auto',
            background: 'rgba(255,255,255,0.94)',
            border: '1px solid rgba(129, 62, 58, 0.18)',
            boxShadow: '0 12px 32px rgba(26,18,9,0.08)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <p className="text-[0.72rem] font-medium" style={{ color: ACCENT_PRIMARY, fontFamily: BODY_FONT }}>
            {annotation.title}
          </p>
          <p className="mt-1 text-[0.78rem] leading-5" style={{ color: BODY, fontFamily: BODY_FONT }}>
            {annotation.body}
          </p>
        </div>
      ))}
    </div>
  )
}

const chapterLinks = [
  { href: '#why-overflow', label: 'Why it exists' },
  { href: '#system-map', label: 'How it works' },
  { href: '#today', label: 'Today' },
  { href: '#create', label: 'Create' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#calendar', label: 'Calendar' },
  { href: '#milestones', label: 'Milestones' },
  { href: '#week-flow', label: 'A week with Overflow' },
]

const heroMeta = [
  { label: 'Platform', value: 'iPhone' },
  { label: 'Stage', value: 'Private beta' },
  { label: 'Type', value: 'Workout tracking' },
]

const problemRows = [
  {
    conventional: 'Dashboards, badges, and pressure before the first useful action.',
    overflow: 'One clear home surface that tells you what to do next.',
  },
  {
    conventional: 'Planning hidden behind settings, templates, or rigid programming flows.',
    overflow: 'Routines and weekly scheduling stay visible, movable, and easy to revisit.',
  },
  {
    conventional: 'Progress framed as hype, competition, or endless analytics.',
    overflow: 'Progress framed as volume, streaks, records, and trends you can actually use.',
  },
]

const systemSteps = [
  {
    number: '01',
    label: 'Create',
    title: 'Build a reusable routine.',
    body: 'Set up the structure once, with warmup, main work, and cooldown blocks that can be reused across the week.',
  },
  {
    number: '02',
    label: 'Schedule',
    title: 'Place it into real days.',
    body: 'Assign routines to dates, move them when plans change, and keep the week understandable at a glance.',
  },
  {
    number: '03',
    label: 'Today',
    title: 'Start from the next workout.',
    body: 'Open the app to the day that matters now, with a primary action that starts the session without extra setup.',
  },
  {
    number: '04',
    label: 'Session',
    title: 'Log the work quickly.',
    body: 'Move from the plan into the session flow with as little friction as possible so the app never interrupts the workout.',
  },
  {
    number: '05',
    label: 'Review',
    title: 'See what the week is adding up to.',
    body: 'Check adherence in Calendar and review consistency, records, and milestones in the progress layer.',
  },
]

const coreChapters: Chapter[] = [
  {
    id: 'today',
    number: '01',
    kind: 'Surface',
    label: 'Today',
    title: 'The app starts where the workout starts.',
    summary:
      "Today shows the next workout, this week's cadence, and the fastest path into a session. It works as an operational home, not a dashboard.",
    image: 'Today-tab.webp',
    alt: 'Overflow Today screen showing weekly cadence, streak, and a start workout action.',
    cards: [
      {
        title: 'What it does',
        body: 'It surfaces the week so far, the next planned workout, and the primary action that matters now.',
      },
      {
        title: 'What you do here',
        body: 'Start a scheduled workout, resume what is already in progress, or jump to the week from one clear entry point.',
      },
      {
        title: 'Why it matters',
        body: 'The app reduces the pre-workout pause. You are not choosing between dashboards, charts, and menus before you begin.',
      },
    ],
    proof: ['Weekly cadence stays visible.', 'Next workout is explicit.', 'The start action is primary.'],
    annotations: [
      {
        title: 'Week cadence',
        body: 'The week is visible without becoming a dashboard.',
        top: '22%',
        side: 'left',
      },
      {
        title: 'Next workout',
        body: 'The plan is framed as the next action, not buried in navigation.',
        top: '50%',
        side: 'right',
      },
      {
        title: 'Start now',
        body: 'One clear primary action moves the user into the session flow.',
        top: '72%',
        side: 'left',
      },
    ],
  },
  {
    id: 'create',
    number: '02',
    kind: 'Action',
    label: 'Create',
    title: 'Build routines once, use them every week.',
    summary:
      'Routine creation is designed around structure and reuse. The app makes it easy to assemble a session shape you can return to without rebuilding it each time.',
    image: 'routine-creator.webp',
    alt: 'Overflow routine creation screen with warmup, main, and cooldown sections.',
    cards: [
      {
        title: 'What it does',
        body: 'Create reusable routines with named sections so workouts are organised before they ever hit the calendar.',
      },
      {
        title: 'What you do here',
        body: 'Name the routine, add exercises to each section, and save something stable enough to schedule across future weeks.',
      },
      {
        title: 'Why it matters',
        body: 'Structure becomes an asset instead of repeated setup work. Planning the week gets easier once the building blocks already exist.',
      },
    ],
    proof: ['Warmup, main, and cooldown are explicit.', 'The routine is reusable.', 'The interface stays focused on one task.'],
  },
  {
    id: 'schedule',
    number: '03',
    kind: 'Action',
    label: 'Schedule',
    title: 'Plan the week without locking it in.',
    summary:
      'Scheduling connects reusable routines to real dates. Overflow treats plans as something visible and movable, rather than something hidden behind a rigid program.',
    image: 'schedule-routine.webp',
    alt: 'Overflow schedule flow showing a routine picker and a date-specific scheduling action.',
    cards: [
      {
        title: 'What it does',
        body: 'It assigns a routine to a specific day and keeps the selection flow tied to the context of that date.',
      },
      {
        title: 'What you do here',
        body: 'Choose an existing routine, schedule it for the date in view, and revisit the plan when the week shifts.',
      },
      {
        title: 'Why it matters',
        body: 'The schedule remains flexible. The week keeps its shape even when a workout needs to move rather than disappear.',
      },
    ],
    proof: ['Routine selection is date-specific.', 'Scheduling is a direct action.', 'The plan can adapt when life changes.'],
  },
  {
    id: 'calendar',
    number: '04',
    kind: 'Surface',
    label: 'Calendar',
    title: 'Keep the whole week legible.',
    summary:
      'Calendar is the planning control surface. It lets the user see completed work, planned routines, and the spacing of training days without leaving the month view.',
    image: 'Calendar-tab.webp',
    alt: 'Overflow Calendar tab showing a monthly view with planned and completed markers.',
    cards: [
      {
        title: 'What it does',
        body: 'It makes the month readable at a glance by combining planned and completed markers in a single surface.',
      },
      {
        title: 'What you do here',
        body: 'Review the month, inspect a specific day, and keep the week balanced by moving or clearing plans when needed.',
      },
      {
        title: 'Why it matters',
        body: 'A training plan stops feeling abstract once it is placed in time. Calendar is where structure becomes visible and maintainable.',
      },
    ],
    proof: ['Planned and completed states are distinct.', 'Month navigation stays simple.', 'The calendar works as planning memory.'],
  },
  {
    id: 'milestones',
    number: '05',
    kind: 'Surface',
    label: 'Milestones',
    title: 'Progress stays calm, but it stays visible.',
    summary:
      'Overflow tracks progress through milestones, records, streaks, and broader trends. The goal is to make progress interpretable without turning it into a game.',
    image: 'Milestones.webp',
    alt: 'Overflow milestones screen showing completed milestones and progress toward future milestones.',
    cards: [
      {
        title: 'What it does',
        body: 'It records moments that matter, from first sessions to longer consistency arcs, and connects them to the rest of the training history.',
      },
      {
        title: 'What you do here',
        body: 'Review what has already been unlocked, see what is building next, and use that context alongside volume, streak, and record signals.',
      },
      {
        title: 'Why it matters',
        body: 'The app gives the user evidence that the work is accumulating, but it does so quietly and without aggressive reward mechanics.',
      },
    ],
    proof: ['Milestones are tied to real training events.', 'Progress is visible without hype.', 'Feedback supports continuity, not pressure.'],
  },
]

const weekFlow = [
  {
    day: 'Sunday',
    label: 'Set the structure',
    body: 'Build or refine the routines you want to run that week, so the plan starts from reusable parts instead of ad hoc decisions.',
    link: 'Create',
  },
  {
    day: 'Monday',
    label: 'Place the sessions',
    body: 'Schedule the routines into specific days and shape the week around real availability rather than idealised plans.',
    link: 'Schedule',
  },
  {
    day: 'Training day',
    label: 'Start from Today',
    body: 'Open the app to the next workout, confirm the plan quickly, and move into the session flow without navigating around the product.',
    link: 'Today',
  },
  {
    day: 'End of week',
    label: 'Review what the week added up to',
    body: 'Use Calendar and Milestones to see adherence, continuity, and the progress signals that make the next week easier to plan.',
    link: 'Calendar + Milestones',
  },
]

const decisionRows = [
  {
    decision: 'One operational home instead of a multi-card dashboard',
    alternative: 'Many fitness apps front-load data, widgets, and habit pressure before the workout begins.',
    impact: 'Overflow keeps the next action obvious, which lowers friction right at the moment the user might abandon the session.',
  },
  {
    decision: 'Reusable routines plus movable weekly scheduling',
    alternative: 'Rigid plans break as soon as the user misses a day or changes the week.',
    impact: 'Overflow preserves structure without treating adjustment as failure.',
  },
  {
    decision: 'Meaningful progress signals over exhaustive analytics',
    alternative: 'Endless charts are often dense to read and weak at driving action.',
    impact: 'The user gets a shorter list of measures that actually help them understand continuity and output.',
  },
  {
    decision: 'Quiet continuity instead of reward-heavy motivation',
    alternative: 'Aggressive streak language, leaderboards, and unlock loops can add noise to an already demanding habit.',
    impact: 'Overflow supports disciplined users without making the product feel judgmental or performative.',
  },
]

const betaPoints = [
  'For people who train consistently and want a clearer weekly rhythm.',
  'For users who prefer structure, not pressure.',
  'For anyone who wants progress to stay visible without becoming noisy.',
]

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
                'radial-gradient(circle at 20% 0%, rgba(181,147,69,0.20), transparent 46%), radial-gradient(circle at 80% 10%, rgba(158,108,110,0.22), transparent 42%)',
            }}
          />

          <div className="relative mx-auto max-w-[1400px] px-6 pb-20 pt-32 md:px-10 lg:pb-24 lg:pt-40">
            <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr),auto]">
              <div className="max-w-[720px]">
                <Reveal>
                  <Eyebrow tint={ACCENT_PRIMARY}>Overflow case study</Eyebrow>
                </Reveal>

                <Reveal delay={0.08}>
                  <h1
                    className="mt-5 max-w-4xl text-[clamp(2.9rem,7vw,5.6rem)] leading-[0.94]"
                    style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
                  >
                    Overflow is a workout tracker built to make training easier to return to.
                  </h1>
                </Reveal>

                <Reveal delay={0.16}>
                  <p className="mt-6 max-w-2xl text-[1.08rem] leading-8" style={{ color: BODY }}>
                    It helps people plan workouts, build reusable routines, schedule training days, start
                    sessions quickly, and track progress through volume, streaks, personal records, and
                    milestones. The goal is not more motivation theatre. The goal is a calmer, more legible
                    training system.
                  </p>
                </Reveal>

                <Reveal delay={0.24}>
                  <p className="mt-5 max-w-xl text-[0.98rem] leading-7" style={{ color: MUTED }}>
                    Overflow exists because many fitness apps feel either noisy, over-gamified, or too
                    abstract to help in the moment. This page explains how the product is organised, what
                    each core surface does, and why those choices matter.
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
                      href="#system-map"
                      className="inline-flex items-center rounded-full px-7 py-3.5 text-sm font-medium transition duration-300 hover:-translate-y-0.5"
                      style={{ border: '1px solid var(--cream-dark)', color: INK }}
                    >
                      See how it works
                    </a>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.18}>
                <div className="relative mx-auto w-full max-w-[360px]">
                  <div
                    className="absolute inset-x-6 bottom-3 top-16 rounded-[48px] blur-3xl"
                    style={{ background: 'rgba(158, 108, 110, 0.18)' }}
                    aria-hidden="true"
                  />
                  <IPhoneFrame>
                    <ScreenImage src="Today-tab.webp" alt="Overflow Today screen" />
                  </IPhoneFrame>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section style={{ borderBottom: '1px solid var(--cream-dark)' }}>
          <div className="mx-auto max-w-[1400px] px-6 py-6 md:px-10">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <Eyebrow>Case study guide</Eyebrow>
              <div className="overflow-x-auto pb-1">
                <div className="flex min-w-max gap-2">
                  {chapterLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="rounded-full px-4 py-2 text-sm transition duration-300 hover:-translate-y-0.5"
                      style={{
                        background: 'rgba(255,255,255,0.72)',
                        border: '1px solid var(--cream-dark)',
                        color: INK,
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="why-overflow"
          className="py-24 lg:py-28"
          style={{ borderBottom: '1px solid var(--cream-dark)', scrollMarginTop: 120 }}
        >
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr),minmax(0,1.08fr)] lg:gap-16">
              <div className="max-w-[560px]">
                <Reveal>
                  <Eyebrow>Why Overflow exists</Eyebrow>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2
                    className="mt-4 text-[clamp(2.25rem,5vw,4.15rem)] leading-[0.96]"
                    style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
                  >
                    A quieter product response to a crowded category.
                  </h2>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="mt-6 text-[1rem] leading-7" style={{ color: BODY }}>
                    Overflow is not trying to turn training into entertainment. It is built for people
                    who already want to train and need a product that makes the week easier to hold in
                    their head. The product direction comes from one belief: clarity compounds better than
                    pressure does.
                  </p>
                </Reveal>
                <Reveal delay={0.24}>
                  <div
                    className="mt-8 rounded-[28px] p-6"
                    style={{
                      background: SURFACE,
                      border: '1px solid rgba(158, 108, 110, 0.16)',
                      boxShadow: '0 14px 38px rgba(26,18,9,0.05)',
                    }}
                  >
                    <p className="text-sm leading-6" style={{ color: BODY }}>
                      The product is designed to answer five practical questions with as little friction as
                      possible: What should I do today? What routines do I already have? Where do they fit
                      this week? What changed on the calendar? What is the work adding up to over time?
                    </p>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.1}>
                <div className="grid gap-4">
                  {problemRows.map((row, index) => (
                    <article
                      key={row.overflow}
                      className="rounded-[28px] p-5 lg:p-6"
                      style={{
                        background: index === 1 ? SURFACE_WARM : SURFACE,
                        border: '1px solid var(--cream-dark)',
                        boxShadow: '0 10px 30px rgba(26,18,9,0.04)',
                      }}
                    >
                      <div className="grid gap-5 lg:grid-cols-2">
                        <div>
                          <Eyebrow tint={MUTED}>Common pattern</Eyebrow>
                          <p className="mt-3 text-[0.98rem] leading-7" style={{ color: BODY }}>
                            {row.conventional}
                          </p>
                        </div>
                        <div>
                          <Eyebrow tint={ACCENT_PRIMARY}>Overflow</Eyebrow>
                          <p className="mt-3 text-[0.98rem] leading-7" style={{ color: INK }}>
                            {row.overflow}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          id="system-map"
          className="py-24 lg:py-28"
          style={{
            borderBottom: '1px solid var(--cream-dark)',
            background: 'linear-gradient(180deg, rgba(237, 232, 223, 0.74) 0%, rgba(245, 240, 235, 0.92) 100%)',
            scrollMarginTop: 120,
          }}
        >
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <Reveal>
              <Eyebrow>How the system works</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="mt-4 max-w-4xl text-[clamp(2.2rem,5vw,4rem)] leading-[0.98]"
                style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
              >
                Overflow is organised as a planning loop, not a stack of disconnected tabs.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-3xl text-[1rem] leading-7" style={{ color: BODY }}>
                The product makes its logic visible. You build routines, place them into real days, start
                from the day that matters now, log the work, and review what the week is adding up to.
                Each surface supports a specific part of that loop.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 lg:grid-cols-5">
              {systemSteps.map((step, index) => (
                <Reveal key={step.label} delay={index * 0.06}>
                  <article
                    className="relative h-full rounded-[28px] p-5 lg:min-h-[260px]"
                    style={{
                      background: index % 2 === 0 ? SURFACE : 'rgba(255,255,255,0.72)',
                      border: '1px solid rgba(129, 62, 58, 0.12)',
                      boxShadow: '0 10px 30px rgba(26,18,9,0.04)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[0.72rem]"
                        style={{
                          background: ACCENT_PRIMARY_SOFT,
                          color: ACCENT_PRIMARY,
                          fontFamily: MONO,
                        }}
                      >
                        {step.number}
                      </span>
                      <span className="text-[0.7rem] uppercase tracking-[0.18em]" style={{ color: MUTED, fontFamily: MONO }}>
                        {step.label}
                      </span>
                    </div>

                    <h3 className="mt-6 text-[1.18rem] font-medium leading-7" style={{ color: INK }}>
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6" style={{ color: BODY }}>
                      {step.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {coreChapters.map((chapter, index) => {
          const imageFirst = index % 2 === 1
          const chapterAccent =
            index % 3 === 0
              ? ACCENT_PRIMARY_SOFT
              : index % 3 === 1
                ? ACCENT_SECONDARY_SOFT
                : ACCENT_TERTIARY_SOFT

          return (
            <section
              key={chapter.id}
              id={chapter.id}
              className="py-24 lg:py-28"
              style={{
                borderBottom: '1px solid var(--cream-dark)',
                background: imageFirst ? 'rgba(255,255,255,0.3)' : 'transparent',
                scrollMarginTop: 120,
              }}
            >
              <div className="mx-auto max-w-[1400px] px-6 md:px-10">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                  <Reveal className={imageFirst ? 'order-2 lg:order-1' : ''} delay={0.08}>
                    <div className="max-w-[620px]">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className="inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em]"
                          style={{ background: chapterAccent, color: ACCENT_PRIMARY, fontFamily: MONO }}
                        >
                          {chapter.kind}
                        </span>
                        <span className="text-[0.75rem] uppercase tracking-[0.2em]" style={{ color: MUTED, fontFamily: MONO }}>
                          {chapter.number} / {chapter.label}
                        </span>
                      </div>

                      <h2
                        className="mt-5 text-[clamp(2rem,4.6vw,3.7rem)] leading-[0.98]"
                        style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
                      >
                        {chapter.title}
                      </h2>
                      <p className="mt-5 max-w-2xl text-[1rem] leading-7" style={{ color: BODY }}>
                        {chapter.summary}
                      </p>

                      <div className="mt-8 grid gap-4 md:grid-cols-3">
                        {chapter.cards.map((card, cardIndex) => (
                          <InfoCard key={card.title} title={card.title} body={card.body} accent={cardIndex === 1 ? ACCENT_SECONDARY_SOFT : chapterAccent} />
                        ))}
                      </div>

                      <div className="mt-8 flex flex-wrap gap-2">
                        {chapter.proof.map((proof) => (
                          <span
                            key={proof}
                            className="rounded-full px-4 py-2 text-[0.82rem]"
                            style={{
                              background: SURFACE,
                              border: '1px solid rgba(129, 62, 58, 0.12)',
                              color: BODY,
                            }}
                          >
                            {proof}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>

                  <Reveal className={imageFirst ? 'order-1 lg:order-2' : ''} delay={0.14}>
                    {chapter.annotations ? (
                      <AnnotatedPhone image={chapter.image} alt={chapter.alt} annotations={chapter.annotations} />
                    ) : (
                      <div className="relative mx-auto w-full max-w-[360px]">
                        <div
                          className="absolute inset-x-8 bottom-4 top-16 rounded-[48px] blur-3xl"
                          style={{ background: chapterAccent }}
                          aria-hidden="true"
                        />
                        <IPhoneFrame>
                          <ScreenImage src={chapter.image} alt={chapter.alt} />
                        </IPhoneFrame>
                      </div>
                    )}
                  </Reveal>
                </div>
              </div>
            </section>
          )
        })}

        <section
          id="week-flow"
          className="py-24 lg:py-28"
          style={{
            borderBottom: '1px solid var(--cream-dark)',
            background: 'linear-gradient(180deg, rgba(247,243,238,1) 0%, rgba(237,232,223,0.9) 100%)',
            scrollMarginTop: 120,
          }}
        >
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr),minmax(0,1.2fr)] lg:gap-16">
              <div className="max-w-[520px]">
                <Reveal>
                  <Eyebrow>A week with Overflow</Eyebrow>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2
                    className="mt-4 text-[clamp(2.2rem,4.8vw,4rem)] leading-[0.98]"
                    style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
                  >
                    The product is designed to carry a week, not just a single tap.
                  </h2>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="mt-6 text-[1rem] leading-7" style={{ color: BODY }}>
                    The flow is simple by design: define the structure, place it into time, start from the
                    day that matters, and review what the week actually became. That is what makes the app
                    feel calmer in use. The logic stays visible from one session to the next.
                  </p>
                </Reveal>
              </div>

              <div className="space-y-4">
                {weekFlow.map((item, index) => (
                  <Reveal key={item.day} delay={index * 0.08}>
                    <article
                      className="rounded-[28px] p-5 lg:p-6"
                      style={{
                        background: SURFACE,
                        border: '1px solid rgba(129, 62, 58, 0.12)',
                        boxShadow: '0 10px 28px rgba(26,18,9,0.04)',
                      }}
                    >
                      <div className="grid gap-4 lg:grid-cols-[140px,1fr,170px] lg:items-start">
                        <div>
                          <p className="text-[0.72rem] uppercase tracking-[0.18em]" style={{ color: MUTED, fontFamily: MONO }}>
                            {item.day}
                          </p>
                          <h3 className="mt-2 text-[1.08rem] font-medium leading-6" style={{ color: INK }}>
                            {item.label}
                          </h3>
                        </div>

                        <p className="text-sm leading-6" style={{ color: BODY }}>
                          {item.body}
                        </p>

                        <div className="lg:text-right">
                          <span
                            className="inline-flex rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em]"
                            style={{ background: ACCENT_SECONDARY_SOFT, color: ACCENT_SECONDARY, fontFamily: MONO }}
                          >
                            {item.link}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-28" style={{ borderBottom: '1px solid var(--cream-dark)' }}>
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <Reveal>
              <Eyebrow>Why these decisions matter</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="mt-4 max-w-4xl text-[clamp(2.2rem,5vw,4rem)] leading-[0.98]"
                style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
              >
                Quiet confidence here comes from product choices, not just tone.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-3xl text-[1rem] leading-7" style={{ color: BODY }}>
                The product feels calm because it reduces duplication, keeps each surface narrow in
                responsibility, and favours legibility over spectacle. The design language follows that
                logic rather than trying to compensate for it.
              </p>
            </Reveal>

            <div className="mt-12 space-y-4">
              {decisionRows.map((row, index) => (
                <Reveal key={row.decision} delay={index * 0.06}>
                  <article
                    className="rounded-[28px] p-5 lg:p-6"
                    style={{
                      background: index % 2 === 0 ? SURFACE : SURFACE_SOFT,
                      border: '1px solid var(--cream-dark)',
                    }}
                  >
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr),minmax(0,0.95fr),minmax(0,1fr)]">
                      <div>
                        <Eyebrow tint={ACCENT_PRIMARY}>Overflow choice</Eyebrow>
                        <p className="mt-3 text-[1rem] leading-7" style={{ color: INK }}>
                          {row.decision}
                        </p>
                      </div>
                      <div>
                        <Eyebrow>Common alternative</Eyebrow>
                        <p className="mt-3 text-sm leading-6" style={{ color: BODY }}>
                          {row.alternative}
                        </p>
                      </div>
                      <div>
                        <Eyebrow tint={ACCENT_SECONDARY}>Why it matters</Eyebrow>
                        <p className="mt-3 text-sm leading-6" style={{ color: BODY }}>
                          {row.impact}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28 lg:py-34">
          <div className="mx-auto max-w-[1100px] px-6 text-center md:px-10">
            <Reveal>
              <Eyebrow tint={ACCENT_PRIMARY}>Private beta</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="mx-auto mt-5 max-w-4xl text-[clamp(2.4rem,5.4vw,4.8rem)] leading-[0.96]"
                style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
              >
                Overflow is for people who want the product to support the work, not perform around it.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-2xl text-[1rem] leading-7" style={{ color: BODY }}>
                The app is in private beta for iPhone. If the product logic on this page matches how you
                like to train, the next step is simple: try it, use it across a real week, and see whether
                the calmer rhythm holds up in practice.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
                {betaPoints.map((point, index) => (
                  <span
                    key={point}
                    className="rounded-full px-4 py-2 text-sm"
                    style={{
                      background: index === 1 ? ACCENT_SECONDARY_SOFT : ACCENT_PRIMARY_SOFT,
                      color: index === 1 ? ACCENT_SECONDARY : ACCENT_PRIMARY,
                    }}
                  >
                    {point}
                  </span>
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
