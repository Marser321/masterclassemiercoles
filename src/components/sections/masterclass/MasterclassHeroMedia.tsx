"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { VISUALS, type VisualId } from "@/lib/data/masterclassCopy";
import MasterclassBanner from "./MasterclassBanner";

const BANNER_HOLD_MS = 30_000;

type MediaPhase = "video" | "banner";

interface MasterclassHeroMediaProps {
  visual: VisualId;
  orientation: "horizontal" | "vertical";
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function MasterclassHeroMedia({
  visual,
  orientation,
  className = "",
  priority = false,
  sizes,
}: MasterclassHeroMediaProps) {
  const reduceMotion = useReducedMotion();
  const shouldReduceMotion = reduceMotion === true;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<MediaPhase>("video");
  const [videoFailed, setVideoFailed] = useState(false);
  const video = VISUALS[visual].motionVideo;
  const showVideo = phase === "video" && !shouldReduceMotion && !videoFailed;

  useEffect(() => {
    if (phase !== "banner" || shouldReduceMotion || videoFailed) return;

    const timeout = window.setTimeout(() => {
      setPhase("video");
    }, BANNER_HOLD_MS);

    return () => window.clearTimeout(timeout);
  }, [phase, shouldReduceMotion, videoFailed, visual]);

  useEffect(() => {
    if (!showVideo) return;

    const element = videoRef.current;
    if (!element) return;

    element.currentTime = 0;
    const playPromise = element.play();
    if (playPromise) {
      playPromise.catch(() => {
        setPhase("banner");
      });
    }
  }, [showVideo, visual]);

  return (
    <div
      data-masterclass-hero-media={orientation}
      data-masterclass-media-phase={showVideo ? "video" : "banner"}
      className={`relative ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {showVideo ? (
          <motion.div
            key={`video-${visual}-${orientation}`}
            initial={{ opacity: 0, y: 10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-video w-full overflow-hidden rounded-2xl border border-primary/20 bg-black shadow-[0_22px_70px_-28px_rgba(0,102,255,0.58)]"
          >
            <video
              key={video.src}
              ref={videoRef}
              data-masterclass-motion-video={visual}
              className="h-full w-full object-cover"
              width={video.width}
              height={video.height}
              muted
              playsInline
              autoPlay
              preload="metadata"
              onEnded={() => setPhase("banner")}
              onError={() => {
                setVideoFailed(true);
                setPhase("banner");
              }}
            >
              <source src={video.src} type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_24%,transparent_72%,rgba(0,102,255,0.18))]" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </motion.div>
        ) : (
          <motion.div
            key={`banner-${visual}-${orientation}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.99 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <MasterclassBanner
              visual={visual}
              orientation={orientation}
              priority={priority}
              sizes={sizes}
              className="w-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
