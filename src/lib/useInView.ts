'use client'

import { useEffect, useRef, useState } from 'react'

// Devuelve true la primera vez que el elemento entra en pantalla (o de inmediato con reduced motion).
export function useInView<T extends Element>(threshold = 0.12) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
