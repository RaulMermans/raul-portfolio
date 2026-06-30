'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import { CaseStudySnapshot } from '@/components/case-studies/CommercialCaseStudySections'
import { useCaseStudySetup } from '@/hooks'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'

const demoUrl = 'https://demand-os-three.vercel.app'
const githubUrl = 'https://github.com/RaulMermans/demand-OS'
const architectureUrl =
  'https://github.com/RaulMermans/demand-OS/blob/main/docs/architecture.md'
const imageBase = '/images/case-studies/demandos'

const tags = [
  'Machine Learning',
  'Forecasting',
  'Operations Intelligence',
  'Inventory Risk',
  'FastAPI',
  'Next.js',
  'scikit-learn',
  'Neon Postgres',
  'Vercel',
  'Synthetic Data',
  'Monitoring',
  'Scenario Planning',
]

const projectMetadata = {
  en: [
    ['Type', 'Machine learning / data product prototype'],
    [
      'Role',
      'Product architecture, backend, frontend, ML workflow, deployment, and evaluation',
    ],
    [
      'Stack',
      'Python, FastAPI, pandas, scikit-learn, SQLAlchemy, Alembic, Next.js, TypeScript, Neon Postgres, Vercel',
    ],
    ['Status', 'Public portfolio prototype'],
    ['Data', 'Synthetic operational commerce data'],
    [
      'Safety',
      'No purchases, supplier communication, live connectors, or external side effects',
    ],
    ['Year', '2026'],
  ],
  es: [
    ['Tipo', 'Machine learning / data product prototype'],
    [
      'Rol',
      'Arquitectura de producto, backend, frontend, workflow ML, despliegue y evaluación',
    ],
    [
      'Stack',
      'Python, FastAPI, pandas, scikit-learn, SQLAlchemy, Alembic, Next.js, TypeScript, Neon Postgres, Vercel',
    ],
    ['Estado', 'Prototipo público de portfolio'],
    ['Datos', 'Datos operativos sintéticos de comercio'],
    [
      'Seguridad',
      'Sin compras, comunicación con proveedores, conectores live ni efectos externos',
    ],
    ['Año', '2026'],
  ],
} as const

const capabilityLists = {
  en: {
    does: [
      'Generates synthetic operational data.',
      'Cleans, validates, and aggregates records.',
      'Builds leakage-safe features.',
      'Trains and evaluates forecasting models.',
      'Calculates stockout risk.',
      'Proposes internal reorder recommendations.',
      'Supports scenario simulation.',
      'Exposes monitoring and health checks.',
      'Prepares disabled Shopify/WooCommerce connector stubs.',
    ],
    doesNot: [
      'Does not use real customer data.',
      'Does not create real purchase orders.',
      'Does not contact suppliers.',
      'Does not run live connectors.',
      'Does not automate purchasing.',
      'Does not claim production-calibrated accuracy.',
      'Does not seed forecasts, risks, or recommendations as final KPIs.',
    ],
  },
  es: {
    does: [
      'Genera datos sintéticos operativos.',
      'Limpia, valida y agrega datos.',
      'Construye features leakage-safe.',
      'Entrena y evalúa modelos de forecasting.',
      'Calcula riesgo de stockout.',
      'Propone recomendaciones internas de reposición.',
      'Permite escenarios simulados.',
      'Expone monitoring y health checks.',
      'Prepara conectores Shopify/WooCommerce como stubs desactivados.',
    ],
    doesNot: [
      'No usa datos reales de clientes.',
      'No crea órdenes de compra reales.',
      'No contacta proveedores.',
      'No ejecuta conectores live.',
      'No automatiza compras.',
      'No promete precisión productiva.',
      'No siembra forecasts, riesgos o recomendaciones como KPIs finales.',
    ],
  },
} as const

const architectureFlow = [
  'Raw commerce data',
  'Cleaning / validation',
  'Canonical daily tables',
  'Leakage-safe features',
  'Forecasting models',
  'Model metrics',
  'Stockout risk',
  'Reorder guidance',
  'Dashboard',
]

const rawEntities = {
  en: [
    'Suppliers',
    'Products',
    'Stores',
    'Orders',
    'Inventory snapshots',
    'Promotions',
    'Purchase orders',
  ],
  es: [
    'Proveedores',
    'Productos',
    'Tiendas',
    'Pedidos',
    'Snapshots de inventario',
    'Promociones',
    'Órdenes de compra',
  ],
} as const

const pipelineCounts = {
  en: [
    ['10', 'products'],
    ['2', 'stores'],
    ['1,677', 'orders'],
    ['1,156', 'inventory snapshots'],
    ['1,154', 'feature rows'],
    ['946', 'baseline forecasts'],
    ['560', 'planning forecasts'],
    ['20', 'risk rows'],
    ['10', 'recommendations'],
  ],
  es: [
    ['10', 'productos'],
    ['2', 'tiendas'],
    ['1.677', 'pedidos'],
    ['1.156', 'snapshots de inventario'],
    ['1.154', 'filas de features'],
    ['946', 'forecasts baseline'],
    ['560', 'forecasts de planificación'],
    ['20', 'filas de riesgo'],
    ['10', 'recomendaciones'],
  ],
} as const

const metrics = {
  en: [
    ['WAPE', 'Weighted total error as a percentage of aggregated actual demand.'],
    ['MAE', 'Mean absolute error between observed demand and forecast.'],
    ['RMSE', 'Metric that penalizes large misses more strongly.'],
    ['Bias', 'Shows whether the model tends to over- or under-forecast demand.'],
  ],
  es: [
    [
      'WAPE',
      'Error total ponderado como porcentaje de la demanda real agregada.',
    ],
    ['MAE', 'Error absoluto medio entre demanda observada y forecast.'],
    ['RMSE', 'Métrica que penaliza con más fuerza los fallos grandes.'],
    [
      'Bias',
      'Indica si el modelo tiende a sobreestimar o infraestimar demanda.',
    ],
  ],
} as const

const endpoints = [
  '/api/data-science/summary',
  '/api/data-science/forecast-diagnostics',
  '/api/data-science/model-comparison',
  '/api/data-science/feature-signals',
  '/api/data-science/business-impact',
]

