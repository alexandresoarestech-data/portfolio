/** Ícones de interface (traço próprio, sem dependências — seguros para componentes de cliente). */
const uiPaths = {
  mail: "M3.5 6.5h17v11h-17zM4 7l8 6 8-6",
  download: "M12 4v11m-5-5 5 5 5-5M5 20h14",
  arrowRight: "M5 12h14m-5-5 5 5-5 5",
  arrowUpRight: "M7 17 17 7M8 7h9v9",
  sun: "M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66 1.41-1.41M4.93 19.07l1.41-1.41m0-11.32L4.93 4.93m14.14 14.14-1.41-1.41M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  moon: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  pin: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  lock: "M6.5 11h11v9h-11zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.4 2.5 3.6 5.5 3.6 9S14.4 18.5 12 21c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3Z",
  linkedin: "M4 4h16v16H4zM8 10.5V16M8 7.8v.01M11.5 16v-3.2a2.2 2.2 0 0 1 4.4 0V16M11.5 10.5V16",
  flask: "M9.5 3h5M10.5 3v6l-5 9a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3l-5-9V3M7.5 15h9",
  cap: "M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Zm4 2v5c1.5 1.5 3.5 2.2 5.5 2.2s4-.7 5.5-2.2v-5M21.5 9v5",
  book: "M5 4.5h9.5a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3V4.5Zm0 12.5a3 3 0 0 1 3-3h9.5",
  check: "m5 12.5 4.5 4.5L19 7.5",
} as const;

export type UiIconName = keyof typeof uiPaths;

export function UiIcon({ name, size = 18, className }: { name: UiIconName; size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={uiPaths[name]} />
    </svg>
  );
}
