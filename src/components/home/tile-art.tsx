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

type Frame = { src?: string; w?: number; h?: number; node?: ReactNode; alt: string };

const BG: Record<string, [string, string]> = {
  "ai-mentor": ["#4330b8", "#1b1252"],
  "builder-design-system": ["#2b2440", "#0d0b16"],
  "builder-university": ["#17706a", "#073330"],
  "ratings-reviews": ["#d23a42", "#6a1016"],
  "studio-store": ["#cfc4f0", "#a798d6"],
  internshala: ["#0d86d1", "#04395e"],
  "swiping-loop": ["#b85c40", "#521f13"],
  basecamp: ["#f3cd47", "#cf9e14"],
  gusto: ["#e7dccb", "#c8b9a1"],
};

const f = (slug: string, n: number, w: number, h: number, alt: string): Frame => ({ src: `/work/${slug}/frame-${n}.webp`, w, h, alt });

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
      <div className="flex items-center gap-[2cqw] rounded-[10px] bg-white px-[4cqw] py-[3cqw] text-[3.6cqw] text-[#5f646d] shadow-[0_24px_50px_-25px_rgba(0,0,0,0.6)]">
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

function Bar({ w, dark }: { w: string; dark?: boolean }) {
  return <span className={`block h-[2.2cqw] rounded-full ${dark ? "bg-[#8f8a82]" : "bg-[#d4d0c9]"}`} style={{ width: w }} />;
}
function GustoForm() {
  return (
    <div className="flex w-[62cqw] flex-col gap-[3cqw] rounded-[10px] bg-[#fafaf9] p-[6cqw] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)]">
      <Bar w="60%" dark />
      {[0, 1, 2].map((k) => (
        <span key={k} className="flex flex-col gap-[1.5cqw]">
          <Bar w="32%" />
          <span className="block h-[7cqw] rounded-[6px] border border-[#c9c5be] bg-white" />
        </span>
      ))}
      <span className="mt-[1.5cqw] block h-[8cqw] rounded-full bg-[#3a3733]" />
    </div>
  );
}
function GustoPicker() {
  return (
    <div className="flex w-[62cqw] flex-col gap-[2.5cqw] rounded-[10px] bg-[#fafaf9] p-[6cqw] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)]">
      <Bar w="66%" dark />
      {[1, 0, 1, 0].map((on, k) => (
        <span key={k} className="flex items-center gap-[2.5cqw] rounded-[8px] border border-[#d4d0c9] p-[2.4cqw]">
          <span className={`block size-[4cqw] rounded-[4px] ${on ? "bg-[#3a3733]" : "border border-[#8f8a82]"}`} />
          <Bar w="60%" />
        </span>
      ))}
    </div>
  );
}
function GustoHome() {
  return (
    <div className="flex w-[70cqw] flex-col gap-[3cqw] rounded-[10px] bg-[#fafaf9] p-[6cqw] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)]">
      <Bar w="30%" />
      <span className="block h-[26cqw] rounded-[8px] bg-[#e3e0da]" />
      <Bar w="85%" dark />
      <Bar w="60%" />
      <div className="mt-[2cqw] flex gap-[2.5cqw]">
        <span className="block h-[8cqw] flex-1 rounded-full bg-[#3a3733]" />
        <span className="block h-[8cqw] flex-1 rounded-full border-2 border-[#8f8a82]" />
      </div>
    </div>
  );
}

/* ---------- frames per project ---------- */

const FRAMES: Record<string, Frame[]> = {
  "ai-mentor": [
    f("ai-mentor", 1, 425, 966, "ProPilot's AI mentor panel replying to a learner's question"),
    { node: <LeecoTone />, alt: "ProPilot's tone picker: Friendly, Professional, Casual or Strict" },
    f("ai-mentor", 2, 464, 1004, "ProPilot explaining a coding problem step by step"),
  ],
  "ratings-reviews": [
    f("ratings-reviews", 1, 370, 807, "OYO's rate-your-experience screen with star ratings"),
    f("ratings-reviews", 2, 370, 807, "OYO's cashback reward screen after a review"),
    f("ratings-reviews", 3, 370, 801, "OYO's write-a-review screen with quick suggestions"),
  ],
  "builder-design-system": [
    f("builder-design-system", 1, 617, 903, "Spacing and corner radius tokens from the design system"),
    f("builder-design-system", 2, 948, 795, "The design system's foundational colour palette"),
    f("builder-design-system", 3, 667, 795, "Icon set from the design system"),
  ],
  "builder-university": [
    f("builder-university", 1, 698, 476, "Builder University's learning path with course cards"),
    f("builder-university", 2, 699, 475, "Builder University's course catalogue"),
    f("builder-university", 3, 740, 522, "Builder University's pilot course page"),
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
    f("swiping-loop", 1, 1240, 1392, "Diagram of the swiping loop on dating apps"),
    f("swiping-loop", 2, 1260, 1137, "Affinity map of research notes"),
    f("swiping-loop", 3, 1138, 569, "The typical dating-app journey"),
  ],
  basecamp: [
    f("basecamp", 1, 1096, 686, "Redesigned Basecamp landing page hero"),
    f("basecamp", 2, 1065, 1198, "Basecamp integrations section"),
    f("basecamp", 3, 1126, 1750, "Basecamp feature cards section"),
  ],
  gusto: [
    { node: <GustoHome />, alt: "Recreated wireframe of a home page with two calls to action" },
    { node: <GustoPicker />, alt: "Recreated wireframe of a feature picker" },
    { node: <GustoForm />, alt: "Recreated wireframe of a short lead form with no password field" },
  ],
};

/** Large, true-ratio placement: tall screens bleed off the bottom, wide ones off the right. */
function FrameView({ fr, eager }: { fr: Frame; eager: boolean }) {
  if (fr.node) return <div className="absolute inset-0 flex items-center justify-center">{fr.node}</div>;
  const ratio = fr.h! / fr.w!;
  const style: CSSProperties =
    ratio > 1.3
      ? { width: "54%", left: "23%", top: "12%" } // tall: bleed bottom
      : ratio < 0.8
        ? { width: "92%", left: "10%", top: "20%" } // wide: bleed right
        : { width: "78%", left: "11%", top: "13%" }; // squarish: bleed bottom
  return (
    <div className="absolute" style={style}>
      <Image
        src={fr.src!}
        alt=""
        width={fr.w}
        height={fr.h}
        loading={eager ? "eager" : "lazy"}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 90vw"
        className="block h-auto w-full rounded-[8px] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]"
      />
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
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    // Mount the next frame early so its image is ready before it slides in.
    const preload = window.setTimeout(() => setSeen(frames.length), 2500);
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        if (!visible || document.hidden) return;
        setN((x) => (x + 1) % frames.length);
      }, 4600);
    }, (index % 3) * 1500 + 600);
    return () => {
      window.clearTimeout(preload);
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
          <FrameView fr={fr} eager={i === 0} />
        </div>
      ))}
    </div>
  );
}
