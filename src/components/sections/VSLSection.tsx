"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Play, Volume2, VolumeX, ShieldCheck, Calendar, Activity, Loader2, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

// ============================================================
// Subtitles timed data matching CEO VSL Script
// ============================================================
const SUBTITLES = [
    { text: "Si tienes una empresa de trámites migratorios y quieres escalar tus ventas...", duration: 4000 },
    { text: "...hemos ayudado a muchas como la tuya y esto es lo que tienen que decir de nosotros.", duration: 4000 },
    { text: "Y la manera en que lo hemos hecho te lo voy a enseñar en mi próxima Masterclass.", duration: 4000 },
    { text: "Vas a aprender cómo traer clientes potenciales de calidad, cerrar más ventas...", duration: 4000 },
    { text: "...y entregar tus procesos de forma automática y todo con un CRM de trámites migratorios.", duration: 4500 },
    { text: "Haz clic en el botón de abajo y reserva tu lugar, los cupos son limitados, nos vemos dentro.", duration: 4500 }
];

export default function VSLSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const bufferTimerRef = useRef<number | null>(null);
    const router = useRouter();

    const [isPlaying, setIsPlaying] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [subtitleIndex, setSubtitleIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [30, -30]);

    const clearBufferTimer = () => {
        if (!bufferTimerRef.current) return;
        window.clearTimeout(bufferTimerRef.current);
        bufferTimerRef.current = null;
    };

    const resetPlayback = () => {
        clearBufferTimer();
        setIsPlaying(false);
        setIsBuffering(false);
        setProgress(0);
        setSubtitleIndex(0);
    };

    // Handle play state with simulated buffering
    const handlePlayClick = () => {
        if (isPlaying || isBuffering) {
            resetPlayback();
        } else {
            setIsBuffering(true);
            bufferTimerRef.current = window.setTimeout(() => {
                setIsBuffering(false);
                setIsPlaying(true);
            }, 1200);
        }
    };

    useEffect(() => {
        return () => clearBufferTimer();
    }, []);

    // Subtitle sequence looping & progress bar simulation
    useEffect(() => {
        if (!isPlaying) return;

        const progressInterval = window.setInterval(() => {
            setProgress((prev) => {
                const nextProgress = prev + 0.5;
                if (nextProgress >= 100) {
                    setIsPlaying(false);
                    setSubtitleIndex(0);
                    return 0;
                }
                return nextProgress;
            });
        }, 120);

        const subtitleTimer = window.setTimeout(() => {
            setSubtitleIndex((prev) => (
                prev < SUBTITLES.length - 1 ? prev + 1 : 0
            ));
        }, SUBTITLES[subtitleIndex].duration);

        return () => {
            window.clearTimeout(subtitleTimer);
            window.clearInterval(progressInterval);
        };
    }, [isPlaying, subtitleIndex]);

    return (
        <section
            ref={sectionRef}
            id="vsl-masterclass"
            className="relative py-14 sm:py-32 px-5 sm:px-6 bg-background overflow-hidden"
        >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="texture-grid opacity-[0.02]" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            </div>

            {/* Divisor superior */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 items-center">
                
                {/* Left Column: CTA & Copywriting */}
                <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 backdrop-blur-md mx-auto lg:mx-0 w-fit">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-35"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-bold font-mono text-primary uppercase tracking-[0.2em]">
                                Masterclass Exclusiva
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display-heavy leading-[1.1] text-foreground tracking-tight">
                            Cómo traer clientes de calidad y escalar tu negocio de <span className="text-primary italic">trámites migratorios</span>
                        </h2>

                        {/* Description */}
                        <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Te enseñamos la arquitectura de embudo y el CRM de trámites migratorios exacto que utilizamos para automatizar el seguimiento, cerrar más ventas y eliminar el caos operativo de tu negocio.
                        </p>

                        {/* Masterclass CTA Button */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-2">
                            <Button
                                variant="primary"
                                size="lg"
                                glow
                                aurora={false}
                                shimmer={false}
                                pulse={false}
                                onClick={() => router.push("/planificacion")}
                                className="group w-full sm:w-auto px-10 h-16 sm:h-18"
                            >
                                <span className="flex items-center justify-center gap-3 font-bold tracking-wide">
                                    RESERVAR MI LUGAR GRATIS
                                    <Calendar className="size-5 text-primary-foreground group-hover:scale-110 transition-transform" />
                                </span>
                            </Button>
                        </div>

                        {/* Bullet Metrics */}
                        <div className="grid grid-cols-2 gap-4 max-w-sm pt-6 border-t border-border/60 mx-auto lg:mx-0">
                            <div className="flex items-center gap-2.5 text-xs text-muted-foreground font-medium">
                                <ShieldCheck className="size-4.5 text-primary" />
                                <span>Cupos limitados</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-muted-foreground font-medium">
                                <Sparkles className="size-4.5 text-accent-light" />
                                <span>Acceso 100% gratuito</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: High Fidelity Cinematic VSL Video Player Mockup */}
                <motion.div
                    style={{ y: yParallax }}
                    className="lg:col-span-6 w-full max-w-2xl mx-auto will-change-transform"
                >
                    <div 
                        onClick={handlePlayClick}
                        className="relative aspect-video w-full rounded-3xl glass-premium border border-primary/20 shadow-2xl overflow-hidden group cursor-pointer"
                    >
                        {/* Video Mockup Background (Abstract Dark Gradient and grid center) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#030c24] to-slate-950 flex items-center justify-center z-0 select-none">
                            <div className="absolute inset-0 texture-grid opacity-[0.04]" />
                            <div className="absolute size-96 bg-primary/10 blur-[80px] rounded-full" />
                            
                            {/* Inner abstract branding layout simulating video source */}
                            {!isPlaying && !isBuffering && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-950/20 backdrop-blur-[1px]">
                                    <div className="relative w-[140px] h-[39px] opacity-25 group-hover:opacity-40 transition-opacity duration-500">
                                        <Image
                                            src="/brand/logo-full-white.png" 
                                            alt="AD Media Logo Background" 
                                            fill
                                            sizes="140px"
                                            className="object-contain brightness-0 invert"
                                        />
                                    </div>
                                    <p className="text-[10px] font-mono text-primary/40 uppercase tracking-[0.25em] mt-4">
                                        ADM-STREAM-SOURCE_01
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Top Notch bar bar */}
                        <div className="absolute top-4 inset-x-0 flex justify-between px-6 z-30 text-[9px] font-mono text-white/70 pointer-events-none">
                            <span className="flex items-center gap-1.5 bg-slate-950/65 border border-white/5 px-2.5 py-1 rounded-md backdrop-blur-sm">
                                <Activity className="size-3 text-primary" />
                                ADM-VSL-LIVE
                            </span>
                            <span className="flex items-center gap-1.5 bg-slate-950/65 border border-white/5 px-2.5 py-1 rounded-md backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                {isPlaying ? "TRANSMITIENDO" : "STANDBY"}
                            </span>
                        </div>

                        {/* Buffer Loading Spinner Overlay */}
                        <AnimatePresence>
                            {isBuffering && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-40 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center gap-4 text-center"
                                >
                                    <Loader2 className="size-10 text-primary animate-spin" />
                                    <div>
                                        <p className="text-xs font-mono text-primary tracking-widest uppercase">CONECTANDO A REVENUE OS...</p>
                                        <p className="text-[10px] text-muted-foreground/60 mt-1">Estableciendo flujo cifrado de datos</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Central Glowing Play Button */}
                        {!isPlaying && !isBuffering && (
                            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                <div className="w-18 h-18 rounded-full bg-primary/45 border border-primary/60 flex items-center justify-center text-white shadow-2xl backdrop-blur-md group-hover:scale-110 group-hover:bg-primary/60 group-hover:border-primary/80 transition-all duration-300 pointer-events-auto">
                                    <Play className="w-8 h-8 fill-current ml-1" />
                                </div>
                            </div>
                        )}

                        {/* Widescreen Video Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-primary/5 z-10 pointer-events-none" />

                        {/* Subtitles Track Overlay at the bottom */}
                        <AnimatePresence>
                            {isPlaying && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 15 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute bottom-16 inset-x-6 z-30 text-center px-4 py-3 bg-slate-950/75 border border-white/5 backdrop-blur-md rounded-2xl pointer-events-none"
                                >
                                    <p className="text-white text-xs sm:text-sm font-semibold tracking-wide leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                        &ldquo;{SUBTITLES[subtitleIndex].text}&rdquo;
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Bottom Media Controls Bar */}
                        <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-slate-950 to-slate-950/90 border-t border-white/5 flex items-center justify-between px-6 z-30 pointer-events-auto">
                            {/* Play/Pause indicator */}
                            <div className="flex items-center gap-4">
                                <div className="text-white opacity-80 hover:opacity-100 transition-opacity">
                                    <Play className={`size-4 ${isPlaying ? "fill-white" : ""}`} />
                                </div>
                                <span className="text-[10px] font-mono text-muted-foreground select-none">
                                    {isPlaying ? "0:12" : "0:00"} / 8:40
                                </span>
                            </div>

                            {/* Center-aligned Interactive Progress bar */}
                            <div className="flex-1 mx-6 h-1 bg-white/10 rounded-full overflow-hidden relative cursor-pointer hidden sm:block">
                                <div 
                                    className="h-full bg-primary rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            {/* Volume and fullscreen buttons */}
                            <div className="flex items-center gap-4 text-white/70">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                                    className="hover:text-white transition-colors"
                                >
                                    {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                                </button>
                                <span className="text-[9px] font-mono border border-white/20 px-2 py-0.5 rounded uppercase leading-none select-none">
                                    1080P
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Divisor inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </section>
    );
}
