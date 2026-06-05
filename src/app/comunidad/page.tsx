"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Lock, MessageSquare, Video } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import FooterContact from "@/components/sections/FooterContact";
import IslandBar from "@/components/layout/IslandBar";
import VideoBackground from "@/components/ui/VideoBackground";

const UPCOMING_CONTENT = [
  {
    title: "Workshops y masterclasses",
    description: "Espacio reservado para grabaciones aprobadas por el equipo.",
    icon: Video,
  },
  {
    title: "Comunidad privada",
    description: "El enlace oficial se publicara cuando el acceso este listo.",
    icon: MessageSquare,
  },
  {
    title: "Eventos y sesiones",
    description: "Calendario pendiente de confirmacion antes de hacerlo publico.",
    icon: Calendar,
  },
];

export default function ComunidadPage() {
  return (
    <main className="relative flex min-h-screen flex-col justify-between overflow-x-hidden bg-background text-foreground">
      <Navbar />

      <section className="relative overflow-hidden px-5 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
        <VideoBackground
          src="/videos/comunidad-header.mp4"
          poster="/videos/comunidad-header-poster.jpg"
          className="z-0 h-[640px] bottom-auto"
          posterClassName="opacity-[0.35] sm:opacity-[0.45]"
          videoClassName="opacity-[0.35] sm:opacity-[0.45]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(2,6,23,0.05),rgba(2,6,23,0.45)_55%,rgba(2,6,23,0.88)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/75 to-transparent" />
        </VideoBackground>

        <div className="container relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-primary backdrop-blur-md">
              AD Media Community
            </span>
            <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Comunidad y contenido en preparacion.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground md:text-lg">
              Estamos preparando el acceso oficial, los eventos y las
              grabaciones para publicarlos solo cuando esten validados por el equipo.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
            {UPCOMING_CONTENT.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + index * 0.08, duration: 0.35 }}
                  className="rounded-lg border border-primary/20 bg-card/65 p-6 backdrop-blur-md"
                >
                  <div className="mb-5 inline-flex size-11 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h2 className="text-lg font-black text-foreground">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-primary/20 bg-card/75 p-6 text-center shadow-2xl shadow-primary/10 backdrop-blur-md sm:p-8">
            <div className="mx-auto mb-4 inline-flex size-11 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
              <Lock className="size-5" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-foreground">
              Acceso privado pendiente de aprobacion
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Por ahora evitamos publicar enlaces de invitacion o eventos de
              ejemplo. Cuando el equipo confirme los datos, esta pagina se
              conectara con el contenido real.
            </p>
            <Link
              href="/planificacion"
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Agendar diagnostico
              <Calendar className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <FooterContact />
      <IslandBar />
    </main>
  );
}
