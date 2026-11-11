import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { profile } from "@/data/profile";
import { building, featured, lab } from "@/data/projects";
import { tr, ui, type L, type Lang } from "@/lib/i18n";
import zenithOnDark from "@/assets/zenith-logo-on-dark.webp";
import zenithOnLight from "@/assets/zenith-logo-on-light.webp";
import { ERDiagram } from "./ERDiagram";
import { UiIcon } from "./icons";
import { PipelineDiagram } from "./PipelineDiagram";
import { BrandIcon, siGithub, siInstagram, TechIcon, techName } from "./TechIcon";
import { GlowCard } from "./ui/spotlight-card";

type Vars = CSSProperties & Record<`--${string}`, string | number>;
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function NewTab({ lang }: { lang: Lang }) {
  return <span className="sr-only">{lang === "pt" ? "(abre em nova aba)" : "(opens in a new tab)"}</span>;
}

/** Quebra "texto com *destaque*" em palavras; o destaque vira serifa itálica. */
function words(text: string) {
  const out: { w: string; italic: boolean; tail?: string }[] = [];
  text.split("*").forEach((seg, si) => {
    seg
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => {
        // pontuação solta ("dia a dia*." → ".") gruda na palavra anterior, sem espaço
        if (/^[.,:;!?]+$/.test(w) && out.length) out[out.length - 1].tail = (out[out.length - 1].tail ?? "") + w;
        else out.push({ w, italic: si % 2 === 1 });
      });
  });
  return out;
}

/** Título com revelação palavra por palavra ao rolar. */
function Heading({ text, id, className = "" }: { text: string; id: string; className?: string }) {
  return (
    <h2 id={id} className={`text-[clamp(2.3rem,5.6vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-fg ${className}`}>
      {words(text).map((t, i) => (
        <span key={i}>
          <span
            className={`h-word inline-block ${t.italic ? "font-serif text-[1.08em] font-normal italic tracking-[-0.01em]" : ""}`}
            style={{ "--i": i } as Vars}
          >
            {t.w}
            {t.tail && <span className="font-sans not-italic">{t.tail}</span>}
          </span>{" "}
        </span>
      ))}
    </h2>
  );
}

