"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/*
 * Warp Background (Magic UI, 21st.dev): a grid drawn on the four walls of a tunnel in perspective, with beams
 * of light rushing along it, behind the content.
 *
 * Local changes: pages have up to twenty of these, so the beams are CSS animations rather than a motion
 * component each, and run only while the panel is on screen; beams come from a fixed pattern instead of
 * Math.random (the server and browser would otherwise disagree); grid and beams take the case study's gem
 * colour (--gem); they stop for reduced or paused motion (.warp in globals.css).
 */

type Side = "top" | "bottom" | "left" | "right";
const SIDES: Side[] = ["top", "right", "bottom", "left"];
const PER_SIDE = 3;

/** Where along a wall each beam runs, its head start and its length: spread out, and differing by wall. */
function beam(side: number, i: number) {
  const n = side * PER_SIDE + i;
  return {
    "--x": `${((i * 6 + side * 2 + 1) % 20) * 5}%`,
    "--ratio": 3 + ((n * 7) % 8),
    animationDelay: `${-((n * 1.37) % 4)}s`,
  } as CSSProperties;
}

export function WarpBackground({ children, className = "", innerClassName = "" }: { children: ReactNode; className?: string; innerClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Beams run only while the panel is in view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.dataset.on = "";
      else delete el.dataset.on;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`warp ${className}`}>
      <div aria-hidden className="warp__tunnel">
        {SIDES.map((side, s) => (
          <div key={side} className={`warp__wall warp__wall--${side}`}>
            {Array.from({ length: PER_SIDE }, (_, i) => (
              <span key={i} className="warp__beam" style={beam(s, i)} />
            ))}
          </div>
        ))}
      </div>
      <div className={`relative z-[1] ${innerClassName}`}>{children}</div>
    </div>
  );
}
