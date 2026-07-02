'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import CaseStudyMiniNav from '@/components/case-studies/CaseStudyMiniNav'
import { CaseStudySnapshot } from '@/components/case-studies/CommercialCaseStudySections'
import { useCaseStudySetup } from '@/hooks'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'

const githubUrl = 'https://github.com/RaulMermans/campaign-sandbox'
const imageBase = '/images/case-studies/campaign-sandbox'

const content = {
  en: {
    back: 'Back to case studies',
    eyebrow: 'Internal AI Strategy Workspace',
    subtitle:
      'A bounded AI workflow for moving from messy campaign briefs to structured strategy.',
    description:
      'Campaign Sandbox turns messy campaign briefs into structured creative routes, synthetic audience simulations, risk reviews, execution plans, and exportable strategy reports.',
    projectLinks: 'Project links',
    repository: 'GitHub repository',
    viewWorkflow: 'View workflow',
    projectTags: 'Project tags',
    tags: [
      'AI Workflows',
      'Creative Strategy',
      'Next.js',
      'TypeScript',
      'OpenAI',
      'Evaluation & Guardrails',
    ],
    heroAlt: 'Campaign Sandbox brief intake screen',
    heroCaption: 'Campaign Sandbox intake and strategy workspace.',
    navLabel: 'Campaign Sandbox page sections',
    nav: [
      ['Problem', '#problem'],
      ['Architecture', '#architecture'],
      ['Routes', '#routes'],
      ['Review', '#creative-review'],
      ['Execution', '#execution'],
      ['Reliability', '#reliability'],
      ['Outcome', '#outcome'],
    ],
    snapshot: [
      { label: 'Type', value: 'Internal AI tool' },
      {
        label: 'Use case',
        value: 'Campaign strategy, route comparison, and execution planning',
      },
      {
        label: 'Role',
        value:
          'Product design, AI workflow architecture, and full-stack implementation',
      },
      {
        label: 'Stack',
        value:
          'Next.js, TypeScript, React, Zod, OpenAI structured outputs, deterministic validation',
      },
      { label: 'Status', value: 'Finished internal v1' },
    ],
    problem: {
      eyebrow: 'Problem',
      title: 'Strategy starts with fragmented inputs.',
      paragraphs: [
        'Early campaign strategy work often starts with client notes, product claims, creative mandatories, audience assumptions, launch constraints, and unclear positioning.',
        'The challenge was to turn those inputs into structured campaign thinking without pretending to replace strategy, market research, or creative judgment.',
        'The core design constraint was reliability: the system had to be useful without becoming an uncontrolled autonomous agent.',
      ],
      callout: 'Not an autonomous agent. A bounded strategy workflow.',
    },
    objective: {
      eyebrow: 'Objective',
      title: 'Move from brief to strategy faster while keeping judgment human.',
      items: [
        'Accept pasted or uploaded brief material.',
        'Structure the brief into usable campaign inputs.',
        'Generate differentiated route territories.',
        'Simulate synthetic audience reactions for planning only.',
        'Score and compare routes deterministically.',
        'Add a Creative Director Review layer.',
        'Preserve human route selection.',
        'Generate a practical execution plan.',
        'Export Markdown, HTML, and PPTX reports.',
        'Keep access password-protected when deployed.',
      ],
    },
    architecture: {
      eyebrow: 'Architecture decision',
      title: 'A hybrid workflow-agent architecture.',
      body: 'Bounded LLM stages handle interpretation, synthesis, and critique. Deterministic code handles routing, schemas, validation, scoring, access control, proof checks, exports, and safety boundaries.',
      workflowLabel: 'Campaign Sandbox workflow',
      summaryStages: [
        'Messy campaign brief',
        'Strategic routes',
        'Audience simulation',
        'Risk review',
        'Execution plan',
        'Exportable output',
      ],
      stages: [
        'Brief intake',
        'Brief normalization',
        'Strategic tension extraction',
        'Campaign route generation',
        'Persona generation',
        'Synthetic audience reactions',
        'Deterministic scoring',
        'Pre-mortem risk review',
        'Deterministic comparison',
        'Creative Director Review',
        'Human route selection',
        'Execution plan',
        'Deterministic export',
      ],
      reasons: [
        'Campaign strategy requires judgment and synthesis.',
        'Reliability requires deterministic boundaries.',
        'Route selection should remain human-controlled.',
        'Synthetic reactions must not be treated as research.',
        'Exports should be deterministic and auditable.',
      ],
    },
    cockpit: {
      eyebrow: 'Workflow / Decision cockpit',
      title: 'Make route tradeoffs visible before selection.',
      body: 'The Decision Cockpit summarizes the recommended route, runner-up strength, biggest tradeoff, primary risk, close-score warnings, and selection or export status.',
      alt: 'Campaign Sandbox decision cockpit',
      caption:
        'Decision cockpit summarizing the recommended route, tradeoffs, risk, and route status.',
    },
    routes: {
      eyebrow: 'Route development',
      title: 'Three territories, each with a strategic job and failure mode.',
      body: 'Every route includes a name, strategic role, killer line, enemy, proof mechanism, visual world, channel fit, failure mode, and strategic estimate.',
      alt: 'Campaign Sandbox generated campaign route cards',
      caption:
        'Generated campaign territories with scoring, positioning, proof mechanism, and route risks.',
      callout:
        'Synthetic audience reactions are planning hypotheses, not market research.',
    },
    review: {
      eyebrow: 'Creative review',
      title: 'A critique layer focused on distinctiveness, not approval.',
      body: 'Creative Director Review examines originality, ownability, cultural sharpness, visual potential, conversion clarity, and genericity risk. It also proposes sharper route names, killer lines, and route-level notes.',
      alt: 'Campaign Sandbox Creative Director Review',
      caption:
        'Creative Director Review critiques originality, ownability, cultural sharpness, and genericity risk.',
    },
    features: {
      eyebrow: 'Key features',
      title: 'Each stage narrows uncertainty without hiding it.',
      items: [
        {
          title: 'Structured brief intake',
          description:
            'Users can paste a campaign brief or upload supported files. Extracted text is shown in an editable preview before the workflow runs. TXT and PPTX are supported reliably; PDF extraction is labeled honestly because results can vary by file and environment.',
        },
        {
          title: 'Strategic tension',
          description:
            'The system identifies audience desire, audience resistance, the brand proof challenge, the creative trap, the creative opportunity, and a campaign tension statement.',
        },
        {
          title: 'Synthetic audience signals',
          description:
            'Synthetic personas react to each route as planning hypotheses only. They are never presented as research, survey data, focus-group findings, or performance predictions.',
        },
        {
          title: 'Deterministic comparison',
          description:
            'Rules provide route tradeoffs, feasibility estimates, risk categories, close-score warnings, and recommendation logic without claiming predictive accuracy.',
        },
        {
          title: 'Human route selection',
          description:
            'The workflow stops before final execution so the user, not the model, chooses which strategic territory should move forward.',
        },
        {
          title: 'Local run library',
          description:
            'Saved runs support internal reuse and comparison while remaining in browser storage rather than a server database.',
        },
      ],
    },
    execution: {
      eyebrow: 'Execution',
      title: 'Turn the selected route into a practical campaign system.',
      body: 'After manual route selection, the workflow generates a campaign spine, launch plan, channel system, production system, copy system, measurement system, claims and legal review, and next actions.',
      alt: 'Campaign Sandbox execution plan',
      caption:
        'Selected route expanded into an execution plan, channel system, production system, copy, measurement, and legal review notes.',
    },
    export: {
      eyebrow: 'Export system',
      title: 'Structured output becomes a deterministic artifact.',
      body: 'Markdown reports, HTML reports, and PPTX route decks are generated directly from validated workflow output. No LLM is used during export generation.',
      alt: 'Campaign Sandbox export panel',
      caption: 'Deterministic export to Markdown, HTML, and PPTX route deck.',
    },
    reliability: {
      eyebrow: 'Reliability and safety design',
      title: 'Controlled AI use instead of uncontrolled autonomy.',
      body: 'Proof integrity guardrails block unsupported testimonials, fake user-generated content, and unsubstantiated performance claims unless the source brief provides support.',
      items: [
        'Server-side LLM calls only',
        'OpenAI structured outputs',
        'Zod schema validation',
        'Deterministic route scoring and comparison',
        'Route quality validation',
        'Proof integrity guardrails',
        'Retry-once repair for quality failures',
        'Synthetic research caveats',
        'Human route selection',
        'Deterministic export',
        'Password-gated deployment',
        'No raw prompt or provider-output exposure',
        'No client-side API key exposure',
      ],
      accessTitle: 'Password-protected deployment',
      accessBody:
        'The repository is public, but a deployed operating surface should remain behind an internal password gate because using the app can trigger server-side LLM calls.',
    },
    stack: {
      eyebrow: 'Technical stack',
      title: 'A typed application with deterministic boundaries.',
      label: 'Campaign Sandbox technology stack',
      items: [
        'Next.js',
        'TypeScript',
        'React',
        'Zod',
        'OpenAI structured outputs',
        'Local browser storage',
        'Markdown export',
        'HTML export',
        'PPTX export',
        'Vitest',
        'Middleware password gate',
      ],
    },
    outcome: {
      eyebrow: 'Outcome',
      title: 'Finished internal v1.',
      body: 'Campaign Sandbox is suitable as an internal strategy accelerator and a portfolio case study in reliable AI workflow design.',
      items: [
        '854 tests passing across 47 files',
        'Clean typecheck and lint',
        'Production build passing',
        'Password gate tested',
        'Campaign APIs blocked without access',
        'Markdown, HTML, and PPTX exports working',
        'GitHub repository reviewed for public safety',
      ],
    },
    learning: {
      eyebrow: 'What I learned',
      title: 'The most important decision was making the system more bounded.',
      paragraphs: [
        'Useful AI systems need deterministic routing, schema validation, explicit safety boundaries, human approval points, quality gates, traceable stages, clear caveats, and controlled access.',
        'The strongest version is not an autonomous marketing agent. It is a structured workspace that accelerates strategy while keeping the human responsible for judgment.',
      ],
    },
    limitations: {
      eyebrow: 'Limitations / Final status',
      title: 'Built for internal work, not SaaS.',
      items: [
        'Synthetic audience reactions are not real market research.',
        'PDF extraction may vary by file and environment.',
        'Saved runs are browser-local.',
        'The deployed app uses a shared password gate, not user accounts.',
        'There is no rate limiting yet.',
        'Outputs should be reviewed before external or client use.',
        'The tool is built for internal work, not SaaS.',
      ],
    },
  },
  es: {
    back: 'Volver a casos',
    eyebrow: 'Espacio interno de estrategia con IA',
    subtitle:
      'Un flujo de IA acotado para convertir briefs de campaña desordenados en estrategia estructurada.',
    description:
      'Campaign Sandbox convierte briefs de campaña desordenados en rutas creativas estructuradas, simulaciones sintéticas de audiencia, revisiones de riesgo, planes de ejecución e informes estratégicos exportables.',
    projectLinks: 'Enlaces del proyecto',
    repository: 'Repositorio en GitHub',
    viewWorkflow: 'Ver flujo',
    projectTags: 'Etiquetas del proyecto',
    tags: [
      'Flujos con IA',
      'Estrategia creativa',
      'Next.js',
      'TypeScript',
      'OpenAI',
      'Evaluación y guardrails',
    ],
    heroAlt: 'Pantalla de entrada de brief de Campaign Sandbox',
    heroCaption:
      'Entrada de brief y espacio de estrategia de Campaign Sandbox.',
    navLabel: 'Secciones de Campaign Sandbox',
    nav: [
      ['Problema', '#problem'],
      ['Arquitectura', '#architecture'],
      ['Rutas', '#routes'],
      ['Revisión', '#creative-review'],
      ['Ejecución', '#execution'],
      ['Fiabilidad', '#reliability'],
      ['Resultado', '#outcome'],
    ],
    snapshot: [
      { label: 'Tipo', value: 'Herramienta interna de IA' },
      {
        label: 'Uso',
        value:
          'Estrategia de campaña, comparación de rutas y planificación de ejecución',
      },
      {
        label: 'Rol',
        value:
          'Diseño de producto, arquitectura de flujo con IA e implementación full-stack',
      },
      {
        label: 'Stack',
        value:
          'Next.js, TypeScript, React, Zod, outputs estructurados de OpenAI y validación determinista',
      },
      { label: 'Estado', value: 'v1 interna finalizada' },
    ],
    problem: {
      eyebrow: 'Problema',
      title: 'La estrategia empieza con información fragmentada.',
      paragraphs: [
        'El trabajo inicial de estrategia de campaña suele partir de notas del cliente, claims de producto, requisitos creativos, supuestos sobre la audiencia, restricciones de lanzamiento y un posicionamiento poco claro.',
        'El reto era convertir esas entradas en pensamiento de campaña estructurado sin pretender sustituir la estrategia, la investigación de mercado ni el criterio creativo.',
        'La principal restricción de diseño era la fiabilidad: el sistema debía ser útil sin convertirse en un agente autónomo sin control.',
      ],
      callout: 'No es un agente autónomo. Es un flujo estratégico acotado.',
    },
    objective: {
      eyebrow: 'Objetivo',
      title:
        'Pasar del brief a la estrategia más rápido, manteniendo humano el criterio.',
      items: [
        'Aceptar material de brief pegado o subido.',
        'Estructurar el brief en inputs de campaña utilizables.',
        'Generar territorios de ruta diferenciados.',
        'Simular reacciones sintéticas de audiencia solo para planificación.',
        'Puntuar y comparar rutas de forma determinista.',
        'Añadir una capa de revisión de dirección creativa.',
        'Preservar la selección humana de la ruta.',
        'Generar un plan de ejecución práctico.',
        'Exportar informes en Markdown, HTML y PPTX.',
        'Mantener el acceso protegido por contraseña al desplegar.',
      ],
    },
    architecture: {
      eyebrow: 'Decisión de arquitectura',
      title: 'Una arquitectura híbrida de flujo y agentes.',
      body: 'Las etapas acotadas con LLM gestionan interpretación, síntesis y crítica. El código determinista controla rutas, esquemas, validación, puntuación, acceso, comprobaciones de evidencia, exportaciones y límites de seguridad.',
      workflowLabel: 'Flujo de Campaign Sandbox',
      summaryStages: [
        'Brief de campaña desordenado',
        'Rutas estratégicas',
        'Simulación de audiencia',
        'Revisión de riesgo',
        'Plan de ejecución',
        'Resultado exportable',
      ],
      stages: [
        'Entrada del brief',
        'Normalización del brief',
        'Extracción de la tensión estratégica',
        'Generación de rutas de campaña',
        'Generación de perfiles',
        'Reacciones sintéticas de audiencia',
        'Puntuación determinista',
        'Revisión de riesgos pre-mortem',
        'Comparación determinista',
        'Revisión de dirección creativa',
        'Selección humana de ruta',
        'Plan de ejecución',
        'Exportación determinista',
      ],
      reasons: [
        'La estrategia de campaña requiere criterio y síntesis.',
        'La fiabilidad requiere límites deterministas.',
        'La selección de ruta debe seguir bajo control humano.',
        'Las reacciones sintéticas no deben tratarse como investigación.',
        'Las exportaciones deben ser deterministas y auditables.',
      ],
    },
    cockpit: {
      eyebrow: 'Flujo / Panel de decisión',
      title: 'Hacer visibles los compromisos de cada ruta antes de elegir.',
      body: 'El panel de decisión resume la ruta recomendada, la fuerza de la segunda opción, el principal compromiso, el riesgo primario, avisos de puntuaciones cercanas y el estado de selección o exportación.',
      alt: 'Panel de decisión de Campaign Sandbox',
      caption:
        'Panel de decisión con la ruta recomendada, compromisos, riesgos y estado de selección.',
    },
    routes: {
      eyebrow: 'Desarrollo de rutas',
      title:
        'Tres territorios, cada uno con una función estratégica y un modo de fallo.',
      body: 'Cada ruta incluye nombre, función estratégica, frase principal, enemigo, mecanismo de prueba, mundo visual, encaje por canal, modo de fallo y estimación estratégica.',
      alt: 'Tarjetas de rutas de campaña generadas en Campaign Sandbox',
      caption:
        'Territorios de campaña generados con puntuación, posicionamiento, mecanismo de prueba y riesgos.',
      callout:
        'Las reacciones sintéticas de audiencia son hipótesis de planificación, no investigación de mercado.',
    },
    review: {
      eyebrow: 'Revisión creativa',
      title: 'Una capa crítica centrada en la diferenciación, no en aprobar.',
      body: 'La revisión de dirección creativa examina originalidad, apropiabilidad, agudeza cultural, potencial visual, claridad de conversión y riesgo de resultar genérico. También propone nombres y frases más precisas, además de notas por ruta.',
      alt: 'Revisión de dirección creativa de Campaign Sandbox',
      caption:
        'La revisión creativa evalúa originalidad, apropiabilidad, agudeza cultural y riesgo de resultar genérico.',
    },
    features: {
      eyebrow: 'Funciones clave',
      title: 'Cada etapa reduce la incertidumbre sin ocultarla.',
      items: [
        {
          title: 'Entrada de brief estructurada',
          description:
            'El usuario puede pegar un brief o subir archivos compatibles. El texto extraído aparece en una vista editable antes de ejecutar el flujo. TXT y PPTX funcionan de forma fiable; la extracción de PDF se describe con transparencia porque puede variar según el archivo y el entorno.',
        },
        {
          title: 'Tensión estratégica',
          description:
            'El sistema identifica el deseo y la resistencia de la audiencia, el reto de prueba de marca, la trampa y la oportunidad creativas, y una declaración de tensión de campaña.',
        },
        {
          title: 'Señales sintéticas de audiencia',
          description:
            'Perfiles sintéticos reaccionan a cada ruta solo como hipótesis de planificación. Nunca se presentan como investigación, encuestas, focus groups ni predicciones de rendimiento.',
        },
        {
          title: 'Comparación determinista',
          description:
            'Las reglas muestran compromisos entre rutas, estimaciones de viabilidad, categorías de riesgo, avisos de puntuaciones cercanas y lógica de recomendación sin afirmar precisión predictiva.',
        },
        {
          title: 'Selección humana de ruta',
          description:
            'El flujo se detiene antes de la ejecución final para que sea la persona, no el modelo, quien elija qué territorio estratégico debe avanzar.',
        },
        {
          title: 'Biblioteca local de ejecuciones',
          description:
            'Las ejecuciones guardadas facilitan reutilización y comparación internas, permaneciendo en el almacenamiento del navegador en lugar de una base de datos.',
        },
      ],
    },
    execution: {
      eyebrow: 'Ejecución',
      title: 'Convertir la ruta elegida en un sistema de campaña práctico.',
      body: 'Tras la selección manual, el flujo genera la columna vertebral de la campaña, plan de lanzamiento, sistema de canales, producción, copy, medición, revisión legal y de claims, y siguientes acciones.',
      alt: 'Plan de ejecución de Campaign Sandbox',
      caption:
        'Ruta elegida convertida en plan de ejecución, canales, producción, copy, medición y notas legales.',
    },
    export: {
      eyebrow: 'Sistema de exportación',
      title:
        'El output estructurado se convierte en un artefacto determinista.',
      body: 'Los informes Markdown y HTML, y las presentaciones PPTX de rutas, se generan directamente desde el output validado del flujo. No se usa ningún LLM durante la exportación.',
      alt: 'Panel de exportación de Campaign Sandbox',
      caption:
        'Exportación determinista a Markdown, HTML y presentación PPTX de rutas.',
    },
    reliability: {
      eyebrow: 'Diseño de fiabilidad y seguridad',
      title: 'Uso controlado de IA en lugar de autonomía sin control.',
      body: 'Los guardrails de integridad bloquean testimonios sin respaldo, contenido falso de usuarios y claims de rendimiento no demostrados salvo que el brief fuente aporte evidencia.',
      items: [
        'Llamadas al LLM solo desde servidor',
        'Outputs estructurados de OpenAI',
        'Validación de esquemas con Zod',
        'Puntuación y comparación deterministas',
        'Validación de calidad de rutas',
        'Guardrails de integridad de evidencia',
        'Un reintento de reparación ante fallos de calidad',
        'Advertencias sobre investigación sintética',
        'Selección humana de ruta',
        'Exportación determinista',
        'Despliegue protegido por contraseña',
        'Sin exposición de prompts ni outputs del proveedor',
        'Sin exposición de claves API en cliente',
      ],
      accessTitle: 'Despliegue protegido por contraseña',
      accessBody:
        'El repositorio es público, pero la superficie operativa desplegada debe permanecer tras una contraseña interna porque usar la aplicación puede activar llamadas al LLM desde el servidor.',
    },
    stack: {
      eyebrow: 'Stack técnico',
      title: 'Una aplicación tipada con límites deterministas.',
      label: 'Stack tecnológico de Campaign Sandbox',
      items: [
        'Next.js',
        'TypeScript',
        'React',
        'Zod',
        'Outputs estructurados de OpenAI',
        'Almacenamiento local del navegador',
        'Exportación Markdown',
        'Exportación HTML',
        'Exportación PPTX',
        'Vitest',
        'Middleware con contraseña',
      ],
    },
    outcome: {
      eyebrow: 'Resultado',
      title: 'v1 interna finalizada.',
      body: 'Campaign Sandbox funciona como acelerador interno de estrategia y como caso de portfolio sobre diseño fiable de flujos con IA.',
      items: [
        '854 tests superados en 47 archivos',
        'Typecheck y lint limpios',
        'Build de producción correcto',
        'Acceso por contraseña probado',
        'APIs de campaña bloqueadas sin acceso',
        'Exportaciones Markdown, HTML y PPTX operativas',
        'Repositorio de GitHub revisado para publicación segura',
      ],
    },
    learning: {
      eyebrow: 'Qué aprendí',
      title: 'La decisión más importante fue acotar más el sistema.',
      paragraphs: [
        'Los sistemas de IA útiles necesitan rutas deterministas, validación de esquemas, límites de seguridad explícitos, puntos de aprobación humana, controles de calidad, etapas trazables, advertencias claras y acceso controlado.',
        'La versión más sólida no es un agente autónomo de marketing. Es un espacio estructurado que acelera la estrategia manteniendo a la persona responsable del criterio.',
      ],
    },
    limitations: {
      eyebrow: 'Limitaciones / Estado final',
      title: 'Construido para trabajo interno, no como SaaS.',
      items: [
        'Las reacciones sintéticas de audiencia no son investigación de mercado real.',
        'La extracción de PDF puede variar según el archivo y el entorno.',
        'Las ejecuciones guardadas son locales al navegador.',
        'La aplicación desplegada usa una contraseña compartida, no cuentas de usuario.',
        'Todavía no hay limitación de solicitudes.',
        'Los resultados deben revisarse antes de uso externo o con clientes.',
        'La herramienta está construida para trabajo interno, no como SaaS.',
      ],
    },
  },
} as const

