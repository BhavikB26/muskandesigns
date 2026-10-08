"use client";

import { useEffect, useState } from "react";

function currentMonthLabel() {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return `${month} ’${String(now.getFullYear()).slice(-2)}`;
}

/** "What I'm up to" card from the live site, restyled. */
export function NowCard() {
  const [open, setOpen] = useState(true);
  // Set on the client so a statically built page never shows a stale month.
  const [date, setDate] = useState<string | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDate(currentMonthLabel());
  }, []);

  return (
    <div className="w-full rounded-[20px] border border-line bg-card/80 p-5 text-left backdrop-blur">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-6 w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-[15px] font-semibold text-ink">What I&rsquo;m up to</span>
        <span className="flex items-center gap-3">
          <span className="label-mono text-muted">{date}</span>
          <span aria-hidden className={`text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
            ⌄
          </span>
        </span>
      </button>
      {open && (
        <div className="flex flex-col gap-1 pt-3 text-[15px] leading-[1.55] text-ink-soft">
          <p>
            Bringing <span className="font-semibold text-ink">design + engineering</span> closer.
          </p>
          <p>Dedicated to accessibility and inclusive design.</p>
        </div>
      )}
    </div>
  );
}
