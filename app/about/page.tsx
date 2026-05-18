'use client'

import { useEffect, useMemo, useRef } from 'react'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'

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
    work: [
      {
        kicker: 'Case Studies',
        href: '/case-studies',
        image: '/images/case-studies/case-studies-thumbnail.webp',
        title: 'Brand, product & AI',
        body: 'Brand systems, product design, and AI-powered tools built for real teams.',
      },
      {
        kicker: 'Photography',
        href: '/photography',
        image: '/images/photography/street/Street6.webp',
        title: 'From the archive',
        body: 'Street, light, and the small accidents that make a city feel usable.',
      },
      {
        kicker: 'Apps',
        href: '/apps',
        image: '/images/sections/apps-bg-v2.webp',
        title: 'Tools worth using',
        body: 'Lightweight apps and internal tools built with AI-assisted development.',
      },
      {
        kicker: 'Visuals',
        href: '/visuals',
        image: '/images/visuals/album-covers/Astralis_Cover.webp',
        title: 'Art direction & image',
        body: 'Album covers, poster concepts, and generative experiments.',
      },
    ],
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
    work: [
      {
        kicker: 'Proyectos',
        href: '/case-studies',
        image: '/images/case-studies/case-studies-thumbnail.webp',
        title: 'Marca, producto & IA',
        body: 'Sistemas de marca, diseño de producto y herramientas con IA para equipos reales.',
      },
      {
        kicker: 'Fotografía',
        href: '/photography',
        image: '/images/photography/street/Street6.webp',
        title: 'Del archivo',
        body: 'Calle, luz y esos pequeños accidentes que hacen útil una ciudad.',
      },
      {
        kicker: 'Apps',
        href: '/apps',
        image: '/images/sections/apps-bg-v2.webp',
        title: 'Herramientas que valen',
        body: 'Apps ligeras y herramientas internas construidas con desarrollo asistido por IA.',
      },
      {
        kicker: 'Visuales',
        href: '/visuals',
        image: '/images/visuals/album-covers/Astralis_Cover.webp',
        title: 'Dirección de arte',
        body: 'Portadas, conceptos de póster y experimentos generativos.',
      },
    ],
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

const MAP_CITIES: { coords: [number, number]; delay: number }[] = [
  { coords: [-4.42, 36.72], delay: 0 },
  { coords: [-3.7, 40.42], delay: 0.55 },
  { coords: [-81.38, 28.54], delay: 1.1 },
]

function MapGraphic() {
  return (
    <ComposableMap
      className="about-map"
      projection="geoNaturalEarth1"
      projectionConfig={{ scale: 153 }}
      width={800}
      height={400}
      aria-hidden="true"
    >
      <defs>
        <pattern id="about-map-stip" patternUnits="userSpaceOnUse" width="5" height="5">
          <circle cx="1" cy="1" r="0.9" fill="rgba(240,236,226,.22)" />
        </pattern>
      </defs>
      <Geographies geography="/world-110m.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                default: {
                  fill: 'url(#about-map-stip)',
                  stroke: 'rgba(240,236,226,0.18)',
                  strokeWidth: 0.5,
                  outline: 'none',
                },
                hover: {
                  fill: 'url(#about-map-stip)',
                  stroke: 'rgba(240,236,226,0.18)',
                  strokeWidth: 0.5,
                  outline: 'none',
                },
                pressed: {
                  fill: 'url(#about-map-stip)',
                  stroke: 'rgba(240,236,226,0.18)',
                  strokeWidth: 0.5,
                  outline: 'none',
                },
              }}
            />
          ))
        }
      </Geographies>
      {/* Trail: Málaga → Madrid */}
      <Line
        from={[-4.42, 36.72]}
        to={[-3.7, 40.42]}
        className="about-map__trail"
      />
      {/* Trail: Spain → Orlando */}
      <Line
        from={[-4.06, 38.57]}
        to={[-81.38, 28.54]}
        className="about-map__trail"
      />
      {MAP_CITIES.map(({ coords, delay }) => (
        <Marker key={coords.join(',')} coordinates={coords}>
          <circle
            r="16"
            className="about-map__halo"
            style={{ '--ping-delay': `${delay}s` } as CSSProperties}
          />
          <circle r="4" className="about-map__pin" />
        </Marker>
      ))}
    </ComposableMap>
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

            {copy.work.map((item) => (
              <Link
                href={localizePath(item.href, locale)}
                className="about-note about-note--work"
                key={item.kicker}
              >
                <div className="about-note__head">
                  <span>{item.kicker}</span>
                  <span className="about-note__marker" aria-hidden="true" />
                </div>
                <div className="about-note__image">
                  <Image src={item.image} alt="" fill sizes="(max-width: 900px) 100vw, 280px" />
                </div>
                <div className="about-note__meta">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </Link>
            ))}
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

      <section className="about-contact-panel" id="about-contact" aria-labelledby="about-contact-title">
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
