"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMotionPaused } from "@/components/motion";
import { useReducedMotion } from "@/components/use-reduced-motion";

/*
 * Animated Testimonials (Aceternity UI, via 21st.dev), in the site's type and tokens: a stack of portraits
 * that shuffles to the speaker, and the quote arriving word by word. Autoplays every 7s while on screen
 * and motion is allowed; arrows and ← → keys move it by hand.
 */
export type Testimonial = { quote: string; name: string; role: string; src: string };

// Fixed tilts (the original randomises them, which breaks server rendering).
const TILT = [-6, 4, -3, 7, -5];

export function AnimatedTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const paused = useMotionPaused();
  const reduced = useReducedMotion();
  const still = paused || reduced;
  const n = testimonials.length;
  const next = useCallback(() => setActive((p) => (p + 1) % n), [n]);
  const prev = useCallback(() => setActive((p) => (p - 1 + n) % n), [n]);

  useEffect(() => {
    if (still || hover) return;
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [still, hover, next]);

  const t = testimonials[active];
  return (
    <div
      className="grid grid-cols-1 items-center gap-fr-xxl md:grid-cols-12 md:gap-x-fr-xxl"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
    >
      <div className="relative mx-auto aspect-square w-[min(72vw,340px)] md:col-span-5 md:mx-0">
        <AnimatePresence initial={false}>
          {testimonials.map((p, i) => {
            const on = i === active;
            return (
              <motion.div
                key={p.src}
                className="absolute inset-0 origin-bottom"
                initial={false}
                animate={{
                  opacity: on ? 1 : 0.75,
                  scale: on ? 1 : 0.94,
                  rotate: on ? 0 : TILT[i % TILT.length],
                  zIndex: on ? 40 : n + 2 - i,
                  y: on && !still ? [0, -48, 0] : 0,
                }}
                transition={{ duration: still ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={p.src}
                  alt={on ? `${p.name}` : ""}
                  fill
                  sizes="(min-width: 768px) 340px, 72vw"
                  draggable={false}
                  className="rounded-[32px] object-cover shadow-[0_30px_60px_-30px_rgba(20,14,8,0.45)] ring-1 ring-black/5 [corner-shape:superellipse(1.6)]"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <figure className="flex min-h-[16rem] flex-col justify-between gap-fr-xl md:col-span-7" aria-live="polite">
        <motion.div key={active} initial={still ? false : { y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
          <blockquote>
            <p className="t-body-lg max-w-[62ch] text-ink-soft">
              {still
                ? `“${t.quote}”`
                : `“${t.quote}”`.split(" ").map((word, k) => (
                    <motion.span
                      key={k}
                      className="inline-block"
                      initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut", delay: 0.015 * k }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
            </p>
          </blockquote>
          <figcaption className="mt-fr-xl flex flex-col">
            <span className="t-body font-medium text-ink">{t.name}</span>
            <span className="t-body-sm text-muted">{t.role}</span>
          </figcaption>
        </motion.div>
        <div className="flex items-center gap-fr-sm">
          <button type="button" onClick={prev} aria-label="Previous testimonial" className="btn-icon group/b ring-1 ring-line">
            <ArrowLeft className="size-[18px] transition-transform duration-300 group-hover/b:-translate-x-0.5" />
          </button>
          <button type="button" onClick={next} aria-label="Next testimonial" className="btn-icon group/b ring-1 ring-line">
            <ArrowRight className="size-[18px] transition-transform duration-300 group-hover/b:translate-x-0.5" />
          </button>
          <span className="t-body-sm ml-fr-xs tabular-nums text-muted">
            {active + 1} / {n}
          </span>
        </div>
      </figure>
    </div>
  );
}
