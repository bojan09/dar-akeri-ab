"use client";

import { useMemo, useState } from "react";
import { LocaleContext } from "@/hooks/useLocale";
import { getTranslation, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export default function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  const value = useMemo(() => {
    const setLocale = (next: Locale) => {
      setLocaleState(next);
      if (typeof document !== "undefined") {
        document.documentElement.lang = next;
      }
    };
    return {
      locale,
      t: getTranslation(locale),
      setLocale,
      toggleLocale: () => setLocale(locale === "en" ? "sv" : "en"),
    };
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
