'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import { CaseStudySnapshot } from '@/components/case-studies/CommercialCaseStudySections'
import { useCaseStudySetup } from '@/hooks'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'

const repositoryUrl = 'https://github.com/RaulMermans/BlogAgent'

const content = {
  en: {
    back: 'Back to case studies',
    eyebrow: 'AI Systems & Agents',
    subtitle:
      'An AI editorial workflow that turns a topic into a structured, researched, copy-ready blog draft with human review before publication.',
    description:
      'BlogAgent combines bounded LLM agents with deterministic contracts for research, candidate validation, drafting, review, and final output control.',
    repository: 'View repository',
    nav: [
      ['Problem', '#problem'],
      ['Goal', '#goal'],
      ['Architecture', '#architecture'],
      ['Components', '#components'],
      ['Design lesson', '#failure'],
      ['Safety', '#safety'],
      ['Evaluation', '#evaluation'],
      ['Result', '#result'],
      ['Limitations', '#limitations'],
      ['Learning', '#learning'],
    ],
    snapshot: [
      { label: 'Type', value: 'Internal editorial tool' },
      { label: 'Role', value: 'Architecture, product, UX, backend, evaluation' },
      { label: 'Stack', value: 'Python, FastAPI, LLM workflow, deterministic validation, mock/live providers' },
      { label: 'Status', value: 'Public repo / portfolio case study' },
      { label: 'Year', value: '2026' },
    ],
    problemEyebrow: '01 / Problem',
    problemTitle: 'Fluent text is not the same as a reliable draft',
    problemCopy: [
      'Most AI blog generators produce fluent text, but they do not prove that sources exist, recommendations are real entities, or the article respects the count promised in its title. In a “5 best X” post, one small failure - an author confused with a product, six items under a five-item headline, or an unsupported citation - turns a useful draft into unreliable content.',
      'BlogAgent addresses that gap by controlling the workflow between research, candidates, drafting, review, and final output, rather than treating writing as a single model response.',
    ],
    goalEyebrow: '02 / Product goal',
    goalTitle: 'Copy-ready, not auto-published',
    goalCopy:
      'The goal was not to create an autopublishing tool. BlogAgent is an internal system for producing copy-ready drafts: text I can move into my blog editor, review, adjust lightly, and publish manually.',
    goalDoes: 'What it does',
    goalDoesItems: ['Accelerates research and first drafts', 'Keeps source and candidate constraints visible', 'Produces structured output for fast review'],
    goalDoesNot: 'What it does not do',
    goalDoesNotItems: ['Post or publish', 'Schedule or send content', 'Remove the need for editorial judgment'],
    goalNote: 'The value is speed plus evidence and control, not hands-free automation.',
    architectureEyebrow: '03 / Architecture decision',
    architectureTitle: 'Workflow first, agents where they add value',
    architectureCopy:
      'The architecture combines deterministic steps with bounded LLM agents. Code controls sequence, limits, contracts, validation, and final decisions. Models support planning, synthesis, drafting, and review, but they do not freely decide what counts as valid.',
    flow: ['Topic', 'Query Contract', 'Research / Search', 'Source Quality', 'Candidate Ledger', 'CandidatePack', 'Writer', 'Reviewer', 'Revision / Repair', 'Final Answer Contract', 'Copy-ready Draft'],
    componentsEyebrow: '04 / Core components',
    componentsTitle: 'Contracts around the writing work',
    components: [
      {
        title: 'Query Contract',
        description: 'Locks task type, domain, requested count, answer entity type, and safety constraints before drafting.',
      },
      {
        title: 'Candidate Ledger',
        description: 'Extracts possible entities and rejects fragments, bylines, dates, source titles, brand clusters, and malformed candidates.',
      },
      {
        title: 'CandidatePack',
        description: 'Locks the exact recommendation set the writer is allowed to use.',
      },
      {
        title: 'Writer Agent',
        description: 'Drafts the article inside the locked structure and selected tone profile.',
      },
      {
        title: 'Reviewer / Revision Plan',
        description: 'Checks contract compliance, candidate fidelity, and whether a rewrite or targeted repair is required.',
      },
      {
        title: 'Final Answer Contract',
        description: 'Blocks count mismatches, invalid candidates, unsafe outputs, and incoherent workflow states.',
      },
    ],
    failureEyebrow: '05 / Design lesson',
    failureTitle: 'The “Paul Altieri” failure',
    failureCopy:
      'During testing, a watch recommendation article included “Paul Altieri” as one of the recommended watches. He was a person associated with a source, not a watch. The failure exposed the central risk in recommendation workflows: the writer can only be as reliable as the candidate set it receives.',
    failureFix:
      'The fix was not another prompt. It was a candidate cleanliness gate, a CandidatePack quality report, reviewer veto power, and a final contract that prevents polished prose from passing when the underlying candidate set is invalid.',
    safetyEyebrow: '06 / Safety and control',
    safetyTitle: 'Conservative by design',
    safetyCopy: 'BlogAgent keeps external effects and high-risk claims outside the autonomous workflow.',
    safetyItems: [
      'No external side effects',
      'Mock mode by default',
      'Live providers are opt-in',
      'API keys stay in environment variables',
      'High-risk finance topics degrade to evidence reports',
      'Human review is required before publication',
    ],
    evaluationEyebrow: '07 / Evaluation',
    evaluationTitle: 'Test the workflow, not a claim of perfect writing',
    evaluationStats: [
      ['1,100+', 'tests in mock mode'],
      ['13 / 13', 'workflow evals'],
      ['5', 'manual QA topics'],
    ],
    evaluationTopicsLabel: 'Manual QA topics',
    evaluationTopics: [
      'Affordable luxury watches',
      'Summer perfumes',
      'AI tools for students',
      'How to choose a summer perfume',
      'Energy stocks safety fallback',
    ],
    evaluationNote:
      'The evals validate workflow behavior, contracts, and safety boundaries in mock mode. Live search and model quality remain source-dependent and require human review.',
    resultEyebrow: '08 / Result',
    resultTitle: 'A controlled drafting system',
    resultCopy:
      'The result is a practical internal AI workflow: not an autonomous writer, but a controlled drafting system that creates structured, source-aware, copy-ready drafts with enough traceability to review them quickly.',
    outcomes: [
      'Faster first drafts',
      'Better structure',
      'Clearer recommendation constraints',
      'Safer handling of finance and high-risk content',
      'Debug trace for review',
      'Portfolio-ready example of bounded agentic workflow design',
    ],
    limitationsEyebrow: '09 / Limitations',
    limitationsTitle: 'What remains deliberately unresolved',
    limitations: [
      'Mock-first by default',
      'Source extraction is heuristic',
      'Candidate extraction depends on search quality',
      'One revision plus one polish pass',
      'No persistence layer',
      'Human review still required',
      'Not designed as public SaaS',
    ],
    learningEyebrow: '10 / What I learned',
    learningTitle: 'Most writing failures were workflow failures',
    learningCopy:
      'The main lesson was that most “AI writing quality” failures were actually identity, counting, validation, and handoff problems. Once the system locked candidates, audited sections, gave the reviewer veto power, and treated the final contract as the source of truth, the agent became more reliable without becoming more autonomous.',
    closingCta: 'Review the repository',
  },
  es: {
    back: 'Volver a casos',
    eyebrow: 'Sistema de IA y agentes',
    subtitle:
      'Un flujo editorial con IA que convierte un tema en un borrador de blog estructurado, investigado y listo para copiar, con revisión humana antes de publicar.',
    description:
      'BlogAgent combina agentes LLM acotados con contratos deterministas para investigación, validación de candidatos, redacción, revisión y control de la salida final.',
    repository: 'Ver repositorio',
    nav: [
      ['Problema', '#problem'],
      ['Objetivo', '#goal'],
      ['Arquitectura', '#architecture'],
      ['Componentes', '#components'],
      ['Lección', '#failure'],
      ['Seguridad', '#safety'],
      ['Evaluación', '#evaluation'],
      ['Resultado', '#result'],
      ['Límites', '#limitations'],
      ['Aprendizaje', '#learning'],
    ],
    snapshot: [
      { label: 'Tipo', value: 'Herramienta editorial interna' },
      { label: 'Rol', value: 'Arquitectura, producto, UX, backend, evaluación' },
      { label: 'Stack', value: 'Python, FastAPI, LLM workflow, deterministic validation, mock/live providers' },
      { label: 'Estado', value: 'Public repo / portfolio case study' },
      { label: 'Año', value: '2026' },
    ],
    problemEyebrow: '01 / Problema',
    problemTitle: 'Texto fluido no significa borrador fiable',
    problemCopy: [
      'La mayoría de generadores de blogs con IA producen texto fluido, pero no demuestran si las fuentes existen, si las recomendaciones son entidades reales o si el artículo respeta el número prometido en el título. En un post tipo “5 mejores X”, un fallo pequeño - un autor confundido con un producto, una lista con 6 elementos cuando promete 5, o una cita sin soporte - convierte un borrador útil en contenido poco fiable.',
      'BlogAgent nace para resolver ese hueco: no solo escribir, sino controlar el flujo entre investigación, candidatos, redacción, revisión y salida final.',
    ],
    goalEyebrow: '02 / Objetivo de producto',
    goalTitle: 'Copy-ready, no autopublicado',
    goalCopy:
      'El objetivo no era crear una herramienta de autopublicación. BlogAgent está diseñado como una herramienta interna para generar borradores copy-ready: textos que puedo copiar en mi editor de blog, revisar, ajustar ligeramente y publicar manualmente.',
    goalDoes: 'Qué hace',
    goalDoesItems: ['Acelera investigación y primeros borradores', 'Mantiene visibles fuentes y restricciones', 'Entrega una estructura rápida de revisar'],
    goalDoesNot: 'Qué no hace',
    goalDoesNotItems: ['Publicar contenido', 'Programar o enviar', 'Eliminar el criterio editorial'],
    goalNote: 'El valor es velocidad más evidencia y control, no automatización sin supervisión.',
    architectureEyebrow: '03 / Decisión de arquitectura',
    architectureTitle: 'Workflow primero, agentes donde aportan valor',
    architectureCopy:
      'La arquitectura combina pasos deterministas con agentes LLM acotados. El código controla el orden, los límites, los contratos, la validación y las decisiones finales. Los modelos se usan para planificación, síntesis, redacción y revisión, pero no para decidir libremente qué cuenta como válido.',
    flow: ['Tema', 'Query Contract', 'Investigación / Search', 'Calidad de fuentes', 'Candidate Ledger', 'CandidatePack', 'Writer', 'Reviewer', 'Revisión / Repair', 'Final Answer Contract', 'Borrador copy-ready'],
    componentsEyebrow: '04 / Componentes principales',
    componentsTitle: 'Contratos alrededor de la redacción',
    components: [
      {
        title: 'Query Contract',
        description: 'Fija tipo de tarea, dominio, cantidad solicitada, tipo de entidad y restricciones antes de redactar.',
      },
      {
        title: 'Candidate Ledger',
        description: 'Extrae entidades posibles y rechaza fragmentos, bylines, fechas, títulos de fuente, clusters de marca y candidatos mal formados.',
      },
      {
        title: 'CandidatePack',
        description: 'Bloquea el conjunto exacto de recomendaciones que el writer puede utilizar.',
      },
      {
        title: 'Writer Agent',
        description: 'Redacta el artículo dentro de la estructura bloqueada y del perfil de tono seleccionado.',
      },
      {
        title: 'Reviewer / Revision Plan',
        description: 'Comprueba contrato, fidelidad al CandidatePack y si hace falta reescritura o reparación puntual.',
      },
      {
        title: 'Final Answer Contract',
        description: 'Bloquea cantidades incorrectas, candidatos inválidos, salidas inseguras y estados incoherentes.',
      },
    ],
    failureEyebrow: '05 / Lección de diseño',
    failureTitle: 'El fallo “Paul Altieri”',
    failureCopy:
      'Durante las pruebas, un artículo de recomendaciones de relojes incluyó “Paul Altieri” como uno de los relojes recomendados. No era un reloj, sino una persona asociada a una fuente. Esto expuso el principal riesgo en flujos de recomendación: el writer solo puede ser tan fiable como el conjunto de candidatos que recibe.',
    failureFix:
      'La solución no fue otro prompt. Fue una puerta de limpieza de candidatos, un informe de calidad del CandidatePack, poder de veto para el reviewer y un contrato final que impide aprobar un artículo pulido si el conjunto de candidatos es inválido.',
    safetyEyebrow: '06 / Seguridad y control',
    safetyTitle: 'Conservador por diseño',
    safetyCopy: 'BlogAgent mantiene los efectos externos y las afirmaciones de alto riesgo fuera del flujo autónomo.',
    safetyItems: [
      'Sin efectos externos',
      'Modo mock por defecto',
      'Proveedores live opt-in',
      'API keys solo en variables de entorno',
      'Finanzas degrada a informes de evidencia',
      'Revisión humana antes de publicar',
    ],
    evaluationEyebrow: '07 / Evaluación',
    evaluationTitle: 'Validar el workflow, no prometer escritura perfecta',
    evaluationStats: [
      ['1.100+', 'tests en modo mock'],
      ['13 / 13', 'evals del workflow'],
      ['5', 'temas de QA manual'],
    ],
    evaluationTopicsLabel: 'Temas de QA manual',
    evaluationTopics: [
      'Relojes de lujo asequibles',
      'Perfumes de verano',
      'Herramientas de IA para estudiantes',
      'Cómo elegir un perfume de verano',
      'Fallback de seguridad para acciones energéticas',
    ],
    evaluationNote:
      'Las evals validan comportamiento del flujo, contratos y límites de seguridad en modo mock. La calidad de búsqueda y modelos live sigue dependiendo de las fuentes y requiere revisión humana.',
    resultEyebrow: '08 / Resultado',
    resultTitle: 'Un sistema de redacción controlado',
    resultCopy:
      'El resultado es un flujo interno de IA práctico: no un escritor autónomo, sino un sistema de redacción controlado que crea borradores estructurados, conscientes de sus fuentes y copy-ready, con trazabilidad suficiente para revisarlos rápido.',
    outcomes: [
      'Primeros borradores más rápidos',
      'Mejor estructura',
      'Restricciones de recomendación más claras',
      'Manejo más seguro de finanzas y contenido de alto riesgo',
      'Debug trace para revisión',
      'Ejemplo de portfolio de un workflow agentic acotado',
    ],
    limitationsEyebrow: '09 / Limitaciones',
    limitationsTitle: 'Lo que sigue deliberadamente sin resolver',
    limitations: [
      'Mock-first por defecto',
      'Extracción de fuentes heurística',
      'Candidatos dependientes de la calidad de búsqueda',
      'Una revisión y una pasada de polish',
      'Sin capa de persistencia',
      'Revisión humana todavía necesaria',
      'No diseñado como SaaS público',
    ],
    learningEyebrow: '10 / Qué aprendí',
    learningTitle: 'La mayoría de fallos de escritura eran fallos de workflow',
    learningCopy:
      'La lección principal fue que la mayoría de fallos de “calidad de escritura con IA” eran en realidad problemas de identidad, conteo, validación y handoff. Cuando el sistema bloqueó candidatos, auditó secciones, dio poder de veto al reviewer y trató el contrato final como fuente de verdad, el agente ganó fiabilidad sin ganar autonomía.',
    closingCta: 'Revisar el repositorio',
  },
} as const

