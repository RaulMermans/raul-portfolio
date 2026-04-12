import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { type Locale, localizePath } from '@/lib/i18n'
import styles from '@/components/ServicePage.module.css'

interface LabItem {
  title: string
  meta: string
  body: string
  href: string
  external?: boolean
}

const labCopy: Record<
  Locale,
  {
    eyebrow: string
    title: string
    lead: string
    items: LabItem[]
  }
> = {
  en: {
    eyebrow: 'Lab',
    title: 'Products, experiments, and side work live here.',
    lead:
      'This area keeps experimental links and product residue out of the main consulting path. If you want to browse prototypes, visuals, or external products, this is the right place.',
    items: [
      {
        title: 'Apps',
        meta: 'Internal tools · Product surfaces',
        body: 'Working app concepts and internal-tool thinking shaped around calmer interfaces and operational clarity.',
        href: '/apps',
      },
      {
        title: 'Visuals',
        meta: 'AI image systems · Visual experiments',
        body: 'A separate archive for visual exploration, image studies, and generative experimentation.',
        href: '/visuals',
      },
      {
        title: 'Overflow Support',
        meta: 'Product support',
        body: 'Support and legal links for the shipped Overflow app live here instead of in the main footer path.',
        href: '/overflow/support',
      },
      {
        title: 'External Products',
        meta: 'PromptBase · Gumroad',
        body: 'Commercial side products and external storefronts are grouped here so the main site stays focused on consulting.',
        href: 'https://raulmermans.gumroad.com/',
        external: true,
      },
    ],
  },
  es: {
    eyebrow: 'Lab',
    title: 'Aquí viven los productos, experimentos y trabajo lateral.',
    lead:
      'Esta zona mantiene los enlaces experimentales y el residuo de producto fuera del recorrido principal de consultoría. Si quieres explorar prototipos, visuales o productos externos, este es el lugar.',
    items: [
      {
        title: 'Apps',
        meta: 'Herramientas internas · Superficies de producto',
        body: 'Conceptos de app y pensamiento de herramienta interna alrededor de interfaces más fluidas y claridad operativa.',
        href: '/apps',
      },
      {
        title: 'Visuales',
        meta: 'Sistemas de imagen con IA · Experimentos visuales',
        body: 'Un archivo separado para exploración visual, estudios de imagen y experimentación generativa.',
        href: '/visuals',
      },
      {
        title: 'Overflow Support',
        meta: 'Soporte de producto',
        body: 'Los enlaces de soporte y legales de la app Overflow viven aquí en lugar de ocupar el footer principal.',
        href: '/overflow/support',
      },
      {
        title: 'Productos externos',
        meta: 'PromptBase · Gumroad',
        body: 'Los productos paralelos y tiendas externas se agrupan aquí para que la web principal siga centrada en consultoría.',
        href: 'https://raulmermans.gumroad.com/',
        external: true,
      },
    ],
  },
}

interface LabPageSharedProps {
  locale: Locale
}

export default function LabPageShared({ locale }: LabPageSharedProps) {
  const copy = labCopy[locale]

  return (
    <div className={styles.page}>
      <Header locale={locale} />
      <main id="main-content" className={styles.section}>
        <div className={styles.inner}>
          <header className={styles.hero}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1 className={styles.title}>{copy.title}</h1>
            <p className={styles.labLead}>{copy.lead}</p>
          </header>

          <section className={styles.experimentGrid} aria-label={copy.eyebrow}>
            {copy.items.map((item) => (
              <article key={item.title} className={styles.experimentCard}>
                <p className={styles.experimentMeta}>{item.meta}</p>
                <h2 className={styles.experimentTitle}>{item.title}</h2>
                <p className={styles.experimentBody}>{item.body}</p>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.experimentLink}>
                    {locale === 'es' ? 'Abrir enlace' : 'Open link'}
                    <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <Link href={localizePath(item.href, locale)} className={styles.experimentLink}>
                    {locale === 'es' ? 'Abrir página' : 'Open page'}
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </article>
            ))}
          </section>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  )
}
