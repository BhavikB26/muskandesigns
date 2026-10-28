"use client";

import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { useMotionPaused } from "@/components/motion";

/**
 * Wraps a thumbnail and sets data-play while it is on screen and motion is allowed. The thumbnail CSS only
 * animates under [data-play], so each loop starts fresh as a tile scrolls in, and stops (showing its finished
 * state) when it leaves or the visitor pauses motion.
 */
export function ThumbPlay({ children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useMotionPaused();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-thumb="" data-play={inView && !paused ? "" : undefined} {...rest}>
      {children}
    </div>
  );
}
