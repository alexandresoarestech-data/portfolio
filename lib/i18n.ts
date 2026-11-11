export type Lang = "pt" | "en";

/** Texto bilíngue. Edite os dois idiomas juntos. */
export type L = { pt: string; en: string };

export const tr = (v: L | string, lang: Lang): string =>
  typeof v === "string" ? v : v[lang];

/**
 * Textos fixos da interface.
 * Nos títulos, a parte entre *asteriscos* aparece em serifa itálica.
 */
export const ui = {
  nav: {
    about: { pt: "Sobre", en: "About" },
    stack: { pt: "Stack", en: "Stack" },
    experience: { pt: "Experiência", en: "Experience" },
    projects: { pt: "Projetos", en: "Work" },
    lab: { pt: "Laboratório", en: "Lab" },
    building: { pt: "Em construção", en: "In progress" },
    zenith: { pt: "Zenith Tech", en: "Zenith Tech" },
    education: { pt: "Formação", en: "Education" },
    contact: { pt: "Contato", en: "Contact" },
  },
  skip: { pt: "Pular para o conteúdo", en: "Skip to content" },
  menu: { pt: "Abrir menu", en: "Open menu" },
  closeMenu: { pt: "Fechar menu", en: "Close menu" },
  switchLang: { pt: "Read in English", en: "Ler em português" },
  hero: {
    seeProjects: { pt: "Ver projetos", en: "See my work" },
    downloadCv: { pt: "Baixar CV", en: "Download CV" },
    linkedin: { pt: "LinkedIn", en: "LinkedIn" },
    scroll: { pt: "Explorar", en: "Explore" },
  },
  headings: {
    about: { pt: "Engenharia de dados com *resultado* para o negócio.", en: "Data engineering with *real* business results." },
    stack: { pt: "Ferramentas do *dia a dia*.", en: "Everyday *tools*." },
    experience: { pt: "Trajetória *em dados*.", en: "A path *in data*." },
    projects: { pt: "Trabalho *selecionado*.", en: "Selected *work*." },
    lab: { pt: "Experimentos e *projetos paralelos*.", en: "Experiments and *side projects*." },
    building: { pt: "Em *desenvolvimento*.", en: "In *development*." },
    zenith: { pt: "Minha *consultoria*.", en: "My *consultancy*." },
    education: { pt: "Formação e *estudo contínuo*.", en: "Education and *continuous learning*." },
    contact: { pt: "Vamos *conversar*.", en: "Let's *talk*." },
  },
  leads: {
    stack: {
      pt: "O que uso para levar o dado da origem até quem decide.",
      en: "What I use to take data from the source to the people who decide.",
    },
    projects: {
      pt: "Cases reais. O código é confidencial, então mostro a arquitetura, as decisões e o impacto.",
      en: "Real cases. The code is confidential, so I show the architecture, the decisions and the impact.",
    },
    lab: {
      pt: "Onde testo ideias e tecnologias fora do expediente.",
      en: "Where I try out ideas and technologies outside work hours.",
    },
    contact: {
      pt: "Aberto a oportunidades em engenharia de dados, de preferência remotas. Respondo rápido.",
      en: "Open to data engineering roles, preferably remote. I reply quickly.",
    },
  },
  concepts: { pt: "Conceitos e práticas", en: "Concepts and practices" },
  project: {
    problem: { pt: "Problema", en: "Problem" },
    solution: { pt: "Solução", en: "Solution" },
    impact: { pt: "Impacto", en: "Impact" },
    stack: { pt: "Stack", en: "Stack" },
    architecture: { pt: "Arquitetura", en: "Architecture" },
    confidential: { pt: "Código confidencial", en: "Confidential code" },
    viewCode: { pt: "Ver no GitHub", en: "View on GitHub" },
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
      pt: "Projetado e desenvolvido por Alexandre Soares.",
      en: "Designed and built by Alexandre Soares.",
    },
    top: { pt: "Voltar ao topo", en: "Back to top" },
  },
} as const;
