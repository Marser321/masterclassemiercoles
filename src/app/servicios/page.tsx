"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import FooterContact from "@/components/sections/FooterContact";
import IslandBar from "@/components/layout/IslandBar";
import { Check, X, ArrowRight, ChevronDown, Bot, Share2, Megaphone, Globe, LifeBuoy, Camera, BadgeCheck } from "lucide-react";
import servicesData from "@/lib/data/servicesData.json";
import { motion, AnimatePresence } from "framer-motion";
import { KineticContainer, KineticItem } from "@/components/animations/KineticEntrance";
import ResponsiveVideoBg from "@/components/ui/ResponsiveVideoBg";

type ServicePlan = (typeof servicesData.services)[number]["plans"][number];

// Tarjeta de plan con revelación progresiva: por defecto muestra nombre,
// descripción de 1 línea, precio y CTA; las features se despliegan en acordeón.
function PlanCard({ plan }: { plan: ServicePlan }) {
  const [open, setOpen] = useState(false);
  const isPopular = plan.isPopular;

  return (
    <KineticItem type="media-scale" className="relative h-full">
      {isPopular && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-2 rounded-[2.2rem] bg-primary/20 blur-2xl animate-pulse-slow"
        />
      )}
      <div
        className={`relative flex h-full flex-col justify-between p-6 sm:p-7 lg:p-8 rounded-3xl transition-all duration-300 border ${
          isPopular
            ? "bg-gradient-to-b from-card to-primary/5 border-primary shadow-2xl md:scale-[1.03] z-10"
            : "bg-card/70 border-border hover:border-muted-foreground/40 hover:bg-card/80 shadow-lg backdrop-blur-md"
        }`}
      >
        {isPopular && (
          <span className="absolute -top-3.5 left-6 text-[11px] font-bold tracking-wider uppercase bg-primary text-primary-foreground px-3 py-1 rounded-full shadow-md">
            {plan.highlightText || "Más Vendido"}
          </span>
        )}

        <div>
          <h3 className="text-xl font-bold">{plan.name}</h3>
          <p className="text-xs text-muted-foreground mt-2 min-h-[32px]">{plan.description}</p>
          <div className="mt-6 flex items-baseline">
            <span className="text-3xl font-extrabold tracking-tight">{plan.price}</span>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-6 flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider cursor-pointer hover:opacity-80 transition-opacity"
          >
            {open ? "Ocultar detalle" : "Ver qué incluye"}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden space-y-3.5 mt-4 border-t border-border/60 pt-4"
              >
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 text-muted shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? "text-foreground" : "text-muted-foreground line-through"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8">
          <a
            href="/planificacion"
            className={`flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
              isPopular
                ? "bg-primary text-primary-foreground hover:bg-primary/95 shadow-md shadow-primary/10"
                : "action-secondary hover:-translate-y-0.5"
            }`}
          >
            Seleccionar Plan
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </KineticItem>
  );
}

