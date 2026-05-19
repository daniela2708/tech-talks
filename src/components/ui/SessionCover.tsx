import { BrandLockup } from "@/components/layout/BrandLockup";
import { getSessionDisplayDate } from "@/lib/sessions";
import { format } from "date-fns";
import type { Session } from "@/data/sessions";

const coverThemes: Record<string, { halo: string; badge: string; chip: string; line: string }> = {
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

export function SessionCover({
  session,
  lang,
  compact = false,
}: {
  session: Session;
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
            <BrandLockup
              theme="dark"
              wizelineClassName={compact ? "h-6 w-auto" : "h-8 w-auto"}
              aiClassName={compact ? "h-6 w-auto" : "h-8 w-auto"}
            />
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
                {format(getSessionDisplayDate(session), "MMM d, yyyy")}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
