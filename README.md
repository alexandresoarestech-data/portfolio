# Portfólio · Alexandre Soares — Engenheiro de Dados

Site pessoal com experiência, projetos de engenharia de dados (com diagramas de arquitetura em SVG), laboratório, Zenith Tech e contato. Em português e inglês, com tema escuro e claro.

- **Principal (Vercel):** https://alexandresoares.vercel.app
- **Espelho (GitHub Pages):** https://alexandresoarestech-data.github.io/portfolio/

Feito com Next.js (App Router, export estático), TypeScript e Tailwind CSS. Ícones de marca: [simple-icons](https://simpleicons.org) (CC0).

### Créditos de efeitos ([21st.dev](https://21st.dev/community/components))

| Efeito no site | Componente de origem | Onde |
|---|---|---|
| Cartões com brilho que segue o mouse | Spotlight Card (`GlowCard`) | `components/ui/spotlight-card.tsx` |
| Rodapé "cortina" com GSAP, texto gigante e botões magnéticos | Motion Footer (`CinematicFooter`) | `components/ui/motion-footer.tsx` |
| Linhas animadas no fundo do topo | Background Paths (kokonutd) | `components/Hero.tsx` |
| Holofote, palavras que trocam, órbita da foto, texto que acende no scroll, feixe da linha do tempo, painel 3D que assenta no scroll, marquee | Inspirados em Spotlight, Flip Words, Radial Orbital, Text Reveal, Tracing Beam, Container Scroll e Marquee — reescritos em CSS (scroll-driven animations) | `app/globals.css` |

Scroll suave: [Lenis](https://lenis.darkroom.engineering). Animações do rodapé: [GSAP](https://gsap.com) (licença gratuita).

## Como atualizar

Todo o conteúdo fica em dois arquivos. Cada texto tem versão `pt` e `en`:

| O que mudar | Arquivo |
|---|---|
| Resumo, links, contatos, experiência, stack, formação, cursos, idiomas, Zenith Tech | `data/profile.ts` |
| Projetos em destaque (e os diagramas), laboratório, loja Eli Soares (e o diagrama ER) | `data/projects.ts` |
| Títulos de seção e botões | `lib/i18n.ts` |
| Currículo em PDF | substitua `public/cv/Alexandre-Soares-CV-Engenheiro-de-Dados.pdf` |
| Foto | `assets/alexandre-soares.webp` (retrato 4:5) e `assets/avatar.webp` (quadrada) |

Os diagramas são gerados a partir de `diagram.stages` em `data/projects.ts`: cada estágio tem título, tom (`source`, `ingest`, `event`, `bronze`, `silver`, `gold`, `consume`) e nós (`label`, `detail`, `icon`).

Depois de editar:

```bash
npm run dev        # confira em http://localhost:3000
git add .
git commit -m "Atualiza portfólio"
git push           # Vercel e GitHub Pages publicam sozinhos
```

## Rodar localmente

```bash
npm install
npm run dev
npm run build      # gera o site estático em out/
```
