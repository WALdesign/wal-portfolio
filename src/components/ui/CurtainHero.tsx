'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface CurtainHeroProps {
  children: ReactNode
}

// Fija el Hero al fondo mientras el resto del contenido sube encima como una cortina.
// A medida que la cortina avanza, el Hero se atenúa y se aleja ligeramente.
export default function CurtainHero({ children }: CurtainHeroProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0

    const update = () => {
      frame = 0
      const height = wrap.offsetHeight
      const viewport = window.innerHeight

      // Si el Hero es más alto que la pantalla, se fija por su borde inferior para que se vea completo.
      wrap.style.top = `${Math.min(0, viewport - height)}px`

      if (prefersReducedMotion) return

      const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(height, 1)))
      inner.style.opacity = String(1 - progress * 0.65)
      inner.style.transform = `scale(${1 - progress * 0.05})`
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={wrapRef} style={{ position: 'sticky', top: 0, zIndex: 0 }}>
      <div
        ref={innerRef}
        style={{ transformOrigin: 'center bottom', willChange: 'transform, opacity' }}
      >
        {children}
      </div>
    </div>
  )
}
