'use client'

import Image from 'next/image'

import HeroGrid from '@/components/HeroGrid'
import ServicesNav from '@/components/ServicesNav'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { HERO_CONTENT, SERVICES } from '@/lib/data'

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden flex flex-col"
      style={{
        minHeight: '100vh',
        paddingTop: 'clamp(56px, 9vh, 96px)',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div
        className="relative flex-1 flex flex-col justify-end"
        style={{ paddingBottom: 'clamp(70px, 11vh, 110px)' }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        >
          <Image
            src={HERO_CONTENT.portraitSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 30%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
            }}
          />
        </div>

        <HeroGrid />

        <div
          className="relative"
          style={{
            padding: '0 var(--space-page-x)',
          }}
        >
          <div className="relative" style={{ zIndex: 1, maxWidth: '720px' }}>
            <div className="relative" style={{ marginBottom: '18px' }}>
              <h1
                className="relative"
                style={{
                  zIndex: 1,
                  margin: 0,
                  fontSize: 'clamp(38px, 5.6vw, 76px)',
                  fontWeight: 800,
                  lineHeight: 1.02,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-white)',
                }}
              >
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      bottom: '-0.04em',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: 'clamp(70px, 13vw, 200px)',
                      lineHeight: 0.75,
                      fontWeight: 900,
                      color: 'var(--color-red)',
                      opacity: 0.9,
                      userSelect: 'none',
                      zIndex: 0,
                    }}
                  >
                    W
                  </span>
                  <span
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'block',
                      overflow: 'hidden',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        animation: 'walRevealUp 0.9s var(--ease-out-expo) both',
                      }}
                    >
                      {HERO_CONTENT.nameLine1}
                    </span>
                  </span>
                </span>
                <span style={{ display: 'block', overflow: 'hidden' }}>
                  <span
                    style={{
                      display: 'block',
                      animation: 'walRevealUp 0.9s var(--ease-out-expo) 0.08s both',
                    }}
                  >
                    {HERO_CONTENT.nameLine2}
                  </span>
                </span>
              </h1>
            </div>

            <RevealOnScroll delay={200}>
              <p
                style={{
                  margin: '0 0 20px',
                  fontSize: 'clamp(18px, 1.6vw, 22px)',
                  fontWeight: 700,
                  color: 'var(--color-white)',
                }}
              >
                {HERO_CONTENT.roleLabel}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={280}>
              <p
                style={{
                  margin: '0 0 32px',
                  maxWidth: '520px',
                  fontSize: 'clamp(15px, 1.1vw, 17px)',
                  lineHeight: 1.6,
                  color: 'var(--color-muted)',
                }}
              >
                {HERO_CONTENT.descriptionLead}
                <strong style={{ color: 'var(--color-white)', fontWeight: 700 }}>
                  {HERO_CONTENT.descriptionBold}
                </strong>
                {HERO_CONTENT.descriptionTail}
              </p>
            </RevealOnScroll>
          </div>
        </div>

        <div
          className="hidden md:flex"
          style={{
            position: 'absolute',
            right: '28px',
            top: '50%',
            transform: 'translateY(-50%)',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            zIndex: 1,
          }}
        >
          <span
            style={{
              writingMode: 'vertical-rl',
              fontSize: '11px',
              letterSpacing: '0.28em',
              color: 'var(--color-muted-2)',
              fontWeight: 600,
            }}
          >
            {HERO_CONTENT.scrollLabel}
          </span>
          <span
            style={{
              position: 'relative',
              width: '1px',
              height: '54px',
              backgroundColor: 'var(--color-border)',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '-1.5px',
                top: 0,
                width: '4px',
                height: '4px',
                borderRadius: '999px',
                backgroundColor: 'var(--color-red)',
                animation: 'walScrollDot 1.8s var(--ease-in-out) infinite',
              }}
            />
          </span>
        </div>

        <ServicesNav
          items={SERVICES}
          className="wal-hero-services-nav"
          style={{
            left: 0,
            right: 0,
            bottom: '9%',
            zIndex: 1,
            borderTop: 'none',
            padding: '0 var(--space-page-x)',
          }}
        />
      </div>
    </section>
  )
}
