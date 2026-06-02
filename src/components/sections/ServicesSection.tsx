"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Database, LifeBuoy, Megaphone, ArrowRight } from "lucide-react";
import { AuroraBackground } from "../ui/AuroraBackground";
import FloatingIcons from "../ui/FloatingIcons";
import Link from "next/link";


// ============================================================
// Servicios — Los 3 pilares de AD Media
// NOTA: los `slug` se mantienen (heredados) para no romper las rutas de
// /servicios/[slug]. Renombrarlos exige actualizar también esa página.
// ============================================================
const SERVICES = [
    {
        icon: Database,
        title: "AD Media CRM",
        slug: "embudos-neurales",
        description:
            "Un CRM personalizado para tu negocio: centraliza a tus clientes, automatiza el seguimiento y agenda citas sin que se te escape ni uno. Tú vendes, el sistema organiza.",
        microdata: "CRM a tu medida",
        gradient: "from-primary/20 to-accent-light/10",
    },
    {
        icon: LifeBuoy,
        title: "Soporte y mantenimiento",
        slug: "ads-autopilot",
        description:
            "No te dejamos solo. Soporte real y mantenimiento continuo de tu sistema, tu web y tus campañas para que todo siga funcionando y vendiendo, mes a mes.",
        microdata: "Soporte real, no bots",
        gradient: "from-accent-light/20 to-white/10",
    },
    {
        icon: Megaphone,
        title: "Dirección de marketing",
        slug: "contenido-generativo",
        description:
            "Te decimos qué hacer y lo ejecutamos: Meta Ads, Google Ads, redes y contenido con una estrategia clara y orientada a resultados. Marketing con dirección, no a ciegas.",
        microdata: "Estrategia + ROI",
        gradient: "from-primary/20 to-primary/10",
    },
];

// ============================================================
// Servicios Section — Revelation Cascade Parallax
// ============================================================
export default function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Parallax layers
    const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
    const headerY = useTransform(scrollYProgress, [0, 0.4], [30, 0]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    // Underline draw animation
    const underlineScale = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

    // Divisor line expansion
    const divisorScale = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

    return (
        <section ref={sectionRef} id="servicios" className="relative py-14 sm:py-32 px-5 sm:px-6 bg-background overflow-hidden">
            {/* Global Aurora Background */}
            <AuroraBackground intensity="medium" className="opacity-40" />

            {/* Background Texture - Grid with parallax */}
            <motion.div
                style={{ y: gridY }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="texture-grid" />
            </motion.div>

            <FloatingIcons type="services" className="z-0 opacity-[var(--floating-icon-opacity)]" />

            {/* Divisor superior — draws from center */}
            <motion.div
                style={{ scaleX: underlineScale, transformOrigin: "center" }}
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header — Parallax slide-up */}
                <motion.div
                    ref={headerRef}
                    style={{ y: headerY, opacity: headerOpacity }}
                    className="text-center mb-16 sm:mb-24"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-[12px] font-bold tracking-[0.25em] uppercase text-primary mb-5"
                    >
                        Lo que hacemos
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display-heavy text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 relative inline-block"
                    >
                        <span className="text-foreground">No vendemos humo, damos </span>
                        <span className="text-primary italic relative">
                            dirección
                            {/* Animated underline that draws on scroll */}
                            <motion.span
                                className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-accent-light"
                                style={{ scaleX: underlineScale, transformOrigin: "left" }}
                            />
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-muted-foreground max-w-2xl mx-auto text-lg sm:text-xl font-light leading-relaxed"
                    >
                        Tres pilares para que tu negocio facture más: un CRM hecho a tu medida, soporte que responde de verdad y dirección de marketing con resultados medibles.
                    </motion.p>
                </motion.div>

                {/* Grid — Cards reveal sequentially via scroll-triggered cascade */}
                <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-10 overflow-x-auto snap-x snap-mandatory pb-8 md:pb-0 -mx-5 px-5 scroll-px-5 md:mx-0 md:px-0 scrollbar-hide">
                    {SERVICES.map((service, index) => (
                        <ServiceCard key={service.title} service={service} index={index} />
                    ))}
                </div>
            </div>

            {/* Divisor inferior — expands from center */}
            <motion.div
                style={{ scaleX: divisorScale, transformOrigin: "center" }}
                className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            />
        </section>
    );
}

// ============================================================
// Service Card — Individual with scroll-linked reveal
// ============================================================
function ServiceCard({
    service,
    index,
}: {
    service: (typeof SERVICES)[0];
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-60px" });

    return (
        <Link 
            href={`/servicios/${service.slug}`}
            className="block h-full min-w-[85vw] md:min-w-0 snap-center no-underline"
        >
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col h-full relative p-10 rounded-3xl glass-premium border border-primary/10 hover:border-primary/40 transition-all duration-700 will-change-transform shadow-2xl shadow-primary/10 cursor-pointer"
            >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                {/* Icon Wrapper */}
                <div className={`mb-8 p-5 rounded-2xl bg-gradient-to-br ${service.gradient} w-fit relative z-10 border border-primary/20 shadow-inner`}>
                    <service.icon className="size-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-bold text-foreground mb-4 relative z-10">
                    {service.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-10 relative z-10 flex-grow">
                    {service.description}
                </p>

                {/* Bottom Row: Badge & Arrow */}
                <div className="flex justify-between items-end relative z-10 mt-auto">
                    {/* Micro-dato de autoridad */}
                    {'microdata' in service && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10"
                        >
                            <motion.div
                                animate={isInView ? {
                                    boxShadow: [
                                        "0 0 0px rgba(72,142,255,0)",
                                        "0 0 10px rgba(72,142,255,0.5)",
                                        "0 0 0px rgba(72,142,255,0)",
                                    ],
                                } : {}}
                                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                                className="h-2 w-2 rounded-full bg-primary"
                            />
                            <span className="text-[11px] font-bold font-mono text-primary/80 uppercase tracking-widest">{service.microdata}</span>
                        </motion.div>
                    )}

                    {/* Micro-interaction */}
                    <div className="opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ml-auto p-2 rounded-full bg-primary/10 border border-primary/20">
                        <ArrowRight className="size-5 text-primary" />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