function Section({
  id,
  n,
  lang,
  heading,
  lead,
  children,
  className = "",
}: {
  id: keyof typeof ui.nav;
  n: string;
  lang: Lang;
  heading?: L;
  lead?: L;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`cv-auto relative py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal flex items-center justify-between border-t border-line pt-5 font-mono text-xs text-muted">
          <span className="flex items-center gap-2.5">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            {tr(ui.nav[id], lang)}
          </span>
          <span>({n})</span>
        </div>
        {heading && (
          <div className="mb-14 mt-10 grid gap-6 sm:mb-20 lg:grid-cols-12 lg:items-end">
            <Heading id={`${id}-title`} text={tr(heading, lang)} className="lg:col-span-8" />
            {lead && <p className="reveal leading-relaxed text-muted lg:col-span-4 lg:pb-2">{tr(lead, lang)}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function MonoLabel({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{children}</p>;
}

/* ---------------- Sobre ---------------- */
export function About({ lang }: { lang: Lang }) {
  return (
    <Section id="about" n="01" lang={lang}>
      <h2 id="about-title" className="sr-only">
        {tr(ui.headings.about, lang).replace(/\*/g, "")}
      </h2>
      <p className="mt-12 max-w-5xl text-[clamp(1.55rem,3.3vw,2.85rem)] font-medium leading-[1.2] tracking-[-0.025em] text-fg sm:mt-16">
        {words(tr(profile.about, lang)).map((t, i) => (
          <span key={i} className={`tr-word ${t.italic ? "font-serif text-[1.08em] font-normal italic text-accent" : ""}`}>
            {t.w}
            {t.tail && <span className="font-sans not-italic text-fg">{t.tail}</span>}{" "}
          </span>
        ))}
      </p>

      <ul className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {profile.pillars.map((p, i) => (
          <li key={p.title.pt} className="reveal">
            <GlowCard customSize className="flex h-full flex-col p-6">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="mt-10 text-lg font-semibold tracking-tight text-fg">{tr(p.title, lang)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{tr(p.text, lang)}</p>
            </GlowCard>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------- Stack ---------------- */
function Marquee({ children, rev = false, dur = "50s" }: { children: ReactNode; rev?: boolean; dur?: string }) {
  return (
    <div className={`marquee ${rev ? "marquee--rev" : ""}`} style={{ "--dur": dur } as Vars}>
      <div className="marquee__track">{children}</div>
      <div className="marquee__track" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}

export function Stack({ lang }: { lang: Lang }) {
  const all = Array.from(new Set(profile.stack.flatMap((g) => g.items)));
  return (
    <Section id="stack" n="02" lang={lang} heading={ui.headings.stack} lead={ui.leads.stack} className="overflow-hidden">
      <div data-anim className="reveal -mx-4 space-y-4 sm:-mx-6">
        <Marquee>
          {all.map((k) => (
            <span key={k} className="flex items-center gap-3 rounded-full border border-line bg-glass px-5 py-3 text-[15px] text-fg-soft">
              <TechIcon name={k} size={20} className="text-muted" />
              {techName(k)}
            </span>
          ))}
        </Marquee>
        <Marquee rev dur="70s">
          {profile.concepts.map((c) => {
            const s = tr(c, lang);
            return (
              <span key={s} className="flex items-center gap-6 whitespace-nowrap font-serif text-3xl italic text-muted sm:text-4xl">
                {s}
                <span aria-hidden="true" className="text-xl not-italic text-accent">
                  ✦
                </span>
              </span>
            );
          })}
        </Marquee>
      </div>

      <div className="mt-20 grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {profile.stack.map((g) => (
          <div key={g.group.pt} className="reveal bg-bg p-6">
            <MonoLabel>{tr(g.group, lang)}</MonoLabel>
            <ul className="mt-5 space-y-2.5">
              {g.items.map((k) => (
                <li key={k} className="flex items-center gap-2.5 text-sm text-fg-soft">
                  <TechIcon name={k} size={16} className="text-muted" />
                  {techName(k)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Experiência (feixe que acompanha o scroll) ---------------- */
export function Experience({ lang }: { lang: Lang }) {
  return (
    <Section id="experience" n="03" lang={lang} heading={ui.headings.experience}>
      <div className="relative">
        <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-line" />
        <span
          aria-hidden="true"
          className="trace-beam absolute bottom-2 left-[5px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent to-accent-2 shadow-[0_0_14px_var(--accent)]"
        />
        <ol className="space-y-16 sm:space-y-20">
          {profile.experience.map((e) => (
            <li key={`${e.company}-${e.period.pt}`} className="reveal relative grid gap-5 pl-10 lg:grid-cols-12 lg:gap-10">
              <span aria-hidden="true" className="trace-dot absolute left-0 top-1 size-[11px] rounded-full border border-line-strong bg-bg" />
              <div className="lg:col-span-4">
                <p className="font-mono text-xs text-accent">{tr(e.period, lang)}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">{tr(e.role, lang)}</h3>
                <p className="mt-1 text-fg-soft">{e.company}</p>
                {e.client && <p className="text-sm text-muted">{tr(e.client, lang)}</p>}
                <p className="mt-2 text-xs text-muted">{tr(e.place, lang)}</p>
                {e.current && (
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fg-soft">
                    <span aria-hidden="true" className="pulse-dot size-1.5 rounded-full bg-ok" />
                    {lang === "pt" ? "atual" : "current"}
                  </span>
                )}
              </div>
              <div className="lg:col-span-8">
                {e.summary && <p className="text-lg leading-relaxed text-fg-soft">{tr(e.summary, lang)}</p>}
                <ul className={`${e.summary ? "mt-5" : ""} space-y-3`}>
                  {e.bullets.map((b) => (
                    <li
                      key={b.pt}
                      className="relative pl-6 text-[15px] leading-relaxed text-muted before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-3 before:bg-line-strong"
                    >
                      {tr(b, lang)}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-mono text-xs leading-relaxed text-muted">{e.tags.join("  /  ")}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ---------------- Projetos ---------------- */
export function Projects({ lang }: { lang: Lang }) {
  return (
    <Section id="projects" n="04" lang={lang} heading={ui.headings.projects} lead={ui.leads.projects}>
      <div className="space-y-28 sm:space-y-36">
        {featured.map((p, i) => (
          <article key={p.id} id={p.id} aria-labelledby={`${p.id}-title`}>
            <div className="reveal grid gap-4 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-9">
                <p className="font-mono text-xs text-muted">{tr(p.context, lang)}</p>
                <h3 id={`${p.id}-title`} className="mt-3 text-[clamp(1.75rem,3.6vw,2.9rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-fg">
                  {tr(p.title, lang)}
                </h3>
              </div>
              <div className="hidden lg:col-span-3 lg:flex lg:justify-end">
                <span aria-hidden="true" className="font-serif text-[7.5rem] italic leading-[0.8] text-transparent [-webkit-text-stroke:1px_var(--line-strong)]">
                  0{i + 1}
                </span>
              </div>
            </div>

            <div className="reveal mt-10 grid gap-px overflow-hidden rounded-[18px] border border-line bg-line md:grid-cols-[1fr_1.5fr_1fr]">
              <div className="bg-bg p-6">
                <MonoLabel>{tr(ui.project.problem, lang)}</MonoLabel>
                <p className="mt-3 leading-relaxed text-fg-soft">{tr(p.problem, lang)}</p>
              </div>
              <div className="bg-bg p-6">
                <MonoLabel>{tr(ui.project.solution, lang)}</MonoLabel>
                <p className="mt-3 leading-relaxed text-muted">{tr(p.solution, lang)}</p>
              </div>
              <div className="bg-bg p-6">
                <MonoLabel>{tr(ui.project.impact, lang)}</MonoLabel>
                <ul className="mt-3 space-y-3">
                  {p.impact.map((m) => (
                    <li key={m.pt} className="flex gap-2.5 text-[15px] leading-relaxed text-fg-soft">
                      <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{tr(m, lang)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="tilt-in mt-6 rounded-[18px] border border-line bg-surface p-4 shadow-[0_40px_120px_-40px_var(--glow)] sm:p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span>{tr(ui.project.architecture, lang)}</span>
                <span className="flex items-center gap-1.5 normal-case tracking-normal">
                  <UiIcon name="lock" size={13} />
                  {tr(ui.project.confidential, lang)}
                </span>
              </div>
              <PipelineDiagram diagram={p.diagram} lang={lang} name={tr(p.title, lang)} />
              <p className="mt-2 hidden text-xs text-muted sm:block lg:hidden">{tr(ui.project.scrollHint, lang)}</p>
              <p className="mt-5 border-t border-line pt-4 font-mono text-xs leading-relaxed text-muted">{p.stack.join("  /  ")}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Laboratório ---------------- */
function fmtMonth(ym: string, lang: Lang) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 15)).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

export function Lab({ lang }: { lang: Lang }) {
  return (
    <Section id="lab" n="05" lang={lang} heading={ui.headings.lab} lead={ui.leads.lab}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {lab.map((l, i) => (
          <li key={l.title.pt} className="reveal">
            <GlowCard customSize className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-muted">
                <span>LAB-0{i + 1}</span>
                {l.updated && <span>{fmtMonth(l.updated, lang)}</span>}
              </div>
              <h3 className="mt-10 text-lg font-semibold tracking-tight text-fg">{tr(l.title, lang)}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tr(l.description, lang)}</p>
              <p className="mt-5 font-mono text-[11px] leading-relaxed text-muted">{l.tech.map((t) => tr(t, lang)).join(" / ")}</p>
              <div className="mt-5 border-t border-line pt-4">
                {l.repo ? (
                  <a href={l.repo} {...ext} className="inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent">
                    <BrandIcon icon={siGithub} size={15} />
                    {tr(ui.project.viewCode, lang)}
                    <UiIcon name="arrowUpRight" size={14} />
                    <NewTab lang={lang} />
                  </a>
                ) : (
                  <span className="text-xs text-muted">{tr(ui.project.noRepo, lang)}</span>
                )}
              </div>
            </GlowCard>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------- Em construção ---------------- */
export function Building({ lang }: { lang: Lang }) {
  return (
    <Section id="building" n="06" lang={lang} heading={ui.headings.building}>
      <article aria-labelledby="eli-title">
        <div className="reveal grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fg-soft">
              <span aria-hidden="true" className="pulse-dot size-1.5 rounded-full bg-[var(--tone-gold)]" />
              {tr(ui.project.inDev, lang)} · Zenith Tech
            </span>
            <h3 id="eli-title" className="mt-6 text-[clamp(1.75rem,3.6vw,2.9rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-fg">
              {tr(building.title, lang)}
            </h3>
            <p className="mt-5 leading-relaxed text-fg-soft">{tr(building.description, lang)}</p>
            <a
              href={building.url}
              {...ext}
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium text-fg transition-colors hover:bg-glass"
            >
              <UiIcon name="globe" size={16} />
              elisoares.com
              <UiIcon name="arrowUpRight" size={14} />
              <NewTab lang={lang} />
            </a>
          </div>
          <div className="lg:col-span-6">
            <MonoLabel>{tr(ui.project.architecture, lang)}</MonoLabel>
            <ol className="mt-4 divide-y divide-line border-y border-line">
              {building.architecture.map((a, i) => (
                <li key={a.pt} className="flex gap-4 py-3.5 text-[15px] leading-relaxed text-fg-soft">
                  <span className="font-mono text-xs leading-7 text-accent">0{i + 1}</span>
                  <span>{tr(a, lang)}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 font-mono text-xs leading-relaxed text-muted">{building.stack.join("  /  ")}</p>
          </div>
        </div>
        <div className="tilt-in mt-12 rounded-[18px] border border-line bg-surface p-4 shadow-[0_40px_120px_-40px_var(--glow)] sm:p-6">
          <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{tr(ui.project.erTitle, lang)}</div>
          <ERDiagram tables={building.er.tables} relations={building.er.relations} views={building.er.views} lang={lang} />
          <p className="mt-2 text-xs text-muted lg:hidden">{tr(ui.project.scrollHint, lang)}</p>
        </div>
      </article>
    </Section>
  );
}

/* ---------------- Zenith Tech ---------------- */
export function Zenith({ lang }: { lang: Lang }) {
  const z = profile.zenith;
  return (
    <Section id="zenith" n="07" lang={lang} heading={ui.headings.zenith}>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="reveal lg:col-span-5">
          <Image src={zenithOnDark} alt="Zenith Tech Company" sizes="260px" className="only-dark h-auto w-[260px]" />
          <Image src={zenithOnLight} alt="Zenith Tech Company" sizes="260px" className="only-light h-auto w-[260px]" />
          <p className="mt-8 font-mono text-xs text-accent">
            {tr(z.role, lang)} · {z.name}
          </p>
          <p className="mt-4 text-2xl font-medium leading-snug tracking-[-0.02em] text-fg">{tr(z.tagline, lang)}</p>
          <p className="mt-4 leading-relaxed text-muted">{tr(z.text, lang)}</p>
          <a
            href={z.instagram}
            {...ext}
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium text-fg transition-colors hover:bg-glass"
          >
            <BrandIcon icon={siInstagram} size={15} />
            {z.instagramUser}
            <NewTab lang={lang} />
          </a>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {z.services.map((s, i) => (
            <li key={s.title.pt} className="reveal">
              <GlowCard customSize className="flex h-full flex-col p-6">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="mt-8 text-lg font-semibold tracking-tight text-fg">{tr(s.title, lang)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tr(s.text, lang)}</p>
              </GlowCard>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------------- Formação ---------------- */
export function Education({ lang }: { lang: Lang }) {
  const col = (title: string, children: ReactNode) => (
    <div className="reveal border-t border-line pt-6">
      <MonoLabel>{title}</MonoLabel>
      <ul className="mt-6 space-y-6">{children}</ul>
    </div>
  );
  return (
    <Section id="education" n="08" lang={lang} heading={ui.headings.education}>
      <div className="grid gap-12 md:grid-cols-3 md:gap-8">
        {col(
          tr(ui.education.degrees, lang),
          profile.education.map((e) => (
            <li key={e.title.pt}>
              <p className="text-lg font-medium tracking-tight text-fg">{tr(e.title, lang)}</p>
              <p className="mt-1 text-sm text-muted">{e.school}</p>
              <p className="mt-1.5 font-mono text-xs text-accent">{tr(e.period, lang)}</p>
            </li>
          )),
        )}
        {col(
          tr(ui.education.courses, lang),
          profile.courses.map((c) => (
            <li key={c.title.pt}>
              <p className="font-medium text-fg">{tr(c.title, lang)}</p>
              <p className="mt-1 text-sm text-muted">{c.org}</p>
            </li>
          )),
        )}
        {col(
          tr(ui.education.languages, lang),
          profile.languages.map((l) => (
            <li key={l.name.pt}>
              <p className="font-medium text-fg">{tr(l.name, lang)}</p>
              <p className="mt-1 text-sm text-muted">{tr(l.level, lang)}</p>
            </li>
          )),
        )}
      </div>
    </Section>
  );
}
