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
      'The updated interface now reads like a benchmark operating room: view selectors, period availability, rankings, momentum, player profiles, head-to-head comparison, and forecast paths generated from the same structured payload.',
    gallery: [
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/view_selector.webp',
        alt: 'Benchmark dashboard navigation with Panel principal, Players, Battle Arena, and Forecast tabs',
        label: 'View selector',
        caption: 'The interface is organized around executive modes: market overview, player profiles, head-to-head battle, and forecast workspace.',
        layout: 'wide',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/time_selector.webp',
        alt: 'Benchmark dashboard time selector showing year mode and data availability by metric',
        label: 'Time and data availability',
        caption: 'The context panel makes the selected period explicit and shows which metrics are available before the benchmark engine renders a view.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/competitive_ranking.webp',
        alt: 'Synthetic competitive ranking table with revenue distribution chart',
        label: 'Competitive ranking',
        caption: 'Period ranking and distribution from the interface rows, useful for executive comparison without exposing real company data.',
        layout: 'large',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/momentum.webp',
        alt: 'Synthetic indexed growth momentum chart across benchmark entities',
        label: 'Growth momentum',
        caption: 'Separates added volume from relative growth so the measured market stays a reference, not a second dashboard.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/player_view.webp',
        alt: 'Synthetic player profile page with executive snapshot and KPI cards',
        label: 'Player profile',
        caption: 'Profile-level readout for a selected entity, with executive summary, KPI cards, rank, share, and efficiency context.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/player_graph.webp',
        alt: 'Synthetic player graph with selectable benchmark series and revenue history',
        label: 'Player graph',
        caption: 'A focused graph workspace lets the user compare a player against market average or selected peers across historical metrics.',
        layout: 'large',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/battle_arena.webp',
        alt: 'Synthetic battle arena comparing two benchmark players across visits, revenue, share, and efficiency',
        label: 'Battle arena',
        caption: 'Head-to-head comparison turns benchmark rows into a clear player-versus-player reading across scale, share, growth, and efficiency.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/forecast_market.webp',
        alt: 'Synthetic market projection page with projected visits and revenue by player',
        label: 'Market forecast',
        caption: 'Forecast workspace separates projected periods from observed history and keeps forecast values clearly labelled.',
        layout: 'large',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/forecast_player.webp',
        alt: 'Synthetic observed history and forecast line chart for a benchmark player',
        label: 'Player forecast',
        caption: 'Player-level projection shows observed history, the last observed date, and a dashed forecast path for future periods.',
        layout: 'wide',
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
      'La interfaz actualizada funciona como una sala de control de benchmark: selector de vistas, disponibilidad por periodo, rankings, momentum, perfiles, comparación cara a cara y forecast desde el mismo payload estructurado.',
    gallery: [
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/view_selector.webp',
        alt: 'Navegación del dashboard benchmark con pestañas Panel principal, Players, Battle Arena y Forecast',
        label: 'Selector de vistas',
        caption: 'La interfaz se organiza por modos ejecutivos: overview de mercado, perfiles, batalla cara a cara y espacio de forecast.',
        layout: 'wide',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/time_selector.webp',
        alt: 'Selector temporal del dashboard benchmark con modo año y disponibilidad de métricas',
        label: 'Tiempo y disponibilidad',
        caption: 'El panel de contexto explicita el periodo seleccionado y muestra qué métricas están disponibles antes de renderizar la lectura.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/competitive_ranking.webp',
        alt: 'Ranking competitivo sintético con tabla de facturación y gráfico de distribución',
        label: 'Ranking competitivo',
        caption: 'Ranking por periodo y distribución desde las filas de interface, útil para comparación ejecutiva sin datos reales de compañías.',
        layout: 'large',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/momentum.webp',
        alt: 'Gráfico sintético de momentum de crecimiento indexado entre entidades benchmark',
        label: 'Momentum de crecimiento',
        caption: 'Separa volumen añadido y crecimiento relativo para que el mercado medido funcione como referencia, no como otra lectura aislada.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/player_view.webp',
        alt: 'Perfil sintético de player con executive snapshot y tarjetas KPI',
        label: 'Player profile',
        caption: 'Lectura individual para una entidad seleccionada, con resumen ejecutivo, KPIs, ranking, share y eficiencia.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/player_graph.webp',
        alt: 'Gráfica sintética de player con selección de series benchmark e histórico de facturación',
        label: 'Player graph',
        caption: 'Un espacio de gráfica enfocado permite comparar un player contra el promedio de mercado o peers seleccionados.',
        layout: 'large',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/battle_arena.webp',
        alt: 'Battle Arena sintética comparando dos players por visitas, facturación, cuota y eficiencia',
        label: 'Battle arena',
        caption: 'La comparación cara a cara convierte filas benchmark en una lectura directa de escala, cuota, crecimiento y eficiencia.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/forecast_market.webp',
        alt: 'Proyección sintética de mercado con visitas y facturación proyectadas por player',
        label: 'Forecast de mercado',
        caption: 'El espacio de forecast separa periodos proyectados del histórico observado y etiqueta con claridad los valores forecast.',
        layout: 'large',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/forecast_player.webp',
        alt: 'Histórico observado y forecast sintético de un player benchmark',
        label: 'Forecast por player',
        caption: 'La proyección individual muestra histórico observado, último dato observado y una ruta forecast punteada para periodos futuros.',
        layout: 'wide',
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
              {t.gallery.map((screen) => (
                <figure
                  key={screen.label}
                  className={`benchmark-screen benchmark-screen--${screen.layout}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={screen.src} alt={screen.alt} loading="lazy" />
                  <figcaption>
                    <span className="data-brief-eyebrow">{screen.label}</span>
                    <p>{screen.caption}</p>
                  </figcaption>
                </figure>
              ))}
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
