'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import CaseStudyMiniNav from '@/components/case-studies/CaseStudyMiniNav'
import { CaseStudySnapshot } from '@/components/case-studies/CommercialCaseStudySections'
import { useCaseStudySetup } from '@/hooks'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'

const demoUrl = 'https://campaign-pulse.vercel.app/'
const githubUrl = 'https://github.com/RaulMermans/campaign-pulse'
const workflowReferenceUrl =
  'https://github.com/filipecalegario/awesome-vibe-coding'
const imageBase = '/images/case-studies/campaign-pulse'

const shared = {
  stack: [
    'Next.js',
    'TypeScript',
    'Tailwind',
    'Recharts',
    'Local JSON',
    'localStorage',
    'FileReader CSV',
    'GitHub Actions',
  ],
  screenshots: [
    { src: `${imageBase}/overview.png`, key: 'overview', wide: true },
    { src: `${imageBase}/data-import.png`, key: 'data' },
    { src: `${imageBase}/column-mapping.png`, key: 'mapping' },
    { src: `${imageBase}/audience-overview.png`, key: 'audience' },
    { src: `${imageBase}/audience-detail.png`, key: 'audienceDetail' },
    { src: `${imageBase}/calendar.png`, key: 'calendar' },
    { src: `${imageBase}/newsletters.png`, key: 'newsletters' },
    { src: `${imageBase}/campaigns.png`, key: 'campaigns' },
    { src: `${imageBase}/report.png`, key: 'report', wide: true },
  ],
}

