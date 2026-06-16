"use client";

import { motion, useReducedMotion } from "framer-motion";
import { COPIES, VISUALS, type CopyId, type VisualId } from "@/lib/data/masterclassCopy";

interface RibbonProps {
  copy: CopyId;
  visual: VisualId;
}

// Bloque de items del ticker (se repite para un loop continuo).
function TickerSegment({ items, ariaHidden = false }: { items: string[]; ariaHidden?: boolean }) {
  return (
    <div className="flex items-center shrink-0" aria-hidden={ariaHidden}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="text-foreground/85 text-[11px] sm:text-xs font-medium tracking-wide whitespace-nowrap">
            {item}
          </span>
          <span className="text-primary/45 text-[8px] mx-4 sm:mx-5" aria-hidden>
            ◆
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Ribbon({ copy, visual }: RibbonProps) {
  const r = COPIES[copy].ribbon;
  const reduce = useReducedMotion();
  const isAlert = VISUALS[visual].ribbonTone === "alert";
  const dotColor = isAlert ? "bg-red-500" : "bg-primary";
  const liveColor = isAlert ? "text-red-500" : "text-primary";

  // Items que se desplazan en el ticker (se repiten para un loop continuo).
  const items = [r.schedule, r.badge, r.scarcity, "Danger Fernández en vivo"];

  return (
    <div className="relative z-50 flex items-stretch bg-gradient-to-r from-background via-primary/5 to-background border-b border-primary/20 select-none font-mc-body overflow-hidden">
      {/* Glow line en la base */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />

      {/* Badge fijo "EN VIVO" (no se desplaza) */}
      <div className={`relative z-10 flex items-center gap-2 px-3 sm:px-4 py-2.5 shrink-0 border-r border-primary/20 ${isAlert ? "bg-red-500/10" : "bg-primary/10"}`}>
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColor} opacity-75`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`} />
        </span>
        <span className={`uppercase text-[10px] ${liveColor} tracking-widest font-black whitespace-nowrap`}>
          {r.live}
        </span>
      </div>

      {/* Pista del ticker */}
      <div className="relative flex-1 overflow-hidden py-2.5 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        {reduce ? (
          <div className="flex items-center px-4">
            <TickerSegment items={items} />
          </div>
        ) : (
          <motion.div
            className="flex items-center w-max pl-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            <TickerSegment items={items} />
            <TickerSegment items={items} ariaHidden />
          </motion.div>
        )}
      </div>
    </div>
  );
}
