import type { Locale } from '@/lib/i18n'
import { localizePath } from '@/lib/i18n'

export const serviceSlugs = ['ai-systems', 'automation', 'prototypes', 'brand-systems'] as const

export type ServiceSlug = (typeof serviceSlugs)[number]

interface ServicePageContent {
  slug: ServiceSlug
  navLabel: string
  eyebrow: string
  title: string
  intro: string
  summary: string
  outcomesTitle: string
  outcomes: string[]
  deliverablesTitle: string
  deliverables: string[]
  bestFitTitle: string
  bestFit: string[]
  primaryCta: string
  secondaryCta: string
  secondaryHref: string
}

interface FlagshipOfferContent {
  label: string
  title: string
  description: string
  outcomes: string[]
  focusTitle: string
  focusAreas: string[]
  linkLabel: string
}

interface SupportingCapabilityContent {
  title: string
  eyebrow: string
  description: string
  href: string
  cta: string
}

const serviceContent: Record<
  Locale,
  {
    flagship: FlagshipOfferContent
    pages: Record<ServiceSlug, ServicePageContent>
    capabilities: SupportingCapabilityContent[]
  }
> = {
  en: {
    flagship: {
      label: 'Flagship Offer',
      title: 'AI systems that help modern brand teams move faster without losing control.',
      description:
        'I design applied AI systems for marketing, CRM, content, and creative operations. The goal is not more tooling. It is better execution: clearer handoffs, stronger guardrails, and reusable operating logic.',
      outcomes: [
        'Reduce repetitive execution work',
        'Increase consistency across outputs',
        'Build faster internal decision loops',
        'Turn prompting into reusable systems',
      ],
      focusTitle: 'Typical focus areas',
      focusAreas: ['Marketing operations', 'CRM workflows', 'Content systems', 'Creative operations'],
      linkLabel: 'See AI systems service',
    },
    pages: {
      'ai-systems': {
        slug: 'ai-systems',
        navLabel: 'AI Systems',
        eyebrow: 'Flagship Service',
        title: 'AI Systems',
        intro:
          'For brands that need more speed, consistency, and control across marketing, CRM, content, and creative execution.',
        summary:
          'I design the operating layer around AI: what gets automated, where review happens, how prompts become repeatable inputs, and how the system stays usable for a real team.',
        outcomesTitle: 'Outcomes',
        outcomes: [
          'Reduce repetitive production loops without lowering quality',
          'Create stronger guardrails for tone, structure, and approval',
          'Give teams clearer operating logic instead of prompt chaos',
          'Make iteration faster without rebuilding from zero every time',
        ],
        deliverablesTitle: 'What I typically build',
        deliverables: [
          'System maps and workflow architecture',
          'Prompt structures, review rules, and consistency guardrails',
          'Automation logic, agents, and orchestration layers',
          'Lightweight interfaces or internal surfaces when the system needs one',
        ],
        bestFitTitle: 'Best fit',
        bestFit: [
          'Teams already shipping content, campaigns, or CRM work at pace',
          'Brands with manual handoffs that create friction or inconsistency',
          'Operations that need business logic, not just more AI outputs',
        ],
        primaryCta: 'Start a project',
        secondaryCta: 'View case studies',
        secondaryHref: '/case-studies',
      },
      automation: {
        slug: 'automation',
        navLabel: 'Automation',
        eyebrow: 'Service',
        title: 'Automation',
        intro: 'For teams that know the process is broken but need the fix to feel practical, not theatrical.',
        summary:
          'I design automation layers that remove repetitive coordination work while keeping the important judgment points visible. The result is less admin, cleaner handoffs, and a system people can actually trust.',
        outcomesTitle: 'Outcomes',
        outcomes: [
          'Reduce manual routing and repetitive coordination work',
          'Shorten time between input, decision, and output',
          'Keep approvals and quality checks where they matter',
          'Make automation readable enough to maintain over time',
        ],
        deliverablesTitle: 'What I typically build',
        deliverables: [
          'Automation maps across marketing, CRM, or content workflows',
          'Trigger, review, and fallback logic',
          'Operational guardrails and error handling',
          'Documentation that makes the system easier to run internally',
        ],
        bestFitTitle: 'Best fit',
        bestFit: [
          'Teams copying data between tools by hand',
          'Workflows slowed down by repetitive approval or production steps',
          'Processes that need structure before they need scale',
        ],
        primaryCta: 'Start a project',
        secondaryCta: 'Talk through the workflow',
        secondaryHref: '/#contact',
      },
      prototypes: {
        slug: 'prototypes',
        navLabel: 'Prototypes',
        eyebrow: 'Service',
        title: 'Prototypes & Internal Tools',
        intro: 'For teams that need the AI system to be usable, not just technically possible.',
        summary:
          'When the workflow needs a surface, I design lightweight prototypes and internal tools that turn system logic into something people can actually use, review, and trust.',
        outcomesTitle: 'Outcomes',
        outcomes: [
          'Translate workflow logic into a usable product surface',
          'Reduce friction inside internal operations',
          'Validate ideas quickly before full build-out',
          'Make the system easier to understand across the team',
        ],
        deliverablesTitle: 'What I typically build',
        deliverables: [
          'Clickable prototypes and internal tool concepts',
          'Lean product flows for operator-facing tasks',
          'Interface thinking for review, routing, and decision states',
          'Implementation-ready specs for future expansion',
        ],
        bestFitTitle: 'Best fit',
        bestFit: [
          'Internal workflows that break once multiple people touch them',
          'AI-enabled processes that need a cleaner interface layer',
          'Teams testing a product idea before committing to a full build',
        ],
        primaryCta: 'Start a project',
        secondaryCta: 'See product work',
        secondaryHref: '/apps',
      },
      'brand-systems': {
        slug: 'brand-systems',
        navLabel: 'Brand Systems',
        eyebrow: 'Service',
        title: 'Brand Systems',
        intro: 'For brands that need consistency at scale without flattening the creative edge.',
        summary:
          'I design brand systems, creative direction, and decision rules that make outputs feel coherent across campaigns, content, and product surfaces. This is where business logic meets visual judgment.',
        outcomesTitle: 'Outcomes',
        outcomes: [
          'Increase brand coherence across channels and outputs',
          'Give creative teams clearer decision frameworks',
          'Turn taste into repeatable direction, not subjective drift',
          'Support scaling without losing atmosphere or identity',
        ],
        deliverablesTitle: 'What I typically build',
        deliverables: [
          'Brand logic and visual direction systems',
          'Creative guardrails for campaigns, content, and AI-assisted outputs',
          'Tone, structure, and aesthetic decision rules',
          'Foundations for future extensions and launches',
        ],
        bestFitTitle: 'Best fit',
        bestFit: [
          'Brands growing fast and feeling visually inconsistent',
          'Teams that need clearer creative rules under pressure',
          'Founders who want a more coherent premium presence',
        ],
        primaryCta: 'Start a project',
        secondaryCta: 'View brand case study',
        secondaryHref: '/case-studies/remoria',
      },
    },
    capabilities: [
      {
        title: 'Prototypes & internal tools',
        eyebrow: 'Interfaces · Internal surfaces',
        description:
          'When the system needs a front end, I design prototypes and working surfaces that make the workflow legible for the team using it.',
        href: '/services/prototypes',
        cta: 'See prototypes',
      },
      {
        title: 'Brand systems & creative direction',
        eyebrow: 'Identity · Creative rules',
        description:
          'I build the brand logic and creative guardrails that keep campaigns, content, and AI-assisted outputs coherent at scale.',
        href: '/services/brand-systems',
        cta: 'See brand systems',
      },
      {
        title: 'Photography & visual craft',
        eyebrow: 'Taste · Image judgment',
        description:
          'Photography remains part of the practice as visual discipline: composition, restraint, and the image judgment that strengthens better systems.',
        href: '/photography',
        cta: 'See photography',
      },
    ],
  },
  es: {
    flagship: {
      label: 'Oferta principal',
      title: 'Sistemas de IA para marcas modernas que necesitan ejecutar más rápido sin perder control.',
      description:
        'Diseño sistemas de IA aplicados para marketing, CRM, contenido y operaciones creativas. El objetivo no es sumar más herramientas, sino mejorar la ejecución: handoffs más claros, mejores guardrails y lógica operativa reutilizable.',
      outcomes: [
        'Reducir trabajo repetitivo de ejecución',
        'Aumentar la consistencia entre outputs',
        'Construir bucles internos de decisión más rápidos',
        'Convertir el prompting en sistemas reutilizables',
      ],
      focusTitle: 'Áreas habituales',
      focusAreas: ['Operaciones de marketing', 'Flujos de CRM', 'Sistemas de contenido', 'Operaciones creativas'],
      linkLabel: 'Ver servicio de sistemas de IA',
    },
    pages: {
      'ai-systems': {
        slug: 'ai-systems',
        navLabel: 'Sistemas de IA',
        eyebrow: 'Servicio principal',
        title: 'Sistemas de IA',
        intro:
          'Para marcas que necesitan más velocidad, consistencia y control en marketing, CRM, contenido y ejecución creativa.',
        summary:
          'Diseño la capa operativa alrededor de la IA: qué se automatiza, dónde entra la revisión, cómo los prompts se convierten en inputs repetibles y cómo el sistema sigue siendo usable para un equipo real.',
        outcomesTitle: 'Resultados',
        outcomes: [
          'Reducir bucles repetitivos de producción sin bajar calidad',
          'Crear guardrails más claros para tono, estructura y aprobación',
          'Dar al equipo lógica operativa en lugar de caos de prompts',
          'Acelerar la iteración sin reconstruir desde cero cada vez',
        ],
        deliverablesTitle: 'Qué suelo construir',
        deliverables: [
          'Mapas de sistema y arquitectura de workflow',
          'Estructuras de prompting, reglas de revisión y guardrails de consistencia',
          'Lógica de automatización, agentes y capas de orquestación',
          'Interfaces ligeras o superficies internas cuando el sistema lo necesita',
        ],
        bestFitTitle: 'Encaja mejor con',
        bestFit: [
          'Equipos que ya publican campañas, contenido o trabajo de CRM con ritmo',
          'Marcas con handoffs manuales que generan fricción o inconsistencia',
          'Operaciones que necesitan lógica de negocio, no solo más outputs de IA',
        ],
        primaryCta: 'Empezar un proyecto',
        secondaryCta: 'Ver casos',
        secondaryHref: '/case-studies',
      },
      automation: {
        slug: 'automation',
        navLabel: 'Automatización',
        eyebrow: 'Servicio',
        title: 'Automatización',
        intro:
          'Para equipos que saben que el proceso está roto, pero necesitan que la solución sea práctica y creíble.',
        summary:
          'Diseño capas de automatización que eliminan coordinación repetitiva sin esconder los puntos donde el juicio sigue importando. Menos trabajo administrativo, mejores handoffs y un sistema que el equipo puede entender.',
        outcomesTitle: 'Resultados',
        outcomes: [
          'Reducir routing manual y coordinación repetitiva',
          'Acortar el tiempo entre input, decisión y output',
          'Mantener aprobaciones y controles de calidad donde aportan valor',
          'Hacer la automatización lo bastante legible como para mantenerla',
        ],
        deliverablesTitle: 'Qué suelo construir',
        deliverables: [
          'Mapas de automatización para marketing, CRM o contenido',
          'Lógica de triggers, revisión y fallback',
          'Guardrails operativos y manejo de errores',
          'Documentación que facilite operar el sistema internamente',
        ],
        bestFitTitle: 'Encaja mejor con',
        bestFit: [
          'Equipos que todavía copian información entre herramientas a mano',
          'Workflows frenados por pasos repetitivos de aprobación o producción',
          'Procesos que necesitan estructura antes de necesitar escala',
        ],
        primaryCta: 'Empezar un proyecto',
        secondaryCta: 'Hablar del workflow',
        secondaryHref: '/#contact',
      },
      prototypes: {
        slug: 'prototypes',
        navLabel: 'Prototipos',
        eyebrow: 'Servicio',
        title: 'Prototipos y herramientas internas',
        intro:
          'Para equipos que necesitan que el sistema de IA sea usable, no solo técnicamente posible.',
        summary:
          'Cuando el workflow necesita una superficie, diseño prototipos y herramientas internas que convierten la lógica del sistema en algo que el equipo pueda usar, revisar y entender.',
        outcomesTitle: 'Resultados',
        outcomes: [
          'Traducir la lógica del workflow en una superficie usable',
          'Reducir fricción dentro de la operación interna',
          'Validar ideas con rapidez antes de un build completo',
          'Hacer que el sistema sea más fácil de entender para el equipo',
        ],
        deliverablesTitle: 'Qué suelo construir',
        deliverables: [
          'Prototipos clicables y conceptos de herramientas internas',
          'Flujos de producto ligeros para tareas operativas',
          'Pensamiento de interfaz para revisión, routing y estados de decisión',
          'Specs listas para implementar y escalar después',
        ],
        bestFitTitle: 'Encaja mejor con',
        bestFit: [
          'Workflows internos que se rompen cuando intervienen varias personas',
          'Procesos con IA que necesitan una capa de interfaz más clara',
          'Equipos que quieren validar una idea de producto antes de construirla completa',
        ],
        primaryCta: 'Empezar un proyecto',
        secondaryCta: 'Ver trabajo de producto',
        secondaryHref: '/apps',
      },
      'brand-systems': {
        slug: 'brand-systems',
        navLabel: 'Sistemas de marca',
        eyebrow: 'Servicio',
        title: 'Sistemas de marca',
        intro:
          'Para marcas que necesitan consistencia a escala sin perder criterio creativo.',
        summary:
          'Diseño sistemas de marca, dirección creativa y reglas de decisión que mantienen coherencia entre campañas, contenido y superficies de producto. Aquí se cruzan la lógica de negocio y el juicio visual.',
        outcomesTitle: 'Resultados',
        outcomes: [
          'Aumentar la coherencia de marca entre canales y outputs',
          'Dar al equipo creativo marcos de decisión más claros',
          'Convertir el gusto en dirección repetible, no en deriva subjetiva',
          'Escalar sin perder atmósfera ni identidad',
        ],
        deliverablesTitle: 'Qué suelo construir',
        deliverables: [
          'Lógica de marca y sistemas de dirección visual',
          'Guardrails creativos para campañas, contenido y outputs asistidos por IA',
          'Reglas de tono, estructura y criterio estético',
          'Bases para futuras extensiones y lanzamientos',
        ],
        bestFitTitle: 'Encaja mejor con',
        bestFit: [
          'Marcas en crecimiento que se sienten visualmente inconsistentes',
          'Equipos que necesitan reglas creativas más claras bajo presión',
          'Founders que buscan una presencia premium más coherente',
        ],
        primaryCta: 'Empezar un proyecto',
        secondaryCta: 'Ver caso de marca',
        secondaryHref: '/case-studies/remoria',
      },
    },
    capabilities: [
      {
        title: 'Prototipos y herramientas internas',
        eyebrow: 'Interfaces · Superficies internas',
        description:
          'Cuando el sistema necesita una capa visible, diseño prototipos y superficies funcionales que hacen el workflow legible para el equipo.',
        href: '/services/prototypes',
        cta: 'Ver prototipos',
      },
      {
        title: 'Sistemas de marca y dirección creativa',
        eyebrow: 'Identidad · Reglas creativas',
        description:
          'Construyo la lógica de marca y los guardrails creativos que mantienen campañas, contenido y outputs asistidos por IA dentro de una misma línea.',
        href: '/services/brand-systems',
        cta: 'Ver sistemas de marca',
      },
      {
        title: 'Fotografía y criterio visual',
        eyebrow: 'Gusto · Juicio de imagen',
        description:
          'La fotografía sigue formando parte de la práctica como disciplina visual: composición, contención y criterio de imagen para construir mejores sistemas.',
        href: '/photography',
        cta: 'Ver fotografía',
      },
    ],
  },
}

export function getFlagshipOffer(locale: Locale): FlagshipOfferContent {
  return serviceContent[locale].flagship
}

export function getSupportingCapabilities(locale: Locale): SupportingCapabilityContent[] {
  return serviceContent[locale].capabilities.map((capability) => ({
    ...capability,
    href: localizePath(capability.href, locale),
  }))
}

export function getServicePageData(locale: Locale, slug: ServiceSlug): ServicePageContent {
  return serviceContent[locale].pages[slug]
}

export function isServiceSlug(value: string): value is ServiceSlug {
  return serviceSlugs.includes(value as ServiceSlug)
}
