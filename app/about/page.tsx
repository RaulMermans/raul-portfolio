'use client'

import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_MAILTO } from '@/lib/contact'
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
    heroTag: 'I build the systems behind creative work.',
    heroSupport:
      'I started in marketing and brand, moved through CRM, luxury retail, and visual practice, and now build AI-assisted tools that help teams make better decisions without losing taste, context, or control.',
    current: ['Base', 'Madrid', 'Origin', 'Málaga', 'IE University · BBA Marketing'],
    proof: [
      {
        number: '01',
        title: 'CRM at scale',
        body: 'Lifecycle and CRM work around an 8M+ user database, commercial campaigns, segmentation, and adoption inside a large beauty retailer.',
      },
      {
        number: '02',
        title: 'Systems that ship',
        body: 'Portfolio projects built as working prototypes: Campaign Pulse, DemandOS, Campaign Sandbox, DataBrief AI, Website Audit Agent.',
      },
      {
        number: '03',
        title: 'Taste as interface',
        body: 'Photography, visual studies, luxury references, and brand systems used as the judgment layer around technical tools.',
      },
    ],
    aboutEyebrow: 'About',
    aboutTitle: <>A profile built from <span className="about-landing__serif">work</span>, place, and practice.</>,
    lede:
      'The common thread is operational taste: knowing what should be structured, what should stay editable, and where a person still needs to make the call.',
    body: [
      'Málaga is the origin point; Madrid is where the practice became sharper through IE University, marketing, CRM, and work inside commercial teams.',
      'Orlando added another way of reading service, behavior, and expectation. Primor adds the pressure of scale: lifecycle work, segmentation, luxury partners, and internal adoption around a very large customer database.',
      'The portfolio is the proof layer. Campaign tools, data products, audits, brand worlds, and visual studies are built as working surfaces so the thinking can be tested, not just described.',
    ],
    operatingProfile: {
      title: 'Operating profile',
      items: [
        ['Base', 'Madrid'],
        ['Origin', 'Málaga'],
        ['Education', 'BBA Marketing, IE University'],
        ['Current context', 'CRM, lifecycle, luxury partners, AI adoption'],
        ['Independent work', 'Campaign tools, data products, brand workflows, internal systems'],
        ['Visual practice', 'Photography, album covers, image systems, art direction'],
        ['Tools', 'Next.js, TypeScript, Python, n8n, Codex, Claude Code, OpenAI workflows'],
      ],
    },
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
        title: 'Personal systems',
        body: 'Campaign tools, data products, audits, and experiments built as working prototypes.',
      },
      {
        kicker: 'Apps',
        href: '/apps',
        image: '/images/sections/apps-bg-v2.webp',
        title: 'Small tools',
        body: 'Interfaces that make a narrow job easier, clearer, or more interesting.',
      },
      {
        kicker: 'Visuals',
        href: '/visuals',
        image: '/images/visuals/album-covers/Astralis_Cover.webp',
        title: 'Art direction & image',
        body: 'Album covers, poster concepts, and generative experiments.',
      },
      {
        kicker: 'Photography',
        href: '/photography',
        image: '/images/photography/street/Street6.webp',
        title: 'From the archive',
        body: 'Street, light, and visual judgment as a quieter creative practice.',
      },
    ],
    vocabulary: {
      title: 'Working vocabulary',
      terms: [
        'CRM',
        'Lifecycle',
        'Campaign logic',
        'Brand memory',
        'Interface rhythm',
        'Data boundaries',
        'Human review',
        'Luxury codes',
        'Adoption',
        'Operational taste',
      ],
    },
    timelineTitle: <>Chapters, not <span className="about-landing__serif">job titles</span>.</>,
    timelineIntro:
      'A compact read of the contexts that shaped the work: markets, delivery, service, building, scale, and the current loop.',
    timeline: [
      {
        date: '01',
        title: 'Madrid — learning the language of markets',
        org: 'IE University · BBA Marketing',
        desc:
          'Business, marketing, digital analytics, and the first technical vocabulary for turning customer behavior into decisions.',
        tags: ['Madrid', 'IE University', 'Marketing'],
      },
      {
        date: '02',
        title: 'Teams — learning delivery',
        org: 'IE Marketing Lab',
        desc:
          'Project work with deadlines, partners, and team handoffs: strategy only counted when it became something delivered.',
        tags: ['Leadership', 'Strategy', 'Delivery'],
      },
      {
        date: '03',
        title: 'Orlando — seeing service differently',
        org: 'UCF exchange',
        desc:
          'A semester at the University of Central Florida sharpened the read on service, retail behavior, and cultural expectations.',
        tags: ['Orlando', 'UCF', 'Service'],
      },
      {
        date: '04',
        title: 'Independent practice — learning to build',
        org: 'Portfolio systems',
        desc:
          'Campaign tools, data products, image systems, and site architecture turned positioning into usable interfaces.',
        tags: ['Prototypes', 'Case studies', 'Visuals'],
      },
      {
        date: '05',
        title: 'Primor — working inside scale',
        org: 'CRM · lifecycle · luxury partners',
        desc:
          'Large audiences, commercial cadence, segmentation, partner expectations, and internal AI adoption make the work accountable.',
        tags: ['CRM', 'Lifecycle', 'Scale'],
      },
      {
        date: '06',
        title: 'Now — building the loop',
        org: 'Tools · brand workflows · visual practice',
        desc:
          'Building the loop between workflow logic, interface design, brand memory, data boundaries, and human review.',
        tags: ['Systems', 'Interface', 'Taste'],
      },
    ] satisfies TimelineItem[],
    practiceTitle: <>How I <span className="about-landing__serif">work</span>.</>,
    practiceIntro:
      'The work starts with the decision and ends with a surface people can review, use, and improve.',
    capabilities: [
      {
        number: '01',
        kicker: 'Decision',
        title: <>Start with the <span>decision</span>.</>,
        body:
          'What does the user need to understand, choose, approve, or repeat?',
        tools: ['Question', 'Context', 'Criteria'],
        featured: true,
      },
      {
        number: '02',
        kicker: 'Workflow',
        title: <>Map the <span>workflow</span>.</>,
        body:
          'Inputs, constraints, handoffs, review points, risks, and outputs.',
        tools: ['Inputs', 'Handoffs', 'Risks'],
      },
      {
        number: '03',
        kicker: 'Interface',
        title: <>Build the <span>interface</span>.</>,
        body:
          'Prototype the surface where the work becomes visible and usable.',
        tools: ['Surface', 'States', 'Feedback'],
      },
      {
        number: '04',
        kicker: 'Intelligence',
        title: <>Add intelligence <span>carefully</span>.</>,
        body:
          'Use AI or ML where it improves speed, synthesis, or diagnosis — not where it removes accountability.',
        tools: ['AI', 'ML', 'Review'],
      },
      {
        number: '05',
        kicker: 'Taste',
        title: <>Keep taste in the <span>loop</span>.</>,
        body:
          'Brand voice, image logic, pacing, and visual judgment remain part of the system.',
        tools: ['Voice', 'Image logic', 'Pacing'],
      },
    ],
    proofLinksTitle: 'Proof in the work',
    proofLinks: [
      ['Campaign Pulse', 'Marketing intelligence', '/case-studies/campaign-pulse'],
      ['DemandOS', 'Operational intelligence', '/case-studies/demandos'],
      ['Campaign Sandbox', 'Campaign strategy', '/case-studies/campaign-sandbox'],
      ['Remoria', 'Brand world', '/case-studies/remoria'],
      ['AI Sports', 'Controlled visual production', '/case-studies/ai-sports'],
    ],
    ctaTitle: <>Let&apos;s make <span className="about-landing__serif">something</span> work.</>,
    contactMeta: ['Available Q3 2026', 'Madrid · Remote · EU'],
    githubCta: 'View GitHub',
  },
  es: {
    heroTag: 'Construyo los sistemas detrás del trabajo creativo.',
    heroSupport:
      'Empecé desde marketing y marca, pasé por CRM, retail beauty, lujo y práctica visual, y ahora construyo herramientas asistidas por IA que ayudan a equipos a decidir mejor sin perder gusto, contexto ni control.',
    current: ['Base', 'Madrid', 'Origen', 'Málaga', 'IE University · BBA Marketing'],
    proof: [
      {
        number: '01',
        title: 'CRM a escala',
        body: 'Trabajo de lifecycle y CRM alrededor de una base de 8M+ usuarios, campañas comerciales, segmentación y adopción interna en retail beauty.',
      },
      {
        number: '02',
        title: 'Sistemas que se publican',
        body: 'Proyectos construidos como prototipos funcionales: Campaign Pulse, DemandOS, Campaign Sandbox, DataBrief AI, Website Audit Agent.',
      },
      {
        number: '03',
        title: 'El gusto como interfaz',
        body: 'Fotografía, estudios visuales, referencias de lujo y sistemas de marca como capa de criterio alrededor de herramientas técnicas.',
      },
    ],
    aboutEyebrow: 'Sobre mí',
    aboutTitle: <>Un perfil hecho de <span className="about-landing__serif">trabajo</span>, lugar y práctica.</>,
    lede:
      'El hilo común es el gusto operativo: saber qué debe estructurarse, qué debe seguir editable y dónde una persona todavía tiene que decidir.',
    body: [
      'Málaga es el punto de origen; Madrid es donde la práctica se afinó con IE University, marketing, CRM y trabajo dentro de equipos comerciales.',
      'Orlando añadió otra forma de leer servicio, comportamiento y expectativa. Primor añade la presión de escala: lifecycle, segmentación, partners de lujo y adopción interna alrededor de una base de clientes muy grande.',
      'El portfolio es la capa de prueba. Herramientas de campaña, productos de datos, auditorías, mundos de marca y estudios visuales se construyen como superficies funcionales para poder probar el pensamiento, no solo describirlo.',
    ],
    operatingProfile: {
      title: 'Perfil operativo',
      items: [
        ['Base', 'Madrid'],
        ['Origen', 'Málaga'],
        ['Formación', 'BBA Marketing, IE University'],
        ['Contexto actual', 'CRM, lifecycle, partners de lujo, adopción IA'],
        ['Trabajo independiente', 'Herramientas de campaña, productos de datos, workflows de marca, sistemas internos'],
        ['Práctica visual', 'Fotografía, portadas, sistemas de imagen, dirección de arte'],
        ['Herramientas', 'Next.js, TypeScript, Python, n8n, Codex, Claude Code, workflows OpenAI'],
      ],
    },
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
        title: 'Sistemas propios',
        body: 'Herramientas de campaña, productos de datos, auditorías y experimentos construidos como prototipos funcionales.',
      },
      {
        kicker: 'Apps',
        href: '/apps',
        image: '/images/sections/apps-bg-v2.webp',
        title: 'Herramientas pequeñas',
        body: 'Interfaces que hacen una tarea concreta más fácil, más clara o más interesante.',
      },
      {
        kicker: 'Visuales',
        href: '/visuals',
        image: '/images/visuals/album-covers/Astralis_Cover.webp',
        title: 'Dirección de arte',
        body: 'Portadas, conceptos de póster y experimentos generativos.',
      },
      {
        kicker: 'Fotografía',
        href: '/photography',
        image: '/images/photography/street/Street6.webp',
        title: 'Desde el archivo',
        body: 'Calle, luz y criterio visual como una práctica creativa más silenciosa.',
      },
    ],
    vocabulary: {
      title: 'Vocabulario de trabajo',
      terms: [
        'CRM',
        'Lifecycle',
        'Lógica de campaña',
        'Memoria de marca',
        'Ritmo de interfaz',
        'Límites de datos',
        'Revisión humana',
        'Códigos de lujo',
        'Adopción',
        'Gusto operativo',
      ],
    },
    timelineTitle: <>Capítulos, no solo <span className="about-landing__serif">cargos</span>.</>,
    timelineIntro:
      'Una lectura compacta de los contextos que han dado forma al trabajo: mercados, entrega, servicio, construcción, escala y el loop actual.',
    timeline: [
      {
        date: '01',
        title: 'Madrid — aprender el lenguaje de los mercados',
        org: 'IE University · BBA Marketing',
        desc:
          'Negocio, marketing, analítica digital y el primer vocabulario técnico para convertir comportamiento de cliente en decisiones.',
        tags: ['Madrid', 'IE University', 'Marketing'],
      },
      {
        date: '02',
        title: 'Equipos — aprender a entregar',
        org: 'IE Marketing Lab',
        desc:
          'Trabajo de proyecto con deadlines, partners y handoffs de equipo: la estrategia solo contaba cuando se convertía en algo entregado.',
        tags: ['Liderazgo', 'Estrategia', 'Entrega'],
      },
      {
        date: '03',
        title: 'Orlando — mirar el servicio desde otro ángulo',
        org: 'Intercambio UCF',
        desc:
          'Un semestre en University of Central Florida afinó la lectura de servicio, retail y expectativas culturales.',
        tags: ['Orlando', 'UCF', 'Servicio'],
      },
      {
        date: '04',
        title: 'Práctica independiente — aprender a construir',
        org: 'Sistemas de portfolio',
        desc:
          'Herramientas de campaña, productos de datos, sistemas de imagen y arquitectura web convirtieron posicionamiento en interfaces usables.',
        tags: ['Prototipos', 'Casos', 'Visuales'],
      },
      {
        date: '05',
        title: 'Primor — trabajar dentro de escala',
        org: 'CRM · lifecycle · partners de lujo',
        desc:
          'Grandes audiencias, ritmo comercial, segmentación, expectativas de partners y adopción interna hacen que el trabajo sea responsable.',
        tags: ['CRM', 'Lifecycle', 'Escala'],
      },
      {
        date: '06',
        title: 'Ahora — construir el loop',
        org: 'Herramientas · workflows de marca · práctica visual',
        desc:
          'Construir el loop entre lógica de workflow, diseño de interfaz, memoria de marca, límites de datos y revisión humana.',
        tags: ['Sistemas', 'Interfaz', 'Gusto'],
      },
    ] satisfies TimelineItem[],
    practiceTitle: <>Cómo <span className="about-landing__serif">trabajo</span>.</>,
    practiceIntro:
      'El trabajo empieza por la decisión y termina en una superficie que se puede revisar, usar y mejorar.',
    capabilities: [
      {
        number: '01',
        kicker: 'Decisión',
        title: <>Empezar por la <span>decisión</span>.</>,
        body:
          'Qué necesita entender, elegir, aprobar o repetir la persona que usa el sistema.',
        tools: ['Pregunta', 'Contexto', 'Criterio'],
        featured: true,
      },
      {
        number: '02',
        kicker: 'Workflow',
        title: <>Mapear el <span>workflow</span>.</>,
        body:
          'Inputs, restricciones, handoffs, puntos de revisión, riesgos y outputs.',
        tools: ['Inputs', 'Handoffs', 'Riesgos'],
      },
      {
        number: '03',
        kicker: 'Interfaz',
        title: <>Construir la <span>interfaz</span>.</>,
        body:
          'Prototipar la superficie donde el trabajo se vuelve visible y usable.',
        tools: ['Superficie', 'Estados', 'Feedback'],
      },
      {
        number: '04',
        kicker: 'Inteligencia',
        title: <>Añadir inteligencia con <span>cuidado</span>.</>,
        body:
          'Usar IA o ML cuando mejora velocidad, síntesis o diagnóstico — no cuando elimina responsabilidad.',
        tools: ['IA', 'ML', 'Revisión'],
      },
      {
        number: '05',
        kicker: 'Gusto',
        title: <>Mantener el gusto dentro del <span>sistema</span>.</>,
        body:
          'Voz de marca, lógica visual, ritmo y criterio siguen siendo parte del sistema.',
        tools: ['Voz', 'Imagen', 'Ritmo'],
      },
    ],
    proofLinksTitle: 'Prueba en el trabajo',
    proofLinks: [
      ['Campaign Pulse', 'Inteligencia de marketing', '/case-studies/campaign-pulse'],
      ['DemandOS', 'Inteligencia operativa', '/case-studies/demandos'],
      ['Campaign Sandbox', 'Estrategia de campaña', '/case-studies/campaign-sandbox'],
      ['Remoria', 'Mundo de marca', '/case-studies/remoria'],
      ['AI Sports', 'Producción visual controlada', '/case-studies/ai-sports'],
    ],
    ctaTitle: <>Hagamos que <span className="about-landing__serif">algo</span> funcione.</>,
    contactMeta: ['Disponible T3 2026', 'Madrid · Remoto · UE'],
    githubCta: 'Ver GitHub',
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
            </figure>
          </div>

          <div className="about-landing__tag" data-about-reveal>
            <div className="about-landing__hero-copy">
              <p>{copy.heroTag}</p>
              <p>{copy.heroSupport}</p>
            </div>
            <div className="about-landing__hero-meta">
              {copy.current[0]}
              <b>{copy.current[1]}</b>
              {copy.current[2]}
              <b>{copy.current[3]}</b>
              {copy.current[4]}
            </div>
          </div>

          <div
            className="about-landing__proof"
            aria-label={locale === 'es' ? 'Resumen de práctica' : 'Practice summary'}
            data-about-reveal
          >
            {copy.proof.map((item) => (
              <article className="about-landing__proof-card" key={item.number}>
                <span>{item.number}</span>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </article>
            ))}
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
              <article className="about-operating-profile" data-about-reveal>
                <h3>{copy.operatingProfile.title}</h3>
                <ul>
                  {copy.operatingProfile.items.map(([label, value]) => (
                    <li key={label}>
                      <span>{label}</span>
                      <b>{value}</b>
                    </li>
                  ))}
                </ul>
              </article>
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

      <section className="about-vocabulary" aria-labelledby="about-vocabulary-title">
        <div className="about-landing__container">
          <p id="about-vocabulary-title" className="about-landing__eyebrow" data-about-reveal>
            {copy.vocabulary.title}
          </p>
          <div className="about-vocabulary__terms" data-about-reveal>
            {copy.vocabulary.terms.map((term, index) => (
              <span key={term}>
                <i>{String(index + 1).padStart(2, '0')}</i>
                {term}
              </span>
            ))}
          </div>
        </div>
      </section>

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

      <section className="about-proof-links" aria-labelledby="about-proof-links-title">
        <div className="about-landing__container">
          <div className="about-proof-links__head">
            <p className="about-landing__eyebrow" data-about-reveal>
              {locale === 'es' ? 'Casos' : 'Case studies'}
            </p>
            <h2 id="about-proof-links-title" data-about-reveal>
              {copy.proofLinksTitle}
            </h2>
          </div>
          <div className="about-proof-links__grid" data-about-reveal>
            {copy.proofLinks.map(([title, label, href]) => (
              <Link href={localizePath(href, locale)} key={title}>
                <span>{title}</span>
                <b>{label}</b>
              </Link>
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
              <a href={PUBLIC_CONTACT_MAILTO}>{PUBLIC_CONTACT_EMAIL} →</a>
              <a href="https://github.com/RaulMermans" target="_blank" rel="noopener noreferrer">{copy.githubCta} ↗</a>
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
