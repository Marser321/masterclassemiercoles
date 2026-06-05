"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import { useVideoInView } from "@/lib/useVideoInView";
import { useMediaQuery } from "@/lib/useMediaQuery";

interface ResponsiveVideoBgProps {
    // Recursos para móvil/tablet (vertical)
    mobileWebmSrc?: string;
    mobileMp4Src?: string;
    mobilePoster: string;

    // Recursos para escritorio (horizontal) - opcional
    desktopWebmSrc?: string;
    desktopMp4Src?: string;
    desktopPoster?: string;

    // Breakpoint en píxeles para conmutar a desktop (por defecto 1024px)
    breakpoint?: number;

    className?: string;
    posterClassName?: string;
    videoClassName?: string;
    children?: ReactNode;
}

export default function ResponsiveVideoBg({
    mobileWebmSrc,
    mobileMp4Src,
    mobilePoster,
    desktopWebmSrc,
    desktopMp4Src,
    desktopPoster,
    breakpoint = 1024,
    className,
    posterClassName,
    videoClassName,
    children,
}: ResponsiveVideoBgProps) {
    const isDesktop = useMediaQuery(`(min-width: ${breakpoint}px)`);
    const shouldReduceMotion = useHydratedReducedMotion();

    const [canPlayVideo, setCanPlayVideo] = useState(false);
    const [videoPlaying, setVideoPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Obtener los assets correspondientes al viewport actual
    const currentPoster = isDesktop ? (desktopPoster || mobilePoster) : mobilePoster;
    const currentWebm = isDesktop ? desktopWebmSrc : mobileWebmSrc;
    const currentMp4 = isDesktop ? desktopMp4Src : mobileMp4Src;

    useEffect(() => {
        // Reiniciar estado de reproducción al cambiar de video/viewport
        setVideoPlaying(false);
        
        // Solo reproducimos si no prefiere movimiento reducido y tenemos fuentes de video
        const hasSource = isDesktop
            ? (!!desktopWebmSrc || !!desktopMp4Src)
            : (!!mobileWebmSrc || !!mobileMp4Src);

        setCanPlayVideo(hasSource && !shouldReduceMotion);
    }, [isDesktop, shouldReduceMotion, desktopWebmSrc, desktopMp4Src, mobileWebmSrc, mobileMp4Src]);

    // Pausa el video cuando sale del viewport
    useVideoInView(videoRef, canPlayVideo);

    return (
        <div
            className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
            aria-hidden="true"
        >
            {/* Capa estática de póster */}
            <div
                className={cn(
                    "absolute inset-0 bg-cover bg-center transition-opacity duration-700",
                    posterClassName
                )}
                style={{
                    backgroundImage: `url('${currentPoster}')`,
                    opacity: videoPlaying ? 0 : undefined,
                }}
            />

            {/* Capa de video (solo se monta si se puede reproducir en este breakpoint) */}
            {canPlayVideo && (currentWebm || currentMp4) && (
                <video
                    key={`${isDesktop ? "desktop" : "mobile"}-${currentMp4}`} // Remonta el video al cambiar de viewport
                    ref={videoRef}
                    className={cn(
                        "absolute inset-0 h-full w-full",
                        isDesktop ? "object-cover" : "object-fill",
                        videoClassName
                    )}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={currentPoster}
                    aria-hidden="true"
                    onPlaying={() => setVideoPlaying(true)}
                >
                    {currentWebm && <source src={currentWebm} type="video/webm" />}
                    {currentMp4 && <source src={currentMp4} type="video/mp4" />}
                </video>
            )}
            {children}
        </div>
    );
}
