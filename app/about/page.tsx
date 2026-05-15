'use client'

import { useEffect, useMemo, useRef } from 'react'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLocaleFromPath, localizePath, switchLocalePath } from '@/lib/i18n'

type TextPair = {
  en: string
  es: string
}

type TimelineItem = {
  date: string
  title: string
  org: string
  desc: string
  tags: string[]
}

const pageCopy = {
  en: {
    nav: {
      work: 'Work',
      about: 'About',
      trajectory: 'Trajectory',
      contact: 'Contact',
    },
    heroMeta: [
      ['Role', 'Creative Technologist'],
      ['Practice', 'Cultural Architect'],
      ['Based', 'Madrid'],
      ['Status', 'Available Q3 2026'],
    ],
    portraitMeta: ['Portrait', 'Madrid 2026'],
    heroTag:
      'I build systems where brand, code, and culture meet. Translating intent into agentic workflows, customer journeys, and internal tools that quietly run the show.',
    current: ['Currently', 'CRM & AI', 'Perfumerias Primor', '+ Independent', 'Agentic systems & SaaS'],
    aboutEyebrow: 'About',
    aboutTitle: <>A short <span className="about-landing__serif">version</span><br />of the story.</>,
    lede:
      'Half-Spanish, half-Belgian. I think like a designer, build like an engineer, and read like a curator. Most of what I make sits between those three.',
    body: [
      'I grew up moving between languages and countries, which is probably why I dislike single-discipline thinking. Business school gave me the vocabulary for brand and strategy. Code and AI gave me the means to actually ship them.',
      'The work I care about is where craft meets computation: prototypes that feel hand-made, visual systems that scale without losing their accent, and tools that respect the people using them.',
      'Curious by default, restless by habit. Always reading too many books, watching too many films, and tinkering with whatever the new medium happens to be.',
    ],
    geography: {
      kicker: 'Geography',
      meta: '3 cities, 5 languages',
      cities: [
        ['Madrid', '40.4N · 3.7W', 'now'],
        ['Brussels', '50.8N · 4.4E', 'roots'],
        ['Orlando', '28.5N · 81.4W', 'exchange'],
      ],
    },
    languages: {
      title: 'Languages',
      items: [
        ['ES', 'Spanish', 'Native', 5],
        ['EN', 'English', 'Native', 5],
        ['NL', 'Dutch', 'Basic', 2],
        ['DE', 'German', 'Basic', 2],
        ['IT', 'Italian', 'Basic', 2],
      ] as const,
    },
    notes: [
      {
        className: 'about-note--read',
        kicker: 'Reading',
        image: '/images/visuals/album-covers/Gaze.webp',
        title: 'Strategy, fiction, manuals',
        body: 'Books that sharpen taste, systems, and the edges between them.',
      },
      {
        className: 'about-note--watch',
        kicker: 'Watching',
        image: '/images/photography/street/Street12.webp',
        title: 'Cinema in rotation',
        body: 'Quiet frames, customer rituals, anything with a precise visual language.',
      },
      {
        className: 'about-note--listen',
        kicker: 'Listening',
        image: '/images/visuals/album-covers/Astralis_Cover.webp',
        title: 'On loop',
        body: 'Ambient, jazz, flamenco fusion, and anything that keeps the room moving.',
      },
      {
        className: 'about-note--photo',
        kicker: 'Photography',
        image: '/images/photography/street/Street6.webp',
        title: 'From the archive',
        body: 'Street, light, and the small accidents that make a city feel usable.',
      },
    ],
    stack: {
      title: 'On the stack',
      groups: [
        ['Code', ['Claude Code', 'OpenAI Codex', 'React · Next.js', 'Python · TypeScript']],
        ['Automation', ['n8n', 'MCP · Agentic AI', 'Retrieval · Chroma', 'Prompt engineering']],
        ['Visual', ['Photoshop', 'Illustrator', 'Figma', 'Image models']],
      ],
    },
    marquee: [
      'Applied AI',
      'Agentic workflows',
      'Creative direction',
      'OpenAI Codex',
      'n8n',
      'Brand systems',
      'Generative tools',
      'Prompt engineering',
      'Art direction',
    ],
    timelineTitle: <>Trajectory <span className="about-landing__serif">so far</span>.</>,
    timelineIntro:
      'Five years moving between brand, technology, and the operational tissue that connects them, from a marketing degree in Madrid to building agentic systems for live cultural infrastructure.',
    timeline: [
      {
        date: 'Sep 2021',
        title: 'Started at IE University',
        org: 'BBA · Marketing',
        desc:
          'Madrid. IE High Potential Award scholarship. First exposure to programming, business-driven IT, and digital marketing analytics.',
        tags: ['Madrid', 'Scholarship', 'BBA'],
      },
      {
        date: 'Mar 2023',
        title: 'IE Marketing Lab',
        org: 'Project Leader · 8+ companies',
        desc:
          'Led a team of five delivering marketing solutions for partner companies. Client work, strategy, and creative problem-solving on a deadline.',
        tags: ['Leadership', 'Strategy', 'Client work'],
      },
      {
        date: 'Sep 2023',
        title: 'WeFeel App Challenge',
        org: 'Branding & Marketing Trainee',
        desc:
          'Pitched business recommendations across brand, value proposition, and product direction. Three were approved for implementation.',
        tags: ['Brand', 'Pitch', 'Adopted'],
      },
      {
        date: 'Jan 2024',
        title: 'Exchange · UCF',
        org: 'University of Central Florida · Orlando',
        desc:
          'A semester abroad that sharpened customer-experience instincts and gave service marketing a different cultural vantage point.',
        tags: ['USA', 'Service marketing'],
      },
      {
        date: 'Jul 2025',
        title: 'Graduated',
        org: 'IE University · BBA, Marketing',
        desc:
          'Closed the chapter with a marketing concentration, an exchange semester, and four years of practical project work behind me.',
        tags: ['Graduated', 'Marketing'],
      },
      {
        date: 'Jun 2025',
        title: 'Freelance · AI & Automation',
        org: 'Independent practice · Madrid',
        desc:
          'Started prototyping lightweight apps and internal tools through AI-assisted development, agentic workflows, Codex, Claude Code, and n8n.',
        tags: ['Codex', 'n8n', 'Agentic', 'SaaS'],
      },
      {
        date: 'Aug 2025',
        title: 'Perfumerias Primor',
        org: 'CRM Specialist · AI Automation & Brand Growth',
        desc:
          'Lead CRM and lifecycle execution for an 8M+ user database, partner with luxury houses, and support internal AI adoption.',
        tags: ['Connectif', 'Lifecycle', '8M+ users', 'Luxury'],
      },
      {
        date: 'Now',
        title: 'Building the next thing',
        org: 'Agentic AI · GEO/AEO SaaS · Creative ops',
        desc:
          'Going deeper into agentic systems, retrieval, AI fluency, and the practical loop of shipping, measuring, and learning.',
        tags: ['Agentic', 'Skills', 'Retrieval'],
      },
    ] satisfies TimelineItem[],
    practiceTitle: <>A <span className="about-landing__serif">practice</span>, not a job title.</>,
    practiceIntro:
      'Two halves of the same job. On the engineering side, applied AI and agentic systems. On the brand side, creative direction for the products, campaigns, and rituals those systems power.',
    capabilities: [
      {
        number: '01',
        kicker: 'Lead practice',
        title: <>Agentic <span>AI</span><br />& automation.</>,
        body:
          'Multi-step systems for creative ops: campaign ideation, asset variation, generative pipelines, and the handoffs between them.',
        tools: ['Claude Code', 'OpenAI Codex', 'n8n', 'MCP', 'Retrieval'],
        featured: true,
      },
      {
        number: '02',
        kicker: 'Creative',
        title: <>Creative<br /><span>direction</span>.</>,
        body:
          'Art direction, brand voice, and visual identity for digital products and campaigns. The taste layer that keeps systems human.',
        tools: ['Identity', 'Voice', 'Art direction'],
      },
      {
        number: '03',
        kicker: 'Software',
        title: <>Prototyping<br />& <span>tools</span>.</>,
        body:
          'Internal applications, lightweight SaaS, and MVPs shipped through AI-assisted development and product-minded execution.',
        tools: ['React', 'Next.js', 'Claude Code'],
      },
      {
        number: '04',
        kicker: 'Brand',
        title: <>Brand as<br /><span>system</span>.</>,
        body:
          'Translating positioning into the operational systems that carry it, so the output still reads like the brand.',
        tools: ['Luxury', 'Positioning', 'Systems'],
      },
      {
        number: '05',
        kicker: 'Generative',
        title: <>Generative <span>visual</span> systems.</>,
        body:
          'Pipelines that produce campaign-consistent visual variations while preserving art direction, lighting, and continuity.',
        tools: ['n8n', 'Image models', 'Style locks', 'Asset variation'],
      },
      {
        number: '06',
        kicker: 'Fluency',
        title: <>Teaching<br />the <span>loop</span>.</>,
        body:
          'Finding where AI helps a team, prototyping the workflow, and training people on the use cases that stick.',
        tools: ['Workshops', 'Adoption'],
      },
    ],
    brandsTitle: <>Worked with <span className="about-landing__serif">or for</span></>,
    learningTitle: <>Always <span className="about-landing__serif">learning</span><br />something new.</>,
    quote: <>Culture is<br />infrastructure.<br /><span>Build it</span> like<br />you mean it.</>,
    ctaTitle: <>Let&apos;s make <span className="about-landing__serif">something</span> work.</>,
    contactMeta: ['Available Q3 2026', 'Madrid · Remote · EU'],
    footerMeta: ['© 2026 Raúl Mermans García', 'Built · Madrid · 2026'],
  },
  es: {
    nav: {
      work: 'Trabajo',
      about: 'Sobre mi',
      trajectory: 'Trayectoria',
      contact: 'Contacto',
    },
    heroMeta: [
      ['Rol', 'Tecnologo creativo'],
      ['Practica', 'Arquitecto cultural'],
      ['Base', 'Madrid'],
      ['Estado', 'Disponible T3 2026'],
    ],
    portraitMeta: ['Retrato', 'Madrid 2026'],
    heroTag:
      'Construyo sistemas donde marca, codigo y cultura se encuentran. Traduzco intencion en flujos con agentes, journeys de cliente y herramientas internas que hacen que la operacion funcione.',
    current: ['Ahora', 'CRM e IA', 'Perfumerias Primor', '+ Independiente', 'Sistemas agenticos y SaaS'],
    aboutEyebrow: 'Sobre mi',
    aboutTitle: <>La <span className="about-landing__serif">version</span><br />corta de la historia.</>,
    lede:
      'Mitad espanol, mitad belga. Pienso como disenador, construyo como ingeniero y leo como curador. Casi todo lo que hago vive entre esas tres formas de mirar.',
    body: [
      'Creci moviendome entre idiomas y paises, asi que nunca he encajado demasiado bien en una sola disciplina. La empresa me dio el lenguaje para entender marca y estrategia. El codigo y la IA me dieron la capacidad de llevarlas a produccion.',
      'Me interesa el punto donde oficio y computacion se cruzan: prototipos que se sienten hechos a mano, sistemas visuales que escalan sin perder acento y herramientas que respetan a la gente que las usa.',
      'Curioso por defecto, inquieto por costumbre. Siempre leyendo demasiados libros, viendo demasiadas peliculas y probando el siguiente medio que aparece.',
    ],
    geography: {
      kicker: 'Geografia',
      meta: '3 ciudades, 5 idiomas',
      cities: [
        ['Madrid', '40.4N · 3.7W', 'ahora'],
        ['Bruselas', '50.8N · 4.4E', 'raices'],
        ['Orlando', '28.5N · 81.4W', 'intercambio'],
      ],
    },
    languages: {
      title: 'Idiomas',
      items: [
        ['ES', 'Espanol', 'Nativo', 5],
        ['EN', 'Ingles', 'Nativo', 5],
        ['NL', 'Neerlandes', 'Basico', 2],
        ['DE', 'Aleman', 'Basico', 2],
        ['IT', 'Italiano', 'Basico', 2],
      ] as const,
    },
    notes: [
      {
        className: 'about-note--read',
        kicker: 'Lectura',
        image: '/images/visuals/album-covers/Gaze.webp',
        title: 'Estrategia, ficcion, manuales',
        body: 'Libros que afinan criterio, sistemas y los bordes entre ambos.',
      },
      {
        className: 'about-note--watch',
        kicker: 'Pantalla',
        image: '/images/photography/street/Street12.webp',
        title: 'Cine en rotacion',
        body: 'Planos tranquilos, rituales de cliente y cualquier lenguaje visual preciso.',
      },
      {
        className: 'about-note--listen',
        kicker: 'Sonido',
        image: '/images/visuals/album-covers/Astralis_Cover.webp',
        title: 'En bucle',
        body: 'Ambient, jazz, flamenco fusion y cosas que mantienen la sala en movimiento.',
      },
      {
        className: 'about-note--photo',
        kicker: 'Fotografia',
        image: '/images/photography/street/Street6.webp',
        title: 'Del archivo',
        body: 'Calle, luz y esos pequenos accidentes que hacen util una ciudad.',
      },
    ],
    stack: {
      title: 'En la mesa',
      groups: [
        ['Codigo', ['Claude Code', 'OpenAI Codex', 'React · Next.js', 'Python · TypeScript']],
        ['Automatizacion', ['n8n', 'MCP · IA agentica', 'Retrieval · Chroma', 'Prompt engineering']],
        ['Visual', ['Photoshop', 'Illustrator', 'Figma', 'Modelos de imagen']],
      ],
    },
    marquee: [
      'IA aplicada',
      'Flujos agenticos',
      'Direccion creativa',
      'OpenAI Codex',
      'n8n',
      'Sistemas de marca',
      'Herramientas generativas',
      'Prompt engineering',
      'Direccion de arte',
    ],
    timelineTitle: <>Trayectoria <span className="about-landing__serif">hasta ahora</span>.</>,
    timelineIntro:
      'Cinco anos moviendome entre marca, tecnologia y el tejido operativo que las conecta, desde una carrera de marketing en Madrid hasta sistemas agenticos para infraestructura cultural viva.',
    timeline: [
      {
        date: 'Sep 2021',
        title: 'Inicio en IE University',
        org: 'BBA · Marketing',
        desc:
          'Madrid. Beca IE High Potential Award. Primer contacto con programacion, IT orientado a negocio y analitica de marketing digital.',
        tags: ['Madrid', 'Beca', 'BBA'],
      },
      {
        date: 'Mar 2023',
        title: 'IE Marketing Lab',
        org: 'Project Leader · 8+ empresas',
        desc:
          'Lidere un equipo de cinco personas entregando soluciones de marketing para empresas colaboradoras. Estrategia, cliente real y ejecucion con fecha limite.',
        tags: ['Liderazgo', 'Estrategia', 'Cliente'],
      },
      {
        date: 'Sep 2023',
        title: 'WeFeel App Challenge',
        org: 'Branding & Marketing Trainee',
        desc:
          'Presente recomendaciones de negocio sobre marca, propuesta de valor y direccion de producto. Tres fueron aprobadas para implementacion.',
        tags: ['Marca', 'Pitch', 'Adoptado'],
      },
      {
        date: 'Jan 2024',
        title: 'Intercambio · UCF',
        org: 'University of Central Florida · Orlando',
        desc:
          'Un semestre fuera que afino mi intuicion sobre experiencia de cliente y dio otra perspectiva cultural al service marketing.',
        tags: ['USA', 'Service marketing'],
      },
      {
        date: 'Jul 2025',
        title: 'Graduacion',
        org: 'IE University · BBA, Marketing',
        desc:
          'Cierre de etapa con concentracion en marketing, intercambio internacional y cuatro anos de proyectos practicos detras.',
        tags: ['Graduado', 'Marketing'],
      },
      {
        date: 'Jun 2025',
        title: 'Freelance · IA y automatizacion',
        org: 'Practica independiente · Madrid',
        desc:
          'Empiezo a prototipar apps ligeras y herramientas internas con desarrollo asistido por IA, flujos agenticos, Codex, Claude Code y n8n.',
        tags: ['Codex', 'n8n', 'Agentico', 'SaaS'],
      },
      {
        date: 'Aug 2025',
        title: 'Perfumerias Primor',
        org: 'CRM Specialist · AI Automation & Brand Growth',
        desc:
          'CRM y lifecycle para una base de mas de 8M de usuarios, colaboracion con marcas de lujo y adopcion interna de IA.',
        tags: ['Connectif', 'Lifecycle', '8M+ usuarios', 'Lujo'],
      },
      {
        date: 'Ahora',
        title: 'Construyendo lo siguiente',
        org: 'IA agentica · SaaS GEO/AEO · Creative ops',
        desc:
          'Profundizando en sistemas agenticos, retrieval, fluidez con IA y el ciclo practico de lanzar, medir y aprender.',
        tags: ['Agentico', 'Skills', 'Retrieval'],
      },
    ] satisfies TimelineItem[],
    practiceTitle: <>Una <span className="about-landing__serif">practica</span>, no un cargo.</>,
    practiceIntro:
      'Dos mitades del mismo trabajo. En la parte tecnica, IA aplicada y sistemas agenticos. En la parte de marca, direccion creativa para los productos, campanas y rituales que esos sistemas sostienen.',
    capabilities: [
      {
        number: '01',
        kicker: 'Practica principal',
        title: <>IA <span>agentica</span><br />y automatizacion.</>,
        body:
          'Sistemas de varios pasos para creative ops: ideacion de campanas, variacion de assets, pipelines generativos y handoffs entre equipos.',
        tools: ['Claude Code', 'OpenAI Codex', 'n8n', 'MCP', 'Retrieval'],
        featured: true,
      },
      {
        number: '02',
        kicker: 'Creativo',
        title: <>Direccion<br /><span>creativa</span>.</>,
        body:
          'Direccion de arte, voz de marca e identidad visual para productos digitales y campanas. La capa de criterio que mantiene humano el sistema.',
        tools: ['Identidad', 'Voz', 'Direccion de arte'],
      },
      {
        number: '03',
        kicker: 'Software',
        title: <>Prototipos<br />y <span>herramientas</span>.</>,
        body:
          'Aplicaciones internas, SaaS ligeros y MVPs lanzados con desarrollo asistido por IA y criterio de producto.',
        tools: ['React', 'Next.js', 'Claude Code'],
      },
      {
        number: '04',
        kicker: 'Marca',
        title: <>Marca como<br /><span>sistema</span>.</>,
        body:
          'Traducir posicionamiento en sistemas operativos que lo transportan, para que la salida siga sonando a marca.',
        tools: ['Lujo', 'Posicionamiento', 'Sistemas'],
      },
      {
        number: '05',
        kicker: 'Generativo',
        title: <>Sistemas <span>visuales</span> generativos.</>,
        body:
          'Pipelines que producen variaciones visuales consistentes con campana, manteniendo direccion de arte, luz y continuidad.',
        tools: ['n8n', 'Modelos de imagen', 'Style locks', 'Variacion de assets'],
      },
      {
        number: '06',
        kicker: 'Fluidez',
        title: <>Ensenar<br />el <span>bucle</span>.</>,
        body:
          'Encontrar donde la IA ayuda de verdad, prototipar el flujo y formar al equipo en los usos que se quedan.',
        tools: ['Workshops', 'Adopcion'],
      },
    ],
    brandsTitle: <>He trabajado <span className="about-landing__serif">con o para</span></>,
    learningTitle: <>Siempre <span className="about-landing__serif">aprendiendo</span><br />algo nuevo.</>,
    quote: <>La cultura es<br />infraestructura.<br /><span>Construyela</span><br />con intencion.</>,
    ctaTitle: <>Hagamos que <span className="about-landing__serif">algo</span> funcione.</>,
    contactMeta: ['Disponible T3 2026', 'Madrid · Remoto · UE'],
    footerMeta: ['© 2026 Raúl Mermans García', 'Construido · Madrid · 2026'],
  },
}

