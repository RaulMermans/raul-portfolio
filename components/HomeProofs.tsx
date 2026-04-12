import Image from 'next/image'
import Link from 'next/link'
import { getHomeProofs } from '@/data/home-proofs'
import { getSiteCopy } from '@/data/site-copy'
import { type Locale } from '@/lib/i18n'
import styles from './HomeSections.module.css'

interface HomeProofsProps {
  locale?: Locale
}

export default function HomeProofs({ locale = 'en' }: HomeProofsProps) {
  const copy = getSiteCopy(locale).home.proofs
  const proofs = getHomeProofs(locale)

  return (
    <section className={styles.section} data-home-section="proof" aria-labelledby="proofs-title">
      <div className={styles.inner}>
        <div className={`${styles.header} reveal`}>
          <p className="label">{copy.label}</p>
          <h2 id="proofs-title" className={styles.headerTitle}>
            {copy.title}
          </h2>
          <p className={styles.headerBody}>{copy.subtitle}</p>
        </div>

        <div className={styles.proofGrid}>
          {proofs.map((proof, index) => (
            <article
              key={proof.slug}
              className={`${styles.proofCard} reveal ${index === 1 ? 'reveal-delay-1' : ''}`}
            >
              <div className={styles.proofMedia}>
                <Image
                  src={proof.image}
                  alt={proof.projectName}
                  fill
                  className={styles.proofImage}
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>

              <div className={styles.proofContent}>
                <div className={styles.proofProject}>
                  <p className={styles.proofType}>
                    {copy.projectTypeLabel} · {proof.projectType}
                  </p>
                  <h3 className={styles.proofTitle}>{proof.projectName}</h3>
                </div>

                <dl className={styles.proofMeta}>
                  <div className={styles.proofMetaRow}>
                    <dt>{copy.problemLabel}</dt>
                    <dd>{proof.problem}</dd>
                  </div>
                  <div className={styles.proofMetaRow}>
                    <dt>{copy.builtLabel}</dt>
                    <dd>{proof.built}</dd>
                  </div>
                  <div className={styles.proofMetaRow}>
                    <dt>{copy.resultLabel}</dt>
                    <dd>{proof.result}</dd>
                  </div>
                </dl>

                <Link href={proof.href} className={styles.proofLink}>
                  {copy.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
