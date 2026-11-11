"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import avatar from "@/assets/avatar.webp";
import { tr, ui, type Lang } from "@/lib/i18n";
import { asset } from "@/lib/site";
import { UiIcon } from "./icons";

const items = ["about", "experience", "projects", "lab", "zenith"] as const;
const mobileItems = ["about", "stack", "experience", "projects", "lab", "building", "zenith", "education", "contact"] as const;

function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* navegação privada: segue sem salvar */
  }
}

export function SiteHeader({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const otherHref = lang === "pt" ? "/en/" : "/";
  const iconBtn =
    "grid size-9 place-items-center rounded-full text-fg-soft transition-colors hover:bg-glass hover:text-fg";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        {tr(ui.skip, lang)}
      </a>
      <div className="nav-shell mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border border-line bg-bg/70 pl-1.5 pr-1.5 backdrop-blur-xl">
        <a href="#topo" className="group flex items-center gap-3 rounded-full pr-3">
          <Image
            src={avatar}
            alt=""
            width={42}
            height={42}
            priority
            className="size-[42px] rounded-full border border-line-strong object-cover transition-[box-shadow] group-hover:shadow-[0_0_0_3px_var(--glow)]"
          />
          <span className="sr-only sm:not-sr-only sm:block sm:leading-tight">
            <span className="block text-sm font-semibold tracking-tight text-fg">Alexandre Soares</span>
            <span className="block font-mono text-[10.5px] text-muted">{lang === "pt" ? "Engenheiro de Dados" : "Data Engineer"}</span>
          </span>
        </a>

        <nav aria-label={lang === "pt" ? "Seções" : "Sections"} className="hidden lg:block">
          <ul className="flex items-center gap-0.5 text-[13px]">
            {items.map((k) => (
              <li key={k}>
                <a href={`#${k}`} className="rounded-full px-3.5 py-2 text-muted transition-colors hover:bg-glass hover:text-fg">
                  {tr(ui.nav[k], lang)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={asset(otherHref)}
            hrefLang={lang === "pt" ? "en" : "pt-BR"}
            className={`${iconBtn} font-mono text-[11px] font-semibold`}
            title={tr(ui.switchLang, lang)}
          >
            {lang === "pt" ? "EN" : "PT"}
            <span className="sr-only"> · {tr(ui.switchLang, lang)}</span>
          </a>
          <button type="button" onClick={toggleTheme} className={iconBtn} aria-label={lang === "pt" ? "Alternar tema claro/escuro" : "Toggle light/dark theme"}>
            <UiIcon name="sun" size={17} className="only-dark" />
            <UiIcon name="moon" size={17} className="only-light" />
          </button>
          <a
            href="#contact"
            className="ml-1 hidden h-10 items-center rounded-full bg-fg px-4 text-[13px] font-semibold text-bg transition-transform hover:-translate-y-px sm:inline-flex"
          >
            {tr(ui.nav.contact, lang)}
          </a>
          <button
            type="button"
            className={`${iconBtn} lg:hidden`}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? tr(ui.closeMenu, lang) : tr(ui.menu, lang)}
            onClick={() => setOpen((v) => !v)}
          >
            <UiIcon name={open ? "close" : "menu"} size={18} />
          </button>
        </div>
      </div>

      <nav
        id="menu-mobile"
        aria-label={lang === "pt" ? "Seções" : "Sections"}
        className={`${open ? "block" : "hidden"} mx-auto mt-2 max-w-6xl rounded-3xl border border-line bg-bg/90 p-2 backdrop-blur-xl lg:hidden`}
      >
        <ul className="grid grid-cols-2 gap-1">
          {mobileItems.map((k) => (
            <li key={k}>
              <a
                href={`#${k}`}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-fg-soft transition-colors hover:bg-glass hover:text-fg"
              >
                {tr(ui.nav[k], lang)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
