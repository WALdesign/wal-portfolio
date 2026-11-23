'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import type { AudienceCategory } from '@/types'

interface AudienceContextValue {
  audience: AudienceCategory | null
  gateOpen: boolean
  /** Elección desde el menú de bienvenida: cierra el menú y lleva al portafolio. */
  choose: (value: AudienceCategory | null) => void
  /** Cambio de categoría desde el propio portafolio (sin abrir el menú). */
  setAudience: (value: AudienceCategory | null) => void
  /** Cierra el menú y lleva directo a los planes. */
  goToPlans: () => void
  openGate: () => void
}

const AudienceContext = createContext<AudienceContextValue | null>(null)

function scrollTo(id: string) {
  requestAnimationFrame(() =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  )
}

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [audience, setAudience] = useState<AudienceCategory | null>(null)
  // Siempre abierto al cargar: en cada visita o recarga aparece la bienvenida.
  const [gateOpen, setGateOpen] = useState(true)

  const choose = useCallback((value: AudienceCategory | null) => {
    setAudience(value)
    setGateOpen(false)
    scrollTo('portafolio')
  }, [])

  const goToPlans = useCallback(() => {
    setGateOpen(false)
    scrollTo('planes')
  }, [])

  const openGate = useCallback(() => setGateOpen(true), [])

  const value = useMemo(
    () => ({ audience, gateOpen, choose, setAudience, goToPlans, openGate }),
    [audience, gateOpen, choose, goToPlans, openGate]
  )

  return <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>
}

export function useAudience() {
  const ctx = useContext(AudienceContext)
  if (!ctx) throw new Error('useAudience debe usarse dentro de AudienceProvider')
  return ctx
}
