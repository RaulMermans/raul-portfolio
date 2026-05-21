'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import { useCaseStudySetup } from '@/hooks'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'

const githubUrl = 'https://github.com/RaulMermans/website-auditor'

const content = {
  en: {
    back: 'Back to Case Studies',
    eyebrow: 'AI Systems / Audit Workflow',
    heroTitle: 'Website Audit Agent',
    heroSubtitle:
      'An evidence-backed website audit workflow that turns public websites into structured UX, SEO, performance, content, and prospect-intelligence reports.',
    heroDescription:
      'The system captures public website evidence, stores page snapshots, applies deterministic scoring, and then lets a bounded LLM layer synthesize accepted findings into internal acquisition intelligence.',
    heroCTAGithub: 'View GitHub →',
    heroCTAHow: 'How it works',
    heroFigcaption: 'Representative preview. Not a live audit result.',
    heroFigAriaLabel: 'Website Audit Agent representative report preview',
    tags: ['Rule-first audit engine', 'Browser-first capture', 'Bounded LLM synthesis', 'Private internal tool'],
    nav: [
      ['Overview', '#overview'],
      ['Workflow', '#workflow'],
      ['Evidence', '#evidence'],
      ['AI Layer', '#agentic-layer'],
      ['Report', '#report-surface'],
      ['Boundaries', '#boundaries'],
    ] as const,
    navAriaLabel: 'Website Audit Agent page sections',
    overviewEyebrow: 'Overview',
    overviewH2: 'The audit truth is deterministic. The AI is interpretive.',
    overviewP:
      'This is not a free-form audit chatbot. The model does not create findings, score categories, invent metrics, or turn weak signals into measured facts. The LLM layer only synthesizes accepted evidence, which makes the workflow more credible for internal prospecting.',
    overviewCards: [
      {
        title: 'Capture evidence first',
        description:
          'The workflow starts with public website evidence, not model speculation. Rendered capture is attempted first, with static public evidence as fallback.',
      },
      {
        title: 'Score with rules',
        description:
          'Findings and category scores are produced deterministically from captured evidence before any synthesis layer is involved.',
      },
      {
        title: 'Interpret after acceptance',
        description:
          'Gemini and the Prospect Audit Agent receive accepted findings only, then translate them into useful internal acquisition intelligence.',
      },
    ],
    workflowEyebrow: 'Workflow',
    workflowH2: 'Controlled pipeline from public URL to private report',
    workflowP:
      'The architecture separates capture, persistence, scoring, synthesis, and report assembly so each stage has a clear owner and failure mode.',
    workflowAriaLabel: 'Website Audit Agent workflow',
    workflowStages: [
      {
        title: 'URL Intake',
        description: 'A user submits a public website URL.',
      },
      {
        title: 'Browser / Static Capture',
        description: 'Rendered evidence is captured first, then static public evidence is used if rendering fails or is blocked.',
      },
      {
        title: 'Evidence Store',
        description: 'Snapshots and page evidence are persisted for the run.',
      },
      {
        title: 'Deterministic Scoring',
        description: 'Rules generate findings and category scores.',
      },
      {
        title: 'Bounded AI Synthesis',
        description: 'Gemini and the Prospect Audit Agent summarize only accepted findings.',
      },
      {
        title: 'Internal Report',
        description: 'The output becomes private acquisition intelligence.',
      },
    ],
    evidenceEyebrow: 'Evidence model',
    evidenceH2: 'Every claim needs an evidence status',
    evidenceP:
      'The system can interpret, but it must not pretend inference is measurement. Evidence labels make that boundary visible inside the report.',
    evidenceCards: [
      {
        title: 'Measured',
        description: 'Directly captured or computed.',
      },
      {
        title: 'Observed',
        description: 'Visible in captured page evidence.',
      },
      {
        title: 'Inferred',
        description: 'Interpretation from available signals; never presented as measured truth.',
      },
    ],
    agentEyebrow: 'Agentic layer',
    agentH2: 'The AI is downstream by design.',
    agentP:
      'This is a hybrid workflow-agent system. The deterministic shell owns capture, scoring, persistence, status, and report assembly. The LLM layer owns summary, prioritization, explanation, and prospect intelligence. The Prospect Audit Agent does not browse freely, rewrite findings, or create scores.',
    agentDiagram: ['Deterministic Audit Engine', 'Accepted Findings', 'Prospect Audit Agent', 'Internal Intelligence'],
    reportEyebrow: 'Report surface',
    reportH2: 'A private audit report built from accepted evidence',
    reportP:
      'The report surface is intentionally internal. It presents scores, confidence, evidence labels, and top findings without exposing the private Vercel deployment as a public demo.',
    safetyEyebrow: 'Safety / Access boundary',
    safetyH2: 'Public repository. Private operating surface.',
    safetyP:
      'The project is public for portfolio and reference purposes, while the operating surface stays private behind an internal login and protected job endpoint.',
    safetyItems: [
      'Private Vercel deployment',
      'Internal login and access gate',
      'Worker-secret protected job endpoint',
      'Public website evidence only',
      'No anti-bot bypass',
      'No public live demo',
    ],
    resultEyebrow: 'Result',
    resultH2: 'A useful AI system because it stays inside its lane.',
    resultP:
      'The value is not broad autonomy. It is a repeatable audit workflow where deterministic truth and interpretive synthesis remain separate.',
    resultCards: [
      {
        title: 'Repeatable audit pipeline',
        description: 'A public URL moves through capture, evidence storage, scoring, synthesis, and reporting with explicit stage boundaries.',
      },
      {
        title: 'Controlled AI synthesis',
        description: 'The LLM summarizes accepted findings and prospect context without creating audit truth.',
      },
      {
        title: 'Evidence discipline',
        description: 'Measured, observed, and inferred claims stay distinct throughout the report.',
      },
      {
        title: 'Portfolio-safe architecture',
        description: 'The repo can be shown publicly while the operating surface and generated reports remain private.',
      },
    ],
    stackEyebrow: 'Stack',
    stackH2: 'Built as a production-oriented prototype',
    stackP:
      'The stack is practical: Next.js for the app surface, Postgres and pg-boss for durable runs, Playwright for capture, Gemini for bounded synthesis, and a worker endpoint protected separately from the internal session gate.',
    stackAriaLabel: 'Website Audit Agent technology stack',
    stackItems: [
      'Next.js',
      'TypeScript',
      'Postgres',
      'pg-boss',
      'Playwright',
      'Gemini',
      'Vercel',
      'Deterministic scoring',
      'Evidence labels',
      'Private worker endpoint',
    ],
    boundariesEyebrow: 'Boundaries / Future Improvements',
    boundariesH2: 'These are design boundaries, not excuses.',
    boundariesP:
      'The current scope is deliberately narrow so the case study does not overclaim what the system does.',
    boundaries: [
      'Not a public SaaS.',
      'No public live demo.',
      'Prospect Intelligence is internal guidance, not audit truth.',
      'Static-only reports intentionally exclude visual/mobile/above-the-fold scoring.',
      'AI synthesis depends on accepted findings.',
      'Future work includes evals, model comparison, observability, and real audit examples.',
    ],
    resultCTAGithub: 'View GitHub →',
    resultCTAWorkflow: 'Review workflow',
    report: {
      title: 'Website Audit Agent',
      status: 'Complete',
      capture: 'Rendered browser',
      confidence: 'High',
      scores: [
        ['UX', '82'],
        ['SEO', '74'],
        ['Performance', '68'],
        ['Content', '79'],
        ['Accessibility', '71'],
      ] as const,
      findingLabel: 'Top finding',
      finding: 'Primary CTA is visible but not consistently reinforced above the fold.',
      evidenceLabel: 'Evidence label',
      evidence: 'Observed',
    },
  },
  es: {
    back: 'Volver a casos',
    eyebrow: 'Sistemas de IA / Flujo de auditoría',
    heroTitle: 'Website Audit Agent',
    heroSubtitle:
      'Un flujo de auditoría web basado en evidencia que convierte sitios públicos en informes estructurados de UX, SEO, rendimiento, contenido e inteligencia comercial.',
    heroDescription:
      'El sistema captura evidencia pública del sitio, almacena snapshots, aplica scoring determinista y después permite que una capa LLM acotada sintetice los hallazgos aceptados en inteligencia interna de adquisición.',
    heroCTAGithub: 'Ver GitHub →',
    heroCTAHow: 'Cómo funciona',
    heroFigcaption: 'Vista representativa. No es un resultado de auditoría en vivo.',
    heroFigAriaLabel: 'Vista representativa del informe de Website Audit Agent',
    tags: ['Motor rule-first', 'Captura browser-first', 'Síntesis LLM acotada', 'Herramienta interna privada'],
    nav: [
      ['Resumen', '#overview'],
      ['Flujo', '#workflow'],
      ['Evidencia', '#evidence'],
      ['Capa IA', '#agentic-layer'],
      ['Informe', '#report-surface'],
      ['Límites', '#boundaries'],
    ] as const,
    navAriaLabel: 'Secciones de la página Website Audit Agent',
    overviewEyebrow: 'Resumen',
    overviewH2: 'La verdad de auditoría es determinista. La IA interpreta.',
    overviewP:
      'No es un chatbot de auditoría de forma libre. El modelo no crea hallazgos, no puntúa categorías, no inventa métricas y no convierte señales débiles en hechos medidos. La capa LLM solo sintetiza evidencia aceptada, lo que hace el flujo más creíble para prospección interna.',
    overviewCards: [
      {
        title: 'Primero captura evidencia',
        description:
          'El flujo parte de evidencia pública del sitio, no de especulación del modelo. Primero intenta captura renderizada y usa evidencia pública estática como fallback.',
      },
      {
        title: 'Puntúa con reglas',
        description:
          'Los hallazgos y scores de categoría se producen de forma determinista desde la evidencia capturada antes de cualquier síntesis.',
      },
      {
        title: 'Interpreta después',
        description:
          'Gemini y el Prospect Audit Agent reciben solo hallazgos aceptados y los traducen en inteligencia interna de adquisición.',
      },
    ],
    workflowEyebrow: 'Flujo',
    workflowH2: 'Pipeline controlado desde URL pública hasta informe privado',
    workflowP:
      'La arquitectura separa captura, persistencia, scoring, síntesis y ensamblaje del informe para que cada etapa tenga un dueño y un modo de fallo claro.',
    workflowAriaLabel: 'Flujo de Website Audit Agent',
    workflowStages: [
      {
        title: 'URL Intake',
        description: 'El usuario envía la URL de un sitio público.',
      },
      {
        title: 'Captura browser / estática',
        description: 'Primero se captura evidencia renderizada y, si falla o está bloqueada, se usa evidencia pública estática.',
      },
      {
        title: 'Evidence Store',
        description: 'Los snapshots y la evidencia de página se persisten para la ejecución.',
      },
      {
        title: 'Scoring determinista',
        description: 'Las reglas generan hallazgos y scores de categoría.',
      },
      {
        title: 'Síntesis IA acotada',
        description: 'Gemini y el Prospect Audit Agent resumen solo hallazgos aceptados.',
      },
      {
        title: 'Informe interno',
        description: 'El output se convierte en inteligencia privada de adquisición.',
      },
    ],
    evidenceEyebrow: 'Modelo de evidencia',
    evidenceH2: 'Cada afirmación necesita un estado de evidencia',
    evidenceP:
      'El sistema puede interpretar, pero no debe presentar una inferencia como medición. Las etiquetas de evidencia hacen visible ese límite dentro del informe.',
    evidenceCards: [
      {
        title: 'Measured',
        description: 'Capturado o calculado directamente.',
      },
      {
        title: 'Observed',
        description: 'Visible en la evidencia capturada de la página.',
      },
      {
        title: 'Inferred',
        description: 'Interpretación a partir de señales disponibles; nunca se presenta como verdad medida.',
      },
    ],
    agentEyebrow: 'Capa agéntica',
    agentH2: 'La IA está aguas abajo por diseño.',
    agentP:
      'Es un sistema híbrido workflow-agent. El shell determinista controla captura, scoring, persistencia, estado y ensamblaje del informe. La capa LLM controla resumen, priorización, explicación e inteligencia comercial. El Prospect Audit Agent no navega libremente, no reescribe hallazgos y no crea scores.',
    agentDiagram: ['Motor determinista de auditoría', 'Hallazgos aceptados', 'Prospect Audit Agent', 'Inteligencia interna'],
    reportEyebrow: 'Informe',
    reportH2: 'Un informe privado construido desde evidencia aceptada',
    reportP:
      'La superficie de informe es deliberadamente interna. Presenta scores, confianza, etiquetas de evidencia y hallazgos principales sin exponer el despliegue privado de Vercel como demo pública.',
    safetyEyebrow: 'Seguridad / Límite de acceso',
    safetyH2: 'Repositorio público. Superficie operativa privada.',
    safetyP:
      'El proyecto es público para portfolio y referencia, mientras que la superficie operativa permanece privada detrás de login interno y endpoint de trabajo protegido.',
    safetyItems: [
      'Despliegue privado en Vercel',
      'Login interno y access gate',
      'Endpoint de job protegido con worker secret',
      'Solo evidencia pública del sitio',
      'Sin bypass anti-bot',
      'Sin demo pública en vivo',
    ],
    resultEyebrow: 'Resultado',
    resultH2: 'Un sistema de IA útil porque se mantiene dentro de sus límites.',
    resultP:
      'El valor no está en una autonomía amplia. Está en un flujo repetible donde la verdad determinista y la síntesis interpretativa permanecen separadas.',
    resultCards: [
      {
        title: 'Pipeline repetible',
        description: 'Una URL pública pasa por captura, almacenamiento de evidencia, scoring, síntesis e informe con fronteras explícitas.',
      },
      {
        title: 'Síntesis IA controlada',
        description: 'El LLM resume hallazgos aceptados y contexto comercial sin crear verdad de auditoría.',
      },
      {
        title: 'Disciplina de evidencia',
        description: 'Las afirmaciones medidas, observadas e inferidas se mantienen separadas durante todo el informe.',
      },
      {
        title: 'Arquitectura segura para portfolio',
        description: 'El repositorio puede mostrarse públicamente mientras la superficie operativa y los informes generados siguen privados.',
      },
    ],
    stackEyebrow: 'Stack',
    stackH2: 'Construido como prototipo orientado a producción',
    stackP:
      'El stack es práctico: Next.js para la superficie de app, Postgres y pg-boss para ejecuciones durables, Playwright para captura, Gemini para síntesis acotada y un endpoint worker protegido de forma separada.',
    stackAriaLabel: 'Stack tecnológico de Website Audit Agent',
    stackItems: [
      'Next.js',
      'TypeScript',
      'Postgres',
      'pg-boss',
      'Playwright',
      'Gemini',
      'Vercel',
      'Scoring determinista',
      'Etiquetas de evidencia',
      'Endpoint worker privado',
    ],
    boundariesEyebrow: 'Límites / Mejoras futuras',
    boundariesH2: 'Son límites de diseño, no excusas.',
    boundariesP:
      'El alcance actual es deliberadamente estrecho para que el caso de estudio no sobreprometa lo que hace el sistema.',
    boundaries: [
      'No es un SaaS público.',
      'No hay demo pública en vivo.',
      'Prospect Intelligence es guía interna, no verdad de auditoría.',
      'Los informes static-only excluyen intencionalmente scoring visual/mobile/above-the-fold.',
      'La síntesis IA depende de hallazgos aceptados.',
      'El trabajo futuro incluye evals, comparación de modelos, observabilidad y ejemplos reales de auditoría.',
    ],
    resultCTAGithub: 'Ver GitHub →',
    resultCTAWorkflow: 'Revisar flujo',
    report: {
      title: 'Website Audit Agent',
      status: 'Complete',
      capture: 'Rendered browser',
      confidence: 'High',
      scores: [
        ['UX', '82'],
        ['SEO', '74'],
        ['Performance', '68'],
        ['Content', '79'],
        ['Accessibility', '71'],
      ] as const,
      findingLabel: 'Top finding',
      finding: 'Primary CTA is visible but not consistently reinforced above the fold.',
      evidenceLabel: 'Evidence label',
      evidence: 'Observed',
    },
  },
}

