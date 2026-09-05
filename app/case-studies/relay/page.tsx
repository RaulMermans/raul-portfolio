'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyMiniNav from '@/components/case-studies/CaseStudyMiniNav'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import { CaseStudySnapshot } from '@/components/case-studies/CommercialCaseStudySections'
import { getSiteCopy } from '@/data/site-copy'
import { useCaseStudySetup } from '@/hooks'
import { getLocaleFromPath, localizePath, type Locale } from '@/lib/i18n'
import type { CaseStudyPresentationFamily } from '@/types/case-study'
import styles from './RelayCaseStudy.module.css'

const githubUrl = 'https://github.com/RaulMermans/Relay'

type Copy = {
  presentationFamily: CaseStudyPresentationFamily
  eyebrow: string
  title: string
  subtitle: string
  description: string
  status: string
  github: string
  navLabel: string
  nav: Array<[string, string]>
  stackLabel: string
  stack: string[]
  problem: { eyebrow: string; title: string; paragraphs: string[] }
  principle: { eyebrow: string; title: string; items: string[] }
  system: { eyebrow: string; title: string; intro: string; steps: string[] }
  health: { eyebrow: string; title: string; intro: string; checks: string[]; states: string[] }
  intelligence: { eyebrow: string; title: string; paragraphs: string[]; cards: Array<[string, string]> }
  proof: { eyebrow: string; title: string; intro: string; tests: Array<[string, string]>; summary: string }
  boundary: { eyebrow: string; title: string; intro: string; items: string[] }
  final: { title: string; description: string; github: string; back: string }
}

