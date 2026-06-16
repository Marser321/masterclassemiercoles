"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Sparkles, CloudSun, Calendar } from "lucide-react";
import { VERSIONS, VERSION_IDS, type MasterclassVersionId } from "@/lib/data/masterclassCopy";

type Theme = "luxury" | "classic" | "sky" | "white";
const THEMES: Theme[] = ["luxury", "classic", "sky", "white"];
const FOOTER_LEGAL_SELECTOR = "[data-footer-legal]";

function isTheme(value: string | null): value is Theme {
    return value !== null && THEMES.includes(value as Theme);
}

function applyThemeClass(next: Theme) {
    document.documentElement.classList.remove("theme-classic", "theme-sky", "theme-white");
    if (next === "classic") document.documentElement.classList.add("theme-classic");
    if (next === "sky") document.documentElement.classList.add("theme-sky");
    if (next === "white") document.documentElement.classList.add("theme-white");
}

// ============================================================
// Island Bar — Dock flotante inferior (control del visitante)
// Fila 1: selector público de versión (Resultado / Dolor / Autoridad)
// Fila 2: CTA "Reservar lugar" + cambio de modo de color
// ============================================================
interface IslandBarProps {
    onRegisterClick?: () => void;
    variant: MasterclassVersionId;
    onVariantChange: (v: MasterclassVersionId) => void;
}

export default function IslandBar({ onRegisterClick, variant, onVariantChange }: IslandBarProps) {
    const [isFooterLegalVisible, setIsFooterLegalVisible] = useState(false);
    const [theme, setTheme] = useState<Theme>("classic");

    // Tema guardado (o "classic" por defecto).
    useEffect(() => {
        const savedTheme = localStorage.getItem("vibe-theme") ?? localStorage.getItem("theme");
        const initial: Theme = isTheme(savedTheme) ? savedTheme : "classic";
        applyThemeClass(initial);
        queueMicrotask(() => setTheme(initial));
    }, []);

    // Ocultar el dock cuando el footer legal entra en pantalla.
    useEffect(() => {
        const legalFooter = document.querySelector(FOOTER_LEGAL_SELECTOR);
        if (!legalFooter) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsFooterLegalVisible(entry.isIntersecting),
            { threshold: 0.01 }
        );
        observer.observe(legalFooter);
        return () => observer.disconnect();
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => {
            const next: Theme =
                prev === "luxury" ? "classic" : prev === "classic" ? "sky" : prev === "sky" ? "white" : "luxury";
            applyThemeClass(next);
            localStorage.setItem("vibe-theme", next);
            return next;
        });
    };

    return (
        <motion.nav
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: isFooterLegalVisible ? 140 : 0, opacity: isFooterLegalVisible ? 0 : 1 }}
            transition={{ delay: isFooterLegalVisible ? 0 : 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden={isFooterLegalVisible}
            className={`fixed bottom-4 left-1/2 z-50 hidden w-[calc(100vw-1.5rem)] max-w-md -translate-x-1/2 sm:bottom-6 lg:block ${isFooterLegalVisible ? "pointer-events-none" : ""}`}
        >
            <div className="flex flex-col gap-2 p-2.5 rounded-[26px] glass-premium shadow-2xl border border-primary/15">
                {/* Fila 1 — Selector público de versión */}
                <div className="flex flex-col gap-1.5">
                    <span className="text-center text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
                        Elegí cómo verla
                    </span>
                    <div
                        role="group"
                        aria-label="Elegí la versión del landing"
                        className="grid grid-cols-3 gap-1 p-1 rounded-2xl mc-fill border mc-border"
                    >
                        {VERSION_IDS.map((v) => {
                            const active = variant === v;
                            const angle = VERSIONS[v].angle;
                            return (
                                <button
                                    key={v}
                                    onClick={() => onVariantChange(v)}
                                    aria-pressed={active}
                                    aria-label={`Ver versión: ${angle.name}`}
                                    title={angle.tagline}
                                    className={`py-1.5 px-1 rounded-xl text-[11px] font-bold tracking-tight truncate transition-all cursor-pointer
                                        ${active
                                            ? "bg-primary text-white shadow-[0_4px_14px_rgba(0,102,255,0.35)]"
                                            : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {angle.shortLabel}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Fila 2 — Acción: CTA + cambio de modo de color */}
                <div className="flex items-center gap-2">
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: 1.01 }}
                        onClick={onRegisterClick}
                        className="relative flex-1 flex items-center justify-center gap-2 rounded-2xl h-11 px-4 bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer shadow-[0_4px_15px_rgba(0,102,255,0.3)] transition-colors overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-white/10 opacity-0 pointer-events-none"
                            animate={{ opacity: [0, 0.15, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>Reservar lugar</span>
                    </motion.button>

                    {/* Toggle de modo de color */}
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={toggleTheme}
                        aria-label={`Cambiar modo de color (actual: ${theme})`}
                        title={`Cambiar modo de color (actual: ${theme})`}
                        className={`relative flex items-center justify-center rounded-2xl size-11 shrink-0 border mc-border mc-fill transition-[color] duration-300
                            ${theme === "luxury" ? "text-primary" : "text-foreground/80 hover:text-foreground"}`}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={theme}
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center justify-center"
                            >
                                {theme === "luxury" && <Sparkles className="size-4" />}
                                {theme === "classic" && <Moon className="size-4" />}
                                {theme === "sky" && <CloudSun className="size-4" />}
                                {theme === "white" && <Sun className="size-4" />}
                            </motion.div>
                        </AnimatePresence>

                        {theme === "luxury" && (
                            <motion.span
                                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute top-1 right-1 size-1.5 bg-primary rounded-full shadow-[0_0_6px_rgba(0,102,255,0.8)]"
                            />
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    );
}
