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
      slug: 'territoryops-spain',
      name: 'TerritoryOps Spain',
      tagline: 'A private operational atlas for real estate decisions.',
      shortDescription:
        'A local-first internal control console for tracking real estate opportunities across Spain through map, table, and pipeline views.',
      cardDescription:
        'Private atlas and operational console for managing locations, status, follow-up, and deal stage without backend overhead.',
      heroStatement:
        'Turn scattered location research into a structured map, table, and pipeline workflow built for deliberate operational decisions.',
      status: 'Internal tool',
      launchStage: 'Product prototype',
      theme: {
        accent: '#B08A5A',
        accentSoft: 'rgba(176, 138, 90, 0.24)',
        glow: 'rgba(176, 138, 90, 0.2)',
        surface: 'rgba(245, 240, 235, 0.07)',
        background: '#1A1714',
      },
      metrics: [
        { label: 'Model', value: 'Local-first' },
        { label: 'Views', value: 'Map / Table / Pipeline' },
        { label: 'State', value: 'Public prototype' },
      ],
      features: [
        {
          eyebrow: 'Spatial awareness',
          title: 'See the territory.',
          description:
            'A Spain-centered map keeps every location and status visible without turning the tool into a marketplace.',
        },
        {
          eyebrow: 'Operational density',
          title: 'Review the details.',
          description:
            'The table makes follow-ups, values, contacts, warnings, and next actions easy to scan and sort.',
        },
        {
          eyebrow: 'Deal stages',
          title: 'Read the pipeline.',
          description:
            'Status columns separate passive interest, evaluation, negotiation, control, and passed opportunities.',
        },
        {
          eyebrow: 'Attention logic',
          title: 'Know what needs action.',
          description:
            'Overdue dates, missing actions, and negotiating records without contacts become actionable drilldowns.',
        },
      ],
      gallery: [
        {
          eyebrow: 'Map',
          title: 'A private atlas for place-based decisions.',
          description:
            'Location markers, shared filters, and dossier access provide spatial context for an internal operating workflow.',
          stats: ['Spain', 'Status', 'Filters'],
        },
        {
          eyebrow: 'Table',
          title: 'Dense operational review.',
          description:
            'Sortable business fields make the next decision visible without hiding detail behind decorative charts.',
          stats: ['Follow-up', 'Value', 'Contact'],
        },
        {
          eyebrow: 'Pipeline',
          title: 'Intentional stage changes.',
          description:
            'The pipeline supports fast scanning while manual status updates keep deal decisions deliberate.',
          stats: ['Watchlist', 'Negotiating', 'Controlled'],
        },
      ],
      narrative: {
        title: 'Small tool, explicit business logic',
        description:
          'TerritoryOps explores how an internal interface can encode location research, follow-up discipline, and deal-stage logic without becoming overbuilt.',
        bullets: [
          'LocalStorage keeps setup and data sharing friction close to zero while the workflow is validated.',
          'Map, table, and pipeline views answer different questions from one shared dataset.',
          'Import, export, validation, and CI make the prototype portable and technically accountable.',
        ],
      },
      ctas: {
        primary: {
          label: 'Open live prototype',
          href: 'https://territoryops-spain.vercel.app',
          external: true,
        },
        secondary: {
          label: 'Read case study',
          href: '/case-studies/territoryops-spain',
        },
        caseStudy: {
          label: 'Read case study',
          href: '/case-studies/territoryops-spain',
        },
      },
    },
    {
      slug: 'overflow',
      name: 'Overflow',
      tagline: 'A calm performance training journal for iPhone.',
      shortDescription:
        'Overflow is a calm performance journal for iPhone. Track workouts, build routines, and measure progress in one focused place.',
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
            'Log each set with a few taps.',
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
            'Overflow leaves out leaderboards and guilt mechanics. It keeps a quiet record of the training you complete.',
        },
      ],
      gallery: [
        {
          eyebrow: 'Today',
          title: 'One calm surface to start every session.',
          description:
            'Your plan, streak, and next set appear on one screen.',
          stats: ['Plan', 'Streak', 'Next set'],
        },
        {
          eyebrow: 'Log',
          title: 'Every set, tracked with minimal taps.',
          description:
            'Log weight, reps, and rest with minimal taps.',
          stats: ['Weight', 'Reps', 'Rest'],
        },
        {
          eyebrow: 'Progress',
          title: 'See your training trajectory.',
          description:
            'Weekly volume charts, personal records, and consistency streaks presented without noise.',
          stats: ['Volume', 'Records', 'Trends'],
        },
      ],
      narrative: {
        title: 'Why Overflow exists',
        description:
          'Overflow is a calm, structured journal for people who train consistently.',
        bullets: [
          'Designed for people who train consistently and want a tool that matches their focus.',
          'Each screen prioritizes logging and review.',
          'Log the session, then return to training.',
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
      slug: 'territoryops-spain',
      name: 'TerritoryOps Spain',
      tagline: 'Un atlas operativo privado para decisiones inmobiliarias.',
      shortDescription:
        'Una consola interna local-first para controlar oportunidades inmobiliarias en España mediante mapa, tabla y pipeline.',
      cardDescription:
        'Atlas privado y consola operativa para gestionar ubicaciones, estados, seguimientos y fases sin infraestructura de backend.',
      heroStatement:
        'Convierte investigación dispersa de ubicaciones en un flujo estructurado de mapa, tabla y pipeline para decisiones operativas deliberadas.',
      status: 'Herramienta interna',
      launchStage: 'Prototipo de producto',
      theme: {
        accent: '#B08A5A',
        accentSoft: 'rgba(176, 138, 90, 0.24)',
        glow: 'rgba(176, 138, 90, 0.2)',
        surface: 'rgba(245, 240, 235, 0.07)',
        background: '#1A1714',
      },
      metrics: [
        { label: 'Modelo', value: 'Local-first' },
        { label: 'Vistas', value: 'Mapa / Tabla / Pipeline' },
        { label: 'Estado', value: 'Prototipo público' },
      ],
      features: [
        {
          eyebrow: 'Lectura espacial',
          title: 'Ver el territorio.',
          description:
            'Un mapa centrado en España mantiene visibles ubicaciones y estados sin convertir la herramienta en un marketplace.',
        },
        {
          eyebrow: 'Densidad operativa',
          title: 'Revisar el detalle.',
          description:
            'La tabla permite escanear y ordenar seguimientos, valores, contactos, alertas y próximas acciones.',
        },
        {
          eyebrow: 'Fases de operación',
          title: 'Leer el pipeline.',
          description:
            'Las columnas separan interés pasivo, evaluación, negociación, control y oportunidades descartadas.',
        },
        {
          eyebrow: 'Lógica de atención',
          title: 'Saber qué requiere acción.',
          description:
            'Fechas vencidas, acciones ausentes y negociaciones sin contacto se convierten en drilldowns accionables.',
        },
      ],
      gallery: [
        {
          eyebrow: 'Mapa',
          title: 'Un atlas privado para decisiones vinculadas a lugares.',
          description:
            'Marcadores, filtros compartidos y acceso al dossier aportan contexto espacial al flujo interno.',
          stats: ['España', 'Estado', 'Filtros'],
        },
        {
          eyebrow: 'Tabla',
          title: 'Revisión operativa densa.',
          description:
            'Los campos ordenables hacen visible la siguiente decisión sin esconder el detalle tras gráficos decorativos.',
          stats: ['Seguimiento', 'Valor', 'Contacto'],
        },
        {
          eyebrow: 'Pipeline',
          title: 'Cambios de fase intencionales.',
          description:
            'El pipeline acelera la lectura mientras los cambios manuales mantienen deliberadas las decisiones.',
          stats: ['Watchlist', 'Negociando', 'Controlado'],
        },
      ],
      narrative: {
        title: 'Herramienta pequeña, lógica de negocio explícita',
        description:
          'TerritoryOps explora cómo una interfaz interna puede codificar investigación de ubicaciones, disciplina de seguimiento y fases sin sobredimensionarse.',
        bullets: [
          'LocalStorage reduce casi a cero la fricción de configuración y compartición mientras se valida el flujo.',
          'Mapa, tabla y pipeline responden preguntas distintas desde un único conjunto de datos.',
          'Importación, exportación, validación y CI hacen el prototipo portable y técnicamente responsable.',
        ],
      },
      ctas: {
        primary: {
          label: 'Abrir prototipo',
          href: 'https://territoryops-spain.vercel.app',
          external: true,
        },
        secondary: {
          label: 'Leer caso de estudio',
          href: '/case-studies/territoryops-spain',
        },
        caseStudy: {
          label: 'Leer caso de estudio',
          href: '/case-studies/territoryops-spain',
        },
      },
    },
    {
      slug: 'overflow',
      name: 'Overflow',
      tagline: 'Un diario de entrenamiento claro para iPhone.',
      shortDescription:
        'Overflow es un diario de entrenamiento para iPhone. Registra sesiones, crea rutinas y mide tu progreso en un mismo lugar.',
      cardDescription:
        'Registro de entrenamiento sin fricción, planificación de rutinas y seguimiento de progreso diseñados con contención e intención.',
      heroStatement:
        'Entrena con claridad. Overflow sustituye las apps de fitness ruidosas por un diario pensado para respetar tu foco.',
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
            'Registra cada serie con pocos toques.',
        },
        {
          eyebrow: 'Estructura semanal',
          title: 'Rutinas que mantienen su forma.',
          description:
            'Construye estructuras semanales que se adaptan cuando la vida cambia. Tu programa sigue visible, no enterrado en menús.',
        },
        {
          eyebrow: 'Progreso medible',
          title: 'Progreso que se nota.',
          description:
            'Volumen semanal, récords personales y rachas que significan algo. Ve tu trayectoria con datos limpios y fáciles de leer.',
        },
        {
          eyebrow: 'Reflexión tranquila',
          title: 'Reflexión, no presión.',
          description:
            'Overflow deja fuera los rankings y las mecánicas de culpa. Mantiene un registro tranquilo de tu entrenamiento.',
        },
      ],
      gallery: [
        {
          eyebrow: 'Hoy',
          title: 'Una superficie clara para empezar cada sesión.',
          description:
            'Tu plan, tu racha y tu siguiente serie aparecen en una sola pantalla.',
          stats: ['Plan', 'Racha', 'Siguiente serie'],
        },
        {
          eyebrow: 'Registro',
          title: 'Cada serie, registrada con mínimos toques.',
          description:
            'Registra peso, repeticiones y descanso con pocos toques.',
          stats: ['Peso', 'Reps', 'Descanso'],
        },
        {
          eyebrow: 'Progreso',
          title: 'Sigue tu trayectoria de entrenamiento.',
          description:
            'Volumen semanal, récords personales y constancia presentados sin ruido.',
          stats: ['Volumen', 'Récords', 'Tendencias'],
        },
      ],
      narrative: {
        title: 'Por qué existe Overflow',
        description:
          'Overflow es un diario claro y estructurado para personas que entrenan de forma constante.',
        bullets: [
          'Diseñada para personas que entrenan de forma constante y quieren una herramienta alineada con su foco.',
          'Cada pantalla prioriza el registro y la revisión.',
          'Registra la sesión y vuelve a entrenar.',
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
