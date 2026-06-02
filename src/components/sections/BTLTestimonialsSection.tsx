"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, ArrowLeft, ArrowRight, ShieldCheck, Play, Video } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  feedback: string;
  caseLabel: string;
  caseText: string;
  stats: string;
  duration: string;
  thumbnailUrl: string;
}

/* PLACEHOLDER: reemplazar con testimonios reales (nombre, empresa, video vertical
   y métrica verificada). Mantener la estructura para conservar el diseño. */
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Andrés Rodríguez",
    role: "Fundador",
    company: "E-commerce",
    feedback: "Estábamos perdiendo clientes por desorganización. AD Media nos montó un CRM a la medida y nos dio dirección de marketing clara. Pasamos de facturar $25.000 a más de $80.000 al mes en pocos meses.",
    caseLabel: "su CRM personalizado y la automatización de su seguimiento",
    caseText: "Centralizamos a sus clientes, automatizamos el seguimiento y conectamos sus campañas de Meta y Google a un solo sistema.",
    stats: "De $25K a $80K USD/mes",
    duration: "1:45 min",
    thumbnailUrl: "/testimonials/ecommerce_founder.png",
  },
  {
    name: "Mariana Costa",
    role: "Fundadora",
    company: "Salud y bienestar",
    feedback: "La dirección de marketing fue la clave. Nos dijeron exactamente en qué invertir y cuánto regresaba cada dólar. Hoy sabemos qué funciona y lo repetimos.",
    caseLabel: "su dirección de marketing y sus campañas en Meta Ads",
    caseText: "Auditamos su pauta, montamos un embudo con agendamiento de citas y conectamos todo a su CRM.",
    stats: "ROI medible en pauta",
    duration: "1:58 min",
    thumbnailUrl: "/testimonials/wellness_founder.png",
  },
  {
    name: "Javier Méndez",
    role: "Director de operaciones",
    company: "Empresa de servicios",
    feedback: "El soporte es real: respondemos rápido y resolvemos. La automatización del seguimiento nos duplicó los cierres sin contratar más gente.",
    caseLabel: "su soporte continuo y la automatización de su seguimiento",
    caseText: "Diseñamos un CRM a medida con asistentes de calificación y un soporte mensual que mantiene todo funcionando.",
    stats: "Cierres duplicados",
    duration: "2:10 min",
    thumbnailUrl: "/testimonials/ops_director.png",
  },
];

