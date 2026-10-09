"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useMotionPaused } from "@/components/motion";
import { useReducedMotion } from "@/components/use-reduced-motion";

/*
 * Case-study tile art in the spirit of a mosaic grid: a bold brand-colour backdrop with ONE large
 * element of the project, often bleeding off an edge, cycling through 2–3 compositions.
 * Every element is Muskan's real screen at its true aspect ratio (never stretched), or a faithful
 * code rebuild where the source is too small to stay sharp. Gusto is recreated wireframes only.
 */

// kind: how a screen is presented. phone = slim phone outline, panel/browser = whole screen kept intact, art = full-width illustration.
type Frame = { src?: string; w?: number; h?: number; node?: ReactNode; alt: string; kind?: "phone" | "panel" | "browser" | "art" };

const BG: Record<string, [string, string]> = {
  "ai-mentor": ["#4330b8", "#1b1252"],
  "builder-design-system": ["#2b2440", "#0d0b16"],
  "builder-university": ["#17706a", "#073330"],
  "ratings-reviews": ["#d23a42", "#6a1016"],
  "studio-store": ["#cfc4f0", "#a798d6"],
  internshala: ["#0d86d1", "#04395e"],
  "swiping-loop": ["#c69d8d", "#c69d8d"],
  basecamp: ["#f3cd47", "#cf9e14"],
  gusto: ["#f3a68d", "#c7573f"],
};

const f = (slug: string, n: number, w: number, h: number, alt: string, kind?: Frame["kind"]): Frame => ({ src: `/work/${slug}/frame-${n}.webp`, w, h, alt, kind });

/* ---------- faithful code rebuilds ---------- */

function InternshalaJob() {
  return (
    <div className="w-[78cqw] rounded-[10px] bg-white p-[5cqw] text-[3.2cqw] leading-[1.45] text-[#333] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]">
      <p className="text-[4.4cqw] font-medium text-[#222]">Product Designer Intern</p>
      <p className="mt-[2.5cqw] flex items-center justify-between">
        <span className="font-medium">Unacademy</span>
        <span className="text-[#006da8]">Website</span>
      </p>
      <p className="mt-[2.5cqw] text-[#555]">Unacademy opens it&rsquo;s doors for this year&rsquo;s summer internship program for talented freshers.</p>
      <div className="mt-[4cqw] grid grid-cols-4 gap-[1.5cqw]">
        {[["Internship", "Type"], ["On-site", "Mode"], ["30K/mo", "Stipend"], ["3 months", "Duration"]].map(([a, b]) => (
          <p key={b}>
            <span className="block font-medium">{a}</span>
            <span className="block text-[#666]">{b}</span>
          </p>
        ))}
      </div>
      <p className="mt-[4cqw] flex items-center justify-between">
        <span className="rounded-full bg-[#e9f7ee] px-[2cqw] py-[0.6cqw] text-[#156b39]">1 week ago</span>
        <span className="text-[#006da8]">Details</span>
      </p>
    </div>
  );
}

