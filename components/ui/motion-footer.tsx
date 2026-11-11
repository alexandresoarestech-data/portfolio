"use client";

/**
 * CinematicFooter — adaptado do "Motion Footer" (21st.dev / jahed), com GSAP + ScrollTrigger.
 * Mudanças em relação ao original:
 * - Conteúdo do portfólio (contato, redes, CV) em PT/EN.
 * - GSAP carregado sob demanda (import dinâmico) para não pesar a abertura da página.
 * - Cores e fonte vindas dos tokens do site (globals.css → "Cinematic Footer"), sem @import externo.
 * - Respeita "reduzir movimento"; foco por teclado rola até o rodapé para ele aparecer.
 */
import { forwardRef, useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { profile } from "@/data/profile";
import { tr, ui, type Lang } from "@/lib/i18n";
import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";
import { UiIcon } from "../icons";

type Gsap = typeof import("gsap").gsap;
let gsapPromise: Promise<{ gsap: Gsap; ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger }> | null = null;
function loadGsap() {
  if (!gsapPromise) {
    gsapPromise = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, st]) => {
      g.gsap.registerPlugin(st.ScrollTrigger);
      return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
    });
  }
  return gsapPromise;
}
const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Botão magnético ---------- */
type MagneticProps = ComponentPropsWithoutRef<"a"> & { children: ReactNode };

const MagneticLink = forwardRef<HTMLAnchorElement, MagneticProps>(function MagneticLink({ className, children, ...props }, forwardedRef) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion() || !window.matchMedia("(hover: hover)").matches) return;
    let gsap: Gsap | undefined;
    loadGsap().then((m) => (gsap = m.gsap));

    const move = (e: MouseEvent) => {
      if (!gsap) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(el, { x: x * 0.35, y: y * 0.35, rotationX: -y * 0.12, rotationY: x * 0.12, scale: 1.05, ease: "power2.out", duration: 0.4 });
    };
    const leave = () => {
      gsap?.to(el, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, ease: "elastic.out(1, 0.3)", duration: 1.2 });
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <a
      ref={(node) => {
        ref.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </a>
  );
});

const keywords = [
  "Engenharia de Dados",
  "Pipelines ETL/ELT",
  "BigQuery",
  "PySpark",
  "Databricks",
  "Arquitetura Medalhão",
  "Terraform",
  "Data Quality",
  "Lakehouse",
  "Airflow",
];
const keywordsEn = [
  "Data Engineering",
  "ETL/ELT Pipelines",
  "BigQuery",
  "PySpark",
  "Databricks",
  "Medallion Architecture",
  "Terraform",
  "Data Quality",
  "Lakehouse",
  "Airflow",
];

function MarqueeItem({ words }: { words: string[] }) {
  return (
    <div className="flex items-center gap-12 px-6">
      {words.map((w, i) => (
        <span key={w} className="flex items-center gap-12">
          <span>{w}</span>
          <span className={i % 2 ? "text-accent-2/60" : "text-accent/70"}>✦</span>
        </span>
      ))}
    </div>
  );
}

