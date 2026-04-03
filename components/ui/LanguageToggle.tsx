"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/layout/LocaleProvider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { SUPPORTED_LOCALES } from "@/lib/i18n";

// ── Label map ─────────────────────────────────────────────
const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  sv: "SV",
};

const LOCALE_FULL: Record<Locale, string> = {
  en: "English",
  sv: "Svenska",
};

// ── Variants ──────────────────────────────────────────────
type ToggleVariant = "pill" | "text" | "flag";
type ToggleTheme = "light" | "dark";

interface LanguageToggleProps {
  variant?: ToggleVariant;
  theme?: ToggleTheme;
  className?: string;
  showFullName?: boolean;
}

// ── Pill variant — sliding active indicator ───────────────
function PillToggle({
  theme,
  className,
}: {
  theme: ToggleTheme;
  className?: string;
}) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={cn(
        "relative flex items-center rounded-xl p-0.5 gap-0",
        theme === "dark"
          ? "bg-white/10 border border-white/15"
          : "bg-brand-navy/6 border border-brand-navy/10",
        className
      )}
    >
      {SUPPORTED_LOCALES.map((loc) => {
        const isActive = locale === loc;
        return (
          <button
            key={loc}
            onClick={() => setLocale(loc)}
            role="radio"
            aria-checked={isActive}
            aria-label={`Switch to ${LOCALE_FULL[loc]}`}
            className={cn(
              "relative z-10 px-3 py-1.5 rounded-[10px] text-xs font-display font-bold uppercase tracking-wider",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-1",
              isActive
                ? "text-white"
                : theme === "dark"
                ? "text-white/50 hover:text-white/80"
                : "text-brand-navy/50 hover:text-brand-navy"
            )}
          >
            {/* Sliding background pill */}
            {isActive && (
              <motion.span
                layoutId="locale-pill"
                className="absolute inset-0 rounded-[10px] bg-brand-orange"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                aria-hidden="true"
              />
            )}
            <span className="relative z-10">{LOCALE_LABELS[loc]}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Text variant — simple slash separator ─────────────────
function TextToggle({
  theme,
  showFullName,
  className,
}: {
  theme: ToggleTheme;
  showFullName?: boolean;
  className?: string;
}) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={cn("flex items-center gap-1", className)}
    >
      {SUPPORTED_LOCALES.map((loc, i) => {
        const isActive = locale === loc;
        return (
          <span key={loc} className="flex items-center gap-1">
            {i > 0 && (
              <span
                className={cn(
                  "text-xs",
                  theme === "dark" ? "text-white/20" : "text-brand-navy/20"
                )}
                aria-hidden="true"
              >
                /
              </span>
            )}
            <button
              onClick={() => setLocale(loc)}
              role="radio"
              aria-checked={isActive}
              aria-label={`Switch to ${LOCALE_FULL[loc]}`}
              className={cn(
                "px-1.5 py-0.5 rounded-lg text-xs font-display font-bold uppercase tracking-wider",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange",
                isActive
                  ? "bg-brand-orange text-white"
                  : theme === "dark"
                  ? "text-white/40 hover:text-white/70"
                  : "text-brand-navy/40 hover:text-brand-navy/70"
              )}
            >
              {showFullName ? LOCALE_FULL[loc] : LOCALE_LABELS[loc]}
            </button>
          </span>
        );
      })}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────
export default function LanguageToggle({
  variant = "pill",
  theme = "light",
  className,
  showFullName = false,
}: LanguageToggleProps) {
  if (variant === "text") {
    return (
      <TextToggle
        theme={theme}
        showFullName={showFullName}
        className={className}
      />
    );
  }

  return <PillToggle theme={theme} className={className} />;
}
