"use client";

import { useState } from "react";
import Image from "next/image";
import { VISUALS, type VisualId } from "@/lib/data/masterclassCopy";

interface MasterclassBannerProps {
  visual: VisualId;
  /** Formato del banner. La visibilidad por dispositivo la controla el contenedor (clases responsive). */
  orientation: "horizontal" | "vertical";
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Banner promocional de la masterclass. Renderiza el formato indicado leyendo
 * los assets de masterclassCopy.ts. Si el archivo no existe (404), se oculta
 * solo (degradación elegante) para no romper la landing.
 */
export default function MasterclassBanner({
  visual,
  orientation,
  className = "",
  priority = false,
  sizes,
}: MasterclassBannerProps) {
  const [failed, setFailed] = useState(false);
  const banner = VISUALS[visual].banner[orientation];

  if (failed) return null;

  return (
    <div
      data-masterclass-banner={orientation}
      className={`relative overflow-hidden rounded-2xl border mc-border shadow-[0_20px_60px_-25px_rgba(0,102,255,0.45)] transition-transform duration-500 hover:scale-[1.01] ${className}`}
    >
      <Image
        src={banner.src}
        alt={banner.alt}
        width={banner.width}
        height={banner.height}
        sizes={sizes}
        priority={priority}
        onError={() => setFailed(true)}
        className="w-full h-auto object-contain select-none"
      />
    </div>
  );
}
