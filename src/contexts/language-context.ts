import { createContext } from "react";

import { en } from "@/i18n/en";

export type Lang = "en" | "es";
export type Translations = typeof en;

export interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);
