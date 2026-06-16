"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Retardo de entrada (para escalonar varios Reveal). */
  delay?: number;
  /** Desplazamiento inicial en Y (px). */
  y?: number;
}

/**
 * Reveal — animación sutil de LLEGADA y SALIDA de textos.
 * Entra al aparecer en viewport y se desvanece al salir (once:false).
 * Respeta `prefers-reduced-motion` (sin animación).
 */
export default function Reveal({ children, className = "", delay = 0, y = 16 }: RevealProps) {
  const reduce = useHydratedReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: { opacity: 0, y, transition: { duration: 0.4, ease: "easeOut" } },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
