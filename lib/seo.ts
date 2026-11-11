import type { Metadata } from "next";
import type { Lang } from "./i18n";

const copy = {
  pt: {
    title: "Alexandre Soares · Engenheiro de Dados | GCP, BigQuery, PySpark, Databricks",
    description:
      "Engenheiro de Dados: pipelines ETL/ELT escaláveis em GCP e Azure, Arquitetura Medalhão (Bronze, Silver, Gold), BigQuery, PySpark, Databricks, Airflow e Terraform.",
    locale: "pt_BR",
    path: "/",
  },
  en: {
    title: "Alexandre Soares · Data Engineer | GCP, BigQuery, PySpark, Databricks",
    description:
      "Data Engineer: scalable ETL/ELT pipelines on GCP and Azure, Medallion Architecture (Bronze, Silver, Gold), BigQuery, PySpark, Databricks, Airflow and Terraform.",
    locale: "en_US",
    path: "/en/",
  },
} as const;

export function pageMetadata(lang: Lang): Metadata {
  const c = copy[lang];
  return {
    title: c.title,
    description: c.description,
    keywords: [
      "engenharia de dados",
      "engenheiro de dados",
      "data engineer",
      "ETL",
      "ELT",
      "pipelines de dados",
      "BigQuery",
      "PySpark",
      "Databricks",
      "GCP",
      "Google Cloud",
      "Azure Data Factory",
      "Arquitetura Medalhão",
      "Medallion Architecture",
      "Airflow",
      "Terraform",
      "Data Quality",
    ],
    alternates: {
      canonical: c.path,
      languages: { "pt-BR": "/", en: "/en/", "x-default": "/" },
    },
    openGraph: {
      type: "profile",
      firstName: "Alexandre",
      lastName: "Soares",
      url: c.path,
      siteName: "Alexandre Soares · Portfólio",
      title: c.title,
      description: c.description,
      locale: c.locale,
      alternateLocale: lang === "pt" ? ["en_US"] : ["pt_BR"],
      images: [{ url: "/og.png", width: 1200, height: 630, alt: c.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.description,
      images: ["/og.png"],
    },
  };
}
