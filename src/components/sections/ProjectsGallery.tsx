"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import FloatingIcons from "../ui/FloatingIcons";
import {
    Palette,
    Share2,
    Zap,
    ShoppingBag,
    Wand2,
    GitBranch,
    ArrowUpRight,
    TrendingUp,
} from "lucide-react";
import Image from "next/image";

// ============================================================
// Datos de proyectos ficticios
// ============================================================
const PROJECTS = [
    {
        title: "Nova Estética",
        category: "Branding",
        description:
            "Rediseño completo de identidad visual para cadena premium de estética. Logotipo, paleta cromática y sistema de diseño.",
        metrics: { label: "Brand Recall", value: "+340%" },
        icon: Palette,
        gradient: "from-[#007AFF] via-[#00D4FF] to-[#0EA5E9]",
        bgGradient:
            "radial-gradient(ellipse at 30% 20%, rgba(0,122,255,0.15) 0%, rgba(0,212,255,0.05) 50%, transparent 70%)",
        size: "large",
    },
    {
        title: "FitPulse App",
        category: "Social Media",
        description:
            "Estrategia integral de contenido para app fitness: 120 piezas mensuales optimizadas por IA con engagement orgánico récord.",
        metrics: { label: "Engagement", value: "+580%" },
        icon: Share2,
        gradient: "from-[#8B5CF6] via-[#A855F7] to-[#D946EF]",
        bgGradient:
            "radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.15) 0%, rgba(168,85,247,0.05) 50%, transparent 70%)",
        size: "medium",
    },
    {
        title: "TechVault",
        category: "Performance Ads",
        description:
            "Campañas de Google Ads y Meta Ads con optimización automática. ROAS sostenido 6.2x durante 8 meses consecutivos.",
        metrics: { label: "ROAS", value: "6.2x" },
        icon: Zap,
        gradient: "from-[#F59E0B] via-[#F97316] to-[#EF4444]",
        bgGradient:
            "radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.12) 0%, rgba(249,115,22,0.04) 50%, transparent 70%)",
        size: "medium",
    },
    {
        title: "Moda Urbana Store",
        category: "E-commerce",
        description:
            "Tienda online con embudo de conversión inteligente. De 0 a $85K USD en ventas mensuales en 6 meses de operación.",
        metrics: { label: "Ventas/Mes", value: "$85K" },
        icon: ShoppingBag,
        gradient: "from-[#10B981] via-[#34D399] to-[#6EE7B7]",
        bgGradient:
            "radial-gradient(ellipse at 40% 60%, rgba(16,185,129,0.12) 0%, rgba(52,211,153,0.04) 50%, transparent 70%)",
        size: "medium",
    },
    {
        title: "Sabor Artesanal",
        category: "Content Engine",
        description:
            "Producción masiva de contenido estratégico para restaurante gourmet: fotografía, copy y reels de alto impacto.",
        metrics: { label: "Contenido/Mes", value: "200+" },
        icon: Wand2,
        gradient: "from-[#EC4899] via-[#F472B6] to-[#FB7185]",
        bgGradient:
            "radial-gradient(ellipse at 60% 40%, rgba(236,72,153,0.12) 0%, rgba(244,114,182,0.04) 50%, transparent 70%)",
        size: "medium",
    },
    {
        title: "Inmobiliaria Apex",
        category: "Funnels",
        description:
            "Embudo de captación de leads inmobiliarios automatizado. 3.200 leads calificados al mes con un CPA reducido 67%.",
        metrics: { label: "Leads/Mes", value: "3.2K" },
        icon: GitBranch,
        gradient: "from-[#06B6D4] via-[#22D3EE] to-[#67E8F9]",
        bgGradient:
            "radial-gradient(ellipse at 30% 70%, rgba(6,182,212,0.15) 0%, rgba(34,211,238,0.05) 50%, transparent 70%)",
        size: "large",
    },
];

// Diagonal cascade order for bento grid reveal (top-left to bottom-right)
const BENTO_REVEAL_ORDER = [0, 1, 3, 2, 4, 5];

