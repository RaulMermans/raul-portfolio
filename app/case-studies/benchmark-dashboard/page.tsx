'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCaseStudySetup } from '@/hooks'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import CaseStudyMiniNav from '@/components/case-studies/CaseStudyMiniNav'
import {
  CommercialCaseStudyClosing,
  CommercialCaseStudyIntro,
  type CommercialCaseStudyContent,
} from '@/components/case-studies/CommercialCaseStudySections'

const demoUrl = 'https://benchmark-dashboard-tb47.vercel.app/'
const githubUrl = 'https://github.com/RaulMermans/benchmark_dashboard'

const commercialContent: CommercialCaseStudyContent = {
  snapshot: [
    { label: 'Type', value: 'Raw-data benchmark intelligence engine' },
    {
      label: 'Use case',
      value:
        'Tracked benchmark-set share, rankings, monetization diagnostics, aggregation, and scenario projections',
    },
    {
      label: 'Role',
      value:
        'Product logic, raw data contract design, canonical metrics pipeline, forecast framing, frontend implementation',
    },
    {
      label: 'Stack',
      value:
        'React, Vite, source_monthly contract, canonical benchmark pipeline, local forecast engine, synthetic data, Vercel',
    },
    {
      label: 'Status',
      value: 'Live demo and GitHub available; public-safe synthetic data only',
    },
  ],
  links: [
    { label: 'View Prototype', href: demoUrl, external: true },
    { label: 'View GitHub', href: githubUrl, external: true },
  ],
  businessContext:
    'Competitive analysis often lives in disconnected spreadsheets, screenshots, and one-off decks. The same questions repeat: who is gaining share, who is more efficient, which players are improving, and what may happen next.',
  systemSummary:
    'The product is not only the chart layer. A clean source_monthly contract feeds a canonical pipeline that validates raw observations, generates benchmark rows, calculates shares/ranks/efficiency metrics, creates local scenario forecasts, and renders the result as a React/Vite executive dashboard.',
  systemItems: [
    {
      title: 'Inputs',
      description:
        '480 raw monthly observations: 8 synthetic companies across 60 months, plus 12 synthetic public-safe events.',
    },
    {
      title: 'Workflow',
      description:
        'Validation, canonical benchmark pipeline, generated market_total and market_average rows, forecast generation, view-model generation, and release checks.',
    },
    {
      title: 'Processing logic',
      description:
        'Tracked benchmark-set share, ranks, growth, indexed metrics, revenue per visit, monetization gap, period aggregation, and forecast-derived metrics are calculated in code.',
    },
    {
      title: 'Output',
      description:
        'Executive dashboard, Players/company profiles, Battle Arena, forecast view, ranking tables, and public-safe data health context.',
    },
    {
      title: 'Guardrails',
      description:
        'Synthetic-data discipline, no real client or competitor data, and public-readiness validation before publishing.',
    },
  ],
  whyItMatters:
    'Competitive intelligence becomes more valuable when the analysis logic is repeatable. This project turns raw monthly observations into an inspectable benchmark pipeline instead of treating the dashboard as the product.',
  clientRelevance:
    'A client-facing version could help brand, ecommerce, marketing, or strategy teams compare markets, monitor positioning signals, diagnose monetization gaps, and produce clearer executive readouts without rebuilding the analysis from scratch.',
  ctaCopy:
    "If your team has a creative process, internal tool, campaign workflow, or brand system worth extending with AI, send a short brief and I'll help define the clearest system logic.",
}

