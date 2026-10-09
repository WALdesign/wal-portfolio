'use client'

import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { useInView } from '@/lib/useInView'

interface RevealTextProps {
  children: ReactNode
  delay?: number
}

// Revelado por línea: el texto sube desde una máscara, igual que el nombre del Hero.
export default function RevealText({ children, delay = 0 }: RevealTextProps) {
  const { ref, isVisible } = useInView<HTMLSpanElement>()

  return (
    <span ref={ref} className={cn('wal-line-mask', isVisible && 'is-visible')}>
      <span style={{ transitionDelay: delay ? `${delay}ms` : undefined }}>{children}</span>
    </span>
  )
}
