"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Shield, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { getVersion } from "@/lib/data/masterclassCopy";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const mc = getVersion().modal;
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error(mc.toasts.incomplete);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate submission/API call (e.g. GoHighLevel webhook or CRM submission)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSuccess(true);
      toast.success(mc.toasts.success);

      // Store in session storage to remember registration
      window.sessionStorage.setItem("masterclass-registered", "true");

    } catch {
      toast.error(mc.toasts.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md z-10"
          >
            <Card className="glass-premium mc-border p-8 rounded-[28px] shadow-2xl relative overflow-hidden">
              
              {/* Decorative radial glows */}
              <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-muted-foreground hover:text-foreground p-1.5 rounded-full mc-fill border mc-border hover:text-foreground transition-all cursor-pointer z-20"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form-state"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-center mb-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-wider mb-3">
                        {mc.badge}
                      </span>
                      <h3 className="text-2xl font-black text-foreground tracking-tight leading-tight">
                        {mc.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        {mc.subtitle}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      {/* Name input */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-wide">
                          {mc.labels.name}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={mc.placeholders.name}
                          className="w-full mc-fill border mc-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-xl px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40"
                        />
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-wide">
                          {mc.labels.email}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={mc.placeholders.email}
                          className="w-full mc-fill border mc-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-xl px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-wide">
                          {mc.labels.phone}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={mc.placeholders.phone}
                          className="w-full mc-fill border mc-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-xl px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40"
                        />
                      </div>

                      {/* Security note */}
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground/50 py-1.5">
                        <Shield className="w-3.5 h-3.5 text-primary" />
                        <span>{mc.security}</span>
                      </div>

                      {/* Submit button */}
                      <Button
                        type="submit"
                        variant="primary"
                        glow
                        aurora
                        disabled={isSubmitting}
                        className="w-full py-4 mt-2 font-black text-sm tracking-tight rounded-xl"
                      >
                        {isSubmitting ? mc.submitting : (
                          <>
                            {mc.submit}
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-state"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-center py-6 flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-wider mb-4">
                      {mc.successBadge}
                    </span>

                    <h3 className="text-2xl font-black text-foreground tracking-tight">
                      {mc.successTitle}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground mt-3 max-w-sm leading-relaxed px-2">
                      {mc.successText}
                    </p>

                    <div className="w-full mc-fill border mc-border rounded-2xl p-4 mt-8 text-left text-xs text-muted-foreground flex flex-col gap-2.5">
                      <div className="flex justify-between border-b mc-border pb-2">
                        <span className="font-bold text-foreground">{mc.summary.attendee}</span>
                        <span>{formData.name}</span>
                      </div>
                      <div className="flex justify-between border-b mc-border pb-2">
                        <span className="font-bold text-foreground">{mc.summary.email}</span>
                        <span>{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-foreground">{mc.summary.whatsapp}</span>
                        <span>{formData.phone}</span>
                      </div>
                    </div>

                    <Button
                      variant="glass"
                      onClick={onClose}
                      className="w-full py-3.5 mt-8 font-extrabold text-xs tracking-wider rounded-xl uppercase"
                    >
                      {mc.close}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
