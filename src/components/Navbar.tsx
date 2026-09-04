'use client'

import { useState, type CSSProperties } from 'react'

import MobileMenu from '@/components/MobileMenu'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import { SITE_CONFIG } from '@/lib/data'
import { scrollToSection } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Planes', href: '#planes' },
]

const navStyle: CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px var(--space-page-x)',
  backgroundColor: 'rgba(0, 0, 0, 0.72)',
  backdropFilter: 'blur(12px)',
  borderBottom: '1px solid var(--color-border)',
}

const logoStyle: CSSProperties = {
  fontFamily: 'var(--font-primary)',
  fontWeight: 800,
  fontSize: '20px',
  color: 'var(--color-white)',
  letterSpacing: '-0.01em',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
}

const linkStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--color-muted)',
  fontFamily: 'var(--font-primary)',
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
  padding: 0,
  transition: 'var(--transition-base)',
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavigate = (href: string) => {
    scrollToSection(href.replace('#', ''))
  }

  return (
    <>
      <header style={navStyle}>
        <button type="button" style={logoStyle} onClick={() => handleNavigate('#inicio')}>
          <Logo />
        </button>

        <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '36px' }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              style={linkStyle}
              onClick={() => handleNavigate(link.href)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={SITE_CONFIG.whatsapp} target="_blank" variant="outline-red" size="sm">
            Conversemos
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden flex flex-col"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Abrir menú"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-white)',
            cursor: 'pointer',
            gap: '5px',
            padding: '8px',
          }}
        >
          <span style={{ width: '22px', height: '2px', backgroundColor: 'currentColor' }} />
          <span style={{ width: '22px', height: '2px', backgroundColor: 'currentColor' }} />
        </button>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} links={NAV_LINKS} />
    </>
  )
}
