"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Rocket, ArrowRight } from "lucide-react";
import FloatingIcons from "../ui/FloatingIcons";
import MetricBurst from "@/components/backgrounds/MetricBurst";
import AnimatedCounter from "../ui/AnimatedCounter";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Lazy load del ecosistema orbital para mejor performance
const TechEcosystemOrbit = dynamic(
    () => import("@/components/animations/TechEcosystemOrbit"),
    { ssr: false }
);

// ============================================================
// Datos de las métricas KPI
// ============================================================
interface KPIData {
    value: number;
    suffix: string;
    prefix: string;
    label: string;
    description: string;
    techLabel: string;
}

/* PLACEHOLDER: validar estas métricas con casos reales antes de publicar. */
const KPIS: KPIData[] = [
    {
        value: 30,
        prefix: "+$",
        suffix: "K",
        label: "Facturación al mes",
        description: "Ayudamos a negocios a superar los $30.000 USD mensuales con un sistema claro.",
        techLabel: "CRM + Dirección de marketing",
    },
    {
        value: 24,
        prefix: "",
        suffix: "/7",
        label: "Seguimiento automático",
        description: "Tu CRM da seguimiento y agenda citas a toda hora, sin que se te escape un cliente.",
        techLabel: "Automatización + CRM",
    },
    {
        value: 100,
        prefix: "",
        suffix: "%",
        label: "Soporte real",
        description: "Te acompañamos de verdad: respondemos, resolvemos y optimizamos mes a mes.",
        techLabel: "Soporte + Mantenimiento",
    },
];


