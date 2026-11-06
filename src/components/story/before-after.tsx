"use client";

import Image from "next/image";
import { useState } from "react";
import type { Shot } from "@/content/case-studies";

/** Before and after at the same size, split by a draggable handle (a range input, so it works by keyboard too). */
export function BeforeAfter({ before, after, labels, frame = "plain" }: { before: Shot; after: Shot; labels: [string, string]; frame?: "laptop" | "plain" }) {
  const [p, setP] = useState(50);
  const ratio = `${after.w} / ${after.h}`;
  return (
    <div className="flex flex-col gap-4">
      <div className={`relative mx-auto w-full max-w-[1000px] select-none overflow-hidden bg-white ring-1 ring-white/15 ${frame === "laptop" ? "rounded-[14px]" : "rounded-[18px]"}`} style={{ aspectRatio: ratio }}>
        <Image src={after.src} alt={after.alt} fill sizes="(min-width: 1024px) 1000px, 92vw" className="object-cover object-top" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - p}% 0 0)` }}>
          <Image src={before.src} alt={before.alt} fill sizes="(min-width: 1024px) 1000px, 92vw" className="object-cover object-top" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]" style={{ left: `${p}%` }}>
          <span className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#151412] shadow-lg">↔</span>
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[13px] font-medium text-white">{labels[0]}</span>
        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[13px] font-medium text-white">{labels[1]}</span>
        <input type="range" min={0} max={100} value={p} onChange={(e) => setP(Number(e.target.value))} aria-label={`Compare ${labels[0]} and ${labels[1]}`} className="absolute inset-0 size-full cursor-ew-resize opacity-0" />
      </div>
    </div>
  );
}