type ReportText = typeof content.en.report

function AuditReportMockup({ text }: { text: ReportText }) {
  return (
    <div className="website-auditor-report">
      <div className="website-auditor-report__topline">
        <span>{text.title}</span>
        <strong>{text.status}</strong>
      </div>
      <div className="website-auditor-report__meta">
        <span>Capture: {text.capture}</span>
        <span>Evidence confidence: {text.confidence}</span>
      </div>
      <div className="website-auditor-report__scores" aria-label="Audit scores">
        {text.scores.map(([label, score]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{score}</strong>
          </article>
        ))}
      </div>
      <div className="website-auditor-report__finding">
        <span>{text.findingLabel}</span>
        <p>{text.finding}</p>
        <em>
          {text.evidenceLabel}: {text.evidence}
        </em>
      </div>
    </div>
  )
}

export default function WebsiteAuditorPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const t = content[locale]

  useCaseStudySetup()

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="case-study-page-new case-study-page-new--data-brief case-study-page-new--website-auditor">
        <section className="data-brief-hero website-auditor-hero" aria-labelledby="website-auditor-title">
          <div className="data-brief-hero__content">
            <Link href={localizePath('/case-studies', locale)} className="data-brief-back">
              {t.back}
            </Link>
            <p className="data-brief-eyebrow">{t.eyebrow}</p>
            <h1 id="website-auditor-title" className="data-brief-hero__title">
              {t.heroTitle}
            </h1>
            <p className="data-brief-hero__subtitle">{t.heroSubtitle}</p>
            <p className="data-brief-hero__description">{t.heroDescription}</p>
            <div className="data-brief-actions" aria-label="Project links">
              <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                {t.heroCTAGithub}
              </a>
              <a href="#workflow" className="data-brief-button">
                {t.heroCTAHow}
              </a>
            </div>
            <div className="data-brief-tags" aria-label="Project tags">
              {t.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <figure className="data-brief-hero__visual" aria-label={t.heroFigAriaLabel}>
            <AuditReportMockup text={t.report} />
            <figcaption>{t.heroFigcaption}</figcaption>
          </figure>
        </section>

        <nav className="data-brief-mini-nav website-auditor-mini-nav" aria-label={t.navAriaLabel}>
          {t.nav.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <section
          id="overview"
          className="data-brief-section data-brief-section--light data-brief-section--overview"
          aria-labelledby="website-auditor-overview"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.overviewEyebrow}</p>
              <h2 id="website-auditor-overview">{t.overviewH2}</h2>
              <p>{t.overviewP}</p>
            </div>
            <div className="data-brief-result-grid website-auditor-overview-grid">
              {t.overviewCards.map((card) => (
                <article key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="workflow"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="website-auditor-workflow"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.workflowEyebrow}</p>
              <h2 id="website-auditor-workflow">{t.workflowH2}</h2>
              <p>{t.workflowP}</p>
            </div>
            <div className="data-brief-flow website-auditor-flow" aria-label={t.workflowAriaLabel}>
              {t.workflowStages.map((stage) => (
                <span key={stage.title}>{stage.title}</span>
              ))}
            </div>
            <div className="data-brief-phase-grid website-auditor-stage-grid">
              {t.workflowStages.map((stage) => (
                <article key={stage.title} className="data-brief-phase-card">
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="evidence"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="website-auditor-evidence"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.evidenceEyebrow}</p>
              <h2 id="website-auditor-evidence">{t.evidenceH2}</h2>
              <p>{t.evidenceP}</p>
            </div>
            <div className="data-brief-refusal-grid website-auditor-evidence-grid">
              {t.evidenceCards.map((card) => (
                <article key={card.title} className="data-brief-refusal-card website-auditor-evidence-card">
                  <span>{card.title}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="agentic-layer"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="website-auditor-agent"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.agentEyebrow}</p>
              <h2 id="website-auditor-agent">{t.agentH2}</h2>
              <p>{t.agentP}</p>
            </div>
            <div className="website-auditor-truth-boundary" aria-label="Truth boundary">
              {t.agentDiagram.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section
          id="report-surface"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="website-auditor-report"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.reportEyebrow}</p>
              <h2 id="website-auditor-report">{t.reportH2}</h2>
              <p>{t.reportP}</p>
            </div>
            <figure className="data-brief-output-main website-auditor-report-surface">
              <AuditReportMockup text={t.report} />
              <figcaption>{t.heroFigcaption}</figcaption>
            </figure>
          </div>
        </section>

        <section
          id="safety"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="website-auditor-safety"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.safetyEyebrow}</p>
              <h2 id="website-auditor-safety">{t.safetyH2}</h2>
              <p>{t.safetyP}</p>
            </div>
            <div className="website-auditor-safety-grid">
              {t.safetyItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section
          id="result"
          className="data-brief-section data-brief-section--dark data-brief-section--result"
          aria-labelledby="website-auditor-result"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.resultEyebrow}</p>
              <h2 id="website-auditor-result">{t.resultH2}</h2>
              <p>{t.resultP}</p>
            </div>
            <div className="data-brief-result-grid website-auditor-result-grid">
              {t.resultCards.map((card) => (
                <article key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="stack"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="website-auditor-stack"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.stackEyebrow}</p>
              <h2 id="website-auditor-stack">{t.stackH2}</h2>
              <p>{t.stackP}</p>
            </div>
            <div className="data-brief-stack website-auditor-stack" aria-label={t.stackAriaLabel}>
              {t.stackItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section
          id="boundaries"
          className="data-brief-section data-brief-section--dark data-brief-section--result"
          aria-labelledby="website-auditor-boundaries"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.boundariesEyebrow}</p>
              <h2 id="website-auditor-boundaries">{t.boundariesH2}</h2>
              <p>{t.boundariesP}</p>
            </div>
            <div className="data-brief-boundary-panel website-auditor-boundaries-panel">
              <ul className="data-brief-list">
                {t.boundaries.map((boundary) => (
                  <li key={boundary}>{boundary}</li>
                ))}
              </ul>
              <div className="data-brief-actions">
                <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                  {t.resultCTAGithub}
                </a>
                <a href="#workflow" className="data-brief-button">
                  {t.resultCTAWorkflow}
                </a>
              </div>
            </div>
          </div>
        </section>

        <CaseStudyNext currentHref={pathname} accentColor="var(--accent)" locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
