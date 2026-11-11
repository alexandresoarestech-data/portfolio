import { tr, type Lang } from "@/lib/i18n";
import type { ErRelation, ErTable } from "@/data/projects";

const TW = 214; // largura da tabela
const GX = 52; // espaço entre colunas
const GY = 56; // espaço entre linhas
const P = 36;
const HEADER = 40;
const ROW = 20;

export function ERDiagram({
  tables,
  relations,
  views,
  lang,
}: {
  tables: ErTable[];
  relations: ErRelation[];
  views: string[];
  lang: Lang;
}) {
  const tableH = (t: ErTable) => HEADER + t.columns.length * ROW + 8;
  const nRows = Math.max(...tables.map((t) => t.row)) + 1;
  const nCols = Math.max(...tables.map((t) => t.col)) + 1;
  const rowH = Array.from({ length: nRows }, (_, r) => Math.max(...tables.filter((t) => t.row === r).map(tableH)));
  const rowY = rowH.map((_, r) => P + rowH.slice(0, r).reduce((a, b) => a + b, 0) + r * GY);
  const colX = (c: number) => P + c * (TW + GX);
  const byId = Object.fromEntries(tables.map((t) => [t.id, t]));
  const yOf = (t: ErTable, col: string) => rowY[t.row] + HEADER + t.columns.findIndex((c) => c.name === col) * ROW + ROW / 2;

  const W = P * 2 + nCols * TW + (nCols - 1) * GX;
  const diagramBottom = rowY[nRows - 1] + rowH[nRows - 1];
  const legendY = diagramBottom + 30;
  const H = legendY + 44;

  const lbl = {
    own: lang === "pt" ? "tabela própria (painel da loja)" : "custom table (store panel)",
    core: lang === "pt" ? "tabela do WordPress / WooCommerce" : "WordPress / WooCommerce table",
    views: lang === "pt" ? "Visões só de leitura:" : "Read-only views:",
    rel: "N : 1 (FK → PK)",
  };

  const summary =
    (lang === "pt" ? "Modelo de dados da loja Eli Soares. Tabelas: " : "Eli Soares store data model. Tables: ") +
    tables.map((t) => `${t.name} (${t.columns.map((c) => c.name).join(", ")})`).join("; ") +
    (lang === "pt" ? ". Relações: " : ". Relations: ") +
    relations.map((r) => `${byId[r.from[0]].name}.${r.from[1]} → ${byId[r.to[0]].name}.${r.to[1]}`).join("; ");

  return (
    <div className="scroll-x pb-2">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={summary} className="block h-auto w-full" style={{ minWidth: 760 }}>
        {/* Relações (atrás das tabelas) */}
        {relations.map((r, i) => {
          const c = byId[r.from[0]];
          const p = byId[r.to[0]];
          const yc = yOf(c, r.from[1]);
          const yp = yOf(p, r.to[1]);
          let xc: number, xp: number, oc: number, op: number;
          if (c.col === p.col) {
            xc = colX(c.col);
            xp = colX(p.col);
            oc = -1;
            op = -1;
          } else if (p.col < c.col) {
            xc = colX(c.col);
            xp = colX(p.col) + TW;
            oc = -1;
            op = 1;
          } else {
            xc = colX(c.col) + TW;
            xp = colX(p.col);
            oc = 1;
            op = -1;
          }
          const k = c.col === p.col ? 30 : 34;
          const d = `M ${xc + oc * 10} ${yc} C ${xc + oc * k} ${yc}, ${xp + op * k} ${yp}, ${xp + op * 10} ${yp}`;
          return (
            <g key={i} stroke="var(--accent)" strokeOpacity={0.75} fill="none" strokeWidth={1.4}>
              <path d={d} />
              {/* lado N (pé de galinha) */}
              <path d={`M ${xc + oc * 10} ${yc} L ${xc} ${yc - 5} M ${xc + oc * 10} ${yc} L ${xc} ${yc} M ${xc + oc * 10} ${yc} L ${xc} ${yc + 5}`} />
              {/* lado 1 */}
              <path d={`M ${xp + op * 6} ${yp - 5} L ${xp + op * 6} ${yp + 5} M ${xp + op * 10} ${yp} L ${xp} ${yp}`} />
            </g>
          );
        })}

        {/* Tabelas */}
        {tables.map((t) => {
          const x = colX(t.col);
          const y = rowY[t.row];
          const h = tableH(t);
          return (
            <g key={t.id}>
              <rect
                x={x}
                y={y}
                width={TW}
                height={h}
                rx={10}
                fill="var(--surface)"
                stroke={t.core ? "var(--line-strong)" : "var(--accent)"}
                strokeOpacity={t.core ? 1 : 0.6}
                strokeDasharray={t.core ? "5 4" : undefined}
              />
              <path
                d={`M ${x} ${y + HEADER} V ${y + 10} a 10 10 0 0 1 10 -10 H ${x + TW - 10} a 10 10 0 0 1 10 10 V ${y + HEADER} Z`}
                fill={t.core ? "var(--surface-2)" : "var(--accent)"}
                fillOpacity={t.core ? 1 : 0.1}
              />
              <text x={x + 12} y={y + 18} fontSize={11.5} fontWeight={700} className="font-mono" fill="var(--fg)">
                {t.name}
              </text>
              <text x={x + 12} y={y + 32} fontSize={10} className="font-sans" fill="var(--muted)">
                {t.note ? tr(t.note, lang) : lang === "pt" ? "painel da loja" : "store panel"}
              </text>
              <line x1={x} x2={x + TW} y1={y + HEADER} y2={y + HEADER} stroke="var(--line)" />
              {t.columns.map((c, i) => {
                const cy = y + HEADER + i * ROW + 14;
                return (
                  <g key={c.name}>
                    {c.key && (
                      <text
                        x={x + 12}
                        y={cy}
                        fontSize={8.5}
                        fontWeight={700}
                        className="font-mono"
                        fill={c.key === "PK" ? "var(--tone-gold)" : "var(--accent)"}
                      >
                        {c.key}
                      </text>
                    )}
                    <text x={x + 32} y={cy} fontSize={10.5} className="font-mono" fill={c.key === "FK" ? "var(--accent)" : "var(--fg-soft)"}>
                      {c.name}
                    </text>
                    {c.type && (
                      <text x={x + TW - 12} y={cy} textAnchor="end" fontSize={9.5} className="font-mono" fill="var(--muted)">
                        {c.type}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Legenda */}
        <g className="font-sans" fontSize={11} fill="var(--muted)">
          <rect x={P} y={legendY - 9} width={18} height={12} rx={3} fill="var(--accent)" fillOpacity={0.12} stroke="var(--accent)" strokeOpacity={0.6} />
          <text x={P + 26} y={legendY + 1}>{lbl.own}</text>
          <rect x={P + 250} y={legendY - 9} width={18} height={12} rx={3} fill="var(--surface-2)" stroke="var(--line-strong)" strokeDasharray="4 3" />
          <text x={P + 276} y={legendY + 1}>{lbl.core}</text>
          <path d={`M ${P + 530} ${legendY - 3} h 30 M ${P + 530} ${legendY - 3} l -8 -5 M ${P + 530} ${legendY - 3} l -8 5 M ${P + 556} ${legendY - 8} v 10`} stroke="var(--accent)" fill="none" strokeWidth={1.4} />
          <text x={P + 568} y={legendY + 1}>{lbl.rel}</text>
          <text x={P} y={legendY + 26} className="font-mono" fontSize={10.5}>
            <tspan fill="var(--fg-soft)">{lbl.views}</tspan> {views.join(" · ")}
          </text>
        </g>
      </svg>
    </div>
  );
}
