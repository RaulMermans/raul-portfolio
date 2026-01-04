// =============================================
// CASE STUDY CONTENT DATA
// Content for individual case study pages
// =============================================

import type { CaseStudyContent } from '@/types/case-study'
import {
  getCaseStudyHero,
  getCaseStudyFeature,
  getCaseStudyGallery,
  getCaseStudyFull,
  getCaseStudyApproach,
} from '@/lib/case-study-images'

export const caseStudiesContent: Record<string, CaseStudyContent> = {
  'ai-sports': {
    id: 'ai-sports',
    hero: {
      title: 'AI Sports Campaign',
      subtitle: 'A Creative Direction Engine.',
      description: 'AI Automation System & Creative Direction • 2025',
      image: {
        src: getCaseStudyHero('ai-sports'),
        alt: 'AI Sports Campaign - Creative Direction Engine',
        quality: 90,
        sizes: '100vw',
      },
    },
    overview: {
      title: 'Overview',
      description:
        'Everyone can generate "cool" images now. Almost no one can generate consistent campaigns. I built a custom n8n automation—a Creative Direction Engine—that takes one reference campaign shot and lets me swap the model and wardrobe while keeping lighting, environment, and shot DNA stable. The result is campaign-grade coherence produced in minutes—iteration becomes a repeatable loop instead of a re-shoot problem. Turn creative direction from "slot machine outcomes" into a system you can run on purpose.',
      meta: [
        { label: 'Type', value: 'AI Automation System' },
        { label: 'Role', value: 'System Design & Creative Direction' },
        { label: 'Tools', value: 'n8n, Generative Image API, Reference Conditioning' },
        {
          label: 'Deliverables',
          value: 'n8n Workflow, Input Spec, Consistency Guardrails, Campaign Demo Outputs',
        },
      ],
    },
    sections: [
      {
        title: 'The Challenge',
        content: [
          'Generative AI gives you images. It doesn\'t give you campaigns.',
          'The baseline problem with generative image workflows is drift: change one thing and everything changes—lighting, texture, camera feel, even the "world" itself. That\'s fine for one-off visuals, but campaigns demand continuity: the audience should feel like every asset came from the same production. The challenge wasn\'t making a single strong image. It was building a workflow where the scene stays constant while casting and wardrobe stay editable.',
          'Success Criteria:\n• Outputs must read as one campaign, not separate "generations"\n• Swap model + wardrobe without rebuilding prompts from scratch\n• Keep shot anchors stable: environment, lighting, framing, texture\n• Produce usable variants fast enough for real marketing iteration',
        ],
      },
      {
        title: 'The Approach',
        content:
          'Make it usable: a system, not a poster. The key insight: campaign consistency comes from constraints, not creativity-by-prompt. I designed the automation around a "constants vs variables" model—first locking the non-negotiables of the reference shot, then giving controlled flexibility to casting and wardrobe. The workflow ingests three visual inputs and routes them through a repeatable pipeline that prioritizes continuity over novelty. Output selection stays human-led: I pick the final based on realism, brand fit, and product readability—because campaigns are edited, not merely generated.',
      },
    ],
    gallery: [
      {
        src: getCaseStudyGallery('ai-sports', 'gallery-1.webp'),
        alt: 'AI Sports Campaign Gallery Image 1',
      },
      {
        src: getCaseStudyGallery('ai-sports', 'gallery-2.webp'),
        alt: 'AI Sports Campaign Gallery Image 2',
      },
      {
        src: getCaseStudyGallery('ai-sports', 'gallery-3.webp'),
        alt: 'AI Sports Campaign Gallery Image 3',
      },
      {
        src: getCaseStudyGallery('ai-sports', 'gallery-4.webp'),
        alt: 'AI Sports Campaign Gallery Image 4',
      },
      {
        src: getCaseStudyGallery('ai-sports', 'gallery-5.webp'),
        alt: 'AI Sports Campaign Gallery Image 5',
      },
    ],
  },
  remoria: {
    id: 'remoria',
    hero: {
      title: 'Remoria',
      subtitle: 'Brand Identity & Creative Direction',
      description: 'A poetic fragrance house rooted in Roman legacy, Spanish lyricism, and Mediterranean light—where scent becomes memory and design becomes relic.',
      image: {
        src: getCaseStudyHero('remoria'),
        alt: 'Remoria Brand Identity - Fragrance House',
        quality: 90,
        sizes: '100vw',
      },
    },
    overview: {
      title: 'Overview',
      description:
        'Remoria is a luxury fragrance house that bridges ancient Roman heritage with contemporary Spanish poetic tradition. The brand identity needed to feel both timeless and intimate—a relic you discover, not a product you buy.',
      meta: [
        { label: 'Type', value: 'Brand Identity' },
        { label: 'Role', value: 'Creative Direction & Design' },
        { label: 'Year', value: '2024' },
      ],
    },
    sections: [
      {
        title: 'The Vision',
        content:
          'The challenge was creating a visual language that honors both the stoic elegance of Roman design and the emotional depth of Spanish poetry. Every element needed to feel discovered, not designed—as if it had existed for centuries and was only now being brought to light.',
      },
    ],
    gallery: [
      {
        src: getCaseStudyGallery('remoria', 'gallery-1.webp'),
        alt: 'Remoria Gallery Image 1',
      },
      {
        src: getCaseStudyGallery('remoria', 'gallery-2.webp'),
        alt: 'Remoria Gallery Image 2',
      },
      {
        src: getCaseStudyGallery('remoria', 'gallery-3.webp'),
        alt: 'Remoria Gallery Image 3',
      },
    ],
  },
}

/**
 * Get case study content by ID
 */
export function getCaseStudyContent(id: string): CaseStudyContent | undefined {
  return caseStudiesContent[id]
}

