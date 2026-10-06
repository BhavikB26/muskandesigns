"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/content/case-studies";

export function CaseStudiesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 hover:text-ink"
        aria-expanded={open}
      >
        Case studies
        <img
          src="/home/icon-nav-chevron.svg"
          alt=""
          className={`h-1.5 w-3 object-contain transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-4 w-[320px] -translate-x-1/2 overflow-hidden rounded-b-2xl bg-white shadow-[0px_10px_30px_-5px_rgba(0,0,0,0.15)]">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              onClick={() => setOpen(false)}
              className="block border-b border-black/[0.08] px-6 py-4 text-base text-ink-soft hover:bg-black/[0.02] hover:text-ink"
            >
              {study.navLabel}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
