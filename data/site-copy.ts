import type { Locale } from '@/lib/i18n'

export const siteCopy = {
  en: {
    skipToContent: 'Skip to main content',
    header: {
      logoLabel: 'Home',
      nav: [
        { label: 'Work', href: '/#work', hash: '#work' },
        { label: 'About', href: '/about' },
        { label: 'Photography', href: '/photography' },
        { label: 'Contact', href: '/#contact', hash: '#contact' },
      ],
      mobileEyebrow: 'Navigation',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      menuMeta:
        'AI systems, product and data built with business context and creative judgment.',
      menuCta: 'Get in touch',
      toggleLabel: 'Language switcher',
      languageShort: {
        en: 'EN',
        es: 'ES',
      },
    },
    footer: {
      tagline:
        'AI systems, product and data with business context and creative judgment.',
      work: 'Work',
      services: 'Capabilities',
      resources: 'Resources',
      workLinks: [
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Photography', href: '/photography' },
        { label: 'Visuals', href: '/visuals' },
      ],
      serviceLinks: [
        { label: 'Web Development & Digital Experiences', href: '/services/web-development' },
        { label: 'AI Integrations for Creative Systems', href: '/services/ai-integrations' },
        { label: 'Brand Systems & Creative Direction', href: '/services/brand-systems' },
        { label: 'Data & Business Intelligence', href: '/services/creative-automation' },
        { label: 'AI Systems & Digital Products', href: '/services/product-prototypes' },
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
      availability: 'Open to ambitious roles, projects, and collaborations.',
    },
    home: {
      schema: {
        serviceListName: 'Services by Raúl Mermans',
      },
      hero: {
        eyebrow: 'AI Systems · Product · Data · Creative Strategy',
        greetings: {
          morning: 'GOOD MORNING',
          afternoon: 'GOOD AFTERNOON',
          evening: 'GOOD EVENING',
        },
        ariaLabel: 'Raúl Mermans. Turning complex problems into intelligent systems people can use.',
        headline: 'Turning complex problems into intelligent systems people can use.',
        summary:
          'I build across AI, data, product and brand. I combine business judgment, technical execution and creative direction to turn ambiguous problems into working systems.',
        primaryCta: 'Explore selected systems',
        secondaryCta: 'About me',
        scrollAria: 'Scroll to explore',
        scrollLabel: 'Explore',
      },
      selectedSystems: {
        eyebrow: 'Selected Systems',
        title: 'Built to solve real problems.',
        support: 'Working prototypes and inspectable evidence across AI systems, local inference, decision intelligence, machine learning, simulation and product architecture.',
        cta: 'View case study',
        all: 'Explore all case studies',
        projects: {
          iris: { discipline: 'Agentic systems', description: 'Personal AI operating system for evidence-backed attention, bounded specialists and governed actions.', proof: 'Public architecture · Private system' },
          'local-ai-coding-agent': { discipline: 'Local AI', description: 'Local open-weight coding agent built around bounded context, tool use, verification and evaluation.', proof: '24-task read-only corpus · Private prototype' },
          'halo-control': { discipline: 'AI infrastructure', description: 'Local AI control plane for model inventory, capability routing, workload governance and observability.', proof: 'Public architecture · Hardware unverified' },
          demandos: { discipline: 'Machine learning', description: 'Deterministic forecasting, stockout risk and human-reviewed replenishment planning.', proof: 'Synthetic data · Prototype' },
          opstwin: { discipline: 'Simulation', description: 'Operational simulation workspace for comparing workflow and staffing interventions before a live pilot.', proof: 'Live prototype · Bounded model' },
          searchsignal: { discipline: 'Search systems', description: 'Inspectable ecommerce catalog-readiness and retrieval-quality framework.', proof: 'Synthetic demonstrator' },
        },
      },
      buildingNow: {
        eyebrow: 'What I build',
        title: 'From the problem to the system.',
        body:
          'I connect business context, technical architecture and interface judgment across three practices. Photography and image-making remain a separate visual practice.',
        points: [
          { title: 'AI Systems & Product', body: 'Agentic systems, local AI, internal tools, workflow architecture, evaluation, governance and product prototypes.' },
          { title: 'Data & Decision Intelligence', body: 'Analytics, forecasting, simulation, machine learning and systems that turn operational data into inspectable decisions.' },
          { title: 'Brand & Creative Systems', body: 'Brand strategy, narrative, creative direction and visual frameworks that make products and ideas clearer.' },
        ],
      },
      sectionCards: {
        eyebrow: 'Selected worlds, work, and experiments',
        title: 'A wider creative universe.',
        prev: 'Previous section:',
        next: 'Next section:',
        current: 'Current section',
        viewLabel: 'View section',
        sections: [
          {
            id: 'case-studies',
            index: '01',
            eyebrow: 'AI systems, products, data, and brand thinking',
            title: 'Case Studies',
            description:
              'AI systems, business intelligence, products, and the brand thinking behind them.',
          },
          {
            id: 'apps',
            index: '02',
            eyebrow: 'Prototypes, internal tools, and interface thinking',
            title: 'Apps',
            description:
              'Tools and product surfaces for clearer workflows and calmer UX.',
          },
          {
            id: 'photography',
            index: '03',
            eyebrow: 'Supporting craft: composition, restraint, image judgment',
            title: 'Photography',
            description:
              'Photography sharpens taste, direction, and visual judgment.',
          },
          {
            id: 'visuals',
            index: '04',
            eyebrow: 'Visual direction, image-making, and experimentation',
            title: 'Visuals',
            description:
              'Visual studies, album covers, photography, and AI-assisted image work.',
          },
        ],
      },
      aboutPreview: {
        label: 'About me',
        title: 'Business context. Technical systems. Creative judgment.',
        body:
          'I build across AI, product, data and creative systems. My background in business, marketing and brand helps me understand the decision; software and systems thinking help me build something people can use.',
        cta: 'More about me',
      },
      services: {
        title: 'Capabilities',
        cta: 'Discuss a collaboration',
        items: [
          {
            number: '00-1', title: 'AI Systems & Product', titleShort: 'AI Systems',
            items: ['Agentic systems', 'Internal AI tools', 'Workflow architecture', 'Local AI', 'Evaluation and guardrails', 'Product prototyping'],
            description: 'Bounded AI systems and product prototypes with explicit tool use, evaluation, governance and human review.',
            cta: 'Explore capability', ctaHref: '/services/product-prototypes',
          },
          {
            number: '00-2', title: 'Data & Decision Intelligence', titleShort: 'Data',
            items: ['Machine learning', 'Forecasting', 'Business intelligence', 'Decision support', 'Simulation', 'Operational analytics'],
            description: 'Data products that turn operational evidence into decisions people can inspect and challenge.',
            cta: 'Explore capability', ctaHref: '/services/creative-automation',
          },
          {
            number: '00-3', title: 'Brand & Creative Systems', titleShort: 'Brand',
            items: ['Brand strategy', 'Narrative systems', 'Creative direction', 'Campaign systems', 'Visual frameworks', 'Commercial context'],
            description: 'Narrative and visual systems that make products and ideas clear, coherent and distinctive.',
            cta: 'Explore capability', ctaHref: '/services/brand-systems',
          },
        ],
      },
      contact: {
        title: 'Building something ambitious?',
        subtitle:
          'Open to AI, product and technology roles, selected projects, and collaborations where business context, technical execution and strong product judgment matter.',
        intro: 'Roles, products, projects and collaborations. A clear challenge or promising idea is enough to start a conversation.',
        availability: 'Open to ambitious roles, projects, and collaborations.',
        location: 'Madrid · Remote · EU',
        linksLabel: 'Direct contact options',
        emailLabel: 'Email',
        linkedinLabel: 'LinkedIn',
        instagramLabel: 'Instagram',
        githubLabel: 'GitHub',
      },
      contactForm: {
        projectTypePlaceholder: 'Select focus area',
        budgetPlaceholder: 'Select budget range',
        timelinePlaceholder: 'Select timeline',
        projectTypes: [
          { value: 'creative-strategy-campaign', label: 'Creative Strategy / Campaign' },
          { value: 'brand-positioning-identity', label: 'Brand Positioning / Identity' },
          { value: 'marketing-crm-customer-strategy', label: 'Marketing / CRM / Customer Strategy' },
          { value: 'data-research-reporting', label: 'Data / Research / Reporting' },
          { value: 'digital-product-prototype', label: 'Digital Product / Prototype' },
          { value: 'ai-automation-emerging-technology', label: 'AI / Automation / Emerging Technology' },
          { value: 'photography-visual-direction', label: 'Photography / Visual Direction' },
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
            'Tell me about the challenge, audience, context, current situation, and the outcome you want to achieve…',
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
        send: 'Discuss a project',
        sendAria: 'Discuss a project',
        sendingAria: 'Sending project enquiry',
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
      title: 'A multidisciplinary creative practice',
      paragraphs: [
        'I work across <span class="highlight">creative strategy</span>, marketing, brand, culture, data, design, and technology. That breadth lets me move from research and positioning to campaigns, visual direction, digital products, and working prototypes.',
        'AI is part of the practice, particularly in research, exploration, prototyping, automation, and production. It expands what I can test and build, but it is not the starting point or the limit of the work.',
        'My background in brand, visuals, CRM, and image-making brings <span class="highlight">creative judgment</span> to analytical and technical work. It helps make ideas culturally aware, commercially credible, and clear enough to put into practice.',
        'I work with brands and teams that need <span class="highlight">a clearer direction</span>, stronger concepts, useful tools, and a practical route from opportunity to execution.',
      ],
    },
    caseStudiesUi: {
      pageEyebrow: 'Strategy · Creativity · Data · Technology',
      pageTitle: 'Case Studies',
      pageDescription:
        'Selected work across campaigns, marketing intelligence, digital products, brand thinking, visual direction, and AI-assisted tools. Each project addresses a specific problem, audience, or opportunity.',
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
      title: 'Tools and prototypes',
      systemsCta: 'Explore the larger systems',
      intro:
        'Small operational tools, experiments, and product surfaces built to test workflow logic, data structure, and interface behavior.',
    },
    appDetailUi: {
      breadcrumbLabel: 'Apps',
      keyFlows: 'Key flows',
      keyFlowsTitle: 'Key flows shaped as working product surfaces.',
      selectedScreens: 'Selected screens',
      selectedScreensTitle: 'Screens that show the product in use.',
      selectedScreensBody:
        'Each module focuses on a distinct part of the workflow.',
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
        { label: 'Trabajo', href: '/#work', hash: '#work' },
        { label: 'Sobre mí', href: '/about' },
        { label: 'Fotografía', href: '/photography' },
        { label: 'Contacto', href: '/#contact', hash: '#contact' },
      ],
      mobileEyebrow: 'Navegación',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      menuMeta:
        'Sistemas de IA, producto y datos con contexto de negocio y criterio creativo.',
      menuCta: 'Hablemos',
      toggleLabel: 'Selector de idioma',
      languageShort: {
        en: 'EN',
        es: 'ES',
      },
    },
    footer: {
      tagline:
        'Sistemas de IA, producto y datos con contexto de negocio y criterio creativo.',
      work: 'Trabajo',
      services: 'Capacidades',
      resources: 'Recursos',
      workLinks: [
        { label: 'Casos de estudio', href: '/case-studies' },
        { label: 'Fotografía', href: '/photography' },
        { label: 'Visuales', href: '/visuals' },
      ],
      serviceLinks: [
        { label: 'Desarrollo Web y Experiencias Digitales', href: '/services/desarrollo-web' },
        { label: 'Integraciones IA para Sistemas Creativos', href: '/services/integraciones-ia' },
        { label: 'Sistemas de Marca y Dirección Creativa', href: '/services/sistemas-de-marca' },
        { label: 'Datos e inteligencia de negocio', href: '/services/automatizacion-creativa' },
        { label: 'Sistemas de IA y productos digitales', href: '/services/prototipos-producto-ia' },
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
      availability: 'Abierto a nuevos retos profesionales, proyectos y colaboraciones.',
    },
    home: {
      schema: {
        serviceListName: 'Servicios de Raúl Mermans',
      },
      hero: {
        eyebrow: 'Sistemas de IA · Producto · Datos · Estrategia creativa',
        greetings: {
          morning: 'BUENOS DÍAS',
          afternoon: 'BUENAS TARDES',
          evening: 'BUENAS NOCHES',
        },
        ariaLabel: 'Raúl Mermans. Convierto problemas complejos en sistemas inteligentes que las personas pueden usar.',
        headline: 'Convierto problemas complejos en sistemas inteligentes que las personas pueden usar.',
        summary:
          'Construyo entre IA, datos, producto y marca. Combino criterio de negocio, ejecución técnica y dirección creativa para convertir problemas ambiguos en sistemas funcionales.',
        primaryCta: 'Explorar sistemas seleccionados',
        secondaryCta: 'Sobre mí',
        scrollAria: 'Desplazar para explorar',
        scrollLabel: 'Explorar',
      },
      selectedSystems: {
        eyebrow: 'Sistemas seleccionados',
        title: 'Construidos para resolver problemas reales.',
        support: 'Prototipos funcionales y evidencia revisable en sistemas de IA, inferencia local, inteligencia para la decisión, aprendizaje automático, simulación y arquitectura de producto.',
        cta: 'Ver caso de estudio',
        all: 'Explorar todos los casos',
        projects: {
          iris: { discipline: 'Sistemas agénticos', description: 'Sistema operativo personal de IA para gestionar la atención con evidencia, especialistas acotados y acciones gobernadas.', proof: 'Arquitectura pública · Sistema privado' },
          'local-ai-coding-agent': { discipline: 'IA local', description: 'Agente de programación con modelos locales de pesos abiertos, contexto acotado, herramientas, verificación y evaluación.', proof: 'Corpus de 24 tareas de lectura · Prototipo privado' },
          'halo-control': { discipline: 'Infraestructura de IA', description: 'Plano de control local para inventario de modelos, capacidades, gobierno de cargas y observabilidad.', proof: 'Arquitectura pública · Hardware sin verificar' },
          demandos: { discipline: 'Aprendizaje automático', description: 'Previsión determinista de demanda, riesgo de rotura de stock y planificación de reposición revisada por personas.', proof: 'Datos sintéticos · Prototipo' },
          opstwin: { discipline: 'Simulación', description: 'Espacio de simulación operativa para comparar cambios de flujo y plantilla antes de un piloto real.', proof: 'Prototipo desplegado · Modelo acotado' },
          searchsignal: { discipline: 'Sistemas de búsqueda', description: 'Marco revisable de preparación de catálogos ecommerce y calidad de recuperación.', proof: 'Demostrador sintético' },
        },
      },
      buildingNow: {
        eyebrow: 'Lo que construyo',
        title: 'Del problema al sistema.',
        body:
          'Conecto contexto de negocio, arquitectura técnica y criterio de interfaz en tres prácticas. La fotografía y la imagen forman una práctica visual aparte.',
        points: [
          { title: 'Sistemas de IA y producto', body: 'Sistemas agénticos, IA local, herramientas internas, arquitectura de flujos, evaluación, gobierno y prototipos de producto.' },
          { title: 'Datos e inteligencia para la decisión', body: 'Analítica, previsión, simulación y aprendizaje automático que convierten datos operativos en decisiones revisables.' },
          { title: 'Sistemas de marca y creatividad', body: 'Estrategia de marca, narrativa, dirección creativa y marcos visuales que aclaran productos e ideas.' },
        ],
      },
      sectionCards: {
        eyebrow: 'Mundos, trabajo y experimentos seleccionados',
        title: 'Un universo creativo más amplio.',
        prev: 'Sección anterior:',
        next: 'Sección siguiente:',
        current: 'Sección actual',
        viewLabel: 'Ver sección',
        sections: [
          {
            id: 'case-studies',
            index: '01',
            eyebrow: 'Sistemas de IA, productos, datos y pensamiento de marca',
            title: 'Casos de estudio',
            description:
              'Sistemas de IA, inteligencia de negocio, productos y el pensamiento de marca que los sostiene.',
          },
          {
            id: 'apps',
            index: '02',
            eyebrow: 'Prototipos, herramientas internas y pensamiento de interfaz',
            title: 'Apps',
            description:
              'Herramientas y superficies de producto para flujos más claros y una UX más calmada.',
          },
          {
            id: 'photography',
            index: '03',
            eyebrow: 'Oficio de apoyo: composición, contención y criterio visual',
            title: 'Fotografía',
            description:
              'La fotografía afina el gusto, la dirección y el criterio visual.',
          },
          {
            id: 'visuals',
            index: '04',
            eyebrow: 'Dirección visual, imagen y experimentación',
            title: 'Visuales',
            description:
              'Estudios visuales, portadas, fotografía y trabajo de imagen asistido por IA.',
          },
        ],
      },
      aboutPreview: {
        label: 'Sobre mí',
        title: 'Contexto de negocio. Sistemas técnicos. Criterio creativo.',
        body:
          'Construyo entre IA, producto, datos y sistemas creativos. Mi experiencia en negocio, marketing y marca me ayuda a entender la decisión; el software y el pensamiento sistémico me permiten construir algo útil.',
        cta: 'Leer más',
      },
      services: {
        title: 'Capacidades',
        cta: 'Hablar de una colaboración',
        items: [
          {
            number: '00-1', title: 'Sistemas de IA y producto', titleShort: 'Sistemas de IA',
            items: ['Sistemas agénticos', 'Herramientas internas de IA', 'Arquitectura de flujos', 'IA local', 'Evaluación y controles', 'Prototipos de producto'],
            description: 'Sistemas de IA y prototipos de producto con uso acotado de herramientas, evaluación, gobierno y revisión humana.',
            cta: 'Explorar capacidad', ctaHref: '/services/prototipos-producto-ia',
          },
          {
            number: '00-2', title: 'Datos e inteligencia para la decisión', titleShort: 'Datos',
            items: ['Aprendizaje automático', 'Previsión', 'Inteligencia de negocio', 'Apoyo a decisiones', 'Simulación', 'Analítica operativa'],
            description: 'Productos de datos que convierten evidencia operativa en decisiones que se pueden revisar y cuestionar.',
            cta: 'Explorar capacidad', ctaHref: '/services/automatizacion-creativa',
          },
          {
            number: '00-3', title: 'Sistemas de marca y creatividad', titleShort: 'Marca',
            items: ['Estrategia de marca', 'Sistemas narrativos', 'Dirección creativa', 'Sistemas de campaña', 'Marcos visuales', 'Contexto comercial'],
            description: 'Sistemas narrativos y visuales que hacen que productos e ideas sean claros, coherentes y distintivos.',
            cta: 'Explorar capacidad', ctaHref: '/services/sistemas-de-marca',
          },
        ],
      },
      contact: {
        title: '¿Construimos algo ambicioso?',
        subtitle:
          'Abierto a puestos de IA, producto y tecnología, proyectos seleccionados y colaboraciones donde importen el contexto de negocio, la ejecución técnica y el criterio de producto.',
        intro: 'Puestos, productos, proyectos y colaboraciones. Un reto claro o una buena idea bastan para empezar a hablar.',
        availability: 'Abierto a nuevos retos profesionales, proyectos y colaboraciones.',
        location: 'Madrid · Remoto · UE',
        linksLabel: 'Opciones de contacto directo',
        emailLabel: 'Email',
        linkedinLabel: 'LinkedIn',
        instagramLabel: 'Instagram',
        githubLabel: 'GitHub',
      },
      contactForm: {
        projectTypePlaceholder: 'Selecciona el enfoque',
        budgetPlaceholder: 'Selecciona el rango',
        timelinePlaceholder: 'Selecciona el plazo',
        projectTypes: [
          { value: 'creative-strategy-campaign', label: 'Estrategia Creativa / Campaña' },
          { value: 'brand-positioning-identity', label: 'Posicionamiento / Identidad de Marca' },
          { value: 'marketing-crm-customer-strategy', label: 'Marketing / CRM / Estrategia de Cliente' },
          { value: 'data-research-reporting', label: 'Datos / Investigación / Reporting' },
          { value: 'digital-product-prototype', label: 'Producto Digital / Prototipo' },
          { value: 'ai-automation-emerging-technology', label: 'IA / Automatización / Tecnología Emergente' },
          { value: 'photography-visual-direction', label: 'Fotografía / Dirección Visual' },
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
            'Cuéntame sobre el reto, la audiencia, el contexto, la situación actual y el resultado que quieres conseguir…',
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
        send: 'Hablar de un proyecto',
        sendAria: 'Hablar de un proyecto',
        sendingAria: 'Enviando consulta de proyecto',
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
      title: 'Una práctica creativa multidisciplinar',
      paragraphs: [
        'Trabajo entre <span class="highlight">estrategia creativa</span>, marketing, marca, cultura, datos, diseño y tecnología. Esta amplitud me permite pasar de la investigación y el posicionamiento a campañas, dirección visual, productos digitales y prototipos funcionales.',
        'La IA forma parte de la práctica, especialmente en investigación, exploración, prototipado, automatización y producción. Amplía lo que puedo probar y construir, pero no es el punto de partida ni el límite del trabajo.',
        'Mi experiencia en marca, visuales, CRM e imagen aporta <span class="highlight">criterio creativo</span> al trabajo analítico y técnico. Ayuda a que las ideas sean culturalmente conscientes, comercialmente creíbles y claras para ponerlas en práctica.',
        'Trabajo con marcas y equipos que necesitan <span class="highlight">una dirección más clara</span>, conceptos más sólidos, herramientas útiles y una ruta práctica desde la oportunidad hasta la ejecución.',
      ],
    },
    caseStudiesUi: {
      pageEyebrow: 'Estrategia · Creatividad · Datos · Tecnología',
      pageTitle: 'Casos de estudio',
      pageDescription:
        'Trabajo seleccionado de campañas, inteligencia de marketing, productos digitales, marca, dirección visual y herramientas asistidas por IA, construido alrededor de un problema, una audiencia o una oportunidad concreta.',
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
      title: 'Herramientas y prototipos',
      systemsCta: 'Explorar los sistemas más amplios',
      intro:
        'Pequeñas herramientas, experimentos y superficies de producto creadas para probar lógica de workflow, estructura de datos y comportamiento de interfaz.',
    },
    appDetailUi: {
      breadcrumbLabel: 'Apps',
      keyFlows: 'Flujos clave',
      keyFlowsTitle: 'Flujos clave planteados como superficies de producto en uso.',
      selectedScreens: 'Pantallas seleccionadas',
      selectedScreensTitle: 'Pantallas que muestran el producto en uso.',
      selectedScreensBody:
        'Cada módulo se centra en una parte distinta del flujo de trabajo.',
      productStory: 'Historia de producto',
      archiveTitle: 'Más trabajo en apps',
      archiveBody: 'Un pequeño archivo de conceptos, herramientas y software en marcha diseñados alrededor de interfaces más tranquilas y claridad operativa.',
    },
  },
} as const

export function getSiteCopy(locale: Locale) {
  return siteCopy[locale]
}
