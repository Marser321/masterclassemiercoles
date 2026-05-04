"use client";

import { useState, useEffect, useRef } from "react";

import dynamic from "next/dynamic";
import FloatingIcons from "../ui/FloatingIcons";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, PlayCircle, Zap } from "lucide-react";
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
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isBooted, setIsBooted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        // Sequence boot-up effect
        const timer = setTimeout(() => setIsBooted(true), 1500);

        return () => {
            window.removeEventListener("resize", checkMobile);
            clearTimeout(timer);
        };
    }, []);
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
            {/* 1. Background Layer: Grain & Grid */}
            <div className="absolute inset-0 z-0 texture-travertine opacity-30 mix-blend-soft-light" />
            <FloatingIcons type="social" className="z-0 opacity-40" />

            {/* 2. Aurora Effects — Disperse on scroll */}
            <motion.div 
                style={{ y: auroraY1, scale: auroraScale, opacity: auroraOpacity }}
                className="orb-glow top-[-10%] right-[-5%] bg-[radial-gradient(circle,_rgba(72,142,255,0.3)_0%,_transparent_70%)] animate-pulse-slow" 
            />
            <motion.div 
                style={{ y: auroraY1, scale: auroraScale, opacity: auroraOpacity }}
                className="orb-glow top-[20%] left-[30%] bg-[radial-gradient(circle,_rgba(72,142,255,0.2)_0%,_transparent_70%)] animate-pulse-slow w-[800px] h-[800px]" 
            />
            <motion.div 
                style={{ y: auroraY2, scale: auroraScale, opacity: auroraOpacity }}
                className="orb-glow bottom-[-10%] left-[-5%] bg-[radial-gradient(circle,_rgba(72,142,255,0.2)_0%,_transparent_70%)] animate-pulse-slow" 
            />

            {/* 3. 3D Core Layer — Scales down + fades on scroll */}
            {mounted && !isMobile && (
                <motion.div 
                    style={{ scale: orbitalScale, opacity: orbitalOpacity }}
                    className="absolute inset-0 z-[2] mix-blend-screen scale-90 sm:scale-100 will-change-transform pointer-events-none"
                >
                    <OrbitalCore />
                    
                    {/* Scanline / Boot-up Overlay */}
                    <AnimatePresence>
                        {!isBooted && (
                            <motion.div 
                                initial={{ top: "-10%" }}
                                animate={{ top: "110%" }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 2, ease: "linear" }}
                                className="absolute left-0 right-0 h-[2px] bg-primary/40 blur-sm z-[3]"
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Mobile Fallback Background */}
            {mounted && isMobile && (
                <div className="absolute inset-0 z-[2] opacity-60 mix-blend-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-primary/10 to-transparent" />
            )}

            {/* 4. Vignette & Lighting */}
            <div
                className="absolute inset-0 z-[3] pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, transparent 30%, #050505 100%)",
                }}
            />

            {/* 5. Content Layer — Multi-speed parallax exit */}
            <motion.div
                style={{
                    opacity: heroOpacity,
                    scale: heroScale,
                }}
                className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto mt-0 sm:mt-10 will-change-transform"
            >
                <div className="relative">
                    {/* Tech Badge — Neutral Spanish Pass */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div 
                            variants={itemVariants} 
                            style={{ y: badgeY }}
                            className="mb-8 flex justify-center"
                        >
                            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-primary/40 bg-primary/5 backdrop-blur-md shadow-lg shadow-primary/5">
                                <Zap className="size-3.5 text-primary fill-primary animate-pulse" />
                                <span className="text-[12px] font-bold tracking-[0.25em] uppercase text-primary text-glow-neon">
                                    Sistema v2.0 en línea
                                </span>
                            </div>
                        </motion.div>

                        {/* H1 Headline — Fast exit */}
                        <motion.h1
                            variants={itemVariants}
                            style={{ y: textY }}
                            className="font-display-heavy text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] tracking-tight leading-[1.1] sm:leading-[1.05] mb-8 text-white drop-shadow-2xl will-change-transform"
                        >
                            Tu marketing <span className="text-white/40">no funciona</span>. <br className="hidden sm:block" />
                            Nuestra <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-primary text-glow-neon italic">Ingeniería</span> sí.
                        </motion.h1>

                        {/* Subtitle — Neutral Spanish Pass */}
                        <motion.p
                            variants={itemVariants}
                            style={{ y: textY }}
                            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 sm:mb-14 leading-relaxed font-light"
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
                                className="group relative px-8 py-6 rounded-full text-lg shadow-2xl shadow-primary/10 hover:shadow-primary/20 border border-primary/40 w-full sm:w-auto"
                            >
                                <span className="relative flex items-center justify-center gap-3 font-bold tracking-wide w-full">
                                    INICIAR AUDITORÍA
                                    <PlayCircle className="size-5 text-primary-foreground group-hover:scale-110 transition-transform" />
                                </span>
                            </Button>

                            {/* Secondary CTA - Minimal */}
                            <Button
                                variant="ghost"
                                size="lg"
                                onClick={handleScrollToServicios}
                                className="group flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 w-full sm:w-auto"
                            >
                                <span className="font-medium">Explorar el Sistema</span>
                                <ArrowDown className="size-4 opacity-50 group-hover:translate-y-1 group-hover:opacity-100 group-hover:text-primary transition-all duration-500" />
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Logo Marquee — Slow parallax "sticky" feel */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        style={{ y: marqueeY, opacity: marqueeOpacity }}
                        className="mt-8 sm:mt-24 w-full"
                    >
                        <LogoMarquee />
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
