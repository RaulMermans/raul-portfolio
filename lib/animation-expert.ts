/**
 * ANIMATION & UI EXPERT BOT
 * 
 * Specialized expert on award-winning animations and microinteractions.
 * Inspired by Awwwards-winning websites and cutting-edge UI trends.
 * 
 * Capabilities:
 * - Suggests Awwwards-level microinteractions
 * - Analyzes animation patterns from award-winning sites
 * - Provides implementation guidance for smooth, performant animations
 * - Stays updated on current animation trends
 * - Creates unique, engaging user experiences
 */

export interface AnimationSuggestion {
  id: string
  name: string
  description: string
  category: 'microinteraction' | 'scroll' | 'hover' | 'loading' | 'transition' | 'parallax' | 'morphing'
  complexity: 'simple' | 'moderate' | 'complex'
  performance: 'low' | 'medium' | 'high'
  awwwardsLevel: boolean
  implementation: {
    technique: string
    technologies: string[]
    codeExample?: string
    cssProperties?: string[]
    jsLibraries?: string[]
  }
  useCase: string
  inspiration?: string
}

export interface AnimationAnalysis {
  element: string
  currentState: string
  suggestions: AnimationSuggestion[]
  priority: 'high' | 'medium' | 'low'
  estimatedImpact: string
}

// Awwwards-inspired animation patterns and trends
export const ANIMATION_PATTERNS: Record<string, AnimationSuggestion> = {
  'magnetic-hover': {
    id: 'magnetic-hover',
    name: 'Magnetic Hover Effect',
    description: 'Elements that subtly follow the cursor with magnetic attraction, creating an engaging hover experience',
    category: 'hover',
    complexity: 'moderate',
    performance: 'low',
    awwwardsLevel: true,
    implementation: {
      technique: 'Transform-based animation with cursor tracking',
      technologies: ['CSS', 'JavaScript'],
      cssProperties: ['transform', 'transition', 'will-change'],
      jsLibraries: [],
    },
    useCase: 'Buttons, cards, interactive elements',
    inspiration: 'Common in Awwwards-winning portfolio sites',
  },
  'smooth-scroll-reveal': {
    id: 'smooth-scroll-reveal',
    name: 'Smooth Scroll Reveal',
    description: 'Elements that elegantly reveal as you scroll with parallax and fade effects',
    category: 'scroll',
    complexity: 'moderate',
    performance: 'medium',
    awwwardsLevel: true,
    implementation: {
      technique: 'Intersection Observer API with CSS transforms',
      technologies: ['CSS', 'JavaScript'],
      cssProperties: ['opacity', 'transform', 'transition'],
      jsLibraries: [],
    },
    useCase: 'Sections, images, text blocks',
    inspiration: 'Awwwards Sites of the Day standard',
  },
  'morphing-shapes': {
    id: 'morphing-shapes',
    name: 'Morphing Geometric Shapes',
    description: 'Shapes that smoothly morph and transform, creating fluid, organic movements',
    category: 'morphing',
    complexity: 'complex',
    performance: 'medium',
    awwwardsLevel: true,
    implementation: {
      technique: 'SVG path morphing or CSS clip-path animations',
      technologies: ['SVG', 'CSS', 'JavaScript'],
      cssProperties: ['clip-path', 'path', 'd'],
      jsLibraries: ['GSAP', 'Framer Motion'],
    },
    useCase: 'Background elements, decorative shapes, transitions',
    inspiration: 'Trending in 2024-2025 Awwwards winners',
  },
  'liquid-transition': {
    id: 'liquid-transition',
    name: 'Liquid Page Transition',
    description: 'Smooth, fluid page transitions that feel like liquid flowing between states',
    category: 'transition',
    complexity: 'complex',
    performance: 'medium',
    awwwardsLevel: true,
    implementation: {
      technique: 'Canvas-based or WebGL liquid simulation',
      technologies: ['Canvas', 'WebGL', 'JavaScript'],
      cssProperties: [],
      jsLibraries: ['Three.js', 'GSAP'],
    },
    useCase: 'Page transitions, section changes',
    inspiration: 'High-end portfolio sites on Awwwards',
  },
  'cursor-trail': {
    id: 'cursor-trail',
    name: 'Interactive Cursor Trail',
    description: 'Custom cursor with trailing particles or effects that react to movement',
    category: 'microinteraction',
    complexity: 'moderate',
    performance: 'low',
    awwwardsLevel: true,
    implementation: {
      technique: 'Canvas particles following cursor',
      technologies: ['Canvas', 'JavaScript'],
      cssProperties: ['cursor'],
      jsLibraries: [],
    },
    useCase: 'Hero sections, interactive areas',
    inspiration: 'Popular in creative agency portfolios',
  },
  'text-split-reveal': {
    id: 'text-split-reveal',
    name: 'Text Split & Reveal Animation',
    description: 'Text that splits into individual characters/words with staggered reveal animations',
    category: 'microinteraction',
    complexity: 'moderate',
    performance: 'low',
    awwwardsLevel: true,
    implementation: {
      technique: 'Character splitting with CSS animations',
      technologies: ['CSS', 'JavaScript'],
      cssProperties: ['transform', 'opacity', 'animation'],
      jsLibraries: ['SplitType', 'GSAP'],
    },
    useCase: 'Headings, titles, hero text',
    inspiration: 'Standard in modern portfolio designs',
  },
  'glassmorphism-hover': {
    id: 'glassmorphism-hover',
    name: 'Glassmorphism Hover Effect',
    description: 'Frosted glass effect that intensifies on hover with blur and transparency',
    category: 'hover',
    complexity: 'simple',
    performance: 'low',
    awwwardsLevel: true,
    implementation: {
      technique: 'backdrop-filter with transition',
      technologies: ['CSS'],
      cssProperties: ['backdrop-filter', 'background', 'opacity'],
      jsLibraries: [],
    },
    useCase: 'Cards, modals, overlays',
    inspiration: '2024-2025 design trend',
  },
  'parallax-layers': {
    id: 'parallax-layers',
    name: 'Multi-Layer Parallax',
    description: 'Multiple layers moving at different speeds creating depth and immersion',
    category: 'parallax',
    complexity: 'moderate',
    performance: 'medium',
    awwwardsLevel: true,
    implementation: {
      technique: 'Scroll-based transform with different speeds',
      technologies: ['CSS', 'JavaScript'],
      cssProperties: ['transform', 'translateZ'],
      jsLibraries: ['GSAP ScrollTrigger'],
    },
    useCase: 'Hero sections, background elements',
    inspiration: 'Awwwards Sites of the Year feature',
  },
}

