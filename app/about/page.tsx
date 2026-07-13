'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_MAILTO } from '@/lib/contact'
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
    heroTag: 'AI systems for brand and creative teams.',
    heroSupport:
      'I work at the intersection of AI systems, brand strategy, creative direction, and product design. I help teams turn emerging technology into structured, usable, and culturally coherent tools.',
    current: ['Base', 'Madrid', 'Origin', 'Málaga', 'IE University · BBA Marketing'],
    proof: [
      {
        number: '01',
        title: 'CRM and commercial systems',
        body: 'Lifecycle and CRM work around a large customer database, commercial campaigns, segmentation, luxury partners, and internal adoption.',
      },
      {
        number: '02',
        title: 'Strategy to prototype',
        body: 'Campaign, data, audit, and reporting tools built as working prototypes so their logic can be tested, not only described.',
      },
      {
        number: '03',
        title: 'Visual judgment',
        body: 'Photography, visual research, and brand systems that keep interfaces and outputs distinctive, credible, and appropriate.',
      },
    ],
    aboutEyebrow: 'About',
    aboutTitle: <>Why strategy, design, and <span className="about-landing__serif">systems</span> belong together.</>,
    lede:
      'Creative systems only work when the business context, interaction design, and human judgment are designed together.',
    body: [
      'My background in marketing, CRM, retail, and creative work means I start with the decision a team needs to make—not a generic model capability. The technical layer needs a clear purpose, usable inputs, and visible points for review.',
      'I bring that perspective into product surfaces and working prototypes. A tool is only useful when people can understand what it is doing, assess the output, and keep the brand’s point of view intact.',
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
    timelineTitle: <>The background behind the <span className="about-landing__serif">practice</span>.</>,
    timelineIntro:
      'A short path through the contexts that make the current work possible.',
    timeline: [
      {
        date: '01',
        title: 'Marketing and business foundations',
        org: 'IE University · BBA Marketing',
        desc: 'Business, marketing, and digital analytics at IE University created the first technical vocabulary for turning customer behavior into decisions.',
        tags: ['Madrid', 'IE University', 'Marketing'],
      },
      {
        date: '02',
        title: 'Independent practice — learning to build',
        org: 'Portfolio systems',
        desc:
          'Campaign tools, data products, image systems, and site architecture turned positioning into usable interfaces.',
        tags: ['Prototypes', 'Case studies', 'Visuals'],
      },
      {
        date: '03',
        title: 'CRM and lifecycle work at scale',
        org: 'CRM · lifecycle · luxury partners',
        desc:
          'Large audiences, commercial cadence, segmentation, partner expectations, and internal AI adoption make the work accountable.',
        tags: ['CRM', 'Lifecycle', 'Scale'],
      },
    ] satisfies TimelineItem[],
    practiceTitle: <>How I <span className="about-landing__serif">work</span>.</>,
    practiceIntro:
      'A concise process from business context to a working, reviewable system.',
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
    ctaTitle: <>Let&apos;s discuss a <span className="about-landing__serif">system</span>.</>,
    contactMeta: ['Open to selected projects and collaborations.', 'Madrid · Remote · EU'],
    githubCta: 'View GitHub',
  },
  es: {
    heroTag: 'Sistemas de IA para equipos de marca y creatividad.',
    heroSupport:
      'Trabajo en la intersección de sistemas de IA, estrategia de marca, dirección creativa y diseño de producto. Ayudo a equipos a convertir tecnología emergente en herramientas estructuradas, usables y culturalmente coherentes.',
    current: ['Base', 'Madrid', 'Origen', 'Málaga', 'IE University · BBA Marketing'],
    proof: [
      {
        number: '01',
        title: 'CRM y sistemas comerciales',
        body: 'Trabajo de lifecycle y CRM con una gran base de clientes, campañas comerciales, segmentación, partners de lujo y adopción interna.',
      },
      {
        number: '02',
        title: 'De estrategia a prototipo',
        body: 'Herramientas de campaña, datos, auditoría y reporting construidas como prototipos funcionales para probar la lógica, no solo describirla.',
      },
      {
        number: '03',
        title: 'Criterio visual',
        body: 'Fotografía, investigación visual y sistemas de marca que mantienen las interfaces y los resultados distintivos, creíbles y apropiados.',
      },
    ],
    aboutEyebrow: 'Sobre mí',
    aboutTitle: <>Por qué estrategia, diseño y <span className="about-landing__serif">sistemas</span> van juntos.</>,
    lede:
      'Los sistemas creativos solo funcionan cuando se diseñan juntos el contexto de negocio, la interacción y el criterio humano.',
    body: [
      'Mi experiencia en marketing, CRM, retail y trabajo creativo hace que empiece por la decisión que un equipo necesita tomar, no por una capacidad genérica del modelo. La capa técnica necesita un propósito claro, inputs usables y puntos visibles de revisión.',
      'Llevo esa perspectiva a superficies de producto y prototipos funcionales. Una herramienta solo sirve cuando las personas entienden qué hace, pueden valorar el resultado y mantienen el punto de vista de la marca.',
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
    timelineTitle: <>El recorrido detrás de la <span className="about-landing__serif">práctica</span>.</>,
    timelineIntro:
      'Un recorrido breve por los contextos que hacen posible el trabajo actual.',
    timeline: [
      {
        date: '01',
        title: 'Fundamentos de negocio y marketing',
        org: 'IE University · BBA Marketing',
        desc: 'Negocio, marketing y analítica digital en IE University crearon el primer vocabulario técnico para convertir comportamiento de cliente en decisiones.',
        tags: ['Madrid', 'IE University', 'Marketing'],
      },
      {
        date: '02',
        title: 'Práctica independiente — aprender a construir',
        org: 'Sistemas de portfolio',
        desc:
          'Herramientas de campaña, productos de datos, sistemas de imagen y arquitectura web convirtieron posicionamiento en interfaces usables.',
        tags: ['Prototipos', 'Casos', 'Visuales'],
      },
      {
        date: '03',
        title: 'CRM y lifecycle a escala',
        org: 'CRM · lifecycle · partners de lujo',
        desc:
          'Grandes audiencias, ritmo comercial, segmentación, expectativas de partners y adopción interna hacen que el trabajo sea responsable.',
        tags: ['CRM', 'Lifecycle', 'Escala'],
      },
    ] satisfies TimelineItem[],
    practiceTitle: <>Cómo <span className="about-landing__serif">trabajo</span>.</>,
    practiceIntro:
      'Un proceso conciso desde el contexto de negocio hasta un sistema funcional y revisable.',
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
    ctaTitle: <>Hablemos de un <span className="about-landing__serif">sistema</span>.</>,
    contactMeta: ['Abierto a proyectos y colaboraciones seleccionadas.', 'Madrid · Remoto · UE'],
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
            </div>
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