export default function BlogAgentPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const t = content[locale]

  useCaseStudySetup()

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="case-study-page-new case-study-page-new--data-brief case-study-page-new--blogagent">
        <section className="data-brief-hero blogagent-hero" aria-labelledby="blogagent-title">
          <div className="data-brief-hero__content">
            <p className="data-brief-eyebrow">{t.eyebrow}</p>
            <h1 id="blogagent-title" className="data-brief-hero__title">
              BlogAgent
            </h1>
            <p className="data-brief-hero__subtitle">{t.subtitle}</p>
            <p className="data-brief-hero__description">{t.description}</p>
            <div className="data-brief-actions">
              <a href={repositoryUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                {t.repository}
              </a>
              <Link href={localizePath('/case-studies', locale)} className="data-brief-button">
                {t.back}
              </Link>
            </div>
            <div className="data-brief-tags" aria-label={locale === 'es' ? 'Etiquetas del proyecto' : 'Project tags'}>
              {['Agentic workflow', 'LLM systems', 'Editorial AI', 'Source-aware drafting', 'Human-in-the-loop', 'Python', 'FastAPI'].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <aside className="blogagent-hero__panel" aria-label={locale === 'es' ? 'Estado del workflow' : 'Workflow status'}>
            <div className="blogagent-hero__panel-header">
              <span>blogagent / run</span>
              <span className="is-valid">{locale === 'es' ? 'contratos válidos' : 'contracts valid'}</span>
            </div>
            {[
              ['01', 'query_contract', 'locked'],
              ['02', 'source_quality', 'checked'],
              ['03', 'candidate_pack', 'validated'],
              ['04', 'writer', 'bounded'],
              ['05', 'reviewer', 'veto enabled'],
              ['06', 'final_contract', 'pass'],
            ].map(([number, label, status]) => (
              <div key={label} className="blogagent-hero__panel-row">
                <span>{number}</span>
                <strong>{label}</strong>
                <em>{status}</em>
              </div>
            ))}
            <p>{locale === 'es' ? 'Salida: borrador copy-ready / revisión humana pendiente' : 'Output: copy-ready draft / human review pending'}</p>
          </aside>
        </section>

        <nav className="data-brief-mini-nav blogagent-mini-nav" aria-label={locale === 'es' ? 'Secciones de BlogAgent' : 'BlogAgent sections'}>
          {t.nav.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <CaseStudySnapshot
          items={[...t.snapshot]}
          links={[{ label: t.repository, href: repositoryUrl, external: true }]}
          locale={locale}
          contextHref="#problem"
          solutionHref="#architecture"
        />

        <section id="problem" className="data-brief-section data-brief-section--cream" aria-labelledby="blogagent-problem">
          <div className="data-brief-section__container blogagent-reading-grid">
            <div className="data-brief-refresh-heading ui-section-heading">
              <p className="data-brief-eyebrow">{t.problemEyebrow}</p>
              <h2 id="blogagent-problem">{t.problemTitle}</h2>
            </div>
            <div className="blogagent-copy-stack">
              {t.problemCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="goal" className="data-brief-section data-brief-section--light" aria-labelledby="blogagent-goal">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading ui-section-heading">
              <p className="data-brief-eyebrow">{t.goalEyebrow}</p>
              <h2 id="blogagent-goal">{t.goalTitle}</h2>
              <p>{t.goalCopy}</p>
            </div>
            <div className="blogagent-boundary-grid">
              <article>
                <span>+</span>
                <h3>{t.goalDoes}</h3>
                <ul>
                  {t.goalDoesItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
              <article>
                <span>-</span>
                <h3>{t.goalDoesNot}</h3>
                <ul>
                  {t.goalDoesNotItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            </div>
            <blockquote className="blogagent-principle">{t.goalNote}</blockquote>
          </div>
        </section>

        <section id="architecture" className="data-brief-section data-brief-section--dark" aria-labelledby="blogagent-architecture">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading ui-section-heading">
              <p className="data-brief-eyebrow">{t.architectureEyebrow}</p>
              <h2 id="blogagent-architecture">{t.architectureTitle}</h2>
              <p>{t.architectureCopy}</p>
            </div>
            <ol className="blogagent-flow" aria-label={t.architectureTitle}>
              {t.flow.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="components" className="data-brief-section data-brief-section--cream" aria-labelledby="blogagent-components">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading ui-section-heading">
              <p className="data-brief-eyebrow">{t.componentsEyebrow}</p>
              <h2 id="blogagent-components">{t.componentsTitle}</h2>
            </div>
            <div className="blogagent-component-grid">
              {t.components.map((component, index) => (
                <article key={component.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{component.title}</h3>
                  <p>{component.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="failure" className="data-brief-section data-brief-section--light" aria-labelledby="blogagent-failure">
          <div className="data-brief-section__container blogagent-lesson">
            <div className="blogagent-lesson__label">
              <p className="data-brief-eyebrow">{t.failureEyebrow}</p>
              <span>PERSON != PRODUCT</span>
            </div>
            <div className="blogagent-lesson__copy">
              <h2 id="blogagent-failure">{t.failureTitle}</h2>
              <p>{t.failureCopy}</p>
              <blockquote>{t.failureFix}</blockquote>
            </div>
          </div>
        </section>

        <section id="safety" className="data-brief-section data-brief-section--dark" aria-labelledby="blogagent-safety">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading ui-section-heading">
              <p className="data-brief-eyebrow">{t.safetyEyebrow}</p>
              <h2 id="blogagent-safety">{t.safetyTitle}</h2>
              <p>{t.safetyCopy}</p>
            </div>
            <ul className="blogagent-control-grid">
              {t.safetyItems.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="evaluation" className="data-brief-section data-brief-section--light" aria-labelledby="blogagent-evaluation">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading ui-section-heading">
              <p className="data-brief-eyebrow">{t.evaluationEyebrow}</p>
              <h2 id="blogagent-evaluation">{t.evaluationTitle}</h2>
            </div>
            <div className="benchmark-proof-strip blogagent-proof-strip">
              {t.evaluationStats.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="blogagent-evaluation-grid">
              <div>
                <h3>{t.evaluationTopicsLabel}</h3>
                <ul>
                  {t.evaluationTopics.map((topic) => <li key={topic}>{topic}</li>)}
                </ul>
              </div>
              <p className="blogagent-evaluation__caveat">{t.evaluationNote}</p>
            </div>
          </div>
        </section>

        <section id="result" className="data-brief-section data-brief-section--cream" aria-labelledby="blogagent-result">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading ui-section-heading">
              <p className="data-brief-eyebrow">{t.resultEyebrow}</p>
              <h2 id="blogagent-result">{t.resultTitle}</h2>
              <p>{t.resultCopy}</p>
            </div>
            <ul className="blogagent-outcome-grid">
              {t.outcomes.map((outcome, index) => (
                <li key={outcome}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="limitations" className="data-brief-section data-brief-section--dark" aria-labelledby="blogagent-limitations">
          <div className="data-brief-section__container blogagent-reading-grid">
            <div className="data-brief-refresh-heading ui-section-heading">
              <p className="data-brief-eyebrow">{t.limitationsEyebrow}</p>
              <h2 id="blogagent-limitations">{t.limitationsTitle}</h2>
            </div>
            <ul className="blogagent-limitations">
              {t.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
            </ul>
          </div>
        </section>

        <section id="learning" className="data-brief-section data-brief-section--light blogagent-closing" aria-labelledby="blogagent-learning">
          <div className="data-brief-section__container">
            <p className="data-brief-eyebrow">{t.learningEyebrow}</p>
            <h2 id="blogagent-learning">{t.learningTitle}</h2>
            <p>{t.learningCopy}</p>
            <div className="data-brief-actions">
              <a href={repositoryUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                {t.closingCta}
              </a>
              <Link href={localizePath('/case-studies', locale)} className="data-brief-button">
                {t.back}
              </Link>
            </div>
          </div>
        </section>

        <CaseStudyNext currentHref={pathname} accentColor="var(--accent)" locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