const content = {
  en: {
    back: '← Case Studies',
    eyebrow: 'Marketing intelligence / Data product',
    title: 'Campaign Pulse',
    subtitle: 'Local-first marketing intelligence command center.',
    description:
      'Campaign Pulse turns newsletter, campaign, audience, target, and CSV export data into adapter-validated diagnostics, audience pressure signals, target-aware performance reads, and monthly operating reports.',
    status: 'Portfolio-ready / local-first prototype',
    demo: 'View live demo →',
    github: 'View GitHub →',
    visualCaption:
      'Overview mission-control using synthetic Demo JSON. No customer data is shown.',
    nav: [
      ['Problem', '#problem'],
      ['System', '#system'],
      ['Screens', '#screens'],
      ['Intelligence', '#intelligence'],
      ['Engineering', '#engineering'],
      ['Outcome', '#outcome'],
    ] as const,
    snapshot: [
      ['Type', 'Advanced frontend data-product prototype'],
      [
        'Use case',
        'Newsletter performance, audience pressure, targets, and monthly reporting',
      ],
      ['Role', 'Product thinking, data modeling, UX, and frontend engineering'],
      ['Data boundary', 'Synthetic JSON and browser-local CSV sessions'],
    ],
    workflowStages: [
      'Fragmented newsletter and campaign data',
      'Normalized data model',
      'Dashboard intelligence',
      'Monthly decision, report, and export',
    ],
    problemEyebrow: 'Problem',
    problemTitle: ['Metrics are available.', 'Decisions are still fragmented.'],
    problemBody:
      'Newsletter teams often have performance data spread across exports, campaign reports, audience segments, and spreadsheets. The hard part is not seeing metrics — it is knowing what changed, which audience is under pressure, and what to do next.',
    solutionEyebrow: 'Solution',
    solutionTitle:
      'Normalize the facts, then make the operating decision visible.',
    solutionBody:
      'Campaign Pulse turns raw demo newsletter data and uploaded CSV exports into a normalized analytics layer with target-aware diagnostics, audience pressure signals, segment movement intelligence, and monthly operating reports.',
    builtEyebrow: 'What I built',
    builtTitle: 'A complete local-first analysis loop.',
    built: [
      [
        'Adapter contract',
        'One normalized boundary for bundled JSON and flat CSV exports.',
      ],
      [
        'Demo JSON adapter',
        'Validates synthetic campaign, newsletter, audience, and target facts.',
      ],
      [
        'CSV/export adapter',
        'Merges one-newsletter × one-segment rows into the shared model.',
      ],
      [
        'Editable column mapping',
        'Supports inferred aliases, manual overrides, and required-field checks.',
      ],
      [
        'Rejected-row diagnostics',
        'Explains invalid rows before a session dataset can be activated.',
      ],
      [
        'Client-side CSV upload',
        'Reads local files with FileReader; nothing is sent to a server.',
      ],
      [
        'Editable targets',
        'Global, campaign, and segment targets persist in localStorage.',
      ],
      [
        'Target comparison chips',
        'On track, watch, and off-track states stay visible in context.',
      ],
      [
        'Audience master-detail',
        'All segments remain comparable while one opens into deeper evidence.',
      ],
      [
        'Calendar + drawer',
        'Cadence and newsletter detail share the same operating context.',
      ],
      [
        'Campaign comparison',
        'Contribution, pressure, strongest sends, and next actions in one read.',
      ],
      [
        'Monthly report + export pack',
        'Print-ready memo and browser-generated JSON/CSV artifacts.',
      ],
      [
        'CI + deployment prep',
        'Focused tests, GitHub Actions quality gates, and Vercel configuration.',
      ],
    ],
    systemEyebrow: 'Architecture / System map',
    systemTitle: 'Ingestion, intelligence, and presentation stay separate.',
    systemBody:
      'Raw source facts do not contain precomputed rates, rankings, diagnoses, or recommendations. Adapters normalize inputs first; deterministic TypeScript utilities compute the intelligence layer after validation.',
    layers: [
      ['Inputs', 'Bundled synthetic JSON or a browser-local CSV export.'],
      [
        'Contract',
        'Mapping, validation, rejection reasons, and normalized entities.',
      ],
      [
        'Intelligence',
        'Rates, rankings, pressure, movement, targets, risks, and recommendations.',
      ],
      [
        'Workspaces',
        'Overview, Calendar, Newsletters, Campaigns, Audience, Insights, Report, and Data.',
      ],
    ],
    screensEyebrow: 'Key product screens',
    screensTitle: 'One dataset, multiple decision surfaces.',
    screensBody:
      'The interface is organized as an operating room rather than a generic dashboard. Each workspace answers a different question while preserving the same month, source, target, and detail context.',
    screenshotCopy: {
      overview: [
        'Overview mission-control',
        'Business health, revenue target, audience pressure, and the best next move.',
      ],
      data: [
        'Data import and export console',
        'Local CSV upload, source state, export pack, and session-only boundary.',
      ],
      mapping: [
        'Editable column mapping',
        'Mapping confidence, required fields, accepted rows, and diagnostics.',
      ],
      audience: [
        'Audience master-detail',
        'Segment value, movement, pressure, target state, and recommended action.',
      ],
      audienceDetail: [
        'Selected segment detail',
        'Weekly pressure, fatigue diagnosis, history, and member-level evidence.',
      ],
      calendar: [
        'Calendar month view',
        'Send cadence, pressure treatment, newsletter cards, and month summary.',
      ],
      newsletters: [
        'Newsletter rankings',
        'Best and weakest sends, blended ranking, engagement, revenue, and risk.',
      ],
      campaigns: [
        'Campaign comparison',
        'Contribution, RPR, pressure, target state, strongest send, and recommendation.',
      ],
      report: [
        'Monthly operating memo',
        'Executive summary, evidence, target state, audience risk, and next actions.',
      ],
    },
    intelligenceEyebrow: 'Data intelligence',
    intelligenceTitle: 'Deterministic signals, not AI-generated commentary.',
    intelligenceBody:
      'Every read is calculated from normalized local facts. The prototype makes formulas and operating thresholds inspectable, repeatable, and testable.',
    metrics: [
      [
        'OR',
        'Unique opens ÷ delivered. A top-level read on subject-line and sender response.',
      ],
      [
        'CTR',
        'Unique clicks ÷ delivered. Measures click depth across the delivered audience.',
      ],
      [
        'CTOR',
        'Unique clicks ÷ unique opens. Separates post-open content performance from reach.',
      ],
      [
        'Conversion rate',
        'Orders ÷ delivered. Connects newsletter delivery to downstream action.',
      ],
      [
        'RPR',
        'Revenue ÷ delivered. Compares audience value across sends, campaigns, and segments.',
      ],
      [
        'Revenue vs target',
        'Actual revenue is evaluated against editable global or scoped targets.',
      ],
      [
        'Pressure / saturation',
        'Send frequency, overlap, and negative signals expose overexposure risk.',
      ],
      [
        'Segment movement',
        'Growing, stable, declining, fatigued, and recovering states add direction.',
      ],
      [
        'Rejected-row diagnostics',
        'Invalid source rows stay visible instead of silently disappearing.',
      ],
      [
        'Target-aware recommendations',
        'Next actions respond to performance and pressure constraints together.',
      ],
    ],
    engineeringEyebrow: 'Engineering notes',
    engineeringTitle: 'A credible frontend prototype with explicit boundaries.',
    engineeringBody:
      'The build focuses on product architecture, deterministic analytics, adapter design, and interaction quality without introducing infrastructure the prototype does not need.',
    engineeringPoints: [
      'Next.js 14 App Router, React, TypeScript, Tailwind CSS, and Recharts.',
      'Static local JSON for synthetic demo facts and default target settings.',
      'Browser FileReader for CSV parsing and session-only dataset activation.',
      'localStorage for editable target settings only.',
      'Deterministic analytics utilities with focused adapter, target, upload, and export tests.',
      'GitHub Actions CI and Git-connected Vercel deployment with no environment variables.',
      'No backend, database, authentication, API keys, OAuth, or AI/LLM calls.',
    ],
    limitationsEyebrow: 'Honest limitations',
    limitationsTitle: 'Portfolio prototype, not production SaaS.',
    limitations: [
      'Uploaded CSV data is available only for the current browser session.',
      'There is no live CRM or ESP API integration, scheduled import, or reconciliation workflow.',
      'There is no backend, database, authentication, multi-user state, or server-side audit trail.',
      'All bundled records are synthetic; the demo contains no real customer data.',
      'Analytics and recommendations require validation against production-owned business definitions.',
      'A production version would add auth, durable storage, scheduled imports, observability, and vendor connectors.',
    ],
    reference:
      'The implementation workflow also referenced the curated awesome-vibe-coding collection as a development resource.',
    outcomeEyebrow: 'Outcome',
    outcomeTitle: 'A portfolio-grade internal tool prototype.',
    outcomeBody:
      'Campaign Pulse demonstrates product thinking, frontend engineering, data modeling, deterministic analytics, adapter design, and UX iteration in one coherent local-first product surface.',
    outcomeCards: [
      [
        'Product thinking',
        'Turns fragmented metrics into explicit operating questions and next moves.',
      ],
      [
        'Frontend engineering',
        'Coordinates dense analytics workspaces without relying on backend complexity.',
      ],
      [
        'Data modeling',
        'Separates source rows, normalized facts, computed intelligence, and presentation.',
      ],
      [
        'UX iteration',
        'Balances mission-control scanning with deeper calendar, audience, campaign, and report reads.',
      ],
    ],
  },
  es: {
    back: '← Casos de estudio',
    eyebrow: 'Inteligencia de marketing / Producto de datos',
    title: 'Campaign Pulse',
    subtitle: 'Centro de mando local-first para inteligencia de marketing.',
    description:
      'Campaign Pulse convierte datos de newsletters, campañas, audiencias, objetivos y exportaciones CSV en diagnósticos validados por adaptadores, señales de presión, lecturas frente a objetivos e informes operativos mensuales.',
    status: 'Listo para portfolio / prototipo local-first',
    demo: 'Ver demo en vivo →',
    github: 'Ver GitHub →',
    visualCaption:
      'Mission-control con datos Demo JSON sintéticos. No se muestran datos de clientes.',
    nav: [
      ['Problema', '#problem'],
      ['Sistema', '#system'],
      ['Pantallas', '#screens'],
      ['Inteligencia', '#intelligence'],
      ['Ingeniería', '#engineering'],
      ['Resultado', '#outcome'],
    ] as const,
    snapshot: [
      ['Tipo', 'Prototipo frontend avanzado de producto de datos'],
      [
        'Uso',
        'Rendimiento de newsletters, presión de audiencia, objetivos e informes',
      ],
      ['Rol', 'Producto, modelado de datos, UX e ingeniería frontend'],
      ['Datos', 'JSON sintético y sesiones CSV locales en navegador'],
    ],
    workflowStages: [
      'Datos fragmentados de newsletters y campañas',
      'Modelo de datos normalizado',
      'Inteligencia en dashboard',
      'Decisión mensual, informe y exportación',
    ],
    problemEyebrow: 'Problema',
    problemTitle: [
      'Las métricas existen.',
      'Las decisiones siguen fragmentadas.',
    ],
    problemBody:
      'Los equipos de newsletter suelen repartir sus datos entre exportaciones, informes de campaña, segmentos y hojas de cálculo. El reto no es ver métricas, sino entender qué cambió, qué audiencia está bajo presión y qué hacer después.',
    solutionEyebrow: 'Solución',
    solutionTitle:
      'Normalizar los hechos y hacer visible la decisión operativa.',
    solutionBody:
      'Campaign Pulse convierte datos demo y exportaciones CSV en una capa analítica normalizada con diagnósticos frente a objetivos, señales de presión, movimiento de segmentos e informes operativos mensuales.',
    builtEyebrow: 'Qué construí',
    builtTitle: 'Un ciclo completo de análisis local-first.',
    built: [
      [
        'Contrato de adaptador',
        'Un límite normalizado para JSON y exportaciones CSV planas.',
      ],
      [
        'Adaptador Demo JSON',
        'Valida campañas, newsletters, audiencias y objetivos sintéticos.',
      ],
      [
        'Adaptador CSV',
        'Agrupa filas newsletter × segmento dentro del modelo compartido.',
      ],
      [
        'Mapeo editable',
        'Alias inferidos, cambios manuales y comprobación de campos obligatorios.',
      ],
      [
        'Diagnóstico de rechazos',
        'Explica filas inválidas antes de activar los datos.',
      ],
      [
        'Carga CSV local',
        'FileReader procesa el archivo sin enviarlo a un servidor.',
      ],
      [
        'Objetivos editables',
        'Objetivos globales, de campaña y segmento en localStorage.',
      ],
      [
        'Chips de comparación',
        'Estados on track, watch y off track dentro de cada lectura.',
      ],
      [
        'Audiencia master-detail',
        'Compara todos los segmentos y profundiza en uno.',
      ],
      [
        'Calendario + drawer',
        'Cadencia y detalle de newsletter comparten contexto.',
      ],
      [
        'Comparación de campañas',
        'Contribución, presión, mejores envíos y siguiente acción.',
      ],
      [
        'Informe + export pack',
        'Memo imprimible y archivos JSON/CSV generados en navegador.',
      ],
      [
        'CI + despliegue',
        'Tests enfocados, GitHub Actions y preparación para Vercel.',
      ],
    ],
    systemEyebrow: 'Arquitectura / Mapa del sistema',
    systemTitle: 'Ingesta, inteligencia y presentación permanecen separadas.',
    systemBody:
      'Los datos fuente no incluyen ratios, rankings, diagnósticos ni recomendaciones precalculadas. Los adaptadores normalizan primero; las utilidades TypeScript calculan la inteligencia después de validar.',
    layers: [
      ['Entradas', 'JSON sintético o una exportación CSV local del navegador.'],
      [
        'Contrato',
        'Mapeo, validación, motivos de rechazo y entidades normalizadas.',
      ],
      [
        'Inteligencia',
        'Ratios, rankings, presión, movimiento, objetivos, riesgos y recomendaciones.',
      ],
      [
        'Espacios',
        'Overview, Calendar, Newsletters, Campaigns, Audience, Insights, Report y Data.',
      ],
    ],
    screensEyebrow: 'Pantallas clave',
    screensTitle: 'Un dataset, varias superficies de decisión.',
    screensBody:
      'La interfaz funciona como sala operativa, no como dashboard genérico. Cada espacio responde una pregunta manteniendo el mismo mes, fuente, objetivos y contexto de detalle.',
    screenshotCopy: {
      overview: [
        'Overview mission-control',
        'Salud de negocio, objetivo de ingresos, presión y siguiente acción.',
      ],
      data: [
        'Consola de datos',
        'Carga CSV local, estado de fuente, export pack y límite de sesión.',
      ],
      mapping: [
        'Mapeo de columnas',
        'Confianza, campos obligatorios, filas aceptadas y diagnósticos.',
      ],
      audience: [
        'Audiencia master-detail',
        'Valor, movimiento, presión, objetivos y acción recomendada.',
      ],
      audienceDetail: [
        'Detalle de segmento',
        'Presión semanal, fatiga, histórico y evidencia de miembros.',
      ],
      calendar: [
        'Calendario mensual',
        'Cadencia, presión, tarjetas de envío y resumen del mes.',
      ],
      newsletters: [
        'Ranking de newsletters',
        'Mejores envíos, engagement, ingresos y riesgo.',
      ],
      campaigns: [
        'Comparación de campañas',
        'Contribución, RPR, presión, objetivos y recomendación.',
      ],
      report: [
        'Memo operativo mensual',
        'Resumen, evidencia, objetivos, riesgo y siguientes acciones.',
      ],
    },
    intelligenceEyebrow: 'Inteligencia de datos',
    intelligenceTitle:
      'Señales deterministas, no comentarios generados por IA.',
    intelligenceBody:
      'Cada lectura se calcula desde hechos locales normalizados. Las fórmulas y umbrales son inspeccionables, repetibles y testeables.',
    metrics: [
      [
        'OR',
        'Aperturas únicas ÷ entregados. Respuesta inicial a asunto y remitente.',
      ],
      [
        'CTR',
        'Clics únicos ÷ entregados. Profundidad de clic sobre la audiencia entregada.',
      ],
      [
        'CTOR',
        'Clics únicos ÷ aperturas únicas. Rendimiento del contenido tras la apertura.',
      ],
      [
        'Conversión',
        'Pedidos ÷ entregados. Conecta entrega con acción posterior.',
      ],
      [
        'RPR',
        'Ingresos ÷ entregados. Compara valor entre envíos, campañas y segmentos.',
      ],
      [
        'Ingresos vs objetivo',
        'Evalúa el valor real frente a objetivos globales o específicos.',
      ],
      [
        'Presión / saturación',
        'Frecuencia, solapamiento y señales negativas muestran sobreexposición.',
      ],
      [
        'Movimiento de segmento',
        'Growing, stable, declining, fatigued y recovering añaden dirección.',
      ],
      [
        'Filas rechazadas',
        'Los errores permanecen visibles en vez de desaparecer.',
      ],
      [
        'Recomendaciones',
        'Las acciones combinan rendimiento y restricciones de presión.',
      ],
    ],
    engineeringEyebrow: 'Notas de ingeniería',
    engineeringTitle: 'Un prototipo frontend creíble con límites explícitos.',
    engineeringBody:
      'El proyecto prioriza arquitectura de producto, analítica determinista, adaptadores y calidad de interacción sin añadir infraestructura innecesaria.',
    engineeringPoints: [
      'Next.js 14 App Router, React, TypeScript, Tailwind CSS y Recharts.',
      'JSON local estático con datos sintéticos y objetivos por defecto.',
      'FileReader para CSV y activación de datos solo durante la sesión.',
      'localStorage únicamente para objetivos editables.',
      'Utilidades deterministas y tests de adaptadores, objetivos, carga y exportación.',
      'GitHub Actions y despliegue Vercel sin variables de entorno.',
      'Sin backend, base de datos, autenticación, API keys, OAuth ni llamadas IA/LLM.',
    ],
    limitationsEyebrow: 'Limitaciones honestas',
    limitationsTitle: 'Prototipo de portfolio, no SaaS de producción.',
    limitations: [
      'Los CSV cargados solo existen durante la sesión actual.',
      'No hay integración CRM/ESP, importación programada ni reconciliación.',
      'No hay backend, base de datos, auth, estado multiusuario ni auditoría de servidor.',
      'Todos los registros son sintéticos; no hay datos reales de clientes.',
      'La analítica debe validarse con definiciones de negocio de producción.',
      'Producción añadiría auth, almacenamiento, imports programados, observabilidad y conectores.',
    ],
    reference:
      'El flujo de implementación también consultó la colección awesome-vibe-coding como recurso de desarrollo.',
    outcomeEyebrow: 'Resultado',
    outcomeTitle: 'Un prototipo de herramienta interna listo para portfolio.',
    outcomeBody:
      'Campaign Pulse reúne pensamiento de producto, ingeniería frontend, modelado de datos, analítica determinista, diseño de adaptadores e iteración UX en una superficie local-first coherente.',
    outcomeCards: [
      [
        'Pensamiento de producto',
        'Convierte métricas fragmentadas en preguntas y acciones operativas.',
      ],
      [
        'Ingeniería frontend',
        'Coordina espacios analíticos densos sin depender de backend.',
      ],
      [
        'Modelado de datos',
        'Separa filas fuente, hechos normalizados, inteligencia y presentación.',
      ],
      [
        'Iteración UX',
        'Equilibra lectura rápida con detalle de calendario, audiencia, campaña e informe.',
      ],
    ],
  },
}

