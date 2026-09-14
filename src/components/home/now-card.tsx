"use client";

import { useEffect, useState } from "react";

function currentMonthLabel() {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = now.getFullYear().toString().slice(-2);
  return `${month} ’${year}`;
}

export function NowCard() {
  const [open, setOpen] = useState(true);
  // Computed client-side only (this page is statically generated, so a
  // build-time date would go stale until the next deploy; deferring to an
  // effect also avoids a hydration mismatch once the month rolls over).
  const [dateLabel, setDateLabel] = useState<string | null>(null);

  useEffect(() => {
    setDateLabel(currentMonthLabel());
  }, []);

  return (
    <div className="w-full rounded-2xl border border-border bg-purple/10 p-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="flex items-center gap-2.5">
          <span className="size-1.5 shrink-0 rounded-full bg-pink" />
          <span className="text-base font-semibold tracking-[0.18px] text-ink">
            What I&rsquo;m up to
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span className="text-[13px] tracking-[0.13px] text-muted">
            {dateLabel}
          </span>
          <img
            src="/home/icon-chevron.svg"
            alt=""
            className={`size-3.5 object-contain transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>
      {open && (
        <div className="flex flex-col gap-1 pt-3 text-left text-base tracking-[0.2px] text-ink-soft">
          <p>
            Bringing{" "}
            <span className="rounded bg-green/40 px-1 font-semibold">
              design + engineering
            </span>{" "}
            closer.
          </p>
          <p>Building AI tools that scale. Learning by shipping.</p>
        </div>
      )}
    </div>
  );
}
