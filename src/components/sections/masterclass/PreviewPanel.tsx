"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Check, LayoutGrid, Palette, Link2, Star, Type } from "lucide-react";
import {
  COPIES,
  VISUALS,
  COPY_IDS,
  VISUAL_IDS,
  ACTIVE_COPY,
  ACTIVE_VISUAL,
  type CopyId,
  type VisualId,
} from "@/lib/data/masterclassCopy";

type Theme = "luxury" | "classic" | "sky" | "white";

interface PreviewPanelProps {
  currentCopy: CopyId;
  currentVisual: VisualId;
  onCopyChange: (c: CopyId) => void;
  onVisualChange: (v: VisualId) => void;
}

const THEMES: Theme[] = ["luxury", "classic", "sky", "white"];

export default function PreviewPanel({
  currentCopy,
  currentVisual,
  onCopyChange,
  onVisualChange,
}: PreviewPanelProps) {
  // El panel es una herramienta interna del equipo: oculto para los visitantes.
  // Se habilita con ?panel=1 en la URL o con el atajo Shift+P (persiste en localStorage).
  const [enabled, setEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<Theme>("luxury");
  const [copied, setCopied] = useState(false);

  // Habilitación + atajo de teclado.
  useEffect(() => {
    const applyEnabled = () => {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get("panel");
      let on = localStorage.getItem("mc-panel") === "1";
      if (fromUrl === "1") on = true;
      if (fromUrl === "0") on = false;
      localStorage.setItem("mc-panel", on ? "1" : "0");
      setEnabled(on);
      if (on) setIsOpen(true);
    };
    applyEnabled();

    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === "P" || e.key === "p")) {
        setEnabled((prev) => {
          const next = !prev;
          localStorage.setItem("mc-panel", next ? "1" : "0");
          if (next) setIsOpen(true);
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Leer el tema actual del <html>.
  useEffect(() => {
    const checkTheme = () => {
      const cl = document.documentElement.classList;
      if (cl.contains("theme-classic")) setActiveTheme("classic");
      else if (cl.contains("theme-sky")) setActiveTheme("sky");
      else if (cl.contains("theme-white")) setActiveTheme("white");
      else setActiveTheme("luxury");
    };
    checkTheme();
    const interval = setInterval(checkTheme, 1000);
    return () => clearInterval(interval);
  }, []);

  const changeTheme = (next: Theme) => {
    document.documentElement.classList.remove("theme-classic", "theme-sky", "theme-white");
    if (next === "classic") document.documentElement.classList.add("theme-classic");
    if (next === "sky") document.documentElement.classList.add("theme-sky");
    if (next === "white") document.documentElement.classList.add("theme-white");
    localStorage.setItem("vibe-theme", next);
    setActiveTheme(next);
  };

  const copyPreviewLink = async () => {
    const c = currentCopy.replace("c", "");
    const m = currentVisual.replace("m", "");
    const url = `${window.location.origin}${window.location.pathname}?copy=${c}&visual=${m}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard no disponible */
    }
  };

  if (!enabled) return null;

  const currentAngle = COPIES[currentCopy].angle;

  return (
    <div className="fixed bottom-40 left-4 sm:bottom-6 sm:left-6 z-[80] font-sans">
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 border border-primary/40 text-white shadow-2xl backdrop-blur-md cursor-pointer text-xs font-bold uppercase tracking-wider"
      >
        <Settings className={`w-3.5 h-3.5 text-primary ${isOpen ? "animate-spin" : ""}`} />
        <span>Panel de control</span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
      </motion.button>

      {/* Expanded Control Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-14 left-0 w-80 max-h-[80vh] overflow-y-auto p-5 rounded-2xl glass-premium bg-slate-950/95 border border-primary/20 shadow-2xl backdrop-blur-xl flex flex-col gap-4 text-white"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
              <div className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Masterclass del miércoles</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-wider cursor-pointer"
              >
                Cerrar
              </button>
            </div>

            {/* Copy selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Type className="w-3 h-3 text-primary" />
                <span>Copy (mensaje)</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {COPY_IDS.map((c) => {
                  const isActiveWeek = c === ACTIVE_COPY;
                  const isSelected = currentCopy === c;
                  return (
                    <button
                      key={c}
                      onClick={() => onCopyChange(c)}
                      className={`relative py-2 px-2 rounded-lg text-[11px] font-bold border transition-all cursor-pointer text-center leading-tight
                        ${isSelected
                          ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                          : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20 hover:text-white"
                        }`}
                    >
                      {isActiveWeek && (
                        <Star className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      )}
                      <span className="block uppercase tracking-wide text-[9px] opacity-70">{c}</span>
                      <span className="block">{COPIES[c].angle.name}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                <span className="text-white font-bold">{currentAngle.tagline}.</span>{" "}
                {currentAngle.description}
              </p>
            </div>

            {/* Visual mode selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <LayoutGrid className="w-3 h-3 text-primary" />
                <span>Modo visual (diseño)</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {VISUAL_IDS.map((m) => {
                  const isActiveWeek = m === ACTIVE_VISUAL;
                  const isSelected = currentVisual === m;
                  return (
                    <button
                      key={m}
                      onClick={() => onVisualChange(m)}
                      title={VISUALS[m].description}
                      className={`relative py-2 px-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer text-center leading-tight
                        ${isSelected
                          ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                          : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20 hover:text-white"
                        }`}
                    >
                      {isActiveWeek && (
                        <Star className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      )}
                      <span className="block uppercase tracking-wide text-[9px] opacity-70">{m}</span>
                      <span className="block truncate">{VISUALS[m].shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active week + copy link */}
            <div className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.03] border border-white/10 px-3 py-2">
              <div className="text-[10px] text-slate-300 leading-tight">
                <span className="flex items-center gap-1 text-amber-400 font-black uppercase tracking-wider text-[9px]">
                  <Star className="w-3 h-3 fill-amber-400" /> Activo esta semana
                </span>
                <span className="text-white font-bold">{COPIES[ACTIVE_COPY].angle.name}</span>
                <span className="text-slate-500"> + {VISUALS[ACTIVE_VISUAL].shortLabel}</span>
              </div>
              <button
                onClick={copyPreviewLink}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-primary/15 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-wider hover:bg-primary/25 transition-colors cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-3 h-3" /> : <Link2 className="w-3 h-3" />}
                {copied ? "Copiado" : "Enlace"}
              </button>
            </div>

            {/* Themes Group */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Palette className="w-3 h-3 text-primary" />
                <span>Modo de color</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {THEMES.map((t) => (
                  <button
                    key={t}
                    onClick={() => changeTheme(t)}
                    className={`py-2 px-3 rounded-lg text-[10px] font-bold uppercase border transition-all cursor-pointer text-left flex justify-between items-center
                      ${activeTheme === t
                        ? "bg-primary/15 border-primary text-primary"
                        : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20 hover:text-white"
                      }`}
                  >
                    <span>{t}</span>
                    {activeTheme === t && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="text-[9px] text-slate-500 leading-relaxed border-t border-white/10 pt-2 text-center font-medium">
              Para publicar: fija <span className="text-slate-300 font-bold">ACTIVE_COPY</span> y{" "}
              <span className="text-slate-300 font-bold">ACTIVE_VISUAL</span> en masterclassCopy.ts. Atajo:{" "}
              <span className="text-slate-300 font-bold">Shift+P</span>.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
