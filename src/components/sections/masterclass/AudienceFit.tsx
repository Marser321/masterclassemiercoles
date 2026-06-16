"use client";

import { motion } from "framer-motion";
import { Card } from "../../ui/Card";
import Reveal from "@/components/animations/Reveal";
import { COPIES, type CopyId } from "@/lib/data/masterclassCopy";
import MasterclassSectionBackdrop from "./MasterclassSectionBackdrop";
import SubtleFloatingMarks from "./SubtleFloatingMarks";

interface AudienceFitProps {
  copy: CopyId;
}

export default function AudienceFit({ copy }: AudienceFitProps) {
  const a = COPIES[copy].audience;

  return (
    <section id="para-quien" className="relative overflow-hidden py-16 sm:py-20 px-6 sm:px-8 border-y mc-border mc-section font-mc-body">
      <MasterclassSectionBackdrop
        imageSrc="/masterclass/backgrounds/section-audience-funnel-filter.png"
        scrim="left"
        imageClassName="object-[44%_50%] opacity-[0.14] sm:opacity-[0.2] lg:opacity-[0.25]"
      />
      <SubtleFloatingMarks preset="audience" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section Header */}
        <Reveal className="text-left mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.15em] mb-4">
            <span className="h-0.5 w-8 bg-primary rounded-full" />
            {a.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight mb-4 font-display-heavy font-mc-display">
            {a.heading}
          </h2>
          <p className="text-muted-foreground max-w-xl text-sm sm:text-base leading-relaxed">
            {a.sub}
          </p>
        </Reveal>

        {/* Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

          {/* YES CARD */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <Card
              glass
              hoverEffect
              className="mc-surface border-t-[4px] border-t-emerald-500 rounded-[24px] text-foreground p-8 sm:p-10 flex flex-col h-full"
            >
              <h3 className="text-emerald-500 font-extrabold text-sm uppercase tracking-[0.15em] mb-8 pb-4 border-b mc-border font-mc-display">
                {a.yesTitle}
              </h3>

              <ul className="flex flex-col gap-6">
                {a.yes.map((point, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold mt-0.5 border border-emerald-500/25">
                      ✓
                    </span>
                    <span className="text-xs sm:text-[13.5px] leading-relaxed text-foreground/80">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* NO CARD */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <Card
              glass
              hoverEffect
              className="mc-surface border-t-[4px] border-t-foreground/15 rounded-[24px] text-foreground p-8 sm:p-10 flex flex-col h-full"
            >
              <h3 className="text-muted-foreground/70 font-extrabold text-sm uppercase tracking-[0.15em] mb-8 pb-4 border-b mc-border font-mc-display">
                {a.noTitle}
              </h3>

              <ul className="flex flex-col gap-6">
                {a.no.map((point, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full mc-fill text-muted-foreground/60 text-[10px] font-bold mt-0.5 border mc-border">
                      ✗
                    </span>
                    <span className="text-xs sm:text-[13.5px] leading-relaxed text-muted-foreground">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
