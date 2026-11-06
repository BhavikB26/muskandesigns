"use client";

import { useId, useState } from "react";
import type { Shot } from "@/content/case-studies";
import { Board, Browser } from "@/components/case/showcase";
import { WarpBackground } from "@/components/ui/warp-background";

/** Boards behind tabs (e.g. BLOCK's foundations): one visible at a time, keyboard-operable as a tablist. */
export function MediaTabs({ items, caption, frame = "board" }: { items: { label: string; shot: Shot }[]; caption?: string; frame?: "board" | "browser" }) {
  const [i, setI] = useState(0);
  const id = useId();
  const move = (d: number) => setI((x) => (x + d + items.length) % items.length);
  return (
    <figure data-reveal className="flex flex-col gap-fr-sm">
      <div
        role="tablist"
        aria-label={caption ?? "Boards"}
        className="flex w-fit max-w-full flex-wrap gap-1 self-start rounded-[22px] bg-surface-1 p-1 ring-1 ring-line"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
      >
        {items.map((it, n) => (
          <button
            key={it.label}
            role="tab"
            id={`${id}-t${n}`}
            aria-selected={i === n}
            aria-controls={`${id}-p`}
            tabIndex={i === n ? 0 : -1}
            onClick={() => setI(n)}
            className={`min-h-9 rounded-full px-4 text-[14px] font-medium transition-colors ${i === n ? "bg-ink text-background" : "text-ink-soft hover:text-ink"}`}
          >
            {it.label}
          </button>
        ))}
      </div>
      <WarpBackground className="gem-panel gem-tile px-[clamp(20px,6vw,88px)] py-[clamp(28px,6vw,80px)]">
        <div role="tabpanel" id={`${id}-p`} aria-labelledby={`${id}-t${i}`}>
          {frame === "browser" ? (
            // A web screen in a browser window, shown whole at its true ratio.
            <div key={items[i].shot.src} className="mx-auto w-full max-w-[1000px] shadow-[0_28px_60px_-28px_rgba(15,10,35,0.55)]">
              <Browser s={items[i].shot} sizes="(min-width: 1024px) 70vw, 92vw" />
            </div>
          ) : (
            <Board key={items[i].shot.src} s={items[i].shot} />
          )}
        </div>
      </WarpBackground>
      {caption && <figcaption className="t-body-sm px-1 text-muted">{caption}</figcaption>}
    </figure>
  );
}
