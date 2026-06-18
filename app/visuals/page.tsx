'use client'

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { type Locale, getLocaleFromPath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { trapFocus } from '@/lib/accessibility'
import styles from './VisualsPage.module.css'

interface Work {
  title: string
  year: string
  type: string
  catalog: string
  image: string
  alt: string
  medium: string
  dimensions: string
  support: string
  edition: string
  series: string
  note: string
  provenance: string
  status: string
}

const visualsCopy = {
  en: {
    label: 'Collection',
    title: 'Visuals',
    description:
      'A curated collection of AI art, album covers, visual concepts, and digital experiments exploring the boundaries of synthetic creativity.',
    seeProject: 'See project',
    previousProject: 'Previous project',
    nextProject: 'Next project',
    closeExhibition: 'Close exhibition',
    medium: 'Medium',
    dimensions: 'Dimensions',
    support: 'Support',
    edition: 'Edition',
    series: 'Series',
    curatorialNote: 'Curatorial Note',
    previous: 'Previous',
    backToGallery: 'Back to Gallery',
    next: 'Next',
  },
  es: {
    label: 'Colección',
    title: 'Visuales',
    description:
      'Una colección curada de arte con IA, portadas, conceptos visuales y experimentos digitales que exploran los límites de la creatividad sintética.',
    seeProject: 'Ver proyecto',
    previousProject: 'Proyecto anterior',
    nextProject: 'Proyecto siguiente',
    closeExhibition: 'Cerrar exposición',
    medium: 'Medio',
    dimensions: 'Dimensiones',
    support: 'Soporte',
    edition: 'Edición',
    series: 'Serie',
    curatorialNote: 'Nota curatorial',
    previous: 'Anterior',
    backToGallery: 'Volver a la galería',
    next: 'Siguiente',
  },
} satisfies Record<Locale, Record<string, string>>

const worksData: Work[] = [
  {
    title: 'Astralis',
    year: '2024',
    type: 'Album Cover',
    catalog: 'RM-AS-24-001',
    image: '/images/visuals/album-covers/Astralis_Cover.webp',
    alt: 'Square cover art showing fiery red-orange clouds against a black void with teal speckles on the left, grainy distressed texture, and the text "ASTRALIS" plus a parental advisory label.',
    medium: 'Digital composition + grain texture + typography',
    dimensions: '3000 × 3000 px',
    support: 'Digital file, print-ready at 300dpi',
    edition: 'Commercial license',
    series: 'Music & Identity',
    note: 'A dense red-orange cloud mass blooms out of a near-black field, with a vertical pocket of teal speckling along the left side. Soft, smoky transitions and rim-lit highlights shape the clouds, while a visible grain and faint scratch texture gives the surface a worn, film-like finish. Minimal typography sits low and wide, and stamped text elements add a packaged, explicit-release feel rather than a narrative caption.',
    provenance: 'Client commission, 2024',
    status: 'Licensed'
  },
  {
    title: 'Astro',
    year: '2024',
    type: 'Album Cover',
    catalog: 'RM-AO-24-002',
    image: '/images/visuals/album-covers/Astro.webp',
    alt: 'Cover art with the word "ASTRO" above a grainy, green-speckled close-up of an astronaut helmet and a shadowed face lit by red-orange light; Parental Advisory label at bottom left.',
    medium: 'Digital composition + photography + grain texture + typography',
    dimensions: '3000 × 3000 px',
    support: 'Digital file, print-ready at 300dpi',
    edition: 'Commercial license',
    series: 'Music & Identity',
    note: 'A close-up astronaut helmet dominates the frame, the visor swallowing most of the face in shadow while a red-orange glow cuts across the cheeks and nose. The suit reads in muted olive and steel tones, with a ribbed hose and hardware details giving the image a utilitarian, retro-space feel. The portrait sits inside a rounded-square window on a clean white field, while green speckling and heavy grain add a distressed, printed texture. Minimal typography ("ASTRO") and a Parental Advisory badge push it firmly into cover-art language—part cinematic still, part designed object.',
    provenance: 'Client commission, 2024',
    status: 'Licensed'
  },
  {
    title: 'Gaze',
    year: '2024',
    type: 'Album Cover',
    catalog: 'RM-GZ-24-003',
    image: '/images/visuals/album-covers/Gaze.webp',
    alt: 'Square cover art showing a heavily textured, saturated close-up of a human eye with a neon-green iris and red-orange skin tones; Parental Advisory label in the top-right.',
    medium: 'Digital composition + photography + grain texture + typography',
    dimensions: '3000 × 3000 px',
    support: 'Digital file, print-ready at 300dpi',
    edition: 'Commercial license',
    series: 'Music & Identity',
    note: 'A single eye is cropped to fill the square, turning skin, lash line, and iris into a hard-edged landscape of color. The iris reads as neon green with darker ringed structure, set against a cooler cyan white and surrounded by saturated red-orange tones that deepen into near-black shadow at the lid. A dense crosshatched grain and scattered speckling sit over the entire image, giving it the look of a distressed scan or printed fabric rather than a clean photo. The "Parental Advisory: Explicit Content" mark in the top-right completes the packaging language and heightens the sense of intensity and surveillance.',
    provenance: 'Client commission, 2024',
    status: 'Licensed'
  },
  {
    title: 'Dungeon Master\'s Torch',
    year: '2024',
    type: 'AI Poster Concept',
    catalog: 'RM-VC-24-001',
    image: '/images/visuals/visual-concepts/D&D_world.webp',
    alt: 'AI poster concept showing a party advancing through blue vapor led by a torch, with colossal reptilian heads emerging in a staggered procession, warm orange light falling into cool cyan.',
    medium: 'AI-generated image; AI-assisted concept poster',
    dimensions: '3840 × 2160 px',
    support: 'Digital file, print-ready at 300dpi',
    edition: 'Unique concept',
    series: 'Visual Concepts',
    note: 'A party advances through blue vapor, led by a single torch whose heat defines the entire scene. Its light rakes across stone and grit, revealing colossal reptilian heads emerging in a staggered procession—snouts, teeth, and ridged brows repeating with a measured cadence. The figures remain mostly in silhouette, compact and forward-leaning, their scale calibrated against the torch\'s small, unwavering flame. Warm orange falls into cool cyan with abrupt edges, so the image reads as a sequence of visibility: what the fire touches becomes real; what it doesn\'t recedes into atmosphere. The composition keeps the upper field spare, letting fog operate like a moving curtain over the creatures\' faces. Held at human height, the torch becomes a tool of agency—light as rule-set, peril as what waits just beyond its reach.',
    provenance: 'Personal exploration, 2024',
    status: 'Concept'
  },
  {
    title: 'Desert Eclipse',
    year: '2024',
    type: 'AI Poster Concept',
    catalog: 'RM-VC-24-002',
    image: '/images/visuals/visual-concepts/Dune_poster_concept.webp',
    alt: 'AI poster concept showing three figures cresting a dune ridge under an eclipsed sun, with a serpentine surge gathering behind them in amber light and blue-green shadow.',
    medium: 'AI-generated image; AI-assisted concept poster',
    dimensions: '3840 × 2160 px',
    support: 'Digital file, print-ready at 300dpi',
    edition: 'Unique concept',
    series: 'Visual Concepts',
    note: 'Under an eclipsed sun, three figures crest a dune ridge, their silhouettes held against wind-driven dust. A dense field of amber light meets a cooler blue-green shadow, giving the scene a split atmosphere—heat at the horizon, night in the foreground. The eclipse functions as a hard graphic anchor, while the ridge line carries the eye on a single, rising diagonal. Behind the figures, a towering serpentine surge gathers from sand and haze, its contour reading as a geological force before it resolves as a creature. Fine striations and soft drift lines across the dunes establish scale without detail overload, keeping the human forms legible at distance. The image holds tension through restraint: minimal landmarks, a distant settlement swallowed by air, and a landscape that never fully settles. It frames endurance as an act of navigation across shifting ground.',
    provenance: 'Personal exploration, 2024',
    status: 'Concept'
  },
  {
    title: 'Storm Rift',
    year: '2024',
    type: 'AI Poster Concept',
    catalog: 'RM-VC-24-003',
    image: '/images/visuals/visual-concepts/Oddisey_poster_concept.webp',
    alt: 'AI poster concept showing a lone figure standing on wet black rock with a staff, back turned, as rain slants through the frame and a storm mass opens into a bright rift above the sea.',
    medium: 'AI-generated image; AI-assisted concept poster',
    dimensions: '3840 × 2160 px',
    support: 'Digital file, print-ready at 300dpi',
    edition: 'Unique concept',
    series: 'Visual Concepts',
    note: 'A lone figure stands on wet black rock, back turned, a long staff held upright as rain slants through the frame. The sea breaks hard at the shoreline, throwing white spray that catches stray embers of warm light. Farther out, a small sailboat rides the chop, reduced to a dark silhouette against mist. Above, the sky becomes the image\'s engine: a dense, rotating storm mass opens into a bright rift, sending angled shafts down to the water like a seam cut through cloud. Armor plates take the glancing illumination while a torn cloak streams and frays, echoing the sea\'s turbulence. The palette stays in slate, iron, and smoke, with the rupture\'s pale gold acting as the only certainty. The scene fixes the journey at its threshold—weather as antagonist, light as direction.',
    provenance: 'Personal exploration, 2024',
    status: 'Concept'
  }
]

const worksDataEs: Work[] = [
  {
    title: 'Astralis',
    year: '2024',
    type: 'Portada de álbum',
    catalog: 'RM-AS-24-001',
    image: '/images/visuals/album-covers/Astralis_Cover.webp',
    alt: 'Portada cuadrada que muestra nubes rojo-anaranjadas ardientes contra un vacío negro con motas turquesa a la izquierda, textura granulada desgastada y el texto "ASTRALIS" con etiqueta parental advisory.',
    medium: 'Composición digital + textura de grano + tipografía',
    dimensions: '3000 × 3000 px',
    support: 'Archivo digital, listo para impresión a 300 dpi',
    edition: 'Licencia comercial',
    series: 'Música e identidad',
    note: 'Una masa densa de nubes rojo-anaranjadas florece desde un campo casi negro, con una franja vertical de motas turquesa en el lado izquierdo. Transiciones suaves y ahumadas junto a brillos de contorno modelan las nubes, mientras un grano visible y una textura sutil de arañazos dan a la superficie un acabado gastado, casi fílmico. La tipografía mínima se apoya abajo y en horizontal, y los textos sellados aportan una sensación de lanzamiento empaquetado y explícito más que de subtítulo narrativo.',
    provenance: 'Encargo para cliente, 2024',
    status: 'Licenciado',
  },
  {
    title: 'Astro',
    year: '2024',
    type: 'Portada de álbum',
    catalog: 'RM-AO-24-002',
    image: '/images/visuals/album-covers/Astro.webp',
    alt: 'Portada con la palabra "ASTRO" sobre un primer plano granulado, moteado de verde, de un casco de astronauta y un rostro en sombra iluminado por luz rojo-anaranjada; etiqueta Parental Advisory abajo a la izquierda.',
    medium: 'Composición digital + fotografía + textura de grano + tipografía',
    dimensions: '3000 × 3000 px',
    support: 'Archivo digital, listo para impresión a 300 dpi',
    edition: 'Licencia comercial',
    series: 'Música e identidad',
    note: 'Un primer plano de un casco de astronauta domina el encuadre; la visera deja casi todo el rostro en sombra mientras un resplandor rojo-anaranjado corta mejillas y nariz. El traje aparece en tonos oliva apagados y acero, con una manguera acanalada y detalles de hardware que le dan una sensación utilitaria y retroespacial. El retrato queda dentro de una ventana de esquinas redondeadas sobre un fondo blanco limpio, mientras las motas verdes y el grano intenso añaden una textura impresa y desgastada. La tipografía mínima ("ASTRO") y el sello Parental Advisory lo empujan claramente hacia el lenguaje de portada: mitad fotograma cinematográfico, mitad objeto diseñado.',
    provenance: 'Encargo para cliente, 2024',
    status: 'Licenciado',
  },
  {
    title: 'Gaze',
    year: '2024',
    type: 'Portada de álbum',
    catalog: 'RM-GZ-24-003',
    image: '/images/visuals/album-covers/Gaze.webp',
    alt: 'Portada cuadrada que muestra un primer plano muy texturizado y saturado de un ojo humano con iris verde neón y tonos de piel rojo-anaranjados; etiqueta Parental Advisory en la esquina superior derecha.',
    medium: 'Composición digital + fotografía + textura de grano + tipografía',
    dimensions: '3000 × 3000 px',
    support: 'Archivo digital, listo para impresión a 300 dpi',
    edition: 'Licencia comercial',
    series: 'Música e identidad',
    note: 'Un solo ojo se recorta para llenar el cuadrado, convirtiendo piel, línea de pestañas e iris en un paisaje de color de bordes duros. El iris aparece en verde neón con una estructura anillada más oscura, encajado en un blanco cian frío y rodeado por tonos rojo-anaranjados que se hunden en sombra casi negra en el párpado. Un grano denso, entrecruzado y salpicado se posa sobre toda la imagen, dándole aspecto de escaneo desgastado o de tela impresa más que de fotografía limpia. El sello "Parental Advisory: Explicit Content" en la parte superior derecha completa el lenguaje de packaging y refuerza la sensación de intensidad y vigilancia.',
    provenance: 'Encargo para cliente, 2024',
    status: 'Licenciado',
  },
  {
    title: 'Dungeon Master\'s Torch',
    year: '2024',
    type: 'Concepto de póster con IA',
    catalog: 'RM-VC-24-001',
    image: '/images/visuals/visual-concepts/D&D_world.webp',
    alt: 'Concepto de póster con IA que muestra a un grupo avanzando entre vapor azul guiado por una antorcha, con enormes cabezas reptilianas emergiendo en secuencia, luz naranja cálida cayendo sobre cian frío.',
    medium: 'Imagen generada con IA; póster conceptual asistido por IA',
    dimensions: '3840 × 2160 px',
    support: 'Archivo digital, listo para impresión a 300 dpi',
    edition: 'Concepto único',
    series: 'Conceptos visuales',
    note: 'Un grupo avanza entre vapor azul guiado por una sola antorcha cuyo calor define toda la escena. Su luz raspa piedra y polvo, revelando enormes cabezas reptilianas que emergen en una procesión escalonada: hocicos, dientes y arcos óseos repitiéndose con una cadencia medida. Las figuras permanecen casi en silueta, compactas e inclinadas hacia delante, calibradas frente a la pequeña pero firme llama. El naranja cálido cae sobre cian frío con bordes abruptos, de modo que la imagen se lee como una secuencia de visibilidad: lo que toca el fuego se vuelve real; lo que no, retrocede hacia la atmósfera. La composición mantiene despejado el campo superior, dejando que la niebla actúe como una cortina en movimiento sobre los rostros de las criaturas. Sostenida a altura humana, la antorcha se vuelve herramienta de agencia: la luz como regla de juego, el peligro como aquello que espera justo fuera de su alcance.',
    provenance: 'Exploración personal, 2024',
    status: 'Concepto',
  },
  {
    title: 'Desert Eclipse',
    year: '2024',
    type: 'Concepto de póster con IA',
    catalog: 'RM-VC-24-002',
    image: '/images/visuals/visual-concepts/Dune_poster_concept.webp',
    alt: 'Concepto de póster con IA que muestra tres figuras coronando una duna bajo un sol eclipsado, con una oleada serpentina reuniéndose detrás en luz ámbar y sombra azul verdosa.',
    medium: 'Imagen generada con IA; póster conceptual asistido por IA',
    dimensions: '3840 × 2160 px',
    support: 'Archivo digital, listo para impresión a 300 dpi',
    edition: 'Concepto único',
    series: 'Conceptos visuales',
    note: 'Bajo un sol eclipsado, tres figuras coronan una cresta de dunas mientras el viento arrastra el polvo. Un campo denso de luz ámbar se encuentra con una sombra azul verdosa más fría, dando a la escena una atmósfera partida: calor en el horizonte, noche en primer plano. El eclipse funciona como un ancla gráfica dura, mientras la línea de la cresta guía el ojo en una sola diagonal ascendente. Detrás de las figuras, una enorme oleada serpentina se reúne desde la arena y la neblina; primero parece fuerza geológica y luego criatura. Estrías finas y líneas suaves de deriva sobre las dunas establecen escala sin sobrecargar de detalle, manteniendo las figuras humanas legibles a distancia. La imagen sostiene la tensión desde la contención: pocos hitos, un asentamiento lejano tragado por el aire y un paisaje que nunca termina de asentarse. Plantea la resistencia como un acto de navegación sobre terreno cambiante.',
    provenance: 'Exploración personal, 2024',
    status: 'Concepto',
  },
  {
    title: 'Storm Rift',
    year: '2024',
    type: 'Concepto de póster con IA',
    catalog: 'RM-VC-24-003',
    image: '/images/visuals/visual-concepts/Oddisey_poster_concept.webp',
    alt: 'Concepto de póster con IA que muestra a una figura solitaria sobre roca negra mojada con un bastón, de espaldas, mientras la lluvia cae en diagonal y una masa de tormenta se abre en una grieta luminosa sobre el mar.',
    medium: 'Imagen generada con IA; póster conceptual asistido por IA',
    dimensions: '3840 × 2160 px',
    support: 'Archivo digital, listo para impresión a 300 dpi',
    edition: 'Concepto único',
    series: 'Conceptos visuales',
    note: 'Una figura solitaria permanece sobre roca negra mojada, de espaldas, con un bastón largo erguido mientras la lluvia corta el encuadre en diagonal. El mar rompe con fuerza en la orilla, lanzando espuma blanca que atrapa restos de luz cálida. Más lejos, un pequeño velero navega el oleaje, reducido a silueta oscura sobre la niebla. Encima, el cielo se vuelve el motor de la imagen: una masa de tormenta densa y giratoria se abre en una grieta brillante, enviando haces inclinados hacia el agua como si una costura cortara la nube. Las placas de la armadura recogen la iluminación tangencial mientras una capa rasgada se extiende y se deshilacha, haciéndose eco de la turbulencia del mar. La paleta se mantiene en pizarra, hierro y humo, con el oro pálido de la ruptura como única certeza. La escena fija el viaje en su umbral: el clima como antagonista, la luz como dirección.',
    provenance: 'Exploración personal, 2024',
    status: 'Concepto',
  },
]

function getWorksData(locale: Locale) {
  return locale === 'es' ? worksDataEs : worksData
}

function getImageVariant(src: string, width: 640 | 1400) {
  return src.replace(/\.webp$/, `-${width}.webp`)
}

interface ResponsiveVisualImageProps {
  src: string
  alt: string
  className: string
  pictureClassName: string
  sizes: string
  priority?: boolean
  useOriginal?: boolean
  onError: () => void
}

function ResponsiveVisualImage({
  src,
  alt,
  className,
  pictureClassName,
  sizes,
  priority = false,
  useOriginal = false,
  onError,
}: ResponsiveVisualImageProps) {
  const fallbackSrc = useOriginal ? src : getImageVariant(src, 1400)
  const srcSet = useOriginal
    ? undefined
    : `${getImageVariant(src, 640)} 640w, ${getImageVariant(src, 1400)} 1400w`

  return (
    <picture className={pictureClassName}>
      <img
        src={fallbackSrc}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        className={className}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        onError={onError}
      />
    </picture>
  )
}

export default function VisualsPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const copy = visualsCopy[locale]
  const works = getWorksData(locale)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExhibitionOpen, setIsExhibitionOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const dialogRef = useRef<HTMLDivElement>(null)
  const lastTriggerRef = useRef<HTMLElement | null>(null)
  const scrollLockRef = useRef<{
    scrollY: number
    bodyOverflow: string
    bodyPosition: string
    bodyTop: string
    bodyWidth: string
    bodyPaddingRight: string
    htmlOverflow: string
    htmlScrollBehavior: string
  } | null>(null)
  const swipeStateRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    locked: false,
  })
  const suppressCardClickRef = useRef(false)

  const cardRef = useRef<HTMLDivElement>(null)

  const goToPrevious = useCallback(() => {
    if (isAnimating || currentIndex === 0) return
    setIsAnimating(true)
    setDirection('left')
    setCurrentIndex(prev => prev - 1)
    setTimeout(() => setIsAnimating(false), 400)
  }, [currentIndex, isAnimating])

  const goToNext = useCallback(() => {
    if (isAnimating || currentIndex === works.length - 1) return
    setIsAnimating(true)
    setDirection('right')
    setCurrentIndex(prev => prev + 1)
    setTimeout(() => setIsAnimating(false), 400)
  }, [currentIndex, isAnimating, works.length])

  const openExhibition = (index: number, trigger?: HTMLElement | null) => {
    lastTriggerRef.current = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null)
    setCurrentIndex(index)
    setIsExhibitionOpen(true)
  }

  const closeExhibition = useCallback((restoreFocus = true) => {
    setIsExhibitionOpen(false)
    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        lastTriggerRef.current?.focus()
      })
    }
  }, [])

  const currentWork = works[currentIndex]

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isExhibitionOpen) {
        if (e.key === 'Escape') {
          closeExhibition()
        }
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
          setCurrentIndex(prev => prev - 1)
        }
        if (e.key === 'ArrowRight' && currentIndex < works.length - 1) {
          setCurrentIndex(prev => prev + 1)
        }
      } else {
        // Navigate cards on main page
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          goToPrevious()
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          goToNext()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeExhibition, currentIndex, goToNext, goToPrevious, isExhibitionOpen, works.length])

  useEffect(() => {
    if (!isExhibitionOpen || !dialogRef.current) return

    const cleanupFocusTrap = trapFocus(dialogRef.current)
    const { body, documentElement } = document
    const scrollY = window.scrollY || documentElement.scrollTop || body.scrollTop
    const scrollbarWidth = Math.max(0, window.innerWidth - documentElement.clientWidth)

    scrollLockRef.current = {
      scrollY,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
      htmlOverflow: documentElement.style.overflow,
      htmlScrollBehavior: documentElement.style.scrollBehavior,
    }

    documentElement.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      cleanupFocusTrap()

      if (scrollLockRef.current) {
        const lock = scrollLockRef.current
        documentElement.style.overflow = lock.htmlOverflow
        body.style.overflow = lock.bodyOverflow
        body.style.position = lock.bodyPosition
        body.style.top = lock.bodyTop
        body.style.width = lock.bodyWidth
        body.style.paddingRight = lock.bodyPaddingRight
        documentElement.style.scrollBehavior = 'auto'
        window.scrollTo(0, lock.scrollY)
        window.requestAnimationFrame(() => {
          documentElement.style.scrollBehavior = lock.htmlScrollBehavior
        })
      }
    }
  }, [isExhibitionOpen])

  // Disable scroll-snap for this page
  useEffect(() => {
    const previousScrollSnapType = document.documentElement.style.scrollSnapType
    document.documentElement.style.scrollSnapType = 'none'

    return () => {
      document.documentElement.style.scrollSnapType = previousScrollSnapType
    }
  }, [])

  const isInteractiveTarget = (target: EventTarget | null) => {
    return target instanceof Element && Boolean(target.closest('a, button, input, textarea, select, [role="button"]'))
  }

  const resetSwipeState = () => {
    swipeStateRef.current = {
      active: false,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      locked: false,
    }
  }

  const handleSwipeStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isExhibitionOpen || event.pointerType !== 'touch' || !event.isPrimary || isInteractiveTarget(event.target)) {
      return
    }

    suppressCardClickRef.current = false
    swipeStateRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      locked: false,
    }
  }

  const handleSwipeMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = swipeStateRef.current
    if (!state.active) return

    state.lastX = event.clientX
    state.lastY = event.clientY

    const dx = state.lastX - state.startX
    const dy = state.lastY - state.startY
    const absX = Math.abs(dx)
    const absY = Math.abs(dy)

    if (!state.locked) {
      if (absX < 12 && absY < 12) return

      const hasClearHorizontalIntent =
        absX >= 28 &&
        absX > absY * 1.75 &&
        absY <= 28

      if (hasClearHorizontalIntent) {
        state.locked = true
        suppressCardClickRef.current = true
        return
      }

      if (absY >= 18 && absY >= absX * 0.85) {
        resetSwipeState()
      }
    }
  }

  const handleSwipeEnd = () => {
    const state = swipeStateRef.current
    if (!state.active) return

    if (state.locked) {
      const dx = state.lastX - state.startX
      if (Math.abs(dx) >= 56) {
        suppressCardClickRef.current = true
        if (dx < 0) {
          goToNext()
        } else {
          goToPrevious()
        }
        window.setTimeout(() => {
          suppressCardClickRef.current = false
        }, 0)
      } else {
        suppressCardClickRef.current = false
      }
    }

    resetSwipeState()
  }

  return (
    <>
      {/* Decorative elements are static and hidden on mobile for performance. */}
      <div className={styles.grain} aria-hidden="true"></div>
      <div className={styles.vignette} aria-hidden="true"></div>
      <div className={styles.scanlines} aria-hidden="true"></div>
      <div className={styles.lightLeak} aria-hidden="true"></div>
      <div className={styles.lightLeakTwo} aria-hidden="true"></div>
      <div className={styles.filmBurn} aria-hidden="true"></div>

      <Header locale={locale} />
      
      <main className={styles.main} id="main-content" role="main" data-mobile-audit="visuals-page">
        <div className={styles.container}>
          {/* Fixed Intro Section */}
          <div className={styles.intro}>
            <p className={styles.label}>
              <span className={styles.labelLine}></span>
              {copy.label}
            </p>
            <h1 className={styles.title}>{copy.title}</h1>
            <div className={styles.divider}></div>
            <p className={styles.description}>
              {copy.description}
            </p>
            <p className={styles.year}>© 2024</p>
          </div>

          {/* Card Display with Navigation */}
          <div
            className={styles.cardDisplay}
            data-mobile-audit="visuals-surface"
            onPointerDown={handleSwipeStart}
            onPointerMove={handleSwipeMove}
            onPointerUp={handleSwipeEnd}
            onPointerCancel={handleSwipeEnd}
          >
            <div className={styles.cardContainer}>
              <div 
                ref={cardRef}
                key={currentIndex}
                className={`${styles.cardSlide} ${direction === 'right' ? styles.slideInRight : styles.slideInLeft}`}
              >
                <article
                  className={styles.card}
                  data-mobile-audit="visual-card"
                  onClick={(event) => {
                    if (suppressCardClickRef.current) {
                      suppressCardClickRef.current = false
                      return
                    }
                    openExhibition(currentIndex, event.currentTarget)
                  }}
                >
                  <div className={styles.cardImageWrapper}>
                    <ResponsiveVisualImage
                      src={imageErrors.has(currentWork.catalog) ? '/images/placeholders/image-placeholder.webp' : currentWork.image}
                      alt={currentWork.alt}
                      className={styles.cardImage}
                      pictureClassName={styles.cardPicture}
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      useOriginal={imageErrors.has(currentWork.catalog)}
                      onError={() => {
                        setImageErrors(prev => new Set(prev).add(currentWork.catalog))
                      }}
                    />
                    <div className={styles.cardOverlay}>
                      <div className={styles.cardContent}>
                        <p className={styles.cardIndex}>
                          {String(currentIndex + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
                        </p>
                        <h2 className={styles.cardTitle}>{currentWork.title}</h2>
                        <p className={styles.cardMeta}>{currentWork.year} — {currentWork.type}</p>
                        <span className={styles.cardButton}>
                          <span>{copy.seeProject}</span>
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              type="button"
              className={`${styles.navButton} ${styles.navButtonPrev}`}
              onClick={goToPrevious}
              disabled={currentIndex === 0 || isAnimating}
              aria-label={copy.previousProject}
            >
              <span className={styles.navArrow}>←</span>
            </button>
            <button
              type="button"
              className={`${styles.navButton} ${styles.navButtonNext}`}
              onClick={goToNext}
              disabled={currentIndex === works.length - 1 || isAnimating}
              aria-label={copy.nextProject}
            >
              <span className={styles.navArrow}>→</span>
            </button>

            </div>
        </div>
      </main>

      <Footer locale={locale} />

      {/* Exhibition View */}
      {isExhibitionOpen ? (
        <div
          ref={dialogRef}
          className={`${styles.exhibition} ${styles.exhibitionActive}`}
          id="exhibition"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exhibition-title"
        >
          <button
            type="button"
            className={styles.exhibitionClose}
            onClick={() => closeExhibition()}
            aria-label={copy.closeExhibition}
          >
            ✕
          </button>

          <div className={styles.exhibitionImagePanel}>
            <div className={styles.exhibitionImageWrap}>
              {currentWork && (
                <>
                  <ResponsiveVisualImage
                    key={currentWork.catalog}
                    src={imageErrors.has(currentWork.catalog) ? '/images/placeholders/image-placeholder.webp' : currentWork.image}
                    alt={currentWork.alt}
                    className={styles.exhibitionImage}
                    pictureClassName={styles.exhibitionPicture}
                    sizes="(max-width: 900px) 100vw, 55vw"
                    useOriginal={imageErrors.has(currentWork.catalog)}
                    onError={() => {
                      setImageErrors(prev => new Set(prev).add(currentWork.catalog))
                    }}
                  />
                  <span className={styles.exhibitionCounter}>
                    {String(currentIndex + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className={styles.exhibitionDetails}>
            <div className={styles.exhibitionScroll} data-mobile-audit="visuals-exhibition-scroll">
              <div className={styles.exhibitionContent}>
                {currentWork && (
                  <>
                    <div className={styles.exhibitionCatalog}>
                      <span>{currentWork.catalog}</span>
                    </div>

                    <h2 id="exhibition-title" className={styles.exhibitionTitle}>{currentWork.title}</h2>
                    <p className={styles.exhibitionSubtitle}>{currentWork.year} — {currentWork.type}</p>
                    
                    <div className={styles.exhibitionDivider}></div>

                    <div className={styles.exhibitionMeta}>
                      <div className={styles.exhibitionField}>
                        <span className={styles.exhibitionLabel}>{copy.medium}</span>
                        <span className={styles.exhibitionValue}>{currentWork.medium}</span>
                      </div>
                      <div className={styles.exhibitionField}>
                        <span className={styles.exhibitionLabel}>{copy.dimensions}</span>
                        <span className={styles.exhibitionValue}>{currentWork.dimensions}</span>
                      </div>
                      <div className={styles.exhibitionField}>
                        <span className={styles.exhibitionLabel}>{copy.support}</span>
                        <span className={styles.exhibitionValue}>{currentWork.support}</span>
                      </div>
                      <div className={styles.exhibitionField}>
                        <span className={styles.exhibitionLabel}>{copy.edition}</span>
                        <span className={styles.exhibitionValue}>{currentWork.edition}</span>
                      </div>
                      <div className={`${styles.exhibitionField} ${styles.exhibitionFieldFull}`}>
                        <span className={styles.exhibitionLabel}>{copy.series}</span>
                        <span className={styles.exhibitionValue}>{currentWork.series}</span>
                      </div>
                    </div>

                    <div className={styles.exhibitionNote}>
                      <p className={styles.exhibitionNoteLabel}>{copy.curatorialNote}</p>
                      <p className={styles.exhibitionNoteText}>{currentWork.note}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <nav className={styles.exhibitionNav}>
              <button
                type="button"
                className={styles.exhibitionNavButton}
                onClick={() => {
                  if (currentIndex > 0) {
                    setCurrentIndex(prev => prev - 1)
                  }
                }}
                disabled={currentIndex === 0}
              >
                <span><span aria-hidden="true">←</span> {copy.previous}</span>
              </button>
              <button
                type="button"
                className={styles.exhibitionNavButton}
                onClick={() => closeExhibition()}
              >
                <span>{copy.backToGallery}</span>
              </button>
              <button
                type="button"
                className={styles.exhibitionNavButton}
                onClick={() => {
                  if (currentIndex < works.length - 1) {
                    setCurrentIndex(prev => prev + 1)
                  }
                }}
                disabled={currentIndex === works.length - 1}
              >
                <span>{copy.next} <span aria-hidden="true">→</span></span>
              </button>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  )
}
