'use client'

import { useState, useEffect, useCallback } from 'react'
import { isSoundEnabled, setSoundEnabled, playSound } from '@/lib/sounds'

export function useSound() {
  const [enabled, setEnabledState] = useState(false)

  useEffect(() => {
    setEnabledState(isSoundEnabled())
  }, [])

  const toggle = useCallback(() => {
    const next = !isSoundEnabled()
    setSoundEnabled(next)
    setEnabledState(next)
  }, [])

  const playSuccess = useCallback(() => playSound('success'), [])
  const playClick = useCallback(() => playSound('click'), [])

  return { enabled, toggle, playSuccess, playClick }
}
