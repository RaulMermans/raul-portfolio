'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import CaseStudyMiniNav from '@/components/case-studies/CaseStudyMiniNav'
import {
  CommercialCaseStudyIntro,
  type CommercialCaseStudyContent,
} from '@/components/case-studies/CommercialCaseStudySections'
import { useCaseStudySetup } from '@/hooks'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'

const demoUrl = 'https://territoryops-spain.vercel.app'
const githubUrl = 'https://github.com/RaulMermans/territoryops-spain'
const inspirationUrl = 'https://github.com/filipecalegario/awesome-vibe-coding'

const commercialContent: Record<'en' | 'es', CommercialCaseStudyContent> = {
  en: {
    snapshot: [
      {
        label: 'Type',
        value: 'Local-first internal control console and product prototype',
      },
      {
        label: 'Use case',
        value:
          'Real estate scouting, follow-up control, deal-stage review, and location intelligence',
      },
      {
        label: 'Role',
        value:
          'Product framing, workflow design, UX structure, data validation, and implementation',
      },
      {
        label: 'Stack',
        value:
          'Next.js, React, TypeScript, Tailwind CSS, Leaflet, OpenStreetMap, Vitest',
      },
      {
        label: 'Status',
        value:
          'Public prototype; no backend, authentication, team sync, or paid APIs',
      },
    ],
    links: [
      { label: 'Open live prototype', href: demoUrl, external: true },
      { label: 'View GitHub', href: githubUrl, external: true },
    ],
    businessContext:
      'Real estate scouting often begins as a loose collection of Google Maps links, notes, contact details, rough valuations, follow-up dates, and uncertain deal states. As that list grows, the operational question becomes harder: what is controlled, what is being negotiated, what needs attention, and what can be ignored? TerritoryOps was built as a prototype for that specific control problem, not as a marketplace or production enterprise platform.',
    systemSummary:
      'The product brings one local dataset into three complementary views. The map establishes spatial context, the table supports dense operational review, and the pipeline makes deal stages legible. Quick capture, dossier details, attention rules, validation, and JSON/CSV portability keep the workflow useful without requiring backend infrastructure.',
    systemItems: [
      {
        title: 'Map view',
        description:
          'Spain-centered location visibility with shared filters and status context.',
      },
      {
        title: 'Table view',
        description:
          'Sortable operational detail for values, contacts, follow-ups, and warnings.',
      },
      {
        title: 'Pipeline view',
        description:
          'Stage-based scanning across watchlist, interest, evaluation, negotiation, control, and passed locations.',
      },
      {
        title: 'Quick capture',
        description:
          'Focused entry for names, places, coordinates, Google Maps links, and initial status.',
      },
      {
        title: 'Local persistence',
        description:
          'Browser storage keeps setup private, lightweight, and immediately usable.',
      },
      {
        title: 'Attention logic',
        description:
          'Overdue or missing actions and negotiations without contacts become direct drilldowns.',
      },
      {
        title: 'Portable data',
        description:
          'Validated JSON and CSV import/export support backup, transfer, and inspection.',
      },
    ],
    whyItMatters:
      'TerritoryOps turns scattered location research into a structured operating rhythm. It makes follow-ups visible, separates passive interest from active negotiation, and shows how a small internal tool can encode useful business logic without becoming overbuilt.',
    clientRelevance:
      'The same product logic applies to private scouting, site acquisition, retail expansion, cultural venue research, asset pipelines, or any place-based workflow where teams need a clearer relationship between territory, status, evidence, and next action.',
    ctaCopy:
      'TerritoryOps is a prototype for a bounded internal workflow: enough structure to improve decisions, with infrastructure deferred until the operating model proves itself.',
  },
  es: {
    snapshot: [
      {
        label: 'Tipo',
        value: 'Consola interna local-first y prototipo de producto',
      },
      {
        label: 'Uso',
        value:
          'Scouting inmobiliario, control de seguimiento, revisión de fases e inteligencia de ubicaciones',
      },
      {
        label: 'Rol',
        value:
          'Definición de producto, diseño de flujo, estructura UX, validación de datos e implementación',
      },
      {
        label: 'Stack',
        value:
          'Next.js, React, TypeScript, Tailwind CSS, Leaflet, OpenStreetMap y Vitest',
      },
      {
        label: 'Estado',
        value:
          'Prototipo público; sin backend, autenticación, sincronización de equipo ni APIs de pago',
      },
    ],
    links: [
      { label: 'Abrir prototipo', href: demoUrl, external: true },
      { label: 'Ver GitHub', href: githubUrl, external: true },
    ],
    businessContext:
      'El scouting inmobiliario suele empezar como una colección dispersa de enlaces de Google Maps, notas, contactos, valoraciones aproximadas, fechas de seguimiento y estados poco claros. Cuando la lista crece, la pregunta operativa se complica: qué está controlado, qué se negocia, qué requiere atención y qué conviene ignorar. TerritoryOps se construyó como prototipo para ese problema concreto de control, no como marketplace ni plataforma empresarial en producción.',
    systemSummary:
      'El producto reúne un único conjunto de datos local en tres vistas complementarias. El mapa aporta contexto espacial, la tabla permite una revisión operativa densa y el pipeline hace legibles las fases. La captura rápida, los dossiers, las reglas de atención, la validación y la portabilidad JSON/CSV mantienen útil el flujo sin infraestructura de backend.',
    systemItems: [
      {
        title: 'Vista de mapa',
        description:
          'Lectura de ubicaciones en España con filtros compartidos y contexto de estado.',
      },
      {
        title: 'Vista de tabla',
        description:
          'Detalle operativo ordenable para valores, contactos, seguimientos y alertas.',
      },
      {
        title: 'Vista de pipeline',
        description:
          'Lectura por fases entre watchlist, interés, evaluación, negociación, control y descarte.',
      },
      {
        title: 'Captura rápida',
        description:
          'Entrada enfocada para nombre, lugar, coordenadas, enlace de Google Maps y estado inicial.',
      },
      {
        title: 'Persistencia local',
        description:
          'El almacenamiento del navegador reduce configuración y mantiene el uso privado.',
      },
      {
        title: 'Lógica de atención',
        description:
          'Acciones vencidas o ausentes y negociaciones sin contacto se convierten en drilldowns.',
      },
      {
        title: 'Datos portables',
        description:
          'La importación y exportación validada en JSON y CSV facilita copia, traslado e inspección.',
      },
    ],
    whyItMatters:
      'TerritoryOps convierte investigación dispersa de ubicaciones en un ritmo operativo estructurado. Hace visibles los seguimientos, separa interés pasivo de negociación activa y demuestra cómo una herramienta interna pequeña puede codificar lógica de negocio sin sobredimensionarse.',
    clientRelevance:
      'La misma lógica de producto puede aplicarse a scouting privado, adquisición de espacios, expansión retail, investigación de sedes culturales, pipelines de activos o cualquier flujo territorial donde importe relacionar ubicación, estado, evidencia y siguiente acción.',
    ctaCopy:
      'TerritoryOps es un prototipo para un flujo interno acotado: estructura suficiente para mejorar decisiones e infraestructura aplazada hasta validar el modelo operativo.',
  },
}

