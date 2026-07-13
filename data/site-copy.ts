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
        'AI systems, internal tools, and brand guardrails for teams that need faster creative work without losing control.',
      menuCta: 'Discuss a system',
      toggleLabel: 'Language switcher',
      languageShort: {
        en: 'EN',
        es: 'ES',
      },
    },
    footer: {
      tagline:
        'AI systems for brand and creative teams.',
      work: 'Work',
      services: 'Services',
      resources: 'Resources',
      workLinks: [
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Photography', href: '/photography' },
        { label: 'Visuals', href: '/visuals' },
      ],
      serviceLinks: [
        { label: 'AI Systems & Integrations', href: '/services/ai-integrations' },
        { label: 'Product Prototypes', href: '/services/product-prototypes' },
        { label: 'Brand Systems', href: '/services/brand-systems' },
        { label: 'Creative Automation', href: '/services/creative-automation' },
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
      availability: 'Open to selected projects and collaborations.',
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
        ariaLabel: 'Raúl Mermans — AI systems for brand and creative teams',
        services: ['AI systems for brand and creative teams.'],
        summary:
          'I turn fragmented creative workflows into faster, reviewable, and brand-consistent systems—from workflow strategy to functioning internal tools.',
        primaryCta: 'Discuss a system',
        secondaryCta: 'View selected work',
        scrollAria: 'Scroll to explore',
        scrollLabel: 'Explore',
      },
      positioning: {
        eyebrow: 'How I work',
        title: 'From workflow to working system.',
        body:
          'I start with the specific work a team needs to improve, then make the workflow visible, testable, and safe to use. The result can be a campaign tool that develops concepts from a brief, checks them against brand criteria, and prepares them for human approval.',
        points: [
          'Understand the workflow and business context',
          'Identify the highest-value intervention',
          'Design the system and interaction model',
          'Build and test a working prototype',
          'Refine it with human and brand guardrails',
        ],
      },
      sprint: {
        eyebrow: 'Flagship engagement',
        title: 'Creative AI Systems Sprint',
        forLabel: 'For',
        for: 'Brand and creative teams with fragmented, repetitive, or inconsistent AI-assisted workflows.',
        durationLabel: 'Duration',
        duration: 'Typically 2–4 weeks, depending on scope.',
        includedLabel: 'What is included',
        included: [
          'Workflow and opportunity audit',
          'Identification of high-value AI use cases',
          'System and workflow architecture',
          'Working prototype or internal tool',
          'Brand, quality, and human-review guardrails',
          'Implementation and iteration roadmap',
        ],
        outcomeLabel: 'Outcome',
        outcome: 'A tested, usable system that demonstrates how AI can improve execution while preserving human judgment and brand coherence.',
        followUp: 'This is an entry engagement. Larger strategy, implementation, product development, and ongoing advisory work can follow.',
        cta: 'Discuss a Creative AI Systems Sprint',
      },
      selectedAiSystems: {
        eyebrow: 'Selected systems shipped',
        title: 'Selected AI systems.',
        description:
          'Working prototypes for campaign planning, operational decisions, research, and reporting—each designed to make a specific workflow easier to run and review.',
        viewCase: 'Explore the case study',
        viewAll: 'View all case studies',
        githubCta: 'View GitHub',
        cards: {
          'campaign-pulse': {
            label: 'Marketing intelligence',
            proof:
              'Marketing intelligence command center for newsletters, targets, audience pressure, and monthly reporting.',
          },
          demandos: {
            label: 'Machine learning',
            proof:
              'Deterministic ML system for demand forecasting, stockout risk, and internal reorder guidance.',
          },
          'campaign-sandbox': {
            label: 'Campaign strategy',
            proof:
              'AI-assisted strategy workspace for campaign routes, audience simulation, risk review, and execution planning.',
          },
          'data-brief-ai': {
            label: 'Bounded reporting',
            proof:
              'Bounded reporting workflow that turns spreadsheets into grounded business reports without unsupported metrics.',
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
        title: 'Strategy, design, and implementation in one practice.',
        body:
          'I build <span class="highlight">AI-assisted tools</span>, <span class="highlight">CRM logic</span>, and <span class="highlight">brand workflows</span> that help creative and marketing teams turn scattered inputs into clearer decisions.',
        cta: 'View Profile',
      },
      services: {
        title: 'Supporting capabilities',
        cta: 'Discuss the project',
        items: [
          {
            number: '00-1',
            title: 'AI Systems & Integrations',
            titleShort: 'AI Systems',
            items: ['Creative AI workflows', 'Internal AI tools and automation', 'Research and decision support', 'Brand and quality guardrails'],
            description:
              'AI-assisted systems that help teams research, develop, review, and produce brand work more consistently. For example: a campaign tool that turns a brief into channel-specific concepts for human review.',
            cta: 'See how the engagement works',
            ctaHref: '/services/ai-integrations',
          },
          {
            number: '00-2',
            title: 'Product & Web Prototypes',
            titleShort: 'Prototypes',
            items: ['Validate service ideas', 'Build workflow dashboards', 'Test product logic', 'Create usable demos'],
            description:
              'Usable interfaces that make a system, service, or technical idea testable before full development. For example: an internal interface that coordinates assets, approvals, and production stages.',
            cta: 'Explore prototypes',
            ctaHref: '/services/product-prototypes',
          },
          {
            number: '00-3',
            title: 'Brand Systems & Creative Direction',
            titleShort: 'Brand Systems',
            items: ['Operationalize brand voice', 'Create tone and review rules', 'Structure prompts and criteria', 'Protect campaign consistency'],
            description:
              'The strategic layer that keeps tools and outputs coherent, distinctive, and appropriate. For example: a brand assistant that checks concepts against tone, visual, and messaging criteria.',
            cta: 'Explore brand systems',
            ctaHref: '/services/brand-systems',
          },
          {
            number: '00-4',
            title: 'Photography & Visual Research',
            titleShort: 'Visual Research',
            items: ['Photography', 'Image systems', 'Visual research', 'Cultural observation'],
            description:
              'A supporting creative practice that sharpens visual judgment, cultural observation, and image-making—not a competing primary offer.',
            cta: 'View visual research',
            ctaHref: '/photography',
          },
        ],
      },
      contact: {
        title: 'Start with the creative system.',
        subtitle:
          'Tell me about the process, tool, workflow, or brand system you want to improve with AI. A Creative AI Systems Sprint is a focused starting point for brand, marketing, content, and creative teams.',
        intro: 'You do not need a finished brief. A clear problem, current process, and desired outcome are enough to start.',
        availability: 'Open to selected projects and collaborations.',
        location: 'Madrid · Remote · EU',
        linksLabel: 'Direct contact options',
        emailLabel: 'Discuss a Creative AI Systems Sprint',
        linkedinLabel: 'Start a conversation',
      },
      contactForm: {
        projectTypePlaceholder: 'Select focus area',
        budgetPlaceholder: 'Select budget range',
        timelinePlaceholder: 'Select timeline',
        projectTypes: [
          { value: 'ai-integration-creative-system', label: 'AI Integration / Creative System' },
          { value: 'internal-creative-tool', label: 'Internal Creative Tool' },
          { value: 'campaign-content-workflow', label: 'Campaign / Content Workflow' },
          { value: 'brand-intelligence-system', label: 'Brand Intelligence System' },
          { value: 'automation-layer', label: 'Automation Layer' },
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
            'Describe the current creative process, the tools or team involved, where the workflow breaks down, and the system or outcome you want to improve…',
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
        send: 'Send Creative Systems Brief',
        sendAria: 'Send creative systems brief',
        sendingAria: 'Sending creative systems brief',
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
      title: 'I build the systems behind creative work.',
      paragraphs: [
        'I started in marketing and brand, moved through CRM, luxury retail, and visual practice, and now build AI-assisted tools that help teams make better decisions without losing taste, context, or control.',
        'The work is grounded in real context: Málaga, Madrid, Orlando, IE University, lifecycle and CRM work, luxury partners, internal AI adoption, and portfolio projects that can be opened, tested, and reviewed.',
        'Photography and visual studies are not decoration. They are part of the judgment layer around interfaces, workflows, and technical tools.',
        'The strongest proof is in the work: campaign intelligence, operational intelligence, strategy systems, brand worlds, and controlled visual production.',
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
      backToCaseStudies: 'Back to case studies',
      gallery: 'Gallery',
      scroll: 'Scroll',
    },
    appsPage: {
      title: 'Apps & Prototypes',
      intro:
        'A small archive of product prototypes currently focused on TerritoryOps Spain and Overflow.',
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
        'Sistemas de IA, herramientas internas y criterios de marca para equipos que necesitan avanzar más rápido sin perder control.',
      menuCta: 'Hablar de un sistema',
      toggleLabel: 'Selector de idioma',
      languageShort: {
        en: 'EN',
        es: 'ES',
      },
    },
    footer: {
      tagline:
        'Sistemas de IA para equipos de marca y creatividad.',
      work: 'Trabajo',
      services: 'Servicios',
      resources: 'Recursos',
      workLinks: [
        { label: 'Casos de estudio', href: '/case-studies' },
        { label: 'Fotografía', href: '/photography' },
        { label: 'Visuales', href: '/visuals' },
      ],
      serviceLinks: [
        { label: 'Sistemas e integraciones IA', href: '/services/integraciones-ia' },
        { label: 'Prototipos de producto', href: '/services/prototipos-producto-ia' },
        { label: 'Sistemas de marca', href: '/services/sistemas-de-marca' },
        { label: 'Automatización creativa', href: '/services/automatizacion-creativa' },
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
      availability: 'Abierto a proyectos y colaboraciones seleccionadas.',
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
        ariaLabel: 'Raúl Mermans — Sistemas de IA para equipos de marca y creatividad',
        services: ['Sistemas de IA para equipos de marca y creatividad.'],
        summary:
          'Convierto flujos creativos fragmentados en sistemas más rápidos, revisables y coherentes con la marca, desde la estrategia de procesos hasta herramientas internas funcionales.',
        primaryCta: 'Hablar de un sistema',
        secondaryCta: 'Ver trabajo seleccionado',
        scrollAria: 'Desplazar para explorar',
        scrollLabel: 'Explorar',
      },
      positioning: {
        eyebrow: 'Cómo trabajo',
        title: 'Del flujo a un sistema funcional.',
        body:
          'Empiezo por el trabajo concreto que el equipo necesita mejorar y convierto el flujo en algo visible, comprobable y seguro de usar. Puede ser una herramienta de campaña que desarrolla conceptos desde un brief, los contrasta con criterios de marca y los prepara para revisión humana.',
        points: [
          'Entender el flujo y el contexto de negocio',
          'Identificar la intervención de mayor valor',
          'Diseñar el sistema y el modelo de interacción',
          'Construir y probar un prototipo funcional',
          'Afinar con criterios humanos y de marca',
        ],
      },
      sprint: {
        eyebrow: 'Colaboración principal',
        title: 'Sprint de Sistemas Creativos con IA',
        forLabel: 'Para',
        for: 'Equipos de marca y creatividad con flujos asistidos por IA fragmentados, repetitivos o inconsistentes.',
        durationLabel: 'Duración',
        duration: 'Normalmente 2–4 semanas, según el alcance.',
        includedLabel: 'Qué incluye',
        included: [
          'Auditoría de flujo y oportunidades',
          'Identificación de casos de uso de IA de alto valor',
          'Arquitectura de sistema y flujo',
          'Prototipo funcional o herramienta interna',
          'Criterios de marca, calidad y revisión humana',
          'Hoja de ruta para implementación e iteración',
        ],
        outcomeLabel: 'Resultado',
        outcome: 'Un sistema probado y usable que demuestra cómo la IA puede mejorar la ejecución sin perder criterio humano ni coherencia de marca.',
        followUp: 'Es una colaboración de entrada. Después pueden seguir estrategia, implementación, desarrollo de producto o acompañamiento continuo.',
        cta: 'Hablar de un Sprint de Sistemas Creativos con IA',
      },
      selectedAiSystems: {
        eyebrow: 'Sistemas seleccionados',
        title: 'Sistemas de IA seleccionados.',
        description:
          'Prototipos funcionales para planificación de campañas, decisiones operativas, investigación y reporting: cada uno diseñado para que un flujo concreto sea más fácil de ejecutar y revisar.',
        viewCase: 'Explorar el caso de estudio',
        viewAll: 'Ver todos los casos',
        githubCta: 'Ver GitHub',
        cards: {
          'campaign-pulse': {
            label: 'Inteligencia de marketing',
            proof:
              'Centro de mando para newsletters, objetivos, presión de audiencia e informes mensuales.',
          },
          demandos: {
            label: 'Machine learning',
            proof:
              'Sistema determinista de ML para previsión de demanda, riesgo de stockout y guía interna de reposición.',
          },
          'campaign-sandbox': {
            label: 'Estrategia de campaña',
            proof:
              'Workspace asistido por IA para rutas de campaña, simulación de audiencia, revisión de riesgo y planificación.',
          },
          'data-brief-ai': {
            label: 'Reporting acotado',
            proof:
              'Flujo de reporting que convierte hojas de cálculo en informes fundamentados sin métricas no soportadas.',
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
              'Casos sobre flujos con IA, sistemas aplicados y lógica de marca para que la ejecución se sienta coherente, no improvisada.',
          },
          {
            id: 'apps',
            index: '02',
            eyebrow: 'Prototipos, herramientas internas y pensamiento de interfaz',
            title: 'Apps',
            description:
              'Apps, herramientas y superficies de producto que muestran lógica de flujo, UX tranquila y ejecución aplicada.',
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
        title: 'Estrategia, diseño e implementación en una sola práctica.',
        body:
          'Construyo <span class="highlight">herramientas asistidas por IA</span>, <span class="highlight">lógica CRM</span> y <span class="highlight">workflows de marca</span> que ayudan a equipos creativos y de marketing a convertir inputs dispersos en decisiones más claras.',
        cta: 'Leer más',
      },
      services: {
        title: 'Capacidades de apoyo',
        cta: 'Hablar del proyecto',
        items: [
          {
            number: '00-1',
            title: 'Sistemas e Integraciones IA',
            titleShort: 'Sist. IA',
            items: ['Flujos creativos con IA', 'Herramientas internas y automatización', 'Investigación y apoyo a decisiones', 'Criterios de marca y calidad'],
            description:
              'Sistemas asistidos por IA que ayudan a investigar, desarrollar, revisar y producir trabajo de marca con más consistencia. Por ejemplo: una herramienta de campaña que convierte un brief en conceptos por canal para revisión humana.',
            cta: 'Ver cómo funciona la colaboración',
            ctaHref: '/services/integraciones-ia',
          },
          {
            number: '00-2',
            title: 'Prototipos de Producto y Web',
            titleShort: 'Prototipos',
            items: ['Validar ideas de servicio', 'Crear paneles de flujo', 'Probar lógica de producto', 'Preparar demos utilizables'],
            description:
              'Interfaces usables que hacen comprobable un sistema, servicio o idea técnica antes de su desarrollo completo. Por ejemplo: una interfaz interna que coordina assets, aprobaciones y etapas de producción.',
            cta: 'Explorar prototipos',
            ctaHref: '/services/prototipos-producto-ia',
          },
          {
            number: '00-3',
            title: 'Sistemas de Marca y Dirección Creativa',
            titleShort: 'Marca',
            items: ['Operativizar la voz de marca', 'Crear reglas de tono y revisión', 'Estructurar prompts y criterios', 'Proteger la consistencia'],
            description:
              'La capa estratégica que mantiene herramientas y resultados coherentes, distintivos y apropiados. Por ejemplo: un asistente de marca que contrasta conceptos con criterios de tono, imagen y mensaje.',
            cta: 'Explorar sistemas de marca',
            ctaHref: '/services/sistemas-de-marca',
          },
          {
            number: '00-4',
            title: 'Fotografía e Investigación Visual',
            titleShort: 'Investigación visual',
            items: ['Fotografía', 'Sistemas de imagen', 'Investigación visual', 'Observación cultural'],
            description:
              'Una práctica creativa de apoyo que afina criterio visual, observación cultural e imagen; no compite con la oferta principal.',
            cta: 'Ver investigación visual',
            ctaHref: '/photography',
          },
        ],
      },
      contact: {
        title: 'Empieza por el sistema creativo.',
        subtitle:
          'Cuéntame qué proceso, herramienta, flujo o sistema de marca quieres mejorar con IA. El Sprint de Sistemas Creativos con IA es un punto de partida concreto para equipos de marca, marketing, contenido y creatividad.',
        intro: 'No hace falta tener un brief cerrado. Un problema claro, el proceso actual y el resultado deseado son suficiente para empezar.',
        availability: 'Abierto a proyectos y colaboraciones seleccionadas.',
        location: 'Madrid · Remoto · UE',
        linksLabel: 'Opciones de contacto directo',
        emailLabel: 'Hablar de un Sprint de Sistemas Creativos con IA',
        linkedinLabel: 'Empezar una conversación',
      },
      contactForm: {
        projectTypePlaceholder: 'Selecciona el enfoque',
        budgetPlaceholder: 'Selecciona el rango',
        timelinePlaceholder: 'Selecciona el plazo',
        projectTypes: [
          { value: 'ai-integration-creative-system', label: 'Integración IA / Sistema creativo' },
          { value: 'internal-creative-tool', label: 'Herramienta creativa interna' },
          { value: 'campaign-content-workflow', label: 'Flujo de campaña / contenido' },
          { value: 'brand-intelligence-system', label: 'Sistema de inteligencia de marca' },
          { value: 'automation-layer', label: 'Capa de automatización' },
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
            'Describe el proceso creativo actual, las herramientas o el equipo implicado, dónde se rompe el flujo y qué sistema o resultado quieres mejorar…',
        },
        errors: {
          name: 'El nombre debe tener al menos 2 caracteres.',
          email: 'Introduce un email válido.',
          generic: 'No se pudo enviar el mensaje. Inténtalo de nuevo.',
        },
        success: 'Gracias. Revisaré el brief y te responderé pronto.',
        dismissSuccess: 'Cerrar mensaje de éxito',
        responseNote: 'Normalmente respondo en 24 horas.',
        sending: 'Enviando...',
        send: 'Enviar brief de sistema creativo',
        sendAria: 'Enviar brief de sistema creativo',
        sendingAria: 'Enviando brief de sistema creativo',
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
      title: 'Construyo los sistemas detrás del trabajo creativo.',
      paragraphs: [
        'Empecé desde marketing y marca, pasé por CRM, retail beauty, lujo y práctica visual, y ahora construyo herramientas asistidas por IA que ayudan a equipos a decidir mejor sin perder gusto, contexto ni control.',
        'El trabajo está anclado en contexto real: Málaga, Madrid, Orlando, IE University, lifecycle y CRM, partners de lujo, adopción interna de IA y proyectos de portfolio que se pueden abrir, probar y revisar.',
        'La fotografía y los estudios visuales no son decoración. Forman parte de la capa de criterio alrededor de interfaces, workflows y herramientas técnicas.',
        'La prueba más fuerte está en el trabajo: inteligencia de campaña, inteligencia operativa, sistemas de estrategia, mundos de marca y producción visual controlada.',
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
      backToCaseStudies: 'Volver a casos',
      gallery: 'Galería',
      scroll: 'Desplazar',
    },
    appsPage: {
      title: 'Apps y prototipos',
      intro:
        'Un pequeño archivo de prototipos de producto centrado ahora en TerritoryOps Spain y Overflow.',
    },
    appDetailUi: {
      breadcrumbLabel: 'Apps',
      keyFlows: 'Flujos clave',
      keyFlowsTitle: 'Construido como una superficie de producto real, no como una miniatura de portafolio.',
      selectedScreens: 'Pantallas seleccionadas',
      selectedScreensTitle: 'Momentos de producto diseñados como si fueran un lanzamiento.',
      selectedScreensBody:
        'Cada módulo está diseñado para leerse como una captura premium incluso antes de añadir pantallas definitivas, para que la página no se sienta vacía mientras la app evoluciona.',
      productStory: 'Historia de producto',
      archiveTitle: 'Más trabajo en apps',
      archiveBody: 'Un pequeño archivo de conceptos, herramientas y software en marcha diseñados alrededor de interfaces más tranquilas y claridad operativa.',
    },
  },
} as const

export function getSiteCopy(locale: Locale) {
  return siteCopy[locale]
}
