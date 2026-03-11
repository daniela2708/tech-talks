export interface Session {
  number: string;
  topic_en: string;
  topic_es: string;
  description_en?: string;
  description_es?: string;
  speakers: string[];
  host?: string;
  date: string;
  time?: string;
  location?: string;
  tags: string[];
  status: "upcoming" | "past";
  recording_url?: string;
  slides_url?: string;
  github_url?: string;
}

export const sessions: Session[] = [
  {
    number: "07",
    topic_en: "Modern AI Challenges",
    topic_es: "Desafíos modernos de la IA",
    speakers: ["TBD"],
    date: "2026-03-26",
    time: "6:00 PM COT",
    location: "Medellín (Remote from Wizeline Sites)",
    tags: ["GenAI"],
    status: "upcoming",
  },
  {
    number: "06",
    topic_en: "Vulnerable AI Minds: The Scalability Paradox",
    topic_es: "Mentes de IA vulnerables: la paradoja de la escalabilidad",
    description_en:
      "As AI models scale, they become easier to hijack. This session explores how this vulnerability intersects with the SDLC and how experts protect AI systems in practice.",
    description_es:
      "A medida que los modelos de IA escalan, se vuelven más fáciles de secuestrar. Esta sesión explora cómo esta vulnerabilidad se cruza con el SDLC y cómo los expertos protegen los sistemas de IA en la práctica.",
    speakers: ["John Sánchez", "Pablo Pérez"],
    host: "Santi Merchán",
    date: "2026-03-12",
    time: "10:00 AM COT",
    location: "Remote Only",
    tags: ["Security", "GenAI"],
    status: "upcoming",
  },
  {
    number: "05",
    topic_en:
      "Efficiency vs. Scale: Benchmarking DeepSeek-OCR Vision-Based Compression Against Gemini 3 VLM",
    topic_es:
      "Eficiencia frente a escala: benchmarking de compresión visual con DeepSeek-OCR frente a Gemini 3 VLM",
    speakers: ["Jan Polanco Velasco"],
    date: "2026-02-26",
    tags: ["GenAI", "MLOps"],
    status: "past",
    recording_url: "https://drive.google.com/file/d/1pm_6C0sZxy1u-GVWSFcWGespOQ1w0c80/view?usp=drive_link",
    slides_url: "https://docs.google.com/presentation/d/1DqfGdMQEQn_hmbRI9n9LkJ6GgAibaW_ZAyj6AYtzEsM/edit?usp=drive_link",
  },
  {
    number: "04",
    topic_en: "MLOps in Practice: Why Docker Is the Backbone of ML in Production",
    topic_es:
      "MLOps en la práctica: por qué Docker es el pilar del ML en producción",
    speakers: ["Yhary Arias"],
    date: "2026-02-04",
    tags: ["MLOps", "Data Engineering"],
    status: "past",
    recording_url: "https://drive.google.com/file/d/1mjXmB5RKOUroqSuSYfhaW81UigqrAxDn/view?usp=drive_link",
    slides_url: "https://docs.google.com/presentation/d/1N3bnEmsXuz0H8gBKEwcwhThazWKDKC5uD--SilWntH8/edit?usp=sharing",
    github_url: "https://github.com/yharyarias-wize/demo-ai-talk-mlops-docker",
  },
  {
    number: "03",
    topic_en:
      "Spark Performance Optimization: Common Pitfalls and Best Practices",
    topic_es:
      "Optimización de rendimiento en Spark: errores comunes y buenas prácticas",
    speakers: ["Mateo Soto"],
    date: "2024-12-03",
    tags: ["Data Engineering"],
    status: "past",
    recording_url: "https://drive.google.com/file/d/1MjKDewdkplmN-Nn9SUrvsiV3j8hEA012/view?usp=sharing",
    slides_url: "https://docs.google.com/presentation/d/1Yh9kGD_uBlh7dQFFlEWwJxlko374RImNDOM554kCVmY/edit?usp=sharing",
  },
  {
    number: "02",
    topic_en: "From Insight to Impact: Visual Intelligence Best Practices",
    topic_es:
      "Del dato al impacto: buenas prácticas de inteligencia visual",
    speakers: ["Daniela Ríos"],
    date: "2024-11-19",
    tags: ["Visualization"],
    status: "past",
    recording_url: "https://drive.google.com/file/d/14eb7l7tREdFYEdI80O_4tUM9BPAS_ONO/view?usp=sharing",
    slides_url: "https://docs.google.com/presentation/d/1RKIYF6nMTdFKz7Y4d4iiCl8Ptyr310zj/edit?usp=sharing&ouid=117648850710748495484&rtpof=true&sd=true",
  },
  {
    number: "01",
    topic_en:
      "The ROI of GenAI: Why 95% of Projects Fail and How to Fix It",
    topic_es:
      "El ROI del GenAI: por qué el 95% de los proyectos fracasa y cómo solucionarlo",
    speakers: ["Santi Merchán"],
    date: "2024-11-05",
    tags: ["GenAI"],
    status: "past",
    recording_url: "https://drive.google.com/file/d/1HgX9cT0cfHt6a5_Hc95IMeivuMbr78Sh/view?usp=sharing",
    slides_url: "https://docs.google.com/presentation/d/1zujZgIdvNVFyX_pmtd2McSlbHiH7oA4NAGeUxA2kUmM/edit?usp=sharing",
  },
];

export const allTags = [
  "MLOps",
  "GenAI",
  "Data Engineering",
  "Security",
  "Visualization",
  "Other",
];
