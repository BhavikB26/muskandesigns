"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/*
 * Number Ticker (Magic UI, via 21st.dev): counts up to its value once it scrolls into view.
 * Renders the final value on the server, so it reads correctly without JavaScript or with reduced motion.
 */
interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  delay?: number;
}

export function NumberTicker({ value, delay = 0, className, ...props }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "paused") return;
    el.textContent = "0";
    const t = setTimeout(() => motionValue.set(value), delay * 1000);
    return () => clearTimeout(t);
  }, [inView, delay, value, motionValue]);

  useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) ref.current.textContent = Intl.NumberFormat("en-US").format(Math.round(latest));
      }),
    [spring],
  );

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)} {...props}>
      {value}
    </span>
  );
}
