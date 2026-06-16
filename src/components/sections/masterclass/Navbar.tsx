"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { COPIES, VISUALS, type CopyId, type VisualId } from "@/lib/data/masterclassCopy";

interface NavbarProps {
  copy: CopyId;
  visual: VisualId;
}

const BADGE_STYLES = {
  soft: "bg-primary/5 border border-primary/20 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-[0_0_10px_rgba(0,102,255,0.05)]",
  outline:
    "border-2 border-primary text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.08em] px-4 py-1 rounded-full bg-transparent",
  filled:
    "bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,102,255,0.1)]",
} as const;

export default function Navbar({ copy, visual }: NavbarProps) {
  const nav = COPIES[copy].navbar;
  const badgeStyle = VISUALS[visual].navbarBadge;
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`
        relative w-full transition-all duration-300 font-mc-body
        ${scrolled
          ? "py-3 glass-premium bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-lg"
          : "py-5 bg-transparent border-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center group relative">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="transform-gpu"
          >
            {/* White-text logo for dark mode (luxury/classic) */}
            <Image
              src="/brand/logo-full-white.png"
              alt="Ad Media Solution"
              width={160}
              height={45}
              className={`logo-dark-bg relative h-auto object-contain transition-all duration-300 ${scrolled ? "w-28 sm:w-32" : "w-32 sm:w-36"}`}
              priority
            />
            {/* Dark-text logo for light/white themes */}
            <Image
              src="/brand/logo-full.png"
              alt="Ad Media Solution"
              width={160}
              height={45}
              className={`logo-light-bg relative h-auto object-contain transition-all duration-300 ${scrolled ? "w-28 sm:w-32" : "w-32 sm:w-36"}`}
              priority
            />
          </motion.div>
        </Link>

        {/* Badge / Pill */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-[0.15em] text-muted-foreground/60">
            {nav.kicker}
          </span>

          <span className={BADGE_STYLES[badgeStyle]}>{nav.badge}</span>
        </div>
      </div>
    </motion.nav>
  );
}
