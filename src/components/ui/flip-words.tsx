"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionPaused } from "@/components/motion";
import { useReducedMotion } from "@/components/use-reduced-motion";
import { cn } from "@/lib/utils";

/*
 * Flip Words (Aceternity UI, via 21st.dev): cycles through words, each letter blurring in and the old word
 * lifting away. Decorative: pair it with a screen-reader sentence. Holds on the first word when motion is
 * paused or reduced.
 */
export function FlipWords({ words, duration = 2800, className }: { words: string[]; duration?: number; className?: string }) {
  const paused = useMotionPaused();
  const reduced = useReducedMotion();
  const still = paused || reduced;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (still) return;
    const t = setTimeout(() => setI((n) => (n + 1) % words.length), duration);
    return () => clearTimeout(t);
  }, [i, still, duration, words.length]);

  const word = still ? words[0] : words[i];
  return (
    <span aria-hidden className="relative inline-grid">
      {/* Reserve the widest word so the line never reflows. */}
      {words.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {w}
        </span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          className={cn("col-start-1 row-start-1 whitespace-nowrap", className)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -28, x: 24, filter: "blur(8px)", scale: 1.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {word.split("").map((letter, k) => (
            <motion.span
              key={k}
              className="inline-block"
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: k * 0.035, duration: 0.25 }}
            >
              {letter === " " ? " " : letter}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
