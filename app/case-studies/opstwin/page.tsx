'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyMiniNav from '@/components/case-studies/CaseStudyMiniNav'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import { CaseStudySnapshot } from '@/components/case-studies/CommercialCaseStudySections'
import { useCaseStudySetup } from '@/hooks'
import { getLocaleFromPath, localizePath, type Locale } from '@/lib/i18n'

const liveDemoUrl = 'https://ops-twin.vercel.app'
const githubUrl = 'https://github.com/RaulMermans/OpsTwin.git'
const stack = ['Next.js', 'React', 'TypeScript', 'FastAPI', 'Python', 'SimPy', 'Pydantic']

type ProofImage = {
  src: string
  width: number
  height: number
  alt: string
  caption: string
}

type Copy = {
  back: string
  eyebrow: string
  subtitle: string
  description: string
  status: string
  live: string
  github: string
  linksLabel: string
  stackLabel: string
  heroProof: ProofImage
  nav: Array<[string, string]>
  problem: {
    eyebrow: string
    title: string
    paragraphs: string[]
    options: string[]
  }
  product: {
    eyebrow: string
    title: string
    cards: Array<[string, string]>
  }
  comparison: {
    eyebrow: string
    title: string
    intro: string
    facts: Array<[string, string]>
    image: ProofImage
  }
  proof: {
    eyebrow: string
    title: string
    intro: string
    images: ProofImage[]
  }
  method: {
    eyebrow: string
    title: string
    paragraphs: string[]
    boundaries: string[]
  }
  engineering: {
    eyebrow: string
    title: string
    paragraphs: string[]
    flow: string[]
  }
  outcome: {
    eyebrow: string
    title: string
    paragraphs: string[]
  }
  limitations: {
    eyebrow: string
    title: string
    items: string[]
    closing: string
  }
  learning: {
    eyebrow: string
    title: string
    paragraphs: string[]
  }
  final: {
    title: string
    description: string
    live: string
    github: string
    back: string
  }
}

const proofImages = {
  guidedSetup: {
    src: '/images/case-studies/opstwin/proof/guided-setup.png',
    width: 1440,
    height: 1200,
  },
  guidedResult: {
    src: '/images/case-studies/opstwin/proof/guided-result.png',
    width: 1168,
    height: 680,
  },
  process: {
    src: '/images/case-studies/opstwin/proof/process-view.png',
    width: 1168,
    height: 1078,
  },
  workload: {
    src: '/images/case-studies/opstwin/proof/team-workload.png',
    width: 1168,
    height: 1671,
  },
} as const

