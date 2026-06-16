"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Card } from "../../ui/Card";
import Reveal from "@/components/animations/Reveal";
import { COPIES, type CopyId } from "@/lib/data/masterclassCopy";

interface FAQAccordionProps {
  copy: CopyId;
}

export default function FAQAccordion({ copy }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faq = COPIES[copy].faq;

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-16 sm:py-20 px-6 sm:px-8 mc-section font-mc-body">
      <div className="max-w-3xl mx-auto relative z-10">

        {/* Section Header */}
        <Reveal className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.15em] mb-4 font-mc-display">
            <span className="h-0.5 w-8 bg-primary rounded-full" />
            {faq.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight leading-tight mb-4 font-display-heavy font-mc-display">
            {faq.heading}
          </h2>
        </Reveal>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="w-full">
                <Card
                  glass
                  hoverEffect={false}
                  className={`border transition-all duration-300 rounded-2xl overflow-hidden mc-fill
                    ${isOpen ? "border-primary/45 shadow-[0_0_20px_rgba(0,102,255,0.06)]" : "mc-border"}`}
                >
                  <button
                    onClick={() => handleToggle(idx)}
                    className="w-full flex items-center justify-between text-left p-6 sm:p-7 select-none cursor-pointer focus:outline-none transition-colors hover:bg-foreground/[0.02]"
                  >
                    <span className="text-sm sm:text-base font-bold text-foreground pr-4 leading-snug font-mc-display">
                      {item.question}
                    </span>
                    <span className="w-8 h-8 rounded-full mc-fill flex items-center justify-center text-primary border mc-border transition-colors hover:bg-primary hover:text-white shrink-0">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-primary/70"}`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-[14px] leading-relaxed text-muted-foreground border-t mc-border pt-4">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
