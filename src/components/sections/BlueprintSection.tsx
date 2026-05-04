"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
    Cpu, 
    Share2, 
    Layers, 
    Activity, 
    Database, 
    Bot, 
    Zap,
    Box,
    ShieldCheck
} from "lucide-react";
import { AuroraBackground } from "../ui/AuroraBackground";

// ============================================================
// Blueprint Node Data
// ============================================================
// ============================================================
// Blueprint Node Groups
// ============================================================
const SOURCE_NODE = {
    id: "ads",
    title: "Media Core",
    desc: "Ingeniería de Tráfico de Alta Precisión",
    icon: Zap,
    color: "text-primary"
};

const DESTINATION_NODES = [
    {
        id: "crm",
        title: "CRM Nexus",
        desc: "Sincronización de Leads 1:1",
        icon: Database,
        color: "text-accent-light"
    },
    {
        id: "ia",
        title: "AI Engine",
        desc: "Automatización de Cierre Predictivo",
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

    return (
        <section 
            ref={containerRef}
            className="relative py-20 sm:py-32 px-5 sm:px-6 bg-background overflow-hidden"
            id="infraestructura"
        >
            {/* Global Aurora Background */}
            <AuroraBackground intensity="medium" className="opacity-40" />

            {/* 1. Background Schematic Grid */}
            <div className="absolute inset-0 z-0">
                <div className="texture-grid opacity-[0.03]" />
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
                        Arquitectura de <br />
                        <span className="text-primary italic">Escalamiento</span> Masivo.
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed"
                    >
                        No lanzamos campañas. Diseñamos <span className="text-foreground font-bold underline decoration-primary/30">infraestructuras comerciales</span> integradas donde cada nodo alimenta al siguiente de forma predictiva.
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
                        className="sm:absolute sm:top-0 sm:left-1/2 sm:-translate-x-1/2 z-40 group order-1"
                    >
                        <NodeCard node={SOURCE_NODE} />
                    </motion.div>

                    {/* B. CENTRAL NEXUS */}
                    <div className="sm:absolute sm:top-[45%] sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-30 order-2">
                        <motion.div 
                            animate={isInView ? { 
                                scale: [1, 1.05, 1],
                                boxShadow: ["0 0 30px rgba(72,142,255,0.15)", "0 0 70px rgba(72,142,255,0.35)", "0 0 30px rgba(72,142,255,0.15)"]
                            } : {}}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="size-48 sm:size-64 rounded-[3rem] bg-background border-2 border-primary/40 flex items-center justify-center relative overflow-hidden group shadow-2xl mx-auto"
                        >
                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                            <div className="relative z-10 flex flex-col items-center">
                                <Cpu className="size-16 sm:size-24 text-primary mb-4" />
                                <span className="text-[12px] font-mono font-bold text-primary tracking-[0.4em] uppercase text-center">Revenue<br/>Nexus</span>
                            </div>
                            
                            <motion.div 
                                animate={{ top: ["-10%", "110%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent z-20"
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
                        { label: "Latencia Operativa", val: "< 50ms", icon: Activity },
                        { label: "Sincronización API", val: "Real-Time", icon: Share2 },
                        { label: "Seguridad de Datos", val: "AES-256", icon: ShieldCheck },
                        { label: "Uptime de Sistemas", val: "99.99%", icon: Zap }
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
        <div className="glass-premium p-10 rounded-[2.5rem] border-white/5 hover:border-primary/40 transition-all duration-700 w-full sm:w-80 shadow-2xl relative group-hover:scale-[1.02]">
            <div className="absolute top-6 left-6 size-3 border-t border-l border-primary/40" />
            <div className="absolute bottom-6 right-6 size-3 border-b border-r border-primary/40" />
            
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
            <p className="text-[14px] text-muted-foreground leading-relaxed font-light">
                {node.desc}
            </p>
        </div>
    );
}
