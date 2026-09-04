'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

import { IconCamera, IconReel } from '@/components/icons/PlanIcons'
import Lightbox from '@/components/Lightbox'
import AutoplayThumbnail from '@/components/ui/AutoplayThumbnail'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionLabel from '@/components/ui/SectionLabel'
import { PORTFOLIO_CONTENT, PORTFOLIO_ITEMS } from '@/lib/data'
import { cn, getYouTubeThumbnail } from '@/lib/utils'
import type { PortfolioFilter, PortfolioItem } from '@/types'

const ASPECT_RATIO: Record<NonNullable<PortfolioItem['aspectRatio']>, string> = {
  square: '1 / 1',
  portrait: '4 / 5',
  landscape: '4 / 3',
}

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>('todo')
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null)
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  const filteredItems = useMemo(() => {
    if (activeFilter === 'todo') return PORTFOLIO_ITEMS
    if (activeFilter === 'video') return PORTFOLIO_ITEMS.filter((item) => item.isVideo)
    return PORTFOLIO_ITEMS.filter((item) => !item.isVideo)
  }, [activeFilter])

  return (
    <section id="portafolio" style={{ padding: 'var(--space-section-y) 0' }}>
      <div
        className="flex flex-wrap items-end justify-between"
        style={{ padding: '0 var(--space-page-x)', gap: '24px', marginBottom: '48px' }}
      >
        <div style={{ maxWidth: '640px' }}>
          <RevealOnScroll>
            <SectionLabel>{PORTFOLIO_CONTENT.kicker}</SectionLabel>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <h2
              style={{
                margin: '18px 0 16px',
                fontSize: 'clamp(32px, 4.4vw, 56px)',
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: '-0.01em',
                color: 'var(--color-white)',
              }}
            >
              {PORTFOLIO_CONTENT.title}
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={140}>
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(15px, 1.1vw, 17px)',
                lineHeight: 1.6,
                color: 'var(--color-muted)',
              }}
            >
              {PORTFOLIO_CONTENT.description}
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={140}>
          <div className="flex" style={{ gap: '28px' }}>
            {PORTFOLIO_CONTENT.filters.map((filter) => {
              const isActive = filter.key === activeFilter

              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0 0 8px',
                    fontFamily: 'var(--font-primary)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: isActive ? 'var(--color-white)' : 'var(--color-muted)',
                    borderBottom: isActive ? '2px solid var(--color-red)' : '2px solid transparent',
                    transition: 'var(--transition-base)',
                  }}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </RevealOnScroll>
      </div>

      <div
        className="grid md:grid-cols-3"
        style={{ padding: '0 var(--space-page-x)', gap: '20px' }}
      >
        {filteredItems.map((item, index) => {
          const imageFailed = failedImages[item.id]
          const youtubeThumbnail =
            item.isVideo && item.videoUrl ? getYouTubeThumbnail(item.videoUrl) : null

          return (
            <RevealOnScroll key={item.id} delay={index * 60}>
              <button
                type="button"
                onClick={() => setLightboxItem(item)}
                className={cn('wal-portfolio-card group relative block w-full text-left')}
                style={{
                  aspectRatio: ASPECT_RATIO[item.aspectRatio ?? 'square'],
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderRadius: 'var(--radius-card)',
                  cursor: 'pointer',
                  padding: 0,
                  overflow: 'hidden',
                }}
              >
                {youtubeThumbnail ? (
                  <AutoplayThumbnail
                    videoUrl={item.videoUrl ?? ''}
                    thumbnailSrc={youtubeThumbnail}
                    alt={item.imageAlt}
                    className="group-hover:scale-105"
                  />
                ) : imageFailed ? (
                  <div
                    className="flex h-full w-full flex-col items-center justify-center"
                    style={{ gap: '10px' }}
                  >
                    {item.isVideo ? (
                      <IconReel width={28} height={28} />
                    ) : (
                      <IconCamera width={28} height={28} />
                    )}
                    <span
                      style={{
                        color: 'var(--color-muted-2)',
                        fontSize: '12px',
                        fontFamily: 'var(--font-primary)',
                      }}
                    >
                      {item.isVideo ? 'Video próximamente' : 'Foto próximamente'}
                    </span>
                  </div>
                ) : (
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    onError={() => setFailedImages((prev) => ({ ...prev, [item.id]: true }))}
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.5s var(--ease-out-expo)',
                    }}
                    className="group-hover:scale-105"
                  />
                )}

                {(!imageFailed || youtubeThumbnail) && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 45%)',
                      opacity: 0,
                      transition: 'var(--transition-base)',
                    }}
                    className="group-hover:opacity-100"
                  />
                )}

                <div
                  className="flex items-start justify-between"
                  style={{ position: 'absolute', top: '16px', left: '16px', right: '16px' }}
                >
                  <span
                    style={{
                      color: 'var(--color-red)',
                      fontWeight: 700,
                      fontSize: '14px',
                      fontFamily: 'var(--font-primary)',
                    }}
                  >
                    {item.n}
                  </span>

                  {item.isVideo && (
                    <span
                      style={{
                        color: 'var(--color-white)',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        fontFamily: 'var(--font-primary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '999px',
                        padding: '4px 12px',
                      }}
                    >
                      VIDEO
                    </span>
                  )}
                </div>

                {(!imageFailed || youtubeThumbnail) && (
                  <div
                    className="opacity-0 group-hover:opacity-100"
                    style={{
                      position: 'absolute',
                      left: '16px',
                      right: '16px',
                      bottom: '16px',
                      transition: 'var(--transition-base)',
                    }}
                  >
                    <p
                      style={{
                        margin: '0 0 4px',
                        color: 'var(--color-white)',
                        fontWeight: 700,
                        fontSize: '15px',
                        fontFamily: 'var(--font-primary)',
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        color: 'var(--color-muted)',
                        fontSize: '13px',
                        fontFamily: 'var(--font-primary)',
                      }}
                    >
                      {item.tag}
                    </p>
                  </div>
                )}
              </button>
            </RevealOnScroll>
          )
        })}
      </div>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </section>
  )
}
