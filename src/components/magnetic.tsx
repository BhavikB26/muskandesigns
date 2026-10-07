"use client";

import { useRef, type ReactNode } from "react";

/**
 * Wraps a button or link so it leans gently toward the pointer and springs back.
 * Desktop pointers only; does nothing under reduced motion or when motion is paused.
 */
export function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  const allowed = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    document.documentElement.dataset.motion !== "paused";

  return (
    <span
      ref={ref}
      className="inline-flex transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform"
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || !allowed()) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transitionDuration = "150ms";
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transitionDuration = "";
        el.style.transform = "";
      }}
    >
      {children}
    </span>
  );
}
