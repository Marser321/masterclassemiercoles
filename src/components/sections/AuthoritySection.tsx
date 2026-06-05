"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
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
    Share2,
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
    { icon: Share2, label: "Redes Sociales", color: "#E1306C" },
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
    const shouldReduceMotion = useReducedMotion();
    const [bioExpanded, setBioExpanded] = useState(false);

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

    // Parallax on scroll (subtle vertical offset)
    const photoY = useTransform(scrollYProgress, [0, 1], [0, -40]);

    // Background grid parallax
    const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

    return (
        <section 
            ref={sectionRef} 
            id="nosotros"
            onMouseMove={handleMouseMove}
            className="relative py-10 sm:py-20 lg:py-24 px-5 sm:px-6 bg-background overflow-hidden"
        >
            {/* Global Aurora Background */}
            <AuroraBackground intensity="medium" className="opacity-15" />

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

            <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">

                {/* Column 1: Visual + Badge — Slides from LEFT */}
                <motion.div
                    style={{
                        y: photoY,
                    }}
                    className="relative order-2 lg:order-1 will-change-transform"
                >
                    <motion.div
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -80, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.1 }}
                    >
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden relative bg-card border border-primary/10 shadow-2xl shadow-primary/5 group">
                            {/* Foto CEO */}
                            <Image
                                src="/team/ceo.png"
                                alt="Danger Fernández - CEO"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover object-top transition-transform duration-[2s] ease-out group-hover:scale-110 contrast-[1.05] brightness-[1.02]"
                                quality={90}
                                priority
                            />

                            {/* Blue Lighting Overlay & Glass Fusion — Refined for White Mode */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/5 via-transparent to-primary/5 pointer-events-none mix-blend-overlay" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,_rgba(129,231,255,0.15)_0%,_transparent_70%)] pointer-events-none" />

                            {/* Floating Badge — Glow intensifies at viewport center */}
                            <div className="absolute bottom-4 left-4 right-4 p-4 sm:bottom-8 sm:left-8 sm:right-8 sm:p-5 rounded-2xl bg-card border border-primary/20 shadow-xl backdrop-blur-md">
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
                                        <p className="text-base font-bold text-foreground">Danger Fernández</p>
                                        <p className="text-xs text-primary font-mono tracking-tighter uppercase font-bold">Fundador · AD Media</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Column 2: Copy & Stats — Slides from RIGHT */}
                <motion.div
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
                    className="order-1 lg:order-2 will-change-transform"
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.p variants={itemVariants} className="text-[12px] font-bold tracking-[0.25em] uppercase text-primary mb-4 sm:mb-5">
                            CEO & Fundador
                        </motion.p>

                        <motion.h1 variants={itemVariants} className="font-display-heavy text-3xl sm:text-5xl lg:text-6xl font-bold mb-5 sm:mb-7 text-text-primary">
                            Danger Fernández.
                            <span className="block text-primary font-mono mt-4 text-sm sm:text-base tracking-[0.25em] sm:tracking-[0.4em] uppercase font-bold">Fundador y director</span>
                        </motion.h1>

                        {/* Bio extendida — Neutral Spanish Pass */}
                        <motion.div variants={itemVariants} className="space-y-4 sm:space-y-5 text-base sm:text-lg lg:text-xl text-foreground leading-relaxed mb-8 font-medium">
                            <p>
                                Mi trayectoria no sigue el camino tradicional de consultor. Comencé hace más de 10 años como ingeniero de software, lo que me dio una base sólida para entender sistemas complejos y lógica de automatización. Sin embargo, pronto comprendí que la tecnología sin dirección comercial no genera impacto; esto me llevó a estudiar a fondo la ciencia del comercio y las ventas.
                            </p>
                            <AnimatePresence initial={false}>
                                {bioExpanded && (
                                    <motion.p
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        Hoy combino ambos mundos: la precisión de la ingeniería y la psicología de la venta. Lidero al equipo técnico y comercial de AD Media para resolver cuellos de botella reales en los embudos de nuestros clientes. No pretendo ser perfecto ni vender fórmulas mágicas; cometo errores, pero me enfoco en la corrección constante, la búsqueda de la mejora continua y el inconformismo constructivo.
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            <button
                                type="button"
                                onClick={() => setBioExpanded((v) => !v)}
                                aria-expanded={bioExpanded}
                                className="text-sm font-bold text-primary uppercase tracking-wider cursor-pointer hover:opacity-80 transition-opacity"
                            >
                                {bioExpanded ? "Leer menos" : "Leer más"}
                            </button>
                        </motion.div>

                        {/* Quote — Bar extends first, then text fades in */}
                        <motion.blockquote
                            ref={quoteRef}
                            variants={itemVariants}
                            className="relative pl-6 mb-8 sm:mb-10 italic text-foreground overflow-hidden text-base sm:text-lg font-semibold"
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

                        {/* Capability Grid — Sequential reveal left to right */}
                        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-primary/10 pt-7 sm:pt-8 mb-8">
                            {[
                                { value: "Software", label: "Base técnica" },
                                { value: "Ventas", label: "Dirección comercial" },
                                { value: "CRM", label: "Sistemas a medida" },
                                { value: "Soporte", label: "Acompañamiento" },
                            ].map((stat, i) => (
                                <StatItem key={i} stat={stat} index={i} />
                            ))}
                        </motion.div>

                        {/* Fila de herramientas — Cascade entry */}
                        <motion.div variants={itemVariants}>
                            <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground/50 mb-6">
                                Lo que dominamos
                            </p>
                            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
                                {TOOLS.map((tool, i) => (
                                    <ToolBadge key={i} tool={tool} index={i} />
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-2">
                            <Link href="/planificacion">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    glow
                                    className="w-full sm:w-auto font-bold tracking-wide text-sm h-14 px-8"
                                >
                                    Agendar Consultoría Directa
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}

// ============================================================
// Stat Item — Reveals sequentially left-to-right on mount
// ============================================================
function StatItem({
    stat,
    index,
}: {
    stat: { value: string; label: string };
    index: number;
}) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                delay: 0.15 + index * 0.1,
                type: "spring",
                stiffness: 80,
                damping: 15,
            }}
            className="text-center sm:text-left"
        >
            <p className="text-2xl sm:text-3xl font-display font-bold text-text-primary">
                {stat.value}
            </p>
            <p className="text-[11px] text-accent-blue/80 uppercase tracking-wider mt-1">{stat.label}</p>
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
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-primary/20 text-xs font-bold text-foreground shadow-sm transition-all duration-300 cursor-default group"
        >
            <tool.icon className="size-4 text-primary transition-colors" />
            <span className="group-hover:text-primary transition-colors">{tool.label}</span>
        </motion.div>
    );
}