function InternshalaSearch() {
  return (
    <div className="flex w-[84cqw] flex-col gap-[3cqw]">
      <div className="flex items-center gap-[2cqw] rounded-[10px] bg-white px-[4cqw] py-[3cqw] text-[3.6cqw] text-[#454952] shadow-[0_24px_50px_-25px_rgba(0,0,0,0.6)]">
        <span aria-hidden className="text-[#333]">⌕</span> Find Jobs and Internships…
      </div>
      <div className="flex flex-wrap gap-[2cqw] text-[3.4cqw] text-[#333]">
        {["Preferences", "Role", "Location", "Type"].map((c) => (
          <span key={c} className="rounded-full bg-white px-[3.2cqw] py-[1.4cqw] shadow-[0_12px_24px_-14px_rgba(0,0,0,0.5)]">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function LeecoTone() {
  return (
    <div className="w-[48cqw] rounded-[10px] bg-[#22232a] p-[5cqw] text-white shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)]">
      <p className="text-[4.6cqw] font-semibold">Leeco&rsquo;s Tone</p>
      <div className="my-[3cqw] h-px bg-white/15" />
      {["Friendly", "Professional", "Casual", "Strict"].map((t, i) => (
        <p key={t} className="flex items-center gap-[2.4cqw] py-[1.8cqw] text-[4cqw]">
          <span className={`inline-block size-[3.4cqw] rounded-full border-[0.9cqw] ${i === 0 ? "border-[#7b6cff] bg-white" : "border-white/40"}`} />
          {t}
        </p>
      ))}
    </div>
  );
}

/* Gusto: the signup screens rebuilt from scratch in code (no logo file, illustration, photo or source image).
   "gusto" is plain text in the site's own type. Labelled on the site as a walkthrough on request. */
const CORAL = "#c4432d";

function Option({ label, on }: { label: string; on?: boolean }) {
  return (
    <span className={`relative flex items-center rounded-[0.8em] border bg-white px-[1em] py-[0.75em] text-[#2b2b2b] ${on ? "border-[#2b6f6a] shadow-[inset_0_0_0_1px_#2b6f6a]" : "border-[#cfd6d6]"}`}>
      {label}
      {on && <span aria-hidden className="ml-auto text-[#2b6f6a]">✓</span>}
    </span>
  );
}

function GustoQuestion({ big }: { big?: boolean }) {
  return (
    <div className={`flex flex-col gap-[0.7em] ${big ? "text-[3.6cqw]" : "text-[1.9cqw]"}`}>
      <p className="font-serif text-[1.55em] leading-[1.15] text-[#1f1f1f]">Who do you plan to pay with Gusto?</p>
      <p className="text-[0.85em] text-[#555]">Select all that apply.</p>
      <Option label="Myself" on={big} />
      <Option label="W-2 employees" />
      <Option label="Contractors" />
      {!big && (
        <>
          <p className="mt-[0.6em] font-serif text-[1.55em] leading-[1.15] text-[#1f1f1f]">How many states will you be running payroll in?</p>
          <Option label="1 state" />
          <Option label="2 or more states" />
        </>
      )}
    </div>
  );
}

function GustoTablet() {
  return (
    <div className="w-[70cqw] rounded-[3cqw] bg-[#1d1d1f] p-[1.4cqw] shadow-[0_34px_60px_-24px_rgba(0,0,0,0.55)]">
      <div className="overflow-hidden rounded-[1.6cqw] bg-white">
        <div className="flex items-center justify-between border-b border-[#e6e2dc] px-[2.4cqw] py-[1.4cqw] text-[1.7cqw]">
          <span className="font-display text-[2.6cqw] font-semibold tracking-[0.01em]" style={{ color: CORAL }}>gusto</span>
          <span className="rounded-[0.6em] bg-[#f3efe9] px-[0.8em] py-[0.4em] text-[#333]">Create account</span>
        </div>
        <div className="grid grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-[1.4cqw] bg-[#f7f5f2] p-[2.6cqw]">
            <p className="font-serif text-[3.6cqw] leading-[1.1] text-[#1f1f1f]">Learn how Gusto works.</p>
            <p className="text-[1.6cqw] leading-[1.4] text-[#555]">Gusto&rsquo;s all-in-one people platform puts the tools you need to hire, pay, and manage your team at your fingertips.</p>
            {/* Neutral shapes where the original has an illustration. */}
            <div aria-hidden className="mt-[1cqw] grid flex-1 grid-cols-3 items-end gap-[1cqw]">
              <span className="block h-[10cqw] rounded-t-full bg-[#f4b9a8]" />
              <span className="block h-[15cqw] rounded-t-full bg-[#e9d4a3]" />
              <span className="block h-[8cqw] rounded-t-full bg-[#b7d4d0]" />
            </div>
          </div>
          <div className="p-[2.6cqw]">
            <GustoQuestion />
          </div>
        </div>
      </div>
    </div>
  );
}

function GustoPhone() {
  return (
    <div className="w-[34cqw] rounded-[5cqw] bg-[#1d1d1f] p-[1.2cqw] shadow-[0_34px_60px_-22px_rgba(0,0,0,0.6)]">
      <div className="flex aspect-[9/19] flex-col gap-[1.8cqw] overflow-hidden rounded-[4cqw] bg-white px-[2.6cqw] pb-[2.6cqw] pt-[4.6cqw] text-[1.9cqw]">
        <span aria-hidden className="mx-auto -mt-[2.6cqw] mb-[0.4cqw] block h-[2cqw] w-[11cqw] rounded-full bg-[#1d1d1f]" />
        <div className="flex items-center justify-between">
          <span className="font-display text-[3.4cqw] font-semibold tracking-[0.01em]" style={{ color: CORAL }}>gusto</span>
          <span className="rounded-[0.5em] px-[0.8em] py-[0.45em] text-white" style={{ backgroundColor: CORAL }}>How it works</span>
        </div>
        <p className="mt-[1cqw] font-serif text-[4.2cqw] leading-[1.12] text-[#1f1f1f]">Hire, pay, and manage your team all in one place.</p>
        <p className="leading-[1.4] text-[#444]">Put the joy back in running your business.</p>
        <span className="mt-[0.6cqw] rounded-[0.5em] py-[0.8em] text-center text-white" style={{ backgroundColor: CORAL }}>How Gusto works</span>
        <span className="rounded-[0.5em] bg-[#f3efe9] py-[0.8em] text-center text-[#222]">Create account</span>
        {/* Soft colour block where the original has a photo. */}
        <span aria-hidden className="mt-[0.6cqw] block flex-1 rounded-[1.2cqw] bg-[linear-gradient(135deg,#f4c7b8,#e9d4a3)]" />
      </div>
    </div>
  );
}

function GustoDevices() {
  return (
    <div className="relative h-[86cqw] w-[96cqw]">
      <div className="absolute left-0 top-[16cqw] -rotate-[4deg]"><GustoTablet /></div>
      <div className="absolute right-[1cqw] top-[2cqw] rotate-[5deg]"><GustoPhone /></div>
    </div>
  );
}

function GustoQuestionCard() {
  return (
    <div className="w-[76cqw] rounded-[2cqw] bg-white p-[5cqw] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]">
      <GustoQuestion big />
    </div>
  );
}

/* ---------- frames per project ---------- */

const FRAMES: Record<string, Frame[]> = {
  "ai-mentor": [
    f("ai-mentor", 4, 425, 932, "ProPilot's AI mentor panel replying to a learner's question", "panel"),
    { node: <LeecoTone />, alt: "ProPilot's tone picker: Friendly, Professional, Casual or Strict" },
    f("ai-mentor", 6, 376, 1004, "ProPilot explaining a coding problem step by step", "panel"),
  ],
  "ratings-reviews": [
    f("ratings-reviews", 1, 370, 807, "OYO's rate-your-experience screen with star ratings", "phone"),
    f("ratings-reviews", 2, 370, 807, "OYO's cashback reward screen after a review", "phone"),
    f("ratings-reviews", 3, 370, 801, "OYO's write-a-review screen with quick suggestions", "phone"),
  ],
  "builder-design-system": [
    f("builder-design-system", 1, 617, 903, "Spacing and corner radius tokens from the design system"),
    f("builder-design-system", 2, 948, 795, "The design system's foundational colour palette"),
    f("builder-design-system", 3, 667, 795, "Icon set from the design system"),
  ],
  "builder-university": [
    f("builder-university", 1, 698, 476, "Builder University's learning path with course cards", "browser"),
    f("builder-university", 2, 699, 475, "Builder University's course catalogue", "browser"),
  ],
  internshala: [
    { node: <InternshalaJob />, alt: "Redesigned Internshala listing card for a product designer internship" },
    { node: <InternshalaSearch />, alt: "Redesigned Internshala search bar and filter chips" },
  ],
  "studio-store": [
    f("studio-store", 4, 833, 546, "Studio Store's setup guide for new store owners"),
    f("studio-store", 5, 833, 548, "Studio Store's dashboard with sales and email stats"),
    f("studio-store", 6, 833, 504, "Studio Store's customise-your-organisation form"),
  ],
  "swiping-loop": [
    { src: "/work/swiping-loop/illustration.webp", w: 736, h: 387, kind: "art", alt: "Collage illustration of two hands holding phones, each with a pixel heart above it" },
  ],
  basecamp: [
    f("basecamp", 1, 1096, 686, "Redesigned Basecamp landing page hero"),
    f("basecamp", 2, 1065, 1198, "Basecamp integrations section"),
    f("basecamp", 3, 1126, 1750, "Basecamp feature cards section"),
  ],
  gusto: [
    { node: <GustoDevices />, alt: "Gusto signup screens rebuilt in code on a tablet and a phone: the 'Learn how Gusto works' questions and the mobile home page" },
    { node: <GustoQuestionCard />, alt: "Close-up of the question 'Who do you plan to pay with Gusto?' with Myself selected" },
    { node: <div className="mt-[22cqw] origin-top scale-[1.6]"><GustoPhone /></div>, alt: "Gusto's mobile home page with 'How Gusto works' and 'Create account' buttons" },
  ],
};

/** Large, true-ratio placement: tall screens bleed off the bottom, wide ones off the right. */
function FrameView({ fr, eager }: { fr: Frame; eager: boolean }) {
  if (fr.node) return <div className="absolute inset-0 flex items-center justify-center">{fr.node}</div>;
  const ratio = fr.h! / fr.w!;
  const img = (cls: string) => (
    <Image
      src={fr.src!}
      alt=""
      width={fr.w}
      height={fr.h}
      loading={eager ? "eager" : "lazy"}
      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 90vw"
      className={`block h-auto w-full ${cls}`}
    />
  );
  // Whole screens, never cut: sized so the full height (tall) or width (wide) fits inside the tile.
  if (fr.kind === "phone") {
    const w = Math.min(64, 80 / ratio);
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-[6.5cqw] bg-[#121212] p-[1.3cqw] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]" style={{ width: `${w + 2.6}%` }}>
          {img("rounded-[5.4cqw]")}
        </div>
      </div>
    );
  }
  if (fr.kind === "panel") {
    const w = Math.min(70, 84 / ratio);
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="overflow-hidden rounded-[2.4cqw] ring-1 ring-white/25 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]" style={{ width: `${w}%` }}>{img("")}</div>
      </div>
    );
  }
  if (fr.kind === "browser") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[86%] overflow-hidden rounded-[2cqw] bg-white shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]">
          <div aria-hidden className="flex gap-[1cqw] bg-[#ececec] px-[2.2cqw] py-[1.6cqw]">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} className="block size-[1.8cqw] rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
          {img("")}
        </div>
      </div>
    );
  }
  if (fr.kind === "art") {
    return (
      <div className="tile-halftone absolute inset-0 flex items-center justify-center">
        <div className="tile-art-fade w-full">{img("")}</div>
      </div>
    );
  }
  const style: CSSProperties =
    ratio > 1.3
      ? { width: "54%", left: "23%", top: "12%" } // tall: bleed bottom
      : ratio < 0.8
        ? { width: "92%", left: "10%", top: "20%" } // wide: bleed right
        : { width: "78%", left: "11%", top: "13%" }; // squarish: bleed bottom
  return (
    <div className="absolute" style={style}>
      {img("rounded-[8px] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]")}
    </div>
  );
}

