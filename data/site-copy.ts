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
        'Creative strategy, brand thinking, data, and technology for teams turning ideas into meaningful work.',
      menuCta: 'Discuss a project',
      toggleLabel: 'Language switcher',
      languageShort: {
        en: 'EN',
        es: 'ES',
      },
    },
    footer: {
      tagline:
        'Creative strategy across brand, marketing, culture, data, and technology.',
      work: 'Work',
      services: 'Services',
      resources: 'Resources',
      workLinks: [
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Photography', href: '/photography' },
        { label: 'Visuals', href: '/visuals' },
      ],
      serviceLinks: [
        { label: 'Creative Strategy & Marketing', href: '/services/ai-integrations' },
        { label: 'Brand Systems & Creative Direction', href: '/services/brand-systems' },
        { label: 'Data, Research & Intelligence', href: '/services/creative-automation' },
        { label: 'Digital Products, AI & Prototyping', href: '/services/product-prototypes' },
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
        ariaLabel: 'Raúl Mermans — multidisciplinary creative strategist across brand, marketing, culture, data, design, and technology.',
        services: ['Creative strategy', 'brand, marketing, culture', 'data, and technology'],
        summary:
          'I combine analytical thinking, creative direction, and technical execution to develop distinctive ideas, campaigns, experiences, and digital products. AI supports the process where it adds value—it does not define the limits of the work.',
        primaryCta: 'Discuss a project',
        secondaryCta: 'View selected work',
        scrollAria: 'Scroll to explore',
        scrollLabel: 'Explore',
      },
      positioning: {
        eyebrow: 'Creative practice',
        title: 'The idea, audience, and direction come first.',
        body:
          'I use AI and emerging technology to support research, concept development, prototyping, production, and decision-making. The technology serves the idea—not the other way around.',
        points: [
          'Business, audience, and cultural context before execution',
          'Creative judgment and analytical reasoning working together',
          'Technology used where it creates meaningful value',
        ],
      },
      sprint: {
        eyebrow: 'Focused engagement',
        title: 'Creative Strategy Sprint',
        forLabel: 'For',
        for: 'Brands, marketing teams, founders, and creative teams that need a clearer direction, stronger concept, or more coherent way to turn ideas into execution.',
        durationLabel: 'Duration',
        duration: 'Typically 2–4 weeks, depending on scope.',
        includedLabel: 'What is included',
        included: [
          'Business, audience, and cultural context review',
          'Brand or campaign opportunity definition',
          'Research and data synthesis',
          'Positioning or strategic direction',
          'Creative territories and concept development',
          'Visual, digital, or campaign applications',
          'Prototype, activation, or implementation roadmap',
        ],
        outcomeLabel: 'Outcome',
        outcome: 'A clear strategic and creative direction supported by research, practical concepts, and a defined path toward execution.',
        followUp: 'The sprint can lead into campaign development, brand systems, digital products, prototypes, data-led tools, or ongoing strategic and creative support.',
        cta: 'Discuss a Creative Strategy Sprint',
      },
      selectedAiSystems: {
        eyebrow: 'Selected work',
        title: 'Strategy, creativity, data, and technology in practice.',
        description:
          'Projects spanning campaigns, marketing intelligence, digital products, brand thinking, visual direction, and AI-assisted tools—each built around a specific problem, audience, or opportunity.',
        viewCase: 'View case',
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
            eyebrow: 'Strategy, marketing, data, and brand thinking',
            title: 'Case Studies',
            description:
              'Case studies spanning campaigns, marketing intelligence, digital products, AI-assisted tools, and the brand thinking that makes execution coherent.',
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
            eyebrow: 'Visual direction, image-making, and experimentation',
            title: 'Visuals',
            description:
              'Visual studies, album covers, photography, and AI-assisted image work shaped through composition, observation, and cultural sensitivity.',
          },
        ],
      },
      aboutPreview: {
        label: 'About',
        title: 'A multidisciplinary creative practice.',
        body:
          'I work across <span class="highlight">creative strategy</span>, <span class="highlight">marketing</span>, <span class="highlight">brand</span>, <span class="highlight">culture</span>, <span class="highlight">data</span>, design, and technology.',
        cta: 'View Profile',
      },
      services: {
        title: 'Services',
        cta: 'Discuss a project',
        items: [
          {
            number: '00-1',
            title: 'Creative Strategy & Marketing',
            titleShort: 'Strategy',
            items: ['Brand and campaign strategy', 'Audience and market understanding', 'Positioning and messaging', 'Creative concepts and activation'],
            description:
              'Strategy that connects business objectives, audience insight, cultural context, and creative execution.',
            cta: 'Discuss a project',
            ctaHref: '/#contact',
          },
          {
            number: '00-2',
            title: 'Brand Systems & Creative Direction',
            titleShort: 'Brand',
            items: ['Brand positioning', 'Narrative and storytelling', 'Visual direction and tone', 'Campaign and content systems'],
            description:
              'Brand and creative systems that make ideas recognisable, coherent, and culturally relevant across campaigns, content, and digital experiences.',
            cta: 'Discuss a project',
            ctaHref: '/#contact',
          },
          {
            number: '00-3',
            title: 'Data, Research & Intelligence',
            titleShort: 'Data',
            items: ['Marketing analytics', 'Customer and CRM insight', 'Research and data synthesis', 'Reporting and decision support'],
            description:
              'Research and data tools that make complex information easier to understand and act on.',
            cta: 'Discuss a project',
            ctaHref: '/#contact',
          },
          {
            number: '00-4',
            title: 'Digital Products, AI & Prototyping',
            titleShort: 'Products',
            items: ['Digital products and internal tools', 'Interactive prototypes', 'AI-assisted workflows', 'Automation and technical experimentation'],
            description:
              'Digital products and prototypes that make strategies, workflows, and ideas tangible. AI is used where it improves research, exploration, production, or decision-making without replacing human judgment.',
            cta: 'Discuss a project',
            ctaHref: '/#contact',
          },
          {
            number: '00-5',
            title: 'Photography & Visual Direction',
            titleShort: 'Visuals',
            items: ['Photography', 'Image Systems', 'Visual Research', 'Cultural Reading'],
            description:
              'Photography and visual research as evidence of composition, observation, and cultural sensitivity within the wider creative practice.',
            cta: 'View visual work',
            ctaHref: '/visuals',
          },
        ],
      },
      contact: {
        title: 'Start with the idea, challenge, or opportunity.',
        subtitle:
          'Tell me about the brand, campaign, audience, product, workflow, or business problem you want to develop. I work across strategy, marketing, creative direction, data, digital products, and technology.',
        intro: 'You do not need a finished brief. A clear challenge, current context, and desired outcome are enough to begin.',
        availability: 'Open to selected projects and collaborations.',
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
        'Selected work across campaigns, marketing intelligence, digital products, brand thinking, visual direction, and AI-assisted tools—each built around a specific problem, audience, or opportunity.',
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
      intro:
        'Small operational tools, experiments, and product surfaces built to test workflow logic, data structure, and interface behavior.',
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
        'Estrategia creativa, marca, datos y tecnología para convertir ideas en trabajo con sentido.',
      menuCta: 'Hablar de un proyecto',
      toggleLabel: 'Selector de idioma',
      languageShort: {
        en: 'EN',
        es: 'ES',
      },
    },
    footer: {
      tagline:
        'Estrategia creativa entre marca, marketing, cultura, datos y tecnología.',
      work: 'Trabajo',
      services: 'Servicios',
      resources: 'Recursos',
      workLinks: [
        { label: 'Casos de estudio', href: '/case-studies' },
        { label: 'Fotografía', href: '/photography' },
        { label: 'Visuales', href: '/visuals' },
      ],
      serviceLinks: [
        { label: 'Estrategia Creativa y Marketing', href: '/services/integraciones-ia' },
        { label: 'Sistemas de Marca y Dirección Creativa', href: '/services/sistemas-de-marca' },
        { label: 'Datos, Investigación e Inteligencia', href: '/services/automatizacion-creativa' },
        { label: 'Productos Digitales, IA y Prototipado', href: '/services/prototipos-producto-ia' },
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
        ariaLabel: 'Raúl Mermans — estratega creativo multidisciplinar entre marca, marketing, cultura, datos, diseño y tecnología.',
        services: ['Estrategia creativa', 'marca, marketing y cultura', 'datos y tecnología'],
        summary:
          'Combino pensamiento analítico, dirección creativa y ejecución técnica para desarrollar ideas, campañas, experiencias y productos digitales distintivos. La IA apoya el proceso cuando aporta valor, pero no define los límites del trabajo.',
        primaryCta: 'Hablar de un proyecto',
        secondaryCta: 'Ver proyectos seleccionados',
        scrollAria: 'Desplazar para explorar',
        scrollLabel: 'Explorar',
      },
      positioning: {
        eyebrow: 'Práctica creativa',
        title: 'La idea, la audiencia y la dirección van primero.',
        body:
          'Utilizo IA y tecnología emergente para apoyar la investigación, el desarrollo de conceptos, el prototipado, la producción y la toma de decisiones. La tecnología está al servicio de la idea, no al revés.',
        points: [
          'Contexto de negocio, audiencia y cultura antes de ejecutar',
          'Criterio creativo y razonamiento analítico trabajando juntos',
          'Tecnología donde aporta valor real',
        ],
      },
      sprint: {
        eyebrow: 'Colaboración focalizada',
        title: 'Sprint de Estrategia Creativa',
        forLabel: 'Para',
        for: 'Marcas, equipos de marketing, founders y equipos creativos que necesitan una dirección más clara, un concepto más sólido o una forma más coherente de llevar las ideas a la ejecución.',
        durationLabel: 'Duración',
        duration: 'Normalmente entre 2 y 4 semanas, según el alcance.',
        includedLabel: 'Qué incluye',
        included: [
          'Revisión de contexto de negocio, audiencia y cultura',
          'Definición de oportunidad de marca o campaña',
          'Investigación y síntesis de datos',
          'Posicionamiento o dirección estratégica',
          'Territorios creativos y desarrollo de conceptos',
          'Aplicaciones visuales, digitales o de campaña',
          'Hoja de ruta de prototipo, activación o implementación',
        ],
        outcomeLabel: 'Resultado',
        outcome: 'Una dirección estratégica y creativa clara, respaldada por investigación, conceptos prácticos y un camino definido hacia la ejecución.',
        followUp: 'El sprint puede dar paso al desarrollo de campañas, sistemas de marca, productos digitales, prototipos, herramientas basadas en datos o apoyo estratégico y creativo continuo.',
        cta: 'Hablar de un Sprint de Estrategia Creativa',
      },
      selectedAiSystems: {
        eyebrow: 'Proyectos seleccionados',
        title: 'Estrategia, creatividad, datos y tecnología en práctica.',
        description:
          'Proyectos de campañas, inteligencia de marketing, productos digitales, marca, dirección visual y herramientas asistidas por IA, construidos alrededor de un problema, una audiencia o una oportunidad concreta.',
        viewCase: 'Ver caso',
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
            eyebrow: 'Estrategia, marketing, datos y pensamiento de marca',
            title: 'Casos de estudio',
            description:
              'Casos de campañas, inteligencia de marketing, productos digitales, herramientas asistidas por IA y pensamiento de marca para una ejecución coherente.',
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
            eyebrow: 'Dirección visual, imagen y experimentación',
            title: 'Visuales',
            description:
              'Estudios visuales, portadas, fotografía y trabajo de imagen asistido por IA desde la composición, la observación y la sensibilidad cultural.',
          },
        ],
      },
      aboutPreview: {
        label: 'Sobre mí',
        title: 'Una práctica creativa multidisciplinar.',
        body:
          'Trabajo entre <span class="highlight">estrategia creativa</span>, <span class="highlight">marketing</span>, <span class="highlight">marca</span>, <span class="highlight">cultura</span>, <span class="highlight">datos</span>, diseño y tecnología.',
        cta: 'Leer más',
      },
      services: {
        title: 'Servicios',
        cta: 'Hablar de un proyecto',
        items: [
          {
            number: '00-1',
            title: 'Estrategia Creativa y Marketing',
            titleShort: 'Estrategia',
            items: ['Estrategia de marca y campaña', 'Audiencia y mercado', 'Posicionamiento y mensajes', 'Conceptos y activación'],
            description:
              'Estrategia que conecta objetivos de negocio, insight de audiencia, contexto cultural y ejecución creativa.',
            cta: 'Hablar de un proyecto',
            ctaHref: '/#contact',
          },
          {
            number: '00-2',
            title: 'Sistemas de Marca y Dirección Creativa',
            titleShort: 'Marca',
            items: ['Posicionamiento de marca', 'Narrativa y storytelling', 'Dirección visual y tono', 'Sistemas de campaña y contenido'],
            description:
              'Sistemas de marca y creatividad que hacen las ideas reconocibles, coherentes y culturalmente relevantes en campañas, contenido y experiencias digitales.',
            cta: 'Hablar de un proyecto',
            ctaHref: '/#contact',
          },
          {
            number: '00-3',
            title: 'Datos, Investigación e Inteligencia',
            titleShort: 'Datos',
            items: ['Analítica de marketing', 'Insight de cliente y CRM', 'Investigación y síntesis de datos', 'Reporting y apoyo a decisiones'],
            description:
              'Herramientas de investigación y datos que hacen la información compleja más fácil de entender y convertir en acción.',
            cta: 'Hablar de un proyecto',
            ctaHref: '/#contact',
          },
          {
            number: '00-4',
            title: 'Productos Digitales, IA y Prototipado',
            titleShort: 'Productos',
            items: ['Productos digitales y herramientas internas', 'Prototipos interactivos', 'Flujos asistidos por IA', 'Automatización y experimentación técnica'],
            description:
              'Productos digitales y prototipos que vuelven tangibles las estrategias, los flujos y las ideas. La IA se utiliza cuando mejora la investigación, exploración, producción o toma de decisiones sin reemplazar el criterio humano.',
            cta: 'Hablar de un proyecto',
            ctaHref: '/#contact',
          },
          {
            number: '00-5',
            title: 'Fotografía y Dirección Visual',
            titleShort: 'Visuales',
            items: ['Fotografía', 'Sistemas de imagen', 'Investigación visual', 'Lectura cultural'],
            description:
              'Fotografía e investigación visual como prueba de composición, observación y sensibilidad cultural dentro de una práctica creativa más amplia.',
            cta: 'Ver trabajo visual',
            ctaHref: '/visuals',
          },
        ],
      },
      contact: {
        title: 'Empecemos por la idea, el reto o la oportunidad.',
        subtitle:
          'Cuéntame sobre la marca, campaña, audiencia, producto, proceso o problema de negocio que quieres desarrollar. Trabajo entre estrategia, marketing, dirección creativa, datos, productos digitales y tecnología.',
        intro: 'No necesitas un briefing terminado. Un reto claro, el contexto actual y el resultado deseado son suficientes para empezar.',
        availability: 'Abierto a proyectos y colaboraciones seleccionadas.',
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
      intro:
        'Pequeñas herramientas, experimentos y superficies de producto creadas para probar lógica de workflow, estructura de datos y comportamiento de interfaz.',
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
