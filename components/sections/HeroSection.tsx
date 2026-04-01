"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";
import { scrollToSection } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  ArrowRight,
  ChevronDown,
  Star,
  Shield,
  Zap,
  MapPin,
} from "lucide-react";

// ── Animation variants ─────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ── Animated counter hook ─────────────────────────────────
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ── Floating truck icon ────────────────────────────────────
function FloatingTruckSVG() {
  return (
    <motion.div
      className="absolute right-0 bottom-0 w-full h-full pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.8 }}
      aria-hidden="true"
    >
      {/* Large semi-transparent truck silhouette */}
      <svg
        viewBox="0 0 800 400"
        className="absolute bottom-0 right-0 w-[80%] max-w-2xl h-auto opacity-[0.07]"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M680 220 L680 160 L600 100 L480 100 L480 60 L60 60 L60 280 L120 280 C120 308 143 330 172 330 C201 330 224 308 224 280 L540 280 C540 308 563 330 592 330 C621 330 644 308 644 280 L720 280 L720 220 Z M600 120 L660 170 L480 170 L480 120 Z" />
        <circle cx="172" cy="300" r="35" />
        <circle cx="592" cy="300" r="35" />
      </svg>
    </motion.div>
  );
}

// ── Stat card ─────────────────────────────────────────────
interface StatCardProps {
  value: string;
  label: string;
  index: number;
  isVisible: boolean;
}

function StatCard({ value, label, index, isVisible }: StatCardProps) {
  // Parse numeric prefix for animation
  const numMatch = value.match(/^(\d+)/);
  const numPart = numMatch ? parseInt(numMatch[1]) : 0;
  const suffix = value.replace(/^\d+/, "");
  const animated = useCountUp(numPart, 1800, isVisible);

  return (
    <motion.div
      custom={0.8 + index * 0.1}
      variants={fadeUp}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="flex flex-col gap-1 px-6 py-5 border-r border-white/10 last:border-r-0 first:pl-0 last:pr-0"
    >
      <span className="font-display font-black text-white leading-none tabular-nums"
        style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
        {numPart > 0 ? `${animated}${suffix}` : value}
      </span>
      <span className="font-sans text-sm text-white/55 leading-tight">{label}</span>
    </motion.div>
  );
}

// ── Trust pill ────────────────────────────────────────────
function TrustPill({
  icon: Icon,
  text,
  delay,
}: {
  icon: React.ElementType;
  text: string;
  delay: number;
}) {
  return (
    <motion.div
      custom={delay}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/8 border border-white/10 backdrop-blur-sm"
    >
      <Icon className="w-3.5 h-3.5 text-brand-orange shrink-0" aria-hidden="true" />
      <span className="font-sans text-xs font-medium text-white/70">{text}</span>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────
export default function HeroSection() {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Trigger counter when section mounts
  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { value: t.hero.stat1Value, label: t.hero.stat1Label },
    { value: t.hero.stat2Value, label: t.hero.stat2Label },
    { value: t.hero.stat3Value, label: t.hero.stat3Label },
  ];

  const trustPills = [
    { icon: Shield, text: "ISO 9001 Certified", delay: 0.9 },
    { icon: Zap, text: "99.2% On-Time Rate", delay: 1.0 },
    { icon: MapPin, text: "Sweden & Europe", delay: 1.1 },
    { icon: Star, text: "4.9 / 5 Client Rating", delay: 1.2 },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero — DAR Åkeri AB"
      className="relative min-h-screen flex flex-col overflow-hidden bg-surface-dark"
    >
      {/* ── Background layers ─────────────────────────── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-hero-gradient" />

        {/* Dot grid */}
        <div className="absolute inset-0 bg-dot-pattern opacity-40" />

        {/* Radial glow — left */}
        <div className="absolute -left-40 top-1/4 w-[600px] h-[600px] rounded-full bg-brand-orange/10 blur-[100px]" />

        {/* Radial glow — right */}
        <div className="absolute -right-20 bottom-1/4 w-[500px] h-[500px] rounded-full bg-brand-navy-light/40 blur-[80px]" />

        {/* Diagonal accent line */}
        <div
          className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-brand-orange/10 to-transparent"
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Truck silhouette ───────────────────────────── */}
      <FloatingTruckSVG />

      {/* ── Main content ──────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 flex-1 flex flex-col justify-center pt-24 pb-10 lg:pt-32 lg:pb-0"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">

            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Badge variant="white" dot className="mb-8">
                {t.hero.badge}
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-display font-black text-white leading-[1.02] tracking-tight"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              {t.hero.headline}{" "}
              <span className="relative inline-block">
                <span className="text-brand-orange">{t.hero.headlineAccent}</span>
                {/* Underline accent */}
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-brand-orange rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden="true"
                />
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              custom={0.25}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-7 text-lg lg:text-xl font-sans text-white/65 leading-relaxed max-w-2xl"
            >
              {t.hero.subtext}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Button
                variant="primary"
                size="xl"
                onClick={() => scrollToSection("contact")}
                iconRight={<ArrowRight className="w-5 h-5" />}
                aria-label={t.hero.cta}
              >
                {t.hero.cta}
              </Button>
              <Button
                variant="ghost"
                size="xl"
                onClick={() => scrollToSection("services")}
                aria-label={t.hero.ctaSecondary}
              >
                {t.hero.ctaSecondary}
              </Button>
            </motion.div>

            {/* Trust pills */}
            <motion.div
              custom={0.55}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-wrap gap-2.5"
              role="list"
              aria-label="Certifications and key metrics"
            >
              {trustPills.map((pill) => (
                <div key={pill.text} role="listitem">
                  <TrustPill {...pill} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Stats bar ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mt-auto"
        aria-label="Key statistics"
      >
        {/* Gradient fade above bar */}
        <div
          className="h-24 bg-gradient-to-t from-black/30 to-transparent"
          aria-hidden="true"
        />

        <div className="bg-white/5 backdrop-blur-md border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-stretch divide-y sm:divide-y-0 sm:divide-x divide-white/10 py-2">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex-1 py-5 sm:py-0">
                  <StatCard
                    value={stat.value}
                    label={stat.label}
                    index={i}
                    isVisible={statsVisible}
                  />
                </div>
              ))}

              {/* Extra: Client logos teaser */}
              <motion.div
                custom={1.1}
                variants={fadeIn}
                initial="hidden"
                animate={statsVisible ? "visible" : "hidden"}
                className="flex-1 px-6 py-5 flex flex-col gap-1 sm:justify-center"
              >
                <div className="flex -space-x-2 mb-2" aria-hidden="true">
                  {["NB", "GF", "SM", "SR"].map((initials, i) => (
                    <div
                      key={initials}
                      className="w-8 h-8 rounded-full bg-brand-navy border-2 border-white/20 flex items-center justify-center text-[9px] font-display font-bold text-white/70"
                      style={{ zIndex: 4 - i }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <span className="font-display font-black text-white leading-none" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                  500+
                </span>
                <span className="font-sans text-sm text-white/55 leading-tight">
                  Trusted companies
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => scrollToSection("services")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-xl p-2"
        aria-label="Scroll to services section"
      >
        <span className="font-sans text-[10px] uppercase tracking-widest font-bold">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </motion.div>
      </motion.button>
    </section>
  );
}
