import type { ReactElement, SVGProps } from 'react'

const baseProps: SVGProps<SVGSVGElement> = {
  width: 18,
  height: 18,
  fill: 'none',
  stroke: 'var(--color-red)',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} viewBox="0 0 24 24" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="var(--color-red)" stroke="none" />
    </svg>
  )
}

export function IconWhatsApp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} viewBox="0 0 24 24" {...props}>
      <path d="M4.5 20 5.8 16A8 8 0 1 1 9 18.7Z" />
      <path d="M9 9.3c0 3.3 2.4 5.7 5.7 5.7.6 0 1-.5.9-1.1l-.2-1a.8.8 0 0 0-.8-.6l-1.2.2a4.6 4.6 0 0 1-2.2-2.2l.2-1.2a.8.8 0 0 0-.6-.8l-1-.2c-.6-.1-1.1.3-1.1.9Z" />
    </svg>
  )
}

export function IconPin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} viewBox="0 0 24 24" {...props}>
      <path d="M12 21S5.5 14.9 5.5 9.9a6.5 6.5 0 0 1 13 0C18.5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.7" r="2.1" />
    </svg>
  )
}

const CONTACT_ICON_MAP: Record<
  'instagram' | 'whatsapp' | 'pin',
  (props: SVGProps<SVGSVGElement>) => ReactElement
> = {
  instagram: IconInstagram,
  whatsapp: IconWhatsApp,
  pin: IconPin,
}

interface ContactIconProps extends SVGProps<SVGSVGElement> {
  name: 'instagram' | 'whatsapp' | 'pin'
}

export function ContactIcon({ name, ...props }: ContactIconProps) {
  const Icon = CONTACT_ICON_MAP[name]
  return <Icon {...props} />
}
