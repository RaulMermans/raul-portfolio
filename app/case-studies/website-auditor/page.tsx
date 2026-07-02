'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import CaseStudyMiniNav from '@/components/case-studies/CaseStudyMiniNav'
import {
  CommercialCaseStudyClosing,
  CommercialCaseStudyIntro,
  type CommercialCaseStudyContent,
} from '@/components/case-studies/CommercialCaseStudySections'
import { useCaseStudySetup } from '@/hooks'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'

const githubUrl = 'https://github.com/RaulMermans/website-auditor'

const commercialContent: CommercialCaseStudyContent = {
  snapshot: [
    { label: 'Type', value: 'Evidence-based AI audit workflow' },
    { label: 'Use case', value: 'Website diagnostics, UX/SEO/conversion review, internal prospect intelligence' },
    { label: 'Role', value: 'System architecture, workflow logic, product framing, frontend/backend implementation' },
    { label: 'Stack', value: 'Next.js, TypeScript, Postgres, pg-boss, Playwright, Gemini, Vercel' },
    { label: 'Status', value: 'Private internal prototype with public GitHub available' },
  ],
  links: [{ label: 'View GitHub', href: githubUrl, external: true }],
  businessContext:
    'Website reviews are high-friction because teams need evidence, prioritization, and commercial interpretation, not generic AI feedback. This project explores how AI can support faster diagnostics while keeping measurement, observation, and inference separate.',
  systemSummary:
    'The system takes a public URL, captures rendered or static evidence, persists the run, applies deterministic scoring, and only then passes accepted findings into an AI synthesis layer. The report keeps evidence labels visible so recommendations can be reviewed instead of blindly trusted.',
  systemItems: [
    { title: 'Inputs', description: 'Public website URLs and captured page evidence from browser-first or static collection.' },
    { title: 'Workflow', description: 'URL intake, capture, evidence storage, deterministic scoring, bounded synthesis, and internal report assembly.' },
    { title: 'Processing logic', description: 'Rules create audit findings and scores before the model summarizes accepted evidence.' },
    { title: 'Output', description: 'Private report with scores, confidence, evidence labels, top findings, and prioritized recommendations.' },
    { title: 'Guardrails', description: 'The LLM cannot create findings, modify scores, invent metrics, or present inferred claims as measured truth.' },
  ],
  whyItMatters:
    'AI audits become risky when they collapse evidence and interpretation into one model response. This system defines clear inputs, accepted evidence, deterministic scoring, and reviewable AI synthesis, which makes the recommendations more useful for teams that need repeatable diagnostics.',
  clientRelevance:
    'A client-facing version could help brand, content, product, or digital teams standardize site audits, speed up UX/SEO/conversion diagnostics, and turn messy website observations into clearer decision support.',
  ctaCopy:
    "If your team has a creative process, internal tool, campaign workflow, or brand system worth extending with AI, send a short brief and I'll help define the clearest system logic.",
}

const commercialContentEs: CommercialCaseStudyContent = {
  snapshot: [
    { label: 'Tipo', value: 'Flujo de auditoría con IA basado en evidencia' },
    { label: 'Uso', value: 'Diagnóstico web, revisión UX/SEO/conversión e inteligencia interna de prospección' },
    { label: 'Rol', value: 'Arquitectura de sistema, lógica de flujo, framing de producto e implementación frontend/backend' },
    { label: 'Stack', value: 'Next.js, TypeScript, Postgres, pg-boss, Playwright, Gemini y Vercel' },
    { label: 'Estado', value: 'Prototipo interno privado con GitHub público disponible' },
  ],
  links: [{ label: 'Ver GitHub', href: githubUrl, external: true }],
  businessContext:
    'Las revisiones web tienen mucha fricción porque los equipos necesitan evidencia, prioridad e interpretación comercial, no feedback genérico de IA. Este proyecto explora cómo la IA puede acelerar diagnósticos manteniendo separadas medición, observación e inferencia.',
  systemSummary:
    'El sistema recibe una URL pública, captura evidencia renderizada o estática, guarda la ejecución, aplica puntuación determinista y solo después pasa los hallazgos aceptados a una capa de síntesis con IA. El informe mantiene visibles las etiquetas de evidencia para que las recomendaciones se puedan revisar, no aceptar a ciegas.',
  systemItems: [
    { title: 'Inputs', description: 'URLs públicas y evidencia de página capturada mediante navegador o colección estática.' },
    { title: 'Flujo', description: 'Entrada de URL, captura, almacenamiento de evidencia, puntuación determinista, síntesis acotada y ensamblaje del informe interno.' },
    { title: 'Lógica de proceso', description: 'Las reglas generan hallazgos y puntuaciones antes de que el modelo resuma la evidencia aceptada.' },
    { title: 'Resultado', description: 'Informe privado con scores, confianza, etiquetas de evidencia, hallazgos principales y recomendaciones priorizadas.' },
    { title: 'Límites', description: 'El LLM no puede crear hallazgos, cambiar puntuaciones, inventar métricas ni presentar inferencias como verdad medida.' },
  ],
  whyItMatters:
    'Las auditorías con IA se vuelven arriesgadas cuando mezclan evidencia e interpretación en una única respuesta del modelo. Este sistema define entradas claras, evidencia aceptada, puntuación determinista y síntesis revisable, lo que hace las recomendaciones más útiles para equipos que necesitan diagnósticos repetibles.',
  clientRelevance:
    'Una versión para cliente podría ayudar a equipos de marca, contenido, producto o digital a estandarizar auditorías web, acelerar diagnósticos de UX/SEO/conversión y convertir observaciones desordenadas en apoyo claro para decidir.',
  ctaCopy:
    'Si tu equipo tiene un proceso creativo, herramienta interna, flujo de campaña o sistema de marca que merece ampliarse con IA, envía un brief breve y te ayudo a definir la lógica más clara.',
}

