'use client'

import { Fragment } from 'react'
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

const demoUrl = 'https://benchmark-dashboard-tb47.vercel.app/'
const githubUrl = 'https://github.com/RaulMermans/benchmark_dashboard'

const commercialContent: CommercialCaseStudyContent = {
  snapshot: [
    { label: 'Type', value: 'Competitive intelligence framework' },
    { label: 'Use case', value: 'Benchmarking, market context, positioning analysis, executive dashboards' },
    { label: 'Role', value: 'Product logic, dashboard architecture, data contract design, frontend implementation' },
    { label: 'Stack', value: 'React, Vite, benchmark engine, adapters, view models, synthetic data, Vercel' },
    { label: 'Status', value: 'Live demo and GitHub available; public-safe synthetic data only' },
  ],
  links: [
    { label: 'View Prototype', href: demoUrl, external: true },
    { label: 'View GitHub', href: githubUrl, external: true },
  ],
  businessContext:
    'Competitor research often becomes a mix of disconnected screenshots, manually assembled tables, and hard-to-repeat analysis. This project explores how structured benchmark data can become a reusable intelligence surface for clearer market context and positioning decisions.',
  systemSummary:
    'The framework uses a defined payload contract, adapters, schema validation, benchmark calculations, view-model builders, and a React/Vite dashboard. It is deliberately public-safe: demo data is synthetic, private sources are excluded, and validation checks protect the portfolio artifact.',
  systemItems: [
    { title: 'Inputs', description: 'Mock JSON or monthly benchmark rows shaped into a validated interface, events, and dictionary contract.' },
    { title: 'Workflow', description: 'Adapter, schema validation, benchmark engine, view-model generation, dashboard rendering, and release checks.' },
    { title: 'Processing logic', description: 'Ranks, share, growth, efficiency, forecasts, player profiles, and comparisons are calculated outside the UI layer.' },
    { title: 'Output', description: 'Executive dashboard views for market overview, profiles, head-to-head comparison, forecasts, and strategic signals.' },
    { title: 'Guardrails', description: 'Synthetic-data discipline, no real client or competitor data, and public-readiness validation before publishing.' },
  ],
  whyItMatters:
    'Competitive intelligence becomes more valuable when the research logic is repeatable. This framework defines inputs, calculations, view models, and public-safety constraints so benchmark analysis can move beyond one-off decks and into a reusable operating surface.',
  clientRelevance:
    'A client-facing version could help brand, ecommerce, marketing, or strategy teams compare markets, structure competitor research, monitor positioning signals, and produce clearer executive readouts without rebuilding the analysis from scratch.',
  ctaCopy:
    "If your team has a workflow, reporting process, or creative operation that could benefit from structured AI support, send a short brief and I'll help map the system logic.",
}

