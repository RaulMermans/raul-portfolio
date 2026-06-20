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
        'Applied AI systems, automation layers, and creative infrastructure for brand-led teams, content studios, and cultural projects.',
      menuCta: 'Start Creative Systems Brief',
      toggleLabel: 'Language switcher',
      languageShort: {
        en: 'EN',
        es: 'ES',
      },
    },
    footer: {
      tagline:
        'AI integrations for creative systems, brand workflows, and cultural execution.',
      work: 'Work',
      services: 'Services',
      resources: 'Resources',
      workLinks: [
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Photography', href: '/photography' },
        { label: 'Visuals', href: '/visuals' },
      ],
      serviceLinks: [
        { label: 'AI Integrations', href: '/services/ai-integrations' },
        { label: 'Creative Automation', href: '/services/creative-automation' },
        { label: 'Brand Systems', href: '/services/brand-systems' },
        { label: 'Product Prototypes', href: '/services/product-prototypes' },
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
        ariaLabel: 'Raúl Mermans — AI Integrations · Brand Workflows · Creative Systems',
        services: ['AI Integrations', 'Brand Workflows', 'Creative Systems'],
        summary:
          'I design AI integrations that help creative teams move faster without losing taste, control, or brand coherence.',
        primaryCta: 'Discuss an AI Integration',
        secondaryCta: 'View Case Studies',
        tertiaryCta: 'View GitHub',
        scrollAria: 'Scroll to explore',
        scrollLabel: 'Explore',
      },
      positioning: {
        eyebrow: 'System Logic',
        title: 'Creative infrastructure for AI-assisted execution.',
        body:
          'The work sits between strategy, system design, and implementation: mapping the creative process, defining the logic, building prototypes, and creating the guardrails that make AI useful inside real brand, content, and visual workflows.',
        points: [
          'Creative process mapped before automation',
          'Human review built into the system',
          'Brand coherence preserved across outputs',
        ],
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
        cta: 'Start Creative Systems Brief',
        items: [
          {
            number: '00-1',
            title: 'AI Systems',
            titleShort: 'AI Systems',
            items: ['Creative AI workflows', 'Prompt and input systems', 'Human review controls', 'Brand-aware guardrails'],
            description:
              'Structured AI workflows and internal tools for repeatable creative execution with visible human review.',
            cta: 'Explore AI Integrations',
            ctaHref: '/services/ai-integrations',
          },
          {
            number: '00-2',
            title: 'Automation / Internal Tools',
            titleShort: 'Automation',
            items: ['Reduce repetitive production', 'Connect tools and handoffs', 'Structure content and assets', 'Keep review visible'],
            description:
              'Automation layers for content, research, assets, and coordination that support judgment instead of replacing it.',
            cta: 'Explore Creative Automation',
            ctaHref: '/services/creative-automation',
          },
          {
            number: '00-3',
            title: 'Web / Product Prototypes',
            titleShort: 'Product Web',
            items: ['Validate tool ideas', 'Build workflow dashboards', 'Test product logic', 'Create usable demos'],
            description:
              'Focused interfaces and prototypes that make AI workflow logic usable before full-scale development.',
            cta: 'Explore Prototypes',
            ctaHref: '/services/product-prototypes',
          },
          {
            number: '00-4',
            title: 'Brand Systems / Creative Direction',
            titleShort: 'Brand Systems',
            items: ['Operationalize brand voice', 'Create tone and review rules', 'Structure prompts and criteria', 'Protect campaign consistency'],
            description:
              'Brand logic, prompt structures, and review criteria for coherent AI-assisted content and campaigns.',
            cta: 'Explore Brand Systems',
            ctaHref: '/services/brand-systems',
          },
          {
            number: '00-5',
            title: 'Creative Practice',
            titleShort: 'Practice',
            items: ['Photography', 'Image Systems', 'Visual Research', 'Cultural Reading'],
            description:
              'Experiments, image systems, photography, and visual research exploring the relationship between brand, technology, and culture.',
            cta: 'View Visual Research',
            ctaHref: '/visuals',
          },
        ],
      },
      contact: {
        title: 'Start with the creative system.',
        subtitle:
          'Tell me about the process, tool, workflow, or brand system you want to improve with AI. Best fit: creative teams, brand builders, content studios, founders, and culture-led companies exploring AI integrations, internal tools, campaign systems, or repeatable creative workflows.',
        intro: 'You do not need a finished brief. A clear problem, current process, and desired outcome are enough to start.',
        availability: 'Available Q3 2026',
        location: 'Madrid · Remote · EU',
        linksLabel: 'Direct contact options',
        emailLabel: 'Email',
        linkedinLabel: 'LinkedIn',
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
      title: 'Applied AI Systems, Built With Taste',
      paragraphs: [
        'I came into this work through <span class="highlight">business</span>, then taught myself how to build what teams actually need when strategy has to become execution. Today I design <a href="/case-studies" class="highlight">AI systems</a>, <span class="highlight">agentic workflows</span>, and <span class="highlight">automation infrastructure</span> for brand, content, creative operations, and internal systems.',
        'I&apos;m less interested in one-off AI outputs than in the system behind them: where work gets routed, where judgment lives, what should be automated, and how an interface makes the whole thing usable. That means <span class="highlight">workflow logic</span>, <span class="highlight">orchestration</span>, <span class="highlight">internal tools</span>, and <a href="/apps/overflow" class="highlight">product-minded implementation</a>.',
        'Creative taste still matters. My background in brand, visuals, and image-making is useful because it acts as <span class="highlight">quality control inside the system</span>. It helps me decide what should feel restrained, what should stay human, and what makes an output <span class="highlight">commercially credible</span> rather than merely new.',
        'I work best with modern brands and teams that need <span class="highlight">sharper execution</span>, <span class="highlight">better workflows</span>, and infrastructure they can actually use. If the problem sits between brand, content, systems, operations, and creative execution, that&apos;s usually where I&apos;m most useful.',
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
        'Sistemas de IA aplicada, capas de automatización e infraestructura creativa para equipos de marca, estudios de contenido y proyectos culturales.',
      menuCta: 'Enviar brief creativo',
      toggleLabel: 'Selector de idioma',
      languageShort: {
        en: 'EN',
        es: 'ES',
      },
    },
    footer: {
      tagline:
        'Integraciones de IA para sistemas creativos, flujos de marca y ejecución cultural.',
      work: 'Trabajo',
      services: 'Servicios',
      resources: 'Recursos',
      workLinks: [
        { label: 'Casos de estudio', href: '/case-studies' },
        { label: 'Fotografía', href: '/photography' },
        { label: 'Visuales', href: '/visuals' },
      ],
      serviceLinks: [
        { label: 'Integraciones IA', href: '/services/integraciones-ia' },
        { label: 'Automatización creativa', href: '/services/automatizacion-creativa' },
        { label: 'Sistemas de marca', href: '/services/sistemas-de-marca' },
        { label: 'Prototipos de producto', href: '/services/prototipos-producto-ia' },
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
        ariaLabel: 'Raúl Mermans — Integraciones IA · Flujos de Marca · Sistemas Creativos',
        services: ['Integraciones IA', 'Flujos de Marca', 'Sistemas Creativos'],
        summary:
          'Diseño integraciones de IA que ayudan a equipos creativos a trabajar más rápido sin perder criterio, control ni coherencia de marca.',
        primaryCta: 'Hablar de una integración IA',
        secondaryCta: 'Ver casos de estudio',
        tertiaryCta: 'Ver GitHub',
        scrollAria: 'Desplazar para explorar',
        scrollLabel: 'Explorar',
      },
      positioning: {
        eyebrow: 'Lógica de Sistema',
        title: 'Infraestructura creativa para ejecución asistida por IA.',
        body:
          'El trabajo conecta estrategia, diseño de sistema e implementación: mapear el proceso creativo, definir la lógica, construir prototipos y crear los límites que hacen útil la IA dentro de flujos reales de marca, contenido e imagen.',
        points: [
          'Proceso creativo mapeado antes de automatizar',
          'Revisión humana integrada en el sistema',
          'Coherencia de marca preservada en cada salida',
        ],
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
            proof: 'Informes desde CSV/XLSX con validación de esquema, ejecución controlada y resultados explicables.',
          },
          'website-auditor': {
            label: 'Auditoría basada en evidencia',
            proof: 'Primero captura y puntuación determinista; síntesis LLM solo cuando la evidencia ya está aceptada.',
          },
          'benchmark-dashboard': {
            label: 'Prueba de producto de datos',
            proof: 'Interfaz de benchmark reutilizable para rankings, previsiones, señales estratégicas y lectura orientada a decisión.',
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
        title: 'Constructor de sistemas de IA con inteligencia de marca.',
        body:
          'Trabajo en la intersección entre <span class="highlight">sistemas de IA</span>, <span class="highlight">estrategia de marca</span> y <span class="highlight">ejecución de producto</span>, construyendo herramientas y flujos técnicamente sólidos, comercialmente útiles y culturalmente conscientes.',
        cta: 'Leer más',
      },
      services: {
        title: 'Servicios',
        cta: 'Enviar brief creativo',
        items: [
          {
            number: '00-1',
            title: 'Sistemas de IA',
            titleShort: 'Sist. IA',
            items: ['Flujos creativos con IA', 'Sistemas de prompts e inputs', 'Controles de revisión humana', 'Límites de marca'],
            description:
              'Flujos estructurados y herramientas internas para ejecución creativa repetible con revisión humana visible.',
            cta: 'Explorar integraciones IA',
            ctaHref: '/services/integraciones-ia',
          },
          {
            number: '00-2',
            title: 'Automatización / Herramientas internas',
            titleShort: 'Automatización',
            items: ['Reducir producción repetitiva', 'Conectar herramientas y traspasos', 'Estructurar contenido y assets', 'Mantener visible la revisión'],
            description:
              'Capas de automatización para contenido, investigación, assets y coordinación que apoyan el criterio.',
            cta: 'Explorar automatización creativa',
            ctaHref: '/services/automatizacion-creativa',
          },
          {
            number: '00-3',
            title: 'Web / Prototipos de producto',
            titleShort: 'Producto web',
            items: ['Validar ideas de herramienta', 'Crear paneles de flujo', 'Probar lógica de producto', 'Preparar demos utilizables'],
            description:
              'Interfaces y prototipos enfocados que hacen utilizable la lógica de un flujo con IA antes de escalar.',
            cta: 'Explorar prototipos',
            ctaHref: '/services/prototipos-producto-ia',
          },
          {
            number: '00-4',
            title: 'Sistemas de marca / Dirección creativa',
            titleShort: 'Marca',
            items: ['Operativizar la voz de marca', 'Crear reglas de tono y revisión', 'Estructurar prompts y criterios', 'Proteger la consistencia'],
            description:
              'Lógica de marca, prompts y criterios de revisión para contenido y campañas asistidos por IA.',
            cta: 'Explorar sistemas de marca',
            ctaHref: '/services/sistemas-de-marca',
          },
          {
            number: '00-5',
            title: 'Práctica creativa',
            titleShort: 'Práctica',
            items: ['Fotografía', 'Sistemas de imagen', 'Investigación visual', 'Lectura cultural'],
            description:
              'Experimentos, sistemas de imagen, fotografía e investigación visual sobre la relación entre marca, tecnología y cultura.',
            cta: 'Ver investigación visual',
            ctaHref: '/visuals',
          },
        ],
      },
      contact: {
        title: 'Empieza por el sistema creativo.',
        subtitle:
          'Cuéntame qué proceso, herramienta, flujo o sistema de marca quieres mejorar con IA. Encaja especialmente bien con equipos creativos, marcas, estudios de contenido, founders y proyectos culturales que exploran integraciones de IA, herramientas internas, sistemas de campaña o flujos creativos repetibles.',
        intro: 'No hace falta tener un brief cerrado. Un problema claro, el proceso actual y el resultado deseado son suficiente para empezar.',
        availability: 'Disponible T3 2026',
        location: 'Madrid · Remoto · UE',
        linksLabel: 'Opciones de contacto directo',
        emailLabel: 'Email',
        linkedinLabel: 'LinkedIn',
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
      title: 'Sistemas de IA aplicados, construidos con criterio',
      paragraphs: [
        'Llegué a este trabajo desde <span class="highlight">negocio</span> y aprendí a construir lo que los equipos necesitan cuando la estrategia tiene que convertirse en ejecución. Hoy diseño <a href="/case-studies" class="highlight">sistemas de IA</a>, <span class="highlight">flujos con agentes</span> e <span class="highlight">infraestructura de automatización</span> para marca, contenido, operaciones creativas y sistemas internos.',
        'Me interesa menos el resultado aislado de IA que el sistema que lo sostiene: por dónde se mueve el trabajo, dónde vive el criterio, qué conviene automatizar y cómo una interfaz hace usable todo el proceso. Eso significa <span class="highlight">lógica de flujo</span>, <span class="highlight">orquestación</span>, <span class="highlight">herramientas internas</span> e <a href="/apps/overflow" class="highlight">implementación con criterio de producto</a>.',
        'El gusto creativo sigue importando. Mi experiencia en marca, visuales e imagen funciona como <span class="highlight">control de calidad dentro del sistema</span>: ayuda a decidir qué debe sentirse contenido, qué debe seguir siendo humano y qué hace que un resultado sea <span class="highlight">creíble comercialmente</span>, no solo nuevo.',
        'Trabajo mejor con marcas y equipos modernos que necesitan <span class="highlight">ejecución más clara</span>, <span class="highlight">mejores flujos</span> e infraestructura que puedan usar de verdad. Si el problema vive entre marca, contenido, sistemas, operaciones y ejecución creativa, ahí suelo aportar más.',
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
