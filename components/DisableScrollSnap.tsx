'use client'

import { useEffect } from 'react'

export default function DisableScrollSnap() {
  useEffect(() => {
    document.documentElement.style.scrollSnapType = 'none'
    return () => {
      document.documentElement.style.scrollSnapType = ''
    }
  }, [])

  return null
}
