import { useLanguage } from "@/hooks/useLanguage";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-surface-dark text-surface-dark-foreground">
      <div className="container-page py-6 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