const featureSignals = {
  en: [
    ['Recent demand', 'Lags and rolling windows before the target day.'],
    ['Seasonality', 'Calendar, weekday, and temporal patterns.'],
    ['Price and margin', 'Price, cost, margin, and recent changes.'],
    ['Promotions', 'Promotional exposure and observed lift in the data.'],
    ['Coverage', 'Available inventory, stockout flag, and days of supply.'],
    ['Lifecycle', 'Product age and maturity stage.'],
    ['Channel', 'Store, category, and sales-channel signals.'],
  ],
  es: [
    ['Demanda reciente', 'Lags y ventanas móviles anteriores al día objetivo.'],
    ['Estacionalidad', 'Calendario, día de semana y patrones temporales.'],
    ['Precio y margen', 'Precio, coste, margen y cambios recientes.'],
    ['Promociones', 'Exposición promocional y lift observado en los datos.'],
    ['Cobertura', 'Inventario disponible, stockout flag y días de suministro.'],
    ['Ciclo de vida', 'Edad del producto y etapa de madurez.'],
    ['Canal', 'Señales de tienda, categoría y canal de venta.'],
  ],
} as const

const scenarioInputs = {
  en: [
    'Demand multiplier',
    'Lead-time multiplier',
    'Supplier reliability',
    'Promotion lift',
    'Inventory adjustments',
    'Planning horizon',
  ],
  es: [
    'Multiplicador de demanda',
    'Multiplicador de lead time',
    'Fiabilidad del proveedor',
    'Lift promocional',
    'Ajustes de inventario',
    'Horizonte de planificación',
  ],
} as const

const screenshots = {
  en: [
    {
      src: `${imageBase}/02-home-dashboard.png`,
      title: 'Cockpit',
      caption:
        'Shows the operator what needs attention first: monitored SKUs, forecast quality, stockout exposure, and open reorder decisions.',
      wide: true,
    },
    {
      src: `${imageBase}/03-pipeline-completed.png`,
      title: 'Pipeline Trace',
      caption:
        'Shows whether the deterministic data pipeline completed cleanly before downstream forecasts and risks are trusted.',
    },
    {
      src: `${imageBase}/04-forecasts.png`,
      title: 'Forecasts',
      caption:
        'Shows expected demand before stockout risk and reorder logic are calculated.',
    },
    {
      src: `${imageBase}/05-inventory-risk.png`,
      title: 'Risk Board',
      caption:
        'Ranks product/store combinations by urgency, lost-sales exposure, and days until stockout.',
    },
    {
      src: `${imageBase}/06-recommendations.png`,
      title: 'Reorder Queue',
      caption:
        'Turns forecast and risk into internal reorder guidance without creating purchase orders.',
    },
    {
      src: `${imageBase}/07-model-performance.png`,
      title: 'Forecast Trust',
      caption:
        'Shows whether the model is useful enough to trust as a planning signal.',
    },
    {
      src: `${imageBase}/08-data-health.png`,
      title: 'Data Quality',
      caption:
        'Shows whether the uploaded or bundled records are complete enough for reliable planning.',
    },
    {
      src: `${imageBase}/09-product-drilldown.png`,
      title: 'Product Drilldown',
      caption:
        'Connects SKU-level demand, inventory, and risk signals to a single operational view.',
    },
    {
      src: `${imageBase}/13-csv-upload.png`,
      title: 'CSV Upload',
      caption:
        'Lets a reviewer bring in local CSV data while validating schema and rejected rows.',
    },
    {
      src: `${imageBase}/14-monitoring.png`,
      title: 'Monitoring',
      caption:
        'Shows whether pipeline jobs, data freshness, and validation checks are healthy.',
    },
    {
      src: `${imageBase}/15-scenarios.png`,
      title: 'Scenarios',
      caption:
        'Tests demand, lead-time, and supplier assumptions without mutating canonical data.',
    },
    {
      src: `${imageBase}/16-connectors.png`,
      title: 'Data Sources',
      caption:
        'Shows connector readiness while keeping live external calls disabled.',
      wide: true,
    },
  ],
  es: [
    {
      src: `${imageBase}/02-home-dashboard.png`,
      title: 'Cockpit',
      caption:
        'Muestra qué requiere atención primero: SKUs monitorizados, calidad del forecast, exposición a stockout y decisiones abiertas de reposición.',
      wide: true,
    },
    {
      src: `${imageBase}/03-pipeline-completed.png`,
      title: 'Trazabilidad del pipeline',
      caption:
        'Muestra si el pipeline determinista terminó correctamente antes de confiar en forecasts y riesgos posteriores.',
    },
    {
      src: `${imageBase}/04-forecasts.png`,
      title: 'Forecasts',
      caption:
        'Muestra la demanda esperada antes de calcular riesgo de stockout y lógica de reposición.',
    },
    {
      src: `${imageBase}/05-inventory-risk.png`,
      title: 'Panel de riesgo',
      caption:
        'Ordena combinaciones producto/tienda por urgencia, exposición a ventas perdidas y días hasta stockout.',
    },
    {
      src: `${imageBase}/06-recommendations.png`,
      title: 'Cola de reposición',
      caption:
        'Convierte forecast y riesgo en orientación interna de reposición sin crear órdenes de compra.',
    },
    {
      src: `${imageBase}/07-model-performance.png`,
      title: 'Confianza del forecast',
      caption:
        'Muestra si el modelo es suficientemente útil como señal de planificación.',
    },
    {
      src: `${imageBase}/08-data-health.png`,
      title: 'Calidad de datos',
      caption:
        'Muestra si los registros cargados o incluidos son completos para planificar con fiabilidad.',
    },
    {
      src: `${imageBase}/09-product-drilldown.png`,
      title: 'Detalle de producto',
      caption:
        'Conecta demanda, inventario y riesgo a nivel SKU en una vista operativa.',
    },
    {
      src: `${imageBase}/13-csv-upload.png`,
      title: 'CSV Upload',
      caption:
        'Permite cargar CSV locales mientras valida esquema y filas rechazadas.',
    },
    {
      src: `${imageBase}/14-monitoring.png`,
      title: 'Monitoring',
      caption:
        'Muestra si jobs del pipeline, frescura de datos y checks de validación están sanos.',
    },
    {
      src: `${imageBase}/15-scenarios.png`,
      title: 'Scenarios',
      caption:
        'Prueba supuestos de demanda, lead time y proveedor sin mutar datos canónicos.',
    },
    {
      src: `${imageBase}/16-connectors.png`,
      title: 'Fuentes de datos',
      caption:
        'Muestra preparación de conectores manteniendo desactivadas las llamadas externas live.',
      wide: true,
    },
  ],
} as const

