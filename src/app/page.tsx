import { Header } from "@/components/home/Header"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { UseCasesSection } from "@/components/home/use-cases-section"
import { CTASection } from "@/components/home/cta-section"
import { Footer } from "@/components/home/Footer"
import { PricingSection } from "@/components/home/price-section";

export default function HomePage() {
 
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <UseCasesSection />
        <PricingSection/>
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}




