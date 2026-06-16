"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UserCheck } from "lucide-react";
import { COPIES, type CopyId } from "@/lib/data/masterclassCopy";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";

interface GhostRegistrationNotificationsProps {
  copy: CopyId;
  isModalOpen: boolean;
}

const FALLBACK_NAMES = ["Maria R.", "Carlos M.", "Andrea P.", "Luis G."];
const CYCLE_DELAYS = [9_000, 11_500, 13_500, 10_000, 12_500];
const INITIAL_DELAY = 4_500;
const VISIBLE_MS = 4_600;

export default function GhostRegistrationNotifications({
  copy,
  isModalOpen,
}: GhostRegistrationNotificationsProps) {
  const reduce = useHydratedReducedMotion();
  const activity = COPIES[copy].ghostActivity;
  const names = activity?.names?.length ? activity.names : FALLBACK_NAMES;
  const message = activity?.message ?? "se registró a la masterclass del miércoles.";
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isModalOpen || visible) return;

    const delay = reduce ? 18_000 : index === 0 ? INITIAL_DELAY : CYCLE_DELAYS[index % CYCLE_DELAYS.length];
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [index, isModalOpen, reduce, visible]);

  useEffect(() => {
    if (!visible || isModalOpen) return;

    const timer = window.setTimeout(
      () => {
        setVisible(false);
        setIndex((current) => (current + 1) % names.length);
      },
      reduce ? 6_200 : VISIBLE_MS,
    );

    return () => window.clearTimeout(timer);
  }, [isModalOpen, names.length, reduce, visible]);

  if (isModalOpen) return null;

  const currentName = names[index % names.length];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-[5.35rem] left-3 right-3 z-40 sm:bottom-24 sm:left-5 sm:right-auto sm:w-[22rem] xl:bottom-6"
    >
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={`${copy}-${index}`}
            data-masterclass-ghost-registration
            initial={reduce ? false : { opacity: 0, x: -14, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -10, y: 8, scale: 0.98 }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="relative ml-auto max-w-[22rem] overflow-hidden rounded-2xl border border-primary/18 bg-background/86 p-3 shadow-[0_18px_55px_-28px_rgba(0,102,255,0.65)] backdrop-blur-xl sm:ml-0"
          >
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.09),transparent_32%,rgba(0,102,255,0.08)_100%)]" />
            <div className="relative flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary shadow-[0_0_22px_rgba(0,102,255,0.16)]">
                <UserCheck className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-black text-foreground font-mc-display">
                  {currentName}
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{message}</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