const limitations = {
  en: [
    'It only uses synthetic data.',
    'It is not trained on real customer data.',
    'It is not a production replenishment system.',
    'There is no live ecommerce integration.',
    'It does not perform autonomous purchases.',
    'It does not include a background scheduler.',
    'The Vercel serverless runtime limits scale and duration.',
    'Neon is used within prototype/free-tier limits.',
    'Forecast quality is calibrated for demo use, not production.',
  ],
  es: [
    'Solo utiliza datos sintéticos.',
    'No está entrenado con datos reales de clientes.',
    'No es un sistema productivo de reposición.',
    'No existe integración ecommerce live.',
    'No realiza compras autónomas.',
    'No incluye scheduler en background.',
    'El runtime serverless de Vercel limita escala y duración.',
    'Neon se usa dentro de límites de prototipo/free tier.',
    'La calidad del forecast está calibrada para demo, no para producción.',
  ],
} as const

const rawDerivedRows = {
  en: [
    ['Orders', 'Demand forecast'],
    ['Inventory snapshots', 'Days until stockout'],
    ['Purchase orders', 'Inbound coverage'],
    ['Supplier lead times', 'Reorder timing'],
    ['Products and stores', 'Product/store risk ranking'],
    ['Promotions', 'Demand feature context'],
    ['Sales history', 'Forecast baseline comparison'],
  ],
  es: [
    ['Pedidos', 'Forecast de demanda'],
    ['Snapshots de inventario', 'Días hasta stockout'],
    ['Órdenes de compra', 'Cobertura entrante'],
    ['Lead times de proveedor', 'Timing de reposición'],
    ['Productos y tiendas', 'Ranking de riesgo producto/tienda'],
    ['Promociones', 'Contexto de features de demanda'],
    ['Histórico de ventas', 'Comparación con baseline de forecast'],
  ],
} as const

const safetyRows = {
  en: [
    ['Internal reorder recommendations', 'Real purchase orders'],
    ['Synthetic CSV uploads', 'Real customer production data'],
    ['Scenario simulation', 'Supplier emails'],
    ['Connector dry runs', 'Live Shopify/WooCommerce calls'],
    ['Forecast and risk diagnostics', 'Autonomous purchasing'],
    ['Public portfolio demo', 'External side effects'],
  ],
  es: [
    ['Recomendaciones internas de reposición', 'Órdenes de compra reales'],
    ['Subidas CSV sintéticas', 'Datos reales de clientes en producción'],
    ['Simulación de escenarios', 'Emails a proveedores'],
    ['Dry runs de conectores', 'Llamadas live a Shopify/WooCommerce'],
    ['Diagnóstico de forecast y riesgo', 'Compras autónomas'],
    ['Demo pública de portfolio', 'Efectos externos'],
  ],
} as const

type DemandOsScreenshot = {
  readonly src: string
  readonly title: string
  readonly caption: string
  readonly wide?: boolean
}

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="data-brief-refresh-heading ui-section-heading">
      <p className="data-brief-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children}
    </div>
  )
}

function ScreenshotFigure({
  shot,
  altPrefix,
}: {
  shot: DemandOsScreenshot
  altPrefix: string
}) {
  return (
    <figure
      className={`demandos-shot ${'wide' in shot && shot.wide ? 'demandos-shot--wide' : ''}`}
    >
      <div className="demandos-shot__frame">
        <Image
          src={shot.src}
          alt={`${altPrefix} ${shot.title}`}
          width={1440}
          height={900}
          sizes="(max-width: 760px) 100vw, (max-width: 1180px) 90vw, 50vw"
        />
      </div>
      <figcaption>
        <strong>{shot.title}</strong>
        <span>{shot.caption}</span>
      </figcaption>
    </figure>
  )
}

