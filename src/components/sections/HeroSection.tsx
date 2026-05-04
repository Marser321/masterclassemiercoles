"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";

import dynamic from "next/dynamic";
import { AuroraBackground } from "../ui/AuroraBackground";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import LogoMarquee from "../ui/LogoMarquee";

// Load 3D Canvas dynamically
const OrbitalCore = dynamic(
    () => import("@/components/three/OrbitalCore"),
    { ssr: false }
);

// ============================================================
// Animation Variants — Cinematic & Slow
// ============================================================
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Slightly faster stagger for engagement
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1.0,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
};

// ============================================================
// Hero Section — "Revenue OS" with Cinematic Exit Parallax
// ============================================================
export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const handleScrollToScanner = () => {
        const el = document.getElementById("contacto");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleScrollToServicios = () => {
        const el = document.getElementById("servicios");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // ── Scroll-linked Parallax ─────────────────────────────
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    // Multi-layer parallax speeds (faster = exits faster)
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.92]);

    // Text exits faster than background
    const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
    const badgeY = useTransform(scrollYProgress, [0, 0.4], [0, -140]);
    const ctaY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
    const ctaOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

    // Aurora orbs disperse outward on scroll
    const auroraY1 = useTransform(scrollYProgress, [0, 0.6], [0, 150]);
    const auroraY2 = useTransform(scrollYProgress, [0, 0.6], [0, -120]);
    const auroraScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);
    const auroraOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0.15, 0]);

    // 3D layer compresses
    const orbitalScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.75]);
    const orbitalOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 0]);

    // Logo marquee has a "sticky" feel — moves slower
    const marqueeY = useTransform(scrollYProgress, [0, 0.6], [0, -30]);
    const marqueeOpacity = useTransform(scrollYProgress, [0.3, 0.55], [1, 0]);

    // Scroll indicator fades fast
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background"
        >
            {/* 1. Global Aurora Background — Flowy & Dynamic */}
            <AuroraBackground intensity="strong" className="opacity-60" />

            {/* 2. Background Texture Overlay */}
            <div className="absolute inset-0 z-[1] texture-travertine opacity-20 mix-blend-soft-light transform-gpu pointer-events-none" />

            {/* 3. 3D Core Layer — Enabled on all devices per user request */}
            <motion.div
                style={{
                    scale: orbitalScale,
                    opacity: orbitalOpacity,
                    mixBlendMode: "var(--hero-blend-mode)" as CSSProperties["mixBlendMode"]
                }}
                className="absolute inset-0 z-[2] scale-90 sm:scale-100 will-change-transform pointer-events-none"
            >
                <OrbitalCore />
            </motion.div>

            {/* 4. Vignette & Lighting — Adjusted to avoid sharp bottom seams */}
            <div
                className="absolute inset-0 z-[3] pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, transparent 30%, var(--vignette-color) 100%)",
                }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[3] pointer-events-none" />

            {/* 5. Content Layer — Multi-speed parallax exit */}
            <motion.div
                style={{
                    opacity: heroOpacity,
                    scale: heroScale,
                }}
                className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto mt-0 sm:mt-10 will-change-transform"
            >
                <div className="relative">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1
                            variants={itemVariants}
                            style={{ y: badgeY }}
                            className="font-display-heavy text-2xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] tracking-tighter sm:tracking-tight leading-[1.2] sm:leading-[1.05] mb-8 text-foreground drop-shadow-2xl will-change-transform max-w-[15ch] sm:max-w-none mx-auto"
                        >
                            Tu marketing <span className="text-foreground/40">no funciona</span>. <br />
                            Nuestra <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-primary text-glow-neon italic">Ingeniería</span> sí.
                        </motion.h1>

                        {/* Subtitle — Neutral Spanish Pass */}
                        <motion.p
                            variants={itemVariants}
                            style={{ y: textY }}
                            className="text-[15px] sm:text-lg md:text-xl text-muted-foreground w-full max-w-[280px] xs:max-w-md sm:max-w-2xl mx-auto mb-10 sm:mb-14 leading-relaxed font-light break-words"
                        >
                            Deja de perseguir leads. Instala un <span className="text-foreground font-medium border-b border-primary/30">Protocolo de Conversión Automatizado</span> que detiene la hemorragia de facturación hoy mismo.
                        </motion.p>

                        {/* CTAs — Fade faster */}
                        <motion.div
                            variants={itemVariants}
                            style={{ y: ctaY, opacity: ctaOpacity }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        >
                            {/* Primary CTA - Glass Neon */}
                            <Button
                                variant="primary"
                                size="lg"
                                glow
                                onClick={handleScrollToScanner}
                                className="group px-10" // Content-width pill
                            >
                                <span className="relative flex items-center justify-center gap-3 font-bold tracking-wide">
                                    INICIAR AUDITORÍA
                                    <PlayCircle className="size-5 text-primary-foreground group-hover:scale-110 transition-transform" />
                                </span>
                            </Button>

                            {/* Secondary CTA - Minimal */}
                            <Button
                                variant="ghost"
                                size="lg"
                                onClick={handleScrollToServicios}
                                className="group flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 px-10" // Content-width pill
                            >
                                <span className="font-medium">Explorar el Sistema</span>
                                <ArrowDown className="size-4 opacity-50 group-hover:translate-y-1 group-hover:opacity-100 group-hover:text-primary transition-all duration-500" />
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Logo Marquee — Slow parallax "sticky" feel */}
                    <motion.div
                        style={{ y: marqueeY, opacity: marqueeOpacity }}
                        className="mt-8 sm:mt-24 w-full"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 1 }}
                        >
                            <LogoMarquee />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator — Fast fade */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1.5 }}
                style={{ opacity: scrollIndicatorOpacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-3"
            >
                <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/40 font-bold">Deslizar</div>
                <div className="h-16 w-[1px] bg-gradient-to-b from-primary/40 to-transparent" />
            </motion.div>
        </section>
    );
}
