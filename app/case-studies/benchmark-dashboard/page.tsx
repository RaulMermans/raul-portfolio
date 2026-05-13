'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCaseStudySetup } from '@/hooks'
import { getCaseStudies } from '@/data/case-studies'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'

const demoUrl = 'https://benchmark-dashboard-smoky.vercel.app/'
const githubUrl = 'https://github.com/RaulMermans/benchmark_dashboard'

const tags = [
  'React/Vite',
  'Recharts',
  'Synthetic data',
  'API-ready',
  'Data product',
]

const navItems = [
  ['Resumen', '#overview'],
  ['Flujo', '#flow'],
  ['Pantallas', '#screens'],
  ['Datos', '#conexion'],
  ['Resultado', '#resultado'],
] as const

const featureCards = [
  { title: 'Ranking cockpit', description: 'Ordena entidades por revenue, visitas, share, crecimiento o score.' },
  { title: 'Lectura de tendencia', description: 'Muestra evolución con vistas de share, growth e indexed performance.' },
  { title: 'Capa de contexto', description: 'Añade eventos, señales y perfiles alrededor de las métricas.' },
  { title: 'Forecast surface', description: 'Compara escenarios base, agresivos y conservadores.' },
]

const systemSteps = [
  {
    num: '01',
    title: 'Fuente de datos',
    description: 'JSON local, Google Sheets, base de datos, warehouse o API.',
  },
  {
    num: '02',
    title: 'Contrato',
    description: 'El endpoint devuelve interface, events y dictionary.',
  },
  {
    num: '03',
    title: 'Normalización',
    description: 'La app traduce filas y métricas a un formato consistente.',
  },
  {
    num: '04',
    title: 'Visualización',
    description: 'El dashboard muestra rankings, tendencias, eventos, comparativas y forecast.',
  },
]

const proofPoints = [
  { value: '12', label: 'Vistas de dashboard' },
  { value: '3', label: 'Escenarios de forecast' },
  { value: '0', label: 'Datos privados expuestos' },
]

const buildBullets = [
  'Interfaz React/Vite con Tailwind y visualizaciones en Recharts.',
  'Fallback local en JSON y conector opcional mediante VITE_BENCHMARK_API_URL.',
  'Generador de datos sintéticos y auditoría pública antes de publicar.',
]

const resultBullets = [
  'Plantilla reutilizable para benchmark, market share, growth y forecast reporting.',
  'Modo demo público que muestra el producto sin exponer datos de clientes o competidores.',
  'Contrato de datos claro para Sheets, bases de datos, warehouses o cualquier API JSON.',
]

const dashboardSlots = [
  {
    title: 'Vista ejecutiva',
    description: 'Espacio principal para KPIs, resumen de mercado y señales estratégicas.',
    frame: 'overview',
  },
  {
    title: 'Rankings y perfiles',
    description: 'Espacio secundario para rankings, perfiles de entidad y battle cards.',
    frame: 'ranking',
  },
  {
    title: 'Forecast y eventos',
    description: 'Espacio secundario para escenarios, overlays y contexto temporal.',
    frame: 'forecast',
  },
]

const dataContract = `{
  "ok": true,
  "meta": {
    "source": "Your connector name"
  },
  "data": {
    "interface": [],
    "events": [],
    "dictionary": []
  }
}`

const mockRankingRows = [
  { name: 'Entidad A', score: '94', pct: 94 },
  { name: 'Entidad B', score: '87', pct: 87 },
  { name: 'Entidad C', score: '81', pct: 81 },
  { name: 'Entidad D', score: '74', pct: 74 },
  { name: 'Entidad E', score: '68', pct: 68 },
]

const mockFeatureTabs = ['Ranking', 'Tendencias', 'Eventos', 'Forecast']