export default function DemandOsPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const isEnglish = locale === 'en'
  const metadata = projectMetadata[locale]
  const capabilities = capabilityLists[locale]
  const currentRawEntities = rawEntities[locale]
  const currentPipelineCounts = pipelineCounts[locale]
  const currentMetrics = metrics[locale]
  const currentFeatureSignals = featureSignals[locale]
  const currentScenarioInputs = scenarioInputs[locale]
  const currentScreenshots = screenshots[locale]
  const currentLimitations = limitations[locale]
  const currentRawDerivedRows = rawDerivedRows[locale]
  const currentSafetyRows = safetyRows[locale]
  const copy = {
    back: isEnglish ? 'Back to case studies' : 'Volver a casos',
    subtitle: isEnglish
      ? 'Inventory decisions from raw commerce data.'
      : 'Decisiones de inventario desde datos raw de comercio.',
    description: isEnglish
      ? 'DemandOS converts raw synthetic commerce records — suppliers, products, stores, orders, inventory snapshots, promotions, and purchase orders — into forecasts, risk signals, reorder guidance, diagnostics, and monitoring surfaces. Raw records in. Inventory decisions out. No fake dashboard metrics in between.'
      : 'DemandOS convierte registros sintéticos de comercio —proveedores, productos, tiendas, pedidos, snapshots de inventario, promociones y órdenes de compra— en forecasts, señales de riesgo, orientación de reposición, diagnósticos y superficies de monitoring. Registros raw dentro. Decisiones de inventario fuera. Sin métricas falsas de dashboard entre medias.',
    heroAlt: isEnglish
      ? 'DemandOS cockpit showing pipeline readiness, inventory risk, and reorder recommendations'
      : 'Cockpit operativo de DemandOS con readiness del pipeline, riesgo de inventario y recomendaciones',
    heroCaption: isEnglish
      ? 'Public demo with synthetic operational data and external side effects disabled.'
      : 'Demo pública con datos operativos sintéticos y efectos externos desactivados.',
    projectLinks: isEnglish ? 'Project links' : 'Enlaces del proyecto',
    demo: isEnglish ? 'View demo' : 'Ver demo',
    github: isEnglish ? 'View GitHub' : 'Ver GitHub',
    architecture: isEnglish ? 'Read architecture' : 'Leer arquitectura',
    proof: isEnglish ? 'Project proof' : 'Pruebas del proyecto',
    proofTags: isEnglish
      ? [
          'Raw synthetic records',
          'Forecasting ML',
          'Neon + Vercel',
          'No external actions',
        ]
      : [
          'Registros sintéticos raw',
          'Forecasting ML',
          'Neon + Vercel',
          'Sin acciones externas',
        ],
    navAria: isEnglish ? 'DemandOS sections' : 'Secciones de DemandOS',
    nav: isEnglish
      ? [
          ['Thesis', '#thesis'],
          ['Snapshot', '#project-snapshot'],
          ['Metadata', '#metadata'],
          ['Problem', '#problem'],
          ['Architecture', '#architecture'],
          ['Pipeline', '#pipeline'],
          ['Forecasting', '#forecasting'],
          ['Risk', '#risk'],
          ['Screens', '#walkthrough'],
          ['Reliability', '#reliability'],
          ['Limits', '#limitations'],
        ]
      : [
          ['Tesis', '#thesis'],
          ['Resumen', '#project-snapshot'],
          ['Metadatos', '#metadata'],
          ['Problema', '#problem'],
          ['Arquitectura', '#architecture'],
          ['Pipeline', '#pipeline'],
          ['Forecasting', '#forecasting'],
          ['Riesgo', '#risk'],
          ['Pantallas', '#walkthrough'],
          ['Fiabilidad', '#reliability'],
          ['Límites', '#limitations'],
        ],
    screenshotAlt: isEnglish ? 'DemandOS screen:' : 'Pantalla de DemandOS:',
  }

  useCaseStudySetup()

  return (
    <>
      <Header locale={locale} />
      <main
        id="main-content"
        className="case-study-page-new case-study-page-new--data-brief case-study-page-new--demandos"
      >
        <section
          className="data-brief-hero demandos-hero"
          aria-labelledby="demandos-title"
        >
          <div className="data-brief-hero__content">
            <Link
              href={localizePath('/case-studies', locale)}
              className="data-brief-back"
            >
              ← {copy.back}
            </Link>
            <p className="data-brief-eyebrow">
              Machine Learning / Inventory Intelligence
            </p>
            <h1 id="demandos-title" className="data-brief-hero__title">
              DemandOS
            </h1>
            <p className="data-brief-hero__subtitle">{copy.subtitle}</p>
            <p className="data-brief-hero__description">{copy.description}</p>
            <div className="data-brief-actions" aria-label={copy.projectLinks}>
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button data-brief-button--primary"
              >
                {copy.demo}
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button"
              >
                {copy.github}
              </a>
              <a
                href={architectureUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button"
              >
                {copy.architecture}
              </a>
            </div>
            <div className="demandos-proof" aria-label={copy.proof}>
              {copy.proofTags.map(item => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div
              className="data-brief-tags"
              aria-label={isEnglish ? 'Technologies' : 'Tecnologías'}
            >
              {tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <figure className="data-brief-hero__visual demandos-hero__visual">
            <div className="demandos-shot__frame">
              <Image
                src={`${imageBase}/02-home-dashboard.png`}
                alt={copy.heroAlt}
                width={1440}
                height={900}
                priority
                sizes="(max-width: 1180px) 100vw, 52vw"
              />
            </div>
            <figcaption>{copy.heroCaption}</figcaption>
          </figure>
        </section>

        <nav className="data-brief-mini-nav" aria-label={copy.navAria}>
          <ul>
            {copy.nav.map(([label, href], index) => (
              <li key={href}>
                <a href={href}>{label}</a>
                {index < copy.nav.length - 1 && (
                  <span
                    className="data-brief-mini-nav__separator"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <section
          id="thesis"
          className="data-brief-section data-brief-section--dark"
          aria-labelledby="demandos-thesis"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading ui-section-heading">
              <p className="data-brief-eyebrow">
                {isEnglish ? 'Strategic thesis' : 'Tesis estratégica'}
              </p>
              <h2 id="demandos-thesis">
                {isEnglish
                  ? 'For inventory decisions, reliability beats autonomy.'
                  : 'Para decisiones de inventario, la fiabilidad pesa más que la autonomía.'}
              </h2>
              <p>
                {isEnglish
                  ? 'ML is used for forecasting and diagnostics. Deterministic code handles ingestion, validation, schema contracts, feature engineering, routing, safety gates, and side-effect control. The system is designed to be auditable and reproducible: it does not use autonomous agents to make purchasing decisions, contact suppliers, or create purchase orders.'
                  : 'El ML se usa para forecasting y diagnóstico. El código determinista gestiona ingesta, validación, contratos de esquema, feature engineering, routing, safety gates y control de efectos. El sistema está diseñado para ser auditable y reproducible: no usa agentes autónomos para decidir compras, contactar proveedores ni crear órdenes de compra.'}
              </p>
            </div>
          </div>
        </section>

        <CaseStudySnapshot
          locale={locale}
          contextHref="#problem"
          solutionHref="#architecture"
          links={[
            { label: copy.demo, href: demoUrl, external: true },
            { label: copy.github, href: githubUrl, external: true },
          ]}
        />

        <section
          id="metadata"
          className="data-brief-section data-brief-section--light"
        >
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow={isEnglish ? 'Project metadata' : 'Metadatos del proyecto'}
              title={
                isEnglish
                  ? 'A public ML and data-product prototype'
                  : 'Un prototipo público de ML y producto de datos'
              }
            />
            <dl className="demandos-snapshot">
              {metadata.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          id="problem"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="demandos-problem"
        >
          <div className="data-brief-section__container demandos-reading-grid">
            <div>
              <p className="data-brief-eyebrow">
                {isEnglish ? 'Problem' : 'Problema'}
              </p>
              <h2 id="demandos-problem">
                {isEnglish
                  ? 'From operational data to inventory decisions'
                  : 'De datos operativos a decisiones de inventario'}
              </h2>
            </div>
            <div className="demandos-copy">
              <p>
                {isEnglish
                  ? 'Retail and ecommerce teams often work from fragmented records: catalogs, stores, orders, inventory snapshots, suppliers, promotions, and purchase orders. A conventional dashboard can explain what happened, but it rarely connects those records to forecasts, model quality, stockout risk, and reviewable replenishment decisions.'
                  : 'Retail y ecommerce dependen de registros fragmentados: catálogos, tiendas, pedidos, snapshots de inventario, proveedores, promociones y órdenes de compra. Un dashboard convencional explica qué ocurrió, pero rara vez conecta esos datos con forecasts, calidad de modelo, riesgo de stockout y decisiones revisables de reposición.'}
              </p>
              <blockquote>
                {isEnglish
                  ? 'Can a credible ML workflow turn commerce records into inventory guidance without real customer data or seeded dashboard outputs?'
                  : '¿Puede un workflow creíble de ML convertir registros de comercio en orientación de inventario sin usar datos reales de clientes ni fingir outputs de dashboard?'}
              </blockquote>
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--light">
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow={isEnglish ? 'Product objective' : 'Objetivo de producto'}
              title={
                isEnglish
                  ? 'An internal ML tool, not just a dashboard'
                  : 'Una herramienta interna de ML, no solo un dashboard'
              }
            >
              <p>
                {isEnglish
                  ? 'The goal was to build a working loop that starts with raw operational data, evaluates models, and ends in reviewable guidance while keeping the system safe and non-autonomous.'
                  : 'El objetivo fue construir un ciclo funcional que empezara en datos operativos brutos, evaluara modelos y terminara en orientación revisable, manteniendo el sistema seguro y no autónomo.'}
              </p>
            </SectionHeading>
            <div className="demandos-boundary-grid">
              <article>
                <span>+</span>
                <h3>{isEnglish ? 'What it does' : 'Qué hace'}</h3>
                <ul>
                  {capabilities.does.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article>
                <span>−</span>
                <h3>{isEnglish ? 'What it does not do' : 'Qué no hace'}</h3>
                <ul>
                  {capabilities.doesNot.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section
          id="architecture"
          className="data-brief-section data-brief-section--dark"
          aria-labelledby="demandos-architecture"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading ui-section-heading">
              <p className="data-brief-eyebrow">
                {isEnglish ? 'Architecture decision' : 'Decisión de arquitectura'}
              </p>
              <h2 id="demandos-architecture">
                {isEnglish
                  ? 'Deterministic ML workflow, not an autonomous agent'
                  : 'Workflow determinista de ML, no agente autónomo'}
              </h2>
              <p>
                {isEnglish
                  ? 'Models handle forecasting and diagnostics. Ingestion, validation, routing, schema contracts, safety gates, and side-effect control remain deterministic. The steps are known; the product decision is to make them reliable, inspectable, and repeatable.'
                  : 'Los modelos se usan para forecasting y diagnóstico. Ingesta, validación, routing, contratos de esquema, puertas de seguridad y control de efectos permanecen deterministas. Los pasos ya son conocidos: la decisión de producto es hacerlos fiables, inspeccionables y repetibles.'}
              </p>
            </div>
            <ol
              className="demandos-flow"
              aria-label={isEnglish ? 'DemandOS pipeline' : 'Pipeline de DemandOS'}
            >
              {architectureFlow.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                </li>
              ))}
            </ol>
            <p className="demandos-dark-note">
              {isEnglish
                ? 'Every derived layer is computed and persisted before the next stage consumes it.'
                : 'Cada capa derivada se calcula y persiste antes de que la siguiente etapa la consuma.'}
            </p>
          </div>
        </section>

        <section
          id="pipeline"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="demandos-pipeline"
        >
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow="Data pipeline"
              title={
                isEnglish
                  ? 'The demo starts with raw records, not invented metrics'
                  : 'La demo empieza con registros brutos, no con métricas inventadas'
              }
            >
              <p>
                {isEnglish
                  ? 'DemandOS does not seed final KPIs, precomputed forecasts, risk scores, or recommendations. It starts from synthetic operational entities and calculates every downstream layer.'
                  : 'DemandOS no siembra KPIs finales, forecasts precalculados, scores de riesgo ni recomendaciones. Parte de entidades operativas sintéticas y calcula todas las capas posteriores.'}
              </p>
            </SectionHeading>
            <div
              className="demandos-entity-list"
              aria-label={isEnglish ? 'Raw entities' : 'Entidades brutas'}
            >
              {currentRawEntities.map(entity => (
                <span key={entity}>{entity}</span>
              ))}
            </div>
            <div className="demandos-count-grid">
              {currentPipelineCounts.map(([value, label]) => (
                <article key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
            <p className="demandos-source-note">
              {isEnglish
                ? 'Counts validated in a small-mode demo run; they may change after reseeding.'
                : 'Conteos validados en una ejecución demo small-mode; pueden cambiar después de reseedear.'}
            </p>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--light">
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow={isEnglish ? 'Raw vs derived' : 'Raw vs derivado'}
              title={
                isEnglish
                  ? 'The dashboard is computed, not pre-filled'
                  : 'El dashboard se calcula, no viene precargado'
              }
            >
              <p>
                {isEnglish
                  ? 'DemandOS starts from operational entities and computes planning surfaces internally. This is the proof boundary between raw demo data and product outputs.'
                  : 'DemandOS parte de entidades operativas y calcula internamente las superficies de planificación. Ese es el límite de prueba entre datos demo raw y outputs de producto.'}
              </p>
            </SectionHeading>
            <div
              className="demandos-comparison-table"
              role="table"
              aria-label={isEnglish ? 'Raw input versus DemandOS output' : 'Input raw frente a output de DemandOS'}
            >
              <div role="row" className="demandos-comparison-table__head">
                <span role="columnheader">
                  {isEnglish ? 'Raw input' : 'Input raw'}
                </span>
                <span role="columnheader">
                  {isEnglish ? 'Computed by DemandOS' : 'Calculado por DemandOS'}
                </span>
              </div>
              {currentRawDerivedRows.map(([raw, derived]) => (
                <div role="row" key={raw}>
                  <span role="cell">{raw}</span>
                  <span role="cell">{derived}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="forecasting"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="demandos-forecasting"
        >
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow={isEnglish ? 'Forecasting and ML layer' : 'Forecasting y capa ML'}
              title={
                isEnglish
                  ? 'Forecasting as a core product layer'
                  : 'Forecasting como capa central del producto'
              }
            >
              <p>
                {isEnglish
                  ? 'Baselines provide a transparent comparison point. The global model uses scikit-learn and demand, inventory, calendar, promotion, price, and lifecycle features. Its outputs feed stockout risk and reorder guidance.'
                  : 'Los baselines ofrecen un punto de comparación transparente. El modelo global usa scikit-learn y features de demanda, inventario, calendario, promoción, precio y ciclo de vida. Sus outputs alimentan riesgo de stockout y orientación de reposición.'}
              </p>
            </SectionHeading>
            <div className="demandos-model-grid">
              <article>
                <span>Baseline</span>
                <h3>
                  {isEnglish
                    ? 'Comparison before complexity'
                    : 'Comparación antes de complejidad'}
                </h3>
                <p>
                  {isEnglish
                    ? 'Seasonal naive and moving averages establish readable references. The ML model is not forced to win.'
                    : 'Seasonal naive y medias móviles establecen referencias legibles. El modelo ML no está obligado a ganar.'}
                </p>
              </article>
              <article>
                <span>ML</span>
                <h3>HistGradientBoostingRegressor</h3>
                <p>
                  {isEnglish
                    ? 'Global model over product/store series, trained on a feature matrix that excludes future information.'
                    : 'Modelo global sobre series producto/tienda, entrenado con una matriz de features que excluye información futura.'}
                </p>
              </article>
              <article>
                <span>{isEnglish ? 'Evaluation' : 'Evaluación'}</span>
                <h3>{isEnglish ? 'Honest backtesting' : 'Backtesting honesto'}</h3>
                <p>
                  {isEnglish
                    ? 'Temporal split, non-negative predictions, persisted metrics, and p10/p90 bands documented as heuristics.'
                    : 'Split temporal, predicciones no negativas, métricas persistidas y bandas p10/p90 documentadas como heurísticas.'}
                </p>
              </article>
            </div>
            <div className="demandos-metric-grid">
              {currentMetrics.map(([name, description]) => (
                <article key={name}>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <blockquote className="demandos-principle">
              {isEnglish
                ? 'In this prototype, WAPE is a directional quality signal. A high WAPE is not hidden: the interface explains that the forecast is useful as a demo planning signal, not as a production-calibrated model.'
                : 'En este prototipo, WAPE funciona como señal direccional de calidad. Un WAPE alto no se oculta: la interfaz explica que el forecast es útil como señal demo de planificación, no como modelo calibrado para producción.'}
            </blockquote>
          </div>
        </section>

        <section
          id="ml-insights"
          className="data-brief-section data-brief-section--dark"
          aria-labelledby="demandos-insights"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading ui-section-heading">
              <p className="data-brief-eyebrow">ML Insights</p>
              <h2 id="demandos-insights">
                {isEnglish
                  ? 'An interpretation layer for understanding the model'
                  : 'Una capa de interpretación para entender el modelo'}
              </h2>
              <p>
                {isEnglish
                  ? 'The data-science surface organizes summary diagnostics, model comparison, signal groups, and business-impact interpretation without mutating the database.'
                  : 'La superficie de data science organiza resumen de diagnósticos, comparación de modelos, grupos de señales e interpretación de impacto de negocio sin mutar la base de datos.'}
              </p>
            </div>
            <div className="demandos-endpoints">
              {endpoints.map(endpoint => (
                <code key={endpoint}>{endpoint}</code>
              ))}
            </div>
            <p className="demandos-dark-note">
              {isEnglish
                ? 'The five endpoints are read-only: they explain the system and its outputs, but do not run training, pipelines, or state changes.'
                : 'Los cinco endpoints son read-only: explican el sistema y sus resultados, pero no ejecutan entrenamiento, pipeline ni cambios de estado.'}
            </p>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--cream">
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow="Feature engineering"
              title={
                isEnglish
                  ? 'From features to interpretable signals'
                  : 'De features a señales interpretables'
              }
            >
              <p>
                {isEnglish
                  ? 'Signals describe information used by the model or associated with demand patterns. They are not presented as causal relationships.'
                  : 'Las señales describen información usada por el modelo o asociada con patrones de demanda. No se presentan como relaciones causales.'}
              </p>
            </SectionHeading>
            <div className="demandos-signal-grid">
              {currentFeatureSignals.map(([title, description]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="risk"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="demandos-risk"
        >
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow={isEnglish ? 'Risk and recommendations' : 'Riesgo y reposición'}
              title={
                isEnglish
                  ? 'From forecast to operational risk'
                  : 'Del forecast al riesgo operativo'
              }
            >
              <p>
                {isEnglish
                  ? 'Risk combines predicted demand, current inventory, inbound supply, lead time, supplier reliability, safety stock, and estimated lost sales. Recommendations are internal review guidance: never real purchase orders.'
                  : 'El riesgo combina demanda prevista, inventario actual, suministro entrante, lead time, fiabilidad del proveedor, safety stock y ventas perdidas estimadas. Las recomendaciones son orientación interna para revisión: nunca órdenes de compra reales.'}
              </p>
            </SectionHeading>
            <div className="demandos-risk-strip">
              {(isEnglish
                ? [
                    ['1', 'critical risk'],
                    ['5', 'high risks'],
                    ['4', 'medium risks'],
                    ['10', 'low risks'],
                    ['10', 'open recommendations'],
                    ['~ EUR 9,516', 'lost-sales exposure'],
                    ['~ EUR 6,686', 'estimated order cost'],
                  ]
                : [
                    ['1', 'riesgo crítico'],
                    ['5', 'riesgos altos'],
                    ['4', 'riesgos medios'],
                    ['10', 'riesgos bajos'],
                    ['10', 'recomendaciones abiertas'],
                    ['≈ €9.516', 'exposición a ventas perdidas'],
                    ['≈ €6.686', 'coste estimado de pedido'],
                  ]
              ).map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <p className="demandos-source-note">
              {isEnglish
                ? 'Visible output from a validated demo run; values can change after rebuilding the dataset.'
                : 'Salida visible en una ejecución demo validada; los valores pueden variar después de reconstruir el dataset.'}
            </p>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--cream">
          <div className="data-brief-section__container demandos-split">
            <article>
              <p className="data-brief-eyebrow">Monitoring</p>
              <h2>
                {isEnglish
                  ? 'Simple, readable comparisons'
                  : 'Comparaciones simples y legibles'}
              </h2>
              <p>
                {isEnglish
                  ? 'Compares recent model metrics and data health against prior runs with documented states and thresholds, without turning a demo into an overclaim.'
                  : 'Compara métricas recientes de modelo y salud de datos frente a ejecuciones anteriores mediante estados y umbrales documentados, sin convertir una demo en una afirmación estadística compleja.'}
              </p>
            </article>
            <article>
              <p className="data-brief-eyebrow">Scenario planning</p>
              <h2>
                {isEnglish
                  ? 'Simulate without mutating the source of truth'
                  : 'Simular sin mutar la verdad base'}
              </h2>
              <p>
                {isEnglish
                  ? 'Scenarios are stored separately, labeled as simulated, and never alter canonical risk or recommendation tables.'
                  : 'Los escenarios se guardan por separado, se etiquetan como simulados y nunca alteran las tablas canónicas de riesgo o recomendaciones.'}
              </p>
              <div className="demandos-entity-list">
                {currentScenarioInputs.map(input => (
                  <span key={input}>{input}</span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--dark">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading ui-section-heading">
              <p className="data-brief-eyebrow">
                {isEnglish ? 'Extensions' : 'Extensiones'}
              </p>
              <h2>
                {isEnglish
                  ? 'Prepared, but safe by default'
                  : 'Preparadas, pero seguras por defecto'}
              </h2>
            </div>
            <div className="demandos-extension-grid">
              <article>
                <span>CSV Upload</span>
                <h3>
                  {isEnglish
                    ? 'Only raw operational records'
                    : 'Solo registros operativos brutos'}
                </h3>
                <p>
                  {isEnglish
                    ? 'Validates raw entities, rejects derived lags, forecasts, scores, and recommendations, limits files to 2 MB, and writes audit records.'
                    : 'Valida entidades raw, rechaza lags, forecasts, scores y recomendaciones derivados, limita archivos a 2 MB y escribe registros de auditoría.'}
                </p>
              </article>
              <article>
                <span>Connector Prep</span>
                <h3>
                  {isEnglish
                    ? 'Shopify and WooCommerce disabled'
                    : 'Shopify y WooCommerce desactivados'}
                </h3>
                <p>
                  {isEnglish
                    ? 'Stubs only validate configuration shape. Dry runs do not call APIs, store credentials, or perform live synchronization.'
                    : 'Los stubs validan únicamente la forma de configuración. El dry-run no llama APIs, no almacena credenciales y no existe sincronización live.'}
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="walkthrough"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="demandos-walkthrough"
        >
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow="Dashboard walkthrough"
              title={
                isEnglish
                  ? 'From pipeline to decision surfaces'
                  : 'Del pipeline a superficies concretas de decisión'
              }
            >
              <p>
                {isEnglish
                  ? 'Screenshots come from the public demo and show calculated synthetic data across the product surface.'
                  : 'Las capturas proceden de la demo pública y muestran datos sintéticos calculados en la superficie del producto.'}
              </p>
            </SectionHeading>
            <div className="demandos-gallery">
              {currentScreenshots.map(shot => (
                <ScreenshotFigure
                  key={shot.src}
                  shot={shot}
                  altPrefix={copy.screenshotAlt}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--cream">
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow="Deployment architecture"
              title={
                isEnglish
                  ? 'A bounded free deployment for a portfolio prototype'
                  : 'Un despliegue gratuito y acotado para portfolio'
              }
            >
              <p>
                {isEnglish
                  ? 'A Vercel project serves Next.js and a Python FastAPI function under '
                  : 'Un proyecto Vercel sirve Next.js y una función Python FastAPI bajo '}
                <code>/api/*</code>
                {isEnglish
                  ? '. Neon Postgres keeps state, and browser calls are same-origin.'
                  : '. Neon Postgres conserva el estado y las llamadas del navegador son same-origin.'}
              </p>
            </SectionHeading>
            <div className="demandos-deployment">
              {(isEnglish
                ? [
                    ['Browser', 'Next.js interface and same-origin calls'],
                    ['Vercel', 'Frontend + FastAPI function in serverless mode'],
                    ['Neon Postgres', 'Persistence for data, runs, and outputs'],
                    ['Small mode', 'Synthetic scale compatible with demo limits'],
                  ]
                : [
                    ['Browser', 'Interfaz Next.js y llamadas same-origin'],
                    ['Vercel', 'Frontend + función FastAPI en modo serverless'],
                    ['Neon Postgres', 'Persistencia de datos, runs y outputs'],
                    ['Small mode', 'Escala sintética compatible con límites de demo'],
                  ]
              ).map(([title, description]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <p className="demandos-source-note">
              {isEnglish
                ? 'A larger system would move backend, workers, and model artifacts to dedicated infrastructure. The prototype assumes serverless limits, ephemeral artifacts, and free-tier constraints.'
                : 'Un sistema mayor migraría backend, workers y artefactos de modelo a infraestructura dedicada. El prototipo asume límites serverless, artefactos efímeros y restricciones de free tier.'}
            </p>
          </div>
        </section>

        <section
          id="reliability"
          className="data-brief-section data-brief-section--dark"
          aria-labelledby="demandos-reliability"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading ui-section-heading">
              <p className="data-brief-eyebrow">
                {isEnglish ? 'Reliability and validation' : 'Fiabilidad y evaluación'}
              </p>
              <h2 id="demandos-reliability">
                {isEnglish
                  ? 'Tests, smoke checks, and explicit limits'
                  : 'Tests, smoke checks y límites explícitos'}
              </h2>
              <p>
                {isEnglish
                  ? 'Credibility does not depend on one screenshot. It depends on data contracts, tests, safety checks, and validation against the public deployment.'
                  : 'La credibilidad no depende de una captura aislada, sino de contratos de datos, pruebas, checks de seguridad y validación contra el despliegue público.'}
              </p>
            </div>
            <div className="demandos-verification-grid">
              {(isEnglish
                ? [
                    ['451', 'unique backend tests passing'],
                    ['Passing', 'frontend typecheck + build'],
                    ['201', 'checks in scripts/verify.sh'],
                    ['Passing', 'public-readiness scan'],
                    ['29 / 29', 'production smoke checks'],
                    ['0', 'secrets or external effects detected'],
                  ]
                : [
                    ['451', 'tests backend únicos passing'],
                    ['Passing', 'frontend typecheck + build'],
                    ['201', 'checks en scripts/verify.sh'],
                    ['Passing', 'public-readiness scan'],
                    ['29 / 29', 'production smoke checks'],
                    ['0', 'secretos o efectos externos detectados'],
                  ]
              ).map(([value, label]) => (
                <article key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
            <p className="demandos-dark-note">
              {isEnglish
                ? 'An earlier backend count was higher because it included untracked duplicate copies. The public case uses the clean count of unique tests.'
                : 'El conteo backend anterior era mayor porque incluía copias duplicadas no trackeadas. El caso público utiliza el conteo limpio de tests únicos.'}
            </p>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--light">
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow="Safety boundary"
              title={isEnglish ? 'Allowed vs blocked' : 'Permitido vs bloqueado'}
            >
              <p>
                {isEnglish
                  ? 'Read-only public endpoints are available. Write and control actions are API-key protected, and the prototype does not cross into external actions.'
                  : 'Los endpoints públicos de lectura están disponibles. Las acciones de escritura y control se protegen con API key, y el prototipo no cruza el límite hacia acciones externas.'}
              </p>
            </SectionHeading>
            <div
              className="demandos-comparison-table demandos-comparison-table--safety"
              role="table"
              aria-label={isEnglish ? 'Allowed and blocked system actions' : 'Acciones permitidas y bloqueadas del sistema'}
            >
              <div role="row" className="demandos-comparison-table__head">
                <span role="columnheader">
                  {isEnglish ? 'Allowed' : 'Permitido'}
                </span>
                <span role="columnheader">
                  {isEnglish ? 'Blocked' : 'Bloqueado'}
                </span>
              </div>
              {currentSafetyRows.map(([allowed, blocked]) => (
                <div role="row" key={allowed}>
                  <span role="cell">{allowed}</span>
                  <span role="cell">{blocked}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--cream">
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow={isEnglish ? 'Result' : 'Resultado'}
              title={
                isEnglish
                  ? 'A complete ML product loop, not just a model'
                  : 'Un producto de ML completo, no solo un modelo'
              }
            >
              <p>
                {isEnglish
                  ? 'DemandOS demonstrates an end-to-end workflow: raw ingestion, validation, feature engineering, forecasting, model diagnostics, risk and recommendations, monitoring, scenarios, deployment, and publication discipline.'
                  : 'DemandOS demuestra un workflow end-to-end: ingesta raw, validación, feature engineering, forecasting, diagnóstico de modelos, riesgo y recomendaciones, monitoring, escenarios, despliegue y disciplina de publicación.'}
              </p>
            </SectionHeading>
            <blockquote className="demandos-result">
              {isEnglish
                ? 'Portfolio ML work is stronger when the model lives inside a reliable workflow for ingestion, validation, features, evaluation, explainability, safety, and deployment.'
                : 'El trabajo de portfolio con ML es más fuerte cuando el modelo vive dentro de un workflow fiable de ingesta, validación, features, evaluación, explicabilidad, seguridad y despliegue.'}
            </blockquote>
          </div>
        </section>

        <section
          id="limitations"
          className="data-brief-section data-brief-section--dark"
          aria-labelledby="demandos-limitations"
        >
          <div className="data-brief-section__container demandos-reading-grid">
            <div>
              <p className="data-brief-eyebrow">
                {isEnglish ? 'Limits' : 'Limitaciones'}
              </p>
              <h2 id="demandos-limitations">
                {isEnglish
                  ? 'What the prototype does not prove'
                  : 'Lo que el prototipo no demuestra'}
              </h2>
            </div>
            <ul className="demandos-limitations">
              {currentLimitations.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--dark demandos-closing">
          <div className="data-brief-section__container">
            <p className="data-brief-eyebrow">
              {isEnglish ? 'What I learned' : 'Qué aprendí'}
            </p>
            <h2>
              {isEnglish
                ? 'The model is only part of the product'
                : 'El modelo solo es una parte del producto'}
            </h2>
            <p>
              {isEnglish
                ? 'The most important part was not only training a model. It was building the environment that makes a model usable: data contracts, validation, leakage-safe features, interpretable metrics, observability, safety boundaries, and an interface that helps decide what to review first.'
                : 'Lo más importante del proyecto no fue solo entrenar un modelo. Fue construir el entorno que hace que un modelo sea usable: contratos de datos, validación, features sin leakage, métricas interpretables, observabilidad, límites de seguridad y una interfaz que ayuda a decidir qué revisar primero.'}
            </p>
            <div className="data-brief-actions">
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button data-brief-button--primary"
              >
                {isEnglish ? 'Open demo' : 'Abrir demo'}
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button"
              >
                {copy.github}
              </a>
              <Link
                href={localizePath('/case-studies', locale)}
                className="data-brief-button"
              >
                {copy.back}
              </Link>
            </div>
          </div>
        </section>

        <CaseStudyNext
          currentHref={localizePath('/case-studies/demandos', locale)}
          locale={locale}
          accentColor="var(--accent)"
        />
      </main>
      <Footer locale={locale} />
    </>
  )
}