const content = {
  en: {
    back: 'Back to Case Studies',
    eyebrow: 'AI Systems / Audit Workflow',
    heroTitle: 'Website Audit Agent',
    heroSubtitle:
      'An evidence-backed website audit workflow that turns public websites into structured UX, SEO, performance, content, and prospect-intelligence reports.',
    heroDescription:
      'The goal was to turn website review from subjective opinion into a repeatable evidence workflow, while keeping AI useful but bounded.',
    heroCTAGithub: 'View GitHub →',
    heroCTAHow: 'View System Logic',
    heroFigcaption: 'Representative preview. Not a live audit result.',
    heroFigAriaLabel: 'Website Audit Agent representative report preview',
    tags: ['Rule-first audit engine', 'Browser-first capture', 'Bounded LLM synthesis', 'Private internal tool'],
    nav: [
      ['Problem', '#problem'],
      ['Overview', '#overview'],
      ['Workflow', '#workflow'],
      ['Evidence', '#evidence'],
      ['AI Layer', '#agentic-layer'],
      ['Report', '#report-surface'],
      ['Boundaries', '#boundaries'],
    ] as const,
    navAriaLabel: 'Website Audit Agent page sections',
    problemEyebrow: 'Problem',
    problemH2: 'The problem with AI audits is trust.',
    problemP:
      'AI website-audit tools often collapse observation, scoring, and interpretation into one opaque model response. That makes the output fast, but difficult to trust.',
    problemPrinciple:
      'Website Audit Agent was designed around the opposite principle: before the model says anything, the system must capture evidence, classify confidence, and define what is actually known.',
    overviewEyebrow: 'Overview',
    overviewH2: 'The audit truth is deterministic. The AI is interpretive.',
    overviewP:
      'This is not a free-form audit chatbot. The model does not create findings, score categories, invent metrics, or turn weak signals into measured facts. The LLM layer only synthesizes accepted evidence, which makes the workflow more credible for internal prospecting.',
    overviewCards: [
      {
        title: 'Capture evidence first',
        description:
          'The workflow starts with public website evidence, not model speculation. Rendered capture is attempted first, with static public evidence as fallback.',
      },
      {
        title: 'Score with rules',
        description:
          'Findings and category scores are produced deterministically from captured evidence before any synthesis layer is involved.',
      },
      {
        title: 'Interpret after acceptance',
        description:
          'Gemini and the Prospect Audit Agent receive accepted findings only, then translate them into useful internal acquisition intelligence.',
      },
    ],
    workflowEyebrow: 'Workflow',
    workflowH2: 'Controlled pipeline from public URL to private report',
    workflowP:
      'The architecture separates capture, persistence, scoring, synthesis, and report assembly so each stage has a clear owner and failure mode.',
    workflowAriaLabel: 'Website Audit Agent workflow',
    workflowStages: [
      {
        title: 'URL Intake',
        description: 'A user submits a public website URL.',
      },
      {
        title: 'Browser / Static Capture',
        description: 'Rendered evidence is captured first, then static public evidence is used if rendering fails or is blocked.',
      },
      {
        title: 'Evidence Store',
        description: 'Snapshots and page evidence are persisted for the run.',
      },
      {
        title: 'Deterministic Scoring',
        description: 'Rules generate findings and category scores.',
      },
      {
        title: 'Bounded AI Synthesis',
        description: 'Gemini and the Prospect Audit Agent summarize only accepted findings.',
      },
      {
        title: 'Internal Report',
        description: 'The output becomes private acquisition intelligence.',
      },
    ],
    evidenceEyebrow: 'Evidence model',
    evidenceH2: 'Every claim needs an evidence status',
    evidenceP:
      'The system can interpret, but it must not pretend inference is measurement. Evidence labels make that boundary visible inside the report.',
    evidenceCards: [
      {
        title: 'Measured',
        description: 'Directly captured or computed.',
      },
      {
        title: 'Observed',
        description: 'Visible in captured page evidence.',
      },
      {
        title: 'Inferred',
        description: 'Interpretation from available signals; never presented as measured truth.',
      },
    ],
    agentEyebrow: 'Agentic layer',
    agentH2: 'The AI is downstream by design.',
    agentP:
      'This is a hybrid workflow-agent system. The deterministic shell owns capture, scoring, persistence, status, and report assembly. The LLM layer owns summary, prioritization, explanation, and prospect intelligence. The Prospect Audit Agent does not browse freely, rewrite findings, or create scores.',
    agentDiagram: ['Deterministic Audit Engine', 'Accepted Findings', 'Prospect Audit Agent', 'Internal Intelligence'],
    llmBoundaryH3: 'What the LLM can and cannot do',
    llmAllowedTitle: 'Allowed',
    llmBlockedTitle: 'Blocked',
    llmAllowedItems: [
      'Summarize accepted findings.',
      'Prioritize recommendations.',
      'Translate audit evidence into internal prospect intelligence.',
      'Explain why a finding matters commercially.',
    ],
    llmBlockedItems: [
      'Create audit findings.',
      'Modify category scores.',
      'Invent metrics.',
      'Present inferred claims as measured truth.',
      'Make unsupported revenue claims.',
    ],
    reportEyebrow: 'Report surface',
    reportH2: 'A private audit report built from accepted evidence',
    reportP:
      'The report surface is intentionally internal. It presents scores, confidence, evidence labels, and top findings without exposing the private Vercel deployment as a public demo.',
    reportFigcaption: 'Representative finding card. Not a live audit result.',
    findingCard: {
      issueLabel: 'Issue',
      issue: 'Primary CTA is visible but weakly reinforced above the fold.',
      categoryLabel: 'Category',
      category: 'UX / Conversion',
      evidenceLabel: 'Evidence',
      evidence: 'Observed',
      sourceLabel: 'Source',
      source: 'Rendered browser capture',
      synthesisLabel: 'Synthesis status',
      synthesis: 'Allowed — based on accepted evidence only.',
    },
    sampleAudit: {
      title: 'Sample audit output',
      note: 'Synthetic/anonymized example based only on public-page evidence.',
      rows: [
        ['Measured evidence', 'Page title length, heading count, image alt coverage, and response status are collected directly from the public page.'],
        ['Observed evidence', 'The primary CTA is visible above the fold, but supporting proof appears lower on the page.'],
        ['Inferred evidence', 'A first-time visitor may understand the offer before they understand why it is credible.'],
        ['Recommendation', 'Move one proof cue closer to the hero CTA and keep the claim tied to visible page evidence.'],
        ['Caveat', 'No private analytics, conversion rate, CRM data, or proprietary performance data is available to this workflow.'],
      ] as const,
    },
    safetyEyebrow: 'Safety / Access boundary',
    safetyH2: 'Public repository. Private operating surface.',
    safetyP:
      'The project is public for portfolio and reference purposes, while the operating surface stays private behind an internal login and protected job endpoint.',
    safetyItems: [
      'Private Vercel deployment',
      'Internal login and access gate',
      'Worker-secret protected job endpoint',
      'Public website evidence only',
      'No anti-bot bypass',
      'No public live demo',
    ],
    resultEyebrow: 'Result',
    resultH2: 'A useful AI system because it stays inside its lane.',
    resultP:
      'The result is a private acquisition workflow that can turn a public website URL into a structured internal report with evidence labels, category scores, and prioritized findings.',
    resultCards: [
      {
        title: 'Repeatable audit pipeline',
        description: 'A public URL moves through capture, evidence storage, scoring, synthesis, and reporting with explicit stage boundaries.',
      },
      {
        title: 'Controlled AI synthesis',
        description: 'The LLM summarizes accepted findings and prospect context without creating audit truth.',
      },
      {
        title: 'Evidence discipline',
        description: 'Measured, observed, and inferred claims stay distinct throughout the report.',
      },
      {
        title: 'Portfolio-safe architecture',
        description: 'The repo can be shown publicly while the operating surface and generated reports remain private.',
      },
    ],
    stackEyebrow: 'Stack',
    stackH2: 'Built as a production-oriented prototype',
    stackP:
      'The stack is practical: Next.js for the app surface, Postgres and pg-boss for durable runs, Playwright for capture, Gemini for bounded synthesis, and a worker endpoint protected separately from the internal session gate.',
    stackAriaLabel: 'Website Audit Agent technology stack',
    stackItems: [
      'Next.js',
      'TypeScript',
      'Postgres',
      'pg-boss',
      'Playwright',
      'Gemini',
      'Vercel',
      'Deterministic scoring',
      'Evidence labels',
      'Private worker endpoint',
    ],
    boundariesEyebrow: 'Boundaries / Future Improvements',
    boundariesH2: 'These are design boundaries, not excuses.',
    boundariesP:
      'The current scope is deliberately narrow so the case study does not overclaim what the system does.',
    boundaries: [
      'Not a public SaaS.',
      'No public live demo.',
      'Prospect Intelligence is internal guidance, not audit truth.',
      'Static-only reports intentionally exclude visual/mobile/above-the-fold scoring.',
      'AI synthesis depends on accepted findings.',
      'Future work includes evals, model comparison, observability, and real audit examples.',
    ],
    resultCTAGithub: 'View GitHub →',
    resultCTAWorkflow: 'View System Logic',
    report: {
      title: 'Website Audit Agent',
      status: 'Complete',
      capture: 'Rendered browser',
      confidence: 'High',
      scores: [
        ['UX', '82'],
        ['SEO', '74'],
        ['Performance', '68'],
        ['Content', '79'],
        ['Accessibility', '71'],
      ] as const,
      findingLabel: 'Top finding',
      finding: 'Primary CTA is visible but not consistently reinforced above the fold.',
      evidenceLabel: 'Evidence label',
      evidence: 'Observed',
    },
  },
  es: {
    back: 'Volver a casos',
    eyebrow: 'Sistemas de IA / Flujo de auditoría',
    heroTitle: 'Website Audit Agent',
    heroSubtitle:
      'Un flujo de auditoría web basado en evidencia que convierte sitios públicos en informes estructurados de UX, SEO, rendimiento, contenido e inteligencia comercial.',
    heroDescription:
      'El objetivo era convertir la revisión web —normalmente subjetiva— en un flujo repetible basado en evidencia, manteniendo la IA útil pero acotada.',
    heroCTAGithub: 'Ver GitHub →',
    heroCTAHow: 'Cómo funciona',
    heroFigcaption: 'Vista representativa. No es un resultado de auditoría en vivo.',
    heroFigAriaLabel: 'Vista representativa del informe de Website Audit Agent',
    tags: ['Motor basado en reglas', 'Captura con navegador', 'Síntesis LLM acotada', 'Herramienta interna privada'],
    nav: [
      ['Problema', '#problem'],
      ['Resumen', '#overview'],
      ['Flujo', '#workflow'],
      ['Evidencia', '#evidence'],
      ['Capa IA', '#agentic-layer'],
      ['Informe', '#report-surface'],
      ['Límites', '#boundaries'],
    ] as const,
    navAriaLabel: 'Secciones de la página Website Audit Agent',
    problemEyebrow: 'Problema',
    problemH2: 'El problema de las auditorías con IA es la confianza.',
    problemP:
      'Muchas herramientas de auditoría web con IA mezclan observación, puntuación e interpretación en una sola respuesta opaca del modelo. El resultado puede ser rápido, pero cuesta confiar en él.',
    problemPrinciple:
      'Website Audit Agent se diseñó alrededor del principio contrario: antes de que el modelo diga nada, el sistema debe capturar evidencia, clasificar confianza y definir qué se sabe realmente.',
    overviewEyebrow: 'Resumen',
    overviewH2: 'La verdad de auditoría es determinista. La IA interpreta.',
    overviewP:
      'No es un chatbot de auditoría de forma libre. El modelo no crea hallazgos, no puntúa categorías, no inventa métricas y no convierte señales débiles en hechos medidos. La capa LLM solo sintetiza evidencia aceptada, lo que hace el flujo más creíble para prospección interna.',
    overviewCards: [
      {
        title: 'Primero captura evidencia',
        description:
          'El flujo parte de evidencia pública del sitio, no de especulación del modelo. Primero intenta captura renderizada y usa evidencia pública estática como respaldo.',
      },
      {
        title: 'Puntúa con reglas',
        description:
          'Los hallazgos y scores de categoría se producen de forma determinista desde la evidencia capturada antes de cualquier síntesis.',
      },
      {
        title: 'Interpreta después',
        description:
          'Gemini y el Prospect Audit Agent reciben solo hallazgos aceptados y los traducen en inteligencia interna de adquisición.',
      },
    ],
    workflowEyebrow: 'Flujo',
    workflowH2: 'Pipeline controlado desde URL pública hasta informe privado',
    workflowP:
      'La arquitectura separa captura, persistencia, puntuación, síntesis y ensamblaje del informe para que cada etapa tenga un dueño y un modo de fallo claro.',
    workflowAriaLabel: 'Flujo de Website Audit Agent',
    workflowStages: [
      {
        title: 'URL Intake',
        description: 'El usuario envía la URL de un sitio público.',
      },
      {
        title: 'Captura con navegador / estática',
        description: 'Primero se captura evidencia renderizada y, si falla o está bloqueada, se usa evidencia pública estática.',
      },
      {
        title: 'Almacén de evidencia',
        description: 'Los snapshots y la evidencia de página se persisten para la ejecución.',
      },
      {
        title: 'Puntuación determinista',
        description: 'Las reglas generan hallazgos y scores de categoría.',
      },
      {
        title: 'Síntesis IA acotada',
        description: 'Gemini y el Prospect Audit Agent resumen solo hallazgos aceptados.',
      },
      {
        title: 'Informe interno',
        description: 'El resultado se convierte en inteligencia privada de adquisición.',
      },
    ],
    evidenceEyebrow: 'Modelo de evidencia',
    evidenceH2: 'Cada afirmación necesita un estado de evidencia',
    evidenceP:
      'El sistema puede interpretar, pero no debe presentar una inferencia como medición. Las etiquetas de evidencia hacen visible ese límite dentro del informe.',
    evidenceCards: [
      {
        title: 'Measured',
        description: 'Capturado o calculado directamente.',
      },
      {
        title: 'Observed',
        description: 'Visible en la evidencia capturada de la página.',
      },
      {
        title: 'Inferred',
        description: 'Interpretación a partir de señales disponibles; nunca se presenta como verdad medida.',
      },
    ],
    agentEyebrow: 'Capa agéntica',
    agentH2: 'La IA está aguas abajo por diseño.',
    agentP:
      'Es un sistema híbrido entre flujo y agente. La capa determinista controla captura, puntuación, persistencia, estado y ensamblaje del informe. La capa LLM se encarga de resumir, priorizar, explicar y traducir los hallazgos a inteligencia comercial. El Prospect Audit Agent no navega libremente, no reescribe hallazgos y no crea puntuaciones.',
    agentDiagram: ['Motor determinista de auditoría', 'Hallazgos aceptados', 'Prospect Audit Agent', 'Inteligencia interna'],
    llmBoundaryH3: 'Qué puede y qué no puede hacer el LLM',
    llmAllowedTitle: 'Permitido',
    llmBlockedTitle: 'Bloqueado',
    llmAllowedItems: [
      'Sintetizar hallazgos aceptados.',
      'Priorizar recomendaciones.',
      'Traducir evidencia de auditoría en inteligencia comercial interna.',
      'Explicar por qué un hallazgo importa comercialmente.',
    ],
    llmBlockedItems: [
      'Crear hallazgos de auditoría.',
      'Modificar scores de categoría.',
      'Inventar métricas.',
      'Presentar inferencias como verdad medida.',
      'Hacer afirmaciones de ingresos sin soporte.',
    ],
    reportEyebrow: 'Informe',
    reportH2: 'Un informe privado construido desde evidencia aceptada',
    reportP:
      'La superficie de informe es deliberadamente interna. Presenta scores, confianza, etiquetas de evidencia y hallazgos principales sin exponer el despliegue privado de Vercel como demo pública.',
    reportFigcaption: 'Tarjeta representativa de hallazgo. No es un resultado de auditoría en vivo.',
    findingCard: {
      issueLabel: 'Hallazgo',
      issue: 'El CTA principal es visible, pero queda poco reforzado en el primer tramo de pantalla.',
      categoryLabel: 'Categoría',
      category: 'UX / Conversión',
      evidenceLabel: 'Evidencia',
      evidence: 'Observed',
      sourceLabel: 'Fuente',
      source: 'Captura renderizada en navegador',
      synthesisLabel: 'Estado de síntesis',
      synthesis: 'Permitida — basada solo en evidencia aceptada.',
    },
    sampleAudit: {
      title: 'Ejemplo de informe',
      note: 'Ejemplo sintético/anonimizado basado solo en evidencia pública de página.',
      rows: [
        ['Measured evidence', 'Longitud del title, número de headings, cobertura de alt text y estado de respuesta se capturan directamente desde la página pública.'],
        ['Observed evidence', 'El CTA principal aparece en el primer tramo, pero la prueba que lo respalda queda más abajo.'],
        ['Inferred evidence', 'Un visitante nuevo puede entender la oferta antes de entender por qué es creíble.'],
        ['Recommendation', 'Acercar una señal de prueba al CTA del hero y mantener el claim unido a evidencia visible.'],
        ['Caveat', 'El workflow no accede a analítica privada, tasa de conversión, CRM ni datos propietarios de rendimiento.'],
      ] as const,
    },
    safetyEyebrow: 'Seguridad / Límite de acceso',
    safetyH2: 'Repositorio público. Superficie operativa privada.',
    safetyP:
      'El proyecto es público como portafolio y referencia, mientras que la superficie operativa permanece privada detrás de login interno y endpoint de trabajo protegido.',
    safetyItems: [
      'Despliegue privado en Vercel',
      'Login interno y control de acceso',
      'Endpoint de job protegido con worker secret',
      'Solo evidencia pública del sitio',
      'Sin bypass anti-bot',
      'Sin demo pública en vivo',
    ],
    resultEyebrow: 'Resultado',
    resultH2: 'Un sistema de IA útil porque se mantiene dentro de sus límites.',
    resultP:
      'El resultado es un flujo privado de adquisición capaz de convertir una URL pública en un informe interno estructurado con etiquetas de evidencia, scores por categoría y hallazgos priorizados.',
    resultCards: [
      {
        title: 'Pipeline repetible',
        description: 'Una URL pública pasa por captura, almacenamiento de evidencia, puntuación, síntesis e informe con fronteras explícitas.',
      },
      {
        title: 'Síntesis IA controlada',
        description: 'El LLM resume hallazgos aceptados y contexto comercial sin crear verdad de auditoría.',
      },
      {
        title: 'Disciplina de evidencia',
        description: 'Las afirmaciones medidas, observadas e inferidas se mantienen separadas durante todo el informe.',
      },
      {
        title: 'Arquitectura segura para portafolio',
        description: 'El repositorio puede mostrarse públicamente mientras la superficie operativa y los informes generados siguen privados.',
      },
    ],
    stackEyebrow: 'Stack',
    stackH2: 'Construido como prototipo orientado a producción',
    stackP:
      'El stack es práctico: Next.js para la superficie de app, Postgres y pg-boss para ejecuciones duraderas, Playwright para captura, Gemini para síntesis acotada y un endpoint worker protegido por separado.',
    stackAriaLabel: 'Stack tecnológico de Website Audit Agent',
    stackItems: [
      'Next.js',
      'TypeScript',
      'Postgres',
      'pg-boss',
      'Playwright',
      'Gemini',
      'Vercel',
      'Puntuación determinista',
      'Etiquetas de evidencia',
      'Endpoint worker privado',
    ],
    boundariesEyebrow: 'Límites / Mejoras futuras',
    boundariesH2: 'Son límites de diseño, no excusas.',
    boundariesP:
      'El alcance actual es deliberadamente estrecho para que el caso de estudio no sobreprometa lo que hace el sistema.',
    boundaries: [
      'No es un SaaS público.',
      'No hay demo pública en vivo.',
      'Prospect Intelligence es guía interna, no verdad de auditoría.',
      'Los informes solo estáticos excluyen intencionalmente puntuación visual, móvil y del primer tramo de pantalla.',
      'La síntesis IA depende de hallazgos aceptados.',
      'El trabajo futuro incluye evals, comparación de modelos, observabilidad y ejemplos reales de auditoría.',
    ],
    resultCTAGithub: 'Ver GitHub →',
    resultCTAWorkflow: 'Revisar flujo',
    report: {
      title: 'Website Audit Agent',
      status: 'Completo',
      capture: 'Navegador renderizado',
      confidence: 'Alta',
      scores: [
        ['UX', '82'],
        ['SEO', '74'],
        ['Rendimiento', '68'],
        ['Contenido', '79'],
        ['Accesibilidad', '71'],
      ] as const,
      findingLabel: 'Hallazgo principal',
      finding: 'El CTA principal es visible, pero no está reforzado de forma consistente en el primer tramo de pantalla.',
      evidenceLabel: 'Etiqueta de evidencia',
      evidence: 'Observed',
    },
  },
}

