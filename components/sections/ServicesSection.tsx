"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";
import { scrollToSection } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  Truck,
  Package,
  Zap,
  Thermometer,
  Globe,
  Warehouse,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// ── Icon map for each service ──────────────────────────────
const SERVICE_ICONS = [
  Truck,
  Package,
  Zap,
  Thermometer,
  Globe,
  Warehouse,
];

// ── Feature bullets shown on each card ────────────────────
const SERVICE_FEATURES: string[][] = [
  ["Door-to-door", "GPS tracked", "EU-wide coverage"],
  ["Flexible scheduling", "Cost-effective", "Regular routes"],
  ["2–24h delivery", "Priority handling", "Live updates"],
  ["–25°C to +25°C", "HACCP compliant", "Continuous monitoring"],
  ["Customs support", "ADR certified", "Multi-country routing"],
  ["Same-day dispatch", "Inventory system", "Last-mile delivery"],
];

// ── Animation variants ─────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ── Service card ───────────────────────────────────────────
interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  index: number;
  isFeatured?: boolean;
  onCTAClick: () => void;
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
  index,
  isFeatured = false,
  onCTAClick,
}: ServiceCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      className={cn(
        "group relative flex flex-col rounded-3xl p-7 border",
        "transition-all duration-300 ease-out overflow-hidden",
        isFeatured
          ? "bg-brand-navy border-brand-navy-light shadow-card-hover"
          : "bg-white border-gray-100/80 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 hover:border-brand-navy/10"
      )}
      aria-labelledby={`service-title-${index}`}
    >
      {/* Featured badge */}
      {isFeatured && (
        <span className="absolute top-5 right-5 text-[10px] font-display font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-brand-orange text-white">
          Popular
        </span>
      )}

      {/* Background accent — subtle on hover */}
      {!isFeatured && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-brand-navy/0 to-brand-navy/0 group-hover:from-brand-navy/[0.02] group-hover:to-brand-orange/[0.03] transition-all duration-500 rounded-3xl pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Top: icon + number */}
      <div className="flex items-start justify-between mb-6">
        <div
          className={cn(
            "w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300",
            isFeatured
              ? "bg-brand-orange text-white shadow-cta"
              : "bg-brand-navy/6 text-brand-navy group-hover:bg-brand-navy group-hover:text-white"
          )}
          style={{ width: 52, height: 52 }}
          aria-hidden="true"
        >
          <Icon className="w-6 h-6" />
        </div>
        <span
          className={cn(
            "font-display font-black text-4xl leading-none tabular-nums",
            isFeatured ? "text-white/10" : "text-gray-100 group-hover:text-brand-navy/8"
          )}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Title */}
      <h3
        id={`service-title-${index}`}
        className={cn(
          "font-display font-black text-xl leading-tight mb-3",
          isFeatured ? "text-white" : "text-brand-navy"
        )}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={cn(
          "font-sans text-sm leading-relaxed flex-1 mb-6",
          isFeatured ? "text-white/65" : "text-text-muted"
        )}
      >
        {description}
      </p>

      {/* Feature bullets */}
      <ul className="flex flex-col gap-2.5 mb-7" aria-label={`Features of ${title}`}>
        {features.map((feat) => (
          <li key={feat} className="flex items-center gap-2.5">
            <CheckCircle2
              className={cn(
                "w-4 h-4 shrink-0",
                isFeatured ? "text-brand-orange" : "text-brand-navy/40 group-hover:text-brand-orange"
              )}
              aria-hidden="true"
            />
            <span
              className={cn(
                "font-sans text-sm",
                isFeatured ? "text-white/70" : "text-gray-600"
              )}
            >
              {feat}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA link */}
      <button
        onClick={onCTAClick}
        className={cn(
          "inline-flex items-center gap-2 font-sans font-semibold text-sm",
          "transition-all duration-200 group/btn self-start",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg",
          isFeatured
            ? "text-brand-orange hover:text-white"
            : "text-brand-navy/50 group-hover:text-brand-orange"
        )}
        aria-label={`Request a quote for ${title}`}
      >
        Request a quote
        <ArrowRight
          className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
          aria-hidden="true"
        />
      </button>
    </motion.article>
  );
}

// ── Bottom CTA banner ──────────────────────────────────────
function ServicesCTABanner({ onCTAClick }: { onCTAClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mt-16 rounded-3xl bg-brand-navy overflow-hidden relative"
    >
      {/* Background dot grid */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30" aria-hidden="true" />
      <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-brand-orange/10 blur-[60px]" aria-hidden="true" />

      <div className="relative px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="section-label text-brand-orange mb-2">
            Not sure what you need?
          </p>
          <h3 className="font-display font-black text-2xl md:text-3xl text-white leading-tight">
            Talk to our logistics team —{" "}
            <span className="text-brand-orange">free consultation.</span>
          </h3>
          <p className="mt-3 font-sans text-sm text-white/55 max-w-md">
            We'll analyse your supply chain and recommend the most efficient,
            cost-effective solution for your specific needs.
          </p>
        </div>
        <button
          onClick={onCTAClick}
          className="btn-primary shrink-0 group"
          aria-label="Get in touch for a free logistics consultation"
        >
          Get in touch
          <ArrowRight
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>
    </motion.div>
  );
}

// ── Main section ───────────────────────────────────────────
export default function ServicesSection() {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  const handleCTAClick = () => scrollToSection("contact");

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative py-section-sm lg:py-section bg-surface overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-navy/10 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-stripe-pattern opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ──────────────────────────── */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <motion.span
              custom={0}
              variants={headerVariants}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              className="section-label"
              aria-hidden="true"
            >
              {t.services.sectionLabel}
            </motion.span>

            <motion.h2
              id="services-heading"
              custom={0.1}
              variants={headerVariants}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              className="section-title mt-3 leading-tight"
            >
              {t.services.title.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-brand-orange">
                {t.services.title.split(" ").slice(-2).join(" ")}
              </span>
            </motion.h2>
          </div>

          <motion.p
            custom={0.2}
            variants={headerVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="section-subtitle lg:max-w-sm lg:text-right"
          >
            {t.services.subtitle}
          </motion.p>
        </div>

        {/* ── Services grid ───────────────────────────── */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
          aria-label="Our logistics services"
        >
          {t.services.items.map((service, i) => {
            const Icon = SERVICE_ICONS[i] ?? Truck;
            const features = SERVICE_FEATURES[i] ?? [];
            // Make the FTL card (index 0) the featured/dark one
            const isFeatured = i === 0;

            return (
              <div key={service.title} role="listitem">
                <ServiceCard
                  icon={Icon}
                  title={service.title}
                  description={service.description}
                  features={features}
                  index={i}
                  isFeatured={isFeatured}
                  onCTAClick={handleCTAClick}
                />
              </div>
            );
          })}
        </motion.div>

        {/* ── Bottom CTA ──────────────────────────────── */}
        <ServicesCTABanner onCTAClick={handleCTAClick} />
      </div>
    </section>
  );
}
