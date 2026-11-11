/**
 * PROJETOS — edite este arquivo para adicionar/alterar projetos.
 * Os diagramas são gerados a partir de `diagram` (estágios da esquerda para a direita).
 * Tons disponíveis: source | ingest | event | bronze | silver | gold | consume
 */
import type { L } from "@/lib/i18n";
import type { TechKey } from "@/components/TechIcon";

export type Tone = "source" | "ingest" | "event" | "bronze" | "silver" | "gold" | "consume";
export type DiagramNode = { label: L | string; detail?: L | string; icon?: TechKey };
export type DiagramStage = { title: L; tone: Tone; nodes: DiagramNode[] };
export type Diagram = { stages: DiagramStage[]; top?: L; bottom?: L };

export type Project = {
  id: string;
  title: L;
  context: L;
  problem: L;
  solution: L;
  impact: L[];
  stack: string[];
  diagram: Diagram;
};

export const featured: Project[] = [
  {
    id: "telefonia-gcp",
    title: {
      pt: "Pipeline multi-cliente de dados de telefonia",
      en: "Multi-client telephony data pipeline",
    },
    context: { pt: "JobHome · GCP · orientado a eventos", en: "JobHome · GCP · event-driven" },
    problem: {
      pt: "Chamadas recebidas de várias filas de atendimento chegavam por uma API de telefonia e precisavam virar tabelas analíticas separadas por cliente, sem intervenção manual a cada novo arquivo, fila ou cliente.",
      en: "Incoming calls from several service queues arrived through a telephony API and had to become per-client analytical tables, with no manual work for each new file, queue or client.",
    },
    solution: {
      pt: "A extração em Python grava o payload bruto no Cloud Storage. O disparo é automático via Pub/Sub e Cloud Tasks: o job bronze, em Cloud Functions, recebe o caminho do arquivo (bronze_uri) como parâmetro. Um mapa fila → cliente em variável de ambiente direciona cada registro e as tabelas de cada cliente são criadas automaticamente no BigQuery. As camadas Silver e Gold padronizam e preparam o dado para consumo, e toda a infraestrutura é provisionada com Terraform.",
      en: "A Python extractor writes the raw payload to Cloud Storage. Triggering is automatic through Pub/Sub and Cloud Tasks: the bronze job, on Cloud Functions, receives the file path (bronze_uri) as a parameter. A queue → client map in an environment variable routes each record, and each client's tables are created automatically in BigQuery. Silver and Gold layers standardize and prepare the data for consumption, and all infrastructure is provisioned with Terraform.",
    },
    impact: [
      {
        pt: "Novo cliente ou fila entra por configuração, com tabela criada automaticamente.",
        en: "A new client or queue is added through configuration, with its table created automatically.",
      },
      {
        pt: "Processamento disparado por evento, sem execução manual.",
        en: "Event-triggered processing, no manual runs.",
      },
      {
        pt: "Infraestrutura reproduzível e versionada com Terraform.",
        en: "Reproducible, versioned infrastructure with Terraform.",
      },
    ],
    stack: ["Python", "Cloud Storage", "Pub/Sub", "Cloud Tasks", "Cloud Functions", "BigQuery", "Terraform"],
    diagram: {
      top: { pt: "Variável de ambiente: mapa fila → cliente", en: "Environment variable: queue → client map" },
      bottom: { pt: "Infraestrutura como código com Terraform", en: "Infrastructure as code with Terraform" },
      stages: [
        {
          title: { pt: "Fonte", en: "Source" },
          tone: "source",
          nodes: [
            { label: "API REST", detail: { pt: "plataforma de telefonia", en: "telephony platform" } },
            { label: { pt: "Filas", en: "Queues" }, detail: { pt: "chamadas recebidas", en: "incoming calls" } },
          ],
        },
        {
          title: { pt: "Ingestão", en: "Ingestion" },
          tone: "ingest",
          nodes: [
            { label: "Python", detail: { pt: "extração", en: "extraction" }, icon: "python" },
            { label: "Cloud Storage", detail: { pt: "payload bruto", en: "raw payload" }, icon: "gcs" },
          ],
        },
        {
          title: { pt: "Gatilho", en: "Trigger" },
          tone: "event",
          nodes: [
            { label: "Pub/Sub", detail: { pt: "evento", en: "event" }, icon: "pubsub" },
            { label: "Cloud Tasks", detail: { pt: "fila de execução", en: "execution queue" }, icon: "cloudtasks" },
          ],
        },
        {
          title: { pt: "Bronze", en: "Bronze" },
          tone: "bronze",
          nodes: [
            { label: "Cloud Functions", detail: "job(bronze_uri)", icon: "cloudfunctions" },
            { label: "BigQuery", detail: { pt: "tabela por cliente", en: "table per client" }, icon: "bigquery" },
          ],
        },
        {
          title: { pt: "Silver", en: "Silver" },
          tone: "silver",
          nodes: [{ label: "BigQuery", detail: { pt: "limpeza · tipos · dedup", en: "clean · types · dedup" }, icon: "bigquery" }],
        },
        {
          title: { pt: "Gold", en: "Gold" },
          tone: "gold",
          nodes: [{ label: "BigQuery", detail: { pt: "camada analítica", en: "analytics layer" }, icon: "bigquery" }],
        },
        {
          title: { pt: "Consumo", en: "Consumption" },
          tone: "consume",
          nodes: [{ label: "BI", detail: { pt: "dashboards e análises", en: "dashboards & analysis" }, icon: "chart" }],
        },
      ],
    },
  },
  {
    id: "ingestao-modular-gcp",
    title: { pt: "Framework de ingestão modular em GCP", en: "Modular ingestion framework on GCP" },
    context: { pt: "JobHome · GCP · batch e incremental", en: "JobHome · GCP · batch and incremental" },
    problem: {
      pt: "Muitas fontes (APIs REST e bancos relacionais) precisavam chegar ao BigQuery com o mesmo padrão, em cargas batch e incrementais, e com reprocessamento sob demanda por período.",
      en: "Many sources (REST APIs and relational databases) had to reach BigQuery following the same standard, in batch and incremental loads, with on-demand reprocessing by period.",
    },
    solution: {
      pt: "Estrutura genérica de ingestão: o dado bruto é gravado como payload no Cloud Storage e transformado no BigQuery a partir de metadados técnicos. Uma API parametrizada aciona pipelines por rotas específicas, com intervalo de datas e filtros customizados, em execução assíncrona. O Cloud Composer (Airflow) orquestra as cargas recorrentes e a Silver aplica limpeza, tipagem, deduplicação e controle de schema.",
      en: "A generic ingestion structure: raw data is stored as payload in Cloud Storage and transformed in BigQuery driven by technical metadata. A parameterized API triggers pipelines through specific routes, with date ranges and custom filters, running asynchronously. Cloud Composer (Airflow) orchestrates recurring loads and the Silver layer applies cleansing, typing, deduplication and schema control.",
    },
    impact: [
      {
        pt: "Menos tempo para criar novas esteiras, com um padrão reutilizável.",
        en: "Less time to create new pipelines, using a reusable pattern.",
      },
      {
        pt: "Reprocessamento por intervalo de datas e filtros, sob demanda.",
        en: "On-demand reprocessing by date range and filters.",
      },
      {
        pt: "Modelo Star Schema (fatos e dimensões) pronto para análise.",
        en: "Star Schema model (facts and dimensions) ready for analysis.",
      },
    ],
    stack: ["Python", "Cloud Composer", "Airflow", "Cloud Storage", "BigQuery", "Cloud Run", "PostgreSQL", "SQL Server"],
    diagram: {
      top: { pt: "Metadados técnicos dirigem as transformações", en: "Technical metadata drives the transformations" },
      stages: [
        {
          title: { pt: "Fontes", en: "Sources" },
          tone: "source",
          nodes: [
            { label: "APIs REST", detail: { pt: "paginação · retry", en: "paging · retry" } },
            { label: { pt: "Bancos", en: "Databases" }, detail: "Postgres · SQL Server · Oracle · MySQL", icon: "database" },
          ],
        },
        {
          title: { pt: "Execução", en: "Execution" },
          tone: "ingest",
          nodes: [
            { label: "Cloud Composer", detail: { pt: "Airflow · agenda", en: "Airflow · schedule" }, icon: "composer" },
            { label: { pt: "API parametrizada", en: "Parameterized API" }, detail: { pt: "datas · filtros · async", en: "dates · filters · async" }, icon: "python" },
          ],
        },
        {
          title: { pt: "Bronze", en: "Bronze" },
          tone: "bronze",
          nodes: [{ label: "Cloud Storage", detail: "Parquet · JSON · NDJSON", icon: "gcs" }],
        },
        {
          title: { pt: "Silver", en: "Silver" },
          tone: "silver",
          nodes: [{ label: "BigQuery", detail: { pt: "schema · tipos · dedup", en: "schema · types · dedup" }, icon: "bigquery" }],
        },
        {
          title: { pt: "Gold", en: "Gold" },
          tone: "gold",
          nodes: [{ label: "BigQuery", detail: { pt: "Star Schema", en: "Star Schema" }, icon: "bigquery" }],
        },
        {
          title: { pt: "Consumo", en: "Consumption" },
          tone: "consume",
          nodes: [{ label: "BI", detail: { pt: "análises do negócio", en: "business analytics" }, icon: "chart" }],
        },
      ],
    },
  },
  {
    id: "lakehouse-azure",
    title: { pt: "Lakehouse na Azure com Databricks", en: "Azure Lakehouse with Databricks" },
    context: { pt: "STSystem Informática · Azure · Big Data", en: "STSystem Informática · Azure · Big Data" },
    problem: {
      pt: "Grandes volumes de dados de várias fontes e eventos precisavam ser processados diariamente com rastreabilidade, qualidade e custo de nuvem sob controle.",
      en: "Large volumes from several sources and event streams had to be processed daily with lineage, quality and cloud cost under control.",
    },
    solution: {
      pt: "Lakehouse em Arquitetura Medalhão: o Data Factory orquestra as cargas, Event Hubs e Functions trazem eventos e integrações, e notebooks PySpark no Databricks fazem Bronze → Silver → Gold. Tuning com particionamento Parquet, paralelismo e ajustes de configuração; CI/CD com Azure DevOps e GitHub e monitoramento com Azure Monitor.",
      en: "A Medallion Lakehouse: Data Factory orchestrates loads, Event Hubs and Functions bring in events and integrations, and PySpark notebooks on Databricks run Bronze → Silver → Gold. Tuning through Parquet partitioning, parallelism and configuration; CI/CD with Azure DevOps and GitHub and monitoring with Azure Monitor.",
    },
    impact: [
      {
        pt: "Até 30% de redução nos custos operacionais da infraestrutura Azure.",
        en: "Up to 30% lower operating costs on the Azure infrastructure.",
      },
      {
        pt: "Cargas diárias distribuídas com alta velocidade e baixo custo.",
        en: "Fast, low-cost daily distributed loads.",
      },
      {
        pt: "Rastreabilidade do dado bruto até a camada de negócio.",
        en: "Lineage from raw data to the business layer.",
      },
    ],
    stack: ["Azure Data Factory", "Databricks", "PySpark", "Event Hubs", "Azure Functions", "Parquet", "Azure DevOps"],
    diagram: {
      bottom: { pt: "CI/CD com Azure DevOps + GitHub · monitoramento com Azure Monitor", en: "CI/CD with Azure DevOps + GitHub · monitoring with Azure Monitor" },
      stages: [
        {
          title: { pt: "Fontes", en: "Sources" },
          tone: "source",
          nodes: [
            { label: { pt: "Sistemas e bancos", en: "Systems & DBs" }, detail: "batch", icon: "database" },
            { label: "Event Hubs", detail: "streaming", icon: "eventhubs" },
          ],
        },
        {
          title: { pt: "Ingestão", en: "Ingestion" },
          tone: "ingest",
          nodes: [
            { label: "Data Factory", detail: { pt: "orquestração", en: "orchestration" }, icon: "adf" },
            { label: "Azure Functions", detail: { pt: "integrações", en: "integrations" }, icon: "azurefunctions" },
          ],
        },
        {
          title: { pt: "Bronze", en: "Bronze" },
          tone: "bronze",
          nodes: [{ label: "Databricks", detail: { pt: "dado bruto rastreável", en: "traceable raw data" }, icon: "databricks" }],
        },
        {
          title: { pt: "Silver", en: "Silver" },
          tone: "silver",
          nodes: [{ label: "PySpark", detail: { pt: "schema · Parquet particionado", en: "schema · partitioned Parquet" }, icon: "spark" }],
        },
        {
          title: { pt: "Gold", en: "Gold" },
          tone: "gold",
          nodes: [{ label: "Databricks", detail: { pt: "modelo dimensional", en: "dimensional model" }, icon: "databricks" }],
        },
        {
          title: { pt: "Consumo", en: "Consumption" },
          tone: "consume",
          nodes: [{ label: { pt: "Negócio", en: "Business" }, detail: { pt: "relatórios e decisões", en: "reports & decisions" }, icon: "chart" }],
        },
      ],
    },
  },
  {
    id: "sas-databricks",
    title: { pt: "Migração de regras de qualidade: SAS → Databricks", en: "Data quality rules migration: SAS → Databricks" },
    context: { pt: "TDW BI Consulting · Bradesco · Data Quality", en: "TDW BI Consulting · Bradesco · Data Quality" },
    problem: {
      pt: "Regras complexas de qualidade de dados rodavam em rotinas legadas no SAS e precisavam ganhar escalabilidade e performance no ecossistema moderno do banco.",
      en: "Complex data quality rules ran on legacy SAS routines and needed to gain scalability and performance on the bank's modern platform.",
    },
    solution: {
      pt: "Análise e conversão das regras do SAS para PySpark e SQL no Databricks, com validação de schema e regras de negócio aplicadas nas camadas da Arquitetura Medalhão, além de rotinas DML para corrigir anomalias e enriquecer as bases.",
      en: "Analysis and conversion of SAS rules into PySpark and SQL on Databricks, with schema validation and business rules applied across the Medallion layers, plus DML routines to fix anomalies and enrich the datasets.",
    },
    impact: [
      { pt: "Fluxos de validação mais escaláveis e performáticos.", en: "More scalable, faster validation flows." },
      { pt: "Aderência à Arquitetura Medalhão e à governança.", en: "Alignment with the Medallion Architecture and governance." },
      { pt: "Dados bancários críticos mais confiáveis para decisão.", en: "More reliable critical banking data for decisions." },
    ],
    stack: ["Databricks", "PySpark", "SQL", "Python", "SAS", "Lakehouse"],
    diagram: {
      bottom: { pt: "Correção de anomalias com DML (UPDATE / INSERT) e auditoria", en: "Anomaly fixes with DML (UPDATE / INSERT) and auditing" },
      stages: [
        {
          title: { pt: "Legado", en: "Legacy" },
          tone: "source",
          nodes: [{ label: "SAS", detail: { pt: "regras de qualidade", en: "quality rules" }, icon: "code" }],
        },
        {
          title: { pt: "Conversão", en: "Conversion" },
          tone: "ingest",
          nodes: [{ label: { pt: "Refatoração", en: "Refactoring" }, detail: "PySpark · SQL", icon: "spark" }],
        },
        {
          title: { pt: "Bronze", en: "Bronze" },
          tone: "bronze",
          nodes: [{ label: "Databricks", detail: { pt: "dado de origem", en: "source data" }, icon: "databricks" }],
        },
        {
          title: { pt: "Silver", en: "Silver" },
          tone: "silver",
          nodes: [{ label: "Databricks", detail: { pt: "schema · regras", en: "schema · rules" }, icon: "databricks" }],
        },
        {
          title: { pt: "Gold", en: "Gold" },
          tone: "gold",
          nodes: [{ label: "Databricks", detail: { pt: "bases confiáveis", en: "trusted datasets" }, icon: "databricks" }],
        },
        {
          title: { pt: "Consumo", en: "Consumption" },
          tone: "consume",
          nodes: [{ label: { pt: "Negócio", en: "Business" }, detail: { pt: "tomada de decisão", en: "decision-making" }, icon: "chart" }],
        },
      ],
    },
  },
];

