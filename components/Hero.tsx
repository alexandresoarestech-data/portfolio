import Image from "next/image";
import type { CSSProperties } from "react";
import portrait from "@/assets/portrait.webp";
import { profile } from "@/data/profile";
import { tr, ui, type Lang } from "@/lib/i18n";
import { asset } from "@/lib/site";
import { FlipWords } from "./Effects";
import { UiIcon } from "./icons";
import { TechIcon, techName } from "./TechIcon";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** Linhas que correm ao fundo (adaptado do "Background Paths" — kokonutd, 21st.dev, MIT). */
function BackgroundPaths() {
  const make = (pos: number) =>
    Array.from({ length: 12 }, (_, i) => {
      const o = i * 7 * pos;
      const v = i * 8;
      return {
        d: `M-${380 - o} -${189 + v}C-${380 - o} -${189 + v} -${312 - o} ${216 - v} ${152 - o} ${343 - v}C${616 - o} ${470 - v} ${684 - o} ${875 - v} ${684 - o} ${875 - v}`,
        w: 0.4 + i * 0.04,
        op: 0.05 + i * 0.021,
        dur: 16 + ((i * 7) % 13),
      };
    });
  return (
    <svg viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      {[1, -1].map((pos) =>
        make(pos).map((p, i) => (
          <path
            key={`${pos}-${i}`}
            d={p.d}
            pathLength={1}
            strokeWidth={p.w}
            strokeOpacity={p.op}
            className="bg-path"
            style={{ "--d": `${p.dur}s`, animationDelay: `-${i * 1.7}s` } as Vars}
          />
        )),
      )}
    </svg>
  );
}

/** Foto com tecnologias orbitando (inspirado no "Radial Orbital" — 21st.dev). */
function PortraitOrbit({ lang }: { lang: Lang }) {
  const { outer, inner } = profile.orbit;
  return (
    <div className="fade-up orbit relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[440px]" style={{ "--delay": "0.35s" } as Vars}>
      <div aria-hidden="true" className="absolute inset-[4%] rounded-full border border-line" />
      <div aria-hidden="true" className="absolute inset-[16%] rounded-full border border-dashed border-line" />
      <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />

      <div className="absolute inset-[27%] overflow-hidden rounded-full border border-line-strong shadow-[0_0_90px_-20px_var(--accent)]">
        <Image
          src={portrait}
          alt={lang === "pt" ? "Foto de Alexandre Soares" : "Photo of Alexandre Soares"}
          fill
          priority
          sizes="(min-width: 640px) 240px, 190px"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(200deg,transparent_45%,rgb(77_141_255/0.28))] mix-blend-screen" />
      </div>

      <div aria-hidden="true" className="orbit-spin" style={{ "--dur": "80s" } as Vars}>
        {outer.map((k, i) => (
          <div key={k} className="orbit-item" style={{ "--a": `${(i * 360) / outer.length}deg`, "--r": "46cqw" } as Vars}>
            <div className="orbit-upright border border-line bg-surface text-fg-soft shadow-[0_8px_30px_-12px_rgb(0_0_0/0.8)]" title={techName(k)}>
              <TechIcon name={k} size={20} />
            </div>
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="orbit-spin orbit-spin--rev" style={{ "--dur": "55s" } as Vars}>
        {inner.map((k, i) => (
          <div key={k} className="orbit-item" style={{ "--a": `${(i * 360) / inner.length + 45}deg`, "--r": "34cqw", "--s": "10cqw" } as Vars}>
            <div className="orbit-upright border border-line bg-surface text-fg-soft" title={techName(k)}>
              <TechIcon name={k} size={17} />
            </div>
          </div>
        ))}
      </div>

      <span className="absolute -bottom-[7%] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10.5px] tracking-[0.18em] text-muted">
        SP · 23.55°S 46.63°W
      </span>
    </div>
  );
}

export function Hero({ lang }: { lang: Lang }) {
  const pt = lang === "pt";
  return (
    <section id="topo" data-anim className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="dot-grid absolute inset-0" />
        <BackgroundPaths />
        <div className="spotlight" />
        <div className="spotlight spotlight--red" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="fade-up flex items-center gap-2.5 font-mono text-xs text-muted" style={{ "--delay": "0.05s" } as Vars}>
            <span className="relative flex size-2">
              <span className="pulse-dot absolute inset-0 rounded-full bg-ok" />
              <span className="relative size-2 rounded-full bg-ok" />
            </span>
            {pt ? "Disponível · remoto ou híbrido" : "Available · remote or hybrid"}
          </p>

          <h1 className="mt-7 text-[clamp(3.1rem,9.5vw,6.75rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-fg">
            <span className="blur-in" style={{ "--i": 0 } as Vars}>Alexandre</span>{" "}
            <span className="blur-in" style={{ "--i": 1 } as Vars}>Soares</span>
            <span className="sr-only">, </span>
            <span className="mt-5 block text-[clamp(1.7rem,4.2vw,3rem)] font-normal leading-[1.05] tracking-[-0.03em] text-fg-soft">
              <span className="blur-in" style={{ "--i": 2 } as Vars}>{pt ? "Engenheiro de" : "Data"}</span>{" "}
              <span className="blur-in font-serif text-[1.12em] italic tracking-normal text-fg" style={{ "--i": 3 } as Vars}>
                {pt ? "Dados" : "Engineer"}
              </span>
            </span>
          </h1>

          <p className="fade-up mt-8 text-lg text-fg-soft sm:text-xl" style={{ "--delay": "0.65s" } as Vars}>
            {pt ? "Pipelines e lakehouses em " : "Pipelines and lakehouses on "}
            <FlipWords words={profile.flipWords} className="font-medium text-accent" />
          </p>
          <p className="fade-up mt-4 max-w-xl leading-relaxed text-muted" style={{ "--delay": "0.75s" } as Vars}>
            {tr(profile.intro, lang)}
          </p>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-3" style={{ "--delay": "0.9s" } as Vars}>
            <a
              href="#projects"
              className="beam-border group inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              {tr(ui.hero.seeProjects, lang)}
              <UiIcon name="arrowRight" size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={asset(profile.links.cv)}
              download
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium text-fg transition-colors hover:bg-glass"
            >
              <UiIcon name="download" size={16} />
              {tr(ui.hero.downloadCv, lang)}
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-fg-soft transition-colors hover:text-fg"
            >
              <UiIcon name="linkedin" size={16} />
              LinkedIn
              <span className="sr-only">{pt ? "(abre em nova aba)" : "(opens in a new tab)"}</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <PortraitOrbit lang={lang} />
        </div>
      </div>

      <div className="fade-up mx-auto w-full max-w-6xl px-4 sm:px-6" style={{ "--delay": "1.1s" } as Vars}>
        <div className="flex items-end justify-between gap-8 border-t border-line py-6">
          <dl className="grid flex-1 gap-5 sm:grid-cols-3">
            {profile.facts.map((f) => (
              <div key={f.label.pt}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{tr(f.label, lang)}</dt>
                <dd className="mt-1.5 text-sm text-fg">{tr(f.value, lang)}</dd>
              </div>
            ))}
          </dl>
          <a href="#about" className="hidden flex-col items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted hover:text-fg lg:flex">
            {tr(ui.hero.scroll, lang)}
            <span aria-hidden="true" className="scroll-cue block h-12 w-px bg-line-strong" />
          </a>
        </div>
      </div>
    </section>
  );
}
