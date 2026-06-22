'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
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
  'Inventory Intelligence',
  'Data Product',
  'FastAPI',
  'Next.js',
  'scikit-learn',
  'Neon Postgres',
  'Vercel',
  'Synthetic Data',
  'Monitoring',
  'Scenario Planning',
]

const snapshot = [
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
    'Sin compras, comunicación con proveedores ni conectores live',
  ],
  ['Año', '2026'],
] as const

const does = [
  'Genera datos sintéticos operativos.',
  'Limpia, valida y agrega datos.',
  'Construye features leakage-safe.',
  'Entrena y evalúa modelos de forecasting.',
  'Calcula riesgo de stockout.',
  'Propone recomendaciones internas de reposición.',
  'Permite escenarios simulados.',
  'Expone monitoring y health checks.',
  'Prepara conectores Shopify/WooCommerce como stubs desactivados.',
]

const doesNot = [
  'No usa datos reales de clientes.',
  'No crea órdenes de compra reales.',
  'No contacta proveedores.',
  'No ejecuta conectores live.',
  'No automatiza compras.',
  'No promete precisión productiva.',
  'No siembra forecasts, riesgos o recomendaciones precalculadas.',
]

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

const rawEntities = [
  'Suppliers',
  'Products',
  'Stores',
  'Orders',
  'Inventory snapshots',
  'Promotions',
  'Purchase orders',
]

const pipelineCounts = [
  ['10', 'productos'],
  ['2', 'tiendas'],
  ['1.677', 'pedidos'],
  ['1.156', 'snapshots de inventario'],
  ['1.154', 'filas de features'],
  ['946', 'forecasts baseline'],
  ['560', 'forecasts de planificación'],
  ['20', 'filas de riesgo'],
  ['10', 'recomendaciones'],
] as const

const metrics = [
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
] as const

const endpoints = [
  '/api/data-science/summary',
  '/api/data-science/forecast-diagnostics',
  '/api/data-science/model-comparison',
  '/api/data-science/feature-signals',
  '/api/data-science/business-impact',
]

const featureSignals = [
  ['Demanda reciente', 'Lags y ventanas móviles anteriores al día objetivo.'],
  ['Estacionalidad', 'Calendario, día de semana y patrones temporales.'],
  ['Precio y margen', 'Precio, coste, margen y cambios recientes.'],
  ['Promociones', 'Exposición promocional y lift observado en los datos.'],
  ['Cobertura', 'Inventario disponible, stockout flag y días de suministro.'],
  ['Ciclo de vida', 'Edad del producto y etapa de madurez.'],
  ['Canal', 'Señales de tienda, categoría y canal de venta.'],
] as const

const scenarioInputs = [
  'Multiplicador de demanda',
  'Multiplicador de lead time',
  'Fiabilidad del proveedor',
  'Lift promocional',
  'Ajustes de inventario',
  'Horizonte de planificación',
]

const screenshots = [
  {
    src: `${imageBase}/02-home-dashboard.png`,
    title: 'Home / Operational overview',
    caption:
      'Resume el recorrido raw-to-decision: productos, tiendas, pedidos, niveles de riesgo, recomendaciones y readiness del modelo.',
    wide: true,
  },
  {
    src: `${imageBase}/04-forecasts.png`,
    title: 'Forecasts',
    caption:
      'Muestra ejecuciones de forecast y contexto de calidad sin obligar a interpretar identificadores internos.',
  },
  {
    src: `${imageBase}/05-inventory-risk.png`,
    title: 'Inventory Risk',
    caption:
      'Prioriza combinaciones producto/tienda por nivel de riesgo, ventas perdidas estimadas y días hasta stockout.',
  },
  {
    src: `${imageBase}/06-recommendations.png`,
    title: 'Recommendations',
    caption:
      'Presenta orientación interna de reposición dejando claro que no se crea ninguna orden de compra.',
  },
  {
    src: `${imageBase}/07-model-performance.png`,
    title: 'Model Performance',
    caption:
      'Expone WAPE, MAE, RMSE, Bias, comparación entre modelos y limitaciones del artefacto.',
  },
  {
    src: `${imageBase}/08-data-health.png`,
    title: 'Data Health',
    caption:
      'Hace visible la preparación del pipeline y el linaje desde registros brutos hasta salidas derivadas.',
  },
  {
    src: `${imageBase}/13-csv-upload.png`,
    title: 'CSV Upload',
    caption:
      'Muestra controles de ingesta de datos brutos, reglas de validación y límites del prototipo.',
  },
  {
    src: `${imageBase}/14-monitoring.png`,
    title: 'Monitoring',
    caption:
      'Compara salud de modelo y datos entre ejecuciones mediante estados y umbrales simples.',
  },
  {
    src: `${imageBase}/15-scenarios.png`,
    title: 'Scenarios',
    caption:
      'Permite introducir hipótesis what-if y revisar deltas sin cambiar la verdad canónica.',
  },
  {
    src: `${imageBase}/16-connectors.png`,
    title: 'Connectors',
    caption:
      'Documenta Shopify y WooCommerce como preparación desactivada y segura por defecto.',
    wide: true,
  },
] as const

