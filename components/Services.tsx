'use client'

import Link from 'next/link'

const services = [
  {
    number: '00-1',
    title: 'AI Agents',
    items: ['Custom AI Solutions', 'Automation Workflows', 'Prompt Engineering', 'AI Integration'],
    description:
      'I build intelligent automation systems that streamline workflows and unlock new possibilities. From custom agents to seamless integrations — helping your business work smarter, not harder.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
  },
  {
    number: '00-2',
    title: 'Web Development',
    items: ['Custom Web Design', 'Frontend Development', 'Performance Optimization', 'CMS Integration'],
    description:
      'I design and build modern, performant web experiences. Every site is crafted with precision — balancing aesthetics with functionality to keep users engaged and convert visitors into customers.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  },
  {
    number: '00-3',
    title: 'Photography',
    items: ['Brand Photography', 'Visual Storytelling', 'Editorial Shoots', 'Product Photography'],
    description:
      'Visual narratives that capture the essence of brands and stories. Each frame is intentional — creating imagery that resonates with your audience and elevates your brand presence.',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&q=80',
  },
  {
    number: '00-4',
    title: 'Creative Direction',
    items: ['Brand Strategy', 'Visual Identity', 'Art Direction', 'Campaign Concepts'],
    description:
      'Strategic creative vision that shapes brand identities from concept to execution. I guide projects with clarity — ensuring every touchpoint tells a cohesive, compelling story.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80',
  },
]

export default function Services() {
  return (
    <section id="services" className="services bg-cream flex flex-col min-h-screen relative" aria-labelledby="services-title">
      <div className="services__header text-center p-8 md:p-16 pt-16 md:pt-16">
        <h2 id="services-title" className="services__title font-display text-[clamp(3rem,10vw,6rem)] leading-[0.9] tracking-[-0.02em] uppercase text-ink mb-6">
          Services
        </h2>
        <div className="services__line w-full h-px bg-ink"></div>
      </div>

      <div className="services__grid flex flex-1 min-h-0 md:flex-row flex-col">
        {services.map((service) => (
          <article
            key={service.number}
            className="service flex-1 border-r border-ink last:border-r-0 md:border-b-0 border-b p-6 md:p-8 flex flex-col relative transition-[flex] duration-500 ease-out overflow-hidden group hover:flex-[3] md:[&:not(:hover)]:flex-[0.5]"
          >
            <span className="service__number-small font-mono text-xs tracking-[0.02em] text-ink-faint mb-3 transition-opacity duration-300 group-hover:opacity-0">
              {service.number}
            </span>
            <h3 className="service__title-small font-display text-[clamp(1.1rem,2vw,1.5rem)] uppercase tracking-[-0.01em] leading-[1.1] transition-opacity duration-300 group-hover:opacity-0">
              {service.title}
            </h3>

            <div className="service__expanded opacity-0 invisible absolute top-24 left-5 right-5 bottom-6 flex flex-col transition-[opacity,visibility] duration-400 md:opacity-100 md:visible md:relative md:top-0 md:left-0 md:right-0 md:bottom-auto group-hover:opacity-100 group-hover:visible">
              <div className="service__header flex items-baseline gap-6 mb-6">
                <span className="service__number-large font-display text-[clamp(1.8rem,3vw,2.5rem)] tracking-[-0.02em]">
                  {service.number}
                </span>
                <span className="service__title-large font-display text-[clamp(1.8rem,3vw,2.5rem)] uppercase tracking-[-0.01em] flex items-baseline gap-3 before:content-['//'] before:text-ink-muted before:mr-2">
                  {service.title}
                </span>
              </div>
              <div className="service__content flex gap-12 flex-1 min-h-0 md:flex-row flex-col">
                <div className="service__left flex-1 flex flex-col min-w-0">
                  <ul className="service__items list-none mb-auto">
                    {service.items.map((item) => (
                      <li key={item} className="service__item font-display text-[clamp(0.95rem,1.5vw,1.15rem)] uppercase tracking-[0.01em] leading-[1.6] text-ink py-2 before:content-['/'] before:mr-1 before:text-ink-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="service__footer mt-auto pt-6 border-t border-cream-dark">
                    <p className="service__desc font-body text-sm leading-[1.7] text-ink-soft max-w-[48ch] mb-6">
                      {service.description}
                    </p>
                    <Link
                      href="#contact"
                      className="service__cta inline-flex items-center gap-3 font-mono text-xs tracking-[0.1em] uppercase text-ink-soft px-5 py-3 border border-cream-dark bg-transparent min-h-[44px] transition-all duration-300 hover:text-accent hover:border-accent hover:bg-accent/4 after:content-['→'] after:transition-transform after:duration-300 hover:after:translate-x-1"
                    >
                      Start a project
                    </Link>
                  </div>
                </div>
                <div className="service__image w-[300px] flex-shrink-0 aspect-[4/3] bg-[#E8E4DF] overflow-hidden self-start md:w-auto md:max-w-[300px] w-full max-w-[320px]">
                  <img
                    src={service.image}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
            <div className="service__bracket absolute bottom-6 left-5 w-5 h-5 border-l border-b border-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block hidden" />
          </article>
        ))}
      </div>
    </section>
  )
}

