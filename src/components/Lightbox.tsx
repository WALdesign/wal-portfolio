'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'

import { getVimeoEmbedUrl, getYouTubeEmbedUrl } from '@/lib/utils'
import type { PortfolioItem } from '@/types'

interface LightboxProps {
  item: PortfolioItem | null
  onClose: () => void
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '72px var(--space-page-x) 24px', // deja espacio arriba para el botón Cerrar
  backgroundColor: 'rgba(0, 0, 0, 0.92)',
}

// Botón de cierre grande y visible (mínimo 44px para tocarlo bien en el celular).
const closeButtonStyle: CSSProperties = {
  position: 'fixed',
  top: '16px',
  right: '16px',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  minHeight: '44px',
  padding: '0 16px',
  borderRadius: '999px',
  border: '1px solid var(--color-border)',
  backgroundColor: 'rgba(20, 20, 20, 0.85)',
  color: 'var(--color-white)',
  fontFamily: 'var(--font-primary)',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
}

const VIDEO_FILE_EXTENSIONS = ['.mp4', '.webm', '.mov']

type VideoOrientation = NonNullable<PortfolioItem['aspectRatio']>

const VIDEO_WRAPPER_STYLE: Record<VideoOrientation, CSSProperties> = {
  portrait: {
    height: 'min(86vh, 900px)',
    aspectRatio: '9 / 16',
  },
  landscape: {
    width: 'min(86vw, 960px)',
    aspectRatio: '16 / 9',
  },
  square: {
    width: 'min(80vw, 80vh, 720px)',
    aspectRatio: '1 / 1',
  },
}

function VideoPlayer({
  videoUrl,
  title,
  orientation,
  poster,
}: {
  videoUrl: string
  title: string
  orientation: VideoOrientation
  poster?: string
}) {
  const isYouTube = /youtube\.com|youtu\.be/.test(videoUrl)
  const isVimeo = /vimeo\.com/.test(videoUrl)
  const isFile = VIDEO_FILE_EXTENSIONS.some((ext) => videoUrl.toLowerCase().endsWith(ext))

  const wrapperStyle: CSSProperties = {
    position: 'relative',
    borderRadius: '4px',
    overflow: 'hidden',
    backgroundColor: 'var(--color-surface)',
    ...VIDEO_WRAPPER_STYLE[orientation],
  }

  if (isYouTube || isVimeo) {
    const embedUrl = isYouTube ? getYouTubeEmbedUrl(videoUrl) : getVimeoEmbedUrl(videoUrl)

    return (
      <div style={wrapperStyle}>
        <iframe
          src={`${embedUrl}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      </div>
    )
  }

  if (isFile) {
    return (
      <div style={wrapperStyle}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          src={videoUrl}
          poster={poster}
          controls
          autoPlay
          playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      </div>
    )
  }

  return (
    <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-primary)' }}>
      {`// reproductor de video próximamente — ${title}`}
    </p>
  )
}

export default function Lightbox({ item, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!item) return

    const previouslyFocused = document.activeElement as HTMLElement | null

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      // Devuelve el foco a la tarjeta que se abrió.
      previouslyFocused?.focus({ preventScroll: true })
    }
  }, [item, onClose])

  if (!item) return null

  // Se monta directamente en <body>: así el overlay no queda recortado por el
  // clip-path de la cortina ni tapado por la barra de navegación (z-index 80).
  return createPortal(
    <div style={overlayStyle} onClick={onClose} role="dialog" aria-modal="true" aria-label={item.title}>
      <button
        ref={closeRef}
        type="button"
        style={closeButtonStyle}
        onClick={(event) => {
          event.stopPropagation()
          onClose()
        }}
        aria-label="Cerrar"
      >
        <span aria-hidden="true" style={{ fontSize: '20px', lineHeight: 1 }}>
          ×
        </span>
        Cerrar
      </button>

      <div onClick={(event) => event.stopPropagation()}>
        {item.isVideo ? (
          item.videoUrl ? (
            <VideoPlayer
              videoUrl={item.videoUrl}
              title={item.title}
              orientation={item.aspectRatio ?? 'landscape'}
              poster={item.imageSrc}
            />
          ) : (
            <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-primary)' }}>
              {`// reproductor de video próximamente — ${item.title}`}
            </p>
          )
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageSrc}
            alt={item.imageAlt}
            style={{ maxWidth: '960px', maxHeight: '86vh', borderRadius: '4px' }}
          />
        )}
      </div>
    </div>,
    document.body
  )
}