// ============================================================
// Tarjeta de Proyecto Individual — Cinematic Slot Reveal
// ============================================================
function ProjectCard({
    project,
    index,
    revealIndex,
    sectionProgress,
}: {
    project: (typeof PROJECTS)[0];
    index: number;
    revealIndex: number;
    sectionProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const Icon = project.icon;

    // Scroll-linked slot machine reveal — staggered by diagonal position
    const threshold = 0.12 + revealIndex * 0.05;
    const cardY = useTransform(sectionProgress, [threshold, threshold + 0.12], [70, 0]);
    const cardOpacity = useTransform(sectionProgress, [threshold, threshold + 0.1], [0, 1]);
    const cardScale = useTransform(sectionProgress, [threshold, threshold + 0.12], [0.9, 1]);

    // Internal gradient parallax
    const gradientScale = useTransform(sectionProgress, [threshold, threshold + 0.3], [1, 1.15]);

    return (
        <motion.div
            ref={ref}
            style={{
                y: cardY,
                opacity: cardOpacity,
                scale: cardScale,
            }}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer will-change-transform
                ${project.size === "large"
                    ? "md:col-span-2 md:row-span-2 min-h-[320px] md:min-h-[420px]"
                    : "min-h-[280px] md:min-h-[320px]"
                }
                min-w-[300px] md:min-w-0 snap-center
            `}
        >
            {/* Fondo con gradiente dinámico — Internal parallax */}
            <motion.div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                style={{ background: project.bgGradient, scale: gradientScale }}
            />

            {/* Capa de contraste para legibilidad */}
            <div className="absolute inset-0 bg-bg-deep/60 backdrop-blur-[2px]" />

            {/* Borde glass */}
            <div className="absolute inset-0 rounded-2xl border border-white/[0.06] group-hover:border-white/[0.12] transition-colors duration-500" />

            {/* Mesh pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                }}
            />

            {/* Contenido principal */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8">
                {/* Header: categoría + icono */}
                <div className="flex items-start justify-between">
                    <div>
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.15em] uppercase bg-black/30 border border-white/[0.08] backdrop-blur-sm bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                        >
                            {project.category}
                        </span>
                    </div>

                    <motion.div
                        whileHover={{ rotate: 45 }}
                        className="p-2 rounded-full bg-white/[0.04] border border-white/[0.06] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0"
                    >
                        <ArrowUpRight className="size-4 text-white" />
                    </motion.div>
                </div>

                {/* Icono decorativo central (solo en cards grandes) */}
                {project.size === "large" && (
                    <div className="flex-1 flex items-center justify-center my-6">
                        <motion.div
                            animate={isInView ? { rotate: [0, 5, -5, 0] } : {}}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                repeatDelay: 2,
                            }}
                            className={`p-6 rounded-3xl bg-gradient-to-br ${project.gradient} shadow-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`}
                        >
                            <Icon className="size-16 text-white" />
                        </motion.div>
                    </div>
                )}

                {/* Footer: título + descripción + métrica */}
                <div className="mt-auto">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-glow transition-all duration-500">
                        {project.title}
                    </h3>

                    <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                        {project.description}
                    </p>

                    {/* Métrica destacada */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={
                            isInView
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: -10 }
                        }
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center gap-3"
                    >
                        <div
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]`}
                        >
                            <TrendingUp
                                className={`size-3.5 bg-gradient-to-r ${project.gradient} bg-clip-text`}
                                style={{ color: "inherit" }}
                            />
                            <span
                                className={`text-lg font-display font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                            >
                                {project.metrics.value}
                            </span>
                        </div>
                        <span className="text-xs text-slate-500 uppercase tracking-wider">
                            {project.metrics.label}
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* Hover glow border effect */}
            <div
                className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none`}
            />
        </motion.div>
    );
}

