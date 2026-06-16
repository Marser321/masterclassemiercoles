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
import MasterclassReplaySection from "@/components/sections/masterclass/MasterclassReplaySection";
import UrgencyCTA from "@/components/sections/masterclass/UrgencyCTA";
import FAQAccordion from "@/components/sections/masterclass/FAQAccordion";
import Footer from "@/components/sections/masterclass/Footer";
import RegistrationModal from "@/components/sections/masterclass/RegistrationModal";
import PreviewPanel from "@/components/sections/masterclass/PreviewPanel";
import GhostRegistrationNotifications from "@/components/sections/masterclass/GhostRegistrationNotifications";
import IslandBar from "@/components/layout/IslandBar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import {
  ACTIVE_COPY,
  ACTIVE_VISUAL,
  VISUALS,
  LEGACY_VERSION_MAP,
  toCopyId,
  toVisualId,
  type CopyId,
  type VisualId,
} from "@/lib/data/masterclassCopy";

export default function Home() {
  const [copy, setCopy] = useState<CopyId>(ACTIVE_COPY);
  const [visual, setVisual] = useState<VisualId>(ACTIVE_VISUAL);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Selección por URL: ?copy=1..4 y ?visual=1..3 (acepta c1/m1).
  // Compat con links viejos: ?v=1|2|3 (o ?variant=) → par (copy, visual).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let nextCopy: CopyId = ACTIVE_COPY;
    let nextVisual: VisualId = ACTIVE_VISUAL;

    const legacy = params.get("v") || params.get("variant");
    if (legacy && LEGACY_VERSION_MAP[legacy]) {
      nextCopy = LEGACY_VERSION_MAP[legacy].copy;
      nextVisual = LEGACY_VERSION_MAP[legacy].visual;
    }

    const explicitCopy = toCopyId(params.get("copy"));
    if (explicitCopy) nextCopy = explicitCopy;

    const explicitVisual = toVisualId(params.get("visual"));
    if (explicitVisual) nextVisual = explicitVisual;

    queueMicrotask(() => {
      setCopy(nextCopy);
      setVisual(nextVisual);
    });
  }, []);

  const dynamicFonts = {
    "--font-mc-display": VISUALS[visual].font.display,
    "--font-mc-body": VISUALS[visual].font.body,
  } as CSSProperties;

  return (
    <main
      style={dynamicFonts}
      className="relative min-h-screen overflow-hidden bg-background text-foreground font-mc-body"
    >
      <ScrollProgress />

      <div className="fixed inset-x-0 top-0 z-50">
        <Ribbon copy={copy} visual={visual} />
        <Navbar copy={copy} visual={visual} />
      </div>

      <div className="pt-20 sm:pt-24">
        <Hero copy={copy} visual={visual} onRegisterClick={openModal} backgroundPaused={isModalOpen} />
        <StatsStrip copy={copy} />
        <LearnGrid copy={copy} visual={visual} onRegisterClick={openModal} />
        <AudienceFit copy={copy} />
        <MentorBio copy={copy} />
        <Testimonials copy={copy} />
        <MasterclassReplaySection copy={copy} />
        <UrgencyCTA copy={copy} visual={visual} onRegisterClick={openModal} />
        <FAQAccordion copy={copy} />
      </div>

      <Footer />
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
      <PreviewPanel
        currentCopy={copy}
        currentVisual={visual}
        onCopyChange={setCopy}
        onVisualChange={setVisual}
      />
      <GhostRegistrationNotifications key={copy} copy={copy} isModalOpen={isModalOpen} />
      <IslandBar
        copy={copy}
        visual={visual}
        onCopyChange={setCopy}
        onVisualChange={setVisual}
        onRegisterClick={openModal}
      />
    </main>
  );
}
