import { useState, useMemo } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { sessions, allTags } from "@/data/sessions";
import { Play, FileText, Github, CalendarPlus, LayoutGrid, List } from "lucide-react";
import { format } from "date-fns";

type StatusFilter = "all" | "upcoming" | "past";
type ViewMode = "grid" | "list";

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
                  onClick={() => setStatusFilter(s)}
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
              <div
                key={session.number}
                className={`border border-border rounded-sm overflow-hidden ${view === "list" ? "flex items-start" : ""}`}
              >
                {view === "grid" && (
                  <div className="w-full h-[36rem] overflow-hidden bg-black flex items-center justify-center">
                    {session.image ? (
                      <img
                        src={session.image}
                        alt={session.topic_en}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="font-mono text-muted-foreground/30 text-4xl font-bold">{session.number}</span>
                    )}
                  </div>
                )}
                <div className={`p-6 ${view === "list" ? "flex-1" : ""}`}>
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
                    <div className="flex flex-wrap gap-2 mt-5">
                      {session.status === "past" && (
                        <>
                          {session.recording_url && (
                            <a
                              href={session.recording_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm bg-primary text-primary-foreground hover:opacity-85 transition-opacity"
                            >
                              <Play size={12} fill="currentColor" /> {t.sessions_page.watch}
                            </a>
                          )}
                          {session.slides_url && (
                            <a
                              href={session.slides_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm border border-border text-foreground hover:bg-muted transition-colors"
                            >
                              <FileText size={12} /> {t.sessions_page.slides}
                            </a>
                          )}
                          {session.github_url && (
                            <a
                              href={session.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm border border-border text-foreground hover:bg-muted transition-colors"
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

                {/* List view: side thumbnail */}
                {view === "list" && session.image && (
                  <div className="w-36 shrink-0 self-stretch overflow-hidden bg-muted">
                    <img
                      src={session.image}
                      alt={session.topic_en}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
