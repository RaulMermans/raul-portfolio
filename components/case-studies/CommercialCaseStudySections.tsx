import Link from 'next/link'

type SnapshotItem = {
  label: string
  value: string
}

type ProjectLink = {
  label: string
  href: string
  external?: boolean
}

type SystemItem = {
  title: string
  description: string
}

export type CommercialCaseStudyContent = {
  snapshot: SnapshotItem[]
  links?: ProjectLink[]
  businessContext: string
  systemSummary: string
  systemItems: SystemItem[]
  whyItMatters: string
  clientRelevance: string
  ctaCopy: string
}

function ProjectLinks({ links }: { links?: ProjectLink[] }) {
  if (!links?.length) return null

  return (
    <div className="data-brief-actions">
      {links.map((link) => {
        if (link.external) {
          return (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="data-brief-button">
              {link.label}
            </a>
          )
        }

        return (
          <Link key={link.href} href={link.href} className="data-brief-button">
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}

export function CommercialCaseStudyIntro({ content }: { content: CommercialCaseStudyContent }) {
  return (
    <>
      <section
        id="project-snapshot"
        className="data-brief-section data-brief-section--light"
        aria-labelledby="project-snapshot-heading"
      >
        <div className="data-brief-section__container">
          <div className="data-brief-refresh-heading">
            <p className="data-brief-eyebrow">Project Snapshot</p>
            <h2 id="project-snapshot-heading">What the system is</h2>
          </div>
          <div className="data-brief-result-grid">
            {content.snapshot.map((item) => (
              <article key={item.label}>
                <h3>{item.label}</h3>
                <p>{item.value}</p>
              </article>
            ))}
          </div>
          <ProjectLinks links={content.links} />
        </div>
      </section>

      <section
        id="business-context"
        className="data-brief-section data-brief-section--cream"
        aria-labelledby="business-context-heading"
      >
        <div className="data-brief-section__container">
          <div className="data-brief-refresh-heading">
            <p className="data-brief-eyebrow">Business Context</p>
            <h2 id="business-context-heading">The workflow problem behind the project</h2>
            <p>{content.businessContext}</p>
          </div>
        </div>
      </section>

      <section
        id="system-solution"
        className="data-brief-section data-brief-section--light"
        aria-labelledby="system-solution-heading"
      >
        <div className="data-brief-section__container">
          <div className="data-brief-refresh-heading">
            <p className="data-brief-eyebrow">System / Solution</p>
            <h2 id="system-solution-heading">How the workflow is bounded</h2>
            <p>{content.systemSummary}</p>
          </div>
          <div className="data-brief-card-grid data-brief-card-grid--architecture">
            {content.systemItems.map((item) => (
              <article key={item.title} className="data-brief-card data-brief-card--architecture">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function CommercialCaseStudyClosing({ content }: { content: CommercialCaseStudyContent }) {
  return (
    <>
      <section
        id="why-it-matters"
        className="data-brief-section data-brief-section--cream"
        aria-labelledby="why-it-matters-heading"
      >
        <div className="data-brief-section__container">
          <div className="data-brief-refresh-heading">
            <p className="data-brief-eyebrow">Why It Matters</p>
            <h2 id="why-it-matters-heading">Reliability beats novelty</h2>
            <p>{content.whyItMatters}</p>
          </div>
        </div>
      </section>

      <section
        id="client-relevance"
        className="data-brief-section data-brief-section--light"
        aria-labelledby="client-relevance-heading"
      >
        <div className="data-brief-section__container">
          <div className="data-brief-refresh-heading">
            <p className="data-brief-eyebrow">Client Relevance</p>
            <h2 id="client-relevance-heading">Where this becomes useful</h2>
            <p>{content.clientRelevance}</p>
          </div>
        </div>
      </section>

      <section
        id="similar-system"
        className="data-brief-section data-brief-section--dark data-brief-section--result"
        aria-labelledby="similar-system-heading"
      >
        <div className="data-brief-section__container">
          <div className="data-brief-refresh-heading">
            <p className="data-brief-eyebrow">Discuss a Similar System</p>
            <h2 id="similar-system-heading">Have a workflow worth systemizing?</h2>
            <p>{content.ctaCopy}</p>
          </div>
          <div className="data-brief-actions">
            <Link href="/en/#contact" className="data-brief-button data-brief-button--primary">
              Start Project Brief
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
