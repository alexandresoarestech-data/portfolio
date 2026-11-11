/**
 * PERFIL — edite este arquivo para atualizar o portfólio.
 * Todo texto visível tem versão { pt, en }. Ao mudar um, mude o outro.
 * Depois: git add . && git commit -m "Atualiza perfil" && git push  → o site publica sozinho.
 */
import type { L } from "@/lib/i18n";
import type { TechKey } from "@/components/TechIcon";

export const profile = {
  name: "Alexandre Soares",
  fullName: "Alexandre Soares Leite Lopes",
  role: { pt: "Engenheiro de Dados", en: "Data Engineer" } as L,
  tagline: {
    pt: "Transformo dados brutos em decisões confiáveis com pipelines escaláveis em GCP, Azure e Databricks.",
    en: "I turn raw data into reliable decisions with scalable pipelines on GCP, Azure and Databricks.",
  } as L,
  location: { pt: "São Paulo, SP · Brasil", en: "São Paulo, Brazil" } as L,

  /** Números que aparecem no topo. Só fatos do currículo. */
  highlights: [
    { value: "Desde 2022", valueEn: "Since 2022", label: { pt: "atuando com dados", en: "working with data" } },
    { value: "GCP + Azure", label: { pt: "duas nuvens em produção", en: "two clouds in production" } },
    { value: "até 30%", valueEn: "up to 30%", label: { pt: "menos custo de nuvem após tuning", en: "lower cloud cost after tuning" } },
    { value: "Medallion", label: { pt: "Bronze · Silver · Gold", en: "Bronze · Silver · Gold" } },
  ] as { value: string; valueEn?: string; label: L }[],

  links: {
    email: "alexandre2006sll@gmail.com",
    whatsapp: "5511919877629", // só dígitos, com DDI 55
    whatsappDisplay: "(11) 91987-7629",
    linkedin: "https://www.linkedin.com/in/alexandre-soares-leite-lopes-8ba796280/",
    github: "https://github.com/alexandresoarestech-data",
    githubUser: "alexandresoarestech-data",
    instagram: "https://www.instagram.com/alexandretechdata/",
    instagramUser: "@alexandretechdata",
    cv: "/cv/Alexandre-Soares-CV-Engenheiro-de-Dados.pdf",
  },

  about: {
    pt: "Engenheiro de dados com atuação desde 2022 no ciclo completo da informação: da ingestão e arquitetura até a entrega de valor para o negócio. Construo pipelines ETL/ELT em GCP e Azure, estruturo Data Lakes e Lakehouses na Arquitetura Medalhão e processo grandes volumes com PySpark e Databricks. Hoje atuo em Data Quality no setor financeiro e, pela Zenith Tech, entrego soluções de dados, cloud e sistemas para empresas.",
    en: "Data engineer working since 2022 across the full data lifecycle: from ingestion and architecture to delivering business value. I build ETL/ELT pipelines on GCP and Azure, structure Data Lakes and Lakehouses with the Medallion Architecture and process large volumes with PySpark and Databricks. Today I work on Data Quality in the financial sector and, through Zenith Tech, deliver data, cloud and software solutions to companies.",
  } as L,

  /** Os quatro pilares (texto do seu post "Minha Base"). */
  pillars: [
    {
      title: { pt: "Minha base", en: "My foundation" },
      text: {
        pt: "Sou engenheiro e arquiteto de dados, com foco em planejamento, estruturação de soluções e desenvolvimento de sistemas que geram resultado real para o negócio.",
        en: "I'm a data engineer and architect focused on planning, solution design and building systems that deliver real business results.",
      },
    },
    {
      title: { pt: "Especialidade", en: "Specialty" },
      text: {
        pt: "Transformar dados em estratégia, construir arquiteturas eficientes e criar soluções que apoiam decisões mais inteligentes e escaláveis.",
        en: "Turning data into strategy, building efficient architectures and creating solutions that support smarter, scalable decisions.",
      },
    },
    {
      title: { pt: "Rotina", en: "Routine" },
      text: {
        pt: "Equilibro planejamento de demandas, modelagem de dados e desenvolvimento de sistemas, sempre buscando eficiência, organização e inovação.",
        en: "I balance demand planning, data modeling and software development, always seeking efficiency, organization and innovation.",
      },
    },
    {
      title: { pt: "Missão", en: "Mission" },
      text: {
        pt: "Usar tecnologia, visão analítica e pensamento estratégico para transformar desafios em soluções sólidas, com clareza e precisão.",
        en: "Using technology, analytical vision and strategic thinking to turn challenges into solid solutions, with clarity and precision.",
      },
    },
  ] as { title: L; text: L }[],

  stack: [
    { group: { pt: "Linguagens", en: "Languages" }, items: ["python", "sql", "pyspark"] },
    {
      group: { pt: "Google Cloud", en: "Google Cloud" },
      items: ["bigquery", "gcs", "pubsub", "cloudfunctions", "cloudtasks", "cloudrun", "dataflow", "cloudsql"],
    },
    {
      group: { pt: "Microsoft Azure", en: "Microsoft Azure" },
      items: ["adf", "eventhubs", "azurefunctions", "azuremonitor"],
    },
    { group: { pt: "Processamento", en: "Processing" }, items: ["spark", "databricks", "pandas", "parquet"] },
    { group: { pt: "Orquestração e IaC", en: "Orchestration & IaC" }, items: ["airflow", "composer", "terraform", "n8n"] },
    { group: { pt: "Bancos de dados", en: "Databases" }, items: ["postgresql", "sqlserver", "oracle", "mysql"] },
    { group: { pt: "Analytics", en: "Analytics" }, items: ["powerbi", "starschema"] },
    { group: { pt: "DevOps", en: "DevOps" }, items: ["git", "github", "azuredevops", "githubactions"] },
  ] as { group: L; items: TechKey[] }[],

  concepts: [
    "ETL / ELT",
    { pt: "Arquitetura Medalhão", en: "Medallion Architecture" },
    "Data Lake",
    "Lakehouse",
    "Data Warehouse",
    "Star Schema",
    "Data Quality",
    { pt: "Governança de dados", en: "Data governance" },
    { pt: "Cargas incrementais", en: "Incremental loads" },
    { pt: "Batch e streaming", en: "Batch & streaming" },
    "APIs REST",
    { pt: "Tuning de queries", en: "Query tuning" },
    { pt: "Particionamento", en: "Partitioning" },
    { pt: "Controle de schema", en: "Schema control" },
    { pt: "Observabilidade", en: "Observability" },
    "CI/CD · DataOps",
  ] as (L | string)[],

  experience: [
    {
      role: { pt: "Engenheiro de Dados Jr", en: "Junior Data Engineer" },
      company: "TDW BI Consulting (Grupo Synoro)",
      client: { pt: "Alocado no Bradesco", en: "Allocated at Bradesco" },
      period: { pt: "ago/2026 — atual", en: "Aug 2026 — present" },
      place: { pt: "São Paulo, SP · Híbrido", en: "São Paulo · Hybrid" },
      current: true,
      summary: {
        pt: "Time de Data Quality: integridade, consistência e confiabilidade de dados bancários críticos para a tomada de decisão.",
        en: "Data Quality team: integrity, consistency and reliability of critical banking data used for decision-making.",
      },
      bullets: [
        {
          pt: "Executo rotinas diárias no Databricks de exploração, higienização e correção de dados com DML avançado (SELECT, UPDATE, INSERT).",
          en: "Run daily Databricks routines for data exploration, cleansing and correction with advanced DML (SELECT, UPDATE, INSERT).",
        },
        {
          pt: "Construo e monitoro pipelines de qualidade com PySpark, Python e SQL, aplicando regras de negócio, validação de schema e governança.",
          en: "Build and monitor data quality pipelines with PySpark, Python and SQL, enforcing business rules, schema validation and governance.",
        },
        {
          pt: "Migro regras legadas de qualidade do SAS para o Databricks, ganhando escalabilidade e aderência à Arquitetura Medalhão.",
          en: "Migrate legacy data quality rules from SAS to Databricks, gaining scalability and Medallion Architecture alignment.",
        },
        {
          pt: "Apoio auditorias e a rastreabilidade do dado nas camadas Bronze, Silver e Gold do Lakehouse.",
          en: "Support audits and data lineage across the Lakehouse Bronze, Silver and Gold layers.",
        },
      ],
      tags: ["Databricks", "PySpark", "Python", "SQL", "SAS", "Data Quality"],
    },
    {
      role: { pt: "Engenheiro de Dados GCP Pleno", en: "Mid-level GCP Data Engineer" },
      company: "JobHome",
      period: { pt: "set/2025 — ago/2026", en: "Sep 2025 — Aug 2026" },
      place: { pt: "São Paulo, SP · Híbrido", en: "São Paulo · Hybrid" },
      bullets: [
        {
          pt: "Desenvolvi pipelines orquestrados no Cloud Composer (Airflow), com alta disponibilidade e observabilidade dos fluxos.",
          en: "Developed pipelines orchestrated with Cloud Composer (Airflow), with high availability and flow observability.",
        },
        {
          pt: "Construí extrações modulares em Python para APIs REST, com paginação, filtros dinâmicos, tratamento de erros e retry automático.",
          en: "Built modular Python extractors for REST APIs with pagination, dynamic filters, error handling and automatic retries.",
        },
        {
          pt: "Implementei pipeline orientado a eventos (Pub/Sub, Cloud Tasks e Cloud Functions) que cria tabelas por cliente no BigQuery automaticamente, com infraestrutura em Terraform.",
          en: "Implemented an event-driven pipeline (Pub/Sub, Cloud Tasks and Cloud Functions) that automatically creates per-client BigQuery tables, with Terraform infrastructure.",
        },
        {
          pt: "Organizei o ciclo do dado na Arquitetura Medalhão: Cloud Storage (Parquet, JSON, NDJSON) e camada analítica no BigQuery.",
          en: "Organized the data lifecycle with the Medallion Architecture: Cloud Storage (Parquet, JSON, NDJSON) and an analytical layer on BigQuery.",
        },
        {
          pt: "Modelei tabelas Fato e Dimensão (Star Schema) a partir de PostgreSQL, SQL Server, Oracle e MySQL.",
          en: "Modeled Fact and Dimension tables (Star Schema) from PostgreSQL, SQL Server, Oracle and MySQL.",
        },
      ],
      tags: ["GCP", "BigQuery", "Cloud Storage", "Pub/Sub", "Cloud Composer", "Terraform", "Python"],
    },
    {
      role: { pt: "Engenheiro de Dados Azure", en: "Azure Data Engineer" },
      company: "STSystem Informática",
      period: { pt: "mai/2024 — set/2025", en: "May 2024 — Sep 2025" },
      place: { pt: "Guarulhos, SP · Híbrido", en: "Guarulhos, Brazil · Hybrid" },
      bullets: [
        {
          pt: "Orquestrei pipelines ETL/ELT com Azure Data Factory e Azure Databricks para grandes volumes de dados.",
          en: "Orchestrated ETL/ELT pipelines with Azure Data Factory and Azure Databricks for large data volumes.",
        },
        {
          pt: "Otimizei processamento PySpark com particionamento Parquet, paralelismo e tuning, reduzindo em até 30% os custos operacionais na Azure.",
          en: "Optimized PySpark processing with Parquet partitioning, parallelism and tuning, cutting Azure operating costs by up to 30%.",
        },
        {
          pt: "Implementei Lakehouse na Arquitetura Medalhão: rastreabilidade (Bronze), schema e padronização (Silver) e modelagem dimensional (Gold).",
          en: "Implemented a Medallion Lakehouse: lineage (Bronze), schema and standardization (Silver) and dimensional modeling (Gold).",
        },
        {
          pt: "Construí ingestão de eventos e integrações com Azure Event Hubs e Azure Functions.",
          en: "Built event ingestion and integrations with Azure Event Hubs and Azure Functions.",
        },
        {
          pt: "Implantei CI/CD, versionamento e monitoramento com Azure DevOps, GitHub e Azure Monitor.",
          en: "Set up CI/CD, versioning and monitoring with Azure DevOps, GitHub and Azure Monitor.",
        },
      ],
      tags: ["Azure Data Factory", "Databricks", "PySpark", "Event Hubs", "Azure DevOps"],
    },
    {
      role: { pt: "Analista de Dados", en: "Data Analyst" },
      company: "STSystem Informática",
      period: { pt: "mai/2023 — mai/2024", en: "May 2023 — May 2024" },
      place: { pt: "Guarulhos, SP · Híbrido", en: "Guarulhos, Brazil · Hybrid" },
      bullets: [
        {
          pt: "Levantei requisitos com Financeiro, Comercial e Operações para definir KPIs e traduzir problemas de negócio em soluções de dados.",
          en: "Gathered requirements with Finance, Sales and Operations to define KPIs and turn business problems into data solutions.",
        },
        {
          pt: "Refatorei consultas SQL e integrações, melhorando em até 40% a performance de relatórios críticos.",
          en: "Refactored SQL queries and integrations, improving critical report performance by up to 40%.",
        },
        {
          pt: "Desenvolvi dashboards executivos no Power BI (DAX) sobre bases com modelagem dimensional (Star Schema).",
          en: "Developed executive Power BI dashboards (DAX) on top of dimensional models (Star Schema).",
        },
        {
          pt: "Construí fluxos ETL/ELT com Azure Data Factory, SSIS e Python.",
          en: "Built ETL/ELT flows with Azure Data Factory, SSIS and Python.",
        },
      ],
      tags: ["SQL Server", "Oracle", "Power BI", "SSIS", "Python"],
    },
    {
      role: { pt: "Estagiário em Dados", en: "Data Intern" },
      company: "STSystem Informática",
      period: { pt: "dez/2022 — mai/2023", en: "Dec 2022 — May 2023" },
      place: { pt: "Guarulhos, SP · Híbrido", en: "Guarulhos, Brazil · Hybrid" },
      bullets: [
        {
          pt: "Automatizei coleta, limpeza e validação de dados operacionais com Python e SQL.",
          en: "Automated collection, cleansing and validation of operational data with Python and SQL.",
        },
        {
          pt: "Criei e mantive relatórios em Power BI e Excel para as demandas diárias das equipes.",
          en: "Created and maintained Power BI and Excel reports for the teams' daily needs.",
        },
        {
          pt: "Documentei processos de dados e apoiei rotinas de qualidade e governança.",
          en: "Documented data processes and supported quality and governance routines.",
        },
      ],
      tags: ["Python", "SQL", "Power BI", "Excel"],
    },
  ] as {
    role: L;
    company: string;
    client?: L;
    period: L;
    place: L;
    current?: boolean;
    summary?: L;
    bullets: L[];
    tags: string[];
  }[],

  education: [
    {
      title: { pt: "Bacharelado em Ciência da Computação", en: "B.Sc. in Computer Science" },
      school: "Universidade Cruzeiro do Sul",
      period: { pt: "2026 — 2030 (previsão)", en: "2026 — 2030 (expected)" },
    },
    {
      title: { pt: "Análise e Desenvolvimento de Sistemas", en: "Systems Analysis and Development" },
      school: "Universidade Cruzeiro do Sul",
      period: { pt: "2025 · 2 semestres concluídos", en: "2025 · 2 semesters completed" },
    },
  ] as { title: L; school: string; period: L }[],

  courses: [
    { title: { pt: "Google Cloud Platform (GCP)", en: "Google Cloud Platform (GCP)" }, org: "Udemy" },
    { title: { pt: "Python do básico ao avançado", en: "Python from beginner to advanced" }, org: "Udemy" },
    { title: { pt: "SQL completo e Banco de Dados Oracle", en: "Complete SQL and Oracle Database" }, org: "STSystem Informática" },
    { title: { pt: "Formação Analista de Dados", en: "Data Analyst Program" }, org: "STSystem Informática" },
  ] as { title: L; org: string }[],

  languages: [
    { name: { pt: "Português", en: "Portuguese" }, level: { pt: "Nativo", en: "Native" } },
    { name: { pt: "Inglês", en: "English" }, level: { pt: "Intermediário técnico (leitura e escrita)", en: "Intermediate, technical (reading and writing)" } },
    { name: { pt: "Espanhol", en: "Spanish" }, level: { pt: "Intermediário técnico (leitura e escrita)", en: "Intermediate, technical (reading and writing)" } },
  ] as { name: L; level: L }[],

  zenith: {
    name: "Zenith Tech Company",
    role: { pt: "Fundador & CEO", en: "Founder & CEO" } as L,
    instagram: "https://www.instagram.com/zenith_techcompany/",
    instagramUser: "@zenith_techcompany",
    tagline: {
      pt: "Tecnologia, estratégia e inovação para empresas que querem crescer.",
      en: "Technology, strategy and innovation for companies that want to grow.",
    } as L,
    text: {
      pt: "Consultoria especializada em transformar desafios empresariais em soluções tecnológicas inteligentes. Mais do que desenvolver software, construímos a base tecnológica que sustenta o crescimento dos nossos clientes. Como fundador, respondo pela estratégia, arquitetura de soluções, engenharia de dados e transformação digital.",
      en: "A consultancy that turns business challenges into smart technology solutions. More than building software, we build the technology foundation that sustains our clients' growth. As founder, I lead strategy, solution architecture, data engineering and digital transformation.",
    } as L,
    services: [
      {
        title: { pt: "Engenharia de Dados", en: "Data Engineering" },
        text: {
          pt: "Pipelines, integrações e arquitetura de informação para a tomada de decisão.",
          en: "Pipelines, integrations and information architecture for decision-making.",
        },
      },
      {
        title: { pt: "Infraestrutura Cloud", en: "Cloud Infrastructure" },
        text: {
          pt: "Infraestruturas escaláveis em nuvem, com foco em desempenho, segurança e disponibilidade.",
          en: "Scalable cloud infrastructure focused on performance, security and availability.",
        },
      },
      {
        title: { pt: "Desenvolvimento de Sistemas", en: "Software Development" },
        text: {
          pt: "Plataformas, sistemas corporativos e soluções sob medida para empresas.",
          en: "Platforms, enterprise systems and tailor-made solutions for companies.",
        },
      },
      {
        title: { pt: "Automação e IA", en: "Automation & AI" },
        text: {
          pt: "Otimização de processos com integrações e tecnologias inteligentes.",
          en: "Process optimization through integrations and intelligent technologies.",
        },
      },
      {
        title: { pt: "Sites e E-commerce", en: "Websites & E-commerce" },
        text: {
          pt: "Criação de sites e lojas virtuais prontas para vender.",
          en: "Websites and online stores built to sell.",
        },
      },
      {
        title: { pt: "Integrações Corporativas", en: "Enterprise Integrations" },
        text: {
          pt: "Conexão entre sistemas, APIs e dados para operações mais eficientes.",
          en: "Connecting systems, APIs and data for more efficient operations.",
        },
      },
    ] as { title: L; text: L }[],
  },
};