const content = {
  en: {
    back: '← Case Studies',
    heroEyebrow: 'Territorial intelligence / Local-first decision support',
    heroTitle: 'TerritoryOps Spain',
    heroSubtitle:
      'A local-first territorial intelligence console for tracking place-based opportunities across Spain.',
    heroDescription:
      'TerritoryOps combines geospatial visibility, table-based review, pipeline tracking, and attention logic into a private operational atlas.',
    heroNotice:
      'Prototype scope: local browser data, optional demo records, no backend or authentication.',
    tags: [
      'Internal Tool',
      'Product Prototype',
      'Real Estate Operations',
      'Local-first',
      'Next.js',
      'TypeScript',
    ],
    productImageAlt:
      'TerritoryOps Spain interface showing the location map, opportunity status, filters, and asset dossier.',
    productImageCaption:
      'The TerritoryOps operating surface: map context, pipeline status, attention signals, and asset detail in one view.',
    nav: [
      ['Context', '#business-context'],
      ['Product', '#system-solution'],
      ['Logic', '#logic'],
      ['Features', '#features'],
      ['Build', '#build'],
      ['Interface', '#interface'],
      ['Next', '#next'],
    ] as const,
    logicEyebrow: 'Design logic / Build decisions',
    logicTitle: 'Simple by design, deliberate in operation',
    logicBody:
      'Internal tools should remove operational friction before they add infrastructure. The interface is composed like a private atlas and control room: restrained, information-dense, and focused on capture, status, and visible next actions.',
    decisions: [
      {
        title: 'Local-first before backend',
        description:
          'Workflow validation came before accounts, databases, or synchronization complexity.',
      },
      {
        title: 'Three complementary views',
        description:
          'Map answers where, table answers what, and pipeline answers where each opportunity stands.',
      },
      {
        title: 'Attention as logic',
        description:
          'Missing and overdue follow-ups are actionable records, not a decorative metric.',
      },
      {
        title: 'Portable by default',
        description:
          'CSV and JSON keep the local dataset inspectable, transferable, and easy to back up.',
      },
      {
        title: 'Manual status changes',
        description:
          'No drag-and-drop yet. Stage changes stay intentional through the edit flow.',
      },
      {
        title: 'Infrastructure postponed',
        description:
          'Supabase, auth, audit logs, and team sync remain future options, not premature foundations.',
      },
    ],
    featuresEyebrow: 'Core features',
    featuresTitle: 'A compact operating system for place-based opportunities',
    featuresBody:
      'Each capability supports the same question: what deserves attention, and what is the next responsible action?',
    features: [
      [
        'Map view',
        'Spatial awareness across Spain with status-colored markers.',
      ],
      ['Table view', 'Sortable, dense review of operational and deal fields.'],
      [
        'Pipeline view',
        'Fast scanning across the business-control status model.',
      ],
      [
        'Quick capture',
        'Focused entry with coordinate and Google Maps support.',
      ],
      [
        'Asset dossier drawer',
        'Place, deal, contact, follow-up, and decision context in one panel.',
      ],
      [
        'Needs-attention drilldown',
        'Clickable overdue, missing-action, and missing-contact records.',
      ],
      [
        'Import / export',
        'JSON and CSV portability with proper escaping and compatibility.',
      ],
      [
        'Data validation',
        'Business-number, probability, coordinate, and duplicate checks.',
      ],
      [
        'Local-first persistence',
        'Automatic browser restoration after edits, imports, and view changes.',
      ],
      [
        'CI and test coverage',
        '64 tests plus lint, typecheck, test, and build in GitHub Actions.',
      ],
    ],
    buildEyebrow: 'Technical implementation',
    buildTitle: 'Engineering discipline without platform overhead',
    buildBody:
      'The prototype uses a modern frontend stack and explicit data rules while keeping the operating model intentionally local. Engineering proof supports the product story without turning the case study into repository documentation.',
    proofPoints: [
      { value: '64', label: 'Automated tests' },
      { value: '0', label: 'Backend services' },
      { value: '0', label: 'Paid APIs' },
    ],
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Leaflet',
      'OpenStreetMap',
      'localStorage',
      'Vitest',
      'ESLint',
      'GitHub Actions',
    ],
    buildNotes: [
      'A typed RealEstateLocation model keeps identity, place, business-control, contact, follow-up, and audit fields explicit.',
      'Shared filters persist across Map, Table, and Pipeline, so switching views never resets operational context.',
      'Import validation rejects invalid business values while preserving valid zero values and legacy exports.',
      'General build discipline was informed by the awesome-vibe-coding workflow collection, used as inspiration rather than a dependency or product foundation.',
    ],
    inspirationLabel: 'View workflow inspiration',
    screensEyebrow: 'Product interface',
    screensTitle: 'The complete operating surface in one view',
    screensBody:
      'The interface keeps territory, status, attention signals, filters, and the active asset dossier visible without splitting the workflow across separate tools.',
    console: {
      liveDataset: 'Local dataset',
      synced: 'Views synchronized',
      attention: 'Needs attention',
      records: '4 records',
      queue: 'Opportunity queue',
      dossier: 'Active dossier',
      asset: 'Asset',
      status: 'Status',
      value: 'Target value',
      nextAction: 'Next action',
      due: 'Due',
      map: 'Map',
      table: 'Table',
      pipeline: 'Pipeline',
      locate: 'Locate',
      locateBody:
        'Read geographic concentration and open a record without leaving the territory.',
      qualify: 'Qualify',
      qualifyBody:
        'Compare value, stage, and urgency while the same filters remain active.',
      act: 'Act',
      actBody:
        'Turn missing context or overdue follow-up into a concrete next action.',
    },
    outcomeEyebrow: 'Outcome / Why it matters',
    outcomeTitle: 'From scattered research to an operating workflow',
    outcomeBody:
      'TerritoryOps demonstrates that a small internal tool can make business logic visible without imitating a large platform.',
    outcomes: [
      'Turns loose location research into a structured map, table, and pipeline.',
      'Makes follow-ups and missing operational context visible.',
      'Separates passive interest from active evaluation and negotiation.',
      'Keeps the prototype private, portable, and easy to reason about.',
    ],
    nextEyebrow: 'What I would build next',
    nextTitle: 'Add infrastructure only when the workflow earns it',
    nextBody:
      'The roadmap stays modest and follows validated operating needs rather than feature accumulation.',
    roadmap: [
      'Saved views',
      'Read-only demo mode',
      'Supabase sync',
      'Authentication',
      'Audit log',
      'Attachments',
      'Optional drag-and-drop',
    ],
    closingLabel: 'Closing note',
    closing:
      'TerritoryOps shows how an internal tool can be small, local-first, and still operationally intelligent — a private atlas for decisions, not just another dashboard.',
    liveLabel: 'Open live prototype',
    githubLabel: 'View GitHub',
  },
  es: {
    back: '← Casos de estudio',
    heroEyebrow: 'Inteligencia territorial / Decisión local-first',
    heroTitle: 'TerritoryOps Spain',
    heroSubtitle:
      'Una consola local-first de inteligencia territorial para seguir oportunidades vinculadas a lugares en España.',
    heroDescription:
      'TerritoryOps reúne visibilidad geográfica, revisión en tabla, seguimiento de pipeline y lógica de atención en un atlas operativo privado.',
    heroNotice:
      'Alcance del prototipo: datos locales del navegador, demo opcional, sin backend ni autenticación.',
    tags: [
      'Herramienta interna',
      'Prototipo de producto',
      'Operaciones inmobiliarias',
      'Local-first',
      'Next.js',
      'TypeScript',
    ],
    productImageAlt:
      'Interfaz de TerritoryOps Spain con mapa de ubicaciones, estado de oportunidades, filtros y dossier del activo.',
    productImageCaption:
      'La superficie operativa de TerritoryOps: contexto territorial, estado del pipeline, alertas y detalle del activo en una sola vista.',
    nav: [
      ['Contexto', '#business-context'],
      ['Producto', '#system-solution'],
      ['Lógica', '#logic'],
      ['Funciones', '#features'],
      ['Build', '#build'],
      ['Interfaz', '#interface'],
      ['Siguiente', '#next'],
    ] as const,
    logicEyebrow: 'Lógica de diseño / Decisiones de build',
    logicTitle: 'Simple por diseño, deliberado en operación',
    logicBody:
      'Las herramientas internas deben reducir fricción antes de añadir infraestructura. La interfaz se compone como un atlas privado y una sala de control: contenida, densa y enfocada en captura, estado y siguientes acciones visibles.',
    decisions: [
      {
        title: 'Local-first antes que backend',
        description:
          'La validación del flujo llegó antes que cuentas, bases de datos o complejidad de sincronización.',
      },
      {
        title: 'Tres vistas complementarias',
        description:
          'El mapa responde dónde, la tabla qué y el pipeline en qué fase está cada oportunidad.',
      },
      {
        title: 'Atención como lógica',
        description:
          'Los seguimientos ausentes o vencidos son registros accionables, no una métrica decorativa.',
      },
      {
        title: 'Portable por defecto',
        description:
          'CSV y JSON mantienen el conjunto local inspeccionable, transferible y fácil de respaldar.',
      },
      {
        title: 'Cambios manuales de estado',
        description:
          'Todavía no hay drag-and-drop. Las fases cambian de forma intencional desde la edición.',
      },
      {
        title: 'Infraestructura aplazada',
        description:
          'Supabase, auth, logs y sincronización siguen como opciones futuras, no como cimientos prematuros.',
      },
    ],
    featuresEyebrow: 'Funciones principales',
    featuresTitle:
      'Un sistema operativo compacto para oportunidades territoriales',
    featuresBody:
      'Cada capacidad apoya la misma pregunta: qué merece atención y cuál es la siguiente acción responsable.',
    features: [
      [
        'Vista de mapa',
        'Lectura espacial de España con marcadores por estado.',
      ],
      [
        'Vista de tabla',
        'Revisión densa y ordenable de campos operativos y de operación.',
      ],
      ['Vista de pipeline', 'Lectura rápida del modelo de estados de control.'],
      [
        'Captura rápida',
        'Entrada enfocada con coordenadas y soporte para Google Maps.',
      ],
      [
        'Drawer de dossier',
        'Lugar, operación, contacto, seguimiento y decisión en un panel.',
      ],
      [
        'Drilldown de atención',
        'Registros clicables con vencimientos, acciones o contactos ausentes.',
      ],
      [
        'Importación / exportación',
        'Portabilidad JSON y CSV con escaping y compatibilidad.',
      ],
      [
        'Validación de datos',
        'Controles de cifras, probabilidad, coordenadas y duplicados.',
      ],
      [
        'Persistencia local-first',
        'Restauración automática tras ediciones, imports y cambios de vista.',
      ],
      [
        'CI y cobertura',
        '64 tests más lint, typecheck, test y build en GitHub Actions.',
      ],
    ],
    buildEyebrow: 'Implementación técnica',
    buildTitle: 'Disciplina de ingeniería sin sobrecarga de plataforma',
    buildBody:
      'El prototipo usa un stack frontend moderno y reglas de datos explícitas mientras mantiene el modelo operativo deliberadamente local. La prueba técnica apoya la historia de producto sin convertir el caso en documentación de repositorio.',
    proofPoints: [
      { value: '64', label: 'Tests automatizados' },
      { value: '0', label: 'Servicios backend' },
      { value: '0', label: 'APIs de pago' },
    ],
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Leaflet',
      'OpenStreetMap',
      'localStorage',
      'Vitest',
      'ESLint',
      'GitHub Actions',
    ],
    buildNotes: [
      'Un modelo tipado RealEstateLocation mantiene explícitos identidad, lugar, control de negocio, contacto, seguimiento y auditoría.',
      'Los filtros persisten entre Mapa, Tabla y Pipeline, por lo que cambiar de vista no reinicia el contexto operativo.',
      'La validación de importación rechaza cifras inválidas, preserva ceros válidos y mantiene compatibilidad con exports anteriores.',
      'La disciplina general de build tomó como inspiración la colección awesome-vibe-coding, sin usarla como dependencia ni fundamento del producto.',
    ],
    inspirationLabel: 'Ver inspiración de workflow',
    screensEyebrow: 'Interfaz de producto',
    screensTitle: 'La superficie operativa completa en una sola vista',
    screensBody:
      'La interfaz mantiene visibles territorio, estado, alertas, filtros y el dossier activo sin fragmentar el flujo entre herramientas distintas.',
    console: {
      liveDataset: 'Datos locales',
      synced: 'Vistas sincronizadas',
      attention: 'Requiere atención',
      records: '4 registros',
      queue: 'Cola de oportunidades',
      dossier: 'Dossier activo',
      asset: 'Activo',
      status: 'Estado',
      value: 'Valor objetivo',
      nextAction: 'Siguiente acción',
      due: 'Fecha',
      map: 'Mapa',
      table: 'Tabla',
      pipeline: 'Pipeline',
      locate: 'Localizar',
      locateBody:
        'Lee la concentración geográfica y abre un registro sin salir del territorio.',
      qualify: 'Cualificar',
      qualifyBody:
        'Compara valor, fase y urgencia manteniendo activos los mismos filtros.',
      act: 'Actuar',
      actBody:
        'Convierte contexto ausente o seguimiento vencido en una siguiente acción concreta.',
    },
    outcomeEyebrow: 'Resultado / Por qué importa',
    outcomeTitle: 'De investigación dispersa a flujo operativo',
    outcomeBody:
      'TerritoryOps demuestra que una herramienta interna pequeña puede hacer visible la lógica de negocio sin imitar una gran plataforma.',
    outcomes: [
      'Convierte ubicaciones dispersas en un mapa, una tabla y un pipeline estructurados.',
      'Hace visibles seguimientos y contexto operativo ausente.',
      'Separa interés pasivo de evaluación y negociación activas.',
      'Mantiene el prototipo privado, portable y fácil de razonar.',
    ],
    nextEyebrow: 'Qué construiría después',
    nextTitle: 'Añadir infraestructura solo cuando el flujo la justifique',
    nextBody:
      'La hoja de ruta sigue siendo modesta y responde a necesidades operativas validadas, no a acumulación de funciones.',
    roadmap: [
      'Vistas guardadas',
      'Modo demo solo lectura',
      'Sincronización con Supabase',
      'Autenticación',
      'Registro de auditoría',
      'Adjuntos',
      'Drag-and-drop opcional',
    ],
    closingLabel: 'Nota final',
    closing:
      'TerritoryOps muestra cómo una herramienta interna puede ser pequeña, local-first y aun así operativamente inteligente: un atlas privado para decidir, no otro dashboard.',
    liveLabel: 'Abrir prototipo',
    githubLabel: 'Ver GitHub',
  },
}

