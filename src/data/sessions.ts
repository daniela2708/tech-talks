import { assetUrl } from "@/lib/assets";

export interface Session {
  number: string;
  topic_en: string;
  topic_es: string;
  description_en?: string;
  description_es?: string;
  speakers: string[];
  host?: string;
  date: string;
  scheduled_at?: string;
  time?: string;
  location?: string;
  meeting_url?: string;
  duration_minutes?: number;
  tags: string[];
  status: "upcoming" | "past";
  recording_url?: string;
  slides_url?: string;
  github_url?: string;
  download_url?: string;
  image?: string;
}

export const sessions: Session[] = [
  {
    number: "13",
    topic_en: "People in the Center: Automation for Your Everyday Work",
    topic_es: "Las personas en el centro: automatización para tu trabajo diario",
    description_en:
      "English edition of our July 16 session. What if you could delegate your day-to-day administrative tasks to focus on what matters: people? This hands-on talk breaks the myth that automating processes requires programming expertise. Through a case study, we show how combining Google Gemini with Apps Script lets you design tailored solutions inside the tools you already use — Sheets, Docs, and Drive.",
    description_es:
      "Edición en inglés de nuestra sesión del 16 de julio. ¿Y si pudieras delegar tus tareas administrativas del día a día para enfocarte en lo que importa: las personas? Esta charla práctica rompe el mito de que automatizar procesos requiere saber programar. A través de un caso de estudio, mostramos cómo combinar Google Gemini con Apps Script para diseñar soluciones a la medida dentro de las herramientas que ya usas: Sheets, Docs y Drive.",
    speakers: ["Ángela Barrera"],
    date: "2026-07-24",
    scheduled_at: "2026-07-24T10:00:00-05:00",
    time: "9:00 AM CST",
    location: "Remote via Google Meet",
    meeting_url: "https://meet.google.com/tjb-gohi-bic",
    duration_minutes: 45,
    tags: ["GenAI"],
    status: "upcoming",
    image: assetUrl("Charlas/AI_at_Work-13.png"),
    slides_url: "https://docs.google.com/presentation/d/1Y0gfkgH0EPb45dsMh16a36fUOXRnfCphUHQ-yQ0vGnc/edit?usp=sharing",
  },
  {
    number: "12",
    topic_en: "People in the Center: Automation for Your Everyday Work",
    topic_es: "Las personas en el centro: automatización para tu trabajo diario",
    description_en:
      "What if you could delegate your day-to-day administrative tasks to focus on what matters: people? This hands-on talk breaks the myth that automating processes requires programming expertise. Through a case study, we show how combining Google Gemini with Apps Script lets you design tailored solutions inside the tools you already use — Sheets, Docs, and Drive.",
    description_es:
      "¿Y si pudieras delegar tus tareas administrativas del día a día para enfocarte en lo que importa: las personas? Esta charla práctica rompe el mito de que automatizar procesos requiere saber programar. A través de un caso de estudio, mostramos cómo combinar Google Gemini con Apps Script para diseñar soluciones a la medida dentro de las herramientas que ya usas: Sheets, Docs y Drive.",
    speakers: ["Ángela Barrera"],
    date: "2026-07-16",
    time: "3:00 PM CST",
    location: "Hybrid - Bogotá Wizeline offices & Remote via Google Meet",
    tags: ["GenAI"],
    status: "past",
    image: assetUrl("Charlas/AI_at_Work-12.png"),
    recording_url: "https://drive.google.com/file/d/1D9cFBt36Iu8oGdFBPKcuoTRPteZiWrnz/view?usp=drive_link",
    slides_url: "https://docs.google.com/presentation/d/1Y0gfkgH0EPb45dsMh16a36fUOXRnfCphUHQ-yQ0vGnc/edit?usp=sharing",
  },
  {
    number: "11",
    topic_en: "Garbage In, Garbage Out: How SDD Kills the Fix-and-Pray Cycle",
    topic_es:
      "Garbage In, Garbage Out: cómo el SDD acaba con el ciclo de arreglar y rezar",
    description_en:
      "Do you give the AI a vague prompt and pray the code works? Welcome to the fix-and-pray cycle. In this session you'll see live how Spec-Driven Development (SDD) breaks it: we build the same project twice — once with a generic prompt, once following the SDD workflow (Spec → Plan → Tasks) — and measure exactly what fails and what doesn't. For anyone who works with AI day to day and wants to stop guessing and start building with intention.",
    description_es:
      "¿Le das a la IA un prompt vago y rezas para que el código funcione? Bienvenido al ciclo de 'arreglar y rezar'. En esta sesión verás en vivo cómo el Desarrollo Guiado por Especificaciones (SDD) lo rompe: construimos el mismo proyecto dos veces —una con un prompt genérico y otra siguiendo el flujo SDD (Spec → Plan → Tasks)— y medimos exactamente qué falla y qué no. Para quienes trabajan con IA a diario y quieren dejar de adivinar para construir con intención.",
    speakers: ["Cristian Villamil", "Sebastián Benavides"],
    date: "2026-07-02",
    time: "Jul 2, 4:00 PM CST (ES) · Jul 3, 9:00 AM CST (EN)",
    location: "Hybrid - Bogotá Wizeline offices & Remote via Google Meet",
    tags: ["GenAI"],
    status: "past",
    image: assetUrl("Charlas/AI_at_Work-11.png"),
    recording_url: "https://drive.google.com/file/d/1uhhSt2WdheThjgsZxloLZPIn4oVGUXC-/view",
    download_url: assetUrl("recursos/prompts-live-demo-garbage-in-out.zip"),
  },
  {
    number: "10",
    topic_en: "Workflow Automations for PMs: AI Skills with Claude Code",
    topic_es: "Automatización de flujos para PMs: skills de IA con Claude Code",
    description_en:
      "Becoming an AI-native company is about empowerment, not replacement. In this session we explore how PMs can use Claude Code to automate repetitive workflows — like generating weekly steering committee reports directly from Jira and Confluence — without writing a single line of code or managing API tokens. The goal isn't to replace your tools; it's to put you back in control so you spend less time on setup and reporting, and more on the work that moves the needle.",
    description_es:
      "Convertirse en una empresa AI-native se trata de potenciar a las personas, no de reemplazarlas. En esta sesión exploramos cómo los PMs pueden usar Claude Code para automatizar flujos repetitivos —como generar reportes semanales de steering committee directamente desde Jira y Confluence— sin escribir una sola línea de código ni gestionar tokens de API. El objetivo no es reemplazar tus herramientas, sino devolverte el control para dedicar menos tiempo a la configuración y los reportes, y más al trabajo que realmente mueve la aguja.",
    speakers: ["Marvin Herrera", "Julio Núñez"],
    date: "2026-06-11",
    time: "9:00 AM CST",
    tags: ["GenAI"],
    status: "past",
    image: assetUrl("Charlas/AI_at_Work-10.png"),
    recording_url: "https://drive.google.com/file/d/1Rk9vBNkBPeAXss7UK0R2Ax2-WjJd13Sj/view",
  },
  {
    number: "09",
    topic_en: "Automated Deployments in Databricks (CI/CD)",
    topic_es: "Despliegues automatizados en Databricks (CI/CD)",
    description_en:
      "A practical session on automated deployments in Databricks, covering CI/CD foundations, best practices, and common questions with Felipe Cristancho joining us on-site from the Wizeline Bogota office.",
    description_es:
      "Un espacio práctico para conversar sobre despliegues automatizados en Databricks, buenas prácticas de CI/CD y dudas comunes, con Felipe Cristancho acompañándonos presencialmente desde la oficina de Wizeline Bogotá.",
    speakers: ["Felipe Cristancho"],
    date: "2026-05-20",
    scheduled_at: "2026-05-20T17:00:00-05:00",
    time: "5:00 PM COT",
    location: "Hybrid - Wizeline Bogotá offices & Remote via Google Meet",
    meeting_url: "https://meet.google.com/bvn-heyo-vef",
    duration_minutes: 60,
    tags: ["MLOps", "Data Engineering"],
    status: "past",
    image: assetUrl("Charlas/AI_at_Work-9.png"),
    recording_url: "https://drive.google.com/file/d/1gcN3BuNzMhFjNr-PIS0Tb5D7eF-cgh8v/view",
  },
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
    image: assetUrl("Charlas/AI_at_Work-8.png"),
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
    image: assetUrl("Charlas/AI_at_Work-7.png"),
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
    image: assetUrl("Charlas/AI_at_Work-6.png"),
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
    image: assetUrl("Charlas/AI_at_Work-5.png"),
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
    image: assetUrl("Charlas/AI_at_Work-4.png"),
  },
  {
    number: "03",
    topic_en:
      "Spark Performance Optimization: Common Pitfalls and Best Practices",
    topic_es:
      "Optimización de rendimiento en Spark: errores comunes y buenas prácticas",
    speakers: ["Mateo Soto"],
    date: "2025-12-03",
    tags: ["Data Engineering"],
    status: "past",
    recording_url: "https://drive.google.com/file/d/1MjKDewdkplmN-Nn9SUrvsiV3j8hEA012/view?usp=sharing",
    slides_url: "https://docs.google.com/presentation/d/1Yh9kGD_uBlh7dQFFlEWwJxlko374RImNDOM554kCVmY/edit?usp=sharing",
    image: assetUrl("Charlas/AI_at_Work-3.png"),
  },
  {
    number: "02",
    topic_en: "From Insight to Impact: Visual Intelligence Best Practices",
    topic_es:
      "Del dato al impacto: buenas prácticas de inteligencia visual",
    speakers: ["Daniela Ríos"],
    date: "2025-11-19",
    tags: ["Visualization"],
    status: "past",
    recording_url: "https://drive.google.com/file/d/14eb7l7tREdFYEdI80O_4tUM9BPAS_ONO/view?usp=sharing",
    slides_url: "https://docs.google.com/presentation/d/1RKIYF6nMTdFKz7Y4d4iiCl8Ptyr310zj/edit?usp=sharing&ouid=117648850710748495484&rtpof=true&sd=true",
    image: assetUrl("Charlas/AI_at_Work-2.png"),
  },
  {
    number: "01",
    topic_en:
      "The ROI of GenAI: Why 95% of Projects Fail and How to Fix It",
    topic_es:
      "El ROI del GenAI: por qué el 95% de los proyectos fracasa y cómo solucionarlo",
    speakers: ["Santi Merchán"],
    date: "2025-11-05",
    tags: ["GenAI"],
    status: "past",
    recording_url: "https://drive.google.com/file/d/1HgX9cT0cfHt6a5_Hc95IMeivuMbr78Sh/view?usp=sharing",
    slides_url: "https://docs.google.com/presentation/d/1zujZgIdvNVFyX_pmtd2McSlbHiH7oA4NAGeUxA2kUmM/edit?usp=sharing",
    image: assetUrl("Charlas/AI_at_Work-1.png"),
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
