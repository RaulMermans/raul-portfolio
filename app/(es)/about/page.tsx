'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PortfolioIntro from '@/components/PortfolioIntro'
import { PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_MAILTO } from '@/lib/contact'
import { getLocaleFromPath } from '@/lib/i18n'
import styles from './AboutPage.module.css'

const copy = {
  en: {
    title: 'About me', identity: 'Raúl Mermans / Málaga → Madrid',
    opening: 'I build where business and technology have to work together.',
    introduction: 'I came to software through marketing, customers, and the day-to-day work of getting something out into the world. That context still shapes what I build.',
    scroll: 'Keep reading', storyLabel: 'The route here',
    storyTitle: 'The work changed. The questions stayed.', storyIntro: 'Six chapters behind the projects on this site.',
    chapters: [
      { place: 'Madrid', title: 'Learning the business side.', context: 'IE University · BBA Marketing', body: 'Marketing and analytics gave me a way to read what people do, what a business needs, and where those two things diverge.' },
      { place: 'Teams', title: 'Learning to deliver.', context: 'IE Marketing Lab', body: 'Working with deadlines, partners, and other people taught me that a good idea only matters once it survives the handoff.' },
      { place: 'Orlando', title: 'Seeing service from another angle.', context: 'University of Central Florida · exchange', body: 'A semester in a different market changed how I notice service, retail, and the expectations people bring to an experience.' },
      { place: 'Independent work', title: 'Making the tools myself.', context: 'Campaigns · data · interfaces', body: 'I started turning recurring problems into working prototypes: campaign tools, data products, and interfaces people could actually use.' },
      { place: 'Commercial systems', title: 'Working at scale.', context: 'CRM · lifecycle · partner programmes', body: 'Large audiences, segmentation, and operational constraints made the gap between a promising demo and a useful system impossible to ignore.' },
      { place: 'Now', title: 'Bringing the pieces together.', context: 'Product · AI · visual practice', body: 'I work across the brief, the workflow, the interface, and the test. I want the result to make sense to the people who have to use it.' },
    ],
    methodLabel: 'How I work', methodTitle: 'A useful system leaves room for judgment.',
    methodIntro: 'I start with the decision someone needs to make. Then I map the work around it, build the interface, and check what happens when the answer is incomplete or wrong.',
    method: [
      { number: '01', title: 'Understand the decision', body: 'Who needs to act, and what do they need to know?' },
      { number: '02', title: 'Make the workflow visible', body: 'Inputs, handoffs, constraints, and the places where context disappears.' },
      { number: '03', title: 'Build and test', body: 'A working surface, real states, and a way to question the result.' },
    ],
    endTitle: 'Have something in mind?', endBody: 'Tell me what you are trying to make work.', linkedin: 'LinkedIn', github: 'GitHub',
  },
  es: {
    title: 'Sobre mí', identity: 'Raúl Mermans / Málaga → Madrid',
    opening: 'Construyo donde negocio y tecnología tienen que entenderse.',
    introduction: 'Llegué al software desde el marketing, los clientes y el trabajo diario de sacar algo adelante. Ese contexto sigue marcando lo que construyo.',
    scroll: 'Seguir leyendo', storyLabel: 'El recorrido',
    storyTitle: 'Cambió el trabajo. Las preguntas siguieron.', storyIntro: 'Seis capítulos detrás de los proyectos de esta web.',
    chapters: [
      { place: 'Madrid', title: 'Aprender el lado del negocio.', context: 'IE University · BBA Marketing', body: 'Marketing y analítica me enseñaron a leer lo que hace la gente, lo que necesita un negocio y dónde dejan de coincidir.' },
      { place: 'Equipos', title: 'Aprender a entregar.', context: 'IE Marketing Lab', body: 'Trabajar con plazos, partners y otras personas me enseñó que una buena idea solo cuenta cuando sobrevive al traspaso.' },
      { place: 'Orlando', title: 'Mirar el servicio desde otro ángulo.', context: 'University of Central Florida · intercambio', body: 'Un semestre en otro mercado cambió mi manera de observar el servicio, el retail y las expectativas con las que llega cada persona.' },
      { place: 'Práctica independiente', title: 'Construir las herramientas.', context: 'Campañas · datos · interfaces', body: 'Empecé a convertir problemas recurrentes en prototipos funcionales: herramientas de campaña, productos de datos e interfaces que se podían usar.' },
      { place: 'Sistemas comerciales', title: 'Trabajar a escala.', context: 'CRM · lifecycle · programas de partners', body: 'Las grandes audiencias, la segmentación y las restricciones operativas hicieron imposible ignorar la distancia entre una demo prometedora y un sistema útil.' },
      { place: 'Ahora', title: 'Juntar las piezas.', context: 'Producto · IA · práctica visual', body: 'Trabajo desde el brief hasta el workflow, la interfaz y la prueba. Quiero que el resultado tenga sentido para quien tiene que usarlo.' },
    ],
    methodLabel: 'Cómo trabajo', methodTitle: 'Un sistema útil deja espacio para el criterio.',
    methodIntro: 'Empiezo por la decisión que alguien necesita tomar. Después mapeo el trabajo que la rodea, construyo la interfaz y compruebo qué ocurre cuando la respuesta es incompleta o incorrecta.',
    method: [
      { number: '01', title: 'Entender la decisión', body: '¿Quién tiene que actuar y qué necesita saber?' },
      { number: '02', title: 'Hacer visible el workflow', body: 'Inputs, traspasos, límites y los puntos donde se pierde el contexto.' },
      { number: '03', title: 'Construir y probar', body: 'Una superficie funcional, estados reales y una forma de cuestionar el resultado.' },
    ],
    endTitle: '¿Tienes algo entre manos?', endBody: 'Cuéntame qué estás intentando sacar adelante.', linkedin: 'LinkedIn', github: 'GitHub',
  },
} as const