/* ---------------- Laboratório / protótipos ---------------- */

export type LabItem = {
  title: L;
  description: L;
  tech: (L | string)[];
  repo?: string;
  updated?: string; // AAAA-MM
};

export const lab: LabItem[] = [
  {
    title: { pt: "Catálogo digital Kurt Griffes", en: "Kurt Griffes digital catalog" },
    description: {
      pt: "Catálogo de produtos com variações, carrinho no navegador e pedido enviado pelo WhatsApp. Painel administrativo com senha para cadastrar, editar e pesquisar produtos.",
      en: "Product catalog with variants, in-browser cart and orders sent via WhatsApp. Password-protected admin to create, edit and search products.",
    },
    tech: ["Python", "Flask", "SQLite", "Jinja2", "Pillow"],
    repo: "https://github.com/alexandresoarestech-data/kurtgriffes",
    updated: "2026-09",
  },
  {
    title: { pt: "Programação de Computadores", en: "Computer Programming" },
    description: {
      pt: "Exercícios e projetos da disciplina de Programação de Computadores do curso de Ciência da Computação.",
      en: "Exercises and projects from the Computer Programming course of my Computer Science degree.",
    },
    tech: ["Python"],
    repo: "https://github.com/alexandresoarestech-data/atividades-programacao-de-computadores",
    updated: "2026-03",
  },
  {
    title: { pt: "Agente de IA com n8n", en: "AI agent with n8n" },
    description: {
      pt: "Agente inteligente integrado via n8n, estruturado para automatizar e otimizar fluxos de trabalho com engenharia de prompt.",
      en: "An intelligent agent integrated through n8n, built to automate and optimize workflows using prompt engineering.",
    },
    tech: ["n8n", { pt: "IA", en: "AI" }, "Prompt engineering"],
  },
  {
    title: { pt: "Landing page acessível", en: "Accessible landing page" },
    description: {
      pt: "Protótipo no Figma com foco em usabilidade e navegação adaptada para pessoas com deficiência visual (alto contraste e acessibilidade).",
      en: "Figma prototype focused on usability and navigation adapted for visually impaired users (high contrast and accessibility).",
    },
    tech: ["Figma", "UX/UI", { pt: "Acessibilidade", en: "Accessibility" }],
  },
];

