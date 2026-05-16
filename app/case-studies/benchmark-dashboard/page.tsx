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

const tags = ['React/Vite', 'Recharts', 'Synthetic data', 'API-ready', 'Data product']

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

const content = {
  en: {
    back: '← Case Studies',
    heroSubtitle: 'A public, reusable dashboard for turning benchmark data into executive reads.',
    heroDescription:
      'The system takes a normalized JSON payload and transforms it into rankings, market share, growth, forecast, profiles, and strategic signals. The public version uses synthetic data to demonstrate the architecture without exposing private information.',
    heroMockNotice:
      'Demo mode only: synthetic entities, synthetic values — no real client or competitor data.',
    heroCTA: 'View live demo →',
    heroCTASecondary: 'View repository →',
    heroFigcaption: 'Executive dashboard view. All data is synthetic.',
    heroFigAriaLabel: 'Executive dashboard view with synthetic data',
    heroImgAlt:
      'Benchmark Dashboard executive view: market KPIs, share, and strategic signals',
    nav: [
      ['Overview', '#overview'],
      ['Flow', '#flow'],
      ['Screens', '#screens'],
      ['Data', '#conexion'],
      ['Result', '#resultado'],
    ] as const,
    overviewEyebrow: 'Overview',
    overviewH2: 'From spreadsheet logic to executive surface',
    overviewP:
      'The product form is front and center: a reusable benchmark cockpit that turns structured rows into comparison, trend, and decision views.',
    proofPoints: [
      { value: '12', label: 'Dashboard views' },
      { value: '3', label: 'Forecast scenarios' },
      { value: '0', label: 'Private data exposed' },
    ],
    featureCards: [
      { title: 'Ranking cockpit', description: 'Rank entities by revenue, visits, share, growth, or score.' },
      { title: 'Trend reading', description: 'Displays evolution with share, growth, and indexed performance views.' },
      { title: 'Context layer', description: 'Adds events, signals, and profiles around the metrics.' },
      { title: 'Forecast surface', description: 'Compare base, aggressive, and conservative scenarios.' },
    ],
    flowEyebrow: 'Architecture',
    flowH2: 'A four-layer system',
    flowP:
      'Data source, contract, normalization, and dashboard views. Each layer is visible without turning the page into documentation.',
    flowDiagram: ['Data source', 'JSON contract', 'Normalization', 'Dashboard views'],
    systemSteps: [
      { num: '01', title: 'Data source', description: 'Local JSON, Google Sheets, database, warehouse, or API.' },
      { num: '02', title: 'Contract', description: 'The endpoint returns interface, events, and dictionary.' },
      { num: '03', title: 'Normalization', description: 'The app translates rows and metrics into a consistent format.' },
      { num: '04', title: 'Visualization', description: 'The dashboard displays rankings, trends, events, comparisons, and forecasts.' },
    ],
    screensEyebrow: 'Visual proof',
    screensH2: 'Five views, one data source',
    screensP:
      'Rankings and competitive map show where each player stands. Forecast and indexed momentum reveal who\'s moving and where things are heading. Entity profile drills into any single brand — all from the same payload.',
    gallery: [
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/period_ranking.webp',
        alt: 'Period ranking and market share distribution by revenue',
        label: 'Rankings',
        caption: 'Real-time ranking by revenue, visits, or share. Market share distribution in a donut chart with per-entity breakdown.',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/competitive_map.webp',
        alt: 'Competitive map: positioning by traffic volume and revenue efficiency',
        label: 'Competitive map',
        caption: 'Scatter by volume vs. efficiency. Quadrants to identify leaders, niches, and under-monetized traffic.',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/forecast.webp',
        alt: 'Forecast of visits and revenue by competitor',
        label: 'Forecast',
        caption: 'Visit and revenue projections per entity with base, aggressive, and conservative scenarios. Interactive series filter.',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/index_growth.webp',
        alt: 'Indexed growth race across multiple competitors',
        label: 'Indexed momentum',
        caption: 'Growth relative to 100 from a shared starting point. Detects who\'s accelerating and who\'s losing ground.',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/own_brand_stats.webp',
        alt: 'Individual entity profile with revenue, visits, share and ranking KPIs',
        label: 'Entity profile',
        caption: 'Individual company view: revenue, visits, share, ranking, and efficiency for any selected period.',
      },
    ],
    dataEyebrow: 'Data contract',
    dataH2: 'Connectable without filling the page with noise',
    dataP:
      'The dashboard works with local JSON or an external endpoint. For portfolio purposes, it\'s enough to show the contract and integration logic — not every possible data source as a wall of chips.',
    fieldDefs: [
      { key: 'interface', label: 'Primary rows for metrics, entities, and periods.' },
      { key: 'events', label: 'Optional annotations for campaigns, launches, or context.' },
      { key: 'dictionary', label: 'Optional definitions and metadata for the interface layer.' },
    ],
    resultEyebrow: 'Result',
    resultH2: 'A public template with private-work standards',
    resultP:
      'The page should feel like a product page, not a technical dump: enough architecture to trust, visual space to inspect, and clear paths to demo and repository.',
    buildH3: 'Build',
    buildBullets: [
      'React/Vite interface with Tailwind and Recharts visualizations.',
      'Local JSON fallback and optional connector via VITE_BENCHMARK_API_URL.',
      'Synthetic data generator and public audit before publishing.',
    ],
    outcomeH3: 'Outcome',
    outcomeBullets: [
      'Reusable template for benchmark, market share, growth, and forecast reporting.',
      'Public demo mode that shows the product without exposing client or competitor data.',
      'Clear data contract for Sheets, databases, warehouses, or any JSON API.',
    ],
    calloutLabel: 'Takeaway',
    calloutText:
      'A portfolio-safe benchmark product that demonstrates dashboard design, data modelling, and deployment discipline without relying on private information.',
  },
  es: {
    back: '← Casos de estudio',
    heroSubtitle:
      'Un dashboard público y reutilizable para convertir datos de benchmark en lectura ejecutiva.',
    heroDescription:
      'El sistema toma un payload JSON normalizado y lo transforma en rankings, market share, crecimiento, forecast, perfiles y señales estratégicas. La versión pública usa datos sintéticos para enseñar la arquitectura sin exponer información privada.',
    heroMockNotice:
      'Solo modo demo: entidades sintéticas, valores sintéticos, sin datos de clientes ni competidores reales.',
    heroCTA: 'Ver demo público →',
    heroCTASecondary: 'Ver repositorio →',
    heroFigcaption: 'Vista ejecutiva del dashboard. Todos los datos son sintéticos.',
    heroFigAriaLabel: 'Vista ejecutiva del dashboard con datos sintéticos',
    heroImgAlt:
      'Vista ejecutiva del Benchmark Dashboard: KPIs de mercado, share y señales estratégicas',
    nav: [
      ['Resumen', '#overview'],
      ['Flujo', '#flow'],
      ['Pantallas', '#screens'],
      ['Datos', '#conexion'],
      ['Resultado', '#resultado'],
    ] as const,
    overviewEyebrow: 'Resumen',
    overviewH2: 'De lógica de spreadsheet a superficie ejecutiva',
    overviewP:
      'El caso prioriza la forma del producto: un cockpit de benchmark reutilizable que convierte filas estructuradas en vistas de comparación, evolución y decisión.',
    proofPoints: [
      { value: '12', label: 'Vistas de dashboard' },
      { value: '3', label: 'Escenarios de forecast' },
      { value: '0', label: 'Datos privados expuestos' },
    ],
    featureCards: [
      { title: 'Ranking cockpit', description: 'Ordena entidades por revenue, visitas, share, crecimiento o score.' },
      { title: 'Lectura de tendencia', description: 'Muestra evolución con vistas de share, growth e indexed performance.' },
      { title: 'Capa de contexto', description: 'Añade eventos, señales y perfiles alrededor de las métricas.' },
      { title: 'Forecast surface', description: 'Compara escenarios base, agresivos y conservadores.' },
    ],
    flowEyebrow: 'Arquitectura',
    flowH2: 'Un sistema de cuatro capas',
    flowP:
      'Fuente de datos, contrato, normalización y vistas del dashboard. Cada capa es visible sin convertir la página en documentación.',
    flowDiagram: ['Fuente de datos', 'Contrato JSON', 'Normalización', 'Vistas del dashboard'],
    systemSteps: [
      { num: '01', title: 'Fuente de datos', description: 'JSON local, Google Sheets, base de datos, warehouse o API.' },
      { num: '02', title: 'Contrato', description: 'El endpoint devuelve interface, events y dictionary.' },
      { num: '03', title: 'Normalización', description: 'La app traduce filas y métricas a un formato consistente.' },
      { num: '04', title: 'Visualización', description: 'El dashboard muestra rankings, tendencias, eventos, comparativas y forecast.' },
    ],
    screensEyebrow: 'Prueba visual',
    screensH2: 'Cinco vistas, una sola fuente de datos',
    screensP:
      'Rankings y mapa competitivo muestran dónde se sitúa cada jugador. Forecast y momentum indexado revelan quién se mueve y hacia dónde. El perfil de entidad profundiza en cualquier marca — todo desde el mismo payload.',
    gallery: [
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/period_ranking.webp',
        alt: 'Rankings y distribución de cuota de mercado por revenue',
        label: 'Rankings',
        caption: 'Clasificación en tiempo real por revenue, visitas o share. Distribución de cuota en donut con desglose por entidad.',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/competitive_map.webp',
        alt: 'Mapa competitivo: posicionamiento por tráfico y eficiencia de revenue',
        label: 'Mapa competitivo',
        caption: 'Scatter por volumen vs. eficiencia. Cuadrantes para identificar líderes, nichos y tráfico no monetizado.',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/forecast.webp',
        alt: 'Forecast de visitas y revenue por competidor',
        label: 'Forecast',
        caption: 'Proyección de visitas y revenue por entidad con escenarios base, agresivo y conservador. Filtro de series interactivo.',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/index_growth.webp',
        alt: 'Carrera de crecimiento indexado de múltiples competidores',
        label: 'Momentum indexado',
        caption: 'Crecimiento relativo a 100 desde un punto de partida compartido. Detecta quién acelera y quién cede terreno.',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/own_brand_stats.webp',
        alt: 'Perfil individual de entidad con KPIs de revenue, visitas y share',
        label: 'Perfil de entidad',
        caption: 'Vista individual por empresa: revenue, visitas, share, ranking y eficiencia para cualquier periodo seleccionado.',
      },
    ],
    dataEyebrow: 'Contrato de datos',
    dataH2: 'Conectable sin llenar la página de ruido',
    dataP:
      'El dashboard puede funcionar con JSON local o un endpoint externo. En portfolio basta con mostrar el contrato y la lógica de integración, no todas las fuentes posibles como una pared de chips.',
    fieldDefs: [
      { key: 'interface', label: 'Filas principales para métricas, entidades y periodos.' },
      { key: 'events', label: 'Anotaciones opcionales para campañas, lanzamientos o contexto.' },
      { key: 'dictionary', label: 'Definiciones y metadata opcional para la capa de interfaz.' },
    ],
    resultEyebrow: 'Resultado',
    resultH2: 'Una plantilla pública con criterio de trabajo privado',
    resultP:
      'La página debe sentirse como una página de producto, no como un volcado técnico: arquitectura suficiente para confiar, espacio visual para inspeccionar y salidas claras hacia demo y repositorio.',
    buildH3: 'Construcción',
    buildBullets: [
      'Interfaz React/Vite con Tailwind y visualizaciones en Recharts.',
      'Fallback local en JSON y conector opcional mediante VITE_BENCHMARK_API_URL.',
      'Generador de datos sintéticos y auditoría pública antes de publicar.',
    ],
    outcomeH3: 'Resultado',
    outcomeBullets: [
      'Plantilla reutilizable para benchmark, market share, growth y forecast reporting.',
      'Modo demo público que muestra el producto sin exponer datos de clientes o competidores.',
      'Contrato de datos claro para Sheets, bases de datos, warehouses o cualquier API JSON.',
    ],
    calloutLabel: 'Conclusión',
    calloutText:
      'Un producto de benchmark seguro para portfolio que muestra diseño de dashboard, modelado de datos y disciplina de despliegue sin depender de información privada.',
  },
}