// ============================================================
// Card KPI Individual — Dashboard Loading Effect
// ============================================================
function KPICard({
    kpi,
    index,
    isInView,
    sectionProgress,
}: {
    kpi: KPIData;
    index: number;
    isInView: boolean;
    sectionProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    // Scroll-linked dashboard loading effect
    const threshold = 0.4 + index * 0.06;
    const cardOpacity = useTransform(sectionProgress, [threshold, threshold + 0.1], [0, 1]);
    const cardY = useTransform(sectionProgress, [threshold, threshold + 0.12], [100, 0]); // Increased parallax
    const cardScale = useTransform(sectionProgress, [threshold, threshold + 0.1], [0.9, 1]);

    // Progress bar fill animation
    const barFill = useTransform(sectionProgress, [threshold + 0.05, threshold + 0.18], [0, 1]);

    return (
        <motion.div
            style={{
                opacity: cardOpacity,
                y: cardY,
                scale: cardScale,
            }}
            className="group relative p-6 sm:p-7 lg:p-8 rounded-2xl bg-card/85 border border-primary/35 hover:border-primary/65 transition-all duration-500 overflow-hidden shadow-[0_20px_70px_rgba(0,102,255,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl will-change-transform"
        >
            {/* Glow hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/14 via-primary/6 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

            {/* Loading progress bar */}
            <motion.div
                style={{ scaleX: barFill, transformOrigin: "left" }}
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-blue to-accent-light"
            />

            <div className="relative z-10">
                {/* Contador */}
                <div className="mb-3">
                    <AnimatedCounter
                        value={kpi.value}
                        prefix={kpi.prefix}
                        suffix={kpi.suffix}
                        isInView={isInView}
                    />
                </div>

                {/* Label principal */}
                <p className="text-sm sm:text-base font-extrabold text-foreground uppercase tracking-wider mb-2">
                    {kpi.label}
                </p>

                {/* Descripción */}
                <p className="text-sm sm:text-[15px] text-sky-50/78 leading-relaxed mb-5 font-normal">
                    {kpi.description}
                </p>

                {/* Tech tag */}
                <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-accent-blue/45 to-transparent" />
                    <span className="text-[10px] sm:text-[11px] font-mono text-accent-light/90 uppercase tracking-wider whitespace-nowrap">
                        {kpi.techLabel}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

// ============================================================
// Scrollytelling Section — "Immersive Data Theater"
// ============================================================
export default function ScrollytellingSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(contentRef, { once: true, margin: "-100px" });
    const stepsRef = useRef<HTMLDivElement>(null);
    const isStepsInView = useInView(stepsRef, { once: true, margin: "-40px" });
    const router = useRouter();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Parallax layers
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    // TechEcosystem scale on scroll
    const orbitScale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1.2]); // More scale range
    const orbitOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
    const orbitY = useTransform(scrollYProgress, [0, 1], [40, -40]); // Vertical parallax

    // Underline draw for "ingresos reales"
    const underlineDraw = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

    // Timeline connector line between steps
    const timelineHeight = useTransform(scrollYProgress, [0.25, 0.5], ["0%", "100%"]);

    // CTA gravity drop
    const ctaY = useTransform(scrollYProgress, [0.7, 0.85], [-30, 0]);
    const ctaOpacity = useTransform(scrollYProgress, [0.7, 0.82], [0, 1]);

    return (
        <section
            ref={sectionRef}
            id="estrategia"
            className="relative py-16 sm:py-24 lg:py-28 px-5 sm:px-6 bg-background overflow-hidden"
        >
            {/* Background grid con parallax */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: bgY }}
            >
                <div className="texture-grid" />
            </motion.div>

            {/* Iconos flotantes — solo desktop (legibilidad + rendimiento en móvil) */}
            <FloatingIcons type="crm" className="z-0 hidden md:block opacity-[var(--floating-icon-opacity)]" />

            {/* Fondo narrativo: curva de crecimiento / facturación */}
            <MetricBurst intensity="medium" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(2,6,23,0.12),rgba(2,6,23,0.48)_48%,rgba(2,6,23,0.72)_100%)] pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/72 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />
            
            {/* Divisor superior */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/10 to-transparent" />

            <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/40 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-sky-100 mb-6 backdrop-blur-md shadow-[0_0_28px_rgba(0,102,255,0.18)]"
                    >
                        Resultados que damos
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display-heavy text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.98] sm:leading-[0.95] mb-5 sm:mb-7 text-foreground drop-shadow-[0_8px_38px_rgba(0,0,0,0.4)]"
                    >
                        Te ayudamos a{" "}
                        <span className="text-primary relative inline-block drop-shadow-[0_0_20px_rgba(0,102,255,0.48)]">
                            facturar más
                            {/* Scroll-drawn underline */}
                            <motion.div
                                className="absolute -bottom-1 sm:bottom-1 left-0 w-full h-[3px] sm:h-[4px] bg-gradient-to-r from-primary to-accent-light shadow-[0_2px_18px_rgba(0,102,255,0.58)]"
                                style={{ scaleX: underlineDraw, transformOrigin: "left" }}
                            />
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg sm:text-xl md:text-2xl text-sky-50/78 max-w-3xl mx-auto leading-relaxed font-normal"
                    >
                        CRM, soporte y dirección de marketing trabajando juntos
                        para que tu negocio venda más, mes a mes.
                    </motion.p>
                </div>

                {/* === Layout principal: 2 columnas === */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16">

                    {/* Columna izquierda: Animación orbital — Scale up on scroll */}
                    <motion.div
                        style={{ scale: orbitScale, opacity: orbitOpacity, y: orbitY }}
                        className="order-2 lg:order-1 flex justify-center will-change-transform opacity-95 md:drop-shadow-[0_0_70px_rgba(0,102,255,0.24)]"
                    >
                        <TechEcosystemOrbit />
                    </motion.div>

                    {/* Columna derecha: Descripción + mini-stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="order-1 lg:order-2 space-y-7 sm:space-y-9 rounded-3xl border border-primary/18 bg-background/28 p-6 sm:p-8 shadow-[0_22px_80px_rgba(0,102,255,0.12)] backdrop-blur-sm"
                    >
                        <div className="space-y-5">
                            <h3 className="font-display-heavy text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[0.95] tracking-tight">
                                Cada pieza suma<br />
                                <span className="text-accent-light">a tus ventas.</span>
                            </h3>

                            <p className="text-base sm:text-lg text-sky-50/78 leading-relaxed font-normal max-w-xl">
                                Conectamos tus campañas, tu CRM y tu seguimiento para que nada se pierda
                                y todo apunte a una sola cosa: que vendas más.
                            </p>
                        </div>

                        {/* Mini indicadores de proceso — Timeline connector */}
                        <div ref={stepsRef} className="space-y-4 relative">
                            {/* Vertical timeline connector */}
                            <motion.div
                                style={{ height: timelineHeight }}
                                className="absolute left-[20px] top-[12px] w-[2px] bg-gradient-to-b from-accent-blue/70 to-accent-light/10"
                            />
                            {[
                                { step: "01", text: "Diagnóstico de tu negocio y tus números" },
                                { step: "02", text: "Montamos tu CRM, tu pauta y tu seguimiento" },
                                { step: "03", text: "Soporte y optimización mes a mes" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isStepsInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                                    className="flex items-center gap-4 group relative z-10"
                                >
                                    <span className="text-xs sm:text-sm font-extrabold text-sky-100 font-mono bg-primary/18 border border-primary/45 rounded-lg px-3 py-2 shadow-[0_0_20px_rgba(0,102,255,0.15)] group-hover:bg-primary/25 transition-colors">
                                        {item.step}
                                    </span>
                                    <span className="text-sm sm:text-base text-sky-50/78 group-hover:text-foreground transition-colors">
                                        {item.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* === KPI Cards Grid — Dashboard loading effect === */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-12 sm:mb-16">
                    {KPIS.map((kpi, index) => (
                        <KPICard
                            key={kpi.label}
                            kpi={kpi}
                            index={index}
                            isInView={isInView}
                            sectionProgress={scrollYProgress}
                        />
                    ))}
                </div>

                {/* CTA inferior — Gravity drop */}
                <motion.div
                    style={{ y: ctaY, opacity: ctaOpacity }}
                    className="text-center"
                >
                    <p className="text-sm sm:text-base text-sky-50/72 mb-6 tracking-wide uppercase font-semibold">
                        ¿Listo para vender más?
                    </p>
                    <Button
                        variant="primary"
                        size="lg"
                        glow
                        aurora
                        onClick={() => router.push("/planificacion")}
                        className="group h-14 px-10"
                    >
                        <Rocket className="size-5" />
                        Agendar cita gratis
                        <ArrowRight className="size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
