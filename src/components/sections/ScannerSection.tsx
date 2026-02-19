"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, Binary } from "lucide-react";
import ScannerModal from "@/components/scanner/ScannerModal";
import FloatingIcons from "../ui/FloatingIcons";

export default function ScannerSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [url, setUrl] = useState("");
    const [hasScanned, setHasScanned] = useState(false);

    useEffect(() => {
        // Verificar si ya escaneó anteriormente (Client-side only)
        if (typeof window !== "undefined") {
            const scanned = localStorage.getItem("scannerComplete");
            if (scanned === "true") {
                // eslint-disable-next-line
                setHasScanned(true);
            }
        }
    }, []);

    const handleScanClick = () => {
        if (url || hasScanned) {
            setIsModalOpen(true);
        }
    };

    return (
        <section id="scanner" className="relative py-24 sm:py-32 px-6 overflow-hidden bg-bg-deep">
            {/* Iconos flotantes — Automation */}
            <FloatingIcons type="automation" className="z-0 opacity-35" />
            {/* Background Elements */}
            <div className="absolute inset-0 texture-travertine opacity-30 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/[0.05] blur-[100px] rounded-full pointer-events-none" />

            {/* Divisor superior */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/10 to-transparent" />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/5 border border-accent-blue/10 text-xs font-mono text-accent-blue mb-6 backdrop-blur-md"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
                    </span>
                    SYSTEM.DIAGNOSTIC_READY
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-display-heavy text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight"
                >
                    Descubre el Potencial Oculto <br /> de tu <span className="text-accent-light italic">Negocio</span>.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-text-muted mb-10 max-w-2xl mx-auto font-light"
                >
                    Nuestra IA analiza tu presencia digital en tiempo real y detecta oportunidades de crecimiento inmediato.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto"
                >
                    {!hasScanned && (
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="solution.agency"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full bg-bg-card border border-white/5 rounded-xl px-5 py-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-blue/50 transition-colors backdrop-blur-sm"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                                <span className="flex size-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs text-emerald-500 font-mono">ONLINE</span>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleScanClick}
                        className={`group relative flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-bold transition-all duration-300 w-full sm:w-auto whitespace-nowrap shadow-md ${hasScanned ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/10' : 'bg-accent-blue hover:bg-accent-light shadow-accent-blue/10 transition-colors'
                            }`}
                    >
                        {hasScanned ? (
                            <>
                                <BarChart3 className="size-5" />
                                Ver Mis Resultados
                            </>
                        ) : (
                            <>
                                <Binary className="size-5" />
                                Escanear Ahora
                            </>
                        )}
                    </button>
                </motion.div>

                {/* Trust Badges */}
                <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-text-muted/60 font-mono opacity-60">
                    <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-accent-light"></div>AES-256 ENCRYPTION</span>
                    <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-accent-light"></div>DIAGNOSTIC TIME: ~ 12s</span>
                    <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-accent-light"></div>LIMITED DAILY SLOTS</span>
                </div>

            </div>

            <ScannerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialUrl={url}
                skipAnimation={hasScanned}
            />
        </section>
    );
}
