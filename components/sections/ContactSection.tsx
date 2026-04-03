"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";
import { cn, isValidEmail } from "@/lib/utils";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Send,
  Loader2,
  ChevronDown,
} from "lucide-react";

// ── EmailJS config ─────────────────────────────────────────
// Replace these with your real EmailJS credentials
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "YOUR_PUBLIC_KEY";

// ── Types ──────────────────────────────────────────────────
type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// ── Service options ────────────────────────────────────────
const SERVICE_OPTIONS_EN = [
  "Full Truck Load (FTL)",
  "Less-than-Truck Load (LTL)",
  "Express & Time-Critical",
  "Temperature-Controlled",
  "Cross-Border European",
  "Warehousing & Distribution",
  "Other / Not sure yet",
];

const SERVICE_OPTIONS_SV = [
  "Hel lastbil (FTL)",
  "Dellast (LTL)",
  "Express & tidskritisk",
  "Temperaturkontrollerad transport",
  "Gränsöverskridande europeisk frakt",
  "Lagerhållning & distribution",
  "Annat / Vet ej ännu",
];

// ── Animation helpers ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ── Form field ─────────────────────────────────────────────
function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="form-label">
        {label}
        {required && (
          <span className="text-brand-orange ml-1" aria-hidden="true">*</span>
        )}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            role="alert"
            className="flex items-center gap-1.5 text-xs text-red-500 font-sans"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Success state ──────────────────────────────────────────
function SuccessState({
  title,
  subtitle,
  onReset,
}: {
  title: string;
  subtitle: string;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center py-16 px-8 gap-5"
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, type: "spring", bounce: 0.4 }}
        className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center"
        aria-hidden="true"
      >
        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
      </motion.div>

      <div>
        <h3 className="font-display font-black text-2xl text-brand-navy">{title}</h3>
        <p className="font-sans text-sm text-text-muted mt-2 max-w-xs">{subtitle}</p>
      </div>

      <button
        onClick={onReset}
        className="btn-secondary text-sm mt-2"
        aria-label="Send another message"
      >
        Send another message
      </button>
    </motion.div>
  );
}

