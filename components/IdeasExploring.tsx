import type { Locale } from '@/lib/i18n'
import { getSiteCopy } from '@/data/site-copy'
import styles from './IdeasExploring.module.css'

export default function IdeasExploring({ locale = 'en' }: { locale?: Locale }) {
  const copy = getSiteCopy(locale).home.ideas

  return (
    <section id="ideas" className={styles.section} aria-labelledby="ideas-title">
      <div className={styles.inner}>
        <header className={styles.heading}>
          <p>{copy.eyebrow}</p>
          <h2 id="ideas-title">{copy.title}</h2>
          <span>{copy.intro}</span>
        </header>
        <ol className={styles.list}>
          {copy.items.map((item, index) => (
            <li key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.status}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
