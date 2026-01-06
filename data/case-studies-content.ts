// =============================================
// CASE STUDY CONTENT DATA
// Detailed content structure matching types and CSS
// =============================================

import type { CaseStudyContent } from '@/types/case-study'
import { getCaseStudyImagePath } from '@/lib/case-study-images'

export const caseStudiesContent: Record<string, CaseStudyContent> = {
  'ai-sports': {
    id: 'ai-sports',
    accentColor: 'var(--accent)',
    hero: {
      title: 'AI Sports Campaign',
      tagline: 'A Creative Direction Engine.',
      subtitle: 'AI Automation System & Creative Direction • 2025',
      image: {
        src: getCaseStudyImagePath('ai-sports', 'hero', 'Hero.webp'),
        alt: 'AI Sports Campaign - Creative Direction Engine',
        quality: 90,
        sizes: '100vw',
      },
    },
    overview: {
      description:
        'Everyone can generate "cool" images now. Almost no one can generate consistent campaigns. I built a custom n8n automation—a Creative Direction Engine—that takes one reference campaign shot and lets me swap the model and wardrobe while keeping lighting, environment, and shot DNA stable. The result is campaign-grade coherence produced in minutes—iteration becomes a repeatable loop instead of a re-shoot problem.',
      intentQuote: 'Turn creative direction from "slot machine outcomes" into a system you can run on purpose.',
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
    challenge: {
      quote: 'Generative AI gives you images. It doesn\'t give you campaigns.',
      context:
        'The baseline problem with generative image workflows is drift: change one thing and everything changes—lighting, texture, camera feel, even the "world" itself. That\'s fine for one-off visuals, but campaigns demand continuity: the audience should feel like every asset came from the same production. The challenge wasn\'t making a single strong image. It was building a workflow where the scene stays constant while casting and wardrobe stay editable.',
      successCriteria: [
        'Outputs must read as one campaign, not separate "generations"',
        'Swap model + wardrobe without rebuilding prompts from scratch',
        'Keep shot anchors stable: environment, lighting, framing, texture',
        'Produce usable variants fast enough for real marketing iteration',
      ],
    },
    fullBleedImages: [
      {
        src: getCaseStudyImagePath('ai-sports', 'full', 'Full-1.webp'),
        alt: 'AI generated sports scene',
      },
      {
        src: getCaseStudyImagePath('ai-sports', 'full', 'full-2.webp'),
        alt: 'AI generated sports campaign variant',
      },
    ],
    approach: {
      text: 'Make it usable: a system, not a poster. The key insight: campaign consistency comes from constraints, not creativity-by-prompt. I designed the automation around a "constants vs variables" model—first locking the non-negotiables of the reference shot, then giving controlled flexibility to casting and wardrobe. The workflow ingests three visual inputs and routes them through a repeatable pipeline that prioritizes continuity over novelty. Output selection stays human-led: I pick the final based on realism, brand fit, and product readability—because campaigns are edited, not merely generated.',
      tools: ['n8n', 'Generative API', 'Reference Conditioning', 'Prompt Schema', 'Output Versioning'],
      system: {
        label: 'The Brand System',
        items: [
          {
            title: 'The Variable',
            description: 'Casting (new model reference) + wardrobe (clothing/product references)',
          },
          {
            title: 'The Constant',
            description: 'Reference shot\'s lighting logic, environment, framing, and "same shoot" texture cues',
          },
          {
            title: 'The Output',
            description: 'Small set of campaign-consistent variants ready for creative selection',
          },
        ],
      },
      iterationProof: {
        label: 'Iteration Proof',
        items: [
          {
            title: 'What Changed',
            description: 'Separation of "scene anchors" vs "editable attributes" in workflow logic',
          },
          {
            title: 'Why',
            description: 'Early tests produced strong images that still looked like different shoots—drift compounded fast',
          },
          {
            title: 'Decision Rule',
            description: 'Continuity wins over "cool." If background, lighting, or feel changes, the output fails—because campaigns are built on sameness with intentional variation.',
          },
        ],
      },
      deliverables: [
        {
          name: 'Automation Pipeline',
          rationale: 'Turns the process into a repeatable asset, not a manual ritual',
        },
        {
          name: '3-Input Spec',
          rationale: 'Makes creative direction explicit and portable',
        },
        {
          name: 'Guardrails + Checklist',
          rationale: 'Enforces campaign continuity, prevents AI drift',
        },
        {
          name: 'Campaign Demo',
          rationale: 'Proves the system under high-scrutiny conditions',
        },
      ],
      images: [
        {
          src: getCaseStudyImagePath('ai-sports', 'approach', 'approach-1.webp'),
          alt: 'AI workflow diagram',
        },
        {
          src: getCaseStudyImagePath('ai-sports', 'approach', 'approach-2.webp'),
          alt: 'AI prompt engineering example',
        },
      ],
    },
    featureImage: {
      src: getCaseStudyImagePath('ai-sports', 'feature', 'feature_1.webp'),
      alt: 'AI Sports Campaign feature image',
    },
    gallery: {
      rows: [
        {
          layout: '3-col',
          items: [
            {
              src: getCaseStudyImagePath('ai-sports', 'gallery', 'gallery-1.webp'),
              alt: 'Gallery image 1',
            },
            {
              src: getCaseStudyImagePath('ai-sports', 'gallery', 'gallery-2.webp'),
              alt: 'Gallery image 2',
            },
            {
              src: getCaseStudyImagePath('ai-sports', 'gallery', 'gallery-3.webp'),
              alt: 'Gallery image 3',
            },
          ],
        },
        {
          layout: 'asymmetric',
          items: [
            {
              src: getCaseStudyImagePath('ai-sports', 'gallery', 'gallery4.webp'),
              alt: 'Gallery image 4',
              sizes: '(max-width: 768px) 100vw, 60vw',
            },
          ],
        },
      ],
    },
    results: {
      text: 'The system makes campaign iteration fast and controllable: you can adapt casting and styling while keeping the visual world consistent. It replaces "generate until lucky" with a repeatable creative loop—inputs go in, coherent variants come out in minutes, and the final is chosen through judgment, not randomness. Practically, it enables campaign-level decisions without campaign-level burn rate.',
      takeawayQuote: 'This isn\'t just prompting—it\'s automated infrastructure for repeatable creative direction.',
    },
  },
  remoria: {
    id: 'remoria',
    accentColor: 'var(--gold)',
    hero: {
      title: 'Remoria',
      tagline: 'A Fragrance House Etched in Memory',
      subtitle: 'Brand Identity & Creative Direction • 2025',
      image: {
        src: getCaseStudyImagePath('remoria', 'hero', 'hero.webp'),
        alt: 'Remoria Brand Identity - Fragrance House',
        quality: 90,
        sizes: '100vw',
      },
    },
    overview: {
      description:
        'REMORIA is a story-driven fragrance house inspired by Roman legacy, Spanish lyricism, and Mediterranean warmth. I designed a complete visual and verbal world where scent functions like a relic—quiet, intimate, and emotionally precise. The result is an understated luxury identity built to linger through structure, texture, and silence.',
      intentQuote: 'To make the brand feel like an artifact rediscovered—warm, silent, and unforgettable.',
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
    challenge: {
      quote: 'What if memory was a brand?',
      context:
        'The goal was to create a fragrance identity that communicates luxury without spectacle—built on emotion, restraint, and legacy rather than trend. REMORIA needed to feel monumental yet intimate: classical in reference, modern in execution, and softened by Mediterranean light and materiality. The challenge was coherence—ensuring typography, palette, textures, and copy all carried the same quiet weight. Success meant the brand could be felt before it was explained.',
      successCriteria: [
        'Feel timeless, not retro.',
        'Signal premium through restraint, not ornament.',
        'Build a system that scales across future scents and stories.',
      ],
    },
    fullBleedImages: [
      {
        src: getCaseStudyImagePath('remoria', 'full', 'full-1.webp'),
        alt: 'Remoria brand mood board',
      },
    ],
    approach: {
      text: 'Luxury as restraint: let the brand whisper, not shout. I anchored REMORIA in narrative strategy—memory, myth, and place—then translated those themes into a minimal, sculptural identity language. Roman-inspired serif forms established permanence, while Mediterranean warmth kept the brand human and sensual. The palette was built from stone, patina, and gilded accents to evoke time-worn elegance without heaviness. Copy was treated like fragrance: sparse, lyrical, and deliberate—more suggestion than statement.',
      tools: ['Adobe Illustrator', 'Photoshop', 'Figma', 'Pinterest'],
      system: {
        label: 'The Brand System',
        items: [
          {
            title: 'The Variable',
            description: 'Each fragrance narrative (place, emotion, notes)',
          },
          {
            title: 'The Constant',
            description: 'Restraint, timeless structure, tactile elegance',
          },
          {
            title: 'The Output',
            description: 'A scalable luxury identity + storytelling framework',
          },
        ],
      },
      images: [
        {
          src: getCaseStudyImagePath('remoria', 'approach', 'approach-1.webp'),
          alt: 'Remoria logo variations',
        },
        {
          src: getCaseStudyImagePath('remoria', 'approach', 'approach-2.webp'),
          alt: 'Remoria typography system',
        },
      ],
    },
    featureImage: {
      src: getCaseStudyImagePath('remoria', 'feature', 'feature.webp'),
      alt: 'Remoria brand feature image',
    },
    gallery: {
      rows: [
        {
          layout: '3-col',
          items: [
            {
              src: getCaseStudyImagePath('remoria', 'gallery', 'gallery-1.webp'),
              alt: 'Remoria stationery mockup',
            },
            {
              src: getCaseStudyImagePath('remoria', 'gallery', 'gallery-2.webp'),
              alt: 'Remoria packaging design',
            },
            {
              src: getCaseStudyImagePath('remoria', 'gallery', 'gallery-3.webp'),
              alt: 'Remoria website hero concept',
            },
          ],
        },
        {
          layout: 'asymmetric',
          items: [
            {
              src: getCaseStudyImagePath('remoria', 'gallery', 'gallery-4.webp'),
              alt: 'Remoria social media graphic',
              sizes: '(max-width: 768px) 100vw, 60vw',
            },
            {
              src: getCaseStudyImagePath('remoria', 'gallery', 'gallery-5.webp'),
              alt: 'Remoria brand pattern',
              sizes: '(max-width: 768px) 100vw, 40vw',
            },
          ],
        },
      ],
    },
    results: {
      text: 'REMORIA delivered a complete luxury brand world—identity, voice, and aesthetic system—built to scale without losing its atmosphere. It proves that emotional restraint can communicate premium more convincingly than overt signals. The work establishes a foundation for future fragrances to live as chapters of the same mythology.',
      takeawayQuote: 'Luxury isn\'t loud—it lingers.',
    },
  },
}

/**
 * Get case study content by ID
 */
export function getCaseStudyContent(id: string): CaseStudyContent | undefined {
  return caseStudiesContent[id]
}
