"use client";

import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";
import { useReducedMotion } from "@/components/use-reduced-motion";
import { SETTLE, THROW } from "@/components/ui/springs";

/*
 * Draggable Card (Aceternity UI), with Apple's rules for direct manipulation: it stays under the pointer from
 * wherever you grabbed it, tilts with the speed of the drag, and when you let go it carries your velocity home
 * on a gently under-damped spring (a throw earns a little bounce). Grab it mid-flight and it follows you again.
 */
export function DraggableCard({ children, className = "", rest = -2 }: { children: ReactNode; className?: string; rest?: number }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const vx = useVelocity(x);
  const lean = useSpring(useTransform(vx, [-1500, 0, 1500], [rest - 10, rest, rest + 10], { clamp: true }), SETTLE);

  if (reduced) return <figure className={className} style={{ rotate: `${rest}deg` }}>{children}</figure>;

  return (
    <motion.figure
      className={`${className} cursor-grab touch-none active:cursor-grabbing`}
      style={{ x, rotate: lean }}
      drag
      dragSnapToOrigin
      dragElastic={0.35}
      dragTransition={{ bounceStiffness: THROW.stiffness, bounceDamping: THROW.damping }}
      whileDrag={{ scale: 1.03 }}
      transition={SETTLE}
    >
      {children}
    </motion.figure>
  );
}
