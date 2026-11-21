'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import type { AudienceCategory } from '@/types'

const STORAGE_KEY = 'wal-audience'

interface AudienceContextValue {
  audience: AudienceCategory | null
  gateOpen: boolean
  choose: (value: AudienceCategory | null) => void
  openGate: () => void
}

const AudienceContext = createContext<AudienceContextValue | null>(null)

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [audience, setAudience] = useState<AudienceCategory | null>(null)
  // Abierto por defecto: el menú aparece desde que el usuario entra.
  const [gateOpen, setGateOpen] = useState(true)

  // Si ya eligió en esta sesión, no se le vuelve a mostrar el menú.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY) as AudienceCategory | 'todo' | null
      if (saved) {
        setAudience(saved === 'todo' ? null : saved)
        setGateOpen(false)
      }
    } catch {
      /* sessionStorage no disponible */
    }
  }, [])

  const choose = useCallback((value: AudienceCategory | null) => {
    setAudience(value)
    setGateOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, value ?? 'todo')
    } catch {
      /* noop */
    }
    // Lleva al contenido elegido
    requestAnimationFrame(() =>
      document.getElementById('portafolio')?.scrollIntoView({ behavior: 'smooth' })
    )
  }, [])

  const openGate = useCallback(() => setGateOpen(true), [])

  const value = useMemo(
    () => ({ audience, gateOpen, choose, openGate }),
    [audience, gateOpen, choose, openGate]
  )

  return <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>
}

export function useAudience() {
  const ctx = useContext(AudienceContext)
  if (!ctx) throw new Error('useAudience debe usarse dentro de AudienceProvider')
  return ctx
}
