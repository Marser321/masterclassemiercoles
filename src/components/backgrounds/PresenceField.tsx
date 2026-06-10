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
// PresenceField — Metáfora "presencia humana" (comunidad / equipo).
// En vez de una malla de datos, una reunión de avatares (personas) que
// respiran, se conectan con arcos suaves y muestran presencia "en línea".
// SVG ligero (no canvas/WebGL). Posiciones deterministas para SSR estable.
// ============================================================

// Paleta humana/variada pero on-brand: azules con un toque cálido escaso.
const PALETTE = [
    "var(--primary, #0066FF)",
    "var(--primary, #0066FF)",
    "var(--chart-2, #7DD3FC)",
    "var(--chart-2, #7DD3FC)",
    "#8FB4FF",
    "#F2B705", // calidez humana (escasa)
];

interface Person {
    x: number;
    y: number;
    r: number;
    color: string;
    online: boolean;
    delay: number;
}

// PRNG determinista (mulberry32) — mismo patrón que ConstellationField,
// con otra semilla para que el reparto no coincida con la constelación.
function makePeople(n: number): Person[] {
    let seed = 0x6a09e667;
    const rand = () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const CX = 500;
    const CY = 300;
    return Array.from({ length: n }, () => {
        const angle = rand() * Math.PI * 2;
        // Radio sesgado hacia afuera: deja el centro (titular) despejado.
        const rad = 185 + Math.pow(rand(), 0.7) * 285;
        // Redondeo a entero: cos/sin/pow difieren en el último bit entre Node (SSR)
        // y el navegador; redondear evita el hydration mismatch.
        const x = Math.round(Math.max(50, Math.min(950, CX + Math.cos(angle) * rad * 1.32)));
        const y = Math.round(Math.max(55, Math.min(545, CY + Math.sin(angle) * rad)));
        return {
            x,
            y,
            r: Math.round(9 + rand() * 9),
            color: PALETTE[Math.floor(rand() * PALETTE.length)],
            online: rand() < 0.42,
            delay: rand() * 2.5,
        };
    });
}

// Conecta cada persona con su vecino más cercano mediante un arco suave
// (curva cuadrática, no línea recta) para que lea "conexión", no "data".
function makeArcs(people: Person[]) {
    const arcs: { d: string; delay: number }[] = [];
    for (let i = 0; i < people.length; i++) {
        let best = -1;
        let bestDist = Infinity;
        for (let j = 0; j < people.length; j++) {
            if (i === j) continue;
            const dx = people[i].x - people[j].x;
            const dy = people[i].y - people[j].y;
            const d = dx * dx + dy * dy;
            if (d < bestDist) {
                bestDist = d;
                best = j;
            }
        }
        if (best > i) {
            const a = people[i];
            const b = people[best];
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2;
            // Control desplazado perpendicular al segmento -> arco orgánico.
            const nx = -(b.y - a.y);
            const ny = b.x - a.x;
            const len = Math.hypot(nx, ny) || 1;
            const off = 20;
            const cx = Math.round(mx + (nx / len) * off);
            const cy = Math.round(my + (ny / len) * off);
            arcs.push({
                d: `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`,
                delay: i * 0.06,
            });
        }
    }
    return arcs;
}

export default function PresenceField({
    className,
    intensity = "medium",
    density = "mid",
    opacity = 0.5,
    paused = false,
}: ContextBackgroundProps) {
    const reduce = useReducedMotion();
    const resolved = useResolvedDensity(density);
    const layerOpacity = INTENSITY[intensity];

    const count = 5 + DENSITY_STEPS[resolved] * 4; // low=9, mid=13, high=17
    const people = useMemo(() => makePeople(count), [count]);
    const arcs = useMemo(() => makeArcs(people), [people]);
    const { ref, live } = useCtxLive(paused, reduce);

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
                    "radial-gradient(ellipse at center, black 38%, transparent 92%)",
                WebkitMaskImage:
                    "radial-gradient(ellipse at center, black 38%, transparent 92%)",
            }}
        >
            <svg
                viewBox="0 0 1000 600"
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-full"
                style={{ opacity: layerOpacity }}
            >
                {/* Arcos de conexión (se trazan al entrar en vista) */}
                {arcs.map((arc, i) => (
                    <motion.path
                        key={`arc-${i}`}
                        d={arc.d}
                        fill="none"
                        stroke="var(--chart-2, #7DD3FC)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.16 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: arc.delay, ease: "easeOut" }}
                    />
                ))}

                {/* Avatares (personas): entran con fade; presencia viva por el halo y el punto "en línea" */}
                {people.map((p, i) => (
                    <motion.g
                        key={`p-${i}`}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.05 }}
                    >
                        {/* Halo de presencia (respira) */}
                        <motion.circle
                            cx={p.x}
                            cy={p.y}
                            r={p.r * 1.8}
                            fill={p.color}
                            style={{ filter: "blur(6px)" }}
                            initial={{ opacity: 0.12 }}
                            animate={live ? { opacity: [0.1, 0.26, 0.1] } : undefined}
                            transition={
                                live
                                    ? {
                                          duration: 3.2,
                                          repeat: Infinity,
                                          ease: "easeInOut",
                                          delay: p.delay,
                                      }
                                    : undefined
                            }
                        />
                        {/* Disco avatar */}
                        <circle
                            cx={p.x}
                            cy={p.y}
                            r={p.r}
                            fill={p.color}
                            fillOpacity={0.82}
                            stroke="var(--foreground, #f8fafc)"
                            strokeOpacity={0.18}
                            strokeWidth={1}
                        />
                        {/* Brillo superior (sheen de avatar) */}
                        <circle
                            cx={p.x - p.r * 0.3}
                            cy={p.y - p.r * 0.35}
                            r={p.r * 0.4}
                            fill="#ffffff"
                            fillOpacity={0.22}
                        />
                        {/* Indicador "en línea" (presencia activa) */}
                        {p.online && (
                            <>
                                <circle
                                    cx={p.x + p.r * 0.72}
                                    cy={p.y + p.r * 0.72}
                                    r={p.r * 0.34 + 1.5}
                                    fill="var(--background, #020617)"
                                />
                                <motion.circle
                                    cx={p.x + p.r * 0.72}
                                    cy={p.y + p.r * 0.72}
                                    r={p.r * 0.34}
                                    fill="#10D056"
                                    initial={{ opacity: 0.7 }}
                                    animate={live ? { opacity: [0.55, 1, 0.55] } : undefined}
                                    transition={
                                        live
                                            ? {
                                                  duration: 2.4,
                                                  repeat: Infinity,
                                                  ease: "easeInOut",
                                                  delay: p.delay * 0.5,
                                              }
                                            : undefined
                                    }
                                />
                            </>
                        )}
                    </motion.g>
                ))}
            </svg>
        </div>
    );
}
