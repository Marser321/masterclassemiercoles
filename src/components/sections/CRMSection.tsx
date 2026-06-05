"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Plug,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { KineticContainer, KineticItem } from "@/components/animations/KineticEntrance";
import CRMWorkflow from "@/components/ui/CRMWorkflow";
import GhlLogoBackground from "@/components/ui/GhlLogoBackground";

const SYSTEM_STEPS = [
  {
    label: "Entrada",
    description: "Pauta, formularios, WhatsApp y referidos.",
  },
  {
    label: "CRM",
    description: "Prospectos, etapas y conversaciones centralizadas.",
  },
  {
    label: "Follow-up",
    description: "Recordatorios, tareas y respuestas con ruta clara.",
  },
  {
    label: "Agenda",
    description: "Citas listas para que ventas trabaje con foco.",
  },
];

const BENEFITS = [
  {
    title: "Menos caos operativo",
    description: "Cada lead entra al sistema con una ruta clara de seguimiento.",
  },
  {
    title: "Mas visibilidad comercial",
    description: "Tu equipo sabe que esta pendiente, que se atendio y que debe pasar despues.",
  },
  {
    title: "Soporte para sostenerlo",
    description: "No solo instalamos herramientas: acompanamos la operacion para que siga funcionando.",
  },
];

export default function CRMSection() {
  const router = useRouter();
  const goToPlanning = () => router.push("/planificacion");

  return (
    <section
      id="crm"
      className="relative scroll-mt-24 overflow-hidden bg-background px-5 py-14 sm:scroll-mt-28 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="texture-grid opacity-[0.018]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(0,102,255,0.18),transparent_42%),radial-gradient(circle_at_16%_78%,rgba(16,208,86,0.08),transparent_34%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
        <KineticContainer className="space-y-6 text-center lg:text-left">
          <KineticItem type="subtitle-top">
            <div className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 lg:mx-0">
              <Activity className="size-3.5 text-primary" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                Sistema comercial
              </span>
            </div>
          </KineticItem>

          <KineticItem type="title-right">
            <h2 className="font-display-heavy text-3xl leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Tu marketing, tu CRM y tu agenda trabajando como una sola operacion.
            </h2>
          </KineticItem>

          <KineticItem type="body-bottom">
            <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
              Conectamos captacion, seguimiento y citas para que el equipo deje
              de perseguir informacion suelta y pueda enfocarse en vender mejor.
            </p>
          </KineticItem>

          <KineticItem type="fade-in" className="hidden lg:block">
            <BenefitsList />
          </KineticItem>

          <KineticItem type="btn-left" className="hidden lg:block">
            <CTAGroup onPlan={goToPlanning} />
          </KineticItem>
        </KineticContainer>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[760px]"
        >
          <div className="absolute -inset-8 rounded-[2rem] bg-primary/10 blur-3xl" />
          <div className="absolute -right-4 -top-8 z-30 hidden h-40 w-40 rounded-full bg-primary/10 blur-2xl sm:block" />
          <GhlLogoBackground
            showGlow={false}
            className="pointer-events-none absolute left-1/2 top-0 z-30 w-[118px] -translate-x-1/2 opacity-95 drop-shadow-[0_18px_45px_rgba(31,136,229,0.35)] sm:w-[210px] lg:w-[240px]"
          />

          <div className="relative z-10 h-[520px] pt-[92px] sm:h-[640px] sm:pt-[150px] lg:h-[680px] lg:pt-[170px]">
            <CRMWorkflow />
          </div>

          <div className="relative z-20 -mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {SYSTEM_STEPS.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 + index * 0.07, duration: 0.32 }}
                className="min-h-[84px] rounded-lg border border-primary/15 bg-background/85 p-3 shadow-xl shadow-primary/5 backdrop-blur-md"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {index === 0 ? <Plug className="size-3.5" /> : <Sparkles className="size-3.5" />}
                  </div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                    {step.label}
                  </p>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-2xl space-y-7 lg:hidden">
          <BenefitsList />
          <CTAGroup onPlan={goToPlanning} />
        </div>
      </div>
    </section>
  );
}

function BenefitsList() {
  return (
    <div className="grid gap-4 pt-1 text-left sm:grid-cols-3 lg:grid-cols-1">
      {BENEFITS.map((benefit, index) => (
        <div key={benefit.title} className="flex gap-3">
          <div className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 font-mono text-[10px] font-bold text-primary">
            0{index + 1}
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">{benefit.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {benefit.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CTAGroup({ onPlan }: { onPlan: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 pt-2 sm:flex-row lg:justify-start">
      <Button
        variant="primary"
        size="lg"
        glow
        aurora={false}
        shimmer={false}
        pulse={false}
        onClick={onPlan}
        className="h-14 w-full px-8 sm:w-auto"
      >
        Agendar diagnostico
        <ArrowRight className="size-5" />
      </Button>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        <ShieldCheck className="size-4 text-primary" />
        Revision sin costo
      </div>
    </div>
  );
}
