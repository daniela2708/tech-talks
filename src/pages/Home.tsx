import { useLanguage } from "@/hooks/useLanguage";
import { useNow } from "@/hooks/useNow";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  Play,
  FileText,
  ArrowRight,
  Users,
  Lightbulb,
  MessageSquare,
  Code,
  BarChart3,
  Send,
  MessageCircle,
  Layout,
  Images,
  CalendarPlus,
  ExternalLink,
} from "lucide-react";
import { sessions, type Session } from "@/data/sessions";
import { format } from "date-fns";
import heroTeamImg from "@/assets/hero-team.jpg";
import { getTrustedExternalHref } from "@/lib/security";
import {
  getSessionCalendarHref,
  getSessionDayDistance,
  getSessionDisplayDate,
  getSessionStatus,
} from "@/lib/sessions";
import { SessionCover } from "@/components/ui/SessionCover";

function HeroTicker({ now }: { now: Date }) {
  const pastSessions = sessions.filter((session) => getSessionStatus(session, now) === "past");
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

function UpcomingSessionCard({ session, now }: { session: Session; now: Date }) {
  const { t, lang } = useLanguage();
  const daysUntil = getSessionDayDistance(session, now);
  const isSoon = daysUntil >= 0 && daysUntil <= 7;

  const meetingHref = getTrustedExternalHref(session.meeting_url);
  const calendarHref = getTrustedExternalHref(getSessionCalendarHref(session));

  return (
    <div className="border border-border rounded-sm overflow-hidden flex flex-col">
      <div className="w-full aspect-[3/4] overflow-hidden bg-black flex items-center justify-center shrink-0">
        {session.image ? (
          <img
            src={session.image}
            alt={lang === "en" ? session.topic_en : session.topic_es}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        ) : (
          <SessionCover session={session} lang={lang} />
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-primary text-sm font-medium">{session.number}</span>
          <span className="font-mono text-xs px-2 py-0.5 rounded-sm border border-primary text-primary">
            {t.sessions_page.upcoming}
          </span>
          {isSoon && (
            <span className="font-mono text-[10px] text-primary border border-primary/40 bg-primary/8 px-1.5 py-0.5 rounded-sm animate-pulse ml-auto">
              {t.upcoming.happening_soon}
            </span>
          )}
        </div>

        <h3 className="font-heading text-base font-medium mb-1">
          {lang === "en" ? session.topic_en : session.topic_es}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{session.speakers.join(", ")}</p>
        <p className="text-xs text-muted-foreground">
          {format(getSessionDisplayDate(session), "MMM d, yyyy")}
          {session.time && <span className="ml-2">· {session.time}</span>}
          {session.location && <span className="ml-2">· {session.location}</span>}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {session.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono text-muted-foreground border border-border px-2 py-0.5 rounded-sm">
              {tag}
            </span>
          ))}
        </div>

        {(meetingHref || calendarHref) && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-5">
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
          </div>
        )}
      </div>
    </div>
  );
}

