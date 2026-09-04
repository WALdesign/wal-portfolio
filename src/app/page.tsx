import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import PlanesSection from '@/components/PlanesSection'
import PortfolioSection from '@/components/PortfolioSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PortfolioSection />
        <PlanesSection />
      </main>
      <Footer />
    </>
  )
}
