'use client'

import type { CSSProperties } from 'react'

import HeroGrid from '@/components/HeroGrid'
import { ContactIcon } from '@/components/icons/ContactIcons'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import { FOOTER_CONTENT, SITE_CONFIG } from '@/lib/data'
import { scrollToSection } from '@/lib/utils'

const labelStyle: CSSProperties = {
  margin: '0 0 20px',
  color: 'var(--color-muted)',
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  fontFamily: 'var(--font-primary)',
}

const navLinkStyle: CSSProperties = {
  display: 'block',
  margin: '0 0 14px',
  color: 'var(--color-white)',
  fontSize: '16px',
  fontWeight: 600,
  fontFamily: 'var(--font-primary)',
  textDecoration: 'none',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  textAlign: 'left',
}

const footerLogoStyle: CSSProperties = {
  fontFamily: 'var(--font-primary)',
  fontWeight: 800,
  fontSize: '24px',
  color: 'var(--color-white)',
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative"
      style={{
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, transparent 0px, var(--color-surface-2) 40px)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          height: '1px',
          background:
            'linear-gradient(to right, transparent, rgba(239, 6, 6, 0.4) 50%, transparent)',
        }}
      />

      <div className="relative">
        <HeroGrid
          opacity={0.2}
          showRowLabels={false}
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 40px)',
            maskImage: 'linear-gradient(to bottom, transparent, black 40px)',
          }}
        />

        <div
          className="relative grid md:grid-cols-[1.2fr_1fr_1fr]"
          style={{
            padding: 'var(--space-section-y) var(--space-page-x) 48px',
            gap: '48px',
            zIndex: 1,
          }}
        >
          <div>
            <Logo style={footerLogoStyle} />
            <p
              style={{
                margin: '20px 0 28px',
                maxWidth: '360px',
                color: 'var(--color-muted)',
                fontSize: '15px',
                lineHeight: 1.6,
              }}
            >
              {FOOTER_CONTENT.description}
            </p>
            <Button href={SITE_CONFIG.whatsapp} target="_blank" variant="primary" size="lg">
              {FOOTER_CONTENT.ctaLabel}
              <span aria-hidden="true">→</span>
            </Button>
          </div>

          <div>
            <p style={labelStyle}>{FOOTER_CONTENT.navLabel}</p>
            <nav>
              {FOOTER_CONTENT.navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={navLinkStyle}
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => scrollToSection(link.href.replace('#', ''))}
                    style={navLinkStyle}
                  >
                    {link.label}
                  </button>
                )
              )}
            </nav>
          </div>

          <div>
            <p style={labelStyle}>{FOOTER_CONTENT.contactLabel}</p>
            <div className="flex flex-col" style={{ gap: '16px' }}>
              {FOOTER_CONTENT.contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                  style={{ gap: '14px', textDecoration: 'none' }}
                >
                  <span
                    className="flex items-center justify-center"
                    style={{
                      width: '38px',
                      height: '38px',
                      flexShrink: 0,
                      borderRadius: '999px',
                      border: '1px solid var(--color-red)',
                    }}
                  >
                    <ContactIcon name={item.icon} />
                  </span>
                  <span
                    style={{
                      color: 'var(--color-white)',
                      fontSize: '15px',
                      fontWeight: 600,
                      fontFamily: 'var(--font-primary)',
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative flex flex-wrap items-center justify-between"
        style={{
          padding: '24px var(--space-page-x)',
          borderTop: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface-2)',
          gap: '12px',
          zIndex: 1,
        }}
      >
        <p
          style={{
            margin: 0,
            color: 'var(--color-muted-2)',
            fontSize: '13px',
            fontFamily: 'var(--font-primary)',
          }}
        >
          © {year} {SITE_CONFIG.name} — Todos los derechos reservados.
        </p>

        <div className="flex items-center" style={{ gap: '8px' }}>
          <span
            aria-hidden="true"
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '999px',
              backgroundColor: 'var(--color-red)',
            }}
          />
          <span
            style={{
              color: 'var(--color-muted-2)',
              fontSize: '13px',
              fontFamily: 'var(--font-primary)',
            }}
          >
            {FOOTER_CONTENT.statusLabel}
          </span>
        </div>
      </div>
    </footer>
  )
}
