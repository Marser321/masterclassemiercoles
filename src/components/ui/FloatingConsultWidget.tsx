"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MessageCircle, X } from "lucide-react";

/**
 * Widget flotante de contacto (esquina inferior derecha).
 * Copy literal del CEO. Enlaza a /planificacion para agendar una cita sin costo.
 * Se ubica a la derecha para no solaparse con el IslandBar (centrado).
 */
export default function FloatingConsultWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="hidden sm:flex fixed bottom-6 right-6 z-50 flex-col items-end gap-3 print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-[280px] glass-premium rounded-3xl border border-primary/30 p-5 shadow-2xl"
          >
            {/* Accent bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-primary to-accent-light" />

            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3 text-primary">
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Hablemos</span>
            </div>

            <p className="text-sm text-foreground leading-relaxed mb-4">
              ¿Quieres saber cómo nosotros te ayudamos? Agéndanos una cita, que es sin costo y te demostramos.
            </p>

            <Link
              href="/planificacion"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 shadow-lg shadow-primary/15 transition-all text-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Agendar cita gratis
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Agenda tu cita sin costo"
        className="flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-2xl shadow-primary/30 cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
        </span>
        <Calendar className="w-4 h-4" />
        <span className="hidden sm:inline">Agenda tu cita</span>
      </motion.button>
    </div>
  );
}
