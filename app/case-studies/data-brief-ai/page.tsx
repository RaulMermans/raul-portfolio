'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCaseStudySetup } from '@/hooks'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import {
  CommercialCaseStudyClosing,
  CommercialCaseStudyIntro,
  type CommercialCaseStudyContent,
} from '@/components/case-studies/CommercialCaseStudySections'

const githubUrl = 'https://github.com/RaulMermans/DataBrief-AI.git'
const demoUrl = 'https://data-brief-ai-sigma.vercel.app'

const commercialContent: CommercialCaseStudyContent = {
  snapshot: [
    { label: 'Type', value: 'AI reporting system' },
    { label: 'Use case', value: 'Spreadsheet analysis, business brief generation, decision support' },
    { label: 'Role', value: 'System architecture, product logic, frontend/backend implementation, AI workflow design' },
    { label: 'Stack', value: 'Next.js, FastAPI, Python analysis runtime, SQLite, CSV/XLSX parsing, controlled execution' },
    { label: 'Status', value: 'Prototype with live demo and GitHub available' },
  ],
  links: [
    { label: 'View Prototype', href: demoUrl, external: true },
    { label: 'View GitHub', href: githubUrl, external: true },
  ],
  businessContext:
    'Reporting workflows often start with messy CSV or XLSX files and end with summaries that look confident even when the source data cannot support them. This project explores how AI can help teams produce faster business briefs while keeping unsupported metrics, caveats, and data-quality limits visible.',
  systemSummary:
    'The system accepts spreadsheet files, profiles the dataset, identifies available fields, plans only supported analysis, executes controlled Python, evaluates failures, and exports a report whose claims are tied to computed outputs. Human review stays central because the system shows caveats instead of hiding uncertainty.',
  systemItems: [
    { title: 'Inputs', description: 'CSV or XLSX uploads with unknown structure, missing values, duplicates, and inconsistent column roles.' },
    { title: 'Workflow', description: 'Upload validation, semantic profiling, route selection, bounded analysis planning, execution, evaluation, repair, and export.' },
    { title: 'Processing logic', description: 'Generated Python runs under static checks and limits; unsupported metrics are removed or marked unavailable.' },
    { title: 'Output', description: 'Structured business report, findings, charts, generated code, and exportable artifacts for review.' },
    { title: 'Guardrails', description: 'Caveats, unsupported-claim checks, repair limits, and a run store make the output more traceable.' },
  ],
  whyItMatters:
    'Most AI reporting tools fail when they treat the model as an open-ended analyst. DataBrief AI takes the opposite approach: clear inputs, controlled execution, explicit constraints, and reviewable outputs. That makes the workflow more relevant for real teams where reporting quality and decision traceability matter more than broad autonomy.',
  clientRelevance:
    'A client-facing version could help marketing, CRM, ecommerce, or operations teams reduce manual spreadsheet reporting, standardize recurring summaries, and improve AI-assisted analysis without presenting unsupported conclusions as fact.',
  ctaCopy:
    "If your team has a workflow, reporting process, or creative operation that could benefit from structured AI support, send a short brief and I'll help map the system logic.",
}

