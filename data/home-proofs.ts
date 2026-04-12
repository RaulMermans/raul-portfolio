import type { Locale } from '@/lib/i18n'
import { localizePath } from '@/lib/i18n'

interface HomeProof {
  slug: 'ai-sports' | 'remoria'
  projectName: string
  projectType: string
  image: string
  problem: string
  built: string
  result: string
}

const homeProofs: Record<Locale, HomeProof[]> = {
  en: [
    {
      slug: 'ai-sports',
      projectName: 'AI Sports Campaign',
      projectType: 'Sports marketing campaign system',
      image: '/images/case-studies/ai-sports/thumb/thumb.webp',
      problem:
        'Generative outputs looked strong in isolation, but they broke campaign consistency as soon as casting or wardrobe changed.',
      built:
        'A custom n8n workflow built around constants vs variables, with visual inputs and continuity guardrails for lighting, environment, framing, and styling.',
      result:
        'Faster creative iteration and more consistent campaign outputs without rebuilding prompts from scratch or relying on manual production loops.',
    },
    {
      slug: 'remoria',
      projectName: 'Remoria',
      projectType: 'Luxury fragrance brand system',
      image: '/images/case-studies/remoria/thumb/thumb.webp',
      problem:
        'The brand needed to feel premium and coherent without relying on obvious luxury tropes or visual excess.',
      built:
        'A full brand system covering identity logic, tone of voice, packaging direction, and creative guardrails for future extensions.',
      result:
        'Stronger brand coherence and a clearer foundation for scaling campaigns, content, and future launches without losing atmosphere.',
    },
  ],
  es: [
    {
      slug: 'ai-sports',
      projectName: 'Campaña deportiva con IA',
      projectType: 'Sistema de campaña para marketing deportivo',
      image: '/images/case-studies/ai-sports/thumb/thumb.webp',
      problem:
        'Los outputs generativos funcionaban bien por separado, pero perdían coherencia de campaña en cuanto cambiaban el casting o el vestuario.',
      built:
        'Un workflow en n8n basado en constantes vs variables, con inputs visuales y guardrails de continuidad para iluminación, entorno, encuadre y estilismo.',
      result:
        'Iteración creativa más rápida y piezas de campaña más consistentes, sin rehacer prompts desde cero ni depender de bucles manuales de producción.',
    },
    {
      slug: 'remoria',
      projectName: 'Remoria',
      projectType: 'Sistema de marca para firma de fragancias',
      image: '/images/case-studies/remoria/thumb/thumb.webp',
      problem:
        'La marca necesitaba sentirse premium y coherente sin depender de señales obvias de lujo ni de exceso visual.',
      built:
        'Un sistema completo de marca con lógica de identidad, tono verbal, dirección de packaging y guardrails creativos para futuras extensiones.',
      result:
        'Mayor coherencia de marca y una base más sólida para escalar campañas, contenido y futuros lanzamientos sin perder atmósfera.',
    },
  ],
}

export function getHomeProofs(locale: Locale) {
  return homeProofs[locale].map((proof) => ({
    ...proof,
    href: localizePath(`/case-studies/${proof.slug}`, locale),
  }))
}
