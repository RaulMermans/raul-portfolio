import type { Locale } from '@/lib/i18n'

export type ServiceLanding = {
  slug: string
  locale: Locale
  href: string
  alternateHref: string
  title: string
  eyebrow: string
  description: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  tags: string[]
  answer: string
  problems: Array<{
    title: string
    body: string
  }>
  deliverables: Array<{
    title: string
    body: string
  }>
  useCases: string[]
  process: Array<{
    step: string
    title: string
    body: string
  }>
  relatedCaseStudies: string[]
  faqs: Array<{
    question: string
    answer: string
  }>
  cta: {
    title: string
    body: string
    emailLabel: string
    linkedinLabel: string
  }
}

const englishLandings: ServiceLanding[] = [
  {
    slug: 'ai-integrations',
    locale: 'en',
    href: '/en/services/ai-integrations',
    alternateHref: '/services/integraciones-ia',
    title: 'AI Integrations for Creative Systems',
    eyebrow: 'Creative AI Systems',
    description:
      'I design AI integrations that turn creative processes into structured systems: mapped workflows, prompt logic, review criteria, automation layers, and internal tools that help teams move faster without losing taste or brand coherence.',
    metaTitle: 'AI Integrations for Creative Systems — Raúl Mermans',
    metaDescription:
      'AI integrations for creative teams, brand workflows, content systems, and campaign execution. Build internal tools and AI workflows with taste, control, and review.',
    keywords: [
      'AI integrations for creative teams',
      'creative AI systems',
      'brand workflow automation',
      'internal AI tools',
    ],
    tags: ['Workflow Logic', 'Human Review', 'Brand Guardrails'],
    answer:
      'AI integrations for creative systems are structured workflows, tools, and automation layers that help teams use AI inside real brand, content, campaign, and visual processes. The goal is not to replace creative judgment, but to make repeatable creative work faster, more consistent, and easier to review.',
    problems: [
      {
        title: 'Inconsistent outputs',
        body: 'Different people, prompts, and tools produce work that is difficult to compare or reuse.',
      },
      {
        title: 'Improvised prompting',
        body: 'Prompting is treated as a one-off activity instead of a documented system with clear inputs.',
      },
      {
        title: 'Static brand rules',
        body: 'Guidelines live in documents but do not shape the workflow where content is actually produced.',
      },
      {
        title: 'Late creative review',
        body: 'Quality, brand fit, and factual checks happen after too much work has already been generated.',
      },
      {
        title: 'Speed without control',
        body: 'Teams create more variations, but lose continuity, ownership, and confidence in the output.',
      },
    ],
    deliverables: [
      {
        title: 'Creative workflow maps',
        body: 'A clear view of inputs, decisions, handoffs, review points, and repeatable production loops.',
      },
      {
        title: 'Prompt and input systems',
        body: 'Reusable structures that separate stable creative direction from controlled variables.',
      },
      {
        title: 'Review guardrails',
        body: 'Criteria for brand fit, quality, evidence, and the points where human judgment stays essential.',
      },
      {
        title: 'Lightweight internal tools',
        body: 'Focused interfaces that make the workflow usable without turning it into a large software project.',
      },
      {
        title: 'Campaign and content workflows',
        body: 'AI-assisted systems for generating, comparing, reviewing, and handing off creative outputs.',
      },
      {
        title: 'Documentation and handover',
        body: 'Practical guidance for operating, maintaining, and extending the system after delivery.',
      },
    ],
    useCases: [
      'AI-assisted campaign generation',
      'Brand-safe content workflows',
      'Creative review systems',
      'Internal AI tools for content teams',
      'Controlled visual variation',
      'Creative-team AI adoption',
    ],
    process: [
      {
        step: '01',
        title: 'Map the creative process',
        body: 'Document the current flow, the people involved, the decisions that matter, and where work slows down.',
      },
      {
        step: '02',
        title: 'Define system logic',
        body: 'Decide where AI adds leverage, which inputs need structure, and where people review or approve.',
      },
      {
        step: '03',
        title: 'Prototype the workflow',
        body: 'Build the smallest useful tool or automation layer and test it against representative work.',
      },
      {
        step: '04',
        title: 'Add guardrails and handover',
        body: 'Refine quality criteria, failure handling, documentation, and ownership for day-to-day use.',
      },
    ],
    relatedCaseStudies: ['ai-sports', 'remoria', 'website-auditor', 'raul-portfolio'],
    faqs: [
      {
        question: 'What is an AI integration for a creative team?',
        answer:
          'It is a structured connection between a creative process and AI capabilities. It can include mapped inputs, prompt logic, tool connections, review steps, an interface, and clear rules for what the system may or may not produce.',
      },
      {
        question: 'How is this different from prompt engineering?',
        answer:
          'Prompt engineering focuses on model instructions. An AI integration also covers process design, data and tool inputs, user experience, review criteria, failure handling, and how the system fits into real team responsibilities.',
      },
      {
        question: 'Can you build internal AI tools for brand or content teams?',
        answer:
          'Yes. The usual focus is a lightweight, task-specific interface that makes a defined workflow easier to run, review, and maintain.',
      },
      {
        question: 'Do these systems replace creative people?',
        answer:
          'No. The systems are designed to reduce repetitive work and make options easier to evaluate while keeping direction, selection, editing, and approval with people.',
      },
      {
        question: 'What tools do you use?',
        answer:
          'The stack depends on the workflow. It may combine model APIs, automation platforms, structured data, lightweight web interfaces, and the tools the team already uses.',
      },
      {
        question: 'What do you need to start?',
        answer:
          'A useful starting point is one concrete process, examples of current inputs and outputs, the people involved, and a clear description of where quality or speed breaks down.',
      },
      {
        question: 'How long does a first prototype usually take?',
        answer:
          'Timing depends on scope, integrations, and access to representative material. A first phase is deliberately narrow so the workflow can be tested before committing to a larger build.',
      },
    ],
    cta: {
      title: 'Have a creative system worth extending?',
      body: 'Send a short note with the process, tool, workflow, or brand system you want to improve with AI. I’ll review the context and suggest the clearest next step.',
      emailLabel: 'Send Creative Systems Brief',
      linkedinLabel: 'Connect on LinkedIn',
    },
  },
  {
    slug: 'creative-automation',
    locale: 'en',
    href: '/en/services/creative-automation',
    alternateHref: '/services/automatizacion-creativa',
    title: 'Creative Automation & Internal Tools',
    eyebrow: 'Creative Operations',
    description:
      'I build automation layers and internal tools for creative workflows: content production, research, asset handling, review loops, and team coordination. The goal is cleaner execution without removing human judgment.',
    metaTitle: 'Creative Automation and Internal Tools — Raúl Mermans',
    metaDescription:
      'Automation layers and internal tools for creative workflows, content production, asset handling, research, and team coordination.',
    keywords: [
      'creative automation',
      'internal tools for creative teams',
      'content workflow automation',
      'creative operations systems',
    ],
    tags: ['Tool Connections', 'Production Flows', 'Review Checkpoints'],
    answer:
      'Creative automation is the use of structured workflows, connected tools, and AI-assisted systems to reduce repetitive production tasks while keeping creative judgment visible. It helps teams move from manual handoffs and scattered tools to repeatable processes that support better output.',
    problems: [
      {
        title: 'Manual tool transfers',
        body: 'Teams repeatedly copy briefs, references, status updates, and content between disconnected tools.',
      },
      {
        title: 'Scattered production context',
        body: 'Assets, feedback, approvals, and source material are difficult to find or reconcile.',
      },
      {
        title: 'Coordination delays',
        body: 'Creative work waits on avoidable handoffs, status checks, and repeated administrative steps.',
      },
      {
        title: 'Repetition drains judgment',
        body: 'Skilled people spend time formatting, routing, and organizing work instead of improving it.',
      },
      {
        title: 'Rigid automation',
        body: 'Generic automations fail because they ignore exceptions, review, and the way creative teams actually work.',
      },
    ],
    deliverables: [
      {
        title: 'Automation maps',
        body: 'A practical model of triggers, actions, decisions, exceptions, owners, and review points.',
      },
      {
        title: 'Trigger and handoff logic',
        body: 'Reliable movement of information and assets between people, tools, and production stages.',
      },
      {
        title: 'Internal dashboards',
        body: 'Focused interfaces for monitoring work, reviewing outputs, and acting on the next decision.',
      },
      {
        title: 'Asset and content systems',
        body: 'Structured flows for briefs, files, metadata, versions, approvals, and final delivery.',
      },
      {
        title: 'Research automations',
        body: 'Collection and synthesis workflows that preserve sources and prepare material for human interpretation.',
      },
      {
        title: 'Maintenance documentation',
        body: 'Clear operating notes, ownership, failure cases, and guidance for future changes.',
      },
    ],
    useCases: [
      'Campaign asset coordination',
      'Content briefing workflows',
      'Research collection and synthesis',
      'Creative approval pipelines',
      'Internal production dashboards',
      'AI-assisted content operations',
    ],
    process: [
      {
        step: '01',
        title: 'Identify the repeatable loop',
        body: 'Find the recurring production cycle, its bottlenecks, and the information it needs to move.',
      },
      {
        step: '02',
        title: 'Separate automation from judgment',
        body: 'Define which steps are deterministic and which require context, taste, or approval.',
      },
      {
        step: '03',
        title: 'Connect tools and handoffs',
        body: 'Design the triggers, states, exceptions, and interfaces that keep the process understandable.',
      },
      {
        step: '04',
        title: 'Test and document',
        body: 'Run representative work through the system, refine edge cases, and prepare the operating guide.',
      },
    ],
    relatedCaseStudies: ['ai-sports', 'data-brief-ai', 'website-auditor', 'benchmark-dashboard'],
    faqs: [
      {
        question: 'What is creative automation?',
        answer:
          'Creative automation structures repetitive production and coordination tasks across tools while keeping the decisions that require context, taste, or accountability with people.',
      },
      {
        question: 'What creative tasks should not be automated?',
        answer:
          'Direction, sensitive editorial choices, final quality judgment, and decisions with reputational impact should remain clearly owned by people. Automation should prepare and route work, not hide responsibility.',
      },
      {
        question: 'Can you connect existing tools?',
        answer:
          'Yes, when those tools expose suitable APIs, webhooks, exports, or other reliable integration points. The design starts from the workflow rather than forcing a specific platform.',
      },
      {
        question: 'Can this work for small teams?',
        answer:
          'Yes. Small teams often benefit from focused systems that remove repeated coordination without introducing a large operational platform.',
      },
      {
        question: 'What platforms do you use?',
        answer:
          'The choice depends on the required control, volume, and maintenance model. A project may use automation platforms, custom scripts, model APIs, databases, or a lightweight web interface.',
      },
      {
        question: 'How do you keep quality control?',
        answer:
          'The workflow includes explicit review states, source visibility, validation rules, and clear failure paths so automation cannot silently become approval.',
      },
      {
        question: 'What does a first project include?',
        answer:
          'A focused first project normally includes process mapping, system logic, one working production loop, representative testing, and documentation for the people who will use it.',
      },
    ],
    cta: {
      title: 'Have a creative system worth extending?',
      body: 'Send a short note with the process, tool, workflow, or brand system you want to improve with AI. I’ll review the context and suggest the clearest next step.',
      emailLabel: 'Send Creative Systems Brief',
      linkedinLabel: 'Connect on LinkedIn',
    },
  },
  {
    slug: 'brand-systems',
    locale: 'en',
    href: '/en/services/brand-systems',
    alternateHref: '/services/sistemas-de-marca',
    title: 'Brand Intelligence Systems',
    eyebrow: 'Brand Systems',
    description:
      'I translate brand strategy into usable systems: tone rules, creative criteria, prompt structures, review logic, and workflow guidelines that help AI-assisted outputs stay coherent.',
    metaTitle: 'Brand Intelligence Systems for AI-Assisted Creative Work — Raúl Mermans',
    metaDescription:
      'Brand intelligence systems, tone rules, prompt structures, and review criteria for AI-assisted content, campaigns, and visual workflows.',
    keywords: [
      'brand intelligence systems',
      'AI brand guidelines',
      'brand prompt systems',
      'creative review frameworks',
    ],
    tags: ['Brand Logic', 'Prompt Structures', 'Review Criteria'],
    answer:
      'A brand intelligence system turns brand strategy into operational rules that can guide content, campaigns, visual production, and AI-assisted workflows. It helps teams evaluate whether an output sounds, looks, and behaves like the brand before it reaches the public.',
    problems: [
      {
        title: 'Static guidelines',
        body: 'Brand documents describe principles but do not help teams make decisions inside production workflows.',
      },
      {
        title: 'Generic AI language',
        body: 'Generated content defaults to familiar patterns that flatten the brand’s voice and point of view.',
      },
      {
        title: 'Different interpretations',
        body: 'Teams apply tone, messaging, and visual criteria inconsistently across formats and markets.',
      },
      {
        title: 'Campaign drift',
        body: 'A strong initial direction becomes diluted as more channels, assets, and contributors are added.',
      },
      {
        title: 'Subjective review',
        body: 'Feedback relies on personal preference because shared evaluation criteria are missing.',
      },
    ],
    deliverables: [
      {
        title: 'Brand logic maps',
        body: 'A structured view of positioning, audience, narrative, principles, tensions, and distinctive choices.',
      },
      {
        title: 'Tone and voice rules',
        body: 'Usable language patterns, boundaries, examples, and anti-patterns for content production.',
      },
      {
        title: 'Prompt structures',
        body: 'Reusable instruction systems that carry brand context into repeatable AI-assisted tasks.',
      },
      {
        title: 'Review scorecards',
        body: 'Shared criteria for evaluating brand fit, clarity, distinctiveness, and execution quality.',
      },
      {
        title: 'Visual and content guardrails',
        body: 'Rules that protect consistency while leaving enough space for creative variation.',
      },
      {
        title: 'Campaign consistency frameworks',
        body: 'A practical system for maintaining a coherent idea across channels, assets, and production teams.',
      },
    ],
    useCases: [
      'AI-assisted brand content',
      'Campaign tone systems',
      'Product storytelling rules',
      'Luxury and culture-led guidelines',
      'Creative review frameworks',
      'Brand-safe generative workflows',
    ],
    process: [
      {
        step: '01',
        title: 'Extract the brand logic',
        body: 'Identify the strategic choices, cultural cues, tone, and creative tensions that make the brand distinct.',
      },
      {
        step: '02',
        title: 'Translate strategy into rules',
        body: 'Turn principles into examples, boundaries, input structures, and criteria that can guide production.',
      },
      {
        step: '03',
        title: 'Build prompt and review systems',
        body: 'Create reusable tools for generating and evaluating work across relevant formats.',
      },
      {
        step: '04',
        title: 'Test and refine guardrails',
        body: 'Run representative outputs through the system and adjust where the rules are vague or restrictive.',
      },
    ],
    relatedCaseStudies: ['remoria', 'ai-sports', 'raul-portfolio'],
    faqs: [
      {
        question: 'What is a brand intelligence system?',
        answer:
          'It is an operational layer that turns brand strategy into rules, examples, prompts, and review criteria that teams can use while creating and evaluating work.',
      },
      {
        question: 'How is this different from brand guidelines?',
        answer:
          'Traditional guidelines document identity. A brand intelligence system focuses on applying that identity inside recurring decisions, workflows, AI tools, and review processes.',
      },
      {
        question: 'Can this help with AI-generated content?',
        answer:
          'Yes. It gives AI-assisted tasks better context and gives people a shared way to assess whether outputs are specific, credible, and aligned with the brand.',
      },
      {
        question: 'Can you work with an existing brand identity?',
        answer:
          'Yes. The work can extend an existing strategy and identity by translating it into more usable production and review logic.',
      },
      {
        question: 'What does the final system include?',
        answer:
          'The exact format depends on the team, but it can include a logic map, tone rules, prompt structures, examples, scorecards, visual criteria, and workflow guidance.',
      },
      {
        question: 'Is this useful for luxury or culture-led brands?',
        answer:
          'Yes. Those brands often depend on nuance, restraint, references, and consistency, which makes explicit creative logic especially useful when production scales.',
      },
      {
        question: 'How do teams use it day to day?',
        answer:
          'Teams use the system to prepare briefs, structure AI inputs, compare options, give clearer feedback, and approve work against shared criteria.',
      },
    ],
    cta: {
      title: 'Have a creative system worth extending?',
      body: 'Send a short note with the process, tool, workflow, or brand system you want to improve with AI. I’ll review the context and suggest the clearest next step.',
      emailLabel: 'Send Creative Systems Brief',
      linkedinLabel: 'Connect on LinkedIn',
    },
  },
  {
    slug: 'product-prototypes',
    locale: 'en',
    href: '/en/services/product-prototypes',
    alternateHref: '/services/prototipos-producto-ia',
    title: 'AI Product Prototypes & Internal Tools',
    eyebrow: 'Product Prototyping',
    description:
      'I design and build lightweight product surfaces, dashboards, and internal tools that make AI workflows usable. The goal is to test system logic quickly before investing in full-scale development.',
    metaTitle: 'AI Product Prototypes and Internal Tools — Raúl Mermans',
    metaDescription:
      'Fast product prototypes, internal tools, dashboards, and AI-powered workflow surfaces for testing service ideas and system logic.',
    keywords: [
      'AI product prototypes',
      'internal tool prototypes',
      'AI workflow interfaces',
      'dashboard prototyping',
    ],
    tags: ['Product Logic', 'Interface Design', 'MVP Validation'],
    answer:
      'AI product prototypes are focused interfaces or tools that make an AI workflow usable, testable, and easier to evaluate. They help teams move from abstract ideas to working systems with clear inputs, outputs, review points, and user flows.',
    problems: [
      {
        title: 'Abstract AI ideas',
        body: 'Teams discuss capabilities without a concrete workflow that users and stakeholders can evaluate.',
      },
      {
        title: 'Invisible system logic',
        body: 'Inputs, outputs, decisions, and review points stay unclear until an interface makes them tangible.',
      },
      {
        title: 'Demo-only experiences',
        body: 'A technical demonstration may look impressive while remaining difficult to operate or understand.',
      },
      {
        title: 'Improvised internal tools',
        body: 'Important workflows rely on scattered forms, spreadsheets, scripts, and undocumented workarounds.',
      },
      {
        title: 'Slow stakeholder alignment',
        body: 'People need a realistic surface to react to before committing budget and engineering effort.',
      },
    ],
    deliverables: [
      {
        title: 'Product surface prototypes',
        body: 'Focused user flows that make the core value, decisions, and interaction model concrete.',
      },
      {
        title: 'Workflow dashboards',
        body: 'Interfaces for reviewing inputs, system status, generated outputs, evidence, and next actions.',
      },
      {
        title: 'Internal tool interfaces',
        body: 'Purpose-built surfaces for repeatable tasks that do not need a full commercial product.',
      },
      {
        title: 'AI audit and report tools',
        body: 'Evidence-aware interfaces that structure analysis, synthesis, review, and export.',
      },
      {
        title: 'Input and output logic',
        body: 'Defined states, validations, decisions, and failure handling behind the visible interface.',
      },
      {
        title: 'Technical documentation',
        body: 'A clear record of assumptions, architecture, limitations, and sensible next development steps.',
      },
    ],
    useCases: [
      'Internal AI tool prototypes',
      'Campaign workflow dashboards',
      'Evidence-first audit interfaces',
      'AI reporting tools',
      'Stakeholder demonstrations',
      'MVP validation',
    ],
    process: [
      {
        step: '01',
        title: 'Define the user and workflow',
        body: 'Clarify who uses the tool, what they are trying to decide, and the smallest valuable flow.',
      },
      {
        step: '02',
        title: 'Map inputs and outputs',
        body: 'Define data, model behavior, decisions, review states, errors, and expected results.',
      },
      {
        step: '03',
        title: 'Build the prototype surface',
        body: 'Create a focused interface that makes the system logic usable and credible.',
      },
      {
        step: '04',
        title: 'Test and prepare the next step',
        body: 'Refine the workflow with representative use and document what production development would require.',
      },
    ],
    relatedCaseStudies: ['data-brief-ai', 'website-auditor', 'benchmark-dashboard', 'raul-portfolio'],
    faqs: [
      {
        question: 'What is an AI product prototype?',
        answer:
          'It is a focused working interface that tests how people interact with an AI-assisted workflow, including inputs, outputs, review points, and failure states.',
      },
      {
        question: 'How is this different from a full SaaS product?',
        answer:
          'A prototype deliberately limits scope to validate the core workflow and product logic. It does not imply the infrastructure, scale, support, or operational maturity of a production SaaS platform.',
      },
      {
        question: 'Can you build the interface as well as the logic?',
        answer:
          'Yes. The work connects interface design with the underlying workflow so the prototype tests the complete experience rather than a disconnected screen concept.',
      },
      {
        question: 'What stack do you use?',
        answer:
          'The stack is chosen around speed, maintainability, and the existing environment. Typical builds use modern web frameworks, APIs, structured data, and fit-for-purpose automation or model services.',
      },
      {
        question: 'Can this become a production product later?',
        answer:
          'Yes, if the prototype validates the workflow. The handover identifies which parts can be retained and which need stronger architecture, security, observability, or scale.',
      },
      {
        question: 'What do you need to start?',
        answer:
          'A defined user, a concrete task, representative inputs, the desired output, and the decisions the interface should help someone make.',
      },
      {
        question: 'What does a prototype include?',
        answer:
          'It typically includes the core user flow, working input and output states, relevant model or automation logic, review behavior, representative testing, and next-step documentation.',
      },
    ],
    cta: {
      title: 'Have a creative system worth extending?',
      body: 'Send a short note with the process, tool, workflow, or brand system you want to improve with AI. I’ll review the context and suggest the clearest next step.',
      emailLabel: 'Send Creative Systems Brief',
      linkedinLabel: 'Connect on LinkedIn',
    },
  },
]

