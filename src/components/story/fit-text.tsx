"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

/*
 * A line of display type sized to run edge to edge between the margins: the largest font size at which the
 * text fills `lines` balanced lines (fewer on wide screens, more on phones), recomputed when the width changes.
 */
export function FitText({ children, className = "", lines = 2, phoneLines = 3, min = 26, max = 120 }: { children: ReactNode; className?: string; lines?: number; phoneLines?: number; min?: number; max?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const n = window.innerWidth < 640 ? phoneLines : lines;
      let lo = min;
      let hi = max;
      // largest size whose height stays within n lines
      for (let i = 0; i < 14; i++) {
        const mid = (lo + hi) / 2;
        el.style.fontSize = `${mid}px`;
        const lh = parseFloat(getComputedStyle(el).lineHeight) || mid * 1.12;
        if (el.scrollHeight <= lh * n + 2) lo = mid;
        else hi = mid;
      }
      el.style.fontSize = `${Math.floor(lo * 10) / 10}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement ?? el);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [lines, phoneLines, min, max]);

  return (
    <p ref={ref} className={`w-full ${className}`}>
      {children}
    </p>
  );
}
