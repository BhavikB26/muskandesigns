"use client";

import { useEffect, useState } from "react";

const GREETINGS = [
  { text: "Hello", lang: "en" },
  { text: "Hola", lang: "es" },
  { text: "Bonjour", lang: "fr" },
  { text: "नमस्ते", lang: "hi" },
  { text: "你好", lang: "zh" },
  { text: "こんにちは", lang: "ja" },
  { text: "Olá", lang: "pt" },
  { text: "Ciao", lang: "it" },
];

const HOLD_MS = 2000;
const ROLL_MS = 500;

/** "Hello" in several languages, rolling upward one at a time. */
export function RollingHello() {
  // Index into GREETINGS plus a copy of the first item, so the loop wraps seamlessly.
  const [i, setI] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (document.hidden) return; // pause while the tab is in the background
      setAnimate(true);
      setI((n) => n + 1);
    }, HOLD_MS + ROLL_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  // After rolling onto the duplicate first item, jump back to the real one without animating.
  useEffect(() => {
    if (i !== GREETINGS.length) return;
    const t = window.setTimeout(() => {
      setAnimate(false);
      setI(0);
    }, ROLL_MS);
    return () => window.clearTimeout(t);
  }, [i]);

  const items = [...GREETINGS, GREETINGS[0]];

  return (
    <span className="relative inline-block h-[1.25em] overflow-hidden align-bottom">
      <span className="sr-only">Hello,</span>
      <span
        aria-hidden
        className="flex flex-col"
        style={{
          transform: `translateY(-${(reduced ? 0 : i) * 1.25}em)`,
          transition: animate && !reduced ? `transform ${ROLL_MS}ms cubic-bezier(0.33, 1, 0.68, 1)` : "none",
        }}
      >
        {items.map((g, n) => (
          <span
            key={n}
            lang={g.lang}
            className="block h-[1.25em] whitespace-nowrap leading-[1.25em]"
            style={{
              opacity: reduced || n === i ? 1 : 0,
              // Only the outgoing word fades; the incoming one slides in fully visible.
              transition: animate && !reduced && n !== i ? `opacity ${ROLL_MS}ms ease-out` : "none",
            }}
          >
            {g.text},
          </span>
        ))}
      </span>
    </span>
  );
}
