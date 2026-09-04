'use client'

import Image from 'next/image'
import { useState } from 'react'

import { IconImage, PlanIcon } from '@/components/icons/PlanIcons'
import Button from '@/components/ui/Button'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionLabel from '@/components/ui/SectionLabel'
import { PLANES_CONTENT, PLANS, SITE_CONFIG } from '@/lib/data'

export default function PlanesSection() {
  const [activeKey, setActiveKey] = useState(PLANS[0].key)
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  const activePlan = PLANS.find((plan) => plan.key === activeKey) ?? PLANS[0]
  const imageFailed = failedImages[activePlan.key]

  return (
    <section id="planes" style={{ padding: 'var(--space-section-y) 0' }}>
      <div style={{ padding: '0 var(--space-page-x)', marginBottom: '40px', maxWidth: '680px' }}>
        <RevealOnScroll>
          <SectionLabel>{PLANES_CONTENT.kicker}</SectionLabel>
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
            {PLANES_CONTENT.title}
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
            {PLANES_CONTENT.description}
          </p>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={180}>
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{
            padding: '0 var(--space-page-x)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {PLANS.map((plan) => {
            const isActive = plan.key === activeKey

            return (
              <button
                key={plan.key}
                type="button"
                onClick={() => setActiveKey(plan.key)}
                className="wal-service-btn"
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '3px solid var(--color-red)' : '3px solid transparent',
                  cursor: 'pointer',
                  padding: '0 4px 16px',
                  marginBottom: '-1px',
                  textAlign: 'left',
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'clamp(14px, 1.3vw, 18px)',
                  fontWeight: 700,
                  color: isActive ? 'var(--color-white)' : 'var(--color-muted)',
                  transition: 'var(--transition-base)',
                }}
              >
                {plan.nav}
              </button>
            )
          })}
        </div>
      </RevealOnScroll>

      <div
        className="grid md:grid-cols-2"
        style={{ padding: '40px var(--space-page-x) 0', gap: '48px' }}
      >
        <RevealOnScroll delay={100} className="h-full">
          <div className="flex h-full flex-col">
            <div
              className="relative"
              style={{
                aspectRatio: '4 / 5',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-card)',
                backgroundColor: 'var(--color-surface)',
                overflow: 'hidden',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '20px',
                  bottom: '16px',
                  zIndex: 2,
                  fontSize: 'clamp(28px, 2.8vw, 38px)',
                  fontWeight: 800,
                  color: 'var(--color-white)',
                }}
              >
                {activePlan.num}
                <span style={{ color: 'var(--color-red)' }}>.</span>
              </span>

              {imageFailed ? (
                <div
                  className="flex h-full w-full flex-col items-center justify-center"
                  style={{ gap: '12px' }}
                >
                  <IconImage width={28} height={28} />
                  <div style={{ textAlign: 'center' }}>
                    <p
                      style={{
                        margin: 0,
                        color: 'var(--color-muted)',
                        fontSize: '14px',
                        fontFamily: 'var(--font-primary)',
                      }}
                    >
                      {PLANES_CONTENT.placeholderTitle}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        color: 'var(--color-muted-2)',
                        fontSize: '12px',
                        fontFamily: 'var(--font-primary)',
                      }}
                    >
                      {PLANES_CONTENT.placeholderSubtitle}
                    </p>
                  </div>
                </div>
              ) : (
                <Image
                  src={activePlan.imageSrc}
                  alt={activePlan.imageAlt}
                  fill
                  sizes="(min-width: 768px) 45vw, 90vw"
                  onError={() => setFailedImages((prev) => ({ ...prev, [activePlan.key]: true }))}
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={160} className="h-full">
          <div className="flex h-full flex-col justify-between">
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 'clamp(36px, 4.4vw, 64px)',
                  fontWeight: 900,
                  color: 'var(--color-muted)',
                  lineHeight: 1,
                }}
              >
                {activePlan.title}
              </h3>
              <div
                style={{
                  width: '80px',
                  height: '4px',
                  backgroundColor: 'var(--color-red)',
                  margin: '16px 0 28px',
                }}
              />

              <p
                style={{
                  margin: '0 0 12px',
                  fontSize: 'clamp(18px, 1.6vw, 22px)',
                  fontWeight: 700,
                  color: 'var(--color-white)',
                }}
              >
                {activePlan.lead}
              </p>

              {activePlan.desc && (
                <p
                  style={{
                    margin: '0 0 24px',
                    fontSize: '15px',
                    lineHeight: 1.65,
                    color: 'var(--color-muted)',
                  }}
                >
                  {activePlan.desc}
                </p>
              )}

              <blockquote
                style={{
                  margin: '0 0 28px',
                  paddingLeft: '18px',
                  borderLeft: '3px solid var(--color-red)',
                  fontStyle: 'italic',
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: 'var(--color-muted)',
                }}
              >
                {activePlan.quote}
              </blockquote>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {activePlan.features.map((feature) => (
                  <li
                    key={feature.text}
                    className="flex items-center"
                    style={{ gap: '14px', padding: '10px 0' }}
                  >
                    <PlanIcon name={feature.icon} width={22} height={22} />
                    <span
                      style={{
                        color: 'var(--color-white)',
                        fontSize: '15px',
                        fontWeight: 500,
                      }}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex" style={{ justifyContent: 'flex-end', marginTop: '32px' }}>
              <div style={{ textAlign: 'right' }}>
                <p
                  style={{
                    margin: '0 0 4px',
                    color: 'var(--color-muted)',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  Desde
                </p>
                <p
                  style={{
                    margin: '0 0 16px',
                    color: 'var(--color-white)',
                    fontSize: 'clamp(40px, 4vw, 56px)',
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  ${activePlan.priceNum}
                </p>
                <Button
                  href={SITE_CONFIG.whatsapp}
                  target="_blank"
                  variant="primary"
                  size="lg"
                  style={{ fontSize: '18px' }}
                >
                  <span aria-hidden="true">+</span>
                  {PLANES_CONTENT.ctaLabel}
                </Button>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
