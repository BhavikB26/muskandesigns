"use client";

import { useEffect, useRef } from "react";
import { useMotionPaused } from "@/components/motion";

/**
 * Plays an overflowing screenshot like a screen recording: while on screen it scrolls slowly
 * down, holds, eases back to the top and repeats. It doesn't capture the wheel, so the page keeps
 * scrolling normally over it. Pause motion and reduced-motion keep it still at the top.
 */
export function useAutoScroll<T extends HTMLElement>(speed = 0.12) {
  const ref = useRef<T>(null);
  const paused = useMotionPaused();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.scrollTop = 0;
      return;
    }
    let raf = 0, visible = false, last = 0, hold = 1500, dir = 1, pos = el.scrollTop;
    const step = (t: number) => {
      raf = requestAnimationFrame(step);
      const dt = last ? Math.min(t - last, 64) : 0;
      last = t;
      if (!visible) return;
      if (hold > 0) {
        hold -= dt;
        return;
      }
      const max = el.scrollHeight - el.clientHeight;
      // speed: screen heights per second going down; the return to the top runs 5x faster.
      pos += dir * ((el.clientHeight * speed * (dir > 0 ? 1 : 5)) / 1000) * dt;
      if (dir > 0 && pos >= max) {
        pos = max;
        dir = -1;
        hold = 2000;
      } else if (dir < 0 && pos <= 0) {
        pos = 0;
        dir = 1;
        hold = 1500;
      }
      el.scrollTop = pos;
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [paused, speed]);

  return ref;
}
