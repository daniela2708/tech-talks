import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-surface-dark text-surface-dark-foreground">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L10 26L16 12L22 26L28 6" stroke="hsl(358, 78%, 57%)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-heading text-sm font-medium uppercase tracking-widest">
                Tech Talks
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{t.footer.tagline}</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-sm text-muted-foreground hover:opacity-80 transition-opacity">{t.nav.home}</Link>
            <Link to="/sessions" className="text-sm text-muted-foreground hover:opacity-80 transition-opacity">{t.nav.sessions}</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:opacity-80 transition-opacity">{t.nav.about}</Link>
            <Link to="/newsletter" className="text-sm text-muted-foreground hover:opacity-80 transition-opacity">{t.nav.newsletter}</Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-muted-foreground">{t.footer.contact}</p>
            <p className="text-muted-foreground">{t.footer.host}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-muted-foreground/20 pt-6">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