// ============================================================
// Galería de Proyectos — Cinematic Bento Reveal
// ============================================================
export default function ProjectsGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Multi-direction background parallax for 3D depth
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);

    // CTA glow pulse
    const ctaGlow = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 0.3, 0.15]);

    // Header parallax
    const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

    return (
        <section
            ref={sectionRef}
            id="portafolio"
            className="relative py-10 sm:py-24 px-5 sm:px-6 overflow-hidden bg-background"
        >
            {/* Iconos flotantes — Creativos */}
            <FloatingIcons type="creative" className="z-0 opacity-30" />

            {/* Fondo parallax con mesh gradients — X + Y parallax */}
            <motion.div
                style={{ y: bgY, x: bgX }}
                className="absolute inset-0 pointer-events-none will-change-transform"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 50% 50% at 20% 20%, rgba(0,122,255,0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 80% 80%, rgba(139,92,246,0.05) 0%, transparent 60%), radial-gradient(ellipse 30% 30% at 60% 40%, rgba(6,182,212,0.03) 0%, transparent 50%)",
                    }}
                />
            </motion.div>

            {/* Divisor superior */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header de la sección — Parallax slide-up */}
                <motion.div
                    style={{ y: headerY, opacity: headerOpacity }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/5 border border-accent-blue/10 text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-blue mb-6"
                    >
                        <Image
                            src="/brand/logo-icon.png"
                            alt="Ad Media Solution"
                            width={16}
                            height={16}
                            className="size-4 object-contain"
                        />
                        Nuestro Portfolio
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.7,
                            delay: 0.1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="font-display-heavy text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                    >
                        <span className="text-text-primary">Proyectos que </span>
                        <span className="bg-gradient-to-r from-accent-blue via-accent-light to-white bg-clip-text text-transparent italic">
                            generan impacto
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed"
                        style={{ fontFamily: "var(--font-display-light)" }}
                    >
                        digital con nuestra combinación de estrategia experta y
                        humanismo tecnológico.
                    </motion.p>
                </motion.div>

                {/* Bento Grid Desktop — Diagonal cascade reveal */}
                <div className="hidden md:grid md:grid-cols-4 md:grid-rows-3 gap-4 lg:gap-5">
                    {/* Card 0 — Grande (2x2) — Enters first */}
                    <div className="col-span-2 row-span-2">
                        <ProjectCard project={PROJECTS[0]} index={0} revealIndex={0} sectionProgress={scrollYProgress} />
                    </div>
                    {/* Card 1 — Normal */}
                    <div className="col-span-1 row-span-1">
                        <ProjectCard project={PROJECTS[1]} index={1} revealIndex={1} sectionProgress={scrollYProgress} />
                    </div>
                    {/* Card 2 — Normal */}
                    <div className="col-span-1 row-span-1">
                        <ProjectCard project={PROJECTS[2]} index={2} revealIndex={3} sectionProgress={scrollYProgress} />
                    </div>
                    {/* Card 3 — Normal */}
                    <div className="col-span-1 row-span-1">
                        <ProjectCard project={PROJECTS[3]} index={3} revealIndex={2} sectionProgress={scrollYProgress} />
                    </div>
                    {/* Card 4 — Normal */}
                    <div className="col-span-1 row-span-1">
                        <ProjectCard project={PROJECTS[4]} index={4} revealIndex={4} sectionProgress={scrollYProgress} />
                    </div>
                    {/* Card 5 — Grande (2x1 ancho) */}
                    <div className="col-span-2 row-span-1">
                        <ProjectCard project={PROJECTS[5]} index={5} revealIndex={5} sectionProgress={scrollYProgress} />
                    </div>
                    {/* Card extra visual — CTA with pulsating glow */}
                    <div className="col-span-2 row-span-1 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="text-center p-8 relative"
                        >
                            {/* Pulsating glow behind CTA */}
                            <motion.div
                                style={{ opacity: ctaGlow }}
                                className="absolute inset-0 rounded-3xl bg-accent-blue/10 blur-2xl pointer-events-none"
                            />
                            <p className="text-sm text-text-muted mb-4 tracking-wide uppercase relative z-10">
                                ¿Tu marca es la siguiente?
                            </p>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.03 }}
                                onClick={() => {
                                    document
                                        .getElementById("contacto")
                                        ?.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                }}
                                className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold text-white bg-gradient-to-r from-accent-blue to-accent-light hover:opacity-90 transition-all duration-300 cursor-pointer shadow-md shadow-accent-blue/10 z-10"
                            >
                                <span className="absolute inset-0 rounded-full bg-accent-blue/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative flex items-center gap-2.5">
                                    <Zap className="size-5 text-white" />
                                    Empezar Ahora
                                </span>
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                {/* Carrusel Mobile (snap-scroll horizontal) */}
                <div className="md:hidden">
                    <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 -mx-5 px-5 scroll-px-5 pb-4">
                        {PROJECTS.map((project, index) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                index={index}
                                revealIndex={index}
                                sectionProgress={scrollYProgress}
                            />
                        ))}
                    </div>

                    {/* Dots indicador mobile */}
                    <div className="flex justify-center gap-1.5 mt-6">
                        {PROJECTS.map((_, i) => (
                            <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === 0 ? "bg-accent-blue" : "bg-white/15"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* CTA mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-10"
                    >
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                document
                                    .getElementById("contacto")
                                    ?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold text-white bg-gradient-to-r from-accent-blue to-accent-light transition-all duration-300 shadow-md shadow-accent-blue/10"
                        >
                            <span className="relative flex items-center gap-2.5">
                                <Zap className="size-5 text-white" />
                                Empezar Ahora
                            </span>
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Divisor inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        </section>
    );
}
