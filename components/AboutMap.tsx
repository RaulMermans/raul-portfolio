'use client'

import type { CSSProperties } from 'react'
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps'

const CITIES: { coords: [number, number]; delay: number }[] = [
  { coords: [-4.42, 36.72], delay: 0 },
  { coords: [-3.7, 40.42], delay: 0.55 },
  { coords: [-81.38, 28.54], delay: 1.1 },
]

export default function AboutMap({ label }: { label: string }) {
  return (
    <ComposableMap
      className="about-map"
      projection="geoNaturalEarth1"
      projectionConfig={{ scale: 153 }}
      width={800}
      height={400}
      aria-label={label}
    >
      <defs>
        <pattern id="about-map-stip" patternUnits="userSpaceOnUse" width="5" height="5">
          <circle cx="1" cy="1" r="0.9" fill="rgba(240,236,226,.22)" />
        </pattern>
      </defs>
      <Geographies geography="/world-110m.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                default: {
                  fill: 'url(#about-map-stip)',
                  stroke: 'rgba(240,236,226,0.18)',
                  strokeWidth: 0.5,
                  outline: 'none',
                },
                hover: {
                  fill: 'url(#about-map-stip)',
                  stroke: 'rgba(240,236,226,0.18)',
                  strokeWidth: 0.5,
                  outline: 'none',
                },
                pressed: {
                  fill: 'url(#about-map-stip)',
                  stroke: 'rgba(240,236,226,0.18)',
                  strokeWidth: 0.5,
                  outline: 'none',
                },
              }}
            />
          ))
        }
      </Geographies>
      <Line from={[-4.42, 36.72]} to={[-3.7, 40.42]} className="about-map__trail" />
      <Line from={[-4.06, 38.57]} to={[-81.38, 28.54]} className="about-map__trail" />
      {CITIES.map(({ coords, delay }) => (
        <Marker key={coords.join(',')} coordinates={coords}>
          <circle
            r="16"
            className="about-map__halo"
            style={{ '--ping-delay': `${delay}s` } as CSSProperties}
          />
          <circle r="4" className="about-map__pin" />
        </Marker>
      ))}
    </ComposableMap>
  )
}