const limitations = [
  'Solo utiliza datos sintéticos.',
  'No está entrenado con datos reales de clientes.',
  'No es un sistema productivo de reposición.',
  'No existe integración ecommerce live.',
  'No realiza compras autónomas.',
  'No incluye scheduler en background.',
  'El runtime serverless de Vercel limita escala y duración.',
  'Neon se usa dentro de límites de prototipo/free tier.',
  'La calidad del forecast está calibrada para demo, no para producción.',
]

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
}: {
  shot: (typeof screenshots)[number]
}) {
  return (
    <figure
      className={`demandos-shot ${'wide' in shot && shot.wide ? 'demandos-shot--wide' : ''}`}
    >
      <div className="demandos-shot__frame">
        <Image
          src={shot.src}
          alt={`Pantalla de DemandOS: ${shot.title}`}
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
              ← Volver a casos
            </Link>
            <p className="data-brief-eyebrow">
              Machine Learning / Inventory Intelligence
            </p>
            <h1 id="demandos-title" className="data-brief-hero__title">
              DemandOS
            </h1>
            <p className="data-brief-hero__subtitle">
              Sistema de machine learning para previsión de demanda, riesgo de
              stockout y recomendaciones internas de reposición.
            </p>
            <p className="data-brief-hero__description">
              DemandOS convierte datos operativos sintéticos —productos,
              tiendas, pedidos, inventario, promociones y proveedores— en
              features leakage-safe, forecasts, métricas de modelo, riesgos de
              stockout y recomendaciones de reposición. Está desplegado como
              prototipo público en Vercel con Neon Postgres y no ejecuta compras
              reales ni acciones externas.
            </p>
            <div className="data-brief-actions" aria-label="Enlaces del proyecto">
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button data-brief-button--primary"
              >
                Ver demo
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button"
              >
                Ver GitHub
              </a>
              <a
                href={architectureUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button"
              >
                Leer arquitectura
              </a>
            </div>
            <div className="demandos-proof" aria-label="Pruebas del proyecto">
              {[
                'Datos sintéticos operativos',
                'Forecasting ML',
                'Neon + Vercel',
                'Sin acciones externas',
              ].map(item => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="data-brief-tags" aria-label="Tecnologías">
              {tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <figure className="data-brief-hero__visual demandos-hero__visual">
            <div className="demandos-shot__frame">
              <Image
                src={`${imageBase}/02-home-dashboard.png`}
                alt="Overview operativo de DemandOS con pipeline, riesgo y recomendaciones"
                width={1440}
                height={900}
                priority
                sizes="(max-width: 1180px) 100vw, 52vw"
              />
            </div>
            <figcaption>
              Demo desplegada con datos sintéticos y acciones externas
              desactivadas.
            </figcaption>
          </figure>
        </section>

        <nav className="data-brief-mini-nav" aria-label="Secciones de DemandOS">
          {[
            ['Problema', '#problem'],
            ['Arquitectura', '#architecture'],
            ['Pipeline', '#pipeline'],
            ['Forecasting', '#forecasting'],
            ['ML Insights', '#ml-insights'],
            ['Riesgo', '#risk'],
            ['Pantallas', '#walkthrough'],
            ['Fiabilidad', '#reliability'],
            ['Límites', '#limitations'],
          ].map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <section className="data-brief-section data-brief-section--light">
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow="Project Snapshot"
              title="Un prototipo público de ML y producto de datos"
            />
            <dl className="demandos-snapshot">
              {snapshot.map(([label, value]) => (
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
              <p className="data-brief-eyebrow">Problema</p>
              <h2 id="demandos-problem">
                De datos operativos a decisiones de inventario
              </h2>
            </div>
            <div className="demandos-copy">
              <p>
                Retail y ecommerce dependen de registros fragmentados:
                catálogos, tiendas, pedidos, snapshots de inventario,
                proveedores, promociones y órdenes de compra. Un dashboard
                convencional explica qué ocurrió, pero rara vez conecta esos
                datos con forecasts, calidad de modelo, riesgo de stockout y
                decisiones de reposición.
              </p>
              <blockquote>
                ¿Puede un workflow creíble de ML convertir registros de comercio
                en orientación de inventario sin usar datos reales de clientes
                ni fingir outputs de dashboard?
              </blockquote>
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--light">
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow="Objetivo de producto"
              title="Una herramienta interna de ML, no solo un dashboard"
            >
              <p>
                El objetivo fue construir un ciclo funcional que empezara en
                datos operativos brutos, evaluara modelos y terminara en
                orientación revisable, manteniendo el sistema seguro y no
                autónomo.
              </p>
            </SectionHeading>
            <div className="demandos-boundary-grid">
              <article>
                <span>+</span>
                <h3>Qué hace</h3>
                <ul>
                  {does.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article>
                <span>−</span>
                <h3>Qué no hace</h3>
                <ul>
                  {doesNot.map(item => (
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
              <p className="data-brief-eyebrow">Decisión de arquitectura</p>
              <h2 id="demandos-architecture">
                Workflow determinista de ML, no agente autónomo
              </h2>
              <p>
                Los modelos se usan para forecasting y diagnóstico. Ingesta,
                validación, routing, contratos de esquema, puertas de seguridad
                y control de efectos permanecen deterministas. Los pasos ya son
                conocidos: aquí la fiabilidad importa más que la autonomía.
              </p>
            </div>
            <ol className="demandos-flow" aria-label="Pipeline de DemandOS">
              {architectureFlow.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                </li>
              ))}
            </ol>
            <p className="demandos-dark-note">
              Cada capa derivada se calcula dentro del pipeline y persiste antes
              de que la siguiente etapa la consuma.
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
              title="La demo empieza con datos brutos, no con métricas inventadas"
            >
              <p>
                DemandOS no siembra KPIs finales, forecasts precalculados,
                scores de riesgo ni recomendaciones. Parte de entidades
                operativas sintéticas y calcula todas las capas posteriores.
              </p>
            </SectionHeading>
            <div className="demandos-entity-list" aria-label="Entidades brutas">
              {rawEntities.map(entity => (
                <span key={entity}>{entity}</span>
              ))}
            </div>
            <div className="demandos-count-grid">
              {pipelineCounts.map(([value, label]) => (
                <article key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
            <p className="demandos-source-note">
              Conteos validados en una ejecución demo small-mode; pueden cambiar
              después de reseedear.
            </p>
          </div>
        </section>

        <section
          id="forecasting"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="demandos-forecasting"
        >
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow="Forecasting y capa ML"
              title="Forecasting como capa central del producto"
            >
              <p>
                Los baselines ofrecen un punto de comparación transparente. El
                modelo global usa scikit-learn y features de demanda,
                inventario, calendario, promoción, precio y ciclo de vida. Sus
                outputs alimentan riesgo de stockout y orientación de
                reposición.
              </p>
            </SectionHeading>
            <div className="demandos-model-grid">
              <article>
                <span>Baseline</span>
                <h3>Comparación antes de complejidad</h3>
                <p>
                  Seasonal naive y medias móviles establecen referencias
                  legibles. El modelo ML no está obligado a ganar.
                </p>
              </article>
              <article>
                <span>ML</span>
                <h3>HistGradientBoostingRegressor</h3>
                <p>
                  Modelo global sobre series producto/tienda, entrenado con una
                  matriz de features que excluye información futura.
                </p>
              </article>
              <article>
                <span>Evaluación</span>
                <h3>Backtesting honesto</h3>
                <p>
                  Split temporal, predicciones no negativas, métricas
                  persistidas y bandas p10/p90 documentadas como heurísticas.
                </p>
              </article>
            </div>
            <div className="demandos-metric-grid">
              {metrics.map(([name, description]) => (
                <article key={name}>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <blockquote className="demandos-principle">
              En este prototipo, WAPE funciona como señal direccional de calidad.
              Un WAPE alto no se oculta: la interfaz explica que el forecast es
              útil como señal demo de planificación, no como modelo calibrado
              para producción.
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
                Una capa de interpretación para entender el modelo
              </h2>
              <p>
                Sprint 15 añadió resumen de data science, diagnósticos,
                comparación de modelos, grupos de señales e interpretación de
                impacto de negocio. La página ML Insights organiza estas
                lecturas sin mutar la base de datos.
              </p>
            </div>
            <div className="demandos-endpoints">
              {endpoints.map(endpoint => (
                <code key={endpoint}>{endpoint}</code>
              ))}
            </div>
            <p className="demandos-dark-note">
              Los cinco endpoints son read-only: explican el sistema y sus
              resultados, pero no ejecutan entrenamiento, pipeline ni cambios
              de estado.
            </p>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--cream">
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow="Feature engineering"
              title="De features a señales interpretables"
            >
              <p>
                Las señales describen información usada por el modelo o asociada
                con patrones de demanda. No se presentan como relaciones
                causales.
              </p>
            </SectionHeading>
            <div className="demandos-signal-grid">
              {featureSignals.map(([title, description]) => (
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
              eyebrow="Riesgo y reposición"
              title="Del forecast al riesgo operativo"
            >
              <p>
                El riesgo combina demanda prevista, inventario actual, suministro
                entrante, lead time, fiabilidad del proveedor, safety stock y
                ventas perdidas estimadas. Las recomendaciones son orientación
                interna para revisión: nunca órdenes de compra reales.
              </p>
            </SectionHeading>
            <div className="demandos-risk-strip">
              {[
                ['1', 'riesgo crítico'],
                ['5', 'riesgos altos'],
                ['4', 'riesgos medios'],
                ['10', 'riesgos bajos'],
                ['10', 'recomendaciones abiertas'],
                ['≈ €9.516', 'exposición a ventas perdidas'],
                ['≈ €6.686', 'coste estimado de pedido'],
              ].map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <p className="demandos-source-note">
              Salida visible en una ejecución demo validada; los valores pueden
              variar después de reconstruir el dataset.
            </p>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--cream">
          <div className="data-brief-section__container demandos-split">
            <article>
              <p className="data-brief-eyebrow">Monitoring</p>
              <h2>Comparaciones simples y legibles</h2>
              <p>
                Compara métricas recientes de modelo y salud de datos frente a
                ejecuciones anteriores mediante estados y umbrales documentados,
                sin convertir una demo en una afirmación estadística compleja.
              </p>
            </article>
            <article>
              <p className="data-brief-eyebrow">Scenario planning</p>
              <h2>Simular sin mutar la verdad base</h2>
              <p>
                Los escenarios se guardan por separado, se etiquetan como
                simulados y nunca alteran las tablas canónicas de riesgo o
                recomendaciones.
              </p>
              <div className="demandos-entity-list">
                {scenarioInputs.map(input => (
                  <span key={input}>{input}</span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--dark">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading ui-section-heading">
              <p className="data-brief-eyebrow">Extensiones</p>
              <h2>Preparadas, pero seguras por defecto</h2>
            </div>
            <div className="demandos-extension-grid">
              <article>
                <span>CSV Upload</span>
                <h3>Solo registros operativos brutos</h3>
                <p>
                  Valida entidades raw, rechaza lags, forecasts, scores y
                  recomendaciones derivados, limita archivos a 2 MB y escribe
                  registros de auditoría.
                </p>
              </article>
              <article>
                <span>Connector Prep</span>
                <h3>Shopify y WooCommerce desactivados</h3>
                <p>
                  Los stubs validan únicamente la forma de configuración. El
                  dry-run no llama APIs, no almacena credenciales y no existe
                  sincronización live.
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
              title="Del pipeline a superficies concretas de decisión"
            >
              <p>
                Las capturas proceden de la demo pública y muestran datos
                sintéticos calculados. La captura específica de ML Insights
                queda pendiente en el repositorio fuente.
              </p>
            </SectionHeading>
            <div className="demandos-gallery">
              {screenshots.map(shot => (
                <ScreenshotFigure key={shot.src} shot={shot} />
              ))}
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--cream">
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow="Deployment architecture"
              title="Un despliegue gratuito y acotado para portfolio"
            >
              <p>
                Un proyecto Vercel sirve Next.js y una función Python FastAPI
                bajo <code>/api/*</code>. Neon Postgres conserva el estado y las
                llamadas del navegador son same-origin.
              </p>
            </SectionHeading>
            <div className="demandos-deployment">
              {[
                ['Browser', 'Interfaz Next.js y llamadas same-origin'],
                ['Vercel', 'Frontend + función FastAPI en modo serverless'],
                ['Neon Postgres', 'Persistencia de datos, runs y outputs'],
                ['Small mode', 'Escala sintética compatible con límites de demo'],
              ].map(([title, description]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <p className="demandos-source-note">
              Un sistema mayor migraría backend, workers y artefactos de modelo a
              infraestructura dedicada. El prototipo asume límites serverless,
              artefactos efímeros y restricciones de free tier.
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
              <p className="data-brief-eyebrow">Fiabilidad y evaluación</p>
              <h2 id="demandos-reliability">
                Tests, smoke checks y límites explícitos
              </h2>
              <p>
                La credibilidad no depende de una captura aislada, sino de
                contratos de datos, pruebas, checks de seguridad y validación
                contra el despliegue público.
              </p>
            </div>
            <div className="demandos-verification-grid">
              {[
                ['451', 'tests backend únicos passing'],
                ['Passing', 'frontend typecheck + build'],
                ['201', 'checks en scripts/verify.sh'],
                ['Passing', 'public-readiness scan'],
                ['29 / 29', 'production smoke checks'],
                ['0', 'secretos o efectos externos detectados'],
              ].map(([value, label]) => (
                <article key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
            <p className="demandos-dark-note">
              El conteo backend anterior era mayor porque incluía copias
              duplicadas no trackeadas. El caso público utiliza el conteo limpio
              de tests únicos.
            </p>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--light">
          <div className="data-brief-section__container">
            <SectionHeading eyebrow="Safety boundary" title="Dónde termina el sistema">
              <p>
                Los endpoints públicos de lectura están disponibles. Las
                acciones de escritura y control se protegen con API key, y el
                prototipo no cruza el límite hacia acciones externas.
              </p>
            </SectionHeading>
            <ul className="demandos-safety-list">
              {[
                'No crea órdenes de compra reales.',
                'No contacta proveedores.',
                'No sincroniza Shopify o WooCommerce.',
                'No envía alertas por email o Slack.',
                'Los escenarios no mutan datos canónicos.',
                'La carga CSV está acotada y validada.',
                'Los conectores son stubs desactivados.',
              ].map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--cream">
          <div className="data-brief-section__container">
            <SectionHeading
              eyebrow="Resultado"
              title="Un producto de ML completo, no solo un modelo"
            >
              <p>
                DemandOS demuestra un workflow end-to-end: ingesta raw,
                validación, feature engineering, forecasting, diagnóstico de
                modelos, riesgo y recomendaciones, monitoring, escenarios,
                despliegue y disciplina de publicación.
              </p>
            </SectionHeading>
            <blockquote className="demandos-result">
              El trabajo de portfolio con ML es más fuerte cuando el modelo vive
              dentro de un workflow fiable de ingesta, validación, features,
              evaluación, explicabilidad, seguridad y despliegue.
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
              <p className="data-brief-eyebrow">Limitaciones</p>
              <h2 id="demandos-limitations">Lo que el prototipo no demuestra</h2>
            </div>
            <ul className="demandos-limitations">
              {limitations.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--dark demandos-closing">
          <div className="data-brief-section__container">
            <p className="data-brief-eyebrow">Qué aprendí</p>
            <h2>El modelo solo es una parte del producto</h2>
            <p>
              Lo más importante del proyecto no fue solo entrenar un modelo. Fue
              construir el entorno que hace que un modelo sea usable: contratos
              de datos, validación, features sin leakage, métricas
              interpretables, observabilidad, límites de seguridad y una
              interfaz que ayuda a decidir qué revisar primero.
            </p>
            <div className="data-brief-actions">
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button data-brief-button--primary"
              >
                Abrir demo
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button"
              >
                Ver GitHub
              </a>
              <Link
                href={localizePath('/case-studies', locale)}
                className="data-brief-button"
              >
                Volver a casos
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
