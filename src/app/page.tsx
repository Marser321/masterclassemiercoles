import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import BTLTestimonialsSection from "@/components/sections/BTLTestimonialsSection";
import VSLSection from "@/components/sections/VSLSection";
import CRMSection from "@/components/sections/CRMSection";
import FooterContact from "@/components/sections/FooterContact";
import IslandBar from "@/components/layout/IslandBar";
import SectionTransition from "@/components/animations/SectionTransition";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PromoPopup from "@/components/ui/PromoPopup";
import FloatingConsultWidget from "@/components/ui/FloatingConsultWidget";

export default function Home() {
  return (
    <main className="bg-background min-h-screen relative">
      <ScrollProgress />
      <Navbar />
      <PromoPopup />
      <FloatingConsultWidget />
      
      <HeroSection />
      <SectionTransition type="dissolve" />

      <VSLSection />
      <SectionTransition type="fog" />

      <BTLTestimonialsSection />
      <SectionTransition type="wipe-up" />
      
      <CRMSection />
      <SectionTransition type="dissolve" />
      
      <FooterContact />
      <IslandBar />
    </main>
  );
}
