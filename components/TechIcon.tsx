import {
  siApacheairflow,
  siApacheparquet,
  siApachespark,
  siDatabricks,
  siFigma,
  siGit,
  siGithub,
  siGithubactions,
  siGooglebigquery,
  siGooglecloud,
  siGooglecloudcomposer,
  siGooglecloudstorage,
  siGoogledataflow,
  siGooglepubsub,
  siMysql,
  siN8n,
  siPandas,
  siPostgresql,
  siPython,
  siTerraform,
} from "simple-icons";

/**
 * Ícones de tecnologia (somente servidor).
 * Marcas: simple-icons (CC0). Marcas que não estão na biblioteca (Microsoft, Oracle)
 * usam glifos genéricos desenhados aqui, na cor da marca.
 * Cada ícone é definido uma vez no <TechIconSprite/> e reutilizado com <use>.
 */
type Glyph =
  | "cloud" | "database" | "chart" | "code" | "queue" | "function"
  | "bolt" | "flow" | "pulse" | "star" | "loop" | "run";

const glyphs: Record<Glyph, string> = {
  cloud: "M7 18.5h10.2a4.3 4.3 0 0 0 .6-8.55A6.2 6.2 0 0 0 5.9 9.4 4.6 4.6 0 0 0 7 18.5Z",
  database:
    "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  chart: "M4 20V11M10 20V5M16 20v-6M21 20H3",
  code: "m8.5 7-5 5 5 5M15.5 7l5 5-5 5",
  queue: "M4 6h16M4 12h16M4 18h9",
  function: "M15 4h-1.5A3.5 3.5 0 0 0 10 7.5v9A3.5 3.5 0 0 1 6.5 20H5M7 11h7",
  bolt: "M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z",
  flow: "M3 5h6v5H3zM15 14h6v5h-6zM9 7.5h2.5a2 2 0 0 1 2 2v5a2 2 0 0 0 1.5 1.94",
  pulse: "M3 12h4l2.5-6 5 12 2.5-6h4",
  star: "m12 3.5 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L12 3.5Z",
  loop: "m17 3 3 3-3 3M4 11V9.5A3.5 3.5 0 0 1 7.5 6H20M7 21l-3-3 3-3M20 13v1.5a3.5 3.5 0 0 1-3.5 3.5H4",
  run: "m5 5 7 7-7 7M12 5l7 7-7 7",
};

type SI = { path: string; hex: string };
type Def = { name: string; si?: SI; glyph?: Glyph; brand?: string };

const AZURE = "#0078D4";
const GCP = "#4285F4";

const defs = {
  python: { name: "Python", si: siPython },
  sql: { name: "SQL", glyph: "database" },
  pyspark: { name: "PySpark", si: siApachespark },
  bigquery: { name: "BigQuery", si: siGooglebigquery },
  gcs: { name: "Cloud Storage", si: siGooglecloudstorage },
  pubsub: { name: "Pub/Sub", si: siGooglepubsub },
  cloudfunctions: { name: "Cloud Functions", glyph: "function", brand: GCP },
  cloudtasks: { name: "Cloud Tasks", glyph: "queue", brand: GCP },
  cloudrun: { name: "Cloud Run", glyph: "run", brand: GCP },
  dataflow: { name: "Dataflow", si: siGoogledataflow },
  cloudsql: { name: "Cloud SQL", glyph: "database", brand: GCP },
  composer: { name: "Cloud Composer", si: siGooglecloudcomposer },
  googlecloud: { name: "Google Cloud", si: siGooglecloud },
  adf: { name: "Azure Data Factory", glyph: "flow", brand: AZURE },
  eventhubs: { name: "Event Hubs", glyph: "bolt", brand: AZURE },
  azurefunctions: { name: "Azure Functions", glyph: "function", brand: AZURE },
  azuremonitor: { name: "Azure Monitor", glyph: "pulse", brand: AZURE },
  spark: { name: "Apache Spark", si: siApachespark },
  databricks: { name: "Databricks", si: siDatabricks },
  pandas: { name: "Pandas", si: siPandas, brand: "#E70488" },
  parquet: { name: "Parquet", si: siApacheparquet },
  airflow: { name: "Apache Airflow", si: siApacheairflow },
  terraform: { name: "Terraform", si: siTerraform },
  n8n: { name: "n8n", si: siN8n },
  postgresql: { name: "PostgreSQL", si: siPostgresql },
  sqlserver: { name: "SQL Server", glyph: "database", brand: "#CC2927" },
  oracle: { name: "Oracle", glyph: "database", brand: "#F80000" },
  mysql: { name: "MySQL", si: siMysql },
  powerbi: { name: "Power BI", glyph: "chart", brand: "#E8B400" },
  starschema: { name: "Star Schema", glyph: "star" },
  git: { name: "Git", si: siGit },
  github: { name: "GitHub", si: siGithub, brand: "" },
  azuredevops: { name: "Azure DevOps", glyph: "loop", brand: AZURE },
  githubactions: { name: "GitHub Actions", si: siGithubactions },
  figma: { name: "Figma", si: siFigma },
  chart: { name: "BI", glyph: "chart" },
  database: { name: "Database", glyph: "database" },
  code: { name: "Code", glyph: "code" },
} satisfies Record<string, Def>;

export type TechKey = keyof typeof defs;

export function techName(key: TechKey) {
  return defs[key].name;
}

/** Cor de marca (undefined = usa a cor do texto). Marcas escuras ficam na cor do texto. */
export function techBrand(key: TechKey): string | undefined {
  const d = defs[key] as Def;
  if (d.brand !== undefined) return d.brand || undefined;
  if (d.si) return `#${d.si.hex}`;
  return undefined;
}

/** Definições de todos os ícones de tecnologia. Renderize uma vez por página. */
export function TechIconSprite() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <defs>
        {Object.entries(defs).map(([key, value]) => {
          const d = value as Def;
          return (
            <symbol key={key} id={`ti-${key}`} viewBox="0 0 24 24">
              {d.si ? (
                <path d={d.si.path} fill="currentColor" />
              ) : (
                <path
                  d={glyphs[d.glyph ?? "code"]}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </symbol>
          );
        })}
      </defs>
    </svg>
  );
}

export function TechIcon({
  name,
  size = 20,
  className,
  colored = false,
}: {
  name: TechKey;
  size?: number;
  className?: string;
  colored?: boolean;
}) {
  const color = colored ? techBrand(name) : undefined;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      style={color ? { color } : undefined}
    >
      <use href={`#ti-${name}`} />
    </svg>
  );
}

/** Marcas sociais (simple-icons). */
export { siGithub, siInstagram, siWhatsapp } from "simple-icons";

export function BrandIcon({ icon, size = 18, className }: { icon: SI; size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" focusable="false" fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}
