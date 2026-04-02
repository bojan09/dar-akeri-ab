"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";
import { scrollToSection } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  Truck,
  Thermometer,
  Package,
  Layers,
  MapPin,
  Wifi,
  Shield,
  Leaf,
  ArrowRight,
} from "lucide-react";

// ── Vehicle icon map ───────────────────────────────────────
const FLEET_ICONS = [Truck, Thermometer, Package, Layers];

// ── Vehicle spec tags per vehicle ─────────────────────────
const FLEET_SPECS: { icon: React.ElementType; label: string }[][] = [
  [
    { icon: Wifi, label: "GPS Tracking" },
    { icon: Shield, label: "Euro VI" },
    { icon: MapPin, label: "EU-Wide" },
  ],
  [
    { icon: Thermometer, label: "-25°C to +25°C" },
    { icon: Shield, label: "HACCP" },
    { icon: Wifi, label: "Temp Monitor" },
  ],
  [
    { icon: MapPin, label: "Urban Routes" },
    { icon: Wifi, label: "Live Tracking" },
    { icon: Leaf, label: "Low Emission" },
  ],
  [
    { icon: Layers, label: "Oversized Cargo" },
    { icon: Shield, label: "ADR Licensed" },
    { icon: MapPin, label: "Nordic Routes" },
  ],
];

// ── Vehicle color accents ──────────────────────────────────
const FLEET_ACCENTS = [
  "from-brand-navy to-brand-navy-light",
  "from-cyan-700 to-cyan-900",
  "from-emerald-700 to-emerald-900",
  "from-slate-700 to-slate-900",
];

const FLEET_ICON_BG = [
  "bg-brand-orange",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-slate-500",
];

// ── Animation variants ─────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ── Fleet card ─────────────────────────────────────────────
interface FleetCardProps {
  icon: React.ElementType;
  name: string;
  capacity: string;
  description: string;
  specs: { icon: React.ElementType; label: string }[];
  accent: string;
  iconBg: string;
  index: number;
}

function FleetCard({
  icon: Icon,
  name,
  capacity,
  description,
  specs,
  accent,
  iconBg,
  index,
}: FleetCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      className="group relative bg-white rounded-3xl border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 ease-out overflow-hidden flex flex-col"
      aria-labelledby={`fleet-name-${index}`}
    >
      {/* ── Graphic header ────────────────────────────── */}
      <div
        className={cn(
          "relative h-44 bg-gradient-to-br overflow-hidden flex items-center justify-center",
          accent
        )}
      >
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-dot-pattern opacity-20" aria-hidden="true" />

        {/* Large background icon */}
        <Icon
          className="absolute -right-6 -bottom-6 w-36 h-36 text-white/10"
          aria-hidden="true"
        />

        {/* Centered icon */}
        <div
          className={cn(
            "relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg",
            iconBg
          )}
          aria-hidden="true"
        >
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Capacity badge — top right */}
        <span className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white font-display font-bold text-xs uppercase tracking-wider">
          {capacity}
        </span>

        {/* Vehicle number */}
        <span
          className="absolute bottom-4 left-4 font-display font-black text-5xl text-white/10 leading-none"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* ── Card body ─────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-6">
        <h3
          id={`fleet-name-${index}`}
          className="font-display font-black text-xl text-brand-navy mb-2"
        >
          {name}
        </h3>
        <p className="font-sans text-sm text-text-muted leading-relaxed flex-1 mb-5">
          {description}
        </p>

        {/* Spec tags */}
        <ul className="flex flex-wrap gap-2" aria-label={`Specs for ${name}`}>
          {specs.map(({ icon: SpecIcon, label }) => (
            <li
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-gray-100 text-brand-navy/70 group-hover:border-brand-navy/10 transition-colors duration-200"
            >
              <SpecIcon className="w-3 h-3 text-brand-orange shrink-0" aria-hidden="true" />
              <span className="font-sans text-xs font-medium">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

// ── Stats strip ────────────────────────────────────────────
function FleetStatsStrip({ isVisible }: { isVisible: boolean }) {
  const stats = [
    { value: "50+", label: "Vehicles in fleet" },
    { value: "Euro VI", label: "Emission standard" },
    { value: "24/7", label: "Dispatch available" },
    { value: "2026", label: "Average fleet year" },
  ];

  return (
    <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="bg-brand-navy rounded-2xl px-6 py-5 flex flex-col gap-1"
        >
          <span className="font-display font-black text-2xl text-white leading-none">
            {s.value}
          </span>
          <span className="font-sans text-xs text-white/50">{s.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ── Main section ───────────────────────────────────────────
export default function FleetSection() {
  const { t } = useLocale();
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section
      id="fleet"
      aria-labelledby="fleet-heading"
      className="relative py-section-sm lg:py-section bg-white overflow-hidden"
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-navy/8 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────── */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              className="section-label"
              aria-hidden="true"
            >
              {t.fleet.sectionLabel}
            </motion.span>

            <motion.h2
              id="fleet-heading"
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              className="section-title mt-3 leading-tight"
            >
              {t.fleet.title.split(" ").slice(0, 3).join(" ")}{" "}
              <span className="text-brand-orange">
                {t.fleet.title.split(" ").slice(3).join(" ")}
              </span>
            </motion.h2>
          </div>

          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="flex flex-col gap-4 lg:items-end"
          >
            <p className="section-subtitle lg:text-right">{t.fleet.subtitle}</p>
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-2 font-sans font-semibold text-sm text-brand-orange hover:text-brand-orange-dark transition-colors duration-200 group self-start lg:self-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg"
              aria-label="Enquire about our fleet"
            >
              Enquire about our fleet
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </button>
          </motion.div>
        </div>

        {/* ── Fleet grid ──────────────────────────────── */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          role="list"
          aria-label="Our vehicle fleet"
        >
          {t.fleet.items.map((vehicle, i) => (
            <div key={vehicle.name} role="listitem">
              <FleetCard
                icon={FLEET_ICONS[i] ?? Truck}
                name={vehicle.name}
                capacity={vehicle.capacity}
                description={vehicle.description}
                specs={FLEET_SPECS[i] ?? []}
                accent={FLEET_ACCENTS[i] ?? FLEET_ACCENTS[0]}
                iconBg={FLEET_ICON_BG[i] ?? FLEET_ICON_BG[0]}
                index={i}
              />
            </div>
          ))}
        </motion.div>

        {/* ── Stats strip ─────────────────────────────── */}
        <FleetStatsStrip isVisible={gridInView} />
      </div>
    </section>
  );
}
