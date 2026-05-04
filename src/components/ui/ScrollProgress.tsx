"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// ============================================================
// ScrollProgress — Global thin progress bar at the top
// ============================================================
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    
    // Smooth the progress to feel more fluid
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Hide at the very top (Hero section)
    const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

    // Position of the glowing dot
    const dotLeft = useTransform(scaleX, (v) => `calc(${v * 100}% - 2px)`);

    return (
        <motion.div
            style={{ opacity }}
            className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none"
        >
            {/* The progress bar */}
            <motion.div
                className="absolute top-0 left-0 bottom-0 w-full bg-gradient-to-r from-accent-blue to-accent-light origin-left"
                style={{ scaleX }}
            />
            
            {/* The glowing dot at the edge */}
            <motion.div 
                className="absolute top-1/2 -translate-y-1/2 w-[4px] h-[4px] bg-white rounded-full shadow-[0_0_10px_rgba(129,231,255,1)]"
                style={{ 
                    left: dotLeft,
                }}
            />
        </motion.div>
    );
}
