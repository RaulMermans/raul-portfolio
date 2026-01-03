'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getRandomCaseStudy } from '@/data/case-studies'

interface NextCaseStudyProps {
  currentHref: string
}

export default function NextCaseStudy({ currentHref }: NextCaseStudyProps) {
  const [nextCaseStudy, setNextCaseStudy] = useState<{
    title: string
    href: string
    subtitle: string
    image: string
  } | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Get random next case study (excludes current)
    const random = getRandomCaseStudy(currentHref)
    setNextCaseStudy({
      title: random.title,
      href: random.href,
      subtitle: random.subtitle || 'Case Study',
      image: random.image,
    })
  }, [currentHref])

  if (!nextCaseStudy) {
    return null
  }

  return (
    <section className="next">
      <p className="next__label reveal">Next Project</p>
      <Link href={nextCaseStudy.href} className="next__link">
        <h2 className="next__title reveal reveal-delay-1">{nextCaseStudy.title}</h2>
        <p className="next__subtitle reveal reveal-delay-2">{nextCaseStudy.subtitle}</p>
        <div className="next__image reveal reveal-delay-3">
          <Image
            src={nextCaseStudy.image}
            alt={`${nextCaseStudy.title} preview`}
            fill
            quality={90}
            sizes="(max-width: 1200px) 100vw, 800px"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <span className="next__cta reveal reveal-delay-4">
          View Project <span className="next__cta-arrow">→</span>
        </span>
      </Link>
    </section>
  )
}

