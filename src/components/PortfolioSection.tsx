'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import { IconCamera, IconReel } from '@/components/icons/PlanIcons'
import Lightbox from '@/components/Lightbox'
import AutoplayThumbnail from '@/components/ui/AutoplayThumbnail'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import RevealText from '@/components/ui/RevealText'
import VideoPreview from '@/components/ui/VideoPreview'
import SectionLabel from '@/components/ui/SectionLabel'
import { useAudience } from '@/lib/AudienceContext'
import { AUDIENCE_OPTIONS, PORTFOLIO_CONTENT, PORTFOLIO_ITEMS } from '@/lib/data'
import { cn, getYouTubeThumbnail, PORTFOLIO_FILTER_EVENT } from '@/lib/utils'
import type { AudienceCategory, PortfolioFilter, PortfolioItem } from '@/types'

// Trabajos que se muestran por tanda (2 filas en escritorio) para no alargar la página.
const PAGE_SIZE = 6

const COUNT_BY_AUDIENCE = PORTFOLIO_ITEMS.reduce<Record<string, number>>((acc, item) => {
  acc[item.audience] = (acc[item.audience] ?? 0) + 1
  return acc
}, {})

const ASPECT_RATIO: Record<NonNullable<PortfolioItem['aspectRatio']>, string> = {
  square: '1 / 1',
  portrait: '4 / 5',
  landscape: '4 / 3',
}

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>('todo')
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null)
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  const { audience, setAudience } = useAudience()
  const audienceLabel = AUDIENCE_OPTIONS.find((o) => o.key === audience)?.label
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filteredItems = useMemo(() => {
    const byAudience = audience
      ? PORTFOLIO_ITEMS.filter((item) => item.audience === audience)
      : PORTFOLIO_ITEMS
    if (activeFilter === 'todo') return byAudience
    if (activeFilter === 'video') return byAudience.filter((item) => item.isVideo)
    return byAudience.filter((item) => !item.isVideo)
  }, [activeFilter, audience])

  // Al cambiar de categoría o formato se vuelve a mostrar solo la primera tanda.
  useEffect(() => setVisible(PAGE_SIZE), [activeFilter, audience])

  // Los botones de servicios del hero aplican su filtro aquí (formato y categoría).
  useEffect(() => {
    const onFilter = (event: Event) => {
      const detail = (event as CustomEvent<{ format: PortfolioFilter; audience: AudienceCategory | null }>).detail
      setActiveFilter(detail.format)
      setAudience(detail.audience)
    }
    window.addEventListener(PORTFOLIO_FILTER_EVENT, onFilter)
    return () => window.removeEventListener(PORTFOLIO_FILTER_EVENT, onFilter)
  }, [setAudience])

  const visibleItems = filteredItems.slice(0, visible)
  const remaining = filteredItems.length - visibleItems.length

  const showLess = () => {
    setVisible(PAGE_SIZE)
    document.getElementById('portafolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="portafolio" style={{ padding: 'var(--space-section-y) 0' }}>
      <div
        className="flex flex-wrap items-end justify-between"
        style={{ padding: '0 var(--space-page-x)', gap: '24px', marginBottom: '32px' }}
      >
        <div style={{ maxWidth: '640px' }}>
          <RevealOnScroll>
            <SectionLabel>{PORTFOLIO_CONTENT.kicker}</SectionLabel>
          </RevealOnScroll>

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
            <RevealText delay={80}>{audienceLabel ?? PORTFOLIO_CONTENT.title}</RevealText>
          </h2>

          <RevealOnScroll delay={140}>
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(15px, 1.1vw, 17px)',
                lineHeight: 1.6,
                color: 'var(--color-muted)',
              }}
            >
              {audienceLabel
                ? `Trabajos de ${audienceLabel.toLowerCase()} seleccionados para ti.`
                : PORTFOLIO_CONTENT.description}
            </p>
          </RevealOnScroll>
        </div>
      </div>

      <RevealOnScroll delay={160}>
        <div className="wal-portfolio-toolbar" style={{ padding: '0 var(--space-page-x)' }}>
          <div role="group" aria-label="Categoría" className="wal-cat-chips">
            {[{ key: null, label: 'Todo' }, ...AUDIENCE_OPTIONS].map((opt) => {
              const isActive = opt.key === audience
              const count = opt.key ? (COUNT_BY_AUDIENCE[opt.key] ?? 0) : PORTFOLIO_ITEMS.length

              return (
                <button
                  key={opt.key ?? 'todo'}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setAudience(opt.key as AudienceCategory | null)}
                  className={cn('wal-cat-chip', isActive && 'is-active')}
                >
                  {opt.label}
                  <span className="wal-cat-chip__count">{count}</span>
                </button>
              )
            })}
          </div>

          <div role="group" aria-label="Formato" className="wal-format-switch">
            {PORTFOLIO_CONTENT.filters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                aria-pressed={filter.key === activeFilter}
                onClick={() => setActiveFilter(filter.key)}
                className={cn('wal-format-switch__btn', filter.key === activeFilter && 'is-active')}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {filteredItems.length === 0 && (
        <p style={{ padding: '0 var(--space-page-x)', color: 'var(--color-muted)' }}>
          Aún no hay trabajos de este tipo con ese formato. Prueba con «Todo».
        </p>
      )}

      <div
        className="grid md:grid-cols-3"
        style={{ padding: '0 var(--space-page-x)', gap: '20px' }}
      >
        {visibleItems.map((item, index) => {
          const imageFailed = failedImages[item.id]
          const youtubeThumbnail =
            item.isVideo && item.videoUrl ? getYouTubeThumbnail(item.videoUrl) : null

          return (
            <RevealOnScroll key={item.id} variant="mask" delay={(index % 3) * 120}>
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
                {item.previewSrc ? (
                  <VideoPreview
                    previewSrc={item.previewSrc}
                    posterSrc={item.imageSrc}
                    alt={item.imageAlt}
                    className="group-hover:scale-105"
                  />
                ) : youtubeThumbnail ? (
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

                {(!imageFailed || youtubeThumbnail || item.previewSrc) && (
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

                {(!imageFailed || youtubeThumbnail || item.previewSrc) && (
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

      <div className="wal-portfolio-more" style={{ padding: '0 var(--space-page-x)' }}>
        {remaining > 0 ? (
          <button
            type="button"
            className="wal-more-btn"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            Ver más trabajos <span className="wal-more-btn__count">+{remaining}</span>
          </button>
        ) : (
          filteredItems.length > PAGE_SIZE && (
            <button type="button" className="wal-more-btn" onClick={showLess}>
              Mostrar menos
            </button>
          )
        )}
        <a href="#planes" className="wal-to-plans">
          Ir a los planes <span aria-hidden="true">↓</span>
        </a>
      </div>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </section>
  )
}
