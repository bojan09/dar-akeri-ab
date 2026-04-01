"use client";

import { useState, useCallback, createContext, useContext } from "react";
import type { Locale, TranslationSchema } from "@/lib/i18n";
import { getTranslation, DEFAULT_LOCALE } from "@/lib/i18n";

// ── Context ───────────────────────────────────────────────
interface LocaleContextValue {
  locale: Locale;
  t: TranslationSchema;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  t: getTranslation(DEFAULT_LOCALE),
  setLocale: () => {},
  toggleLocale: () => {},
});

// ── Hook ─────────────────────────────────────────────────
export function useLocale() {
  return useContext(LocaleContext);
}

// ── Hook for standalone use (without context) ─────────────
export function useLocaleState(initial: Locale = DEFAULT_LOCALE) {
  const [locale, setLocaleState] = useState<Locale>(initial);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "sv" : "en");
  }, [locale, setLocale]);

  const t = getTranslation(locale);

  return { locale, t, setLocale, toggleLocale };
}
