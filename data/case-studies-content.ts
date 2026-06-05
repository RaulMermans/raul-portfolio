// =============================================
// CASE STUDY CONTENT DATA
// Detailed content structure matching types and CSS
// =============================================

import type { CaseStudyContent } from '@/types/case-study'
import { getCaseStudyImagePath } from '@/lib/case-study-images'
import type { Locale } from '@/lib/i18n'

export const caseStudiesContent: Record<string, CaseStudyContent> = {
  'ai-sports': {
    id: 'ai-sports',
    accentColor: 'var(--accent)',
    layoutVariant: 'wide',
    hero: {
      title: 'AI Sports Campaign',
      tagline: 'An Applied AI Campaign System.',
      subtitle: 'AI System Design & Creative Operations • 2025',
      image: {
        src: getCaseStudyImagePath('ai-sports', 'hero', 'hero.webp'),
        alt: 'AI Sports Campaign - Applied AI campaign system',
        quality: 90,
        sizes: '100vw',
      },
    },
    overview: {
      description:
        'Everyone can generate "cool" images now. Almost no one can generate **consistent campaigns**. I built a custom **n8n automation** system that takes one reference campaign shot and lets me swap the **model and wardrobe** while keeping **lighting, environment, and shot DNA stable**. The result is **campaign-grade coherence** produced in minutes. **Iteration** becomes a **repeatable loop** instead of a re-shoot problem.',
      intentQuote: 'Turn campaign consistency from guesswork into a system you can actually run.',
      meta: [
        { label: 'Type', value: 'AI Automation System' },
        { label: 'Role', value: 'AI System Design & Creative Operations' },
        { label: 'Tools', value: 'n8n, Generative Image API, Reference Conditioning' },
        {
          label: 'Deliverables',
          value: 'n8n Workflow, Input Spec, Consistency Guardrails, Campaign Demo Outputs',
        },
      ],
    },
    challenge: {
      quote: 'Generative AI gives you images. It doesn\'t give you campaigns.',
      context:
        'The baseline problem with **generative image workflows** is **drift**: change one thing and everything changes: **lighting, texture, camera feel**, even the "world" itself. That\'s fine for **one-off visuals**, but **campaigns demand continuity**: the audience should feel like every asset came from the **same production**. The challenge wasn\'t making a single strong image. It was building a **workflow** where the **scene stays constant** while **casting and wardrobe stay editable**.',
      successCriteria: [
        'Outputs must read as one campaign, not separate "generations"',
        'Swap model + wardrobe without rebuilding prompts from scratch',
        'Keep shot anchors stable: environment, lighting, framing, texture',
        'Produce usable variants fast enough for real marketing iteration',
      ],
    },
    approach: {
      text: 'Make it usable: a **system**, not a poster. The key insight: **campaign consistency** comes from **constraints**, not creativity-by-prompt. I designed the **automation** around a **"constants vs variables" model**: first locking the **non-negotiables** of the **reference shot**, then giving controlled flexibility to **casting and wardrobe**. The **workflow** ingests **three visual inputs** and routes them through a **repeatable pipeline** that prioritizes **continuity over novelty**. **Output selection** stays **human-led**: I pick the final based on **realism, brand fit, and product readability**. Campaigns are **edited**, not merely generated.',
      tools: ['n8n', 'Generative API', 'Reference Conditioning', 'Prompt Schema', 'Output Versioning'],
      system: {
        label: 'The Brand System',
        items: [
          {
            title: 'The Variable',
            description: 'Casting (new model reference) + wardrobe (clothing/product references)',
          },
          {
            title: 'The Constant',
            description: 'Reference shot\'s lighting logic, environment, framing, and "same shoot" texture cues',
          },
          {
            title: 'The Output',
            description: 'Small set of campaign-consistent variants ready for creative selection',
          },
        ],
      },
      iterationProof: {
        label: 'Iteration Proof',
        items: [
          {
            title: 'What Changed',
            description: 'Separation of "scene anchors" vs "editable attributes" in workflow logic',
          },
          {
            title: 'Why',
            description: 'Early tests produced strong images that still looked like different shoots. Drift compounded fast',
          },
          {
            title: 'Decision Rule',
            description: 'Continuity wins over "cool." If background, lighting, or feel changes, the output fails. Campaigns are built on sameness with intentional variation.',
          },
        ],
      },
      deliverables: [
        {
          name: 'Automation Pipeline',
          rationale: 'Turns the process into a repeatable asset, not a manual ritual',
        },
        {
          name: '3-Input Spec',
          rationale: 'Makes the system logic explicit and portable',
        },
        {
          name: 'Guardrails + Checklist',
          rationale: 'Enforces campaign continuity, prevents AI drift',
        },
        {
          name: 'Campaign Demo',
          rationale: 'Proves the system under high-scrutiny conditions',
        },
      ],
      images: [
        {
          src: getCaseStudyImagePath('ai-sports', 'approach', 'approach-1.webp'),
          alt: 'AI Sports Campaign - Workflow and system architecture',
          quality: 90,
          sizes: '(max-width: 768px) 100vw, 50vw',
        },
        {
          src: getCaseStudyImagePath('ai-sports', 'approach', 'approach-2.webp'),
          alt: 'AI Sports Campaign - Prompt engineering and consistency techniques',
          quality: 90,
          sizes: '(max-width: 768px) 100vw, 50vw',
        },
      ],
    },
    featureImage: {
      src: getCaseStudyImagePath('ai-sports', 'feature', 'feature_1.webp'),
      alt: 'AI Sports Campaign - Featured showcase of campaign consistency system',
      quality: 90,
      sizes: '(max-width: 1400px) 100vw, 1400px',
    },
    gallery: {
      rows: [
        {
          layout: '2-col',
          items: [
            {
              src: getCaseStudyImagePath('ai-sports', 'gallery', 'gallery-1.webp'),
              alt: 'AI Sports Campaign - Gallery image 1',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 50vw',
            },
            {
              src: getCaseStudyImagePath('ai-sports', 'gallery', 'gallery-2.webp'),
              alt: 'AI Sports Campaign - Gallery image 2',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 50vw',
            },
          ],
        },
        {
          layout: '2-col',
          items: [
            {
              src: getCaseStudyImagePath('ai-sports', 'gallery', 'gallery-3.webp'),
              alt: 'AI Sports Campaign - Gallery image 3',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 50vw',
            },
            {
              src: getCaseStudyImagePath('ai-sports', 'gallery', 'gallery4.webp'),
              alt: 'AI Sports Campaign - Gallery image 4',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 50vw',
            },
          ],
        },
        {
          layout: '2-col',
          items: [
            {
              src: getCaseStudyImagePath('ai-sports', 'gallery', 'gallery-5.webp'),
              alt: 'AI Sports Campaign - Gallery image 5',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 50vw',
            },
            {
              src: getCaseStudyImagePath('ai-sports', 'gallery', 'gallery-6.webp'),
              alt: 'AI Sports Campaign - Gallery image 6',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 50vw',
            },
          ],
        },
      ],
    },
    results: {
      text: 'The system makes campaign iteration fast and controllable: you can adapt casting and styling while keeping the visual world consistent. It replaces "generate until lucky" with a repeatable creative loop. Inputs go in, coherent variants come out in minutes, and the final is chosen through judgment, not randomness. Practically, it enables campaign-level decisions without campaign-level burn rate.',
      takeawayQuote: 'This isn\'t just prompting. It\'s operational infrastructure for repeatable campaign execution.',
    },
  },
  remoria: {
    id: 'remoria',
    accentColor: 'var(--gold)',
    layoutVariant: 'default',
    hero: {
      title: 'Remoria',
      tagline: 'A Fragrance House Etched in Memory',
      subtitle: 'Brand System Design & Creative Infrastructure • 2025',
      image: {
        src: getCaseStudyImagePath('remoria', 'hero', 'hero.webp'),
        alt: 'Remoria Brand Identity - Fragrance House',
        quality: 90,
        sizes: '100vw',
      },
    },
    overview: {
      description:
        '**REMORIA** is a **story-driven fragrance house** inspired by **Roman legacy, Spanish lyricism, and Mediterranean warmth**. I designed a complete **visual and verbal world** where **scent functions like a relic**: quiet, intimate, and emotionally precise. The result is an **understated luxury identity** built to linger through **structure, texture, and silence**.',
      intentQuote: 'To make the brand feel like an artifact rediscovered: warm, silent, and unforgettable.',
      meta: [
        { label: 'Type', value: 'Luxury Brand Identity (Fragrance)' },
        { label: 'Role', value: 'Brand System Design & Creative Infrastructure' },
        { label: 'Tools', value: 'Illustrator, Photoshop, Figma, Pinterest' },
        {
          label: 'Deliverables',
          value: 'Visual Identity System, Tone of Voice, Packaging Concept, Moodboard, Color Palette, Brand Storytelling',
        },
      ],
    },
    challenge: {
      quote: 'What if memory was a brand?',
      context:
        'The goal was to create a **fragrance identity** that communicates **luxury without spectacle**, built on **emotion, restraint, and legacy** rather than trend. **REMORIA** needed to feel **monumental yet intimate**: **classical in reference, modern in execution**, and softened by **Mediterranean light and materiality**. The challenge was **coherence**: ensuring **typography, palette, textures, and copy** all carried the same quiet weight. Success meant the brand could be **felt before it was explained**.',
      successCriteria: [
        'Feel timeless, not retro.',
        'Signal premium through restraint, not ornament.',
        'Build a system that scales across future scents and stories.',
      ],
    },
    approach: {
      text: '**Luxury as restraint**: let the brand whisper, not shout. I anchored **REMORIA** in **narrative strategy** (**memory, myth, and place**), then translated those themes into a **minimal, sculptural identity language**. **Roman-inspired serif forms** established permanence, while **Mediterranean warmth** kept the brand human and sensual. The **palette** was built from **stone, patina, and gilded accents** to evoke **time-worn elegance** without heaviness. **Copy** was treated like fragrance: **sparse, lyrical, and deliberate**. More suggestion than statement.',
      tools: ['Adobe Illustrator', 'Photoshop', 'Figma', 'Pinterest'],
      system: {
        label: 'The Brand System',
        items: [
          {
            title: 'The Variable',
            description: 'Each fragrance narrative (place, emotion, notes)',
          },
          {
            title: 'The Constant',
            description: 'Restraint, timeless structure, tactile elegance',
          },
          {
            title: 'The Output',
            description: 'A scalable luxury identity + storytelling framework',
          },
        ],
      },
      images: [
        {
          src: getCaseStudyImagePath('remoria', 'approach', 'approach-1.webp'),
          alt: 'Remoria logo variations',
        },
        {
          src: getCaseStudyImagePath('remoria', 'approach', 'approach-2.webp'),
          alt: 'Remoria typography system',
        },
      ],
    },
    fullBleedImages: [
      {
        src: getCaseStudyImagePath('remoria', 'full', 'full.webp'),
        alt: 'Remoria full bleed image',
        quality: 90,
        sizes: '100vw',
    },
    ],
    gallery: {
      rows: [
        {
          layout: '3-col',
          items: [
            {
              src: getCaseStudyImagePath('remoria', 'gallery', 'gallery-1.webp'),
              alt: 'Remoria stationery mockup',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 33vw',
            },
            {
              src: getCaseStudyImagePath('remoria', 'gallery', 'gallery-2.webp'),
              alt: 'Remoria packaging design',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 33vw',
            },
            {
              src: getCaseStudyImagePath('remoria', 'gallery', 'gallery-3.webp'),
              alt: 'Remoria website hero concept',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 33vw',
            },
          ],
        },
        {
          layout: '2-col',
          items: [
            {
              src: getCaseStudyImagePath('remoria', 'gallery', 'gallery-4.webp'),
              alt: 'Remoria brand application',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 50vw',
            },
          ],
        },
      ],
    },
    results: {
      text: '**REMORIA** delivered a complete **luxury brand world**: **identity, voice, and aesthetic system** built to **scale without losing its atmosphere**. It proves that **emotional restraint** can communicate **premium** more convincingly than overt signals. The work establishes a **foundation for future fragrances** to live as chapters of the same **mythology**.',
      takeawayQuote: 'Luxury isn\'t loud. It lingers.',
    },
  },
}

