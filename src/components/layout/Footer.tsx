import { useLanguage } from "@/hooks/useLanguage";
import { BrandLockup } from "./BrandLockup";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-surface-dark text-surface-dark-foreground">
      <div className="container-page py-6 text-center">
        <BrandLockup
          theme="dark"
          className="justify-center mb-4"
          wizelineClassName="h-9 w-auto"
          aiClassName="h-9 w-auto"
        />
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
