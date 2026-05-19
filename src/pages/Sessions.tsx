import { useState, useMemo } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useNow } from "@/hooks/useNow";
import { sessions, allTags } from "@/data/sessions";
import { Play, FileText, Github, CalendarPlus, LayoutGrid, List, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { getTrustedExternalHref } from "@/lib/security";
import {
  getSessionCalendarHref,
  getSessionDisplayDate,
  getSessionStatus,
} from "@/lib/sessions";
import { SessionCover } from "@/components/ui/SessionCover";

type StatusFilter = "all" | "upcoming" | "past";
type ViewMode = "grid" | "list";

export default function Sessions() {
  const { t, lang } = useLanguage();
  const now = useNow();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    return sessions.filter((s) => {
      const sessionStatus = getSessionStatus(s, now);

      if (statusFilter !== "all" && sessionStatus !== statusFilter) return false;
      if (tagFilter && !s.tags.includes(tagFilter)) return false;
      return true;
    });
  }, [now, statusFilter, tagFilter]);

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
                const sessionStatus = getSessionStatus(session, now);
                const recordingHref = getTrustedExternalHref(session.recording_url);
                const slidesHref = getTrustedExternalHref(session.slides_url);
                const githubHref = getTrustedExternalHref(session.github_url);
                const meetingHref = getTrustedExternalHref(session.meeting_url);
                const calendarHref = getTrustedExternalHref(getSessionCalendarHref(session));
                const hasPastActions = Boolean(recordingHref || slidesHref || githubHref);
                const hasUpcomingActions = Boolean(meetingHref || calendarHref);

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
                            sessionStatus === "upcoming"
                              ? "border-primary text-primary"
                              : "border-muted-foreground/30 text-muted-foreground bg-muted"
                          }`}
                        >
                          {sessionStatus === "upcoming" ? t.sessions_page.upcoming : t.sessions_page.past}
                        </span>
                      </div>
                      <h3 className="font-heading text-base font-medium mb-1">
                        {lang === "en" ? session.topic_en : session.topic_es}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {session.speakers.join(", ")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(getSessionDisplayDate(session), "MMM d, yyyy")}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {session.tags.map((tag) => (
                          <span key={tag} className="text-xs font-mono text-muted-foreground border border-border px-2 py-0.5 rounded-sm">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      {((sessionStatus === "past" && hasPastActions) ||
                        (sessionStatus === "upcoming" && hasUpcomingActions)) && (
                        <div className="flex flex-wrap gap-1.5 mt-auto pt-5">
                          {sessionStatus === "past" && (
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
                          {sessionStatus === "upcoming" && (
                            <>
                              {meetingHref && (
                                <a
                                  href={meetingHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm bg-primary text-primary-foreground hover:opacity-85 transition-opacity"
                                >
                                  <ExternalLink size={12} /> {t.sessions_page.join_live}
                                </a>
                              )}
                              {calendarHref && (
                                <a
                                  href={calendarHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                                >
                                  <CalendarPlus size={12} /> {t.sessions_page.add_calendar}
                                </a>
                              )}
                            </>
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
