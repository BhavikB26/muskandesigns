"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/components/use-reduced-motion";
import { SETTLE } from "@/components/ui/springs";

/*
 * Container Scroll Animation (Aceternity UI): the panel starts tipped back in perspective and settles flat as
 * it scrolls up into place. Scroll-linked, so it always reflects where the reader is; smoothed with a
 * critically damped spring so it never overshoots. Holds flat with reduced motion.
 */
export function ContainerScroll({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 25%"] });
  const p = useSpring(scrollYProgress, SETTLE);
  const rotateX = useTransform(p, [0, 1], [16, 0]);
  const scale = useTransform(p, [0, 1], [0.94, 1]);
  const y = useTransform(p, [0, 1], [40, 0]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1400 }}>
      <motion.div style={reduced ? undefined : { rotateX, scale, y, transformOrigin: "50% 100%" }}>{children}</motion.div>
    </div>
  );
}
