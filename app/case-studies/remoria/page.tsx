'use client'

import { useCaseStudySetup } from '@/hooks'
import { notFound, usePathname } from 'next/navigation'
import { getSiteCopy } from '@/data/site-copy'
import { getLocaleFromPath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyHero from '@/components/case-studies/CaseStudyHero'
import CaseStudyMeta from '@/components/case-studies/CaseStudyMeta'
import CaseStudySection from '@/components/case-studies/CaseStudySection'
import CaseStudyImage from '@/components/case-studies/CaseStudyImage'
import CaseStudyImageContainer from '@/components/case-studies/CaseStudyImageContainer'
import CaseStudyGallery from '@/components/case-studies/CaseStudyGallery'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import RemoriaBrandSystem from '@/components/case-studies/RemoriaBrandSystem'
import BoldText from '@/components/case-studies/BoldText'
import {
  CommercialCaseStudyClosing,
  CommercialCaseStudyIntro,
  type CommercialCaseStudyContent,
} from '@/components/case-studies/CommercialCaseStudySections'
import { getCaseStudyContent } from '@/data/case-studies-content'
import '@/styles/remoria-brand-system.css'

const commercialContent: CommercialCaseStudyContent = {
  snapshot: [
    { label: 'Type', value: 'Luxury brand system' },
    {
      label: 'Use case',
      value:
        'Brand identity, tone of voice, packaging concept, creative rules, product storytelling',
    },
    {
      label: 'Role',
      value:
        'Brand system design, creative direction, visual identity, verbal worldbuilding',
    },
    { label: 'Stack', value: 'Illustrator, Photoshop, Figma, Pinterest' },
    { label: 'Status', value: 'Brand system case study' },
  ],
  businessContext:
    'Brand and creative teams often need more than a logo or moodboard: they need rules that can guide future content, campaigns, packaging, and AI-assisted outputs. Remoria explores how a luxury identity can become an operating system for coherence.',
  systemSummary:
    'The project defines a narrative world, visual language, tone of voice, palette, typography, and application logic around restraint and memory. The system gives future fragrances and creative outputs a shared set of rules rather than relying on isolated aesthetic choices.',
  systemItems: [
    {
      title: 'Audience profile',
      description:
        'For culturally aware fragrance buyers drawn to intimacy, materiality, memory, and understated luxury rather than spectacle.',
    },
    {
      title: 'Positioning',
      description:
        'A poetic Mediterranean fragrance house positioned between classical permanence and contemporary restraint.',
    },
    {
      title: 'Competitive codes',
      description:
        'Stone, patina, serif authority, tactile packaging, sparse copy, and quiet editorial composition signal the category without imitation.',
    },
    {
      title: 'Brand rules',
      description:
        'Restraint, tactility, timeless structure, and lyrical precision remain constant across every application.',
    },
    {
      title: 'Launch touchpoints',
      description:
        'Packaging, stationery, digital hero, campaign imagery, and product storytelling introduce one coherent world.',
    },
    {
      title: 'Product architecture',
      description:
        'Future fragrances can change place, emotion, notes, and narrative chapter while staying inside the same house system.',
    },
  ],
  whyItMatters:
    'Brand systems matter when creative output needs to scale without becoming generic. This case translates strategy into reusable rules, which is especially relevant when AI-assisted content or campaign production needs strong human judgment and brand coherence.',
  clientRelevance:
    'A similar system could help brand, creative, content, or ecommerce teams define tone, messaging, visual criteria, and review rules that keep campaigns and AI-assisted outputs aligned with the brand.',
  ctaCopy:
    "If your team has a creative process, internal tool, campaign workflow, or brand system worth extending with AI, send a short brief and I'll help define the clearest system logic.",
}

const commercialContentEs: CommercialCaseStudyContent = {
  snapshot: [
    { label: 'Tipo', value: 'Sistema de marca premium' },
    {
      label: 'Uso',
      value:
        'Identidad, tono de voz, concepto de packaging, reglas creativas y relato de producto',
    },
    {
      label: 'Rol',
      value:
        'Diseño de sistema de marca, dirección creativa, identidad visual y mundo verbal',
    },
    { label: 'Stack', value: 'Illustrator, Photoshop, Figma, Pinterest' },
    { label: 'Estado', value: 'Caso de estudio de sistema de marca' },
  ],
  businessContext:
    'Los equipos de marca y creatividad suelen necesitar algo más que un logo o un moodboard: necesitan reglas que guíen contenido, campañas, packaging y resultados asistidos por IA. Remoria explora cómo una identidad premium puede convertirse en un sistema operativo de coherencia.',
  systemSummary:
    'El proyecto define un mundo narrativo, lenguaje visual, tono de voz, paleta, tipografía y lógica de aplicación alrededor de la contención y la memoria. El sistema da a futuras fragancias y piezas creativas un conjunto compartido de reglas, no solo decisiones estéticas aisladas.',
  systemItems: [
    {
      title: 'Perfil de audiencia',
      description:
        'Para compradores culturalmente sensibles atraídos por intimidad, materialidad, memoria y lujo contenido.',
    },
    {
      title: 'Posicionamiento',
      description:
        'Una casa poética de fragancias mediterráneas entre permanencia clásica y contención contemporánea.',
    },
    {
      title: 'Códigos competitivos',
      description:
        'Piedra, pátina, serif, packaging táctil, copy escaso y composición editorial sitúan la categoría sin imitarla.',
    },
    {
      title: 'Reglas de marca',
      description:
        'Contención, tactilidad, estructura atemporal y precisión lírica permanecen constantes.',
    },
    {
      title: 'Puntos de lanzamiento',
      description:
        'Packaging, papelería, hero digital, imágenes de campaña y relato presentan un único mundo coherente.',
    },
    {
      title: 'Arquitectura de producto',
      description:
        'Futuras fragancias pueden variar lugar, emoción, notas y capítulo narrativo dentro del mismo sistema.',
    },
  ],
  whyItMatters:
    'Un sistema de marca importa cuando la producción creativa necesita escalar sin volverse genérica. Este caso convierte estrategia en reglas reutilizables, algo especialmente útil cuando el contenido asistido por IA o la producción de campañas necesitan criterio humano y coherencia de marca.',
  clientRelevance:
    'Un sistema similar podría ayudar a equipos de marca, creatividad, contenido o ecommerce a definir tono, mensajes, criterios visuales y reglas de revisión para mantener campañas y resultados asistidos por IA alineados con la marca.',
  ctaCopy:
    'Si tu equipo tiene un proceso creativo, herramienta interna, flujo de campaña o sistema de marca que merece ampliarse con IA, envía un brief breve y te ayudo a definir la lógica más clara.',
}

export default function RemoriaPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const copy = getSiteCopy(locale).caseStudiesUi
  const content = getCaseStudyContent('remoria', locale)
  const commercial = locale === 'es' ? commercialContentEs : commercialContent

  useCaseStudySetup()

  if (!content) {
    notFound()
  }

  return (
    <>
      <Header locale={locale} />

      <main
        id="main-content"
        className={`case-study-page-new case-study-page-new--${content.layoutVariant ?? 'default'}`}
      >
        <CaseStudyHero
          hero={content.hero}
          accentColor={content.accentColor}
          locale={locale}
        />

        {content.overview?.meta && (
          <CaseStudyMeta
            meta={content.overview.meta}
            accentColor={content.accentColor}
          />
        )}

        <CommercialCaseStudyIntro content={commercial} locale={locale} />

        {content.overview && (
          <CaseStudySection title={copy.overview} variant="light" id="overview">
            <div className="case-study-intro">
              <p className="case-study-intro__text">
                <BoldText text={content.overview.description} />
              </p>
              {content.overview.intentQuote && (
                <blockquote className="case-study-intro__quote">
                  {content.overview.intentQuote}
                </blockquote>
              )}
            </div>
          </CaseStudySection>
        )}

        <CaseStudySection
          title={locale === 'es' ? 'Mapa de posicionamiento' : 'Positioning map'}
          variant="light"
          id="positioning"
        >
          <div className="remoria-positioning-map">
            <div
              className="remoria-positioning-map__chart"
              aria-label={
                locale === 'es'
                  ? 'Remoria se posiciona en contención y permanencia'
                  : 'Remoria is positioned in restraint and permanence'
              }
            >
              <span className="remoria-positioning-map__axis remoria-positioning-map__axis--x">
                {locale === 'es' ? 'Espectáculo' : 'Spectacle'}
                <b aria-hidden="true" />
                {locale === 'es' ? 'Contención' : 'Restraint'}
              </span>
              <span className="remoria-positioning-map__axis remoria-positioning-map__axis--y">
                {locale === 'es' ? 'Tendencia' : 'Trend'}
                <b aria-hidden="true" />
                {locale === 'es' ? 'Permanencia' : 'Permanence'}
              </span>
              <span className="remoria-positioning-map__line remoria-positioning-map__line--x" aria-hidden="true" />
              <span className="remoria-positioning-map__line remoria-positioning-map__line--y" aria-hidden="true" />
              <strong className="remoria-positioning-map__point">Remoria</strong>
            </div>
            <p>
              {locale === 'es'
                ? 'Remoria evita los códigos de lujo ruidosos. El sistema se construye alrededor de memoria, contención, referencias clásicas y reconocimiento sensorial a largo plazo.'
                : 'Remoria avoids loud luxury codes. The system is designed around memory, restraint, classical reference, and long-term sensory recognition.'}
            </p>
          </div>
        </CaseStudySection>

        {content.challenge && (
          <CaseStudySection
            title={copy.challenge}
            variant="dark"
            id="challenge"
          >
            <div className="case-study-challenge">
              <h3 className="case-study-challenge__quote">
                {content.challenge.quote}
              </h3>
              <p className="case-study-challenge__text">
                <BoldText text={content.challenge.context} />
              </p>
              {content.challenge.successCriteria &&
                content.challenge.successCriteria.length > 0 && (
                  <div className="case-study-challenge__criteria">
                    <h4 className="case-study-challenge__criteria-title">
                      {copy.successCriteria}
                    </h4>
                    <ul className="case-study-challenge__criteria-list">
                      {content.challenge.successCriteria.map(
                        (criterion, index) => (
                          <li
                            key={index}
                            className="case-study-challenge__criteria-item"
                          >
                            {criterion}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>
          </CaseStudySection>
        )}

        {content.fullBleedImages &&
          content.fullBleedImages.filter(img => img?.src).length > 0 && (
            <CaseStudyImageContainer className="case-study-fullbleed">
              {content.fullBleedImages
                .filter(image => image?.src)
                .map((image, index) => (
                  <CaseStudyImage
                    key={index}
                    image={image}
                    aspectRatio="16/9"
                    className="case-study-fullbleed__image"
                  />
                ))}
            </CaseStudyImageContainer>
          )}

        {content.approach && (
          <CaseStudySection title={copy.approach} variant="light" id="approach">
            <div className="case-study-approach">
              <p className="case-study-approach__text">
                <BoldText text={content.approach.text} />
              </p>

              {content.approach.tools && content.approach.tools.length > 0 && (
                <div className="case-study-approach__tools">
                  <h4 className="case-study-approach__tools-title">
                    {copy.tools}
                  </h4>
                  <div className="case-study-approach__tools-list">
                    {content.approach.tools.map((tool, index) => (
                      <span key={index} className="case-study-approach__tool">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {content.approach.system && (
                <RemoriaBrandSystem
                  items={content.approach.system.items}
                  label={content.approach.system.label}
                />
              )}

              {content.approach.images &&
                content.approach.images.filter(img => img?.src).length > 0 && (
                  <CaseStudyImageContainer className="case-study-approach__images">
                    {content.approach.images
                      .filter(image => image?.src)
                      .map((image, index) => (
                        <CaseStudyImage
                          key={index}
                          image={image}
                          aspectRatio="4/3"
                          className="case-study-approach__image"
                        />
                      ))}
                  </CaseStudyImageContainer>
                )}
            </div>
          </CaseStudySection>
        )}

        {content.featureImage?.src && (
          <CaseStudyImageContainer className="case-study-feature">
            <CaseStudyImage
              image={content.featureImage}
              aspectRatio="16/9"
              className="case-study-feature__image"
            />
          </CaseStudyImageContainer>
        )}

        {content.gallery && content.gallery.rows && (
          <CaseStudyGallery
            rows={content.gallery.rows}
            accentColor={content.accentColor}
            locale={locale}
          />
        )}

        {content.results && (
          <CaseStudySection title={copy.results} variant="dark" id="results">
            <div className="case-study-results">
              <p className="case-study-results__text">
                <BoldText text={content.results.text} />
              </p>
              <blockquote className="case-study-results__quote">
                {content.results.takeawayQuote}
              </blockquote>
            </div>
          </CaseStudySection>
        )}

        <CommercialCaseStudyClosing content={commercial} locale={locale} />

        <CaseStudyNext
          currentHref={pathname}
          accentColor={content.accentColor}
          locale={locale}
        />
      </main>

      <Footer locale={locale} />
    </>
  )
}
