"use client";

import { useState } from "react";
import type { Step } from "@/content/stories/types";
import { Walkthrough } from "./walkthrough";

/** Two or more journeys through one product (e.g. job seeker / employer), each a guided walkthrough. */
export function Paths({ paths }: { paths: { label: string; steps: Step[] }[] }) {
  const [i, setI] = useState(0);
  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Journey" className="flex w-fit flex-wrap gap-1 self-start rounded-full bg-white/10 p-1 ring-1 ring-white/15">
        {paths.map((p, n) => (
          <button
            key={p.label}
            type="button"
            aria-pressed={i === n}
            onClick={() => setI(n)}
            className={`min-h-10 rounded-full px-5 text-[15px] font-medium transition-colors ${i === n ? "bg-white text-[#151412]" : "text-white/80 hover:text-white"}`}
          >
            {p.label}
          </button>
        ))}
      </div>
      {/* A fresh walkthrough per journey, so each starts at its first step. */}
      <Walkthrough key={paths[i].label} steps={paths[i].steps} />
    </div>
  );
}
