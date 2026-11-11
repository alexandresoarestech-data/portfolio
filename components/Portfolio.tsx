import { profile } from "@/data/profile";
import { tr, type Lang } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { Hero } from "./Hero";
import { About, Building, Contact, Education, Experience, Footer, Lab, Projects, Stack, Zenith } from "./Sections";
import { SiteHeader } from "./SiteHeader";
import { TechIconSprite } from "./TechIcon";

function JsonLd({ lang }: { lang: Lang }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.name,
    jobTitle: tr(profile.role, lang),
    description: tr(profile.tagline, lang),
    url: lang === "pt" ? `${siteUrl}/` : `${siteUrl}/en/`,
    image: `${siteUrl}/og.png`,
    email: `mailto:${profile.links.email}`,
    address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressRegion: "SP", addressCountry: "BR" },
    worksFor: { "@type": "Organization", name: "TDW BI Consulting" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade Cruzeiro do Sul" },
    knowsLanguage: ["pt-BR", "en", "es"],
    knowsAbout: [
      "Data Engineering",
      "ETL",
      "ELT",
      "Data Pipelines",
      "Google Cloud Platform",
      "BigQuery",
      "PySpark",
      "Apache Spark",
      "Databricks",
      "Azure Data Factory",
      "Apache Airflow",
      "Terraform",
      "Medallion Architecture",
      "Lakehouse",
      "Data Quality",
      "SQL",
      "Python",
    ],
    sameAs: [profile.links.linkedin, profile.links.github, profile.links.instagram],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function Portfolio({ lang }: { lang: Lang }) {
  return (
    <div lang={lang === "en" ? "en" : undefined} className="flex min-h-full flex-col">
      <TechIconSprite />
      <SiteHeader lang={lang} />
      <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
        <Hero lang={lang} />
        <About lang={lang} />
        <Stack lang={lang} />
        <Experience lang={lang} />
        <Projects lang={lang} />
        <Lab lang={lang} />
        <Building lang={lang} />
        <Zenith lang={lang} />
        <Education lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      <JsonLd lang={lang} />
    </div>
  );
}
