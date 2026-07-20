import { getSiteCopy } from '@/data/site-copy'
import type { Locale } from '@/lib/i18n'
import styles from './CreativeInfrastructure.module.css'

type CreativeInfrastructureProps = {
  locale?: Locale
}

export default function CreativeInfrastructure({
  locale = 'en',
}: CreativeInfrastructureProps) {
  const copy = getSiteCopy(locale).home.buildingNow

  return (
    <section
      className={styles.section}
      id="building-now"
      data-home-section="building-now"
      aria-labelledby="building-now-title"
    >
      <div className={styles.inner}>
        <div>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 id="building-now-title" className={styles.title}>
            {copy.title}
          </h2>
        </div>
        <div>
          <p className={styles.body}>{copy.body}</p>
          <div className={styles.points}>
            {copy.points.map((point, index) => (
              <div key={point.title} className={styles.point}>
                <span className={styles.pointIndex}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={styles.pointCopy}>
                  <h3>{point.title}</h3>
                  <p className={styles.pointText}>{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
