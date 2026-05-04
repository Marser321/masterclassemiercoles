"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Home, Briefcase, Sparkles, MessageCircle, Moon, Sun } from "lucide-react";

// ============================================================
// Ítems de navegación
// ============================================================
const NAV_ITEMS = [
    { id: "hero", icon: Home, label: "Inicio" },
    { id: "servicios", icon: Briefcase, label: "Servicios" },
    { id: "portafolio", icon: Sparkles, label: "Portafolio" },
    { id: "contacto", icon: MessageCircle, label: "Contacto" },
];

type Theme = "luxury" | "classic" | "white";
const THEMES: Theme[] = ["luxury", "classic", "white"];
const SCROLL_DELTA_THRESHOLD = 18;
const EXPAND_COLLAPSE_COOLDOWN = 420;
const NAV_CLICK_LOCK_MS = 900;

function isTheme(value: string | null): value is Theme {
    return value !== null && THEMES.includes(value as Theme);
}

function applyThemeClass(next: Theme) {
    document.documentElement.classList.remove("theme-classic", "theme-white");
    if (next === "classic") document.documentElement.classList.add("theme-classic");
    if (next === "white") document.documentElement.classList.add("theme-white");
}

// ============================================================
// Island Bar — Navegación flotante inferior (estilo Dynamic Island)
// ============================================================
export default function IslandBar() {
    const [expanded, setExpanded] = useState(true);
    const [activeSection, setActiveSection] = useState("hero");
    const [theme, setTheme] = useState<Theme>("luxury");
    const expandedRef = useRef(expanded);
    const lastScrollYRef = useRef(0);
    const lastToggleAtRef = useRef(0);
    const navLockRef = useRef(false);
    const navUnlockTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem("vibe-theme") ?? localStorage.getItem("theme");
        if (isTheme(savedTheme)) {
            applyThemeClass(savedTheme);
            queueMicrotask(() => setTheme(savedTheme));
        }
    }, []);
    const { scrollY } = useScroll();

    const setExpandedStable = (next: boolean) => {
        if (expandedRef.current === next) return;
        expandedRef.current = next;
        setExpanded(next);
    };

    const toggleTheme = () => {
        setTheme(prev => {
            let next: Theme;
            if (prev === "luxury") next = "classic";
            else if (prev === "classic") next = "white";
            else next = "luxury";

            applyThemeClass(next);
            localStorage.setItem("vibe-theme", next);
            return next;
        });
    };

    // Detectar dirección de scroll
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = lastScrollYRef.current;
        const delta = latest - previous;
        if (Math.abs(delta) < SCROLL_DELTA_THRESHOLD) return;

        lastScrollYRef.current = latest;

        const now = performance.now();
        if (now - lastToggleAtRef.current < EXPAND_COLLAPSE_COOLDOWN) return;

        if (delta > 0 && latest > 160) {
            lastToggleAtRef.current = now;
            setExpandedStable(false);
        } else if (delta < 0) {
            lastToggleAtRef.current = now;
            setExpandedStable(true);
        }
    });

    // Detectar sección activa por IntersectionObserver
    useEffect(() => {
        const sections = NAV_ITEMS.map((item) =>
            document.getElementById(item.id)
        ).filter(Boolean) as HTMLElement[];

        const sectionRatios = new Map<string, number>();
        const observer = new IntersectionObserver(
            (entries) => {
                if (navLockRef.current) return;

                for (const entry of entries) {
                    sectionRatios.set(entry.target.id, entry.intersectionRatio);
                }

                const nextActive = [...sectionRatios.entries()]
                    .sort((a, b) => b[1] - a[1])[0];

                if (nextActive && nextActive[1] > 0.08) {
                    setActiveSection((current) => current === nextActive[0] ? current : nextActive[0]);
                }
            },
            { threshold: [0, 0.15, 0.35, 0.55], rootMargin: "-25% 0px -35% 0px" }
        );

        sections.forEach((section) => observer.observe(section));
        return () => {
            observer.disconnect();
            if (navUnlockTimerRef.current) {
                window.clearTimeout(navUnlockTimerRef.current);
            }
        };
    }, []);

    const handleNavClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            navLockRef.current = true;
            setActiveSection(id);
            setExpandedStable(true);
            if (navUnlockTimerRef.current) {
                window.clearTimeout(navUnlockTimerRef.current);
            }
            navUnlockTimerRef.current = window.setTimeout(() => {
                navLockRef.current = false;
            }, NAV_CLICK_LOCK_MS);

            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
            <motion.div
                className={`
          flex items-center justify-center gap-0.5 sm:gap-1
          glass-premium rounded-full transform-gpu
          transition-[padding,border-radius,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          max-w-[calc(100vw-1.5rem)] sm:max-w-none
          ${expanded
                        ? "px-2 py-2 rounded-[1.75rem] sm:px-6 sm:py-3"
                        : "px-2 py-2 rounded-full"
                    }
        `}
            >
                {/* Logo integrado en la isla */}
                <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                    relative flex items-center justify-center overflow-hidden transition-[width,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${expanded ? "w-8 sm:w-10 opacity-100 mr-0.5 sm:mr-1" : "w-0 opacity-0 mr-0"}
                `}>
                    <Image
                        src="/brand/logo-icon.png"
                        alt="Logo"
                        width={28}
                        height={28}
                        className="object-contain drop-shadow-[0_0_6px_rgba(0,212,230,0.25)]"
                    />
                </motion.div>

                {/* Separator */}
                <div className={`
                     h-4 w-px bg-primary/20 transition-[width,opacity,margin] duration-500 delay-100
                     ${expanded ? "opacity-100 mr-1" : "opacity-0 mr-0 w-0"}
                `} />

                {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;
                    const Icon = item.icon;

                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            whileTap={{ scale: 0.9 }}
                            className={`
                relative flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 rounded-full h-9 sm:h-10
                transition-colors duration-300 cursor-pointer transform-gpu
                ${isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                                }
              `}
                        >
                            {/* Indicador activo — glow detrás */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 rounded-full bg-accent-blue/15 border border-accent-blue/25"
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                />
                            )}

                            <Icon className="relative z-10 size-[18px] sm:size-5" />

                            {/* Label — solo visible cuando expanded */}
                            <span
                                className={`
                                    relative z-10 hidden sm:inline-block text-xs sm:text-sm font-medium whitespace-nowrap overflow-hidden
                                    transition-[max-width,opacity,transform,margin] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]
                                    ${expanded ? "max-w-24 opacity-100 translate-x-0" : "max-w-0 opacity-0 -translate-x-1"}
                                `}
                            >
                                {item.label}
                            </span>
                            
                            {/* Mobile Label — Solo el activo para ahorrar espacio */}
                            <span
                                className={`
                                    relative z-10 inline-block sm:hidden text-[10px] font-medium whitespace-nowrap overflow-hidden
                                    transition-[max-width,opacity,transform,margin] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                                    ${isActive ? "max-w-16 opacity-100 translate-x-0 ml-1" : "max-w-0 opacity-0 -translate-x-1 ml-0"}
                                `}
                            >
                                {item.label}
                            </span>
                        </motion.button>
                    );
                })}

                {/* Vertical Divider */}
                <div className={`
                    h-4 bg-white/10 transition-[width,opacity,margin] duration-300
                    ${expanded ? "w-px opacity-100 mx-1" : "w-0 opacity-0 mx-0"}
                `} />

                {/* Vibe Toggle Button */}
                <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    className={`
                        relative flex items-center justify-center rounded-full transition-[color,background-color] duration-300 size-8 sm:size-9
                        ${theme === "luxury" ? "text-primary" : "text-muted-foreground"}
                    `}
                    title={`Switch Vibe (Current: ${theme})`}
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
                            {theme === "luxury" && <Sparkles className="size-4 sm:size-5" />}
                            {theme === "classic" && <Moon className="size-4 sm:size-5" />}
                            {theme === "white" && <Sun className="size-4 sm:size-5" />}
                        </motion.div>
                    </AnimatePresence>
                    
                    {/* Pulsing indicator for Luxury mode */}
                    {theme === "luxury" && (
                        <motion.span 
                            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute top-0 right-0 size-2 bg-primary rounded-full shadow-[0_0_8px_rgba(0,102,255,0.8)]" 
                        />
                    )}
                </motion.button>
            </motion.div>
        </motion.nav>
    );
}
