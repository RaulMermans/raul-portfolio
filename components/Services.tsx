'use client'

import Link from 'next/link'

const services = [
  {
    number: '00-1',
    title: 'AI Agents',
    titleShort: 'AI Agents',
    items: ['Custom AI Solutions', 'Automation Workflows', 'Prompt Engineering', 'AI Integration'],
    description: 'Intelligent automation systems that streamline workflows and unlock new possibilities.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
  },
  {
    number: '00-2',
    title: 'Web Development',
    titleShort: 'Web Dev',
    items: ['Custom Web Design', 'Frontend Development', 'Performance Optimization', 'CMS Integration'],
    description: 'Modern, performant web experiences crafted with precision.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  },
  {
    number: '00-3',
    title: 'Photography',
    titleShort: 'Photography',
    items: ['Brand Photography', 'Visual Storytelling', 'Editorial Shoots', 'Product Photography'],
    description: 'Visual narratives that capture the essence of brands and stories.',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&q=80',
  },
  {
    number: '00-4',
    title: 'Creative Direction',
    titleShort: 'Creative Dir',
    items: ['Brand Strategy', 'Visual Identity', 'Art Direction', 'Campaign Concepts'],
    description: 'Strategic creative vision from concept to execution.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80',
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
                    <Link href="#contact" className="btn btn--arrow">
                      Start a project
                    </Link>
                  </div>
                </div>
                <div className="service__image">
                  <img src={service.image} alt="" loading="lazy" />
                </div>
              </div>
            </div>
            <div className="service__bracket"></div>
          </article>
        ))}
      </div>
    </section>
  )
}

