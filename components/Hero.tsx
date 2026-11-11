import { profile } from "@/data/profile";
import { tr, ui, type Lang } from "@/lib/i18n";
import { asset } from "@/lib/site";
import { UiIcon } from "./icons";

/** Linhas de fluxo no fundo do hero (decorativas). */
function HeroBackdrop() {
  const paths = [
    "M-20 120 C 220 60, 420 200, 700 130 S 1100 60, 1460 140",
    "M-20 260 C 260 200, 520 330, 820 250 S 1180 190, 1460 280",
    "M-20 420 C 300 360, 600 480, 900 400 S 1220 340, 1460 430",
    "M-20 560 C 240 520, 560 620, 860 540 S 1200 500, 1460 580",
  ];
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      viewBox="0 0 1440 680"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} stroke="var(--line)" strokeWidth={1} />
          <path d={d} stroke="var(--accent)" strokeOpacity={0.35} strokeWidth={1.2} className="flow-line" style={{ animationDuration: `${1.6 + i * 0.4}s` }} />
        </g>
      ))}
    </svg>
  );
}

/** Cartão com o pipeline medalhão animado. */
function HeroPipeline({ lang }: { lang: Lang }) {
  const pt = lang === "pt";
  const sources = [
    { x: 80, label: "API REST" },
    { x: 200, label: pt ? "Bancos SQL" : "SQL DBs" },
    { x: 320, label: pt ? "Eventos" : "Events" },
  ];
  const layers = [
    { y: 132, tone: "bronze", name: "BRONZE", desc: pt ? "dado bruto, rastreável" : "raw, traceable" },
    { y: 198, tone: "silver", name: "SILVER", desc: pt ? "limpo, tipado, sem duplicatas" : "clean, typed, deduplicated" },
    { y: 264, tone: "gold", name: "GOLD", desc: pt ? "modelado para o negócio" : "business-ready model" },
  ];
  const flows = sources.map((s) => `M${s.x} 96 C${s.x} 116, 200 112, 200 132 V 322`);
  return (
    <figure className="relative mx-auto w-full max-w-md">
      <div aria-hidden="true" className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      <svg
        viewBox="0 0 400 364"
        role="img"
        aria-label={
          pt
            ? "Ilustração de um pipeline na Arquitetura Medalhão: APIs, bancos e eventos passam pelas camadas Bronze, Silver e Gold até virar BI e decisões."
            : "Illustration of a Medallion Architecture pipeline: APIs, databases and events flow through Bronze, Silver and Gold layers into BI and decisions."
        }
        className="relative block h-auto w-full"
      >
        <rect x={0.5} y={0.5} width={399} height={363} rx={18} fill="var(--surface)" stroke="var(--line-strong)" />
        <line x1={0} x2={400} y1={38} y2={38} stroke="var(--line)" />
        {[18, 32, 46].map((cx) => (
          <circle key={cx} cx={cx} cy={19} r={4} fill="var(--line-strong)" />
        ))}
        <text x={62} y={23} fontSize={11} className="font-mono" fill="var(--muted)">
          medallion_pipeline
        </text>
        <circle cx={318} cy={19} r={3.5} fill="var(--ok)" className="pulse-dot" />
        <text x={328} y={23} fontSize={10.5} className="font-mono" fill="var(--ok)">
          running
        </text>

        {flows.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="var(--line-strong)" strokeWidth={1.2} />
            <path d={d} fill="none" stroke="var(--accent)" strokeWidth={1.4} className="flow-line" />
          </g>
        ))}

        {sources.map((s) => (
          <g key={s.label}>
            <rect x={s.x - 50} y={64} width={100} height={32} rx={8} fill="var(--surface-2)" stroke="var(--line-strong)" />
            <text x={s.x} y={84} textAnchor="middle" fontSize={11.5} fontWeight={600} className="font-sans" fill="var(--fg)">
              {s.label}
            </text>
          </g>
        ))}

        {layers.map((l) => (
          <g key={l.name}>
            <rect x={60} y={l.y} width={280} height={40} rx={10} fill="var(--surface-2)" stroke={`var(--tone-${l.tone})`} strokeOpacity={0.7} />
            <text x={76} y={l.y + 25} fontSize={11} fontWeight={700} letterSpacing={1.4} className="font-mono" fill={`var(--tone-${l.tone})`}>
              {l.name}
            </text>
            <text x={326} y={l.y + 25} textAnchor="end" fontSize={11} className="font-sans" fill="var(--fg-soft)">
              {l.desc}
            </text>
          </g>
        ))}

        <rect x={120} y={322} width={160} height={30} rx={15} fill="var(--accent)" fillOpacity={0.14} stroke="var(--accent)" strokeOpacity={0.7} />
        <text x={200} y={341} textAnchor="middle" fontSize={11.5} fontWeight={600} className="font-sans" fill="var(--fg)">
          {pt ? "BI · decisões" : "BI · decisions"}
        </text>

        {flows.map((d, i) => (
          <circle key={i} r={3.2} fill="var(--accent)" className="packet">
            <animateMotion dur="4.2s" begin={`${i * 1.4}s`} repeatCount="indefinite" path={d} />
          </circle>
        ))}
      </svg>
    </figure>
  );
}

export function Hero({ lang }: { lang: Lang }) {
  return (
    <section id="topo" className="relative overflow-hidden border-b border-line/60">
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <HeroBackdrop />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-12 sm:px-6 sm:pt-20 lg:grid-cols-12 lg:pb-28 lg:pt-24">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 text-xs font-medium text-fg-soft">
            <span className="pulse-dot size-2 rounded-full bg-ok" aria-hidden="true" />
            {tr(ui.hero.available, lang)}
          </p>
          <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-fg sm:text-6xl">
            {profile.name}
            <span className="mt-3 block font-mono text-xl font-semibold tracking-normal sm:text-3xl">
              <span className="text-gradient">{tr(profile.role, lang)}</span>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-soft">{tr(profile.tagline, lang)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-ink shadow-[0_0_0_1px_var(--accent),0_8px_30px_-8px_var(--accent)] transition-transform hover:-translate-y-0.5"
            >
              {tr(ui.hero.seeProjects, lang)}
              <UiIcon name="arrowRight" size={16} />
            </a>
            <a
              href={asset(profile.links.cv)}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-surface px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent"
            >
              <UiIcon name="download" size={16} />
              {tr(ui.hero.downloadCv, lang)}
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-surface px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent"
            >
              <UiIcon name="linkedin" size={16} />
              {tr(ui.hero.linkedin, lang)}
              <span className="sr-only">{lang === "pt" ? "(abre em nova aba)" : "(opens in a new tab)"}</span>
            </a>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {profile.highlights.map((h) => (
              <div key={h.value} className="flex flex-col-reverse border-l-2 border-accent/60 pl-3">
                <dt className="mt-1 text-xs leading-snug text-muted">{tr(h.label, lang)}</dt>
                <dd className="font-mono text-lg font-bold text-fg">{lang === "en" && h.valueEn ? h.valueEn : h.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hidden sm:block lg:col-span-5">
          <HeroPipeline lang={lang} />
        </div>
      </div>
    </section>
  );
}
