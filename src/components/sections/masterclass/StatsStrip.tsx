"use client";

import AnimatedCounter from "../../ui/AnimatedCounter";
import Reveal from "@/components/animations/Reveal";
import { VERSIONS, type MasterclassVersionId } from "@/lib/data/masterclassCopy";

interface StatsStripProps {
  variant: MasterclassVersionId;
}

export default function StatsStrip({ variant }: StatsStripProps) {
  const stats = VERSIONS[variant].stats;

  return (
    <div className="relative z-10 border-y mc-border mc-section backdrop-blur-sm py-8 sm:py-10 px-6 sm:px-8 font-mc-body">
      <Reveal className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between divide-y md:divide-y-0 md:divide-x mc-divide">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group w-full md:w-1/4 py-6 md:py-0 text-center flex flex-col items-center justify-center transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-baseline justify-center font-display-heavy text-4xl sm:text-5xl lg:text-6xl text-primary drop-shadow-[0_2px_15px_rgba(0,102,255,0.2)] transition-transform duration-300 group-hover:scale-105">
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="text-primary tracking-tight font-black font-mc-display"
              />
            </div>
            <div className="text-xs sm:text-[13px] font-semibold text-muted-foreground uppercase tracking-widest mt-2 transition-colors group-hover:text-foreground/80">
              {stat.description}
            </div>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