export default function ServiciosPage() {
  const [activeTab, setActiveTab] = useState("crm");

  const searchString = typeof window !== "undefined" ? window.location.search : "";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      const validTabs = servicesData.services.map((s) => s.id);
      if (tabParam && validTabs.includes(tabParam)) {
        const timer = setTimeout(() => {
          setActiveTab(tabParam);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [searchString]);

  const tabIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    crm: Bot,
    "social-media": Share2,
    "marketing-ads": Megaphone,
    "web-development": Globe,
    maintenance: LifeBuoy,
    production: Camera,
  };

  return (
    <main className="bg-background min-h-screen relative flex flex-col justify-between overflow-x-hidden text-foreground">
      <Navbar />

      <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 px-5 sm:px-6 overflow-hidden">
        <ResponsiveVideoBg
          mobileMp4Src="/videos/glassmorphic-dashboard-mobile-vertical.mp4"
          mobilePoster="/videos/glassmorphic-dashboard-mobile-vertical-poster.jpg"
          desktopMp4Src="/videos/servicios-background.mp4"
          desktopPoster="/videos/servicios-background-poster.jpg"
          breakpoint={1280}
          className="z-0 h-[620px] sm:h-[720px] lg:h-[780px] bottom-auto"
          posterClassName="opacity-[0.4] sm:opacity-[0.5]"
          videoClassName="opacity-[0.4] sm:opacity-[0.5] md:opacity-[0.55]"
          mobilePosterClassName="object-[50%_30%]"
          mobileVideoClassName="object-[50%_30%]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(2,6,23,0.04),rgba(2,6,23,0.5)_48%,rgba(2,6,23,0.92)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/32 to-background" />
        </ResponsiveVideoBg>

        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 z-[2] -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
              Nuestras Soluciones
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mt-5 tracking-tight leading-tight">
              Planes que Impulsan tu <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-light">
                Escala Comercial
              </span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed">
              Dirección de marketing y ventas. Elige el sistema que tu negocio necesita.
            </p>
          </motion.div>

          {/* Interactive Navigation Tabs — carrusel con snap en móvil, wrap en desktop */}
          <div className="mt-8 sm:mt-10 max-w-4xl mx-auto p-2 rounded-2xl bg-card/65 border border-border backdrop-blur-md">
            <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-1 px-1">
              {servicesData.services.map((service) => {
                const Icon = tabIcons[service.id] || Globe;
                const isActive = activeTab === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service.id)}
                    className={`flex shrink-0 snap-start items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                        : "text-foreground/80 hover:bg-muted/70 hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {service.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Plan Display Area */}
          <div className="mt-10 sm:mt-12 relative">
            {/* Insignia Partner Oficial — visible en el tab de Ads */}
            {activeTab === "marketing-ads" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 max-w-2xl mx-auto"
              >
                <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-primary via-accent-light to-primary shadow-xl overflow-hidden backdrop-blur-md">
                  <div className="bg-card/90 rounded-[23px] p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-6 text-left">
                    {/* Meta Partner Box */}
                    <div className="flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-border/80 pb-4 sm:pb-0 sm:pr-6 w-full sm:w-1/2">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
                        <BadgeCheck className="w-7 h-7 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-foreground uppercase tracking-wider">Meta Business Partner</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Socio comercial verificado para gestionar campañas en Facebook e Instagram.</p>
                      </div>
                    </div>

                    {/* Google Partner Box */}
                    <div className="flex items-center gap-4 w-full sm:w-1/2">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shrink-0">
                        <span className="text-xl">🏆</span>
                      </div>
                      <div>
                        <p className="text-sm font-black text-foreground uppercase tracking-wider">Especialistas Google Ads</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Certificación avanzada en Google Search, Display, Shopping y YouTube Ads.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <AnimatePresence mode="wait">
              {servicesData.services.map((service) => {
                if (service.id !== activeTab) return null;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    <KineticContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 text-left">
                      {service.plans.map((plan) => (
                        <PlanCard key={plan.id} plan={plan} />
                      ))}
                    </KineticContainer>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Sección Detalle de Trabajos y Nichos */}
      <section className="relative pb-24 px-5 sm:px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === "social-media" && (
              <motion.div
                key="social-media-details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12 p-8 sm:p-10 rounded-3xl bg-card/45 border border-primary/20 backdrop-blur-md shadow-xl flex flex-col md:flex-row gap-8 items-center text-left"
              >
                <div className="flex-1">
                  <span className="text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    Producción Cinematográfica
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mt-4 tracking-tight">
                    Grabación, Edición y Diseño Gráfico In-House
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-4 font-light">
                    Llevamos la producción de tu marca al siguiente nivel. Nuestro equipo, liderado técnicamente por <strong>Danger Fernández</strong> y <strong>Cadete</strong> como fotógrafos y camarógrafos experimentados, se desplaza para capturar contenido de alta fidelidad.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      Sesiones de grabación in-situ o estudio
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      Edición dinámica con subtítulos animados
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      Diseño gráfico premium de portadas y feeds
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      Copys enfocados a retención y conversión
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-[320px] aspect-video sm:aspect-square rounded-2xl bg-slate-900 border border-border flex items-center justify-center relative overflow-hidden shrink-0 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent-light/10 group-hover:scale-105 transition-transform duration-500" />
                  <Camera className="w-12 h-12 text-primary/60 group-hover:text-primary transition-colors" />
                  <span className="absolute bottom-4 left-4 text-[10px] font-mono text-muted-foreground">
                    Cámara Slot: ADM-PROD
                  </span>
                </div>
              </motion.div>
            )}

            {activeTab === "marketing-ads" && (
              <motion.div
                key="marketing-ads-details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12 p-8 sm:p-10 rounded-3xl bg-card/45 border border-primary/20 backdrop-blur-md shadow-xl flex flex-col md:flex-row gap-8 items-center text-left"
              >
                <div className="flex-1">
                  <span className="text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    Tráfico & Conversión Pro
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mt-4 tracking-tight">
                    Optimización Semanal y Configuración de API
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-4 font-light">
                    No solo lanzamos anuncios; estructuramos campañas conectadas al sistema comercial. Gestionamos pauta en <strong>Meta Ads</strong> (Facebook e Instagram) y <strong>Google Ads</strong> (Búsqueda, Display, YouTube) con medición, seguimiento y revisión continua.
                  </p>
                </div>
                <div className="w-full md:w-[320px] aspect-video sm:aspect-square rounded-2xl bg-slate-900 border border-border flex items-center justify-center relative overflow-hidden shrink-0 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-amber-500/10 group-hover:scale-105 transition-transform duration-500" />
                  <BadgeCheck className="w-12 h-12 text-blue-400/80 group-hover:text-blue-400 transition-colors" />
                  <span className="absolute bottom-4 left-4 text-[10px] font-mono text-muted-foreground">
                    Ads Partner Certificado
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      <FooterContact />
      <IslandBar />
    </main>
  );
}
