'use client'

import { useState, useId } from 'react'
import type { HowThisWasMade as HowThisWasMadeType } from '@/types/case-study'

interface HowThisWasMadeProps {
  content: HowThisWasMadeType
  accentColor?: string
  className?: string
}

export default function HowThisWasMade({ content, accentColor, className = '' }: HowThisWasMadeProps) {
  const [expanded, setExpanded] = useState(false)
  const buttonId = useId()
  const panelId = useId()

  if (!content?.steps?.length) return null

  return (
    <div className={`how-this-was-made ${className}`.trim()}>
      <button
        type="button"
        id={buttonId}
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((prev) => !prev)}
        className="how-this-was-made__trigger"
      >
        <span className="how-this-was-made__label">{content.title}</span>
        <span
          className="how-this-was-made__icon"
          aria-hidden
          style={{ color: accentColor }}
        >
          {expanded ? '−' : '+'}
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!expanded}
        className="how-this-was-made__panel"
      >
        <ol className="how-this-was-made__steps">
          {content.steps.map((step, index) => (
            <li key={index} className="how-this-was-made__step">
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
