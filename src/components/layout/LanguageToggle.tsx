import { useLanguage } from "@/hooks/useLanguage";

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="flex items-center rounded-full border border-border px-3 py-1 text-sm font-body font-medium transition-opacity hover:opacity-80"
      aria-label="Toggle language"
    >
      <span className={lang === "es" ? "text-primary font-semibold" : "text-muted-foreground"}>
        ES
      </span>
      <span className="mx-1.5 text-muted-foreground">/</span>
      <span className={lang === "en" ? "text-primary font-semibold" : "text-muted-foreground"}>
        EN
      </span>
    </button>
  );
}