const commercialContentEs: CommercialCaseStudyContent = {
  snapshot: [
    { label: 'Tipo', value: 'Framework de inteligencia competitiva' },
    { label: 'Uso', value: 'Benchmarking, contexto de mercado, análisis de posicionamiento y paneles ejecutivos' },
    { label: 'Rol', value: 'Lógica de producto, arquitectura de panel, diseño de contrato de datos e implementación frontend' },
    { label: 'Stack', value: 'React, Vite, motor benchmark, adapters, view models, datos sintéticos y Vercel' },
    { label: 'Estado', value: 'Demo en vivo y GitHub disponibles; solo datos sintéticos seguros para publicar' },
  ],
  links: [
    { label: 'Ver prototipo', href: demoUrl, external: true },
    { label: 'Ver GitHub', href: githubUrl, external: true },
  ],
  businessContext:
    'La investigación competitiva suele acabar en capturas sueltas, tablas montadas a mano y análisis difíciles de repetir. Este proyecto explora cómo los datos de benchmark estructurados pueden convertirse en una superficie reutilizable de inteligencia para leer mejor el mercado y tomar decisiones de posicionamiento.',
  systemSummary:
    'El sistema usa un contrato de payload definido, adaptadores, validación de esquema, cálculos benchmark, construcción de modelos de vista y un panel React/Vite. Está diseñado para publicarse con seguridad: los datos de demo son sintéticos, las fuentes privadas quedan fuera y las validaciones protegen el artefacto de portafolio.',
  systemItems: [
    { title: 'Inputs', description: 'Mock JSON o filas mensuales de benchmark convertidas en un contrato validado de interfaz, eventos y diccionario.' },
    { title: 'Flujo', description: 'Adaptador, validación de esquema, motor benchmark, generación de modelos de vista, renderizado del panel y validaciones de publicación.' },
    { title: 'Lógica de proceso', description: 'Rankings, cuota, crecimiento, eficiencia, previsiones, perfiles y comparativas se calculan fuera de la capa visual.' },
    { title: 'Resultado', description: 'Vistas ejecutivas para overview de mercado, perfiles, comparación directa, previsiones y señales estratégicas.' },
    { title: 'Límites', description: 'Disciplina de datos sintéticos, cero datos reales de clientes o competidores y validación de publicación antes de desplegar.' },
  ],
  whyItMatters:
    'La inteligencia competitiva gana valor cuando la lógica de análisis es repetible. Este sistema define entradas, cálculos, modelos de vista y restricciones públicas para que el benchmark deje de ser una presentación aislada y pase a ser una superficie operativa reutilizable.',
  clientRelevance:
    'Una versión para cliente podría ayudar a equipos de marca, ecommerce, marketing o estrategia a comparar mercados, estructurar investigación competitiva, monitorizar señales de posicionamiento y producir lecturas ejecutivas más claras sin rehacer el análisis desde cero.',
  ctaCopy:
    'Si tu equipo tiene un flujo, proceso de reporting u operación creativa que podría beneficiarse de una capa de IA más estructurada, envía un brief breve y te ayudo a mapear la lógica del sistema.',
}

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
    heroCTA: 'View Prototype →',
    heroCTASecondary: 'View GitHub →',
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
    heroEyebrow: 'Producto de datos / Sistema de inteligencia benchmark',
    heroTitle: 'Benchmark Intelligence Framework',
    heroSubtitle:
      'Un sistema de inteligencia competitiva seguro para publicar que convierte datos estructurados de benchmark en rankings ejecutivos, análisis de cuota, crecimiento, previsiones, perfiles y señales estratégicas.',
    heroDescription:
      'El proyecto evolucionó de un panel visual a un sistema frontend reutilizable: contrato de datos primero, lógica de cálculo separada de la presentación y validación pensada para publicar sin exponer información privada.',
    heroMockNotice:
      'Solo en modo demo: entidades sintéticas, valores sintéticos y etiquetas públicas; sin datos reales de clientes, competidores, logos ni fuentes privadas.',
    heroCTA: 'Ver la demo pública →',
    heroCTASecondary: 'Ver el repositorio →',
    heroFigcaption: 'Resumen ejecutivo, tarjetas KPI, movimiento de cuota y señales estratégicas. Solo datos sintéticos.',
    heroFigAriaLabel: 'Resumen ejecutivo del panel con datos sintéticos de benchmark',
    heroImgAlt:
      'Resumen ejecutivo del panel de inteligencia benchmark con revenue, cuota y señales estratégicas sintéticas',
    nav: [
      ['Cambio', '#overview'],
      ['Arquitectura', '#flow'],
      ['Pantallas', '#screens'],
      ['Datos', '#conexion'],
      ['Seguridad', '#safety'],
      ['Resultado', '#resultado'],
    ] as const,
    overviewEyebrow: 'Qué cambió',
    overviewH2: 'De panel visual a sistema reutilizable de inteligencia',
    overviewP:
      'El producto actual no es solo un panel estático. Separa la lógica de datos de la lógica de presentación para que las filas de benchmark pasen por validación, cálculos, modelos de vista y después por una interfaz ejecutiva pulida.',
    proofPoints: [
      { value: '1', label: 'Contrato de datos explícito' },
      { value: '3', label: 'Validaciones de publicación' },
      { value: '0', label: 'Datos privados expuestos' },
    ],
    featureCards: [
      { title: 'Motor benchmark', description: 'Calcula cuota, ranking, crecimiento, eficiencia, agregaciones y comparativas ejecutivas fuera de la capa visual.' },
      { title: 'Adaptadores de fuente', description: 'Convierten JSON de ejemplo o filas mensuales simples en el mismo contrato de datos benchmark.' },
      { title: 'Modelos de vista', description: 'Preparan estructuras para gráficos, tablas, perfiles, eventos y resúmenes antes de renderizar React.' },
      { title: 'Disciplina pública', description: 'Mantiene la demo segura para portafolio con datos sintéticos, scripts de validación y revisión pública.' },
    ],
    flowEyebrow: 'Arquitectura',
    flowH2: 'Un flujo de sistema, no una pantalla aislada',
    flowP:
      'El sistema mantiene separadas la ingesta, validación, cálculo benchmark, preparación de modelos de vista y renderizado de interfaz. Así la demo puede reemplazarse sin cambiar la experiencia del panel.',
    flowDiagram: ['Datos mensuales / JSON de ejemplo', 'Adaptador', 'Validador de esquema', 'Motor benchmark', 'Modelos de vista', 'Panel React + Vite', 'Despliegue en Vercel'],
    systemSteps: [
      { num: '01', title: 'Fuente de datos', description: 'JSON de ejemplo o filas mensuales de benchmark aportadas por el usuario.' },
      { num: '02', title: 'Adaptador', description: 'Transforma filas simples en el payload del sistema.' },
      { num: '03', title: 'Validador de esquema', description: 'Comprueba que interface, events y dictionary cumplen el contrato.' },
      { num: '04', title: 'Motor benchmark', description: 'Normaliza filas y calcula rankings, cuotas, crecimiento, eficiencia y agregaciones.' },
      { num: '05', title: 'Modelos de vista', description: 'Prepara datos listos para gráficos, tablas, perfiles y resumen ejecutivo.' },
      { num: '06', title: 'Interfaz del panel', description: 'Renderiza la interfaz ejecutiva React/Vite y despliega de forma segura en Vercel.' },
    ],
    screensEyebrow: 'Prueba visual',
    screensH2: 'Vistas ejecutivas desde un único contrato benchmark',
    screensP:
      'La interfaz actualizada funciona como una sala de control de benchmark: selector de vistas, disponibilidad por periodo, rankings, momentum, perfiles, comparación cara a cara y previsiones desde el mismo payload estructurado.',
    gallery: [
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/view_selector.webp',
        alt: 'Navegación del panel benchmark con pestañas Panel principal, Entidades, Comparativa y Previsión',
        label: 'Selector de vistas',
        caption: 'La interfaz se organiza por modos ejecutivos: resumen de mercado, perfiles, comparativa directa y espacio de previsión.',
        layout: 'wide',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/time_selector.webp',
        alt: 'Selector temporal del panel benchmark con modo año y disponibilidad de métricas',
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
        alt: 'Perfil sintético de entidad con resumen ejecutivo y tarjetas KPI',
        label: 'Perfil de entidad',
        caption: 'Lectura individual para una entidad seleccionada, con resumen ejecutivo, KPIs, ranking, cuota y eficiencia.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/player_graph.webp',
        alt: 'Gráfica sintética de entidad con selección de series benchmark e histórico de facturación',
        label: 'Gráfico de entidad',
        caption: 'Un espacio de gráfica enfocado permite comparar una entidad con el promedio de mercado o con pares seleccionados.',
        layout: 'large',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/battle_arena.webp',
        alt: 'Comparativa sintética entre dos entidades por visitas, facturación, cuota y eficiencia',
        label: 'Comparativa directa',
        caption: 'La comparación cara a cara convierte filas benchmark en una lectura directa de escala, cuota, crecimiento y eficiencia.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/forecast_market.webp',
        alt: 'Proyección sintética de mercado con visitas y facturación proyectadas por entidad',
        label: 'Previsión de mercado',
        caption: 'El espacio de previsiones separa periodos proyectados del histórico observado y etiqueta con claridad los valores previstos.',
        layout: 'large',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/forecast_player.webp',
        alt: 'Histórico observado y previsión sintética de una entidad benchmark',
        label: 'Previsión por entidad',
        caption: 'La proyección individual muestra histórico observado, último dato observado y una ruta prevista punteada para periodos futuros.',
        layout: 'wide',
      },
    ],
    dataEyebrow: 'Contrato de datos',
    dataH2: 'Un único payload alimenta el sistema',
    dataP:
      '`data.interface` es la fuente de verdad. El panel público puede funcionar con JSON de ejemplo o filas mensuales aportadas por el usuario mediante un adaptador, siempre que el payload valide antes de llegar al motor benchmark.',
    fieldDefs: [
      { key: 'interface', label: 'Filas fuente para fechas, entidades, mercados, revenue, visitas, rankings, cuotas, crecimiento y campos de previsión.' },
      { key: 'events', label: 'Anotaciones opcionales y seguras para overlays de lanzamientos, cambios o contexto.' },
      { key: 'dictionary', label: 'Definiciones y metadatos opcionales para explicar la capa de interface.' },
    ],
    safetyEyebrow: 'Disciplina de publicación',
    safetyH2: 'Los datos sintéticos son parte del diseño del producto',
    safetyP:
      'El repo público es deliberadamente demostrativo: compañías de ejemplo, valores sintéticos, ejemplos de env vacíos y ninguna URL privada. Esa restricción hace publicable el caso sin debilitar la historia técnica.',
    validationChecks: ['pnpm test', 'pnpm validate:data', 'pnpm audit:public'],
    safetyBullets: [
      'Sin datos reales de clientes, competidores, logos ni URLs privadas.',
      'Los adaptadores permiten reemplazar inputs preservando el mismo contrato validado.',
      'Las validaciones de publicación hacen visible la disciplina de datos sintéticos antes del release.',
    ],
    resultEyebrow: 'Resultado',
    resultH2: 'Un sistema de inteligencia reutilizable y seguro para portafolio',
    resultP:
      'El resultado es un sistema de panel ejecutivo reutilizable para prototipos de inteligencia competitiva, UX analítica y storytelling de producto de datos.',
    buildH3: 'Construcción',
    buildBullets: [
      'Interfaz ejecutiva React/Vite apoyada en validación de esquema, cálculos benchmark, adaptadores de fuente y constructores de modelos de vista.',
      'Configuración centralizada para compañía foco, compañía benchmark, vistas activas, moneda, locale y defaults.',
      'Política de datos sintéticos y validaciones antes de publicar.',
    ],
    outcomeH3: 'Resultado',
    outcomeBullets: [
      'Sistema reutilizable para rankings, cuota de mercado, crecimiento, previsiones, anotaciones de eventos, perfiles y señales ejecutivas.',
      'Demo segura para portafolio que muestra el producto sin exponer clientes, competidores o infraestructura privada.',
      'Contrato de datos claro para JSON de ejemplo o filas benchmark aportadas por el usuario.',
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
  const commercial = locale === 'es' ? commercialContentEs : commercialContent

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

        <CommercialCaseStudyIntro content={commercial} locale={locale} />

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

        <CommercialCaseStudyClosing content={commercial} locale={locale} />

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
