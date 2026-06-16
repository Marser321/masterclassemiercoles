"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../ui/Button";
import { VERSIONS, type MasterclassVersionId } from "@/lib/data/masterclassCopy";
import MasterclassHeroBackground from "./MasterclassHeroBackground";
import MasterclassHeroMedia from "./MasterclassHeroMedia";

interface HeroProps {
  variant: MasterclassVersionId;
  onRegisterClick: () => void;
  backgroundPaused?: boolean;
}

export default function Hero({ variant, onRegisterClick, backgroundPaused = false }: HeroProps) {
  const version = VERSIONS[variant];
  const h = version.hero;
  const isAmber = version.visual.accent === "amber";

  const accent = isAmber
    ? { dot: "bg-amber-500", text: "text-amber-400", border: "border-amber-500/35", bg: "bg-amber-500/10" }
    : { dot: "bg-primary", text: "text-primary", border: "border-primary/25", bg: "bg-primary/5" };

  const highlightColor = isAmber ? "text-amber-400" : "text-primary";
  const highlightUnderlay = isAmber ? "bg-amber-400/18" : "bg-primary/18";
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function getNextWednesday8pmEST() {
      const estOffset = -5 * 60;
      const now = new Date();

      const utcMinutes = now.getTime() / 60000 + now.getTimezoneOffset();
      const estTime = new Date((utcMinutes + estOffset) * 60000);

      let daysUntil = (3 - estTime.getDay() + 7) % 7;

      if (daysUntil === 0 && estTime.getHours() >= 20) {
        daysUntil = 7;
      }

      const targetDate = new Date(estTime);
      targetDate.setDate(estTime.getDate() + daysUntil);
      targetDate.setHours(20, 0, 0, 0);

      return new Date(targetDate.getTime() - estOffset * 60000);
    }

    function tick() {
      const nextSession = getNextWednesday8pmEST();
      const diffMs = nextSession.getTime() - new Date().getTime();
      const diffSec = Math.max(0, Math.floor(diffMs / 1000));

      const days = Math.floor(diffSec / 86400);
      const hours = Math.floor((diffSec % 86400) / 3600);
      const minutes = Math.floor((diffSec % 3600) / 60);
      const seconds = diffSec % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const padZero = (num: number) => String(num).padStart(2, "0");

  const units: { value: number; label: string }[] = [
    { value: timeLeft.days, label: "dias" },
    { value: timeLeft.hours, label: "horas" },
    { value: timeLeft.minutes, label: "min" },
    { value: timeLeft.seconds, label: "seg" },
  ];

  const countdownStrip = (
    <div data-masterclass-countdown className="w-full max-w-[21rem] sm:max-w-sm lg:max-w-md">
      <div className="mb-2 text-center text-[9px] font-black uppercase tracking-[0.16em] text-muted-foreground/70 lg:text-left">
        {h.countdownLabel}
      </div>
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="mc-fill border mc-border rounded-lg px-1.5 py-2 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:rounded-xl sm:py-2.5"
          >
            <span className="block font-mono text-xl font-black leading-none tracking-tight text-foreground sm:text-2xl lg:text-3xl">
              {padZero(unit.value)}
            </span>
            <span className="mt-1 block text-[8px] font-bold uppercase tracking-wider text-muted-foreground sm:text-[9px]">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const headline = (
    <>
      {h.headline.lead}{" "}
      <span className={`${highlightColor} relative inline-block text-glow-neon`}>
        {h.headline.highlight}
        <span className={`absolute left-0 right-0 bottom-0.5 h-1.5 rounded-sm ${highlightUnderlay} -z-10 sm:bottom-1 sm:h-2`} />
      </span>
      {h.headline.tail ? <> {h.headline.tail}</> : null}
    </>
  );

  const eyebrow = (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] ${accent.border} ${accent.bg} ${accent.text} font-mc-display`}
    >
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${accent.dot} opacity-75`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${accent.dot}`} />
      </span>
      {h.eyebrow}
    </div>
  );

  const chips = (
    <div className="flex flex-wrap gap-2.5">
      {h.chips.map((chip) => (
        <div
          key={chip.label}
          className="inline-flex items-center gap-2 rounded-full border mc-border mc-fill px-4 py-2 text-xs font-semibold text-foreground/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
        >
          <span className={isAmber ? "text-amber-400" : "text-primary"}>{chip.icon}</span>
          {chip.label}
        </div>
      ))}
    </div>
  );

  const mobileValuePills = ["60 min en vivo", "Zoom", "Sin tarjeta"];

  const cta = (
    <>
      <Button
        variant="primary"
        size="lg"
        glow
        aurora
        onClick={onRegisterClick}
        className="w-full rounded-xl px-6 py-3.5 text-sm font-extrabold tracking-tight text-white shadow-2xl sm:w-auto sm:px-10 sm:py-4 lg:px-12 lg:text-base"
      >
        {h.cta}
      </Button>
      <span className="text-center text-[11px] font-medium text-muted-foreground/65 sm:text-xs lg:text-left">
        {h.ctaNote}
      </span>
    </>
  );

  return (
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-start justify-center overflow-hidden px-4 pb-24 pt-3 sm:min-h-[calc(100svh-6rem)] sm:px-6 sm:pb-28 sm:pt-4 lg:items-center lg:px-8 lg:py-14">
      <MasterclassHeroBackground variant={variant} paused={backgroundPaused} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,430px)] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="flex flex-col items-center text-center font-mc-body lg:items-start lg:text-left"
        >
          {countdownStrip}

          <h1 className="mt-3 max-w-4xl text-[2rem] font-extrabold leading-[1.02] tracking-tight text-foreground text-balance font-mc-display sm:mt-4 sm:text-[2.65rem] md:text-[2.9rem] lg:max-w-3xl lg:text-5xl xl:text-6xl">
            {headline}
          </h1>

          <MasterclassHeroMedia
            key={`mobile-media-${variant}`}
            variant={variant}
            orientation="horizontal"
            priority
            sizes="(max-width: 1024px) 94vw, 0px"
            className="mt-3 w-full max-w-[23rem] sm:max-w-[22rem] md:max-w-[25rem] lg:hidden"
          />

          <div className="mt-3 flex w-full max-w-[23rem] flex-col items-center gap-2 sm:max-w-[22rem] md:max-w-[25rem] lg:hidden">
            {cta}
          </div>

          <p className="mt-3 max-w-[24rem] text-center text-xs leading-relaxed text-muted-foreground/78 text-pretty sm:max-w-[34rem] sm:text-sm lg:hidden">
            {h.subhead}
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-2 lg:hidden">
            {mobileValuePills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border mc-border mc-fill px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-foreground/75"
              >
                {pill}
              </span>
            ))}
          </div>

          <div className="mt-5 hidden lg:block">{eyebrow}</div>

          <p className="mt-5 hidden max-w-2xl text-lg font-light leading-relaxed text-muted-foreground text-pretty lg:block">
            {h.subhead}
          </p>

          <div className="mt-6 hidden lg:block">{chips}</div>

          <div className="mt-8 hidden flex-col items-start gap-3 lg:flex">
            {cta}
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.12 }}
          className="hidden justify-end lg:flex"
        >
          <MasterclassHeroMedia
            key={`desktop-media-${variant}`}
            variant={variant}
            orientation="vertical"
            priority
            sizes="(max-width: 1024px) 0px, 430px"
            className="w-full max-w-[410px] lg:flex lg:min-h-[511px] lg:items-center xl:max-w-[430px] xl:min-h-[536px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
