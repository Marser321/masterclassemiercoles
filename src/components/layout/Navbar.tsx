"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Calendar, Menu, X, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/Button";

// ============================================================
// Navbar flotante con efecto Glass + Scroll Shrink
// ============================================================
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [servicesExpanded, setServicesExpanded] = useState(false);
    const { scrollY } = useScroll();
    const router = useRouter();
    const pathname = usePathname();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const nextScrolled = latest > 50;
        setScrolled(nextScrolled);
        if (nextScrolled) setIsOpen(false);
    });

    const isActiveLink = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname?.startsWith(href);
    };

    const navLinks = [
        { name: "Inicio", href: "/" },
        { name: "Sobre Nosotros", href: "/about-us" },
        {
            name: "Servicios",
            href: "/servicios",
            isDropdown: true,
            subLinks: [
                { name: "CRM & Automatización", href: "/servicios?tab=crm" },
                { name: "Meta & Google Ads", href: "/servicios?tab=marketing-ads" },
                { name: "Redes Sociales", href: "/servicios?tab=social-media" },
                { name: "Desarrollo Web", href: "/servicios?tab=web-development" },
            ]
        },
        { name: "Comunidad", href: "/comunidad" },
        { name: "Casos", href: "/casos" },
        { name: "Equipo", href: "/equipo" },
        { name: "Planificación", href: "/planificacion" },
    ];

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
                            {/* Logo de texto blanco para fondos oscuros (luxury/classic) */}
                            <Image
                                src="/brand/logo-full-white.png"
                                alt="Ad Media Solution"
                                width={180}
                                height={50}
                                className={`logo-dark-bg relative h-auto object-contain transition-all duration-500 ${scrolled ? "w-28 sm:w-36" : "w-32 sm:w-44"}`}
                                priority
                            />
                            {/* Logo de texto oscuro para el tema blanco */}
                            <Image
                                src="/brand/logo-full.png"
                                alt="Ad Media Solution"
                                width={180}
                                height={50}
                                className={`logo-light-bg relative h-auto object-contain transition-all duration-500 ${scrolled ? "w-28 sm:w-36" : "w-32 sm:w-44"}`}
                                priority
                            />
                        </motion.div>
                    </Link>

                    {/* Navegación central (oculta en mobile) */}
                    <div className="hidden lg:flex items-center gap-2 xl:gap-4 flex-wrap justify-center max-w-[75%]">
                        {navLinks.map((item) => {
                            const active = isActiveLink(item.href);
                            if (item.isDropdown && item.subLinks) {
                                return (
                                    <div key={item.name} className="relative group/dropdown py-2">
                                        <Link
                                            href={item.href}
                                            className={`text-[10px] xl:text-[11px] font-semibold flex items-center gap-1 transition-all duration-300 relative group tracking-wider uppercase whitespace-nowrap ${
                                                active ? "nav-link-contrast-active" : "nav-link-contrast"
                                            }`}
                                        >
                                            {item.name}
                                            <ChevronDown className="size-3 transition-transform duration-300 group-hover/dropdown:rotate-180" />
                                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-500 ease-out ${active ? "w-full" : "w-0 group-hover:w-full group-hover:left-0"}`} />
                                        </Link>
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 opacity-0 translate-y-2 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 group-hover/dropdown:pointer-events-auto transition-all duration-300 ease-out z-50">
                                            <div className="glass-premium backdrop-blur-md bg-background/95 border border-primary/20 rounded-2xl p-2.5 shadow-2xl">
                                                {item.subLinks.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        href={sub.href}
                                                        className="nav-dropdown-link block rounded-xl px-4 py-3 text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 xl:text-[11px]"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`text-[10px] xl:text-[11px] font-semibold transition-all duration-300 relative group tracking-wider uppercase whitespace-nowrap py-2 ${
                                        active ? "nav-link-contrast-active" : "nav-link-contrast"
                                    }`}
                                >
                                    {item.name}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-500 ease-out ${active ? "w-full" : "w-0 group-hover:w-full group-hover:left-0"}`} />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Side: CTA + Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="primary"
                            size="sm"
                            glow
                            aurora
                            onClick={() => router.push("/planificacion")}
                            className="px-6 py-2.5 h-11 sm:h-9 text-[11px] sm:text-xs font-bold"
                        >
                            <Calendar className="size-3.5 sm:size-4 text-white" />
                            <span className="hidden sm:inline">Agendar cita</span>
                            <span className="inline sm:hidden">Agendar</span>
                        </Button>

                        {/* Mobile Menu Toggle */}
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="nav-link-contrast z-[70] p-2.5 transition-colors lg:hidden"
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
                        className="fixed inset-0 z-[55] bg-background/95 lg:hidden pt-24 px-5 flex flex-col gap-6"
                    >
                        <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh] py-2">
                            {navLinks.map((item, i) => {
                                const active = isActiveLink(item.href);
                                if (item.isDropdown && item.subLinks) {
                                    return (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex flex-col"
                                        >
                                            <div className="flex items-center justify-between py-1">
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className={`text-lg font-display-heavy tracking-tight ${active ? "nav-link-contrast-active" : "nav-link-contrast"}`}
                                                >
                                                    {item.name}
                                                </Link>
                                                <button
                                                    onClick={() => setServicesExpanded(!servicesExpanded)}
                                                    className="nav-link-contrast p-2"
                                                    aria-label="Expand services"
                                                >
                                                    <ChevronDown className={`size-5 transition-transform duration-300 ${servicesExpanded ? "rotate-180" : ""}`} />
                                                </button>
                                            </div>
                                            <AnimatePresence initial={false}>
                                                {servicesExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden pl-4 flex flex-col gap-2 border-l border-primary/20 mt-1"
                                                    >
                                                        {item.subLinks.map((sub) => (
                                                            <Link
                                                                key={sub.name}
                                                                href={sub.href}
                                                                onClick={() => setIsOpen(false)}
                                                                className="nav-dropdown-link block py-1.5 text-sm font-semibold"
                                                            >
                                                                {sub.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                }

                                return (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`block py-1 text-lg font-display-heavy tracking-tight ${active ? "nav-link-contrast-active" : "nav-link-contrast"}`}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                        
                        <div className="h-px w-full bg-primary/10 my-4" />
                        
                        <div className="text-xs font-mono text-muted-foreground/40 uppercase tracking-[0.2em]">
                            Marketing y ventas con dirección
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
