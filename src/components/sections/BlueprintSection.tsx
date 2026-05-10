"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
    Share2, 
    Activity, 
    Database, 
    Bot, 
    Zap,
    ShieldCheck
} from "lucide-react";
import { AuroraBackground } from "../ui/AuroraBackground";
import Image from "next/image";

// ============================================================
// Blueprint Node Data
// ============================================================
// ============================================================
// Blueprint Node Groups
// ============================================================
const SOURCE_NODE = {
    id: "ads",
    title: "Ads Autopilot",
    desc: "Donde nacen las ganancias. Pauta automatizada que alimenta el sistema 24/7.",
    icon: Zap,
    color: "text-primary"
};

const DESTINATION_NODES = [
    {
        id: "crm",
        title: "Marketing Hub",
        desc: "Concentra todo tu marketing en un solo sitio. Visibilidad total y control absoluto.",
        icon: Database,
        color: "text-accent-light"
    },
    {
        id: "ia",
        title: "Escalamiento IA",
        desc: "Potencia el cierre con IA. Ahorra en sueldos masivos con flujos inteligentes y escalables.",
        icon: Bot,
        color: "text-primary"
    }
];

type BlueprintNode = typeof SOURCE_NODE;

export default function BlueprintSection() {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: false, margin: "-100px" });
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const marketingHubY = useTransform(scrollYProgress, [0, 1], [-20, 60]);
    const aiScaleY = useTransform(scrollYProgress, [0, 1], [-40, 80]);
    const destinationNodeY = [marketingHubY, aiScaleY];

    return (
        <section 
            ref={containerRef}
            className="relative py-20 sm:py-32 px-5 sm:px-6 bg-background overflow-hidden"
            id="infraestructura"
        >
            {/* Global Aurora Background */}
            <AuroraBackground intensity="medium" className="opacity-15" />

            {/* 1. Background Schematic Grid */}
            <div className="absolute inset-0 z-0">
                <div className="texture-grid opacity-[0.015]" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header Narrative */}
                <div className="text-center mb-16 sm:mb-40 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 mb-8"
                    >
                        <Activity className="size-4 text-primary animate-pulse" />
                        <span className="text-[11px] font-bold font-mono text-primary uppercase tracking-[0.3em]">Arquitectura comercial</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-display-heavy mb-8 leading-tight"
                    >
                        Infraestructura de <br />
                        <span className="text-primary italic">Ingresos AD Media</span>
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed"
                    >
                        No solo captamos leads; construimos el motor donde se <span className="text-foreground font-bold underline decoration-primary/30">concentran todas tus ganancias</span>. Un ecosistema AD Media CRM diseñado para escalar eliminando costos operativos innecesarios.
                    </motion.p>
                </div>

                {/* 2. Interactive Schematic Visual — Robust Reordered Layout */}
                <div className="relative w-full max-w-5xl mx-auto min-h-[900px] sm:min-h-[1000px] flex flex-col sm:block gap-12">
                    
                    {/* Perspective Layer — Only for Connectors and Grid */}
                    <motion.div 
                        style={{ rotateX: rotate, opacity }}
                        className="absolute inset-0 z-0 perspective-[2000px] hidden sm:block"
                    >
                        <svg viewBox="0 0 1000 1000" className="w-full h-full pointer-events-none">
                            {/* Source to Nexus */}
                            <motion.path 
                                d="M 500 100 L 500 350" 
                                stroke="rgba(72,142,255,0.4)" 
                                strokeWidth="2" 
                                strokeDasharray="8 8"
                                initial={{ pathLength: 0 }}
                                animate={isInView ? { pathLength: 1 } : {}}
                            />
                            {/* Nexus to Destinations */}
                            <motion.path 
                                d="M 420 550 L 200 850" 
                                stroke="rgba(72,142,255,0.4)" 
                                strokeWidth="2" 
                                strokeDasharray="8 8"
                                initial={{ pathLength: 0 }}
                                animate={isInView ? { pathLength: 1 } : {}}
                            />
                            <motion.path 
                                d="M 580 550 L 800 850" 
                                stroke="rgba(72,142,255,0.4)" 
                                strokeWidth="2" 
                                strokeDasharray="8 8"
                                initial={{ pathLength: 0 }}
                                animate={isInView ? { pathLength: 1 } : {}}
                            />

                            {/* Animated Data Pulses */}
                            {isInView && [
                                "M 500 100 L 500 350",
                                "M 420 550 L 200 850",
                                "M 580 550 L 800 850"
                            ].map((path, pIdx) => (
                                [1, 2, 3].map(i => (
                                    <motion.circle 
                                        key={`${pIdx}-${i}`}
                                        r="3"
                                        fill="#488EFF"
                                        initial={{ offsetDistance: "0%" }}
                                        animate={{ offsetDistance: "100%" }}
                                        transition={{ 
                                            duration: 3, 
                                            repeat: Infinity, 
                                            delay: (pIdx * 0.8) + (i * 1.2),
                                            ease: "linear"
                                        }}
                                        style={{ 
                                            offsetPath: `path('${path}')`,
                                            filter: "blur(1.5px) drop-shadow(0 0 10px #488EFF)"
                                        }}
                                    />
                                ))
                            ))}
                        </svg>
                    </motion.div>

                    {/* Content Layer — Billboarded Nodes */}
                    
                    {/* A. SOURCE NODE (Top) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        style={{ y: useTransform(scrollYProgress, [0, 1], [40, -40]) }}
                        className="sm:absolute sm:top-0 sm:left-1/2 sm:-translate-x-1/2 z-40 group order-1"
                    >
                        <NodeCard node={SOURCE_NODE} />
                    </motion.div>

                    {/* B. CENTRAL NEXUS */}
                    <div className="sm:absolute sm:top-[45%] sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-30 order-2">
                        <motion.div 
                            style={{ 
                                scale: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.9, 1.1, 0.9])
                            }}
                            animate={isInView ? { 
                                boxShadow: ["0 0 30px rgba(72,142,255,0.25)", "0 0 80px rgba(72,142,255,0.55)", "0 0 30px rgba(72,142,255,0.25)"]
                            } : {}}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="size-56 sm:size-72 rounded-[3.5rem] bg-background border-2 border-primary/60 flex items-center justify-center relative overflow-hidden group shadow-[0_0_50px_rgba(0,102,255,0.2)] mx-auto"
                        >
                            <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                            <div className="relative z-30 flex w-full max-w-[11.5rem] sm:max-w-[14.5rem] items-center justify-center rounded-3xl border border-primary/15 bg-white/80 px-5 py-6 shadow-[0_18px_45px_rgba(0,102,255,0.16)] backdrop-blur-md">
                                <Image 
                                    src="/brand/logo-crm.png" 
                                    alt="AD Media CRM logo" 
                                    width={908} 
                                    height={416} 
                                    className="h-auto w-full object-contain opacity-95 transition-opacity group-hover:opacity-100"
                                />
                            </div>
                            
                            <motion.div 
                                animate={{ top: ["-10%", "110%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 z-10 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                            />
                        </motion.div>
                    </div>

                    {/* C. DESTINATION NODES (Bottom) */}
                    <div className="flex flex-col sm:block gap-12 sm:gap-0 order-3">
                        {DESTINATION_NODES.map((node, i) => (
                            <motion.div
                                key={node.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + (i * 0.2) }}
                                style={{ y: destinationNodeY[i] }}
                                className={`
                                    sm:absolute sm:top-[85%] z-40 group
                                    ${i === 0 ? "sm:left-0" : "sm:right-0"}
                                `}
                            >
                                <NodeCard node={node} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer Insight — Precision Stats */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 sm:mt-48 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center border-t border-primary/10 pt-16"
                >
                    {[
                        { label: "Ahorro Operativo", val: "Hasta 40%", icon: Activity },
                        { label: "Conversión IA", val: "+25%", icon: Share2 },
                        { label: "Integración CRM", val: "Total", icon: ShieldCheck },
                        { label: "Escalamiento", val: "Infinito", icon: Zap }
                    ].map((stat, i) => (
                        <div key={i} className="group cursor-default">
                            <p className="text-[11px] font-bold font-mono text-muted-foreground/60 uppercase tracking-[0.25em] mb-3 group-hover:text-primary transition-colors">{stat.label}</p>
                            <p className="text-2xl sm:text-3xl font-display-heavy text-primary italic tracking-tight">{stat.val}</p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Ambient Background Atmosphere */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 size-[600px] bg-primary/5 blur-[180px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 size-[600px] bg-primary/5 blur-[180px] rounded-full pointer-events-none" />
        </section>
    );
}

// ============================================================
// Helper Component: Node Card
// ============================================================
function NodeCard({ node }: { node: BlueprintNode }) {
    return (
        <div className="glass-premium p-10 rounded-[2.5rem] border-primary/20 hover:border-primary/50 transition-all duration-700 w-full sm:w-80 sm:shadow-2xl relative group-hover:scale-[1.05] bg-background">
            <div className="absolute top-6 left-6 size-4 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute bottom-6 right-6 size-4 border-b-2 border-r-2 border-primary/60" />
            
            <div className="flex items-start gap-6 mb-6">
                <div className={`p-4 rounded-2xl bg-primary/10 border border-primary/30 ${node.color} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                    <node.icon className="size-8" />
                </div>
                <div>
                    <h4 className="text-xl font-bold text-foreground tracking-tight mb-2">{node.title}</h4>
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[11px] font-mono text-primary/70 uppercase tracking-widest font-bold">Node_Sync_Active</span>
                    </div>
                </div>
            </div>
            <p className="text-[14px] text-foreground font-medium leading-relaxed">
                {node.desc}
            </p>
        </div>
    );
}
