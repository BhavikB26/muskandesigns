"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useMotionPaused } from "@/components/motion";

/**
 * A long web-page screenshot inside a laptop screen. While on screen it scrolls itself
 * slowly like someone browsing the page; any wheel, touch or key input hands control to
 * the visitor (it stays scrollable, like a prototype). Pause motion and reduced-motion stop it.
 */
export function LaptopScroll({ src, width, height, alt }: { src: string; width: number; height: number; alt: string }) {
  const screen = useRef<HTMLDivElement>(null);
  const paused = useMotionPaused();

  useEffect(() => {
    const el = screen.current;
    if (!el || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, visible = false, userTookOver = false, last = 0, hold = 1200, dir = 1;
    const SPEED = 0.18; // screen heights per second going down; back up runs 4x faster
    const step = (t: number) => {
      raf = requestAnimationFrame(step);
      const dt = last ? Math.min(t - last, 64) : 0;
      last = t;
      if (!visible || userTookOver) return;
      if (hold > 0) {
        hold -= dt;
        return;
      }
      const max = el.scrollHeight - el.clientHeight;
      const pxPerMs = (el.clientHeight * SPEED * (dir > 0 ? 1 : 4)) / 1000;
      const next = el.scrollTop + dir * pxPerMs * dt;
      if (dir > 0 && next >= max) {
        el.scrollTop = max;
        dir = -1;
        hold = 1800;
      } else if (dir < 0 && next <= 0) {
        el.scrollTop = 0;
        dir = 1;
        hold = 1800;
      } else el.scrollTop = next;
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    const takeOver = () => (userTookOver = true);
    el.addEventListener("wheel", takeOver, { passive: true });
    el.addEventListener("touchstart", takeOver, { passive: true });
    el.addEventListener("keydown", takeOver);
    el.addEventListener("pointerdown", takeOver);
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("wheel", takeOver);
      el.removeEventListener("touchstart", takeOver);
      el.removeEventListener("keydown", takeOver);
      el.removeEventListener("pointerdown", takeOver);
    };
  }, [paused]);

  return (
    <div className="laptop w-full max-w-[860px]">
      <div className="laptop-lid">
        <div
          ref={screen}
          data-lenis-prevent
          tabIndex={0}
          role="region"
          aria-label={`${alt} (scrollable)`}
          className="laptop-screen"
        >
          <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 768px) 820px, 88vw" className="block h-auto w-full" />
        </div>
      </div>
      <div className="laptop-base" aria-hidden />
    </div>
  );
}
