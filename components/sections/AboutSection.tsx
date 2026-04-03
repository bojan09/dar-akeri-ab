"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";
import { scrollToSection } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  Award,
  MapPin,
  Wifi,
  Users,
  Leaf,
  FileCheck,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Clock,
} from "lucide-react";

// ── Feature icon map ───────────────────────────────────────
const FEATURE_ICONS = [
  Award,      // ISO 9001
  Wifi,       // GPS Tracking
  Users,      // Account Manager
  Leaf,       // Eco
  Clock,      // 24/7
  FileCheck,  // Contracts
];

// ── Milestone timeline data ────────────────────────────────
const MILESTONES = [
  { year: "2009", label: "Founded in Stockholm" },
  { year: "2013", label: "ISO 9001 certified" },
  { year: "2016", label: "European expansion" },
  { year: "2020", label: "Fleet reached 30+ vehicles" },
  { year: "2024", label: "500+ active clients" },
];

// ── Animation helpers ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: (d: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  visible: (d: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ── Feature tile ───────────────────────────────────────────
function FeatureTile({
  icon: Icon,
  title,
  description,
  index,
  isVisible,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: 0.1 + index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
    >
      <div
        className="w-10 h-10 rounded-xl bg-brand-navy/6 flex items-center justify-center shrink-0 group-hover:bg-brand-navy group-hover:text-white transition-all duration-300 text-brand-navy"
        aria-hidden="true"
      >
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-display font-bold text-sm text-brand-navy mb-1 leading-tight">
          {title}
        </h4>
        <p className="font-sans text-xs text-text-muted leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ── Left visual panel ──────────────────────────────────────
function AboutVisualPanel({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="relative lg:sticky lg:top-28 self-start">

      {/* Main dark card */}
      <motion.div
        custom={0}
        variants={fadeLeft}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative bg-brand-navy rounded-3xl overflow-hidden"
      >
        {/* Dot grid bg */}
        <div className="absolute inset-0 bg-dot-pattern opacity-30" aria-hidden="true" />

        {/* Orange glow */}
        <div
          className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-brand-orange/20 blur-[50px]"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative p-8 pt-10">

          {/* Big stat */}
          <div className="mb-8">
            <span className="font-display font-black text-white leading-none"
              style={{ fontSize: "clamp(3.5rem, 8vw, 5rem)" }}>
              15+
            </span>
            <p className="font-sans text-sm text-white/50 mt-1">Years of excellence</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-8" aria-hidden="true" />

          {/* Timeline */}
          <div className="flex flex-col gap-0" role="list" aria-label="Company milestones">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -16 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.08 }}
                role="listitem"
                className="flex items-start gap-3 pb-5 last:pb-0 relative"
              >
                {/* Vertical line */}
                {i < MILESTONES.length - 1 && (
                  <div
                    className="absolute left-[13px] top-6 w-px h-full bg-white/10"
                    aria-hidden="true"
                  />
                )}

                {/* Dot */}
                <div
                  className={cn(
                    "w-[26px] h-[26px] rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 z-10",
                    i === MILESTONES.length - 1
                      ? "border-brand-orange bg-brand-orange"
                      : "border-white/20 bg-brand-navy"
                  )}
                  aria-hidden="true"
                >
                  {i === MILESTONES.length - 1 && (
                    <TrendingUp className="w-3 h-3 text-white" />
                  )}
                </div>

                <div>
                  <span className="font-display font-black text-brand-orange text-sm leading-none">
                    {m.year}
                  </span>
                  <p className="font-sans text-xs text-white/55 mt-0.5 leading-snug">
                    {m.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating badge — bottom left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 16 }}
        animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-card-hover px-5 py-4 flex items-center gap-3 border border-gray-100/80"
        aria-label="ISO 9001 certified"
      >
        <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center shrink-0" aria-hidden="true">
          <Award className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-display font-black text-xs text-brand-navy leading-tight">ISO 9001</p>
          <p className="font-sans text-[10px] text-text-muted">Certified Quality</p>
        </div>
      </motion.div>

      {/* Floating badge — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: -16 }}
        animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-card-hover px-5 py-4 flex items-center gap-3 border border-gray-100/80"
        aria-label="99.2% on-time delivery rate"
      >
        <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center shrink-0" aria-hidden="true">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-display font-black text-xs text-brand-navy leading-tight">99.2%</p>
          <p className="font-sans text-[10px] text-text-muted">On-time delivery</p>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main section ───────────────────────────────────────────
export default function AboutSection() {
  const { t } = useLocale();

  const panelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const panelInView = useInView(panelRef, { once: true, margin: "-80px" });
  const textInView = useInView(textRef, { once: true, margin: "-60px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-section-sm lg:py-section bg-white overflow-hidden"
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-navy/8 to-transparent" aria-hidden="true" />

      {/* Right-side glow */}
      <div className="absolute -right-40 top-1/3 w-96 h-96 rounded-full bg-brand-orange/5 blur-[80px] pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Two-column layout ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left: visual panel ──────────────────── */}
          <div ref={panelRef} className="order-2 lg:order-1">
            <AboutVisualPanel isVisible={panelInView} />
          </div>

          {/* ── Right: text content ─────────────────── */}
          <div ref={textRef} className="order-1 lg:order-2 flex flex-col gap-8">

            {/* Label + heading */}
            <div>
              <motion.span
                custom={0}
                variants={fadeRight}
                initial="hidden"
                animate={textInView ? "visible" : "hidden"}
                className="section-label"
                aria-hidden="true"
              >
                {t.about.sectionLabel}
              </motion.span>

              <motion.h2
                id="about-heading"
                custom={0.1}
                variants={fadeRight}
                initial="hidden"
                animate={textInView ? "visible" : "hidden"}
                className="section-title mt-3 leading-tight"
              >
                {t.about.title.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="text-brand-orange">
                  {t.about.title.split(" ").slice(-2).join(" ")}
                </span>
              </motion.h2>

              <motion.p
                custom={0.2}
                variants={fadeRight}
                initial="hidden"
                animate={textInView ? "visible" : "hidden"}
                className="section-subtitle mt-4"
              >
                {t.about.subtitle}
              </motion.p>
            </div>

            {/* Body paragraphs */}
            <div className="flex flex-col gap-5">
              {[t.about.body1, t.about.body2, t.about.body3].map((para, i) => (
                <motion.p
                  key={i}
                  custom={0.3 + i * 0.1}
                  variants={fadeRight}
                  initial="hidden"
                  animate={textInView ? "visible" : "hidden"}
                  className="font-sans text-base text-gray-600 leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Trust checkmarks */}
            <motion.ul
              custom={0.6}
              variants={fadeRight}
              initial="hidden"
              animate={textInView ? "visible" : "hidden"}
              className="flex flex-col gap-3"
              aria-label="Key commitments"
            >
              {[
                "Dedicated account manager for every client",
                "Real-time shipment tracking, 24 hours a day",
                "Transparent pricing — no hidden fees",
                "Euro VI certified fleet, reducing your carbon footprint",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-5 h-5 text-brand-orange mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-sans text-sm text-gray-700 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* CTA */}
            <motion.div
              custom={0.75}
              variants={fadeRight}
              initial="hidden"
              animate={textInView ? "visible" : "hidden"}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={() => scrollToSection("contact")}
                className="btn-primary group"
                aria-label="Get in touch with DAR Åkeri AB"
              >
                {t.about.cta}
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
              <a
                href="tel:+4680000000"
                className="btn-secondary"
                aria-label="Call us"
              >
                Call us directly
              </a>
            </motion.div>
          </div>
        </div>

        {/* ── Feature tiles grid ───────────────────────── */}
        <div ref={featuresRef} className="mt-20 lg:mt-28">

          {/* Divider label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={featuresInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" aria-hidden="true" />
            <span className="font-display font-bold text-xs uppercase tracking-widest text-text-subtle px-2">
              Why companies choose us
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" aria-hidden="true" />
          </motion.div>

          {/* 3×2 grid of feature tiles */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            role="list"
            aria-label="Our key features and certifications"
          >
            {t.about.features.map((feature, i) => {
              const Icon = FEATURE_ICONS[i] ?? Award;
              return (
                <div key={feature.title} role="listitem">
                  <FeatureTile
                    icon={Icon}
                    title={feature.title}
                    description={feature.description}
                    index={i}
                    isVisible={featuresInView}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom quote banner ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 rounded-3xl bg-surface border border-gray-100 px-8 py-9 md:px-12 relative overflow-hidden"
          role="complementary"
          aria-label="Company mission statement"
        >
          {/* Decorative quote mark */}
          <span
            className="absolute -top-4 left-8 font-display font-black text-9xl text-brand-navy/5 leading-none select-none pointer-events-none"
            aria-hidden="true"
          >
            "
          </span>

          <div className="relative max-w-3xl">
            <p className="font-display font-bold text-xl md:text-2xl text-brand-navy leading-snug">
              "We don't just move goods — we move businesses forward.
              <span className="text-brand-orange"> Every shipment</span> is a
              promise we keep."
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center" aria-hidden="true">
                <span className="font-display font-black text-xs text-white">DA</span>
              </div>
              <div>
                <p className="font-display font-bold text-sm text-brand-navy">DAR Åkeri AB</p>
                <p className="font-sans text-xs text-text-muted">Est. 2009 · Stockholm, Sweden</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
