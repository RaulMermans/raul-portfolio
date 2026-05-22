'use client'

import Link from 'next/link'
import Image from 'next/image'
import { getSiteCopy } from '@/data/site-copy'
import { type Locale, localizePath } from '@/lib/i18n'

interface ServicesProps {
  locale?: Locale
}

export default function Services({ locale = 'en' }: ServicesProps) {
  const copy = getSiteCopy(locale).home.services
  const serviceImages = [
    '/images/services/Services_AI_Agents.webp',
    '/images/services/Services_Automation.webp',
    '/images/services/Services_Web_Development.webp',
    '/images/services/Services_Creative_Direction.webp',
    '/images/services/Services_Photography.webp',
  ]
  const services = copy.items.map((item, index) => ({
    ...item,
    image: serviceImages[index] ?? serviceImages[0],
  }))
  return (
    <section id="services" className="services" aria-labelledby="services-title">
      <div className="services__header">
        <h2 id="services-title" className="services__title">
          {copy.title}
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
                href={localizePath('/#contact', locale)} 
                className="btn btn--arrow service__cta"
                aria-label={locale === 'es' ? 'Empezar un proyecto - ir a contacto' : 'Start a project - navigate to contact section'}
              >
                {copy.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
