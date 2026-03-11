import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageToggle } from "./LanguageToggle";
import { Menu, X, ArrowLeft } from "lucide-react";

export function Header() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === "/";
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { id: "about", label: t.nav.about },
    { id: "upcoming", label: t.nav.sessions },
    { id: "get-involved", label: t.nav.get_involved },
  ];

  const scrollToSection = (id: string) => {
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 bg-background transition-[border-color] duration-200 ${
        scrolled ? "border-b border-border" : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-full items-center justify-between">
        {/* Left: back button then logo */}
        <div className="flex items-center gap-4">
          {!isHome && (
            <button
              onClick={() => navigate(-1)}
              className="hidden md:flex items-center gap-1.5 text-xs font-body font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} />
              {t.nav.back}
            </button>
          )}
          <Link to="/" className={`flex items-center gap-2 ${!isHome ? "hidden md:flex border-l border-border pl-4" : ""}`}>
            <img src="/wizelinered.svg" alt="Wizeline" className="h-7 w-auto" />
            <span className="font-heading text-sm font-medium uppercase tracking-widest text-foreground">
              Tech Talks
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm font-body font-medium text-muted-foreground transition-opacity hover:opacity-80"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: CTA + language + mobile menu */}
        <div className="flex items-center gap-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSctfSbZkvOvnFYagrXtqlmA8PS9LGo2fW58db-7w55hdSBwFQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center rounded-sm bg-primary px-4 py-2 text-xs font-body font-medium text-primary-foreground transition-opacity hover:opacity-80"
          >
            {t.nav.become_speaker}
          </a>
          <LanguageToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 pb-6 pt-4">
          <nav className="flex flex-col gap-4">
            {!isHome && (
              <button
                onClick={() => { navigate(-1); setMenuOpen(false); }}
                className="flex items-center gap-1.5 text-sm font-body font-medium text-muted-foreground"
              >
                <ArrowLeft size={14} />
                {t.nav.back}
              </button>
            )}
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-body font-medium text-muted-foreground text-left"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSctfSbZkvOvnFYagrXtqlmA8PS9LGo2fW58db-7w55hdSBwFQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-sm bg-primary px-4 py-2 text-xs font-body font-medium text-primary-foreground w-fit"
            >
              {t.nav.become_speaker}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
