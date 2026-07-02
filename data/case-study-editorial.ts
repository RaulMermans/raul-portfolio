import type { Locale } from '@/lib/i18n'

export type StrategicSnapshot = {
  problem: string
  system: string
  proof: string
  value: string
  limitation: string
}

type EditorialMeta = {
  category: Record<Locale, string>
  proofTags: Record<Locale, string[]>
  snapshot: Record<Locale, StrategicSnapshot>
  related: string[]
}

export const CASE_STUDY_ORDER = [
  'campaign-pulse',
  'demandos',
  'campaign-sandbox',
  'data-brief-ai',
  'website-auditor',
  'benchmark-dashboard',
  'ai-sports',
  'remoria',
  'blogagent',
  'territoryops-spain',
  'raul-portfolio',
] as const

export const caseStudyEditorial: Record<string, EditorialMeta> = {
  demandos: {
    category: { en: 'Machine Learning', es: 'Machine Learning' },
    proofTags: {
      en: ['Live demo', 'GitHub', 'Tests', 'Synthetic data'],
      es: ['Demo', 'GitHub', 'Tests', 'Datos sintéticos'],
    },
    snapshot: {
      en: {
        problem:
          'Retail operators often have fragmented operational data but limited visibility into demand, stockout risk, and reorder urgency.',
        system:
          'A deterministic ML pipeline that converts raw synthetic commerce records into forecasts, stockout-risk scores, and internal reorder guidance.',
        proof:
          'Live demo, GitHub repo, raw-data pipeline counts, model metrics, dashboard screenshots, backend tests, smoke checks, and public-readiness validation.',
        value:
          'Helps operators prioritize what may run out, what needs replenishment attention, and where planning risk is increasing.',
        limitation:
          'Synthetic portfolio prototype; no real customer data, no live ecommerce connectors, no autonomous purchases, no supplier communication, and no external side effects.',
      },
      es: {
        problem:
          'Los operadores retail suelen tener datos operativos fragmentados y poca visibilidad sobre demanda, riesgo de stockout y urgencia de reposición.',
        system:
          'Un pipeline determinista de ML que convierte registros sintéticos de comercio en forecasts, scores de riesgo de stockout y guía interna de reposición.',
        proof:
          'Demo, GitHub, conteos del pipeline raw, métricas de modelo, capturas del dashboard, tests backend, smoke checks y validación public-readiness.',
        value:
          'Ayuda a priorizar qué puede agotarse, qué requiere atención de reposición y dónde aumenta el riesgo de planificación.',
        limitation:
          'Prototipo sintético de portfolio; sin datos reales de clientes, conectores ecommerce live, compras autónomas, comunicación con proveedores ni efectos externos.',
      },
    },
    related: ['campaign-pulse', 'data-brief-ai', 'benchmark-dashboard'],
  },
  'campaign-pulse': {
    category: { en: 'Marketing Intelligence', es: 'Inteligencia de marketing' },
    proofTags: {
      en: ['Live demo', 'GitHub', 'Tests', 'Export'],
      es: ['Demo', 'GitHub', 'Tests', 'Exportación'],
    },
    snapshot: {
      en: {
        problem:
          'Newsletter, campaign, audience, target, and export data are fragmented across separate operational surfaces.',
        system:
          'A local-first command center that validates CSV inputs, normalizes campaign facts, and computes deterministic diagnostics.',
        proof:
          'Live demo, public GitHub repository, focused tests, screenshots, and browser-generated report and export artifacts.',
        value:
          'Turns monthly marketing data into visible decisions about revenue strength, audience pressure, targets, and next actions.',
        limitation:
          'It uses synthetic or browser-local data; it does not connect to a live CRM or email platform.',
      },
      es: {
        problem:
          'Los datos de newsletters, campañas, audiencias, objetivos y exportaciones están fragmentados en superficies separadas.',
        system:
          'Un centro de mando local-first que valida CSV, normaliza hechos de campaña y calcula diagnósticos deterministas.',
        proof:
          'Demo en vivo, repositorio público, tests, capturas y artefactos de informe y exportación generados en navegador.',
        value:
          'Convierte datos mensuales de marketing en decisiones visibles sobre ingresos, presión de audiencia, objetivos y siguientes acciones.',
        limitation:
          'Usa datos sintéticos o locales del navegador; no conecta con un CRM ni una plataforma de email en vivo.',
      },
    },
    related: ['campaign-sandbox', 'data-brief-ai'],
  },
  'campaign-sandbox': {
    category: { en: 'Campaign Strategy', es: 'Estrategia de campaña' },
    proofTags: {
      en: ['GitHub', 'Export', 'Guardrails'],
      es: ['GitHub', 'Exportación', 'Guardrails'],
    },
    snapshot: {
      en: {
        problem:
          'Campaign briefs arrive as mixed claims, constraints, audience assumptions, and creative mandatories.',
        system:
          'A bounded strategy workspace that structures briefs, generates routes, simulates planning hypotheses, reviews risk, and builds execution plans.',
        proof:
          'Public GitHub repository, interface screenshots, deterministic scoring, validation gates, and Markdown, HTML, and PPTX exports.',
        value:
          'Speeds up strategic synthesis while keeping route selection, critique, and final judgment with the strategist.',
        limitation:
          'Synthetic audience reactions are planning hypotheses, not market research or performance prediction.',
      },
      es: {
        problem:
          'Los briefs llegan como una mezcla de claims, restricciones, supuestos de audiencia y mandatorios creativos.',
        system:
          'Un espacio acotado que estructura briefs, genera rutas, simula hipótesis, revisa riesgos y construye planes de ejecución.',
        proof:
          'Repositorio público, capturas, scoring determinista, controles de validación y exportaciones Markdown, HTML y PPTX.',
        value:
          'Acelera la síntesis estratégica manteniendo la selección, la crítica y el criterio final en manos del estratega.',
        limitation:
          'Las reacciones sintéticas son hipótesis de planificación, no investigación de mercado ni predicción de rendimiento.',
      },
    },
    related: ['ai-sports', 'data-brief-ai'],
  },
  'data-brief-ai': {
    category: { en: 'Bounded AI', es: 'IA acotada' },
    proofTags: {
      en: ['Live demo', 'GitHub', 'Export'],
      es: ['Demo', 'GitHub', 'Exportación'],
    },
    snapshot: {
      en: {
        problem:
          'Spreadsheet reports can sound confident even when the uploaded data cannot support the claimed metrics.',
        system:
          'A bounded reporting pipeline for dataset profiling, controlled Python execution, evaluation, caveats, and grounded export.',
        proof:
          'Live prototype, public GitHub repository, representative report surfaces, generated code, charts, and exportable artifacts.',
        value:
          'Makes AI-assisted analysis faster without allowing unsupported conclusions to pass as business facts.',
        limitation:
          'It is a prototype, not production SaaS or an OS-level execution sandbox; output depends on detectable dataset structure.',
      },
      es: {
        problem:
          'Los informes de hojas de cálculo pueden sonar seguros aunque los datos subidos no respalden las métricas.',
        system:
          'Un pipeline acotado de perfilado, ejecución Python controlada, evaluación, advertencias y exportación fundamentada.',
        proof:
          'Prototipo en vivo, repositorio público, superficies de informe, código generado, gráficos y artefactos exportables.',
        value:
          'Acelera el análisis asistido por IA sin permitir que conclusiones no soportadas pasen por hechos de negocio.',
        limitation:
          'Es un prototipo, no SaaS de producción ni sandbox a nivel de sistema operativo; depende de la estructura detectable.',
      },
    },
    related: ['website-auditor', 'benchmark-dashboard'],
  },
  'website-auditor': {
    category: { en: 'Bounded AI', es: 'IA acotada' },
    proofTags: {
      en: ['GitHub', 'Evidence model', 'Sample report'],
      es: ['GitHub', 'Modelo de evidencia', 'Informe de muestra'],
    },
    snapshot: {
      en: {
        problem:
          'AI website audits often mix observation, scoring, and inference into one opaque answer.',
        system:
          'A public-URL capture pipeline with evidence storage, deterministic scoring, bounded synthesis, and private report assembly.',
        proof:
          'Public GitHub repository, anonymized report preview, evidence labels, workflow diagrams, and documented system boundaries.',
        value:
          'Creates faster, repeatable website diagnostics while preserving the difference between what was measured, observed, and inferred.',
        limitation:
          'It audits public website evidence only and cannot access private analytics, conversion data, or proprietary systems.',
      },
      es: {
        problem:
          'Las auditorías web con IA suelen mezclar observación, puntuación e inferencia en una respuesta opaca.',
        system:
          'Un pipeline de captura de URL pública con almacenamiento de evidencia, scoring determinista, síntesis acotada e informe privado.',
        proof:
          'Repositorio público, vista de informe anonimizada, etiquetas de evidencia, diagramas y límites documentados.',
        value:
          'Crea diagnósticos web más rápidos y repetibles preservando la diferencia entre medición, observación e inferencia.',
        limitation:
          'Audita solo evidencia web pública y no accede a analítica privada, conversiones ni sistemas propietarios.',
      },
    },
    related: ['data-brief-ai', 'benchmark-dashboard'],
  },
  'benchmark-dashboard': {
    category: { en: 'Data Product', es: 'Producto de datos' },
    proofTags: {
      en: ['GitHub', 'Synthetic data', 'Executive views'],
      es: ['GitHub', 'Datos sintéticos', 'Vistas ejecutivas'],
    },
    snapshot: {
      en: {
        problem:
          'Benchmark analysis is hard to repeat when raw observations, metric definitions, validation, scenario work, and executive questions are disconnected.',
        system:
          'A raw-data benchmark intelligence engine with a source_monthly contract, canonical metrics pipeline, generated benchmark rows, executive views, and local scenario forecasts.',
        proof:
          'Public-safe repo, 480 synthetic monthly rows, generated market_total and market_average rows, working Players/Battle Arena views, validation logic, and forecast labeling.',
        value:
          'Helps answer who is gaining tracked benchmark-set share, who is more efficient, which players are improving, and what scenario should be reviewed next.',
        limitation:
          'The public case uses synthetic companies and values; forecasts are scenario projections, not real market prediction.',
      },
      es: {
        problem:
          'El análisis benchmark es difícil de repetir cuando observaciones raw, definiciones métricas, validación, escenarios y preguntas ejecutivas están desconectadas.',
        system:
          'Un motor benchmark desde datos raw con contrato source_monthly, pipeline canónico de métricas, filas benchmark generadas, vistas ejecutivas y forecasts locales de escenario.',
        proof:
          'Repo seguro para publicar, 480 filas mensuales sintéticas, market_total y market_average generadas, vistas Players/Battle Arena funcionando, validación y forecast etiquetado.',
        value:
          'Ayuda a responder quién gana cuota del set benchmark, quién es más eficiente, qué players mejoran y qué escenario revisar.',
        limitation:
          'El caso público usa compañías y valores sintéticos; los forecasts son proyecciones de escenario, no predicción real de mercado.',
      },
    },
    related: ['campaign-pulse', 'data-brief-ai'],
  },
  'ai-sports': {
    category: { en: 'Creative Production', es: 'Producción creativa' },
    proofTags: {
      en: ['Visual system', 'Workflow', 'Guardrails'],
      es: ['Sistema visual', 'Flujo', 'Guardrails'],
    },
    snapshot: {
      en: {
        problem:
          'Generative image workflows drift when one requested change also alters lighting, framing, texture, and campaign world.',
        system:
          'A controlled production workflow that separates fixed scene anchors from editable model, wardrobe, pose, and product variables.',
        proof:
          'n8n workflow logic, input specification, consistency guardrails, reference-conditioned outputs, and campaign image series.',
        value:
          'Makes visual iteration faster while preserving the same-shoot consistency required for campaign production.',
        limitation:
          'Final selection remains human-led; the workflow does not guarantee production-ready realism or replace art direction.',
      },
      es: {
        problem:
          'Los flujos generativos derivan cuando un cambio solicitado altera también luz, encuadre, textura y mundo de campaña.',
        system:
          'Un flujo controlado que separa anclajes fijos de escena de variables editables como modelo, vestuario, pose y producto.',
        proof:
          'Lógica n8n, especificación de entradas, reglas de consistencia, resultados condicionados por referencia y serie visual.',
        value:
          'Acelera la iteración preservando la coherencia de una misma producción que exige una campaña.',
        limitation:
          'La selección final sigue siendo humana; el flujo no garantiza realismo listo para producción ni sustituye la dirección de arte.',
      },
    },
    related: ['campaign-sandbox', 'remoria'],
  },
  remoria: {
    category: { en: 'Brand System', es: 'Sistema de marca' },
    proofTags: {
      en: ['Brand system', 'Packaging', 'Visual world'],
      es: ['Sistema de marca', 'Packaging', 'Mundo visual'],
    },
    snapshot: {
      en: {
        problem:
          'A luxury fragrance concept needs a coherent strategic and sensory system, not isolated premium-looking assets.',
        system:
          'A narrative, visual, verbal, packaging, and product-world framework built around memory, restraint, and Mediterranean materiality.',
        proof:
          'Identity system, tone of voice, palette, typography, packaging concepts, brand applications, and visual campaign world.',
        value:
          'Creates reusable brand rules that can support future fragrances, launch touchpoints, content, and AI-assisted outputs.',
        limitation:
          'This is a brand-system concept; manufacturing, retail rollout, and validated market performance are outside the case.',
      },
      es: {
        problem:
          'Un concepto de fragancia premium necesita un sistema estratégico y sensorial, no activos aislados con apariencia de lujo.',
        system:
          'Un marco narrativo, visual, verbal, de packaging y producto construido sobre memoria, contención y materialidad mediterránea.',
        proof:
          'Identidad, tono de voz, paleta, tipografía, conceptos de packaging, aplicaciones y mundo visual de campaña.',
        value:
          'Crea reglas reutilizables para futuras fragancias, lanzamiento, contenido y resultados asistidos por IA.',
        limitation:
          'Es un concepto de sistema de marca; fabricación, despliegue retail y rendimiento de mercado quedan fuera del caso.',
      },
    },
    related: ['ai-sports', 'raul-portfolio'],
  },
  blogagent: {
    category: { en: 'Workflow Tool', es: 'Herramienta de workflow' },
    proofTags: {
      en: ['GitHub', '1,100+ tests', '13/13 evals'],
      es: ['GitHub', '1.100+ tests', '13/13 evals'],
    },
    snapshot: {
      en: {
        problem:
          'A polished draft can still be unreliable when sources, candidate identity, requested counts, or final contracts are wrong.',
        system:
          'An editorial reliability engine that moves from query contract and source checks to candidate locking, drafting, reviewer veto, and final validation.',
        proof:
          'Public GitHub repository, 1,100+ mock-mode tests, 13/13 workflow evaluations, manual QA topics, and a documented failure-to-fix story.',
        value:
          'Produces faster, source-aware drafts while making workflow reliability and human editorial control explicit.',
        limitation:
          'It remains mock-first, source extraction is heuristic, and every draft still requires human review before publication.',
      },
      es: {
        problem:
          'Un borrador pulido puede ser poco fiable si fuentes, identidad de candidatos, conteos o contratos finales fallan.',
        system:
          'Un motor de fiabilidad editorial: contrato de consulta, control de fuentes, candidatos bloqueados, redacción, veto y validación final.',
        proof:
          'Repositorio público, más de 1.100 tests en mock, 13/13 evaluaciones, QA manual e historia documentada de fallo y mejora.',
        value:
          'Produce borradores más rápidos y conscientes de fuentes haciendo explícitos la fiabilidad y el control editorial humano.',
        limitation:
          'Sigue siendo mock-first, la extracción es heurística y cada borrador requiere revisión humana antes de publicar.',
      },
    },
    related: ['website-auditor', 'data-brief-ai'],
  },
  'territoryops-spain': {
    category: { en: 'Intelligence Systems', es: 'Sistemas de inteligencia' },
    proofTags: {
      en: ['Product prototype', 'Map system', 'Local-first'],
      es: ['Prototipo', 'Sistema de mapa', 'Local-first'],
    },
    snapshot: {
      en: {
        problem:
          'Place-based opportunities become difficult to manage when map context, status, evidence, follow-up, and next action live apart.',
        system:
          'A local-first territorial intelligence console combining an atlas, pipeline, attention logic, dossiers, and deal-stage tracking.',
        proof:
          'Working product prototype, interface screenshots, explicit data rules, map interactions, pipeline states, and roadmap logic.',
        value:
          'Turns fragmented location research into clearer operational attention and more responsible next-action decisions.',
        limitation:
          'The prototype is intentionally local and does not yet add shared accounts, live external data, or team infrastructure.',
      },
      es: {
        problem:
          'Las oportunidades territoriales se vuelven difíciles cuando mapa, estado, evidencia, seguimiento y acción están separados.',
        system:
          'Una consola local-first de inteligencia territorial con atlas, pipeline, lógica de atención, dossiers y fases de operación.',
        proof:
          'Prototipo funcional, capturas, reglas de datos, interacciones de mapa, estados de pipeline y lógica de roadmap.',
        value:
          'Convierte investigación fragmentada en atención operativa clara y decisiones de siguiente acción más responsables.',
        limitation:
          'El prototipo es intencionadamente local y aún no añade cuentas compartidas, datos externos en vivo ni infraestructura de equipo.',
      },
    },
    related: ['campaign-pulse', 'benchmark-dashboard'],
  },
  'raul-portfolio': {
    category: { en: 'Portfolio System', es: 'Sistema de portfolio' },
    proofTags: {
      en: ['Live site', 'GitHub', 'Site architecture'],
      es: ['Sitio en vivo', 'GitHub', 'Arquitectura web'],
    },
    snapshot: {
      en: {
        problem:
          'Multidisciplinary work becomes hard to evaluate when strategy, product systems, brand work, and visual practice appear fragmented.',
        system:
          'A portfolio architecture that connects personal positioning, editorial pacing, case-study proof, visual archives, and GitHub transparency.',
        proof:
          'Live bilingual site, public GitHub repository, static deployment workflow, reusable case-study model, and accessible navigation.',
        value:
          'Makes a broad creative and technical practice commercially legible without flattening it into a generic resume.',
        limitation:
          'It is a supporting self-authored system, not evidence of an external client outcome.',
      },
      es: {
        problem:
          'El trabajo multidisciplinar es difícil de evaluar cuando estrategia, producto, marca y práctica visual aparecen fragmentados.',
        system:
          'Una arquitectura que conecta posicionamiento personal, ritmo editorial, prueba en casos, archivos visuales y transparencia GitHub.',
        proof:
          'Sitio bilingüe en vivo, repositorio público, despliegue estático, modelo reutilizable de casos y navegación accesible.',
        value:
          'Hace legible comercialmente una práctica creativa y técnica amplia sin convertirla en un CV genérico.',
        limitation:
          'Es un sistema propio de apoyo, no evidencia de un resultado para un cliente externo.',
      },
    },
    related: ['campaign-pulse', 'remoria'],
  },
}

export function getCaseStudyEditorial(slug: string) {
  return caseStudyEditorial[slug]
}
