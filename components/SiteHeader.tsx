"use client";

import Image from "next/image";
import avatar from "@/assets/avatar.webp";
import { useEffect, useState } from "react";
import { tr, ui, type Lang } from "@/lib/i18n";
import { asset } from "@/lib/site";
import { UiIcon } from "./icons";

const items = ["about", "stack", "experience", "projects", "lab", "zenith", "contact"] as const;

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
  const otherLabel = lang === "pt" ? "EN" : "PT";

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/65">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink"
      >
        {tr(ui.skip, lang)}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#topo" className="group flex items-center gap-2.5" aria-label="Alexandre Soares — início">
          <Image
            src={avatar}
            alt=""
            width={36}
            height={36}
            priority
            className="size-9 rounded-full border border-line-strong object-cover ring-2 ring-transparent transition-shadow group-hover:ring-accent/60"
          />
          <span className="hidden font-semibold tracking-tight text-fg sm:inline">Alexandre Soares</span>
        </a>

        <nav aria-label={lang === "pt" ? "Seções" : "Sections"} className="hidden lg:block">
          <ul className="flex items-center gap-1 text-sm">
            {items.map((k) => (
              <li key={k}>
                <a href={`#${k}`} className="rounded-md px-3 py-2 text-muted transition-colors hover:text-fg">
                  {tr(ui.nav[k], lang)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={asset(otherHref)}
            hrefLang={lang === "pt" ? "en" : "pt-BR"}
            className="grid h-9 min-w-9 place-items-center rounded-lg border border-line px-2 font-mono text-xs font-semibold text-fg-soft transition-colors hover:border-accent hover:text-fg"
            aria-label={tr(ui.switchLang, lang)}
            title={tr(ui.switchLang, lang)}
          >
            {otherLabel}
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="grid size-9 place-items-center rounded-lg border border-line text-fg-soft transition-colors hover:border-accent hover:text-fg"
            aria-label={lang === "pt" ? "Alternar tema claro/escuro" : "Toggle light/dark theme"}
          >
            <UiIcon name="sun" className="only-dark" />
            <UiIcon name="moon" className="only-light" />
          </button>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-lg border border-line text-fg-soft lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? tr(ui.closeMenu, lang) : tr(ui.menu, lang)}
            onClick={() => setOpen((v) => !v)}
          >
            <UiIcon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <nav
        id="menu-mobile"
        aria-label={lang === "pt" ? "Seções" : "Sections"}
        className={`${open ? "block" : "hidden"} border-t border-line bg-bg lg:hidden`}
      >
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-1 px-4 py-3 sm:px-6">
          {[...items, "education" as const].map((k) => (
            <li key={k}>
              <a
                href={`#${k}`}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-fg-soft transition-colors hover:bg-surface hover:text-fg"
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
