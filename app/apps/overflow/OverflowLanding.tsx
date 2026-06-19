'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { type Locale, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import OverflowLegalLinks from '@/components/overflow/OverflowLegalLinks'

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

type StoryCallout = {
  title: string
  body: string
  top: string
  side: 'left' | 'right'
}

type StoryBeat = {
  id: string
  label: string
  kind: string
  screen: string
  alt: string
  headline: string
  body: string
  proof: string[]
  callouts: StoryCallout[]
  detailNote: string
}

type OverflowContent = {
  heroEyebrow: string
  heroTitle: string
  heroBody: string
  heroSubbody: string
  heroMeta: Array<{ label: string; value: string }>
  heroPrimaryCta: string
  heroSecondaryCta: string
  snapshotCards: Array<{ label: string; value: string }>
  systemFlow: string[]
  storyEyebrow: string
  storyTitle: string
  storyBody: string
  storyTabsAriaLabel: string
  whyThisMatters: string
  weekEyebrow: string
  weekTitle: string
  weekBody: string
  weekFlow: Array<{ step: string; label: string; body: string; link: string }>
  decisionEyebrow: string
  decisionTitle: string
  decisionHeaders: {
    decision: string
    typicalPattern: string
    whyItMatters: string
  }
  decisionRows: Array<{ decision: string; alternative: string; impact: string }>
  betaEyebrow: string
  betaTitle: string
  betaBody: string
  betaPoints: string[]
  betaPrimaryCta: string
  betaSecondaryCta: string
  storyBeats: StoryBeat[]
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

function getOverflowContent(locale: Locale): OverflowContent {
  if (locale === 'es') {
    return {
      heroEyebrow: 'Caso de estudio de Overflow',
      heroTitle: 'Overflow hace que una semana de entrenamiento sea más fácil de seguir.',
      heroBody:
        'Es un tracker de entrenamiento para iPhone pensado para construir rutinas, colocarlas dentro de la semana, empezar sesiones rápido y revisar el progreso sin el ruido habitual.',
      heroSubbody:
        'Está hecho para personas que ya quieren entrenar y necesitan un sistema al que sea fácil volver.',
      heroMeta: [
        { label: 'Plataforma', value: 'iPhone' },
        { label: 'Etapa', value: 'Beta privada' },
        { label: 'Tipo', value: 'Seguimiento de entrenamiento' },
      ],
      heroPrimaryCta: 'Unirse a la beta',
      heroSecondaryCta: 'Ver el flujo del producto',
      snapshotCards: [
        {
          label: 'Qué es',
          value: 'Un tracker de entrenamiento construido alrededor de rutinas, programación semanal y comienzos rápidos.',
        },
        {
          label: 'Para quién es',
          value: 'Para gente que ya entrena y quiere estructura más clara, no hype.',
        },
        {
          label: 'Por qué se siente distinto',
          value: 'La siguiente acción sigue siendo obvia, la semana sigue visible y el progreso se mantiene sereno.',
        },
      ],
      systemFlow: ['Crear', 'Planificar', 'Hoy', 'Sesión', 'Revisión'],
      storyEyebrow: 'Historia del producto',
      storyTitle: 'Cinco pantallas explican el sistema.',
      storyBody: 'Construye la rutina, colócala en la semana, empieza desde Hoy y luego revisa lo que ocurrió.',
      storyTabsAriaLabel: 'Pantallas de la historia del producto Overflow',
      whyThisMatters: 'Por qué importa',
      weekEyebrow: 'Una semana con Overflow',
      weekTitle: 'Diseñado para la semana, no para el toque.',
      weekBody: 'Define la estructura, coloca las sesiones, empieza desde Hoy y luego revisa qué se sostuvo.',
      weekFlow: [
        {
          step: '01',
          label: 'Define la estructura',
          body: 'Construye primero rutinas reutilizables.',
          link: 'Crear',
        },
        {
          step: '02',
          label: 'Coloca sesiones',
          body: 'Asígnalas a días reales.',
          link: 'Planificar',
        },
        {
          step: '03',
          label: 'Empieza desde Hoy',
          body: 'Abre la siguiente sesión y empieza.',
          link: 'Hoy',
        },
        {
          step: '04',
          label: 'Revisa la semana',
          body: 'Revisa qué pasó y qué se está construyendo.',
          link: 'Revisión',
        },
      ],
      decisionEyebrow: 'Lógica de decisiones',
      decisionTitle: 'La sensación de calma sale de unas pocas reglas de producto bien apretadas.',
      decisionHeaders: {
        decision: 'Decisión',
        typicalPattern: 'Patrón típico',
        whyItMatters: 'Por qué importa',
      },
      decisionRows: [
        {
          decision: 'Un único hogar operativo',
          alternative: 'La mayoría de apps de fitness abren con paneles que tienes que interpretar.',
          impact: 'Overflow mantiene obvia la siguiente acción.',
        },
        {
          decision: 'Rutinas reutilizables más programación flexible',
          alternative: 'Los planes rígidos se rompen en cuanto cambia la semana.',
          impact: 'La persona puede mover sesiones sin perder estructura.',
        },
        {
          decision: 'Un conjunto más pequeño de señales de progreso',
          alternative: 'Los grandes paneles analíticos generan más lectura que claridad.',
          impact: 'El progreso sigue siendo fácil de leer y usar.',
        },
        {
          decision: 'Continuidad tranquila por encima de la motivación cargada de recompensas',
          alternative: 'La presión gamificada puede hacer que entrenar se sienta performativo.',
          impact: 'El producto apoya la consistencia sin añadir más ruido.',
        },
      ],
      betaEyebrow: 'Beta privada',
      betaTitle: 'Pruébala durante una semana real.',
      betaBody:
        'Programa sesiones reales, vuelve a la app durante la semana y comprueba si hace más fácil sostener el ritmo.',
      betaPoints: [
        'Para quienes quieren un ritmo semanal más claro.',
        'Para quienes prefieren estructura antes que hype.',
        'Para hábitos de entrenamiento que necesitan continuidad, no presión.',
      ],
      betaPrimaryCta: 'Unirse a la beta en TestFlight',
      betaSecondaryCta: 'Volver a apps',
      storyBeats: [
        {
          id: 'today',
          label: 'Hoy',
          kind: 'Superficie',
          screen: 'Today-tab.webp',
          alt: 'Pantalla Hoy de Overflow mostrando la semana, el próximo entrenamiento y una acción para empezar.',
          headline: 'Abre en el siguiente entrenamiento.',
          body: 'Hoy muestra la siguiente sesión, la semana y la entrada más rápida al entrenamiento.',
          proof: [
            'El siguiente entrenamiento queda explícito.',
            'La cadencia semanal sigue visible.',
            'Una sola acción principal empieza la sesión.',
          ],
          callouts: [
            { title: 'Cadencia semanal', body: 'La semana se ve sin convertir la pantalla en un panel.', top: '20%', side: 'left' },
            { title: 'Siguiente entrenamiento', body: 'El plan aparece como la siguiente acción y no como un detalle escondido.', top: '46%', side: 'right' },
            { title: 'Empieza ya', body: 'Una acción clara lleva directamente al flujo de sesión.', top: '71%', side: 'left' },
          ],
          detailNote: 'Hoy funciona como hogar operativo. Cuando la motivación baja, el siguiente paso sigue siendo obvio.',
        },
        {
          id: 'create',
          label: 'Crear',
          kind: 'Acción',
          screen: 'routine-creator.webp',
          alt: 'Pantalla de creación de rutinas de Overflow con secciones de calentamiento, trabajo principal y enfriamiento.',
          headline: 'Construye rutinas una sola vez.',
          body: 'Crear convierte ejercicios en plantillas reutilizables con secciones claras y una estructura repetible.',
          proof: [
            'Calentamiento, trabajo principal y enfriamiento quedan explícitos.',
            'La rutina se vuelve reutilizable, no desechable.',
            'La pantalla se mantiene enfocada en una tarea.',
          ],
          callouts: [
            { title: 'Rutina por secciones', body: 'La estructura se ve antes de tocar el calendario.', top: '22%', side: 'left' },
            { title: 'Bloque reutilizable', body: 'Una rutina guardada se convierte en algo que la semana puede seguir reutilizando.', top: '51%', side: 'right' },
            { title: 'Composición enfocada', body: 'La interfaz se mantiene lo bastante estrecha como para que planificar no se sienta pesado.', top: '74%', side: 'left' },
          ],
          detailNote: 'Cuando la rutina ya existe, planificar deja de empezar desde cero cada semana.',
        },
        {
          id: 'schedule',
          label: 'Planificar',
          kind: 'Acción',
          screen: 'schedule-routine.webp',
          alt: 'Flujo de planificación de Overflow mostrando un selector de rutina y una acción de programación ligada a una fecha.',
          headline: 'Pon rutinas en fechas reales.',
          body: 'Planificar coloca una rutina en un día y hace fácil moverla cuando la semana cambia.',
          proof: [
            'El selector de rutina siempre está ligado a una fecha.',
            'Programar es una acción directa, no un ajuste escondido.',
            'La semana puede moverse sin perder forma.',
          ],
          callouts: [
            { title: 'Contexto de fecha', body: 'Siempre se programa en relación con un día real.', top: '21%', side: 'right' },
            { title: 'Selector de rutina', body: 'Las rutinas existentes están cerca cuando se ordena la semana.', top: '51%', side: 'left' },
            { title: 'Compromiso directo', body: 'La acción es lo bastante clara como para que planificar no se convierta en otro flujo de trabajo.', top: '73%', side: 'right' },
          ],
          detailNote: 'Aquí es donde la flexibilidad se vuelve real. La semana puede ajustarse sin sentirse rota.',
        },
        {
          id: 'calendar',
          label: 'Calendario',
          kind: 'Superficie',
          screen: 'Calendar-tab.webp',
          alt: 'Pestaña Calendario de Overflow mostrando una vista mensual con marcadores de planificado y completado.',
          headline: 'Ve el mes con claridad.',
          body: 'Calendario muestra espaciado, adherencia y contexto por día en un mismo sitio.',
          proof: [
            'Los estados planificado y completado se distinguen claramente.',
            'La navegación mensual se mantiene simple.',
            'La semana conserva su forma con el tiempo.',
          ],
          callouts: [
            { title: 'Vista mensual', body: 'Se puede leer el ritmo y el espaciado sin salir del calendario.', top: '21%', side: 'left' },
            { title: 'Marcadores de estado', body: 'El trabajo planificado y el completado siguen siendo visualmente distintos.', top: '48%', side: 'right' },
            { title: 'Memoria de planificación', body: 'El calendario guarda contexto que, de otro modo, viviría en la cabeza del usuario.', top: '74%', side: 'left' },
          ],
          detailNote: 'Calendario le da memoria al plan. La persona puede ver qué se sostuvo y qué se movió.',
        },
        {
          id: 'milestones',
          label: 'Hitos',
          kind: 'Superficie',
          screen: 'Milestones.webp',
          alt: 'Pantalla de hitos de Overflow mostrando hitos completados y progreso hacia los siguientes.',
          headline: 'Haz que el progreso sea útil.',
          body: 'Hitos muestra récords, rachas y arcos más largos sin convertir el entrenamiento en un loop de recompensa.',
          proof: [
            'Los hitos se conectan con eventos reales de entrenamiento.',
            'El progreso sigue visible sin hype.',
            'El feedback apoya la continuidad, no la presión.',
          ],
          callouts: [
            { title: 'Marcadores completados', body: 'El trabajo pasado se registra como evidencia y no como aplauso.', top: '21%', side: 'right' },
            { title: 'Lo que viene construyéndose', body: 'La pantalla muestra lo que se está acumulando sin gritarlo.', top: '49%', side: 'left' },
            { title: 'Feedback silencioso', body: 'El lenguaje apoya la consistencia en lugar de los loops de recompensa.', top: '74%', side: 'right' },
          ],
          detailNote: 'El progreso está ahí para orientar, no para empujar.',
        },
      ],
    }
  }

  return {
    heroEyebrow: 'Overflow case study',
    heroTitle: 'Overflow makes a training week easier to follow.',
    heroBody:
      'It is an iPhone workout tracker for building routines, placing them into the week, starting sessions fast, and checking progress without the usual noise.',
    heroSubbody:
      'It is for people who already want to train and need a system that is easy to return to.',
    heroMeta: [
      { label: 'Platform', value: 'iPhone' },
      { label: 'Stage', value: 'Private beta' },
      { label: 'Type', value: 'Workout tracking' },
    ],
    heroPrimaryCta: 'Join the beta',
    heroSecondaryCta: 'See the product flow',
    snapshotCards: [
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
    ],
    systemFlow: ['Create', 'Schedule', 'Today', 'Session', 'Review'],
    storyEyebrow: 'Product story',
    storyTitle: 'Five screens explain the system.',
    storyBody: 'Build the routine, place it into the week, start from Today, then review what happened.',
    storyTabsAriaLabel: 'Overflow product story screens',
    whyThisMatters: 'Why this matters',
    weekEyebrow: 'A week with Overflow',
    weekTitle: 'Built for the week, not the tap.',
    weekBody: 'Set the structure, place the sessions, start from Today, then review what held.',
    weekFlow: [
      { step: '01', label: 'Set structure', body: 'Build reusable routines first.', link: 'Create' },
      { step: '02', label: 'Place sessions', body: 'Assign them to real days.', link: 'Schedule' },
      { step: '03', label: 'Start from Today', body: 'Open to the next workout and begin.', link: 'Today' },
      { step: '04', label: 'Review the week', body: 'Review what happened and what is building.', link: 'Review' },
    ],
    decisionEyebrow: 'Decision rationale',
    decisionTitle: 'The calm feeling comes from a few tight product rules.',
    decisionHeaders: {
      decision: 'Decision',
      typicalPattern: 'Typical pattern',
      whyItMatters: 'Why it matters',
    },
    decisionRows: [
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
    ],
    betaEyebrow: 'Private beta',
    betaTitle: 'Try it for a real week.',
    betaBody:
      'Schedule real sessions, return to the app through the week, and see if it makes the rhythm easier to hold together.',
    betaPoints: [
      'For people who want a clearer weekly rhythm.',
      'For people who prefer structure over hype.',
      'For training habits that need continuity, not pressure.',
    ],
    betaPrimaryCta: 'Join the beta on TestFlight',
    betaSecondaryCta: 'Back to apps',
    storyBeats: [
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
          { title: 'Week cadence', body: 'The week is visible without turning the screen into a dashboard.', top: '20%', side: 'left' },
          { title: 'Next workout', body: 'The plan is framed as the next action instead of a buried detail.', top: '46%', side: 'right' },
          { title: 'Start now', body: 'One clear action moves the user directly into the session flow.', top: '71%', side: 'left' },
        ],
        detailNote: 'Today works as the operational home. When motivation is low, the next move is still obvious.',
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
          { title: 'Sectioned routine', body: 'Structure is visible before anything touches the calendar.', top: '22%', side: 'left' },
          { title: 'Reusable block', body: 'A saved routine becomes something the week can keep reusing.', top: '51%', side: 'right' },
          { title: 'Focused composition', body: 'The interface stays narrow enough that planning does not feel heavy.', top: '74%', side: 'left' },
        ],
        detailNote: 'Once a routine exists, planning stops starting from zero each week.',
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
          { title: 'Date context', body: 'The user is always scheduling in relation to a real day.', top: '21%', side: 'right' },
          { title: 'Routine picker', body: 'Existing routines are close at hand when the week is being arranged.', top: '51%', side: 'left' },
          { title: 'Direct commitment', body: 'The action is clear enough that planning does not become its own workflow.', top: '73%', side: 'right' },
        ],
        detailNote: 'This is where flexibility becomes real. The week can adjust without feeling broken.',
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
          { title: 'Month view', body: 'The user can read rhythm and spacing without leaving the calendar.', top: '21%', side: 'left' },
          { title: 'State markers', body: 'Planned work and completed work remain visually distinct.', top: '48%', side: 'right' },
          { title: 'Planning memory', body: 'The calendar holds context that would otherwise live in the user head.', top: '74%', side: 'left' },
        ],
        detailNote: 'Calendar gives the plan memory. The user can see what held and what moved.',
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
          { title: 'Completed markers', body: 'Past work is recorded as evidence rather than applause.', top: '21%', side: 'right' },
          { title: 'What builds next', body: 'The screen shows what is accumulating without shouting about it.', top: '49%', side: 'left' },
          { title: 'Quiet feedback', body: 'The language supports consistency instead of reward loops.', top: '74%', side: 'right' },
        ],
        detailNote: 'Progress is there to orient the user, not to push them.',
      },
    ],
  }
}