function VideoPreviewCard({ session }: { session: Session }) {
  const { lang, t } = useLanguage();
  const recordingHref = getTrustedExternalHref(session.recording_url);
  const slidesHref = getTrustedExternalHref(session.slides_url);

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
        {recordingHref && (
          <a
            href={recordingHref}
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
          {format(getSessionDisplayDate(session), "MMM d, yyyy")}
        </p>
        <div className="flex gap-3">
          {slidesHref && (
            <a
              href={slidesHref}
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


const DIV_LAYERS = [
  { x: 0,    ys: [18, 36, 54] },
  { x: 205,  ys: [10, 24, 36, 50, 64] },
  { x: 410,  ys: [8,  22, 36, 50, 64] },
  { x: 615,  ys: [10, 24, 36, 50, 64] },
  { x: 825,  ys: [8,  22, 36, 50, 64] },
  { x: 1030, ys: [10, 24, 36, 50, 64] },
  { x: 1235, ys: [8,  22, 36, 50, 64] },
  { x: 1440, ys: [18, 36, 54] },
] as const;
const DIV_ACTIVE = new Set(["0-1","1-2","2-2","3-2","4-2","5-2","6-2","7-1"]);

function NNDivider() {
  const { t } = useLanguage();
  return (
    <div className="relative h-[72px] overflow-hidden bg-[#020617] border-y border-white/[0.05]">
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <path id="div-p1" d="M 0,36 L 205,36 L 410,36 L 615,36 L 825,36 L 1030,36 L 1235,36 L 1440,36"/>
          <filter id="div-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="div-node-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* Combined mask: fades edges + hides center (where text lives) */}
          <linearGradient id="div-mask" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#020617" stopOpacity="1"/>
            <stop offset="6%"   stopColor="#020617" stopOpacity="0"/>
            <stop offset="38%"  stopColor="#020617" stopOpacity="0"/>
            <stop offset="46%"  stopColor="#020617" stopOpacity="1"/>
            <stop offset="54%"  stopColor="#020617" stopOpacity="1"/>
            <stop offset="62%"  stopColor="#020617" stopOpacity="0"/>
            <stop offset="94%"  stopColor="#020617" stopOpacity="0"/>
            <stop offset="100%" stopColor="#020617" stopOpacity="1"/>
          </linearGradient>
        </defs>

        {/* Connections */}
        {DIV_LAYERS.slice(0, -1).map((layer, li) =>
          layer.ys.flatMap((y1: number, ni: number) =>
            DIV_LAYERS[li + 1].ys.map((y2: number, nj: number) => {
              const isHighlit = DIV_ACTIVE.has(`${li}-${ni}`) && DIV_ACTIVE.has(`${li + 1}-${nj}`);
              return (
                <line key={`dc-${li}-${ni}-${nj}`}
                  x1={layer.x} y1={y1} x2={DIV_LAYERS[li + 1].x} y2={y2}
                  stroke={isHighlit ? "#6ee7b7" : "white"}
                  strokeOpacity={isHighlit ? 0.32 : 0.09}
                  strokeWidth={isHighlit ? 1.1 : 0.55}
                />
              );
            })
          )
        )}

        {/* Signal trace */}
        <path d="M 0,36 L 205,36 L 410,36 L 615,36 L 825,36 L 1030,36 L 1235,36 L 1440,36"
          stroke="#6ee7b7" strokeOpacity="0.18" strokeWidth="1.5" fill="none"/>

        {/* Signal pulses */}
        {([0, 3.2, 6.4] as number[]).map((d, i) => (
          <circle key={`dp-${i}`} r="5" fill="#6ee7b7" filter="url(#div-glow)">
            <animateMotion dur="9.6s" repeatCount="indefinite" begin={`${d}s`}><mpath href="#div-p1"/></animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.93;1" dur="9.6s" repeatCount="indefinite" begin={`${d}s`}/>
          </circle>
        ))}

        {/* Nodes */}
        {DIV_LAYERS.map((layer, li) =>
          layer.ys.map((y: number, ni: number) => {
            const active = DIV_ACTIVE.has(`${li}-${ni}`);
            const delay = `${li * 0.42}s`;
            return (
              <g key={`dn-${li}-${ni}`}>
                {active && (
                  <>
                    <circle cx={layer.x} cy={y} r="14" fill="#6ee7b7" fillOpacity="0.06">
                      <animate attributeName="r" values="11;20;11" dur="2.8s" repeatCount="indefinite" begin={delay}/>
                      <animate attributeName="fill-opacity" values="0.06;0.18;0.06" dur="2.8s" repeatCount="indefinite" begin={delay}/>
                    </circle>
                    <circle cx={layer.x} cy={y} r="7" fill="#6ee7b7" fillOpacity="0.16"/>
                  </>
                )}
                <circle cx={layer.x} cy={y}
                  r={active ? 4.5 : 3}
                  fill={active ? "#6ee7b7" : "white"}
                  fillOpacity={active ? 0.95 : 0.2}
                  filter={active ? "url(#div-node-glow)" : undefined}
                >
                  {active && <animate attributeName="fill-opacity" values="0.95;1;0.95" dur="2.8s" repeatCount="indefinite" begin={delay}/>}
                </circle>
              </g>
            );
          })
        )}

        {/* Mask: hides network at edges + center (text zone) */}
        <rect x="0" y="0" width="1440" height="72" fill="url(#div-mask)"/>
      </svg>

      {/* Centered phrase */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 backdrop-blur-[2px]">
          <div className="w-24 h-px bg-white/20" />
          <p className="font-heading italic text-white/90 text-sm sm:text-base leading-none text-center px-4">
            {t.nn_divider.phrase}
          </p>
          <div className="w-24 h-px bg-white/20" />
        </div>
      </div>
    </div>
  );
}

const BIN_COL_A = ["01001000","10110101","00111010","11001011","01010110","10001101","00110111","11010010","01101001","10100110","00011011","11000101","01110100","10011010","00101101","11100011","01001000","10110101","00111010","11001011","01010110","10001101","00110111","11010010","01101001","10100110","00011011","11000101","01110100","10011010","00101101","11100011"];
const BIN_COL_B = ["0xA4","0xFF","0x3C","0x91","0xD7","0x2B","0xE8","0x5F","0xAA","0x16","0x73","0xC9","0x48","0xBE","0x07","0x64","0xA4","0xFF","0x3C","0x91","0xD7","0x2B","0xE8","0x5F","0xAA","0x16","0x73","0xC9","0x48","0xBE","0x07","0x64"];
const BIN_COL_C = ["11100011","01001010","10110000","00101101","11010111","01100100","10011011","00000110","11001101","01110010","10101000","00011101","11110100","01001011","10100001","00111110","11100011","01001010","10110000","00101101","11010111","01100100","10011011","00000110","11001101","01110010","10101000","00011101","11110100","01001011","10100001","00111110"];
const BIN_COL_D = ["1011","0110","1100","0011","1001","0101","1110","0010","1101","0100","1010","0001","1111","0111","1000","0000","1011","0110","1100","0011","1001","0101","1110","0010","1101","0100","1010","0001","1111","0111","1000","0000"];

const MATRIX_MASK: Record<string, string> = {
  tl: "radial-gradient(ellipse 140% 140% at 0% 0%, black 0%, transparent 62%)",
  tr: "radial-gradient(ellipse 140% 140% at 100% 0%, black 0%, transparent 62%)",
  bl: "radial-gradient(ellipse 140% 140% at 0% 100%, black 0%, transparent 62%)",
  br: "radial-gradient(ellipse 140% 140% at 100% 100%, black 0%, transparent 62%)",
};
const MATRIX_POS: Record<string, string> = {
  tl: "top-0 left-0",
  tr: "top-0 right-0",
  bl: "bottom-0 left-0",
  br: "bottom-0 right-0",
};
function MatrixCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const cols = [BIN_COL_A, BIN_COL_B, BIN_COL_C, BIN_COL_D];
  const mask = MATRIX_MASK[pos];
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute ${MATRIX_POS[pos]} w-80 h-[26rem] overflow-hidden`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <div className="flex gap-4 font-mono text-[12px] leading-[1.65] text-emerald-400/[0.82]">
        {cols.map((col, ci) => (
          <div
            key={ci}
            className="flex flex-col whitespace-nowrap"
            style={{ animation: `bin-fall ${14 + ci * 4}s linear infinite`, animationDelay: `${-ci * 3.5}s` }}
          >
            {col.map((row, ri) => <span key={ri}>{row}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const now = useNow();
  const upcomingSessions = sessions.filter((session) => getSessionStatus(session, now) === "upcoming");
  const pastWithRecordings = sessions.filter(
    (session) => getSessionStatus(session, now) === "past" && session.recording_url,
  );
  const articleIcons = [FileText, Lightbulb, MessageSquare];
  const galleryPhotos = [
    {
      src: "/Charlas/IMG_1603 (1).jpg",
      alt: t.community_gallery.photo2_alt,
      label: t.community_gallery.chips[0],
      objectPos: "object-[52%_44%]",
      gridClass: "col-span-2 row-span-2",
      aspectClass: "",
    },
    {
      src: "/Charlas/IMG_1600 (1).jpg",
      alt: t.community_gallery.photo1_alt,
      label: t.community_gallery.chips[2],
      objectPos: "object-center",
      gridClass: "col-span-1 row-span-1",
      aspectClass: "",
    },
    {
      src: "/Charlas/88fb1210-f121-4d8d-8a7c-8680f8473856.jpg",
      alt: t.community_gallery.photo1_alt,
      label: t.community_gallery.chips[1],
      objectPos: "object-[58%_48%]",
      gridClass: "col-span-1 row-span-1",
      aspectClass: "",
    },
    {
      src: "/Charlas/IMG_7879 (1).jpg",
      alt: t.community_gallery.photo3_alt,
      label: t.community_gallery.chips[2],
      objectPos: "object-[50%_72%]",
      gridClass: "col-span-1 row-span-1",
      aspectClass: "",
    },
  ];

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

        <HeroTicker now={now} />
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

      <NNDivider />

      {/* Community Gallery */}
      <section className="pt-10 pb-16 relative overflow-hidden border-t border-white/[0.07] bg-[#020617] text-surface-dark-foreground">

        <MatrixCorner pos="tl" />
        <MatrixCorner pos="tr" />
        <MatrixCorner pos="bl" />
        <MatrixCorner pos="br" />

        {/* ── Content ── */}
        <div className="container-page relative z-10">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-10">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-primary/30 bg-primary/10">
              <Images size={20} className="text-primary" />
            </div>
            <span className="font-mono text-sm font-bold uppercase tracking-widest text-primary">
              {t.community_gallery.label}
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="font-heading text-3xl font-medium leading-tight text-white sm:text-4xl">
              {t.community_gallery.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/60 max-w-lg">
              {t.community_gallery.body}
            </p>
          </div>

          {/* Bento grid + tall side photo */}
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_380px] lg:h-[480px]">
            <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[480px] lg:h-full">
              <figure className="group col-span-2 row-span-2 relative overflow-hidden rounded-2xl border border-white/10">
                <img src={galleryPhotos[0].src} alt={galleryPhotos[0].alt} loading="lazy"
                  className={`h-full w-full object-cover ${galleryPhotos[0].objectPos} transition-transform duration-700 group-hover:scale-[1.03]`}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                  {t.community_gallery.chips.map((chip) => (
                    <span key={chip} className="inline-flex items-center rounded-full border border-white/15 bg-black/40 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm">
                      {chip}
                    </span>
                  ))}
                </div>
              </figure>

              <figure className="group relative overflow-hidden rounded-2xl border border-white/10">
                <img src={galleryPhotos[1].src} alt={galleryPhotos[1].alt} loading="lazy"
                  className={`h-full w-full object-cover ${galleryPhotos[1].objectPos} transition-transform duration-700 group-hover:scale-[1.04]`}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </figure>

              <figure className="group relative overflow-hidden rounded-2xl border border-white/10">
                <img src={galleryPhotos[2].src} alt={galleryPhotos[2].alt} loading="lazy"
                  className={`h-full w-full object-cover ${galleryPhotos[2].objectPos} transition-transform duration-700 group-hover:scale-[1.04]`}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </figure>
            </div>

            <figure className="group relative overflow-hidden rounded-2xl border border-white/10 h-64 lg:h-full">
              <img src={galleryPhotos[3].src} alt={galleryPhotos[3].alt} loading="lazy"
                className={`h-full w-full object-cover ${galleryPhotos[3].objectPos} transition-transform duration-700 group-hover:scale-[1.03]`}/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </figure>
          </div>

          {/* Quote */}
          <blockquote className="mt-6 border-l-2 border-primary/50 pl-6 py-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary mb-2">
              {t.community_gallery.quote_label}
            </p>
            <p className="font-heading text-base leading-snug text-white/80">
              "{t.community_gallery.quote}"
            </p>
          </blockquote>
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingSessions.map((s) => (
                <UpcomingSessionCard key={s.number} session={s} now={now} />
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

      {/* Contact & Get Involved */}
      <section id="get-involved" className="section-spacing">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Contact */}
            <a
              href="https://wizeline.slack.com/archives/C07MSCUDR8R"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border rounded-sm p-6 hover:opacity-80 transition-opacity"
            >
              <span className="font-mono text-primary text-xs tracking-widest uppercase">{t.about_page.organizer_label}</span>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-heading font-medium inline-flex items-center gap-1.5">
                    {t.about_page.organizer_name}
                    <ExternalLink size={13} className="text-muted-foreground" />
                  </p>
                  <p className="text-sm text-muted-foreground">{t.about_page.organizer_role}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">{t.about_page.organizer_slack}</p>
                </div>
              </div>
            </a>

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

      {/* Articles Teaser */}
      <section id="articles" className="section-spacing bg-secondary/35 overflow-hidden">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-sm bg-primary/10 border border-primary/20">
                  <FileText size={20} className="text-primary" />
                </div>
                <span className="font-mono text-primary text-sm tracking-widest uppercase font-bold">{t.articles_teaser.label}</span>
              </div>
              <span className="inline-flex items-center rounded-sm border border-primary/30 bg-primary/8 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">
                {t.articles_teaser.status}
              </span>
              <h2 className="font-heading text-3xl font-medium mt-5 leading-tight">
                {t.articles_teaser.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base mt-4">
                {t.articles_teaser.subtitle}
              </p>
            </div>

            <div className="lg:col-span-8 grid gap-4 md:grid-cols-3">
              {t.articles_teaser.items.map((item, idx) => {
                const Icon = articleIcons[idx % articleIcons.length];

                return (
                  <div
                    key={item.title}
                    className="group relative rounded-sm border border-border bg-background p-6 overflow-hidden hover:border-primary/35 transition-colors duration-300"
                  >
                    <span className="absolute right-4 top-3 font-mono text-5xl font-bold text-border/60 select-none group-hover:text-primary/10 transition-colors duration-300">
                      {`0${idx + 1}`}
                    </span>
                    <div className="relative z-10">
                      <div className="inline-flex items-center justify-center w-9 h-9 rounded-sm bg-primary/8 border border-primary/15 mb-4">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <h3 className="font-heading text-base font-bold mb-3">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 rounded-sm border border-primary/20 bg-primary/6 p-6 md:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary mb-2">
                  {t.articles_teaser.callout_label}
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {t.articles_teaser.callout_body}
                </p>
              </div>
              <span className="inline-flex w-fit items-center rounded-sm border border-primary/30 px-3 py-2 font-mono text-xs uppercase tracking-widest text-primary">
                {t.articles_teaser.callout_badge}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
