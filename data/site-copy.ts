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
        'AI systems, automation, and creative infrastructure built with product sense and visual restraint.',
      menuCta: 'Discuss a Project',
      toggleLabel: 'Language switcher',
      languageShort: {
        en: 'EN',
        es: 'ES',
      },
    },
    footer: {
      tagline:
        'Applied AI systems builder designing agents, automation, and creative infrastructure for modern brands.',
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
        services: ['AI Systems', 'Agents', 'Automation'],
        summary: 'Designing AI systems for modern brands.',
        primaryCta: 'View Work',
        secondaryCta: 'Connect',
        scrollAria: 'Scroll to explore',
        scrollLabel: 'Explore',
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
        title: 'Business-minded builder. Systems-first by default.',
        body:
          'I came into this work through business, then taught myself how to build the systems teams actually need. Today I design <span class="highlight">AI workflows</span>, <span class="highlight">automation layers</span>, and <span class="highlight">product-minded interfaces</span> for marketing, CRM, content, and creative execution. My edge is the combination of <span class="highlight">systems thinking</span>, <span class="highlight">practical implementation</span>, and <span class="highlight">creative judgment</span> strong enough to keep the output coherent, useful, and worth deploying.',
        cta: 'Read More',
      },
      services: {
        title: 'Services',
        cta: 'Start a project',
        items: [
          {
            number: '00-1',
            title: 'AI Systems',
            titleShort: 'AI Systems',
            items: ['Agentic Workflows', 'AI Orchestration', 'Human Review Loops', 'Deployment Logic'],
            description:
              'Applied AI systems that turn repetitive, judgment-heavy work into reliable execution. Agents, orchestration, and decision flows built for real teams, not demo theatre.',
          },
          {
            number: '00-2',
            title: 'Web Development',
            titleShort: 'Web Dev',
            items: ['Custom Web Design', 'Frontend Development', 'Performance Optimization', 'CMS Integration'],
            description:
              'Modern, performant web experiences crafted with precision. Every site is built with conversion in mind: fast load times, intuitive navigation, and seamless user journeys that turn visitors into clients.',
          },
          {
            number: '00-3',
            title: 'Photography',
            titleShort: 'Photography',
            items: ['Brand Photo', 'Visual Story', 'Editorial Shoot', 'Product Photo'],
            description:
              'Visual narratives that capture the essence of brands and stories. Helping brands convert visual interest into lasting engagement through authentic imagery that connects with audiences on an emotional level.',
          },
          {
            number: '00-4',
            title: 'Creative Direction',
            titleShort: 'Creative Dir',
            items: ['Brand Strategy', 'Visual Identity', 'Art Direction', 'Campaign Concepts'],
            description:
              'Strategic creative vision from concept to execution. I guide brands through the creative process, ensuring every touchpoint, from logo to campaign, tells a cohesive story that resonates with your target audience.',
          },
        ],
      },
      contact: {
        title: "Let's Build the Right System",
        subtitle:
          'Working on AI systems, automation, internal tools, or creative operations? Send context. I design workflows and interfaces that help teams execute with more speed, consistency, and control.',
        intro: "Send a short brief and I'll get back to you within 24 hours.",
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
            "Tell me what you're building, where execution is breaking down, and how AI, automation, or a better interface could help...",
        },
        errors: {
          name: 'Name must be at least 2 characters.',
          email: 'Please enter a valid email address.',
          generic: 'Failed to send message. Please try again.',
        },
        success: "Thank you! I'll get back to you soon.",
        dismissSuccess: 'Dismiss success message',
        responseNote: 'I usually reply within 24 hours.',
        sending: 'Sending...',
        send: 'Send Message',
        sendAria: 'Send message',
        sendingAria: 'Sending message',
      },
      socials: {
        label: 'Connect',
        title: "Let's Connect",
        selectedLinks: 'Selected Links',
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
        summary: 'Arquitecto de Sistemas de IA para Marcas Modernas',
        primaryCta: 'Ver trabajo',
        secondaryCta: 'Conectar',
        scrollAria: 'Desplazar para explorar',
        scrollLabel: 'Explorar',
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
        title: 'Desarrollador con visión de negocio. Los sistemas como prioridad.',
        body:
          'Llegué a este sector desde el mundo de los negocios y aprendí de forma autodidacta a crear los sistemas que los equipos realmente necesitan. Hoy diseño <span class="highlight">flujos de trabajo con IA</span>, <span class="highlight">capas de automatización</span> e <span class="highlight">interfaces orientadas a producto</span>... Mi valor diferencial es la combinación de <span class="highlight">pensamiento sistémico</span>, <span class="highlight">implementación práctica</span> y un <span class="highlight">criterio creativo</span> lo suficientemente sólido como para mantener un resultado coherente, útil y listo para desplegarse.',
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
            items: ['Flujos basados en agentes', 'Orquestación de IA', 'Bucles de revisión humana', 'Lógica de despliegue'],
            description:
              'Sistemas de IA aplicada que transforman el trabajo repetitivo y de alta carga cognitiva en una ejecución fiable. Agentes, orquestación y flujos de decisión construidos para equipos reales, no solo para demostraciones.',
          },
          {
            number: '00-2',
            title: 'Desarrollo web',
            titleShort: 'Web',
            items: ['Diseño web a medida', 'Desarrollo frontend', 'Optimización de rendimiento', 'Integración CMS'],
            description:
              'Experiencias web modernas y rápidas, construidas con precisión. Cada sitio está pensado para convertir: carga rápida, navegación clara y recorridos fluidos que convierten visitas en clientes.',
          },
          {
            number: '00-3',
            title: 'Fotografía',
            titleShort: 'Foto',
            items: ['Foto de marca', 'Narrativa visual', 'Editorial', 'Producto'],
            description:
              'Narrativas visuales que capturan la esencia de marcas e historias. Ayudo a convertir interés visual en conexión duradera mediante imágenes auténticas que generan resonancia emocional.',
          },
          {
            number: '00-4',
            title: 'Dirección creativa',
            titleShort: 'Dir. creativa',
            items: ['Estrategia de marca', 'Identidad visual', 'Dirección de arte', 'Conceptos de campaña'],
            description:
              'Visión creativa estratégica desde el concepto hasta la ejecución. Guío a las marcas en el proceso creativo para que cada punto de contacto, del logo a la campaña, cuente una historia coherente.',
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
        selectedLinks: 'Enlaces seleccionados',
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