const commercialContentEs: CommercialCaseStudyContent = {
  snapshot: [
    { label: 'Tipo', value: 'Sistema de reporting con IA' },
    { label: 'Uso', value: 'Análisis de hojas de cálculo, briefs de negocio y apoyo a decisiones' },
    { label: 'Rol', value: 'Arquitectura de sistema, lógica de producto, implementación frontend/backend y diseño de flujo con IA' },
    { label: 'Stack', value: 'Next.js, FastAPI, runtime de análisis Python, SQLite, parsing CSV/XLSX y ejecución controlada' },
    { label: 'Estado', value: 'Prototipo con demo en vivo y GitHub disponible' },
  ],
  links: [
    { label: 'Ver prototipo', href: demoUrl, external: true },
    { label: 'Ver GitHub', href: githubUrl, external: true },
  ],
  businessContext:
    'Los flujos de reporting suelen empezar con archivos CSV o XLSX desordenados y terminar con resúmenes que parecen seguros incluso cuando los datos no los respaldan. Este proyecto explora cómo la IA puede acelerar briefs de negocio manteniendo visibles las métricas no soportadas, las advertencias y los límites de calidad del dato.',
  systemSummary:
    'El sistema acepta hojas de cálculo, perfila el dataset, identifica campos disponibles, planifica solo análisis respaldados, ejecuta Python controlado, evalúa fallos y exporta un informe cuyas afirmaciones quedan ligadas a resultados calculados. La revisión humana sigue siendo central porque el sistema muestra incertidumbre en vez de esconderla.',
  systemItems: [
    { title: 'Inputs', description: 'CSV o XLSX con estructura desconocida, valores ausentes, duplicados y roles de columna inconsistentes.' },
    { title: 'Flujo', description: 'Validación de subida, perfilado semántico, selección de ruta, planificación acotada, ejecución, evaluación, reparación y exportación.' },
    { title: 'Lógica de proceso', description: 'El Python generado se ejecuta bajo verificaciones estáticas y límites; las métricas no soportadas se eliminan o se marcan como no disponibles.' },
    { title: 'Resultado', description: 'Informe de negocio estructurado, hallazgos, gráficos, código generado y artefactos exportables para revisión.' },
    { title: 'Límites', description: 'Advertencias, comprobaciones de afirmaciones no soportadas, límite de reparación y almacén de ejecuciones hacen el resultado más trazable.' },
  ],
  whyItMatters:
    'Muchas herramientas de reporting con IA fallan cuando tratan el modelo como analista abierto. DataBrief AI hace lo contrario: entradas claras, ejecución controlada, restricciones explícitas y resultados revisables. Eso encaja mejor con equipos reales, donde la calidad del informe y la trazabilidad de la decisión pesan más que la autonomía amplia.',
  clientRelevance:
    'Una versión para cliente podría ayudar a equipos de marketing, CRM, ecommerce u operaciones a reducir reporting manual, estandarizar resúmenes recurrentes y mejorar análisis asistidos por IA sin presentar conclusiones no soportadas como hechos.',
  ctaCopy:
    'Si tu equipo tiene un flujo, proceso de reporting u operación creativa que podría beneficiarse de una capa de IA más estructurada, envía un brief breve y te ayudo a mapear la lógica del sistema.',
}

