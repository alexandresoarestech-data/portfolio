import type { ReactNode } from "react";
import { tr, type L, type Lang } from "@/lib/i18n";
import type { Diagram, DiagramNode, Tone } from "@/data/projects";
import { TechIcon } from "./TechIcon";

/* Medidas aproximadas de texto (px por caractere) para calcular o layout no servidor. */
const LABEL_CW = 6.9; // 12px Inter 600
const DETAIL_CW = 6.3; // 10.5px JetBrains Mono
const TITLE_CW = 7.4; // 10.5px mono, caixa alta com espaçamento
const BAND_CW = 6.7; // 11px mono

const HEADER = 30;
const SP = 8; // respiro interno do estágio
const GAP_N = 8; // entre nós
const ICON = 14;

const toneVar = (t: Tone) => `var(--tone-${t})`;

/** Quebra o texto em linhas, preferindo os separadores " · ". */
export function wrap(text: string, max: number): string[] {
  const lines: string[] = [];
  let cur = "";
  for (const seg of text.split(" · ")) {
    const cand = cur ? `${cur} · ${seg}` : seg;
    if (cand.length <= max) {
      cur = cand;
      continue;
    }
    if (cur) lines.push(cur);
    if (seg.length <= max) {
      cur = seg;
      continue;
    }
    cur = "";
    for (const w of seg.split(" ")) {
      const c2 = cur ? `${cur} ${w}` : w;
      if (c2.length <= max) cur = c2;
      else {
        if (cur) lines.push(cur);
        cur = w;
      }
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

type Measured = { label: string; lines: string[]; icon?: DiagramNode["icon"]; h: number };

function nodeHeight(lines: number) {
  return lines ? 12 + 14 + lines * 13 + 8 : 12 + 14 + 8;
}

function measureNodes(nodes: DiagramNode[], innerW: number, lang: Lang): Measured[] {
  const maxChars = Math.max(10, Math.floor((innerW - 20) / DETAIL_CW));
  return nodes.map((n) => {
    const lines = n.detail ? wrap(tr(n.detail, lang), maxChars) : [];
    return { label: tr(n.label, lang), lines, icon: n.icon, h: nodeHeight(lines.length) };
  });
}

function NodeBox({ x, y, w, n }: { x: number; y: number; w: number; n: Measured }) {
  const tx = x + 10 + (n.icon ? ICON + 5 : 0);
  return (
    <g>
      <rect x={x} y={y} width={w} height={n.h} rx={8} fill="var(--surface)" stroke="var(--line)" />
      {n.icon && (
        <g transform={`translate(${x + 10} ${y + 12})`} style={{ color: "var(--fg-soft)" }}>
          <TechIcon name={n.icon} size={ICON} />
        </g>
      )}
      <text x={tx} y={y + 24} fontSize={12} fontWeight={600} className="font-sans" fill="var(--fg)">
        {n.label}
      </text>
      {n.lines.map((l, i) => (
        <text key={i} x={x + 10} y={y + 39 + i * 13} fontSize={10.5} className="font-mono" fill="var(--muted)">
          {l}
        </text>
      ))}
    </g>
  );
}

function Connector({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const vertical = x1 === x2;
  const head = vertical
    ? `${x2 - 4},${y2 - 6} ${x2},${y2} ${x2 + 4},${y2 - 6}`
    : `${x2 - 6},${y2 - 4} ${x2},${y2} ${x2 - 6},${y2 + 4}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--line-strong)" strokeWidth={1.5} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth={1.6} className="flow-line" />
      <polygon points={head} fill="var(--accent)" />
    </g>
  );
}

function Band({ x, y, w, lines }: { x: number; y: number; w: number; lines: string[] }) {
  const h = 14 + lines.length * 14;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="none" stroke="var(--line-strong)" strokeDasharray="5 5" />
      {lines.map((l, i) => (
        <text key={i} x={x + w / 2} y={y + 18 + i * 14} textAnchor="middle" fontSize={11} className="font-mono" fill="var(--fg-soft)">
          {l}
        </text>
      ))}
    </g>
  );
}

function describe(d: Diagram, lang: Lang) {
  const stages = d.stages
    .map((s) => `${tr(s.title, lang)}: ${s.nodes.map((n) => (n.detail ? `${tr(n.label, lang)} (${tr(n.detail, lang)})` : tr(n.label, lang))).join(", ")}`)
    .join(" → ");
  const extra = [d.top, d.bottom].filter(Boolean).map((b) => tr(b as L, lang));
  return [stages, ...extra].join(". ");
}

/* ---------------- Horizontal (tablet/desktop) ---------------- */
function Horizontal({ d, lang, title }: { d: Diagram; lang: Lang; title: string }) {
  const P = 12;
  const GAP = 30;
  const widths = d.stages.map((s) => {
    const nodeW = Math.max(
      ...s.nodes.map((n) => {
        const label = tr(n.label, lang).length * LABEL_CW + (n.icon ? ICON + 5 : 0);
        const detail = n.detail ? Math.min(tr(n.detail, lang).length, 22) * DETAIL_CW : 0;
        return Math.max(label, detail) + 20;
      }),
    );
    return Math.ceil(Math.max(112, nodeW + 2 * SP, tr(s.title, lang).length * TITLE_CW + 20));
  });
  const measured = d.stages.map((s, i) => measureNodes(s.nodes, widths[i] - 2 * SP, lang));
  const bodyH = Math.max(...measured.map((m) => m.reduce((a, n) => a + n.h, 0) + (m.length - 1) * GAP_N));
  const H = HEADER + bodyH + SP;
  const totalW = P * 2 + widths.reduce((a, b) => a + b, 0) + GAP * (widths.length - 1);
  const bandChars = Math.floor((totalW - 2 * P - 20) / BAND_CW);
  const top = d.top ? wrap(tr(d.top, lang), bandChars) : null;
  const bottom = d.bottom ? wrap(tr(d.bottom, lang), bandChars) : null;
  const topH = top ? 14 + top.length * 14 + 16 : 0;
  const stagesTop = P + topH;
  const bottomY = stagesTop + H + 16;
  const totalH = (bottom ? bottomY + 14 + bottom.length * 14 : stagesTop + H) + P;
  const midY = stagesTop + HEADER + bodyH / 2;

  const xs: number[] = [];
  widths.reduce((acc, w, i) => {
    xs[i] = acc;
    return acc + w + GAP;
  }, P);

  return (
    <svg
      viewBox={`0 0 ${totalW} ${totalH}`}
      role="img"
      aria-label={title}
      className="block h-auto w-full"
      style={{ minWidth: Math.round(totalW * 0.78) }}
    >
      {top && <Band x={P} y={P} w={totalW - 2 * P} lines={top} />}
      {d.stages.map((s, i) => {
        const x = xs[i];
        const w = widths[i];
        const m = measured[i];
        const groupH = m.reduce((a, n) => a + n.h, 0) + (m.length - 1) * GAP_N;
        let ny = stagesTop + HEADER + (bodyH - groupH) / 2;
        return (
          <g key={i}>
            <rect x={x} y={stagesTop} width={w} height={H} rx={12} fill="var(--surface-2)" stroke={toneVar(s.tone)} strokeOpacity={0.45} />
            <rect x={x + 14} y={stagesTop} width={w - 28} height={3} rx={1.5} fill={toneVar(s.tone)} />
            <text
              x={x + w / 2}
              y={stagesTop + 20}
              textAnchor="middle"
              fontSize={10.5}
              fontWeight={600}
              letterSpacing={1.2}
              className="font-mono"
              fill={toneVar(s.tone)}
            >
              {tr(s.title, lang).toUpperCase()}
            </text>
            {m.map((n, j) => {
              const el = <NodeBox key={j} x={x + SP} y={ny} w={w - 2 * SP} n={n} />;
              ny += n.h + GAP_N;
              return el;
            })}
            {i < d.stages.length - 1 && <Connector x1={x + w + 2} y1={midY} x2={xs[i + 1] - 2} y2={midY} />}
          </g>
        );
      })}
      {bottom && <Band x={P} y={bottomY} w={totalW - 2 * P} lines={bottom} />}
    </svg>
  );
}

/* ---------------- Vertical (celular) ---------------- */
function Vertical({ d, lang, title }: { d: Diagram; lang: Lang; title: string }) {
  const W = 340;
  const P = 10;
  const CW = W - 2 * P;
  const GAP = 28;
  const bandChars = Math.floor((CW - 20) / BAND_CW);
  const top = d.top ? wrap(tr(d.top, lang), bandChars) : null;
  const bottom = d.bottom ? wrap(tr(d.bottom, lang), bandChars) : null;

  let y = P;
  const parts: ReactNode[] = [];
  if (top) {
    parts.push(<Band key="top" x={P} y={y} w={CW} lines={top} />);
    y += 14 + top.length * 14 + 14;
  }
  d.stages.forEach((s, i) => {
    const cols = s.nodes.length === 1 ? 1 : 2;
    const nodeW = cols === 1 ? CW - 2 * SP : (CW - 2 * SP - GAP_N) / 2;
    const m = measureNodes(s.nodes, nodeW, lang);
    const rows: Measured[][] = [];
    for (let r = 0; r < m.length; r += cols) rows.push(m.slice(r, r + cols));
    const rowH = rows.map((r) => Math.max(...r.map((n) => n.h)));
    const H = HEADER + rowH.reduce((a, b) => a + b, 0) + (rows.length - 1) * GAP_N + SP;
    const y0 = y;
    let ry = y0 + HEADER;
    parts.push(
      <g key={`s${i}`}>
        <rect x={P} y={y0} width={CW} height={H} rx={12} fill="var(--surface-2)" stroke={toneVar(s.tone)} strokeOpacity={0.45} />
        <rect x={P + 14} y={y0} width={CW - 28} height={3} rx={1.5} fill={toneVar(s.tone)} />
        <text x={W / 2} y={y0 + 20} textAnchor="middle" fontSize={10.5} fontWeight={600} letterSpacing={1.2} className="font-mono" fill={toneVar(s.tone)}>
          {tr(s.title, lang).toUpperCase()}
        </text>
        {rows.map((r, ri) => {
          const g = (
            <g key={ri}>
              {r.map((n, ci) => (
                <NodeBox key={ci} x={P + SP + ci * (nodeW + GAP_N)} y={ry} w={nodeW} n={{ ...n, h: rowH[ri] }} />
              ))}
            </g>
          );
          ry += rowH[ri] + GAP_N;
          return g;
        })}
      </g>,
    );
    y += H;
    if (i < d.stages.length - 1) {
      parts.push(<Connector key={`c${i}`} x1={W / 2} y1={y + 2} x2={W / 2} y2={y + GAP - 2} />);
      y += GAP;
    }
  });
  if (bottom) {
    y += 14;
    parts.push(<Band key="bottom" x={P} y={y} w={CW} lines={bottom} />);
    y += 14 + bottom.length * 14;
  }
  const totalH = y + P;
  return (
    <svg viewBox={`0 0 ${W} ${totalH}`} role="img" aria-label={title} className="mx-auto block h-auto w-full max-w-[420px]">
      {parts}
    </svg>
  );
}

export function PipelineDiagram({ diagram, lang, name }: { diagram: Diagram; lang: Lang; name: string }) {
  const title = `${lang === "pt" ? "Diagrama de arquitetura" : "Architecture diagram"} — ${name}. ${describe(diagram, lang)}`;
  return (
    <figure className="m-0">
      <div className="scroll-x hidden pb-2 sm:block">
        <Horizontal d={diagram} lang={lang} title={title} />
      </div>
      <div className="sm:hidden">
        <Vertical d={diagram} lang={lang} title={title} />
      </div>
    </figure>
  );
}
