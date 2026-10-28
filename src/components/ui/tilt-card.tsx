"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/components/use-reduced-motion";
import { SETTLE } from "@/components/ui/springs";

/*
 * 3D Card Effect (Aceternity UI), quieted: the tile leans a few degrees toward the pointer, with a soft glare
 * under it. Tilt runs through a critically damped spring from wherever the tile is now, so moving in, out
 * and back never jumps. Mouse/pen only; off with reduced motion.
 */
export function TiltCard({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  const rx = useSpring(0, SETTLE);
  const ry = useSpring(0, SETTLE);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useSpring(0, SETTLE);
  const background = useMotionTemplate`radial-gradient(40% 50% at ${gx}% ${gy}%, rgba(255,255,255,0.35), transparent 70%)`;

  const move = (e: React.PointerEvent) => {
    if (reduced || e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 6);
    rx.set((0.5 - py) * 5);
    gx.set(px * 100);
    gy.set(py * 100);
    glare.set(1);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
    glare.set(0);
  };

  return (
    <motion.li ref={ref} className={className} style={{ ...style, rotateX: rx, rotateY: ry, transformPerspective: 1200 }} onPointerMove={move} onPointerLeave={leave}>
      {children}
      <motion.span aria-hidden className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] mix-blend-soft-light" style={{ background, opacity: glare }} />
    </motion.li>
  );
}
