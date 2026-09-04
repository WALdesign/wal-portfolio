'use client'

import type { CSSProperties } from 'react'

import { cn, scrollToSection } from '@/lib/utils'
import type { Service } from '@/types'

interface ServicesNavProps {
  items: Service[]
  className?: string
  style?: CSSProperties
}

export default function ServicesNav({ items, className, style }: ServicesNavProps) {
  return (
    <div
      className={cn('relative flex flex-wrap justify-between gap-x-6 gap-y-3', className)}
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '12px var(--space-page-x)',
        ...style,
      }}
    >
      {items.map((service) => (
        <button
          key={service.n}
          type="button"
          onClick={() => scrollToSection(service.href.replace('#', ''))}
          className="wal-service-btn flex items-center"
          style={{
            gap: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '10px 14px',
            margin: '-10px -14px',
            fontFamily: 'var(--font-primary)',
          }}
        >
          <span
            className="wal-service-arrow"
            style={{ color: 'var(--color-red)', fontSize: '16px' }}
            aria-hidden="true"
          >
            →
          </span>
          <span style={{ color: 'var(--color-red)', fontWeight: 700, fontSize: '16px' }}>
            {service.n}
          </span>
          <span style={{ color: 'var(--color-white)', fontWeight: 600, fontSize: '16px' }}>
            {service.label}
          </span>
        </button>
      ))}
    </div>
  )
}
