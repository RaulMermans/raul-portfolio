import type { Locale } from '@/lib/i18n'
import { localizePath } from '@/lib/i18n'

export interface AppCta {
  label: string
  href: string
  external?: boolean
}

export interface AppMetric {
  label: string
  value: string
}

export interface AppFeature {
  eyebrow: string
  title: string
  description: string
}

export interface AppGalleryItem {
  eyebrow: string
  title: string
  description: string
  stats: string[]
}

export interface AppNarrative {
  title: string
  description: string
  bullets: string[]
}

export interface AppTheme {
  accent: string
  accentSoft: string
  glow: string
  surface: string
  background: string
}

export interface AppEntry {
  slug: string
  href: string
  name: string
  tagline: string
  shortDescription: string
  cardDescription: string
  heroStatement: string
  status: string
  launchStage: string
  icon?: string
  theme: AppTheme
  metrics: AppMetric[]
  features: AppFeature[]
  gallery: AppGalleryItem[]
  narrative: AppNarrative
  ctas: {
    primary: AppCta
    secondary?: AppCta
    caseStudy?: AppCta
  }
}

type LocalizedAppEntry = Omit<AppEntry, 'href'>

const localizedApps: Record<Locale, LocalizedAppEntry[]> = {
  en: [
    {
      slug: 'overflow',
      name: 'Overflow',
      tagline: 'A calm performance training journal for iPhone.',
      shortDescription:
        'Overflow is a calm performance journal for iPhone. Track workouts, build routines, and measure progress — without the noise.',
      cardDescription:
        'Frictionless workout logging, routine planning, and progress tracking designed with restraint and intention.',
      heroStatement:
        'Train with quiet confidence. Overflow replaces noisy fitness apps with a calm, considered journal that respects your focus.',
      status: 'Featured app',
      launchStage: 'Private beta',
      icon: '/images/apps/overflow/icon.webp',
      theme: {
        accent: '#8B9D83',
        accentSoft: 'rgba(139, 157, 131, 0.14)',
        glow: 'rgba(139, 157, 131, 0.22)',
        surface: 'rgba(255, 255, 255, 0.06)',
        background: '#F8F7F5',
      },
      metrics: [
        { label: 'Focus', value: 'Performance journal' },
        { label: 'Platform', value: 'iPhone' },
        { label: 'State', value: 'Private beta' },
      ],
      features: [
        {
          eyebrow: 'Effortless input',
          title: 'Log without thinking twice.',
          description:
            'Tap, select, done. Overflow removes every unnecessary step between you and your training data.',
        },
        {
          eyebrow: 'Weekly structure',
          title: 'Routines that hold shape.',
          description:
            'Build weekly structures that flex when life does. Your program stays visible, not buried in menus.',
        },
        {
          eyebrow: 'Measured progress',
          title: 'Progress you can feel.',
          description:
            'Weekly volume, personal records, and streaks that mean something. See your trajectory through clean, calm data.',
        },
        {
          eyebrow: 'Quiet reflection',
          title: 'Reflection, not pressure.',
          description:
            'No leaderboards. No guilt mechanics. Just a quiet, considered record of the work you have done.',
        },
      ],
      gallery: [
        {
          eyebrow: 'Today',
          title: 'One calm surface to start every session.',
          description:
            'Your plan, your streak, and your next set — all on one screen with zero decision fatigue.',
          stats: ['Plan', 'Streak', 'Next set'],
        },
        {
          eyebrow: 'Log',
          title: 'Every set, tracked with minimal taps.',
          description:
            'Log weight, reps, and rest intuitively. Overflow learns your patterns so each session starts smarter.',
          stats: ['Weight', 'Reps', 'Rest'],
        },
        {
          eyebrow: 'Progress',
          title: 'See your trajectory, not a dashboard.',
          description:
            'Weekly volume charts, personal records, and consistency streaks presented without noise.',
          stats: ['Volume', 'Records', 'Trends'],
        },
      ],
      narrative: {
        title: 'Why Overflow exists',
        description:
          'Most training apps feel either chaotic or aggressively gamified. Overflow sits in the gap: a calm, structured journal with product discipline underneath.',
        bullets: [
          'Designed for people who train consistently and want a tool that matches their focus.',
          'Every screen is built to reduce friction, not add features for the sake of features.',
          'The interface respects your time — get in, log, and get back to training.',
        ],
      },
      ctas: {
        primary: {
          label: 'Join the beta',
          href: 'https://testflight.apple.com/join/t7jQjsCx',
          external: true,
        },
        secondary: {
          label: 'View all apps',
          href: '/apps',
        },
      },
    },
  ],
  es: [
    {
      slug: 'overflow',
      name: 'Overflow',
      tagline: 'Un diario de entrenamiento calmado para iPhone.',
      shortDescription:
        'Overflow es un diario de rendimiento para iPhone. Registra entrenamientos, construye rutinas y mide progreso sin ruido.',
      cardDescription:
        'Registro de entrenamiento sin fricción, planificación de rutinas y seguimiento de progreso diseñados con contención e intención.',
      heroStatement:
        'Entrena con confianza tranquila. Overflow reemplaza las apps fitness ruidosas por un diario calmado y bien pensado que respeta tu foco.',
      status: 'App destacada',
      launchStage: 'Beta privada',
      icon: '/images/apps/overflow/icon.webp',
      theme: {
        accent: '#8B9D83',
        accentSoft: 'rgba(139, 157, 131, 0.14)',
        glow: 'rgba(139, 157, 131, 0.22)',
        surface: 'rgba(255, 255, 255, 0.06)',
        background: '#F8F7F5',
      },
      metrics: [
        { label: 'Enfoque', value: 'Diario de rendimiento' },
        { label: 'Plataforma', value: 'iPhone' },
        { label: 'Estado', value: 'Beta privada' },
      ],
      features: [
        {
          eyebrow: 'Entrada sin fricción',
          title: 'Registra sin pensarlo dos veces.',
          description:
            'Toca, selecciona, listo. Overflow elimina pasos innecesarios entre tú y tus datos de entrenamiento.',
        },
        {
          eyebrow: 'Estructura semanal',
          title: 'Rutinas que mantienen forma.',
          description:
            'Construye estructuras semanales que se adaptan cuando la vida cambia. Tu programa sigue visible, no enterrado en menús.',
        },
        {
          eyebrow: 'Progreso medible',
          title: 'Progreso que se puede sentir.',
          description:
            'Volumen semanal, récords personales y rachas que significan algo. Ve tu trayectoria con datos limpios y calmados.',
        },
        {
          eyebrow: 'Reflexión tranquila',
          title: 'Reflexión, no presión.',
          description:
            'Sin rankings. Sin mecánicas de culpa. Solo un registro tranquilo y considerado del trabajo que has hecho.',
        },
      ],
      gallery: [
        {
          eyebrow: 'Hoy',
          title: 'Una superficie calmada para empezar cada sesión.',
          description:
            'Tu plan, tu racha y tu siguiente serie, todo en una sola pantalla y sin fatiga de decisión.',
          stats: ['Plan', 'Racha', 'Siguiente serie'],
        },
        {
          eyebrow: 'Registro',
          title: 'Cada serie, registrada con mínimos toques.',
          description:
            'Registra peso, repeticiones y descanso de forma intuitiva. Overflow aprende tus patrones para que cada sesión empiece con más claridad.',
          stats: ['Peso', 'Reps', 'Descanso'],
        },
        {
          eyebrow: 'Progreso',
          title: 'Ve tu trayectoria, no un dashboard.',
          description:
            'Volumen semanal, récords personales y constancia presentados sin ruido.',
          stats: ['Volumen', 'Récords', 'Tendencias'],
        },
      ],
      narrative: {
        title: 'Por qué existe Overflow',
        description:
          'La mayoría de apps de entrenamiento se sienten caóticas o demasiado gamificadas. Overflow vive en el hueco: un diario calmado y estructurado con disciplina de producto por debajo.',
        bullets: [
          'Diseñada para personas que entrenan de forma constante y quieren una herramienta alineada con su foco.',
          'Cada pantalla está construida para reducir fricción, no para añadir funciones por añadir.',
          'La interfaz respeta tu tiempo: entras, registras y vuelves a entrenar.',
        ],
      },
      ctas: {
        primary: {
          label: 'Entrar en la beta',
          href: 'https://testflight.apple.com/join/t7jQjsCx',
          external: true,
        },
        secondary: {
          label: 'Ver todas las apps',
          href: '/apps',
        },
      },
    },
  ],
}

export function getApps(locale: Locale): AppEntry[] {
  return localizedApps[locale].map((app) => ({
    ...app,
    href: localizePath(`/apps/${app.slug}`, locale),
    ctas: {
      ...app.ctas,
      secondary: app.ctas.secondary
        ? {
            ...app.ctas.secondary,
            href: localizePath(app.ctas.secondary.href, locale),
          }
        : undefined,
      caseStudy: app.ctas.caseStudy
        ? {
            ...app.ctas.caseStudy,
            href: localizePath(app.ctas.caseStudy.href, locale),
          }
        : undefined,
    },
  }))
}

export function getAppBySlug(slug: string, locale: Locale): AppEntry | undefined {
  return getApps(locale).find((app) => app.slug === slug)
}
