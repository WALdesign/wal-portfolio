import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: ReactNode
  className?: string
}

const wrapperStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '14px',
  fontFamily: 'var(--font-primary)',
}

const dashStyle: CSSProperties = {
  display: 'inline-block',
  width: '28px',
  height: '2px',
  backgroundColor: 'var(--color-red)',
}

const labelStyle: CSSProperties = {
  color: 'var(--color-muted)',
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span className={cn('wal-section-label', className)} style={wrapperStyle}>
      <span aria-hidden="true" style={dashStyle} />
      <span style={labelStyle}>{children}</span>
    </span>
  )
}
