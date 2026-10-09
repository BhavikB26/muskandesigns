"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

/*
 * Site-wide motion:
 * - Lenis smooth scrolling (skipped entirely under prefers-reduced-motion).
 * - Scroll reveals: any element with [data-reveal] fades and rises into view once.
 *   Children inside a [data-reveal-group] stagger by their index.
 * - A shared "paused" flag (html[data-motion="paused"]) that stops all looping motion,
 *   toggled by <MotionToggle /> to meet WCAG 2.2.2 (Pause, Stop, Hide).
 */

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Motion() {
  const pathname = usePathname();

  // Smooth scroll
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // Image parallax: [data-parallax] layers drift slightly against the scroll.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const paused = document.documentElement.dataset.motion === "paused";
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const box = el.parentElement?.getBoundingClientRect();
        if (!box || box.bottom < 0 || box.top > vh) return;
        const progress = (box.top + box.height / 2 - vh / 2) / vh; // -1 … 1 across the viewport
        el.style.transform = paused ? "" : `translate3d(0, ${(-progress * 6).toFixed(2)}%, 0)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // Scroll reveals (re-run on every route change)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"));
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }
    els.forEach((el) => {
      const group = el.closest("[data-reveal-group]");
      if (group) {
        const siblings = Array.from(group.querySelectorAll("[data-reveal]"));
        el.style.setProperty("--reveal-delay", `${Math.min(siblings.indexOf(el), 6) * 70}ms`);
      }
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-revealed", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}

/* ---------- pause / play for looping motion ---------- */

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function getPaused() {
  return document.documentElement.dataset.motion === "paused";
}
export function setMotionPaused(paused: boolean) {
  if (paused) document.documentElement.dataset.motion = "paused";
  else delete document.documentElement.dataset.motion;
  listeners.forEach((l) => l());
}
export function useMotionPaused() {
  return useSyncExternalStore(subscribe, getPaused, () => false);
}

/** Small icon button beside the theme switch that pauses every looping animation (WCAG 2.2.2). */
export function MotionToggle({ className = "" }: { className?: string }) {
  const paused = useMotionPaused();
  return (
    <button
      type="button"
      onClick={() => setMotionPaused(!paused)}
      aria-pressed={paused}
      aria-label={paused ? "Play motion" : "Pause motion"}
      title={paused ? "Play motion" : "Pause motion"}
      className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong bg-card text-ink transition-colors duration-300 hover:bg-ink hover:text-background motion-reduce:hidden ${className}`}
      style={{ transitionTimingFunction: EASE }}
    >
      {paused ? (
        <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="currentColor"><path d="M5 3.2v9.6L12.6 8z" /></svg>
      ) : (
        <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="currentColor"><rect x="4" y="3.5" width="2.6" height="9" rx="0.6" /><rect x="9.4" y="3.5" width="2.6" height="9" rx="0.6" /></svg>
      )}
    </button>
  );
}
