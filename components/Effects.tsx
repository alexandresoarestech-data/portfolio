"use client";

import Lenis from "lenis";
import { useEffect, useState } from "react";

/**
 * Efeitos globais (um só componente, montado no layout):
 * - Scroll suave com Lenis (desligado para quem prefere menos movimento)
 * - Posição do ponteiro para o brilho dos GlowCards
 * - Pausa as animações de blocos `[data-anim]` quando saem da tela
 */
export function Effects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | undefined;
    if (!reduce) {
      lenis = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: -88 } });
    }

    // Posição do ponteiro para os GlowCards (um listener só, no <html>)
    const root = document.documentElement.style;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        root.setProperty("--x", e.clientX.toFixed(1));
        root.setProperty("--y", e.clientY.toFixed(1));
        root.setProperty("--xp", (e.clientX / window.innerWidth).toFixed(3));
        root.setProperty("--yp", (e.clientY / window.innerHeight).toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) en.target.removeAttribute("data-paused");
          else en.target.setAttribute("data-paused", "");
        }
      },
      { rootMargin: "120px" },
    );
    document.querySelectorAll("[data-anim]").forEach((el) => io.observe(el));

    return () => {
      lenis?.destroy();
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  return null;
}

/** Palavra que troca sozinha, com transição de desfoque (inspirado no "Flip Words"). */
export function FlipWords({ words, interval = 2600, className }: { words: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);
  return (
    <span className={className}>
      <span key={i} className="flip-word" aria-hidden="true">
        {words[i]}
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
