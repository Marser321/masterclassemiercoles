"use client";

import { motion } from "framer-motion";
import { Card } from "../../ui/Card";
import Reveal from "@/components/animations/Reveal";
import { VERSIONS, type MasterclassVersionId } from "@/lib/data/masterclassCopy";

interface TestimonialsProps {
  variant: MasterclassVersionId;
}

export default function Testimonials({ variant }: TestimonialsProps) {
  const t = VERSIONS[variant].testimonials;

  return (
    <section id="testimonios" className="relative py-16 sm:py-20 px-6 sm:px-8 border-y mc-border mc-section font-mc-body">
      <div className="absolute top-[40%] left-[-10%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section Header */}
        <Reveal className="text-left mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.15em] mb-4 font-mc-display">
            <span className="h-0.5 w-8 bg-primary rounded-full" />
            {t.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight mb-4 font-display-heavy font-mc-display">
            {t.heading}
          </h2>
          <p className="text-muted-foreground max-w-xl text-sm sm:text-base leading-relaxed">
            {t.sub}
          </p>
        </Reveal>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.list.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex group"
            >
              <Card
                glass
                hoverEffect
                className="p-8 mc-surface rounded-[20px] flex flex-col justify-between w-full h-full relative overflow-hidden"
              >
                {/* Visual quote accent mark */}
                <span className="absolute right-6 top-6 text-7xl font-serif text-primary/[0.06] select-none pointer-events-none leading-none">
                  &ldquo;
                </span>

                <div>
                  {/* Stars Rating */}
                  <div className="flex gap-1 text-amber-400 text-xs sm:text-sm mb-5">
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  {/* Body Text */}
                  <p className="text-xs sm:text-[13.5px] italic leading-relaxed text-foreground/80 mb-8 font-medium">
                    &quot;{item.text}&quot;
                  </p>
                </div>

                {/* Author Card Footer */}
                <div className="flex items-center gap-3.5 pt-4 border-t mc-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 font-mc-display transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/15">
                    {item.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-foreground font-mc-display">
                      {item.name}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                      {item.role}
                    </div>
                  </div>
                </div>

              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
