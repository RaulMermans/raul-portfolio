// =============================================
// CASE STUDY APPROACH COMPONENT
// =============================================

import Image from 'next/image'
import type { ApproachSection } from '@/types/case-study'

interface CaseStudyApproachProps {
  approach: ApproachSection
}

export default function CaseStudyApproach({ approach }: CaseStudyApproachProps) {
  // Parse text to handle **bold** markers
  const parseText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  return (
    <section className="section section--light">
      <div className="section__inner">
        <p className="section__label reveal">The Approach</p>

        {/* Row 1: Text + Tools */}
        <div className="approach__header reveal reveal-delay-1">
          <p className="approach__text">{parseText(approach.text)}</p>

          <div className="approach__tools">
            <p className="approach__tools-label">Stack</p>
            <div className="approach__tools-list">
              {approach.tools.map((tool, index) => (
                <span
                  key={index}
                  className="approach__tool"
                  data-gold={tool.variant === 'gold'}
                >
                  {tool.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: System */}
        {approach.system && (
          <div className="approach__system reveal reveal-delay-2">
            <p className="approach__system-label">{approach.system.label}</p>
            <div className="approach__system-grid">
              {approach.system.items.map((item, index) => (
                <div key={index} className="approach__system-item">
                  <p
                    className="approach__system-title"
                    data-gold={item.variant === 'gold'}
                  >
                    {item.title}
                  </p>
                  <p className="approach__system-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Row 3: Iteration */}
        {approach.iteration && (
          <div className="approach__iteration reveal reveal-delay-3">
            <div className="iteration">
              <p className="iteration__label">{approach.iteration.label}</p>
              <div className="iteration__grid">
                {approach.iteration.items.map((item, index) => (
                  <div key={index} className="iteration__item">
                    <p className="iteration__title">{item.title}</p>
                    <p className="iteration__text">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Row 4: Deliverables */}
        {approach.deliverables && (
          <div className="deliverables reveal">
            <p className="deliverables__label">{approach.deliverables.label}</p>
            <div className="deliverables__grid">
              {approach.deliverables.items.map((item, index) => (
                <div key={index} className="deliverables__item">
                  <span className="deliverables__name">{item.name}</span>
                  <span className="deliverables__why">{item.why}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Row 5: Modules (Aesthetic + Voice) */}
        {approach.modules && (
          <div className="approach__modules reveal reveal-delay-3">
            {approach.modules.aesthetic && (
              <div className="aesthetic">
                <p className="aesthetic__header">{approach.modules.aesthetic.header}</p>
                {approach.modules.aesthetic.items.map((item, index) => (
                  <div key={index} className="aesthetic__item">
                    <span className="aesthetic__label">{item.label}</span>
                    <span className="aesthetic__value">
                      {item.colorSwatch ? (
                        <span className="aesthetic__color">
                          <span
                            className="aesthetic__swatch"
                            style={{ background: item.colorSwatch }}
                          ></span>
                          {item.value}
                        </span>
                      ) : (
                        item.value
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {approach.modules.voice && (
              <div className="voice">
                <p className="voice__label">{approach.modules.voice.label}</p>
                <div className="voice__traits">
                  {approach.modules.voice.traits.map((trait, index) => (
                    <span key={index} className="voice__trait">
                      {trait.name}
                    </span>
                  ))}
                </div>
                <p className="voice__signature">{approach.modules.voice.signature}</p>
              </div>
            )}
          </div>
        )}

        {/* Row 6: Obsession/Detail */}
        {approach.obsession && (
          <div className="obsession reveal">
            <p className="obsession__label">{approach.obsession.label}</p>
            <p className="obsession__text">{approach.obsession.text}</p>
          </div>
        )}

        {/* Images */}
        {approach.images && approach.images.length > 0 && (
          <div className="approach__images">
            {approach.images.map((image, index) => (
              <div
                key={index}
                className={`approach__image reveal ${index > 0 ? `reveal-delay-${index}` : ''}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  quality={image.quality ?? 90}
                  sizes={image.sizes ?? '(max-width: 900px) 100vw, 50vw'}
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

