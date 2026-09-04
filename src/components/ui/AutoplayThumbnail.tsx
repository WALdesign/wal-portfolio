'use client'

import { useEffect, useRef, useState } from 'react'

import { getYouTubeVideoId } from '@/lib/utils'

interface AutoplayThumbnailProps {
  videoUrl: string
  thumbnailSrc: string
  alt: string
  className?: string
}

export default function AutoplayThumbnail({
  videoUrl,
  thumbnailSrc,
  alt,
  className,
}: AutoplayThumbnailProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoId = getYouTubeVideoId(videoUrl)

  useEffect(() => {
    const node = ref.current
    if (!node || !videoId) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [videoId])

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0 }}>
      {isPlaying && videoId ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&playsinline=1&rel=0`}
          title={alt}
          allow="autoplay; encrypted-media"
          className={className}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 0,
            pointerEvents: 'none',
          }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumbnailSrc}
          alt={alt}
          className={className}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s var(--ease-out-expo)',
          }}
        />
      )}
    </div>
  )
}
