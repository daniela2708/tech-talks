import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Play, FileText, ArrowRight, Users, Lightbulb, MessageSquare, TrendingUp, Code, BarChart3 } from "lucide-react";
import { sessions, type Session } from "@/data/sessions";
import { format, differenceInDays } from "date-fns";
import heroTeamImg from "@/assets/hero-team.jpg";

function HeroTicker() {
  const pastSessions = sessions.filter((s) => s.status === "past");
  const items = [...pastSessions, ...pastSessions];

  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-border py-3">
      <div className="ticker-scroll flex whitespace-nowrap">
        {items.map((s, i) => (
          <span key={i} className="mx-8 font-mono text-xs text-muted-foreground">
            [{s.number}] {s.speakers.join(", ")} | {s.topic_en}
          </span>
        ))}
      </div>
    </div>
  );
}


function UpcomingSessionCard({ session }: { session: Session }) {
  const { t, lang } = useLanguage();
  const daysUntil = differenceInDays(new Date(session.date), new Date());
  const isSoon = daysUntil >= 0 && daysUntil <= 7;

  return (
    <div className="border border-border p-6 rounded-sm">
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-primary text-sm font-medium">{session.number}</span>
        {isSoon && (
          <span className="font-mono text-xs text-primary border border-primary px-2 py-0.5 rounded-sm">
            {t.upcoming.happening_soon}
          </span>
        )}
      </div>
      <h3 className="font-heading text-lg font-medium mb-2">
        {lang === "en" ? session.topic_en : session.topic_es}
      </h3>
      {(lang === "en" ? session.description_en : session.description_es) && (
        <p className="text-sm text-muted-foreground mb-4">
          {lang === "en" ? session.description_en : session.description_es}
        </p>
      )}
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar size={14} /> {format(new Date(session.date), "MMM d, yyyy")}
        </span>
        {session.time && (
          <span className="flex items-center gap-1">
            <Clock size={14} /> {session.time}
          </span>
        )}
        {session.location && (
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {session.location}
          </span>
        )}
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        <span>{t.upcoming.speakers_label}: {session.speakers.join(", ")}</span>
        {session.host && <span className="ml-4">{t.upcoming.host_label}: {session.host}</span>}
      </div>
    </div>
  );
}

