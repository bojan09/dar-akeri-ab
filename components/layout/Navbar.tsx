"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import { scrollToSection } from "@/lib/utils";
import Button from "@/components/ui/Button";
import {
  Menu,
  X,
  Truck,
  Phone,
  ChevronDown,
} from "lucide-react";

// ── Nav link type ─────────────────────────────────────────
interface NavItem {
  labelKey: keyof ReturnType<typeof useLocale>["t"]["nav"];
  sectionId: string;
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: "services", sectionId: "services" },
  { labelKey: "fleet", sectionId: "fleet" },
  { labelKey: "about", sectionId: "about" },
  { labelKey: "testimonials", sectionId: "testimonials" },
  { labelKey: "contact", sectionId: "contact" },
];

// ── Component ─────────────────────────────────────────────
export default function Navbar() {
  const { t, locale, toggleLocale } = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    NAV_ITEMS.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (sectionId: string) => {
      scrollToSection(sectionId);
      setMobileOpen(false);
    },
    []
  );

  return (
    <>
      <header
        role="banner"
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-300 ease-out-expo",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-card border-b border-gray-100"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── Logo ─────────────────────────────────── */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-xl p-1"
              aria-label="DAR Åkeri AB — go to top"
            >
              <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200",
                isScrolled ? "bg-brand-navy" : "bg-white/15 backdrop-blur-sm"
              )}>
                <Truck
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isScrolled ? "text-white" : "text-white"
                  )}
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className={cn(
                  "font-display font-black text-lg tracking-tight transition-colors duration-200",
                  isScrolled ? "text-brand-navy" : "text-white"
                )}>
                  DAR Åkeri
                </span>
                <span className={cn(
                  "font-sans text-[10px] font-medium uppercase tracking-widest transition-colors duration-200",
                  isScrolled ? "text-brand-orange" : "text-white/60"
                )}>
                  AB
                </span>
              </div>
            </button>

            {/* ── Desktop Nav ───────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_ITEMS.map(({ labelKey, sectionId }) => (
                <button
                  key={sectionId}
                  onClick={() => handleNavClick(sectionId)}
                  className={cn(
                    "relative px-4 py-2 rounded-xl font-sans font-medium text-sm",
                    "transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange",
                    activeSection === sectionId
                      ? isScrolled
                        ? "text-brand-navy bg-brand-navy/5"
                        : "text-white bg-white/15"
                      : isScrolled
                        ? "text-gray-600 hover:text-brand-navy hover:bg-brand-navy/5"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {t.nav[labelKey]}
                  {activeSection === sectionId && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-brand-orange"
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* ── Desktop Actions ───────────────────────── */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={toggleLocale}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl",
                  "font-sans font-semibold text-sm uppercase tracking-wider",
                  "transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange",
                  isScrolled
                    ? "text-gray-500 hover:text-brand-navy hover:bg-brand-navy/5"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
                aria-label={`Switch to ${locale === "en" ? "Swedish" : "English"}`}
              >
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded text-xs font-bold",
                    locale === "en"
                      ? "bg-brand-orange text-white"
                      : isScrolled ? "text-gray-400" : "text-white/50"
                  )}
                >
                  EN
                </span>
                <span className={isScrolled ? "text-gray-300" : "text-white/30"}>
                  /
                </span>
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded text-xs font-bold",
                    locale === "sv"
                      ? "bg-brand-orange text-white"
                      : isScrolled ? "text-gray-400" : "text-white/50"
                  )}
                >
                  SV
                </span>
              </button>

              {/* Phone quick-link */}
              <a
                href="tel:+4680000000"
                className={cn(
                  "hidden xl:flex items-center gap-1.5 font-sans font-medium text-sm",
                  "transition-colors duration-200",
                  isScrolled ? "text-gray-600 hover:text-brand-navy" : "text-white/80 hover:text-white"
                )}
                aria-label="Call us"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                +46 8 000 00 00
              </a>

              {/* CTA */}
              <Button
                variant={isScrolled ? "primary" : "ghost"}
                size="sm"
                onClick={() => handleNavClick("contact")}
              >
                {t.nav.getQuote}
              </Button>
            </div>

            {/* ── Mobile: Lang + Hamburger ──────────────── */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleLocale}
                className={cn(
                  "font-sans font-bold text-xs uppercase tracking-wider px-2.5 py-1.5 rounded-lg",
                  "transition-colors duration-200",
                  isScrolled
                    ? "text-brand-navy bg-brand-navy/5"
                    : "text-white bg-white/15"
                )}
                aria-label={`Switch language to ${locale === "en" ? "SV" : "EN"}`}
              >
                {locale === "en" ? "SV" : "EN"}
              </button>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-xl",
                  "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange",
                  isScrolled
                    ? "text-brand-navy hover:bg-brand-navy/5"
                    : "text-white hover:bg-white/15"
                )}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen
                  ? <X className="w-5 h-5" aria-hidden="true" />
                  : <Menu className="w-5 h-5" aria-hidden="true" />
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ─────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          "transition-all duration-300 ease-out-expo",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 bottom-0 w-[min(320px,85vw)]",
            "bg-white shadow-2xl flex flex-col",
            "transition-transform duration-300 ease-out-expo",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center">
                <Truck className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-display font-black text-base text-brand-navy">
                DAR Åkeri AB
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-brand-navy hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-4 py-6 flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map(({ labelKey, sectionId }, i) => (
              <button
                key={sectionId}
                onClick={() => handleNavClick(sectionId)}
                className={cn(
                  "flex items-center justify-between w-full",
                  "px-4 py-3.5 rounded-2xl text-left",
                  "font-sans font-semibold text-base",
                  "transition-all duration-200",
                  activeSection === sectionId
                    ? "bg-brand-navy text-white"
                    : "text-gray-700 hover:bg-surface hover:text-brand-navy"
                )}
                style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms" }}
              >
                {t.nav[labelKey]}
                <ChevronDown
                  className="w-4 h-4 -rotate-90 opacity-40"
                  aria-hidden="true"
                />
              </button>
            ))}
          </nav>

          {/* Bottom CTA */}
          <div className="px-4 pb-8 pt-4 border-t border-gray-100 flex flex-col gap-3">
            <a
              href="tel:+4680000000"
              className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-surface text-brand-navy font-sans font-medium text-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-navy/10 flex items-center justify-center">
                <Phone className="w-4 h-4 text-brand-navy" aria-hidden="true" />
              </div>
              +46 8 000 00 00
            </a>
            <Button
              fullWidth
              onClick={() => handleNavClick("contact")}
            >
              {t.nav.getQuote}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
