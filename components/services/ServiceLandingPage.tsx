import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PUBLIC_CONTACT_MAILTO } from '@/lib/contact'
import { absoluteRouteUrl, siteConfig } from '@/lib/metadata'
import { localizePath } from '@/lib/i18n'
import { getCaseStudies } from '@/data/case-studies'
import type { ServiceLanding } from '@/data/service-landings'
import styles from './ServiceLandingPage.module.css'

const linkedinUrl = 'https://linkedin.com/in/raulmermans'

type ServiceLandingPageProps = {
  service: ServiceLanding
}

const titleLines = (first: string, second: string) => [first, second] as const

function getLabels(locale: ServiceLanding['locale']) {
  if (locale === 'es') {
    return {
      home: 'Inicio',
      services: 'Servicios',
      answerLabel: 'Respuesta directa',
      answerTitle: titleLines('¿Qué es este', 'servicio?'),
      problemsLabel: 'Contexto',
      problemsTitle: titleLines('Dónde suele romperse', 'el sistema'),
      deliverablesLabel: 'Entregables',
      deliverablesTitle: titleLines('Qué', 'construyo'),
      useCasesLabel: 'Aplicaciones',
      useCasesTitle: titleLines('Casos', 'de uso'),
      processLabel: 'Proceso',
      processTitle: titleLines('Del proceso', 'al sistema'),
      proofLabel: 'Prueba relacionada',
      proofTitle: titleLines('Sistemas', 'en contexto'),
      faqLabel: 'Preguntas frecuentes',
      faqTitle: titleLines('Antes', 'de empezar'),
      relatedCaseStudies: 'Ver casos relacionados',
      caseStudy: 'Caso de estudio',
    }
  }

  return {
    home: 'Home',
    services: 'Services',
    answerLabel: 'Direct answer',
    answerTitle: titleLines('What is this', 'service?'),
    problemsLabel: 'Context',
    problemsTitle: titleLines('Where the system', 'usually breaks'),
    deliverablesLabel: 'Deliverables',
    deliverablesTitle: titleLines('What I', 'build'),
    useCasesLabel: 'Applications',
    useCasesTitle: titleLines('Use', 'cases'),
    processLabel: 'Process',
    processTitle: titleLines('From process', 'to system'),
    proofLabel: 'Related proof',
    proofTitle: titleLines('Systems', 'in context'),
    faqLabel: 'Frequently asked questions',
    faqTitle: titleLines('Before we', 'start'),
    relatedCaseStudies: 'View Related Case Studies',
    caseStudy: 'Case Study',
  }
}

function ServiceSectionHeading({
  id,
  label,
  title,
}: {
  id: string
  label: string
  title: readonly [string, string]
}) {
  return (
    <div className={styles.sectionHeader}>
      <p className={styles.sectionLabel}>{label}</p>
      <h2 id={id} className={styles.sectionTitle} aria-label={title.join(' ')}>
        {title.map((line) => (
          <span key={line} aria-hidden="true">{line}</span>
        ))}
      </h2>
    </div>
  )
}

function getServiceSchema(service: ServiceLanding) {
  const isSpanish = service.locale === 'es'
  const labels = getLabels(service.locale)
  const url = absoluteRouteUrl(service.href)
  const homeUrl = absoluteRouteUrl(localizePath('/', service.locale))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
        name: siteConfig.name,
        url: siteConfig.url,
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: service.metaTitle,
        description: service.metaDescription,
        inLanguage: isSpanish ? 'es-ES' : 'en-US',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${siteConfig.url}/#website`,
        },
        about: {
          '@id': `${url}#service`,
        },
        author: {
          '@id': `${siteConfig.url}/#person`,
        },
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.title,
        description: service.answer,
        serviceType: service.title,
        url,
        provider: {
          '@id': `${siteConfig.url}/#person`,
        },
        areaServed: {
          '@type': 'Place',
          name: isSpanish ? 'España y remoto' : 'Spain and remote',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: labels.home,
            item: homeUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: labels.services,
            item: `${homeUrl}#services`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.title,
            item: url,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: service.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  }
}

