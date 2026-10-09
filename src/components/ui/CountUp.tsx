'use client'

import { useEffect, useState } from 'react'

import { useInView } from '@/lib/useInView'

interface CountUpProps {
  value: number
  prefix?: string
  duration?: number
}

// Cuenta desde 0 hasta el valor cuando entra en pantalla.
export default function CountUp({ value, prefix = '', duration = 1100 }: CountUpProps) {
  const { ref, isVisible } = useInView<HTMLSpanElement>()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [isVisible, value, duration])

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}
      {display}
    </span>
  )
}
