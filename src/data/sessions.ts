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
  image?: string;
}

export const sessions: Session[] = [
  {
    number: "08",
    topic_en: "Workshop: AI Assistants in Daily Development",
    topic_es: "Workshop: Asistentes de IA en el desarrollo cotidiano",
    description_en:
      "A hands-on workshop on harnessing AI assistants in day-to-day development. Covering prompt engineering, GEMINI.md context management, modular AI skills, and agent orchestration using Gemini as foundation — with techniques applicable to Cursor, Windsurf, Codex, and beyond.",
    description_es:
      "Un taller práctico para aprovechar los asistentes de IA en el desarrollo cotidiano. Cubre ingeniería de prompts, gestión de contexto con GEMINI.md, habilidades modulares de IA y orquestación de agentes usando Gemini como base.",
    speakers: ["Pablo Pérez"],
    date: "2026-04-21",
    time: "9:00 AM CST",
    location: "Hybrid - Bogotá Wizeline offices & Remote via Google Meet",
    tags: ["GenAI"],
    status: "past",
    image: "/Data & AI March 12-6.png",
    recording_url:
      "https://docs.google.com/videos/d/1MAZpxewip-B_fK6p5Gss3VrvdFwlgDHfUvMvWO-tgR4/edit?scene=id.p#scene=id.p",
  },
  {
    number: "07",
    topic_en: "AI: Revolutionizing the Algorithm from the Human Potential",
    topic_es: "IA: revolucionando el algoritmo desde el potencial humano",
    description_en:
      "A panel inspired by Algoritmos Deshumanos exploring how AI can amplify what makes us human in the tech industry, and what it truly means to work alongside it. The question isn't whether AI will replace us — it's what makes us irreplaceable.",
    description_es:
      "Un panel inspirado en el libro 'Algoritmos Deshumanos' que explora cómo la IA puede amplificar lo que nos hace humanos en la industria tecnológica, y qué significa realmente trabajar junto a ella.",
    speakers: ["Santiago Jiménez", "Ana López", "Kat Gómez"],
    date: "2026-03-26",
    time: "5:00 PM CST",
    location: "Hybrid - Medellín Wizeline offices & Remote via Google Meet",
    tags: ["GenAI"],
    status: "past",
    image: "/Data & AI March 12-4.png",
    recording_url:
      "https://drive.google.com/drive/folders/1Juhk5lg3_E3lChXUeINqDt9ztlNUHlto",
  },
  {
    number: "06",
    topic_en: "Vulnerable Minds: The Hidden Flaw in AI",
    topic_es: "Mentes vulnerables: el fallo oculto en la IA",
    description_en:
      "For a long time, the tech world believed larger AI models were safer because bad data would get 'lost in the crowd.' We explore the Scalability Paradox: as AI gets bigger and smarter, it actually becomes easier to trick — and what this means for securing AI systems in practice.",
    description_es:
      "El mundo tech creía que los modelos de IA más grandes eran más seguros porque los datos malos se 'perderían en la multitud.' Exploramos la Paradoja de la Escalabilidad: cuanto más grande e inteligente se vuelve la IA, más fácil es engañarla.",
    speakers: ["Pablo Pérez", "John Sánchez"],
    host: "Santiago Merchán",
    date: "2026-03-12",
    time: "9:00 AM CST",
    location: "Remote via Google Meet",
    tags: ["Security", "GenAI"],
    status: "past",
    image: "/Data & AI March 12.png",
    recording_url:
      "https://drive.google.com/drive/folders/16BuEq8YQTx9CSGmna8XkF7uXd7eXVhSw",
    slides_url:
      "https://docs.google.com/presentation/d/1NInRPhsyQhrFQc1qaOBFPwEgmindxE1mQCRu3XPh_F8/edit?slide=id.g39a0be118cb_0_1010#slide=id.g39a0be118cb_0_1010",
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
    image: "/Internal - Data & AI Tech Talks - Co-2.png",
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
    image: "/Yhary Eng v1.png",
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
    image: "/Data & AI Tech Talks - Co Interno-4 (1).png",
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
    image: "/DaniRios.png",
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
