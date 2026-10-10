"use client";

import { useSyncExternalStore } from "react";

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

/** Light / dark switch. Light is the default; the choice is remembered. */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const dark = theme === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark theme"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="group relative inline-flex h-10 w-[72px] shrink-0 items-center rounded-full bg-surface-1 p-1 transition-colors duration-500 pointer-coarse:h-11 pointer-coarse:w-[78px]"
    >
      <span
        aria-hidden
        className={`flex size-8 items-center justify-center rounded-full bg-ink text-background transition-transform duration-500 ease-[var(--ease-out-expo)] pointer-coarse:size-9 ${
          dark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {dark ? (
          <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
            <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
            <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
          </svg>
        )}
      </span>
    </button>
  );
}
