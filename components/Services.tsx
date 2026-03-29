'use client'

import Link from 'next/link'
import Image from 'next/image'

const services = [
  {
    number: '00-1',
    title: 'AI Systems',
    titleShort: 'AI Systems',
    items: ['Agentic Workflows', 'AI Orchestration', 'Human Review Loops', 'Deployment Logic'],
    description: 'Applied AI systems that turn repetitive, judgment-heavy work into reliable execution. Agents, orchestration, and decision flows built for real teams, not demo theatre.',
    image: '/images/services/Services_AI_Agents.webp',
  },
  {
    number: '00-2',
    title: 'Automation Infrastructure',
    titleShort: 'Automation',
    items: ['CRM Automations', 'Content Pipelines', 'Lead Routing', 'Tool Integration'],
    description: 'Automation infrastructure for marketing, CRM, content, and internal operations. I connect tools, triggers, and data so execution scales with more visibility, consistency, and control.',
    image: '/images/services/Services_Web_Development.webp',
  },
  {
    number: '00-3',
    title: 'AI Prototypes & Tools',
    titleShort: 'Prototypes',
    items: ['Internal Tools', 'Operator Interfaces', 'Fast MVPs', 'Workflow Testing'],
    description: 'AI-powered prototypes and working tools that make a new operating model tangible fast. Useful when you need to test a workflow, validate a product direction, or ship a smarter internal surface.',
    image: '/images/services/Services_Creative_Direction.webp',
  },
  {
    number: '00-4',
    title: 'Brand & Creative Systems',
    titleShort: 'Brand Systems',
    items: ['Content Systems', 'Taste Guardrails', 'Creative Ops', 'Brand Logic'],
    description: 'Creative judgment still matters once AI enters the stack. I build brand and content systems that keep outputs coherent, on-brand, and commercially usable across fast-moving execution.',
    image: '/images/services/Services_Photography.webp',
  },
]

export default function Services() {
  return (
    <section id="services" className="services" aria-labelledby="services-title">
      <div className="services__header">
        <h2 id="services-title" className="services__title">
          What I Build
        </h2>
        <div className="services__line"></div>
      </div>

      <div className="services__grid">
        {services.map((service) => (
          <article key={service.number} className="service">
            <span className="service__number-small">{service.number}</span>
            <h3 className="service__title-small">{service.titleShort}</h3>

            <div className="service__expanded">
              <div className="service__header">
                <span className="service__number-large">{service.number}</span>
                <span className="service__title-large">{service.title}</span>
              </div>
              <div className="service__content">
                <div className="service__left">
                  <ul className="service__items">
                    {service.items.map((item) => (
                      <li key={item} className="service__item">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="service__footer">
                    <p className="service__desc">{service.description}</p>
                  </div>
                </div>
                <div className="service__image">
                  <Image
                    src={service.image}
                    alt={`${service.title} service illustration`}
                    width={300}
                    height={225}
                    quality={80}
                    className="service__image-img"
                    loading="lazy"
                    sizes="(max-width: 768px) 0px, 300px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      // Fallback: hide the image container if image fails to load
                      const container = target.closest('.service__image')
                      if (container) {
                        (container as HTMLElement).style.display = 'none'
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="service__corner">
              <div className="service__bracket"></div>
              <Link 
                href="/#contact" 
                className="btn btn--arrow service__cta"
                aria-label="Start a project - navigate to contact section"
              >
                Start a project
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
