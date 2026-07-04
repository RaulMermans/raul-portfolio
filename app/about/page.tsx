'use client'

import { useEffect, useMemo, useRef } from 'react'
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
    heroTag:
      'I work where personal projects, photography, brand worlds, and technical AI systems meet: building tools and images that keep creative judgment close to the work.',
    current: ['Currently', 'Personal projects', 'Photography', '+ technical AI', 'Creative systems'],
    proof: [
      {
        number: '01',
        title: 'Personal tools',
        body: 'Working prototypes for campaigns, research, data, audits, and this portfolio. Built to test ideas, not just describe them.',
      },
      {
        number: '02',
        title: 'Image practice',
        body: 'Photography, covers, visual studies, and generative experiments that keep the technical work grounded in taste.',
      },
      {
        number: '03',
        title: 'Creative systems',
        body: 'Interfaces, prompts, rules, and review loops for making AI useful without making the output feel automatic.',
      },
    ],
    aboutEyebrow: 'About',
    aboutTitle: <>A short <span className="about-landing__serif">version</span><br />of the story.</>,
    lede:
      'My work sits between creative direction and technical AI. The visual side is not decoration; it is how I decide whether a tool, workflow, or interface actually has taste.',
    body: [
      'Business school gave me the vocabulary for brand, growth, and customer behavior. Photography gave me a stricter way to look at tone, composition, rhythm, and what feels real.',
      'Code and AI gave me a way to build with that judgment: small tools, campaign systems, data products, visual workflows, and experiments that turn loose ideas into working surfaces.',
      'Professional work adds constraints, but the center of gravity is the personal practice: building, shooting, testing, and refining until the system feels useful and the image still feels human.',
    ],
    currentFocus: {
      title: 'Current focus',
      items: [
        'Personal AI tools for research, campaigns, and creative production',
        'Photography and visual systems as a way to train taste',
        'Brand worlds, campaign logic, and controlled generative workflows',
        'Interfaces that turn scattered creative inputs into decisions',
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
    marquee: [
      'Personal projects',
      'Photography',
      'Creative direction',
      'OpenAI Codex',
      'n8n',
      'Brand systems',
      'Visual workflows',
      'Technical AI',
      'Art direction',
    ],
    timelineTitle: <>Trajectory <span className="about-landing__serif">so far</span>.</>,
    timelineIntro:
      'Five years moving between brand, images, service, tools, and the technical layer that lets ideas become something people can use.',
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
        title: 'Independent practice',
        org: 'Independent practice · Madrid',
        desc:
          'Started prototyping lightweight apps, campaign systems, and visual workflows with Codex, Claude Code, n8n, and image tools.',
        tags: ['Codex', 'n8n', 'Visual systems', 'Tools'],
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
        title: 'Working inside scale',
        org: 'Perfumerías Primor',
        desc:
          'A professional context for constraints: commercial pace, large audiences, luxury partners, and the discipline of shipping around real pressure.',
        tags: ['Scale', 'Luxury', 'Constraints'],
      },
      {
        date: 'Now',
        title: 'Building the creative loop',
        org: 'Personal projects · Photography · AI tools',
        desc:
          'Going deeper into the loop between shooting, designing, coding, prompting, testing, and tightening the work until it feels intentional.',
        tags: ['Photography', 'AI tools', 'Interfaces'],
      },
    ] satisfies TimelineItem[],
    practiceTitle: <>A <span className="about-landing__serif">practice</span>, not a job title.</>,
    practiceIntro:
      'One practice with a simple hierarchy: creative judgment first, then the technical systems that make it repeatable.',
    capabilities: [
      {
        number: '01',
        kicker: 'Lead practice',
        title: <>Creative <span>AI</span><br />systems.</>,
        body:
          'Tools and workflows for campaign thinking, research, audits, image direction, and the handoffs between idea and output.',
        tools: ['Claude Code', 'OpenAI Codex', 'n8n', 'Review loops', 'Interfaces'],
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
          'Small apps and interfaces built to make a project tangible: enough structure to test the idea, enough taste to keep it alive.',
        tools: ['React', 'Next.js', 'Claude Code'],
      },
      {
        number: '04',
        kicker: 'Brand',
        title: <>Brand as<br /><span>system</span>.</>,
        body:
          'Turning a brand world into reusable rules for tone, image, pacing, and interface behavior.',
        tools: ['Positioning', 'Tone', 'Image rules'],
      },
      {
        number: '05',
        kicker: 'Generative',
        title: <>Generative <span>visual</span> systems.</>,
        body:
          'Image workflows that can explore variations while preserving art direction, lighting, and continuity.',
        tools: ['n8n', 'Image models', 'Style locks', 'Continuity'],
      },
      {
        number: '06',
        kicker: 'Photography',
        title: <>Training<br />the <span>eye</span>.</>,
        body:
          'Using camera work, street light, references, and edits as a way to keep the technical systems visually accountable.',
        tools: ['Street', 'Light', 'Editing'],
      },
    ],
    ctaTitle: <>Let&apos;s make <span className="about-landing__serif">something</span> work.</>,
    contactMeta: ['Available Q3 2026', 'Madrid · Remote · EU'],
    githubCta: 'View GitHub',
  },
  es: {
    heroTag:
      'Trabajo donde se cruzan proyectos personales, fotografía, mundos de marca y sistemas técnicos de IA: herramientas e imágenes que mantienen el criterio creativo cerca del trabajo.',
    current: ['Ahora', 'Proyectos propios', 'Fotografía', '+ IA técnica', 'Sistemas creativos'],
    proof: [
      {
        number: '01',
        title: 'Herramientas propias',
        body: 'Prototipos funcionales para campañas, investigación, datos, auditorías y este portfolio. Construidos para probar ideas, no solo describirlas.',
      },
      {
        number: '02',
        title: 'Práctica de imagen',
        body: 'Fotografía, portadas, estudios visuales y experimentos generativos que mantienen el trabajo técnico conectado al gusto.',
      },
      {
        number: '03',
        title: 'Sistemas creativos',
        body: 'Interfaces, prompts, reglas y bucles de revisión para hacer útil la IA sin que el resultado se sienta automático.',
      },
    ],
    aboutEyebrow: 'Sobre mí',
    aboutTitle: <>La <span className="about-landing__serif">versión</span><br />corta de la historia.</>,
    lede:
      'Mi trabajo se mueve entre dirección creativa e IA técnica. La parte visual no es decoración: es cómo decido si una herramienta, un workflow o una interfaz tienen gusto.',
    body: [
      'Mi formación en negocio me dio vocabulario para entender marca, crecimiento y comportamiento de cliente. La fotografía me dio una forma más estricta de mirar tono, composición, ritmo y lo que se siente real.',
      'El código y la IA me dieron una forma de construir con ese criterio: herramientas pequeñas, sistemas de campaña, productos de datos, workflows visuales y experimentos que convierten ideas sueltas en superficies funcionales.',
      'El trabajo profesional añade restricciones, pero el centro de gravedad es la práctica personal: construir, fotografiar, probar y refinar hasta que el sistema sea útil y la imagen siga sintiéndose humana.',
    ],
    currentFocus: {
      title: 'Foco actual',
      items: [
        'Herramientas IA propias para investigación, campañas y producción creativa',
        'Fotografía y sistemas visuales como forma de entrenar el gusto',
        'Mundos de marca, lógica de campaña y workflows generativos controlados',
        'Interfaces que convierten inputs creativos dispersos en decisiones',
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
    marquee: [
      'Proyectos propios',
      'Fotografía',
      'Dirección creativa',
      'OpenAI Codex',
      'n8n',
      'Sistemas de marca',
      'Workflows visuales',
      'IA técnica',
      'Dirección de arte',
    ],
    timelineTitle: <>Trayectoria <span className="about-landing__serif">hasta ahora</span>.</>,
    timelineIntro:
      'Cinco años moviéndome entre marca, imagen, servicio, herramientas y la capa técnica que permite que las ideas se conviertan en algo usable.',
    timeline: [
      {
        date: 'Sep 2021',
        title: 'Inicio en IE University',
        org: 'BBA · Marketing',
        desc:
          'Madrid. Beca IE High Potential Award. Primer contacto con programación, tecnología aplicada a negocio y analítica de marketing digital.',
        tags: ['Madrid', 'Beca', 'BBA'],
      },
      {
        date: 'Mar 2023',
        title: 'IE Marketing Lab',
        org: 'Project Leader · más de 8 empresas',
        desc:
          'Lideré un equipo de cinco personas entregando soluciones de marketing para empresas colaboradoras. Estrategia, cliente real y ejecución con fecha límite.',
        tags: ['Liderazgo', 'Estrategia', 'Cliente'],
      },
      {
        date: 'Sep 2023',
        title: 'WeFeel App Challenge',
        org: 'Branding & Marketing Trainee',
        desc:
          'Presenté recomendaciones de negocio sobre marca, propuesta de valor y dirección de producto. Tres de ellas fueron aprobadas para implementarse.',
        tags: ['Marca', 'Presentación', 'Aprobado'],
      },
      {
        date: 'Jan 2024',
        title: 'Intercambio · UCF',
        org: 'University of Central Florida · Orlando',
        desc:
          'Un semestre fuera que afinó mi intuición sobre experiencia de cliente y me dio otra perspectiva cultural del marketing de servicios.',
        tags: ['EE. UU.', 'Marketing de servicios'],
      },
      {
        date: 'Jun 2025',
        title: 'Práctica independiente',
        org: 'Práctica independiente · Madrid',
        desc:
          'Empecé a prototipar apps ligeras, sistemas de campaña y workflows visuales con Codex, Claude Code, n8n y herramientas de imagen.',
        tags: ['Codex', 'n8n', 'Sistemas visuales', 'Herramientas'],
      },
      {
        date: 'Jul 2025',
        title: 'Graduación',
        org: 'IE University · BBA, Marketing',
        desc:
          'Cerré la etapa con una concentración en marketing, un intercambio internacional y cuatro años de proyectos prácticos detrás.',
        tags: ['Graduado', 'Marketing'],
      },
      {
        date: 'Aug 2025',
        title: 'Trabajar dentro de escala',
        org: 'Perfumerías Primor',
        desc:
          'Un contexto profesional para aprender restricciones: ritmo comercial, audiencias grandes, partners de lujo y la disciplina de publicar bajo presión real.',
        tags: ['Escala', 'Lujo', 'Restricciones'],
      },
      {
        date: 'Ahora',
        title: 'Construyendo el bucle creativo',
        org: 'Proyectos propios · Fotografía · Herramientas IA',
        desc:
          'Profundizando en el bucle entre fotografiar, diseñar, programar, promptear, probar y ajustar hasta que el trabajo se sienta intencional.',
        tags: ['Fotografía', 'Herramientas IA', 'Interfaces'],
      },
    ] satisfies TimelineItem[],
    practiceTitle: <>Una <span className="about-landing__serif">práctica</span>, no un cargo.</>,
    practiceIntro:
      'Una práctica con una jerarquía simple: primero criterio creativo, luego los sistemas técnicos que lo vuelven repetible.',
    capabilities: [
      {
        number: '01',
        kicker: 'Práctica principal',
        title: <>Sistemas <span>IA</span><br />creativos.</>,
        body:
          'Herramientas y workflows para pensamiento de campaña, investigación, auditorías, dirección de imagen y el paso entre idea y salida.',
        tools: ['Claude Code', 'OpenAI Codex', 'n8n', 'Bucles de revisión', 'Interfaces'],
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
          'Apps pequeñas e interfaces que hacen tangible un proyecto: suficiente estructura para probar la idea, suficiente gusto para mantenerla viva.',
        tools: ['React', 'Next.js', 'Claude Code'],
      },
      {
        number: '04',
        kicker: 'Marca',
        title: <>Marca como<br /><span>sistema</span>.</>,
        body:
          'Convertir un mundo de marca en reglas reutilizables para tono, imagen, ritmo y comportamiento de interfaz.',
        tools: ['Posicionamiento', 'Tono', 'Reglas de imagen'],
      },
      {
        number: '05',
        kicker: 'Generativo',
        title: <>Sistemas <span>visuales</span> generativos.</>,
        body:
          'Workflows de imagen que pueden explorar variaciones manteniendo dirección de arte, luz y continuidad.',
        tools: ['n8n', 'Modelos de imagen', 'Bloqueos de estilo', 'Continuidad'],
      },
      {
        number: '06',
        kicker: 'Fotografía',
        title: <>Entrenar<br />la <span>mirada</span>.</>,
        body:
          'Usar cámara, luz de calle, referencias y edición como una forma de mantener responsables a los sistemas técnicos.',
        tools: ['Calle', 'Luz', 'Edición'],
      },
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
              <article className="about-current-focus" data-about-reveal>
                <h3>{copy.currentFocus.title}</h3>
                <ul>
                  {copy.currentFocus.items.map(item => (
                    <li key={item}>{item}</li>
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
