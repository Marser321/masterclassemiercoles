"use client";

import { motion } from "framer-motion";
import { 
    Users, 
    MessageSquare, 
    Calendar, 
    CreditCard, 
    Star, 
    Zap,
    Target,
    Globe
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

// ============================================================
// CRM Workflow Visualization — High Fidelity Neural System
// ============================================================
export default function CRMWorkflow() {
    return (
        <div className="relative w-full h-full bg-background rounded-3xl border border-primary/10 overflow-hidden group">
            
            {/* Background Grid */}
            <div className="texture-grid opacity-[0.15]" />

            {/* Central Engine — Core */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.02, 1],
                        boxShadow: [
                            "0 0 20px rgba(72,142,255,0.1)",
                            "0 0 40px rgba(72,142,255,0.2)",
                            "0 0 20px rgba(72,142,255,0.1)"
                        ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="size-32 rounded-[2.5rem] bg-background border border-primary/10 flex items-center justify-center relative z-20 p-4 shadow-xl"
                >
                    {/* Internal Multi-Port Grid */}
                    <div className="grid grid-cols-2 gap-4 size-full opacity-40">
                        <div className="flex items-center justify-center rounded-lg border border-primary/5">
                            <Target className="size-3 text-accent-blue/50" />
                        </div>
                        <div className="flex items-center justify-center rounded-lg border border-primary/5">
                            <Users className="size-3 text-accent-light/50" />
                        </div>
                        <div className="flex items-center justify-center rounded-lg border border-primary/5">
                            <Globe className="size-3 text-accent-blue/50" />
                        </div>
                        <div className="flex items-center justify-center rounded-lg border border-primary/5">
                            <MessageSquare className="size-3 text-[#25D366]/50" />
                        </div>
                    </div>

                    {/* Central Fusion Point — AD Media Isotype */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div 
                            animate={{ 
                                filter: ["drop-shadow(0 0 10px rgba(72,142,255,0.3))", "drop-shadow(0 0 20px rgba(72,142,255,0.5))", "drop-shadow(0 0 10px rgba(72,142,255,0.3))"]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="size-16 flex items-center justify-center"
                        >
                            <Image 
                                src="/brand/logo-icon.png" 
                                alt="AD Media Isotype" 
                                width={60} 
                                height={60} 
                                className="object-contain"
                            />
                        </motion.div>
                    </div>
                    
                    {/* Orbital Rings */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-10 border border-primary/5 rounded-full"
                    />
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-24 border border-primary/5 rounded-full border-dashed opacity-50"
                    />
                </motion.div>
            </div>

            {/* Data Paths — Animated SVG Lines */}
            <svg 
                className="absolute inset-0 size-full z-10" 
                viewBox="0 0 400 400"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#488EFF" />
                        <stop offset="100%" stopColor="#81E7FF" />
                    </linearGradient>
                    <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Connection paths landing on ports */}
                <path id="path-meta" d="M50 50 Q 100 50 178 178" fill="none" stroke="url(#blue-grad)" strokeWidth="1" strokeDasharray="4 4" className="opacity-20" />
                <path id="path-google" d="M50 350 Q 100 350 178 222" fill="none" stroke="url(#blue-grad)" strokeWidth="1" strokeDasharray="4 4" className="opacity-20" />
                <path id="path-referrals" d="M350 50 Q 300 50 222 178" fill="none" stroke="url(#blue-grad)" strokeWidth="1" strokeDasharray="4 4" className="opacity-20" />
                <path id="path-whatsapp" d="M350 350 Q 300 350 222 222" fill="none" stroke="#25D366" strokeWidth="1" strokeDasharray="4 4" className="opacity-15" />

                {/* Animated Particles — Synchronized Flow using Native SVG animateMotion */}
                <circle r="3.5" fill="#488EFF" filter="url(#neon-glow)">
                    <animateMotion dur="2.5s" repeatCount="indefinite" begin="0s">
                        <mpath href="#path-meta" />
                    </animateMotion>
                </circle>
                <circle r="3.5" fill="#81E7FF" filter="url(#neon-glow)">
                    <animateMotion dur="2.5s" repeatCount="indefinite" begin="0s">
                        <mpath href="#path-google" />
                    </animateMotion>
                </circle>
                <circle r="3.5" fill="#488EFF" filter="url(#neon-glow)">
                    <animateMotion dur="2.5s" repeatCount="indefinite" begin="0s">
                        <mpath href="#path-referrals" />
                    </animateMotion>
                </circle>
                <circle r="3.5" fill="#25D366" filter="url(#neon-glow)">
                    <animateMotion dur="2.5s" repeatCount="indefinite" begin="0s">
                        <mpath href="#path-whatsapp" />
                    </animateMotion>
                </circle>
            </svg>

            {/* Inbound Nodes */}
            <Node icon={Target} label="Meta Ads" pos="top-[12.5%] left-[12.5%]" color="blue" />
            <Node icon={Globe} label="Google" pos="bottom-[12.5%] left-[12.5%]" color="blue" />
            <Node icon={Users} label="Referidos" pos="top-[12.5%] right-[12.5%]" color="cyan" />
            <Node icon={MessageSquare} label="WhatsApp" pos="bottom-[12.5%] right-[12.5%]" color="whatsapp" />

            {/* Floating Status Cards */}
            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-4 sm:left-8 -translate-y-1/2 p-3 glass-premium rounded-xl border-accent-blue/20 z-30 shadow-2xl"
            >
                <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-accent-blue" />
                    <div>
                        <p className="text-[8px] uppercase tracking-tighter text-muted-foreground">Nueva Cita</p>
                        <p className="text-[10px] font-bold text-foreground">Lunes 10:30 AM</p>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 right-4 sm:right-8 -translate-y-1/2 p-3 glass-premium rounded-xl border-emerald-500/20 z-30 shadow-2xl"
            >
                <div className="flex items-center gap-2">
                    <CreditCard className="size-4 text-emerald-500" />
                    <div>
                        <p className="text-[8px] uppercase tracking-tighter text-muted-foreground">Pago Recibido</p>
                        <p className="text-[10px] font-bold text-foreground">$1,250.00 USD</p>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20"
            >
                <Star className="size-3 text-amber-400 fill-amber-400" />
                <span className="text-[9px] font-mono text-foreground tracking-widest uppercase">Reputación Automatizada</span>
            </motion.div>

        </div>
    );
}

function Node({ icon: Icon, label, pos, color }: { icon: LucideIcon, label: string, pos: string, color: 'blue' | 'cyan' | 'whatsapp' }) {
    const colorClass = color === 'blue' ? 'text-accent-blue' : color === 'cyan' ? 'text-accent-light' : 'text-[#25D366]';
    const borderClass = color === 'blue' ? 'border-accent-blue/20' : color === 'cyan' ? 'border-accent-light/20' : 'border-[#25D366]/20';
    
    return (
        <motion.div 
            whileHover={{ scale: 1.1 }}
            className={`absolute ${pos} z-30 group cursor-default`}
        >
            {/* Icon Container - Centered on the position */}
            <div className={`relative -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl bg-background border ${borderClass} group-hover:border-primary/40 transition-colors shadow-xl flex items-center justify-center`}>
                <Icon className={`size-5 ${colorClass}`} />
                
                {/* Label - Absolutely positioned below the icon to prevent layout offset */}
                <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
                </div>
            </div>
        </motion.div>
    );
}

