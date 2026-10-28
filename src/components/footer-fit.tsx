"use client";

import { useEffect, useRef } from "react";

/**
 * The footer is pinned under the page (sticky, bottom: 0) and revealed as the page slides off it. When the
 * footer is taller than the window, bottom: 0 would hold its top behind the page for good; a negative bottom
 * of (window − footer) lets it scroll through so every part of it is reached. Render inside the footer.
 */
export function FooterFit() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const footer = ref.current?.parentElement;
    if (!footer) return;
    const fit = () => {
      footer.style.bottom = `${Math.min(0, window.innerHeight - footer.offsetHeight)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(footer);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
      footer.style.bottom = "";
    };
  }, []);
  return <span ref={ref} hidden />;
}
