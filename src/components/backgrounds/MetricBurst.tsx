"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import {
    ContextBackgroundProps,
    INTENSITY,
    DENSITY_STEPS,
    useCtxLive,
    useResolvedDensity,
} from "./types";

// ============================================================
// MetricBurst — Metáfora resultado / crecimiento.
// Una curva ascendente que se autodibuja al entrar en vista, con un área
// rellena debajo y una ráfaga de partículas en la cima. SVG + pathLength.
// Pensado como fondo de tarjetas de caso / pantallas de éxito.
// ============================================================

// Color del trazo; por defecto usa el primario del tema, pero el consumidor
// puede pasar un color por tarjeta (item.color) vía prop `color`.
interface MetricBurstProps extends ContextBackgroundProps {
    color?: string;
}

const CURVE = "M 0 380 C 120 360, 220 320, 320 260 C 420 200, 500 150, 640 60";
const PEAK = { x: 640, y: 60 };

// Partículas deterministas alrededor de la cima.
function makeParticles(n: number) {
    let seed = 0x1234567;
    const rand = () => {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        return seed / 0x7fffffff;
    };
    return Array.from({ length: n }, () => ({
        dx: (rand() - 0.5) * 120,
        dy: -rand() * 90,
        r: 1.5 + rand() * 2.5,
        delay: rand() * 0.8,
    }));
}

export default function MetricBurst({
    className,
    intensity = "medium",
    density = "mid",
    opacity = 0.5,
    paused = false,
    color,
}: MetricBurstProps) {
    const reduce = useHydratedReducedMotion();
    const resolved = useResolvedDensity(density);
    const layerOpacity = INTENSITY[intensity];
    const stroke = color ?? "var(--primary, #0066FF)";

    const particleCount = reduce ? 0 : 4 + DENSITY_STEPS[resolved] * 4; // low=8, mid=12, high=16
    const particles = useMemo(() => makeParticles(particleCount), [particleCount]);
    const { ref, live: burst } = useCtxLive(paused, reduce);

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
                    "linear-gradient(to top, black 0%, black 70%, transparent 100%)",
                WebkitMaskImage:
                    "linear-gradient(to top, black 0%, black 70%, transparent 100%)",
            }}
        >
            <svg
                viewBox="0 0 640 400"
                preserveAspectRatio="xMaxYMax slice"
                className="w-full h-full"
                style={{ opacity: layerOpacity }}
            >
                <defs>
                    <linearGradient id="mb-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
                        <stop offset="100%" stopColor={stroke} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Área bajo la curva */}
                <motion.path
                    d={`${CURVE} L 640 400 L 0 400 Z`}
                    fill="url(#mb-fill)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.3 }}
                />

                {/* Curva ascendente */}
                <motion.path
                    d={CURVE}
                    fill="none"
                    stroke={stroke}
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: "easeOut" }}
                    style={{ filter: `drop-shadow(0 0 6px ${stroke})` }}
                />

                {/* Punto de la cima */}
                <motion.circle
                    cx={PEAK.x}
                    cy={PEAK.y}
                    r="6"
                    fill={stroke}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 12 }}
                    style={{ filter: `drop-shadow(0 0 8px ${stroke})` }}
                />

                {/* Ráfaga de partículas en la cima */}
                {particles.map((p, i) => (
                    <motion.circle
                        key={i}
                        cx={PEAK.x}
                        cy={PEAK.y}
                        r={p.r}
                        fill={stroke}
                        initial={{ opacity: 0, x: 0, y: 0 }}
                        whileInView={
                            burst
                                ? { opacity: [0, 1, 0], x: p.dx, y: p.dy }
                                : { opacity: 0.6, x: p.dx * 0.4, y: p.dy * 0.4 }
                        }
                        viewport={{ once: true }}
                        transition={{ duration: 1.6, delay: 1.5 + p.delay, ease: "easeOut" }}
                    />
                ))}
            </svg>
        </div>
    );
}