/**
 * Analyzes a component or section and suggests award-winning animations
 */
export function analyzeForAnimations(
  element: string,
  context: string,
  currentAnimations?: string[]
): AnimationAnalysis {
  const suggestions: AnimationSuggestion[] = []
  
  // Analyze based on element type and context
  const elementLower = element.toLowerCase()
  const contextLower = context.toLowerCase()
  
  // Button/CTA suggestions
  if (elementLower.includes('button') || elementLower.includes('cta') || elementLower.includes('link')) {
    suggestions.push(ANIMATION_PATTERNS['magnetic-hover'])
    suggestions.push(ANIMATION_PATTERNS['glassmorphism-hover'])
  }
  
  // Text/Heading suggestions
  if (elementLower.includes('text') || elementLower.includes('heading') || elementLower.includes('title')) {
    suggestions.push(ANIMATION_PATTERNS['text-split-reveal'])
    suggestions.push(ANIMATION_PATTERNS['smooth-scroll-reveal'])
  }
  
  // Background/Shape suggestions
  if (elementLower.includes('background') || elementLower.includes('shape') || elementLower.includes('circle')) {
    suggestions.push(ANIMATION_PATTERNS['morphing-shapes'])
    suggestions.push(ANIMATION_PATTERNS['parallax-layers'])
  }
  
  // Hero section suggestions
  if (contextLower.includes('hero') || contextLower.includes('landing')) {
    suggestions.push(ANIMATION_PATTERNS['cursor-trail'])
    suggestions.push(ANIMATION_PATTERNS['parallax-layers'])
    suggestions.push(ANIMATION_PATTERNS['text-split-reveal'])
  }
  
  // Card/Container suggestions
  if (elementLower.includes('card') || elementLower.includes('container') || elementLower.includes('section')) {
    suggestions.push(ANIMATION_PATTERNS['smooth-scroll-reveal'])
    suggestions.push(ANIMATION_PATTERNS['glassmorphism-hover'])
  }
  
  // Remove duplicates
  const uniqueSuggestions = suggestions.filter((suggestion, index, self) =>
    index === self.findIndex((s) => s.id === suggestion.id)
  )
  
  return {
    element,
    currentState: currentAnimations?.join(', ') || 'No animations',
    suggestions: uniqueSuggestions,
    priority: uniqueSuggestions.length > 0 ? 'high' : 'medium',
    estimatedImpact: uniqueSuggestions.length > 0 
      ? 'High - Will significantly enhance user engagement and visual appeal'
      : 'Medium - Subtle improvements possible',
  }
}

