/** Configuração do site. A URL principal vem da variável NEXT_PUBLIC_SITE_URL (definida no deploy). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://alexandresoares.vercel.app").replace(/\/$/, "");

/** Prefixo usado no GitHub Pages (ex.: "/portfolio"). Vazio no Vercel. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Caminho para arquivos de /public respeitando o basePath. */
export const asset = (path: string) => `${basePath}${path}`;
