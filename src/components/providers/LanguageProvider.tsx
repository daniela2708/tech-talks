import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  LanguageContext,
  type Lang,
  type Translations,
} from "@/contexts/language-context";
import { en } from "@/i18n/en";
import { es } from "@/i18n/es";

const translations: Record<Lang, Translations> = { en, es };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = useCallback(() => {
    setLang((current) => (current === "en" ? "es" : "en"));
  }, []);

  const value = useMemo(
    () => ({ lang, t: translations[lang], toggleLang }),
    [lang, toggleLang],
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