export function CinematicFooter({ lang }: { lang: Lang }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const pt = lang === "pt";
  const l = profile.links;
  const wa = `https://wa.me/${l.whatsapp}?text=${encodeURIComponent(tr(ui.contact.whatsappMsg, lang))}`;
  const nt = <span className="sr-only">{pt ? "(abre em nova aba)" : "(opens in a new tab)"}</span>;

  useEffect(() => {
    if (!wrapperRef.current || reduceMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled || !wrapperRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          giantRef.current,
          { y: "10vh", scale: 0.8, opacity: 0 },
          {
            y: "0vh",
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", end: "bottom bottom", scrub: 1 },
          },
        );
        gsap.fromTo(
          [headingRef.current, linksRef.current],
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: wrapperRef.current, start: "top 40%", end: "bottom bottom", scrub: 1 },
          },
        );
      }, wrapperRef);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  const pillLg = "footer-glass-pill flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold text-fg md:px-10 md:py-5 md:text-base";
  const pillSm = "footer-glass-pill flex items-center gap-2 rounded-full px-5 py-3 text-xs font-medium text-muted hover:text-fg md:px-6 md:text-sm";

  return (
    <div
      id="contact"
      ref={wrapperRef}
      data-anim
      className="relative h-[100svh] w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <footer
        aria-labelledby="contact-title"
        onFocusCapture={() => wrapperRef.current?.scrollIntoView({ block: "end" })}
        className="cinematic-footer fixed bottom-0 left-0 flex h-[100svh] w-full flex-col justify-between overflow-hidden bg-bg text-fg"
      >
        <div aria-hidden="true" className="footer-aurora animate-footer-breathe pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] rounded-[50%] blur-[80px]" />
        <div aria-hidden="true" className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

        <div
          ref={giantRef}
          aria-hidden="true"
          className="footer-giant-bg-text pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
        >
          SOARES
        </div>

        {/* Faixa diagonal */}
        <div aria-hidden="true" className="absolute left-0 top-24 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-line bg-bg/60 py-4 shadow-2xl backdrop-blur-md">
          <div className="animate-footer-scroll-marquee flex w-max font-mono text-xs font-semibold uppercase tracking-[0.3em] text-muted md:text-sm">
            <MarqueeItem words={pt ? keywords : keywordsEn} />
            <MarqueeItem words={pt ? keywords : keywordsEn} />
          </div>
        </div>

        {/* Conteúdo central */}
        <div className="relative z-10 mx-auto mt-24 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6">
          <div ref={headingRef} className="text-center">
            <p className="font-mono text-xs text-muted">(09) · {tr(ui.nav.contact, lang)}</p>
            <h2 id="contact-title" className="footer-text-glow mt-4 text-5xl font-semibold tracking-[-0.045em] md:text-8xl">
              {pt ? (
                <>
                  Vamos trabalhar <span className="font-serif italic tracking-normal">juntos?</span>
                </>
              ) : (
                <>
                  Let&apos;s work <span className="font-serif italic tracking-normal">together?</span>
                </>
              )}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">{tr(ui.leads.contact, lang)}</p>
          </div>

          <div ref={linksRef} className="mt-10 flex w-full flex-col items-center gap-6 [perspective:800px]">
            <div className="flex w-full flex-wrap justify-center gap-4">
              <MagneticLink href={`mailto:${l.email}`} className={pillLg}>
                <UiIcon name="mail" size={20} className="text-muted" />
                {l.email}
              </MagneticLink>
              <MagneticLink href={wa} target="_blank" rel="noopener noreferrer" className={pillLg}>
                <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor" aria-hidden="true" className="text-muted">
                  <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41" />
                </svg>
                WhatsApp
                {nt}
              </MagneticLink>
            </div>
            <div className="flex w-full flex-wrap justify-center gap-3 md:gap-4">
              <MagneticLink href={l.linkedin} target="_blank" rel="noopener noreferrer" className={pillSm}>
                <UiIcon name="linkedin" size={15} />
                LinkedIn
                {nt}
              </MagneticLink>
              <MagneticLink href={l.github} target="_blank" rel="noopener noreferrer" className={pillSm}>
                GitHub
                {nt}
              </MagneticLink>
              <MagneticLink href={l.instagram} target="_blank" rel="noopener noreferrer" className={pillSm}>
                Instagram
                {nt}
              </MagneticLink>
              <MagneticLink href={asset(l.cv)} download className={pillSm}>
                <UiIcon name="download" size={15} />
                {tr(ui.hero.downloadCv, lang)}
              </MagneticLink>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="relative z-20 flex w-full flex-col items-center justify-between gap-5 px-6 pb-8 md:flex-row md:px-12">
          <p className="order-2 font-mono text-[10px] uppercase tracking-widest text-muted md:order-1 md:text-xs">
            © {new Date().getFullYear()} {profile.fullName}
          </p>
          <div className="footer-glass-pill order-1 flex cursor-default items-center gap-2 rounded-full px-6 py-3 md:order-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted md:text-xs">{pt ? "Feito com" : "Crafted with"}</span>
            <span aria-label={pt ? "amor" : "love"} role="img" className="animate-footer-heartbeat text-sm text-accent md:text-base">
              ❤
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted md:text-xs">{pt ? "por" : "by"}</span>
            <span className="ml-1 text-xs font-bold text-fg md:text-sm">Alexandre Soares</span>
          </div>
          <MagneticLink
            href="#topo"
            aria-label={tr(ui.footer.top, lang)}
            className="footer-glass-pill group order-3 flex size-12 items-center justify-center rounded-full text-muted hover:text-fg"
          >
            <svg className="size-5 transition-transform duration-300 group-hover:-translate-y-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </MagneticLink>
        </div>
      </footer>
    </div>
  );
}
