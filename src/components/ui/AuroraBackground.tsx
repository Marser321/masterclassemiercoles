"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
    className?: string;
    opacity?: number;
    intensity?: "soft" | "medium" | "strong";
}

export const AuroraBackground = ({ 
    className, 
    opacity = 0.3,
    intensity = "medium"
}: AuroraBackgroundProps) => {
    const shouldReduceMotion = useReducedMotion();

    const intensityMap = {
        soft: { blur: "blur(64px)", scale: 1 },
        medium: { blur: "blur(88px)", scale: 1.12 },
        strong: { blur: "blur(112px)", scale: 1.25 },
    };

    const config = intensityMap[intensity];
    const ambientTransition = shouldReduceMotion ? undefined : {
        duration: 48,
        repeat: Infinity,
        ease: "linear" as const,
    };

    return (
        <div 
            data-motion-audit="decorative-background"
            className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}
            style={{
                maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                opacity: `var(--aurora-opacity, ${opacity})`,
                mixBlendMode: "var(--aurora-blend-mode, normal)" as React.CSSProperties["mixBlendMode"],
            }}
        >
            {/* Main Aurora Orb 1 — Flowy Fog */}
            <motion.div
                animate={shouldReduceMotion ? {
                    x: "-12%",
                    y: "-8%",
                    scale: config.scale,
                    rotate: 0,
                } : {
                    x: ["-25%", "25%", "10%", "-15%", "-25%"],
                    y: ["-20%", "30%", "-10%", "20%", "-20%"],
                    scale: [1, config.scale, 1.12, config.scale + 0.08, 1],
                    rotate: [0, 90, 180, 270, 360],
                }}
                transition={ambientTransition}
                className="absolute top-0 left-0 w-[1200px] h-[1200px] rounded-full opacity-30 will-change-transform pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, var(--color-aurora-center, #ffffff) 0%, var(--color-aurora-mid, #7DD3FC) 15%, var(--color-aurora-edge, #0066FF) 45%, transparent 75%)",
                    filter: config.blur,
                    transform: "translateZ(0)",
                }}
            />

            {/* Aurora Orb 2 — Floating Nebula */}
            <motion.div
                animate={shouldReduceMotion ? {
                    x: "18%",
                    y: "16%",
                    scale: config.scale,
                    rotate: 0,
                } : {
                    x: ["30%", "-20%", "15%", "40%", "30%"],
                    y: ["40%", "0%", "30%", "-10%", "40%"],
                    scale: [config.scale, 1, config.scale + 0.1, 1.08, config.scale],
                    rotate: [360, 270, 180, 90, 0],
                }}
                transition={shouldReduceMotion ? undefined : {
                    ...ambientTransition,
                    duration: 54,
                    delay: 2,
                }}
                className="absolute bottom-0 right-0 w-[1100px] h-[1100px] rounded-full opacity-25 will-change-transform pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, var(--color-aurora-mid, #7DD3FC) 0%, var(--color-aurora-edge, #0066FF) 40%, var(--background) 70%, transparent 95%)",
                    filter: config.blur,
                    transform: "translateZ(0)",
                }}
            />

            {/* Dynamic Light Streaks (Strategic White Pops) */}
            <motion.div
                animate={shouldReduceMotion ? {
                    x: "25%",
                    opacity: 0.12,
                } : {
                    x: ["-10%", "100%"],
                    opacity: [0, 0.4, 0],
                }}
                transition={shouldReduceMotion ? undefined : {
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-xl pointer-events-none"
            />

            <motion.div
                animate={shouldReduceMotion ? {
                    opacity: 0.16,
                    scale: 1,
                } : {
                    opacity: [0.1, 0.4, 0.1],
                    scale: [1.1, 0.9, 1.1],
                }}
                transition={shouldReduceMotion ? undefined : {
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3,
                }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full will-change-transform pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, #ffffff 0%, rgba(0, 102, 255, 0.2) 40%, transparent 80%)",
                    filter: "blur(56px)",
                    transform: "translateZ(0)",
                }}
            />
            
            {/* Grain/Texture Overlay to unifiy the aurora */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay texture-travertine" />
        </div>
    );
};
