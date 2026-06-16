"use client";

import { motion } from "framer-motion";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import { cn } from "@/lib/utils";

type MarkKind = "funnel" | "ghl" | "ads";
type MarkPreset = "learn" | "audience" | "urgency";

interface MarkConfig {
  kind: MarkKind;
  left: string;
  top: string;
  size: number;
  opacity: number;
  delay: number;
  drift: number;
  rotate: number;
}

interface SubtleFloatingMarksProps {
  preset: MarkPreset;
  className?: string;
}

const PRESETS: Record<MarkPreset, MarkConfig[]> = {
  learn: [
    { kind: "ghl", left: "78%", top: "14%", size: 74, opacity: 0.08, delay: 0, drift: 8, rotate: -4 },
    { kind: "funnel", left: "8%", top: "67%", size: 58, opacity: 0.07, delay: 0.7, drift: 6, rotate: 7 },
    { kind: "ads", left: "86%", top: "72%", size: 52, opacity: 0.06, delay: 1.2, drift: 7, rotate: 5 },
  ],
  audience: [
    { kind: "funnel", left: "74%", top: "18%", size: 82, opacity: 0.09, delay: 0.1, drift: 8, rotate: -5 },
    { kind: "ads", left: "10%", top: "30%", size: 54, opacity: 0.065, delay: 0.9, drift: 6, rotate: 6 },
    { kind: "ghl", left: "83%", top: "74%", size: 56, opacity: 0.06, delay: 1.4, drift: 5, rotate: 3 },
  ],
  urgency: [
    { kind: "ghl", left: "12%", top: "22%", size: 70, opacity: 0.07, delay: 0.2, drift: 8, rotate: 5 },
    { kind: "funnel", left: "82%", top: "24%", size: 64, opacity: 0.075, delay: 0.8, drift: 7, rotate: -6 },
    { kind: "ads", left: "76%", top: "70%", size: 54, opacity: 0.06, delay: 1.3, drift: 5, rotate: 4 },
  ],
};

export default function SubtleFloatingMarks({ preset, className }: SubtleFloatingMarksProps) {
  const reduce = useHydratedReducedMotion();
  const marks = PRESETS[preset];

  return (
    <div
      data-masterclass-floating-marks={preset}
      className={cn(
        "absolute inset-0 z-[1] hidden overflow-hidden pointer-events-none select-none text-primary sm:block",
        className,
      )}
      aria-hidden
    >
      {marks.map((mark, index) => (
        <motion.div
          key={`${mark.kind}-${index}`}
          data-masterclass-floating-mark={mark.kind}
          className="absolute will-change-transform"
          style={{ left: mark.left, top: mark.top, width: mark.size, height: mark.size }}
          initial={reduce ? { opacity: mark.opacity, y: 0, rotate: mark.rotate } : { opacity: 0, y: 6, rotate: mark.rotate }}
          animate={
            reduce
              ? { opacity: mark.opacity, y: 0, rotate: mark.rotate }
              : { opacity: mark.opacity, y: [0, -mark.drift, 0], rotate: [mark.rotate, mark.rotate * -0.35, mark.rotate] }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  opacity: { duration: 0.8, delay: mark.delay },
                  y: { duration: 7 + index * 1.4, repeat: Infinity, ease: "easeInOut", delay: mark.delay },
                  rotate: { duration: 8 + index * 1.2, repeat: Infinity, ease: "easeInOut", delay: mark.delay },
                }
          }
        >
          <Mark kind={mark.kind} />
        </motion.div>
      ))}
    </div>
  );
}

function Mark({ kind }: { kind: MarkKind }) {
  if (kind === "ghl") return <GhlMark />;
  if (kind === "ads") return <AdsMark />;
  return <FunnelMark />;
}

function GhlMark() {
  return (
    <svg viewBox="0 0 96 84" className="h-full w-full drop-shadow-[0_0_22px_rgba(0,102,255,0.22)]" fill="none">
      <path d="M20 54V30l14-16 14 16v24" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48 64V36l14-16 14 16v28" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.82" />
      <path d="M12 68h72" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.34" />
    </svg>
  );
}

function FunnelMark() {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full drop-shadow-[0_0_18px_rgba(125,211,252,0.18)]" fill="none">
      <path d="M16 22h64L55 50v20l-14 8V50L16 22Z" stroke="currentColor" strokeWidth="4.5" strokeLinejoin="round" />
      <path d="M26 32h44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.42" />
      <path d="M34 43h28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.32" />
    </svg>
  );
}

function AdsMark() {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full drop-shadow-[0_0_18px_rgba(125,211,252,0.2)]" fill="none">
      <circle cx="48" cy="48" r="26" stroke="currentColor" strokeWidth="4" opacity="0.72" />
      <circle cx="48" cy="48" r="10" stroke="currentColor" strokeWidth="3.5" />
      <path d="M48 14v14M48 68v14M14 48h14M68 48h14" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.42" />
      <path d="M66 30l11-11" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.32" />
    </svg>
  );
}