const commercialContentEs: CommercialCaseStudyContent = {
  snapshot: [
    { label: 'Tipo', value: 'Motor de inteligencia benchmark desde datos raw' },
    {
      label: 'Uso',
      value:
        'Cuota del set benchmark, rankings, diagnóstico de monetización, agregación y proyecciones de escenario',
    },
    {
      label: 'Rol',
      value:
        'Lógica de producto, contrato raw, pipeline canónico de métricas, framing de forecast e implementación frontend',
    },
    {
      label: 'Stack',
      value:
        'React, Vite, contrato source_monthly, pipeline benchmark, forecast local, datos sintéticos y Vercel',
    },
    {
      label: 'Estado',
      value:
        'Demo en vivo y GitHub disponibles; solo datos sintéticos seguros para publicar',
    },
  ],
  links: [
    { label: 'Ver prototipo', href: demoUrl, external: true },
    { label: 'Ver GitHub', href: githubUrl, external: true },
  ],
  businessContext:
    'El análisis competitivo suele vivir en hojas de cálculo, capturas y decks aislados. Las mismas preguntas se repiten: quién gana cuota, quién es más eficiente, qué players mejoran y qué podría pasar después.',
  systemSummary:
    'El producto no es solo la capa de gráficos. Un contrato source_monthly alimenta un pipeline canónico que valida observaciones raw, genera filas benchmark, calcula cuotas/rankings/eficiencia, crea escenarios locales de forecast y renderiza el resultado en un dashboard ejecutivo React/Vite.',
  systemItems: [
    {
      title: 'Inputs',
      description:
        '480 observaciones mensuales raw: 8 compañías sintéticas durante 60 meses, más 12 eventos sintéticos publicables.',
    },
    {
      title: 'Flujo',
      description:
        'Validación, pipeline benchmark canónico, filas market_total y market_average generadas, forecast, modelos de vista y checks de publicación.',
    },
    {
      title: 'Lógica de proceso',
      description:
        'Cuota del set benchmark, rankings, crecimiento, métricas indexadas, revenue per visit, monetization gap, agregación y métricas derivadas del forecast se calculan en código.',
    },
    {
      title: 'Resultado',
      description:
        'Dashboard ejecutivo, Players/perfiles, Battle Arena, vista de forecast, rankings y estado de datos publicable.',
    },
    {
      title: 'Límites',
      description:
        'Disciplina de datos sintéticos, cero datos reales de clientes o competidores y validación de publicación antes de desplegar.',
    },
  ],
  whyItMatters:
    'La inteligencia competitiva gana valor cuando la lógica de análisis es repetible. Este proyecto convierte observaciones mensuales raw en un pipeline benchmark inspeccionable en vez de tratar el dashboard como todo el producto.',
  clientRelevance:
    'Una versión para cliente podría ayudar a equipos de marca, ecommerce, marketing o estrategia a comparar mercados, monitorizar posicionamiento, diagnosticar gaps de monetización y producir lecturas ejecutivas sin rehacer el análisis desde cero.',
  ctaCopy:
    'Si tu equipo tiene un proceso creativo, herramienta interna, flujo de campaña o sistema de marca que merece ampliarse con IA, envía un brief breve y te ayudo a definir la lógica más clara.',
}

const dataContract = `{
  "ok": true,
  "meta": {
    "dataset_name": "Demo Benchmark Dataset",
    "currency": "EUR",
    "source_type": "raw_monthly_observations",
    "data_policy": "Synthetic demo data only. No real company or client data is included."
  },
  "data": {
    "source_monthly": [
      {
        "date": "2025-01-01",
        "company_id": "focus",
        "display_name": "Focus Brand",
        "market": "Demo Market",
        "type": "own",
        "revenue": 125000,
        "visits": 82000,
        "active": true
      }
    ]
  }
}`