const brands = ['DIOR', 'LANCOME', 'GIORGIO ARMANI', 'PRIMOR', 'IE UNIVERSITY', 'WEFEEL', 'UCF', '+ MORE']

const courses: TextPair[] = [
  { en: 'Agentic AI', es: 'IA agentica' },
  { en: 'Agent Skills · Anthropic', es: 'Agent Skills · Anthropic' },
  { en: 'Advanced Retrieval · Chroma', es: 'Retrieval avanzado · Chroma' },
  { en: 'AI Fluency · Frameworks', es: 'Fluidez IA · Frameworks' },
  { en: 'Generative AI · Applications', es: 'IA generativa · Aplicaciones' },
  { en: 'Brand Management', es: 'Gestion de marca' },
  { en: 'Google Digital Marketing', es: 'Google Digital Marketing' },
  { en: 'Service Marketing · UCF', es: 'Service Marketing · UCF' },
]

function useAboutLandingMotion() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealTargets = document.querySelectorAll<HTMLElement>('[data-about-reveal]')

    if (prefersReducedMotion) {
      revealTargets.forEach((target) => target.classList.add('is-visible'))
      document.querySelectorAll<HTMLElement>('.about-landing__clip').forEach((clip) => {
        clip.classList.add('is-visible')
      })
      document.querySelector<HTMLElement>('.about-landing__name')?.classList.add('is-visible')
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    )

    revealTargets.forEach((target) => observer.observe(target))
    requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>('.about-landing__clip').forEach((clip) => {
        clip.classList.add('is-visible')
      })
      document.querySelector<HTMLElement>('.about-landing__name')?.classList.add('is-visible')
    })

    let frame = 0

    const updateScroll = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0
      progressRef.current?.style.setProperty('--about-progress', `${pct}%`)
      hintRef.current?.classList.toggle('is-hidden', doc.scrollTop > 80)

      const timeline = timelineRef.current
      if (timeline) {
        const rect = timeline.getBoundingClientRect()
        const viewport = window.innerHeight
        const start = rect.top - viewport * 0.62
        const end = rect.bottom - viewport * 0.42
        const total = end - start
        const current = Math.min(Math.max(-start, 0), total)
        const fill = total > 0 ? (current / total) * 100 : 0
        timeline.style.setProperty('--timeline-fill', `${fill}%`)
      }
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateScroll)
    }

    const onPointerMove = (event: PointerEvent) => {
      const ghost = ghostRef.current
      if (!ghost || event.pointerType === 'touch') return
      const x = (event.clientX / window.innerWidth - 0.5) * 14
      const y = (event.clientY / window.innerHeight - 0.5) * 14
      ghost.style.setProperty('--ghost-x', `${x}px`)
      ghost.style.setProperty('--ghost-y', `${y}px`)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    updateScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  return { timelineRef, progressRef, hintRef, ghostRef }
}