/* ---------------- Em construção: Eli Soares ---------------- */

export type ErColumn = { name: string; type?: string; key?: "PK" | "FK" };
export type ErTable = { id: string; name: string; note?: L; core?: boolean; col: number; row: number; columns: ErColumn[] };
export type ErRelation = { from: [string, string]; to: [string, string] };

export const building = {
  title: { pt: "Loja Eli Soares · e-commerce e gestão", en: "Eli Soares store · e-commerce and management" } as L,
  url: "https://elisoares.com",
  description: {
    pt: "Loja online de moda fitness e moda íntima feminina com painel de gestão próprio: pedidos, estoque com histórico, planilhas Excel/CSV e controle de pontos de venda em consignado. Projeto desenvolvido pela Zenith Tech.",
    en: "An online store for women's fitness and intimate apparel with its own management panel: orders, stock history, Excel/CSV spreadsheets and consignment points of sale. A Zenith Tech project.",
  } as L,
  architecture: [
    { pt: "WordPress + WooCommerce com tema próprio, versionado no GitHub", en: "WordPress + WooCommerce with a custom theme, versioned on GitHub" },
    { pt: "Plugins próprios em PHP: painel da loja, área da cliente e pagamento", en: "Custom PHP plugins: store panel, customer area and payments" },
    { pt: "InfinitePay (Pix e cartão em até 12x), com cada pagamento conferido na operadora", en: "InfinitePay (Pix and cards up to 12 installments), each payment verified with the provider" },
    { pt: "MySQL na Hostinger, com visões em português para consulta", en: "MySQL on Hostinger, with read-only views for querying" },
    { pt: "GitHub Actions: validação a cada push e deploy com backup e aprovação", en: "GitHub Actions: checks on every push, deploy with backup and approval" },
  ] as L[],
  stack: ["WordPress", "WooCommerce", "PHP", "MySQL", "InfinitePay", "Hostinger", "GitHub Actions"],
  er: {
    tables: [
      {
        id: "users", name: "wp_users", core: true, col: 0, row: 0,
        note: { pt: "contas (WordPress)", en: "accounts (WordPress)" },
        columns: [
          { name: "ID", type: "bigint", key: "PK" },
          { name: "user_email", type: "varchar" },
          { name: "display_name", type: "varchar" },
        ],
      },
      {
        id: "posts", name: "wp_posts", core: true, col: 1, row: 0,
        note: { pt: "produtos e variações", en: "products & variants" },
        columns: [
          { name: "ID", type: "bigint", key: "PK" },
          { name: "post_type", type: "varchar" },
          { name: "post_parent", type: "bigint" },
          { name: "post_title", type: "text" },
        ],
      },
      {
        id: "orders", name: "wp_wc_orders", core: true, col: 2, row: 0,
        note: { pt: "pedidos (WooCommerce)", en: "orders (WooCommerce)" },
        columns: [
          { name: "id", type: "bigint", key: "PK" },
          { name: "status", type: "varchar" },
          { name: "total_amount", type: "decimal" },
          { name: "payment_method_title", type: "text" },
        ],
      },
      {
        id: "pontos", name: "wp_loja_pontos_venda", col: 3, row: 0,
        columns: [
          { name: "id", type: "bigint", key: "PK" },
          { name: "nome", type: "varchar" },
          { name: "responsavel", type: "varchar" },
          { name: "cidade", type: "varchar" },
          { name: "comissao", type: "decimal" },
          { name: "ativo", type: "tinyint" },
        ],
      },
      {
        id: "atividades", name: "wp_loja_atividades", col: 0, row: 1,
        columns: [
          { name: "id", type: "bigint", key: "PK" },
          { name: "usuario_id", type: "bigint", key: "FK" },
          { name: "acao", type: "varchar" },
          { name: "objeto_tipo", type: "varchar" },
          { name: "objeto_id", type: "bigint" },
          { name: "descricao", type: "varchar" },
          { name: "ip", type: "varchar" },
          { name: "criado_em", type: "datetime" },
        ],
      },
      {
        id: "estoque", name: "wp_loja_estoque_historico", col: 1, row: 1,
        columns: [
          { name: "id", type: "bigint", key: "PK" },
          { name: "produto_id", type: "bigint", key: "FK" },
          { name: "pedido_id", type: "bigint", key: "FK" },
          { name: "usuario_id", type: "bigint", key: "FK" },
          { name: "quantidade", type: "int" },
          { name: "estoque_antes", type: "int" },
          { name: "estoque_depois", type: "int" },
          { name: "motivo", type: "varchar" },
          { name: "criado_em", type: "datetime" },
        ],
      },
      {
        id: "pecas", name: "wp_loja_pontos_pecas", col: 2, row: 1,
        columns: [
          { name: "id", type: "bigint", key: "PK" },
          { name: "ponto_id", type: "bigint", key: "FK" },
          { name: "acerto_id", type: "bigint", key: "FK" },
          { name: "tipo", type: "varchar" },
          { name: "descricao", type: "varchar" },
          { name: "preco", type: "decimal" },
          { name: "quantidade", type: "int" },
          { name: "data", type: "date" },
        ],
      },
      {
        id: "acertos", name: "wp_loja_pontos_acertos", col: 3, row: 1,
        columns: [
          { name: "id", type: "bigint", key: "PK" },
          { name: "ponto_id", type: "bigint", key: "FK" },
          { name: "data", type: "date" },
          { name: "pecas", type: "int" },
          { name: "total", type: "decimal" },
          { name: "comissao", type: "decimal" },
          { name: "valor_ponto", type: "decimal" },
          { name: "valor_loja", type: "decimal" },
          { name: "pago", type: "tinyint" },
        ],
      },
    ] as ErTable[],
    relations: [
      { from: ["atividades", "usuario_id"], to: ["users", "ID"] },
      { from: ["estoque", "usuario_id"], to: ["users", "ID"] },
      { from: ["estoque", "produto_id"], to: ["posts", "ID"] },
      { from: ["estoque", "pedido_id"], to: ["orders", "id"] },
      { from: ["pecas", "ponto_id"], to: ["pontos", "id"] },
      { from: ["pecas", "acerto_id"], to: ["acertos", "id"] },
      { from: ["acertos", "ponto_id"], to: ["pontos", "id"] },
    ] as ErRelation[],
    views: ["wp_ver_usuarios", "wp_ver_pedidos", "wp_ver_produtos"],
  },
};
