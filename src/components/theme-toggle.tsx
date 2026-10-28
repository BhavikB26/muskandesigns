"use client";

import { useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { SETTLE } from "@/components/ui/springs";

/*
 * Light / dark switch (after Magic UI's Animated Theme Toggler on 21st.dev): a round glass button whose
 * sun and moon swap on a spring, and the new theme spreads across the page as a circle opening from the
 * button (View Transitions). Falls back to an instant swap without View Transitions or with reduced motion.
 * Light is the default; the choice is remembered.
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

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const dark = theme === "dark";
  const ref = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    const next: Theme = dark ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof document.startViewTransition !== "function" || !ref.current) {
      setTheme(next);
      return;
    }
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement;
    root.dataset.themeVt = "";
    const t = document.startViewTransition(() => flushSync(() => setTheme(next)));
    t.ready
      .then(() =>
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
        ),
      )
      .catch(() => {});
    t.finished.finally(() => delete root.dataset.themeVt).catch(() => {});
  };

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark theme"
      onClick={toggle}
      className={`glass-btn relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-ink transition-transform duration-150 active:scale-[0.94] pointer-coarse:size-11 ${className}`}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={theme}
          aria-hidden
          initial={{ y: dark ? 18 : -18, rotate: dark ? -40 : 40, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: dark ? -18 : 18, rotate: dark ? 40 : -40, opacity: 0 }}
          transition={SETTLE}
          className="flex"
        >
          {dark ? <Moon className="size-[17px]" strokeWidth={2} /> : <Sun className="size-[18px]" strokeWidth={2} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