export default function CampaignPulsePage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const t = content[locale]

  useCaseStudySetup()

  return (
    <>
      <Header locale={locale} />
      <main
        id="main-content"
        className="case-study-page-new case-study-page-new--campaign-pulse"
      >
        <section
          className="campaign-pulse-hero"
          aria-labelledby="campaign-pulse-title"
        >
          <div className="campaign-pulse-hero__copy">
            <Link
              href={localizePath('/case-studies', locale)}
              className="data-brief-back"
            >
              {t.back}
            </Link>
            <p className="data-brief-eyebrow">{t.eyebrow}</p>
            <h1 id="campaign-pulse-title">{t.title}</h1>
            <p className="campaign-pulse-hero__subtitle">{t.subtitle}</p>
            <p className="campaign-pulse-hero__description">{t.description}</p>
            <div className="campaign-pulse-status">{t.status}</div>
            <div
              className="data-brief-actions"
              aria-label={
                locale === 'es' ? 'Enlaces del proyecto' : 'Project links'
              }
            >
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button data-brief-button--primary"
              >
                {t.demo}
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button"
              >
                {t.github}
              </a>
            </div>
            <div
              className="data-brief-stack campaign-pulse-stack"
              aria-label="Technology stack"
            >
              {shared.stack.map(item => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <figure className="campaign-pulse-hero__visual">
            <div className="campaign-pulse-shot">
              <Image
                src={`${imageBase}/overview.png`}
                alt="Campaign Pulse overview mission-control with synthetic newsletter performance and audience pressure data"
                width={1440}
                height={1000}
                priority
                sizes="(max-width: 980px) 100vw, 54vw"
              />
            </div>
            <figcaption>{t.visualCaption}</figcaption>
          </figure>
        </section>

        <CaseStudyMiniNav
          items={t.nav}
          ariaLabel={locale === 'es' ? 'Secciones del caso' : 'Case study sections'}
        />

        <CaseStudySnapshot
          locale={locale}
          contextHref="#problem"
          solutionHref="#system"
          items={t.snapshot.map(([label, value]) => ({ label, value }))}
          links={[
            { label: t.demo, href: demoUrl, external: true },
            { label: t.github, href: githubUrl, external: true },
          ]}
        />

        <section
          id="problem"
          className="data-brief-section data-brief-section--light"
        >
          <div className="data-brief-section__container campaign-pulse-problem">
            <article>
              <p className="data-brief-eyebrow">{t.problemEyebrow}</p>
              <h2 aria-label={t.problemTitle.join(' ')}>
                {t.problemTitle.map(line => (
                  <span key={line} aria-hidden="true">
                    {line}
                  </span>
                ))}
              </h2>
              <p>{t.problemBody}</p>
            </article>
            <article className="campaign-pulse-problem__solution">
              <p className="data-brief-eyebrow">{t.solutionEyebrow}</p>
              <h3>{t.solutionTitle}</h3>
              <p>{t.solutionBody}</p>
            </article>
          </div>
        </section>

        <section
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="campaign-pulse-built"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.builtEyebrow}</p>
              <h2 id="campaign-pulse-built">{t.builtTitle}</h2>
            </div>
            <div className="campaign-pulse-feature-grid">
              {t.built.map(([title, description], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="system"
          className="data-brief-section data-brief-section--dark"
          aria-labelledby="campaign-pulse-system"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.systemEyebrow}</p>
              <h2 id="campaign-pulse-system">{t.systemTitle}</h2>
              <p>{t.systemBody}</p>
            </div>
            <div
              className="campaign-pulse-flow"
              aria-label="Campaign Pulse data flow"
            >
              {t.workflowStages.map((step, index) => (
                <div key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
            <div className="campaign-pulse-layer-grid">
              {t.layers.map(([title, description]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="screens"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="campaign-pulse-screens"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.screensEyebrow}</p>
              <h2 id="campaign-pulse-screens">{t.screensTitle}</h2>
              <p>{t.screensBody}</p>
            </div>
            <div className="campaign-pulse-gallery">
              {shared.screenshots.map(shot => {
                const [title, description] =
                  t.screenshotCopy[shot.key as keyof typeof t.screenshotCopy]
                return (
                  <figure
                    key={shot.key}
                    className={
                      shot.wide ? 'campaign-pulse-gallery__wide' : undefined
                    }
                  >
                    <div className="campaign-pulse-gallery__frame">
                      <Image
                        src={shot.src}
                        alt={`${title} in Campaign Pulse using synthetic demo data`}
                        width={1440}
                        height={1000}
                        sizes={
                          shot.wide
                            ? '(max-width: 900px) 100vw, 90vw'
                            : '(max-width: 900px) 100vw, 45vw'
                        }
                      />
                    </div>
                    <figcaption>
                      <strong>{title}</strong>
                      <span>{description}</span>
                    </figcaption>
                  </figure>
                )
              })}
            </div>
          </div>
        </section>

        <section
          id="intelligence"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="campaign-pulse-intelligence"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.intelligenceEyebrow}</p>
              <h2 id="campaign-pulse-intelligence">{t.intelligenceTitle}</h2>
              <p>{t.intelligenceBody}</p>
            </div>
            <div className="campaign-pulse-metric-grid">
              {t.metrics.map(([title, description]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="engineering"
          className="data-brief-section data-brief-section--dark"
          aria-labelledby="campaign-pulse-engineering"
        >
          <div className="data-brief-section__container campaign-pulse-engineering">
            <div>
              <div className="data-brief-refresh-heading">
                <p className="data-brief-eyebrow">{t.engineeringEyebrow}</p>
                <h2 id="campaign-pulse-engineering">{t.engineeringTitle}</h2>
                <p>{t.engineeringBody}</p>
              </div>
              <ul className="data-brief-list">
                {t.engineeringPoints.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="campaign-pulse-reference">
                {t.reference}{' '}
                <a href={workflowReferenceUrl} target="_blank" rel="noreferrer">
                  awesome-vibe-coding ↗
                </a>
              </p>
            </div>
            <aside className="campaign-pulse-limitations">
              <p className="data-brief-eyebrow">{t.limitationsEyebrow}</p>
              <h3>{t.limitationsTitle}</h3>
              <ul>
                {t.limitations.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section
          id="outcome"
          className="data-brief-section data-brief-section--closing"
          aria-labelledby="campaign-pulse-outcome"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.outcomeEyebrow}</p>
              <h2 id="campaign-pulse-outcome">{t.outcomeTitle}</h2>
              <p>{t.outcomeBody}</p>
            </div>
            <div className="campaign-pulse-outcome-grid">
              {t.outcomeCards.map(([title, description]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <div className="data-brief-actions">
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button data-brief-button--primary"
              >
                {t.demo}
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button"
              >
                {t.github}
              </a>
            </div>
          </div>
        </section>

        <CaseStudyNext
          currentHref={pathname}
          accentColor="var(--accent)"
          locale={locale}
        />
      </main>
      <Footer locale={locale} />
    </>
  )
}
