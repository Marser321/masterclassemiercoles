"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import FooterContact from "@/components/sections/FooterContact";
import IslandBar from "@/components/layout/IslandBar";
import { CheckCircle2, User, Mail, MessageSquare, ArrowRight, ClipboardList, CalendarCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BlueprintLayer from "@/components/backgrounds/BlueprintLayer";
import MetricBurst from "@/components/backgrounds/MetricBurst";

const STEPS = [
  { n: 1, label: "Contacto", icon: User },
  { n: 2, label: "Calificación", icon: ClipboardList },
  { n: 3, label: "Listo", icon: CalendarCheck },
];

export default function PlanificacionPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    revenue: "bajo-10k",
    serviceOfInterest: "crm",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // PLACEHOLDER: conectar este envío a un endpoint/CRM real para registrar la solicitud.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular llamada de API/CRM con un delay de 1.5s
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Guardar lead en localStorage por persistencia
    localStorage.setItem("admedia-lead", JSON.stringify({ ...formData, timestamp: Date.now() }));
    
    setIsSubmitting(false);
    nextStep();
  };

  return (
    <main className="bg-background min-h-screen relative flex flex-col justify-between overflow-x-hidden text-foreground">
      <Navbar />

      <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 px-5 sm:px-6 overflow-hidden">
        {/* Fondo: el sistema se construye etapa por etapa con cada paso del wizard */}
        <BlueprintLayer intensity="medium" stages={3} activeStage={step} />

        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
              Planificación
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mt-5 tracking-tight leading-tight">
              Agenda tu Consulta <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-light">
                Estratégica Gratis
              </span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed">
              30 minutos sin costo para mostrarte cómo escalar tu facturación.
            </p>
          </motion.div>

          {/* Stepper visual — siempre sé en qué paso estoy */}
          <div className="mt-8 flex items-center justify-center gap-2 sm:gap-4 max-w-xl mx-auto">
            {STEPS.map((s, i) => {
              const StepIcon = s.icon;
              const done = step > s.n;
              const active = step === s.n;
              return (
                <div key={s.n} className="flex items-center gap-2 sm:gap-4">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`flex items-center justify-center size-9 sm:size-10 rounded-full border transition-colors duration-300 ${
                        active || done
                          ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "bg-card border-border text-muted-foreground"
                      }`}
                    >
                      {done ? <CheckCircle2 className="size-5" /> : <StepIcon className="size-4 sm:size-5" />}
                    </div>
                    <span className={`text-[10px] sm:text-xs font-semibold ${active || done ? "text-foreground" : "text-muted-foreground"}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-px w-8 sm:w-16 -mt-5 transition-colors duration-300 ${step > s.n ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form Wizard Container */}
          <div className="relative overflow-hidden mt-8 sm:mt-10 max-w-xl mx-auto p-6 sm:p-8 md:p-9 rounded-3xl bg-card/50 border border-border backdrop-blur-md shadow-2xl text-left">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold tracking-tight mb-6">Paso 1: Datos de Contacto</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Nombre Completo</label>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ingresa tu nombre"
                          className="w-full bg-background border border-border rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Email Corporativo</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="nombre@empresa.com"
                          className="w-full bg-background border border-border rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">WhatsApp</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-muted-foreground" />
                        <input
                          type="tel"
                          required
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          placeholder="+34 600 000 000"
                          className="w-full bg-background border border-border rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={!formData.name || !formData.email || !formData.whatsapp}
                    onClick={nextStep}
                    className="mt-8 flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl hover:bg-primary/95 shadow-md shadow-primary/10 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    Siguiente Paso
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold tracking-tight mb-6">Paso 2: Calificación Comercial</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3">Rango de Facturación Mensual</label>
                      <div className="grid grid-cols-1 gap-2.5">
                        {[
                          { id: "bajo-10k", text: "Menos de $10,000 USD / mes" },
                          { id: "10k-30k", text: "Entre $10,000 y $30,000 USD / mes" },
                          { id: "30k-100k", text: "Entre $30,000 y $100,000 USD / mes (Escala)" },
                          { id: "alto-100k", text: "Más de $100,000 USD / mes (Empresarial)" },
                        ].map((item) => (
                          <label
                            key={item.id}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                              formData.revenue === item.id
                                ? "bg-primary/5 border-primary text-foreground"
                                : "bg-background border-border text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <input
                              type="radio"
                              name="revenue"
                              value={item.id}
                              checked={formData.revenue === item.id}
                              onChange={() => setFormData({ ...formData, revenue: item.id })}
                              className="accent-primary"
                            />
                            <span className="text-sm font-medium">{item.text}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Servicio de Interés Principal</label>
                      <select
                        value={formData.serviceOfInterest}
                        onChange={(e) => setFormData({ ...formData, serviceOfInterest: e.target.value })}
                        className="w-full bg-background border border-border rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                      >
                        <option value="crm">CRM & Automatización (AD Media CRM)</option>
                        <option value="marketing-ads">Meta & Google Ads</option>
                        <option value="social-media">Redes Sociales & Contenido</option>
                        <option value="web-development">Desarrollo Web / E-commerce</option>
                        <option value="maintenance">Soporte y Mantenimiento</option>
                        <option value="production">Producción Audiovisual</option>
                      </select>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="action-secondary flex-1 rounded-xl py-3.5 text-center font-semibold transition-colors cursor-pointer"
                      >
                        Atrás
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-2 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 shadow-md shadow-primary/10 transition-all cursor-pointer text-center disabled:opacity-50"
                      >
                        {isSubmitting ? "Conectando con el CRM..." : "Agendar Consulta"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative text-center py-6"
                >
                  {/* Ráfaga celebratoria detrás del check */}
                  <MetricBurst intensity="medium" density="mid" />
                  <CheckCircle2 className="relative z-10 w-16 h-16 text-primary mx-auto mb-6 shrink-0" />
                  <h3 className="relative z-10 text-2xl font-black tracking-tight mb-3">¡Consulta Solicitada Exitosamente!</h3>
                  <p className="relative z-10 text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed mb-6">
                    Hola <strong>{formData.name}</strong>, tu solicitud estratégica de consulta gratuita ha sido registrada. Nuestro equipo se pondrá en contacto contigo a través de WhatsApp (<strong>{formData.whatsapp}</strong>) para agendar la fecha y hora final.
                  </p>
                  <Link
                    href="/"
                    className="relative z-10 inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-primary/95 shadow-md transition-all cursor-pointer"
                  >
                    Volver a Inicio
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <FooterContact />
      <IslandBar />
    </main>
  );
}
