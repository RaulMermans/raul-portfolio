import type { Locale } from '@/lib/i18n'

/** Public-safe summaries. Evidence sources and publication limits live in docs/positioning-sprint.md. */
export const independentSystems = {
  'local-ai-coding-agent': {
    title: 'Local AI Coding Agent',
    image: '/images/case-studies/local-ai-coding-agent/architecture.svg',
    socialImage: '/images/case-studies/local-ai-coding-agent/architecture.png',
    en: {
      tagline: 'A coding agent for local models.',
      summary: 'An agentic coding runtime for local, open-weight models, built around inspectable tools, bounded context, and human review.',
      status: 'Private local prototype. Selected architecture and evaluation scope shown.',
      role: 'Independent architecture and TypeScript implementation: agent core, model gateway, context compiler, tool loop, permissions, and evaluation.',
      snapshot: {
        problem: 'Local coding models need more than a chat interface to inspect a repository, gather evidence, and recover from unproductive tool calls.',
        system: 'An editor-independent TypeScript runtime with a local model gateway, bounded context, repository tools, permission checks, and controlled repair.',
        proof: 'A documented 24-task read-only evaluation corpus and a separate 30-case deterministic coding baseline. These test different parts of the system.',
        value: 'Makes local AI-assisted development inspectable at the level of tool choice, evidence, edits, and verification.',
        limitation: 'A prototype, not a production coding assistant. Deterministic harness results do not establish live model reliability; IDE integration remains planned.',
      },
      chapters: [
        { id: 'problem', title: 'Give the model a bounded job', body: 'The project separates repository inspection, planning, debugging, and mutation. A model response is only one step: the runtime also needs to know what evidence was gathered, which tools may run, and when the task should stop.' },
        { id: 'architecture', title: 'A runtime independent of the editor', body: 'The TypeScript core connects a context compiler and Markdown project memory to a turn-budgeted agent loop. A gateway normalizes model tool calls; repository tools return bounded observations. Permission checks control edits and verification. A local OpenAI-compatible endpoint supports open-weight inference, with Qwen 2.5 Coder 7B evaluated through Ollama.' },
        { id: 'evaluation', title: 'Test the model and the runtime separately', body: 'The read-only corpus contains 24 tasks: 20 development cases and four held-out cases covering repository orientation, symbols, configuration, test diagnosis, and cross-file reasoning. Context configurations of 2,048, 8,192, and 32,768 tokens were investigated. A separate 30-case deterministic baseline exercises edits, verification, and safe rejection. Published summaries disagree on success and tool-selection rates, so no aggregate performance claim is made here.' },
        { id: 'recovery', title: 'Make failure a visible state', body: 'Turn budgets, loop detection, an evidence ledger, and a premature-answer gate constrain non-progress. Mutation uses reviewed patches and base-hash checks; verification and repair remain bounded and subject to human approval. These controls are implemented mechanisms, not a guarantee that every model-driven task succeeds.' },
        { id: 'boundaries', title: 'Local inference, explicit limits', body: 'The public case describes selected architecture without exposing the private workspace. The CLI and runtime are implemented; IDE integration is planned. Results from deterministic fixtures are kept separate from live inference. No production adoption, general coding success rate, or comparative latency is claimed.' },
      ],
    },
    es: {
      tagline: 'Un agente de programación para modelos locales.',
      summary: 'Un runtime de programación con agentes para modelos locales de pesos abiertos, con herramientas revisables, contexto acotado y supervisión humana.',
      status: 'Prototipo local privado. Arquitectura seleccionada y alcance de evaluación públicos.',
      role: 'Arquitectura e implementación independiente en TypeScript: núcleo del agente, gateway de modelos, compilador de contexto, herramientas, permisos y evaluación.',
      snapshot: {
        problem: 'Los modelos locales necesitan más que un chat para inspeccionar repositorios, reunir evidencia y recuperarse de llamadas a herramientas sin progreso.',
        system: 'Runtime TypeScript independiente del editor con gateway local, contexto acotado, herramientas de repositorio, permisos y reparación controlada.',
        proof: 'Corpus documentado de 24 tareas de solo lectura y una base separada de 30 casos deterministas de programación. Evalúan partes distintas del sistema.',
        value: 'Permite revisar el desarrollo asistido por IA local a través de las herramientas elegidas, la evidencia, los cambios y la verificación.',
        limitation: 'Prototipo, no asistente de programación en producción. Las pruebas deterministas no demuestran fiabilidad del modelo en vivo; la integración IDE está prevista.',
      },
      chapters: [
        { id: 'problem', title: 'Dar al modelo una tarea acotada', body: 'El proyecto separa inspección, planificación, diagnóstico y modificación. La respuesta del modelo es un paso del proceso: el runtime también necesita saber qué evidencia se reunió, qué herramientas pueden ejecutarse y cuándo detener la tarea.' },
        { id: 'architecture', title: 'Un runtime independiente del editor', body: 'El núcleo TypeScript conecta un compilador de contexto y memoria Markdown con un bucle de agente limitado por turnos. Un gateway normaliza llamadas del modelo; las herramientas del repositorio devuelven observaciones acotadas. Los permisos controlan cambios y verificación. Un endpoint local compatible con OpenAI permite inferencia con modelos de pesos abiertos; Qwen 2.5 Coder 7B se evaluó mediante Ollama.' },
        { id: 'evaluation', title: 'Evaluar modelo y runtime por separado', body: 'El corpus de solo lectura tiene 24 tareas: 20 de desarrollo y cuatro reservadas, sobre orientación en repositorios, símbolos, configuración, diagnóstico de tests y razonamiento entre archivos. Se investigaron contextos de 2.048, 8.192 y 32.768 tokens. Otra base de 30 casos deterministas prueba cambios, verificación y rechazo seguro. Los resúmenes discrepan en éxito y selección de herramientas, por lo que aquí no se publica una cifra agregada de rendimiento.' },
        { id: 'recovery', title: 'Hacer visible el fallo', body: 'Los límites de turnos, la detección de bucles, el registro de evidencia y la validación antes de responder acotan la falta de progreso. Los cambios usan parches revisados y comprobación del hash de origen; verificación y reparación tienen límites y aprobación humana. Son mecanismos implementados, no una garantía de éxito para cada tarea del modelo.' },
        { id: 'boundaries', title: 'Inferencia local, límites explícitos', body: 'El caso público muestra arquitectura seleccionada sin exponer el entorno privado. La CLI y el runtime están implementados; la integración IDE está prevista. Las pruebas con fixtures deterministas se distinguen de la inferencia en vivo. No se afirma adopción en producción, éxito general de programación ni latencia comparativa.' },
      ],
    },
  },
  iris: {
    title: 'IRIS',
    image: '/images/case-studies/iris/architecture.svg',
    socialImage: '/images/case-studies/iris/architecture.png',
    repository: 'https://github.com/RaulMermans/JARVIS-OS',
    en: {
      tagline: 'Personal orchestration for bounded agents.',
      summary: 'A personal agent orchestration system that organizes attention, coordinates specialist work, and governs actions through human oversight.',
      status: 'Private system. Public architecture showcase with synthetic examples, currently published as JARVIS OS.',
      role: 'Independent system design across attention, agent coordination, memory, action policy, observability, evaluation, and recovery.',
      snapshot: {
        problem: 'Commitments spread across calendar, email, tasks, and projects make it difficult to decide what deserves attention and what can safely be delegated.',
        system: 'An evidence-backed attention pipeline feeds a prioritized work queue and bounded specialists. Action proposals pass through policy, approval, execution, and verification.',
        proof: 'A public architecture edition with re-authored documentation, illustrative TypeScript contracts, and synthetic walkthroughs. It is not the full private runtime.',
        value: 'Connects prioritization and agent work with explicit authority, inspectable state, and recovery rather than unbounded autonomy.',
        limitation: 'Personal integrations, production policies, and private data remain private. Public examples demonstrate design, not independently measured production reliability.',
      },
      chapters: [
        { id: 'problem', title: 'Attention before execution', body: 'IRIS begins with the question of what needs attention. Its documented pipeline collects and filters context, removes duplicates, scores evidence, and validates bounded synthesis before placing work in P0 to P3 priority bands.' },
        { id: 'architecture', title: 'Specialists share a governed work queue', body: 'Management, research, analysis, planning, critique, lead scoring, CRM, and code roles have distinct responsibilities. The public design separates proposing an action from authorizing it. One router and one action pipeline keep tools, autonomy controls, and trace events under a common policy.' },
        { id: 'memory', title: 'Memory carries provenance', body: 'Working, episodic, semantic, and procedural memory have different lifecycles. Records carry scope, provenance, time, and confidence. Durable memory is proposed for human review; a remembered fact cannot independently turn itself into an urgent task or widen agent permissions.' },
        { id: 'recovery', title: 'Execution needs a separate verification step', body: 'The recovery model distinguishes preparation, execution, verification, safe retry, rollback, and escalation. Expired approvals and stale context stop consequential actions. Evaluation scenarios cover grounding, degraded sources, approval enforcement, injection resistance, and recovery. These are documented evaluation contracts; no pass rate is claimed here.' },
        { id: 'boundaries', title: 'A public window into a private system', body: 'IRIS is the portfolio name for the project currently published as JARVIS OS. The linked repository is an architecture and engineering showcase: documentation, illustrative contracts, and fully synthetic examples. The full implementation and personal integrations remain private. The public edition does not prove deployment maturity or autonomous operation.' },
      ],
    },
    es: {
      tagline: 'Orquestación personal de agentes con límites claros.',
      summary: 'Un sistema personal de orquestación de agentes que organiza la atención, coordina trabajo especializado y gobierna acciones con supervisión humana.',
      status: 'Sistema privado. Muestra pública de arquitectura con ejemplos sintéticos, publicada actualmente como JARVIS OS.',
      role: 'Diseño independiente de atención, coordinación de agentes, memoria, políticas de acción, observabilidad, evaluación y recuperación.',
      snapshot: {
        problem: 'Los compromisos repartidos entre calendario, correo, tareas y proyectos dificultan decidir qué merece atención y qué se puede delegar con seguridad.',
        system: 'Un pipeline de atención basado en evidencia alimenta una cola priorizada y especialistas acotados. Las propuestas pasan por política, aprobación, ejecución y verificación.',
        proof: 'Edición pública con documentación reescrita, contratos TypeScript ilustrativos y recorridos sintéticos. No contiene el runtime privado completo.',
        value: 'Conecta prioridades y trabajo de agentes con autoridad explícita, estado revisable y recuperación, sin autonomía ilimitada.',
        limitation: 'Las integraciones personales, políticas de producción y datos privados quedan fuera. Los ejemplos demuestran diseño, no fiabilidad en producción medida de forma independiente.',
      },
      chapters: [
        { id: 'problem', title: 'Atención antes de ejecución', body: 'IRIS empieza por identificar qué necesita atención. El pipeline documentado reúne y filtra contexto, elimina duplicados, puntúa evidencia y valida síntesis acotada antes de colocar trabajo en bandas de prioridad P0 a P3.' },
        { id: 'architecture', title: 'Especialistas con una cola gobernada', body: 'Gestión, investigación, análisis, planificación, crítica, scoring de leads, CRM y código tienen responsabilidades distintas. El diseño público separa proponer una acción de autorizarla. Un router y un pipeline de acciones mantienen herramientas, autonomía y trazas bajo una política común.' },
        { id: 'memory', title: 'Memoria con procedencia', body: 'Las memorias de trabajo, episódica, semántica y procedural tienen ciclos distintos. Sus registros incluyen alcance, procedencia, fecha y confianza. La memoria duradera se propone para revisión humana; un recuerdo no puede crear urgencia por sí solo ni ampliar permisos.' },
        { id: 'recovery', title: 'Ejecutar exige una verificación aparte', body: 'El modelo distingue preparación, ejecución, verificación, reintento seguro, reversión y escalado. Las aprobaciones caducadas y el contexto obsoleto detienen acciones relevantes. Los escenarios de evaluación cubren fundamentación, fuentes degradadas, permisos, resistencia a inyección y recuperación. Son contratos de evaluación documentados; aquí no se afirma una tasa de éxito.' },
        { id: 'boundaries', title: 'Una ventana pública a un sistema privado', body: 'IRIS es el nombre del portfolio para el proyecto publicado actualmente como JARVIS OS. El repositorio enlazado muestra arquitectura e ingeniería: documentación, contratos ilustrativos y ejemplos totalmente sintéticos. La implementación completa y las integraciones personales siguen siendo privadas. La edición pública no demuestra madurez de despliegue ni operación autónoma.' },
      ],
    },
  },
} as const

