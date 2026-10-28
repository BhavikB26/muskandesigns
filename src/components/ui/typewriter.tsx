"use client";

import { useEffect, useState } from "react";
import { useMotionPaused } from "@/components/motion";
import { useReducedMotion } from "@/components/use-reduced-motion";
import { cn } from "@/lib/utils";

const TYPE_MS = 75; // per letter typed
const DELETE_MS = 38; // per letter deleted (faster, like a held backspace)
const HOLD_MS = 1800; // the finished word, before it is deleted
const GAP_MS = 350; // the empty line, before the next word

/*
 * Typewriter (after Aceternity UI's Typewriter Effect): types each word out letter by letter behind a
 * blinking caret, holds it, deletes it and types the next. The widest word's width is reserved so the line
 * never reflows. Decorative: pair it with a screen-reader sentence. Shows the first word, complete and
 * still, when motion is paused or reduced.
 */
export function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const paused = useMotionPaused();
  const reduced = useReducedMotion();
  const still = paused || reduced;
  const [i, setI] = useState(0); // which word
  const [n, setN] = useState(0); // letters shown
  const [deleting, setDeleting] = useState(false);

  // Whole characters, so nothing (an emoji, an accent) is ever cut in half.
  const chars = Array.from(words[i] ?? "");

  useEffect(() => {
    if (still) return;
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && n < chars.length) t = setTimeout(() => setN(n + 1), n === 0 ? GAP_MS : TYPE_MS);
    else if (!deleting) t = setTimeout(() => setDeleting(true), HOLD_MS);
    else if (n > 0) t = setTimeout(() => setN(n - 1), DELETE_MS);
    else
      t = setTimeout(() => {
        setDeleting(false);
        setI((i + 1) % words.length);
      }, 0);
    return () => clearTimeout(t);
  }, [still, n, deleting, chars.length, i, words.length]);

  const shown = still ? words[0] : chars.slice(0, n).join("");
  return (
    <span aria-hidden className="relative inline-grid">
      {/* Reserve the widest word so the line never reflows. */}
      {words.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {w}
        </span>
      ))}
      {/* Centred in the reserved width, so a shorter word sits in the middle of a centred line. */}
      <span className={cn("col-start-1 row-start-1 whitespace-nowrap text-center", className)}>
        {shown}
        {!still ? <span className="tw-caret" /> : null}
      </span>
    </span>
  );
}
