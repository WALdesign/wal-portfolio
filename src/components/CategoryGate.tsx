'use client'

import { useEffect, useRef } from 'react'

import Logo from '@/components/ui/Logo'
import RecapBackground from '@/components/ui/RecapBackground'
import { AUDIENCE_OPTIONS } from '@/lib/data'
import { useAudience } from '@/lib/AudienceContext'

export default function CategoryGate() {
  const { gateOpen, choose, goToPlans } = useAudience()
  const firstButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!gateOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstButton.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') choose(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [gateOpen, choose])

  if (!gateOpen) return null

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="gate-title" className="wal-gate">
      <RecapBackground />

      <div className="wal-gate__inner">
        <header className="wal-gate__top wal-gate__fade" style={{ animationDelay: '0.1s' }}>
          <Logo style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.01em' }} />
          <div className="wal-gate__shortcuts">
            <button type="button" className="wal-gate__skip" onClick={() => choose(null)}>
              Ver todo
            </button>
            <button type="button" className="wal-gate__plans" onClick={goToPlans}>
              Ver planes <span aria-hidden="true">→</span>
            </button>
          </div>
        </header>

        <div className="wal-gate__body">
          <div className="wal-gate__intro">
            <p className="wal-gate__kicker wal-gate__fade" style={{ animationDelay: '0.25s' }}>
              <span className="wal-gate__line" aria-hidden="true" />
              Producción audiovisual · Costa Rica
            </p>
            <h1
              id="gate-title"
              className="wal-gate__title wal-gate__fade"
              style={{ animationDelay: '0.4s' }}
            >
              Bienvenido<span style={{ color: 'var(--color-red)' }}>.</span>
            </h1>
            <p className="wal-gate__lead wal-gate__fade" style={{ animationDelay: '0.55s' }}>
              Gracias por estar aquí. Cuéntame qué quieres contar y te muestro el trabajo pensado
              para ti.
            </p>
          </div>

          <nav aria-label="Elige tu categoría" className="wal-gate__list">
            <p className="wal-gate__label wal-gate__fade" style={{ animationDelay: '0.65s' }}>
              ¿Qué tipo de proyecto tienes?
            </p>
            {AUDIENCE_OPTIONS.map((opt, i) => (
              <button
                key={opt.key}
                ref={i === 0 ? firstButton : undefined}
                type="button"
                onClick={() => choose(opt.key)}
                className="wal-gate__option wal-gate__fade"
                style={{ animationDelay: `${0.75 + i * 0.08}s` }}
              >
                <span className="wal-gate__num">{opt.n}</span>
                <span className="wal-gate__text">
                  <span className="wal-gate__name">{opt.label}</span>
                  <span className="wal-gate__hint">{opt.hint}</span>
                </span>
                <span className="wal-gate__arrow" aria-hidden="true">
                  →
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
