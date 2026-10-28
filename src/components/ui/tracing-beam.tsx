"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SETTLE } from "@/components/ui/springs";

/*
 * Tracing Beam (Aceternity UI): a hairline down the left of the story with a glow that travels as you read,
 * in the case study's gem. The glow follows scroll through a critically damped spring. Desktop only;
 * decorative (aria-hidden).
 */
export function TracingBeam({ children, color }: { children: ReactNode; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 40%", "end 60%"] });

  useEffect(() => {
    const el = content.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, h]), SETTLE);
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, Math.max(h - 240, 0)]), SETTLE);
  const dot = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="pointer-events-none absolute -left-12 top-0 hidden h-full w-5 lg:block">
        <motion.span className="absolute left-[3px] top-0 block size-[14px] rounded-full border border-line bg-background" style={{ boxShadow: `0 0 0 4px color-mix(in oklab, ${color} 14%, transparent)` }}>
          <motion.span className="absolute inset-[3px] rounded-full" style={{ background: color, opacity: dot }} />
        </motion.span>
        <svg width="20" height={h} viewBox={`0 0 20 ${h}`} className="absolute left-0 top-[18px] block">
          <path d={`M10 0 V ${h}`} fill="none" stroke="currentColor" className="text-line" strokeWidth="1" />
          <motion.path d={`M10 0 V ${h}`} fill="none" stroke="url(#trace)" strokeWidth="2" strokeLinecap="round" />
          <defs>
            <motion.linearGradient id="trace" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y2} y2={y1}>
              <stop stopColor={color} stopOpacity="0" />
              <stop offset="0.4" stopColor={color} />
              <stop offset="1" stopColor={color} stopOpacity="0.15" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={content}>{children}</div>
    </div>
  );
}