const copy: Record<Locale, Copy> = {
  en: {
    presentationFamily: 'technical-product',
    eyebrow: 'Marketing intelligence / Data product',
    title: 'Relay',
    subtitle: 'A performance workspace built around trustworthy numbers.',
    description:
      'Relay turns Meta Ads, Google Ads, and Shopify exports into validated performance intelligence, explainable changes, and a client-ready reporting workflow.',
    status: 'V1 complete / Protected private beta',
    github: 'View GitHub repository',
    navLabel: 'Relay case study sections',
    nav: [
      ['Problem', '#problem'],
      ['Principle', '#principle'],
      ['System', '#system'],
      ['Data Health', '#data-health'],
      ['Intelligence', '#intelligence'],
      ['Proof', '#proof'],
      ['V1 boundary', '#boundary'],
    ],
    stackLabel: 'Built with',
    stack: ['Next.js', 'React', 'TypeScript', 'Zod', 'Vitest', 'Playwright', 'Vercel'],
    problem: {
      eyebrow: '01 / Problem',
      title: 'Performance reports are repetitive. Trust is the harder problem.',
      paragraphs: [
        'A reporting cycle can mean exporting files, cleaning fields, reconciling definitions, calculating KPIs, locating movement, writing commentary, and rebuilding the same report again.',
        'Meta, Google, and Shopify each describe a different part of performance. Those numbers can all be useful, but they are not interchangeable. A dashboard that makes them look comparable creates false certainty.',
      ],
    },
    principle: {
      eyebrow: '02 / Product principle',
      title: 'A metric should not become more certain as it moves further away from its source.',
      items: [
        'Shopify remains the source for commerce revenue, orders, AOV, and MER.',
        'Meta and Google keep their own spend, conversions, attributed revenue, CPA, and ROAS.',
        'Provider-attributed revenue is never combined and presented as ecommerce revenue.',
        'Missing values are not turned into zero.',
        'Data quality is evaluated before interpretation.',
        'Narrative is composed from validated structured facts.',
      ],
    },
    system: {
      eyebrow: '03 / System',
      title: 'One deterministic path from source data to a decision.',
      intro:
        'The same normalized facts power the dashboard, report, and narrative. The interface does not recalculate business logic, and the reporting layer does not reinterpret the dashboard.',
      steps: [
        'Source exports',
        'Detection and mapping',
        'Canonical data',
        'Data Health',
        'KPI engine',
        'Change Intelligence',
        'Narrative',
        'Dashboard and report',
      ],
    },
    health: {
      eyebrow: '04 / Data Health',
      title: 'Before asking what happened, Relay asks whether the data can support an answer.',
      intro:
        'Relay checks the evidence before it exposes an interpretation. Blocking problems stop downstream analysis. Warnings remain visible instead of being silently repaired.',
      checks: [
        'Reporting-period coverage',
        'Expected source completeness',
        'Currency compatibility',
        'Mapping integrity',
        'Provenance and duplicate evidence',
        'Revenue semantics',
      ],
      states: ['Healthy', 'Review required', 'Blocked'],
    },
    intelligence: {
      eyebrow: '05 / Decision layer',
      title: 'Explain movement without inventing causes.',
      paragraphs: [
        'Once the facts are valid, Relay compares the current period with the previous one and identifies meaningful KPI movement, efficiency changes, top movers, target performance, and areas needing attention.',
        'Direction and interpretation stay separate. A metric can increase without Relay declaring that increase positive. V1 uses deterministic rules over structured facts rather than a generative AI model.',
      ],
      cards: [
        ['Commerce truth', 'Shopify powers Commerce Revenue, orders, AOV, and MER.'],
        ['Platform truth', 'Meta and Google retain provider-specific spend, conversions, attributed revenue, CPA, and ROAS.'],
        ['Reporting truth', 'The report uses the same validated analysis as the dashboard. If that analysis is stale, export is disabled.'],
      ],
    },
    proof: {
      eyebrow: '06 / Verification',
      title: 'A private beta verified as a complete workflow.',
      intro:
        'Relay V1 closed with automated tests, cross-browser checks, production deployment verification, responsive review, and report/PDF validation.',
      tests: [
        ['304', 'Vitest tests'],
        ['209', 'Unit tests'],
        ['95', 'Integration tests'],
        ['48', 'Playwright checks'],
      ],
      summary:
        'A controlled synthetic multi-source workspace produced EUR 225 in Shopify commerce revenue, EUR 55 in compatible paid-media spend, a 4.09x MER, two Shopify orders, and 2x ROAS for both Meta and Google. The values are synthetic. The workflow that processed them is real.',
    },
    boundary: {
      eyebrow: '07 / V1 boundary',
      title: 'A complete private beta, not a finished SaaS.',
      intro:
        'V1 deliberately uses manual CSV ingestion and device-specific browser memory. It does not claim live synchronization, cloud collaboration, or autonomous AI analysis.',
      items: [
        'No public accounts or cloud client persistence.',
        'No live OAuth, automatic provider refresh, or credential persistence.',
        'No scheduled reports, email delivery, or multi-user collaboration.',
        'No encrypted local memory or durable public abuse controls.',
        'Browser-native PDF output remains browser owned.',
      ],
    },
    final: {
      title: 'Faster reporting matters when the answer remains trustworthy.',
      description: 'Relay brings product strategy, data semantics, UX, and engineering together around a reporting workflow that stays defensible from source data to client report.',
      github: 'View GitHub repository',
      back: 'Back to case studies',
    },
  },
  es: {
    presentationFamily: 'technical-product',
    eyebrow: 'Inteligencia de marketing / Producto de datos',
    title: 'Relay',
    subtitle: 'Un espacio de rendimiento construido sobre cifras fiables.',
    description:
      'Relay convierte exportaciones de Meta Ads, Google Ads y Shopify en inteligencia de rendimiento validada, cambios explicables y un flujo de reporting preparado para clientes.',
    status: 'V1 completada / Beta privada protegida',
    github: 'Ver repositorio en GitHub',
    navLabel: 'Secciones del caso de estudio de Relay',
    nav: [
      ['Problema', '#problem'],
      ['Principio', '#principle'],
      ['Sistema', '#system'],
      ['Data Health', '#data-health'],
      ['Inteligencia', '#intelligence'],
      ['Prueba', '#proof'],
      ['Límite V1', '#boundary'],
    ],
    stackLabel: 'Creado con',
    stack: ['Next.js', 'React', 'TypeScript', 'Zod', 'Vitest', 'Playwright', 'Vercel'],
    problem: {
      eyebrow: '01 / Problema',
      title: 'Los informes de rendimiento son repetitivos. La confianza es el problema más difícil.',
      paragraphs: [
        'Un ciclo de reporting puede implicar exportar archivos, limpiar campos, reconciliar definiciones, calcular KPIs, localizar cambios, escribir comentarios y rehacer el mismo informe.',
        'Meta, Google y Shopify describen partes distintas del rendimiento. Sus cifras pueden ser útiles, pero no son intercambiables. Un dashboard que las hace parecer comparables crea una certeza falsa.',
      ],
    },
    principle: {
      eyebrow: '02 / Principio de producto',
      title: 'Una métrica no debe parecer más cierta cuanto más se aleja de su fuente.',
      items: [
        'Shopify sigue siendo la fuente de ingresos de comercio, pedidos, AOV y MER.',
        'Meta y Google mantienen su propio gasto, conversiones, ingresos atribuidos, CPA y ROAS.',
        'Los ingresos atribuidos por proveedor no se combinan ni se presentan como ingresos de ecommerce.',
        'Los valores ausentes no se convierten en cero.',
        'La calidad de los datos se evalúa antes de la interpretación.',
        'La narrativa se compone a partir de hechos estructurados y validados.',
      ],
    },
    system: {
      eyebrow: '03 / Sistema',
      title: 'Un camino determinista desde los datos de origen hasta una decisión.',
      intro:
        'Los mismos hechos normalizados alimentan el dashboard, el informe y la narrativa. La interfaz no recalcula la lógica de negocio y el informe no reinterpreta el dashboard.',
      steps: [
        'Exportaciones de origen',
        'Detección y mapeo',
        'Datos canónicos',
        'Data Health',
        'Motor de KPI',
        'Change Intelligence',
        'Narrativa',
        'Dashboard e informe',
      ],
    },
    health: {
      eyebrow: '04 / Data Health',
      title: 'Antes de preguntar qué ocurrió, Relay comprueba si los datos pueden sostener una respuesta.',
      intro:
        'Relay revisa la evidencia antes de mostrar una interpretación. Los problemas bloqueantes detienen el análisis. Las advertencias siguen visibles en vez de corregirse en silencio.',
      checks: [
        'Cobertura del periodo de reporting',
        'Completitud de fuentes esperadas',
        'Compatibilidad de divisas',
        'Integridad del mapeo',
        'Procedencia y evidencia duplicada',
        'Semántica de ingresos',
      ],
      states: ['Correcto', 'Requiere revisión', 'Bloqueado'],
    },
    intelligence: {
      eyebrow: '05 / Capa de decisión',
      title: 'Explicar el cambio sin inventar causas.',
      paragraphs: [
        'Cuando los hechos son válidos, Relay compara el periodo actual con el anterior e identifica cambios relevantes en KPI, eficiencia, métricas principales, objetivos y áreas que requieren atención.',
        'La dirección y la interpretación se mantienen separadas. Una métrica puede aumentar sin que Relay declare que ese aumento es positivo. La V1 usa reglas deterministas sobre hechos estructurados.',
      ],
      cards: [
        ['Verdad comercial', 'Shopify alimenta ingresos de comercio, pedidos, AOV y MER.'],
        ['Verdad de plataforma', 'Meta y Google mantienen gasto, conversiones, ingresos atribuidos, CPA y ROAS específicos del proveedor.'],
        ['Verdad de reporting', 'El informe utiliza el mismo análisis validado que el dashboard. Si el análisis está desactualizado, se desactiva la exportación.'],
      ],
    },
    proof: {
      eyebrow: '06 / Verificación',
      title: 'Una beta privada verificada como flujo completo.',
      intro:
        'Relay V1 cerró con pruebas automatizadas, comprobaciones entre navegadores, verificación de despliegue, revisión responsive y validación de informes y PDF.',
      tests: [
        ['304', 'tests de Vitest'],
        ['209', 'tests unitarios'],
        ['95', 'tests de integración'],
        ['48', 'comprobaciones de Playwright'],
      ],
      summary:
        'Un espacio de trabajo controlado con datos sintéticos produjo 225 EUR de ingresos de comercio en Shopify, 55 EUR de gasto compatible en medios de pago, un MER de 4,09x, dos pedidos de Shopify y ROAS de 2x para Meta y Google. Los valores son sintéticos. El flujo que los procesó es real.',
    },
    boundary: {
      eyebrow: '07 / Límite V1',
      title: 'Una beta privada completa, no un SaaS terminado.',
      intro:
        'La V1 usa deliberadamente ingesta manual de CSV y memoria del navegador específica del dispositivo. No afirma sincronización en directo, colaboración en la nube ni análisis autónomo con IA.',
      items: [
        'No hay cuentas públicas ni persistencia de clientes en la nube.',
        'No hay OAuth en directo, actualización automática de proveedores ni persistencia de credenciales.',
        'No hay informes programados, envío por email ni colaboración multiusuario.',
        'No hay memoria local cifrada ni controles duraderos contra abuso público.',
        'La salida de PDF nativa del navegador sigue siendo propiedad del navegador.',
      ],
    },
    final: {
      title: 'Un reporting más rápido importa cuando la respuesta sigue siendo fiable.',
      description: 'Relay une estrategia de producto, semántica de datos, UX e ingeniería en un flujo de reporting defendible desde la fuente de datos hasta el informe de cliente.',
      github: 'Ver repositorio en GitHub',
      back: 'Volver a casos de estudio',
    },
  },
}

