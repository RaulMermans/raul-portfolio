import Link from 'next/link'
import type { AppEntry } from '@/data/apps'
import AppVisual from './AppVisual'
import styles from './AppCard.module.css'

interface AppCardProps {
  app: AppEntry
  label?: string
  showVisual?: boolean
}

export default function AppCard({
  app,
  label = 'Select app',
  showVisual = true,
}: AppCardProps) {
  return (
    <Link
      href={app.href}
      className={styles.card}
    >
      <div>
        <div className={styles.header}>
          <span className={styles.label}>{label}</span>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{app.name}</h3>
          <p className={styles.stage}>{app.launchStage}</p>
          <p className={styles.description}>{app.cardDescription}</p>
        </div>

        {showVisual ? (
          <div className={styles.visual}>
            <AppVisual app={app} compact />
          </div>
        ) : null}
      </div>
    </Link>
  )
}
