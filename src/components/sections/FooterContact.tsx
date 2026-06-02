"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import FloatingIcons from "../ui/FloatingIcons";
import { AuroraBackground } from "../ui/AuroraBackground";
import AuditQuiz from "../ui/AuditQuiz";

export default function FooterContact() {
    const footerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isContentInView = useInView(contentRef, { once: true, margin: "-40px" });


    // Parallax values
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"],
    });

    // Logo sharpens
    const logoBlur = useTransform(scrollYProgress, [0.5, 0.8], [8, 0]);
    
    // Background parallax
    const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

    // Derived transforms for style props
    const footerLogoBlur = useTransform(logoBlur, (v) => `blur(${v}px)`);

    return (
        <footer ref={footerRef} id="contacto" className="relative bg-background pt-10 sm:pt-16 pb-10 px-5 sm:px-6 overflow-hidden">
            {/* Global Aurora Background */}
            <AuroraBackground intensity="medium" className="opacity-40" />

            {/* Iconos flotantes — Social (solo desktop: legibilidad + rendimiento) */}
            <FloatingIcons type="social" className="z-0 hidden md:block opacity-[var(--floating-icon-opacity)]" />

            {/* Background Texture - Grid with Parallax */}
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 pointer-events-none texture-travertine opacity-30 mix-blend-soft-light will-change-transform"
            />
            
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 pointer-events-none will-change-transform"
            >
                <div className="texture-grid" />
            </motion.div>

            {/* Divisor superior suave */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {/* Main content container with gravity slide-up */}
            <motion.div 
                ref={contentRef}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-4xl mx-auto relative z-10 text-center will-change-transform"
            >

                {/* Logo Brand Minimal — Blur to Sharp transition */}
                <motion.div
                    style={{ filter: footerLogoBlur }}
                    whileHover={{ 
                        scale: 1.05,
                        filter: "drop-shadow(0 0 20px rgba(72,142,255,0.4)) blur(0px)" 
                    }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 flex justify-center cursor-pointer will-change-transform"
                >
                    {/* Logo de texto blanco para fondos oscuros; de texto oscuro para el tema blanco */}
                    <Image
                        src="/brand/logo-full-white.png"
                        alt="AD Media Solution"
                        width={180}
                        height={50}
                        className="logo-dark-bg h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <Image
                        src="/brand/logo-full.png"
                        alt="AD Media Solution"
                        width={180}
                        height={50}
                        className="logo-light-bg h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                </motion.div>

                {/* Headline — Neutral Spanish Pass */}
                <div className="mb-12">
                    <h2 className="font-display-heavy text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight">
                        ¿Quieres que tu negocio <span className="text-accent-light italic">facture más</span>?
                    </h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={isContentInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        className="text-lg text-muted-foreground font-light max-w-xl mx-auto"
                    >
                        Agenda una cita gratis y te demostramos cómo ayudarte con CRM, soporte y dirección de marketing. Sin compromiso.
                    </motion.p>
                </div>

                {/* Audit Quiz Interface */}
                <div className="mt-10 sm:mt-16">
                    <AuditQuiz />
                </div>

                {/* Footer Links / Legal — Spanish Pass */}
                <motion.div 
                    data-footer-legal
                    initial={{ opacity: 0 }}
                    animate={isContentInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="mt-16 sm:mt-24 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/60"
                >
                    <p>© 2026 AD Media Solution. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-foreground transition-colors py-2 -my-2 inline-block">Política de Privacidad</a>
                        <a href="#" className="hover:text-foreground transition-colors py-2 -my-2 inline-block">Términos de Servicio</a>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
}
