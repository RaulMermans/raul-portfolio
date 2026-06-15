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
import BoldText from '@/components/case-studies/BoldText'
import {
  CommercialCaseStudyClosing,
  CommercialCaseStudyIntro,
  type CommercialCaseStudyContent,
} from '@/components/case-studies/CommercialCaseStudySections'
import { getCaseStudyContent } from '@/data/case-studies-content'

const commercialContent: CommercialCaseStudyContent = {
  snapshot: [
    { label: 'Type', value: 'AI campaign workflow' },
    { label: 'Use case', value: 'Creative operations, campaign consistency, controlled image iteration' },
    { label: 'Role', value: 'AI workflow design, creative direction, prompt structure, consistency guardrails' },
    { label: 'Stack', value: 'n8n, generative image API, reference conditioning, prompt schema, output versioning' },
    { label: 'Status', value: 'Campaign system prototype and case study' },
  ],
  businessContext:
    'Creative teams can generate one strong AI image quickly, but campaign work depends on continuity across many assets. This project explores how AI can support faster visual iteration while preserving lighting, scene logic, styling, and human creative review.',
  systemSummary:
    'The workflow separates constants from variables. A reference shot defines the visual world, while model and wardrobe inputs remain controlled variables. The system produces a small set of campaign-consistent variants that are reviewed by a human for realism, brand fit, and product readability.',
  systemItems: [
    { title: 'Inputs', description: 'Reference campaign shot, model reference, and wardrobe or product references.' },
    { title: 'Workflow', description: 'Lock scene anchors, define editable attributes, generate controlled variants, review outputs, and select final assets.' },
    { title: 'Processing logic', description: 'Prompt schema and reference conditioning keep lighting, environment, framing, and texture cues stable.' },
    { title: 'Output', description: 'Campaign-consistent image variants ready for creative selection and further art-direction review.' },
    { title: 'Guardrails', description: 'Continuity checks prioritize same-shoot feel over novelty; outputs fail if visual drift breaks the campaign world.' },
  ],
  whyItMatters:
    'AI image workflows become commercially useful when they are constrained. This system turns open-ended generation into a repeatable creative operation where the team controls what changes, what stays fixed, and how final quality is reviewed.',
  clientRelevance:
    'A client-facing version could help marketing, ecommerce, brand, or creative teams explore campaign routes, product styling, casting, and variant generation while keeping visual coherence and human approval in the loop.',
  ctaCopy:
    "If your team has a creative process, internal tool, campaign workflow, or brand system worth extending with AI, send a short brief and I'll help define the clearest system logic.",
}

const commercialContentEs: CommercialCaseStudyContent = {
  snapshot: [
    { label: 'Tipo', value: 'Flujo de campaña con IA' },
    { label: 'Uso', value: 'Operaciones creativas, consistencia de campaña e iteración visual controlada' },
    { label: 'Rol', value: 'Diseño de flujo con IA, dirección creativa, estructura de prompts y reglas de consistencia' },
    { label: 'Stack', value: 'n8n, API generativa de imagen, condicionamiento por referencia, esquema de prompt y versionado de resultados' },
    { label: 'Estado', value: 'Prototipo de sistema de campaña y caso de estudio' },
  ],
  businessContext:
    'Un equipo creativo puede generar una imagen potente con rapidez, pero una campaña necesita continuidad entre muchas piezas. Este proyecto explora cómo la IA puede acelerar la iteración visual sin perder iluminación, lógica de escena, estilo ni revisión humana.',
  systemSummary:
    'El flujo separa constantes y variables. Una imagen de referencia define el mundo visual, mientras que modelo y vestuario quedan como variables controladas. El sistema genera un grupo reducido de variantes coherentes con la campaña, revisadas por una persona según realismo, ajuste de marca y legibilidad del producto.',
  systemItems: [
    { title: 'Inputs', description: 'Imagen de referencia de campaña, referencia de modelo y referencias de vestuario o producto.' },
    { title: 'Flujo', description: 'Fijar anclajes de escena, definir atributos editables, generar variantes controladas, revisar resultados y seleccionar piezas finales.' },
    { title: 'Lógica de proceso', description: 'El esquema de prompt y el condicionamiento por referencia estabilizan luz, entorno, encuadre y textura.' },
    { title: 'Resultado', description: 'Variantes visuales coherentes con la campaña, listas para selección creativa y revisión de dirección de arte.' },
    { title: 'Límites', description: 'Las comprobaciones priorizan sensación de misma producción por encima de la novedad; si hay deriva visual, la salida falla.' },
  ],
  whyItMatters:
    'Los flujos de imagen con IA son útiles comercialmente cuando están acotados. Este sistema convierte una generación abierta en una operación creativa repetible donde el equipo controla qué cambia, qué permanece fijo y cómo se revisa la calidad final.',
  clientRelevance:
    'Una versión para cliente podría ayudar a equipos de marketing, ecommerce, marca o creatividad a explorar rutas de campaña, estilismo de producto, casting y generación de variantes manteniendo coherencia visual y aprobación humana.',
  ctaCopy:
    'Si tu equipo tiene un proceso creativo, herramienta interna, flujo de campaña o sistema de marca que merece ampliarse con IA, envía un brief breve y te ayudo a definir la lógica más clara.',
}

