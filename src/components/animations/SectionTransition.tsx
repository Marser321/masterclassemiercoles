"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export type TransitionType = "dissolve" | "wipe-up" | "line-expand" | "fog";

interface SectionTransitionProps {
    type?: TransitionType;
    className?: string;
    height?: string;
}

// ============================================================
// SectionTransition — Cinematic curtains between sections
// ============================================================
export default function SectionTransition({ 
    type = "dissolve", 
    className = "",
    height = "h-12 sm:h-20" 
}: SectionTransitionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // ── Transition Effects ──────────────────────────────────
    
    // 1. Dissolve (Fade to black/gradient)
    const dissolveOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

    // 2. Wipe-up (Dark curtain rises)
    const wipeUpY = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);
    
    // 3. Line-expand (Luminous line grows from center)
    const lineScaleX = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
    const lineOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);

    // 4. Fog (Blurry gradient that dissipates)
    const fogOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 0]);
    const fogBlur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 20, 0]);

    return (
        <div ref={ref} className={`relative w-full overflow-hidden ${height} flex items-center justify-center -my-6 sm:-my-10 z-20 pointer-events-none ${className}`}>
            
            {type === "dissolve" && (
                <motion.div 
                    style={{ opacity: dissolveOpacity }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deep to-transparent"
                />
            )}

            {type === "wipe-up" && (
                <motion.div 
                    style={{ y: wipeUpY }}
                    className="absolute inset-0 bg-bg-deep shadow-[0_0_50px_rgba(5,5,5,1)]"
                />
            )}

            {type === "line-expand" && (
                <motion.div 
                    style={{ scaleX: lineScaleX, opacity: lineOpacity }}
                    className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent shadow-[0_0_15px_rgba(72,142,255,0.5)]"
                />
            )}

            {type === "fog" && (
                <motion.div 
                    style={{ 
                        opacity: fogOpacity,
                        filter: useTransform(fogBlur, (v) => `blur(${v}px)`)
                    }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/5 to-transparent mix-blend-screen"
                />
            )}
        </div>
    );
}
