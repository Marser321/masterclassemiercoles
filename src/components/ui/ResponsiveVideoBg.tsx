"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
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

    // Prioriza la carga del póster (solo para el hero above-the-fold: es el LCP)
    posterPriority?: boolean;

    className?: string;
    posterClassName?: string;
    videoClassName?: string;
    mobilePosterClassName?: string;
    desktopPosterClassName?: string;
    mobileVideoClassName?: string;
    desktopVideoClassName?: string;
    children?: ReactNode;
}

const subscribeToHydration = () => () => {};
const getHydratedSnapshot = () => true;
const getServerHydratedSnapshot = () => false;

export default function ResponsiveVideoBg({
    mobileWebmSrc,
    mobileMp4Src,
    mobilePoster,
    desktopWebmSrc,
    desktopMp4Src,
    desktopPoster,
    breakpoint = 1024,
    posterPriority = false,
    className,
    posterClassName,
    videoClassName,
    mobilePosterClassName,
    desktopPosterClassName,
    mobileVideoClassName,
    desktopVideoClassName,
    children,
}: ResponsiveVideoBgProps) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        getHydratedSnapshot,
        getServerHydratedSnapshot,
    );
    const isDesktop = useMediaQuery(`(min-width: ${breakpoint}px)`);
    const shouldReduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

    const [playingSource, setPlayingSource] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Obtener los assets correspondientes al viewport actual
    const currentPoster = isDesktop ? (desktopPoster || mobilePoster) : mobilePoster;
    const currentWebm = isDesktop ? desktopWebmSrc : mobileWebmSrc;
    const currentMp4 = isDesktop ? desktopMp4Src : mobileMp4Src;
    const currentSourceKey = `${isDesktop ? "desktop" : "mobile"}-${currentMp4 || currentWebm}`;
    const canPlayVideo = hasHydrated && Boolean(currentMp4 || currentWebm) && !shouldReduceMotion;
    const videoPlaying = playingSource === currentSourceKey;

    // Pausa el video cuando sale del viewport
    useVideoInView(videoRef, canPlayVideo);

    return (
        <div
            className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
            aria-hidden="true"
        >
            {/* Capa estática de póster (next/image: AVIF/WebP + preload scanner → mejora LCP) */}
            <div
                className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    posterClassName,
                )}
                style={{ opacity: videoPlaying ? 0 : undefined }}
            >
                <Image
                    src={currentPoster}
                    alt=""
                    fill
                    sizes="100vw"
                    quality={75}
                    priority={posterPriority}
                    className={cn(
                        "object-cover object-center",
                        isDesktop ? desktopPosterClassName : mobilePosterClassName,
                    )}
                />
            </div>

            {/* Capa de video (solo se monta si se puede reproducir en este breakpoint) */}
            {canPlayVideo && (currentWebm || currentMp4) && (
                <video
                    key={currentSourceKey}
                    ref={videoRef}
                    className={cn(
                        "absolute inset-0 h-full w-full object-cover",
                        videoClassName,
                        isDesktop ? desktopVideoClassName : mobileVideoClassName,
                    )}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={currentPoster}
                    aria-hidden="true"
                    onPlaying={() => setPlayingSource(currentSourceKey)}
                >
                    {currentMp4 && <source src={currentMp4} type="video/mp4" />}
                    {currentWebm && <source src={currentWebm} type="video/webm" />}
                </video>
            )}
            {children}
        </div>
    );
}
