'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoPreviewProps {
  previewSrc: string
  posterSrc: string
  alt: string
  className?: string
}

/**
 * Miniatura de video propio para las tarjetas del portafolio.
 * Muestra el poster y solo descarga/reproduce el clip corto (sin audio)
 * mientras la tarjeta está visible en pantalla. Fuera de pantalla se pausa.
 */
export default function VideoPreview({ previewSrc, posterSrc, alt, className }: VideoPreviewProps) {
  const wrapper = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const node = wrapper.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true)
          video.current?.play().catch(() => {})
        } else {
          video.current?.pause()
        }
      },
      { threshold: 0.35 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const mediaStyle = {
    position: 'absolute' as const,
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    transition: 'transform 0.5s var(--ease-out-expo)',
  }

  return (
    <div ref={wrapper} style={{ position: 'absolute', inset: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={posterSrc} alt={alt} loading="lazy" className={className} style={mediaStyle} />
      {load && (
        <video
          ref={video}
          src={previewSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className={className}
          style={mediaStyle}
        />
      )}
    </div>
  )
}
