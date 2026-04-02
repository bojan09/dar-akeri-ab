"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";
import { scrollToSection } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Star, Quote, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// ── Star rating ────────────────────────────────────────────
function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < count ? "fill-brand-orange text-brand-orange" : "fill-gray-200 text-gray-200"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

// ── Avatar initials ────────────────────────────────────────
const AVATAR_COLORS = [
  "bg-brand-navy text-white",
  "bg-brand-orange text-white",
  "bg-emerald-700 text-white",
  "bg-slate-700 text-white",
];

function Avatar({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-base shrink-0",
        AVATAR_COLORS[index % AVATAR_COLORS.length]
      )}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

// ── Testimonial card ───────────────────────────────────────
interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  index: number;
  featured?: boolean;
}

function TestimonialCard({
  quote,
  name,
  role,
  company,
  index,
  featured = false,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-3xl p-7 border transition-all duration-300",
        featured
          ? "bg-brand-navy border-brand-navy-light shadow-card-hover"
          : "bg-white border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1"
      )}
      aria-labelledby={`testimonial-name-${index}`}
    >
      {/* Quote icon */}
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center mb-5 shrink-0",
          featured ? "bg-brand-orange" : "bg-brand-navy/6"
        )}
        aria-hidden="true"
      >
        <Quote
          className={cn("w-5 h-5", featured ? "text-white" : "text-brand-navy")}
        />
      </div>

      {/* Stars */}
      <StarRating />

      {/* Quote text */}
      <blockquote
        className={cn(
          "mt-4 font-sans text-sm leading-relaxed flex-1",
          featured ? "text-white/75" : "text-gray-600"
        )}
      >
        "{quote}"
      </blockquote>

      {/* Divider */}
      <div
        className={cn("my-5 h-px", featured ? "bg-white/10" : "bg-gray-100")}
        aria-hidden="true"
      />

      {/* Author */}
      <footer className="flex items-center gap-3">
        <Avatar name={name} index={index} />
        <div>
          <p
            id={`testimonial-name-${index}`}
            className={cn(
              "font-display font-bold text-sm leading-tight",
              featured ? "text-white" : "text-brand-navy"
            )}
          >
            {name}
          </p>
          <p
            className={cn(
              "font-sans text-xs mt-0.5",
              featured ? "text-white/50" : "text-text-muted"
            )}
          >
            {role} · {company}
          </p>
        </div>
      </footer>
    </article>
  );
}

// ── Mobile carousel controls ───────────────────────────────
function CarouselDots({
  total,
  active,
  onSelect,
}: {
  total: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === active}
          aria-label={`Go to testimonial ${i + 1}`}
          onClick={() => onSelect(i)}
          className={cn(
            "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange",
            i === active
              ? "w-6 h-2.5 bg-brand-orange"
              : "w-2.5 h-2.5 bg-brand-navy/20 hover:bg-brand-navy/40"
          )}
        />
      ))}
    </div>
  );
}

// ── Trust logos strip ──────────────────────────────────────
const TRUST_COMPANIES = [
  "Nordic Build AB",
  "Göteborg Foods Group",
  "Scandinavian MedSupply",
  "Stockholm Retail Solutions",
  "Uppsala Logistics",
  "Malmö Industrial AB",
];

function TrustLogosStrip({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="mt-14 pt-10 border-t border-gray-100">
      <motion.p
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center font-sans text-xs uppercase tracking-widest font-bold text-text-subtle mb-7"
      >
        Trusted by leading Swedish companies
      </motion.p>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {TRUST_COMPANIES.map((company, i) => (
          <motion.span
            key={company}
            initial={{ opacity: 0, y: 8 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
            className="font-display font-bold text-sm text-brand-navy/25 hover:text-brand-navy/50 transition-colors duration-200 cursor-default"
          >
            {company}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

// ── Main section ───────────────────────────────────────────
export default function TestimonialsSection() {
  const { t } = useLocale();
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });
  const logosInView = useInView(logosRef, { once: true, margin: "-40px" });

  const [activeIndex, setActiveIndex] = useState(0);
  const items = t.testimonials.items;

  const prev = () => setActiveIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setActiveIndex((i) => (i + 1) % items.length);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative py-section-sm lg:py-section bg-surface overflow-hidden"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-navy/8 to-transparent" aria-hidden="true" />

      {/* Background accent */}
      <div className="absolute inset-0 bg-stripe-pattern opacity-40" aria-hidden="true" />
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-orange/5 blur-[80px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────── */}
        <div ref={headerRef} className="flex flex-col items-center text-center gap-4 mb-14">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="section-label"
            aria-hidden="true"
          >
            {t.testimonials.sectionLabel}
          </motion.span>

          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title max-w-2xl leading-tight"
          >
            {t.testimonials.title.split(" ").slice(0, 5).join(" ")}{" "}
            <span className="text-brand-orange">
              {t.testimonials.title.split(" ").slice(5).join(" ")}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="section-subtitle max-w-xl"
          >
            {t.testimonials.subtitle}
          </motion.p>

          {/* Overall rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-gray-100 shadow-card"
            aria-label="Overall rating: 4.9 out of 5 from 120 reviews"
          >
            <StarRating />
            <span className="font-display font-black text-brand-navy text-lg leading-none">4.9</span>
            <span className="font-sans text-xs text-text-muted">from 120+ reviews</span>
          </motion.div>
        </div>

        {/* ── Desktop grid ────────────────────────────── */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5"
          role="list"
          aria-label="Client testimonials"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              role="listitem"
              variants={{
                hidden: { opacity: 0, y: 36 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <TestimonialCard {...item} index={i} featured={i === 1} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Mobile carousel ──────────────────────────── */}
        <div className="md:hidden" aria-label="Testimonials carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <TestimonialCard
                {...items[activeIndex]}
                index={activeIndex}
                featured={activeIndex === 1}
              />
            </motion.div>
          </AnimatePresence>

          {/* Carousel controls */}
          <div className="flex items-center justify-between mt-6">
            <CarouselDots
              total={items.length}
              active={activeIndex}
              onSelect={setActiveIndex}
            />
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-brand-navy hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-xl bg-brand-navy border border-brand-navy flex items-center justify-center text-white hover:bg-brand-navy-dark transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* ── CTA row ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={() => scrollToSection("contact")}
            className="btn-primary group"
            aria-label="Join our satisfied clients"
          >
            Join 500+ satisfied clients
            <ArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </motion.div>

        {/* ── Trust logos strip ────────────────────────── */}
        <div ref={logosRef}>
          <TrustLogosStrip isVisible={logosInView} />
        </div>
      </div>
    </section>
  );
}
