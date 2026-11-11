/** Junta classes ignorando valores vazios (equivalente simples do `cn` do shadcn). */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
