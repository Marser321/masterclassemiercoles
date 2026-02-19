"use client";

import { motion } from "framer-motion";
import { GitBranch, MessageSquareDashed, BrainCircuit, ArrowRight } from "lucide-react";
import FloatingIcons from "../ui/FloatingIcons";


// ============================================================
// Servicios — Pillars of Revenue OS
// ============================================================
const SERVICES = [
    {
        icon: GitBranch,
        title: "Pipeline de Conversión",
        description:
            "En 37 días, tu equipo comercial opera con 5 etapas automatizadas. Una acción dominante por etapa. Sin caos, sin micromanagement. El 84% de nuestros clientes duplican su tasa de cierre en el primer trimestre.",
        microdata: "84% tasa de duplicación",
        gradient: "from-[#00f3ff]/20 to-[#38bdf8]/10",
    },
    {
        icon: MessageSquareDashed,
        title: "Sistema Anti-Ghosting",
        description:
            "¿Cuántas propuestas enviaste esta semana que nunca recibieron respuesta? Nuestro sistema ejecuta 5 toques estratégicos por cada lead silencioso. Resultado promedio: recuperamos el 31% de propuestas dadas por perdidas.",
        microdata: "31% recuperación promedio",
        gradient: "from-[#38bdf8]/20 to-white/10",
    },
    {
        icon: BrainCircuit,
        title: "IA Supervisada",
        description:
            "La IA redacta, analiza y prioriza. Vos decidís. Cada modelo está entrenado con tus datos y opera bajo supervisión humana. Automatización sin riesgo reputacional — tu marca siempre tiene la última palabra.",
        microdata: "0% riesgo reputacional",
        gradient: "from-[#00f3ff]/20 to-indigo-500/10",
    },
];

// ============================================================
// Servicios Section — The Operating System
// ============================================================
export default function ServicesSection() {
    return (
        <section id="servicios" className="relative py-24 sm:py-32 px-5 sm:px-6 bg-[#050505]">
            {/* Background Texture - Grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <FloatingIcons type="services" className="z-0 opacity-50" />

            {/* Divisor superior */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 sm:mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-blue mb-4"
                    >
                        El Sistema
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                        className="font-display-heavy text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
                    >
                        <span className="text-white">No es software, es un </span>
                        <span className="text-accent-blue italic">Sistema Operativo</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-muted-foreground max-w-2xl mx-auto text-lg font-light"
                    >
                        ¿Cuánta facturación estás perdiendo por fricción en tu proceso comercial? Estos tres pilares eliminan el cuello de botella. Sin consultores. Sin reuniones semanales.
                    </motion.p>
                </div>

                {/* Grid desktop / Carrusel mobile */}
                <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                            className="group relative p-8 rounded-2xl glass-premium hover:border-accent-blue/30 transition-all duration-500 min-w-[85vw] md:min-w-0 snap-center"
                        >
                            {/* Icon Wrapper */}
                            <div className={`mb-6 p-4 rounded-xl bg-gradient-to-br ${service.gradient} w-fit`}>
                                <service.icon className="size-6 text-accent-blue" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-display font-bold text-white mb-3">
                                {service.title}
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-4">
                                {service.description}
                            </p>

                            {/* Micro-dato de autoridad */}
                            {'microdata' in service && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/5 border border-accent-blue/10">
                                    <div className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                                    <span className="text-[10px] font-mono text-accent-blue/80 uppercase tracking-wider">{service.microdata}</span>
                                </div>
                            )}

                            {/* Micro-interaction */}
                            <div className="absolute bottom-8 right-8 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                <ArrowRight className="size-5 text-accent-blue" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Divisor inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />
        </section>
    );
}