const copy: Record<Locale, Copy> = {
  en: {
    back: 'Case studies',
    eyebrow: 'Operational simulation / Decision support',
    subtitle: 'Test a staffing or workflow change before applying it to a live service operation.',
    description:
      'OpsTwin is an operational simulation and decision-support prototype for service operations. Its canonical example compares adding one general support agent with making initial ticket review and assignment 25% faster.',
    status: 'Public product prototype',
    live: 'Open live product',
    github: 'View GitHub repository',
    linksLabel: 'Project links',
    stackLabel: 'Technology stack',
    heroProof: {
      ...proofImages.guidedSetup,
      alt: 'OpsTwin guided workspace showing the current support operation and two proposed changes.',
      caption: 'Guided setup in the public product. The support-operation scenario is fictional.',
    },
    nav: [
      ['Problem', '#problem'],
      ['Product', '#product'],
      ['Demonstrated comparison', '#comparison'],
      ['Interface proof', '#interface-proof'],
      ['Method', '#method'],
      ['Engineering', '#engineering'],
      ['Outcome', '#outcome'],
      ['Limitations', '#limitations'],
      ['Learning', '#learning'],
    ],
    problem: {
      eyebrow: '01 / Problem',
      title: 'Operational dashboards show what happened. They do not test a proposed change.',
      paragraphs: [
        'Service teams can see ticket volume, resolution time, and workload after the fact. The harder question is counterfactual: what may change if capacity is added or the first review step is faster?',
        'Those changes move pressure through the whole workflow. A local improvement can shift queueing or workload elsewhere, so OpsTwin compares each change against the same simulated operating conditions.',
      ],
      options: ['Rely on historical averages.', 'Build a bespoke analysis for every question.', 'Test the change in the live operation.'],
    },
    product: {
      eyebrow: '02 / Product',
      title: 'A guided comparison first. The full workspace when it is needed.',
      cards: [
        ['Start with the operation', 'Review the fictional support workflow, its assumptions, and the measure being compared.'],
        ['Compare two bounded changes', 'Add one general support agent or make review and assignment 25% faster.'],
        ['Read the evidence', 'Inspect observed average change, matched-test consistency, uncertainty, process effects, and team workload.'],
      ],
    },
    comparison: {
      eyebrow: '03 / Demonstrated comparison',
      title: 'The result explains the evidence. It does not choose an action.',
      intro:
        'The public guided flow compares the current operation with two proposed changes. The screenshot below is a current result from the fictional support scenario, not evidence from a real company.',
      facts: [
        ['Observed average change', 'The difference in the selected measure across matched simulation runs.'],
        ['Matched-test consistency', 'How often a proposed change performed better than the current operation.'],
        ['Plausible range', 'A range around the estimated average change that can include improvement, no improvement, or a worse result.'],
        ['Decision boundary', 'A ranking can be inconclusive. Comparative evidence is not a recommendation.'],
      ],
      image: {
        ...proofImages.guidedResult,
        alt: 'OpsTwin result view comparing one added general support agent with faster review and assignment in a fictional support operation.',
        caption: 'Guided result from the current public deployment. Values are generated from the fictional support-operation model.',
      },
    },
    proof: {
      eyebrow: '04 / Interface proof',
      title: 'The product keeps the result connected to the operation behind it.',
      intro:
        'The Process view shows where a proposed change enters the workflow. Team workload keeps capacity and waiting evidence visible alongside the headline comparison.',
      images: [
        {
          ...proofImages.process,
          alt: 'OpsTwin Process view showing the fictional support workflow and proposed-change controls.',
          caption: 'Process view from the current public deployment.',
        },
        {
          ...proofImages.workload,
          alt: 'OpsTwin Team workload view comparing utilization and waiting evidence for fictional support teams.',
          caption: 'Team workload evidence from the current public deployment.',
        },
      ],
    },
    method: {
      eyebrow: '05 / Method',
      title: 'Matched simulation makes the comparison fairer.',
      paragraphs: [
        'OpsTwin uses common random numbers. Run 1 of the current operation and run 1 of each proposed change share the same simulated conditions. The same pairing applies across repeated runs.',
        'This reduces the chance that a difference is caused only by unrelated simulated demand. It does not turn the model into a production forecast or causal proof.',
      ],
      boundaries: [
        'Improvement frequency is not a production success probability.',
        'A plausible range is not a guaranteed outcome range.',
        'Comparative ranking is not an operational recommendation.',
        'Simulation evidence is not causal proof.',
      ],
    },
    engineering: {
      eyebrow: '06 / Engineering and reliability',
      title: 'The interface exposes evidence only after the model has checked it.',
      paragraphs: [
        'The public interface sends a versioned request to a FastAPI simulation service. SimPy runs the discrete-event model, while deterministic child seeds preserve the matched baseline and scenario schedule.',
        'A deployment failure also clarified an ownership boundary. The web app had depended on a fixture outside its deployed bundle, so the runtime asset was moved into the service that needed it and protected against drift.',
      ],
      flow: ['Next.js interface', 'Versioned request contract', 'FastAPI simulation service', 'SimPy execution engine', 'Integrity checks', 'Evidence and export'],
    },
    outcome: {
      eyebrow: '07 / Outcome',
      title: 'A deployed prototype with inspectable evidence and clear limits.',
      paragraphs: [
        'The live product, public repository, and current screenshots make the implementation inspectable. No real-company operational outcome is claimed.',
        'At the last recorded verification checkpoint, 247 backend tests and 172 frontend tests passed. Those counts are historical records, not a claim about the current full suite.',
      ],
    },
    limitations: {
      eyebrow: '08 / Limitations',
      title: 'A bounded support model, not a production optimization platform.',
      items: [
        'The canonical scenario represents a fictional support workflow, not an arbitrary operation.',
        'No real-company or real-user data has been processed.',
        'The prototype has no database, authentication, persistence, or multi-user state.',
        'Simulation output is not causal proof or a production-outcome guarantee.',
        'The product does not autonomously recommend an action or guarantee an optimal configuration.',
        'No measured business outcome or completed participant study is claimed.',
      ],
      closing:
        'Production use would require model calibration, data integration, security, observability, and validation against organisation-specific operating definitions.',
    },
    learning: {
      eyebrow: '09 / Learning',
      title: 'The useful boundary is where the model stops speaking for the operator.',
      paragraphs: [
        'A mathematically valid model can still fail as a product if people cannot see the decision it supports or the uncertainty it carries.',
        'OpsTwin treats the result as comparative evidence. The operator still owns the decision, the assumptions, and the next step.',
      ],
    },
    final: {
      title: 'Explore the comparison, then inspect the model behind it.',
      description: 'Open the guided product or review the repository and implementation details.',
      live: 'Open live product',
      github: 'View GitHub repository',
      back: 'Back to case studies',
    },
  },
  es: {
    back: 'Casos de estudio',
    eyebrow: 'Simulación operativa / Apoyo a decisiones',
    subtitle: 'Prueba un cambio de plantilla o de flujo antes de aplicarlo en una operación de servicio real.',
    description:
      'OpsTwin es un prototipo de simulación operativa y apoyo a decisiones para equipos de servicio. Su ejemplo canónico compara añadir un agente de soporte general con acelerar un 25% la revisión y asignación inicial de tickets.',
    status: 'Prototipo público de producto',
    live: 'Abrir producto',
    github: 'Ver repositorio en GitHub',
    linksLabel: 'Enlaces del proyecto',
    stackLabel: 'Tecnologías',
    heroProof: {
      ...proofImages.guidedSetup,
      alt: 'Espacio guiado de OpsTwin con la operación de soporte actual y dos cambios propuestos.',
      caption: 'Configuración guiada en el producto público. El escenario de soporte es ficticio.',
    },
    nav: [
      ['Problema', '#problem'],
      ['Producto', '#product'],
      ['Comparación demostrada', '#comparison'],
      ['Prueba de interfaz', '#interface-proof'],
      ['Método', '#method'],
      ['Ingeniería', '#engineering'],
      ['Resultado', '#outcome'],
      ['Límites', '#limitations'],
      ['Aprendizaje', '#learning'],
    ],
    problem: {
      eyebrow: '01 / Problema',
      title: 'Los dashboards operativos muestran lo que pasó. No prueban un cambio propuesto.',
      paragraphs: [
        'Los equipos de servicio pueden ver volumen de tickets, tiempo de resolución y carga de trabajo después de que ocurran. La pregunta difícil es contrafactual: qué podría cambiar si se añade capacidad o se acelera la primera revisión.',
        'Estos cambios mueven la presión por todo el flujo. Una mejora local puede desplazar colas o carga a otro punto, por eso OpsTwin compara cada cambio bajo las mismas condiciones simuladas.',
      ],
      options: ['Confiar en medias históricas.', 'Construir un análisis a medida para cada pregunta.', 'Probar el cambio en la operación real.'],
    },
    product: {
      eyebrow: '02 / Producto',
      title: 'Primero una comparación guiada. El espacio completo cuando hace falta.',
      cards: [
        ['Empezar por la operación', 'Revisar el flujo de soporte ficticio, sus supuestos y la medida que se compara.'],
        ['Comparar dos cambios acotados', 'Añadir un agente de soporte general o hacer un 25% más rápida la revisión y asignación.'],
        ['Leer la evidencia', 'Inspeccionar el cambio medio observado, la consistencia entre pruebas, la incertidumbre, el proceso y la carga de los equipos.'],
      ],
    },
    comparison: {
      eyebrow: '03 / Comparación demostrada',
      title: 'El resultado explica la evidencia. No elige una acción.',
      intro:
        'El flujo guiado público compara la operación actual con dos cambios propuestos. La captura siguiente es un resultado actual del escenario de soporte ficticio, no evidencia de una empresa real.',
      facts: [
        ['Cambio medio observado', 'La diferencia en la medida elegida a través de ejecuciones de simulación emparejadas.'],
        ['Consistencia entre pruebas', 'Con qué frecuencia un cambio propuesto funciona mejor que la operación actual.'],
        ['Rango plausible', 'Un rango alrededor del cambio medio estimado que puede incluir mejora, ausencia de mejora o un resultado peor.'],
        ['Límite de decisión', 'Un ranking puede no ser concluyente. La evidencia comparativa no es una recomendación.'],
      ],
      image: {
        ...proofImages.guidedResult,
        alt: 'Vista de resultados de OpsTwin que compara un agente de soporte general adicional con una revisión y asignación más rápida en una operación de soporte ficticia.',
        caption: 'Resultado guiado del despliegue público actual. Los valores los genera el modelo de soporte ficticio.',
      },
    },
    proof: {
      eyebrow: '04 / Prueba de interfaz',
      title: 'El producto mantiene el resultado conectado con la operación que lo produce.',
      intro:
        'La vista de Proceso muestra dónde entra un cambio propuesto en el flujo. La carga de los equipos mantiene visibles la capacidad y la espera junto a la comparación principal.',
      images: [
        {
          ...proofImages.process,
          alt: 'Vista de Proceso de OpsTwin con el flujo de soporte ficticio y controles para cambios propuestos.',
          caption: 'Vista de Proceso del despliegue público actual.',
        },
        {
          ...proofImages.workload,
          alt: 'Vista de carga de equipos de OpsTwin que compara utilización y espera en equipos de soporte ficticios.',
          caption: 'Evidencia de carga de equipos del despliegue público actual.',
        },
      ],
    },
    method: {
      eyebrow: '05 / Método',
      title: 'La simulación emparejada hace más justa la comparación.',
      paragraphs: [
        'OpsTwin usa números aleatorios comunes. La ejecución 1 de la operación actual y la ejecución 1 de cada cambio propuesto comparten las mismas condiciones simuladas. El emparejamiento se mantiene en las ejecuciones repetidas.',
        'Esto reduce la posibilidad de que una diferencia proceda solo de una demanda simulada distinta. No convierte el modelo en una previsión de producción ni en una prueba causal.',
      ],
      boundaries: [
        'La frecuencia de mejora no es una probabilidad de éxito en producción.',
        'Un rango plausible no es un rango de resultado garantizado.',
        'Un ranking comparativo no es una recomendación operativa.',
        'La evidencia de simulación no es una prueba causal.',
      ],
    },
    engineering: {
      eyebrow: '06 / Ingeniería y fiabilidad',
      title: 'La interfaz muestra evidencia solo después de que el modelo la comprueba.',
      paragraphs: [
        'La interfaz pública envía una solicitud versionada a un servicio de simulación en FastAPI. SimPy ejecuta el modelo de eventos discretos y las semillas hijas deterministas preservan el calendario emparejado entre la línea base y los escenarios.',
        'Un fallo de despliegue también aclaró un límite de propiedad. La web dependía de un fixture fuera de su paquete desplegado, por lo que el activo de ejecución se movió al servicio que lo necesitaba y quedó protegido frente a divergencias.',
      ],
      flow: ['Interfaz Next.js', 'Contrato de solicitud versionado', 'Servicio de simulación FastAPI', 'Motor SimPy', 'Comprobaciones de integridad', 'Evidencia y exportación'],
    },
    outcome: {
      eyebrow: '07 / Resultado',
      title: 'Un prototipo desplegado con evidencia inspeccionable y límites claros.',
      paragraphs: [
        'El producto en vivo, el repositorio público y las capturas actuales permiten inspeccionar la implementación. No se afirma ningún resultado operativo de una empresa real.',
        'En el último punto de verificación registrado, pasaron 247 tests de backend y 172 de frontend. Son registros históricos, no una afirmación sobre la suite completa actual.',
      ],
    },
    limitations: {
      eyebrow: '08 / Límites',
      title: 'Un modelo de soporte acotado, no una plataforma de optimización para producción.',
      items: [
        'El escenario canónico representa un flujo de soporte ficticio, no una operación arbitraria.',
        'No se han procesado datos de empresas ni de usuarios reales.',
        'El prototipo no tiene base de datos, autenticación, persistencia ni estado multiusuario.',
        'La salida de la simulación no es una prueba causal ni una garantía de resultado en producción.',
        'El producto no recomienda una acción de forma autónoma ni garantiza una configuración óptima.',
        'No se afirma un resultado de negocio medido ni un estudio con participantes terminado.',
      ],
      closing:
        'El uso en producción requeriría calibración del modelo, integración de datos, seguridad, observabilidad y validación con definiciones operativas propias de la organización.',
    },
    learning: {
      eyebrow: '09 / Aprendizaje',
      title: 'El límite útil está donde el modelo deja de hablar por quien opera.',
      paragraphs: [
        'Un modelo matemáticamente válido puede fallar como producto si las personas no entienden la decisión que respalda ni la incertidumbre que contiene.',
        'OpsTwin trata el resultado como evidencia comparativa. La persona operadora conserva la decisión, los supuestos y el siguiente paso.',
      ],
    },
    final: {
      title: 'Explora la comparación y revisa el modelo que la sostiene.',
      description: 'Abre el producto guiado o revisa el repositorio y los detalles de implementación.',
      live: 'Abrir producto',
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
  dark = false,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
  dark?: boolean
}) {
  return (
    <section
      id={id}
      className={`data-brief-section ui-section ${dark ? 'data-brief-section--dark' : 'data-brief-section--light'}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="data-brief-section__container ui-section__container">
        <header className="data-brief-refresh-heading ui-section-heading">
          <p className="data-brief-eyebrow ui-eyebrow">{eyebrow}</p>
          <h2 id={`${id}-heading`}>{title}</h2>
        </header>
        {children}
      </div>
    </section>
  )
}

function ProofFigure({ image, full = false }: { image: ProofImage; full?: boolean }) {
  return (
    <figure className={`opstwin-proof-figure${full ? ' opstwin-proof-figure--full' : ''}`}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={full ? '(max-width: 900px) 100vw, 92vw' : '(max-width: 900px) 100vw, 46vw'}
      />
      <figcaption>{image.caption}</figcaption>
    </figure>
  )
}

export default function OpsTwinPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const content = copy[locale]

  useCaseStudySetup()

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="case-study-page-new case-study-page-new--data-brief case-study-page-new--opstwin">
        <section className="data-brief-hero opstwin-hero" aria-labelledby="opstwin-title">
          <div className="data-brief-hero__content">
            <Link href={localizePath('/case-studies', locale)} className="data-brief-back">
              ← {content.back}
            </Link>
            <p className="data-brief-eyebrow">{content.eyebrow}</p>
            <h1 id="opstwin-title" className="data-brief-hero__title">OpsTwin</h1>
            <p className="data-brief-hero__subtitle">{content.subtitle}</p>
            <p className="data-brief-hero__description">{content.description}</p>
            <p className="opstwin-status">{content.status}</p>
            <div className="data-brief-actions" aria-label={content.linksLabel}>
              <a href={liveDemoUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                {content.live} <span aria-hidden="true">↗</span>
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-button">
                {content.github} <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="data-brief-tags" aria-label={content.stackLabel}>
              {stack.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <ProofFigure image={content.heroProof} />
        </section>

        <CaseStudyMiniNav ariaLabel="OpsTwin case study sections" items={content.nav} />
        <CaseStudySnapshot locale={locale} contextHref="#problem" solutionHref="#product" />

        <Section id="problem" {...content.problem}>
          <div className="opstwin-prose">
            {content.problem.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="data-brief-card-grid data-brief-card-grid--software opstwin-card-grid">
            {content.problem.options.map((option, index) => (
              <article key={option} className="data-brief-card data-brief-card--architecture">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{option}</h3>
              </article>
            ))}
          </div>
        </Section>

        <Section id="product" {...content.product}>
          <div className="opstwin-product-grid">
            {content.product.cards.map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="comparison" {...content.comparison} dark>
          <p className="opstwin-prose opstwin-prose--inverse">{content.comparison.intro}</p>
          <div className="data-brief-result-grid opstwin-result-grid">
            {content.comparison.facts.map(([title, description]) => (
              <article key={title}><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
          <ProofFigure image={content.comparison.image} full />
        </Section>

        <Section id="interface-proof" {...content.proof}>
          <div className="opstwin-prose"><p>{content.proof.intro}</p></div>
          <div className="opstwin-proof-grid">
            {content.proof.images.map((image) => <ProofFigure key={image.src} image={image} />)}
          </div>
        </Section>

        <Section id="method" {...content.method} dark>
          <div className="opstwin-prose opstwin-prose--inverse">
            {content.method.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="opstwin-boundary-list">
            {content.method.boundaries.map((boundary) => <p key={boundary}>{boundary}</p>)}
          </div>
        </Section>

        <Section id="engineering" {...content.engineering}>
          <div className="opstwin-prose">
            {content.engineering.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="data-brief-flow opstwin-flow" aria-label="OpsTwin architecture">
            {content.engineering.flow.map((step) => <span key={step}>{step}</span>)}
          </div>
        </Section>

        <Section id="outcome" {...content.outcome} dark>
          <div className="opstwin-prose opstwin-prose--inverse">
            {content.outcome.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </Section>

        <Section id="limitations" {...content.limitations}>
          <ul className="opstwin-limitations">
            {content.limitations.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="opstwin-prose opstwin-prose--closing">{content.limitations.closing}</p>
        </Section>

        <Section id="learning" {...content.learning} dark>
          <div className="opstwin-prose opstwin-prose--inverse">
            {content.learning.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </Section>

        <section id="final-cta" className="data-brief-section data-brief-section--cream ui-section opstwin-final" aria-labelledby="opstwin-final-heading">
          <div className="data-brief-section__container ui-section__container">
            <div className="data-brief-refresh-heading ui-section-heading">
              <p className="data-brief-eyebrow ui-eyebrow">OpsTwin</p>
              <h2 id="opstwin-final-heading">{content.final.title}</h2>
              <p>{content.final.description}</p>
            </div>
            <div className="data-brief-actions">
              <a href={liveDemoUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                {content.final.live} <span aria-hidden="true">↗</span>
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-button">
                {content.final.github} <span aria-hidden="true">↗</span>
              </a>
              <Link href={localizePath('/case-studies', locale)} className="data-brief-button">{content.final.back} →</Link>
            </div>
          </div>
        </section>
      </main>
      <CaseStudyNext currentHref="/case-studies/opstwin" locale={locale} accentColor="var(--accent)" />
      <Footer locale={locale} />
    </>
  )
}
