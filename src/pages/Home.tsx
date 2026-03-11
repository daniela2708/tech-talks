import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Play, FileText, ArrowRight, Users, Lightbulb, MessageSquare, Code, BarChart3, User, Send, MessageCircle, Layout } from "lucide-react";
import { sessions, type Session } from "@/data/sessions";
import { format, differenceInDays } from "date-fns";
import heroTeamImg from "@/assets/hero-team.jpg";

function HeroTicker() {
  const pastSessions = sessions.filter((s) => s.status === "past");
  const items = [...pastSessions, ...pastSessions];

  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden bg-black/60 backdrop-blur-sm border-t border-white/10 py-3">
      <div className="ticker-scroll flex whitespace-nowrap">
        {items.map((s, i) => (
          <span key={i} className="mx-8 font-mono text-xs text-white/50">
            <span className="text-primary mr-2">[{s.number}]</span>
            {s.speakers.join(", ")}
            <span className="text-white/30 mx-2">|</span>
            {s.topic_en}
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
    <div className="group relative border border-border rounded-sm overflow-hidden hover:border-primary/50 transition-colors duration-300">
      {/* Top accent bar */}
      <div className="h-0.5 bg-primary" />
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-primary text-sm font-medium bg-primary/8 px-2 py-0.5 rounded-sm border border-primary/20 flex-shrink-0">
              {session.number}
            </span>
            <h3 className="font-heading text-lg font-medium group-hover:text-primary transition-colors duration-200">
              {lang === "en" ? session.topic_en : session.topic_es}
            </h3>
          </div>
          {isSoon && (
            <span className="font-mono text-xs text-primary border border-primary/40 bg-primary/8 px-2 py-0.5 rounded-sm animate-pulse flex-shrink-0 ml-2">
              {t.upcoming.happening_soon}
            </span>
          )}
        </div>
        {(lang === "en" ? session.description_en : session.description_es) && (
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            {lang === "en" ? session.description_en : session.description_es}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-sm">
            <Calendar size={12} className="text-primary" />
            {format(new Date(session.date), "MMM d, yyyy")}
          </span>
          {session.time && (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-sm">
              <Clock size={12} className="text-primary" />
              {session.time}
            </span>
          )}
          {session.location && (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-sm">
              <MapPin size={12} className="text-primary" />
              {session.location}
            </span>
          )}
        </div>
        <div className="border-t border-border pt-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            <span className="text-foreground/60">{t.upcoming.speakers_label}:</span>{" "}
            <span className="font-medium text-foreground/80">{session.speakers.join(", ")}</span>
          </p>
          {session.host && (
            <p className="text-xs text-muted-foreground">
              <span className="text-foreground/60">{t.upcoming.host_label}:</span>{" "}
              <span className="font-medium">{session.host}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function VideoPreviewCard({ session }: { session: Session }) {
  const { lang, t } = useLanguage();

  return (
    <div className="border border-border rounded-sm overflow-hidden group hover:border-primary/40 transition-colors duration-300">
      <div className="relative aspect-video bg-surface-dark flex items-center justify-center cursor-pointer overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 flex flex-col items-center justify-center transition-all duration-300 group-hover:from-black/80 group-hover:via-black/60 group-hover:to-black/40">
          <span className="font-mono text-primary text-xs mb-3 border border-primary/30 bg-primary/10 px-2 py-0.5 rounded-sm">
            {session.number}
          </span>
          <h4 className="font-heading text-sm md:text-base font-medium text-white text-center px-4 max-w-md leading-snug">
            {lang === "en" ? session.topic_en : session.topic_es}
          </h4>
          <p className="text-xs text-white/50 mt-2">{session.speakers.join(", ")}</p>
        </div>
        {session.recording_url && (
          <a
            href={session.recording_url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <div className="w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary/50">
              <Play size={22} className="text-white ml-1" fill="currentColor" />
            </div>
          </a>
        )}
      </div>
      <div className="p-4 flex items-center justify-between bg-card">
        <p className="text-xs text-muted-foreground font-mono">
          {format(new Date(session.date), "MMM d, yyyy")}
        </p>
        <div className="flex gap-3">
          {session.slides_url && (
            <a
              href={session.slides_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <FileText size={14} />
              <span>{t.featured.slides}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}


export default function Home() {
  const { t } = useLanguage();
  const upcomingSessions = sessions.filter((s) => s.status === "upcoming");
  const pastWithRecordings = sessions.filter((s) => s.status === "past" && s.recording_url);

  return (
    <main className="pt-16">
      {/* Hero */}
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
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSctfSbZkvOvnFYagrXtqlmA8PS9LGo2fW58db-7w55hdSBwFQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-sm bg-primary px-5 sm:px-6 py-3 text-sm font-body font-medium text-primary-foreground transition-opacity hover:opacity-80"
            >
              {t.hero.cta_secondary}
            </a>
            <a
              href="#upcoming"
              className="inline-flex items-center rounded-sm border border-surface-dark-foreground px-5 sm:px-6 py-3 text-sm font-body font-medium text-surface-dark-foreground transition-opacity hover:opacity-80"
            >
              {t.hero.cta_primary}
            </a>
          </div>
        </div>

        <HeroTicker />
      </section>

      {/* About */}
      <section id="about" className="section-spacing">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-sm bg-primary/10 border border-primary/20">
                  <Users size={20} className="text-primary" />
                </div>
                <span className="font-mono text-primary text-sm tracking-widest uppercase font-bold">{t.about_section.label}</span>
              </div>
              <h2 className="font-heading text-3xl font-medium">{t.about_section.heading}</h2>
            </div>
            <div className="md:col-span-7 md:col-start-5 md:border-l md:border-border md:pl-8">
              <p className="text-muted-foreground leading-relaxed text-base">{t.about_page.origin_body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Format */}
      <section id="format" className="section-spacing bg-secondary/50">
        <div className="container-page">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-sm bg-primary/10 border border-primary/20">
                <Layout size={20} className="text-primary" />
              </div>
              <span className="font-mono text-primary text-sm tracking-widest uppercase font-bold">{t.format.label}</span>
            </div>
            <h2 className="font-heading text-3xl font-medium">{t.format.heading}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Calendar, title: t.format.card1_title, body: t.format.card1_body, num: "01" },
              { icon: MapPin, title: t.format.card2_title, body: t.format.card2_body, num: "02" },
              { icon: Clock, title: t.format.card3_title, body: t.format.card3_body, num: "03" },
            ].map((card) => (
              <div
                key={card.title}
                className="group relative border border-border bg-background p-6 rounded-sm overflow-hidden hover:border-primary/40 transition-colors duration-300"
              >
                {/* Ghost number */}
                <span className="absolute top-3 right-4 font-mono text-6xl font-bold text-border/60 select-none group-hover:text-primary/10 transition-colors duration-300">
                  {card.num}
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex items-center justify-center w-9 h-9 rounded-sm bg-primary/8 border border-primary/15">
                      <card.icon size={18} className="text-primary" />
                    </div>
                    <h3 className="font-heading text-base font-bold">{card.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Participate */}
      <section className="bg-surface-dark text-surface-dark-foreground section-spacing">
        <div className="container-page">
          <h2 className="font-heading text-3xl font-medium mb-14">{t.why.heading}</h2>
          <div className="grid gap-10 md:grid-cols-2">
            {t.why.items.map((item, idx) => {
              const icons = [Lightbulb, Code, BarChart3, MessageSquare];
              const Icon = icons[idx % icons.length];
              return (
                <div key={item.number} className="group border-l border-white/10 pl-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-sm bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 transition-colors duration-200">
                      <Icon size={12} className="text-primary" />
                    </div>
                    <span className="font-mono text-primary text-xs tracking-widest font-bold">{item.number}</span>
                    <h3 className="font-heading text-lg font-medium">{item.title}</h3>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section id="upcoming" className="section-spacing">
        <div className="container-page">
          <div className="flex items-end justify-between mb-12">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-primary text-sm tracking-widest uppercase font-bold">{t.upcoming.label}</span>
              <h2 className="font-heading text-3xl font-medium">{t.upcoming.heading}</h2>
            </div>
            <Link
              to="/sessions"
              className="flex items-center gap-1.5 text-sm font-medium text-primary hover:opacity-80 transition-opacity mb-1"
            >
              {t.sessions_page.title} <ArrowRight size={16} />
            </Link>
          </div>
          {upcomingSessions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingSessions.map((s) => (
                <UpcomingSessionCard key={s.number} session={s} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border rounded-sm p-12 text-center">
              <p className="text-muted-foreground font-mono text-sm">{t.upcoming.empty}</p>
              <Link to="/sessions" className="inline-flex items-center gap-1.5 text-sm text-primary mt-4 hover:opacity-80">
                {t.upcoming.view_all} <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Past Recordings */}
      {pastWithRecordings.length > 0 && (
        <section id="recordings" className="section-spacing bg-secondary/40">
          <div className="container-page">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="font-mono text-primary text-sm tracking-widest uppercase font-bold">{t.featured.library_label}</span>
                <h2 className="font-heading text-3xl font-medium mt-2">{t.featured.label}</h2>
              </div>
              <Link
                to="/sessions"
                className="flex items-center gap-1.5 text-sm font-medium text-primary hover:opacity-80 transition-opacity mb-1"
              >
                {t.sessions_page.title} <ArrowRight size={16} />
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

      {/* Organizer & Get Involved */}
      <section id="get-involved" className="section-spacing">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Organizer */}
            <div className="border border-border rounded-sm p-6">
              <span className="font-mono text-primary text-xs tracking-widest uppercase">{t.about_page.organizer_label}</span>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-heading font-medium">{t.about_page.organizer_name}</p>
                  <p className="text-sm text-muted-foreground">{t.about_page.organizer_role}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">{t.about_page.organizer_slack}</p>
                </div>
              </div>
            </div>

            {/* CTA Cards */}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSctfSbZkvOvnFYagrXtqlmA8PS9LGo2fW58db-7w55hdSBwFQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary rounded-sm p-6 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2 mb-3">
                <Send size={18} className="text-primary" />
                <h3 className="font-heading text-lg font-medium">{t.about_page.cta_submit_title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t.about_page.cta_submit_body}</p>
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeqiy4PaQV0YfyHUZnxBz2YVI0cWMFJCqhqakNsnlBpH2rlZQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border rounded-sm p-6 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle size={18} className="text-muted-foreground" />
                <h3 className="font-heading text-lg font-medium">{t.about_page.cta_feedback_title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t.about_page.cta_feedback_body}</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
