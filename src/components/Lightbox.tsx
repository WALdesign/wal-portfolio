'use client'

import { useEffect, type CSSProperties } from 'react'

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
  padding: 'var(--space-page-x)',
  backgroundColor: 'rgba(0, 0, 0, 0.92)',
}

const closeButtonStyle: CSSProperties = {
  position: 'absolute',
  top: '24px',
  right: '24px',
  background: 'none',
  border: 'none',
  color: 'var(--color-white)',
  fontSize: '32px',
  lineHeight: 1,
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
}: {
  videoUrl: string
  title: string
  orientation: VideoOrientation
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
  useEffect(() => {
    if (!item) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div style={overlayStyle} onClick={onClose} role="dialog" aria-modal="true">
      <button type="button" style={closeButtonStyle} onClick={onClose} aria-label="Cerrar">
        ×
      </button>

      <div onClick={(event) => event.stopPropagation()}>
        {item.isVideo ? (
          item.videoUrl ? (
            <VideoPlayer
              videoUrl={item.videoUrl}
              title={item.title}
              orientation={item.aspectRatio ?? 'landscape'}
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
    </div>
  )
}
