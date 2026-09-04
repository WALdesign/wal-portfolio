import type { ReactElement, SVGProps } from 'react'

import type { PlanFeature } from '@/types'

const baseProps: SVGProps<SVGSVGElement> = {
  width: 24,
  height: 24,
  fill: 'none',
  stroke: 'var(--color-red)',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconReel(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} viewBox="0 0 24 24" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8" cy="9" r="1.4" />
      <circle cx="16" cy="9" r="1.4" />
      <path d="M9.5 13.5 15 17l-5.5 3.5v-7Z" />
    </svg>
  )
}

export function IconClapper(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} viewBox="0 0 24 24" {...props}>
      <path d="M3 10.5V19a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.5H3Z" />
      <path d="m3 10.5 1.4-5.6a1 1 0 0 1 1.2-.75l13.5 3.15a1 1 0 0 1 .75 1.2l-.4 2.02" />
      <path d="m7 4.9 2.6 3.9M12 4.1l2.6 3.9M17 3.4l2.6 3.9" />
    </svg>
  )
}

export function IconCamera(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} viewBox="0 0 24 24" {...props}>
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="14" r="3.4" />
    </svg>
  )
}

export function IconStack(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} viewBox="0 0 24 24" {...props}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
      <path d="m3 17.5 9 5 9-5" />
    </svg>
  )
}

export function IconNotion(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} viewBox="0 0 24 24" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 8v8M8 8l8 8M16 8v8" />
    </svg>
  )
}

export function IconMega(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} viewBox="0 0 24 24" {...props}>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l11 4V6L6 10H4a1 1 0 0 0-1 1Z" />
      <path d="M8 14v4a1 1 0 0 0 1 1h1.5" />
      <path d="M18 9.5a3 3 0 0 1 0 5" />
    </svg>
  )
}

export function IconPlay(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} viewBox="0 0 24 24" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M10 8.5v7l6-3.5-6-3.5Z" />
    </svg>
  )
}

export function IconImage(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} viewBox="0 0 24 24" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m4 17 5-5 3.5 3.5L16 12l4 5" />
    </svg>
  )
}

const ICON_MAP: Record<PlanFeature['icon'], (props: SVGProps<SVGSVGElement>) => ReactElement> = {
  'ic-reel': IconReel,
  'ic-clapper': IconClapper,
  'ic-camera': IconCamera,
  'ic-stack': IconStack,
  'ic-notion': IconNotion,
  'ic-mega': IconMega,
  'ic-play': IconPlay,
  'ic-image': IconImage,
}

interface PlanIconProps extends SVGProps<SVGSVGElement> {
  name: PlanFeature['icon']
}

export function PlanIcon({ name, ...props }: PlanIconProps) {
  const Icon = ICON_MAP[name]
  return <Icon {...props} />
}