const content = {
  en: {
    back: '← Case Studies',
    heroEyebrow: 'Data product / Raw-data benchmark intelligence engine',
    heroTitle: 'Benchmark Intelligence Engine',
    heroSubtitle:
      'A raw-data benchmark dashboard for share, rank, monetization, aggregation, and local scenario forecasts.',
    heroDescription:
      'A public-safe benchmark intelligence dashboard that turns five years of synthetic monthly revenue and traffic observations into tracked market-share analysis, rankings, monetization diagnostics, period aggregation, and local scenario forecasts. The system starts from 480 raw monthly rows, then generates the intelligence layer in code: benchmark rows, shares, ranks, efficiency metrics, growth metrics, and forecast scenarios.',
    heroMockNotice:
      'Demo mode only: synthetic companies, synthetic values, public-safe labels, and no real company, client, logo, or private source data.',
    heroCTA: 'View Live Demo →',
    heroCTASecondary: 'View GitHub →',
    heroFigcaption:
      'Executive summary generated from five years of raw synthetic monthly data. Synthetic demo data only.',
    heroFigAriaLabel:
      'Executive dashboard summary with synthetic benchmark data',
    heroImgAlt:
      'Executive benchmark dashboard generated from five years of raw synthetic monthly data',
    tags: [
      'React/Vite',
      'source_monthly',
      '480 raw rows',
      'Local forecast engine',
      'Public-safe synthetic data',
    ],
    nav: [
      ['Changed', '#overview'],
      ['Architecture', '#flow'],
      ['Screens', '#screens'],
      ['Data', '#conexion'],
      ['Safety', '#safety'],
      ['Result', '#resultado'],
    ] as const,
    overviewEyebrow: 'What changed',
    overviewH2: 'From prepared dashboard JSON to generated benchmark intelligence',
    overviewP:
      'I rebuilt the project across several sprints: from prepared dashboard JSON to raw source_monthly observations, from static benchmark rows to generated market_total and market_average rows, from precomputed metrics to runtime calculations, and from fragile profile/battle routes to working Battle Arena and Players/company profile views.',
    proofPoints: [
      { value: '480', label: 'raw monthly rows' },
      { value: '8 × 60', label: 'synthetic companies × months' },
      { value: '12', label: 'synthetic events' },
    ],
    featureCards: [
      {
        title: 'Raw data contract',
        description:
          'The public JSON stores raw monthly observations only. Legacy data.interface payloads remain supported as backwards compatibility, but they are not the preferred source of truth.',
      },
      {
        title: 'Generated benchmark rows',
        description:
          'market_total and market_average rows are generated at runtime from observed company rows, then excluded from share denominators and ranks where appropriate.',
      },
      {
        title: 'Generated metrics',
        description:
          'Market share, ranks, growth, indexed metrics, revenue per visit, monetization gap, annual aggregation, and range aggregation are calculated in code.',
      },
      {
        title: 'Working product views',
        description:
          'Executive dashboard, Players/company profiles, #/company/:id routes, legacy #/empresa/:id routes, Battle Arena, and Forecast view all work from generated canonical rows.',
      },
    ],
    flowEyebrow: 'Architecture',
    flowH2: 'The repeatable intelligence pipeline behind the chart layer',
    flowP:
      'The final architecture separates source data from benchmark intelligence. Raw monthly revenue and visits enter through data.source_monthly; the canonical pipeline validates the rows, normalizes entities, calculates benchmark metrics, generates synthetic benchmark rows, creates forecast rows, recalculates forecast-derived metrics, and returns dashboard-ready interface rows.',
    flowDiagram: [
      'Raw source_monthly data',
      'Validation',
      'Canonical benchmark pipeline',
      'Derived metrics',
      'Synthetic benchmark rows',
      'Local forecast engine',
      'React/Vite dashboard',
    ],
    systemSteps: [
      {
        num: '01',
        title: 'Raw observations',
        description:
          'Five years of synthetic monthly revenue and visits: 2021-01-01 through 2025-12-01.',
      },
      {
        num: '02',
        title: 'Validation',
        description:
          'Accepts source_monthly rows and rejects derived benchmark fields from the raw source layer.',
      },
      {
        num: '03',
        title: 'Canonical pipeline',
        description:
          'Builds dashboard-ready rows from raw observations while keeping the public JSON small, readable, and safe.',
      },
      {
        num: '04',
        title: 'Derived intelligence',
        description:
          'Calculates tracked benchmark-set share, ranks, indexed values, growth metrics, revenue per visit, and monetization gap.',
      },
      {
        num: '05',
        title: 'Scenario forecasts',
        description:
          'The local_engine default projects revenue and visits, then sends forecast rows back through the benchmark pipeline.',
      },
      {
        num: '06',
        title: 'Dashboard UI',
        description:
          'Renders market overview, Players, Battle Arena, company profiles, forecast scenarios, and data health context.',
      },
    ],
    screensEyebrow: 'Visual proof',
    screensH2: 'Core product views from generated benchmark metrics',
    screensP:
      'The shipped interface exposes the product surface around the pipeline: executive overview, rankings, market-share movement, Players/company profiles, Battle Arena comparisons, and forecast scenarios generated from the five-year history.',
    gallery: [
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/view_selector.webp',
        alt: 'Benchmark dashboard navigation with Panel principal, Players, Battle Arena, and Forecast tabs',
        label: 'View selector',
        caption:
          'The interface is organized around working executive modes: market overview, Players, Battle Arena, and forecast workspace.',
        layout: 'wide',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/time_selector.webp',
        alt: 'Benchmark dashboard time selector showing year mode and data availability by metric',
        label: 'Time and data availability',
        caption:
          'Annual and range aggregation are calculated from summed revenue and visits, then benchmark metrics are recalculated for the selected period.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/competitive_ranking.webp',
        alt: 'Synthetic competitive ranking table with revenue distribution chart',
        label: 'Competitive ranking',
        caption:
          'Ranking table with generated benchmark-set shares and ranks, useful for executive comparison without exposing real company data.',
        layout: 'large',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/momentum.webp',
        alt: 'Synthetic indexed growth momentum chart across benchmark entities',
        label: 'Growth momentum',
        caption:
          'Indexed growth and YoY/MoM changes are generated from raw monthly observations rather than stored as final dashboard values.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/player_view.webp',
        alt: 'Synthetic player profile page with executive snapshot and KPI cards',
        label: 'Player profile',
        caption:
          'Company profile showing generated historical and forecast metrics, available through #/company/:id and legacy #/empresa/:id routes.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/player_graph.webp',
        alt: 'Synthetic player graph with selectable benchmark series and revenue history',
        label: 'Player graph',
        caption:
          'A focused graph workspace compares a player against generated market_average or selected peers across historical benchmark metrics.',
        layout: 'large',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/battle_arena.webp',
        alt: 'Synthetic battle arena comparing two benchmark players across visits, revenue, share, and efficiency',
        label: 'Battle arena',
        caption:
          'Battle Arena compares two synthetic benchmark players using generated scale, share, growth, and efficiency metrics.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/forecast_market.webp',
        alt: 'Synthetic market projection page with projected visits and revenue by player',
        label: 'Market forecast',
        caption:
          'Forecast view with local scenario projections starting after 2025-12-01 and recalculated benchmark rows for each scenario.',
        layout: 'large',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/forecast_player.webp',
        alt: 'Synthetic observed history and forecast line chart for a benchmark player',
        label: 'Player forecast',
        caption:
          'base_case, conservative, and aggressive scenarios include confidence diagnostics and stay framed as scenario projections.',
        layout: 'wide',
      },
    ],
    dataEyebrow: 'Data contract',
    dataH2: 'source_monthly is the source contract',
    dataP:
      'The JSON stores raw monthly observations only. The app generates interface rows internally: forecast rows, market_total and market_average rows, market share, ranks, indexed metrics, growth metrics, revenue per visit, and monetization gap are all generated in code.',
    fieldDefs: [
      {
        key: 'source_monthly',
        label:
          'Raw monthly observations for date, company_id, display_name, market, type, revenue, visits, and active state.',
      },
      {
        key: 'generated rows',
        label:
          'market_total, market_average, and forecast rows are generated at runtime, not stored as source records.',
      },
      {
        key: 'generated metrics',
        label:
          'Tracked share, ranks, indexed metrics, growth, revenue per visit, and monetization gap are recalculated by the canonical pipeline.',
      },
    ],
    safetyEyebrow: 'Public-safe build discipline',
    safetyH2: 'Synthetic data is part of the product design',
    safetyP:
      'The repo is designed to be inspected publicly. It uses synthetic company names, synthetic values, no private client data, no credentials, no required backend, no paid API dependency, validation scripts, public audit checks, security notes, deployment documentation, and a deterministic demo-data generator.',
    validationChecks: [
      'pnpm generate:data',
      'pnpm test',
      'pnpm build',
      'pnpm validate:data',
      'pnpm audit:public',
      'pnpm typecheck',
      'pnpm lint',
    ],
    safetyBullets: [
      'No actual company performance data, competitor datasets, private client records, credentials, or private API URLs.',
      'The public demo uses the local statistical engine by default; no Python service, model weights, backend, or paid API are required.',
      'TimesFM remains optional infrastructure only and is not how the public demo is positioned.',
    ],
    resultEyebrow: 'Result',
    resultH2: 'A public-safe benchmark engine, not just a dashboard template',
    resultP:
      'The outcome is a repeatable benchmark intelligence engine that starts with raw synthetic observations and produces the analytical layer needed for executive market-share, ranking, monetization, aggregation, and scenario-planning views.',
    buildH3: 'Build',
    buildBullets: [
      'Clean source_monthly contract with 5 years of synthetic monthly data: 8 companies × 60 months = 480 rows.',
      'Canonical benchmark pipeline generates market_total, market_average, tracked benchmark-set share, ranks, growth, indexed metrics, revenue per visit, and monetization gap.',
      'Local scenario forecast engine projects revenue and visits, then recalculates shares, ranks, efficiency metrics, and benchmark rows for each scenario.',
    ],
    outcomeH3: 'Outcome',
    outcomeBullets: [
      'Executive dashboard, Players/company profiles, Battle Arena, Forecast view, #/company/:id routes, and legacy #/empresa/:id route support are working.',
      'Public-ready repo with generate:data, validation, public audit, deployment documentation, security notes, and release checklist discipline.',
      'Portfolio-safe demo that shows the product without exposing actual companies, private client records, or private infrastructure.',
    ],
    calloutLabel: 'Takeaway',
    calloutText:
      'The product is not only the chart layer. The product is the repeatable intelligence pipeline behind the chart layer.',
  },
  es: {
    back: '← Casos de estudio',
    heroEyebrow: 'Producto de datos / Motor benchmark desde datos raw',
    heroTitle: 'Benchmark Intelligence Engine',
    heroSubtitle:
      'Un dashboard benchmark raw para cuota, ranking, monetización, agregación y escenarios locales de forecast.',
    heroDescription:
      'Un dashboard público de inteligencia benchmark que convierte cinco años de observaciones mensuales sintéticas de revenue y tráfico en análisis de cuota del set benchmark, rankings, diagnóstico de monetización, agregación por periodo y forecasts locales de escenario. El sistema empieza con 480 filas mensuales raw y genera en código la capa de inteligencia: filas benchmark, cuotas, rankings, métricas de eficiencia, crecimiento y escenarios de forecast.',
    heroMockNotice:
      'Solo en modo demo: compañías sintéticas, valores sintéticos y etiquetas públicas; sin datos reales de compañías, clientes, logos ni fuentes privadas.',
    heroCTA: 'Ver la demo pública →',
    heroCTASecondary: 'Ver el repositorio →',
    heroFigcaption:
      'Resumen ejecutivo generado desde cinco años de datos mensuales raw sintéticos. Solo datos sintéticos.',
    heroFigAriaLabel:
      'Resumen ejecutivo del panel con datos sintéticos de benchmark',
    heroImgAlt:
      'Dashboard ejecutivo benchmark generado desde cinco años de datos mensuales raw sintéticos',
    tags: [
      'React/Vite',
      'source_monthly',
      '480 filas raw',
      'Forecast local',
      'Datos sintéticos publicables',
    ],
    nav: [
      ['Cambio', '#overview'],
      ['Arquitectura', '#flow'],
      ['Pantallas', '#screens'],
      ['Datos', '#conexion'],
      ['Seguridad', '#safety'],
      ['Resultado', '#resultado'],
    ] as const,
    overviewEyebrow: 'Qué cambió',
    overviewH2: 'De JSON preparado a inteligencia benchmark generada',
    overviewP:
      'Reconstruí el proyecto en varios sprints: de JSON preparado para dashboard a observaciones raw en source_monthly, de filas benchmark estáticas a market_total y market_average generadas, de métricas precalculadas a cálculos runtime, y de rutas frágiles a Battle Arena y Players/perfiles funcionando.',
    proofPoints: [
      { value: '480', label: 'filas mensuales raw' },
      { value: '8 × 60', label: 'compañías sintéticas × meses' },
      { value: '12', label: 'eventos sintéticos' },
    ],
    featureCards: [
      {
        title: 'Contrato raw',
        description:
          'El JSON público guarda solo observaciones mensuales raw. Los payloads legacy con data.interface siguen soportados por compatibilidad, pero ya no son la fuente preferente.',
      },
      {
        title: 'Filas benchmark generadas',
        description:
          'market_total y market_average se generan en runtime desde las filas observadas de compañías y se excluyen de denominadores de cuota y rankings cuando corresponde.',
      },
      {
        title: 'Métricas generadas',
        description:
          'Cuota, rankings, crecimiento, métricas indexadas, revenue per visit, monetization gap, agregación anual y rangos se calculan en código.',
      },
      {
        title: 'Vistas de producto',
        description:
          'Dashboard ejecutivo, Players/perfiles, rutas #/company/:id, rutas legacy #/empresa/:id, Battle Arena y Forecast funcionan desde filas canónicas generadas.',
      },
    ],
    flowEyebrow: 'Arquitectura',
    flowH2: 'El pipeline repetible detrás de la capa visual',
    flowP:
      'La arquitectura final separa datos fuente e inteligencia benchmark. Revenue y visitas mensuales entran por data.source_monthly; el pipeline canónico valida filas, normaliza entidades, calcula métricas benchmark, genera filas sintéticas, crea forecasts, recalcula métricas derivadas y devuelve filas listas para el dashboard.',
    flowDiagram: [
      'Datos source_monthly raw',
      'Validación',
      'Pipeline benchmark canónico',
      'Métricas derivadas',
      'Filas benchmark sintéticas',
      'Forecast local',
      'Dashboard React/Vite',
    ],
    systemSteps: [
      {
        num: '01',
        title: 'Observaciones raw',
        description:
          'Cinco años de revenue y visitas mensuales sintéticas: de 2021-01-01 a 2025-12-01.',
      },
      {
        num: '02',
        title: 'Validación',
        description:
          'Acepta filas source_monthly y rechaza métricas benchmark derivadas en la capa raw.',
      },
      {
        num: '03',
        title: 'Pipeline canónico',
        description:
          'Construye filas listas para dashboard desde observaciones raw y mantiene el JSON público pequeño, legible y seguro.',
      },
      {
        num: '04',
        title: 'Inteligencia derivada',
        description:
          'Calcula cuota del set benchmark, rankings, valores indexados, crecimiento, revenue per visit y monetization gap.',
      },
      {
        num: '05',
        title: 'Forecasts de escenario',
        description:
          'El default local_engine proyecta revenue y visitas y vuelve a pasar las filas forecast por el pipeline benchmark.',
      },
      {
        num: '06',
        title: 'Interfaz del panel',
        description:
          'Renderiza overview de mercado, Players, Battle Arena, perfiles, escenarios de forecast y contexto de salud de datos.',
      },
    ],
    screensEyebrow: 'Prueba visual',
    screensH2: 'Vistas de producto desde métricas benchmark generadas',
    screensP:
      'La interfaz publicada muestra la superficie de producto alrededor del pipeline: overview ejecutivo, rankings, movimiento de cuota, Players/perfiles, Battle Arena y escenarios de forecast generados desde el histórico de cinco años.',
    gallery: [
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/view_selector.webp',
        alt: 'Navegación del panel benchmark con pestañas Panel principal, Entidades, Comparativa y Previsión',
        label: 'Selector de vistas',
        caption:
          'La interfaz se organiza en modos ejecutivos funcionales: overview de mercado, Players, Battle Arena y espacio de forecast.',
        layout: 'wide',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/time_selector.webp',
        alt: 'Selector temporal del panel benchmark con modo año y disponibilidad de métricas',
        label: 'Tiempo y disponibilidad',
        caption:
          'La agregación anual y por rango se calcula sumando revenue y visitas, y después recalculando las métricas benchmark del periodo.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/competitive_ranking.webp',
        alt: 'Ranking competitivo sintético con tabla de facturación y gráfico de distribución',
        label: 'Ranking competitivo',
        caption:
          'Ranking con cuotas y posiciones generadas para el set benchmark, útil para comparación ejecutiva sin datos reales de compañías.',
        layout: 'large',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/momentum.webp',
        alt: 'Gráfico sintético de momentum de crecimiento indexado entre entidades benchmark',
        label: 'Momentum de crecimiento',
        caption:
          'El crecimiento indexado y los cambios YoY/MoM se generan desde observaciones mensuales raw, no como valores finales guardados en el dashboard.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/player_view.webp',
        alt: 'Perfil sintético de entidad con resumen ejecutivo y tarjetas KPI',
        label: 'Perfil de entidad',
        caption:
          'Perfil de compañía con métricas históricas y forecast generadas, disponible vía #/company/:id y rutas legacy #/empresa/:id.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/player_graph.webp',
        alt: 'Gráfica sintética de entidad con selección de series benchmark e histórico de facturación',
        label: 'Gráfico de entidad',
        caption:
          'El gráfico enfocado compara una entidad con market_average generado o con pares seleccionados en métricas benchmark históricas.',
        layout: 'large',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/battle_arena.webp',
        alt: 'Comparativa sintética entre dos entidades por visitas, facturación, cuota y eficiencia',
        label: 'Comparativa directa',
        caption:
          'Battle Arena compara dos players sintéticos con métricas generadas de escala, cuota, crecimiento y eficiencia.',
        layout: 'tall',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/forecast_market.webp',
        alt: 'Proyección sintética de mercado con visitas y facturación proyectadas por entidad',
        label: 'Previsión de mercado',
        caption:
          'Vista de forecast con proyecciones locales de escenario que empiezan después de 2025-12-01 y recalculan filas benchmark por escenario.',
        layout: 'large',
      },
      {
        src: '/images/case-studies/benchmark-dashboard/gallery/forecast_player.webp',
        alt: 'Histórico observado y previsión sintética de una entidad benchmark',
        label: 'Previsión por entidad',
        caption:
          'base_case, conservative y aggressive incluyen diagnósticos de confianza y se presentan como proyecciones de escenario.',
        layout: 'wide',
      },
    ],
    dataEyebrow: 'Contrato de datos',
    dataH2: 'source_monthly es el contrato fuente',
    dataP:
      'El JSON guarda solo observaciones mensuales raw. La app genera las filas de interface internamente: forecast rows, market_total, market_average, cuota, rankings, métricas indexadas, crecimiento, revenue per visit y monetization gap se generan en código.',
    fieldDefs: [
      {
        key: 'source_monthly',
        label:
          'Observaciones mensuales raw con date, company_id, display_name, market, type, revenue, visits y estado active.',
      },
      {
        key: 'generated rows',
        label:
          'market_total, market_average y forecast rows se generan en runtime; no se guardan como registros fuente.',
      },
      {
        key: 'generated metrics',
        label:
          'Cuota, rankings, métricas indexadas, crecimiento, revenue per visit y monetization gap se recalculan en el pipeline canónico.',
      },
    ],
    safetyEyebrow: 'Disciplina de publicación',
    safetyH2: 'Los datos sintéticos son parte del diseño del producto',
    safetyP:
      'El repo está diseñado para inspección pública. Usa nombres y valores sintéticos, cero datos privados de clientes, cero credenciales, ningún backend obligatorio, ninguna dependencia de API de pago, scripts de validación, auditoría pública, notas de seguridad, documentación de despliegue y un generador determinista de datos demo.',
    validationChecks: [
      'pnpm generate:data',
      'pnpm test',
      'pnpm build',
      'pnpm validate:data',
      'pnpm audit:public',
      'pnpm typecheck',
      'pnpm lint',
    ],
    safetyBullets: [
      'Sin datos reales de compañías, competidores reales, datos privados de clientes, credenciales ni URLs privadas.',
      'La demo pública usa por defecto un motor estadístico local; no requiere Python, pesos de modelo, backend ni API de pago.',
      'TimesFM queda como infraestructura opcional y no es el posicionamiento de la demo pública.',
    ],
    resultEyebrow: 'Resultado',
    resultH2:
      'Un motor benchmark publicable, no solo una plantilla de dashboard',
    resultP:
      'El resultado es un motor repetible de inteligencia benchmark que empieza con observaciones sintéticas raw y produce la capa analítica necesaria para vistas ejecutivas de cuota, ranking, monetización, agregación y escenarios.',
    buildH3: 'Construcción',
    buildBullets: [
      'Contrato source_monthly limpio con 5 años de datos mensuales sintéticos: 8 compañías × 60 meses = 480 filas.',
      'Pipeline benchmark canónico que genera market_total, market_average, cuota del set benchmark, rankings, crecimiento, métricas indexadas, revenue per visit y monetization gap.',
      'Motor local de forecast de escenarios que proyecta revenue y visitas, y recalcula cuotas, rankings, eficiencia y filas benchmark para cada escenario.',
    ],
    outcomeH3: 'Resultado',
    outcomeBullets: [
      'Dashboard ejecutivo, Players/perfiles, Battle Arena, Forecast, rutas #/company/:id y soporte legacy #/empresa/:id funcionando.',
      'Repo public-ready con generate:data, validación, auditoría pública, documentación de despliegue, notas de seguridad y checklist de release.',
      'Demo segura para portafolio que muestra el producto sin exponer compañías reales, datos reales de clientes ni infraestructura privada.',
    ],
    calloutLabel: 'Conclusión',
    calloutText:
      'El producto no es solo la capa de gráficos. El producto es el pipeline repetible de inteligencia detrás de esa capa.',
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
      <main
        id="main-content"
        className="case-study-page-new case-study-page-new--benchmark"
      >
        {/* ── HERO ── */}
        <section className="benchmark-hero" aria-labelledby="benchmark-title">
          <div className="benchmark-hero__content">
            <Link
              href={localizePath('/case-studies', locale)}
              className="data-brief-back"
            >
              {t.back}
            </Link>
            <p className="data-brief-eyebrow">{t.heroEyebrow}</p>
            <h1 id="benchmark-title" className="benchmark-hero__title">
              {t.heroTitle}
            </h1>
            <p className="benchmark-hero__subtitle">{t.heroSubtitle}</p>
            <p className="benchmark-hero__description">{t.heroDescription}</p>
            <p className="benchmark-hero__mock-notice">{t.heroMockNotice}</p>
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
                {t.heroCTA}
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button"
              >
                {t.heroCTASecondary}
              </a>
            </div>
            <div
              className="data-brief-tags"
              aria-label={
                locale === 'es' ? 'Etiquetas del proyecto' : 'Project tags'
              }
            >
              {t.tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <figure
            className="benchmark-hero__visual"
            aria-label={t.heroFigAriaLabel}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/benchmark-dashboard/gallery/executive_home.webp"
              alt={t.heroImgAlt}
              className="benchmark-hero__screenshot"
            />
            <figcaption>{t.heroFigcaption}</figcaption>
          </figure>
        </section>

        <CaseStudyMiniNav
          items={t.nav}
          ariaLabel={locale === 'es' ? 'Secciones de la página' : 'Page sections'}
        />

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
            <div
              className="benchmark-proof-strip"
              aria-label={
                locale === 'es'
                  ? 'Métricas clave del proyecto'
                  : 'Key project stats'
              }
            >
              {t.proofPoints.map(point => (
                <div key={point.label}>
                  <strong>{point.value}</strong>
                  <span>{point.label}</span>
                </div>
              ))}
            </div>
            <div className="data-brief-card-grid benchmark-feature-grid">
              {t.featureCards.map(card => (
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
            <div
              className="benchmark-diagram"
              aria-label={locale === 'es' ? 'Flujo del sistema' : 'System flow'}
            >
              {t.flowDiagram.map((step, i) => (
                <Fragment key={step}>
                  <span key={step}>{step}</span>
                  {i < t.flowDiagram.length - 1 && (
                    <span
                      key={`arrow-${i}`}
                      className="benchmark-diagram__arrow"
                    >
                      →
                    </span>
                  )}
                </Fragment>
              ))}
            </div>
            <div className="data-brief-card-grid benchmark-system-grid">
              {t.systemSteps.map(step => (
                <article
                  key={step.num}
                  className="data-brief-card benchmark-system-card"
                >
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
              {t.gallery.map(screen => (
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
              <div
                className="benchmark-code-block"
                aria-label={
                  locale === 'es' ? 'Contrato de datos' : 'Data contract'
                }
              >
                <div className="benchmark-code-block__bar">
                  <span>data-contract.json</span>
                </div>
                <pre>{dataContract}</pre>
              </div>
              <dl className="benchmark-field-defs">
                {t.fieldDefs.map(field => (
                  <div key={field.key}>
                    <dt>
                      <code>{field.key}</code>
                    </dt>
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
              <div
                className="benchmark-validation-panel"
                aria-label={
                  locale === 'es'
                    ? 'Comandos de validación para publicación'
                    : 'Public release validation commands'
                }
              >
                {t.validationChecks.map(check => (
                  <code key={check}>{check}</code>
                ))}
              </div>
              <ul className="data-brief-list benchmark-safety-list">
                {t.safetyBullets.map(bullet => (
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
                  {t.buildBullets.map(bullet => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>{t.outcomeH3}</h3>
                <ul className="data-brief-list">
                  {t.outcomeBullets.map(bullet => (
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
                {t.heroCTA}
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button"
              >
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
