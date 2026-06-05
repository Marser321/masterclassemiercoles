"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Video } from "lucide-react";
import { FEATURED_TESTIMONIAL_VIDEOS } from "@/lib/data/testimonialsData";
import type { TestimonialVideo } from "@/lib/types";
import { KineticContainer, KineticItem } from "@/components/animations/KineticEntrance";
import VideoLightbox from "@/components/ui/VideoLightbox";

export default function BTLTestimonialsSection() {
  const [selectedVideo, setSelectedVideo] = useState<TestimonialVideo | null>(null);

  return (
    <section
      id="testimonios-btl"
      className="relative overflow-hidden bg-background px-5 py-12 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="texture-grid opacity-[0.02]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-9 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <KineticContainer className="max-w-3xl space-y-4 text-center md:text-left">
            <KineticItem type="subtitle-top">
              <span className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-primary md:mx-0">
                <ShieldCheck className="size-3.5" />
                Testimonios reales
              </span>
            </KineticItem>
            <KineticItem type="title-right">
              <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                Prueba social en video, sin texto de relleno.
              </h2>
            </KineticItem>
            <KineticItem type="body-bottom">
              <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed text-muted-foreground md:mx-0 md:text-base">
                Una seleccion breve para validar confianza antes de pasar a la
                biblioteca completa de casos.
              </p>
            </KineticItem>
          </KineticContainer>

          <Link
            href="/casos"
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/10 md:mx-0"
          >
            Ver biblioteca
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-8">
          {FEATURED_TESTIMONIAL_VIDEOS.map((video, index) => (
            <motion.button
              key={video.id}
              type="button"
              onClick={() => setSelectedVideo(video)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.04, duration: 0.35 }}
              className="group relative overflow-hidden rounded-lg border border-primary/20 bg-card text-left shadow-xl shadow-primary/5 transition-colors hover:border-primary/50"
              aria-label={`Ver testimonio de ${video.client}`}
            >
              <div className="relative aspect-[9/16] bg-slate-950">
                <Image
                  src={video.poster}
                  alt={`Testimonio de ${video.client}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 160px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border border-white/10 bg-slate-950/75 px-2 py-1 text-[10px] font-mono text-white/85 backdrop-blur-sm">
                  <Video className="size-3 text-primary" />
                  {video.duration}
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex size-12 items-center justify-center rounded-full border border-primary/80 bg-primary/75 text-white shadow-xl shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-0.5 size-5 fill-current" />
                  </span>
                </span>
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <h3 className="text-sm font-bold leading-tight text-white">
                    {video.client}
                  </h3>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-light">
                    {video.category}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <VideoLightbox video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  );
}
