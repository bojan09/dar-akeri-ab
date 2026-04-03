"use client";

import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import type { Locale, TranslationSchema } from "@/lib/i18n";
import { getTranslation, DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/lib/i18n";

// ── Constants ─────────────────────────────────────────────
const STORAGE_KEY = "dar-akeri-locale";

// ── Helper: resolve initial locale ────────────────────────
function resolveInitialLocale(): Locale {
  if (typeof window !== "undefined") {
    // 1. Check localStorage (user's explicit previous choice)
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && SUPPORTED_LOCALES.includes(stored)) return stored;
    } catch {
      // Storage blocked (private mode, etc.) — continue
    }

    // 2. Detect browser language
    const browserLang = navigator.language?.toLowerCase().split("-")[0] as Locale;
    if (SUPPORTED_LOCALES.includes(browserLang)) return browserLang;
  }

  // 3. Fall back to default
  return DEFAULT_LOCALE;
}

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

export function useLocale() {
  return useContext(LocaleContext);
}

// ── Provider ──────────────────────────────────────────────
export default function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Start with DEFAULT_LOCALE for SSR hydration safety,
  // then correct to user's real preference after mount
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const initial = resolveInitialLocale();
    setLocaleState(initial);
    document.documentElement.lang = initial;
    setHydrated(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    if (!SUPPORTED_LOCALES.includes(next)) return;

    setLocaleState(next);

    // Sync html[lang] attribute
    document.documentElement.lang = next;

    // Persist preference
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable — silent fail
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "sv" : "en");
  }, [locale, setLocale]);

  const value = useMemo(
    () => ({
      locale,
      t: getTranslation(locale),
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale]
  );

  return (
    <LocaleContext.Provider value={value}>
      <div
        style={{
          opacity: hydrated ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        {children}
      </div>
    </LocaleContext.Provider>
  );
}
