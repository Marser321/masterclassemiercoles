"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Calendar, ChevronUp, CloudSun, Moon, Sparkles, Sun, X } from "lucide-react";
import {
  COPIES,
  VISUALS,
  COPY_IDS,
  VISUAL_IDS,
  type CopyId,
  type VisualId,
} from "@/lib/data/masterclassCopy";

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

interface IslandBarProps {
  onRegisterClick?: () => void;
  copy: CopyId;
  visual: VisualId;
  onCopyChange: (c: CopyId) => void;
  onVisualChange: (v: VisualId) => void;
}

export default function IslandBar({
  onRegisterClick,
  copy,
  visual,
  onCopyChange,
  onVisualChange,
}: IslandBarProps) {
  const [isFooterLegalVisible, setIsFooterLegalVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("classic");
  const reduceMotion = useReducedMotion();
  const label = `${COPIES[copy].angle.shortLabel} · ${VISUALS[visual].shortLabel}`;

  useEffect(() => {
    const savedTheme = localStorage.getItem("vibe-theme") ?? localStorage.getItem("theme");
    const initial: Theme = isTheme(savedTheme) ? savedTheme : "classic";
    applyThemeClass(initial);
    queueMicrotask(() => setTheme(initial));
  }, []);

  useEffect(() => {
    const legalFooter = document.querySelector(FOOTER_LEGAL_SELECTOR);
    if (!legalFooter) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterLegalVisible(entry.isIntersecting);
        if (entry.isIntersecting) setIsMobileOpen(false);
      },
      { threshold: 0.01 },
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

  const register = () => {
    setIsMobileOpen(false);
    onRegisterClick?.();
  };

  const selectors = (size: "mobile" | "compact" | "desktop", closeMobile = false) => (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-col gap-1">
        <span className="text-[8px] font-black uppercase tracking-[0.18em] text-primary/70">Copy</span>
        <OptionSelector
          ariaLabel="Elegir copy"
          options={COPY_IDS.map((id) => ({
            id,
            label: COPIES[id].angle.shortLabel,
            title: COPIES[id].angle.tagline,
          }))}
          active={copy}
          onSelect={(id) => {
            onCopyChange(id as CopyId);
            if (closeMobile) setIsMobileOpen(false);
          }}
          size={size}
          cols={4}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[8px] font-black uppercase tracking-[0.18em] text-muted-foreground/60">
          Diseño
        </span>
        <OptionSelector
          ariaLabel="Elegir modo visual"
          options={VISUAL_IDS.map((id) => ({
            id,
            label: VISUALS[id].shortLabel,
            title: VISUALS[id].description,
          }))}
          active={visual}
          onSelect={(id) => {
            onVisualChange(id as VisualId);
            if (closeMobile) setIsMobileOpen(false);
          }}
          size={size}
          cols={3}
        />
      </div>
    </div>
  );

  const motionProps = reduceMotion
    ? { initial: false, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <motion.nav
      {...motionProps}
      data-island-bar
      aria-label="Controles de vista de masterclass"
      className="fixed left-1/2 z-50 w-[calc(100vw-1rem)] max-w-[34rem] -translate-x-1/2 sm:w-[calc(100vw-1.5rem)] xl:max-w-md"
      style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <MobileTab
        isCollapsed={isFooterLegalVisible}
        isOpen={isMobileOpen}
        label={label}
        onToggle={() => setIsMobileOpen((prev) => !prev)}
      />

      <AnimatePresence>
        {isMobileOpen && !isFooterLegalVisible && (
          <motion.div
            key="mobile-sheet"
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[calc(100%+0.5rem)] left-0 right-0 max-h-[min(68svh,30rem)] overflow-y-auto rounded-[24px] border border-primary/18 bg-background/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl sm:hidden"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-primary/80">Elegir vista</p>
                <p className="text-xs font-semibold text-muted-foreground">Copy y diseño por separado</p>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Cerrar selector"
                className="flex size-9 items-center justify-center rounded-full border mc-border mc-fill text-foreground/80"
              >
                <X className="size-4" />
              </button>
            </div>
            {selectors("mobile", true)}
            <div className="mt-3 grid grid-cols-[minmax(0,1fr)_44px] gap-2">
              <RegisterButton onClick={register} label="Registrarme" />
              <ThemeButton theme={theme} onClick={toggleTheme} reduceMotion={!!reduceMotion} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isFooterLegalVisible && (
        <>
          <div className="hidden flex-col gap-2 rounded-[24px] border border-primary/15 p-2 shadow-2xl glass-premium sm:flex xl:hidden">
            {selectors("compact")}
            <div className="flex items-center gap-2">
              <RegisterButton onClick={register} label="Registrarme" compact />
              <ThemeButton theme={theme} onClick={toggleTheme} reduceMotion={!!reduceMotion} />
            </div>
          </div>

          <div className="hidden flex-col gap-2 rounded-[26px] border border-primary/15 p-2.5 shadow-2xl glass-premium xl:flex">
            <div className="flex flex-col gap-1.5">
              <span className="text-center text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
                Elegir como verla
              </span>
              {selectors("desktop")}
            </div>
            <div className="flex items-center gap-2">
              <RegisterButton onClick={register} label="Registrarme" />
              <ThemeButton theme={theme} onClick={toggleTheme} reduceMotion={!!reduceMotion} />
            </div>
          </div>
        </>
      )}
    </motion.nav>
  );
}

function MobileTab({
  isCollapsed,
  isOpen,
  label,
  onToggle,
}: {
  isCollapsed: boolean;
  isOpen: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className={`${isCollapsed ? "flex" : "flex sm:hidden"} h-12 w-full items-center justify-between gap-3 rounded-full border border-primary/18 px-4 text-left shadow-2xl glass-premium`}
    >
      <span className="min-w-0">
        <span className="block text-[9px] font-black uppercase tracking-[0.16em] text-primary/80">Elegir vista</span>
        <span className="block truncate text-sm font-extrabold text-foreground">{label}</span>
      </span>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
        <ChevronUp className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </span>
    </button>
  );
}

function OptionSelector({
  ariaLabel,
  options,
  active,
  onSelect,
  size,
  cols,
}: {
  ariaLabel: string;
  options: { id: string; label: string; title?: string }[];
  active: string;
  onSelect: (id: string) => void;
  size: "mobile" | "compact" | "desktop";
  cols: 3 | 4;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`grid ${cols === 4 ? "grid-cols-4" : "grid-cols-3"} gap-1 rounded-2xl border mc-border mc-fill p-1`}
    >
      {options.map((o) => {
        const isActive = active === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onSelect(o.id)}
            aria-pressed={isActive}
            title={o.title}
            className={`${size === "mobile" ? "py-2.5" : "py-1.5"} rounded-xl px-1 text-[10px] font-bold tracking-tight transition-all ${
              isActive
                ? "bg-primary text-white shadow-[0_4px_14px_rgba(0,102,255,0.35)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="block truncate">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function RegisterButton({
  onClick,
  label,
  compact = false,
}: {
  onClick: () => void;
  label: string;
  compact?: boolean;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={compact ? undefined : { scale: 1.01 }}
      onClick={onClick}
      className={`${compact ? "h-10 px-3 text-[11px]" : "h-11 px-4 text-xs sm:text-sm"} relative flex min-w-0 flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary font-bold uppercase tracking-wider text-white shadow-[0_4px_15px_rgba(0,102,255,0.3)] transition-colors hover:bg-primary-dark`}
    >
      <Calendar className="size-4 shrink-0" />
      <span className="truncate">{label}</span>
    </motion.button>
  );
}

function ThemeButton({
  theme,
  onClick,
  reduceMotion,
}: {
  theme: Theme;
  onClick: () => void;
  reduceMotion: boolean;
}) {
  return (
    <motion.button
      whileHover={reduceMotion ? undefined : { scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      aria-label={`Cambiar modo de color (actual: ${theme})`}
      title={`Cambiar modo de color (actual: ${theme})`}
      className={`relative flex size-11 shrink-0 items-center justify-center rounded-2xl border mc-border mc-fill transition-[color] duration-300 ${
        theme === "luxury" ? "text-primary" : "text-foreground/80 hover:text-foreground"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={reduceMotion ? false : { opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 90 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {theme === "luxury" && <Sparkles className="size-4" />}
          {theme === "classic" && <Moon className="size-4" />}
          {theme === "sky" && <CloudSun className="size-4" />}
          {theme === "white" && <Sun className="size-4" />}
        </motion.div>
      </AnimatePresence>
      {theme === "luxury" && !reduceMotion && (
        <motion.span
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute right-1 top-1 size-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(0,102,255,0.8)]"
        />
      )}
    </motion.button>
  );
}
