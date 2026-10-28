"use client";

import { useEffect, useState } from "react";

/** The rail's section index: links to each section, the one being read in ink, the rest grey. */
export function RailIndex({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((it) => document.getElementById(it.id)).filter((e): e is HTMLElement => !!e);
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let hit = els[0]?.id;
      for (const el of els) if (el.getBoundingClientRect().top < line) hit = el.id;
      setActive(hit);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav aria-label="Sections">
      <ol className="flex flex-col gap-1.5">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? "location" : undefined}
              className={`block truncate text-[14px] leading-6 transition-colors hover:text-ink ${active === it.id ? "text-ink" : "text-muted"}`}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