export function TileArt({ slug, index = 0, cycle = true }: { slug: string; index?: number; cycle?: boolean }) {
  const frames = FRAMES[slug];
  const [n, setN] = useState(0);
  const [seen, setSeen] = useState(1); // frames mounted so far (later ones load on first use)
  const ref = useRef<HTMLDivElement>(null);
  const paused = useMotionPaused();
  const reduced = useReducedMotion();
  const [g0, g1] = BG[slug];

  useEffect(() => {
    if (!cycle || paused || reduced || frames.length < 2) return;
    let visible = false;
    let timer = 0;
    let start = 0;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!visible || timer || start) return;
      // First time on screen: mount the other frames (they load lazily), then start cycling.
      setSeen(frames.length);
      start = window.setTimeout(() => {
        timer = window.setInterval(() => {
          if (visible && !document.hidden) setN((x) => (x + 1) % frames.length);
        }, 4600);
      }, (index % 3) * 1500 + 2200);
    }, { rootMargin: "100px" });
    if (ref.current) io.observe(ref.current);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
      io.disconnect();
    };
  }, [cycle, paused, reduced, frames.length, index]);

  const shown = reduced || paused ? 0 : n;
  return (
    <div
      ref={ref}
      role="img"
      aria-label={frames[shown].alt}
      className="tile-art absolute inset-0 overflow-hidden"
      style={{ backgroundImage: `radial-gradient(70% 55% at 50% 30%, rgba(255,255,255,0.18), transparent 70%), linear-gradient(180deg, ${g0}, ${g1})` }}
    >
      <div aria-hidden className="tile-grain absolute inset-0" />
      {frames.slice(0, seen).map((fr, i) => (
        <div
          key={i}
          aria-hidden
          className="tile-frame absolute inset-0"
          data-state={i === shown ? "in" : i === (shown - 1 + frames.length) % frames.length ? "out" : "idle"}
        >
          <FrameView fr={fr} eager={i === 0 && index < 3} />
        </div>
      ))}
    </div>
  );
}
