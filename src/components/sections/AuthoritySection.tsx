"use client";

import { motion } from "framer-motion";
import FloatingIcons from "../ui/FloatingIcons";
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
    { icon: Target, label: "Meta Ads" },
    { icon: Search, label: "Google Ads" },
    { icon: Workflow, label: "GoHighLevel" },
    { icon: MessageSquare, label: "WhatsApp Business" },
    { icon: Globe, label: "Desarrollo Web" },
    { icon: Camera, label: "Foto & Video" },
    { icon: Code2, label: "CRM & Automatización" },
];

// ============================================================
// Authority Section — Danger Fernandez, Revenue Systems Engineer
// ============================================================
export default function AuthoritySection() {
    return (
        <section className="relative py-24 sm:py-32 px-5 sm:px-6 bg-bg-surface overflow-hidden">

            {/* Iconos flotantes — Analytics */}
            <FloatingIcons type="analytics" className="z-0 opacity-40" />

            {/* Background Texture - Grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">

                {/* Column 1: Visual + Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative order-2 lg:order-1"
                >
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden relative bg-neutral-900 border border-white/5">
                        {/* Placeholder — Foto CEO */}
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex flex-col items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-7xl sm:text-8xl font-display-heavy text-accent-blue/30"
                            >
                                DF
                            </motion.div>
                            <p className="text-xs text-neutral-600 font-mono mt-4 uppercase tracking-[0.3em]">
                                Danger Fernandez
                            </p>
                        </div>

                        {/* Blue Lighting Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-bg-deep via-transparent to-accent-blue/10 mix-blend-overlay" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deep/20 to-bg-deep" />

                        {/* Floating Badge */}
                        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-bg-card/60 border border-white/10 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            "0 0 0px rgba(0,212,230,0)",
                                            "0 0 12px rgba(0,212,230,0.2)",
                                            "0 0 0px rgba(0,212,230,0)",
                                        ]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="size-10 rounded-full bg-accent-blue flex items-center justify-center text-black font-bold font-display text-sm"
                                >
                                    DF
                                </motion.div>
                                <div>
                                    <p className="text-sm font-bold text-text-primary">Danger Fernandez</p>
                                    <p className="text-xs text-accent-blue">Revenue Systems Engineer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Column 2: Copy & Stats */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="order-1 lg:order-2"
                >
                    <motion.p variants={itemVariants} className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-blue mb-4">
                        CEO & Fundador
                    </motion.p>

                    <motion.h2 variants={itemVariants} className="font-display-heavy text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-text-primary">
                        Danger Fernandez.
                        <span className="block text-text-muted font-light mt-2 text-xl sm:text-2xl">Revenue Systems Engineer</span>
                    </motion.h2>

                    {/* Bio extendida */}
                    <motion.div variants={itemVariants} className="space-y-4 text-base sm:text-lg text-text-muted leading-relaxed mb-8">
                        <p>
                            No soy una agencia. Soy un <strong className="text-text-primary">ingeniero de sistemas de ingresos</strong>.
                        </p>
                        <p>
                            Diseñé y escalé +150 campañas de Meta Ads y Google Ads. Construí funnels completos en GoHighLevel. Automaticé CRMs de empresas que facturan 7 cifras. Y filmé el contenido yo mismo.
                        </p>
                    </motion.div>

                    {/* Quote personal */}
                    <motion.blockquote
                        variants={itemVariants}
                        className="border-l-2 border-accent-blue/40 pl-5 mb-10 italic text-text-muted/80"
                    >
                        &ldquo;Si tu agencia actual no puede hacer eso con una sola persona, tenés un equipo — no tenés un sistema.&rdquo;
                    </motion.blockquote>

                    {/* Stats Grid — Ampliado */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/5 pt-8 mb-8">
                        {[
                            { value: "+$10M", label: "Revenue Generado" },
                            { value: "150+", label: "Campañas" },
                            { value: "0%", label: "Churn 2025" },
                            { value: "4+", label: "Años de Exp." },
                        ].map((stat, i) => (
                            <div key={i} className="text-center sm:text-left">
                                <p className="text-2xl sm:text-3xl font-display font-bold text-text-primary">
                                    {stat.value}
                                </p>
                                <p className="text-[10px] text-accent-blue/80 uppercase tracking-wider mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Fila de herramientas */}
                    <motion.div variants={itemVariants}>
                        <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-text-muted/60 mb-3">
                            Stack Operativo
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {TOOLS.map((tool, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.08 }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-text-muted hover:text-accent-blue hover:border-accent-blue/20 transition-all duration-300"
                                >
                                    <tool.icon className="size-3.5" />
                                    {tool.label}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
