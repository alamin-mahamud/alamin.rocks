import { useState, useCallback } from 'react'
import { useIntersectionObserver } from './useIntersectionObserver'

interface UseLazyLoadOptions {
  threshold?: number
  rootMargin?: string
}

export const useLazyLoad = (options: UseLazyLoadOptions = {}) => {
  const [loaded, setLoaded] = useState(false)
  const { elementRef, isVisible } = useIntersectionObserver(options)

  const load = useCallback(() => {
    if (!loaded && isVisible) {
      setLoaded(true)
    }
  }, [loaded, isVisible])

  // Auto-load when visible
  if (isVisible && !loaded) {
    setLoaded(true)
  }

  return {
    elementRef,
    loaded,
    isVisible,
    load
  }
}