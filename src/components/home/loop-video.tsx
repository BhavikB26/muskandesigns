"use client";

import { useEffect, useRef } from "react";
import { useMotionPaused } from "@/components/motion";
import { useReducedMotion } from "@/components/use-reduced-motion";

/**
 * A muted device-scene loop that fades in over the still render and plays only while on screen.
 * With reduced motion or "Pause motion" it never starts, so the tile is just the image.
 */
export function LoopVideo({ base, hover = false }: { base: string; hover?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const paused = useMotionPaused();
  const reduced = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (paused || reduced) {
      v.pause();
      return;
    }
    let visible = false;
    const sync = () => {
      const hovering = !hover || v.closest(".group")?.matches(":hover, :focus-within");
      if (visible && hovering) v.play().catch(() => {});
      else v.pause();
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    }, { threshold: 0.35 });
    io.observe(v);
    const card = v.closest(".group");
    card?.addEventListener("pointerenter", sync);
    card?.addEventListener("pointerleave", sync);
    return () => {
      io.disconnect();
      card?.removeEventListener("pointerenter", sync);
      card?.removeEventListener("pointerleave", sync);
    };
  }, [paused, reduced, hover]);

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      preload="none"
      onPlaying={(e) => (e.currentTarget.style.opacity = "1")}
      className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-700"
    >
      <source src={`${base}/loop.mp4`} type="video/mp4" />
    </video>
  );
}
