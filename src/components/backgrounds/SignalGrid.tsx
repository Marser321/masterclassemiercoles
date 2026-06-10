"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    ContextBackgroundProps,
    INTENSITY,
    DENSITY_STEPS,
    useCtxLive,
    useResolvedDensity,
} from "./types";

// ============================================================
// SignalGrid — Metáfora Ads / pauta.
// Una matriz de celdas-campaña que se "encienden y optimizan": la mayoría
// laten tenues y unas pocas (conversiones) brillan fuerte. CSS grid + stagger
// de Framer. Cero canvas. Determinista (sin Math.random) para SSR estable.
// ============================================================

// Genera un patrón determinista de celdas "calientes" (conversiones).
function isHot(index: number) {
    // Distribución pseudo-aleatoria pero estable entre renders/SSR.
    return (index * 37 + 11) % 9 === 0;
}

export default function SignalGrid({
    className,
    intensity = "medium",
    density = "mid",
    opacity = 0.45,
    paused = false,
}: ContextBackgroundProps) {
    const reduce = useReducedMotion();
    const resolved = useResolvedDensity(density);
    const layerOpacity = INTENSITY[intensity];

    // Columnas según densidad (más densidad → grid más fina).
    const cols = 6 + DENSITY_STEPS[resolved] * 4; // low=10, mid=14, high=18
    const rows = Math.round(cols * 0.6);
    const cells = useMemo(
        () => Array.from({ length: cols * rows }, (_, i) => i),
        [cols, rows]
    );
    const { ref, live: loop } = useCtxLive(paused, reduce);

    return (
        <div
            ref={ref}
            data-motion-audit="decorative-background"
            className={cn(
                "absolute inset-0 overflow-hidden pointer-events-none z-0",
                className
            )}
            style={{
                opacity: `var(--ctxbg-opacity, ${opacity})`,
                maskImage:
                    "radial-gradient(ellipse at center, black 35%, transparent 85%)",
                WebkitMaskImage:
                    "radial-gradient(ellipse at center, black 35%, transparent 85%)",
            }}
        >
            <motion.div
                className="grid w-full h-full gap-1.5 sm:gap-2 p-4 transform-gpu"
                style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                    opacity: layerOpacity,
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-8%" }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.012 } },
                }}
            >
                {cells.map((i) => {
                    const hot = isHot(i);
                    return (
                        <motion.div
                            key={i}
                            className="rounded-[3px] will-change-transform"
                            style={{
                                backgroundColor: hot
                                    ? "var(--primary, #0066FF)"
                                    : "var(--border, rgba(0,102,255,0.2))",
                                boxShadow: hot
                                    ? "0 0 8px var(--primary, #0066FF)"
                                    : "none",
                            }}
                            variants={{
                                hidden: { opacity: 0, scale: 0.4 },
                                visible: {
                                    opacity: hot ? 0.9 : 0.28,
                                    scale: 1,
                                    transition: { type: "spring", stiffness: 120, damping: 16 },
                                },
                            }}
                            animate={
                                loop && hot
                                    ? { opacity: [0.6, 1, 0.6] }
                                    : undefined
                            }
                            transition={
                                loop && hot
                                    ? {
                                          duration: 2.4,
                                          repeat: Infinity,
                                          ease: "easeInOut",
                                          delay: (i % 7) * 0.25,
                                      }
                                    : undefined
                            }
                        />
                    );
                })}
            </motion.div>
        </div>
    );
}