const content = {
  en: {
    back: 'Back to Case Studies',
    eyebrow: 'AI Systems / Analytics Workflow',
    heroTitle: 'DataBrief AI',
    heroSubtitle:
      'A bounded AI workflow that turns spreadsheet uploads into grounded business reports — without inventing unsupported metrics.',
    heroDescription:
      'DataBrief AI analyzes CSV/XLSX files through semantic role detection, controlled Python execution, bounded repair, and report export. The system is designed to surface what the data supports and make unsupported metrics explicit.',
    heroFigcaption: 'Representative report preview showing supported metrics and explicit caveats.',
    heroFigAriaLabel: 'Report output preview',
    heroCTA: 'View Prototype →',
    heroCTAGithub: 'View GitHub →',
    heroCTAHow: 'View System Logic',
    tags: ['Bounded AI', 'CSV/XLSX', 'Python', 'Report Export', 'Evaluation Loop'],
    nav: [
      ['Overview', '#overview'],
      ['Workflow', '#workflow'],
      ['Output', '#output'],
      ['Architecture', '#architecture'],
      ['Result', '#result'],
    ] as const,
    navAriaLabel: 'DataBrief AI page sections',
    overviewEyebrow: 'Overview',
    overviewH2: 'The product promise is restraint',
    overviewP:
      'Spreadsheets often contain useful business signals, but AI reports become misleading when they calculate metrics the dataset cannot support. DataBrief AI is built around a stricter question: what can this file prove, and what should the system refuse to infer?',
    proofCards: [
      {
        title: 'Order Count / Average Order Value',
        reason: 'No order ID was detected.',
        outcome: 'The report switches to purchase-line analysis instead of inventing order metrics.',
      },
      {
        title: 'Return/cancel rate = 0%',
        reason: 'No return, refund, cancel, or status field was detected.',
        outcome: 'The report marks the metric unavailable instead of presenting a false zero.',
      },
    ],
    unsupportedLabel: 'Unsupported claim avoided',
    reasonLabel: 'Reason',
    outcomeLabel: 'Outcome',
    principleLabel: 'Design principle',
    principleStrong: 'Reliability over autonomy.',
    principleP:
      'The value of the workflow is not that it tries to answer everything. It is that it makes unsupported claims visible before they become business reporting.',
    workflowEyebrow: 'Workflow',
    workflowH2: 'Four phases, clear boundaries',
    workflowP:
      'The software keeps a strict pipeline behind the simplified presentation: validate the upload, profile the dataset, route the domain, plan supported analysis, execute generated Python, evaluate the result, repair only recoverable failures, then package the report and exports.',
    workflowAriaLabel: 'DataBrief AI workflow',
    workflowPhases: [
      {
        title: 'Profile',
        description: 'Read rows, columns, types, missing values, duplicates, and semantic field roles.',
      },
      {
        title: 'Route + Plan',
        description: 'Classify the dataset domain and build a bounded KPI/chart plan from supported signals only.',
      },
      {
        title: 'Execute',
        description: 'Run controlled Python analysis to create metrics, charts, and structured artifacts.',
      },
      {
        title: 'Evaluate + Export',
        description:
          'Classify execution results, repair only recoverable failures, ground the report, and package exports.',
      },
    ],
    outputEyebrow: 'Output',
    outputH2: 'A report surface that separates signal from caveat',
    outputP:
      'The page keeps one strong report preview and three supporting output cards, instead of repeating the same mockup across every section.',
    outputMainFigcaption: 'Representative run preview. Unsupported order-level metrics are explicitly flagged.',
    outputPreviews: [
      {
        label: 'A',
        title: 'Supported metrics',
        caption: 'The report leads with metrics the uploaded file can actually support.',
      },
      {
        label: 'B',
        title: 'Grounded findings',
        caption: 'Findings and data quality checks are shown before interpretation.',
      },
      {
        label: 'C',
        title: 'Artifacts + exports',
        caption: 'Report Markdown, findings JSON, charts, and generated analysis code stay tied to the run.',
      },
    ],
    architectureEyebrow: 'Architecture',
    architectureH2: 'The software is a bounded pipeline, not a chatbot wrapper',
    architectureP:
      'The system is organized around explicit service boundaries: profile first, route from detectable signals, generate analysis code from templates, run it under guardrails, evaluate the result, and expose artifacts through stable export endpoints.',
    softwareLayers: [
      {
        title: 'HTTP boundary',
        description:
          'FastAPI accepts CSV/XLSX uploads, validates size and format, creates a run record, and exposes status, artifact, and export endpoints without leaking host paths.',
      },
      {
        title: 'Semantic profiling',
        description:
          'The backend profiles rows, columns, missing values, duplicates, inferred types, and semantic roles before deciding what analysis path is allowed.',
      },
      {
        title: 'Controlled execution',
        description:
          'Template-generated Python is checked with AST import rules and suspicious-pattern guards, then run in an isolated subprocess with time and resource limits.',
      },
      {
        title: 'Evaluation loop',
        description:
          'Execution results are classified as success, recoverable, or unrecoverable. Recoverable failures get at most two deterministic repair attempts.',
      },
      {
        title: 'Grounded report',
        description:
          'The report generator builds KPIs, findings, warnings, recommendations, and caveats from computed outputs only, then revises unsupported claims in one pass.',
      },
      {
        title: 'Run store',
        description:
          'SQLite tracks run status, route, plan, evaluation, retry count, generated code, report payload, expiry, and export metadata for each upload.',
      },
    ],
    resultEyebrow: 'Result',
    resultH2: 'A useful AI system because it stays inside its lane',
    resultP:
      'DataBrief AI uses agentic patterns — routing, evaluation, bounded repair, and grounded generation — inside a deterministic workflow shell.',
    resultCards: [
      {
        title: 'Product decision',
        description:
          'A bounded workflow fits spreadsheet analysis better than a free-form agent because the task has a repeatable structure.',
      },
      {
        title: 'Reliability frame',
        description:
          'The system values explicit caveats, controlled execution, and supported outputs over broad autonomy.',
      },
      {
        title: 'Public boundary',
        description:
          'The case study shows architecture and behavior without positioning the prototype as production SaaS.',
      },
    ],
    builtWithLabel: 'Built with',
    stackAriaLabel: 'DataBrief AI technology stack',
    boundariesLabel: 'Boundaries',
    stackItems: [
      'Next.js frontend',
      'FastAPI backend',
      'Python analysis runtime',
      'CSV/XLSX parsing',
      'Static code checks',
      'Controlled execution',
      'Report export',
      'Semantic quality tests',
    ],
    limitations: [
      'It is not positioned as production SaaS.',
      'It is not a fully autonomous AI agent.',
      'It does not implement OS-level sandbox isolation.',
      'It does not enrich uploads with external web sources.',
      'Output quality depends on detectable column roles and dataset structure.',
      'Dedicated campaign-performance routing is a future domain extension.',
    ],
    resultCTADemo: 'View Prototype →',
    resultCTAGithub: 'View GitHub →',
    resultCTAArch: 'View Architecture',
    report: {
      title: 'Analysis Report',
      confidence: 'Data confidence: High',
      status1: 'Execution complete',
      status2: 'Unsupported metrics flagged',
      metric1: { label: 'Primary metric', value: '$10,482', sub: 'Total spend detected' },
      metric2: { label: 'Purchase line count', value: '1,248', sub: 'Rows with purchase signal' },
      metric3: { label: 'Average spend per row', value: '$8.40', sub: 'Supported by row-level data' },
      note: 'Order Count and Average Order Value are unavailable because no order ID was detected.',
      findingsTitle: 'Top findings',
      findingsStatus: 'Grounded',
      finding1: 'Highest spend appears in household and grocery categories.',
      finding2: 'Missing values and duplicate rows are surfaced before interpretation.',
      caveat: 'Unavailable: true order-level metrics.',
      chartsTitle: 'Charts',
      chartsStatus: 'Generated',
      exportsTitle: 'Exports',
      exportsStatus: 'Ready',
    },
  },
  es: {
    back: 'Volver a casos',
    eyebrow: 'Sistemas de IA / Flujo de análisis',
    heroTitle: 'DataBrief AI',
    heroSubtitle:
      'Un flujo de trabajo de IA acotado que convierte hojas de cálculo en informes de negocio contrastados — sin inventar métricas que los datos no respaldan.',
    heroDescription:
      'DataBrief AI analiza archivos CSV/XLSX mediante detección de roles semánticos, ejecución Python controlada, reparación acotada y exportación de informes. El sistema está diseñado para mostrar lo que los datos pueden respaldar y hacer explícitas las métricas no disponibles.',
    heroFigcaption: 'Vista previa representativa del informe con métricas soportadas y avisos explícitos.',
    heroFigAriaLabel: 'Vista previa del informe generado',
    heroCTA: 'Demo en vivo →',
    heroCTAGithub: 'GitHub →',
    heroCTAHow: 'Cómo funciona',
    tags: ['IA acotada', 'CSV/XLSX', 'Python', 'Exportación de informes', 'Bucle de evaluación'],
    nav: [
      ['Resumen', '#overview'],
      ['Flujo', '#workflow'],
      ['Resultado', '#output'],
      ['Arquitectura', '#architecture'],
      ['Resultado', '#result'],
    ] as const,
    navAriaLabel: 'Secciones de la página DataBrief AI',
    overviewEyebrow: 'Resumen',
    overviewH2: 'La promesa del producto es la contención',
    overviewP:
      'Las hojas de cálculo suelen contener señales de negocio útiles, pero los informes de IA se vuelven engañosos cuando calculan métricas que el dataset no puede respaldar. DataBrief AI se construye alrededor de una pregunta más estricta: ¿qué puede probar este archivo y qué debería negarse a inferir el sistema?',
    proofCards: [
      {
        title: 'Recuento de pedidos / Valor medio de pedido',
        reason: 'No se detectó ningún ID de pedido.',
        outcome: 'El informe cambia al análisis por línea de compra en lugar de inventar métricas de pedidos.',
      },
      {
        title: 'Tasa de devolución/cancelación = 0%',
        reason: 'No se detectó ningún campo de devolución, reembolso, cancelación ni estado.',
        outcome: 'El informe marca la métrica como no disponible en lugar de mostrar un cero falso.',
      },
    ],
    unsupportedLabel: 'Afirmación no soportada evitada',
    reasonLabel: 'Razón',
    outcomeLabel: 'Resultado',
    principleLabel: 'Principio de diseño',
    principleStrong: 'Fiabilidad por encima de autonomía.',
    principleP:
      'El valor del flujo no está en que intente responder a todo. Está en que hace visibles las afirmaciones no soportadas antes de que se conviertan en métricas de negocio.',
    workflowEyebrow: 'Flujo de trabajo',
    workflowH2: 'Cuatro fases, límites claros',
    workflowP:
      'El software mantiene un flujo estricto detrás de la presentación simplificada: valida la subida, analiza el dataset, enruta el dominio, planifica el análisis soportado, ejecuta el Python generado, evalúa el resultado, repara solo los fallos recuperables y empaqueta el informe y las exportaciones.',
    workflowAriaLabel: 'Flujo de trabajo de DataBrief AI',
    workflowPhases: [
      {
        title: 'Análisis',
        description: 'Lee filas, columnas, tipos, valores ausentes, duplicados y roles semánticos de los campos.',
      },
      {
        title: 'Enrutamiento y plan',
        description:
          'Clasifica el dominio del dataset y construye un plan acotado de KPIs y gráficos solo desde las señales detectadas.',
      },
      {
        title: 'Ejecución',
        description: 'Ejecuta análisis Python controlado para crear métricas, gráficos y artefactos estructurados.',
      },
      {
        title: 'Evaluación y exportación',
        description:
          'Clasifica los resultados de la ejecución, repara solo los fallos recuperables, contrasta el informe y empaqueta las exportaciones.',
      },
    ],
    outputEyebrow: 'Resultado',
    outputH2: 'Un informe que separa señal de advertencia',
    outputP:
      'La página mantiene una sola vista previa de informe sólida y tres tarjetas de apoyo, en lugar de repetir el mismo ejemplo visual en cada sección.',
    outputMainFigcaption:
      'Vista previa representativa de una ejecución. Las métricas de pedido no soportadas se marcan explícitamente.',
    outputPreviews: [
      {
        label: 'A',
        title: 'Métricas soportadas',
        caption: 'El informe arranca con las métricas que el archivo subido puede realmente respaldar.',
      },
      {
        label: 'B',
        title: 'Hallazgos contrastados',
        caption: 'Los hallazgos y controles de calidad se muestran antes de la interpretación.',
      },
      {
        label: 'C',
        title: 'Artefactos y exportaciones',
        caption:
          'El Markdown del informe, el JSON de hallazgos, los gráficos y el código de análisis quedan vinculados a cada ejecución.',
      },
    ],
    architectureEyebrow: 'Arquitectura',
    architectureH2: 'El software es un flujo acotado, no un chatbot con envoltura de API',
    architectureP:
      'El sistema se organiza alrededor de fronteras de servicio explícitas: analizar primero, enrutar desde señales detectables, generar código de análisis desde plantillas, ejecutarlo bajo restricciones, evaluar el resultado y exponer artefactos mediante endpoints de exportación estables.',
    softwareLayers: [
      {
        title: 'Frontera HTTP',
        description:
          'FastAPI acepta subidas CSV/XLSX, valida tamaño y formato, crea un registro de ejecución y expone endpoints de estado, artefactos y exportaciones sin filtrar rutas del host.',
      },
      {
        title: 'Análisis semántico',
        description:
          'El backend analiza filas, columnas, valores ausentes, duplicados, tipos inferidos y roles semánticos antes de decidir qué camino de análisis está permitido.',
      },
      {
        title: 'Ejecución controlada',
        description:
          'El Python generado desde plantillas se verifica con reglas de importación AST y guardas de patrones sospechosos, y luego se ejecuta en un subproceso aislado con límites de tiempo y recursos.',
      },
      {
        title: 'Bucle de evaluación',
        description:
          'Los resultados de ejecución se clasifican como éxito, recuperables o irrecuperables. Los fallos recuperables reciben como máximo dos intentos de reparación deterministas.',
      },
      {
        title: 'Informe contrastado',
        description:
          'El generador de informes construye KPIs, hallazgos, advertencias, recomendaciones y aclaraciones solo desde los resultados calculados, y revisa en un único pase las afirmaciones no soportadas.',
      },
      {
        title: 'Almacén de ejecuciones',
        description:
          'SQLite rastrea estado de ejecución, ruta, plan, evaluación, contador de reintentos, código generado, payload del informe, caducidad y metadatos de exportación de cada subida.',
      },
    ],
    resultEyebrow: 'Resultado',
    resultH2: 'Un sistema de IA útil porque sabe cuándo parar',
    resultP:
      'DataBrief AI usa patrones agénticos — enrutamiento, evaluación, reparación acotada y generación contrastada — dentro de un shell de flujo determinista.',
    resultCards: [
      {
        title: 'Decisión de producto',
        description:
          'Un flujo acotado encaja mejor con el análisis de hojas de cálculo que un agente de forma libre, porque la tarea tiene una estructura repetible.',
      },
      {
        title: 'Marco de fiabilidad',
        description:
          'El sistema valora los avisos explícitos, la ejecución controlada y los resultados respaldados por encima de la autonomía amplia.',
      },
      {
        title: 'Límite público',
        description:
          'El caso de estudio muestra arquitectura y comportamiento sin posicionar el prototipo como SaaS de producción.',
      },
    ],
    builtWithLabel: 'Construido con',
    stackAriaLabel: 'Stack tecnológico de DataBrief AI',
    boundariesLabel: 'Límites',
    stackItems: [
      'Frontend Next.js',
      'Backend FastAPI',
      'Runtime de análisis Python',
      'Procesamiento CSV/XLSX',
      'Verificaciones de código estático',
      'Ejecución controlada',
      'Exportación de informes',
      'Tests de calidad semántica',
    ],
    limitations: [
      'No está posicionado como SaaS de producción.',
      'No es un agente de IA completamente autónomo.',
      'No implementa aislamiento a nivel de sistema operativo.',
      'No enriquece las subidas con fuentes externas de internet.',
      'La calidad de los resultados depende de los roles de columna detectables y la estructura del dataset.',
      'El enrutamiento específico para rendimiento de campañas es una extensión de dominio futura.',
    ],
    resultCTADemo: 'Abrir la demo →',
    resultCTAGithub: 'Ver en GitHub →',
    resultCTAArch: 'Ver arquitectura',
    report: {
      title: 'Informe de análisis',
      confidence: 'Confianza de datos: Alta',
      status1: 'Ejecución completada',
      status2: 'Métricas no soportadas marcadas',
      metric1: { label: 'Métrica principal', value: '$10.482', sub: 'Gasto total detectado' },
      metric2: { label: 'Líneas de compra', value: '1.248', sub: 'Filas con señal de compra' },
      metric3: { label: 'Gasto medio por fila', value: '$8,40', sub: 'Soportado por datos de fila' },
      note: 'Recuento de pedidos y Valor medio de pedido no están disponibles porque no se detectó ningún ID de pedido.',
      findingsTitle: 'Principales hallazgos',
      findingsStatus: 'Contrastados',
      finding1: 'El mayor gasto se concentra en las categorías de hogar y alimentación.',
      finding2: 'Los valores ausentes y filas duplicadas se muestran antes de la interpretación.',
      caveat: 'No disponible: métricas reales a nivel de pedido.',
      chartsTitle: 'Gráficos',
      chartsStatus: 'Generados',
      exportsTitle: 'Exportaciones',
      exportsStatus: 'Listas',
    },
  },
}

