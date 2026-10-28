"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/components/use-reduced-motion";

/*
 * Tubelight navbar (after ayushmxxn's component on 21st.dev): links in a glass pill, with a soft lamp that
 * glides to the current item. On the home page it follows the section in view.
 */
export type NavLink = { label: string; href: string; section?: string };

/** Scrolls to the end of the page (with Lenis's smoothing when it is running), and records #contact. */
function toBottom(reduced: boolean) {
  const end = document.documentElement.scrollHeight - window.innerHeight;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void } }).__lenis;
  if (lenis) lenis.scrollTo(end, { immediate: reduced });
  else window.scrollTo({ top: end, behavior: reduced ? "auto" : "smooth" });
  history.replaceState(null, "", "#contact");
}

export function TubelightNav({ links, current }: { links: NavLink[]; current: string }) {
  const [active, setActive] = useState(current);
  const reduced = useReducedMotion();

  useEffect(() => {
    const targets = links.flatMap((l) => (l.section ? [[l.label, document.getElementById(l.section)] as const] : []));
    if (!targets.some(([, el]) => el)) return;
    const onScroll = () => {
      const mid = window.innerHeight * 0.45;
      let hit = current;
      for (const [label, el] of targets) {
        if (!el) continue;
        if (el.id === "contact") {
          // The footer is pinned under the page, so it counts once the page has scrolled down to it.
          const end = document.documentElement.scrollHeight - window.innerHeight;
          if (window.scrollY >= end - el.offsetHeight * 0.5) hit = label;
        } else if (el.getBoundingClientRect().top < mid) hit = label;
      }
      setActive(hit);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [links, current]);

  return (
    <ul className="flex items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--color-surface-1)_78%,transparent)] p-1 ring-1 ring-line backdrop-blur-md">
      {links.map((l) => {
        const on = l.label === active;
        return (
          <li key={l.label} className="relative">
            <Link
              href={l.href}
              onClick={(e) => {
                setActive(l.label);
                if (l.href === "#contact") {
                  // The footer is pinned under the page, so an anchor jump lands nowhere useful: go to the
                  // very bottom instead, where the page has slid off and the whole footer shows. Lenis's own
                  // anchor handling must not see the click, or it scrolls to the pinned footer after us.
                  e.preventDefault();
                  e.stopPropagation();
                  toBottom(reduced);
                }
              }}
              aria-current={on ? "page" : undefined}
              className={`relative z-10 block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${on ? "text-ink" : "text-muted hover:text-ink"}`}
            >
              {l.label}
            </Link>
            {on && (
              <motion.span
                layoutId="tubelight"
                aria-hidden
                className="absolute inset-0 rounded-full bg-[color-mix(in_oklab,var(--color-accent)_9%,transparent)]"
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
              >
                <span className="absolute -top-1 left-1/2 h-1 w-7 -translate-x-1/2 rounded-t-full bg-accent">
                  <span className="absolute -left-2 -top-2 h-6 w-11 rounded-full bg-accent/20 blur-md" />
                  <span className="absolute -top-1 left-0 h-5 w-7 rounded-full bg-accent/20 blur-md" />
                </span>
              </motion.span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