const spanishLandings: ServiceLanding[] = [
  {
    slug: 'integraciones-ia',
    locale: 'es',
    href: '/services/integraciones-ia',
    alternateHref: '/en/services/ai-integrations',
    title: 'Integraciones IA para Sistemas Creativos',
    eyebrow: 'Sistemas Creativos con IA',
    description:
      'Diseño integraciones de IA que convierten procesos creativos en sistemas estructurados: flujos mapeados, lógica de prompts, criterios de revisión, capas de automatización y herramientas internas para avanzar más rápido sin perder criterio ni coherencia de marca.',
    metaTitle: 'Integraciones IA para Sistemas Creativos — Raúl Mermans',
    metaDescription:
      'Integraciones de IA para equipos creativos, flujos de marca, sistemas de contenido y ejecución de campañas con criterio, control y revisión.',
    keywords: [
      'integraciones IA para equipos creativos',
      'sistemas creativos con IA',
      'automatización de flujos de marca',
      'herramientas internas con IA',
    ],
    tags: ['Lógica de Flujo', 'Revisión Humana', 'Límites de Marca'],
    answer:
      'Las integraciones de IA para sistemas creativos son flujos, herramientas y capas de automatización estructuradas para usar IA dentro de procesos reales de marca, contenido, campaña e imagen. No buscan sustituir el criterio creativo, sino hacer el trabajo repetible más rápido, coherente y fácil de revisar.',
    problems: [
      {
        title: 'Resultados inconsistentes',
        body: 'Personas, prompts y herramientas distintas producen piezas difíciles de comparar, repetir o reutilizar.',
      },
      {
        title: 'Prompts improvisados',
        body: 'El prompting se trata como una acción aislada y no como un sistema documentado con inputs claros.',
      },
      {
        title: 'Reglas de marca estáticas',
        body: 'Las guías viven en documentos, pero no intervienen en el flujo donde se produce el contenido.',
      },
      {
        title: 'Revisión demasiado tarde',
        body: 'La calidad, el ajuste de marca y la verificación llegan después de generar demasiado trabajo.',
      },
      {
        title: 'Velocidad sin control',
        body: 'El equipo crea más variantes, pero pierde continuidad, responsabilidad y confianza en el resultado.',
      },
    ],
    deliverables: [
      {
        title: 'Mapas de flujo creativo',
        body: 'Una visión clara de inputs, decisiones, traspasos, puntos de revisión y ciclos repetibles.',
      },
      {
        title: 'Sistemas de prompts e inputs',
        body: 'Estructuras reutilizables que separan la dirección estable de las variables controladas.',
      },
      {
        title: 'Criterios y límites',
        body: 'Reglas para revisar marca, calidad, evidencia y los puntos donde el criterio humano es esencial.',
      },
      {
        title: 'Herramientas internas ligeras',
        body: 'Interfaces enfocadas que hacen usable el flujo sin convertirlo en un gran proyecto de software.',
      },
      {
        title: 'Flujos de campaña y contenido',
        body: 'Sistemas para generar, comparar, revisar y entregar resultados creativos asistidos por IA.',
      },
      {
        title: 'Documentación y entrega',
        body: 'Guía práctica para operar, mantener y ampliar el sistema después del proyecto.',
      },
    ],
    useCases: [
      'Generación de campañas asistida por IA',
      'Flujos de contenido alineados con marca',
      'Sistemas de revisión creativa',
      'Herramientas internas para contenido',
      'Variación visual controlada',
      'Adopción de IA en equipos creativos',
    ],
    process: [
      {
        step: '01',
        title: 'Mapear el proceso creativo',
        body: 'Documentar el flujo actual, las personas, las decisiones importantes y los puntos de fricción.',
      },
      {
        step: '02',
        title: 'Definir la lógica',
        body: 'Decidir dónde aporta la IA, qué inputs necesitan estructura y dónde revisan o aprueban las personas.',
      },
      {
        step: '03',
        title: 'Prototipar el flujo',
        body: 'Construir la herramienta o capa mínima útil y probarla con trabajo representativo.',
      },
      {
        step: '04',
        title: 'Añadir límites y entrega',
        body: 'Afinar criterios de calidad, gestión de fallos, documentación y responsabilidad de uso.',
      },
    ],
    relatedCaseStudies: ['ai-sports', 'remoria', 'website-auditor', 'raul-portfolio'],
    faqs: [
      {
        question: '¿Qué es una integración de IA para un equipo creativo?',
        answer:
          'Es una conexión estructurada entre un proceso creativo y capacidades de IA. Puede incluir inputs definidos, lógica de prompts, conexiones entre herramientas, revisión, una interfaz y límites claros.',
      },
      {
        question: '¿En qué se diferencia de la ingeniería de prompts?',
        answer:
          'La ingeniería de prompts se centra en las instrucciones al modelo. Una integración también cubre proceso, datos, herramientas, experiencia de uso, criterios de revisión, fallos y responsabilidades del equipo.',
      },
      {
        question: '¿Puedes crear herramientas internas para marca o contenido?',
        answer:
          'Sí. El enfoque suele ser una interfaz ligera y específica que haga un flujo definido más fácil de ejecutar, revisar y mantener.',
      },
      {
        question: '¿Estos sistemas sustituyen a perfiles creativos?',
        answer:
          'No. Reducen trabajo repetitivo y facilitan evaluar opciones, mientras que dirección, selección, edición y aprobación siguen en manos de personas.',
      },
      {
        question: '¿Qué herramientas utilizas?',
        answer:
          'Depende del flujo. Se pueden combinar APIs de modelos, plataformas de automatización, datos estructurados, interfaces web ligeras y herramientas ya presentes en el equipo.',
      },
      {
        question: '¿Qué necesitas para empezar?',
        answer:
          'Un buen punto de partida es un proceso concreto, ejemplos de inputs y resultados actuales, las personas implicadas y dónde se rompe la calidad o la velocidad.',
      },
      {
        question: '¿Cuánto tarda un primer prototipo?',
        answer:
          'Depende del alcance, las integraciones y el acceso a material representativo. La primera fase se mantiene acotada para validar el flujo antes de ampliar la inversión.',
      },
    ],
    cta: {
      title: '¿Tienes un sistema creativo que merece desarrollarse?',
      body: 'Envía una nota breve con el proceso, herramienta, flujo o sistema de marca que quieres mejorar con IA. Revisaré el contexto y te propondré el siguiente paso más claro.',
      emailLabel: 'Enviar brief creativo',
      linkedinLabel: 'Conectar en LinkedIn',
    },
  },
  {
    slug: 'automatizacion-creativa',
    locale: 'es',
    href: '/services/automatizacion-creativa',
    alternateHref: '/en/services/creative-automation',
    title: 'Automatización Creativa y Herramientas Internas',
    eyebrow: 'Operaciones Creativas',
    description:
      'Construyo capas de automatización y herramientas internas para producción de contenido, investigación, gestión de assets, ciclos de revisión y coordinación de equipos. El objetivo es ejecutar mejor sin ocultar el criterio humano.',
    metaTitle: 'Automatización Creativa y Herramientas Internas — Raúl Mermans',
    metaDescription:
      'Capas de automatización y herramientas internas para flujos creativos, producción de contenido, assets, investigación y coordinación de equipos.',
    keywords: [
      'automatización creativa',
      'herramientas internas para equipos creativos',
      'automatización de contenido',
      'sistemas de operaciones creativas',
    ],
    tags: ['Conexión de Herramientas', 'Flujos de Producción', 'Revisión'],
    answer:
      'La automatización creativa utiliza flujos estructurados, herramientas conectadas y sistemas asistidos por IA para reducir tareas repetitivas de producción sin esconder el criterio creativo. Ayuda a pasar de traspasos manuales y herramientas dispersas a procesos repetibles que mejoran la ejecución.',
    problems: [
      {
        title: 'Traspasos manuales',
        body: 'El equipo copia briefs, referencias, estados y contenido entre herramientas desconectadas.',
      },
      {
        title: 'Contexto disperso',
        body: 'Assets, feedback, aprobaciones y fuentes son difíciles de localizar y reconciliar.',
      },
      {
        title: 'Retrasos de coordinación',
        body: 'El trabajo creativo espera por traspasos, comprobaciones y pasos administrativos evitables.',
      },
      {
        title: 'Repetición sin valor',
        body: 'Perfiles especializados dedican tiempo a formatear, ordenar y enrutar en vez de mejorar el trabajo.',
      },
      {
        title: 'Automatización rígida',
        body: 'Los flujos genéricos fallan cuando ignoran excepciones, revisión y la forma real de trabajar del equipo.',
      },
    ],
    deliverables: [
      {
        title: 'Mapas de automatización',
        body: 'Un modelo práctico de disparadores, acciones, decisiones, excepciones, responsables y revisión.',
      },
      {
        title: 'Lógica de traspasos',
        body: 'Movimiento fiable de información y assets entre personas, herramientas y fases de producción.',
      },
      {
        title: 'Paneles internos',
        body: 'Interfaces enfocadas para seguir trabajo, revisar resultados y actuar sobre la siguiente decisión.',
      },
      {
        title: 'Sistemas de assets y contenido',
        body: 'Flujos estructurados para briefs, archivos, metadatos, versiones, aprobaciones y entrega.',
      },
      {
        title: 'Automatización de investigación',
        body: 'Recogida y síntesis que conserva fuentes y prepara material para interpretación humana.',
      },
      {
        title: 'Documentación de mantenimiento',
        body: 'Notas de operación, responsables, casos de fallo y orientación para cambios futuros.',
      },
    ],
    useCases: [
      'Coordinación de assets de campaña',
      'Flujos de briefing de contenido',
      'Recogida y síntesis de investigación',
      'Circuitos de aprobación creativa',
      'Paneles internos de producción',
      'Operaciones de contenido asistidas por IA',
    ],
    process: [
      {
        step: '01',
        title: 'Identificar el ciclo repetible',
        body: 'Encontrar el bucle de producción, sus bloqueos y la información que debe moverse.',
      },
      {
        step: '02',
        title: 'Separar automatización y criterio',
        body: 'Definir qué pasos son deterministas y cuáles requieren contexto, gusto o aprobación.',
      },
      {
        step: '03',
        title: 'Conectar herramientas',
        body: 'Diseñar disparadores, estados, excepciones e interfaces que mantengan el proceso comprensible.',
      },
      {
        step: '04',
        title: 'Probar y documentar',
        body: 'Ejecutar trabajo representativo, ajustar casos límite y preparar la guía de uso.',
      },
    ],
    relatedCaseStudies: ['ai-sports', 'data-brief-ai', 'website-auditor', 'benchmark-dashboard'],
    faqs: [
      {
        question: '¿Qué es la automatización creativa?',
        answer:
          'Estructura tareas repetitivas de producción y coordinación entre herramientas, manteniendo en personas las decisiones que requieren contexto, gusto o responsabilidad.',
      },
      {
        question: '¿Qué tareas creativas no conviene automatizar?',
        answer:
          'La dirección, decisiones editoriales sensibles, juicio final de calidad y elecciones con impacto reputacional deben seguir teniendo responsables humanos claros.',
      },
      {
        question: '¿Puedes conectar herramientas existentes?',
        answer:
          'Sí, cuando ofrecen APIs, webhooks, exportaciones u otros puntos de integración fiables. El diseño parte del flujo, no de imponer una plataforma.',
      },
      {
        question: '¿Funciona para equipos pequeños?',
        answer:
          'Sí. Un equipo pequeño puede beneficiarse especialmente de sistemas enfocados que eliminan coordinación repetida sin añadir una gran plataforma operativa.',
      },
      {
        question: '¿Qué plataformas utilizas?',
        answer:
          'Depende del control, volumen y mantenimiento necesarios. Se pueden combinar plataformas de automatización, scripts, APIs, bases de datos e interfaces ligeras.',
      },
      {
        question: '¿Cómo se mantiene el control de calidad?',
        answer:
          'El flujo incluye estados de revisión, visibilidad de fuentes, reglas de validación y rutas de fallo para que automatizar nunca equivalga a aprobar.',
      },
      {
        question: '¿Qué incluye un primer proyecto?',
        answer:
          'Normalmente incluye mapeo, lógica de sistema, un ciclo funcional, pruebas representativas y documentación para las personas que lo utilizarán.',
      },
    ],
    cta: {
      title: '¿Tienes un sistema creativo que merece desarrollarse?',
      body: 'Envía una nota breve con el proceso, herramienta, flujo o sistema de marca que quieres mejorar con IA. Revisaré el contexto y te propondré el siguiente paso más claro.',
      emailLabel: 'Enviar brief creativo',
      linkedinLabel: 'Conectar en LinkedIn',
    },
  },
  {
    slug: 'sistemas-de-marca',
    locale: 'es',
    href: '/services/sistemas-de-marca',
    alternateHref: '/en/services/brand-systems',
    title: 'Sistemas de Inteligencia de Marca',
    eyebrow: 'Sistemas de Marca',
    description:
      'Traduzco estrategia de marca en sistemas utilizables: reglas de tono, criterios creativos, estructuras de prompts, lógica de revisión y guías de flujo para mantener coherencia en resultados asistidos por IA.',
    metaTitle: 'Sistemas de Inteligencia de Marca para Trabajo Creativo con IA — Raúl Mermans',
    metaDescription:
      'Sistemas de inteligencia de marca, reglas de tono, prompts y criterios de revisión para contenido, campañas y flujos visuales asistidos por IA.',
    keywords: [
      'sistemas de inteligencia de marca',
      'guías de marca para IA',
      'sistemas de prompts de marca',
      'criterios de revisión creativa',
    ],
    tags: ['Lógica de Marca', 'Estructuras de Prompt', 'Criterios de Revisión'],
    answer:
      'Un sistema de inteligencia de marca convierte la estrategia en reglas operativas para guiar contenido, campañas, producción visual y flujos asistidos por IA. Ayuda a evaluar si un resultado suena, se ve y se comporta como la marca antes de publicarlo.',
    problems: [
      {
        title: 'Guías estáticas',
        body: 'Los documentos describen principios, pero no ayudan a decidir dentro de los flujos de producción.',
      },
      {
        title: 'Lenguaje genérico',
        body: 'El contenido generado cae en fórmulas conocidas que diluyen la voz y el punto de vista.',
      },
      {
        title: 'Interpretaciones distintas',
        body: 'Equipos y colaboradores aplican tono, mensaje y criterios visuales de forma inconsistente.',
      },
      {
        title: 'Deriva de campaña',
        body: 'Una dirección inicial fuerte pierde precisión al crecer en canales, piezas y participantes.',
      },
      {
        title: 'Revisión subjetiva',
        body: 'El feedback depende de preferencias personales porque faltan criterios compartidos.',
      },
    ],
    deliverables: [
      {
        title: 'Mapas de lógica de marca',
        body: 'Una estructura de posicionamiento, audiencia, narrativa, principios, tensiones y decisiones distintivas.',
      },
      {
        title: 'Reglas de tono y voz',
        body: 'Patrones, límites, ejemplos y anti-patrones utilizables en producción de contenido.',
      },
      {
        title: 'Estructuras de prompts',
        body: 'Sistemas reutilizables que trasladan contexto de marca a tareas asistidas por IA.',
      },
      {
        title: 'Scorecards de revisión',
        body: 'Criterios compartidos para evaluar ajuste de marca, claridad, diferenciación y calidad.',
      },
      {
        title: 'Límites visuales y de contenido',
        body: 'Reglas que protegen la consistencia sin eliminar el espacio para variación creativa.',
      },
      {
        title: 'Marcos de consistencia',
        body: 'Un sistema práctico para mantener una idea coherente entre canales, assets y equipos.',
      },
    ],
    useCases: [
      'Contenido de marca asistido por IA',
      'Sistemas de tono de campaña',
      'Reglas de relato de producto',
      'Guías para marcas premium y culturales',
      'Marcos de revisión creativa',
      'Flujos generativos alineados con marca',
    ],
    process: [
      {
        step: '01',
        title: 'Extraer la lógica de marca',
        body: 'Identificar decisiones estratégicas, referencias culturales, tono y tensiones creativas distintivas.',
      },
      {
        step: '02',
        title: 'Traducir estrategia en reglas',
        body: 'Convertir principios en ejemplos, límites, estructuras de input y criterios de producción.',
      },
      {
        step: '03',
        title: 'Crear prompts y revisión',
        body: 'Construir herramientas reutilizables para generar y evaluar trabajo en formatos relevantes.',
      },
      {
        step: '04',
        title: 'Probar y ajustar límites',
        body: 'Evaluar resultados representativos y corregir reglas vagas o demasiado restrictivas.',
      },
    ],
    relatedCaseStudies: ['remoria', 'ai-sports', 'raul-portfolio'],
    faqs: [
      {
        question: '¿Qué es un sistema de inteligencia de marca?',
        answer:
          'Es una capa operativa que convierte estrategia en reglas, ejemplos, prompts y criterios de revisión utilizables al crear y evaluar trabajo.',
      },
      {
        question: '¿En qué se diferencia de unas guías de marca?',
        answer:
          'Las guías tradicionales documentan identidad. Este sistema se centra en aplicarla dentro de decisiones recurrentes, flujos, herramientas de IA y revisión.',
      },
      {
        question: '¿Ayuda con contenido generado por IA?',
        answer:
          'Sí. Aporta mejor contexto a las tareas y una forma compartida de evaluar si los resultados son específicos, creíbles y coherentes.',
      },
      {
        question: '¿Puedes trabajar con una identidad existente?',
        answer:
          'Sí. El trabajo puede ampliar una estrategia e identidad ya definidas y convertirlas en lógica de producción y revisión más práctica.',
      },
      {
        question: '¿Qué incluye el sistema final?',
        answer:
          'Depende del equipo, pero puede incluir mapa de lógica, reglas de tono, prompts, ejemplos, scorecards, criterios visuales y guía de flujo.',
      },
      {
        question: '¿Es útil para marcas premium o culturales?',
        answer:
          'Sí. Suelen depender de matices, contención, referencias y consistencia, por lo que explicitar la lógica creativa resulta especialmente útil al escalar.',
      },
      {
        question: '¿Cómo se utiliza en el día a día?',
        answer:
          'Sirve para preparar briefs, estructurar inputs de IA, comparar opciones, dar feedback más claro y aprobar con criterios compartidos.',
      },
    ],
    cta: {
      title: '¿Tienes un sistema creativo que merece desarrollarse?',
      body: 'Envía una nota breve con el proceso, herramienta, flujo o sistema de marca que quieres mejorar con IA. Revisaré el contexto y te propondré el siguiente paso más claro.',
      emailLabel: 'Enviar brief creativo',
      linkedinLabel: 'Conectar en LinkedIn',
    },
  },
  {
    slug: 'prototipos-producto-ia',
    locale: 'es',
    href: '/services/prototipos-producto-ia',
    alternateHref: '/en/services/product-prototypes',
    title: 'Prototipos de Producto IA y Herramientas Internas',
    eyebrow: 'Prototipado de Producto',
    description:
      'Diseño y construyo superficies de producto, paneles y herramientas internas ligeras que hacen utilizables los flujos con IA. El objetivo es probar la lógica del sistema antes de invertir en desarrollo a escala.',
    metaTitle: 'Prototipos de Producto IA y Herramientas Internas — Raúl Mermans',
    metaDescription:
      'Prototipos rápidos, herramientas internas, paneles y superficies de flujo con IA para probar ideas de servicio y lógica de sistema.',
    keywords: [
      'prototipos de producto IA',
      'prototipos de herramientas internas',
      'interfaces para flujos IA',
      'prototipado de dashboards',
    ],
    tags: ['Lógica de Producto', 'Diseño de Interfaz', 'Validación MVP'],
    answer:
      'Los prototipos de producto con IA son interfaces o herramientas enfocadas que hacen un flujo utilizable, comprobable y fácil de evaluar. Permiten pasar de una idea abstracta a un sistema funcional con inputs, resultados, puntos de revisión y recorridos claros.',
    problems: [
      {
        title: 'Ideas demasiado abstractas',
        body: 'El equipo habla de capacidades sin un flujo concreto que usuarios y stakeholders puedan evaluar.',
      },
      {
        title: 'Lógica invisible',
        body: 'Inputs, resultados, decisiones y revisión siguen difusos hasta que una interfaz los hace tangibles.',
      },
      {
        title: 'Demos poco utilizables',
        body: 'Una demostración técnica puede impresionar y seguir siendo difícil de operar o comprender.',
      },
      {
        title: 'Herramientas improvisadas',
        body: 'Procesos importantes dependen de formularios, hojas, scripts y soluciones sin documentar.',
      },
      {
        title: 'Alineación lenta',
        body: 'Hace falta una superficie realista antes de comprometer presupuesto y esfuerzo de ingeniería.',
      },
    ],
    deliverables: [
      {
        title: 'Prototipos de superficie',
        body: 'Flujos enfocados que hacen concreto el valor, las decisiones y el modelo de interacción.',
      },
      {
        title: 'Paneles de flujo',
        body: 'Interfaces para revisar inputs, estado, resultados generados, evidencia y siguientes acciones.',
      },
      {
        title: 'Herramientas internas',
        body: 'Superficies específicas para tareas repetibles que no necesitan un producto comercial completo.',
      },
      {
        title: 'Herramientas de auditoría e informe',
        body: 'Interfaces basadas en evidencia que estructuran análisis, síntesis, revisión y exportación.',
      },
      {
        title: 'Lógica de entrada y salida',
        body: 'Estados, validaciones, decisiones y gestión de fallos detrás de la interfaz visible.',
      },
      {
        title: 'Documentación técnica',
        body: 'Registro claro de supuestos, arquitectura, límites y siguientes pasos razonables.',
      },
    ],
    useCases: [
      'Prototipos de herramientas internas con IA',
      'Paneles de flujos de campaña',
      'Interfaces de auditoría con evidencia',
      'Herramientas de reporting con IA',
      'Demos para stakeholders',
      'Validación de MVP',
    ],
    process: [
      {
        step: '01',
        title: 'Definir usuario y flujo',
        body: 'Aclarar quién utiliza la herramienta, qué decisión necesita tomar y cuál es el recorrido mínimo útil.',
      },
      {
        step: '02',
        title: 'Mapear inputs y resultados',
        body: 'Definir datos, comportamiento del modelo, decisiones, revisión, errores y resultados esperados.',
      },
      {
        step: '03',
        title: 'Construir la superficie',
        body: 'Crear una interfaz enfocada que haga la lógica del sistema utilizable y creíble.',
      },
      {
        step: '04',
        title: 'Probar y preparar el siguiente paso',
        body: 'Afinar con uso representativo y documentar lo necesario para una fase de producción.',
      },
    ],
    relatedCaseStudies: ['data-brief-ai', 'website-auditor', 'benchmark-dashboard', 'raul-portfolio'],
    faqs: [
      {
        question: '¿Qué es un prototipo de producto con IA?',
        answer:
          'Es una interfaz funcional y enfocada que prueba cómo interactúan las personas con un flujo asistido por IA, incluidos inputs, resultados, revisión y fallos.',
      },
      {
        question: '¿En qué se diferencia de un producto SaaS completo?',
        answer:
          'El prototipo limita el alcance para validar flujo y lógica de producto. No implica la infraestructura, escala, soporte ni madurez operativa de un SaaS en producción.',
      },
      {
        question: '¿Puedes construir la interfaz y la lógica?',
        answer:
          'Sí. El trabajo conecta diseño de interfaz y flujo subyacente para probar la experiencia completa, no solo pantallas aisladas.',
      },
      {
        question: '¿Qué stack utilizas?',
        answer:
          'Se elige según velocidad, mantenimiento y entorno existente. Suele combinar frameworks web modernos, APIs, datos estructurados y servicios de automatización o modelos.',
      },
      {
        question: '¿Puede evolucionar a producto en producción?',
        answer:
          'Sí, si valida el flujo. La entrega identifica qué puede conservarse y qué necesita arquitectura, seguridad, observabilidad o escala adicionales.',
      },
      {
        question: '¿Qué necesitas para empezar?',
        answer:
          'Un usuario definido, una tarea concreta, inputs representativos, el resultado deseado y las decisiones que la interfaz debe facilitar.',
      },
      {
        question: '¿Qué incluye un prototipo?',
        answer:
          'Suele incluir el flujo principal, estados funcionales, lógica de modelo o automatización, revisión, pruebas representativas y documentación de siguientes pasos.',
      },
    ],
    cta: {
      title: '¿Tienes un sistema creativo que merece desarrollarse?',
      body: 'Envía una nota breve con el proceso, herramienta, flujo o sistema de marca que quieres mejorar con IA. Revisaré el contexto y te propondré el siguiente paso más claro.',
      emailLabel: 'Enviar brief creativo',
      linkedinLabel: 'Conectar en LinkedIn',
    },
  },
]

export const serviceLandings = [...englishLandings, ...spanishLandings]

export function getServiceLandings(locale: Locale) {
  return serviceLandings.filter((landing) => landing.locale === locale)
}

export function getServiceLanding(locale: Locale, slug: string) {
  return serviceLandings.find(
    (landing) => landing.locale === locale && landing.slug === slug,
  )
}
