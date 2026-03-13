'use client'

/**
 * Renders decorative film sprocket holes on the sides of case study pages.
 * Only visible on desktop (hidden via CSS on mobile).
 */
export default function FilmStrip() {
  // Generate sprockets for the vertical height
  const sprockets = Array.from({ length: 24 }, (_, i) => (
    <div key={i} className="film-strip__sprocket" />
  ))

  return (
    <>
      <div className="film-strip film-strip--left" aria-hidden="true">
        {sprockets}
      </div>
      <div className="film-strip film-strip--right" aria-hidden="true">
        {sprockets}
      </div>
    </>
  )
}
