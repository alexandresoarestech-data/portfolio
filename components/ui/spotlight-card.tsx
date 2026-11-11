import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * GlowCard — adaptado do "Spotlight Card" (21st.dev / jahed).
 * O brilho segue o ponteiro em todos os cartões ao mesmo tempo.
 * - A posição do ponteiro (--x, --y, --xp, --yp) é escrita uma vez no <html> por Effects.tsx,
 *   em vez de um listener por cartão.
 * - Os estilos ficam em globals.css (seção "GlowCard"), não num <style> por cartão.
 * - Removido `touch-action: none` do original, que travaria a rolagem no celular.
 * - A matiz varia pouco (azul → índigo), para manter a paleta.
 */
const glowColorMap = {
  blue: { base: 218, spread: 34 },
  purple: { base: 262, spread: 40 },
  green: { base: 140, spread: 30 },
  red: { base: 0, spread: 20 },
  orange: { base: 28, spread: 20 },
} as const;

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
} as const;

export interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: keyof typeof glowColorMap;
  size?: keyof typeof sizeMap;
  width?: string | number;
  height?: string | number;
  /** true: ignora `size` e usa width/height ou className */
  customSize?: boolean;
  as?: ElementType;
  /** Raio da borda em px (precisa bater com o rounded do className). */
  radius?: number;
}

export function GlowCard({
  children,
  className = "",
  glowColor = "blue",
  size = "md",
  width,
  height,
  customSize = false,
  as: Tag = "div",
  radius = 18,
}: GlowCardProps) {
  const { base, spread } = glowColorMap[glowColor];
  const style = {
    "--base": base,
    "--spread": spread,
    "--radius": radius,
    ...(width !== undefined ? { width: typeof width === "number" ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === "number" ? `${height}px` : height } : {}),
  } as CSSProperties;

  return (
    <Tag
      data-glow
      style={style}
      className={`glow-card ${customSize ? "" : `${sizeMap[size]} aspect-[3/4]`} ${className}`}
    >
      <div data-glow aria-hidden="true" />
      {children}
    </Tag>
  );
}
