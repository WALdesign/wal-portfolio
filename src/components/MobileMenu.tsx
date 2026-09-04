'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/data'
import { scrollToSection } from '@/lib/utils'

interface NavLink {
  label: string
  href: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: NavLink[]
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 90,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  transition: 'var(--transition-base)',
}

const panelStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 100,
  width: 'min(86vw, 380px)',
  backgroundColor: 'var(--color-surface)',
  borderLeft: '1px solid var(--color-border)',
  transition: 'transform var(--transition-base)',
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const panelRef = useRef<HTMLElement>(null)

  const handleNavigate = (href: string) => {
    onClose()
    scrollToSection(href.replace('#', ''))
  }

  // React 18 no soporta "inert" como prop de JSX (llegó en React 19),
  // así que lo aplicamos directo sobre el nodo del DOM.
  useEffect(() => {
    const node = panelRef.current
    if (!node) return

    if (isOpen) {
      node.removeAttribute('inert')
    } else {
      node.setAttribute('inert', '')
    }
  }, [isOpen])

  return (
    <>
      <div
        style={{
          ...overlayStyle,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside
        ref={panelRef}
        style={{
          ...panelStyle,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
        aria-hidden={!isOpen}
        aria-label="Menú de navegación"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: '28px var(--space-page-x)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-white)',
                fontSize: '28px',
                lineHeight: 1,
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>

          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginTop: '48px',
            }}
          >
            {links.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavigate(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  color: 'var(--color-white)',
                  fontFamily: 'var(--font-primary)',
                  fontSize: '22px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div style={{ marginTop: 'auto', paddingTop: '32px' }}>
            <Button
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              variant="primary"
              size="lg"
              className="w-full"
            >
              Iniciar proyecto
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
