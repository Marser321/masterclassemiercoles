"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Home, PlayCircle, Info, Layers, Globe, FolderOpen, Users, Calendar, Moon, Sun, Sparkles, CloudSun } from "lucide-react";

// ============================================================
// Ítems de navegación
// ============================================================
const NAV_ITEMS = [
    { href: "/", icon: Home, label: "Inicio" },
    { href: "/#vsl-masterclass", icon: PlayCircle, label: "VSL" },
    { href: "/about-us", icon: Info, label: "Nosotros" },
    { href: "/servicios", icon: Layers, label: "Servicios" },
    { href: "/comunidad", icon: Globe, label: "Comunidad" },
    { href: "/casos", icon: FolderOpen, label: "Casos" },
    { href: "/equipo", icon: Users, label: "Equipo" },
    { href: "/planificacion", icon: Calendar, label: "Agenda" },
];

type Theme = "luxury" | "classic" | "sky" | "white";
const THEMES: Theme[] = ["luxury", "classic", "sky", "white"];
const SCROLL_DELTA_THRESHOLD = 18;
const EXPAND_COLLAPSE_COOLDOWN = 420;
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
// Island Bar — Navegación flotante inferior (estilo Dynamic Island)
// ============================================================
export default function IslandBar() {
    const [expanded, setExpanded] = useState(true);
    const [isFooterLegalVisible, setIsFooterLegalVisible] = useState(false);
    const [theme, setTheme] = useState<Theme>("classic");
    const expandedRef = useRef(expanded);
    const lastScrollYRef = useRef(0);
    const lastToggleAtRef = useRef(0);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const savedTheme = localStorage.getItem("vibe-theme") ?? localStorage.getItem("theme");
        if (isTheme(savedTheme)) {
            applyThemeClass(savedTheme);
            queueMicrotask(() => setTheme(savedTheme));
        } else {
            applyThemeClass("classic");
            queueMicrotask(() => setTheme("classic"));
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
            else if (prev === "classic") next = "sky";
            else if (prev === "sky") next = "white";
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

    useEffect(() => {
        const legalFooter = document.querySelector(FOOTER_LEGAL_SELECTOR);
        if (!legalFooter) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFooterLegalVisible(entry.isIntersecting);
            },
            { threshold: 0.01 }
        );

        observer.observe(legalFooter);
        return () => observer.disconnect();
    }, []);

    const handleNavClick = (href: string) => {
        if (href === "/") {
            if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                router.push("/");
            }
            return;
        }

        // Anclas a la home (ej. "/#vsl-masterclass"): scroll suave si ya estamos
        // en home, o navegar a la home dejando que el navegador salte al ancla.
        if (href.startsWith("/#")) {
            const targetId = href.slice(2);
            if (pathname === "/") {
                document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
            } else {
                router.push(href);
            }
            return;
        }

        router.push(href);
    };

    return (
        <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: isFooterLegalVisible ? 96 : 0, opacity: isFooterLegalVisible ? 0 : 1 }}
            transition={{ delay: isFooterLegalVisible ? 0 : 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden={isFooterLegalVisible}
            className={`fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 ${isFooterLegalVisible ? "pointer-events-none" : ""}`}
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
                    hidden sm:flex relative items-center justify-center overflow-hidden transition-[width,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${expanded ? "sm:w-10 opacity-100 sm:mr-1" : "w-0 opacity-0 mr-0"}
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
                     hidden sm:block h-4 w-px bg-primary/20 transition-[width,opacity,margin] duration-500 delay-100
                     ${expanded ? "opacity-100 mr-1" : "opacity-0 mr-0 w-0"}
                `} />

                {NAV_ITEMS.map((item) => {
                    const isActive = item.href === "/"
                        ? pathname === "/"
                        : item.href.startsWith("/#")
                            ? false
                            : pathname?.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <motion.button
                            key={item.href}
                            onClick={() => handleNavClick(item.href)}
                            whileTap={{ scale: 0.9 }}
                            className={`
                relative flex shrink-0 items-center justify-center rounded-full h-9 sm:h-10 py-2
                transition-[width,min-width,padding,color,background-color] duration-300 cursor-pointer transform-gpu
                w-8 px-0
                ${expanded ? "sm:w-auto sm:min-w-10 sm:px-3" : "sm:w-10 sm:px-0"}
                ${isActive
                                    ? "text-primary"
                                    : "nav-link-contrast"
                                }
              `}
                            aria-label={item.label}
                        >
                            {/* Indicador activo — glow detrás */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 rounded-full bg-accent-blue/15 border border-accent-blue/25"
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                />
                            )}

                            <span className="relative z-10 flex size-[18px] shrink-0 items-center justify-center sm:size-5">
                                <Icon className="size-full" />
                            </span>

                            {/* Label — solo visible cuando expanded */}
                            <span
                                className={`
                                    relative z-10 hidden sm:inline-block text-xs sm:text-sm font-medium whitespace-nowrap overflow-hidden
                                    transition-[max-width,opacity,transform,margin] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]
                                    ${expanded ? "ml-2 max-w-24 opacity-100 translate-x-0" : "ml-0 max-w-0 opacity-0 -translate-x-1"}
                                `}
                            >
                                {item.label}
                            </span>
                            
                        </motion.button>
                    );
                })}

                {/* Vertical Divider */}
                <div className={`
                    hidden sm:block h-4 bg-primary/20 transition-[width,opacity,margin] duration-300
                    ${expanded ? "w-px opacity-100 mx-1" : "w-0 opacity-0 mx-0"}
                `} />

                {/* Vibe Toggle Button */}
                <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    className={`
                        relative flex items-center justify-center rounded-full transition-[color,background-color] duration-300 size-8 sm:size-9
                        ${theme === "luxury" ? "text-primary" : "nav-link-contrast"}
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
                            {theme === "sky" && <CloudSun className="size-4 sm:size-5" />}
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
