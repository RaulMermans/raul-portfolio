'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCaseStudySetup } from '@/hooks'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'

const demoUrl = 'https://benchmark-dashboard-tb47.vercel.app/'
const githubUrl = 'https://github.com/RaulMermans/benchmark_dashboard'

const tags = ['React/Vite', 'Benchmark engine', 'Adapters', 'View models', 'Synthetic data']

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
    heroEyebrow: 'Data product / Benchmark intelligence framework',
    heroTitle: 'Benchmark Intelligence Framework',
    heroSubtitle:
      'A public-safe competitive intelligence dashboard framework that turns structured benchmark data into executive rankings, share analysis, growth views, forecasts, profiles, and strategic signals.',
    heroDescription:
      'The project evolved from a visual dashboard into a reusable frontend intelligence framework: data contract first, calculation logic separated from presentation, and portfolio-ready validation around every public artifact.',
    heroMockNotice:
      'Demo mode only: synthetic entities, synthetic values, public-safe labels — no real client, competitor, logo, or private source data.',
    heroCTA: 'View live demo →',
    heroCTASecondary: 'View repository →',
    heroFigcaption: 'Executive summary, KPI cards, share movement, and strategic signal cards. Synthetic demo data only.',
    heroFigAriaLabel: 'Executive dashboard summary with synthetic benchmark data',
    heroImgAlt:
      'Benchmark intelligence dashboard executive summary with synthetic revenue, share, and strategic signal cards',
    nav: [
      ['Changed', '#overview'],
      ['Architecture', '#flow'],
      ['Screens', '#screens'],
      ['Data', '#conexion'],
      ['Safety', '#safety'],
      ['Result', '#resultado'],
    ] as const,
    overviewEyebrow: 'What changed',
    overviewH2: 'From dashboard surface to reusable intelligence framework',
    overviewP:
      'The current product is not just a static dashboard. It separates data logic from presentation logic so benchmark rows can move through validation, calculations, view-model builders, and then into a polished executive interface.',
    proofPoints: [
      { value: '1', label: 'Explicit data contract' },
      { value: '3', label: 'Release validation checks' },
      { value: '0', label: 'Private data exposed' },
    ],
    featureCards: [
      { title: 'Benchmark engine', description: 'Calculates share, rank, growth, efficiency, aggregations, and executive comparisons outside the UI layer.' },
      { title: 'Source adapters', description: 'Converts mock JSON or simpler monthly rows into the same benchmark payload contract.' },
      { title: 'View models', description: 'Builds chart, table, profile, event, and summary structures before React renders the interface.' },
      { title: 'Public discipline', description: 'Keeps the demo portfolio-safe with synthetic data, validation scripts, and public-readiness checks.' },
    ],
    flowEyebrow: 'Architecture',
    flowH2: 'A framework pipeline, not a one-off screen',
    flowP:
      'The framework keeps ingestion, validation, benchmark calculation, view-model preparation, and interface rendering as distinct layers. That makes the demo replaceable without changing the dashboard experience.',
    flowDiagram: ['Monthly data / mock JSON', 'Adapter', 'Schema validator', 'Benchmark engine', 'View models', 'React + Vite dashboard', 'Vercel deployment'],
    systemSteps: [
      { num: '01', title: 'Data source', description: 'Mock JSON or user-provided monthly benchmark rows.' },
      { num: '02', title: 'Adapter', description: 'Transforms simple rows into the framework payload shape.' },
      { num: '03', title: 'Schema validator', description: 'Checks that interface, events, and dictionary data satisfy the contract.' },
      { num: '04', title: 'Benchmark engine', description: 'Normalizes rows and calculates ranks, shares, growth, efficiency, and aggregations.' },
      { num: '05', title: 'View models', description: 'Prepares chart-ready, table-ready, profile-ready, and summary-ready data.' },
      { num: '06', title: 'Dashboard UI', description: 'Renders the executive React/Vite interface and deploys safely on Vercel.' },
    ],
    screensEyebrow: 'Visual proof',
    screensH2: 'Executive views from one benchmark contract',
    screensP:
      'The screenshots show the product evidence: rankings, market-share distribution, indexed momentum, forecast scenarios, competitive mapping, event context, profile cards, and executive signals generated from the same structured payload.',
    gallery: [
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/period_ranking.webp',
        alt: 'Synthetic benchmark ranking table with market-share distribution by revenue',
        label: 'Benchmark rankings + market share',
        caption: 'Period ranking and share distribution from the interface rows, useful for executive comparison without exposing real company data.',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/competitive_map.webp',
        alt: 'Synthetic competitive map plotting traffic volume against revenue efficiency',
        label: 'Competitive map',
        caption: 'Positioning view that turns normalized metrics into a volume-versus-efficiency map for market-structure reading.',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/forecast.webp',
        alt: 'Synthetic forecast scenarios for visits and revenue by benchmark entity',
        label: 'Forecast scenarios',
        caption: 'Scenario view for projected visits and revenue, separated from the underlying benchmark calculations.',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/index_growth.webp',
        alt: 'Synthetic indexed growth momentum chart across benchmark entities',
        label: 'Growth / indexed momentum',
        caption: 'Indexed performance view that makes acceleration and relative momentum visible from a common baseline.',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/own_brand_stats.webp',
        alt: 'Synthetic benchmark profile card with revenue, visits, share, rank, and efficiency KPIs',
        label: 'Profile cards',
        caption: 'Profile-level readout for a selected entity, with KPIs and ranking context prepared by the view-model layer.',
      },
    ],
    dataEyebrow: 'Data contract',
    dataH2: 'One payload shape powers the framework',
    dataP:
      '`data.interface` is the source of truth. The public dashboard can run from mock JSON or user-provided monthly rows routed through an adapter, as long as the payload validates before it reaches the benchmark engine.',
    fieldDefs: [
      { key: 'interface', label: 'Source-of-truth rows for dates, entities, markets, revenue, visits, ranks, shares, growth, and forecast fields.' },
      { key: 'events', label: 'Optional public-safe annotations for launches, changes, or context overlays.' },
      { key: 'dictionary', label: 'Optional definitions and metadata used to explain the interface layer.' },
    ],
    safetyEyebrow: 'Public-safe build discipline',
    safetyH2: 'Synthetic data is part of the product design',
    safetyP:
      'The public repo is intentionally demonstrative: generated mock companies, synthetic values, empty public env examples, and no private source URLs. That constraint makes the case study publishable without weakening the engineering story.',
    validationChecks: ['pnpm test', 'pnpm validate:data', 'pnpm audit:public'],
    safetyBullets: [
      'No real client data, competitor data, logos, or private API URLs.',
      'Adapters support replaceable inputs while preserving the same validated contract.',
      'Public-readiness checks make synthetic-data discipline visible before release.',
    ],
    resultEyebrow: 'Result',
    resultH2: 'A reusable, portfolio-safe intelligence framework',
    resultP:
      'The outcome is a reusable executive dashboard framework for competitive intelligence prototypes, analytics UX, and data-product storytelling.',
    buildH3: 'Build',
    buildBullets: [
      'React/Vite executive interface supported by schema validation, benchmark calculations, source adapters, and view-model builders.',
      'Centralized configuration for focus company, benchmark company, enabled views, currency, locale, and defaults.',
      'Synthetic mock-data policy and release checks before public publishing.',
    ],
    outcomeH3: 'Outcome',
    outcomeBullets: [
      'Reusable framework for rankings, market share, growth, forecasts, event overlays, profiles, and executive signals.',
      'Portfolio-safe demo that shows the product without exposing real clients, competitors, or private infrastructure.',
      'Clear data contract for mock JSON or user-provided benchmark rows.',
    ],
    calloutLabel: 'Takeaway',
    calloutText:
      'A serious data-product case study: architecture, interface proof, and public-safety constraints working together.',
  },
  es: {
    back: '← Casos de estudio',
    heroEyebrow: 'Producto de datos / Framework de inteligencia benchmark',
    heroTitle: 'Benchmark Intelligence Framework',
    heroSubtitle:
      'Un framework público y seguro de inteligencia competitiva que convierte datos estructurados de benchmark en rankings ejecutivos, análisis de cuota, crecimiento, forecasts, perfiles y señales estratégicas.',
    heroDescription:
      'El proyecto evolucionó de un dashboard visual a un framework frontend reutilizable: contrato de datos primero, lógica de cálculo separada de la presentación y validación pensada para publicar sin exponer información privada.',
    heroMockNotice:
      'Solo en modo demo: entidades sintéticas, valores sintéticos y etiquetas públicas; sin datos reales de clientes, competidores, logos ni fuentes privadas.',
    heroCTA: 'Ver la demo pública →',
    heroCTASecondary: 'Ver el repositorio →',
    heroFigcaption: 'Resumen ejecutivo, KPI cards, movimiento de share y señales estratégicas. Solo datos sintéticos.',
    heroFigAriaLabel: 'Resumen ejecutivo del dashboard con datos sintéticos de benchmark',
    heroImgAlt:
      'Resumen ejecutivo del dashboard de inteligencia benchmark con revenue, share y señales estratégicas sintéticas',
    nav: [
      ['Cambio', '#overview'],
      ['Arquitectura', '#flow'],
      ['Pantallas', '#screens'],
      ['Datos', '#conexion'],
      ['Seguridad', '#safety'],
      ['Resultado', '#resultado'],
    ] as const,
    overviewEyebrow: 'Qué cambió',
    overviewH2: 'De superficie de dashboard a framework reutilizable de inteligencia',
    overviewP:
      'El producto actual no es solo un dashboard estático. Separa la lógica de datos de la lógica de presentación para que las filas de benchmark pasen por validación, cálculos, view models y después por una interfaz ejecutiva pulida.',
    proofPoints: [
      { value: '1', label: 'Contrato de datos explícito' },
      { value: '3', label: 'Checks de validación' },
      { value: '0', label: 'Datos privados expuestos' },
    ],
    featureCards: [
      { title: 'Benchmark engine', description: 'Calcula share, rank, crecimiento, eficiencia, agregaciones y comparativas ejecutivas fuera de la capa UI.' },
      { title: 'Source adapters', description: 'Convierte mock JSON o filas mensuales simples en el mismo contrato de payload benchmark.' },
      { title: 'View models', description: 'Prepara estructuras para charts, tablas, perfiles, eventos y resúmenes antes de renderizar React.' },
      { title: 'Disciplina pública', description: 'Mantiene la demo segura para portfolio con datos sintéticos, scripts de validación y auditoría pública.' },
    ],
    flowEyebrow: 'Arquitectura',
    flowH2: 'Un pipeline de framework, no una pantalla aislada',
    flowP:
      'El framework mantiene separadas la ingesta, validación, cálculo de benchmark, preparación de view models y renderizado de interfaz. Así la demo puede reemplazarse sin cambiar la experiencia del dashboard.',
    flowDiagram: ['Datos mensuales / mock JSON', 'Adapter', 'Schema validator', 'Benchmark engine', 'View models', 'React + Vite dashboard', 'Vercel deployment'],
    systemSteps: [
      { num: '01', title: 'Fuente de datos', description: 'Mock JSON o filas mensuales de benchmark aportadas por el usuario.' },
      { num: '02', title: 'Adapter', description: 'Transforma filas simples en la forma de payload del framework.' },
      { num: '03', title: 'Schema validator', description: 'Comprueba que interface, events y dictionary cumplen el contrato.' },
      { num: '04', title: 'Benchmark engine', description: 'Normaliza filas y calcula rankings, shares, crecimiento, eficiencia y agregaciones.' },
      { num: '05', title: 'View models', description: 'Prepara datos listos para charts, tablas, perfiles y resumen ejecutivo.' },
      { num: '06', title: 'Dashboard UI', description: 'Renderiza la interfaz ejecutiva React/Vite y despliega de forma segura en Vercel.' },
    ],
    screensEyebrow: 'Prueba visual',
    screensH2: 'Vistas ejecutivas desde un único contrato benchmark',
    screensP:
      'Las capturas muestran la evidencia del producto: rankings, distribución de share, momentum indexado, escenarios de forecast, mapa competitivo, contexto de eventos, perfiles y señales ejecutivas generadas desde el mismo payload estructurado.',
    gallery: [
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/period_ranking.webp',
        alt: 'Tabla de ranking benchmark sintético con distribución de cuota de mercado por revenue',
        label: 'Benchmark rankings + market share',
        caption: 'Ranking por periodo y distribución de share desde las filas de interface, útil para comparación ejecutiva sin datos reales de compañías.',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/competitive_map.webp',
        alt: 'Mapa competitivo sintético que cruza volumen de tráfico y eficiencia de revenue',
        label: 'Mapa competitivo',
        caption: 'Vista de posicionamiento que convierte métricas normalizadas en lectura de volumen frente a eficiencia.',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/forecast.webp',
        alt: 'Escenarios de forecast sintéticos para visitas y revenue por entidad benchmark',
        label: 'Escenarios de forecast',
        caption: 'Vista de escenarios para visitas y revenue proyectados, separada de los cálculos de benchmark de base.',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/index_growth.webp',
        alt: 'Gráfico sintético de momentum de crecimiento indexado entre entidades benchmark',
        label: 'Growth / indexed momentum',
        caption: 'Vista de performance indexada para hacer visible aceleración y momentum relativo desde una base común.',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/own_brand_stats.webp',
        alt: 'Profile card benchmark sintética con KPIs de revenue, visitas, share, ranking y eficiencia',
        label: 'Profile cards',
        caption: 'Lectura de perfil para una entidad seleccionada, con KPIs y contexto de ranking preparado por la capa de view models.',
      },
    ],
    dataEyebrow: 'Contrato de datos',
    dataH2: 'Un único payload alimenta el framework',
    dataP:
      '`data.interface` es la fuente de verdad. El dashboard público puede funcionar con mock JSON o filas mensuales aportadas por el usuario a través de un adapter, siempre que el payload valide antes de llegar al benchmark engine.',
    fieldDefs: [
      { key: 'interface', label: 'Filas fuente para fechas, entidades, mercados, revenue, visitas, rankings, shares, crecimiento y campos de forecast.' },
      { key: 'events', label: 'Anotaciones opcionales y seguras para overlays de lanzamientos, cambios o contexto.' },
      { key: 'dictionary', label: 'Definiciones y metadata opcional para explicar la capa de interface.' },
    ],
    safetyEyebrow: 'Disciplina pública de build',
    safetyH2: 'Los datos sintéticos son parte del diseño del producto',
    safetyP:
      'El repo público es deliberadamente demostrativo: compañías mock generadas, valores sintéticos, ejemplos de env vacíos y ninguna URL privada. Esa restricción hace publicable el caso sin debilitar la historia técnica.',
    validationChecks: ['pnpm test', 'pnpm validate:data', 'pnpm audit:public'],
    safetyBullets: [
      'Sin datos reales de clientes, competidores, logos ni URLs privadas.',
      'Los adapters permiten reemplazar inputs preservando el mismo contrato validado.',
      'Los checks de publicación hacen visible la disciplina de datos sintéticos antes del release.',
    ],
    resultEyebrow: 'Resultado',
    resultH2: 'Un framework de inteligencia reutilizable y seguro para portfolio',
    resultP:
      'El resultado es un framework de dashboard ejecutivo reutilizable para prototipos de inteligencia competitiva, analytics UX y storytelling de producto de datos.',
    buildH3: 'Construcción',
    buildBullets: [
      'Interfaz ejecutiva React/Vite apoyada en validación de schema, cálculos benchmark, source adapters y view-model builders.',
      'Configuración centralizada para focus company, benchmark company, vistas activas, moneda, locale y defaults.',
      'Política de mock data sintética y checks de release antes de publicar.',
    ],
    outcomeH3: 'Resultado',
    outcomeBullets: [
      'Framework reutilizable para rankings, market share, crecimiento, forecasts, event overlays, perfiles y señales ejecutivas.',
      'Demo segura para portfolio que muestra el producto sin exponer clientes, competidores o infraestructura privada.',
      'Contrato de datos claro para mock JSON o filas benchmark aportadas por el usuario.',
    ],
    calloutLabel: 'Conclusión',
    calloutText:
      'Un caso serio de producto de datos: arquitectura, prueba visual y restricciones públicas trabajando juntas.',
  },
}

