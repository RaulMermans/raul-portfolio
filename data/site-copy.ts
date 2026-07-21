import type { Locale } from '@/lib/i18n'

export const siteCopy = {
  en: {
    skipToContent: 'Skip to main content',
    header: {
      logoLabel: 'Home',
      nav: [
        { label: 'Work', href: '/#selected-work', hash: '#selected-work' },
        { label: 'About', href: '/about' },
        { label: 'Photography', href: '/photography' },
        { label: 'Contact', href: '/#contact', hash: '#contact' },
      ],
      mobileEyebrow: 'Navigation',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      menuMeta:
        'Brands, products, stories, and ventures shaped through culture, business, and practical execution.',
      menuCta: 'Work with me',
      toggleLabel: 'Language switcher',
      languageShort: {
        en: 'EN',
        es: 'ES',
      },
    },
    footer: {
      tagline:
        'Brands, products, stories, and ventures across culture, business, storytelling, and technology.',
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
        eyebrow: 'Entrepreneur & Creator',
        greetings: {
          morning: 'GOOD MORNING',
          afternoon: 'GOOD AFTERNOON',
          evening: 'GOOD EVENING',
        },
        ariaLabel: 'Raúl Mermans — Entrepreneur and Creator. Building ideas into brands, products, and ventures.',
        headline: 'Building ideas into brands, products, and ventures.',
        summary:
          'I work across culture, business, storytelling, and technology—creating independently and sharing the process.',
        primaryCta: 'Explore what I’m building',
        secondaryCta: 'Work with me',
        scrollAria: 'Scroll to explore',
        scrollLabel: 'Explore',
      },
      buildingNow: {
        eyebrow: 'What I’m building now',
        title: 'An independent practice with room to grow.',
        body:
          'I’m building an independent practice and a portfolio of projects around brands, culture, products, and media. My current focus is collaborating with ambitious founders, publishing what I learn, and developing concepts that can become businesses of their own.',
        points: [
          { title: 'Selected founder collaborations', body: 'Helping early teams clarify what they are making and how it should meet the world.' },
          { title: 'Public perspectives and cultural analysis', body: 'Sharing observations, references, and working questions in public.' },
          { title: 'Original products and ventures', body: 'Developing independent concepts that can become useful, lasting businesses.' },
        ],
      },
      selectedAiSystems: {
        eyebrow: 'Selected projects',
        title: 'Work made tangible.',
        description:
          'A selection of products and identity work that shows brand judgment, business thinking, and independent execution in practice.',
        viewCase: 'View case',
        viewAll: 'View all work',
        githubCta: 'View GitHub',
        opportunityLabel: 'Opportunity',
        roleLabel: 'Role',
        builtLabel: 'Built',
        provesLabel: 'Proves',
        cards: {
          'campaign-pulse': {
            label: 'Marketing intelligence',
            idea: 'A marketing intelligence product designed to turn campaign and audience activity into clearer commercial decisions.',
            opportunity: 'Make dispersed marketing activity easier to act on.',
            role: 'Product concept, strategy, and experience design.',
            built: 'A decision-focused marketing intelligence product.',
            proves: 'Business thinking can become a tangible operating system.',
          },
          remoria: {
            label: 'Brand world',
            idea: 'A luxury fragrance identity where visual direction, product story, and brand rules create one coherent world.',
            opportunity: 'Give a product idea a distinctive, ownable point of view.',
            role: 'Brand strategy and visual direction.',
            built: 'An identity system and visual world for a fragrance concept.',
            proves: 'Taste and systems thinking can make a brand feel real.',
          },
          'campaign-sandbox': {
            label: 'Campaign strategy',
            idea: 'A new model for how creative teams develop, compare, and strengthen campaign ideas—with human judgment at its centre.',
            opportunity: 'Give teams a stronger way to move from a brief to a creative direction.',
            role: 'Product concept, workflow design, and prototyping.',
            built: 'A workspace for shaping and evaluating campaign routes.',
            proves: 'Creative workflow design can improve strategic judgment.',
          },
          'data-brief-ai': {
            label: 'Bounded reporting',
            idea: 'A reporting workflow that turns spreadsheets into grounded business reports without unsupported metrics.',
            opportunity: 'Make messy data easier to read with confidence.',
            role: 'Product concept and workflow design.',
            built: 'A bounded reporting prototype.',
            proves: 'Clear constraints can make automated analysis more useful.',
          },
        },
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
        label: 'About me',
        title: 'Building with both business sense and artistic direction.',
        body:
          'I’m Raul Mermans, an entrepreneur and creator interested in how cultural insight becomes meaningful brands, useful products, and commercially relevant ventures.',
        bodySecondary:
          'My work moves between business strategy and artistic direction. I use cultural research, storytelling, design, technology, and experimentation to identify opportunities and make them tangible.',
        bodyTertiary:
          'I’m currently studying Business Administration and Marketing at IE University while building independently, collaborating with founders, and developing my own projects.',
        cta: 'More about me',
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
        title: 'For collaborations, conversations, and ambitious projects.',
        subtitle:
          'If there is a promising project taking shape, I’d be glad to hear where it could go.',
        intro: 'You do not need a finished brief. A real opportunity, question, or point of view is enough to begin a conversation.',
        availability: 'Open to selected projects and collaborations.',
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
        { label: 'Trabajo', href: '/#selected-work', hash: '#selected-work' },
        { label: 'Sobre mí', href: '/about' },
        { label: 'Fotografía', href: '/photography' },
        { label: 'Contacto', href: '/#contact', hash: '#contact' },
      ],
      mobileEyebrow: 'Navegación',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      menuMeta:
        'Marcas, productos, historias y proyectos construidos entre la cultura, el negocio y la ejecución práctica.',
      menuCta: 'Trabajemos juntos',
      toggleLabel: 'Selector de idioma',
      languageShort: {
        en: 'EN',
        es: 'ES',
      },
    },
    footer: {
      tagline:
        'Marcas, productos, historias y nuevos proyectos entre la cultura, el negocio, la narrativa y la tecnología.',
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
        eyebrow: 'Emprendedor y creador',
        greetings: {
          morning: 'BUENOS DÍAS',
          afternoon: 'BUENAS TARDES',
          evening: 'BUENAS NOCHES',
        },
        ariaLabel: 'Raúl Mermans — Emprendedor y creador. Convirtiendo ideas en marcas, productos y nuevos proyectos.',
        headline: 'Convirtiendo ideas en marcas, productos y nuevos proyectos.',
        summary:
          'Trabajo entre la cultura, el negocio, la narrativa y la tecnología, construyendo de forma independiente y compartiendo el proceso.',
        primaryCta: 'Descubre lo que estoy construyendo',
        secondaryCta: 'Trabajemos juntos',
        scrollAria: 'Desplazar para explorar',
        scrollLabel: 'Explorar',
      },
      buildingNow: {
        eyebrow: 'Lo que estoy construyendo',
        title: 'Una práctica independiente con espacio para crecer.',
        body:
          'Estoy construyendo una práctica independiente y una cartera de proyectos alrededor de las marcas, la cultura, los productos y los medios. Actualmente colaboro con fundadores ambiciosos, comparto lo que aprendo y desarrollo conceptos que puedan convertirse en negocios propios.',
        points: [
          { title: 'Colaboraciones seleccionadas con fundadores', body: 'Ayudando a equipos emergentes a aclarar qué están construyendo y cómo puede encontrarse con el mundo.' },
          { title: 'Perspectivas públicas y análisis cultural', body: 'Compartiendo observaciones, referencias y preguntas de trabajo en público.' },
          { title: 'Productos y proyectos propios', body: 'Desarrollando conceptos independientes que puedan convertirse en negocios útiles y duraderos.' },
        ],
      },
      selectedAiSystems: {
        eyebrow: 'Proyectos seleccionados',
        title: 'Trabajo hecho realidad.',
        description:
          'Una selección de productos y trabajo de identidad que demuestra criterio de marca, pensamiento de negocio y ejecución independiente.',
        viewCase: 'Ver caso',
        viewAll: 'Ver todos los proyectos',
        githubCta: 'Ver GitHub',
        opportunityLabel: 'Oportunidad',
        roleLabel: 'Rol',
        builtLabel: 'Construido',
        provesLabel: 'Demuestra',
        cards: {
          'campaign-pulse': {
            label: 'Inteligencia de marketing',
            idea: 'Un producto de inteligencia de marketing diseñado para convertir la actividad de campañas y audiencias en decisiones comerciales más claras.',
            opportunity: 'Hacer más accionable una actividad de marketing dispersa.',
            role: 'Concepto de producto, estrategia y diseño de experiencia.',
            built: 'Un producto de inteligencia de marketing orientado a decisiones.',
            proves: 'El pensamiento de negocio puede convertirse en un sistema tangible.',
          },
          remoria: {
            label: 'Universo de marca',
            idea: 'Una identidad de fragancia de lujo donde la dirección visual, el relato de producto y las reglas de marca crean un mundo coherente.',
            opportunity: 'Dar a una idea de producto un punto de vista distintivo y propio.',
            role: 'Estrategia de marca y dirección visual.',
            built: 'Un sistema de identidad y universo visual para un concepto de fragancia.',
            proves: 'El gusto y el pensamiento sistémico pueden hacer que una marca se sienta real.',
          },
          'campaign-sandbox': {
            label: 'Estrategia de campaña',
            idea: 'Un nuevo modelo para que los equipos creativos desarrollen, comparen y fortalezcan ideas de campaña, con el criterio humano en el centro.',
            opportunity: 'Dar a los equipos una forma más sólida de pasar del brief a una dirección creativa.',
            role: 'Concepto de producto, diseño de flujo y prototipado.',
            built: 'Un espacio de trabajo para desarrollar y evaluar rutas de campaña.',
            proves: 'El diseño de flujos creativos puede mejorar el criterio estratégico.',
          },
          'data-brief-ai': {
            label: 'Reporting acotado',
            idea: 'Un flujo de reporting que convierte hojas de cálculo en informes fundamentados sin métricas no soportadas.',
            opportunity: 'Hacer que datos desordenados se lean con más confianza.',
            role: 'Concepto de producto y diseño de flujo.',
            built: 'Un prototipo de reporting acotado.',
            proves: 'Los límites claros pueden hacer más útil el análisis automatizado.',
          },
        },
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
        title: 'Construir entre el sentido de negocio y la dirección artística.',
        body:
          'Soy Raul Mermans, emprendedor y creador, interesado en cómo la visión cultural se convierte en marcas con significado, productos útiles y proyectos comercialmente relevantes.',
        bodySecondary:
          'Mi trabajo se mueve entre la estrategia empresarial y la dirección artística. Utilizo la investigación cultural, la narrativa, el diseño, la tecnología y la experimentación para detectar oportunidades y convertirlas en realidades.',
        bodyTertiary:
          'Actualmente estudio Administración de Empresas y Marketing en IE University mientras construyo de forma independiente, colaboro con fundadores y desarrollo mis propios proyectos.',
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
        title: 'Para colaboraciones, conversaciones y proyectos ambiciosos.',
        subtitle:
          'Si hay un proyecto prometedor tomando forma, me encantará escuchar hasta dónde podría llegar.',
        intro: 'No necesitas un briefing terminado. Una oportunidad, pregunta o punto de vista real basta para empezar una conversación.',
        availability: 'Abierto a proyectos y colaboraciones seleccionadas.',
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
