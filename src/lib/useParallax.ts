"use client";

import { useRef, useMemo } from "react";
import {
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";

type UseScrollOptions = NonNullable<Parameters<typeof useScroll>[0]>;

// ============================================================
// Parallax Hook System — AD Media Solution
// Centralized scroll-linked animation utilities
// ============================================================

/**
 * Returns a smoothed scrollYProgress [0..1] for a specific section ref.
 * Uses Framer Motion's useScroll with configurable offsets.
 */
export function useSectionProgress(
    ref: React.RefObject<HTMLElement | null>,
    offset: UseScrollOptions["offset"] = ["start end", "end start"]
) {
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: offset,
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 30,
        restDelta: 0.001,
    });

    return { scrollYProgress, smoothProgress };
}

/**
 * Creates a parallax offset MotionValue based on scroll progress.
 * @param progress - MotionValue from useSectionProgress
 * @param speed - Multiplier. Positive = moves up faster, Negative = moves down.
 * @param range - Output range in pixels or percentage string
 */
export function useParallaxLayer(
    progress: MotionValue<number>,
    speed: number = 1,
    unit: "px" | "%" = "%"
) {
    const distance = speed * 30; // Base distance multiplied by speed
    const percentY = useTransform(progress, [0, 1], [`0%`, `${distance}%`]);
    const pixelY = useTransform(progress, [0, 1], [0, distance]);

    return unit === "%" ? percentY : pixelY;
}

/**
 * Creates opacity MotionValue with configurable fade-in and fade-out thresholds.
 * @param progress - MotionValue [0..1]
 * @param fadeIn - [start, end] thresholds for fading in (0-1)
 * @param fadeOut - [start, end] thresholds for fading out (0-1)
 */
export function useOpacityFade(
    progress: MotionValue<number>,
    fadeIn: [number, number] = [0, 0.2],
    fadeOut: [number, number] = [0.8, 1]
) {
    return useTransform(
        progress,
        [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]],
        [0, 1, 1, 0]
    );
}

/**
 * Creates a scale MotionValue linked to scroll progress.
 * @param progress - MotionValue [0..1]
 * @param scaleRange - [start, end] scale values
 * @param activeRange - [startThreshold, endThreshold] of progress where scale happens
 */
export function useScrollScale(
    progress: MotionValue<number>,
    scaleRange: [number, number] = [0.95, 1],
    activeRange: [number, number] = [0, 0.3]
) {
    return useTransform(
        progress,
        [activeRange[0], activeRange[1]],
        [scaleRange[0], scaleRange[1]]
    );
}

/**
 * Creates a blur MotionValue linked to scroll progress.
 * Returns a string like "blur(0px)" to "blur(10px)"
 */
export function useScrollBlur(
    progress: MotionValue<number>,
    maxBlur: number = 10,
    range: [number, number] = [0.6, 1]
) {
    return useTransform(progress, [range[0], range[1]], [0, maxBlur]);
}

/**
 * Returns an array of threshold-based booleans for sequential reveal.
 * Each item "unlocks" at a specific scroll threshold.
 * @param progress - MotionValue [0..1]
 * @param count - Number of items to chain
 * @param startAt - Progress value where first item starts revealing
 * @param spacing - Progress gap between each item reveal
 */
export function useRevealThresholds(
    count: number,
    startAt: number = 0.1,
    spacing: number = 0.1
) {
    return useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            threshold: startAt + i * spacing,
            delay: i * 0.08, // stagger delay for animation
        }));
    }, [count, startAt, spacing]);
}

/**
 * Convenience hook that sets up a complete section parallax system.
 * Returns ref + all the motion values needed for a section.
 */
export function useFullSectionParallax(config?: {
    bgSpeed?: number;
    contentSpeed?: number;
    fadeIn?: [number, number];
    fadeOut?: [number, number];
}) {
    const {
        bgSpeed = 0.3,
        contentSpeed = 0.5,
        fadeIn = [0, 0.15],
        fadeOut = [0.85, 1],
    } = config || {};

    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress, smoothProgress } = useSectionProgress(ref);

    const bgY = useParallaxLayer(scrollYProgress, bgSpeed);
    const contentY = useParallaxLayer(scrollYProgress, contentSpeed);
    const opacity = useOpacityFade(scrollYProgress, fadeIn, fadeOut);
    const scale = useScrollScale(scrollYProgress);

    return {
        ref,
        scrollYProgress,
        smoothProgress,
        bgY,
        contentY,
        opacity,
        scale,
    };
}
