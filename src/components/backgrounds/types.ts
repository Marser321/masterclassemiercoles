"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// ============================================================
// Contrato compartido de los fondos contextuales.
// Todos los fondos de src/components/backgrounds/ exponen esta API
// para ser intercambiables (mismo patrón que AuroraBackground / FloatingIcons).
// ============================================================
export type CtxIntensity = "soft" | "medium" | "strong";
export type CtxDensity = "low" | "mid" | "high";

export interface ContextBackgroundProps {
    className?: string;
    /** Fuerza de glows/opacidad de las capas. Default "medium". */
    intensity?: CtxIntensity;
    /** Cantidad de elementos. En móvil siempre se fuerza "low". */
    density?: CtxDensity;
    /** Opacidad base del contenedor (se combina con --ctxbg-opacity por tema). */
    opacity?: number;
    /** Congela los loops decorativos (p.ej. al abrir un modal). */
    paused?: boolean;
}

// Multiplicador de opacidad de las capas según intensidad.
export const INTENSITY: Record<CtxIntensity, number> = {
    soft: 0.55,
    medium: 0.8,
    strong: 1,
};

// Nº de elementos por nivel de densidad (los fondos lo interpretan a su manera).
export const DENSITY_STEPS: Record<CtxDensity, number> = {
    low: 1,
    mid: 2,
    high: 3,
};

/**
 * Resuelve la densidad efectiva: en móvil (<640px) siempre "low" para no
 * animar de más. En desktop respeta la solicitada. Mismo breakpoint que
 * FloatingIcons.tsx:54.
 */
export function useResolvedDensity(requested: CtxDensity = "mid"): CtxDensity {
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 640px)");
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);
    return isDesktop ? requested : "low";
}

/**
 * Gating común de animación: solo anima si el contenedor intersecta el
 * viewport (además de respetar `paused` y reduced-motion). Colgar `ref`
 * del div raíz del fondo. Patrón original de FlowField.
 */
export function useCtxLive(paused: boolean, reduce: boolean | null) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, margin: "-10%" });
    // `inView` queda expuesto para animaciones de entrada (draw-in) que deben
    // correr aunque reduced-motion congele los loops.
    return { ref, inView, live: inView && !paused && !reduce };
}