type ReportText = {
  title: string
  status: string
  capture: string
  confidence: string
  scores: ReadonlyArray<readonly [string, string]>
  findingLabel: string
  finding: string
  evidenceLabel: string
  evidence: string
}
type FindingCardText = typeof content.en.findingCard

function AuditReportMockup({ text }: { text: ReportText }) {
  return (
    <div className="website-auditor-report">
      <div className="website-auditor-report__topline">
        <span>{text.title}</span>
        <strong>{text.status}</strong>
      </div>
      <div className="website-auditor-report__meta">
        <span>Capture: {text.capture}</span>
        <span>Evidence confidence: {text.confidence}</span>
      </div>
      <div className="website-auditor-report__scores" aria-label="Audit scores">
        {text.scores.map(([label, score]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{score}</strong>
          </article>
        ))}
      </div>
      <div className="website-auditor-report__finding">
        <span>{text.findingLabel}</span>
        <p>{text.finding}</p>
        <em>
          {text.evidenceLabel}: {text.evidence}
        </em>
      </div>
    </div>
  )
}

function AcceptedEvidenceCard({ text }: { text: FindingCardText }) {
  return (
    <div className="website-auditor-finding-card">
      <div className="website-auditor-finding-card__header">
        <span>{text.evidence}</span>
        <strong>{text.synthesisLabel}</strong>
      </div>
      <div className="website-auditor-finding-card__issue">
        <span>{text.issueLabel}</span>
        <p>{text.issue}</p>
      </div>
      <dl className="website-auditor-finding-card__meta">
        <div>
          <dt>{text.categoryLabel}</dt>
          <dd>{text.category}</dd>
        </div>
        <div>
          <dt>{text.evidenceLabel}</dt>
          <dd>{text.evidence}</dd>
        </div>
        <div>
          <dt>{text.sourceLabel}</dt>
          <dd>{text.source}</dd>
        </div>
      </dl>
      <div className="website-auditor-finding-card__status">
        <span>{text.synthesis}</span>
      </div>
    </div>
  )
}