function MapGraphic() {
  return (
    <svg className="about-map" viewBox="0 0 1000 500" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="about-map-stip" patternUnits="userSpaceOnUse" width="6" height="6">
          <circle cx="1.5" cy="1.5" r="1" fill="rgba(240,236,226,.22)" />
        </pattern>
      </defs>
      <g className="about-map__land">
        <path d="M120,90 C200,70 260,75 295,130 C310,180 280,220 250,250 C220,265 180,260 150,240 C115,210 90,170 95,130 Z" />
        <path d="M305,55 C335,50 360,65 365,90 C365,110 340,118 315,112 C295,105 290,75 305,55 Z" />
        <path d="M210,250 C220,270 230,290 245,295 C260,290 268,275 260,260 Z" />
        <path d="M260,295 C295,300 320,335 310,385 C295,425 270,440 250,425 C235,400 230,360 240,325 Z" />
        <path d="M470,105 C520,95 555,100 575,125 C570,150 545,165 510,165 C485,160 460,140 460,120 Z" />
        <path d="M455,115 C465,108 475,115 472,130 C465,138 452,135 450,125 Z" />
        <path d="M490,180 C550,178 595,200 605,250 C600,305 570,355 525,365 C495,355 475,320 475,275 C475,235 480,205 490,180 Z" />
        <path d="M575,150 C615,150 635,170 630,195 C615,210 590,205 575,195 Z" />
        <path d="M580,90 C680,70 770,75 840,110 C870,145 855,195 810,215 C740,225 660,215 615,195 C580,170 565,130 580,90 Z" />
        <path d="M695,200 C725,200 740,225 725,265 C710,280 695,275 685,255 C680,230 685,210 695,200 Z" />
        <path d="M770,235 C800,232 830,245 830,265 C815,275 790,275 775,265 Z" />
        <path d="M810,275 C830,275 840,290 825,302 C805,302 800,290 810,275 Z" />
        <path d="M870,150 C885,145 895,160 885,180 C870,180 862,165 870,150 Z" />
        <path d="M790,335 C860,330 905,345 905,375 C895,400 855,410 810,400 C785,385 780,355 790,335 Z" />
      </g>
      <g className="about-map__cities">
        <path className="about-map__trail" d="M240,200 Q380,80 510,122" />
        <path className="about-map__trail" d="M510,122 Q508,135 506,152" />
        {[
          [506, 152],
          [510, 122],
          [240, 200],
        ].map(([cx, cy], index) => (
          <g className="about-map__city" key={`${cx}-${cy}`} style={{ '--ping-delay': `${index * 0.55}s` } as CSSProperties}>
            <circle cx={cx} cy={cy} r="22" className="about-map__halo" />
            <circle cx={cx} cy={cy} r="5" className="about-map__pin" />
          </g>
        ))}
      </g>
    </svg>
  )
}

