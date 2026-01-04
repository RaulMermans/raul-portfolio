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
      subtitle: 'A Fragrance House Etched in Memory',
      description: 'Brand Identity & Creative Direction • 2025',
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
        'REMORIA is a story-driven fragrance house inspired by Roman legacy, Spanish lyricism, and Mediterranean warmth. I designed a complete visual and verbal world where scent functions like a relic—quiet, intimate, and emotionally precise. The result is an understated luxury identity built to linger through structure, texture, and silence. To make the brand feel like an artifact rediscovered—warm, silent, and unforgettable.',
      meta: [
        { label: 'Type', value: 'Luxury Brand Identity (Fragrance)' },
        { label: 'Role', value: 'Creative Direction & Brand Aesthetics' },
        { label: 'Tools', value: 'Illustrator, Photoshop, Figma, Pinterest' },
        {
          label: 'Deliverables',
          value: 'Visual Identity System, Tone of Voice, Packaging Concept, Moodboard, Color Palette, Brand Storytelling',
        },
      ],
    },
    sections: [
      {
        title: 'The Challenge',
        content: [
          'What if memory was a brand?',
          'The goal was to create a fragrance identity that communicates luxury without spectacle—built on emotion, restraint, and legacy rather than trend. REMORIA needed to feel monumental yet intimate: classical in reference, modern in execution, and softened by Mediterranean light and materiality. The challenge was coherence—ensuring typography, palette, textures, and copy all carried the same quiet weight. Success meant the brand could be felt before it was explained.',
          'Success Criteria:\n• Feel timeless, not retro.\n• Signal premium through restraint, not ornament.\n• Build a system that scales across future scents and stories.',
        ],
      },
      {
        title: 'The Approach',
        content:
          'Luxury as restraint: let the brand whisper, not shout. I anchored REMORIA in narrative strategy—memory, myth, and place—then translated those themes into a minimal, sculptural identity language. Roman-inspired serif forms established permanence, while Mediterranean warmth kept the brand human and sensual. The palette was built from stone, patina, and gilded accents to evoke time-worn elegance without heaviness. Copy was treated like fragrance: sparse, lyrical, and deliberate—more suggestion than statement.',
      },
      {
        title: 'Results',
        content:
          'REMORIA delivered a complete luxury brand world—identity, voice, and aesthetic system—built to scale without losing its atmosphere. It proves that emotional restraint can communicate premium more convincingly than overt signals. The work establishes a foundation for future fragrances to live as chapters of the same mythology. Luxury isn\'t loud—it lingers.',
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

