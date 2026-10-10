"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMotionPaused } from "@/components/motion";

type Screen = { src: string; width: number; height: number; alt: string };

/**
 * A click-through prototype: one laptop screen per step with that step's text beside it.
 * It advances on its own while in view (every few seconds) until the visitor picks a step;
 * Pause motion and reduced-motion keep it still.
 */
export function LaptopFlow({ screens, panels, labels }: { screens: Screen[]; panels: ReactNode[]; labels: string[] }) {
  const [step, setStep] = useState(0);
  const [manual, setManual] = useState(false);
  const paused = useMotionPaused();
  const root = useRef<HTMLDivElement>(null);
  const n = screens.length;

  useEffect(() => {
    if (manual || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.5 });
    if (root.current) io.observe(root.current);
    const t = window.setInterval(() => visible && setStep((s) => (s + 1) % n), 5200);
    return () => {
      io.disconnect();
      window.clearInterval(t);
    };
  }, [manual, paused, n]);

  const go = (i: number) => {
    setManual(true);
    setStep((i + n) % n);
  };

  return (
    <div ref={root} className="grid grid-cols-1 items-center gap-fr-xl md:grid-cols-12 md:gap-x-fr-xxl">
      <div className="md:col-span-5">
        {panels.map((p, i) => (
          <div key={i} hidden={i !== step} className="laptop-flow-panel">
            {p}
          </div>
        ))}
        <div className="mt-fr-xl flex flex-wrap items-center gap-fr-xxs" role="group" aria-label="Prototype steps">
          <button type="button" onClick={() => go(step - 1)} className="btn-icon" aria-label="Previous screen">
            <span aria-hidden>←</span>
          </button>
          {labels.map((l, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-current={i === step ? "step" : undefined}
              aria-label={`Screen ${i + 1} of ${n}: ${l}`}
              className="laptop-flow-dot"
            >
              {i + 1}
            </button>
          ))}
          <button type="button" onClick={() => go(step + 1)} className="btn-icon" aria-label="Next screen">
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
      <div className="md:col-span-7">
        <div className="laptop w-full max-w-[860px]">
          <div className="laptop-lid">
            <div className="laptop-screen laptop-screen-flow" style={{ aspectRatio: `${screens[0].width} / ${screens[0].height}` }}>
              {screens.map((s, i) => (
                <Image
                  key={s.src}
                  src={s.src}
                  alt={i === step ? s.alt : ""}
                  aria-hidden={i !== step}
                  width={s.width}
                  height={s.height}
                  sizes="(min-width: 768px) 780px, 88vw"
                  className="laptop-flow-shot"
                  data-on={i === step || undefined}
                />
              ))}
            </div>
          </div>
          <div className="laptop-base" aria-hidden />
        </div>
      </div>
    </div>
  );
}
