"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "@/content/about";
import { MaskedText } from "@/components/masked-text";
import { Accordion05 } from "@/components/ui/accordion-05";

/**
 * "What I can do for you": the heading on the left (centred against the list on wide screens), and the skills on the
 * right as big uppercase rows (21st.dev Accordion 05) that light up and open on hover or tap to list what
 * each one covers.
 */
export function Skills() {
  // The heading is centred against the list's closed height (measured whenever no row is open), so it
  // holds still when a row opens on hover instead of sliding to the new middle.
  const list = useRef<HTMLDivElement>(null);
  const [closedH, setClosedH] = useState<number>();
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const measure = () => {
      if (!el.querySelector('[data-state="open"]')) setClosedH(el.offsetHeight);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section aria-labelledby="skills-heading" className="w-full px-page pt-fr-section md:pt-[144px]">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-fr-xxl md:grid-cols-12 md:items-start md:gap-x-fr-xxl">
        <div
          data-reveal
          className="flex flex-col justify-center gap-fr-sm md:col-span-5 md:h-[var(--closed-h)]"
          style={{ "--closed-h": closedH ? `${closedH}px` : "auto" } as React.CSSProperties}
        >
          <h2 id="skills-heading" className="t-display-xl">
            <MaskedText text="What I can do" onReveal />{" "}
            <em className="font-serif text-[0.96em] font-normal italic tracking-[-0.03em]">
              <MaskedText text="for you" start={4} onReveal />
            </em>
          </h2>
          <p className="t-body-lg max-w-[44ch] text-ink-soft">
            I turn messy problems and research into clear decisions, then into flows and UI that teams can build on.
          </p>
        </div>

        <div ref={list} data-reveal className="md:col-span-7">
          <Accordion05
            openOnHover
            className="max-w-none"
            items={skills.map((s, i) => ({
              id: String(i),
              title: s.title,
              content: (
                <ul className="flex flex-wrap gap-fr-xs">
                  {s.items.map((it) => (
                    <li key={it} className="t-body-sm rounded-full bg-accent-soft px-fr-sm py-fr-xxs text-ink">
                      {it}
                    </li>
                  ))}
                </ul>
              ),
            }))}
          />
        </div>
      </div>
    </section>
  );
}
