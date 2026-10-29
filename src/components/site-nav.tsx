"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, Send, UserRound } from "lucide-react";
import { LiquidNavbar, NimbusIcons, type LiquidNavItem } from "@/components/ui/liquid-glass-navbar";
import { useTheme } from "@/components/theme-toggle";
import { useReducedMotion } from "@/components/use-reduced-motion";
import { scrollToWork } from "@/components/home/scroll-to-work";

/*
 * The header's links on the Liquid Navbar (Nimbus UI "Waterline", 21st.dev): a pill of violet water whose
 * drop stretches to the item picked. On the home page the drop follows the section in view; Contact goes to
 * the footer pinned under the page.
 */
export type NavLink = { label: string; href: string; section?: string };

const lucide = { size: 18, strokeWidth: 1.8, "aria-hidden": true } as const;
const ICONS: Record<string, Pick<LiquidNavItem, "icon" | "fx">> = {
  Home: { icon: NimbusIcons.home, fx: "glow" },
  "Case studies": { icon: <LayoutGrid {...lucide} />, fx: "spin" },
  About: { icon: <UserRound {...lucide} />, fx: "wave" },
  Contact: { icon: <Send {...lucide} />, fx: "plane" },
};

/** Scrolls to the end of the page (with Lenis's smoothing when it is running), and records #contact. */
function toBottom(reduced: boolean) {
  const end = document.documentElement.scrollHeight - window.innerHeight;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void } }).__lenis;
  if (lenis) lenis.scrollTo(end, { immediate: reduced });
  else window.scrollTo({ top: end, behavior: reduced ? "auto" : "smooth" });
  history.replaceState(null, "", "#contact");
}

export function SiteNav({ links, current }: { links: NavLink[]; current: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(current);

  // On the home page, follow the section in view.
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

  const items: LiquidNavItem[] = links.map((l) => ({ label: l.label, href: l.href, ...ICONS[l.label] }));
  const index = Math.max(0, links.findIndex((l) => l.label === active));

  return (
    <LiquidNavbar
      items={items}
      active={index}
      tone={theme}
      ariaLabel="Main"
      onChange={(i) => setActive(links[i].label)}
      onItemClick={(e, i) => {
        const href = links[i].href;
        // Plain-modifier clicks open in a new tab as usual.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        if (href === "#contact") {
          // The footer is pinned under the page, so an anchor jump lands nowhere useful: go to the very
          // bottom instead. Lenis's own anchor handling must not see the click, or it scrolls after us.
          e.stopPropagation();
          setActive(links[i].label);
          toBottom(reduced);
          return;
        }
        if (href === "/#work" && pathname === "/") {
          // Case studies: scroll to where the section has fully opened out of the monitor (scroll-to-work.ts).
          e.stopPropagation();
          setActive(links[i].label);
          if (scrollToWork(reduced)) return;
        }
        if (href === "/" && pathname === "/") {
          // Already home: back to the top (a push to the same URL would do nothing).
          const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void } }).__lenis;
          if (lenis) lenis.scrollTo(0, { immediate: reduced });
          else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
          history.replaceState(null, "", "/");
          return;
        }
        router.push(href);
      }}
    />
  );
}