export default function BenchmarkDashboardPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const t = content[locale]

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
            <p className="data-brief-eyebrow">{t.heroEyebrow}</p>
            <h1 id="benchmark-title" className="benchmark-hero__title">
              {t.heroTitle}
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
                <Fragment key={step}>
                  <span key={step}>{step}</span>
                  {i < t.flowDiagram.length - 1 && (
                    <span key={`arrow-${i}`} className="benchmark-diagram__arrow">→</span>
                  )}
                </Fragment>
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

        {/* ── PUBLIC SAFETY ── */}
        <section
          id="safety"
          className="data-brief-section data-brief-section--light benchmark-section benchmark-section--safety"
          aria-labelledby="benchmark-safety"
        >
          <div className="data-brief-section__container data-brief-two-column">
            <div className="benchmark-section-heading benchmark-section-heading--sticky">
              <p className="data-brief-eyebrow">{t.safetyEyebrow}</p>
              <h2 id="benchmark-safety">{t.safetyH2}</h2>
              <p>{t.safetyP}</p>
            </div>
            <div className="benchmark-safety-stack">
              <div className="benchmark-validation-panel" aria-label="Public release validation commands">
                {t.validationChecks.map((check) => (
                  <code key={check}>{check}</code>
                ))}
              </div>
              <ul className="data-brief-list benchmark-safety-list">
                {t.safetyBullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
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
          currentHref={pathname}
          accentColor="var(--color-0)"
          locale={locale}
        />
      </main>
      <Footer locale={locale} />
    </>
  )
}