type ReportText = typeof content.en.report

function ReportMockup({
  variant = 'hero',
  text,
}: {
  variant?: 'hero' | 'findings' | 'charts' | 'exports'
  text: ReportText
}) {
  if (variant === 'findings') {
    return (
      <div className="data-brief-report data-brief-report--compact">
        <div className="data-brief-report__topline">
          <span>{text.findingsTitle}</span>
          <strong>{text.findingsStatus}</strong>
        </div>
        <div className="data-brief-report__findings">
          <p>{text.finding1}</p>
          <p>{text.finding2}</p>
          <p className="data-brief-report__caveat">{text.caveat}</p>
        </div>
      </div>
    )
  }

  if (variant === 'charts') {
    return (
      <div className="data-brief-report data-brief-report--compact">
        <div className="data-brief-report__topline">
          <span>{text.chartsTitle}</span>
          <strong>{text.chartsStatus}</strong>
        </div>
        <div className="data-brief-chart" aria-hidden="true">
          <span style={{ height: '54%' }} />
          <span style={{ height: '78%' }} />
          <span style={{ height: '42%' }} />
          <span style={{ height: '66%' }} />
          <span style={{ height: '88%' }} />
        </div>
      </div>
    )
  }

  if (variant === 'exports') {
    return (
      <div className="data-brief-report data-brief-report--compact">
        <div className="data-brief-report__topline">
          <span>{text.exportsTitle}</span>
          <strong>{text.exportsStatus}</strong>
        </div>
        <div className="data-brief-export-list">
          <span>report.md</span>
          <span>findings.json</span>
          <span>analysis.py</span>
        </div>
      </div>
    )
  }

  return (
    <div className="data-brief-report">
      <div className="data-brief-report__topline">
        <span>{text.title}</span>
        <strong>{text.confidence}</strong>
      </div>
      <div className="data-brief-report__status">
        <span>{text.status1}</span>
        <span>{text.status2}</span>
      </div>
      <div className="data-brief-report__metrics">
        <article>
          <span>{text.metric1.label}</span>
          <strong>{text.metric1.value}</strong>
          <em>{text.metric1.sub}</em>
        </article>
        <article>
          <span>{text.metric2.label}</span>
          <strong>{text.metric2.value}</strong>
          <em>{text.metric2.sub}</em>
        </article>
        <article>
          <span>{text.metric3.label}</span>
          <strong>{text.metric3.value}</strong>
          <em>{text.metric3.sub}</em>
        </article>
      </div>
      <div className="data-brief-report__note">{text.note}</div>
    </div>
  )
}

