import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import OverflowLanding from './OverflowLanding'
import { type Locale } from '@/lib/i18n'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

export function getOverflowMetadata(locale: Locale = 'en'): Metadata {
  const isSpanish = locale === 'es'

  return buildPageMetadata({
    title: isSpanish ? 'Caso de Estudio de Overflow' : 'Overflow App Case Study',
    description: isSpanish
      ? 'Caso de estudio de Overflow por Raúl Mermans: un tracker de entrenamiento sereno para iPhone centrado en rutinas, planificación semanal, registro rápido y progreso útil.'
      : 'Overflow case study by Raúl Mermans, a calm iPhone workout tracker focused on routines, scheduling, fast logging, and meaningful progress.',
    path: '/apps/overflow',
    locale,
    image: {
      url: '/images/apps/overflow/Today-tab.webp',
      alt: isSpanish
        ? 'App de seguimiento de entrenamiento Overflow por Raúl Mermans'
        : 'Overflow workout tracker app by Raúl Mermans',
    },
    keywords: isSpanish
      ? ['Overflow app', 'tracker de entrenamiento', 'app fitness para iPhone', 'caso de estudio']
      : ['Overflow app', 'workout tracker', 'iPhone fitness app', 'app case study'],
  })
}

interface OverflowPageViewProps {
  locale?: Locale
}

export function OverflowPageView({ locale = 'en' }: OverflowPageViewProps) {
  const isSpanish = locale === 'es'
  const route = locale === 'es' ? '/es/apps/overflow' : '/apps/overflow'

  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          '@id': `${siteConfig.url}/#overflow-app`,
          name: 'Overflow',
          description:
            isSpanish
              ? 'Overflow es un diario de entrenamiento sereno para iPhone centrado en rutinas, planificación semanal, registro rápido y progreso útil.'
              : 'Overflow is a calm performance journal for iPhone focused on routines, scheduling, fast logging, and meaningful progress.',
          url: absoluteRouteUrl(route),
          image: absoluteUrl('/images/apps/overflow/Today-tab.webp'),
          operatingSystem: 'iOS',
          applicationCategory: 'HealthApplication',
          softwareVersion: isSpanish ? 'Beta privada' : 'Private beta',
          featureList: isSpanish
            ? ['Registro de entrenamientos', 'Planificación de rutinas', 'Programación', 'Seguimiento del progreso']
            : ['Workout logging', 'Routine planning', 'Scheduling', 'Progress tracking'],
        }}
      />
      <OverflowLanding locale={locale} />
    </>
  )
}
