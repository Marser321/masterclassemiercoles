"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Database, LifeBuoy, Megaphone } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import IslandBar from "@/components/layout/IslandBar";
import FooterContact from "@/components/sections/FooterContact";
import FlowField from "@/components/backgrounds/FlowField";
import SignalGrid from "@/components/backgrounds/SignalGrid";
import BlueprintLayer from "@/components/backgrounds/BlueprintLayer";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

// Fondo contextual según el slug (alineado con el rubro de cada servicio).
function SlugBackground({ slug }: { slug: string }) {
  switch (slug) {
    case "embudos-neurales": // AD Media CRM
      return <FlowField intensity="medium" />;
    case "contenido-generativo": // Dirección de marketing / Ads
      return <SignalGrid intensity="medium" />;
    case "ads-autopilot": // Soporte y mantenimiento
      return <BlueprintLayer intensity="medium" stages={3} />;
    default:
      return <FlowField intensity="medium" />;
  }
}

// Si la stat es puramente numérica la anima con contador; el contenido actual
// usa etiquetas cualitativas hasta validar métricas reales.
function StatValue({ value }: { value: string }) {
  const match = value.match(/^(\+?)(\d+)(%?)$/);
  if (match) {
    return (
      <AnimatedCounter
        value={Number(match[2])}
        prefix={match[1]}
        suffix={match[3]}
        className="text-3xl sm:text-4xl font-bold text-foreground"
      />
    );
  }
  return <span className="text-3xl sm:text-4xl font-bold text-foreground">{value}</span>;
}

// ============================================================
// Detalle de servicios. Los slugs se conservan para no romper enlaces.
// ============================================================
const SERVICES_DATA = {
    "embudos-neurales": {
        title: "AD Media CRM",
        subtitle: "Tu sistema de ventas a medida",
        description: "Un CRM personalizado para tu negocio: centraliza a tus clientes, automatiza el seguimiento y agenda citas sin que se te escape ni uno. Tú vendes, el sistema organiza.",
        features: [
            "Embudo de ventas y etapas a tu medida",
            "Seguimiento automático por WhatsApp y email",
            "Agenda de citas integrada",
            "Reportes claros de tus ventas",
        ],
        stats: [
            { label: "Seguimiento", value: "Flujos" },
            { label: "Clientes", value: "Orden" },
            { label: "Agenda", value: "Citas" },
        ],
        icon: Database,
        gradient: "from-primary to-accent-light",
    },
    "ads-autopilot": {
        title: "Soporte y mantenimiento",
        subtitle: "Soporte real, no bots",
        description: "No te dejamos solo. Mantenemos tu CRM, tu web y tus campañas funcionando y actualizados, con un equipo que responde y resuelve de verdad.",
        features: [
            "Soporte por WhatsApp en horario laboral",
            "Mantenimiento de tu web y tu CRM",
            "Ajustes y mejoras continuas",
            "Reportes de rendimiento",
        ],
        stats: [
            { label: "Soporte", value: "Humano" },
            { label: "Mantenimiento", value: "Activo" },
            { label: "Mejoras", value: "Continuas" },
        ],
        icon: LifeBuoy,
        gradient: "from-accent-warm to-accent-stone",
    },
    "contenido-generativo": {
        title: "Dirección de marketing",
        subtitle: "Meta, Google y redes con estrategia",
        description: "Te ayudamos a decidir qué hacer y cómo ejecutarlo: Meta Ads, Google Ads, redes sociales y contenido con una estrategia clara y revisable.",
        features: [
            "Campañas en Meta y Google Ads",
            "Gestión de redes sociales (Instagram, Facebook)",
            "Producción de contenido por nicho",
            "Estrategia orientada a decisiones medibles",
        ],
        stats: [
            { label: "Pauta", value: "Meta" },
            { label: "Busqueda", value: "Google" },
            { label: "Contenido", value: "Redes" },
        ],
        icon: Megaphone,
        gradient: "from-primary to-accent-light",
    },
};

export default function ServiceDetail() {
    const params = useParams();
    const slug = params?.slug as string;
    const service = SERVICES_DATA[slug as keyof typeof SERVICES_DATA];

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p className="text-slate-400 mb-8">Servicio no encontrado.</p>
                    <Link href="/" className="text-accent-warm hover:underline">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = service.icon;

    return (
        <main className="bg-background text-foreground min-h-screen">
            {/* Background Glow */}
            <div className="fixed inset-0 pointer-events-none">
                <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${service.gradient} opacity-20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2`} />
            </div>

            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 px-5 sm:px-6 max-w-5xl mx-auto overflow-hidden">
                {/* Fondo contextual según el rubro del servicio */}
                <SlugBackground slug={slug} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                >
                    <div className={`inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br ${service.gradient} mb-5 bg-opacity-20`}>
                        <Icon className="size-8 text-white" />
                    </div>
                    <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-foreground mb-4 sm:mb-5 leading-tight">
                        {service.title}
                    </h1>
                    <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                        {service.description}
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 sm:mt-10">
                    {service.stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="glass-premium p-5 sm:p-6 border border-border bg-card/40"
                        >
                            <p className="mb-2">
                                <StatValue value={stat.value} />
                            </p>
                            <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-10 sm:py-16 lg:py-20 bg-card/20 border-y border-border">
                <div className="max-w-5xl mx-auto px-5 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-7 sm:mb-10">Características Clave</h2>
                    <div className="grid md:grid-cols-2 gap-5 sm:gap-7">
                        {service.features.map((feature, i) => (
                            <motion.div
                                key={feature}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-4"
                            >
                                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <CheckCircle2 className="size-4 text-emerald-400" />
                                </div>
                                <p className="text-base sm:text-lg text-muted-foreground">{feature}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <FooterContact />
            <IslandBar />
        </main>
    );
}
