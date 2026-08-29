'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyMiniNav from '@/components/case-studies/CaseStudyMiniNav'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import { useCaseStudySetup } from '@/hooks'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'
import styles from './RelayCaseStudy.module.css'

const githubUrl = 'https://github.com/RaulMermans/Relay'

export default function RelayCaseStudyPage() {
  const locale = getLocaleFromPath(usePathname())
  const isSpanish = locale === 'es'
  const t = isSpanish
    ? {
        back: 'Casos de estudio', eyebrow: 'Inteligencia de marketing / Producto de datos',
        subtitle: 'Un espacio de rendimiento construido sobre cifras fiables.',
        description: 'Relay convierte exportaciones de Meta Ads, Google Ads y Shopify en inteligencia de rendimiento validada, cambios explicables y un flujo de reporting preparado para clientes.',
        status: 'V1 completada / Beta privada protegida', github: 'Ver repositorio en GitHub',
        problem: 'Los informes de rendimiento son repetitivos. La confianza es el problema más difícil.',
        principle: 'Una métrica no debe parecer más cierta cuanto más se aleja de su fuente.',
        system: 'Un camino determinista desde los datos de origen hasta una decisión.',
        health: 'Antes de preguntar qué ocurrió, Relay comprueba si los datos pueden sostener una respuesta.',
        proof: 'Una beta privada verificada como flujo completo.',
        boundary: 'Una beta privada completa, no un SaaS terminado.',
        final: 'Un reporting más rápido importa cuando la respuesta sigue siendo fiable.',
      }
    : {
        back: 'Case studies', eyebrow: 'Marketing intelligence / Data product',
        subtitle: 'A performance workspace built around trustworthy numbers.',
        description: 'Relay turns Meta Ads, Google Ads, and Shopify exports into validated performance intelligence, explainable changes, and a client-ready reporting workflow.',
        status: 'V1 complete / Protected private beta', github: 'View GitHub repository',
        problem: 'Performance reports are repetitive. Trust is the harder problem.',
        principle: 'A metric should not become more certain as it moves further away from its source.',
        system: 'One deterministic path from source data to a decision.',
        health: 'Before asking what happened, Relay asks whether the data can support an answer.',
        proof: 'A private beta verified as a complete workflow.',
        boundary: 'A complete private beta, not a finished SaaS.',
        final: 'Faster reporting matters when the answer remains trustworthy.',
      }

  useCaseStudySetup()
  const nav = [['Problem', '#problem'], ['Principle', '#principle'], ['System', '#system'], ['Data Health', '#health'], ['Proof', '#proof'], ['V1 boundary', '#boundary']]

  return <>
    <Header locale={locale} />
    <main id="main-content" className={styles.page}>
      <section className={styles.hero} aria-labelledby="relay-title"><div className={styles.container}><div className={styles.heroGrid}>
        <div>
          <Link href={localizePath('/case-studies', locale)} className={styles.back}>← {t.back}</Link>
          <p className={styles.eyebrow}>{t.eyebrow}</p><h1 id="relay-title">Relay</h1>
          <p className={styles.subtitle}>{t.subtitle}</p><p className={styles.description}>{t.description}</p>
          <p className={styles.status}>{t.status}</p><a className={styles.primary} href={githubUrl} target="_blank" rel="noreferrer">{t.github} ↗</a>
          <div className={styles.tags}>{['Next.js', 'React', 'TypeScript', 'Zod', 'Vitest', 'Playwright', 'Vercel'].map((item) => <span key={item}>{item}</span>)}</div>
        </div>
        <div className={styles.diagram} aria-label="Relay system overview"><p>Source data</p><div><span>Shopify</span><span>Meta Ads</span><span>Google Ads</span></div><i /><strong>Data Health</strong><small>provenance · semantics · completeness</small><i /><div><span>KPI engine</span><span>Change intelligence</span><span>Report</span></div></div>
      </div></div></section>
      <CaseStudyMiniNav ariaLabel="Relay case study sections" items={nav} />
      <Section id="problem" label="01 / Problem" title={t.problem}><p>A reporting cycle means exporting files, cleaning fields, reconciling definitions, calculating KPIs, locating movement, writing commentary, and rebuilding the same report again. Meta, Google, and Shopify each describe different parts of performance. Treating their numbers as interchangeable creates false certainty.</p></Section>
      <Section id="principle" label="02 / Product principle" title={t.principle} inverse><ul className={styles.numberList}>{['Shopify remains the source for commerce revenue, orders, AOV, and MER.', 'Meta and Google retain provider-specific spend, conversions, attributed revenue, CPA, and ROAS.', 'Provider-attributed revenue is never combined and presented as ecommerce revenue.', 'Missing values are not silently turned into zero.', 'Data quality is evaluated before interpretation.', 'Narrative is composed from validated structured facts.'].map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, '0')}</span>{item}</li>)}</ul></Section>
      <Section id="system" label="03 / System" title={t.system}><p>The same normalized facts power the dashboard, report, and narrative. The interface does not recalculate business logic, and the reporting layer does not reinterpret the dashboard.</p><ol className={styles.flow}>{['Source exports', 'Detection and mapping', 'Canonical data', 'Data Health', 'KPI engine', 'Change Intelligence', 'Narrative', 'Dashboard and report'].map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, '0')}</span>{item}</li>)}</ol></Section>
      <Section id="health" label="04 / Data Health" title={t.health} inverse><p>Relay checks reporting-period coverage, source completeness, currency compatibility, mapping integrity, provenance, duplicate evidence, and revenue semantics. Blocking problems stop downstream analysis. Warnings remain visible.</p><div className={styles.states}>{['Healthy', 'Review required', 'Blocked'].map((item, i) => <div key={item}><span>{String(i + 1).padStart(2, '0')}</span>{item}</div>)}</div></Section>
      <Section id="proof" label="05 / Verification" title={t.proof} inverse><p>Relay V1 closed with automated tests, cross-browser checks, deployment verification, responsive review, and report/PDF validation.</p><div className={styles.proof}>{[['304', 'Vitest tests'], ['209', 'Unit tests'], ['95', 'Integration tests'], ['48', 'Playwright checks']].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><p>A controlled synthetic workspace produced EUR 225 in Shopify commerce revenue, EUR 55 in compatible paid-media spend, a 4.09x MER, two Shopify orders, and 2x ROAS for Meta and Google. The values are synthetic. The workflow that processed them is real.</p></Section>
      <Section id="boundary" label="06 / V1 boundary" title={t.boundary}><p>V1 deliberately uses manual CSV ingestion and device-specific browser memory. It does not claim live synchronization, cloud collaboration, or autonomous AI analysis.</p><ul className={styles.boundary}>{['No public accounts or cloud client persistence.', 'No live OAuth, automatic provider refresh, or credential persistence.', 'No scheduled reports, email delivery, or multi-user collaboration.', 'No encrypted local memory or durable public abuse controls.'].map((item) => <li key={item}>{item}</li>)}</ul></Section>
      <section className={styles.final}><div className={styles.container}><p className={styles.eyebrow}>Relay</p><h2>{t.final}</h2><p>Source data → trustworthy facts → defensible reporting.</p><a className={styles.primary} href={githubUrl} target="_blank" rel="noreferrer">{t.github} ↗</a></div></section>
    </main>
    <CaseStudyNext currentHref="/case-studies/relay" locale={locale} accentColor="var(--accent)" /><Footer locale={locale} />
  </>
}

function Section({ id, label, title, children, inverse = false }: { id: string; label: string; title: string; children: React.ReactNode; inverse?: boolean }) {
  return <section id={id} className={`${styles.section} ${inverse ? styles.inverse : ''}`}><div className={styles.container}><p className={styles.eyebrow}>{label}</p><h2>{title}</h2><div className={styles.copy}>{children}</div></div></section>
}