export default function WebsiteAuditorPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const t = content[locale]
  const commercial = locale === 'es' ? commercialContentEs : commercialContent

  useCaseStudySetup()

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="case-study-page-new case-study-page-new--data-brief case-study-page-new--website-auditor">
        <section className="data-brief-hero website-auditor-hero" aria-labelledby="website-auditor-title">
          <div className="data-brief-hero__content">
            <Link href={localizePath('/case-studies', locale)} className="data-brief-back">
              {t.back}
            </Link>
            <p className="data-brief-eyebrow">{t.eyebrow}</p>
            <h1 id="website-auditor-title" className="data-brief-hero__title">
              {t.heroTitle}
            </h1>
            <p className="data-brief-hero__subtitle">{t.heroSubtitle}</p>
            <p className="data-brief-hero__description">{t.heroDescription}</p>
            <div className="data-brief-actions" aria-label={locale === 'es' ? 'Enlaces del proyecto' : 'Project links'}>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                {t.heroCTAGithub}
              </a>
              <a href="#workflow" className="data-brief-button">
                {t.heroCTAHow}
              </a>
            </div>
            <div className="data-brief-tags" aria-label={locale === 'es' ? 'Etiquetas del proyecto' : 'Project tags'}>
              {t.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <figure className="data-brief-hero__visual" aria-label={t.heroFigAriaLabel}>
            <AuditReportMockup text={t.report} />
            <figcaption>{t.heroFigcaption}</figcaption>
          </figure>
        </section>

        <CaseStudyMiniNav
          items={t.nav}
          ariaLabel={t.navAriaLabel}
          className="website-auditor-mini-nav"
        />

        <CommercialCaseStudyIntro content={commercial} locale={locale} />

        <section
          id="problem"
          className="data-brief-section data-brief-section--cream website-auditor-problem-section"
          aria-labelledby="website-auditor-problem"
        >
          <div className="data-brief-section__container">
            <div className="website-auditor-problem-panel">
              <div className="data-brief-refresh-heading">
                <p className="data-brief-eyebrow">{t.problemEyebrow}</p>
                <h2 id="website-auditor-problem">{t.problemH2}</h2>
              </div>
              <div className="website-auditor-problem-copy">
                <p>{t.problemP}</p>
                <p>{t.problemPrinciple}</p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="overview"
          className="data-brief-section data-brief-section--light data-brief-section--overview"
          aria-labelledby="website-auditor-overview"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.overviewEyebrow}</p>
              <h2 id="website-auditor-overview">{t.overviewH2}</h2>
              <p>{t.overviewP}</p>
            </div>
            <div className="data-brief-result-grid website-auditor-overview-grid">
              {t.overviewCards.map((card) => (
                <article key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="workflow"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="website-auditor-workflow"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.workflowEyebrow}</p>
              <h2 id="website-auditor-workflow">{t.workflowH2}</h2>
              <p>{t.workflowP}</p>
            </div>
            <div className="data-brief-flow website-auditor-flow" aria-label={t.workflowAriaLabel}>
              {t.workflowStages.map((stage) => (
                <span key={stage.title}>{stage.title}</span>
              ))}
            </div>
            <div className="data-brief-phase-grid website-auditor-stage-grid">
              {t.workflowStages.map((stage) => (
                <article key={stage.title} className="data-brief-phase-card">
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="evidence"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="website-auditor-evidence"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.evidenceEyebrow}</p>
              <h2 id="website-auditor-evidence">{t.evidenceH2}</h2>
              <p>{t.evidenceP}</p>
            </div>
            <div className="data-brief-refusal-grid website-auditor-evidence-grid">
              {t.evidenceCards.map((card) => (
                <article key={card.title} className="data-brief-refusal-card website-auditor-evidence-card">
                  <span>{card.title}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="agentic-layer"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="website-auditor-agent"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.agentEyebrow}</p>
              <h2 id="website-auditor-agent">{t.agentH2}</h2>
              <p>{t.agentP}</p>
            </div>
            <div
              className="website-auditor-truth-boundary"
              aria-label={locale === 'es' ? 'Límite de veracidad' : 'Truth boundary'}
            >
              {t.agentDiagram.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="website-auditor-llm-boundary" aria-labelledby="website-auditor-llm-boundary-title">
              <h3 id="website-auditor-llm-boundary-title">{t.llmBoundaryH3}</h3>
              <div className="website-auditor-llm-boundary__grid">
                <article className="website-auditor-llm-boundary__column website-auditor-llm-boundary__column--allowed">
                  <h4>{t.llmAllowedTitle}</h4>
                  <ul>
                    {t.llmAllowedItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
                <article className="website-auditor-llm-boundary__column website-auditor-llm-boundary__column--blocked">
                  <h4>{t.llmBlockedTitle}</h4>
                  <ul>
                    {t.llmBlockedItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section
          id="report-surface"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="website-auditor-report"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.reportEyebrow}</p>
              <h2 id="website-auditor-report">{t.reportH2}</h2>
              <p>{t.reportP}</p>
            </div>
            <figure className="data-brief-output-main website-auditor-report-surface">
              <AcceptedEvidenceCard text={t.findingCard} />
              <figcaption>{t.reportFigcaption}</figcaption>
            </figure>
            <article
              className="website-auditor-sample-output"
              aria-labelledby="website-auditor-sample-output"
            >
              <div>
                <h3 id="website-auditor-sample-output">{t.sampleAudit.title}</h3>
                <p>{t.sampleAudit.note}</p>
              </div>
              <dl>
                {t.sampleAudit.rows.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </div>
        </section>

        <section
          id="safety"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="website-auditor-safety"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.safetyEyebrow}</p>
              <h2 id="website-auditor-safety">{t.safetyH2}</h2>
              <p>{t.safetyP}</p>
            </div>
            <div className="website-auditor-safety-grid">
              {t.safetyItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section
          id="result"
          className="data-brief-section data-brief-section--dark data-brief-section--result"
          aria-labelledby="website-auditor-result"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.resultEyebrow}</p>
              <h2 id="website-auditor-result">{t.resultH2}</h2>
              <p>{t.resultP}</p>
            </div>
            <div className="data-brief-result-grid website-auditor-result-grid">
              {t.resultCards.map((card) => (
                <article key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="stack"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="website-auditor-stack"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.stackEyebrow}</p>
              <h2 id="website-auditor-stack">{t.stackH2}</h2>
              <p>{t.stackP}</p>
            </div>
            <div className="data-brief-stack website-auditor-stack" aria-label={t.stackAriaLabel}>
              {t.stackItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section
          id="boundaries"
          className="data-brief-section data-brief-section--dark data-brief-section--result"
          aria-labelledby="website-auditor-boundaries"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.boundariesEyebrow}</p>
              <h2 id="website-auditor-boundaries">{t.boundariesH2}</h2>
              <p>{t.boundariesP}</p>
            </div>
            <div className="data-brief-boundary-panel website-auditor-boundaries-panel">
              <ul className="data-brief-list">
                {t.boundaries.map((boundary) => (
                  <li key={boundary}>{boundary}</li>
                ))}
              </ul>
              <div className="data-brief-actions">
                <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                  {t.resultCTAGithub}
                </a>
                <a href="#workflow" className="data-brief-button">
                  {t.resultCTAWorkflow}
                </a>
              </div>
            </div>
          </div>
        </section>

        <CommercialCaseStudyClosing content={commercial} locale={locale} />

        <CaseStudyNext currentHref={pathname} accentColor="var(--accent)" locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