export type IndependentSystemSlug = keyof typeof independentSystems
export function getIndependentSystem(slug: IndependentSystemSlug, locale: Locale) {
  return { ...independentSystems[slug], ...independentSystems[slug][locale] }
}

/** Editorial tiers supplement, rather than replace, the canonical discipline taxonomy. */
export const SYSTEM_COLLECTIONS = [
  { id: 'selected', slugs: ['local-ai-coding-agent', 'website-auditor', 'iris', 'demandos'], en: { title: 'Selected systems', body: 'Four independent systems: local inference, evidence workflows, agent orchestration, and inventory intelligence.' }, es: { title: 'Sistemas seleccionados', body: 'Cuatro sistemas propios: inferencia local, flujos de evidencia, orquestación de agentes e inteligencia de inventario.' } },
  { id: 'explorations', slugs: ['data-brief-ai', 'searchsignal', 'campaign-pulse', 'opstwin', 'relay', 'blogagent'], en: { title: 'Experiments & explorations', body: 'Working prototypes and demonstrators with explicit data, evaluation, and deployment boundaries.' }, es: { title: 'Experimentos y exploraciones', body: 'Prototipos funcionales y demostradores con límites explícitos de datos, evaluación y despliegue.' } },
  { id: 'practice', slugs: ['remoria', 'ai-sports', 'campaign-sandbox', 'benchmark-dashboard', 'territoryops-spain', 'raul-portfolio'], en: { title: 'Archive & practice', body: 'Brand worlds, creative systems, operational tools, and earlier work that inform the wider practice.' }, es: { title: 'Archivo y práctica', body: 'Universos de marca, sistemas creativos, herramientas operativas y trabajo anterior que nutre la práctica.' } },
] as const

export const SELECTED_SYSTEM_SLUGS = SYSTEM_COLLECTIONS[0].slugs
