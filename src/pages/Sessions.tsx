import { useState, useMemo } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { sessions, allTags } from "@/data/sessions";
import { Play, FileText, Github, CalendarPlus, LayoutGrid, List } from "lucide-react";
import { format } from "date-fns";
import { getTrustedExternalHref } from "@/lib/security";

type StatusFilter = "all" | "upcoming" | "past";
type ViewMode = "grid" | "list";

const coverThemes: Record<
  string,
  {
    halo: string;
    badge: string;
    chip: string;
    line: string;
  }
> = {
  GenAI: {
    halo: "bg-primary/30",
    badge: "border-primary/40 bg-primary/10 text-primary",
    chip: "border-primary/30 bg-primary/10 text-primary",
    line: "from-primary via-primary/40 to-transparent",
  },
  MLOps: {
    halo: "bg-sky-400/30",
    badge: "border-sky-300/40 bg-sky-400/10 text-sky-100",
    chip: "border-sky-300/30 bg-sky-400/10 text-sky-100",
    line: "from-sky-300 via-sky-300/40 to-transparent",
  },
  "Data Engineering": {
    halo: "bg-emerald-400/30",
    badge: "border-emerald-300/40 bg-emerald-400/10 text-emerald-100",
    chip: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
    line: "from-emerald-300 via-emerald-300/40 to-transparent",
  },
  Security: {
    halo: "bg-amber-300/30",
    badge: "border-amber-200/40 bg-amber-300/10 text-amber-100",
    chip: "border-amber-200/30 bg-amber-300/10 text-amber-100",
    line: "from-amber-200 via-amber-200/40 to-transparent",
  },
  Visualization: {
    halo: "bg-fuchsia-400/30",
    badge: "border-fuchsia-300/40 bg-fuchsia-400/10 text-fuchsia-100",
    chip: "border-fuchsia-300/30 bg-fuchsia-400/10 text-fuchsia-100",
    line: "from-fuchsia-300 via-fuchsia-300/40 to-transparent",
  },
  Other: {
    halo: "bg-white/20",
    badge: "border-white/20 bg-white/10 text-white",
    chip: "border-white/20 bg-white/10 text-white",
    line: "from-white via-white/40 to-transparent",
  },
};

