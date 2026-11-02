"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";

/*
 * Site-wide motion:
 * - Lenis smooth scrolling (skipped entirely under prefers-reduced-motion).
 * - Scroll reveals: any element with [data-reveal] fades and rises into view once.
 *   Children inside a [data-reveal-group] stagger by their index.
 * - A shared "paused" flag (html[data-motion="paused"]) that stops all looping motion. The on-screen pause
 *   button was removed at Muskan's request; looping motion still stops for prefers-reduced-motion.
 */

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Motion() {
  const pathname = usePathname();

  // Smooth scroll
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: true });
    // Shared so the back-to-top button scrolls with the same easing.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // New pages open at the top. Lenis outlives route changes and holds on to its old position, so it has to
  // be reset too. Back and forward are left alone (they return to where you were), as are links to a section.
  const firstPage = useRef(true);
  const backOrForward = useRef(false);
  useEffect(() => {
    const onPop = () => {
      backOrForward.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (firstPage.current || backOrForward.current) {
      firstPage.current = false;
      backOrForward.current = false;
      lenis?.resize();
      return;
    }
    if (window.location.hash) return;
    const toTop = () => {
      lenis?.resize();
      lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    };
    toTop();
    // once more after the new page has laid out
    const raf = requestAnimationFrame(() => requestAnimationFrame(toTop));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

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
    // Tells the inline head script that scripts loaded; if they never do, it un-hides the content.
    (window as unknown as { __motion?: boolean }).__motion = true;
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
