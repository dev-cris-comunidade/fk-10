import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import HistoriaSection from "@/components/historia-section"
import PilaresSection from "@/components/pilares-section"
import JornadaSection from "@/components/jornada-section"
import AdesivosSection from "@/components/adesivos-section"
import DepoimentosSection from "@/components/depoimentos-section"
import FamiliasSection from "@/components/familias-section"
import MemoriaSection from "@/components/memoria-section"
import EventoSection from "@/components/evento-section"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HistoriaSection />
      <PilaresSection />
      <JornadaSection />
      <AdesivosSection />
      <DepoimentosSection />
      <FamiliasSection />
      <MemoriaSection />
      <EventoSection />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
