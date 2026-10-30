"use client";

import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

/*
 * The site's theme: light by default, remembered, and switched (by the pull cord, ui/light-pull-theme-switcher)
 * with the new theme spreading across the page as a circle (View Transitions). Falls back to an instant swap
 * without View Transitions or with reduced motion.
 */

type Theme = "light" | "dark";

const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

function setTheme(t: Theme) {
  if (t === "dark") document.documentElement.dataset.theme = "dark";
  else delete document.documentElement.dataset.theme;
  try {
    localStorage.setItem("theme", t);
  } catch {}
  listeners.forEach((l) => l());
}

/** The current site theme, kept in sync with the toggle (the hero uses it to show day or night). */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
}

/** Flips the theme; the new one spreads across the page as a circle opening from `from`. */
export function switchTheme(from: HTMLElement | null) {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || typeof document.startViewTransition !== "function" || !from) {
    setTheme(next);
    return;
  }
  const { left, top, width, height } = from.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const root = document.documentElement;
  root.dataset.themeVt = "";
  const vt = document.startViewTransition(() => flushSync(() => setTheme(next)));
  vt.ready
    .then(() =>
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      ),
    )
    .catch(() => {});
  vt.finished.finally(() => delete root.dataset.themeVt).catch(() => {});
}
