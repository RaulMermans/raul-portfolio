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
  'React',
  'Vite',
  'Tailwind CSS',
  'Recharts',
  'Mock data',
  'API-ready',
  'Open source',
  'Data product',
]

const navItems = [
  ['Qué hace', '#que-hace'],
  ['Cómo funciona', '#como-funciona'],
  ['Demo pública', '#demo'],
  ['Datos', '#conexion'],
  ['Casos de uso', '#casos'],
  ['Construcción', '#construccion'],
  ['Resultado', '#resultado'],
] as const

const featureCards = [
  { title: 'Rankings', description: 'Ordena entidades por métrica, score o periodo.' },
  { title: 'Comparativas', description: 'Compara varias entidades en la misma vista.' },
  { title: 'Tendencias', description: 'Muestra evolución mensual y cambios de performance.' },
  { title: 'Eventos', description: 'Añade contexto a subidas, caídas o cambios relevantes.' },
  { title: 'Forecast', description: 'Visualiza escenarios de evolución futura.' },
  { title: 'Data adapter', description: 'Conecta la interfaz a distintas fuentes de datos.' },
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

const connectors = [
  'Google Sheets',
  'Apps Script',
  'n8n',
  'Make',
  'Zapier',
  'Supabase',
  'PostgreSQL',
  'BigQuery',
  'Airtable',
  'API propia',
  'JSON estático',
]

const useCases = [
  'Benchmark competitivo',
  'Seguimiento de performance por canal',
  'Reporting ejecutivo',
  'Comparación de mercados',
  'Dashboard de campañas',
  'Análisis de portfolio de productos',
  'Seguimiento de KPIs por unidad de negocio',
]

const buildBullets = [
  'React + Vite',
  'Tailwind CSS',
  'Recharts',
  'Generador de datos mock',
  'Fallback local en JSON',
  'Conector opcional por variable de entorno',
  'Audit script para detectar referencias privadas',
  'Deploy listo para Vercel',
]

const publicSafeBullets = [
  'Datos mock',
  'Sin marcas reales',
  'Sin endpoints privados',
  'Sin credenciales',
  'Sin información confidencial',
  'Repositorio público con README técnico',
  'Demo pública segura si se mantiene sin endpoint privado',
]

const resultBullets = [
  'Dashboard funcional construido en React/Vite',
  'Visualización con Recharts',
  'Datos mock/sintéticos',
  'Generador de dataset demo',
  'Documentación pública',
  'Conector API-ready',
  'Deploy compatible con Vercel',
  'Repositorio público seguro para portfolio',
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
        <div className="benchmark-mockup__dots">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </div>
        <span className="benchmark-mockup__label">Benchmark Dashboard — Datos mock</span>
      </div>
      <div className="benchmark-mockup__body">
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
              Una plantilla de dashboard para comparar entidades, seguir métricas de benchmark y
              visualizar datos de negocio desde JSON, Google Sheets, bases de datos o APIs.
            </p>
            <p className="benchmark-hero__description">
              Construí este proyecto como una plantilla pública para convertir datos estructurados
              en un dashboard claro y navegable. Permite comparar entidades, revisar rankings,
              analizar tendencias, añadir eventos y probar escenarios de forecast sin depender de
              hojas de cálculo extensas.
            </p>
            <p className="benchmark-hero__mock-notice">
              La demo pública utiliza datos mock/sintéticos. No contiene datos reales de empresas,
              clientes, competidores ni mercados.
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

        {/* ── QUÉ HACE ── */}
        <section
          id="que-hace"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="benchmark-que-hace"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-section__header">
              <p className="data-brief-eyebrow">Funcionalidades</p>
              <h2 id="benchmark-que-hace">Qué hace</h2>
              <p>
                Benchmark Dashboard Template convierte un dataset estructurado en una vista visual
                de benchmark. El usuario puede revisar qué entidades lideran, cómo evolucionan las
                métricas, qué eventos explican cambios y cómo se proyectan distintos escenarios.
              </p>
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

        {/* ── CÓMO FUNCIONA ── */}
        <section
          id="como-funciona"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="benchmark-como-funciona"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-section__header">
              <p className="data-brief-eyebrow">Arquitectura</p>
              <h2 id="benchmark-como-funciona">Cómo funciona</h2>
              <p>
                El proyecto separa la fuente de datos de la interfaz. La app puede funcionar con un
                JSON local o con un endpoint externo. Mientras los datos respeten el contrato
                esperado, el dashboard puede alimentarse desde Google Sheets, una base de datos, un
                warehouse o una API propia.
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

        {/* ── DEMO PÚBLICA ── */}
        <section
          id="demo"
          className="data-brief-section data-brief-section--dark"
          aria-labelledby="benchmark-demo"
        >
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">Demo pública</p>
              <h2 id="benchmark-demo">Ver el dashboard en acción</h2>
            </div>
            <div className="data-brief-copy-stack">
              <p>
                La demo desplegada en Vercel usa únicamente datos mock. Sirve para probar la
                navegación, la estructura visual y el comportamiento del dashboard sin exponer
                información confidencial.
              </p>
              <div className="benchmark-demo-notice" aria-label="Aviso sobre datos mock">
                Datos mock / Sin información real
              </div>
              <div className="data-brief-actions">
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="data-brief-button data-brief-button--primary"
                >
                  Abrir demo →
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="data-brief-button"
                >
                  Ver código →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONEXIÓN DE DATOS ── */}
        <section
          id="conexion"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="benchmark-conexion"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-section__header">
              <p className="data-brief-eyebrow">Integración</p>
              <h2 id="benchmark-conexion">Conecta tus propios datos</h2>
              <p>
                El dashboard está pensado para aceptar datos externos. Puedes reemplazar el JSON
                incluido o conectar un endpoint mediante una variable de entorno.
              </p>
            </div>
            <div className="benchmark-code-block" aria-label="Contrato de datos del dashboard">
              <div className="benchmark-code-block__bar">
                <span>data-contract.json</span>
              </div>
              <pre>{dataContract}</pre>
            </div>
            <dl className="benchmark-field-defs">
              <div>
                <dt><code>interface</code></dt>
                <dd>Filas principales de métricas y entidades.</dd>
              </div>
              <div>
                <dt><code>events</code></dt>
                <dd>Eventos o notas que añaden contexto.</dd>
              </div>
              <div>
                <dt><code>dictionary</code></dt>
                <dd>Definiciones, categorías o metadata opcional.</dd>
              </div>
            </dl>
            <p className="benchmark-connectors-label">Fuentes compatibles</p>
            <div className="benchmark-connectors" aria-label="Fuentes de datos compatibles">
              {connectors.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CASOS DE USO ── */}
        <section
          id="casos"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="benchmark-casos"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-section__header">
              <p className="data-brief-eyebrow">Aplicaciones</p>
              <h2 id="benchmark-casos">Casos de uso</h2>
              <p>
                Esta estructura puede adaptarse a distintos contextos donde hay que comparar
                entidades y leer evolución.
              </p>
            </div>
            <div className="benchmark-connectors" aria-label="Casos de uso">
              {useCases.map((uc) => (
                <span key={uc}>{uc}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONSTRUCCIÓN ── */}
        <section
          id="construccion"
          className="data-brief-section data-brief-section--dark"
          aria-labelledby="benchmark-construccion"
        >
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">Stack técnico</p>
              <h2 id="benchmark-construccion">Construcción</h2>
            </div>
            <div className="data-brief-copy-stack">
              <p>
                El proyecto está construido como una plantilla pública y deployable. La prioridad
                fue mantener una arquitectura simple, fácil de adaptar y segura para publicar.
              </p>
              <ul className="data-brief-list">
                {buildBullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── VERSIÓN PÚBLICA ── */}
        <section
          id="version-publica"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="benchmark-version-publica"
        >
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">Seguridad</p>
              <h2 id="benchmark-version-publica">Versión pública</h2>
            </div>
            <div className="data-brief-copy-stack">
              <p>
                La versión publicada está separada de cualquier contexto privado. No incluye logos
                reales, endpoints privados, datos de clientes, competidores reales ni información
                comercial. Todo el contenido de la demo se genera con datos sintéticos.
              </p>
              <ul className="data-brief-list data-brief-list--light">
                {publicSafeBullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── RESULTADO ── */}
        <section
          id="resultado"
          className="data-brief-section data-brief-section--dark"
          aria-labelledby="benchmark-resultado"
        >
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">Resultado</p>
              <h2 id="benchmark-resultado">Una plantilla deployable y pública</h2>
            </div>
            <div className="data-brief-copy-stack">
              <p>
                El resultado es una plantilla de dashboard que demuestra cómo convertir datos de
                benchmark en una herramienta visual, conectable y deployable. Funciona como demo
                pública, punto de partida para un dashboard interno o base para un sistema de
                reporting conectado a datos reales.
              </p>
              <ul className="data-brief-list">
                {resultBullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <aside className="data-brief-callout">
                <span>Conclusión</span>
                <strong>
                  Un proyecto pensado para mostrar producto, datos y ejecución técnica sin depender
                  de información privada.
                </strong>
              </aside>
            </div>
          </div>
        </section>

        {/* ── LINKS / CTA ── */}
        <section
          id="links"
          className="data-brief-section data-brief-section--closing"
          aria-labelledby="benchmark-links"
        >
          <div className="data-brief-section__container">
            <p className="data-brief-eyebrow">Links</p>
            <h2 id="benchmark-links">Explorar el proyecto</h2>
            <p>
              Benchmark Dashboard Template es una plantilla pública para convertir datos de
              benchmark en un dashboard visual, conectable y deployable. Datos mock incluidos,
              conector API-ready, deploy listo para Vercel.
            </p>
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