export default function ServiceLandingPage({ service }: ServiceLandingPageProps) {
  const labels = getLabels(service.locale)
  const relatedStudies = getCaseStudies(service.locale).filter((study) =>
    service.relatedCaseStudies.includes(study.slug),
  )
  const emailHref = `${PUBLIC_CONTACT_MAILTO}?subject=${encodeURIComponent(
    service.locale === 'es'
      ? `Brief creativo: ${service.title}`
      : `Creative systems brief: ${service.title}`,
  )}`
  const schema = getServiceSchema(service)

  return (
    <>
      <Header locale={service.locale} />
      <main id="main-content" className={styles.page}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <section className={styles.hero} aria-labelledby="service-title">
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href={localizePath('/', service.locale)}>{labels.home}</Link>
              <span aria-hidden="true">/</span>
              <Link href={localizePath('/#services', service.locale)}>{labels.services}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{service.eyebrow}</span>
            </nav>

            <div className={styles.heroGrid}>
              <div>
                <p className={styles.eyebrow}>{service.eyebrow}</p>
                <h1 id="service-title" className={styles.title}>
                  {service.title}
                </h1>
              </div>

              <div className={styles.heroAside}>
                <p className={styles.description}>{service.description}</p>
                <div className={styles.tags} aria-label="Service focus">
                  {service.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.actions}>
                  <a href={emailHref} className={styles.button}>
                    {service.cta.emailLabel}
                    <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.button} ${styles.buttonSecondary}`}
                  >
                    {service.cta.linkedinLabel}
                    <span aria-hidden="true">↗</span>
                  </a>
                  <a href="#related-proof" className={styles.textLink}>
                    {labels.relatedCaseStudies}
                    <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="service-answer-title">
          <div className={styles.sectionInner}>
            <ServiceSectionHeading
              id="service-answer-title"
              label={labels.answerLabel}
              title={labels.answerTitle}
            />
            <p className={styles.answerText}>{service.answer}</p>
          </div>
        </section>

        {service.flagshipOffer && (
          <section className={`${styles.section} ${styles.sprintSection}`} aria-labelledby="sprint-title">
            <div className={styles.sectionInner}>
              <div className={styles.sprintHeader}>
                <p className={styles.sectionLabel}>{service.flagshipOffer.label}</p>
                <h2 id="sprint-title" className={styles.sprintTitle}>{service.flagshipOffer.title}</h2>
              </div>
              <div className={styles.sprintGrid}>
                <div>
                  <p>{service.flagshipOffer.audience}</p>
                  <p className={styles.sprintDuration}>{service.flagshipOffer.duration}</p>
                </div>
                <ul>
                  {service.flagshipOffer.included.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className={styles.sprintOutcome}>
                <p>{service.flagshipOffer.outcome}</p>
                <span>{service.flagshipOffer.followUp}</span>
                <a href={emailHref} className={styles.button}>
                  {service.flagshipOffer.ctaLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </section>
        )}

        <section className={styles.section} aria-labelledby="service-problems-title">
          <div className={styles.sectionInner}>
            <ServiceSectionHeading
              id="service-problems-title"
              label={labels.problemsLabel}
              title={labels.problemsTitle}
            />
            <div className={styles.cardGrid}>
              {service.problems.map((problem) => (
                <article key={problem.title} className={styles.card}>
                  <h3>{problem.title}</h3>
                  <p>{problem.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="service-deliverables-title">
          <div className={styles.sectionInner}>
            <ServiceSectionHeading
              id="service-deliverables-title"
              label={labels.deliverablesLabel}
              title={labels.deliverablesTitle}
            />
            <div className={styles.cardGrid}>
              {service.deliverables.map((deliverable) => (
                <article key={deliverable.title} className={styles.card}>
                  <h3>{deliverable.title}</h3>
                  <p>{deliverable.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="service-use-cases-title">
          <div className={styles.sectionInner}>
            <ServiceSectionHeading
              id="service-use-cases-title"
              label={labels.useCasesLabel}
              title={labels.useCasesTitle}
            />
            <div className={styles.useCaseGrid}>
              {service.useCases.map((useCase) => (
                <div key={useCase} className={styles.useCase}>
                  {useCase}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="service-process-title">
          <div className={styles.sectionInner}>
            <ServiceSectionHeading
              id="service-process-title"
              label={labels.processLabel}
              title={labels.processTitle}
            />
            <div className={styles.processGrid}>
              {service.process.map((item) => (
                <article key={item.step} className={styles.processCard}>
                  <span className={styles.step}>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="related-proof"
          className={styles.section}
          aria-labelledby="service-proof-title"
        >
          <div className={styles.sectionInner}>
            <ServiceSectionHeading
              id="service-proof-title"
              label={labels.proofLabel}
              title={labels.proofTitle}
            />
            <div className={styles.proofGrid}>
              {relatedStudies.map((study) => (
                <Link key={study.slug} href={study.href} className={styles.proofCard}>
                  <span className={styles.proofMeta}>
                    {labels.caseStudy} / {study.subtitle}
                  </span>
                  <div>
                    <h3>{study.title}</h3>
                    <span className={styles.proofDescription}>{study.description}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="service-faq-title">
          <div className={styles.sectionInner}>
            <ServiceSectionHeading
              id="service-faq-title"
              label={labels.faqLabel}
              title={labels.faqTitle}
            />
            <div className={styles.faqList}>
              {service.faqs.map((faq) => (
                <article key={faq.question} className={styles.faqItem}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection} aria-labelledby="service-cta-title">
          <div className={styles.ctaInner}>
            <h2 id="service-cta-title" className={styles.ctaTitle}>
              {service.cta.title}
            </h2>
            <div>
              <p className={styles.ctaBody}>{service.cta.body}</p>
              <div className={styles.actions}>
                <a href={emailHref} className={styles.button}>
                  {service.cta.emailLabel}
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.button} ${styles.buttonSecondary}`}
                >
                  {service.cta.linkedinLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={service.locale} />
    </>
  )
}
