'use client'

export default function FilmStrip() {
  return (
    <>
      <div className="film-strip film-strip--left" aria-hidden="true">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="film-strip__sprocket" />
        ))}
      </div>
      <div className="film-strip film-strip--right" aria-hidden="true">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="film-strip__sprocket" />
        ))}
      </div>
    </>
  )
}
