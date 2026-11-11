import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { "pt-BR": `${siteUrl}/`, en: `${siteUrl}/en/` };
  const lastModified = new Date();
  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${siteUrl}/en/`, lastModified, changeFrequency: "monthly", priority: 0.8, alternates: { languages } },
  ];
}