export default function BTLTestimonialsSection() {
  return (
    <section id="testimonios-btl" className="relative py-14 sm:py-32 px-5 sm:px-6 bg-background overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <span className="text-primary text-xs font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
            Testimonios reales · BTL
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-6 tracking-tight max-w-3xl mx-auto leading-tight">
            Negocios reales. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-light">
              Resultados reales.
            </span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mt-4 font-light">
            Esto es BTL: cercano, humano y directo. Mira cómo ayudamos a cada empresa a vender más con CRM, soporte y dirección de marketing.
          </p>
        </div>

        {/* Alternating Testimonials List */}
        <div className="space-y-16 sm:space-y-32">
          {TESTIMONIALS.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <TestimonialRow key={idx} testimonial={item} isEven={isEven} index={idx} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialRow({
  testimonial,
  isEven,
  index,
}: {
  testimonial: Testimonial;
  isEven: boolean;
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  // Parallax elements moving from opposite sides
  const cardX = useTransform(scrollYProgress, [0, 0.45], [isEven ? -80 : 80, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.45], [isEven ? 80 : -80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.22], [0, 1]);

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 items-center justify-between min-h-0 lg:min-h-[40vh]"
    >
      {/* Column: VideoPlayerCard (Testimonial) */}
      <motion.div
        style={{ x: cardX, opacity }}
        className={`lg:col-span-6 flex flex-col justify-center will-change-transform ${
          isEven ? "lg:order-1" : "lg:order-2 lg:pl-8"
        }`}
      >
        <VideoPlayerCard testimonial={testimonial} />
      </motion.div>

      {/* Column: Narrative Case Text */}
      <motion.div
        style={{ x: textX, opacity }}
        className={`lg:col-span-6 flex flex-col justify-center will-change-transform ${
          isEven ? "lg:order-2 lg:pl-8" : "lg:order-1"
        }`}
      >
        <div className="text-left space-y-4 max-w-md mx-auto lg:mx-0">
          <div className="inline-flex items-center gap-1.5 text-accent-light font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            BTL Caso de Estudio 0{index + 1}
          </div>
          
          <h3 className="text-2xl font-black tracking-tight text-foreground leading-snug">
            {isEven ? (
              <ArrowLeft className="inline-block mr-2 w-5 h-5 text-accent-light animate-pulse" />
            ) : (
              <ArrowRight className="inline-block mr-2 w-5 h-5 text-accent-light animate-pulse" />
            )}
            Ayudamos a esta empresa con {testimonial.caseLabel}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed font-light">
            {testimonial.caseText}
          </p>
          
          <div className="pt-2 flex items-center gap-3 text-primary font-bold text-sm">
            <span>{testimonial.stats}</span>
            {!isEven && <ArrowRight className="w-4 h-4 animate-pulse text-accent-light" />}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function VideoPlayerCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative aspect-[9/16] max-w-[270px] w-full mx-auto rounded-3xl bg-card border border-primary/20 shadow-2xl overflow-hidden group backdrop-blur-md hover:border-primary/45 transition-all duration-500 cursor-pointer">
      
      {/* Thumbnail background image */}
      <div className="absolute inset-0 w-full h-full select-none pointer-events-none z-0">
        <Image 
          src={testimonial.thumbnailUrl} 
          alt={`${testimonial.name} Testimonial Video`}
          fill
          className="object-cover opacity-95 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out brightness-[0.95] group-hover:brightness-100"
          sizes="(max-w-768px) 100vw, 270px"
          priority
        />
      </div>

      {/* Top Glass Notch bar */}
      <div className="absolute top-3 inset-x-0 flex justify-between px-4 z-20 text-[9px] font-mono text-white/90">
        <span>ADM-LIVE</span>
        <div className="w-8 h-3 rounded-full bg-slate-950/40 border border-border" />
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          REC
        </span>
      </div>

      {/* Dark video cover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-primary/5 z-10" />

      {/* Ambient background thumbnail glow - Removed opacity to maintain maximum quality */}
      <div className="absolute inset-0 bg-primary/2 opacity-20 pointer-events-none" />

      {/* Glowing Interactive Play Button */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="w-14 h-14 rounded-full bg-primary/45 border border-primary/60 flex items-center justify-center text-white shadow-2xl backdrop-blur-md group-hover:scale-110 transition-transform duration-300">
          <Play className="w-6 h-6 fill-current ml-0.5" />
        </div>
      </div>

      {/* Subtitles Overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-20 text-left bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
        <div className="flex gap-1 mb-2.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" />
          ))}
        </div>

        <p className="text-white text-xs leading-relaxed font-medium italic line-clamp-5">
          &ldquo;{testimonial.feedback}&rdquo;
        </p>

        {/* Video progress indicator */}
        <div className="mt-4 h-1 w-full bg-primary/20 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-primary rounded-full group-hover:w-full transition-all duration-1000 ease-out" />
        </div>

        <div className="mt-4 pt-3.5 border-t border-border flex items-center justify-between">
          <div>
            <h4 className="font-bold text-xs text-white">{testimonial.name}</h4>
            <span className="text-[10px] text-accent-light font-bold block mt-0.5">
              {testimonial.role}, {testimonial.company}
            </span>
          </div>
          <span className="text-[9px] font-mono text-accent-light border border-accent-light/50 px-1.5 py-0.5 rounded flex items-center gap-1 uppercase">
            <Video className="w-2.5 h-2.5" />
            {testimonial.duration}
          </span>
        </div>
      </div>
    </div>
  );
}
