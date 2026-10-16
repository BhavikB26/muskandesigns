"use client";

import { useEffect, useRef } from "react";

/** Two cartoon eyes in the footer whose pupils follow the pointer (still when reduced motion is on). */
export function Eyes() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pupils = Array.from(root.querySelectorAll<HTMLElement>("[data-pupil]"));
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        for (const p of pupils) {
          const eye = p.parentElement!.getBoundingClientRect();
          const cx = eye.left + eye.width / 2;
          const cy = eye.top + eye.height / 2;
          const a = Math.atan2(e.clientY - cy, e.clientX - cx);
          const r = eye.width * 0.22;
          p.style.transform = `translate(${Math.cos(a) * r}px, ${Math.sin(a) * r}px)`;
        }
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="flex shrink-0 gap-2 pt-fr-sm">
      {[0, 1].map((i) => (
        <span key={i} className="relative flex size-12 items-center justify-center rounded-full bg-[#f3efe7] md:size-16">
          <span data-pupil className="block size-5 rounded-full bg-[#151412] transition-transform duration-150 ease-out md:size-7" />
        </span>
      ))}
    </div>
  );
}
