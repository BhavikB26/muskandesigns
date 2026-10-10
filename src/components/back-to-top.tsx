"use client";

import { useEffect, useState } from "react";

/** A small circular button that appears after scrolling and returns to the top of the page. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: reduce });
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // Move keyboard focus back to the start of the page as well.
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`back-to-top btn-icon ${show ? "is-on" : ""}`}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
      </svg>
    </button>
  );
}