const caseStudiesContentEs: Record<string, CaseStudyContent> = {
  'ai-sports': {
    id: 'ai-sports',
    accentColor: 'var(--accent)',
    layoutVariant: 'wide',
    hero: {
      title: 'Campaña deportiva con IA',
      tagline: 'Un sistema de campaña con IA aplicado.',
      subtitle: 'Diseño de sistema de IA y operaciones creativas • 2025',
      image: {
        src: getCaseStudyImagePath('ai-sports', 'hero', 'hero.webp'),
        alt: 'Campaña deportiva con IA - sistema de campaña aplicado',
        quality: 90,
        sizes: '100vw',
      },
    },
    overview: {
      description:
        'Hoy todo el mundo puede generar imágenes "potentes". Casi nadie puede generar **campañas consistentes**. Construí un sistema de **automatización en n8n** que toma una imagen de referencia y me permite cambiar **modelo y vestuario** manteniendo **iluminación, entorno y ADN del plano** estables. El resultado es una **coherencia de nivel campaña** producida en minutos. La **iteración** deja de depender de repetir una sesión y se convierte en un **bucle repetible**.',
      intentQuote: 'Convertir la consistencia de campaña de intuición a sistema operable.',
      meta: [
        { label: 'Tipo', value: 'Sistema de automatización con IA' },
        { label: 'Rol', value: 'Diseño de sistema de IA y operaciones creativas' },
        { label: 'Herramientas', value: 'n8n, API generativa de imagen, condicionamiento por referencia' },
        {
          label: 'Entregables',
          value: 'Flujo en n8n, especificación de entradas, reglas de consistencia y demostraciones de campaña',
        },
      ],
    },
    challenge: {
      quote: 'La IA generativa te da imágenes. No te da campañas.',
      context:
        'El problema base de los **flujos generativos de imagen** es el **drift**: cambias una cosa y cambia todo, desde **iluminación y textura** hasta el "mundo" completo. Eso sirve para **visuales aislados**, pero una **campaña exige continuidad**: que cada pieza parezca salir de la **misma producción**. El reto no era crear una sola imagen buena. Era construir un **flujo de trabajo** donde la **escena se mantuviera constante** mientras **casting y vestuario** siguieran siendo editables.',
      successCriteria: [
        'Las salidas debían leerse como una sola campaña, no como generaciones separadas.',
        'Poder cambiar modelo y vestuario sin rehacer los prompts desde cero.',
        'Mantener estables los anclajes del plano: entorno, iluminación, encuadre y textura.',
        'Producir variantes útiles con suficiente velocidad para iteración real de marketing.',
      ],
    },
    approach: {
      text: 'La clave era hacerlo utilizable: un **sistema**, no un póster. La idea clave fue que la **consistencia de campaña** nace de las **restricciones**, no de la creatividad por prompt. Diseñé la **automatización** alrededor de un modelo de **"constantes vs variables"**: primero fijando los **no negociables** de la imagen de referencia y después dando flexibilidad controlada a **casting y vestuario**. El **flujo** procesa **tres entradas visuales** y las enruta por una secuencia repetible que prioriza la **continuidad por encima de la novedad**. La **selección final** sigue siendo humana: elijo en función de **realismo, ajuste de marca y lectura del producto**. Las campañas se **editan**; no solo se generan.',
      tools: ['n8n', 'API generativa', 'Condicionamiento por referencia', 'Esquema de prompt', 'Versionado de resultados'],
      system: {
        label: 'El sistema',
        items: [
          {
            title: 'La variable',
            description: 'Casting (nueva referencia de modelo) + vestuario (referencias de ropa/producto)',
          },
          {
            title: 'La constante',
            description: 'Lógica de iluminación, entorno, encuadre y pistas de textura de la foto de referencia',
          },
          {
            title: 'La salida',
            description: 'Un conjunto pequeño de variantes consistentes, listas para selección creativa',
          },
        ],
      },
      iterationProof: {
        label: 'Prueba de iteración',
        items: [
          {
            title: 'Qué cambió',
            description: 'Separación entre "anclajes de escena" y "atributos editables" dentro de la lógica del flujo',
          },
          {
            title: 'Por qué',
            description: 'Las primeras pruebas daban imágenes fuertes, pero seguían pareciendo sesiones distintas. El drift se acumulaba rápido',
          },
          {
            title: 'Regla de decisión',
            description: 'La continuidad manda sobre lo llamativo. Si cambian fondo, iluminación o sensación, el resultado falla. Una campaña se construye sobre repetición con variación intencional.',
          },
        ],
      },
      deliverables: [
        {
          name: 'Pipeline de automatización',
          rationale: 'Convierte el proceso en un activo repetible, no en un ritual manual',
        },
        {
          name: 'Especificación de 3 entradas',
          rationale: 'Hace explícita y portable la lógica del sistema',
        },
        {
          name: 'Reglas de consistencia + lista de control',
          rationale: 'Fuerza continuidad de campaña y reduce drift generativo',
        },
        {
          name: 'Demo de campaña',
          rationale: 'Demuestra el sistema bajo condiciones de revisión exigentes',
        },
      ],
      images: [
        {
          src: getCaseStudyImagePath('ai-sports', 'approach', 'approach-1.webp'),
          alt: 'Campaña deportiva con IA - arquitectura del flujo',
          quality: 90,
          sizes: '(max-width: 768px) 100vw, 50vw',
        },
        {
          src: getCaseStudyImagePath('ai-sports', 'approach', 'approach-2.webp'),
          alt: 'Campaña deportiva con IA - técnicas de consistencia',
          quality: 90,
          sizes: '(max-width: 768px) 100vw, 50vw',
        },
      ],
    },
    featureImage: {
      src: getCaseStudyImagePath('ai-sports', 'feature', 'feature_1.webp'),
      alt: 'Campaña deportiva con IA - imagen destacada del sistema de consistencia',
      quality: 90,
      sizes: '(max-width: 1400px) 100vw, 1400px',
    },
    gallery: caseStudiesContent['ai-sports'].gallery,
    results: {
      text: 'El sistema vuelve la iteración de campaña rápida y controlable: puedes adaptar casting y estilismo sin romper el mundo visual. Sustituye el "genera hasta tener suerte" por un bucle creativo repetible. Entradas dentro, variantes coherentes fuera en minutos, y la elección final se hace con criterio, no con azar. En la práctica, permite tomar decisiones de nivel campaña sin asumir el burn rate de una campaña completa.',
      takeawayQuote: 'No es solo prompting. Es infraestructura operativa para ejecutar campañas de forma repetible.',
    },
  },
  remoria: {
    id: 'remoria',
    accentColor: 'var(--gold)',
    layoutVariant: 'default',
    hero: {
      title: 'Remoria',
      tagline: 'Una casa de fragancias grabada en la memoria',
      subtitle: 'Diseño de sistema de marca e infraestructura creativa • 2025',
      image: {
        src: getCaseStudyImagePath('remoria', 'hero', 'hero.webp'),
        alt: 'Remoria - identidad de casa de fragancias',
        quality: 90,
        sizes: '100vw',
      },
    },
    overview: {
      description:
        '**REMORIA** es una **casa de fragancias basada en relato** inspirada por **legado romano, lirismo español y calidez mediterránea**. Diseñé un mundo **visual y verbal** completo donde el aroma funciona como **reliquia**: silenciosa, íntima y precisa en lo emocional. El resultado es una **identidad de lujo contenida** construida para perdurar a través de **estructura, textura y silencio**.',
      intentQuote: 'Hacer que la marca se sienta como un artefacto redescubierto: cálido, silencioso e inolvidable.',
      meta: [
        { label: 'Tipo', value: 'Identidad de marca de lujo (fragancias)' },
        { label: 'Rol', value: 'Diseño de sistema de marca e infraestructura creativa' },
        { label: 'Herramientas', value: 'Illustrator, Photoshop, Figma, Pinterest' },
        {
          label: 'Entregables',
          value: 'Sistema de identidad visual, tono de voz, concepto de packaging, moodboard, paleta y narrativa de marca',
        },
      ],
    },
    challenge: {
      quote: '¿Y si la memoria fuera una marca?',
      context:
        'El objetivo era crear una **identidad de fragancia** que comunicara **lujo sin espectáculo**, apoyada en **emoción, contención y legado** más que en tendencia. **REMORIA** debía sentirse **monumental e íntima** a la vez: **clásica en referencia, moderna en ejecución**, y suavizada por la **luz y materialidad mediterráneas**. El reto era la **coherencia**: que **tipografía, paleta, texturas y copy** cargaran el mismo peso silencioso. El éxito consistía en que la marca pudiera **sentirse antes de explicarse**.',
      successCriteria: [
        'Sentirse atemporal, no retro.',
        'Señalar premium a través de contención, no de ornamento.',
        'Construir un sistema escalable para futuras fragancias e historias.',
      ],
    },
    approach: {
      text: '**Lujo como contención**: dejar que la marca susurre, no que grite. Anclé **REMORIA** en una **estrategia narrativa** (**memoria, mito y lugar**) y traduje esos temas a un lenguaje de identidad **mínimo y escultórico**. Las **serifas de inspiración romana** daban permanencia, mientras la **calidez mediterránea** mantenía la marca humana y sensual. La **paleta** partía de **piedra, pátina y acentos dorados** para evocar **elegancia erosionada por el tiempo** sin pesadez. El **copy** se trató como la fragancia: **escaso, lírico y deliberado**. Más sugerencia que afirmación.',
      tools: ['Adobe Illustrator', 'Photoshop', 'Figma', 'Pinterest'],
      system: {
        label: 'El sistema de marca',
        items: [
          {
            title: 'La variable',
            description: 'Cada narrativa de fragancia (lugar, emoción, notas)',
          },
          {
            title: 'La constante',
            description: 'Contención, estructura atemporal y elegancia táctil',
          },
          {
            title: 'La salida',
            description: 'Una identidad de lujo escalable + marco de storytelling',
          },
        ],
      },
      images: [
        {
          src: getCaseStudyImagePath('remoria', 'approach', 'approach-1.webp'),
          alt: 'Variaciones del logotipo Remoria',
        },
        {
          src: getCaseStudyImagePath('remoria', 'approach', 'approach-2.webp'),
          alt: 'Sistema tipográfico de Remoria',
        },
      ],
    },
    fullBleedImages: caseStudiesContent.remoria.fullBleedImages,
    gallery: caseStudiesContent.remoria.gallery,
    results: {
      text: '**REMORIA** entregó un mundo completo de **marca de lujo**: **identidad, voz y sistema estético** construidos para **escalar sin perder atmósfera**. Demuestra que la **contención emocional** puede comunicar lo **premium** con más fuerza que los signos obvios. El trabajo establece una **base para futuras fragancias** entendidas como capítulos de una misma **mitología**.',
      takeawayQuote: 'El lujo no grita. Permanece.',
    },
  },
}

/**
 * Get case study content by ID
 */
export function getCaseStudyContent(id: string, locale: Locale = 'en'): CaseStudyContent | undefined {
  return locale === 'es' ? caseStudiesContentEs[id] : caseStudiesContent[id]
}
