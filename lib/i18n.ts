export type Lang = "pt" | "en";

/** Texto bilíngue. Edite os dois idiomas juntos. */
export type L = { pt: string; en: string };

export const tr = (v: L | string, lang: Lang): string =>
  typeof v === "string" ? v : v[lang];

/** Textos fixos da interface (títulos de seção, botões, rótulos). */
export const ui = {
  nav: {
    about: { pt: "Sobre", en: "About" },
    stack: { pt: "Stack", en: "Stack" },
    experience: { pt: "Experiência", en: "Experience" },
    projects: { pt: "Projetos", en: "Projects" },
    lab: { pt: "Laboratório", en: "Lab" },
    zenith: { pt: "Zenith Tech", en: "Zenith Tech" },
    education: { pt: "Formação", en: "Education" },
    contact: { pt: "Contato", en: "Contact" },
  },
  skip: { pt: "Pular para o conteúdo", en: "Skip to content" },
  menu: { pt: "Menu", en: "Menu" },
  closeMenu: { pt: "Fechar menu", en: "Close menu" },
  themeToLight: { pt: "Ativar tema claro", en: "Switch to light theme" },
  themeToDark: { pt: "Ativar tema escuro", en: "Switch to dark theme" },
  switchLang: { pt: "Read in English", en: "Ler em português" },
  hero: {
    seeProjects: { pt: "Ver projetos", en: "See projects" },
    downloadCv: { pt: "Baixar CV", en: "Download CV" },
    linkedin: { pt: "LinkedIn", en: "LinkedIn" },
    available: { pt: "Disponível para remoto ou híbrido", en: "Open to remote or hybrid roles" },
  },
  sections: {
    about: { pt: "Sobre mim", en: "About me" },
    stack: { pt: "Stack técnica", en: "Tech stack" },
    stackLead: {
      pt: "Ferramentas que uso no dia a dia para levar o dado da origem até a decisão.",
      en: "The tools I use daily to take data from source to decision.",
    },
    concepts: { pt: "Conceitos e práticas", en: "Concepts and practices" },
    experience: { pt: "Experiência profissional", en: "Professional experience" },
    projects: { pt: "Projetos em destaque", en: "Featured projects" },
    projectsLead: {
      pt: "Cases reais de engenharia de dados. O código é confidencial, então mostro a arquitetura, as decisões e o impacto.",
      en: "Real data engineering cases. The code is confidential, so I show the architecture, the decisions and the impact.",
    },
    lab: { pt: "Laboratório e protótipos", en: "Lab and prototypes" },
    labLead: {
      pt: "Estudos, experimentos e projetos paralelos onde testo ideias e tecnologias novas.",
      en: "Studies, experiments and side projects where I try out new ideas and technologies.",
    },
    building: { pt: "Em construção", en: "In progress" },
    zenith: { pt: "Empreendedorismo", en: "Entrepreneurship" },
    education: { pt: "Formação e capacitação", en: "Education and training" },
    contact: { pt: "Vamos conversar?", en: "Let's talk" },
    contactLead: {
      pt: "Estou aberto a oportunidades em engenharia de dados, de preferência remotas. Respondo rápido por e-mail, WhatsApp ou LinkedIn.",
      en: "I'm open to data engineering opportunities, preferably remote. I reply quickly by email, WhatsApp or LinkedIn.",
    },
  },
  project: {
    problem: { pt: "Problema", en: "Problem" },
    solution: { pt: "Solução", en: "Solution" },
    impact: { pt: "Impacto", en: "Impact" },
    stack: { pt: "Stack", en: "Stack" },
    architecture: { pt: "Arquitetura", en: "Architecture" },
    confidential: { pt: "Código confidencial · projeto corporativo", en: "Confidential code · corporate project" },
    viewCode: { pt: "Ver no GitHub", en: "View on GitHub" },
    visit: { pt: "Visitar site", en: "Visit site" },
    noRepo: { pt: "Sem repositório público", en: "No public repository" },
    inDev: { pt: "Em desenvolvimento", en: "In development" },
    erTitle: { pt: "Modelo de dados (ER)", en: "Data model (ER)" },
    scrollHint: { pt: "Arraste para o lado para ver o diagrama completo", en: "Swipe sideways to see the full diagram" },
    updated: { pt: "Atualizado em", en: "Updated" },
  },
  education: {
    degrees: { pt: "Graduação", en: "Degrees" },
    courses: { pt: "Cursos", en: "Courses" },
    languages: { pt: "Idiomas", en: "Languages" },
  },
  contact: {
    email: { pt: "E-mail", en: "Email" },
    whatsapp: { pt: "WhatsApp", en: "WhatsApp" },
    whatsappMsg: {
      pt: "Olá, Alexandre! Vi seu portfólio e gostaria de conversar.",
      en: "Hi Alexandre! I saw your portfolio and would like to talk.",
    },
  },
  footer: {
    built: {
      pt: "Feito com Next.js, TypeScript e Tailwind. Diagramas em SVG próprios.",
      en: "Built with Next.js, TypeScript and Tailwind. Diagrams are hand-made SVG.",
    },
    top: { pt: "Voltar ao topo", en: "Back to top" },
  },
} as const;