function BenchmarkMockup() {
  return (
    <div className="benchmark-mockup">
      <div className="benchmark-mockup__bar">
        <span className="benchmark-mockup__label">Benchmark Dashboard — Datos mock</span>
      </div>
      <div className="benchmark-mockup__body">
        <div className="benchmark-metrics" aria-label="Indicadores de ejemplo">
          <div className="benchmark-metric">
            <span className="benchmark-metric__label">Entidades</span>
            <strong className="benchmark-metric__value">48</strong>
          </div>
          <div className="benchmark-metric">
            <span className="benchmark-metric__label">Score medio</span>
            <strong className="benchmark-metric__value">76</strong>
          </div>
          <div className="benchmark-metric">
            <span className="benchmark-metric__label">Tendencia</span>
            <strong className="benchmark-metric__value">+4</strong>
          </div>
        </div>
        <div className="benchmark-mockup__tabs" aria-label="Vistas del dashboard">
          {mockFeatureTabs.map((tab) => (
            <span
              key={tab}
              className={`benchmark-mockup__tab${tab === 'Ranking' ? ' benchmark-mockup__tab--active' : ''}`}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="benchmark-ranking" aria-label="Ranking de ejemplo con datos mock">
          <div className="benchmark-ranking__header">
            <span>Ranking</span>
            <span>Score</span>
          </div>
          {mockRankingRows.map((row, i) => (
            <div key={row.name} className="benchmark-ranking__row">
              <span className="benchmark-ranking__pos">{i + 1}</span>
              <span className="benchmark-ranking__name">{row.name}</span>
              <div className="benchmark-ranking__bar-track">
                <div className="benchmark-ranking__bar-fill" style={{ width: `${row.pct}%` }} />
              </div>
              <span className="benchmark-ranking__score">{row.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DashboardSlot({ slot }: { slot: (typeof dashboardSlots)[number] }) {
  return (
    <article className={`benchmark-shot benchmark-shot--${slot.frame}`}>
      <div className="benchmark-shot__frame" aria-hidden="true">
        <div className="benchmark-shot__topline" />
        <div className="benchmark-shot__grid">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="benchmark-shot__chart">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="benchmark-shot__copy">
        <h3>{slot.title}</h3>
        <p>{slot.description}</p>
      </div>
    </article>
  )
}

export default function BenchmarkDashboardPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const caseStudies = getCaseStudies(locale)
  const nextCaseStudy = caseStudies.find((cs) => cs.href.includes('data-brief-ai'))

  useCaseStudySetup()

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="case-study-page-new case-study-page-new--benchmark">
        {/* ── HERO ── */}
        <section className="benchmark-hero" aria-labelledby="benchmark-title">
          <div className="benchmark-hero__content">
            <Link
              href={localizePath('/case-studies/data-systems', locale)}
              className="data-brief-back"
            >
              ← Sistemas de datos
            </Link>
            <p className="data-brief-eyebrow">Data product / Benchmark dashboard</p>
            <h1 id="benchmark-title" className="benchmark-hero__title">
              Benchmark Dashboard Template
            </h1>
            <p className="benchmark-hero__subtitle">
              Un dashboard público y reutilizable para convertir datos de benchmark en lectura
              ejecutiva.
            </p>
            <p className="benchmark-hero__description">
              El sistema toma un payload JSON normalizado y lo transforma en rankings, market share,
              crecimiento, forecast, perfiles y señales estratégicas. La versión pública usa datos
              sintéticos para enseñar la arquitectura sin exponer información privada.
            </p>
            <p className="benchmark-hero__mock-notice">
              Solo modo demo: entidades sintéticas, valores sintéticos, sin datos de clientes ni
              competidores reales.
            </p>
            <div className="data-brief-actions" aria-label="Project links">
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button data-brief-button--primary"
              >
                Ver demo público →
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button"
              >
                Ver repositorio →
              </a>
            </div>
            <div className="data-brief-tags" aria-label="Project tags">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <figure className="benchmark-hero__visual" aria-label="Dashboard preview con datos mock">
            <BenchmarkMockup />
            <figcaption>Vista representativa del dashboard. Todos los datos son sintéticos.</figcaption>
          </figure>
        </section>

        {/* ── MINI NAV ── */}
        <nav className="data-brief-mini-nav" aria-label="Secciones de la página">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        {/* ── OVERVIEW ── */}
        <section
          id="overview"
          className="data-brief-section data-brief-section--light benchmark-section"
          aria-labelledby="benchmark-overview"
        >
          <div className="data-brief-section__container">
            <div className="benchmark-section-heading">
              <p className="data-brief-eyebrow">Resumen</p>
              <h2 id="benchmark-overview">De lógica de spreadsheet a superficie ejecutiva</h2>
              <p>
                El caso ahora prioriza la forma del producto: un cockpit de benchmark reutilizable
                que convierte filas estructuradas en vistas de comparación, evolución y decisión.
              </p>
            </div>
            <div className="benchmark-proof-strip" aria-label="Puntos clave del proyecto">
              {proofPoints.map((point) => (
                <div key={point.label}>
                  <strong>{point.value}</strong>
                  <span>{point.label}</span>
                </div>
              ))}
            </div>
            <div className="data-brief-card-grid benchmark-feature-grid">
              {featureCards.map((card) => (
                <article key={card.title} className="data-brief-card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── FLOW ── */}
        <section
          id="flow"
          className="data-brief-section data-brief-section--cream benchmark-section"
          aria-labelledby="benchmark-flow"
        >
          <div className="data-brief-section__container">
            <div className="benchmark-section-heading">
              <p className="data-brief-eyebrow">Arquitectura</p>
              <h2 id="benchmark-flow">Un sistema de cuatro capas</h2>
              <p>
                La arquitectura se explica con más aire: fuente de datos, contrato, normalización y
                vistas del dashboard. Cada capa es visible sin convertir la página en documentación.
              </p>
            </div>
            <div className="benchmark-diagram" aria-label="Flujo del sistema">
              <span>Fuente de datos</span>
              <span className="benchmark-diagram__arrow">→</span>
              <span>Contrato JSON</span>
              <span className="benchmark-diagram__arrow">→</span>
              <span>Normalización</span>
              <span className="benchmark-diagram__arrow">→</span>
              <span>Vistas del dashboard</span>
            </div>
            <div className="data-brief-card-grid benchmark-system-grid">
              {systemSteps.map((step) => (
                <article key={step.num} className="data-brief-card benchmark-system-card">
                  <span className="data-brief-eyebrow">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── DASHBOARD PROOF ── */}
        <section
          id="screens"
          className="data-brief-section data-brief-section--dark benchmark-section benchmark-section--screens"
          aria-labelledby="benchmark-screens"
        >
          <div className="data-brief-section__container">
            <div className="benchmark-section-heading">
              <p className="data-brief-eyebrow">Prueba visual</p>
              <h2 id="benchmark-screens">Preparado para recibir screenshots reales</h2>
              <p>
                Hasta que entren las capturas finales, la página usa marcos de dashboard contenidos
                que reservan espacio para la interfaz real. Los módulos están pensados para overview,
                ranking/perfiles y forecast/eventos.
              </p>
            </div>
            <div className="benchmark-shot-grid">
              {dashboardSlots.map((slot) => (
                <DashboardSlot key={slot.title} slot={slot} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CONEXIÓN DE DATOS ── */}
        <section
          id="conexion"
          className="data-brief-section data-brief-section--cream benchmark-section"
          aria-labelledby="benchmark-conexion"
        >
          <div className="data-brief-section__container data-brief-two-column">
            <div className="benchmark-section-heading benchmark-section-heading--sticky">
              <p className="data-brief-eyebrow">Contrato de datos</p>
              <h2 id="benchmark-conexion">Conectable sin llenar la página de ruido</h2>
              <p>
                El dashboard puede funcionar con JSON local o un endpoint externo. En portfolio
                basta con mostrar el contrato y la lógica de integración, no todas las fuentes
                posibles como una pared de chips.
              </p>
            </div>
            <div className="benchmark-data-stack">
              <div className="benchmark-code-block" aria-label="Contrato de datos del dashboard">
                <div className="benchmark-code-block__bar">
                  <span>data-contract.json</span>
                </div>
                <pre>{dataContract}</pre>
              </div>
              <dl className="benchmark-field-defs">
                <div>
                  <dt><code>interface</code></dt>
                  <dd>Filas principales para métricas, entidades y periodos.</dd>
                </div>
                <div>
                  <dt><code>events</code></dt>
                  <dd>Anotaciones opcionales para campañas, lanzamientos o contexto.</dd>
                </div>
                <div>
                  <dt><code>dictionary</code></dt>
                  <dd>Definiciones y metadata opcional para la capa de interfaz.</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* ── RESULTADO ── */}
        <section
          id="resultado"
          className="data-brief-section data-brief-section--dark benchmark-section benchmark-section--result"
          aria-labelledby="benchmark-resultado"
        >
          <div className="data-brief-section__container">
            <div className="benchmark-section-heading">
              <p className="data-brief-eyebrow">Resultado</p>
              <h2 id="benchmark-resultado">Una plantilla pública con criterio de trabajo privado</h2>
              <p>
                La landing debe sentirse como una página de producto, no como un volcado técnico:
                arquitectura suficiente para confiar, espacio visual para inspeccionar y salidas
                claras hacia demo y repositorio.
              </p>
            </div>
            <div className="benchmark-result-grid">
              <article>
                <h3>Construcción</h3>
                <ul className="data-brief-list">
                  {buildBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>Resultado</h3>
                <ul className="data-brief-list">
                  {resultBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            </div>
            <div className="data-brief-actions">
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button data-brief-button--primary"
              >
                Ver demo público →
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button"
              >
                Ver repositorio →
              </a>
            </div>
            <aside className="data-brief-callout">
              <span>Conclusión</span>
              <strong>
                Un producto de benchmark seguro para portfolio que muestra diseño de dashboard,
                modelado de datos y disciplina de despliegue sin depender de información privada.
              </strong>
            </aside>
          </div>
        </section>

        <CaseStudyNext
          nextCaseStudy={nextCaseStudy}
          accentColor="var(--color-0)"
          locale={locale}
        />
      </main>
      <Footer locale={locale} />
    </>
  )
}