export default function AISportsCampaignPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const copy = getSiteCopy(locale).caseStudiesUi
  const content = getCaseStudyContent('ai-sports', locale)
  const commercial = locale === 'es' ? commercialContentEs : commercialContent

  useCaseStudySetup()

  if (!content) {
    notFound()
  }

  return (
    <>
      <Header locale={locale} transparent />

      <main id="main-content" className={`case-study-page-new case-study-page-new--${content.layoutVariant ?? 'default'}`}>
        {/* Hero Section */}
        <CaseStudyHero 
          hero={content.hero} 
          accentColor={content.accentColor}
          locale={locale}
            />

        {/* Meta Section */}
        {content.overview?.meta && (
          <CaseStudyMeta 
            meta={content.overview.meta} 
            accentColor={content.accentColor}
          />
              )}

        <CommercialCaseStudyIntro content={commercial} locale={locale} />

        {/* Introduction Section */}
        {content.overview && (
          <CaseStudySection 
            title={copy.overview} 
            variant="light"
            id="overview"
          >
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

        {/* Challenge Section */}
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
              {content.challenge.successCriteria && content.challenge.successCriteria.length > 0 && (
                <div className="case-study-challenge__criteria">
                  <h4 className="case-study-challenge__criteria-title">{copy.successCriteria}</h4>
                  <ul className="case-study-challenge__criteria-list">
                  {content.challenge.successCriteria.map((criterion, index) => (
                      <li key={index} className="case-study-challenge__criteria-item">
                      {criterion}
                      </li>
                  ))}
                  </ul>
                </div>
              )}
            </div>
          </CaseStudySection>
        )}

        {/* Full Bleed Images */}
        {content.fullBleedImages && 
         content.fullBleedImages.filter((img) => img?.src).length > 0 && (
          <CaseStudyImageContainer className="case-study-fullbleed">
            {content.fullBleedImages
              .filter((image) => image?.src)
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

        {/* Approach Section */}
        {content.approach && (
          <CaseStudySection 
            title={copy.approach} 
            variant="light"
            id="approach"
          >
            <div className="case-study-approach">
              <p className="case-study-approach__text">
                <BoldText text={content.approach.text} />
              </p>

                {content.approach.tools && content.approach.tools.length > 0 && (
                <div className="case-study-approach__tools">
                  <h4 className="case-study-approach__tools-title">{copy.tools}</h4>
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
                <div className="case-study-approach__system">
                  <h4 className="case-study-approach__system-title">
                    {content.approach.system.label}
                  </h4>
                  <div className="case-study-approach__system-grid">
                    {content.approach.system.items.map((item, index) => (
                      <div key={index} className="case-study-approach__system-item">
                        <h5 className="case-study-approach__system-item-title">
                          {item.title}
                        </h5>
                        <p className="case-study-approach__system-item-desc">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.approach.images && 
               content.approach.images.filter((img) => img?.src).length > 0 && (
                <CaseStudyImageContainer className="case-study-approach__images">
                  {content.approach.images
                    .filter((image) => image?.src)
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

        {/* Feature Image */}
        {content.featureImage?.src && (
          <CaseStudyImageContainer className="case-study-feature">
            <CaseStudyImage
              image={content.featureImage}
              aspectRatio="16/9"
              className="case-study-feature__image"
            />
          </CaseStudyImageContainer>
        )}

        {/* Gallery Section */}
        {content.gallery && content.gallery.rows && (
          <CaseStudyGallery 
            rows={content.gallery.rows}
            accentColor={content.accentColor}
                        />
        )}

        {/* Results Section */}
              {content.results && (
          <CaseStudySection 
            title={copy.results} 
            variant="dark"
            id="results"
          >
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

        {/* Next Case Study */}
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
