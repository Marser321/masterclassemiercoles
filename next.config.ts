import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sirve AVIF/WebP automáticamente: las fotos (ej. CEO) bajan mucho de peso
  // sin tocar el JSX. Visualmente idéntico, carga más rápido.
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 75, 90],
  },
  compress: true,
  // Tree-shaking agresivo de barrels (lucide-react importa decenas de íconos).
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Videos y media son assets versionados por nombre: si se reemplaza uno,
  // hay que renombrarlo (immutable hace que el navegador nunca revalide).
  async headers() {
    return [
      {
        source: "/:dir(videos|media|hero|brand)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/precios",
        destination: "/servicios",
        permanent: true,
      },
      {
        source: "/catalogo",
        destination: "/servicios",
        permanent: true,
      },
      {
        source: "/catalogo-servicios",
        destination: "/servicios",
        permanent: true,
      },
      {
        source: "/nosotros",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/ceo",
        destination: "/danger",
        permanent: true,
      },
      {
        source: "/contacto",
        destination: "/planificacion",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
