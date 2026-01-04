// =============================================
// CASE STUDY CONTENT DATA
// All content for case study pages
// =============================================

import type { CaseStudyContent } from '@/types/case-study'
import {
  getCaseStudyHero,
  getCaseStudyFeature,
  getCaseStudyApproach,
  getCaseStudyGallery,
  getCaseStudyFull,
} from '@/lib/case-study-images'

export const caseStudiesContent: Record<string, CaseStudyContent> = {
  'ai-sports': {
    id: 'ai-sports',
    hero: {
      title: 'AI Sports\nCampaign',
      tagline: 'A Creative Direction Engine.',
      subtitle: 'AI Automation System & Creative Direction • 2024',
      image: {
        src: getCaseStudyHero('ai-sports'),
        alt: 'AI Sports Campaign hero - athletic figure in motion',
        quality: 90,
        sizes: '100vw',
      },
    },
    overview: {
      meta: [
        { label: 'Type', value: 'AI Automation System' },
        { label: 'Role', value: 'System Design & Creative Direction' },
        { label: 'Tools', value: 'n8n, Generative Image API, Reference Conditioning' },
        {
          label: 'Deliverables',
          value: 'n8n Workflow, Input Spec, Consistency Guardrails, Campaign Demo Outputs',
          fullWidth: true,
        },
      ],
      text:
        'Everyone can generate "cool" images now. Almost no one can generate consistent campaigns. I built a ' +
        'custom n8n automation—a Creative Direction Engine—that takes one reference campaign shot and lets me swap the ' +
        'model and wardrobe while keeping lighting, environment, and shot DNA stable. The result is campaign-grade ' +
        'coherence produced in minutes—iteration becomes a repeatable loop instead of a re-shoot problem.',
      intent: 'Turn creative direction from "slot machine outcomes" into a system you can run on purpose.',
    },
    challenge: {
      quote: 'Generative AI gives you images.\nIt doesn\'t give you campaigns.',
      text:
        'The baseline problem with generative image workflows is drift: change one thing and everything changes—lighting, ' +
        'texture, camera feel, even the "world" itself. That\'s fine for one-off visuals, but campaigns demand ' +
        'continuity: the audience should feel like every asset came from the same production. The challenge wasn\'t making ' +
        'a single strong image. It was building a workflow where the scene stays constant while casting and wardrobe stay ' +
        'editable.',
      criteria: [
        'Outputs must read as one campaign, not separate "generations"',
        'Swap model + wardrobe without rebuilding prompts from scratch',
        'Keep shot anchors stable: environment, lighting, framing, texture',
        'Produce usable variants fast enough for real marketing iteration',
      ],
    },
    fullImages: [
      {
        src: getCaseStudyFull('ai-sports', 'full-1.webp'),
        alt: 'AI Sports Campaign image 1',
        quality: 90,
        sizes: '100vw',
      },
      {
        src: getCaseStudyFull('ai-sports', 'full-2.webp'),
        alt: 'AI Sports Campaign consistent campaign world',
        quality: 90,
        sizes: '100vw',
      },
    ],
    approach: {
      text:
        '**Make it usable: a system, not a poster.** The key insight: campaign consistency comes from ' +
        'constraints, not creativity-by-prompt. I designed the automation around a "constants vs variables" model—first ' +
        'locking the non-negotiables of the reference shot, then giving controlled flexibility to casting and wardrobe. The ' +
        'workflow ingests three visual inputs and routes them through a repeatable pipeline that prioritizes continuity over ' +
        'novelty. Output selection stays human-led: I pick the final based on realism, brand fit, and product readability—because ' +
        'campaigns are edited, not merely generated.',
      tools: [
        { name: 'n8n' },
        { name: 'Generative API' },
        { name: 'Reference Conditioning' },
        { name: 'Prompt Schema' },
        { name: 'Output Versioning' },
      ],
      system: {
        label: 'How It Works',
        items: [
          {
            title: 'The Variable',
            description: 'Casting (new model reference) + wardrobe (clothing/product references)',
          },
          {
            title: 'The Constant',
            description:
              'Reference shot\'s lighting logic, environment, framing, and "same shoot" texture cues',
          },
          {
            title: 'The Output',
            description: 'Small set of campaign-consistent variants ready for creative selection',
          },
        ],
      },
      iteration: {
        label: 'Iteration Proof',
        items: [
          {
            title: 'What Changed',
            text: 'Separation of "scene anchors" vs "editable attributes" in workflow logic',
          },
          {
            title: 'Why',
            text: 'Early tests produced strong images that still looked like different shoots—drift compounded fast',
          },
          {
            title: 'Decision Rule',
            text:
              'Continuity wins over "cool." If background, lighting, or feel changes, the output fails—because campaigns ' +
              'are built on sameness with intentional variation.',
          },
        ],
      },
      deliverables: {
        label: 'Deliverable Rationale',
        items: [
          {
            name: 'Automation Pipeline',
            why: 'Turns the process into a repeatable asset, not a manual ritual',
          },
          {
            name: '3-Input Spec',
            why: 'Makes creative direction explicit and portable',
          },
          {
            name: 'Guardrails + Checklist',
            why: 'Enforces campaign continuity, prevents AI drift',
          },
          {
            name: 'Campaign Demo',
            why: 'Proves the system under high-scrutiny conditions',
          },
        ],
      },
      images: [
        {
          src: getCaseStudyApproach('ai-sports', 'approach-1.webp'),
          alt: 'AI Sports Campaign workflow visualization',
          quality: 90,
          sizes: '(max-width: 900px) 100vw, 50vw',
        },
        {
          src: getCaseStudyApproach('ai-sports', 'approach-2.webp'),
          alt: 'AI Sports Campaign variant comparison',
          quality: 90,
          sizes: '(max-width: 900px) 100vw, 50vw',
        },
      ],
    },
    feature: {
      src: getCaseStudyFeature('ai-sports'),
      alt: 'AI Sports Campaign hero output',
      quality: 95,
      sizes: '(max-width: 1400px) 100vw, 1400px',
    },
    gallery: {
      rows: [
        {
          type: '3',
          items: [
            {
              src: getCaseStudyGallery('ai-sports', 'gallery-1.webp'),
              alt: 'AI Sports Campaign output variant 1',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 33vw',
            },
            {
              src: getCaseStudyGallery('ai-sports', 'gallery-2.webp'),
              alt: 'AI Sports Campaign output variant 2',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 33vw',
            },
            {
              src: getCaseStudyGallery('ai-sports', 'gallery-3.webp'),
              alt: 'AI Sports Campaign output variant 3',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 33vw',
            },
          ],
        },
        {
          type: 'asymmetric',
          items: [
            {
              src: getCaseStudyGallery('ai-sports', 'gallery-4.webp'),
              alt: 'AI Sports Campaign consistency demonstration',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 60vw',
            },
            {
              src: getCaseStudyGallery('ai-sports', 'gallery-5.webp'),
              alt: 'AI Sports Campaign wardrobe swap example',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 40vw',
            },
          ],
        },
      ],
    },
    results: {
      text:
        'The system makes campaign iteration fast and controllable: you can adapt casting and styling while keeping the visual ' +
        'world consistent. It replaces "generate until lucky" with a repeatable creative loop—inputs go in, coherent ' +
        'variants come out in minutes, and the final is chosen through judgment, not randomness. Practically, it enables ' +
        'campaign-level decisions without campaign-level burn rate.',
      takeaway: 'This isn\'t just prompting—it\'s automated infrastructure for repeatable creative direction.',
    },
    structuredData: {
      headline: 'AI Sports Campaign',
      description:
        'A Creative Direction Engine built in n8n—swap casting and wardrobe while locking the shot. Campaign-grade coherence from generative AI.',
      datePublished: '2026-01-01',
      dateModified: '2026-01-01',
    },
  },
  remoria: {
    id: 'remoria',
    hero: {
      title: 'Remoria',
      tagline: 'A Fragrance House Etched in Memory',
      subtitle: 'Brand Identity & Creative Direction • 2025',
      image: {
        src: getCaseStudyHero('remoria'),
        alt: 'Remoria hero - Mediterranean light and stone textures',
        quality: 90,
        sizes: '100vw',
      },
    },
    overview: {
      meta: [
        { label: 'Type', value: 'Luxury Brand Identity (Fragrance)' },
        { label: 'Role', value: 'Creative Direction & Brand Aesthetics' },
        { label: 'Tools', value: 'Illustrator, Photoshop, Figma, Pinterest' },
        {
          label: 'Deliverables',
          value:
            'Visual Identity System, Tone of Voice, Packaging Concept, Moodboard, Color Palette, Brand Storytelling',
          fullWidth: true,
        },
      ],
      text:
        'REMORIA is a story-driven fragrance house inspired by Roman legacy, Spanish lyricism, and Mediterranean warmth. I ' +
        'designed a complete visual and verbal world where scent functions like a relic—quiet, intimate, and emotionally ' +
        'precise. The result is an understated luxury identity built to linger through structure, texture, and silence.',
      intent: 'To make the brand feel like an artifact rediscovered—warm, silent, and unforgettable.',
      variant: 'gold',
    },
    challenge: {
      quote: 'What if memory\nwas a brand?',
      text:
        'The goal was to create a fragrance identity that communicates luxury without spectacle—built on emotion, restraint, and ' +
        'legacy rather than trend. REMORIA needed to feel monumental yet intimate: classical in reference, modern in execution, ' +
        'and softened by Mediterranean light and materiality. The challenge was coherence—ensuring typography, palette, textures, ' +
        'and copy all carried the same quiet weight. Success meant the brand could be felt before it was explained.',
      criteria: [
        'Feel timeless, not retro.',
        'Signal premium through restraint, not ornament.',
        'Build a system that scales across future scents and stories.',
      ],
      variant: 'gold',
    },
    fullImages: [
      {
        src: getCaseStudyFull('remoria', 'full-1.webp'),
        alt: 'Remoria luxury fragrance aesthetic',
        quality: 90,
        sizes: '100vw',
      },
      {
        src: getCaseStudyFull('remoria', 'full-2.webp'),
        alt: 'Remoria Mediterranean warmth and light',
        quality: 90,
        sizes: '100vw',
      },
    ],
    approach: {
      text:
        '**Luxury as restraint: let the brand whisper, not shout.** I anchored REMORIA in narrative ' +
        'strategy—memory, myth, and place—then translated those themes into a minimal, sculptural identity language. ' +
        'Roman-inspired serif forms established permanence, while Mediterranean warmth kept the brand human and sensual. The ' +
        'palette was built from stone, patina, and gilded accents to evoke time-worn elegance without heaviness. Copy was ' +
        'treated like fragrance: sparse, lyrical, and deliberate—more suggestion than statement.',
      tools: [
        { name: 'Adobe Illustrator', variant: 'gold' },
        { name: 'Photoshop', variant: 'gold' },
        { name: 'Figma', variant: 'gold' },
        { name: 'Pinterest', variant: 'gold' },
      ],
      system: {
        label: 'The Brand System',
        items: [
          {
            title: 'The Variable',
            description: 'Each fragrance narrative (place, emotion, notes)',
            variant: 'gold',
          },
          {
            title: 'The Constant',
            description: 'Restraint, timeless structure, tactile elegance',
            variant: 'gold',
          },
          {
            title: 'The Output',
            description: 'A scalable luxury identity + storytelling framework',
            variant: 'gold',
          },
        ],
      },
      modules: {
        aesthetic: {
          header: 'Visual System',
          items: [
            { label: 'Typography', value: 'Sculptural serif, classical inscription' },
            {
              label: 'Color',
              value: 'Stone, patina, Antique Gold',
              colorSwatch: '#C6A877',
            },
            { label: 'Composition', value: 'Editorial spacing, calm rhythm' },
            { label: 'Materials', value: 'Frosted glass, aged paper, wood' },
          ],
        },
        voice: {
          label: 'Brand Voice',
          traits: [
            { name: 'Poetic' },
            { name: 'Restrained' },
            { name: 'Intimate' },
            { name: 'Composed' },
          ],
          signature: 'A scent to remember what words could not.',
        },
      },
      obsession: {
        label: 'The Detail',
        text:
          'Antique Gold is used like gilding on an artifact—rare, precise, never decorative. That restraint turns every highlight ' +
          'into a memory marker.',
      },
      images: [
        {
          src: getCaseStudyApproach('remoria', 'approach-1.webp'),
          alt: 'Remoria moodboard exploration',
          quality: 90,
          sizes: '(max-width: 900px) 100vw, 50vw',
        },
        {
          src: getCaseStudyApproach('remoria', 'approach-2.webp'),
          alt: 'Remoria typography and material details',
          quality: 90,
          sizes: '(max-width: 900px) 100vw, 50vw',
        },
      ],
    },
    feature: {
      src: getCaseStudyFeature('remoria'),
      alt: 'Remoria brand identity hero visual',
      quality: 95,
      sizes: '(max-width: 1400px) 100vw, 1400px',
    },
    gallery: {
      rows: [
        {
          type: '3',
          items: [
            {
              src: getCaseStudyGallery('remoria', 'gallery-1.webp'),
              alt: 'Remoria packaging concept',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 33vw',
            },
            {
              src: getCaseStudyGallery('remoria', 'gallery-2.webp'),
              alt: 'Remoria color and material palette',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 33vw',
            },
            {
              src: getCaseStudyGallery('remoria', 'gallery-3.webp'),
              alt: 'Remoria brand textures',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 33vw',
            },
          ],
        },
        {
          type: 'asymmetric',
          items: [
            {
              src: getCaseStudyGallery('remoria', 'gallery-4.webp'),
              alt: 'Remoria visual identity system',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 60vw',
            },
            {
              src: getCaseStudyGallery('remoria', 'gallery-5.webp'),
              alt: 'Remoria brand storytelling',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 40vw',
            },
          ],
        },
      ],
    },
    results: {
      text:
        'REMORIA delivered a complete luxury brand world—identity, voice, and aesthetic system—built to scale without losing ' +
        'its atmosphere. It proves that emotional restraint can communicate premium more convincingly than overt signals. The ' +
        'work establishes a foundation for future fragrances to live as chapters of the same mythology.',
      takeaway: 'Luxury isn\'t loud—it lingers.',
      variant: 'gold',
    },
    structuredData: {
      headline: 'Remoria',
      description:
        'A poetic fragrance house rooted in Roman legacy, Spanish lyricism, and Mediterranean light—where scent becomes memory and design becomes relic.',
      datePublished: '2026-01-01',
      dateModified: '2026-01-01',
    },
  },
}

/**
 * Get case study content by ID
 */
export function getCaseStudyContent(id: string): CaseStudyContent | undefined {
  return caseStudiesContent[id]
}

