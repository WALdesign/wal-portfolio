export type PortfolioCategory = 'todo' | 'foto' | 'video' | 'identidad' | 'campaña'

export interface PortfolioItem {
  id: string
  n: string // número display ej: "01"
  title: string
  tag: string // categoría display ej: "Fotografía editorial"
  category: PortfolioCategory
  isVideo: boolean
  imageSrc: string
  imageAlt: string
  videoUrl?: string // URL de YouTube o Vimeo si es video
  aspectRatio?: 'square' | 'portrait' | 'landscape'
}

export interface Service {
  n: string
  label: string
  href: string
}

export interface PlanFeature {
  icon:
    | 'ic-reel'
    | 'ic-clapper'
    | 'ic-camera'
    | 'ic-stack'
    | 'ic-notion'
    | 'ic-mega'
    | 'ic-play'
    | 'ic-image'
  text: string
}

export interface Plan {
  key: string
  nav: string
  num: string
  title: string
  lead: string
  desc?: string
  quote: string
  priceNum: string
  imageSrc: string
  imageAlt: string
  features: PlanFeature[]
}

export interface HeroCta {
  label: string
  href: string
  external?: boolean
}

export interface HeroContent {
  nameLine1: string
  nameLine2: string
  roleLabel: string
  descriptionLead: string
  descriptionBold: string
  descriptionTail: string
  primaryCta: HeroCta
  secondaryCta: HeroCta
  scrollLabel: string
  portraitSrc: string
  portraitAlt: string
}

export type PortfolioFilter = 'todo' | 'video' | 'foto'

export interface PortfolioFilterTab {
  key: PortfolioFilter
  label: string
}

export interface PortfolioContent {
  kicker: string
  title: string
  description: string
  filters: PortfolioFilterTab[]
}

export interface PlanesContent {
  kicker: string
  title: string
  description: string
  ctaLabel: string
  placeholderTitle: string
  placeholderSubtitle: string
}

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterContactItem {
  icon: 'instagram' | 'whatsapp' | 'pin'
  label: string
  href: string
}

export interface FooterContent {
  description: string
  ctaLabel: string
  navLabel: string
  navLinks: FooterLink[]
  contactLabel: string
  contactItems: FooterContactItem[]
  statusLabel: string
}
