"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/content/projects";

type View = "feature" | "index";

const num = (i: number) => String(i + 1).padStart(2, "0");

function year(p: Project) {
  const m = p.meta.timeline?.match(/(20\d\d)(?!.*20\d\d)/);
  return m ? m[1] : undefined;
}

function kind(p: Project) {
  return p.tag === "Concept" ? p.meta.type : "Case study";
}

/* ---------- Feature view: full-width images, Pear-style reveals, Inkwell labels ---------- */

function FeatureRow({ p, i, shown }: { p: Project; i: number; shown: boolean }) {
  const meta = [p.meta.role, p.meta.company, year(p)].filter(Boolean).join(" · ");
  return (
    <li data-reveal {...(shown ? { "data-revealed": "" } : {})} className="group relative grid grid-cols-1 gap-5 border-t border-line pt-4 md:grid-cols-12 md:gap-x-6 md:pt-5">
      <div className="flex flex-col gap-2 md:col-span-3">
        <p className="label-mono text-accent">{num(i)}</p>
        <p className="label-mono text-muted">{kind(p)}</p>
        <p className="label-mono text-muted">{meta}</p>
      </div>
      <div className="flex flex-col gap-5 md:col-span-9">
        <h3 className="font-display text-[clamp(2rem,1.2rem+3vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.035em]">
          {/* One link per project; its ::after makes the whole row clickable. */}
          <Link
            href={`/work/${p.slug}`}
            className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-[var(--color-accent)]"
          >
            {p.name}
            <span aria-hidden className="ml-3 inline-block text-accent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2 group-has-[a:focus-visible]:translate-x-2">
              →
            </span>
          </Link>
        </h3>
        <p className="max-w-[52ch] text-[clamp(1rem,0.95rem+0.3vw,1.2rem)] leading-[1.55] text-ink-soft">{p.tagline}</p>
        <div
          className="reveal-media relative aspect-[16/10] overflow-hidden rounded-[6px] md:aspect-[16/8]"
          style={{ backgroundColor: p.tint }}
        >
          <div data-parallax className="absolute inset-x-0 -inset-y-[7%]">
          <Image
            src={p.cover.src}
            alt=""
            fill
            sizes="(min-width: 768px) 72vw, 92vw"
            preload={i === 0}
            className={`${p.coverFit === "contain" ? "object-contain p-8" : "object-cover"} transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.035] group-has-[a:focus-visible]:scale-[1.035]`}
          />
          </div>
        </div>
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
            src={current.cover.src}
            alt=""
            fill
            sizes="260px"
            className={current.coverFit === "contain" ? "object-contain p-3" : "object-cover"}
          />
        </div>
      )}
    </div>
  );
}

export function Work({ projects }: { projects: Project[] }) {
  const [view, setView] = useState<View>("feature");
  // After switching views, re-rendered rows appear immediately (the scroll observer only runs once per page).
  const [switched, setSwitched] = useState(false);

  return (
    <section id="work" aria-labelledby="work-heading" className="w-full scroll-mt-24 px-page pt-24 md:pt-32">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-10 md:gap-14">
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="label-mono text-muted">(01) Work</p>
          </div>
          <h2 id="work-heading" className="font-editorial text-[clamp(2.6rem,1.4rem+4.4vw,6.5rem)] font-light italic leading-[0.95] tracking-[-0.02em] md:col-span-6">
            Selected work
          </h2>
          <div className="flex md:col-span-3 md:justify-end" role="group" aria-label="Choose how to view projects">
            {(["feature", "index"] as View[]).map((v) => (
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
                {v === "feature" ? "Feature" : "Index"}
              </button>
            ))}
          </div>
        </div>

        {view === "feature" ? (
          <ul className="flex flex-col gap-20 md:gap-28">
            {projects.map((p, i) => (
              <FeatureRow key={p.slug} p={p} i={i} shown={switched} />
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
