import type { ReactNode } from "react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Testimonios en video | AD Media Solution",
  description:
    "Explora testimonios en video de clientes de AD Media Solution y revisa pruebas sociales reales antes de agendar un diagnostico.",
  path: "/casos",
});

export default function CasosLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
