"use client";

import { motion } from "framer-motion";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import Reveal from "@/components/animations/Reveal";
import { COPIES, VISUALS, type CopyId, type VisualId } from "@/lib/data/masterclassCopy";
import MasterclassSectionBackdrop from "./MasterclassSectionBackdrop";
import SubtleFloatingMarks from "./SubtleFloatingMarks";

interface LearnGridProps {
  copy: CopyId;
  visual: VisualId;
  onRegisterClick: () => void;
}

export default function LearnGrid({ copy, visual, onRegisterClick }: LearnGridProps) {
  const learn = COPIES[copy].learn;
  const blocks = learn.blocks;
  const isList = VISUALS[visual].learnLayout === "list";

  return (
    <section id="aprender" className="relative overflow-hidden py-16 sm:py-20 px-6 sm:px-8 mc-section font-mc-body">
      <MasterclassSectionBackdrop
        imageSrc="/masterclass/backgrounds/section-learn-crm-blueprint.png"
        scrim="left"
        imageClassName="object-[62%_50%]"
      />
      <SubtleFloatingMarks preset="learn" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <Reveal className="text-left mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.15em] mb-4">
            <span className="h-0.5 w-8 bg-primary rounded-full" />
            {learn.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight mb-4 font-display-heavy font-mc-display whitespace-pre-line">
            {learn.heading}
          </h2>
          <p className="text-muted-foreground max-w-xl text-sm sm:text-base leading-relaxed">
            {learn.sub}
          </p>
        </Reveal>

        {/* ==========================================
            LAYOUT 1: CARDS GRID (v1 & v3)
            ========================================== */}
        {!isList && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {blocks.map((block, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="flex"
              >
                <Card
                  glass
                  hoverEffect
                  className="group relative flex flex-col justify-between p-7 w-full mc-surface rounded-[20px] transition-all overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-primary/50 via-primary to-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 pointer-events-none" />

                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-2xl h-12 w-12 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        {block.icon}
                      </div>
                      <span className="text-[13px] font-black text-primary/40 group-hover:text-primary transition-colors font-mc-display">
                        {block.num}
                      </span>
                    </div>

                    <h3 className="text-[15px] font-bold text-foreground mb-2.5 leading-snug group-hover:text-primary transition-colors font-mc-display">
                      {block.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed mb-6">
                      {block.description}
                    </p>
                  </div>

                  <div className="text-[11px] font-bold text-primary flex items-center gap-1.5 pt-4 border-t mc-border font-mc-display">
                    <span className="text-[9px]">✦</span>
                    {block.outcome}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* ==========================================
            LAYOUT 2: NUMBERED LIST-ROWS (v2)
            ========================================== */}
        {isList && (
          <div className="flex flex-col mc-surface rounded-2xl overflow-hidden divide-y mc-divide">
            {blocks.map((block, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] hover:bg-primary/[0.04] transition-colors"
              >
                {/* Num cell */}
                <div className="p-6 md:p-8 flex items-start md:justify-center border-b md:border-b-0 md:border-r mc-border pt-8">
                  <span className="font-mc-display text-base font-black text-primary/60">
                    {block.num}
                  </span>
                </div>

                {/* Main Content Cell */}
                <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r mc-border flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{block.icon}</span>
                    <h3 className="text-[15px] font-bold text-foreground font-mc-display">
                      {block.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-muted-foreground pl-0 md:pl-7">
                    {block.description}
                  </p>
                </div>

                {/* Outcome Cell */}
                <div className="p-6 md:p-8 flex items-center">
                  <div className="inline-flex items-start gap-2.5 text-xs sm:text-[13px] font-extrabold text-emerald-500 leading-snug">
                    <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px]">
                      ✓
                    </span>
                    <span>{block.outcome}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Optional Under-Grid CTA */}
        {learn.underCta && (
          <div className="text-center mt-12 flex flex-col items-center gap-4 border-t mc-border pt-10">
            <p className="text-xs sm:text-sm text-muted-foreground">
              {learn.underCta.text}
            </p>
            <Button
              variant="outline"
              onClick={onRegisterClick}
              className="px-8 py-3 rounded-full text-xs font-bold tracking-wider uppercase"
            >
              {learn.underCta.button}
            </Button>
          </div>
        )}

      </div>
    </section>
  );
}
