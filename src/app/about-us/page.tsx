"use client";

import { useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import FooterContact from "@/components/sections/FooterContact";
import IslandBar from "@/components/layout/IslandBar";
import { Award, Target, Landmark, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform, Variants, MotionValue, useMotionValueEvent, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import GrowthSchematic from "@/components/ui/GrowthSchematic";
import VideoBackground from "@/components/ui/VideoBackground";

// ============================================================
// Types & Structures
// ============================================================
interface MilestoneItem {
  year: string;
  title: string;
  description: string;
  officeTitle: string;
  officeDesc: string;
  imageUrl: string;
  videoUrl?: string;
  posterUrl?: string;
  icon: LucideIcon;
}

// ============================================================
// About Us Page — High Fidelity Scrollytelling
// ============================================================
export default function AboutUsPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Track scroll on the scrollytelling container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const w = typeof window !== "undefined" ? window.innerWidth : 1920;
    const h = typeof window !== "undefined" ? window.innerHeight : 1080;
    mouseX.set(clientX - w / 2);
    mouseY.set(clientY - h / 2);
  };

  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 22 });

  // Parallax displacements for background depth
  const schematicTiltX = useTransform(smoothX, [-960, 960], [-25, 25]);
  const schematicTiltY = useTransform(smoothY, [-540, 540], [-25, 25]);

  // Monitor scrollYProgress to update the active slide index dynamically
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 6 zones: Intro (0), 2016 (1), 2019 (2), 2022 (3), 2026 (4), 2027+ (5)
    if (latest < 0.15) {
      setActiveIndex(0);
    } else if (latest < 0.32) {
      setActiveIndex(1);
    } else if (latest < 0.49) {
      setActiveIndex(2);
    } else if (latest < 0.66) {
      setActiveIndex(3);
    } else if (latest < 0.83) {
      setActiveIndex(4);
    } else {
      setActiveIndex(5);
    }
  });

  // Interpolate vertical scroll into slides translation (6 slides total = Intro + 5 Milestones)
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "-500vh"]);

  const milestones: MilestoneItem[] = [
    {
      year: "2016",
      title: "El inicio, en solitario",
      description: "Hace 10 años, Danger Fernández empezó solo: desde su habitación, con una portátil y un teléfono, dándole dirección de marketing y ventas a comercios locales. Esa fue la semilla de AD Media.",
      officeTitle: "El inicio (2016)",
      officeDesc: "Danger, solo, desde casa.",
      imageUrl: "/about-us/bedroom_start_2016.png",
      icon: Award,
    },
    {
      year: "2019",
      title: "La Primera Oficina",
      description: "El incremento en la cartera de clientes y la necesidad de integrar especialistas en diseño gráfico y pauta publicitaria motivan el traslado a un espacio físico. Nos mudamos a una oficina compartida y estructuramos los primeros flujos comerciales.",
      officeTitle: "Primera Oficina (2019)",
      officeDesc: "Primera sede. Especialistas en diseño y pauta.",
      imageUrl: "/about-us/first_office_2019.png",
      icon: Landmark,
    },
    {
      year: "2022",
      title: "Segunda Oficina y Escala",
      description: "Superamos la marca de 50 clientes recurrentes y consolidamos el equipo de producción. Nos trasladamos a una oficina independiente más amplia, equipada para edición de video y desarrollo front-end de landing pages de alta conversión.",
      officeTitle: "Segunda Oficina (2022)",
      officeDesc: "Sede más amplia. Departamento de edición y desarrollo web.",
      imageUrl: "/about-us/scale_studio_2022.png",
      icon: Target,
    },
    {
      year: "2026",
      title: "Oficinas Actuales & AD Media CRM",
      description: "Establecidos en nuestras oficinas modernas actuales de alto rendimiento. Hoy, nuestro equipo multidisciplinar da soporte de dirección de marketing y ventas a empresas en todo el mercado hispano mediante CRM a medida, Meta/Google Ads y producción cinematográfica.",
      officeTitle: "Oficinas Actuales (2026)",
      officeDesc: "Oficinas con sala de grabación y desarrollo.",
      imageUrl: "/about-us/modern_headquarters_2026.png",
      icon: ShieldCheck,
    },
    {
      year: "2027+",
      title: "Futuro e Integración Exponencial",
      description: "Lo mejor está por venir. Sumamos nuevos profesionales y tecnologías de vanguardia para multiplicar cada año lo logrado en la última década.",
      officeTitle: "Futuro & Expansión",
      officeDesc: "Nuevas integraciones, IA y desarrollo de valor.",
      imageUrl: "/about-us/future_expansion_2027.png",
      videoUrl: "/videos/about-future-integration-2027.mp4",
      posterUrl: "/videos/about-future-integration-2027-poster.jpg",
      icon: Sparkles,
    },
  ];

  // Motion animation variants (Snappy staggered reveals)
  const cardVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 14 },
    },
  };

  const photoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 12 },
    },
  };

  return (
    <main 
      onMouseMove={handleMouseMove}
      className="bg-background min-h-screen relative text-foreground"
    >
      <Navbar />

      {/* Vertical Timeline Track Container (Scrollable height = 500vh) */}
      <div ref={targetRef} className="relative h-[500vh] bg-background">
        
        {/* Sticky Window Container (Fixed viewport h-screen) */}
        <div className="sticky top-0 h-screen w-screen overflow-hidden flex items-center bg-background z-10">
          
          {/* Background Growth Schematic Map — Cursor Parallax Depth */}
          <motion.div
            style={{
              x: schematicTiltX,
              y: schematicTiltY,
            }}
            className="absolute inset-0 pointer-events-none transform-gpu z-0"
          >
            <GrowthSchematic scrollYProgress={scrollYProgress} activeIndex={activeIndex} />
          </motion.div>

          {/* Vertical Slides Track */}
          <motion.div style={{ y }} className="flex flex-col h-full w-full">
            
            {/* Slide 0: Massive Intro Slide */}
            <div className="w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center px-6 text-center relative select-none">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-accent-light/5 pointer-events-none" />
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
              
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl relative z-10"
              >
                <span className="text-primary text-xs sm:text-sm font-bold tracking-wider uppercase px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                  AD Media Trayectoria
                </span>
                <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-8xl font-black mt-5 sm:mt-7 tracking-tight leading-tight sm:leading-none text-foreground">
                  10 Años de Evolución e <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-light pl-1 pr-2 box-decoration-clone">
                    Impacto Comercial
                  </span>
                </h1>
                <p className="text-muted-foreground text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed font-light">
                  Desde que Danger empezó solo hace 10 años hasta hoy: le damos dirección de marketing y ventas a empresas que quieren facturar más.
                </p>
                <div className="mt-8 sm:mt-10 flex justify-center items-center gap-2.5 text-primary font-bold animate-pulse text-xs sm:text-sm">
                  <span>Desliza hacia abajo para comenzar</span>
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
              </motion.div>
            </div>

            {/* Slides 1 to 4: Full Screen Milestones with Parallax Illustrations */}
            {milestones.map((item, idx) => (
              <MilestoneSlide
                key={item.year}
                item={item}
                idx={idx}
                scrollYProgress={scrollYProgress}
                cardVariants={cardVariants}
                textVariants={textVariants}
                photoVariants={photoVariants}
                totalCount={milestones.length}
                activeIndex={activeIndex}
              />
            ))}

          </motion.div>
        </div>
      </div>

      {/* HUD Navigation Overlay (Desktop only) */}
      <div className="fixed right-10 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6 items-center">
        {/* Progress Line */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-white/10 rounded-full z-0">
          <motion.div 
            className="w-full bg-gradient-to-b from-primary to-accent-light rounded-full origin-top"
            style={{ 
              height: useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]),
            }}
          />
        </div>

        {/* HUD dot indicators */}
        {[
          { year: "Inicio", index: 0 },
          { year: "2016", index: 1 },
          { year: "2019", index: 2 },
          { year: "2022", index: 3 },
          { year: "2026", index: 4 },
          { year: "2027+", index: 5 }
        ].map((item) => {
          const isActive = activeIndex === item.index;
          return (
            <button
              key={item.index}
              onClick={() => {
                if (targetRef.current) {
                  const elementTop = targetRef.current.offsetTop;
                  window.scrollTo({
                    top: elementTop + (item.index * window.innerHeight),
                    behavior: "smooth"
                  });
                }
              }}
              className="relative flex items-center justify-center group focus:outline-none z-10 size-6"
            >
              {/* Hover Label */}
              <span className={`absolute right-8 text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-300 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${isActive ? "text-primary opacity-100 translate-x-0 font-extrabold" : "text-muted-foreground"}`}>
                {item.year}
              </span>
              
              {/* Indicator Dot */}
              <motion.div 
                animate={{
                  scale: isActive ? 1.5 : 1,
                  backgroundColor: isActive ? "#488EFF" : "rgba(255,255,255,0.15)",
                  borderColor: isActive ? "#81E7FF" : "rgba(255,255,255,0.2)",
                  boxShadow: isActive 
                    ? "0 0 15px rgba(72,142,255,0.6)" 
                    : "0 0 0px rgba(0,0,0,0)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="size-3 rounded-full border transition-colors duration-300"
              />
            </button>
          );
        })}
      </div>

      {/* Footer Contact renders statically below the sticky track */}
      <div className="relative z-20 bg-background">
        <FooterContact />
      </div>
      
      <IslandBar />
    </main>
  );
}

