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

export const apps: AppEntry[] = [
  {
    slug: 'overflow',
    href: '/apps/overflow',
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
]

export function getAppBySlug(slug: string): AppEntry | undefined {
  return apps.find((app) => app.slug === slug)
}
