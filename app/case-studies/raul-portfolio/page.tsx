'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import { useCaseStudySetup } from '@/hooks'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'

const liveUrl = 'https://www.raulmermans.com'
const githubUrl = 'https://github.com/RaulMermans/raul-portfolio'

const tags = [
  'Personal Brand',
  'Portfolio System',
  'Editorial Web',
  'Case Study Architecture',
  'Visual Identity',
  'Creative Direction',
]

const content = {
  en: {
    back: '← Case Studies',
    eyebrow: 'Brand Systems / Digital Identity / Portfolio Architecture',
    heroSubtitle:
      'A personal brand system for strategy, AI/product case studies, photography, and visual experimentation.',
    heroDescription:
      'This portfolio was built as a digital identity system: a structured environment for presenting brand strategy, cultural storytelling, AI/product work, photography, and visual experimentation through an editorial lens.',
    liveCta: 'Visit live site →',
    githubCta: 'View GitHub repository →',
    nav: [
      ['Challenge', '#challenge'],
      ['Intent', '#intent'],
      ['Architecture', '#architecture'],
      ['Wireframe', '#wireframe'],
      ['System', '#system'],
      ['Outcome', '#outcome'],
    ] as const,
    challengeEyebrow: 'Challenge',
    challengeH2: 'A multidisciplinary profile can easily become fragmented.',
    challengeP:
      'The work spans brand strategy, cultural storytelling, AI/product systems, photography, and visual experiments. The challenge was not to list projects, but to create a coherent world around strategy, taste, visual direction, and technical execution.',
    challengeCards: [
      'Translate many disciplines into one recognizable identity.',
      'Make case studies feel strategic, visual, and editorial rather than like resume cards.',
      'Create a structure that can scale with future AI systems, campaigns, brand work, and photography.',
    ],
    intentEyebrow: 'Design intent',
    intentH2: 'The site behaves like an archive with editorial pacing.',
    intentP:
      'The visual system uses restraint as a signal. Strong whitespace, image-led storytelling, typography hierarchy, and controlled motion create a rhythm where taste is visible through pacing, not decoration.',
    intentItems: [
      { title: 'Editorial rhythm', description: 'Sections are paced as frames: entry, orientation, selection, immersion, and proof.' },
      { title: 'Case-study-first navigation', description: 'The site directs attention toward selected proof rather than a generic portfolio grid.' },
      { title: 'Atmosphere with structure', description: 'Photography and visuals add texture while the information architecture keeps the experience legible.' },
      { title: 'Restraint over ornament', description: 'Whitespace, alignment, and type scale carry more of the identity than decorative effects.' },
    ],
    architectureEyebrow: 'Information architecture',
    architectureH2: 'A portfolio system, not a static resume.',
    architectureP:
      'The website is organized as a set of layers that each answer a different question for the visitor.',
    layers: [
      { label: 'Home', value: 'Orientation layer' },
      { label: 'Case studies', value: 'Proof layer' },
      { label: 'Photography / visuals', value: 'Atmosphere layer' },
      { label: 'About', value: 'Identity layer' },
      { label: 'GitHub', value: 'Technical transparency layer' },
    ],
    wireframeEyebrow: 'Wireframe logic',
    wireframeH2: 'The sequence controls pacing instead of filling space.',
    wireframeP:
      'The site is organized as a sequence of editorial frames: entry, orientation, selection, immersion, and proof. Each section has a job in the visitor journey.',
    wireframeItems: [
      'Entry frame',
      'Project selector',
      'Category grouping',
      'Case-study page rhythm',
      'Visual archive',
      'Contact / exit path',
    ],
    systemEyebrow: 'Visual + technical system',
    systemH2: 'Taste is made visible through hierarchy, spacing, and repeatable rules.',
    visualSystemH3: 'Visual system',
    visualSystem: [
      'Typography hierarchy with large editorial titles and quieter supporting copy.',
      'Neutral palette that lets imagery, spacing, and content carry the mood.',
      'Controlled motion that supports attention rather than performing for its own sake.',
      'Grid logic and modular blocks for future case studies and experiments.',
    ],
    technicalSystemH3: 'Technical system',
    technicalSystem: [
      'Next.js and TypeScript foundation.',
      'Static export for IONOS hosting.',
      'GitHub Actions deployment by SFTP.',
      'Public GitHub repository for technical transparency.',
      'Public-readiness discipline around secrets, docs, and deployment files.',
    ],
    outcomeEyebrow: 'Outcome',
    outcomeH2: 'A scalable identity system for future work.',
    outcomeP:
      'The result is a coherent home for future case studies, a clearer creative position, and a stronger bridge between brand strategy and AI/product execution.',
    outcomeCards: [
      'A scalable home for AI systems, campaigns, brand work, and photography.',
      'Cleaner positioning around strategy, taste, and applied technical execution.',
      'A public repository that makes the build transparent without turning the case study into a code walkthrough.',
      'A flexible archive for visuals, photography, and ongoing experiments.',
    ],
    linksEyebrow: 'Links',
    linksH2: 'Explore the system.',
  },
  es: {
    back: '← Casos de estudio',
    eyebrow: 'Sistemas de marca / Identidad digital / Arquitectura de portfolio',
    heroSubtitle:
      'Un sistema de marca personal para estrategia, casos de IA/producto, fotografía y experimentación visual.',
    heroDescription:
      'Este portfolio fue construido como un sistema de identidad digital: un entorno estructurado para presentar estrategia de marca, relato cultural, trabajo de IA/producto, fotografía y experimentación visual desde una mirada editorial.',
    liveCta: 'Visitar sitio en vivo →',
    githubCta: 'Ver repositorio en GitHub →',
    nav: [
      ['Reto', '#challenge'],
      ['Intención', '#intent'],
      ['Arquitectura', '#architecture'],
      ['Wireframe', '#wireframe'],
      ['Sistema', '#system'],
      ['Resultado', '#outcome'],
    ] as const,
    challengeEyebrow: 'Reto',
    challengeH2: 'Un perfil multidisciplinar puede fragmentarse con facilidad.',
    challengeP:
      'El trabajo cruza estrategia de marca, relato cultural, sistemas de IA/producto, fotografía y experimentos visuales. El reto no era listar proyectos, sino construir un mundo coherente alrededor de estrategia, gusto, dirección visual y ejecución técnica.',
    challengeCards: [
      'Traducir varias disciplinas en una identidad reconocible.',
      'Hacer que los casos se sientan estratégicos, visuales y editoriales en vez de tarjetas de CV.',
      'Crear una estructura capaz de escalar con futuros sistemas de IA, campañas, marca y fotografía.',
    ],
    intentEyebrow: 'Intención de diseño',
    intentH2: 'El sitio funciona como un archivo con ritmo editorial.',
    intentP:
      'El sistema visual usa la contención como señal. Espacio en blanco, storytelling visual, jerarquía tipográfica y movimiento controlado crean un ritmo donde el gusto aparece a través del pacing, no de la decoración.',
    intentItems: [
      { title: 'Ritmo editorial', description: 'Las secciones funcionan como frames: entrada, orientación, selección, inmersión y prueba.' },
      { title: 'Navegación centrada en casos', description: 'La experiencia dirige la atención hacia prueba seleccionada, no hacia una parrilla genérica.' },
      { title: 'Atmósfera con estructura', description: 'Fotografía y visuales aportan textura mientras la arquitectura mantiene claridad.' },
      { title: 'Contención sobre ornamento', description: 'El espacio, la alineación y la escala tipográfica sostienen la identidad.' },
    ],
    architectureEyebrow: 'Arquitectura de información',
    architectureH2: 'Un sistema de portfolio, no un resume estático.',
    architectureP:
      'La web se organiza como capas que responden a preguntas distintas del visitante.',
    layers: [
      { label: 'Home', value: 'Capa de orientación' },
      { label: 'Casos de estudio', value: 'Capa de prueba' },
      { label: 'Fotografía / visuales', value: 'Capa de atmósfera' },
      { label: 'About', value: 'Capa de identidad' },
      { label: 'GitHub', value: 'Capa de transparencia técnica' },
    ],
    wireframeEyebrow: 'Lógica de wireframe',
    wireframeH2: 'La secuencia controla el ritmo en vez de llenar espacio.',
    wireframeP:
      'El sitio se organiza como una secuencia de frames editoriales: entrada, orientación, selección, inmersión y prueba. Cada sección tiene una función en el recorrido.',
    wireframeItems: [
      'Frame de entrada',
      'Selector de proyectos',
      'Agrupación por categorías',
      'Ritmo de página de caso',
      'Archivo visual',
      'Contacto / salida',
    ],
    systemEyebrow: 'Sistema visual + técnico',
    systemH2: 'El gusto se vuelve visible mediante jerarquía, espaciado y reglas repetibles.',
    visualSystemH3: 'Sistema visual',
    visualSystem: [
      'Jerarquía tipográfica con titulares editoriales grandes y texto de apoyo más silencioso.',
      'Paleta neutral para que imagen, espacio y contenido sostengan el tono.',
      'Movimiento controlado que guía atención sin convertirse en espectáculo.',
      'Grid y bloques modulares para futuros casos y experimentos.',
    ],
    technicalSystemH3: 'Sistema técnico',
    technicalSystem: [
      'Base en Next.js y TypeScript.',
      'Export estático para hosting en IONOS.',
      'Despliegue por SFTP mediante GitHub Actions.',
      'Repositorio público en GitHub como transparencia técnica.',
      'Disciplina de preparación pública alrededor de secretos, docs y despliegue.',
    ],
    outcomeEyebrow: 'Resultado',
    outcomeH2: 'Un sistema de identidad escalable para trabajo futuro.',
    outcomeP:
      'El resultado es una casa coherente para futuros casos, un posicionamiento creativo más claro y un puente más fuerte entre estrategia de marca y ejecución de IA/producto.',
    outcomeCards: [
      'Un hogar escalable para sistemas de IA, campañas, marca y fotografía.',
      'Posicionamiento más claro alrededor de estrategia, gusto y ejecución técnica aplicada.',
      'Un repositorio público que transparenta el build sin convertir el caso en un walkthrough de código.',
      'Un archivo flexible para visuales, fotografía y experimentos continuos.',
    ],
    linksEyebrow: 'Links',
    linksH2: 'Explorar el sistema.',
  },
}

