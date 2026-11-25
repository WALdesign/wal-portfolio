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
    let current = 0
    let target = 0

    const measure = () => {
      const height = wrap.offsetHeight
      // Si el Hero es más alto que la pantalla, se fija por su borde inferior para que se vea completo.
      wrap.style.top = `${Math.min(0, window.innerHeight - height)}px`
      target = Math.min(1, Math.max(0, window.scrollY / Math.max(height, 1)))
    }

    const render = () => {
      // Interpolación suave hacia el objetivo: da inercia y evita saltos entre eventos de scroll.
      current += (target - current) * 0.12
      if (Math.abs(target - current) < 0.0005) current = target

      // Curva ease-out: el cambio arranca suave y se asienta al final.
      const eased = 1 - Math.pow(1 - current, 3)
      inner.style.opacity = String(1 - eased * 0.7)
      inner.style.transform = `translate3d(0, ${eased * -6}%, 0) scale(${1 - eased * 0.06})`

      frame = current === target ? 0 : requestAnimationFrame(render)
    }

    const onScroll = () => {
      measure()
      if (!prefersReducedMotion && !frame) frame = requestAnimationFrame(render)
    }

    measure()
    current = target
    if (!prefersReducedMotion) render()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    // Fondo negro sólido: al atenuarse el Hero, el footer que queda debajo no se transparenta a través de él.
    <div ref={wrapRef} style={{ position: 'sticky', top: 0, zIndex: 0, backgroundColor: '#000000' }}>
      <div
        ref={innerRef}
        style={{ transformOrigin: 'center bottom', willChange: 'transform, opacity' }}
      >
        {children}
      </div>
    </div>
  )
}
