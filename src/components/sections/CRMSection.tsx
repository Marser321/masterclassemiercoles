"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { 
    LayoutDashboard, 
    Zap, 
    ShieldCheck, 
    Users, 
    BarChart3, 
    ArrowRight,
    MousePointer2,
    CheckCircle2,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import CRMWorkflow from "../ui/CRMWorkflow";

// ============================================================
// CRM Feature Data
// ============================================================
const CRM_FEATURES = [
    {
        id: "automations",
        icon: Zap,
        label: "Automatización 24/7",
        description: "Flujos de trabajo que cierran ventas mientras duermes. Sin errores humanos.",
        color: "text-accent-blue",
        bg: "bg-accent-blue/10"
    },
    {
        id: "branding",
        icon: ShieldCheck,
        label: "Marca Blanca Premium",
        description: "Tu logo, tus colores, tu dominio. Tecnología de Silicon Valley con tu identidad.",
        color: "text-accent-light",
        bg: "bg-accent-light/10"
    },
    {
        id: "reputation",
        icon: Users,
        label: "Gestión de Reputación",
        description: "Automatización inteligente que solicita y responde reseñas. Domina Google Maps sin esfuerzo.",
        color: "text-accent-warm",
        bg: "bg-accent-warm/10"
    }
];

// ============================================================
// CRM Section — The Engine Room
// ============================================================
export default function CRMSection() {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Parallax & Reveal animations
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const dashboardScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
    const dashboardOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    return (
        <section 
            ref={containerRef} 
            id="crm" 
            className="relative py-10 sm:py-28 px-5 sm:px-6 bg-background overflow-hidden"
        >
            {/* Background Atmosphere */}
            <motion.div 
                style={{ y: backgroundY }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full animate-pulse-slow" style={{ animationDelay: "2s" }} />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-28 items-center">
                
                {/* Left Column: Narrative */}
                <div className="order-2 lg:order-1">
                    <motion.div 
                        ref={titleRef}
                        initial={{ opacity: 0, x: -40 }}
                        animate={isTitleInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-[11px] font-bold font-mono text-primary uppercase tracking-[0.2em]">Infraestructura de Ingresos</span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display-heavy mb-8 leading-[1.1] text-foreground">
                            AD Media <span className="text-primary italic">CRM</span>. <br />
                            Tu Centro de Comando.
                        </h2>

                        <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed mb-12 max-w-xl">
                            No es solo software. Es la <span className="text-foreground font-bold border-b border-primary/30">arquitectura comercial</span> que tu agencia requiere para escalar sin deuda operativa. GoHighLevel potenciado por nuestra ingeniería experta.
                        </p>

                        {/* Feature List */}
                        <div className="space-y-8 mb-14">
                            {CRM_FEATURES.map((feature, i) => (
                                <motion.div 
                                    key={feature.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    className="flex gap-5 group"
                                >
                                    <div className={`mt-1 p-3 rounded-xl bg-primary/5 border border-white/5 group-hover:border-primary/40 transition-all duration-500 shadow-inner`}>
                                        <feature.icon className={`size-6 text-primary`} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-foreground mb-1.5 transition-colors group-hover:text-primary">{feature.label}</h4>
                                        <p className="text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <Button variant="primary" size="lg" glow className="group w-full sm:w-auto">
                                <span className="flex items-center gap-2 font-bold tracking-tight">
                                    SOLICITAR DEMO CRM
                                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Button>
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="size-10 rounded-full border-2 border-background bg-zinc-800 shadow-lg" />
                                    ))}
                                </div>
                                <p className="text-xs text-muted-foreground leading-tight">
                                    <span className="text-foreground font-bold block">+150 Estructuras</span>
                                    Implementadas con éxito
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: High Fidelity Workflow Animation */}
                <motion.div 
                    style={{ scale: dashboardScale, opacity: dashboardOpacity }}
                    className="order-1 lg:order-2 relative aspect-square w-full"
                >
                    <div className="absolute -inset-10 bg-primary/5 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />
                    <CRMWorkflow />
                    
                    {/* Technical Metadata Overlays */}
                    <div className="absolute top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2 rounded-xl bg-background/80 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black">
                        <Activity className="size-3.5 text-primary animate-pulse" />
                        <span className="text-[11px] font-bold font-mono text-primary/80 tracking-[0.25em] uppercase">Centro de comando comercial</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
