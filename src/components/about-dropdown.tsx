"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const items = [
  { label: "My Story", href: "/#about", icon: null },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/thisismuskan/",
    icon: "/home/icon-linkedin.svg",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_muskanb07_/",
    icon: "/home/icon-instagram.svg",
  },
];

export function AboutDropdown() {
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
        About
        <img
          src="/home/icon-nav-chevron.svg"
          alt=""
          className={`h-1.5 w-3 object-contain transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-4 w-[220px] -translate-x-1/2 overflow-hidden rounded-b-2xl bg-white shadow-[0px_10px_30px_-5px_rgba(0,0,0,0.15)]">
          {items.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 border-b border-black/[0.08] px-6 py-4 text-base text-ink-soft last:border-b-0 hover:bg-black/[0.02] hover:text-ink"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 border-b border-black/[0.08] px-6 py-4 text-base text-ink-soft last:border-b-0 hover:bg-black/[0.02] hover:text-ink"
              >
                {item.icon && (
                  <img src={item.icon} alt="" className="size-4 object-contain" />
                )}
                {item.label}
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
}