/**
 * Gets animation suggestions for a specific use case
 */
export function getAnimationSuggestions(useCase: string): AnimationSuggestion[] {
  const useCaseLower = useCase.toLowerCase()
  const suggestions: AnimationSuggestion[] = []
  
  Object.values(ANIMATION_PATTERNS).forEach((pattern) => {
    if (pattern.useCase.toLowerCase().includes(useCaseLower) || 
        useCaseLower.includes(pattern.category)) {
      suggestions.push(pattern)
    }
  })
  
  return suggestions.length > 0 
    ? suggestions 
    : Object.values(ANIMATION_PATTERNS).filter(p => p.awwwardsLevel)
}

/**
 * Formats animation analysis for display
 */
export function formatAnimationAnalysis(analysis: AnimationAnalysis): string {
  let output = `🎨 ANIMATION & UI EXPERT ANALYSIS\n`
  output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`
  output += `📋 Element: ${analysis.element}\n`
  output += `📊 Current State: ${analysis.currentState}\n`
  output += `⭐ Priority: ${analysis.priority.toUpperCase()}\n`
  output += `💡 Estimated Impact: ${analysis.estimatedImpact}\n\n`
  
  if (analysis.suggestions.length === 0) {
    output += `✅ Element already has optimal animations!\n`
    return output
  }
  
  output += `✨ Suggested Animations (${analysis.suggestions.length}):\n\n`
  
  analysis.suggestions.forEach((suggestion, index) => {
    output += `${index + 1}. ${suggestion.name}\n`
    output += `   📝 ${suggestion.description}\n`
    output += `   🎯 Category: ${suggestion.category}\n`
    output += `   ⚙️  Complexity: ${suggestion.complexity}\n`
    output += `   🚀 Performance: ${suggestion.performance}\n`
    if (suggestion.awwwardsLevel) {
      output += `   🏆 Awwwards-Level: Yes\n`
    }
    output += `   💻 Technique: ${suggestion.implementation.technique}\n`
    if (suggestion.implementation.technologies.length > 0) {
      output += `   🔧 Technologies: ${suggestion.implementation.technologies.join(', ')}\n`
    }
    output += `\n`
  })
  
  return output
}

/**
 * Main animation expert function
 */
export function suggestAnimations(element: string, context: string): AnimationAnalysis {
  console.log('🎨 Animation Expert: Analyzing for award-winning animations...')
  const analysis = analyzeForAnimations(element, context)
  console.log(formatAnimationAnalysis(analysis))
  return analysis
}

/**
 * Initialize animation expert bot
 */
export function initAnimationExpert() {
  if (typeof window === 'undefined') {
    console.log('🎨 Animation & UI Expert Bot initialized')
    console.log('   Specialized in Awwwards-level animations and microinteractions')
  }
}

// Auto-initialize if running in Node.js
if (typeof window === 'undefined' && typeof process !== 'undefined') {
  initAnimationExpert()
}

