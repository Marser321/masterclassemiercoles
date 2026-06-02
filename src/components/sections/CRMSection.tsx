"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
    Zap, 
    ShieldCheck, 
    Users, 
    ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import CRMWorkflow from "../ui/CRMWorkflow";
import GhlLogoBackground from "@/components/ui/GhlLogoBackground";

// ============================================================
// CRM Feature Data
// ============================================================
const CRM_FEATURES = [
    {
        id: "automations",
        icon: Zap,
        label: "Automatización 24/7",
        description: "Tu CRM da seguimiento y agenda citas solo, de día y de noche. Cero clientes perdidos.",
        color: "text-accent-blue",
        bg: "bg-accent-blue/10"
    },
    {
        id: "branding",
        icon: ShieldCheck,
        label: "Tu marca, tu sistema",
        description: "Tu logo, tus colores, tu dominio. El sistema es tuyo y de tu negocio, no de un tercero.",
        color: "text-accent-light",
        bg: "bg-accent-light/10"
    },
    {
        id: "reputation",
        icon: Users,
        label: "Gestión de reseñas",
        description: "Pedimos y gestionamos las reseñas de tus clientes para que destaques en Google sin esfuerzo.",
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
    const router = useRouter();

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
            className="relative pt-16 sm:pt-32 lg:pt-48 pb-10 sm:pb-28 px-5 sm:px-6 bg-background overflow-hidden"
        >
            {/* Background Atmosphere */}
            <motion.div 
                style={{ y: backgroundY }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <div className="hidden sm:block absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full animate-pulse-slow" />
                <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full animate-pulse-slow" style={{ animationDelay: "2s" }} />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-28 items-center">
                
                {/* Left Column: Narrative */}
                <div className="relative">
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
                            <span className="text-[11px] font-bold font-mono text-primary uppercase tracking-[0.2em]">CRM personalizados</span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display-heavy mb-8 leading-[1.1] text-foreground">
                            AD Media <span className="text-primary italic">CRM</span>. <br />
                            Hecho a la medida de tu negocio.
                        </h2>

                        <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed mb-12 max-w-xl">
                            No es un CRM genérico. Es <span className="text-foreground font-bold border-b border-primary/30">tu sistema de ventas</span>: tus clientes, su seguimiento y tus citas en un solo lugar, con soporte que de verdad responde.
                        </p>

                        {/* Feature List */}
                        <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-14">
                            {CRM_FEATURES.map((feature, i) => (
                                <motion.div 
                                    key={feature.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    className="flex gap-5 group"
                                >
                                    <div className={`mt-1 p-3 rounded-xl bg-primary/5 border border-border group-hover:border-primary/40 transition-all duration-500 shadow-inner`}>
                                        <feature.icon className={`size-6 text-primary`} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-foreground mb-1.5 transition-colors group-hover:text-primary">{feature.label}</h4>
                                        <p className="text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                            <Button variant="primary" size="lg" glow onClick={() => router.push("/planificacion")} className="group w-full sm:w-auto">
                                <span className="flex items-center gap-2 font-bold tracking-tight">
                                    AGENDAR DEMO GRATIS
                                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Button>
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="size-10 rounded-full border-2 border-background bg-zinc-800 shadow-lg" />
                                    ))}
                                </div>
                                {/* PLACEHOLDER: confirmar número real de CRMs implementados */}
                                <p className="text-xs text-muted-foreground leading-tight">
                                    <span className="text-foreground font-bold block">+150 negocios</span>
                                    con su CRM funcionando
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: High Fidelity Workflow Animation */}
                <motion.div 
                    style={{ scale: dashboardScale, opacity: dashboardOpacity }}
                    className="relative w-full max-w-[320px] xs:max-w-[370px] sm:max-w-[450px] lg:max-w-[500px] xl:max-w-[540px] mx-auto mt-16 sm:mt-24 lg:mt-0"
                >
                    <div className="absolute -inset-10 bg-primary/5 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />
                    
                    {/* Inner wrapper with responsive padding-top to reserve space for the GHL logo and prevent clipping */}
                    <div className="relative pt-[45%] sm:pt-[54%] lg:pt-[60%] w-full">
                        {/* GHL Logo Crown: integrated as the "roof" of the CRM workflow card */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[72%] sm:w-[80%] lg:w-[85%] pointer-events-none">
                            <GhlLogoBackground 
                                showGlow={false}
                                className="w-full h-auto opacity-100 drop-shadow-[0_0_20px_rgba(31,136,229,0.5)] drop-shadow-[0_0_8px_rgba(16,208,86,0.3)]"
                            />
                        </div>
                        
                        {/* The CRM Workflow card */}
                        <div className="w-full aspect-square">
                            <CRMWorkflow />
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
