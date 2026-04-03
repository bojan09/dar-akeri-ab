"use client";

// Re-export from LocaleProvider so either import path works
export { LocaleContext, useLocale } from "@/components/layout/LocaleProvider";

import { useState, useCallback } from "react";
import type { Locale } from "@/lib/i18n";
import { getTranslation, DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/lib/i18n";

// ── Standalone hook (outside context) ────────────────────
// Use this in isolated components / tests that don't have LocaleProvider above them
export function useLocaleState(initial: Locale = DEFAULT_LOCALE) {
  const [locale, setLocaleState] = useState<Locale>(initial);

  const setLocale = useCallback((next: Locale) => {
    if (!SUPPORTED_LOCALES.includes(next)) return;
    setLocaleState(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
    try {
      localStorage.setItem("dar-akeri-locale", next);
    } catch { /* silent */ }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "sv" : "en");
  }, [locale, setLocale]);

  return {
    locale,
    t: getTranslation(locale),
    setLocale,
    toggleLocale,
  };
}
