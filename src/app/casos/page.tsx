"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Play, Search, ShieldCheck, Video } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import IslandBar from "@/components/layout/IslandBar";
import FooterContact from "@/components/sections/FooterContact";
import VideoLightbox from "@/components/ui/VideoLightbox";
import { TESTIMONIAL_VIDEOS } from "@/lib/data/testimonialsData";
import type { TestimonialVideo } from "@/lib/types";

type FilterId = "all" | "featured" | "short" | "long";

const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "featured", label: "Destacados" },
  { id: "short", label: "Cortos" },
  { id: "long", label: "Largos" },
];

function matchesFilter(video: TestimonialVideo, filter: FilterId) {
  if (filter === "featured") return video.featured;
  if (filter === "short") return video.durationSeconds <= 45;
  if (filter === "long") return video.durationSeconds > 45;
  return true;
}

export default function CasesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [selectedVideo, setSelectedVideo] = useState<TestimonialVideo | null>(null);

  const videos = useMemo(
    () => TESTIMONIAL_VIDEOS.filter((video) => matchesFilter(video, activeFilter)),
    [activeFilter],
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="fixed inset-0 pointer-events-none bg-noise opacity-[0.03]" />

      <section className="relative overflow-hidden px-5 pb-10 pt-28 text-center sm:px-6 sm:pb-14 sm:pt-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="texture-grid opacity-[0.025]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-primary"
          >
            <ShieldCheck className="size-3.5" />
            Biblioteca de testimonios
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-4xl font-black leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl"
          >
            Clientes hablando en video.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Testimonios breves para revisar experiencias reales sin depender de
            citas escritas ni metricas no verificadas.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            {FILTERS.map((filter) => {
              const active = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-primary/25 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="mx-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground md:mx-0">
            <Search className="size-4 text-primary" />
            {videos.length} videos
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {videos.map((video, index) => (
            <motion.button
              key={video.id}
              type="button"
              onClick={() => setSelectedVideo(video)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.025, duration: 0.3 }}
              className="group overflow-hidden rounded-lg border border-primary/20 bg-card text-left shadow-xl shadow-primary/5 transition-colors hover:border-primary/50"
              aria-label={`Ver testimonio de ${video.client}`}
            >
              <div className="relative aspect-[9/16] bg-slate-950">
                <Image
                  src={video.poster}
                  alt={`Testimonio de ${video.client}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 180px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border border-white/10 bg-slate-950/75 px-2 py-1 text-[10px] font-mono text-white/85 backdrop-blur-sm">
                  <Video className="size-3 text-primary" />
                  {video.duration}
                </span>
                {video.featured && (
                  <span className="absolute left-2 top-2 rounded-md border border-primary/35 bg-primary/20 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                    Destacado
                  </span>
                )}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex size-12 items-center justify-center rounded-full border border-primary/80 bg-primary/75 text-white shadow-xl shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-0.5 size-5 fill-current" />
                  </span>
                </span>
              </div>
              <div className="space-y-1 p-3">
                <h2 className="text-sm font-bold leading-tight text-foreground">
                  {video.client}
                </h2>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {video.category}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-primary/20 bg-card/70 p-6 text-center shadow-2xl shadow-primary/5 sm:p-8">
          <p className="mx-auto max-w-2xl text-lg font-bold leading-tight text-foreground sm:text-2xl">
            Si quieres ver como se puede ordenar tu captacion, agenda y seguimiento, empieza por un diagnostico.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/planificacion"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Agendar cita
              <Calendar className="size-4" />
            </Link>
            <Link
              href="/#vsl-masterclass"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary/30 px-6 text-sm font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/10"
            >
              Ver VSL
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <VideoLightbox video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      <FooterContact />
      <IslandBar />
    </main>
  );
}