function StickyShowcase({ beats, copy }: { beats: StoryBeat[]; copy: OverflowContent }) {
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
          <Eyebrow>{copy.storyEyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[620px]">
              <h2
                className="text-[clamp(2.15rem,5vw,4.25rem)] leading-[0.97]"
                style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
              >
                {copy.storyTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-[1rem] leading-7" style={{ color: BODY }}>
                {copy.storyBody}
              </p>
            </div>

            <div className="flex max-w-[430px] flex-wrap items-center gap-2">
              {copy.systemFlow.map((step, index) => (
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
                  {index < copy.systemFlow.length - 1 ? (
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
          <div className="max-w-full pb-2">
            <div
              role="tablist"
              aria-label={copy.storyTabsAriaLabel}
              className="flex max-w-full flex-wrap gap-2"
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
                      {copy.whyThisMatters}
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
                        {copy.whyThisMatters}
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

interface OverflowLandingProps {
  locale?: Locale
}

export default function OverflowLanding({ locale = 'en' }: OverflowLandingProps) {
  const copy = getOverflowContent(locale)

  return (
    <>
      <Header locale={locale} />

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
                  <Eyebrow tint={ACCENT_PRIMARY}>{copy.heroEyebrow}</Eyebrow>
                </Reveal>

                <Reveal delay={0.08}>
                  <h1
                    className="mt-5 max-w-[11ch] text-[clamp(2.9rem,6.1vw,5.1rem)] leading-[0.92]"
                    style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
                  >
                    {copy.heroTitle}
                  </h1>
                </Reveal>

                <Reveal delay={0.16}>
                  <p className="mt-6 max-w-2xl text-[1.08rem] leading-8" style={{ color: BODY }}>
                    {copy.heroBody}
                  </p>
                </Reveal>

                <Reveal delay={0.24}>
                  <p className="mt-5 max-w-xl text-[0.98rem] leading-7" style={{ color: MUTED }}>
                    {copy.heroSubbody}
                  </p>
                </Reveal>

                <Reveal delay={0.32}>
                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {copy.heroMeta.map((item) => (
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
                      {copy.heroPrimaryCta}
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
                      {copy.heroSecondaryCta}
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
              {copy.snapshotCards.map((card, index) => (
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

        <StickyShowcase beats={copy.storyBeats} copy={copy} />

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
              <Eyebrow>{copy.weekEyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-[620px]">
                  <h2
                    className="text-[clamp(2.15rem,5vw,4rem)] leading-[0.97]"
                    style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
                  >
                    {copy.weekTitle}
                  </h2>
                </div>

                <p className="max-w-[460px] text-[0.98rem] leading-7" style={{ color: BODY }}>
                  {copy.weekBody}
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
                {copy.weekFlow.map((item, index) => (
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
              <Eyebrow>{copy.decisionEyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="mt-4 max-w-4xl text-[clamp(2.15rem,5vw,4rem)] leading-[0.97]"
                style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
              >
                {copy.decisionTitle}
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
                className="hidden text-left lg:grid lg:grid-cols-[minmax(0,0.9fr),minmax(0,0.95fr),minmax(0,1.05fr)] lg:items-start lg:px-6 lg:py-4"
                style={{ borderBottom: '1px solid rgba(129, 62, 58, 0.12)' }}
              >
                <Eyebrow tint={ACCENT_PRIMARY}>{copy.decisionHeaders.decision}</Eyebrow>
                <Eyebrow>{copy.decisionHeaders.typicalPattern}</Eyebrow>
                <Eyebrow tint={ACCENT_SECONDARY}>{copy.decisionHeaders.whyItMatters}</Eyebrow>
              </div>

              <div>
                {copy.decisionRows.map((row, index) => (
                  <Reveal key={row.decision} delay={index * 0.04}>
                    <article
                      className="grid gap-4 px-5 py-5 text-left lg:grid-cols-[minmax(0,0.9fr),minmax(0,0.95fr),minmax(0,1.05fr)] lg:items-start lg:px-6 lg:py-6"
                      style={{
                        borderBottom:
                          index < copy.decisionRows.length - 1
                            ? '1px solid rgba(129, 62, 58, 0.12)'
                            : 'none',
                        background: index % 2 === 0 ? SURFACE : 'rgba(247,243,238,0.72)',
                      }}
                    >
                      <div className="flex h-full flex-col items-start justify-start text-left">
                        <div className="lg:hidden">
                          <Eyebrow tint={ACCENT_PRIMARY}>{copy.decisionHeaders.decision}</Eyebrow>
                        </div>
                        <p className="mt-2 text-[0.98rem] leading-7 lg:mt-0" style={{ color: INK, fontWeight: 500 }}>
                          {row.decision}
                        </p>
                      </div>

                      <div className="flex h-full flex-col items-start justify-start text-left">
                        <div className="lg:hidden">
                          <Eyebrow>{copy.decisionHeaders.typicalPattern}</Eyebrow>
                        </div>
                        <p className="mt-2 text-[0.98rem] leading-7 lg:mt-0" style={{ color: BODY }}>
                          {row.alternative}
                        </p>
                      </div>

                      <div className="flex h-full flex-col items-start justify-start text-left">
                        <div className="lg:hidden">
                          <Eyebrow tint={ACCENT_SECONDARY}>{copy.decisionHeaders.whyItMatters}</Eyebrow>
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

        <section className="py-24 lg:py-28">
          <div className="mx-auto max-w-[1100px] px-6 text-center md:px-10">
            <Reveal>
              <Eyebrow tint={ACCENT_PRIMARY}>{copy.betaEyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="mx-auto mt-5 max-w-4xl text-[clamp(2.3rem,5.2vw,4.8rem)] leading-[0.95]"
                style={{ color: INK, fontFamily: READING, fontWeight: 600 }}
              >
                {copy.betaTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-2xl text-[1rem] leading-7" style={{ color: BODY }}>
                {copy.betaBody}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mx-auto mt-8 grid max-w-4xl gap-3 md:grid-cols-3">
                {copy.betaPoints.map((point, index) => (
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
                  {copy.betaPrimaryCta}
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
                  href={localizePath('/apps', locale)}
                  className="inline-flex items-center rounded-full px-7 py-4 text-sm font-medium transition duration-300 hover:-translate-y-0.5"
                  style={{ border: '1px solid var(--cream-dark)', color: INK }}
                >
                  {copy.betaSecondaryCta}
                </Link>
              </div>
              <div className="mt-6 flex justify-center">
                <OverflowLegalLinks locale={locale} />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  )
}
