"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, X } from "lucide-react";
import Link from "next/link";
import type { TestimonialVideo } from "@/lib/types";

interface VideoLightboxProps {
  video: TestimonialVideo | null;
  onClose: () => void;
}

export default function VideoLightbox({ video, onClose }: VideoLightboxProps) {
  useEffect(() => {
    if (!video) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, video]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-background px-4 py-6 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Testimonio de ${video.client}`}
          onClick={onClose}
        >
          <motion.div
            className="relative grid max-h-[88vh] w-full max-w-5xl grid-cols-1 overflow-hidden rounded-lg border border-primary/25 bg-card shadow-2xl shadow-primary/10 md:grid-cols-[minmax(280px,380px),1fr]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-white transition-colors hover:bg-slate-900"
              aria-label="Cerrar video"
            >
              <X className="size-5" />
            </button>

            <div className="bg-black">
              <video
                key={video.id}
                className="h-[min(64vh,620px)] w-full bg-black object-contain md:h-[88vh]"
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster={video.poster}
              >
                <source src={video.videoSrc} type="video/mp4" />
              </video>
            </div>

            <div className="flex min-h-0 flex-col justify-between gap-8 overflow-y-auto p-6 sm:p-8">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  {video.category}
                </p>
                <div>
                  <h3 className="text-2xl font-black leading-tight tracking-tight text-foreground sm:text-4xl">
                    {video.client}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Una prueba social directa para escuchar la experiencia del
                    cliente sin depender de texto largo ni metricas no verificadas.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="rounded-md border border-border bg-muted/30 px-3 py-2">
                    {video.duration}
                  </span>
                  <span className="rounded-md border border-border bg-muted/30 px-3 py-2">
                    {video.orientation === "vertical" ? "Vertical" : "Horizontal"}
                  </span>
                </div>
              </div>

              <Link
                href="/planificacion"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Agendar diagnostico
                <Calendar className="size-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
