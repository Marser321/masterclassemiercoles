"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ContextBackgroundProps, INTENSITY, useCtxLive } from "./types";

// ============================================================
// BlueprintLayer — Metáfora sistema / arquitectura por etapas.
// Cadena de nodos conectados que se "construye" etapa por etapa: las
// conexiones y nodos hasta `activeStage` quedan encendidos; los demás, tenues.
// Generaliza el SVG de nodos+pulsos inline de BlueprintSection.tsx.
// ============================================================

interface BlueprintLayerProps extends ContextBackgroundProps {
    /** Nº total de etapas de la arquitectura (default 3). */
    stages?: number;
    /** Etapa activa (1-based). Las etapas <= activeStage quedan encendidas. */
    activeStage?: number;
}

export default function BlueprintLayer({
    className,
    intensity = "medium",
    opacity = 0.5,
    paused = false,
    stages = 3,
    activeStage = stages,
}: BlueprintLayerProps) {
    const reduce = useReducedMotion();
    const layerOpacity = INTENSITY[intensity];
    const { ref, live: loop } = useCtxLive(paused, reduce);

    const W = 1000;
    const H = 600;
    const padX = 120;
    const span = stages > 1 ? (W - padX * 2) / (stages - 1) : 0;
    // Alterna la altura de los nodos para dar sensación de diagrama.
    const nodes = Array.from({ length: stages }, (_, i) => ({
        x: padX + span * i,
        y: H / 2 + (i % 2 === 0 ? -70 : 70),
        active: i < activeStage,
    }));

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
                    "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
            }}
        >
            <svg
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-full"
                style={{ opacity: layerOpacity }}
            >
                <defs>
                    <linearGradient id="bp-line" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--primary, #0066FF)" />
                        <stop offset="100%" stopColor="var(--chart-2, #7DD3FC)" />
                    </linearGradient>
                </defs>

                {/* Conexiones entre etapas */}
                {nodes.slice(0, -1).map((n, i) => {
                    const next = nodes[i + 1];
                    const d = `M ${n.x} ${n.y} C ${(n.x + next.x) / 2} ${n.y}, ${(n.x + next.x) / 2} ${next.y}, ${next.x} ${next.y}`;
                    const lit = next.active;
                    return (
                        <g key={`l-${i}`}>
                            <path
                                d={d}
                                fill="none"
                                stroke="var(--border, rgba(0,102,255,0.2))"
                                strokeWidth="1.5"
                            />
                            <motion.path
                                d={d}
                                fill="none"
                                stroke="url(#bp-line)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: lit ? 1 : 0, opacity: lit ? 0.8 : 0 }}
                                transition={{ duration: 0.9, ease: "easeInOut" }}
                            />
                            {/* pulso por la conexión encendida */}
                            {loop && lit && (
                                <motion.circle
                                    r="3.5"
                                    fill="var(--chart-2, #7DD3FC)"
                                    initial={{ offsetDistance: "0%" }}
                                    animate={{ offsetDistance: "100%" }}
                                    transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                                    style={{
                                        offsetPath: `path('${d}')`,
                                        filter: "drop-shadow(0 0 6px var(--primary, #0066FF))",
                                    }}
                                />
                            )}
                        </g>
                    );
                })}

                {/* Nodos de cada etapa */}
                {nodes.map((n, i) => (
                    <g key={`n-${i}`}>
                        {n.active && loop && (
                            <motion.circle
                                cx={n.x}
                                cy={n.y}
                                r="26"
                                fill="none"
                                stroke="var(--primary, #0066FF)"
                                strokeWidth="1.5"
                                initial={{ scale: 0.8, opacity: 0.4 }}
                                animate={{ scale: 1.3, opacity: [0.5, 0.1, 0.5] }}
                                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                            />
                        )}
                        <motion.circle
                            cx={n.x}
                            cy={n.y}
                            r="16"
                            fill="var(--bg-card, rgba(15,23,42,0.95))"
                            stroke={n.active ? "var(--primary, #0066FF)" : "var(--border, rgba(0,102,255,0.2))"}
                            strokeWidth="2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, opacity: n.active ? 1 : 0.4 }}
                            transition={{ type: "spring", stiffness: 120, damping: 14, delay: i * 0.1 }}
                            style={{
                                filter: n.active
                                    ? "drop-shadow(0 0 10px var(--primary, #0066FF))"
                                    : "none",
                            }}
                        />
                        <circle
                            cx={n.x}
                            cy={n.y}
                            r="5"
                            fill={n.active ? "var(--primary, #0066FF)" : "var(--muted-foreground, #94a3b8)"}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
}
