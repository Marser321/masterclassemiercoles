import { Film, Play, Sparkles } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { COPIES, type CopyId, type MasterclassReplayCopy } from "@/lib/data/masterclassCopy";
import MasterclassSectionBackdrop from "./MasterclassSectionBackdrop";

interface MasterclassReplaySectionProps {
  copy: CopyId;
}

const FALLBACK_REPLAY: MasterclassReplayCopy = {
  kicker: "Momentos de la clase",
  title: "Así se viven nuestras masterclass",
  description: "Un vistazo a los mejores momentos, energía y práctica en vivo.",
  placeholderLabel: "Video de mejores momentos próximamente",
};

export default function MasterclassReplaySection({ copy }: MasterclassReplaySectionProps) {
  const replay = COPIES[copy].replay ?? FALLBACK_REPLAY;

  return (
    <section
      id="masterclass-replay"
      data-masterclass-replay-section
      className="relative overflow-hidden px-6 py-18 sm:px-8 sm:py-24 font-mc-body"
    >
      <MasterclassSectionBackdrop
        imageSrc="/masterclass/backgrounds/section-urgency-live-system.png"
        scrim="center"
        imageClassName="object-center opacity-[0.12] sm:opacity-[0.18] lg:opacity-[0.24]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary font-mc-display">
            <span className="h-0.5 w-8 rounded-full bg-primary" />
            {replay.kicker}
            <span className="h-0.5 w-8 rounded-full bg-primary" />
          </div>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground text-balance font-mc-display sm:text-4xl lg:text-5xl">
            {replay.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
            {replay.description}
          </p>
        </Reveal>

        <Reveal y={22}>
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute -inset-4 rounded-[28px] bg-primary/[0.06] blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[26px] border border-primary/18 bg-background/72 p-2 shadow-[0_30px_90px_-42px_rgba(0,102,255,0.75)] backdrop-blur-xl">
              <div className="relative aspect-video overflow-hidden rounded-[20px] border border-white/10 bg-[radial-gradient(circle_at_50%_22%,rgba(0,102,255,0.28),transparent_38%),linear-gradient(135deg,rgba(4,13,31,0.94),rgba(1,8,20,0.98))]">
                {replay.videoSrc ? (
                  <video
                    data-masterclass-replay-video
                    className="h-full w-full object-cover"
                    src={replay.videoSrc}
                    controls
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <div
                    data-masterclass-replay-placeholder
                    className="flex h-full w-full flex-col items-center justify-center px-6 text-center"
                  >
                    <div className="absolute inset-0 texture-grid opacity-[0.18]" aria-hidden />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" aria-hidden />
                    <div className="absolute left-0 top-0 h-full w-1/3 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-70" aria-hidden />

                    <div className="relative mb-5 flex size-18 items-center justify-center rounded-full border border-primary/25 bg-primary/12 text-primary shadow-[0_0_42px_rgba(0,102,255,0.24)] sm:size-20">
                      <Play className="ml-1 size-8 fill-current" />
                    </div>
                    <div className="relative mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-primary/90">
                      <Sparkles className="size-3" />
                      Proximamente
                    </div>
                    <p className="relative max-w-sm text-base font-black tracking-tight text-foreground font-mc-display sm:text-xl">
                      {replay.placeholderLabel}
                    </p>
                    <div className="relative mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/75">
                      <Film className="size-3.5" />
                      Highlights de la masterclass
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
