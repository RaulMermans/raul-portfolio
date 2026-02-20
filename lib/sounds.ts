/**
 * Sound utilities for portfolio microinteractions.
 * Respects prefers-reduced-motion and localStorage enabled state.
 * Gracefully no-ops if audio files are missing.
 */

const SOUND_ENABLED_KEY = 'portfolio-sound-enabled'
const SOUND_PATHS = {
  success: '/sounds/success.mp3',
  click: '/sounds/click.mp3',
} as const

export function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return false
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return false
  const stored = localStorage.getItem(SOUND_ENABLED_KEY)
  return stored === 'true'
}

export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(SOUND_ENABLED_KEY, String(enabled))
}

export function playSound(type: 'success' | 'click'): void {
  if (!isSoundEnabled()) return
  const path = SOUND_PATHS[type]
  if (!path) return

  const audio = new Audio(path)
  audio.volume = 0.6
  const p = audio.play()
  if (p && typeof p.catch === 'function') {
    p.catch(() => {
      // File missing or playback blocked — silently ignore
    })
  }
}
