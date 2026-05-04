"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";
import { Button } from "../ui/Button";

// ============================================================
// Navbar flotante con efecto Glass + Scroll Shrink
// ============================================================
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const nextScrolled = latest > 50;
        setScrolled(nextScrolled);
        if (nextScrolled) setIsOpen(false);
    });

    const navLinks = ["Servicios", "CRM", "Infraestructura", "Portafolio", "Nosotros"];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`
                    flex fixed top-0 left-0 right-0 z-[60]
                    transition-all duration-500 ease-out transform-gpu will-change-[padding,background-color]
                    ${scrolled
                        ? "py-3 glass-premium backdrop-blur-md bg-background/80 border-b border-primary/20 shadow-2xl shadow-primary/10"
                        : "py-5 sm:py-6 bg-transparent border-transparent"
                    }
                `}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between w-full">
                    {/* Logo — Optimized for Mobile */}
                    <Link href="/" className="flex items-center group relative z-[70]">
                        <motion.div
                            animate={scrolled
                                ? { filter: "drop-shadow(0 0 10px rgba(72,142,255,0.3))", scale: 1 }
                                : { filter: "drop-shadow(0 0 15px rgba(72,142,255,0.2))", scale: 1.02 }
                            }
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="transform-gpu"
                        >
                            <Image
                                src="/brand/logo-full-white.png"
                                alt="Ad Media Solution"
                                width={180}
                                height={50}
                                className={`relative h-auto object-contain transition-all duration-500 ${scrolled ? "w-28 sm:w-36" : "w-32 sm:w-44"}`}
                                priority
                            />
                        </motion.div>
                    </Link>

                    {/* Navegación central (oculta en mobile) */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative group tracking-wide"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary group-hover:w-full group-hover:left-0 transition-all duration-500 ease-out" />
                            </a>
                        ))}
                    </div>

                    {/* Right Side: CTA + Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="primary"
                            size="sm"
                            glow
                            aurora
                            onClick={() => {
                                const el = document.getElementById("contacto");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="px-6 py-2.5 text-[11px] sm:text-xs font-bold"
                        >
                            <Sparkles className="size-3.5 sm:size-4 text-white fill-white/20" />
                            <span className="hidden sm:inline">Auditoría Experta</span>
                            <span className="inline sm:hidden">Auditoría</span>
                        </Button>

                        {/* Mobile Menu Toggle */}
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors z-[70]"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-[55] bg-background/95 md:hidden pt-24 px-6 flex flex-col gap-6"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((item, i) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-display-heavy text-foreground/90 hover:text-primary transition-colors tracking-tight"
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>
                        
                        <div className="h-px w-full bg-white/5 my-4" />
                        
                        <div className="text-xs font-mono text-muted-foreground/40 uppercase tracking-[0.2em]">
                            Ingeniería comercial activa
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
