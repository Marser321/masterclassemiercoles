"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Ribbon from "@/components/sections/masterclass/Ribbon";
import Navbar from "@/components/sections/masterclass/Navbar";
import Hero from "@/components/sections/masterclass/Hero";
import StatsStrip from "@/components/sections/masterclass/StatsStrip";
import LearnGrid from "@/components/sections/masterclass/LearnGrid";
import AudienceFit from "@/components/sections/masterclass/AudienceFit";
import MentorBio from "@/components/sections/masterclass/MentorBio";
import Testimonials from "@/components/sections/masterclass/Testimonials";
import UrgencyCTA from "@/components/sections/masterclass/UrgencyCTA";
import FAQAccordion from "@/components/sections/masterclass/FAQAccordion";
import Footer from "@/components/sections/masterclass/Footer";
import RegistrationModal from "@/components/sections/masterclass/RegistrationModal";
import PreviewPanel from "@/components/sections/masterclass/PreviewPanel";
import IslandBar from "@/components/layout/IslandBar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { ACTIVE_VERSION, VERSIONS, type MasterclassVersionId } from "@/lib/data/masterclassCopy";

export default function Home() {
  const [variant, setVariant] = useState<MasterclassVersionId>(ACTIVE_VERSION);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get("v") || params.get("variant");
    const next: MasterclassVersionId | null =
      v === "1" || v === "v1" ? "v1" : v === "2" || v === "v2" ? "v2" : v === "3" || v === "v3" ? "v3" : null;

    if (!next) return;

    const frame = window.requestAnimationFrame(() => setVariant(next));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const dynamicFonts = {
    "--font-mc-display": VERSIONS[variant].visual.font.display,
    "--font-mc-body": VERSIONS[variant].visual.font.body,
  } as CSSProperties;

  return (
    <main
      style={dynamicFonts}
      className="relative min-h-screen overflow-hidden bg-background text-foreground font-mc-body"
    >
      <ScrollProgress />

      <div className="fixed inset-x-0 top-0 z-50">
        <Ribbon variant={variant} />
        <Navbar variant={variant} />
      </div>

      <div className="pt-20 sm:pt-24">
        <Hero variant={variant} onRegisterClick={openModal} backgroundPaused={isModalOpen} />
        <StatsStrip variant={variant} />
        <LearnGrid variant={variant} onRegisterClick={openModal} />
        <AudienceFit variant={variant} />
        <MentorBio variant={variant} />
        <Testimonials variant={variant} />
        <UrgencyCTA variant={variant} onRegisterClick={openModal} />
        <FAQAccordion variant={variant} />
      </div>

      <Footer />
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
      <PreviewPanel currentVariant={variant} onVariantChange={setVariant} />
      <IslandBar variant={variant} onVariantChange={setVariant} onRegisterClick={openModal} />
    </main>
  );
}
