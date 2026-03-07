'use client'

import Link from 'next/link'
import Image from 'next/image'

const services = [
  {
    number: '00-1',
    title: 'AI Agents',
    titleShort: 'AI Agents',
    items: ['Custom AI Solutions', 'Automation Workflows', 'Prompt Engineering', 'AI Integration'],
    description: 'Intelligent automation systems that streamline workflows and unlock new possibilities. From custom GPT agents to full automation pipelines, I help brands reduce repetitive tasks by up to 80% while maintaining creative quality.',
    image: '/images/services/Services_AI_Agents.webp',
  },
  {
    number: '00-2',
    title: 'Web Development',
    titleShort: 'Web Dev',
    items: ['Custom Web Design', 'Frontend Development', 'Performance Optimization', 'CMS Integration'],
    description: 'Modern, performant web experiences crafted with precision. Every site is built with conversion in mind: fast load times, intuitive navigation, and seamless user journeys that turn visitors into clients.',
    image: '/images/services/Services_Web_Development.webp',
  },
  {
    number: '00-3',
    title: 'Photography',
    titleShort: 'Photography',
    items: ['Brand Photo', 'Visual Story', 'Editorial Shoot', 'Product Photo'],
    description: 'Visual narratives that capture the essence of brands and stories. Helping brands convert visual interest into lasting engagement through authentic imagery that connects with audiences on an emotional level.',
    image: '/images/services/Services_Photography.webp',
  },
  {
    number: '00-4',
    title: 'Creative Direction',
    titleShort: 'Creative Dir',
    items: ['Brand Strategy', 'Visual Identity', 'Art Direction', 'Campaign Concepts'],
    description: 'Strategic creative vision from concept to execution. I guide brands through the creative process, ensuring every touchpoint, from logo to campaign, tells a cohesive story that resonates with your target audience.',
    image: '/images/services/Services_Creative_Direction.webp',
  },
]

export default function Services() {
  return (
    <section id="services" className="services" aria-labelledby="services-title">
      <div className="services__header">
        <h2 id="services-title" className="services__title">
          Services
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

