"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, ViewTransition } from "react";
import type { Project } from "@/content/projects";

type View = "grid" | "index";

const num = (i: number) => String(i + 1).padStart(2, "0");

function year(p: Project) {
  const m = p.meta.timeline?.match(/(20\d\d)(?!.*20\d\d)/);
  return m ? m[1] : undefined;
}

function kind(p: Project) {
  return p.tag === "Concept" ? p.meta.type : "Case study";
}

/* ---------- Grid view: consistent 4:3 thumbnails, tilt + cursor label on hover, lift on focus ---------- */

function GridCard({ p, i, shown }: { p: Project; i: number; shown: boolean }) {
  const meta = [p.meta.role, p.meta.company, year(p)].filter(Boolean).join(" · ");
  const frame = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  const canMove = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    document.documentElement.dataset.motion !== "paused";

  return (
    <li
      data-reveal
      {...(shown ? { "data-revealed": "" } : {})}
      className="group relative flex flex-col gap-5"
      onPointerMove={(e) => {
        const f = frame.current;
        if (!f || !canMove()) return;
        const r = f.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        f.style.transform = `perspective(1100px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-4px)`;
        if (label.current) {
          label.current.style.opacity = "1";
          label.current.style.transform = `translate3d(${e.clientX - r.left + 16}px, ${e.clientY - r.top + 16}px, 0)`;
        }
      }}
      onPointerLeave={() => {
        if (frame.current) frame.current.style.transform = "";
        if (label.current) label.current.style.opacity = "0";
      }}
    >
      <div
        ref={frame}
        className="relative aspect-[4/3] overflow-hidden rounded-[20px] ring-1 ring-line transition-transform duration-700 ease-[var(--ease-out-expo)] will-change-transform group-has-[a:focus-visible]:-translate-y-1"
        style={{ backgroundColor: p.tint }}
      >
        <div data-parallax className="absolute inset-x-0 -inset-y-[5%]">
          <ViewTransition name={`thumb-${p.slug}`} share="morph" default="none">
          <Image
            src={`/work/${p.slug}/thumb.webp`}
            alt=""
            fill
            sizes="(min-width: 1280px) 44vw, (min-width: 768px) 46vw, 92vw"
            preload={i < 2}
            className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.045] group-has-[a:focus-visible]:scale-[1.045]"
          />
          </ViewTransition>
        </div>
        <span className="label-mono absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[#151412] backdrop-blur">
          {kind(p)}
        </span>
        {/* Cursor-following label (decorative; the real cursor stays visible). */}
        <span
          ref={label}
          aria-hidden
          className="label-mono pointer-events-none absolute left-0 top-0 rounded-full bg-[#151412] px-3 py-2 text-white opacity-0 transition-opacity duration-300"
        >
          View case study ↗
        </span>
      </div>
      <div className="flex flex-col gap-2 px-1">
        <p className="label-mono flex gap-3 text-muted">
          <span className="text-accent">{num(i)}</span>
          <span>{meta}</span>
        </p>
        <h3 className="font-display text-[clamp(1.5rem,1.15rem+1vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
          {/* One link per card; its ::after makes the whole card clickable. */}
          <Link
            href={`/work/${p.slug}`}
            className="outline-none after:absolute after:inset-0 after:rounded-[20px] after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-[var(--color-accent)]"
          >
            {p.name}
            <span aria-hidden className="ml-2 inline-block text-accent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 group-has-[a:focus-visible]:translate-x-1.5">
              →
            </span>
          </Link>
        </h3>
        <p className="max-w-[48ch] text-[clamp(0.98rem,0.95rem+0.2vw,1.1rem)] leading-[1.55] text-ink-soft">{p.tagline}</p>
      </div>
    </li>
  );
}

/* ---------- Index view: precise list, floating preview on hover or focus ---------- */

