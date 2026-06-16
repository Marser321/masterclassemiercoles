"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import BlueprintLayer from "@/components/backgrounds/BlueprintLayer";
import FlowField from "@/components/backgrounds/FlowField";
import MetricBurst from "@/components/backgrounds/MetricBurst";
import { VERSIONS, type HeroBackgroundMotif, type MasterclassVersionId } from "@/lib/data/masterclassCopy";

interface MasterclassHeroBackgroundProps {
  variant: MasterclassVersionId;
  paused?: boolean;
}

function MotifLayer({ motif, paused }: { motif: HeroBackgroundMotif; paused: boolean }) {
  if (motif === "growth") {
    return (
      <MetricBurst
        paused={paused}
        intensity="soft"
        density="low"
        opacity={0.22}
        className="hidden sm:block translate-x-[22%] translate-y-[8%]"
      />
    );
  }

  if (motif === "funnel") {
    return (
      <FlowField
        paused={paused}
        intensity="soft"
        density="mid"
        opacity={0.2}
        className="hidden sm:block translate-x-[8%] scale-105"
      />
    );
  }

  return (
    <BlueprintLayer
      paused={paused}
      intensity="soft"
      opacity={0.2}
      stages={5}
      activeStage={5}
      className="hidden sm:block translate-x-[10%] scale-105"
    />
  );
}

export default function MasterclassHeroBackground({ variant, paused = false }: MasterclassHeroBackgroundProps) {
  const visual = VERSIONS[variant].visual;
  const style = {
    "--mc-hero-bg-opacity-mobile": visual.heroBackground.opacityMobile,
    "--mc-hero-bg-opacity-desktop": visual.heroBackground.opacityDesktop,
  } as CSSProperties;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={style} aria-hidden>
      <Image
        src={visual.heroBackground.imageSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        className="mc-hero-bg-image object-cover object-center saturate-[1.08] contrast-[1.04]"
      />

      <div className="absolute inset-0 bg-background/70 sm:bg-background/62 lg:bg-background/54" />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, rgba(125, 211, 252, 0.09) 34%, rgba(0, 102, 255, 0.12) 52%, transparent 74%)",
          mixBlendMode: "screen",
        }}
      />

      <MotifLayer motif={visual.heroBackground.motif} paused={paused} />

      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-background via-background/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-background via-background/88 to-transparent lg:w-[68%]" />
      <div className="absolute inset-0 texture-grid opacity-[0.55]" />
    </div>
  );
}
