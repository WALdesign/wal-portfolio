import Footer from '@/components/Footer'
import HeroGrid from '@/components/HeroGrid'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import PlanesSection from '@/components/PlanesSection'
import PortfolioSection from '@/components/PortfolioSection'
import CurtainHero from '@/components/ui/CurtainHero'

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <CurtainHero>
          <HeroSection />
        </CurtainHero>

        {/* Cortina: sube sobre el Hero y, al final, se levanta para revelar el footer */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'var(--color-bg)',
            clipPath: 'inset(0 round clamp(20px, 3vw, 40px))',
          }}
        >
          <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
            <HeroGrid opacity={0.03} showGuides={false} strokeColor="var(--color-white)" />
          </div>
          <div style={{ position: 'relative' }}>
            <PortfolioSection />
            <PlanesSection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