function VideoPreviewCard({ session }: { session: Session }) {
  const { lang } = useLanguage();

  return (
    <div className="border border-border rounded-sm overflow-hidden group">
      <div className="relative aspect-video bg-surface-dark flex items-center justify-center cursor-pointer">
        <div className="absolute inset-0 bg-surface-dark/90 flex flex-col items-center justify-center transition-colors group-hover:bg-surface-dark/80">
          <span className="font-mono text-primary text-xs mb-2">{session.number}</span>
          <h4 className="font-heading text-sm md:text-base font-medium text-surface-dark-foreground text-center px-4 max-w-md">
            {lang === "en" ? session.topic_en : session.topic_es}
          </h4>
          <p className="text-xs text-muted-foreground mt-2">{session.speakers.join(", ")}</p>
        </div>
        {session.recording_url && (
          <a
            href={session.recording_url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center transition-transform group-hover:scale-110">
              <Play size={24} className="text-primary-foreground ml-1" fill="currentColor" />
            </div>
          </a>
        )}
      </div>
      <div className="p-4 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {format(new Date(session.date), "MMM d, yyyy")}
        </p>
        <div className="flex gap-3">
          {session.slides_url && (
            <a
              href={session.slides_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium text-foreground hover:opacity-80 transition-opacity"
            >
              <FileText size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function FeaturedSession() {
  const { t, lang } = useLanguage();
  const featured = sessions.find((s) => s.status === "past");
  if (!featured) return null;

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-page">
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-6 block">
          {t.featured.label}
        </span>
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <span className="font-mono text-primary text-sm">{featured.number}</span>
            <p className="text-sm text-muted-foreground mt-1">
              {format(new Date(featured.date), "MMMM d, yyyy")}
            </p>
            <p className="text-sm text-muted-foreground">{featured.speakers.join(", ")}</p>
          </div>
          <div>
            <h3 className="font-heading text-xl font-medium mb-4">
              {lang === "en" ? featured.topic_en : featured.topic_es}
            </h3>
            <div className="flex gap-4">
              {featured.recording_url && (
                <a
                  href={featured.recording_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-80 transition-opacity"
                >
                  <Play size={16} /> {t.featured.watch}
                </a>
              )}
              {featured.slides_url && (
                <a
                  href={featured.slides_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-80 transition-opacity"
                >
                  <FileText size={16} /> {t.featured.slides}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const upcomingSessions = sessions.filter((s) => s.status === "upcoming");
  const pastWithRecordings = sessions.filter((s) => s.status === "past" && s.recording_url);

  return (
    <main className="pt-16">
      {/* Hero with background image */}
      <section className="relative flex min-h-screen flex-col items-center justify-center text-center px-4 sm:px-6">
        <img
          src={heroTeamImg}
          alt="Professionals collaborating in a tech workspace"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-surface-dark/75" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold leading-tight tracking-tight md:text-6xl text-surface-dark-foreground">
            {t.hero.headline}
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-surface-dark-foreground/70 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/sessions"
              className="inline-flex items-center rounded-sm bg-primary px-5 sm:px-6 py-3 text-sm font-body font-medium text-primary-foreground transition-opacity hover:opacity-80"
            >
              {t.hero.cta_primary}
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center rounded-sm border border-surface-dark-foreground px-5 sm:px-6 py-3 text-sm font-body font-medium text-surface-dark-foreground transition-opacity hover:opacity-80"
            >
              {t.hero.cta_secondary}
            </Link>
          </div>
        </div>
        <HeroTicker />
      </section>

      {/* About */}
      <section className="section-spacing">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <Users size={28} className="text-primary mb-3" />
              <span className="font-mono text-primary text-2xl font-medium">{t.about_section.label}</span>
              <h2 className="font-heading text-2xl font-medium mt-2">{t.about_section.heading}</h2>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <p className="text-muted-foreground leading-relaxed">{t.about_section.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Format */}
      <section className="section-spacing">
        <div className="container-page">
          <div className="mb-12">
            <span className="font-mono text-primary text-2xl font-medium">{t.format.label}</span>
            <h2 className="font-heading text-2xl font-medium mt-2">{t.format.heading}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Calendar, title: t.format.card1_title, body: t.format.card1_body },
              { icon: MapPin, title: t.format.card2_title, body: t.format.card2_body },
              { icon: Clock, title: t.format.card3_title, body: t.format.card3_body },
            ].map((card) => (
              <div key={card.title} className="border border-border p-6 rounded-sm">
                <card.icon size={20} className="text-muted-foreground mb-4" />
                <h3 className="font-heading text-base font-medium mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Participate */}
      <section className="bg-surface-dark text-surface-dark-foreground section-spacing">
        <div className="container-page">
          <h2 className="font-heading text-3xl font-medium mb-12">{t.why.heading}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {t.why.items.map((item) => (
              <div key={item.number}>
                <span className="font-mono text-primary text-sm">{item.number}</span>
                <h3 className="font-heading text-lg font-medium mt-1 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming */}
      <section className="section-spacing">
        <div className="container-page">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-heading text-3xl font-medium">{t.upcoming.heading}</h2>
            <Link
              to="/sessions"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
            >
              {t.hero.cta_primary} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {upcomingSessions.map((s) => (
              <UpcomingSessionCard key={s.number} session={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Previews */}
      {pastWithRecordings.length > 0 && (
        <section className="section-spacing bg-secondary">
          <div className="container-page">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-heading text-3xl font-medium">{t.featured.label}</h2>
              <Link
                to="/sessions"
                className="flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
              >
                {t.sessions_page?.title || "Sessions"} <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastWithRecordings.slice(0, 3).map((s) => (
                <VideoPreviewCard key={s.number} session={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="section-spacing">
        <div className="container-page max-w-xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">{t.newsletter_section.heading}</h2>
          <p className="text-muted-foreground mb-8">{t.newsletter_section.subtitle}</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder={t.newsletter_section.placeholder}
              className="flex-1 rounded-sm border border-border bg-background px-4 py-3 text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="rounded-sm bg-primary px-6 py-3 text-sm font-body font-medium text-primary-foreground transition-opacity hover:opacity-80"
            >
              {t.newsletter_section.button}
            </button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">{t.newsletter_section.disclaimer}</p>
        </div>
      </section>
    </main>
  );
}