export default function RaulPortfolioPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const t = content[locale]

  useCaseStudySetup()

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="case-study-page-new case-study-page-new--portfolio">
        <section className="portfolio-hero" aria-labelledby="portfolio-title">
          <div className="portfolio-hero__content">
            <Link href={localizePath('/case-studies', locale)} className="data-brief-back">
              {t.back}
            </Link>
            <p className="data-brief-eyebrow">{t.eyebrow}</p>
            <h1 id="portfolio-title" className="portfolio-hero__title">
              Raul Mermans Portfolio
            </h1>
            <p className="portfolio-hero__subtitle">{t.heroSubtitle}</p>
            <p className="portfolio-hero__description">{t.heroDescription}</p>
            <div className="data-brief-actions" aria-label="Project links">
              <a href={liveUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                {t.liveCta}
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-button">
                {t.githubCta}
              </a>
            </div>
            <div className="data-brief-tags" aria-label="Project tags">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="portfolio-hero__system" aria-label="Portfolio system diagram">
            <div className="portfolio-frame portfolio-frame--large">
              <span>Identity</span>
              <strong>Strategy / AI / Photography / Visuals</strong>
            </div>
            <div className="portfolio-frame-grid">
              <span>Case studies</span>
              <span>Archive</span>
              <span>About</span>
              <span>GitHub</span>
            </div>
          </div>
        </section>

        <nav className="data-brief-mini-nav" aria-label="Case study sections">
          {t.nav.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <section id="challenge" className="portfolio-section portfolio-section--light" aria-labelledby="portfolio-challenge">
          <div className="portfolio-section__container">
            <div className="portfolio-section-heading">
              <p className="data-brief-eyebrow">{t.challengeEyebrow}</p>
              <h2 id="portfolio-challenge">{t.challengeH2}</h2>
              <p>{t.challengeP}</p>
            </div>
            <div className="portfolio-card-grid portfolio-card-grid--three">
              {t.challengeCards.map((card) => (
                <article key={card} className="portfolio-card">
                  <p>{card}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="intent" className="portfolio-section portfolio-section--cream" aria-labelledby="portfolio-intent">
          <div className="portfolio-section__container">
            <div className="portfolio-section-heading">
              <p className="data-brief-eyebrow">{t.intentEyebrow}</p>
              <h2 id="portfolio-intent">{t.intentH2}</h2>
              <p>{t.intentP}</p>
            </div>
            <div className="portfolio-card-grid portfolio-card-grid--four">
              {t.intentItems.map((item) => (
                <article key={item.title} className="portfolio-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="architecture" className="portfolio-section portfolio-section--dark" aria-labelledby="portfolio-architecture">
          <div className="portfolio-section__container portfolio-two-column">
            <div className="portfolio-section-heading">
              <p className="data-brief-eyebrow">{t.architectureEyebrow}</p>
              <h2 id="portfolio-architecture">{t.architectureH2}</h2>
              <p>{t.architectureP}</p>
            </div>
            <dl className="portfolio-layer-list">
              {t.layers.map((layer) => (
                <div key={layer.label}>
                  <dt>{layer.label}</dt>
                  <dd>{layer.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="wireframe" className="portfolio-section portfolio-section--light" aria-labelledby="portfolio-wireframe">
          <div className="portfolio-section__container portfolio-two-column">
            <div className="portfolio-section-heading">
              <p className="data-brief-eyebrow">{t.wireframeEyebrow}</p>
              <h2 id="portfolio-wireframe">{t.wireframeH2}</h2>
              <p>{t.wireframeP}</p>
            </div>
            <ol className="portfolio-wireframe-list">
              {t.wireframeItems.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="system" className="portfolio-section portfolio-section--cream" aria-labelledby="portfolio-system">
          <div className="portfolio-section__container">
            <div className="portfolio-section-heading">
              <p className="data-brief-eyebrow">{t.systemEyebrow}</p>
              <h2 id="portfolio-system">{t.systemH2}</h2>
            </div>
            <div className="portfolio-system-grid">
              <article>
                <h3>{t.visualSystemH3}</h3>
                <ul className="data-brief-list">
                  {t.visualSystem.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>{t.technicalSystemH3}</h3>
                <ul className="data-brief-list">
                  {t.technicalSystem.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="outcome" className="portfolio-section portfolio-section--dark portfolio-section--outcome" aria-labelledby="portfolio-outcome">
          <div className="portfolio-section__container">
            <div className="portfolio-section-heading">
              <p className="data-brief-eyebrow">{t.outcomeEyebrow}</p>
              <h2 id="portfolio-outcome">{t.outcomeH2}</h2>
              <p>{t.outcomeP}</p>
            </div>
            <div className="portfolio-card-grid portfolio-card-grid--four">
              {t.outcomeCards.map((card) => (
                <article key={card} className="portfolio-card">
                  <p>{card}</p>
                </article>
              ))}
            </div>
            <div className="portfolio-links" aria-labelledby="portfolio-links">
              <p className="data-brief-eyebrow">{t.linksEyebrow}</p>
              <h3 id="portfolio-links">{t.linksH2}</h3>
              <div className="data-brief-actions">
                <a href={liveUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                  {t.liveCta}
                </a>
                <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-button">
                  {t.githubCta}
                </a>
              </div>
            </div>
          </div>
        </section>

        <CaseStudyNext currentHref={pathname} accentColor="var(--color-1)" locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
