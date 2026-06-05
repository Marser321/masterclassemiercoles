"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Calendar, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Check if user has already closed the popup in this session
    const isClosed = window.sessionStorage?.getItem("promo-popup-closed");
    if (isClosed) return;

    let pendingOpen = false;
    const isNearEntryPoint = () => window.scrollY < Math.min(320, window.innerHeight * 0.35);
    const openPopup = () => setIsOpen(true);

    const handleScroll = () => {
      if (!pendingOpen || !isNearEntryPoint()) return;
      pendingOpen = false;
      openPopup();
    };

    const timer = window.setTimeout(() => {
      if (isNearEntryPoint()) {
        openPopup();
      } else {
        pendingOpen = true;
      }
    }, 5000); // 5 seconds delay

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    window.sessionStorage?.setItem("promo-popup-closed", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-background/75 p-3 backdrop-blur-xl sm:p-4">
          <div className="flex min-h-full items-start justify-center sm:items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-[35rem] overflow-hidden rounded-[2rem] p-[1.5px] shadow-[0_0_34px_rgba(56,189,248,0.22),0_28px_100px_rgba(0,102,255,0.32)]"
            >
              <motion.div
                aria-hidden="true"
                className="absolute -inset-28 bg-[conic-gradient(from_90deg,transparent_0deg,transparent_55deg,rgba(56,189,248,0.95)_92deg,rgba(0,102,255,1)_116deg,rgba(125,211,252,0.98)_138deg,transparent_178deg,transparent_360deg)]"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={prefersReducedMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative overflow-hidden rounded-[calc(2rem-1px)] border border-sky-300/35 bg-slate-950/95 px-4 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_0_34px_rgba(56,189,248,0.08)] ring-1 ring-sky-300/20 backdrop-blur-2xl sm:px-5 sm:py-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.2),transparent_34%),radial-gradient(circle_at_85%_100%,rgba(0,102,255,0.2),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02)_35%,rgba(255,255,255,0.08))] pointer-events-none" />
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/80 to-transparent pointer-events-none" />
              <div className="absolute -left-24 top-10 h-40 w-40 rounded-full bg-sky-400/15 blur-3xl pointer-events-none" />
              <div className="absolute -right-20 -bottom-16 h-44 w-44 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.11)_24%,transparent_42%),radial-gradient(circle_at_14%_14%,rgba(186,230,253,0.16),transparent_22%)] opacity-80 mix-blend-screen pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={closePopup}
                aria-label="Cerrar popup"
                className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sky-100/60 backdrop-blur-md transition-colors hover:border-sky-300/40 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-full overflow-hidden rounded-[1.6rem] border border-sky-200/25 bg-slate-950/70 shadow-[0_18px_55px_rgba(0,102,255,0.24),inset_0_1px_0_rgba(255,255,255,0.18)]">
                  <div className="relative aspect-square w-full">
                    <Image
                      src="/popups/ad-media-diagnostic-glass.png"
                      alt="Sistema visual de CRM, ads, WhatsApp, agenda y ventas de AD Media Solution"
                      fill
                      sizes="(max-width: 640px) 92vw, 520px"
                      className="object-contain"
                      priority
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02),rgba(2,6,23,0.18)_62%,rgba(2,6,23,0.68)),radial-gradient(circle_at_50%_46%,transparent_0%,transparent_42%,rgba(2,6,23,0.24)_78%)]" />
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                    <div className="absolute bottom-4 left-1/2 flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-full border border-sky-200/20 bg-slate-950/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.18)] backdrop-blur-md">
                      <ShieldCheck className="size-3 text-sky-300" />
                      Sistema Comercial
                    </div>
                  </div>
                </div>

                {/* Content */}
                <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-200 shadow-[0_0_22px_rgba(56,189,248,0.16)]">
                  <Sparkles className="size-3" />
                  Diagnóstico gratis
                </span>
                <h3 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white">
                  Convierte más leads en citas reales
                </h3>
                <p className="mt-3 max-w-md text-sm sm:text-[15px] leading-relaxed text-sky-50/70">
                  Revisamos tu CRM, anuncios, WhatsApp y agenda para detectar dónde se pierden oportunidades y cómo activar un sistema de ventas más claro.
                </p>

                <div className="mt-5 flex w-full flex-wrap items-center justify-center gap-2 rounded-2xl border border-dashed border-sky-300/25 bg-white/[0.055] px-3 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-sky-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <span>CRM</span>
                  <span className="text-sky-300/70">+</span>
                  <span>Ads</span>
                  <span className="text-sky-300/70">+</span>
                  <span>WhatsApp</span>
                  <span className="text-sky-300/70">+</span>
                  <span>Ventas</span>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 w-full flex flex-col gap-2">
                  <a
                    href="/planificacion"
                    onClick={closePopup}
                    className="group flex items-center justify-center gap-2 w-full rounded-2xl border border-sky-200/20 bg-gradient-to-br from-sky-400 via-primary to-blue-700 py-4 text-sm font-bold text-white shadow-[0_16px_45px_rgba(0,102,255,0.36)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(56,189,248,0.36)] cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    Agendar Diagnóstico Gratis
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <button
                    onClick={closePopup}
                    className="py-3 text-xs font-medium text-sky-50/45 transition-colors hover:text-sky-50/80 cursor-pointer"
                  >
                    No, gracias. Quizás más tarde
                  </button>
                </div>
              </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
