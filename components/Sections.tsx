import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { profile } from "@/data/profile";
import { building, featured, lab } from "@/data/projects";
import { tr, ui, type L, type Lang } from "@/lib/i18n";
import { asset } from "@/lib/site";
import photo from "@/assets/alexandre-soares.webp";
import zenithOnDark from "@/assets/zenith-logo-on-dark.webp";
import zenithOnLight from "@/assets/zenith-logo-on-light.webp";
import { ERDiagram } from "./ERDiagram";
import { PipelineDiagram } from "./PipelineDiagram";
import { UiIcon, type UiIconName } from "./icons";
import { BrandIcon, siGithub, siInstagram, siWhatsapp, TechIcon, techBrand, techName } from "./TechIcon";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function NewTab({ lang }: { lang: Lang }) {
  return <span className="sr-only">{lang === "pt" ? "(abre em nova aba)" : "(opens in a new tab)"}</span>;
}

function Section({
  id,
  n,
  tag,
  title,
  lead,
  children,
  className = "",
}: {
  id: string;
  n: string;
  tag: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`cv-auto py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="reveal mb-10 max-w-3xl sm:mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            {n} <span className="text-muted">/</span> {tag}
          </p>
          <h2 id={`${id}-title`} className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {title}
          </h2>
          {lead && <p className="mt-4 text-lg leading-relaxed text-muted">{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{children}</h4>;
}

function Chips({ items, lang }: { items: (string | L)[]; lang: Lang }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => {
        const s = tr(t, lang);
        return (
          <li key={s} className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-fg-soft">
            {s}
          </li>
        );
      })}
    </ul>
  );
}

/* ---------------- Sobre ---------------- */
export function About({ lang }: { lang: Lang }) {
  return (
    <Section id="about" n="01" tag={tr(ui.nav.about, lang)} title={tr(ui.sections.about, lang)}>
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="reveal lg:col-span-4">
          <div className="relative mx-auto max-w-[280px] lg:max-w-none">
            <div aria-hidden="true" className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-accent/30 via-transparent to-accent-2/30 blur-2xl" />
            <Image
              src={photo}
              alt={lang === "pt" ? "Foto de Alexandre Soares" : "Photo of Alexandre Soares"}
              sizes="(min-width: 1024px) 320px, 280px"
              placeholder="blur"
              className="relative h-auto w-full rounded-2xl border border-line-strong"
            />
          </div>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted">
            <UiIcon name="pin" size={16} />
            {tr(profile.location, lang)}
          </p>
        </div>
        <div className="lg:col-span-8">
          <p className="reveal text-lg leading-relaxed text-fg-soft">{tr(profile.about, lang)}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {profile.pillars.map((p) => (
              <li key={p.title.pt} className="reveal rounded-xl border border-line bg-surface p-5">
                <h3 className="flex items-center gap-2 font-semibold text-fg">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                  {tr(p.title, lang)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tr(p.text, lang)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Stack ---------------- */
export function Stack({ lang }: { lang: Lang }) {
  return (
    <Section id="stack" n="02" tag={tr(ui.nav.stack, lang)} title={tr(ui.sections.stack, lang)} lead={tr(ui.sections.stackLead, lang)} className="bg-bg-soft/50">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {profile.stack.map((g) => (
          <div key={g.group.pt} className="reveal rounded-xl border border-line bg-surface p-5">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{tr(g.group, lang)}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((k) => (
                <li key={k}>
                  <span
                    className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-sm text-fg-soft transition-colors hover:border-line-strong hover:text-fg"
                    style={{ "--brand": techBrand(k) ?? "var(--fg)" } as CSSProperties}
                  >
                    <TechIcon name={k} size={16} className="text-muted transition-colors group-hover:text-[var(--brand)]" />
                    {techName(k)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="reveal mt-10">
        <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{tr(ui.sections.concepts, lang)}</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {profile.concepts.map((c) => {
            const s = tr(c, lang);
            return (
              <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fg-soft">
                {s}
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

/* ---------------- Experiência ---------------- */
export function Experience({ lang }: { lang: Lang }) {
  return (
    <Section id="experience" n="03" tag={tr(ui.nav.experience, lang)} title={tr(ui.sections.experience, lang)}>
      <ol className="relative ml-2 space-y-8 border-l border-line-strong/70 sm:ml-3">
        {profile.experience.map((e) => (
          <li key={`${e.company}-${e.period.pt}`} className="reveal relative pl-6 sm:pl-9">
            <span
              aria-hidden="true"
              className={`absolute -left-[7px] top-7 size-3.5 rounded-full border-2 ${e.current ? "border-accent bg-accent shadow-[0_0_0_4px_var(--glow)]" : "border-line-strong bg-bg"}`}
            />
            <article className="rounded-xl border border-line bg-surface p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                <div>
                  <h3 className="text-lg font-semibold text-fg">{tr(e.role, lang)}</h3>
                  <p className="text-fg-soft">
                    {e.company}
                    {e.client && <span className="text-muted"> · {tr(e.client, lang)}</span>}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="font-mono text-sm text-accent">
                    {tr(e.period, lang)}
                    {e.current && (
                      <span className="ml-2 rounded-full bg-ok/15 px-2 py-0.5 text-[11px] font-semibold text-ok">
                        {lang === "pt" ? "atual" : "current"}
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-xs text-muted">{tr(e.place, lang)}</p>
                </div>
              </div>
              {e.summary && <p className="mt-4 text-sm leading-relaxed text-fg-soft">{tr(e.summary, lang)}</p>}
              <ul className="mt-4 space-y-2.5">
                {e.bullets.map((b) => (
                  <li key={b.pt} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <UiIcon name="check" size={16} className="mt-0.5 shrink-0 text-accent" />
                    <span>{tr(b, lang)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <Chips items={e.tags} lang={lang} />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ---------------- Projetos em destaque ---------------- */
export function Projects({ lang }: { lang: Lang }) {
  return (
    <Section id="projects" n="04" tag={tr(ui.nav.projects, lang)} title={tr(ui.sections.projects, lang)} lead={tr(ui.sections.projectsLead, lang)} className="bg-bg-soft/50">
      <div className="space-y-10">
        {featured.map((p, i) => (
          <article key={p.id} id={p.id} aria-labelledby={`${p.id}-title`} className="reveal overflow-hidden rounded-2xl border border-line bg-surface">
            <header className="flex flex-wrap items-start justify-between gap-4 border-b border-line p-5 sm:p-7">
              <div>
                <p className="font-mono text-xs text-accent">
                  P-0{i + 1} · {tr(p.context, lang)}
                </p>
                <h3 id={`${p.id}-title`} className="mt-2 text-xl font-bold tracking-tight text-fg sm:text-2xl">
                  {tr(p.title, lang)}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-muted">
                <UiIcon name="lock" size={14} />
                {tr(ui.project.confidential, lang)}
              </span>
            </header>
            <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-5">
                <div>
                  <Label>{tr(ui.project.problem, lang)}</Label>
                  <p className="mt-2 leading-relaxed text-fg-soft">{tr(p.problem, lang)}</p>
                </div>
                <div>
                  <Label>{tr(ui.project.impact, lang)}</Label>
                  <ul className="mt-3 space-y-2">
                    {p.impact.map((m) => (
                      <li key={m.pt} className="flex gap-2.5 text-sm leading-relaxed text-fg-soft">
                        <UiIcon name="arrowRight" size={16} className="mt-0.5 shrink-0 text-ok" />
                        <span>{tr(m, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-6 lg:col-span-7">
                <div>
                  <Label>{tr(ui.project.solution, lang)}</Label>
                  <p className="mt-2 leading-relaxed text-muted">{tr(p.solution, lang)}</p>
                </div>
                <div>
                  <Label>{tr(ui.project.stack, lang)}</Label>
                  <div className="mt-3">
                    <Chips items={p.stack} lang={lang} />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-line bg-bg-soft/60 p-4 sm:p-6">
              <div className="mb-4">
                <Label>{tr(ui.project.architecture, lang)}</Label>
              </div>
              <PipelineDiagram diagram={p.diagram} lang={lang} name={tr(p.title, lang)} />
              <p className="mt-2 hidden text-xs text-muted sm:block lg:hidden">{tr(ui.project.scrollHint, lang)}</p>
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
    <Section id="lab" n="05" tag={tr(ui.nav.lab, lang)} title={tr(ui.sections.lab, lang)} lead={tr(ui.sections.labLead, lang)}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {lab.map((l) => (
          <li key={l.title.pt} className="reveal flex flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong">
            <div className="flex items-center justify-between gap-2">
              <span className="grid size-9 place-items-center rounded-lg bg-surface-2 text-accent">
                <UiIcon name="flask" />
              </span>
              {l.updated && (
                <span className="font-mono text-[11px] text-muted">
                  {tr(ui.project.updated, lang)} {fmtMonth(l.updated, lang)}
                </span>
              )}
            </div>
            <h3 className="mt-4 font-semibold text-fg">{tr(l.title, lang)}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tr(l.description, lang)}</p>
            <div className="mt-4">
              <Chips items={l.tech} lang={lang} />
            </div>
            <div className="mt-5 border-t border-line pt-4">
              {l.repo ? (
                <a href={l.repo} {...ext} className="inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent">
                  <BrandIcon icon={siGithub} size={16} />
                  {tr(ui.project.viewCode, lang)}
                  <UiIcon name="arrowUpRight" size={14} />
                  <NewTab lang={lang} />
                </a>
              ) : (
                <span className="text-xs text-muted">{tr(ui.project.noRepo, lang)}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------- Em construção ---------------- */
export function Building({ lang }: { lang: Lang }) {
  const gold: CSSProperties = {
    color: "var(--tone-gold)",
    borderColor: "color-mix(in oklab, var(--tone-gold) 45%, transparent)",
    background: "color-mix(in oklab, var(--tone-gold) 10%, transparent)",
  };
  return (
    <Section id="building" n="06" tag={lang === "pt" ? "em construção" : "wip"} title={tr(ui.sections.building, lang)} className="bg-bg-soft/50">
      <article aria-labelledby="eli-title" className="reveal overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold" style={gold}>
                <span aria-hidden="true" className="pulse-dot size-2 rounded-full bg-current" />
                {tr(ui.project.inDev, lang)}
              </span>
              <span className="font-mono text-xs text-muted">Zenith Tech</span>
            </div>
            <h3 id="eli-title" className="mt-4 text-2xl font-bold tracking-tight text-fg">
              {tr(building.title, lang)}
            </h3>
            <p className="mt-3 leading-relaxed text-fg-soft">{tr(building.description, lang)}</p>
            <a
              href={building.url}
              {...ext}
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line-strong bg-surface-2 px-4 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent"
            >
              <UiIcon name="globe" size={16} />
              elisoares.com
              <UiIcon name="arrowUpRight" size={14} />
              <NewTab lang={lang} />
            </a>
          </div>
          <div className="lg:col-span-5">
            <Label>{tr(ui.project.architecture, lang)}</Label>
            <ul className="mt-3 space-y-2">
              {building.architecture.map((a) => (
                <li key={a.pt} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <UiIcon name="check" size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>{tr(a, lang)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Label>{tr(ui.project.stack, lang)}</Label>
              <div className="mt-3">
                <Chips items={building.stack} lang={lang} />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-line bg-bg-soft/60 p-4 sm:p-6">
          <div className="mb-4">
            <Label>{tr(ui.project.erTitle, lang)}</Label>
          </div>
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
    <Section id="zenith" n="07" tag={tr(ui.nav.zenith, lang)} title={tr(ui.sections.zenith, lang)}>
      <div className="reveal relative overflow-hidden rounded-2xl border border-line bg-surface">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_22rem_at_100%_0%,var(--glow),transparent_70%)]" />
        <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image src={zenithOnDark} alt="Zenith Tech Company" sizes="240px" className="only-dark h-auto w-[240px]" />
            <Image src={zenithOnLight} alt="Zenith Tech Company" sizes="240px" className="only-light h-auto w-[240px]" />
            <p className="mt-7 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {tr(z.role, lang)} · {z.name}
            </p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-fg sm:text-3xl">{tr(z.tagline, lang)}</h3>
            <p className="mt-4 leading-relaxed text-fg-soft">{tr(z.text, lang)}</p>
            <a
              href={z.instagram}
              {...ext}
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line-strong bg-surface-2 px-4 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent"
            >
              <BrandIcon icon={siInstagram} size={16} />
              {z.instagramUser}
              <NewTab lang={lang} />
            </a>
          </div>
          <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-7">
            {z.services.map((s, i) => (
              <li key={s.title.pt} className="rounded-xl border border-line bg-surface-2/70 p-4">
                <p className="font-mono text-xs text-accent">0{i + 1}</p>
                <h4 className="mt-1 font-semibold text-fg">{tr(s.title, lang)}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{tr(s.text, lang)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Formação ---------------- */
export function Education({ lang }: { lang: Lang }) {
  const card = "reveal rounded-xl border border-line bg-surface p-5 sm:p-6";
  const head = (icon: UiIconName, text: string) => (
    <h3 className="flex items-center gap-2.5 font-semibold text-fg">
      <span className="grid size-8 place-items-center rounded-lg bg-surface-2 text-accent">
        <UiIcon name={icon} size={18} />
      </span>
      {text}
    </h3>
  );
  return (
    <Section id="education" n="08" tag={tr(ui.nav.education, lang)} title={tr(ui.sections.education, lang)} className="bg-bg-soft/50">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className={card}>
          {head("cap", tr(ui.education.degrees, lang))}
          <ul className="mt-5 space-y-5">
            {profile.education.map((e) => (
              <li key={e.title.pt}>
                <p className="font-medium text-fg">{tr(e.title, lang)}</p>
                <p className="mt-0.5 text-sm text-muted">{e.school}</p>
                <p className="mt-1 font-mono text-xs text-accent">{tr(e.period, lang)}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={card}>
          {head("book", tr(ui.education.courses, lang))}
          <ul className="mt-5 space-y-4">
            {profile.courses.map((c) => (
              <li key={c.title.pt}>
                <p className="font-medium text-fg">{tr(c.title, lang)}</p>
                <p className="mt-0.5 text-sm text-muted">{c.org}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={card}>
          {head("globe", tr(ui.education.languages, lang))}
          <ul className="mt-5 space-y-4">
            {profile.languages.map((l) => (
              <li key={l.name.pt}>
                <p className="font-medium text-fg">{tr(l.name, lang)}</p>
                <p className="mt-0.5 text-sm text-muted">{tr(l.level, lang)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Contato ---------------- */
export function Contact({ lang }: { lang: Lang }) {
  const l = profile.links;
  const wa = `https://wa.me/${l.whatsapp}?text=${encodeURIComponent(tr(ui.contact.whatsappMsg, lang))}`;
  const items: { label: string; value: string; href: string; icon: ReactNode; external?: boolean; download?: boolean }[] = [
    { label: tr(ui.contact.email, lang), value: l.email, href: `mailto:${l.email}`, icon: <UiIcon name="mail" size={20} /> },
    { label: tr(ui.contact.whatsapp, lang), value: l.whatsappDisplay, href: wa, icon: <BrandIcon icon={siWhatsapp} size={20} />, external: true },
    { label: "LinkedIn", value: "alexandre-soares-leite-lopes", href: l.linkedin, icon: <UiIcon name="linkedin" size={20} />, external: true },
    { label: "GitHub", value: l.githubUser, href: l.github, icon: <BrandIcon icon={siGithub} size={20} />, external: true },
    { label: "Instagram", value: l.instagramUser, href: l.instagram, icon: <BrandIcon icon={siInstagram} size={20} />, external: true },
    { label: tr(ui.hero.downloadCv, lang), value: "PDF", href: asset(l.cv), icon: <UiIcon name="download" size={20} />, download: true },
  ];
  return (
    <Section id="contact" n="09" tag={tr(ui.nav.contact, lang)} title={tr(ui.sections.contact, lang)} lead={tr(ui.sections.contactLead, lang)}>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <li key={it.label} className="reveal">
            <a
              href={it.href}
              {...(it.external ? ext : {})}
              {...(it.download ? { download: "" } : {})}
              className="group flex h-full items-center gap-4 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-surface-2 text-accent">{it.icon}</span>
              <span className="min-w-0">
                <span className="block text-xs font-medium uppercase tracking-wider text-muted">{it.label}</span>
                <span className="mt-0.5 block text-[15px] font-medium text-fg [overflow-wrap:anywhere]">{it.value}</span>
              </span>
              <UiIcon name="arrowUpRight" size={16} className="ml-auto shrink-0 text-muted transition-colors group-hover:text-accent" />
              {it.external && <NewTab lang={lang} />}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------- Rodapé ---------------- */
export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.fullName} · {tr(profile.role, lang)}
        </p>
        <p className="text-xs">{tr(ui.footer.built, lang)}</p>
        <a href="#topo" className="inline-flex items-center gap-1 text-fg-soft hover:text-accent">
          {tr(ui.footer.top, lang)} ↑
        </a>
      </div>
    </footer>
  );
}