export default function BenchmarkDashboardPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const t = content[locale]
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
            <Link href={localizePath('/case-studies', locale)} className="data-brief-back">
              {t.back}
            </Link>
            <p className="data-brief-eyebrow">Data product / Benchmark dashboard</p>
            <h1 id="benchmark-title" className="benchmark-hero__title">
              Benchmark Dashboard Template
            </h1>
            <p className="benchmark-hero__subtitle">{t.heroSubtitle}</p>
            <p className="benchmark-hero__description">{t.heroDescription}</p>
            <p className="benchmark-hero__mock-notice">{t.heroMockNotice}</p>
            <div className="data-brief-actions" aria-label="Project links">
              <a href={demoUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                {t.heroCTA}
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-button">
                {t.heroCTASecondary}
              </a>
            </div>
            <div className="data-brief-tags" aria-label="Project tags">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <figure className="benchmark-hero__visual" aria-label={t.heroFigAriaLabel}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/benchmark-dashboard/gallery/executive_home.webp"
              alt={t.heroImgAlt}
              className="benchmark-hero__screenshot"
            />
            <figcaption>{t.heroFigcaption}</figcaption>
          </figure>
        </section>

        {/* ── MINI NAV ── */}
        <nav className="data-brief-mini-nav" aria-label="Secciones de la página">
          {t.nav.map(([label, href]) => (
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
              <p className="data-brief-eyebrow">{t.overviewEyebrow}</p>
              <h2 id="benchmark-overview">{t.overviewH2}</h2>
              <p>{t.overviewP}</p>
            </div>
            <div className="benchmark-proof-strip" aria-label="Key project stats">
              {t.proofPoints.map((point) => (
                <div key={point.label}>
                  <strong>{point.value}</strong>
                  <span>{point.label}</span>
                </div>
              ))}
            </div>
            <div className="data-brief-card-grid benchmark-feature-grid">
              {t.featureCards.map((card) => (
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
              <p className="data-brief-eyebrow">{t.flowEyebrow}</p>
              <h2 id="benchmark-flow">{t.flowH2}</h2>
              <p>{t.flowP}</p>
            </div>
            <div className="benchmark-diagram" aria-label="System flow">
              {t.flowDiagram.map((step, i) => (
                <>
                  <span key={step}>{step}</span>
                  {i < t.flowDiagram.length - 1 && (
                    <span key={`arrow-${i}`} className="benchmark-diagram__arrow">→</span>
                  )}
                </>
              ))}
            </div>
            <div className="data-brief-card-grid benchmark-system-grid">
              {t.systemSteps.map((step) => (
                <article key={step.num} className="data-brief-card benchmark-system-card">
                  <span className="data-brief-eyebrow">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SCREENS ── */}
        <section
          id="screens"
          className="data-brief-section data-brief-section--light benchmark-section"
          aria-labelledby="benchmark-screens"
        >
          <div className="data-brief-section__container">
            <div className="benchmark-section-heading">
              <p className="data-brief-eyebrow">{t.screensEyebrow}</p>
              <h2 id="benchmark-screens">{t.screensH2}</h2>
              <p>{t.screensP}</p>
            </div>
            <div className="benchmark-gallery">
              {/* Pair A — market position: rankings (1.598:1) + competitive map (1.981:1)
                  Column ratio 1fr/1.24fr gives both images the same display height */}
              <div className="benchmark-gallery__pair benchmark-gallery__pair--market">
                {t.gallery.slice(0, 2).map((screen) => (
                  <figure key={screen.label} className="benchmark-screen">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={screen.src} alt={screen.alt} loading="lazy" />
                    <figcaption>
                      <span className="data-brief-eyebrow">{screen.label}</span>
                      <p>{screen.caption}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
              {/* Pair B — dynamics: forecast (1.618:1) + indexed momentum (1.779:1)
                  Column ratio 1fr/1.1fr gives both images the same display height */}
              <div className="benchmark-gallery__pair benchmark-gallery__pair--trend">
                {t.gallery.slice(2, 4).map((screen) => (
                  <figure key={screen.label} className="benchmark-screen">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={screen.src} alt={screen.alt} loading="lazy" />
                    <figcaption>
                      <span className="data-brief-eyebrow">{screen.label}</span>
                      <p>{screen.caption}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
              {/* Full-width strip — entity profile (3.325:1, too wide for a pair) */}
              <figure className="benchmark-screen benchmark-screen--full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.gallery[4].src} alt={t.gallery[4].alt} loading="lazy" />
                <figcaption>
                  <span className="data-brief-eyebrow">{t.gallery[4].label}</span>
                  <p>{t.gallery[4].caption}</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ── DATA CONTRACT ── */}
        <section
          id="conexion"
          className="data-brief-section data-brief-section--cream benchmark-section"
          aria-labelledby="benchmark-conexion"
        >
          <div className="data-brief-section__container data-brief-two-column">
            <div className="benchmark-section-heading benchmark-section-heading--sticky">
              <p className="data-brief-eyebrow">{t.dataEyebrow}</p>
              <h2 id="benchmark-conexion">{t.dataH2}</h2>
              <p>{t.dataP}</p>
            </div>
            <div className="benchmark-data-stack">
              <div className="benchmark-code-block" aria-label="Data contract">
                <div className="benchmark-code-block__bar">
                  <span>data-contract.json</span>
                </div>
                <pre>{dataContract}</pre>
              </div>
              <dl className="benchmark-field-defs">
                {t.fieldDefs.map((field) => (
                  <div key={field.key}>
                    <dt><code>{field.key}</code></dt>
                    <dd>{field.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── RESULT ── */}
        <section
          id="resultado"
          className="data-brief-section data-brief-section--dark benchmark-section benchmark-section--result"
          aria-labelledby="benchmark-resultado"
        >
          <div className="data-brief-section__container">
            <div className="benchmark-section-heading">
              <p className="data-brief-eyebrow">{t.resultEyebrow}</p>
              <h2 id="benchmark-resultado">{t.resultH2}</h2>
              <p>{t.resultP}</p>
            </div>
            <div className="benchmark-result-grid">
              <article>
                <h3>{t.buildH3}</h3>
                <ul className="data-brief-list">
                  {t.buildBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>{t.outcomeH3}</h3>
                <ul className="data-brief-list">
                  {t.outcomeBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            </div>
            <div className="data-brief-actions">
              <a href={demoUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                {t.heroCTA}
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-button">
                {t.heroCTASecondary}
              </a>
            </div>
            <aside className="data-brief-callout">
              <span>{t.calloutLabel}</span>
              <strong>{t.calloutText}</strong>
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
