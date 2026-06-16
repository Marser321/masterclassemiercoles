import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface MasterclassSectionBackdropProps {
  imageSrc: string;
  className?: string;
  imageClassName?: string;
  scrim?: "left" | "center" | "right";
}

export default function MasterclassSectionBackdrop({
  imageSrc,
  className,
  imageClassName,
  scrim = "left",
}: MasterclassSectionBackdropProps) {
  const scrimBackground =
    scrim === "right"
      ? "linear-gradient(270deg, var(--background) 0%, color-mix(in srgb, var(--background) 78%, transparent) 34%, color-mix(in srgb, var(--background) 42%, transparent) 62%, transparent 100%)"
      : scrim === "center"
        ? "radial-gradient(ellipse at center, color-mix(in srgb, var(--background) 78%, transparent) 0%, color-mix(in srgb, var(--background) 52%, transparent) 44%, transparent 74%)"
        : "linear-gradient(90deg, var(--background) 0%, color-mix(in srgb, var(--background) 80%, transparent) 34%, color-mix(in srgb, var(--background) 44%, transparent) 62%, transparent 100%)";

  const scrimStyle = { background: scrimBackground } as CSSProperties;

  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)} aria-hidden>
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="100vw"
        className={cn(
          "object-cover object-center opacity-[0.16] saturate-[1.08] contrast-[1.04] sm:opacity-[0.22] lg:opacity-[0.28]",
          imageClassName,
        )}
      />
      <div className="absolute inset-0 bg-background/42 sm:bg-background/36" />
      <div className="absolute inset-0 opacity-80" style={scrimStyle} />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/78 to-transparent" />
      <div className="absolute inset-0 texture-grid opacity-[0.22]" />
    </div>
  );
}
