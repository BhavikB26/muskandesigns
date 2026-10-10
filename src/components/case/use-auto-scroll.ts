"use client";

import { useEffect, useRef } from "react";
import { useMotionPaused } from "@/components/motion";

/**
 * Scrolls an overflowing element slowly down and back up while it is on screen, like someone
 * browsing a prototype. Any wheel, touch, key or pointer input hands control to the visitor.
 * Pause motion and reduced-motion keep it still.
 */
export function useAutoScroll<T extends HTMLElement>(speed = 0.18) {
  const ref = useRef<T>(null);
  const paused = useMotionPaused();

  useEffect(() => {
    const el = ref.current;
    if (!el || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, visible = false, userTookOver = false, last = 0, hold = 1200, dir = 1;
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
      // speed: screen heights per second going down; back up runs 4x faster.
      const pxPerMs = (el.clientHeight * speed * (dir > 0 ? 1 : 4)) / 1000;
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
    const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    events.forEach((e) => el.addEventListener(e, takeOver, { passive: true }));
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      events.forEach((e) => el.removeEventListener(e, takeOver));
    };
  }, [paused, speed]);

  return ref;
}
