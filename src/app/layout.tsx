import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import HeroGrid from '@/components/HeroGrid'

import './globals.css'

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wal.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '.WAL — Wanderley Alvarado L.',
    template: '%s | .WAL',
  },
  description:
    'Social Media Content Designer en San José, Costa Rica. Producción audiovisual y dirección de arte para marcas que quieren liderar.',
  keywords: [
    'diseño',
    'social media',
    'contenido visual',
    'Costa Rica',
    'portafolio',
    'fotografía',
    'video',
    'WAL',
  ],
  authors: [{ name: 'Wanderley Alvarado L.' }],
  creator: 'Wanderley Alvarado L.',
  openGraph: {
    title: '.WAL — Social Media Content Designer',
    description: 'Producción audiovisual y dirección de arte para marcas que quieren liderar.',
    url: siteUrl,
    siteName: '.WAL',
    locale: 'es_CR',
    type: 'website',
    images: [
      {
        url: '/images/og/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wanderley Alvarado L. — .WAL, Social Media Content Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '.WAL — Social Media Content Designer',
    description: 'Producción audiovisual y dirección de arte para marcas que quieren liderar.',
    images: ['/images/og/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-CR" className={poppins.variable}>
      <body style={{ backgroundColor: '#000000' }}>
        <div
          aria-hidden="true"
          style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        >
          <HeroGrid opacity={0.03} showGuides={false} strokeColor="var(--color-white)" />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </body>
    </html>
  )
}
