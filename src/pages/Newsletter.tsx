import { useLanguage } from "@/hooks/useLanguage";
import { newsletterIssues } from "@/data/newsletter";
import { format } from "date-fns";
import { getTrustedExternalHref } from "@/lib/security";

export default function Newsletter() {
  const { t, lang } = useLanguage();

  return (
    <main className="pt-16">
      <section className="section-spacing">
        <div className="max-w-[680px] mx-auto px-6">
          <h1 className="font-heading text-4xl font-bold mb-12">{t.newsletter_page.title}</h1>

          <div className="flex flex-col gap-8">
            {newsletterIssues.map((issue) => (
              (() => {
                const issueHref = getTrustedExternalHref(issue.url);

                return (
                  <article key={issue.number} className="border border-border rounded-sm p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-mono text-primary text-sm font-medium">
                        {issue.number}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(issue.date), "MMMM d, yyyy")}
                      </span>
                    </div>
                    <h2 className="font-heading text-xl font-medium mb-3">
                      {lang === "en" ? issue.subject_en : issue.subject_es}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {lang === "en" ? issue.summary_en : issue.summary_es}
                    </p>
                    {issueHref && (
                      <a
                        href={issueHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-sm border border-foreground px-4 py-2 text-sm font-body font-medium text-foreground transition-opacity hover:opacity-80"
                      >
                        {t.newsletter_page.read_issue}
                      </a>
                    )}
                  </article>
                );
              })()
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
