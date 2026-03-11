export interface NewsletterIssue {
  number: string;
  date: string;
  subject_en: string;
  subject_es: string;
  summary_en: string;
  summary_es: string;
  url: string;
}

export const newsletterIssues: NewsletterIssue[] = [
  {
    number: "02",
    date: "2026-03-01",
    subject_en: "The Rise of Agentic Workflows and What It Means for Engineering Teams",
    subject_es: "El auge de los flujos de trabajo agénticos y lo que significa para los equipos de ingeniería",
    summary_en:
      "In this issue we explore how agentic AI workflows are reshaping software development processes, with highlights from Session 05 on vision-based model benchmarking and a preview of the upcoming security-focused talk.",
    summary_es:
      "En este número exploramos cómo los flujos de trabajo de IA agéntica están transformando los procesos de desarrollo de software, con destacados de la Sesión 05 sobre benchmarking de modelos basados en visión y un adelanto de la próxima charla sobre seguridad.",
    url: "#",
  },
  {
    number: "01",
    date: "2026-02-01",
    subject_en: "Launching Data & AI Tech Talks: What to Expect",
    subject_es: "Lanzamiento de Data & AI Tech Talks: qué esperar",
    summary_en:
      "The inaugural issue introduces the initiative, shares the vision behind the series, and recaps the first two sessions covering GenAI ROI and visual intelligence best practices.",
    summary_es:
      "El número inaugural presenta la iniciativa, comparte la visión detrás de la serie y resume las dos primeras sesiones sobre el ROI del GenAI y las mejores prácticas de inteligencia visual.",
    url: "#",
  },
];
