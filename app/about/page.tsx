'use client'

import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_MAILTO } from '@/lib/contact'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'

type LocaleKey = 'en' | 'es'

type Chapter = {
  date: string
  marker: string
  title: string
  location: string
  body: string
  tags: string[]
}

const pageCopy = {
  en: {
    heroEyebrow: 'Raúl Mermans / Operating portrait',
    heroTitle: 'I build the systems behind creative work.',
    heroLede:
      'I started in marketing and brand, moved through CRM, luxury retail, and visual practice, and now build AI-assisted tools that help teams make better decisions without losing taste, context, or control.',
    portraitAlt: 'Portrait of Raúl Mermans',
    scroll: 'Scroll',
    heroMeta: [
      'Based in Madrid',
      'From Málaga',
      'Marketing · CRM · AI systems',
      '5 languages',
      'Building internal tools and creative workflows',
    ],
    portraitLabels: ['CRM', 'Brand systems', 'Retail', 'AI tools', 'Visual practice', 'Madrid', 'Luxury partners', '8M+ users'],
    proofLabel: 'Grounded proof points',
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
    profileTitle: 'Operating profile',
    profileIntro:
      'A compact read on the contexts, tools, and constraints that shape the work.',
    profile: [
      ['Base', 'Madrid'],
      ['Origin', 'Málaga'],
      ['Education', 'BBA Marketing, IE University'],
      ['Current context', 'CRM, lifecycle, luxury partners, AI adoption'],
      ['Independent work', 'AI systems, campaign tools, data products, brand workflows'],
      ['Visual practice', 'Photography, album covers, image systems, art direction'],
      ['Tools', 'Next.js, TypeScript, Python, n8n, Codex, Claude Code, OpenAI workflows'],
    ],
    focusTitle: 'Current focus',
    focusBody:
      'I am interested in the layer between strategy and execution: the tools, rules, interfaces, and workflows that make good judgment repeatable.',
    focusItems: [
      'CRM intelligence and lifecycle systems',
      'AI workflow adoption inside creative and marketing teams',
      'Campaign and brand infrastructure',
      'Internal tools that turn scattered inputs into decisions',
    ],
    vocabularyTitle: 'Working vocabulary',
    vocabularyIntro: 'Fewer terms. More useful precision.',
    vocabulary: [
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
    chaptersTitle: 'Chapters, not job titles.',
    chaptersIntro:
      'The path is less a ladder than a set of contexts: business school, project rooms, service culture, prototypes, retail scale, and the loop I am building now.',
    chapters: [
      {
        date: '2021-2025',
        marker: '01',
        title: 'Madrid - learning the language of markets',
        location: 'IE University',
        body: 'Marketing, customer behavior, business-driven technology, and digital analytics gave the work its commercial vocabulary.',
        tags: ['Madrid', 'BBA Marketing', 'IE'],
      },
      {
        date: '2023',
        marker: '02',
        title: 'Teams - learning delivery',
        location: 'IE Marketing Lab',
        body: 'Project leadership, partner-company deadlines, and the pressure of turning strategy into something a team can present.',
        tags: ['Leadership', 'Partners', 'Delivery'],
      },
      {
        date: '2024',
        marker: '03',
        title: 'Orlando - seeing service differently',
        location: 'University of Central Florida',
        body: 'A UCF exchange sharpened the service lens: tone, expectation, speed, and cultural contrast in how people read experiences.',
        tags: ['UCF', 'Service lens', 'Culture'],
      },
      {
        date: '2025',
        marker: '04',
        title: 'Independent practice - learning to build',
        location: 'Madrid',
        body: 'AI-assisted tools, Codex, Claude Code, n8n, and internal workflows became a way to prototype the operating layer, not just describe it.',
        tags: ['Codex', 'n8n', 'Prototypes'],
      },
      {
        date: '2025',
        marker: '05',
        title: 'Primor - working inside scale',
        location: 'Perfumerias Primor',
        body: 'CRM, lifecycle execution, an 8M+ user database, luxury partners, and internal AI adoption make the constraints real.',
        tags: ['CRM', '8M+ users', 'Retail'],
      },
      {
        date: 'Now',
        marker: '06',
        title: 'Now - building the loop',
        location: 'Systems behind the work',
        body: 'Campaign systems, decision interfaces, AI workflows, and brand infrastructure that help good judgment travel further.',
        tags: ['Campaigns', 'Interfaces', 'Brand rules'],
      },
    ] satisfies Chapter[],
    originsTitle: 'Where the work comes from',
    originsIntro:
      'The page is digital, but the references are physical: southern light, Madrid retail pace, Orlando service culture, and language as a design constraint.',
    cities: [
      {
        city: 'Málaga',
        coord: '36.7N · 4.4W',
        label: 'Visual instinct, light, origin',
        body: 'A sense for contrast, image, street rhythm, and the first layer of taste.',
      },
      {
        city: 'Madrid',
        coord: '40.4N · 3.7W',
        label: 'Brand, CRM, retail, execution',
        body: 'The operating base: university, client work, Primor, and the pace of building useful things.',
      },
      {
        city: 'Orlando',
        coord: '28.5N · 81.4W',
        label: 'Service lens, cultural contrast',
        body: 'A different read on service marketing, expectation, and how environments shape behavior.',
      },
    ],
    languagesTitle: 'Languages',
    languages: ['Spanish', 'English', 'Dutch', 'German', 'Italian'],
    processTitle: 'How I work',
    processIntro:
      'A practical design process for turning unclear inputs into usable decisions.',
    process: [
      {
        number: '01',
        title: 'Start with the decision',
        body: 'What does the user need to understand, choose, approve, or repeat?',
      },
      {
        number: '02',
        title: 'Map the workflow',
        body: 'Inputs, constraints, handoffs, review points, risks, and outputs.',
      },
      {
        number: '03',
        title: 'Build the interface',
        body: 'Prototype the surface where the work becomes visible and usable.',
      },
      {
        number: '04',
        title: 'Add intelligence carefully',
        body: 'Use AI or ML where it improves speed, synthesis, or diagnosis - not where it removes accountability.',
      },
      {
        number: '05',
        title: 'Keep taste in the loop',
        body: 'Brand voice, image logic, pacing, and visual judgment remain part of the system.',
      },
    ],
    workTitle: 'Proof in the work',
    workIntro: 'A short route into the projects that make the operating portrait concrete.',
    work: [
      {
        title: 'Campaign Pulse',
        subtitle: 'Marketing intelligence',
        body: 'A local-first command center for newsletter performance, audience pressure, targets, and monthly reporting.',
        href: '/case-studies/campaign-pulse',
      },
      {
        title: 'DemandOS',
        subtitle: 'Operational intelligence',
        body: 'A deterministic ML prototype for demand forecasts, stockout-risk signals, and reorder recommendations.',
        href: '/case-studies/demandos',
      },
      {
        title: 'Campaign Sandbox',
        subtitle: 'Campaign strategy',
        body: 'A bounded workspace that turns campaign briefs into routes, simulations, reviews, and strategy reports.',
        href: '/case-studies/campaign-sandbox',
      },
      {
        title: 'Remoria',
        subtitle: 'Brand world',
        body: 'A luxury fragrance identity with product stories, packaging logic, and reusable brand rules.',
        href: '/case-studies/remoria',
      },
      {
        title: 'AI Sports',
        subtitle: 'Controlled visual production',
        body: 'A campaign workflow for visual iteration without losing art direction, continuity, or brand control.',
        href: '/case-studies/ai-sports',
      },
    ],
    ctaTitle: 'Let us make something work.',
    contactMeta: ['Available Q3 2026', 'Madrid · Remote · EU'],
    githubCta: 'View GitHub',
  },
  es: {
    heroEyebrow: 'Raúl Mermans / Perfil operativo',
    heroTitle: 'Construyo los sistemas detrás del trabajo creativo.',
    heroLede:
      'Empecé desde marketing y marca, pasé por CRM, retail beauty, lujo y práctica visual, y ahora construyo herramientas asistidas por IA que ayudan a equipos a decidir mejor sin perder gusto, contexto ni control.',
    portraitAlt: 'Retrato de Raúl Mermans',
    scroll: 'Scroll',
    heroMeta: [
      'Madrid',
      'Málaga',
      'Marketing · CRM · sistemas IA',
      '5 idiomas',
      'Herramientas internas y workflows creativos',
    ],
    portraitLabels: ['CRM', 'Sistemas de marca', 'Retail', 'Herramientas IA', 'Práctica visual', 'Madrid', 'Partners de lujo', '8M+ usuarios'],
    proofLabel: 'Pruebas concretas',
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
    profileTitle: 'Perfil operativo',
    profileIntro:
      'Una lectura compacta de los contextos, herramientas y restricciones que dan forma al trabajo.',
    profile: [
      ['Base', 'Madrid'],
      ['Origen', 'Málaga'],
      ['Formación', 'BBA Marketing, IE University'],
      ['Contexto actual', 'CRM, lifecycle, partners de lujo, adopción IA'],
      ['Trabajo independiente', 'Sistemas IA, herramientas de campaña, productos de datos, workflows de marca'],
      ['Práctica visual', 'Fotografía, portadas, sistemas de imagen, dirección de arte'],
      ['Herramientas', 'Next.js, TypeScript, Python, n8n, Codex, Claude Code, workflows OpenAI'],
    ],
    focusTitle: 'Foco actual',
    focusBody:
      'Me interesa la capa entre estrategia y ejecución: las herramientas, reglas, interfaces y workflows que hacen repetible el buen criterio.',
    focusItems: [
      'Inteligencia CRM y sistemas de lifecycle',
      'Adopción de IA dentro de equipos creativos y de marketing',
      'Infraestructura de campaña y marca',
      'Herramientas internas que convierten inputs dispersos en decisiones',
    ],
    vocabularyTitle: 'Vocabulario de trabajo',
    vocabularyIntro: 'Menos términos. Más precisión útil.',
    vocabulary: [
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
    chaptersTitle: 'Capítulos, no solo cargos.',
    chaptersIntro:
      'La trayectoria se lee mejor como una serie de contextos: universidad, equipos, servicio, prototipos, escala retail y el bucle que estoy construyendo ahora.',
    chapters: [
      {
        date: '2021-2025',
        marker: '01',
        title: 'Madrid - aprender el lenguaje de los mercados',
        location: 'IE University',
        body: 'Marketing, comportamiento de cliente, tecnología aplicada a negocio y analítica digital dieron vocabulario comercial al trabajo.',
        tags: ['Madrid', 'BBA Marketing', 'IE'],
      },
      {
        date: '2023',
        marker: '02',
        title: 'Equipos - aprender entrega',
        location: 'IE Marketing Lab',
        body: 'Liderazgo de proyecto, deadlines con empresas colaboradoras y la presión de convertir estrategia en algo que un equipo puede presentar.',
        tags: ['Liderazgo', 'Partners', 'Entrega'],
      },
      {
        date: '2024',
        marker: '03',
        title: 'Orlando - mirar el servicio de otra forma',
        location: 'University of Central Florida',
        body: 'El intercambio en UCF afinó la mirada sobre servicio: tono, expectativa, velocidad y contraste cultural en cómo se leen las experiencias.',
        tags: ['UCF', 'Servicio', 'Cultura'],
      },
      {
        date: '2025',
        marker: '04',
        title: 'Práctica independiente - aprender a construir',
        location: 'Madrid',
        body: 'Herramientas asistidas por IA, Codex, Claude Code, n8n y workflows internos se volvieron una forma de prototipar la capa operativa.',
        tags: ['Codex', 'n8n', 'Prototipos'],
      },
      {
        date: '2025',
        marker: '05',
        title: 'Primor - trabajar dentro de escala',
        location: 'Perfumerias Primor',
        body: 'CRM, lifecycle, una base de 8M+ usuarios, partners de lujo y adopción interna de IA hacen que las restricciones sean reales.',
        tags: ['CRM', '8M+ usuarios', 'Retail'],
      },
      {
        date: 'Ahora',
        marker: '06',
        title: 'Ahora - construir el bucle',
        location: 'Sistemas detrás del trabajo',
        body: 'Sistemas de campaña, interfaces de decisión, workflows IA e infraestructura de marca para que el buen criterio viaje mejor.',
        tags: ['Campañas', 'Interfaces', 'Reglas'],
      },
    ] satisfies Chapter[],
    originsTitle: 'De dónde sale el trabajo',
    originsIntro:
      'La página es digital, pero las referencias son físicas: luz del sur, ritmo retail de Madrid, cultura de servicio en Orlando e idioma como restricción de diseño.',
    cities: [
      {
        city: 'Málaga',
        coord: '36.7N · 4.4W',
        label: 'Instinto visual, luz, origen',
        body: 'Una sensibilidad por contraste, imagen, ritmo de calle y la primera capa de gusto.',
      },
      {
        city: 'Madrid',
        coord: '40.4N · 3.7W',
        label: 'Marca, CRM, retail, ejecución',
        body: 'La base operativa: universidad, proyectos con cliente, Primor y el ritmo de construir cosas útiles.',
      },
      {
        city: 'Orlando',
        coord: '28.5N · 81.4W',
        label: 'Servicio y contraste cultural',
        body: 'Otra lectura sobre marketing de servicios, expectativa y cómo el entorno moldea el comportamiento.',
      },
    ],
    languagesTitle: 'Idiomas',
    languages: ['Español', 'Inglés', 'Neerlandés', 'Alemán', 'Italiano'],
    processTitle: 'Cómo trabajo',
    processIntro:
      'Un proceso de diseño práctico para convertir inputs poco claros en decisiones usables.',
    process: [
      {
        number: '01',
        title: 'Empezar por la decisión',
        body: 'Qué necesita entender, elegir, aprobar o repetir la persona que usa el sistema.',
      },
      {
        number: '02',
        title: 'Mapear el workflow',
        body: 'Inputs, restricciones, handoffs, puntos de revisión, riesgos y outputs.',
      },
      {
        number: '03',
        title: 'Construir la interfaz',
        body: 'Prototipar la superficie donde el trabajo se vuelve visible y usable.',
      },
      {
        number: '04',
        title: 'Añadir inteligencia con cuidado',
        body: 'Usar IA o ML cuando mejora velocidad, síntesis o diagnóstico - no cuando elimina responsabilidad.',
      },
      {
        number: '05',
        title: 'Mantener el gusto dentro del sistema',
        body: 'Voz de marca, lógica visual, ritmo y criterio siguen siendo parte del sistema.',
      },
    ],
    workTitle: 'Prueba en el trabajo',
    workIntro: 'Una ruta corta hacia los proyectos que vuelven concreto este perfil operativo.',
    work: [
      {
        title: 'Campaign Pulse',
        subtitle: 'Marketing intelligence',
        body: 'Un command center local-first para rendimiento de newsletter, presión de audiencia, objetivos y reporting mensual.',
        href: '/case-studies/campaign-pulse',
      },
      {
        title: 'DemandOS',
        subtitle: 'Inteligencia operativa',
        body: 'Un prototipo ML determinista para forecasts de demanda, riesgo de stockout y recomendaciones de reposición.',
        href: '/case-studies/demandos',
      },
      {
        title: 'Campaign Sandbox',
        subtitle: 'Estrategia de campaña',
        body: 'Un workspace acotado que convierte briefs en rutas, simulaciones, revisiones e informes de estrategia.',
        href: '/case-studies/campaign-sandbox',
      },
      {
        title: 'Remoria',
        subtitle: 'Mundo de marca',
        body: 'Una identidad de fragancia de lujo con historias de producto, lógica de packaging y reglas reutilizables.',
        href: '/case-studies/remoria',
      },
      {
        title: 'AI Sports',
        subtitle: 'Producción visual controlada',
        body: 'Un workflow de campaña para iteración visual sin perder dirección de arte, continuidad ni control de marca.',
        href: '/case-studies/ai-sports',
      },
    ],
    ctaTitle: 'Hagamos que algo funcione.',
    contactMeta: ['Disponible T3 2026', 'Madrid · Remoto · UE'],
    githubCta: 'Ver GitHub',
  },
} satisfies Record<LocaleKey, {
  heroEyebrow: string
  heroTitle: string
  heroLede: string
  portraitAlt: string
  scroll: string
  heroMeta: string[]
  portraitLabels: string[]
  proofLabel: string
  proof: { number: string; title: string; body: string }[]
  profileTitle: string
  profileIntro: string
  profile: string[][]
  focusTitle: string
  focusBody: string
  focusItems: string[]
  vocabularyTitle: string
  vocabularyIntro: string
  vocabulary: string[]
  chaptersTitle: string
  chaptersIntro: string
  chapters: Chapter[]
  originsTitle: string
  originsIntro: string
  cities: { city: string; coord: string; label: string; body: string }[]
  languagesTitle: string
  languages: string[]
  processTitle: string
  processIntro: string
  process: { number: string; title: string; body: string }[]
  workTitle: string
  workIntro: string
  work: { title: string; subtitle: string; body: string; href: string }[]
  ctaTitle: string
  contactMeta: string[]
  githubCta: string
}>

const MAP_CITIES: { coords: [number, number]; delay: number }[] = [
  { coords: [-4.42, 36.72], delay: 0 },
  { coords: [-3.7, 40.42], delay: 0.55 },
  { coords: [-81.38, 28.54], delay: 1.1 },
]

function useAboutLandingMotion() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealTargets = document.querySelectorAll<HTMLElement>('[data-about-reveal]')

    if (prefersReducedMotion) {
      revealTargets.forEach((target) => target.classList.add('is-visible'))
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
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    )

    revealTargets.forEach((target) => observer.observe(target))

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
        const end = rect.bottom - viewport * 0.35
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

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    updateScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  return { timelineRef, progressRef, hintRef }
}

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
        <pattern id="about-map-stip" patternUnits="userSpaceOnUse" width="6" height="6">
          <circle cx="1" cy="1" r="0.9" fill="rgba(239,232,218,.28)" />
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
                  stroke: 'rgba(239,232,218,0.18)',
                  strokeWidth: 0.5,
                  outline: 'none',
                },
                hover: {
                  fill: 'url(#about-map-stip)',
                  stroke: 'rgba(239,232,218,0.22)',
                  strokeWidth: 0.5,
                  outline: 'none',
                },
                pressed: {
                  fill: 'url(#about-map-stip)',
                  stroke: 'rgba(239,232,218,0.22)',
                  strokeWidth: 0.5,
                  outline: 'none',
                },
              }}
            />
          ))
        }
      </Geographies>
      <Line from={[-4.42, 36.72]} to={[-3.7, 40.42]} className="about-map__trail" />
      <Line from={[-4.06, 38.57]} to={[-81.38, 28.54]} className="about-map__trail" />
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
  const { timelineRef, progressRef, hintRef } = useAboutLandingMotion()

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="about-landing" role="main">
        <div ref={progressRef} className="about-landing__progress" aria-hidden="true" />

        <div ref={hintRef} className="about-landing__scroll-hint" aria-hidden="true">
          <span />
          {copy.scroll}
        </div>

        <section className="about-landing__hero" id="top" aria-labelledby="about-landing-title">
          <div className="about-landing__container">
            <div className="about-hero-grid">
              <div className="about-hero-copy" data-about-reveal>
                <p className="about-landing__eyebrow">{copy.heroEyebrow}</p>
                <h1 id="about-landing-title">{copy.heroTitle}</h1>
                <p>{copy.heroLede}</p>
              </div>

              <figure className="about-landing__portrait" data-about-reveal>
                <div className="about-landing__portrait-frame">
                  <Image
                    src="/images/about/profile.webp"
                    alt={copy.portraitAlt}
                    fill
                    priority
                    quality={88}
                    sizes="(max-width: 900px) 82vw, 420px"
                  />
                </div>
                <figcaption className="sr-only">{copy.portraitAlt}</figcaption>
                <div className="about-portrait-labels" aria-hidden="true">
                  {copy.portraitLabels.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </figure>
            </div>

            <div className="about-hero-meta" aria-label={locale === 'es' ? 'Resumen de perfil' : 'Profile summary'} data-about-reveal>
              {copy.heroMeta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="about-landing__proof" aria-label={copy.proofLabel} data-about-reveal>
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

        <section className="about-profile" aria-labelledby="about-profile-title">
          <div className="about-landing__container about-section-grid">
            <div className="about-section-kicker" data-about-reveal>
              <span>01</span>
              <p>{copy.profileIntro}</p>
            </div>
            <div data-about-reveal>
              <h2 id="about-profile-title">{copy.profileTitle}</h2>
              <dl className="about-profile-list">
                {copy.profile.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="about-focus" aria-labelledby="about-focus-title">
          <div className="about-landing__container about-focus-grid">
            <div data-about-reveal>
              <p className="about-landing__eyebrow">02</p>
              <h2 id="about-focus-title">{copy.focusTitle}</h2>
              <p>{copy.focusBody}</p>
            </div>
            <ul data-about-reveal>
              {copy.focusItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="about-vocabulary" aria-labelledby="about-vocabulary-title">
          <div className="about-landing__container">
            <div className="about-vocabulary__head" data-about-reveal>
              <p className="about-landing__eyebrow">03</p>
              <h2 id="about-vocabulary-title">{copy.vocabularyTitle}</h2>
              <p>{copy.vocabularyIntro}</p>
            </div>
            <div className="about-vocabulary__field" data-about-reveal>
              {copy.vocabulary.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="about-timeline" id="trajectory" aria-labelledby="about-timeline-title">
          <div className="about-landing__container">
            <div className="about-section-head" data-about-reveal>
              <p className="about-landing__eyebrow">04</p>
              <h2 id="about-timeline-title">{copy.chaptersTitle}</h2>
              <p>{copy.chaptersIntro}</p>
            </div>

            <div ref={timelineRef} className="about-timeline__wrap">
              <div className="about-timeline__track" aria-hidden="true" />
              {copy.chapters.map((item) => (
                <article className="about-timeline__chapter" key={`${item.date}-${item.title}`} data-about-reveal>
                  <div className="about-timeline__marker" aria-hidden="true">{item.marker}</div>
                  <div className="about-timeline__card">
                    <p>{item.date}</p>
                    <h3>{item.title}</h3>
                    <h4>{item.location}</h4>
                    <p>{item.body}</p>
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

        <section className="about-origins" aria-labelledby="about-origins-title">
          <div className="about-landing__container">
            <div className="about-section-head" data-about-reveal>
              <p className="about-landing__eyebrow">05</p>
              <h2 id="about-origins-title">{copy.originsTitle}</h2>
              <p>{copy.originsIntro}</p>
            </div>

            <div className="about-origins__grid" data-about-reveal>
              <article className="about-origins__map">
                <MapGraphic />
              </article>
              <div className="about-city-grid">
                {copy.cities.map((city) => (
                  <article className="about-city-card" key={city.city}>
                    <div>
                      <h3>{city.city}</h3>
                      <span>{city.coord}</span>
                    </div>
                    <p>{city.label}</p>
                    <p>{city.body}</p>
                  </article>
                ))}
              </div>
              <div className="about-language-strip" aria-label={copy.languagesTitle}>
                <span>{copy.languagesTitle}</span>
                {copy.languages.map((language) => (
                  <b key={language}>{language}</b>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about-practice" aria-labelledby="about-practice-title">
          <div className="about-landing__container">
            <div className="about-section-head" data-about-reveal>
              <p className="about-landing__eyebrow">06</p>
              <h2 id="about-practice-title">{copy.processTitle}</h2>
              <p>{copy.processIntro}</p>
            </div>

            <div className="about-process-grid" data-about-reveal>
              {copy.process.map((item) => (
                <article className="about-process-card" key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-work" aria-labelledby="about-work-title">
          <div className="about-landing__container">
            <div className="about-section-head" data-about-reveal>
              <p className="about-landing__eyebrow">07</p>
              <h2 id="about-work-title">{copy.workTitle}</h2>
              <p>{copy.workIntro}</p>
            </div>

            <div className="about-work-grid" data-about-reveal>
              {copy.work.map((item) => (
                <Link href={localizePath(item.href, locale)} className="about-work-card" key={item.title}>
                  <span>{item.subtitle}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <b aria-hidden="true">↗</b>
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