function SessionCover({
  session,
  lang,
  compact = false,
}: {
  session: (typeof sessions)[number];
  lang: "en" | "es";
  compact?: boolean;
}) {
  const theme = coverThemes[session.tags[0]] ?? coverThemes.Other;
  const title = lang === "en" ? session.topic_en : session.topic_es;

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(140deg,#020617_0%,#0f172a_55%,#1f2937_100%)]" />
      <div className={`absolute -right-12 top-8 h-36 w-36 rounded-full blur-3xl ${theme.halo}`} />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/8 to-transparent" />
      <div className="absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-black/45 to-transparent" />

      <div className={`relative flex h-full flex-col justify-between ${compact ? "p-3" : "p-5"}`}>
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
                Wizeline
              </p>
              <h3 className={`mt-2 font-heading font-semibold tracking-tight ${compact ? "text-lg leading-tight" : "text-3xl leading-none"}`}>
                AI at Work
              </h3>
            </div>
            <span className={`inline-flex rounded-full border px-2.5 py-1 font-mono text-[11px] ${theme.badge}`}>
              {session.number}
            </span>
          </div>

          <div className={`mt-4 h-px bg-gradient-to-r ${theme.line}`} />

          <h4 className={`mt-4 font-heading font-medium text-white ${compact ? "text-sm leading-snug" : "text-xl leading-snug"}`}>
            {title}
          </h4>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {session.tags.slice(0, compact ? 1 : 2).map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${theme.chip}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {!compact && (
            <>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
                Speakers
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {session.speakers.join(", ")}
              </p>

              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
                Date
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                {format(new Date(session.date), "MMM d, yyyy")}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Sessions() {
  const { t, lang } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    return sessions.filter((s) => {
      if (statusFilter !== "all" && s.status !== statusFilter) return false;
      if (tagFilter && !s.tags.includes(tagFilter)) return false;
      return true;
    });
  }, [statusFilter, tagFilter]);

  return (
    <main className="pt-16">
      <section className="section-spacing">
        <div className="container-page">
          <h1 className="font-heading text-4xl font-bold mb-8">{t.sessions_page.title}</h1>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-8 sticky top-16 bg-background py-4 z-10 border-b border-border -mx-6 px-6 md:-mx-8 md:px-8">
            {/* View toggle */}
            <div className="flex items-center border border-border rounded-sm overflow-hidden mr-auto">
              <button
                onClick={() => setView("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${view === "grid" ? "bg-foreground text-background" : "text-muted-foreground"}`}
              >
                <LayoutGrid size={14} /> {t.sessions_page.grid}
              </button>
              <button
                onClick={() => setView("list")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${view === "list" ? "bg-foreground text-background" : "text-muted-foreground"}`}
              >
                <List size={14} /> {t.sessions_page.list}
              </button>
            </div>

            {/* Status filter */}
            <div className="flex gap-2">
              {(["all", "upcoming", "past"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s); if (s === "all") setTagFilter(null); }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors ${
                    statusFilter === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.sessions_page[s]}
                </button>
              ))}
            </div>

            {/* Tag filter */}
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors ${
                    tagFilter === tag
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Sessions */}
          <div className={view === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"}>
            {filtered.map((session) => (
              (() => {
                const recordingHref = getTrustedExternalHref(session.recording_url);
                const slidesHref = getTrustedExternalHref(session.slides_url);
                const githubHref = getTrustedExternalHref(session.github_url);

                return (
                  <div
                    key={session.number}
                    className={`border border-border rounded-sm overflow-hidden ${view === "list" ? "flex items-start" : "flex flex-col"}`}
                  >
                    {view === "grid" && (
                      <div className="w-full aspect-[3/4] overflow-hidden bg-black flex items-center justify-center shrink-0">
                        {session.image ? (
                          <img
                            src={session.image}
                            alt={lang === "en" ? session.topic_en : session.topic_es}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <SessionCover session={session} lang={lang} />
                        )}
                      </div>
                    )}
                    <div className={`p-6 ${view === "list" ? "flex-1" : "flex flex-col flex-1"}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-primary text-sm font-medium">{session.number}</span>
                        <span
                          className={`font-mono text-xs px-2 py-0.5 rounded-sm border ${
                            session.status === "upcoming"
                              ? "border-primary text-primary"
                              : "border-muted-foreground/30 text-muted-foreground bg-muted"
                          }`}
                        >
                          {session.status === "upcoming" ? t.sessions_page.upcoming : t.sessions_page.past}
                        </span>
                      </div>
                      <h3 className="font-heading text-base font-medium mb-1">
                        {lang === "en" ? session.topic_en : session.topic_es}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {session.speakers.join(", ")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(session.date), "MMM d, yyyy")}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {session.tags.map((tag) => (
                          <span key={tag} className="text-xs font-mono text-muted-foreground border border-border px-2 py-0.5 rounded-sm">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      {(session.status === "past" || session.status === "upcoming") && (
                        <div className="flex flex-wrap gap-1.5 mt-auto pt-5">
                          {session.status === "past" && (
                            <>
                              {recordingHref && (
                                <a
                                  href={recordingHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-sm bg-primary text-primary-foreground hover:opacity-85 transition-opacity"
                                >
                                  <Play size={12} fill="currentColor" /> {t.sessions_page.watch}
                                </a>
                              )}
                              {slidesHref && (
                                <a
                                  href={slidesHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-sm border border-border text-foreground hover:bg-muted transition-colors"
                                >
                                  <FileText size={12} /> {t.sessions_page.slides}
                                </a>
                              )}
                              {githubHref && (
                                <a
                                  href={githubHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-sm border border-border text-foreground hover:bg-muted transition-colors"
                                >
                                  <Github size={12} /> {t.sessions_page.code}
                                </a>
                              )}
                            </>
                          )}
                          {session.status === "upcoming" && (
                            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                              <CalendarPlus size={12} /> {t.sessions_page.add_calendar}
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {view === "list" && (
                      <div className="w-36 shrink-0 self-stretch overflow-hidden bg-muted">
                        {session.image ? (
                          <img
                            src={session.image}
                            alt={lang === "en" ? session.topic_en : session.topic_es}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <SessionCover session={session} lang={lang} compact />
                        )}
                      </div>
                    )}
                  </div>
                );
              })()
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
