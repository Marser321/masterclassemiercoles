"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck, MessageCircle, Route, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import FooterContact from "@/components/sections/FooterContact";
import IslandBar from "@/components/layout/IslandBar";
import AuthoritySection from "@/components/sections/AuthoritySection";

const WORK_AREAS = [
  {
    title: "Diagnostico comercial",
    description:
      "Revisamos captacion, seguimiento, agenda y ventas para detectar donde se pierde claridad.",
    icon: ClipboardCheck,
  },
  {
    title: "Sistema y seguimiento",
    description:
      "Ordenamos CRM, WhatsApp, tareas y citas para que el equipo tenga una ruta operativa simple.",
    icon: Route,
  },
  {
    title: "Direccion mensual",
    description:
      "Acompanamos decisiones de marketing y ventas con ajustes practicos, no con teoria suelta.",
    icon: MessageCircle,
  },
];

export default function DangerPage() {
  return (
    <main className="relative flex min-h-screen flex-col justify-between overflow-x-hidden bg-background text-foreground">
      <Navbar />

      <div className="pt-20">
        <AuthoritySection />
      </div>

      <section className="relative z-10 mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <ShieldCheck className="size-3.5" />
            Consultoria y direccion
          </span>
          <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Enfoque directo para ordenar marketing, CRM y ventas.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Esta pagina queda enfocada en explicar el criterio de trabajo de
            Danger. Los resultados numericos y casos escritos se publicaran
            solo cuando esten verificados por el equipo.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {WORK_AREAS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="rounded-lg border border-primary/20 bg-card/45 p-6 backdrop-blur-sm"
              >
                <div className="mb-5 inline-flex size-11 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-black text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 rounded-lg border border-primary/20 bg-card/70 p-6 text-center shadow-2xl shadow-primary/5 sm:p-8">
          <p className="mx-auto max-w-2xl text-lg font-bold leading-tight text-foreground sm:text-2xl">
            La prueba social real esta centralizada en testimonios en video.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Para evitar promesas sin respaldo, esta pagina no muestra metricas
            ni citas escritas hasta que el CEO apruebe datos especificos.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/casos"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary/30 px-6 text-sm font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/10"
            >
              Ver testimonios
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/planificacion"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Agendar diagnostico
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <FooterContact />
      <IslandBar />
    </main>
  );
}
