'use client'

import { useEffect, useMemo, useRef } from 'react'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getLocaleFromPath } from '@/lib/i18n'

type TimelineItem = {
  date: string
  title: string
  org: string
  desc: string
  tags: string[]
}

const pageCopy = {
  en: {
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
        ['Málaga', '36.7N · 4.4W', 'home'],
        ['Madrid', '40.4N · 3.7W', 'now'],
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
      ] as [string, string[]][],
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
        date: 'Jun 2025',
        title: 'Freelance · AI & Automation',
        org: 'Independent practice · Madrid',
        desc:
          'Started prototyping lightweight apps and internal tools through AI-assisted development, agentic workflows, Codex, Claude Code, and n8n.',
        tags: ['Codex', 'n8n', 'Agentic', 'SaaS'],
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
    ctaTitle: <>Let&apos;s make <span className="about-landing__serif">something</span> work.</>,
    contactMeta: ['Available Q3 2026', 'Madrid · Remote · EU'],
  },
  es: {
    portraitMeta: ['Retrato', 'Madrid 2026'],
    heroTag:
      'Construyo sistemas donde marca, código y cultura se encuentran. Traduzco intención en flujos con agentes, journeys de cliente y herramientas internas que hacen que la operación funcione.',
    current: ['Ahora', 'CRM e IA', 'Perfumerias Primor', '+ Independiente', 'Sistemas agénticos y SaaS'],
    aboutEyebrow: 'Sobre mí',
    aboutTitle: <>La <span className="about-landing__serif">versión</span><br />corta de la historia.</>,
    lede:
      'Mitad español, mitad belga. Pienso como diseñador, construyo como ingeniero y leo como curador. Casi todo lo que hago vive entre esas tres formas de mirar.',
    body: [
      'Crecí moviéndome entre idiomas y países, así que nunca he encajado demasiado bien en una sola disciplina. La empresa me dio el lenguaje para entender marca y estrategia. El código y la IA me dieron la capacidad de llevarlas a producción.',
      'Me interesa el punto donde oficio y computación se cruzan: prototipos que se sienten hechos a mano, sistemas visuales que escalan sin perder acento y herramientas que respetan a la gente que las usa.',
      'Curioso por defecto, inquieto por costumbre. Siempre leyendo demasiados libros, viendo demasiadas películas y probando el siguiente medio que aparece.',
    ],
    geography: {
      kicker: 'Geografía',
      meta: '3 ciudades, 5 idiomas',
      cities: [
        ['Málaga', '36.7N · 4.4W', 'origen'],
        ['Madrid', '40.4N · 3.7W', 'ahora'],
        ['Orlando', '28.5N · 81.4W', 'intercambio'],
      ],
    },
    languages: {
      title: 'Idiomas',
      items: [
        ['ES', 'Español', 'Nativo', 5],
        ['EN', 'Inglés', 'Nativo', 5],
        ['NL', 'Neerlandés', 'Básico', 2],
        ['DE', 'Alemán', 'Básico', 2],
        ['IT', 'Italiano', 'Básico', 2],
      ] as const,
    },
    notes: [
      {
        className: 'about-note--read',
        kicker: 'Lectura',
        image: '/images/visuals/album-covers/Gaze.webp',
        title: 'Estrategia, ficción, manuales',
        body: 'Libros que afinan criterio, sistemas y los bordes entre ambos.',
      },
      {
        className: 'about-note--watch',
        kicker: 'Pantalla',
        image: '/images/photography/street/Street12.webp',
        title: 'Cine en rotación',
        body: 'Planos tranquilos, rituales de cliente y cualquier lenguaje visual preciso.',
      },
      {
        className: 'about-note--listen',
        kicker: 'Sonido',
        image: '/images/visuals/album-covers/Astralis_Cover.webp',
        title: 'En bucle',
        body: 'Ambient, jazz, flamenco fusión y cosas que mantienen la sala en movimiento.',
      },
      {
        className: 'about-note--photo',
        kicker: 'Fotografía',
        image: '/images/photography/street/Street6.webp',
        title: 'Del archivo',
        body: 'Calle, luz y esos pequeños accidentes que hacen útil una ciudad.',
      },
    ],
    stack: {
      title: 'En la mesa',
      groups: [
        ['Código', ['Claude Code', 'OpenAI Codex', 'React · Next.js', 'Python · TypeScript']],
        ['Automatización', ['n8n', 'MCP · IA agéntica', 'Retrieval · Chroma', 'Prompt engineering']],
        ['Visual', ['Photoshop', 'Illustrator', 'Figma', 'Modelos de imagen']],
      ] as [string, string[]][],
    },
    marquee: [
      'IA aplicada',
      'Flujos agénticos',
      'Dirección creativa',
      'OpenAI Codex',
      'n8n',
      'Sistemas de marca',
      'Herramientas generativas',
      'Prompt engineering',
      'Dirección de arte',
    ],
    timelineTitle: <>Trayectoria <span className="about-landing__serif">hasta ahora</span>.</>,
    timelineIntro:
      'Cinco años moviéndome entre marca, tecnología y el tejido operativo que las conecta, desde una carrera de marketing en Madrid hasta sistemas agénticos para infraestructura cultural viva.',
    timeline: [
      {
        date: 'Sep 2021',
        title: 'Inicio en IE University',
        org: 'BBA · Marketing',
        desc:
          'Madrid. Beca IE High Potential Award. Primer contacto con programación, IT orientado a negocio y analítica de marketing digital.',
        tags: ['Madrid', 'Beca', 'BBA'],
      },
      {
        date: 'Mar 2023',
        title: 'IE Marketing Lab',
        org: 'Project Leader · 8+ empresas',
        desc:
          'Lideré un equipo de cinco personas entregando soluciones de marketing para empresas colaboradoras. Estrategia, cliente real y ejecución con fecha límite.',
        tags: ['Liderazgo', 'Estrategia', 'Cliente'],
      },
      {
        date: 'Sep 2023',
        title: 'WeFeel App Challenge',
        org: 'Branding & Marketing Trainee',
        desc:
          'Presenté recomendaciones de negocio sobre marca, propuesta de valor y dirección de producto. Tres fueron aprobadas para implementación.',
        tags: ['Marca', 'Pitch', 'Adoptado'],
      },
      {
        date: 'Jan 2024',
        title: 'Intercambio · UCF',
        org: 'University of Central Florida · Orlando',
        desc:
          'Un semestre fuera que afinó mi intuición sobre experiencia de cliente y dio otra perspectiva cultural al service marketing.',
        tags: ['USA', 'Service marketing'],
      },
      {
        date: 'Jun 2025',
        title: 'Freelance · IA y automatización',
        org: 'Práctica independiente · Madrid',
        desc:
          'Empiezo a prototipar apps ligeras y herramientas internas con desarrollo asistido por IA, flujos agénticos, Codex, Claude Code y n8n.',
        tags: ['Codex', 'n8n', 'Agéntico', 'SaaS'],
      },
      {
        date: 'Jul 2025',
        title: 'Graduación',
        org: 'IE University · BBA, Marketing',
        desc:
          'Cierre de etapa con concentración en marketing, intercambio internacional y cuatro años de proyectos prácticos detrás.',
        tags: ['Graduado', 'Marketing'],
      },
      {
        date: 'Aug 2025',
        title: 'Perfumerias Primor',
        org: 'CRM Specialist · AI Automation & Brand Growth',
        desc:
          'CRM y lifecycle para una base de más de 8M de usuarios, colaboración con marcas de lujo y adopción interna de IA.',
        tags: ['Connectif', 'Lifecycle', '8M+ usuarios', 'Lujo'],
      },
      {
        date: 'Ahora',
        title: 'Construyendo lo siguiente',
        org: 'IA agéntica · SaaS GEO/AEO · Creative ops',
        desc:
          'Profundizando en sistemas agénticos, retrieval, fluidez con IA y el ciclo práctico de lanzar, medir y aprender.',
        tags: ['Agéntico', 'Skills', 'Retrieval'],
      },
    ] satisfies TimelineItem[],
    practiceTitle: <>Una <span className="about-landing__serif">práctica</span>, no un cargo.</>,
    practiceIntro:
      'Dos mitades del mismo trabajo. En la parte técnica, IA aplicada y sistemas agénticos. En la parte de marca, dirección creativa para los productos, campañas y rituales que esos sistemas sostienen.',
    capabilities: [
      {
        number: '01',
        kicker: 'Práctica principal',
        title: <>IA <span>agéntica</span><br />y automatización.</>,
        body:
          'Sistemas de varios pasos para creative ops: ideación de campañas, variación de assets, pipelines generativos y handoffs entre equipos.',
        tools: ['Claude Code', 'OpenAI Codex', 'n8n', 'MCP', 'Retrieval'],
        featured: true,
      },
      {
        number: '02',
        kicker: 'Creativo',
        title: <>Dirección<br /><span>creativa</span>.</>,
        body:
          'Dirección de arte, voz de marca e identidad visual para productos digitales y campañas. La capa de criterio que mantiene humano el sistema.',
        tools: ['Identidad', 'Voz', 'Dirección de arte'],
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
          'Traducir posicionamiento en los sistemas que lo transportan, para que la salida siga sonando a marca.',
        tools: ['Lujo', 'Posicionamiento', 'Sistemas'],
      },
      {
        number: '05',
        kicker: 'Generativo',
        title: <>Sistemas <span>visuales</span> generativos.</>,
        body:
          'Pipelines que producen variaciones visuales consistentes con campaña, manteniendo dirección de arte, luz y continuidad.',
        tools: ['n8n', 'Modelos de imagen', 'Style locks', 'Variación de assets'],
      },
      {
        number: '06',
        kicker: 'Fluidez',
        title: <>Enseñar<br />el <span>bucle</span>.</>,
        body:
          'Encontrar donde la IA ayuda de verdad, prototipar el flujo y formar al equipo en los usos que se quedan.',
        tools: ['Workshops', 'Adopción'],
      },
    ],
    ctaTitle: <>Hagamos que <span className="about-landing__serif">algo</span> funcione.</>,
    contactMeta: ['Disponible T3 2026', 'Madrid · Remoto · UE'],
  },
}

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
  // Equirectangular projection: x = (lon + 180) * 1000/360, y = (90 - lat) * 500/180
  // Málaga:  36.72°N, 4.42°W → (488, 148)
  // Madrid:  40.42°N, 3.70°W → (490, 138)
  // Orlando: 28.54°N, 81.38°W → (274, 171)
  const cities: [number, number][] = [
    [488, 148],
    [490, 138],
    [274, 171],
  ]

  return (
    <svg className="about-map" viewBox="0 0 1000 500" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="about-map-stip" patternUnits="userSpaceOnUse" width="6" height="6">
          <circle cx="1.5" cy="1.5" r="1" fill="rgba(240,236,226,.22)" />
        </pattern>
      </defs>
      <g className="about-map__land">
        {/* North America */}
        <path d="M 33,100 L 67,53 L 125,56 L 236,31 L 275,22 L 306,28 L 348,88 L 334,122 L 308,130 L 295,135 L 289,147 L 289,153 L 280,172 L 278,181 C 272,191 264,193 258,188 C 250,182 244,172 250,167 C 240,172 231,176 231,178 C 221,186 215,196 222,200 L 255,210 L 258,222 C 248,230 238,232 228,228 C 214,222 206,212 208,200 C 198,196 190,190 186,183 C 177,172 172,160 175,156 C 165,146 159,138 161,147 C 157,131 153,118 152,112 C 143,98 131,88 131,92 C 100,89 78,89 75,92 C 56,96 42,98 33,100 Z" />
        {/* Greenland */}
        <path d="M 328,25 C 345,18 365,18 382,25 C 403,35 418,53 414,70 C 408,86 390,92 370,86 C 350,78 333,63 326,48 Z" />
        {/* South America */}
        <path d="M 265,228 L 284,220 L 300,216 L 320,212 L 338,216 L 356,224 L 372,235 L 390,250 L 406,273 L 415,297 L 414,326 L 406,356 L 394,386 L 378,413 L 361,432 L 344,442 L 327,436 L 311,420 L 295,398 L 278,370 L 267,339 L 259,306 L 256,273 L 256,246 Z" />
        {/* Iceland */}
        <path d="M 428,70 L 435,64 L 444,62 L 452,66 L 452,75 L 444,80 L 435,80 Z" />
        {/* Britain */}
        <path d="M 476,108 L 472,100 L 472,90 L 477,85 L 485,84 L 493,88 L 496,98 L 494,108 L 488,114 Z" />
        <path d="M 460,116 L 458,108 L 463,103 L 469,104 L 472,113 L 468,119 Z" />
        {/* Scandinavia */}
        <path d="M 492,108 L 496,98 L 504,88 L 511,78 L 514,68 L 512,58 L 505,54 L 497,58 L 490,68 L 489,82 L 490,97 Z" />
        <path d="M 516,86 L 527,76 L 537,66 L 549,56 L 561,48 L 573,44 L 583,47 L 582,56 L 571,64 L 558,73 L 544,81 L 528,87 Z" />
        <path d="M 585,48 L 597,44 L 609,43 L 619,46 L 619,55 L 608,58 L 596,56 L 586,51 Z" />
        {/* Europe & Iberian Peninsula */}
        <path d="M 468,162 L 466,148 L 468,134 L 472,126 L 478,120 L 488,116 L 496,116 L 508,113 L 520,110 L 532,107 L 540,110 L 538,120 L 530,128 L 521,132 L 529,131 L 541,126 L 551,120 L 558,113 L 565,106 L 573,98 L 584,90 L 597,86 L 613,83 L 631,83 L 649,87 L 661,95 L 662,108 L 655,118 L 640,126 L 625,131 L 610,139 L 597,148 L 584,157 L 570,161 L 555,161 L 540,153 L 530,162 L 517,172 L 501,178 L 484,174 Z" />
        {/* Africa */}
        <path d="M 412,162 L 420,156 L 432,153 L 448,153 L 462,158 L 470,165 L 476,174 L 480,187 L 476,200 L 462,222 L 449,247 L 440,273 L 438,301 L 440,329 L 449,355 L 461,373 L 477,382 L 497,382 L 513,373 L 526,355 L 536,331 L 539,302 L 535,274 L 526,250 L 517,231 L 514,215 L 521,204 L 534,198 L 547,200 L 558,210 L 562,225 L 558,242 L 546,256 L 544,270 L 549,283 L 559,291 L 571,291 L 583,281 L 593,264 L 604,249 L 619,243 L 631,247 L 638,260 L 626,277 L 611,285 L 594,293 L 578,308 L 562,332 L 548,356 L 535,377 L 525,391 L 514,394 L 501,388 L 488,382 Z" />
        {/* Middle East / Arabia */}
        <path d="M 560,156 L 578,152 L 596,148 L 612,144 L 628,147 L 640,154 L 649,165 L 649,179 L 644,199 L 633,217 L 622,227 L 610,231 L 598,227 L 588,216 L 577,204 L 566,191 L 561,176 Z" />
        {/* Indian subcontinent */}
        <path d="M 656,158 L 672,154 L 690,151 L 706,151 L 720,158 L 729,169 L 731,183 L 725,205 L 714,225 L 703,243 L 693,261 L 687,274 L 683,275 L 679,267 L 674,250 L 667,231 L 659,212 L 654,192 L 652,174 Z" />
        {/* Asia — Russia / China */}
        <path d="M 560,90 L 584,85 L 612,80 L 645,76 L 680,72 L 716,68 L 750,64 L 784,62 L 818,62 L 850,65 L 880,70 L 907,76 L 930,83 L 950,91 L 960,103 L 953,116 L 938,126 L 918,135 L 900,143 L 882,149 L 868,159 L 857,173 L 857,189 L 863,203 L 870,216 L 873,231 L 866,243 L 853,253 L 836,259 L 818,261 L 803,256 L 790,248 L 780,234 L 773,219 L 763,208 L 750,200 L 736,195 L 720,192 L 706,189 L 692,185 L 680,179 L 668,173 L 657,163 L 644,156 L 627,149 L 610,146 L 595,149 L 578,153 L 560,157 L 553,150 L 550,141 L 553,132 L 559,125 L 561,115 L 560,103 Z" />
        {/* SE Asia peninsula */}
        <path d="M 778,234 L 793,227 L 808,222 L 823,218 L 833,211 L 836,201 L 830,191 L 819,186 L 807,185 L 795,189 L 785,199 L 777,212 Z" />
        <path d="M 806,259 L 819,269 L 829,282 L 833,295 L 830,307 L 820,313 L 809,309 L 800,296 L 798,280 L 800,266 Z" />
        {/* Japan */}
        <path d="M 881,126 L 888,119 L 896,117 L 905,120 L 907,130 L 904,140 L 895,144 L 886,139 Z" />
        <path d="M 896,116 L 901,109 L 909,105 L 917,108 L 919,116 L 915,124 L 906,126 Z" />
        {/* Australia */}
        <path d="M 808,303 L 826,297 L 847,292 L 869,293 L 889,301 L 905,313 L 916,330 L 920,350 L 917,370 L 908,388 L 896,403 L 879,413 L 858,414 L 838,409 L 818,401 L 800,387 L 788,369 L 781,348 L 780,328 L 784,312 L 795,303 Z" />
      </g>
      <g className="about-map__cities">
        {/* Trail: Málaga ↔ Madrid (short, within Spain) */}
        <path className="about-map__trail" d="M 490,138 L 488,148" />
        {/* Trail: Spain → Orlando (Atlantic crossing) */}
        <path className="about-map__trail" d="M 489,143 Q 382,178 274,171" />
        {cities.map(([cx, cy], index) => (
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
  const doubledMarquee = useMemo(() => [...copy.marquee, ...copy.marquee], [copy.marquee])

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="about-landing" role="main">
        <div ref={progressRef} className="about-landing__progress" aria-hidden="true" />

        <div ref={hintRef} className="about-landing__scroll-hint" aria-hidden="true">
          <span />
          {locale === 'es' ? 'Scroll' : 'Scroll'}
        </div>

        <section className="about-landing__hero" id="top" aria-labelledby="about-landing-title">
        <div className="about-landing__container">
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

      <section className=”about-contact-panel” id="about-contact" aria-labelledby="about-contact-title">
        <div className="about-landing__container">
          <div className="about-contact-panel__cta">
            <h2 id="about-contact-title" data-about-reveal>{copy.ctaTitle}</h2>
            <div data-about-reveal>
              <p>{copy.contactMeta[0]}</p>
              <a href="mailto:raulmermans@gmail.com">raulmermans@gmail.com →</a>
              <span>{copy.contactMeta[1]}</span>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
