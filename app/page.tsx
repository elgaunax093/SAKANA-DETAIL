import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ValorSection from '@/components/ValorSection'
import ServiciosSection from '@/components/ServiciosSection'
import GallerySection from '@/components/GallerySection'
import ResenasSection from '@/components/ResenasSection'
import AntesDepuesSection from '@/components/AntesDepuesSection'
import ProcesoSection from '@/components/ProcesoSection'
import MarqueeSection from '@/components/MarqueeSection'
import NosotrosSection from '@/components/NosotrosSection'
import FAQSection from '@/components/FAQSection'
import ContactoSection from '@/components/ContactoSection'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ValorSection />
      <ServiciosSection />
      <GallerySection />
      <ResenasSection />
      <AntesDepuesSection />
      <ProcesoSection />
      <MarqueeSection />
      <NosotrosSection />
      <FAQSection />
      <ContactoSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