function Section({
  id,
  eyebrow,
  title,
  children,
  inverse = false,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
  inverse?: boolean
}) {
  return (
    <section id={id} className={`${styles.section} ${inverse ? styles.sectionInverse : ''}`} aria-labelledby={`${id}-heading`}>
      <div className={styles.container}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={`${id}-heading`}>{title}</h2>
        </header>
        {children}
      </div>
    </section>
  )
}

export default function RelayCaseStudyPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const content = copy[locale]
  const uiCopy = getSiteCopy(locale).caseStudiesUi
  const systemLabels = locale === 'es'
    ? {
        overview: 'Resumen del sistema Relay',
        source: 'DATOS DE ORIGEN',
        canonical: 'DATOS CANÓNICOS',
        evidence: 'procedencia · semántica · completitud',
      }
    : {
        overview: 'Relay system overview',
        source: 'SOURCE DATA',
        canonical: 'CANONICAL DATA',
        evidence: 'provenance · semantics · completeness',
      }

  useCaseStudySetup()

  return (
    <>
      <Header locale={locale} />
      <main
        id="main-content"
        className={`case-study-page-new case-study-page-new--relay case-study-page-new--${content.presentationFamily} ${styles.page}`}
      >
        <section
          className={styles.hero}
          aria-labelledby="relay-title"
          data-case-study-hero
          data-presentation-family={content.presentationFamily}
        >
          <div className={styles.heroNavigation}>
            <div className={styles.container}>
              <Link
                href={localizePath('/case-studies', locale)}
                className={styles.back}
                data-case-study-hero-back
              >
                <span aria-hidden="true">←</span>
                <span>{uiCopy.backToCaseStudies}</span>
              </Link>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.caseStudyLabel} data-case-study-hero-label>
                  {uiCopy.caseStudyBadge}
                </p>
                <p className={styles.eyebrow}>{content.eyebrow}</p>
                <h1 id="relay-title">{content.title}</h1>
                <p className={styles.heroSubtitle} data-case-study-hero-tagline>
                  {content.subtitle}
                </p>
                <p className={styles.heroDescription}>{content.description}</p>
                <div className={styles.heroMeta} data-case-study-hero-meta>
                  <p className={styles.status}>{content.status}</p>
                  <a href={githubUrl} target="_blank" rel="noreferrer" className={styles.primaryAction}>
                    {content.github} <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <div className={styles.tags} aria-label={content.stackLabel}>
                  {content.stack.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
              <div
                className={styles.evidencePanel}
                aria-label={systemLabels.overview}
                data-case-study-hero-evidence
              >
                <p className={styles.panelLabel}>{systemLabels.source}</p>
                <div className={styles.sources}>
                  <span>Shopify</span><span>Meta Ads</span><span>Google Ads</span>
                </div>
                <div className={styles.flowLine} aria-hidden="true" />
                <div className={styles.canonical}>
                  <span>{systemLabels.canonical}</span>
                  <strong>Data Health</strong>
                  <small>{systemLabels.evidence}</small>
                </div>
                <div className={styles.flowLine} aria-hidden="true" />
                <div className={styles.outputs}>
                  <span>KPI engine</span><span>Change intelligence</span><span>Report</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CaseStudyMiniNav ariaLabel={content.navLabel} items={content.nav} />

        <CaseStudySnapshot
          locale={locale}
          contextHref="#problem"
          solutionHref="#system"
        />

        <Section id="problem" {...content.problem}>
          <div className={styles.prose}>
            {content.problem.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </Section>

        <Section id="principle" {...content.principle} inverse>
          <ul className={styles.principleList}>
            {content.principle.items.map((item, index) => (
              <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>
            ))}
          </ul>
        </Section>

        <Section id="system" {...content.system}>
          <p className={styles.intro}>{content.system.intro}</p>
          <ol className={styles.systemFlow}>
            {content.system.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}
          </ol>
        </Section>

        <Section id="data-health" {...content.health} inverse>
          <p className={styles.intro}>{content.health.intro}</p>
          <div className={styles.healthGrid}>
            <div>
              <p className={styles.panelLabel}>CHECKS</p>
              <ul className={styles.checkList}>{content.health.checks.map((check) => <li key={check}>{check}</li>)}</ul>
            </div>
            <div>
              <p className={styles.panelLabel}>WORKSPACE STATE</p>
              <div className={styles.stateList}>{content.health.states.map((state, index) => <p key={state}><span>{String(index + 1).padStart(2, '0')}</span>{state}</p>)}</div>
            </div>
          </div>
        </Section>

        <Section id="intelligence" {...content.intelligence}>
          <div className={styles.prose}>
            {content.intelligence.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className={styles.decisionCards}>
            {content.intelligence.cards.map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="proof" {...content.proof} inverse>
          <p className={styles.intro}>{content.proof.intro}</p>
          <div className={styles.proofGrid}>
            {content.proof.tests.map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}
          </div>
          <p className={styles.proofSummary}>{content.proof.summary}</p>
        </Section>

        <Section id="boundary" {...content.boundary}>
          <p className={styles.intro}>{content.boundary.intro}</p>
          <ul className={styles.boundaryList}>{content.boundary.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </Section>

        <section className={styles.final} aria-labelledby="relay-final-heading">
          <div className={styles.container}>
            <p className={styles.eyebrow}>Relay</p>
            <h2 id="relay-final-heading">{content.final.title}</h2>
            <p>{content.final.description}</p>
            <div className={styles.finalActions}>
              <a href={githubUrl} target="_blank" rel="noreferrer" className={styles.primaryAction}>{content.final.github} <span aria-hidden="true">↗</span></a>
              <Link href={localizePath('/case-studies', locale)} className={styles.secondaryAction}>{content.final.back} <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
      </main>
      <CaseStudyNext currentHref="/case-studies/relay" locale={locale} accentColor="var(--accent)" />
      <Footer locale={locale} />
    </>
  )
}
