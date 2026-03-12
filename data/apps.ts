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
    tagline: 'A calmer social planning surface for nights out, shared lists, and group momentum.',
    shortDescription:
      'Overflow is the first product in the new apps archive: a launch-ready interface system for turning scattered plans, saved spots, and group intent into one elegant flow.',
    cardDescription:
      'Product strategy, interface design, and launch-surface thinking brought into one cinematic app experience.',
    heroStatement:
      'Overflow turns group chaos into a considered next move, with a product language designed to feel calm, premium, and unmistakably social.',
    status: 'Featured app',
    launchStage: 'Private beta',
    theme: {
      accent: '#9ad8ca',
      accentSoft: 'rgba(154, 216, 202, 0.18)',
      glow: 'rgba(154, 216, 202, 0.26)',
      surface: 'rgba(255, 255, 255, 0.06)',
      background: '#101716',
    },
    metrics: [
      { label: 'Focus', value: 'Social planning' },
      { label: 'Platform', value: 'iOS-first concept' },
      { label: 'State', value: 'Private beta' },
    ],
    features: [
      {
        eyebrow: 'Shared intent',
        title: 'Plan a night in one calm thread.',
        description:
          'Bring people, places, timing, and mood into a single flow instead of splitting the plan across screenshots, chats, and saved links.',
      },
      {
        eyebrow: 'Curated places',
        title: 'Save what matters before the moment.',
        description:
          'Collect destinations, notes, and atmosphere cues into reusable lists that make decision-making feel fast and deliberate.',
      },
      {
        eyebrow: 'Live momentum',
        title: 'Move from maybe to yes without friction.',
        description:
          'Lightweight signals keep the group aligned so the next stop feels obvious instead of negotiated to death.',
      },
      {
        eyebrow: 'Launch language',
        title: 'Built like a product, presented like a release.',
        description:
          'Overflow is designed as both an app system and a premium landing surface, making the product story feel immediate and real.',
      },
    ],
    gallery: [
      {
        eyebrow: 'Tonight',
        title: 'A live planning surface with just enough structure.',
        description:
          'See the plan, the energy, and the next action at a glance without losing the editorial feel of the product.',
        stats: ['Places', 'Timing', 'People'],
      },
      {
        eyebrow: 'Saved',
        title: 'A personal archive of spots worth returning to.',
        description:
          'Overflow treats places like a taste library, with enough context to remember why each one belongs in the rotation.',
        stats: ['Lists', 'Notes', 'Mood'],
      },
      {
        eyebrow: 'Pulse',
        title: 'Quick context before the group commits.',
        description:
          'Surface the right signals fast so the app supports momentum instead of adding more noise to the decision.',
        stats: ['Signals', 'Context', 'Flow'],
      },
    ],
    narrative: {
      title: 'Why Overflow exists',
      description:
        'Most social planning tools feel either chaotic or aggressively utilitarian. Overflow is positioned in the gap between them: a lifestyle-forward product system with product discipline underneath.',
      bullets: [
        'Editorial framing keeps the product aspirational without drifting into empty concept art.',
        'The interface system is modular enough to scale into saved places, social loops, and launch-era storytelling.',
        'The landing experience mirrors the product itself: premium, intentional, and structured for future releases.',
      ],
    },
    ctas: {
      primary: {
        label: 'Request access',
        href: '/#contact',
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
