"use client";

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
// FlowField — Metáfora CRM / embudos.
// Múltiples leads (curvas) que nacen dispersos a la izquierda y se
// CANALIZAN hacia un único punto de convergencia a la derecha (el CRM).
// Con `animated` los pulsos viajan por las curvas hacia el nexo; sin él
// queda solo la FORMA estática del embudo (curvas + nexo).
// ============================================================

// Punto de convergencia (nexo del CRM), en coords del viewBox 1000x600.
const FOCUS = { x: 860, y: 300 };

// Orígenes de los leads en el borde izquierdo (y dispersa).
const SOURCES = [
    { y: 70 },
    { y: 170 },
    { y: 270 },
    { y: 360 },
    { y: 450 },
    { y: 540 },
];

// Curva suave desde un origen izquierdo hasta el nexo.
function flowPath(y: number) {
    const midX = 430;
    return `M -20 ${y} C ${midX} ${y}, ${midX} ${FOCUS.y}, ${FOCUS.x} ${FOCUS.y}`;
}

interface FlowFieldProps extends ContextBackgroundProps {
    /**
     * Anima las curvas (autodibujado), los pulsos de lead y el nexo pulsante.
     * Por defecto `true` (uso en página de equipo). En el hero de masterclass
     * se pasa `false` para dejar solo la forma estática del embudo.
     */
    animated?: boolean;
}

export default function FlowField({
    className,
    intensity = "medium",
    density = "mid",
    opacity = 0.5,
    paused = false,
    animated = true,
}: FlowFieldProps) {
    const reduce = useReducedMotion();
    const resolved = useResolvedDensity(density);
    const { ref, inView, live } = useCtxLive(paused, reduce);

    // Solo animamos si el consumidor lo pide y no hay reduced-motion.
    const isAnimated = animated && reduce !== true;

    // Cuántos leads dibujar según densidad.
    const count = Math.min(SOURCES.length, 2 + DENSITY_STEPS[resolved]);
    const sources = SOURCES.slice(0, count);
    const layerOpacity = INTENSITY[intensity];

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
                    "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
        >
            <svg
                viewBox="0 0 1000 600"
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient id="flow-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--chart-2, #7DD3FC)" stopOpacity="0.1" />
                        <stop offset="70%" stopColor="var(--primary, #0066FF)" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="var(--primary, #0066FF)" stopOpacity="0.9" />
                    </linearGradient>
                    <radialGradient id="flow-nexus" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="var(--primary, #0066FF)" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="var(--primary, #0066FF)" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Curvas de canalización */}
                {sources.map((s, i) => {
                    const d = flowPath(s.y);
                    return (
                        <g key={i} style={{ opacity: layerOpacity }}>
                            {/* trazo base tenue */}
                            <path
                                d={d}
                                fill="none"
                                stroke="var(--border, rgba(0,102,255,0.2))"
                                strokeWidth="1"
                            />
                            {/* trazo de canalización (animado se autodibuja; estático visible fijo) */}
                            {isAnimated ? (
                                <motion.path
                                    d={d}
                                    fill="none"
                                    stroke="url(#flow-stroke)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0, opacity: 0.4 }}
                                    animate={inView ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0 }}
                                    transition={{ duration: 1.6, delay: i * 0.12, ease: "easeOut" }}
                                />
                            ) : (
                                <path
                                    d={d}
                                    fill="none"
                                    stroke="url(#flow-stroke)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    opacity="0.7"
                                />
                            )}
                            {/* pulso de lead viajando hacia el nexo — solo animado */}
                            {isAnimated && live && (
                                <motion.circle
                                    r="3"
                                    fill="var(--chart-2, #7DD3FC)"
                                    initial={{ offsetDistance: "0%" }}
                                    animate={{ offsetDistance: "100%" }}
                                    transition={{
                                        duration: 3.2,
                                        repeat: Infinity,
                                        delay: i * 0.6,
                                        ease: "easeIn",
                                    }}
                                    style={{
                                        offsetPath: `path('${d}')`,
                                        filter: "drop-shadow(0 0 5px var(--primary, #0066FF))",
                                    }}
                                />
                            )}
                        </g>
                    );
                })}

                {/* Glow del nexo de convergencia */}
                <circle cx={FOCUS.x} cy={FOCUS.y} r="120" fill="url(#flow-nexus)" opacity={layerOpacity * 0.5} />
                {/* Nexo (animado late; estático fijo) */}
                {isAnimated ? (
                    <motion.circle
                        cx={FOCUS.x}
                        cy={FOCUS.y}
                        r="14"
                        fill="var(--primary, #0066FF)"
                        initial={{ opacity: 0.6 }}
                        animate={
                            live
                                ? { scale: [1, 1.25, 1], opacity: [0.55, 0.95, 0.55] }
                                : { scale: 1, opacity: 0.7 }
                        }
                        transition={{ duration: 3, repeat: live ? Infinity : 0, ease: "easeInOut" }}
                        style={{ transformOrigin: `${FOCUS.x}px ${FOCUS.y}px` }}
                    />
                ) : (
                    <circle cx={FOCUS.x} cy={FOCUS.y} r="14" fill="var(--primary, #0066FF)" opacity="0.7" />
                )}
            </svg>
        </div>
    );
}
