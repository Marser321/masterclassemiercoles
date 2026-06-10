"use client";

import { useRef } from "react";

import { AuroraBackground } from "../ui/AuroraBackground";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import LogoMarquee from "../ui/LogoMarquee";
import ResponsiveVideoBg from "../ui/ResponsiveVideoBg";

// ============================================================
// Animation Variants — Cinematic & Slow
// ============================================================
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

const titleVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring" as const,
            stiffness: 70,
            damping: 14,
        },
    },
};

const subtitleVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 70,
            damping: 15,
        },
    },
};

const ctaVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring" as const,
            stiffness: 80,
            damping: 14,
        },
    },
};

// ============================================================
// Hero Section — "Revenue OS" with Cinematic Exit Parallax
// ============================================================
export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const router = useRouter();


    // CTA principal → página de agendamiento de cita gratuita
    const handleAgendarCita = () => {
        router.push("/planificacion");
    };

    const handleScrollToVsl = () => {
        const el = document.getElementById("vsl-masterclass");
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

    // Video layer replaces the former 3D core: subtle, brand-led, and cheaper to render.
    const videoY = useTransform(scrollYProgress, [0, 1], [0, -70]);
    const videoScale = useTransform(scrollYProgress, [0, 0.7], [1.06, 0.98]);
    const videoOpacity = useTransform(scrollYProgress, [0, 0.58], [1, 0]);

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
            <AuroraBackground intensity="strong" className="opacity-20 md:opacity-30" />

            {/* 2. Background Texture Overlay */}
            <div className="absolute inset-0 z-[1] texture-travertine opacity-20 mix-blend-soft-light transform-gpu pointer-events-none" />

            {/* 3. Brand Video Layer — replaces 3D canvas, with static fallback for reduced motion */}
            <motion.div
                style={{
                    y: videoY,
                    scale: videoScale,
                    opacity: videoOpacity,
                }}
                className="absolute inset-0 z-[2] will-change-transform pointer-events-none overflow-hidden"
            >
                <ResponsiveVideoBg
                    mobileMp4Src="/videos/dashboard-ambient-mobile-vertical.mp4"
                    mobilePoster="/videos/dashboard-ambient-mobile-vertical-poster.jpg"
                    desktopMp4Src="/hero/ad-media-logo-waves.mp4"
                    desktopPoster="/hero/ad-media-logo-waves-poster.jpg"
                    posterClassName="opacity-[0.45] sm:opacity-[0.55]"
                    videoClassName="opacity-[0.45] sm:opacity-[0.58] md:opacity-[0.64]"
                    mobilePosterClassName="object-[50%_46%]"
                    mobileVideoClassName="object-[50%_46%]"
                    posterPriority
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(2,6,23,0.04),rgba(2,6,23,0.44)_48%,rgba(2,6,23,0.88)_100%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/35 to-background/90" />
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/85 to-transparent" />
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
                className="relative z-10 text-center px-5 sm:px-6 max-w-5xl mx-auto mt-0 sm:mt-10 will-change-transform"
            >
                <div className="relative">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1
                            variants={titleVariants}
                            style={{ y: badgeY }}
                            className="font-display-heavy text-[1.75rem] xs:text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] tracking-tighter sm:tracking-tight leading-[1.2] sm:leading-[1.05] mb-8 text-foreground drop-shadow-2xl will-change-transform max-w-[15ch] sm:max-w-none mx-auto"
                        >
                            Damos <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-primary text-glow-neon italic pl-1 pr-2 box-decoration-clone">dirección de marketing y ventas</span> a los negocios.
                        </motion.h1>

                        {/* Subtitle — Neutral Spanish Pass */}
                        <motion.p
                            variants={subtitleVariants}
                            style={{ y: textY }}
                            className="text-base sm:text-lg md:text-xl text-foreground/90 w-full max-w-[20rem] xs:max-w-md sm:max-w-2xl mx-auto mb-10 sm:mb-14 leading-relaxed font-light break-words"
                        >
                            ¿Tu negocio quiere facturar más de $30,000, $40,000, $50,000 o $100,000 USD al mes? Lo logramos con <span className="text-foreground font-medium border-b border-primary/30">CRM personalizados, soporte y dirección de marketing</span>.
                        </motion.p>

                        {/* CTAs — Fade faster */}
                        <motion.div
                            variants={ctaVariants}
                            style={{ y: ctaY, opacity: ctaOpacity }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        >
                            {/* Primary CTA - Glass Neon */}
                            <Button
                                variant="primary"
                                size="lg"
                                glow
                                onClick={handleAgendarCita}
                                className="group px-10" // Content-width pill
                            >
                                <span className="relative flex items-center justify-center gap-3 font-bold tracking-wide">
                                    AGENDAR CITA GRATIS
                                    <Calendar className="size-5 text-primary-foreground group-hover:scale-110 transition-transform" />
                                </span>
                            </Button>

                            {/* Secondary CTA - Minimal */}
                            <Button
                                variant="ghost"
                                size="lg"
                                onClick={handleScrollToVsl}
                                className="group flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 px-10" // Content-width pill
                            >
                                <span className="font-medium">Ver cómo funciona</span>
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
