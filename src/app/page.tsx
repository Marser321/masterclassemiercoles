"use client";

import { useEffect, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
// Above-the-fold: se cargan de inmediato para no retrasar el primer pintado.
import Ribbon from "@/components/sections/masterclass/Ribbon";
import Navbar from "@/components/sections/masterclass/Navbar";
import Hero from "@/components/sections/masterclass/Hero";
import StatsStrip from "@/components/sections/masterclass/StatsStrip";
import ScrollProgress from "@/components/ui/ScrollProgress";

// Below-the-fold: code-split para aligerar el JS inicial.
// Las secciones de contenido conservan SSR (SEO); los overlays y bloques
// con video pesado van client-only (ssr:false), no aportan al SEO.
const LearnGrid = dynamic(() => import("@/components/sections/masterclass/LearnGrid"));
const AudienceFit = dynamic(() => import("@/components/sections/masterclass/AudienceFit"));
const MentorBio = dynamic(() => import("@/components/sections/masterclass/MentorBio"));
const UrgencyCTA = dynamic(() => import("@/components/sections/masterclass/UrgencyCTA"));
const FAQAccordion = dynamic(() => import("@/components/sections/masterclass/FAQAccordion"));
const Footer = dynamic(() => import("@/components/sections/masterclass/Footer"));
const Testimonials = dynamic(() => import("@/components/sections/masterclass/Testimonials"), { ssr: false });
const MasterclassReplaySection = dynamic(
  () => import("@/components/sections/masterclass/MasterclassReplaySection"),
  { ssr: false }
);
const RegistrationModal = dynamic(
  () => import("@/components/sections/masterclass/RegistrationModal"),
  { ssr: false }
);
const PreviewPanel = dynamic(() => import("@/components/sections/masterclass/PreviewPanel"), { ssr: false });
const GhostRegistrationNotifications = dynamic(
  () => import("@/components/sections/masterclass/GhostRegistrationNotifications"),
  { ssr: false }
);
const IslandBar = dynamic(() => import("@/components/layout/IslandBar"), { ssr: false });
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
