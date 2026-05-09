'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCaseStudySetup } from '@/hooks'
import { getCaseStudies } from '@/data/case-studies'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'

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
  ['Overview', '#overview'],
  ['El reto', '#reto'],
  ['El enfoque', '#enfoque'],
  ['El sistema', '#sistema'],
  ['Arquitectura', '#arquitectura'],
  ['Conexión', '#conexion'],
  ['Resultado', '#resultado'],
  ['Links', '#links'],
] as const

const systemSteps = [
  {
    num: '01',
    title: 'Entrada',
    description: 'Datos estructurados de benchmark desde JSON, Sheets, base de datos, warehouse o API.',
  },
  {
    num: '02',
    title: 'Traducción',
    description: 'Una capa de normalización convierte filas y métricas en un esquema consistente para la interfaz.',
  },
  {
    num: '03',
    title: 'Interfaz',
    description: 'El dashboard transforma los datos en rankings, tendencias, comparativas, eventos y escenarios.',
  },
  {
    num: '04',
    title: 'Decisión',
    description: 'El resultado es una lectura visual que permite detectar posición, evolución, oportunidades y señales estratégicas.',
  },
]

const architectureBullets = [
  'Datos mock generados por script',
  'Fallback local en JSON',
  'Conector opcional mediante variable de entorno',
  'Auditoría pública para detectar referencias privadas',
  'Deploy preparado para Vercel',
  'README técnico orientado a reutilización',
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
        <div className="benchmark-metrics">
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
            <strong className="benchmark-metric__value">↗ +4</strong>
          </div>
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
            <p className="data-brief-eyebrow">Data product / Benchmark system</p>
            <h1 id="benchmark-title" className="benchmark-hero__title">
              Benchmark Dashboard Template
            </h1>
            <p className="benchmark-hero__subtitle">
              Un sistema de inteligencia visual para convertir datos de benchmark en decisiones.
            </p>
            <p className="benchmark-hero__description">
              Un dashboard modular construido para transformar datos estructurados en una interfaz
              ejecutiva: rankings, tendencias, comparativas, eventos y escenarios de forecast. La
              versión pública utiliza datos sintéticos para mostrar la arquitectura, la experiencia y
              la lógica del sistema sin exponer información confidencial.
            </p>
            <div className="data-brief-actions" aria-label="Project links">
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button data-brief-button--primary"
              >
                Ver repositorio →
              </a>
              <span className="data-brief-button" aria-label="Demo disponible bajo solicitud">
                Demo disponible bajo solicitud
              </span>
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
          className="data-brief-section data-brief-section--light"
          aria-labelledby="benchmark-overview"
        >
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">Resumen</p>
              <h2 id="benchmark-overview">Una interfaz de inteligencia, no solo un dashboard</h2>
            </div>
            <div className="data-brief-copy-stack">
              <p>
                Benchmark Dashboard Template es una interfaz de inteligencia diseñada para convertir
                datos de benchmark en una lectura ejecutiva. El sistema organiza métricas, entidades,
                eventos y escenarios para que el usuario pueda entender posición, evolución y
                oportunidades sin depender de hojas de cálculo extensas.
              </p>
              <p>
                La versión pública está construida con datos mock/sintéticos y funciona como una
                plantilla reutilizable. Puede alimentarse desde JSON estático, Google Sheets, una
                base de datos, un warehouse o cualquier endpoint API que respete el contrato de datos.
              </p>
              <aside className="data-brief-callout">
                <span>Principio de diseño</span>
                <strong>Convertir datos dispersos en una interfaz de decisión.</strong>
              </aside>
            </div>
          </div>
        </section>

        {/* ── EL RETO ── */}
        <section
          id="reto"
          className="data-brief-section data-brief-section--dark"
          aria-labelledby="benchmark-reto"
        >
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">El reto</p>
              <h2 id="benchmark-reto">Del spreadsheet a la decisión</h2>
            </div>
            <div className="data-brief-copy-stack">
              <p>
                Muchos procesos de benchmark viven en hojas de cálculo: son útiles para almacenar
                información, pero difíciles de leer, compartir y convertir en criterio estratégico.
              </p>
              <p>El reto era diseñar una interfaz que pudiera:</p>
              <ul className="data-brief-list">
                <li>aceptar datos estructurados desde distintas fuentes</li>
                <li>normalizar formatos diferentes</li>
                <li>visualizar performance, ranking y evolución</li>
                <li>incorporar eventos y contexto</li>
                <li>funcionar con datos mock para una publicación pública segura</li>
                <li>desplegarse fácilmente como demo o como base para un sistema real</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── EL ENFOQUE ── */}
        <section
          id="enfoque"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="benchmark-enfoque"
        >
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">El enfoque</p>
              <h2 id="benchmark-enfoque">Un producto de datos, no una visualización aislada</h2>
            </div>
            <div className="data-brief-copy-stack">
              <p>
                El proyecto se diseñó como un producto de datos, no como una visualización aislada.
                La arquitectura separa fuente de datos, normalización, lógica de interfaz y
                visualización.
              </p>
              <p>Esto permite que la misma experiencia pueda funcionar con:</p>
              <div className="benchmark-connectors" aria-label="Fuentes de datos compatibles">
                {connectors.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── EL SISTEMA ── */}
        <section
          id="sistema"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="benchmark-sistema"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-section__header">
              <p className="data-brief-eyebrow">El sistema</p>
              <h2 id="benchmark-sistema">Cuatro capas, un flujo</h2>
            </div>
            <div className="benchmark-diagram" aria-label="Flujo del sistema">
              <span>Fuente de datos</span>
              <span className="benchmark-diagram__arrow">→</span>
              <span>Normalización</span>
              <span className="benchmark-diagram__arrow">→</span>
              <span>Vistas del dashboard</span>
              <span className="benchmark-diagram__arrow">→</span>
              <span>Lectura estratégica</span>
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

        {/* ── ARQUITECTURA PÚBLICA ── */}
        <section
          id="arquitectura"
          className="data-brief-section data-brief-section--dark"
          aria-labelledby="benchmark-arquitectura"
        >
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">Arquitectura pública</p>
              <h2 id="benchmark-arquitectura">Segura y reutilizable por diseño</h2>
            </div>
            <div className="data-brief-copy-stack">
              <p>
                La versión pública está pensada para ser segura y reutilizable. No contiene datos
                reales, logos reales, endpoints privados ni referencias a clientes. El dataset
                incluido es sintético y existe únicamente para demostrar la experiencia, el contrato
                de datos y la lógica de visualización.
              </p>
              <ul className="data-brief-list">
                {architectureBullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
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
              <p className="data-brief-eyebrow">Conexión de datos</p>
              <h2 id="benchmark-conexion">Contrato de datos abierto</h2>
              <p>
                El dashboard espera un payload JSON con tres bloques principales:{' '}
                <code>interface</code>, <code>events</code> y <code>dictionary</code>. Esto permite
                conectar distintas fuentes siempre que se traduzcan al contrato esperado.
              </p>
            </div>
            <div className="benchmark-code-block" aria-label="Contrato de datos del dashboard">
              <div className="benchmark-code-block__bar">
                <span>data-contract.json</span>
              </div>
              <pre>{dataContract}</pre>
            </div>
            <p className="data-brief-section__lede">
              La lógica de conexión puede venir de Google Sheets, Apps Script, n8n, Make, Zapier,
              Supabase, PostgreSQL, BigQuery, Airtable o cualquier backend propio.
            </p>
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
                El resultado es una plantilla pública y deployable que muestra cómo convertir
                benchmarks en una interfaz de inteligencia sin exponer información confidencial.
              </p>
              <ul className="data-brief-list">
                {resultBullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <aside className="data-brief-callout">
                <span>Conclusión</span>
                <strong>No es solo visualización. Es una forma de convertir datos en criterio.</strong>
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
              Benchmark Dashboard Template es una plantilla pública para convertir datos de benchmark
              en una interfaz de inteligencia ejecutiva. Datos mock incluidos, conector API-ready,
              deploy listo para Vercel.
            </p>
            <div className="data-brief-actions">
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button data-brief-button--primary"
              >
                Ver repositorio →
              </a>
              <span className="data-brief-button" aria-label="Demo disponible bajo solicitud">
                Demo disponible bajo solicitud
              </span>
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
