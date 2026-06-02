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
import GhlLogoBackground from "@/components/ui/GhlLogoBackground";

// ============================================================
// Blueprint Node Data
// ============================================================
// ============================================================
// Blueprint Node Groups
// ============================================================
const SOURCE_NODE = {
    id: "ads",
    title: "Meta & Google Ads",
    desc: "De aquí nacen tus clientes. Pauta en Meta y Google que alimenta tu sistema todos los días. Somos Business Partner de Meta.",
    icon: Zap,
    color: "text-primary"
};

const DESTINATION_NODES = [
    {
        id: "crm",
        title: "Tu CRM",
        desc: "Todos tus clientes y conversaciones en un solo lugar. Visibilidad y control total de tus ventas.",
        icon: Database,
        color: "text-accent-light"
    },
    {
        id: "ia",
        title: "Soporte y seguimiento",
        desc: "Automatizamos el seguimiento y te damos soporte real para cerrar más, sin contratar un ejército.",
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
    const diagramY = useTransform(scrollYProgress, [0, 1], [30, -30]);

    return (
        <section 
            ref={containerRef}
            className="relative py-14 sm:py-32 px-5 sm:px-6 bg-background overflow-hidden"
            id="infraestructura"
        >
            {/* Global Aurora Background */}
            <AuroraBackground intensity="medium" className="opacity-15" />

            {/* 1. Background Schematic Grid */}
            <div className="absolute inset-0 z-0">
                <div className="texture-grid opacity-[0.015]" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            </div>

            {/* Gigantic GHL Background Atmosphere */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] sm:opacity-[0.05] pointer-events-none overflow-hidden">
                <GhlLogoBackground 
                    showGlow={false}
                    className="w-[120%] min-w-[1000px] h-auto scale-110 sm:scale-100"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header Narrative */}
                <div className="text-center mb-10 sm:mb-40 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 mb-8"
                    >
                        <Activity className="size-4 text-primary animate-pulse" />
                        <span className="text-[11px] font-bold font-mono text-primary uppercase tracking-[0.3em]">Cómo trabaja tu sistema</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-display-heavy mb-8 leading-tight"
                    >
                        Todo tu marketing <br />
                        <span className="text-primary italic">en un solo lugar</span>
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed"
                    >
                        Conectamos tus campañas, tus clientes y tu seguimiento en un mismo sistema. Menos caos, <span className="text-foreground font-bold underline decoration-primary/30">más control y más ventas</span> con AD Media CRM.
                    </motion.p>
                </div>

                {/* 2. Interactive Schematic Visual — Robust Reordered Layout */}
                <motion.div 
                    style={{ y: diagramY }}
                    className="relative w-full max-w-4xl mx-auto min-h-0 sm:aspect-square sm:min-h-[1000px] flex flex-col sm:block gap-8 sm:gap-0"
                >
                    
                    {/* Perspective Layer — Only for Connectors and Grid */}
                    <motion.div 
                        style={{ rotateX: rotate, opacity }}
                        className="absolute inset-0 z-0 perspective-[2000px] hidden sm:block"
                    >
                        <svg viewBox="0 0 1000 1000" className="w-full h-full pointer-events-none">
                            <defs>
                                {/* Glow and Neon Gradients */}
                                <linearGradient id="line-glow-top" x1="0%" y1="100%" x2="0%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(72,142,255,0.8)" />
                                    <stop offset="100%" stopColor="rgba(72,142,255,0.1)" />
                                </linearGradient>
                                <linearGradient id="line-glow-left" x1="50%" y1="50%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(72,142,255,0.8)" />
                                    <stop offset="100%" stopColor="rgba(16,208,86,0.1)" />
                                </linearGradient>
                                <linearGradient id="line-glow-right" x1="50%" y1="50%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(72,142,255,0.8)" />
                                    <stop offset="100%" stopColor="rgba(242,183,5,0.1)" />
                                </linearGradient>
                            </defs>
                            
                            {/* Glow Underlayers */}
                            <motion.path d="M 500 480 L 500 56" stroke="url(#line-glow-top)" strokeWidth="6" className="opacity-45 filter blur-[4px]" />
                            <motion.path d="M 500 480 L 200 780" stroke="url(#line-glow-left)" strokeWidth="6" className="opacity-45 filter blur-[4px]" />
                            <motion.path d="M 500 480 L 800 780" stroke="url(#line-glow-right)" strokeWidth="6" className="opacity-45 filter blur-[4px]" />
                            
                            {/* Solid Glowing Core Lines */}
                            <motion.path 
                                d="M 500 480 L 500 56" 
                                stroke="rgba(72,142,255,0.5)" 
                                strokeWidth="2.5" 
                                initial={{ pathLength: 0 }}
                                animate={isInView ? { pathLength: 1 } : {}}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                            <motion.path 
                                d="M 500 480 L 200 780" 
                                stroke="rgba(72,142,255,0.5)" 
                                strokeWidth="2.5" 
                                initial={{ pathLength: 0 }}
                                animate={isInView ? { pathLength: 1 } : {}}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                            <motion.path 
                                d="M 500 480 L 800 780" 
                                stroke="rgba(72,142,255,0.5)" 
                                strokeWidth="2.5" 
                                initial={{ pathLength: 0 }}
                                animate={isInView ? { pathLength: 1 } : {}}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />

                            {/* Animated Data Pulses */}
                            {isInView && [
                                "M 500 56 L 500 480",   // Inward: Ads to CRM
                                "M 500 480 L 200 780",  // Outward: CRM to Destination Left
                                "M 500 480 L 800 780"   // Outward: CRM to Destination Right
                            ].map((path, pIdx) => (
                                [1, 2, 3].map(i => (
                                    <motion.circle 
                                        key={`${pIdx}-${i}`}
                                        r="3.5"
                                        fill={pIdx === 1 ? "#10D056" : pIdx === 2 ? "#F2B705" : "#488EFF"}
                                        initial={{ offsetDistance: "0%" }}
                                        animate={{ offsetDistance: "100%" }}
                                        transition={{ 
                                            duration: 2.8, 
                                            repeat: Infinity, 
                                            delay: (pIdx * 0.8) + (i * 0.9),
                                            ease: "linear"
                                        }}
                                        style={{ 
                                            offsetPath: `path('${path}')`,
                                            filter: pIdx === 1 
                                                ? "blur(1px) drop-shadow(0 0 8px #10D056)" 
                                                : pIdx === 2 
                                                    ? "blur(1px) drop-shadow(0 0 8px #F2B705)" 
                                                    : "blur(1px) drop-shadow(0 0 8px #488EFF)"
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
                        className="sm:absolute sm:top-[5.6%] sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-40 group order-1"
                    >
                        <NodeCard node={SOURCE_NODE} />
                    </motion.div>

                    {/* B. CENTRAL NEXUS */}
                    <div className="sm:absolute sm:top-[48%] sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-30 order-2">
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
                            <div className="relative z-30 flex w-full max-w-[12.5rem] sm:max-w-[15.5rem] items-center justify-center px-3 py-4">
                                <Image 
                                    src="/brand/logo-crm.png" 
                                    alt="AD Media CRM logo" 
                                    width={908} 
                                    height={416} 
                                    className="pointer-events-none h-auto w-full object-contain brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.65)] opacity-100 transition-opacity"
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
                    <div className="flex flex-col sm:block gap-8 sm:gap-0 order-3">
                        {DESTINATION_NODES.map((node, i) => (
                            <motion.div
                                key={node.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + (i * 0.2) }}
                                className={`
                                    sm:absolute sm:top-[78%] z-40 group sm:-translate-y-1/2 sm:-translate-x-1/2
                                    ${i === 0 ? "sm:left-[20%]" : "sm:left-[80%]"}
                                `}
                            >
                                <NodeCard node={node} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div> 

                {/* Footer Insight — Precision Stats */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 sm:mt-48 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center border-t border-primary/10 pt-16"
                >
                    {/* PLACEHOLDER: confirmar métricas reales con el CEO */}
                    {[
                        { label: "Organización", val: "Total", icon: Activity },
                        { label: "Seguimiento", val: "Automático", icon: Share2 },
                        { label: "Tu CRM", val: "A medida", icon: ShieldCheck },
                        { label: "Soporte", val: "Real", icon: Zap }
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
        <div className="glass-premium p-6 sm:p-8 rounded-[2.5rem] border-primary/20 hover:border-primary/50 transition-all duration-700 w-full sm:w-[300px] sm:h-[280px] sm:shadow-2xl relative group-hover:scale-[1.05] bg-background flex flex-col justify-start">
            <div className="absolute top-6 left-6 size-4 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute bottom-6 right-6 size-4 border-b-2 border-r-2 border-primary/60" />
            
            <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className={`p-4 rounded-2xl bg-primary/10 border border-primary/30 ${node.color} group-hover:scale-110 transition-transform duration-500 shadow-inner flex-shrink-0 flex items-center justify-center size-[64px]`}>
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
            <p className="text-[14px] text-foreground font-medium leading-relaxed flex-grow">
                {node.desc}
            </p>
        </div>
    );
}
