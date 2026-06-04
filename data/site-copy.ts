import type { Locale } from '@/lib/i18n'

export const siteCopy = {
  en: {
    skipToContent: 'Skip to main content',
    header: {
      logoLabel: 'Home',
      nav: [
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/#services', hash: '#services' },
        { label: 'Contact', href: '/#contact', hash: '#contact' },
      ],
      mobileEyebrow: 'Navigation',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      menuMeta:
        'Applied AI systems, automation layers, and creative infrastructure for marketing, CRM, ecommerce, and brand teams.',
      menuCta: 'Start Project Brief',
      toggleLabel: 'Language switcher',
      languageShort: {
        en: 'EN',
        es: 'ES',
      },
    },
    footer: {
      tagline:
        'Applied AI systems for marketing, CRM, ecommerce, creative, and brand teams.',
      work: 'Work',
      services: 'Services',
      resources: 'Resources',
      workLinks: [
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Photography', href: '/photography' },
        { label: 'Visuals', href: '/visuals' },
      ],
      serviceLinks: [
        { label: 'AI Systems', href: '/#services' },
        { label: 'Automation', href: '/#services' },
        { label: 'Prototypes', href: '/#services' },
        { label: 'Brand Systems', href: '/#services' },
      ],
      resourceLinks: [
        { label: 'About', href: '/about' },
        { label: 'Overflow Support', href: '/overflow/support' },
        { label: 'PromptBase Profile', href: 'https://promptbase.com/profile/mangerm', external: true },
        { label: 'Gumroad Store', href: 'https://raulmermans.gumroad.com/', external: true },
        { label: 'Contact', href: '/#contact' },
      ],
      rightsReserved: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      builtBy: 'Designed and built by Raúl Mermans.',
    },
    home: {
      schema: {
        serviceListName: 'Services by Raúl Mermans',
      },
      hero: {
        greetings: {
          morning: 'GOOD MORNING',
          afternoon: 'GOOD AFTERNOON',
          evening: 'GOOD EVENING',
        },
        ariaLabel: 'Raúl Mermans — AI Systems · Agents · Automation',
        services: ['Applied AI Systems', 'Marketing + CRM', 'Creative Teams'],
        summary:
          'I design agentic workflows, automation layers, and internal AI tools for teams that need faster execution without losing quality, control, or brand coherence. The work sits between strategy, system design, and implementation: mapping the workflow, defining the logic, building the prototype, and creating the guardrails that make AI useful in real operating contexts.',
        primaryCta: 'Request an AI Workflow Audit',
        secondaryCta: 'View Case Studies',
        tertiaryCta: 'View GitHub',
        scrollAria: 'Scroll to explore',
        scrollLabel: 'Explore',
      },
      selectedAiSystems: {
        eyebrow: 'Selected AI Systems',
        title: 'Applied systems, not isolated prompts.',
        description:
          'A tighter selection of AI work where deterministic logic, evidence, interfaces, and bounded model behavior turn into usable internal tools.',
        viewCase: 'View System Logic',
        viewAll: 'View all case studies',
        githubCta: 'View GitHub',
        cards: {
          'data-brief-ai': {
            label: 'Bounded analytics workflow',
            proof: 'CSV/XLSX reports with schema checks, controlled execution, and explainable outputs.',
          },
          'website-auditor': {
            label: 'Evidence-backed audit workflow',
            proof: 'Deterministic capture and scoring first; LLM synthesis only after evidence is accepted.',
          },
          'benchmark-dashboard': {
            label: 'Data product proof',
            proof: 'A reusable benchmark interface for rankings, forecasts, strategic signals, and decision-ready reading.',
          },
        },
      },
      sectionCards: {
        prev: 'Previous section:',
        next: 'Next section:',
        current: 'Current section',
        viewLabel: 'View section',
        sections: [
          {
            id: 'case-studies',
            index: '01',
            eyebrow: 'AI systems, automation, and brand structure',
            title: 'Case Studies',
            description:
              'Case studies spanning agentic workflows, AI systems, and the brand logic that makes execution feel coherent instead of improvised.',
          },
          {
            id: 'apps',
            index: '02',
            eyebrow: 'Prototypes, internal tools, and interface thinking',
            title: 'Apps',
            description:
              'Apps, tools, and product surfaces that show how I think about workflow logic, calm UX, and applied execution.',
          },
          {
            id: 'photography',
            index: '03',
            eyebrow: 'Supporting craft: composition, restraint, image judgment',
            title: 'Photography',
            description:
              'Photography stays in the practice as a way of sharpening taste, direction, and the visual judgment behind stronger systems.',
          },
          {
            id: 'visuals',
            index: '04',
            eyebrow: 'AI image systems and visual experiments',
            title: 'Visuals',
            description:
              'AI visuals, album covers, and image studies shaped as supporting craft for brands, concepts, and fast-moving creative execution.',
          },
        ],
      },
      aboutPreview: {
        label: 'About',
        title: 'AI systems builder with brand intelligence.',
        body:
          'I work at the intersection of <span class="highlight">AI systems</span>, <span class="highlight">brand strategy</span>, and <span class="highlight">product execution</span>, building tools and workflows that are technically structured, commercially useful, and culturally aware.',
        cta: 'View Profile',
      },
      services: {
        title: 'Services',
        cta: 'Start Project Brief',
        items: [
          {
            number: '00-1',
            title: 'AI Systems',
            titleShort: 'AI Systems',
            items: ['Structured AI-assisted processes', 'Internal tools for reporting or research', 'Human review and reliability controls', 'Useful systems beyond isolated prompts'],
            description:
              'Design and prototype AI-assisted workflows, internal tools, and agentic systems for teams that need structured execution, reviewable outputs, and operational reliability.',
          },
          {
            number: '00-2',
            title: 'Automation / Internal Tools',
            titleShort: 'Automation',
            items: ['Reduce repetitive CRM or reporting workflows', 'Connect tools with fewer manual handoffs', 'Standardize recurring business processes', 'Create cleaner flows between people, tools, and data'],
            description:
              'Connect tools, reduce repetitive work, and standardize manual handoffs across CRM, reporting, admin, and creative operations.',
          },
          {
            number: '00-3',
            title: 'Web / Product Prototypes',
            titleShort: 'Product Web',
            items: ['Validate internal tool ideas quickly', 'Build dashboards and workflow prototypes', 'Test product logic before full development', 'Create stakeholder-ready demos'],
            description:
              'Build focused product surfaces, dashboards, and workflow prototypes that help teams test, validate, and operate new systems before full-scale development.',
          },
          {
            number: '00-4',
            title: 'Brand Systems / Creative Direction',
            titleShort: 'Brand Systems',
            items: ['Keep AI content aligned with brand voice', 'Create reusable tone and review rules', 'Translate strategy into operational guidelines', 'Improve consistency across campaigns and CRM'],
            description:
              'Translate brand strategy into reusable rules, prompts, and review criteria so AI-assisted outputs remain coherent across content, CRM, campaigns, and creative work.',
          },
          {
            number: '00-5',
            title: 'Creative Practice',
            titleShort: 'Practice',
            items: ['Photography', 'Image Systems', 'Visual Research', 'Cultural Reading'],
            description:
              'Experiments, visual systems, and creative research exploring the relationship between brand, technology, and culture.',
          },
        ],
      },
      contact: {
        title: 'Start with the workflow.',
        subtitle:
          'Use this form to describe the system, process, or business problem you want to improve. Best fit: marketing, CRM, ecommerce, creative, and brand teams dealing with repetitive workflows, manual handoffs, inconsistent AI outputs, or internal processes that need more structure.',
        intro: 'You do not need a finished brief. A clear problem, current workflow, and desired outcome are enough to start.',
      },
      contactForm: {
        projectTypePlaceholder: 'Select focus area',
        budgetPlaceholder: 'Select budget range',
        timelinePlaceholder: 'Select timeline',
        projectTypes: [
          { value: 'ai-systems', label: 'AI Systems / Agentic Workflows' },
          { value: 'automation-infrastructure', label: 'Automation Infrastructure' },
          { value: 'ai-prototype', label: 'AI Prototype / Internal Tool' },
          { value: 'brand-creative-systems', label: 'Brand / Creative System' },
          { value: 'other', label: 'Other' },
        ],
        budgetRanges: [
          { value: 'under-2500', label: 'Under €2,500' },
          { value: '2500-5000', label: '€2,500 – €5,000' },
          { value: '5000-10000', label: '€5,000 – €10,000' },
          { value: 'over-10000', label: '€10,000+' },
          { value: 'flexible', label: 'Flexible / Not sure' },
        ],
        timelines: [
          { value: 'asap', label: 'ASAP' },
          { value: '1-2-weeks', label: '1-2 weeks' },
          { value: '1-month', label: '1 month' },
          { value: 'flexible', label: 'Flexible' },
        ],
        fields: {
          name: 'Name',
          email: 'Email',
          projectFocus: 'Project Focus',
          budget: 'Budget Range',
          timeline: 'Timeline',
          message: 'Message',
        },
        placeholders: {
          name: 'John Doe',
          email: 'john@example.com',
          message:
            'Describe the current workflow, the team/tools involved, where the process breaks down, and the outcome you want to improve...',
        },
        errors: {
          name: 'Name must be at least 2 characters.',
          email: 'Please enter a valid email address.',
          generic: 'Failed to send message. Please try again.',
        },
        success: "Thank you. I'll review the brief and get back to you soon.",
        dismissSuccess: 'Dismiss success message',
        responseNote: 'I usually reply within 24 hours.',
        sending: 'Sending...',
        send: 'Send Project Brief',
        sendAria: 'Send project brief',
        sendingAria: 'Sending project brief',
      },
      socials: {
        label: 'Connect',
        title: "Let's Connect",
        selectedLinks: 'Proof links',
        location: 'Spain · Available Worldwide',
      },
    },
    aboutPage: {
      label: 'About',
      title: 'Applied AI Systems, Built With Taste',
      paragraphs: [
        'I came into this work through <span class="highlight">business</span>, then taught myself how to build what teams actually need when strategy has to become execution. Today I design <a href="/case-studies" class="highlight">AI systems</a>, <span class="highlight">agentic workflows</span>, and <span class="highlight">automation infrastructure</span> for marketing, CRM, content, and creative operations.',
        'I&apos;m less interested in one-off AI outputs than in the system behind them: where work gets routed, where judgment lives, what should be automated, and how an interface makes the whole thing usable. That means <span class="highlight">workflow logic</span>, <span class="highlight">orchestration</span>, <span class="highlight">internal tools</span>, and <a href="/apps/overflow" class="highlight">product-minded implementation</a>.',
        'Creative taste still matters. My background in brand, visuals, and image-making is useful because it acts as <span class="highlight">quality control inside the system</span>. It helps me decide what should feel restrained, what should stay human, and what makes an output <span class="highlight">commercially credible</span> rather than merely new.',
        'I work best with modern brands and teams that need <span class="highlight">sharper execution</span>, <span class="highlight">better workflows</span>, and infrastructure they can actually use. If the problem sits between marketing, CRM, content, operations, and creative execution, that&apos;s usually where I&apos;m most useful.',
      ],
    },
    caseStudiesUi: {
      pageEyebrow: 'AI Systems · Automation · Creative Infrastructure',
      pageTitle: 'Case Studies',
      pageDescription:
        'Selected work showing how I design AI systems, automation workflows, and brand logic that help modern teams execute with more consistency, control, and commercial clarity.',
      viewProject: 'View Project',
      overview: 'Overview',
      challenge: 'The Challenge',
      successCriteria: 'Success Criteria',
      approach: 'The Approach',
      tools: 'Tools & Technologies',
      results: 'Results',
      moreProjects: 'More Projects',
      viewCaseStudy: 'View Case Study',
      nextProject: 'Next Project',
      caseStudyBadge: 'Case Study',
      scroll: 'Scroll',
    },
    appsPage: {
      title: 'Apps & Prototypes',
    },
    appDetailUi: {
      breadcrumbLabel: 'Apps',
      keyFlows: 'Key flows',
      keyFlowsTitle: 'Built as a real product surface, not a portfolio thumbnail.',
      selectedScreens: 'Selected screens',
      selectedScreensTitle: 'Product moments shaped like a launch.',
      selectedScreensBody:
        'Each module below is designed to read like a premium screenshot even before final captured UI is dropped in, so the landing page does not feel empty while the app is still evolving.',
      productStory: 'Product story',
      archiveTitle: 'More app work',
      archiveBody: 'A small archive of product concepts, tools, and working software shaped around calmer interfaces and operational clarity.',
    },
  },
  es: {
    skipToContent: 'Saltar al contenido principal',
    header: {
      logoLabel: 'Inicio',
      nav: [
        { label: 'Casos', href: '/case-studies' },
        { label: 'Sobre mí', href: '/about' },
        { label: 'Servicios', href: '/#services', hash: '#services' },
        { label: 'Contacto', href: '/#contact', hash: '#contact' },
      ],
      mobileEyebrow: 'Navegación',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      menuMeta:
        'Sistemas de IA, automatización e infraestructura creativa construidos con criterio de producto y contención visual.',
      menuCta: 'Hablar de un proyecto',
      toggleLabel: 'Selector de idioma',
      languageShort: {
        en: 'EN',
        es: 'ES',
      },
    },
    footer: {
      tagline:
        'Constructor de sistemas de IA aplicados, diseñando agentes, automatización e infraestructura creativa para marcas modernas.',
      work: 'Trabajo',
      services: 'Servicios',
      resources: 'Recursos',
      workLinks: [
        { label: 'Casos de estudio', href: '/case-studies' },
        { label: 'Fotografía', href: '/photography' },
        { label: 'Visuales', href: '/visuals' },
      ],
      serviceLinks: [
        { label: 'Sistemas de IA', href: '/#services' },
        { label: 'Automatización', href: '/#services' },
        { label: 'Prototipos', href: '/#services' },
        { label: 'Sistemas de marca', href: '/#services' },
      ],
      resourceLinks: [
        { label: 'Sobre mí', href: '/about' },
        { label: 'Soporte de Overflow', href: '/overflow/support' },
        { label: 'Perfil de PromptBase', href: 'https://promptbase.com/profile/mangerm', external: true },
        { label: 'Tienda de Gumroad', href: 'https://raulmermans.gumroad.com/', external: true },
        { label: 'Contacto', href: '/#contact' },
      ],
      rightsReserved: 'Todos los derechos reservados.',
      privacy: 'Política de privacidad',
      terms: 'Términos del servicio',
      builtBy: 'Diseñado y desarrollado por Raúl Mermans.',
    },
    home: {
      schema: {
        serviceListName: 'Servicios de Raúl Mermans',
      },
      hero: {
        greetings: {
          morning: 'BUENOS DÍAS',
          afternoon: 'BUENAS TARDES',
          evening: 'BUENAS NOCHES',
        },
        ariaLabel: 'Raúl Mermans — Sistemas de IA · Agentes · Automatización',
        services: ['Sistemas de IA', 'Agentes', 'Automatización'],
        summary:
          'Sistemas de IA aplicada para marcas, equipos y operaciones creativas. Diseño flujos agentic, herramientas de automatización y productos internos de IA donde la fiabilidad, la inteligencia de marca y la disciplina de ejecución importan más que el teatro de demo.',
        primaryCta: 'Ver casos de estudio',
        secondaryCta: 'Ver GitHub',
        tertiaryCta: 'Contacto',
        scrollAria: 'Desplazar para explorar',
        scrollLabel: 'Explorar',
      },
      selectedAiSystems: {
        eyebrow: 'Sistemas de IA seleccionados',
        title: 'Sistemas aplicados, no prompts aislados.',
        description:
          'Una selección más directa de trabajo con IA donde lógica determinista, evidencia, interfaces y modelos acotados se convierten en herramientas internas utilizables.',
        viewCase: 'Ver caso',
        viewAll: 'Ver todos los casos',
        githubCta: 'Ver GitHub',
        cards: {
          'data-brief-ai': {
            label: 'Flujo analítico acotado',
            proof: 'Informes desde CSV/XLSX con validación de esquema, ejecución controlada y outputs explicables.',
          },
          'website-auditor': {
            label: 'Auditoría basada en evidencia',
            proof: 'Captura y scoring determinista primero; síntesis LLM solo después de aceptar evidencia.',
          },
          'benchmark-dashboard': {
            label: 'Prueba de producto de datos',
            proof: 'Interfaz benchmark reutilizable para rankings, forecasts, señales estratégicas y lectura orientada a decisión.',
          },
        },
      },
      sectionCards: {
        prev: 'Sección anterior:',
        next: 'Sección siguiente:',
        current: 'Sección actual',
        viewLabel: 'Ver sección',
        sections: [
          {
            id: 'case-studies',
            index: '01',
            eyebrow: 'Sistemas de IA, automatización y estructura de marca',
            title: 'Casos de estudio',
            description:
              'Casos de estudio sobre flujos de trabajo basados en agentes (agentic workflows), sistemas de IA y la lógica de marca que hace que la ejecución se sienta coherente, no improvisada.',
          },
          {
            id: 'apps',
            index: '02',
            eyebrow: 'Prototipos, herramientas internas y pensamiento de interfaz',
            title: 'Apps',
            description:
              'Apps, herramientas y superficies de producto que muestran cómo pienso la lógica de flujo, una experiencia de usuario (UX) fluida y una ejecución aplicada.',
          },
          {
            id: 'photography',
            index: '03',
            eyebrow: 'Oficio de apoyo: composición, contención y criterio visual',
            title: 'Fotografía',
            description:
              'La fotografía sigue en la práctica como una forma de afinar el gusto, la dirección y el criterio visual detrás de sistemas más sólidos.',
          },
          {
            id: 'visuals',
            index: '04',
            eyebrow: 'Sistemas de imagen con IA y experimentos visuales',
            title: 'Visuales',
            description:
              'Visuales con IA, portadas y estudios de imagen pensados como oficio de apoyo para marcas, conceptos y ejecución creativa rápida.',
          },
        ],
      },
      aboutPreview: {
        label: 'Sobre mí',
        title: 'Constructor de sistemas de IA con inteligencia de marca.',
        body:
          'Trabajo en la intersección entre <span class="highlight">sistemas de IA</span>, <span class="highlight">estrategia de marca</span> y <span class="highlight">ejecución de producto</span>, construyendo herramientas y flujos técnicamente sólidos, comercialmente útiles y culturalmente conscientes.',
        cta: 'Leer más',
      },
      services: {
        title: 'Servicios',
        cta: 'Empezar un proyecto',
        items: [
          {
            number: '00-1',
            title: 'Sistemas de IA',
            titleShort: 'Sist. IA',
            items: ['Flujos con agentes', 'Síntesis LLM acotada', 'Bucles de revisión humana', 'Flujos de evidencia'],
            description:
              'Sistemas de IA aplicada para equipos que necesitan ejecución repetible: flujos con agentes, captura de evidencia, reglas deterministas y capas de IA con límites claros.',
          },
          {
            number: '00-2',
            title: 'Automatización / Herramientas internas',
            titleShort: 'Automatización',
            items: ['Mapeo de flujos', 'Automatización CRM', 'Dashboards internos', 'Interfaces operativas'],
            description:
              'Sistemas de automatización y herramientas internas que reducen fricción manual en marketing, CRM, contenido y operaciones creativas sin sacar a las personas del bucle de decisión.',
          },
          {
            number: '00-3',
            title: 'Web / Prototipos de producto',
            titleShort: 'Producto web',
            items: ['Builds en Next.js', 'Superficies de producto', 'UX de prototipo', 'Rendimiento'],
            description:
              'Experiencias web y prototipos con criterio de producto, pensados para hacer utilizables, creíbles e iterables los flujos, ofertas e ideas técnicas.',
          },
          {
            number: '00-4',
            title: 'Sistemas de marca / Dirección creativa',
            titleShort: 'Marca',
            items: ['Inteligencia de marca', 'Identidad visual', 'Sistemas creativos', 'Lógica de campaña'],
            description:
              'Estrategia de marca y dirección creativa como capa de inteligencia alrededor del sistema: posicionamiento, gusto, reglas visuales y contexto cultural para que las herramientas se adopten.',
          },
          {
            number: '00-5',
            title: 'Práctica creativa',
            titleShort: 'Práctica',
            items: ['Fotografía', 'Sistemas de imagen', 'Investigación visual', 'Lectura cultural'],
            description:
              'La fotografía y la imagen quedan como práctica visual de apoyo: una forma de afinar composición, lectura cultural y el criterio detrás de mejores sistemas de IA y marca.',
          },
        ],
      },
      contact: {
        title: 'Construyamos el sistema adecuado.',
        subtitle:
          'Cuéntame tu contexto. Diseño flujos de trabajo e interfaces que ayudan a los equipos a ejecutar con mayor velocidad, consistencia y control.',
        intro: 'Envíame un breve resumen y te responderé en menos de 24 horas.',
      },
      contactForm: {
        projectTypePlaceholder: 'Selecciona el enfoque',
        budgetPlaceholder: 'Selecciona el rango',
        timelinePlaceholder: 'Selecciona el plazo',
        projectTypes: [
          { value: 'ai-systems', label: 'Sistemas de IA / Flujos basados en agentes' },
          { value: 'automation-infrastructure', label: 'Infraestructura de automatización' },
          { value: 'ai-prototype', label: 'Prototipo IA / Herramienta interna' },
          { value: 'brand-creative-systems', label: 'Sistema de marca / creativo' },
          { value: 'other', label: 'Otro' },
        ],
        budgetRanges: [
          { value: 'under-2500', label: 'Menos de 2.500 €' },
          { value: '2500-5000', label: '2.500 € – 5.000 €' },
          { value: '5000-10000', label: '5.000 € – 10.000 €' },
          { value: 'over-10000', label: 'Más de 10.000 €' },
          { value: 'flexible', label: 'Flexible / No lo sé aún' },
        ],
        timelines: [
          { value: 'asap', label: 'Lo antes posible' },
          { value: '1-2-weeks', label: '1-2 semanas' },
          { value: '1-month', label: '1 mes' },
          { value: 'flexible', label: 'Flexible' },
        ],
        fields: {
          name: 'Nombre',
          email: 'Email',
          projectFocus: 'Enfoque del proyecto',
          budget: 'Rango de presupuesto',
          timeline: 'Plazo',
          message: 'Mensaje',
        },
        placeholders: {
          name: 'Juan Pérez',
          email: 'juan@ejemplo.com',
          message:
            'Cuéntame qué estás construyendo, dónde se está rompiendo la ejecución y cómo podrían ayudar la IA, la automatización o una mejor interfaz...',
        },
        errors: {
          name: 'El nombre debe tener al menos 2 caracteres.',
          email: 'Introduce un email válido.',
          generic: 'No se pudo enviar el mensaje. Inténtalo de nuevo.',
        },
        success: 'Gracias. Te responderé pronto.',
        dismissSuccess: 'Cerrar mensaje de éxito',
        responseNote: 'Normalmente respondo en 24 horas.',
        sending: 'Enviando...',
        send: 'Enviar mensaje',
        sendAria: 'Enviar mensaje',
        sendingAria: 'Enviando mensaje',
      },
      socials: {
        label: 'Conectar',
        title: 'Hablemos',
        selectedLinks: 'Pruebas públicas',
        location: 'España · Disponible en todo el mundo',
      },
    },
    aboutPage: {
      label: 'Sobre mí',
      title: 'Sistemas de IA aplicados, construidos con criterio',
      paragraphs: [
        'Llegué a este sector desde el mundo de los negocios y aprendí de forma autodidacta a crear los sistemas que los equipos realmente necesitan. Hoy diseño <span class="highlight">flujos de trabajo con IA</span>, <span class="highlight">capas de automatización</span> e <span class="highlight">interfaces orientadas a producto</span>... Mi valor diferencial es la combinación de <span class="highlight">pensamiento sistémico</span>, <span class="highlight">implementación práctica</span> y un <span class="highlight">criterio creativo</span> lo suficientemente sólido como para mantener un resultado coherente, útil y listo para desplegarse.',
      ],
    },
    caseStudiesUi: {
      pageEyebrow: 'Sistemas de IA · Automatización · Infraestructura creativa',
      pageTitle: 'Casos de estudio',
      pageDescription:
        'Trabajo seleccionado que muestra cómo diseño sistemas de IA, flujos de automatización y lógica de marca para que equipos modernos ejecuten con más consistencia, control y claridad comercial.',
      viewProject: 'Ver proyecto',
      overview: 'Resumen',
      challenge: 'El reto',
      successCriteria: 'Criterios de éxito',
      approach: 'El enfoque',
      tools: 'Herramientas y tecnologías',
      results: 'Resultados',
      moreProjects: 'Más proyectos',
      viewCaseStudy: 'Ver caso de estudio',
      nextProject: 'Siguiente proyecto',
      caseStudyBadge: 'Caso de estudio',
      scroll: 'Scroll',
    },
    appsPage: {
      title: 'Apps y prototipos',
    },
    appDetailUi: {
      breadcrumbLabel: 'Apps',
      keyFlows: 'Flujos clave',
      keyFlowsTitle: 'Construido como una superficie de producto real, no como una miniatura de portfolio.',
      selectedScreens: 'Pantallas seleccionadas',
      selectedScreensTitle: 'Momentos de producto diseñados como si fueran un lanzamiento.',
      selectedScreensBody:
        'Cada módulo está diseñado para leerse como una captura premium incluso antes de añadir pantallas definitivas, para que la página no se sienta vacía mientras la app evoluciona.',
      productStory: 'Historia de producto',
      archiveTitle: 'Más trabajo en apps',
      archiveBody: 'Un pequeño archivo de conceptos, herramientas y software en marcha diseñados alrededor de interfaces más fluidas y claridad operativa.',
    },
  },
} as const

export function getSiteCopy(locale: Locale) {
  return siteCopy[locale]
}
