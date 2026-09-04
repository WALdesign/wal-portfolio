import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'outline' | 'outline-red' | 'ghost' | 'nav'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  target?: string
  rel?: string
  onClick?: MouseEventHandler
  className?: string
  style?: CSSProperties
  type?: 'button' | 'submit' | 'reset'
}

const sizeStyles: Record<ButtonSize, CSSProperties> = {
  sm: { padding: '8px 18px', fontSize: '13px' },
  md: { padding: '13px 28px', fontSize: '14px' },
  lg: { padding: '17px 38px', fontSize: '15px' },
}

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-red)',
    color: 'var(--color-white)',
    border: '1px solid var(--color-red)',
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'var(--color-white)',
    border: '1px solid var(--color-border)',
  },
  'outline-red': {
    backgroundColor: 'transparent',
    color: 'var(--color-red)',
    border: '1px solid var(--color-red)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-muted)',
    border: '1px solid transparent',
  },
  nav: {
    backgroundColor: 'transparent',
    color: 'var(--color-white)',
    border: 'none',
    padding: '0',
  },
}

const baseStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  fontFamily: 'var(--font-primary)',
  fontWeight: 600,
  letterSpacing: '0.01em',
  borderRadius: 'var(--radius-btn)',
  cursor: 'pointer',
  transition: 'var(--transition-base)',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  onClick,
  className,
  style: styleOverride,
  type = 'button',
}: ButtonProps) {
  const style: CSSProperties = {
    ...baseStyle,
    ...(variant !== 'nav' ? sizeStyles[size] : {}),
    ...variantStyles[variant],
    ...styleOverride,
  }

  const computedRel = target === '_blank' ? (rel ?? 'noopener noreferrer') : rel

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={computedRel}
        onClick={onClick}
        className={cn('wal-button', className)}
        style={style}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={cn('wal-button', className)} style={style}>
      {children}
    </button>
  )
}
