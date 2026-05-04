"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import FloatingIcons from "../ui/FloatingIcons";
import { AuroraBackground } from "../ui/AuroraBackground";
import {
    Target,
    Search,
    Workflow,
    Globe,
    Camera,
    Code2,
    MessageSquare,
} from "lucide-react";

// ============================================================
// Variants
// ============================================================
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
};

// ============================================================
// Herramientas que domina Danger
// ============================================================
const TOOLS = [
    { icon: Target, label: "Meta Ads", color: "#0668E1" },
    { icon: Search, label: "Google Ads", color: "#4285F4" },
    { icon: Workflow, label: "GoHighLevel", color: "#81E7FF" },
    { icon: MessageSquare, label: "WhatsApp Business", color: "#25D366" },
    { icon: Globe, label: "Desarrollo Web", color: "#488EFF" },
    { icon: Camera, label: "Foto & Video", color: "#f59e0b" },
    { icon: Code2, label: "CRM & Automatización", color: "#8b5cf6" },
];

// ============================================================
// Authority Section — Split Parallax Portrait
// ============================================================
export default function AuthoritySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const quoteRef = useRef<HTMLQuoteElement>(null);
    const isQuoteInView = useInView(quoteRef, { once: true, margin: "-60px" });

    // Mouse tracking for interactive background glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Badge glow intensifies at center
    const badgeGlow = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.3, 0]);

    // Badge glow box shadow transform
    const badgeBoxShadow = useTransform(badgeGlow, (v) =>
        `0 0 ${v * 40}px rgba(72,142,255,${v})`
    );

    // Split parallax — columns enter from opposite sides
    const photoX = useTransform(scrollYProgress, [0, 0.35], [-60, 0]);
    const photoOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
    const photoScale = useTransform(scrollYProgress, [0, 0.35], [0.95, 1]);

    const copyX = useTransform(scrollYProgress, [0, 0.35], [60, 0]);
    const copyOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);

    // Background grid parallax
    const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

    return (
        <section 
            ref={sectionRef} 
            id="nosotros"
            onMouseMove={handleMouseMove}
            className="relative py-20 sm:py-32 px-5 sm:px-6 bg-background overflow-hidden"
        >
            {/* Global Aurora Background */}
            <AuroraBackground intensity="medium" className="opacity-50" />

            {/* Interactive Mouse Glow - Brand Blue Spotlight */}
            <motion.div
                className="absolute pointer-events-none z-0 mix-blend-screen hidden lg:block"
                style={{
                    width: "1000px",
                    height: "1000px",
                    left: smoothX,
                    top: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "radial-gradient(circle, rgba(72,142,255,0.08) 0%, transparent 60%)",
                }}
            />

            {/* Iconos flotantes — Analytics */}
            <FloatingIcons type="analytics" className="z-0 opacity-[var(--floating-icon-opacity)]" />

            {/* Background Texture - Grid with parallax */}
            <motion.div
                style={{ y: gridY }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="texture-grid" />
            </motion.div>

            <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">

                {/* Column 1: Visual + Badge — Slides from LEFT */}
                <motion.div
                    style={{
                        x: photoX,
                        opacity: photoOpacity,
                        scale: photoScale,
                    }}
                    className="relative order-2 lg:order-1 will-change-transform"
                >
                    <div className="aspect-[4/5] rounded-3xl overflow-hidden relative bg-card border border-primary/10 shadow-2xl shadow-primary/5 group">
                        {/* Foto CEO */}
                        <Image
                            src="/team/ceo.png"
                            alt="Danger Fernandez - CEO"
                            fill
                            className="object-cover object-top transition-transform duration-[2s] ease-out group-hover:scale-105"
                            quality={95}
                            priority
                        />

                        {/* Blue Lighting Overlay & Glass Fusion — Refined for White Mode */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/5 via-transparent to-primary/10 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,_rgba(129,231,255,0.15)_0%,_transparent_70%)] pointer-events-none" />

                        {/* Floating Badge — Glow intensifies at viewport center */}
                        <div className="absolute bottom-8 left-8 right-8 p-5 rounded-2xl bg-background/80 border border-primary/10 backdrop-blur-xl">
                            <div className="flex items-center gap-4">
                                <motion.div
                                    style={{
                                        boxShadow: badgeBoxShadow,
                                    }}
                                    className="size-12 rounded-full bg-primary flex items-center justify-center text-white font-bold font-display text-base"
                                >
                                    DF
                                </motion.div>
                                <div>
                                    <p className="text-base font-bold text-foreground">Danger Fernandez</p>
                                    <p className="text-xs text-primary font-mono tracking-tighter uppercase font-medium">Chief Revenue Architect</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Column 2: Copy & Stats — Slides from RIGHT */}
                <motion.div
                    style={{
                        x: copyX,
                        opacity: copyOpacity,
                    }}
                    className="order-1 lg:order-2 will-change-transform"
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.p variants={itemVariants} className="text-[12px] font-bold tracking-[0.25em] uppercase text-primary mb-6">
                            CEO & Fundador
                        </motion.p>

                        <motion.h2 variants={itemVariants} className="font-display-heavy text-3xl sm:text-5xl lg:text-6xl font-bold mb-8 text-foreground">
                            Danger Fernandez.
                            <span className="block text-primary font-mono mt-3 text-sm sm:text-base tracking-[0.35em] uppercase opacity-90">Chief Revenue Architect</span>
                        </motion.h2>

                        {/* Bio extendida — Neutral Spanish Pass */}
                        <motion.div variants={itemVariants} className="space-y-5 text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
                            <p>
                                No soy un consultor de marketing convencional. Soy el <strong className="text-foreground">arquitecto jefe</strong> de tu infraestructura comercial y operativa.
                            </p>
                            <p>
                                Diseño sistemas para compañías que facturan entre 7 y 8 cifras, integrando Meta Ads de alta precisión, ecosistemas CRM a medida y flujos de IA que optimizan la rentabilidad sin depender de equipos humanos masivos.
                            </p>
                        </motion.div>

                        {/* Quote — Bar extends first, then text fades in */}
                        <motion.blockquote
                            ref={quoteRef}
                            variants={itemVariants}
                            className="relative pl-6 mb-12 italic text-muted-foreground/80 overflow-hidden text-lg"
                        >
                            {/* Animated bar */}
                            <motion.div
                                initial={{ height: 0 }}
                                animate={isQuoteInView ? { height: "100%" } : { height: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute left-0 top-0 w-[3px] bg-primary/40"
                            />
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={isQuoteInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                &ldquo;Si tu agencia actual requiere un ejército de personas para operar un sistema que debería ser automático, no tienes una solución; tienes un costo oculto.&rdquo;
                            </motion.span>
                        </motion.blockquote>

                        {/* Stats Grid — Sequential reveal left to right */}
                        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-primary/10 pt-10 mb-10">
                            {[
                                { value: "+$10M", label: "Revenue Generado" },
                                { value: "150+", label: "Estructuras" },
                                { value: "0%", label: "Churn 2025" },
                                { value: "4+", label: "Años de Exp." },
                            ].map((stat, i) => (
                                <StatItem key={i} stat={stat} index={i} sectionProgress={scrollYProgress} />
                            ))}
                        </motion.div>

                        {/* Fila de herramientas — Cascade entry */}
                        <motion.div variants={itemVariants}>
                            <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground/50 mb-6">
                                Stack Operativo & Maestría Técnica
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {TOOLS.map((tool, i) => (
                                    <ToolBadge key={i} tool={tool} index={i} />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}

// ============================================================
// Stat Item — Reveals sequentially left-to-right on scroll
// ============================================================
function StatItem({
    stat,
    index,
    sectionProgress,
}: {
    stat: { value: string; label: string };
    index: number;
    sectionProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const threshold = 0.35 + index * 0.04;
    const opacity = useTransform(sectionProgress, [threshold, threshold + 0.08], [0, 1]);
    const y = useTransform(sectionProgress, [threshold, threshold + 0.1], [20, 0]);

    return (
        <motion.div style={{ opacity, y }} className="text-center sm:text-left">
            <p className="text-2xl sm:text-3xl font-display font-bold text-text-primary">
                {stat.value}
            </p>
            <p className="text-[10px] text-accent-blue/80 uppercase tracking-wider mt-1">{stat.label}</p>
        </motion.div>
    );
}

// ============================================================
// Tool Badge — Cascading entry with micro-rotation
// ============================================================
function ToolBadge({
    tool,
    index,
}: {
    tool: (typeof TOOLS)[0];
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15, rotate: index % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
                y: -2,
                backgroundColor: `${tool.color}15`,
                borderColor: `${tool.color}40`,
                color: tool.color
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-text-muted transition-all duration-300 cursor-default group"
        >
            <tool.icon className="size-4 transition-colors" style={{ color: tool.color }} />
            <span className="group-hover:text-text-primary transition-colors">{tool.label}</span>
        </motion.div>
    );
}