export default function AboutPage() {
  const locale = getLocaleFromPath(usePathname())
  const page = copy[locale]
  const [activeChapter, setActiveChapter] = useState(0)
  const chapterList = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const chapters = chapterList.current?.querySelectorAll('[data-about-chapter]')
    if (!chapters?.length) return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
      if (visible.length) setActiveChapter(Number(visible[0].target.getAttribute('data-about-chapter')))
    }, { rootMargin: '-25% 0px -45% 0px' })
    chapters.forEach((chapter) => observer.observe(chapter))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className={styles.page}>
        <PortfolioIntro title={page.title} />

        <section className={styles.opening} aria-labelledby="about-opening-title">
          <div className={styles.openingGrid}>
            <figure className={styles.portrait}>
              <Image src="/images/about/profile.webp" alt={locale === 'es' ? 'Raúl Mermans con una cámara' : 'Raúl Mermans holding a camera'} fill priority sizes="(max-width: 900px) 100vw, 45vw" />
            </figure>
            <div className={styles.openingCopy}>
              <p className={styles.eyebrow}>{page.identity}</p>
              <h2 id="about-opening-title">{page.opening}</h2>
              <p>{page.introduction}</p>
              <a className={styles.textLink} href="#about-story">{page.scroll}</a>
            </div>
          </div>
        </section>

        <section className={styles.story} id="about-story" aria-labelledby="about-story-title">
          <div className={styles.container}>
            <div className={styles.storyGrid}>
              <div className={styles.storyAside}>
                <p className={styles.eyebrow}>{page.storyLabel}</p>
                <h2 id="about-story-title">{page.storyTitle}</h2>
                <p>{page.storyIntro}</p>
                <div className={styles.storyProgress} aria-hidden="true">
                  <span>{String(activeChapter + 1).padStart(2, '0')}</span>
                  <span className={styles.storyProgressTrack}><span style={{ width: `${((activeChapter + 1) / page.chapters.length) * 100}%` }} /></span>
                  <span>{String(page.chapters.length).padStart(2, '0')}</span>
                </div>
              </div>
              <ol className={styles.chapters} ref={chapterList}>
                {page.chapters.map((chapter, index) => (
                  <li key={chapter.place} className={styles.chapter} data-about-chapter={index}>
                    <div className={styles.chapterTop}><span>{String(index + 1).padStart(2, '0')}</span><span>{chapter.place}</span></div>
                    <h3>{chapter.title}</h3>
                    <p className={styles.chapterContext}>{chapter.context}</p>
                    <p className={styles.chapterBody}>{chapter.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className={styles.method} aria-labelledby="about-method-title">
          <div className={styles.container}>
            <p className={styles.eyebrow}>{page.methodLabel}</p>
            <div className={styles.methodIntro}>
              <h2 id="about-method-title">{page.methodTitle}</h2>
              <p>{page.methodIntro}</p>
            </div>
            <ol className={styles.methodList}>
              {page.method.map((step) => (
                <li key={step.number}>
                  <span className={styles.eyebrow}>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.contact} aria-labelledby="about-contact-title">
          <div className={styles.container}>
            <h2 id="about-contact-title">{page.endTitle}</h2>
            <p>{page.endBody}</p>
            <div className={styles.contactLinks}>
              <a className={styles.textLink} href={PUBLIC_CONTACT_MAILTO}>{PUBLIC_CONTACT_EMAIL}</a>
              <a className={styles.textLink} href="https://linkedin.com/in/raulmermans" target="_blank" rel="noopener noreferrer">{page.linkedin}</a>
              <a className={styles.textLink} href="https://github.com/RaulMermans" target="_blank" rel="noopener noreferrer">{page.github}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