// ============================================================
// Slide Sub-component — Interactive Parallax Page
// ============================================================
interface MilestoneSlideProps {
  item: MilestoneItem;
  idx: number;
  scrollYProgress: MotionValue<number>;
  cardVariants: Variants;
  textVariants: Variants;
  photoVariants: Variants;
  totalCount: number;
  activeIndex: number;
}

function MilestoneSlide({
  item,
  idx,
  scrollYProgress,
  cardVariants,
  textVariants,
  photoVariants,
  totalCount,
  activeIndex,
}: MilestoneSlideProps) {
  const Icon = item.icon;
  const slideIdx = idx + 1;
  const isActive = activeIndex === slideIdx;
  
  // Parallax Y offset for the milestone image, shifting internally on scroll
  const yParallax = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      className="w-screen h-screen flex-shrink-0 flex flex-col lg:flex-row items-center justify-center p-5 sm:p-10 lg:p-20 relative overflow-hidden bg-transparent"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Narrative Details Column */}
      <div className={`w-full lg:w-[45vw] flex flex-col justify-center text-left z-20 ${
        idx % 2 === 0 
          ? "lg:pr-16 lg:order-1" 
          : "lg:pl-16 lg:order-2"
      }`}>
        <motion.span
          variants={textVariants}
          className="text-5xl sm:text-7xl lg:text-9xl font-mono font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-accent-light tracking-tighter leading-none select-none block mb-2 filter drop-shadow-[0_0_15px_rgba(72,142,255,0.35)]"
        >
          {item.year}
        </motion.span>
        
        <motion.h2
          variants={textVariants}
          className="text-xl sm:text-4xl lg:text-5xl font-display-heavy mt-2 text-foreground leading-tight"
        >
          {item.title}
        </motion.h2>

        <motion.p
          variants={textVariants}
          className="text-muted-foreground text-xs sm:text-sm lg:text-base mt-3 sm:mt-5 leading-relaxed max-w-xl font-light"
        >
          {item.description}
        </motion.p>

        {/* Small location details badge */}
        <motion.div 
          variants={textVariants}
          className="mt-4 sm:mt-5 flex items-center gap-3 px-4 py-2 rounded-xl bg-card border border-primary/20 w-fit backdrop-blur-sm shadow-md"
        >
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary">
            <Icon className="w-4 h-4 sm:w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] sm:text-xs text-foreground font-bold tracking-wide">
              {item.officeTitle}
            </p>
            <p className="text-[9px] sm:text-[10px] text-accent-light uppercase tracking-wider font-semibold mt-0.5">
              {item.officeDesc}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Visual Showcase Column (Full-Screen Aspect Card) */}
      <motion.div
        variants={photoVariants}
        className={`w-full lg:w-[45vw] h-[23vh] sm:h-[34vh] lg:h-[58vh] flex-shrink-0 rounded-3xl border border-primary/15 bg-card/30 backdrop-blur-md overflow-hidden relative shadow-2xl flex items-center justify-center mt-5 lg:mt-0 group ${
          idx % 2 === 0 
            ? "lg:order-2" 
            : "lg:order-1"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-light/5 z-10 pointer-events-none" />
        
        {/* Parallax Image container */}
        <motion.div 
          style={{ y: yParallax }} 
          className="absolute -inset-y-12 inset-x-0 w-full h-[calc(100%+96px)] select-none pointer-events-none"
        >
          {item.videoUrl && item.posterUrl ? (
            <VideoBackground
              src={item.videoUrl}
              poster={item.posterUrl}
              className="h-full w-full"
              posterClassName="opacity-85 transition-transform duration-700 group-hover:scale-105"
              videoClassName="opacity-85 transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority={idx === 0}
            />
          )}
        </motion.div>

        {/* Technical bottom overlay tag */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/80 border border-white/5 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
            HITO_0{idx + 1} / 0{totalCount}
          </span>
        </div>
      </motion.div>

    </motion.div>
  );
}
