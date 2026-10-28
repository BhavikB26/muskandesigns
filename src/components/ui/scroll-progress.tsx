"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Scroll Progress (Magic UI, via 21st.dev): a hairline across the top that fills as you read, in the case study's gem. */
export function ScrollProgress({ color }: { color: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left" style={{ scaleX, background: color }} />;
}