// ── Contact info panel ─────────────────────────────────────
function ContactInfoPanel({ isVisible }: { isVisible: boolean }) {
  const { t } = useLocale();

  const infoItems = [
    {
      icon: Phone,
      label: "Phone",
      value: t.contact.info.phone,
      href: `tel:${t.contact.info.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: t.contact.info.email,
      href: `mailto:${t.contact.info.email}`,
    },
    {
      icon: MapPin,
      label: "Address",
      value: t.contact.info.address,
      href: `https://maps.google.com?q=${encodeURIComponent(t.contact.info.address)}`,
    },
    {
      icon: Clock,
      label: "Hours",
      value: t.contact.info.hours,
      href: null,
    },
  ];

  return (
    <div className="flex flex-col gap-6 h-full">

      {/* Header */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <span className="section-label" aria-hidden="true">
          {t.contact.sectionLabel}
        </span>
        <h2
          id="contact-heading"
          className="section-title mt-3 leading-tight"
        >
          {t.contact.title.split(" ").slice(0, -2).join(" ")}{" "}
          <span className="text-brand-orange">
            {t.contact.title.split(" ").slice(-2).join(" ")}
          </span>
        </h2>
        <p className="section-subtitle mt-4">{t.contact.subtitle}</p>
      </motion.div>

      {/* Info items */}
      <motion.ul
        custom={0.2}
        variants={fadeUp}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="flex flex-col gap-4"
        aria-label="Contact information"
      >
        {infoItems.map(({ icon: Icon, label, value, href }) => (
          <li key={label}>
            {href ? (
              <a
                href={href}
                className="group flex items-start gap-4 p-4 rounded-2xl bg-surface border border-gray-100 hover:border-brand-navy/15 hover:shadow-card transition-all duration-200"
                target={href.startsWith("https") ? "_blank" : undefined}
                rel={href.startsWith("https") ? "noopener noreferrer" : undefined}
                aria-label={`${label}: ${value}`}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-navy/6 flex items-center justify-center shrink-0 group-hover:bg-brand-navy group-hover:text-white transition-all duration-200 text-brand-navy">
                  <Icon className="w-4.5 h-4.5" aria-hidden="true" style={{ width: 18, height: 18 }} />
                </div>
                <div>
                  <p className="font-sans text-xs text-text-muted uppercase tracking-wide font-medium">
                    {label}
                  </p>
                  <p className="font-sans text-sm font-semibold text-brand-navy mt-0.5 group-hover:text-brand-orange transition-colors duration-200 leading-snug">
                    {value}
                  </p>
                </div>
              </a>
            ) : (
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-brand-navy/6 flex items-center justify-center shrink-0 text-brand-navy">
                  <Icon aria-hidden="true" style={{ width: 18, height: 18 }} />
                </div>
                <div>
                  <p className="font-sans text-xs text-text-muted uppercase tracking-wide font-medium">
                    {label}
                  </p>
                  <p className="font-sans text-sm font-semibold text-brand-navy mt-0.5 leading-snug">
                    {value}
                  </p>
                </div>
              </div>
            )}
          </li>
        ))}
      </motion.ul>

      {/* Response time badge */}
      <motion.div
        custom={0.35}
        variants={fadeUp}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="flex items-center gap-3 p-4 rounded-2xl bg-brand-orange/8 border border-brand-orange/15"
        role="note"
        aria-label="Average response time: under 2 hours"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse shrink-0" aria-hidden="true" />
        <p className="font-sans text-sm text-brand-navy/80">
          <span className="font-semibold text-brand-navy">Average response time:</span>{" "}
          under 2 hours during business hours.
        </p>
      </motion.div>

      {/* Map placeholder */}
      <motion.div
        custom={0.45}
        variants={fadeUp}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="flex-1 min-h-44 rounded-2xl bg-brand-navy overflow-hidden relative"
        aria-label="Map showing DAR Åkeri AB location in Järfälla, Stockholm"
      >
        <div className="absolute inset-0 bg-dot-pattern opacity-30" aria-hidden="true" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
          <MapPin className="w-8 h-8 text-brand-orange" aria-hidden="true" />
          <p className="font-display font-bold text-white text-sm leading-tight">
            Järfälla, Stockholm
          </p>
          <p className="font-sans text-xs text-white/50">Sweden</p>
          <a
            href="https://maps.google.com?q=Järfälla+Stockholm+Sweden"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-brand-orange hover:text-white transition-colors duration-200"
            aria-label="Open in Google Maps"
          >
            Open in Maps
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

// ── Contact form ───────────────────────────────────────────
function ContactForm({ isVisible }: { isVisible: boolean }) {
  const { t, locale } = useLocale();
  const f = t.contact.form;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const serviceOptions = locale === "sv" ? SERVICE_OPTIONS_SV : SERVICE_OPTIONS_EN;

  const update = useCallback(
    (field: keyof FormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field as keyof FormErrors]) {
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      },
    [errors]
  );

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!formData.name.trim()) next.name = "Name is required";
    if (!formData.email.trim()) next.email = "Email is required";
    else if (!isValidEmail(formData.email)) next.email = "Please enter a valid email";
    if (!formData.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      // Dynamic import of EmailJS to avoid SSR issues
      const emailjs = await import("@emailjs/browser");

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          message: formData.message,
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const reset = () => {
    setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" });
    setErrors({});
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card min-h-[500px] flex items-center">
        <SuccessState
          title={f.success}
          subtitle={f.successSub}
          onReset={reset}
        />
      </div>
    );
  }

  return (
    <motion.form
      custom={0.1}
      variants={fadeUp}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="contact-heading"
      className="bg-white rounded-3xl border border-gray-100 shadow-card p-7 md:p-9 flex flex-col gap-5"
    >
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label={f.name} error={errors.name} required>
          <input
            type="text"
            autoComplete="name"
            placeholder={f.namePlaceholder}
            value={formData.name}
            onChange={update("name")}
            aria-required="true"
            aria-invalid={!!errors.name}
            className={cn(
              "form-input",
              errors.name && "border-red-300 focus:border-red-400 focus:ring-red-200/40"
            )}
          />
        </FormField>

        <FormField label={f.email} error={errors.email} required>
          <input
            type="email"
            autoComplete="email"
            placeholder={f.emailPlaceholder}
            value={formData.email}
            onChange={update("email")}
            aria-required="true"
            aria-invalid={!!errors.email}
            className={cn(
              "form-input",
              errors.email && "border-red-300 focus:border-red-400 focus:ring-red-200/40"
            )}
          />
        </FormField>
      </div>

      {/* Phone + Company row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label={f.phone}>
          <input
            type="tel"
            autoComplete="tel"
            placeholder={f.phonePlaceholder}
            value={formData.phone}
            onChange={update("phone")}
            className="form-input"
          />
        </FormField>

        <FormField label={f.company}>
          <input
            type="text"
            autoComplete="organization"
            placeholder={f.companyPlaceholder}
            value={formData.company}
            onChange={update("company")}
            className="form-input"
          />
        </FormField>
      </div>

      {/* Service select */}
      <FormField label={f.service}>
        <div className="relative">
          <select
            value={formData.service}
            onChange={update("service")}
            className={cn(
              "form-input appearance-none pr-10 cursor-pointer",
              !formData.service && "text-text-subtle"
            )}
            aria-label={f.service}
          >
            <option value="" disabled>
              {f.servicePlaceholder}
            </option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </FormField>

      {/* Message */}
      <FormField label={f.message} error={errors.message} required>
        <textarea
          rows={5}
          placeholder={f.messagePlaceholder}
          value={formData.message}
          onChange={update("message")}
          aria-required="true"
          aria-invalid={!!errors.message}
          className={cn(
            "form-input resize-none",
            errors.message && "border-red-300 focus:border-red-400 focus:ring-red-200/40"
          )}
        />
      </FormField>

      {/* Error banner */}
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="font-sans text-sm">{f.error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "btn-primary w-full justify-center mt-1 group",
          status === "submitting" && "opacity-70 cursor-not-allowed"
        )}
        aria-label={status === "submitting" ? f.submitting : f.submit}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            {f.submitting}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            {f.submit}
            <ArrowRight
              className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </>
        )}
      </button>

      <p className="font-sans text-xs text-text-subtle text-center">
        By submitting this form you agree to our{" "}
        <a href="/privacy" className="underline hover:text-brand-navy transition-colors">
          Privacy Policy
        </a>
        . We never share your data.
      </p>
    </motion.form>
  );
}

// ── Main section ───────────────────────────────────────────
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const leftInView = useInView(leftRef, { once: true, margin: "-60px" });
  const rightInView = useInView(rightRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-section-sm lg:py-section bg-surface overflow-hidden"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-navy/8 to-transparent" aria-hidden="true" />

      {/* Background accents */}
      <div className="absolute inset-0 bg-stripe-pattern opacity-40" aria-hidden="true" />
      <div className="absolute -right-32 top-1/4 w-80 h-80 rounded-full bg-brand-orange/6 blur-[70px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -left-32 bottom-1/4 w-80 h-80 rounded-full bg-brand-navy/8 blur-[70px] pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: info panel ────────────────────────── */}
          <div ref={leftRef}>
            <ContactInfoPanel isVisible={leftInView} />
          </div>

          {/* ── Right: form ─────────────────────────────── */}
          <div ref={rightRef}>
            <ContactForm isVisible={rightInView} />
          </div>
        </div>
      </div>
    </section>
  );
}