export default function TerritoryOpsSpainPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const t = content[locale]

  useCaseStudySetup()

  return (
    <>
      <Header locale={locale} />
      <main
        id="main-content"
        className="case-study-page-new case-study-page-new--benchmark case-study-page-new--territoryops"
      >
        <section
          className="benchmark-hero territoryops-hero"
          aria-labelledby="territoryops-title"
        >
          <div className="benchmark-hero__content">
            <Link
              href={localizePath('/case-studies', locale)}
              className="data-brief-back"
            >
              {t.back}
            </Link>
            <p className="data-brief-eyebrow">{t.heroEyebrow}</p>
            <h1 id="territoryops-title" className="benchmark-hero__title">
              {t.heroTitle}
            </h1>
            <p className="benchmark-hero__subtitle">{t.heroSubtitle}</p>
            <p className="benchmark-hero__description">{t.heroDescription}</p>
            <p className="benchmark-hero__mock-notice">{t.heroNotice}</p>
            <div
              className="data-brief-actions"
              aria-label={
                locale === 'es' ? 'Enlaces del proyecto' : 'Project links'
              }
            >
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button data-brief-button--primary"
              >
                {t.liveLabel}
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button"
              >
                {t.githubLabel}
              </a>
            </div>
            <div
              className="data-brief-tags"
              aria-label={
                locale === 'es' ? 'Etiquetas del proyecto' : 'Project tags'
              }
            >
              {t.tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <CaseStudyMiniNav
          items={t.nav}
          ariaLabel={locale === 'es' ? 'Secciones de la página' : 'Page sections'}
        />

        <CommercialCaseStudyIntro
          content={commercialContent[locale]}
          locale={locale}
        />

        <section
          id="logic"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="territoryops-logic"
        >
          <div className="data-brief-section__container">
            <div className="benchmark-section-heading">
              <p className="data-brief-eyebrow">{t.logicEyebrow}</p>
              <h2 id="territoryops-logic">{t.logicTitle}</h2>
              <p>{t.logicBody}</p>
            </div>
            <div className="territoryops-decision-grid">
              {t.decisions.map((decision, index) => (
                <article
                  key={decision.title}
                  className="data-brief-card territoryops-decision-card"
                >
                  <span className="data-brief-eyebrow">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{decision.title}</h3>
                  <p>{decision.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="features"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="territoryops-features"
        >
          <div className="data-brief-section__container">
            <div className="benchmark-section-heading">
              <p className="data-brief-eyebrow">{t.featuresEyebrow}</p>
              <h2 id="territoryops-features">{t.featuresTitle}</h2>
              <p>{t.featuresBody}</p>
            </div>
            <div className="territoryops-feature-grid">
              {t.features.map(([title, description]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="build"
          className="data-brief-section data-brief-section--dark"
          aria-labelledby="territoryops-build"
        >
          <div className="data-brief-section__container">
            <div className="benchmark-section-heading territoryops-heading--inverse">
              <p className="data-brief-eyebrow">{t.buildEyebrow}</p>
              <h2 id="territoryops-build">{t.buildTitle}</h2>
              <p>{t.buildBody}</p>
            </div>
            <div className="benchmark-proof-strip territoryops-proof-strip">
              {t.proofPoints.map(point => (
                <div key={point.label}>
                  <strong>{point.value}</strong>
                  <span>{point.label}</span>
                </div>
              ))}
            </div>
            <div
              className="territoryops-stack"
              aria-label={locale === 'es' ? 'Stack técnico' : 'Technical stack'}
            >
              {t.stack.map(item => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="territoryops-build-grid">
              {t.buildNotes.map(note => (
                <p key={note}>{note}</p>
              ))}
            </div>
            <a
              href={inspirationUrl}
              target="_blank"
              rel="noreferrer"
              className="data-brief-button territoryops-inspiration-link"
            >
              {t.inspirationLabel}
            </a>
          </div>
        </section>

        <section
          id="interface"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="territoryops-interface-title"
        >
          <div className="data-brief-section__container">
            <div className="benchmark-section-heading">
              <p className="data-brief-eyebrow">{t.screensEyebrow}</p>
              <h2 id="territoryops-interface-title">{t.screensTitle}</h2>
              <p>{t.screensBody}</p>
            </div>

            <figure className="territoryops-product-shot">
              <div className="territoryops-product-shot__frame">
                <Image
                  src="/images/case-studies/territoryops-spain/product/territoryops.webp"
                  alt={t.productImageAlt}
                  width={3018}
                  height={1518}
                  sizes="(max-width: 720px) 100vw, (max-width: 1400px) 92vw, 1320px"
                />
              </div>
              <figcaption>{t.productImageCaption}</figcaption>
            </figure>

            <div className="territoryops-flow">
              {[
                [t.console.locate, t.console.locateBody],
                [t.console.qualify, t.console.qualifyBody],
                [t.console.act, t.console.actBody],
              ].map(([title, description], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="outcome"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="territoryops-outcome"
        >
          <div className="data-brief-section__container data-brief-two-column">
            <div className="benchmark-section-heading benchmark-section-heading--sticky">
              <p className="data-brief-eyebrow">{t.outcomeEyebrow}</p>
              <h2 id="territoryops-outcome">{t.outcomeTitle}</h2>
              <p>{t.outcomeBody}</p>
            </div>
            <ul className="territoryops-outcome-list">
              {t.outcomes.map(outcome => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="next"
          className="data-brief-section data-brief-section--dark"
          aria-labelledby="territoryops-next"
        >
          <div className="data-brief-section__container">
            <div className="benchmark-section-heading territoryops-heading--inverse">
              <p className="data-brief-eyebrow">{t.nextEyebrow}</p>
              <h2 id="territoryops-next">{t.nextTitle}</h2>
              <p>{t.nextBody}</p>
            </div>
            <div className="territoryops-roadmap" aria-label={t.nextTitle}>
              {t.roadmap.map((item, index) => (
                <span key={item}>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  {item}
                </span>
              ))}
            </div>
            <aside className="data-brief-callout territoryops-closing">
              <span>{t.closingLabel}</span>
              <strong>{t.closing}</strong>
            </aside>
            <div className="data-brief-actions">
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button data-brief-button--primary"
              >
                {t.liveLabel}
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button"
              >
                {t.githubLabel}
              </a>
            </div>
          </div>
        </section>

        <CaseStudyNext
          currentHref={pathname}
          accentColor="var(--color-0)"
          locale={locale}
        />
      </main>
      <Footer locale={locale} />
    </>
  )
}
