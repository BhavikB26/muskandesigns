"use client";

import Image from "next/image";
import { useState } from "react";
import type { Step } from "@/content/stories/types";
import { Laptop, Phone } from "@/components/case/showcase";

/*
 * A guided walkthrough of a real flow: the steps in order on one side, the actual screen for the current step on
 * the other. Arrow keys move between steps; every screen is a final design or a recording of the shipped product.
 */
function Screen({ s }: { s: Step }) {
  if (s.frame === "phone")
    return (
      <div className="mx-auto w-[min(300px,70vw)]">
        <Phone s={s.shot} sizes="300px" />
      </div>
    );
  if (s.frame === "laptop") return <Laptop s={s.shot} scroll={false} className="w-full" />;
  if (s.frame === "device")
    // A finished mockup with its own frame: shown whole at a comfortable height.
    return (
      <div className="mx-auto" style={{ width: `min(100%, ${Math.round((560 * s.shot.w) / s.shot.h)}px)` }}>
        <Image src={s.shot.src} alt={s.shot.alt} width={s.shot.w} height={s.shot.h} sizes="(min-width: 1024px) 40vw, 80vw" className="block h-auto w-full drop-shadow-[0_24px_30px_rgba(0,0,0,0.45)]" />
      </div>
    );
  // Tall pages scroll inside their card rather than stretching the stage.
  const tall = s.shot.h / s.shot.w > 0.9;
  return (
    <div className={`mx-auto overflow-hidden rounded-[16px] bg-white ring-1 ring-white/15 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] ${s.frame === "panel" ? "max-w-[340px]" : ""}`}>
      <div className={tall && s.frame !== "panel" ? "max-h-[min(640px,70vh)] overflow-y-auto overscroll-contain" : ""} tabIndex={tall ? 0 : undefined} aria-label={tall ? `${s.shot.alt} (scrolls)` : undefined}>
        <Image src={s.shot.src} alt={s.shot.alt} width={s.shot.w} height={s.shot.h} sizes="(min-width: 1024px) 60vw, 92vw" className="block h-auto w-full" />
      </div>
    </div>
  );
}

export function Walkthrough({ steps }: { steps: Step[] }) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((x) => Math.min(steps.length - 1, Math.max(0, x + d)));
  return (
    <div
      className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12"
      onKeyDown={(e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowRight") go(1);
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") go(-1);
      }}
    >
      <ol className="flex flex-col gap-2" aria-label="Steps">
        {steps.map((s, n) => (
          <li key={s.title}>
            <button
              type="button"
              aria-current={i === n ? "step" : undefined}
              onClick={() => setI(n)}
              className={`flex w-full flex-col gap-1 rounded-[16px] p-4 text-left ring-1 transition-colors ${i === n ? "bg-white/10 ring-white/30" : "ring-transparent hover:bg-white/5"}`}
            >
              <span className="flex items-baseline gap-3 text-[16px] font-medium text-white">
                <span className="tabular-nums" style={{ color: "color-mix(in oklab, var(--gem) 55%, white)" }}>
                  {String(n + 1).padStart(2, "0")}
                </span>
                {s.title}
              </span>
              {i === n && <span className="pl-8 text-[14.5px] leading-[1.55] text-white/75">{s.body}</span>}
            </button>
          </li>
        ))}
      </ol>
      <div className="flex min-w-0 flex-col gap-5">
        <div aria-live="polite" className="min-w-0">
          <Screen key={steps[i].shot.src} s={steps[i]} />
        </div>
        <div className="flex items-center justify-between gap-3">
          <button type="button" onClick={() => go(-1)} disabled={i === 0} className="min-h-10 rounded-full px-4 text-[14px] font-medium text-white ring-1 ring-white/25 hover:bg-white/10 disabled:opacity-40">
            <span aria-hidden>←</span> Back
          </button>
          <span className="text-[14px] tabular-nums text-white/60">
            {i + 1} of {steps.length}
          </span>
          <button type="button" onClick={() => go(1)} disabled={i === steps.length - 1} className="min-h-10 rounded-full bg-white px-4 text-[14px] font-medium text-[#151412] hover:bg-white/90 disabled:opacity-40">
            Next <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