type ScreenshotProps = {
  src: string
  alt: string
  caption: string
  priority?: boolean
}

function CaseStudyScreenshot({
  src,
  alt,
  caption,
  priority = false,
}: ScreenshotProps) {
  return (
    <figure className="campaign-sandbox-shot">
      <div className="campaign-sandbox-shot__frame">
        <Image
          src={`${imageBase}/${src}`}
          alt={alt}
          width={1440}
          height={900}
          sizes="(max-width: 720px) 100vw, (max-width: 1200px) 92vw, 1400px"
          quality={90}
          priority={priority}
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export default function CampaignSandboxPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const t = content[locale]

  useCaseStudySetup()

  return (
    <>
      <Header locale={locale} />
      <main
        id="main-content"
        className="case-study-page-new case-study-page-new--data-brief case-study-page-new--campaign-sandbox"
      >
        <section
          className="data-brief-hero campaign-sandbox-hero"
          aria-labelledby="campaign-sandbox-title"
        >
          <div className="data-brief-hero__content">
            <Link
              href={localizePath('/case-studies', locale)}
              className="data-brief-back"
            >
              {t.back}
            </Link>
            <p className="data-brief-eyebrow">{t.eyebrow}</p>
            <h1 id="campaign-sandbox-title" className="data-brief-hero__title">
              Campaign Sandbox
            </h1>
            <p className="data-brief-hero__subtitle">{t.subtitle}</p>
            <p className="data-brief-hero__description">{t.description}</p>
            <div className="data-brief-actions" aria-label={t.projectLinks}>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button data-brief-button--primary"
              >
                {t.repository}
              </a>
              <a href="#architecture" className="data-brief-button">
                {t.viewWorkflow}
              </a>
            </div>
            <div className="data-brief-tags" aria-label={t.projectTags}>
              {t.tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="campaign-sandbox-hero__visual">
            <CaseStudyScreenshot
              src="01-intake.webp"
              alt={t.heroAlt}
              caption={t.heroCaption}
              priority
            />
          </div>
        </section>

        <CaseStudyMiniNav
          items={t.nav}
          ariaLabel={t.navLabel}
          className="campaign-sandbox-mini-nav"
        />

        <CaseStudySnapshot
          locale={locale}
          contextHref="#problem"
          solutionHref="#architecture"
          items={[...t.snapshot]}
        />

        <section
          id="problem"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="campaign-sandbox-problem"
        >
          <div className="data-brief-section__container">
            <div className="campaign-sandbox-two-column">
              <div className="data-brief-refresh-heading">
                <p className="data-brief-eyebrow">{t.problem.eyebrow}</p>
                <h2 id="campaign-sandbox-problem">{t.problem.title}</h2>
              </div>
              <div className="campaign-sandbox-copy">
                {t.problem.paragraphs.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <blockquote className="campaign-sandbox-callout">
              {t.problem.callout}
            </blockquote>
          </div>
        </section>

        <section
          className="data-brief-section data-brief-section--light"
          aria-labelledby="objective-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.objective.eyebrow}</p>
              <h2 id="objective-heading">{t.objective.title}</h2>
            </div>
            <ul className="campaign-sandbox-check-grid">
              {t.objective.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="architecture"
          className="data-brief-section data-brief-section--dark data-brief-section--result"
          aria-labelledby="architecture-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.architecture.eyebrow}</p>
              <h2 id="architecture-heading">{t.architecture.title}</h2>
              <p>{t.architecture.body}</p>
            </div>
            <div
              className="campaign-sandbox-workflow"
              aria-label={t.architecture.workflowLabel}
            >
              {t.architecture.summaryStages.map((stage, index) => (
                <span
                  key={stage}
                  className="campaign-sandbox-workflow__summary"
                >
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  {stage}
                </span>
              ))}
            </div>
            <div
              className="campaign-sandbox-workflow campaign-sandbox-workflow--detail"
              aria-label={t.architecture.workflowLabel}
            >
              {t.architecture.stages.map((stage, index) => (
                <span key={stage}>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  {stage}
                </span>
              ))}
            </div>
            <div className="campaign-sandbox-reasons">
              {t.architecture.reasons.map(reason => (
                <p key={reason}>{reason}</p>
              ))}
            </div>
          </div>
        </section>

        <section
          className="data-brief-section data-brief-section--light"
          aria-labelledby="cockpit-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.cockpit.eyebrow}</p>
              <h2 id="cockpit-heading">{t.cockpit.title}</h2>
              <p>{t.cockpit.body}</p>
            </div>
            <CaseStudyScreenshot
              src="02-decision-cockpit.webp"
              alt={t.cockpit.alt}
              caption={t.cockpit.caption}
            />
          </div>
        </section>

        <section
          id="routes"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="routes-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.routes.eyebrow}</p>
              <h2 id="routes-heading">{t.routes.title}</h2>
              <p>{t.routes.body}</p>
            </div>
            <CaseStudyScreenshot
              src="03-route-cards.webp"
              alt={t.routes.alt}
              caption={t.routes.caption}
            />
            <blockquote className="campaign-sandbox-callout campaign-sandbox-callout--compact">
              {t.routes.callout}
            </blockquote>
          </div>
        </section>

        <section
          id="creative-review"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="creative-review-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.review.eyebrow}</p>
              <h2 id="creative-review-heading">{t.review.title}</h2>
              <p>{t.review.body}</p>
            </div>
            <CaseStudyScreenshot
              src="04-creative-director-review.webp"
              alt={t.review.alt}
              caption={t.review.caption}
            />
          </div>
        </section>

        <section
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="features-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.features.eyebrow}</p>
              <h2 id="features-heading">{t.features.title}</h2>
            </div>
            <div className="data-brief-card-grid data-brief-card-grid--architecture campaign-sandbox-feature-grid">
              {t.features.items.map(feature => (
                <article
                  key={feature.title}
                  className="data-brief-card data-brief-card--architecture"
                >
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="execution"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="execution-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.execution.eyebrow}</p>
              <h2 id="execution-heading">{t.execution.title}</h2>
              <p>{t.execution.body}</p>
            </div>
            <CaseStudyScreenshot
              src="05-execution-plan.webp"
              alt={t.execution.alt}
              caption={t.execution.caption}
            />
          </div>
        </section>

        <section
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="export-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.export.eyebrow}</p>
              <h2 id="export-heading">{t.export.title}</h2>
              <p>{t.export.body}</p>
            </div>
            <CaseStudyScreenshot
              src="06-export-panel.webp"
              alt={t.export.alt}
              caption={t.export.caption}
            />
          </div>
        </section>

        <section
          id="reliability"
          className="data-brief-section data-brief-section--dark data-brief-section--result"
          aria-labelledby="reliability-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.reliability.eyebrow}</p>
              <h2 id="reliability-heading">{t.reliability.title}</h2>
              <p>{t.reliability.body}</p>
            </div>
            <div className="campaign-sandbox-safety-grid">
              {t.reliability.items.map(item => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="campaign-sandbox-access-note">
              <h3>{t.reliability.accessTitle}</h3>
              <p>{t.reliability.accessBody}</p>
            </div>
          </div>
        </section>

        <section
          className="data-brief-section data-brief-section--light"
          aria-labelledby="stack-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.stack.eyebrow}</p>
              <h2 id="stack-heading">{t.stack.title}</h2>
            </div>
            <div
              className="data-brief-stack campaign-sandbox-stack"
              aria-label={t.stack.label}
            >
              {t.stack.items.map(item => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section
          id="outcome"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="outcome-heading"
        >
          <div className="data-brief-section__container">
            <div className="campaign-sandbox-two-column">
              <div className="data-brief-refresh-heading">
                <p className="data-brief-eyebrow">{t.outcome.eyebrow}</p>
                <h2 id="outcome-heading">{t.outcome.title}</h2>
                <p>{t.outcome.body}</p>
              </div>
              <ul className="campaign-sandbox-verification-list">
                {t.outcome.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className="data-brief-section data-brief-section--light"
          aria-labelledby="learning-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.learning.eyebrow}</p>
              <h2 id="learning-heading">{t.learning.title}</h2>
              {t.learning.paragraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section
          className="data-brief-section data-brief-section--dark data-brief-section--result"
          aria-labelledby="limitations-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">{t.limitations.eyebrow}</p>
              <h2 id="limitations-heading">{t.limitations.title}</h2>
            </div>
            <ul className="data-brief-list campaign-sandbox-limitations">
              {t.limitations.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="data-brief-actions">
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button data-brief-button--primary"
              >
                {t.repository}
              </a>
              <Link
                href={localizePath('/case-studies', locale)}
                className="data-brief-button"
              >
                {t.back}
              </Link>
            </div>
          </div>
        </section>

        <CaseStudyNext
          currentHref={pathname}
          accentColor="var(--accent)"
          locale={locale}
        />
      </main>
      <Footer locale={locale} />
    </>
  )
}