export default function DataBriefAiPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const t = content[locale]
  const commercial = locale === 'es' ? commercialContentEs : commercialContent

  useCaseStudySetup()

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="case-study-page-new case-study-page-new--data-brief">
        <section className="data-brief-hero" aria-labelledby="data-brief-title">
          <div className="data-brief-hero__content">
            <Link href={localizePath('/case-studies', locale)} className="data-brief-back">
              {t.back}
            </Link>
            <p className="data-brief-eyebrow">{t.eyebrow}</p>
            <h1 id="data-brief-title" className="data-brief-hero__title">
              {t.heroTitle}
            </h1>
            <p className="data-brief-hero__subtitle">{t.heroSubtitle}</p>
            <p className="data-brief-hero__description">{t.heroDescription}</p>
            <div className="data-brief-actions" aria-label="Project links">
              <a href={demoUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                {t.heroCTA}
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-button">
                {t.heroCTAGithub}
              </a>
              <a href="#workflow" className="data-brief-button">
                {t.heroCTAHow}
              </a>
            </div>
            <div className="data-brief-tags" aria-label="Project tags">
              {t.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <figure className="data-brief-hero__visual" aria-label={t.heroFigAriaLabel}>
            <ReportMockup text={t.report} />
            <figcaption>{t.heroFigcaption}</figcaption>
          </figure>
        </section>

        <nav className="data-brief-mini-nav" aria-label={t.navAriaLabel}>
          {t.nav.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <CommercialCaseStudyIntro content={commercial} locale={locale} />

        <section
          id="overview"
          className="data-brief-section data-brief-section--light data-brief-section--overview"
          aria-labelledby="data-brief-problem"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.overviewEyebrow}</p>
              <h2 id="data-brief-problem">{t.overviewH2}</h2>
              <p>{t.overviewP}</p>
            </div>
            <div className="data-brief-refusal-grid">
              {t.proofCards.map((card) => (
                <article key={card.title} className="data-brief-refusal-card">
                  <span>{t.unsupportedLabel}</span>
                  <h3>{card.title}</h3>
                  <dl>
                    <div>
                      <dt>{t.reasonLabel}</dt>
                      <dd>{card.reason}</dd>
                    </div>
                    <div>
                      <dt>{t.outcomeLabel}</dt>
                      <dd>{card.outcome}</dd>
                    </div>
                  </dl>
                </article>
              ))}
              <article className="data-brief-principle-card">
                <span>{t.principleLabel}</span>
                <strong>{t.principleStrong}</strong>
                <p>{t.principleP}</p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="workflow"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="data-brief-workflow"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.workflowEyebrow}</p>
              <h2 id="data-brief-workflow">{t.workflowH2}</h2>
              <p>{t.workflowP}</p>
            </div>
            <div className="data-brief-flow" aria-label={t.workflowAriaLabel}>
              {t.workflowPhases.map((phase) => (
                <span key={phase.title}>{phase.title}</span>
              ))}
            </div>
            <div className="data-brief-phase-grid">
              {t.workflowPhases.map((phase) => (
                <article key={phase.title} className="data-brief-phase-card">
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="output"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="data-brief-output"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.outputEyebrow}</p>
              <h2 id="data-brief-output">{t.outputH2}</h2>
              <p>{t.outputP}</p>
            </div>
            <div className="data-brief-output-showcase">
              <figure className="data-brief-output-main">
                <ReportMockup text={t.report} />
                <figcaption>{t.outputMainFigcaption}</figcaption>
              </figure>
              <div className="data-brief-output-list">
                {t.outputPreviews.map((preview) => (
                  <article key={preview.label}>
                    <span>{preview.label}</span>
                    <h3>{preview.title}</h3>
                    <p>{preview.caption}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="architecture"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="data-brief-architecture"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.architectureEyebrow}</p>
              <h2 id="data-brief-architecture">{t.architectureH2}</h2>
              <p>{t.architectureP}</p>
            </div>
            <div className="data-brief-card-grid data-brief-card-grid--architecture data-brief-card-grid--software">
              {t.softwareLayers.map((layer) => (
                <article key={layer.title} className="data-brief-card data-brief-card--architecture">
                  <h3>{layer.title}</h3>
                  <p>{layer.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="result"
          className="data-brief-section data-brief-section--dark data-brief-section--result"
          aria-labelledby="data-brief-result"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.resultEyebrow}</p>
              <h2 id="data-brief-result">{t.resultH2}</h2>
              <p>{t.resultP}</p>
            </div>
            <div className="data-brief-result-grid">
              {t.resultCards.map((card) => (
                <article key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
            <div className="data-brief-boundary-panel">
              <div>
                <p className="data-brief-eyebrow">{t.builtWithLabel}</p>
                <div className="data-brief-stack" aria-label={t.stackAriaLabel}>
                  {t.stackItems.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="data-brief-eyebrow">{t.boundariesLabel}</p>
                <ul className="data-brief-list">
                  {t.limitations.map((limitation) => (
                    <li key={limitation}>{limitation}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="data-brief-actions">
              <a href={demoUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                {t.resultCTADemo}
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-button">
                {t.resultCTAGithub}
              </a>
              <a href="#architecture" className="data-brief-button">
                {t.resultCTAArch}
              </a>
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
