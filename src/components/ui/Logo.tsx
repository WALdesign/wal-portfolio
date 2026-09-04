import type { CSSProperties } from 'react'

import { SITE_CONFIG } from '@/lib/data'

interface LogoProps {
  className?: string
  style?: CSSProperties
}

export default function Logo({ className, style }: LogoProps) {
  const dot = SITE_CONFIG.name.slice(0, 1)
  const rest = SITE_CONFIG.name.slice(1)

  return (
    <span className={className} style={style}>
      <span style={{ color: 'var(--color-red)' }}>{dot}</span>
      {rest}
    </span>
  )
}
