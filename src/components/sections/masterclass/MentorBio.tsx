"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Fragment } from "react";
import AnimatedCounter from "../../ui/AnimatedCounter";
import Reveal from "@/components/animations/Reveal";
import { VERSIONS, type MasterclassVersionId } from "@/lib/data/masterclassCopy";

interface MentorBioProps {
  variant: MasterclassVersionId;
}

export default function MentorBio({ variant }: MentorBioProps) {
  const m = VERSIONS[variant].mentor;

  return (
    <section id="mentor" className="relative py-16 sm:py-20 px-6 sm:px-8 overflow-hidden mc-section font-mc-body">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(180deg,transparent_0%,rgba(0,102,255,0.026)_48%,transparent_100%)]" />
      <div className="absolute inset-0 z-0 pointer-events-none texture-grid opacity-[0.12]" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Section Header */}
        <Reveal className="text-left mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.15em] mb-4">
            <span className="h-0.5 w-8 bg-primary rounded-full" />
            {m.kicker}
          </div>
        </Reveal>

        {/* Mentor Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 items-start">

          {/* Left: CEO Photo Wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center w-full"
          >
            <div className="relative rounded-[24px] mc-surface p-2 overflow-hidden group max-w-[220px] md:max-w-none">
              <div className="relative aspect-square w-full rounded-[18px] overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/team/ceo.png"
                  alt={`${m.name} - ${m.role} ${m.company}`}
                  fill
                  sizes="(max-width: 768px) 200px, 240px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 py-3 bg-primary text-white text-[9.5px] font-black uppercase tracking-[0.15em] text-center shadow-lg">
                  {m.role}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Bio Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col text-left justify-center h-full"
          >
            <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-2 font-display-heavy font-mc-display">
              {m.name}
            </h3>
            <div className="text-primary font-bold text-xs uppercase tracking-[0.12em] mb-6">
              {m.company}
            </div>

            <p className="text-sm sm:text-[15px] leading-relaxed text-muted-foreground mb-8 text-pretty">
              {m.bio.map((paragraph, i) => (
                <Fragment key={i}>
                  {i > 0 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                  {paragraph}
                </Fragment>
              ))}
            </p>

            {/* Mentor Stats Pillars */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t mc-border">
              {m.stats.map((stat, i) => (
                <div key={i} className="group flex flex-col items-start border-l-2 border-primary pl-4 transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="flex items-baseline font-display-heavy text-2xl sm:text-3xl font-black text-foreground drop-shadow-[0_2px_10px_rgba(0,102,255,0.15)] transition-transform duration-300 group-hover:scale-105">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-2xl sm:text-3xl tracking-tight font-mc-display"
                    />
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
