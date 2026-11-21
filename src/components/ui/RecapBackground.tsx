'use client'

import { useEffect, useState } from 'react'

const SOURCES = {
  desktop: { video: '/videos/recap-desktop.mp4', poster: '/videos/recap-desktop-poster.jpg' },
  mobile: { video: '/videos/recap-mobile.mp4', poster: '/videos/recap-mobile-poster.jpg' },
}

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string }
}

/**
 * Video recap de fondo. Optimizaciones:
 * - Se muestra primero el poster (JPG liviano) y el video se carga recién cuando el
 *   navegador está libre, así no compite con el render inicial.
 * - Archivo distinto para móvil (vertical, más liviano) y escritorio.
 * - No se descarga con "ahorro de datos", conexión lenta o movimiento reducido.
 * - Sin audio, en bucle, y se desmonta (deja de reproducir) al cerrar el menú.
 */
export default function RecapBackground() {
  const [variant, setVariant] = useState<'desktop' | 'mobile'>('desktop')
  const [canPlay, setCanPlay] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setVariant(window.matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop')

    const conn = (navigator as NavigatorWithConnection).connection
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const slow = conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '')
    if (reduced || slow) return

    const start = () => setCanPlay(true)
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 })
      return () => window.cancelIdleCallback(id)
    }
    const t = setTimeout(start, 400)
    return () => clearTimeout(t)
  }, [])

  const { video, poster } = SOURCES[variant]

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        fetchPriority="high"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(0.35)',
        }}
      />
      {canPlay && (
        <video
          key={video}
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onPlaying={() => setReady(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(0.35)',
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.8s var(--ease-out-expo)',
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.35) 100%), linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0) 60%)',
        }}
      />
    </div>
  )
}
