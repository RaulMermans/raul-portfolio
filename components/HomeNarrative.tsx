import type { Locale } from '@/lib/i18n'
import styles from './HomeNarrative.module.css'

const copy = {
  en: {
    methodEyebrow: 'How I work',
    methodTitle: 'A simple route from ambiguity to action.',
    steps: [
      ['Understand', 'Clarify the business, user, and cultural problem.'],
      ['Structure', 'Turn ambiguity into logic, workflows, and priorities.'],
      ['Build', 'Create the product, tool, interface, or brand expression.'],
      ['Validate', 'Test the result against evidence, users, and real constraints.'],
    ],
    pointEyebrow: 'Point of view',
    pointTitle: 'Useful is more interesting than impressive.',
    pointBody:
      'I am interested in the point where technology stops being impressive and starts becoming useful. That usually requires more than automation. It requires judgment, context, evidence, and an understanding of how people actually work.',
    experienceEyebrow: 'Experience and responsibility',
    experienceTitle: 'Built with real operating constraints in view.',
    experienceBody:
      'My day-to-day work spans CRM strategy, lifecycle marketing, segmentation, customer journeys, automation, AI adoption, and decision-support tools—often around a customer database of more than eight million users. It keeps the work close to the realities of adoption, accountability, and commercial impact.',
  },
  es: {
    methodEyebrow: 'Cómo trabajo',
    methodTitle: 'Una ruta simple de la ambigüedad a la acción.',
    steps: [
      ['Entender', 'Aclarar el problema de negocio, usuario y cultura.'],
      ['Estructurar', 'Convertir ambigüedad en lógica, workflows y prioridades.'],
      ['Construir', 'Crear el producto, herramienta, interfaz o expresión de marca.'],
      ['Validar', 'Probar el resultado con evidencia, usuarios y restricciones reales.'],
    ],
    pointEyebrow: 'Punto de vista',
    pointTitle: 'Lo útil es más interesante que lo impresionante.',
    pointBody:
      'Me interesa el punto en que la tecnología deja de impresionar y empieza a ser útil. Eso suele requerir más que automatización: requiere criterio, contexto, evidencia y entender cómo trabaja la gente de verdad.',
    experienceEyebrow: 'Experiencia y responsabilidad',
    experienceTitle: 'Construido pensando en restricciones operativas reales.',
    experienceBody:
      'Mi trabajo diario abarca estrategia CRM, lifecycle marketing, segmentación, customer journeys, automatización, adopción de IA y herramientas de apoyo a decisiones, a menudo alrededor de una base de datos de más de ocho millones de usuarios. Mantiene el trabajo cerca de la adopción, la responsabilidad y el impacto comercial.',
  },
} as const

export default function HomeNarrative({ locale = 'en' }: { locale?: Locale }) {
  const content = copy[locale]

  return (
    <>
      <section className={styles.method} aria-labelledby="method-title">
        <div className={styles.inner}>
          <header className={styles.heading}>
            <p>{content.methodEyebrow}</p>
            <h2 id="method-title">{content.methodTitle}</h2>
          </header>
          <ol className={styles.steps}>
            {content.steps.map(([title, body], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.point} aria-labelledby="point-title">
        <div className={styles.inner}>
          <p className={styles.eyebrow}>{content.pointEyebrow}</p>
          <h2 id="point-title">{content.pointTitle}</h2>
          <p className={styles.statement}>{content.pointBody}</p>
        </div>
      </section>

      <section className={styles.experience} aria-labelledby="experience-title">
        <div className={styles.inner}>
          <div className={styles.heading}>
            <p>{content.experienceEyebrow}</p>
            <h2 id="experience-title">{content.experienceTitle}</h2>
          </div>
          <p className={styles.experienceBody}>{content.experienceBody}</p>
        </div>
      </section>
    </>
  )
}
