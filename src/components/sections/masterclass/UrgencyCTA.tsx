"use client";

import { Button } from "../../ui/Button";
import Reveal from "@/components/animations/Reveal";
import { VERSIONS, type MasterclassVersionId } from "@/lib/data/masterclassCopy";
import MasterclassSectionBackdrop from "./MasterclassSectionBackdrop";
import SubtleFloatingMarks from "./SubtleFloatingMarks";

interface UrgencyCTAProps {
  variant: MasterclassVersionId;
  onRegisterClick: () => void;
}

export default function UrgencyCTA({ variant, onRegisterClick }: UrgencyCTAProps) {
  const copy = VERSIONS[variant].urgency;
  const isAmber = VERSIONS[variant].visual.accent === "amber";
  const dot = isAmber ? "bg-amber-500" : "bg-primary";

  return (
    <section className="relative overflow-hidden py-20 sm:py-24 px-6 sm:px-8 text-center bg-gradient-to-b from-transparent via-primary/[0.02] to-background font-mc-body">
      <MasterclassSectionBackdrop
        imageSrc="/masterclass/backgrounds/section-urgency-live-system.png"
        scrim="center"
        imageClassName="object-center opacity-[0.18] sm:opacity-[0.25] lg:opacity-[0.32]"
      />
      <SubtleFloatingMarks preset="urgency" />

      <div className="max-w-3xl mx-auto relative z-10">

        <Reveal>
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.15em] mb-6 font-mc-display">
          <span className="h-0.5 w-8 bg-primary rounded-full" />
          {copy.eyebrow}
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight mb-6 font-display-heavy font-mc-display text-balance whitespace-pre-line">
          {copy.title}
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-8 max-w-xl mx-auto text-pretty">
          {copy.description}
        </p>
        </Reveal>

        {/* Spots badge */}
        <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-wide mb-10 shadow-[0_0_15px_rgba(0,102,255,0.08)]">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dot} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${dot}`} />
          </span>
          {copy.badge}
        </div>

        {/* Call To Action */}
        <div>
          <Button
            variant="primary"
            size="lg"
            glow
            aurora
            onClick={onRegisterClick}
            className="w-full sm:w-auto px-12 py-4.5 rounded-xl font-extrabold text-sm sm:text-base tracking-tight text-white mb-4.5 shadow-2xl"
          >
            {copy.button}
          </Button>
          <p className="text-[11px] sm:text-xs text-muted-foreground/60 font-semibold tracking-wide mt-2">
            {copy.note}
          </p>
        </div>

      </div>
    </section>
  );
}