export default function AboutPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const copy = pageCopy[locale]
  const { timelineRef, progressRef, hintRef, ghostRef } = useAboutLandingMotion()
  const englishPath = switchLocalePath(pathname || '/about', 'en')
  const spanishPath = switchLocalePath(pathname || '/about', 'es')
  const doubledMarquee = useMemo(() => [...copy.marquee, ...copy.marquee], [copy.marquee])

  return (
    <main id="main-content" className="about-landing" role="main">
      <div ref={progressRef} className="about-landing__progress" aria-hidden="true" />

      <nav className="about-landing__nav" aria-label={locale === 'es' ? 'Navegacion de sobre mi' : 'About page navigation'}>
        <Link href={localizePath('/', locale)} className="about-landing__logo" aria-label={locale === 'es' ? 'Inicio' : 'Home'}>
          RM<span>.</span>
        </Link>
        <div className="about-landing__nav-links">
          <Link href={localizePath('/case-studies', locale)}>{copy.nav.work}</Link>
          <a href="#about-story">{copy.nav.about}</a>
          <a href="#trajectory">{copy.nav.trajectory}</a>
          <a href="#about-contact">{copy.nav.contact}</a>
        </div>
        <div className="about-landing__lang" role="group" aria-label={locale === 'es' ? 'Selector de idioma' : 'Language switcher'}>
          <Link href={englishPath} aria-current={locale === 'en' ? 'page' : undefined}>
            EN
          </Link>
          <Link href={spanishPath} aria-current={locale === 'es' ? 'page' : undefined}>
            ES
          </Link>
        </div>
      </nav>

      <div ref={hintRef} className="about-landing__scroll-hint" aria-hidden="true">
        <span />
        {locale === 'es' ? 'Scroll' : 'Scroll'}
      </div>

      <section className="about-landing__hero" id="top" aria-labelledby="about-landing-title">
        <div className="about-landing__container">
          <div className="about-landing__meta-grid" data-about-reveal>
            {copy.heroMeta.map(([label, value]) => (
              <div key={label}>
                {label}
                <b>{value}</b>
              </div>
            ))}
          </div>

          <div className="about-landing__stage">
            <h1 id="about-landing-title" className="about-landing__name">
              <span ref={ghostRef} className="about-landing__name-ghost" aria-hidden="true">
                RAÚL
                <br />
                MERMANS
              </span>
              <span className="about-landing__name-row">
                <span className="about-landing__clip">
                  <span>RAÚL</span>
                </span>
              </span>
              <span className="about-landing__name-row about-landing__name-row--right">
                <span className="about-landing__clip">
                  <span>MERMANS</span>
                </span>
                <span className="about-landing__name-dot" aria-hidden="true" />
              </span>
            </h1>

            <figure className="about-landing__portrait" data-about-reveal>
              <div className="about-landing__portrait-frame">
                <Image
                  src="/images/about/profile.webp"
                  alt={locale === 'es' ? 'Retrato de Raúl Mermans' : 'Portrait of Raúl Mermans'}
                  fill
                  priority
                  quality={88}
                  sizes="(max-width: 900px) 240px, 260px"
                />
              </div>
              <figcaption>
                <span>{copy.portraitMeta[0]}</span>
                <span>{copy.portraitMeta[1]}</span>
              </figcaption>
            </figure>
          </div>

          <div className="about-landing__tag" data-about-reveal>
            <p>{copy.heroTag}</p>
            <div>
              {copy.current[0]}
              <b>{copy.current[1]}</b>
              {copy.current[2]}
              <b>{copy.current[3]}</b>
              {copy.current[4]}
            </div>
          </div>
        </div>
      </section>

      <section className="about-landing__story" id="about-story" aria-labelledby="about-story-title">
        <div className="about-landing__container">
          <div className="about-landing__story-grid">
            <p className="about-landing__eyebrow" data-about-reveal>
              {copy.aboutEyebrow}
            </p>
            <h2 id="about-story-title" data-about-reveal>
              {copy.aboutTitle}
            </h2>
            <div>
              <p className="about-landing__lede" data-about-reveal>
                {copy.lede}
              </p>
              <div className="about-landing__body" data-about-reveal>
                {copy.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="about-notes" data-about-reveal>
            <article className="about-note about-note--map">
              <div className="about-note__head">
                <span>{copy.geography.kicker}</span>
                <span>{copy.geography.meta}</span>
              </div>
              <MapGraphic />
              <div className="about-map__legend">
                {copy.geography.cities.map(([city, coord, label]) => (
                  <div key={city}>
                    <span aria-hidden="true" />
                    <b>{city}</b>
                    <i>{coord}</i>
                    <em>{label}</em>
                  </div>
                ))}
              </div>
            </article>

            <article className="about-note about-note--lang">
              <div className="about-note__head">
                <span>{copy.languages.title}</span>
                <span className="about-note__marker" aria-hidden="true" />
              </div>
              <ul className="about-language-list" aria-label={copy.languages.title}>
                {copy.languages.items.map(([code, name, level, dots]) => (
                  <li key={code}>
                    <span>{code}</span>
                    <b>{name}</b>
                    <span className="about-language-list__dots" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <i key={dot} data-active={dot <= dots ? 'true' : undefined} />
                      ))}
                    </span>
                    <em>{level}</em>
                  </li>
                ))}
              </ul>
            </article>

            {copy.notes.map((note) => (
              <article className={`about-note ${note.className}`} key={note.kicker}>
                <div className="about-note__head">
                  <span>{note.kicker}</span>
                  <span className="about-note__marker" aria-hidden="true" />
                </div>
                <div className="about-note__image">
                  <Image src={note.image} alt="" fill sizes="(max-width: 900px) 100vw, 280px" />
                </div>
                <div className="about-note__meta">
                  <h3>{note.title}</h3>
                  <p>{note.body}</p>
                </div>
              </article>
            ))}

            <article className="about-note about-note--stack">
              <div className="about-note__head">
                <span>{copy.stack.title}</span>
                <span className="about-note__marker" aria-hidden="true" />
              </div>
              <div className="about-stack-grid">
                {copy.stack.groups.map(([label, items]) => (
                  <div key={label}>
                    <p>{label}</p>
                    {items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <div className="about-marquee" aria-hidden="true">
        <div>
          {doubledMarquee.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <section className="about-timeline" id="trajectory" aria-labelledby="about-timeline-title">
        <div className="about-landing__container">
          <div className="about-timeline__head">
            <h2 id="about-timeline-title" data-about-reveal>
              {copy.timelineTitle}
            </h2>
            <p data-about-reveal>{copy.timelineIntro}</p>
          </div>

          <div ref={timelineRef} className="about-timeline__wrap">
            <div className="about-timeline__track" aria-hidden="true" />
            {copy.timeline.map((item) => (
              <article className="about-timeline__node" key={`${item.date}-${item.title}`} data-about-reveal>
                <span className="about-timeline__dot" aria-hidden="true" />
                <div className="about-timeline__card">
                  <p>{item.date}</p>
                  <h3>{item.title}</h3>
                  <h4>{item.org}</h4>
                  <p>{item.desc}</p>
                  <div>
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-practice" aria-labelledby="about-practice-title">
        <div className="about-landing__container">
          <div className="about-practice__head">
            <h2 id="about-practice-title" data-about-reveal>
              {copy.practiceTitle}
            </h2>
            <p data-about-reveal>{copy.practiceIntro}</p>
          </div>

          <div className="about-capabilities" data-about-reveal>
            {copy.capabilities.map((capability) => (
              <article
                key={capability.number}
                className={`about-capability ${capability.featured ? 'about-capability--featured' : ''}`}
              >
                <span className="about-capability__number" aria-hidden="true">
                  {capability.number}
                </span>
                <div className="about-capability__top">
                  <p>{capability.kicker}</p>
                  <span aria-hidden="true" />
                </div>
                <div className="about-capability__body">
                  <h3>{capability.title}</h3>
                  <p>{capability.body}</p>
                  <div>
                    {capability.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-brands" aria-labelledby="about-brands-title">
        <div className="about-landing__container">
          <h2 id="about-brands-title" data-about-reveal>
            {copy.brandsTitle}
          </h2>
          <div className="about-brand-grid" data-about-reveal>
            {brands.map((brand) => (
              <div key={brand}>
                <span>{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-learning" aria-labelledby="about-learning-title">
        <div className="about-landing__container">
          <h2 id="about-learning-title" data-about-reveal>
            {copy.learningTitle}
          </h2>
          <div className="about-chip-cloud" data-about-reveal>
            {courses.map((course, index) => (
              <span key={course.en}>
                {course[locale]}
                <i>{index < 4 ? '04·26' : index === 4 ? '02·26' : index === 5 ? '07·25' : '07·24'}</i>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="about-pull" aria-labelledby="about-pull-title">
        <div className="about-landing__container">
          <div aria-hidden="true">“</div>
          <blockquote id="about-pull-title" data-about-reveal>
            {copy.quote}
          </blockquote>
          <cite data-about-reveal>
            <b>{locale === 'es' ? 'Principio de trabajo' : 'Working principle'}</b>
            Raúl Mermans, 2026
          </cite>
        </div>
      </section>

      <footer className="about-footer" id="about-contact">
        <div className="about-landing__container">
          <div className="about-footer__cta">
            <h2 data-about-reveal>{copy.ctaTitle}</h2>
            <div data-about-reveal>
              <p>{copy.contactMeta[0]}</p>
              <a href="mailto:raulmermans@gmail.com">raulmermans@gmail.com →</a>
              <span>{copy.contactMeta[1]}</span>
            </div>
          </div>

          <div className="about-footer__cols">
            <div>
              <h3>{locale === 'es' ? 'Servicios' : 'Services'}</h3>
              <ul>
                <li><Link href={localizePath('/#services', locale)}>{locale === 'es' ? 'Sistemas de IA' : 'AI Systems'}</Link></li>
                <li><Link href={localizePath('/#services', locale)}>{locale === 'es' ? 'Automatizacion' : 'Automation'}</Link></li>
                <li><Link href={localizePath('/#services', locale)}>{locale === 'es' ? 'CRM y lifecycle' : 'CRM & Lifecycle'}</Link></li>
                <li><Link href={localizePath('/#services', locale)}>{locale === 'es' ? 'Direccion creativa' : 'Creative Direction'}</Link></li>
              </ul>
            </div>
            <div>
              <h3>{locale === 'es' ? 'Estudio' : 'Studio'}</h3>
              <ul>
                <li><a href="#about-story">{copy.nav.about}</a></li>
                <li><a href="#about-contact">{copy.nav.contact}</a></li>
                <li><Link href={localizePath('/case-studies', locale)}>{copy.nav.work}</Link></li>
                <li><Link href={localizePath('/apps/overflow', locale)}>Overflow</Link></li>
              </ul>
            </div>
            <div>
              <h3>{locale === 'es' ? 'En otros sitios' : 'Elsewhere'}</h3>
              <ul>
                <li><a href="https://www.linkedin.com/in/raulmermans/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
                <li><a href="https://github.com/RaulMermans" target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
                <li><a href="https://www.instagram.com/raulmeermans/" target="_blank" rel="noopener noreferrer">Instagram ↗</a></li>
                <li><a href="https://unsplash.com/@raulmermans" target="_blank" rel="noopener noreferrer">Unsplash ↗</a></li>
              </ul>
            </div>
          </div>

          <div className="about-footer__bottom">
            <span>{copy.footerMeta[0]}</span>
            <span>{copy.footerMeta[1]}</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
