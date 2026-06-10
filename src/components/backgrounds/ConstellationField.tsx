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
// ConstellationField — Metáfora comunidad / equipo.
// Una red de nodos (personas) conectados por aristas que se iluminan.
// SVG ligero (no canvas, no WebGL). Posiciones deterministas para SSR estable.
// ============================================================

// PRNG determinista (mulberry32) para repartir nodos sin Math.random.
function makeNodes(n: number) {
    let seed = 0x9e3779b9;
    const rand = () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return Array.from({ length: n }, () => ({
        x: 60 + rand() * 880,
        y: 50 + rand() * 500,
        r: 2.5 + rand() * 2.5,
        delay: rand() * 3,
    }));
}

// Conecta cada nodo con su vecino más cercano para formar la red.
function makeEdges(nodes: { x: number; y: number }[]) {
    const edges: { a: number; b: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
        let best = -1;
        let bestDist = Infinity;
        for (let j = 0; j < nodes.length; j++) {
            if (i === j) continue;
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const d = dx * dx + dy * dy;
            if (d < bestDist) {
                bestDist = d;
                best = j;
            }
        }
        if (best > i) edges.push({ a: i, b: best });
    }
    return edges;
}

export default function ConstellationField({
    className,
    intensity = "medium",
    density = "mid",
    opacity = 0.5,
    paused = false,
}: ContextBackgroundProps) {
    const reduce = useReducedMotion();
    const resolved = useResolvedDensity(density);
    const layerOpacity = INTENSITY[intensity];

    const nodeCount = 6 + DENSITY_STEPS[resolved] * 6; // low=12, mid=18, high=24
    const nodes = useMemo(() => makeNodes(nodeCount), [nodeCount]);
    const edges = useMemo(() => makeEdges(nodes), [nodes]);
    const { ref, live: twinkle } = useCtxLive(paused, reduce);

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
                    "radial-gradient(ellipse at center, black 40%, transparent 90%)",
                WebkitMaskImage:
                    "radial-gradient(ellipse at center, black 40%, transparent 90%)",
            }}
        >
            <svg
                viewBox="0 0 1000 600"
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-full"
                style={{ opacity: layerOpacity }}
            >
                {/* Aristas (conexiones que se trazan al entrar en vista) */}
                {edges.map((e, i) => (
                    <motion.line
                        key={`e-${i}`}
                        x1={nodes[e.a].x}
                        y1={nodes[e.a].y}
                        x2={nodes[e.b].x}
                        y2={nodes[e.b].y}
                        stroke="var(--primary, #0066FF)"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.35 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.05, ease: "easeOut" }}
                    />
                ))}

                {/* Nodos (personas) que parpadean suavemente */}
                {nodes.map((n, i) => (
                    <motion.circle
                        key={`n-${i}`}
                        cx={n.x}
                        cy={n.y}
                        r={n.r}
                        fill="var(--chart-2, #7DD3FC)"
                        style={{ filter: "drop-shadow(0 0 4px var(--primary, #0066FF))" }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 0.85, scale: 1 }}
                        viewport={{ once: true }}
                        animate={
                            twinkle
                                ? { opacity: [0.5, 0.95, 0.5] }
                                : undefined
                        }
                        transition={
                            twinkle
                                ? {
                                      duration: 2.6,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                      delay: n.delay,
                                  }
                                : { duration: 0.6, delay: i * 0.04 }
                        }
                    />
                ))}
            </svg>
        </div>
    );
}
