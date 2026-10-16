"use client";

import Image from "next/image";
import { useState } from "react";
import { skills } from "@/content/about";
import { MaskedText } from "@/components/masked-text";

/**
 * "What I can do for you" (after mishikasbubble.framer.website): a numbered accordion of skills.
 * Hovering or opening a row turns it to the accent and shows a preview from real work beside the list.
 */
export function Skills() {
  const [open, setOpen] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? open;
  const preview = skills[shown].preview;

  return (
    <section aria-labelledby="skills-heading" className="w-full px-page pt-fr-section md:pt-[144px]">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-fr-xxl md:grid-cols-12 md:gap-x-fr-xxl">
        <div className="flex flex-col gap-fr-lg md:col-span-7">
          <div data-reveal className="flex flex-col gap-fr-sm">
            <h2 id="skills-heading" className="t-display-xl">
              <MaskedText text="What I can do" onReveal />{" "}
              <em className="font-serif text-[0.96em] font-normal italic tracking-[-0.03em]">
                <MaskedText text="for you" start={4} onReveal />
              </em>
            </h2>
            <p className="t-body-lg max-w-[52ch] text-muted">
              I turn messy problems and research into clear decisions, then into flows and UI that teams can build on.
            </p>
          </div>

          <ul data-reveal className="flex flex-col border-t border-line">
            {skills.map((s, i) => {
              const isOpen = open === i;
              const lit = shown === i;
              return (
                <li key={s.title} className="border-b border-line" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`skill-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      onFocus={() => setHover(i)}
                      onBlur={() => setHover(null)}
                      className={`flex w-full items-center justify-between gap-fr-md py-fr-lg text-left transition-colors duration-300 ${lit ? "text-accent" : "text-ink"}`}
                    >
                      <span className="t-display-md">
                        {i + 1}. {s.title}
                      </span>
                      <svg aria-hidden viewBox="0 0 24 24" className={`size-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </h3>
                  <div id={`skill-${i}`} hidden={!isOpen} className="pb-fr-lg">
                    <ul className="flex flex-wrap gap-fr-xs">
                      {s.items.map((it) => (
                        <li key={it} className="t-body-sm rounded-full bg-accent-soft px-fr-sm py-fr-xxs text-ink">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Preview of real work for the highlighted skill (decorative on small screens, so desktop only). */}
        <div aria-hidden className="relative hidden md:col-span-5 md:block">
          <div className="sticky top-28 flex aspect-[4/5] items-center justify-center overflow-hidden rounded-fr-xl bg-[linear-gradient(160deg,#5a46d6,#1b1252)] p-fr-xl">
            <Image
              key={preview.src}
              src={preview.src}
              alt=""
              width={preview.width}
              height={preview.height}
              sizes="30vw"
              className="settle max-h-full w-auto max-w-full rotate-[-3deg] rounded-fr-md object-contain shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
