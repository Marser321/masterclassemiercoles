"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Calendar, Gauge, Play, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { KineticContainer, KineticItem } from "@/components/animations/KineticEntrance";
import { Button } from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";
import { useMediaQuery } from "@/lib/useMediaQuery";

const VSL_POSTER = "/media/vsl/vsl-v2-poster.jpg";
const VSL_WEB = "/media/vsl/vsl-v2-web.mp4";
const VSL_MOBILE = "/media/vsl/vsl-v2-mobile.mp4";

export default function VSLSection() {
  const [videoActive, setVideoActive] = useState(false);
  const router = useRouter();
  // El video se monta recién al click (post-hidratación), así que el media query ya es real
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section
      id="vsl-masterclass"
      className="relative overflow-hidden bg-background px-5 py-12 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="texture-grid opacity-[0.025]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>
      <SectionDivider className="absolute left-0 right-0 top-0" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <KineticContainer className="space-y-6 text-center lg:text-left">
            <KineticItem type="subtitle-top">
              <div className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-md lg:mx-0">
                <span className="size-2 rounded-full bg-primary" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary sm:text-[11px]">
                  VSL principal
                </span>
              </div>
            </KineticItem>

            <KineticItem type="title-right">
              <h2 className="font-display-heavy text-3xl leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Mira como ordenamos ventas, seguimiento y clientes para escalar tu{" "}
                <span className="text-primary italic">operacion</span>
              </h2>
            </KineticItem>

            <KineticItem type="body-bottom">
              <p className="mx-auto max-w-xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
                Una explicacion directa del sistema comercial: embudo, CRM,
                seguimiento y agenda trabajando como una sola estructura.
              </p>
            </KineticItem>

            <KineticItem type="btn-left">
              <div className="flex flex-col items-center gap-5 pt-2 sm:flex-row lg:justify-start">
                <Button
                  variant="primary"
                  size="lg"
                  glow
                  aurora={false}
                  shimmer={false}
                  pulse={false}
                  onClick={() => router.push("/planificacion")}
                  className="h-14 w-full px-8 sm:w-auto"
                >
                  Agendar diagnostico
                  <Calendar className="size-5 text-primary-foreground" />
                </Button>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <ShieldCheck className="size-4 text-primary" />
                  Cita sin costo
                </div>
              </div>
            </KineticItem>
          </KineticContainer>
        </div>

        <motion.div
          style={{ y: yParallax }}
          className="mx-auto w-full max-w-3xl will-change-transform lg:col-span-7"
        >
          <div className="relative overflow-hidden rounded-lg border border-primary/25 bg-card shadow-2xl shadow-primary/10">
            <div className="relative aspect-video bg-black">
              {videoActive ? (
                <video
                  className="h-full w-full bg-black object-contain"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  poster={VSL_POSTER}
                >
                  <source src={isSmallScreen ? VSL_MOBILE : VSL_WEB} type="video/mp4" />
                </video>
              ) : (
                <button
                  type="button"
                  onClick={() => setVideoActive(true)}
                  className="group absolute inset-0 cursor-pointer text-left"
                  aria-label="Reproducir VSL de AD Media Solution"
                >
                  <Image
                    src={VSL_POSTER}
                    alt="VSL de AD Media Solution"
                    fill
                    sizes="(max-width: 1024px) 100vw, 760px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/85 sm:left-5 sm:top-5">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-slate-950/70 px-2.5 py-1 backdrop-blur-sm">
                      <Activity className="size-3 text-primary" />
                      1 min
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-slate-950/70 px-2.5 py-1 backdrop-blur-sm">
                      <Gauge className="size-3 text-accent-light" />
                      Sistema comercial
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex size-18 items-center justify-center rounded-full border border-primary/80 bg-primary/80 text-white shadow-2xl shadow-primary/30 transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-1 size-8 fill-current" />
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="max-w-md text-sm font-semibold leading-relaxed text-white sm:text-base">
                      Sistema comercial, seguimiento y agenda en una sola explicacion.
                    </p>
                  </div>
                  {/* Barra de progreso fantasma: sugiere "esto se reproduce" (se desmonta al play) */}
                  <div className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden bg-white/5">
                    <div className="h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-primary to-transparent" />
                  </div>
                </button>
              )}
            </div>

            <div className="hidden gap-3 border-t border-primary/15 bg-slate-950/70 p-4 text-xs text-muted-foreground sm:grid sm:grid-cols-3 sm:p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                Estrategia clara
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                CRM y seguimiento
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="size-4 text-primary" />
                Agenda comercial
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <SectionDivider className="absolute bottom-0 left-0 right-0" />
    </section>
  );
}