function IndexList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const current = active !== null ? projects[active] : null;

  return (
    <div className="relative">
      <ul
        className="border-b border-line"
        onPointerMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
        onPointerLeave={() => {
          setActive(null);
          setPos(null);
        }}
      >
        {projects.map((p, i) => (
          <li key={p.slug} className="border-t border-line">
            <Link
              href={`/work/${p.slug}`}
              onPointerEnter={() => setActive(i)}
              onFocus={(e) => {
                setActive(i);
                const r = e.currentTarget.getBoundingClientRect();
                setPos({ x: r.right - 260, y: r.top + r.height / 2 });
              }}
              onBlur={() => setActive(null)}
              className="group grid min-h-16 grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-1 py-4 transition-colors duration-300 hover:text-accent focus-visible:text-accent md:grid-cols-[3rem_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_4rem] md:py-5"
            >
              <span className="label-mono text-muted group-hover:text-accent group-focus-visible:text-accent">{num(i)}</span>
              <span className="font-display text-[clamp(1.25rem,1rem+1vw,2rem)] font-medium tracking-[-0.02em]">{p.name}</span>
              <span className="label-mono col-start-2 text-muted md:col-start-auto">
                {p.meta.role} · {p.meta.company}
              </span>
              <span className="label-mono hidden text-muted md:block">{kind(p)}</span>
              <span className="label-mono row-start-1 text-right text-muted md:row-start-auto">{year(p) ?? "—"}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Decorative floating preview (desktop pointers, and keyboard focus). */}
      {current && pos && (
        <div
          aria-hidden
          className="pointer-events-none fixed z-30 hidden h-[200px] w-[260px] overflow-hidden rounded-[6px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] ring-1 ring-line md:block"
          style={{ left: pos.x + 24, top: pos.y - 100, backgroundColor: current.tint }}
        >
          <Image
            src={`/work/${current.slug}/thumb.webp`}
            alt=""
            fill
            sizes="260px"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}

export function Work({ projects }: { projects: Project[] }) {
  const [view, setView] = useState<View>("grid");
  // After switching views, re-rendered rows appear immediately (the scroll observer only runs once per page).
  const [switched, setSwitched] = useState(false);

  return (
    <section id="work" aria-labelledby="work-heading" className="w-full scroll-mt-24 px-page pt-24 md:pt-32">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-10 md:gap-14">
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="label-mono text-muted">(01) Work</p>
          </div>
          <h2 id="work-heading" className="font-display text-[clamp(2.6rem,1.4rem+4.4vw,6.5rem)] font-medium leading-[1] tracking-[-0.045em] md:col-span-6">
            Selected <em className="font-serif font-light italic tracking-[-0.02em] text-accent [font-variation-settings:'opsz'_144]">work</em>
          </h2>
          <div className="flex md:col-span-3 md:justify-end" role="group" aria-label="Choose how to view projects">
            {(["grid", "index"] as View[]).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => {
                  setView(v);
                  setSwitched(true);
                }}
                className="label-mono min-h-11 border border-line-strong px-4 text-muted transition-colors first:rounded-l-full last:rounded-r-full hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-background"
              >
                {v === "grid" ? "Grid" : "Index"}
              </button>
            ))}
          </div>
        </div>

        {view === "grid" ? (
          <ul data-reveal-group className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-20">
            {projects.map((p, i) => (
              <GridCard key={p.slug} p={p} i={i} shown={switched} />
            ))}
          </ul>
        ) : (
          <IndexList projects={projects} />
        )}

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
          className="group flex flex-col justify-between gap-10 rounded-[6px] border border-line bg-card p-8 transition-colors duration-500 hover:border-line-strong focus-visible:border-line-strong md:flex-row md:items-end md:p-12"
        >
          <span className="flex flex-col gap-3">
            <span className="label-mono text-accent">Short on time?</span>
            <span className="font-editorial text-[clamp(2rem,1.4rem+2.6vw,4rem)] font-light italic leading-[1.02]">
              Read the one-page version
            </span>
          </span>
          <span className="label-mono flex items-center gap-2 text-muted group-hover:text-ink group-focus-visible:text-ink">
            Resume · PDF <span aria-hidden className="text-[18px] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </span>
        </a>
      </div>
    </section>
  );
}
