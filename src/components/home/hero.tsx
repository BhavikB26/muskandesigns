"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";
import ElsewhereHero from "@/components/ui/elsewhere-hero";
import { Typewriter } from "@/components/ui/typewriter";
import { useTheme } from "@/components/theme-toggle";
import { useReducedMotion } from "@/components/use-reduced-motion";

/*
 * Home intro: the Elsewhere hero (21st.dev) with Muskan's introduction, and the rest of the homepage coming
 * out of the computer screen in the footage (after Aceternity UI's MacBook Scroll / Container Scroll).
 * The hero stays pinned for one screen of scrolling while:
 * - the copy lifts away and the footage eases toward the computer;
 * - a live miniature of the next section (the case studies) appears inside the screen and grows out of it
 *   until it fills the page; from there the page scrolls normally.
 * It is the real section, scaled and clipped (not a copy), so links and tiles work as soon as it lands.
 * Scroll-linked, so it can be stopped or reversed anywhere. Reduced motion: no pinning, no transition.
 */

// Footage from the component's author, served by 21st.dev's CDN. TODO(before deploy): self-host in /public.
const DAY = "https://cdn.21st.dev/assets/mirror/a6/a639af57ee941fdd518c604efb043501ad0e815dcce9f7efba850998bafa3453.mp4";
const NIGHT = "https://cdn.21st.dev/assets/mirror/4b/4badf32b0bc920a2fd1b066182eee89e98d8615f680e01fb19ff62fb56e86872.mp4";
const VIDEO = { w: 1280, h: 720, posX: 0.42, posY: 0.5 };
// The monitor's glass in the footage, measured corner by corner (fractions of the frame). The CRT is seen
// slightly from the side, so the glass is a skewed quad, not a rectangle: top-left, top-right, bottom-right,
// bottom-left.
const GLASS: [number, number][] = [
  [0.4519, 0.5628],
  [0.5058, 0.5636],
  [0.5008, 0.6487],
  [0.4474, 0.6456],
];
const HEADER = 68;

type Pt = [number, number];

/** The glass corners on screen, given object-fit: cover and the object position. */
function glassQuad(vw: number, vh: number): Pt[] {
  // vw × vh is the hero's own box (the footage covers it), not the window: a classic scrollbar makes the
  // window wider than the video, which would push every point sideways.
  const s = Math.max(vw / VIDEO.w, vh / VIDEO.h);
  const w = VIDEO.w * s;
  const h = VIDEO.h * s;
  const ox = (vw - w) * VIDEO.posX;
  const oy = (vh - h) * VIDEO.posY;
  return GLASS.map(([fx, fy]) => [ox + fx * w, oy + fy * h]);
}

/**
 * The CSS matrix3d that maps the rectangle (0,0)-(w,h) onto a quad (a projective transform, solved from the
 * four corner pairs). This is what lets the page sit exactly in the tilted monitor glass.
 */
function quadMatrix(w: number, h: number, q: Pt[]) {
  const src: Pt[] = [
    [0, 0],
    [w, 0],
    [w, h],
    [0, h],
  ];
  const A: number[][] = [];
  const B: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const [X, Y] = q[i];
    A.push([x, y, 1, 0, 0, 0, -x * X, -y * X]);
    B.push(X);
    A.push([0, 0, 0, x, y, 1, -x * Y, -y * Y]);
    B.push(Y);
  }
  // Gaussian elimination
  for (let c = 0; c < 8; c++) {
    let p = c;
    for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]];
    [B[c], B[p]] = [B[p], B[c]];
    for (let r = 0; r < 8; r++) {
      if (r === c) continue;
      const k = A[r][c] / A[c][c];
      for (let j = c; j < 8; j++) A[r][j] -= k * A[c][j];
      B[r] -= k * B[c];
    }
  }
  const [a, b, c, d, e, f, g, hh] = B.map((v, i) => v / A[i][i]);
  return `matrix3d(${[a, d, 0, g, b, e, 0, hh, 0, 0, 1, 0, c, f, 0, 1].map((n) => +n.toFixed(8)).join(",")})`;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const ZOOM_END = 1.85;
/** 0 → 1 with a soft start and finish (smoothstep), clamped. */
const smooth = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
};

/*
 * What the monitor shows while it is small: a still of the case studies, rendered large and downsampled
 * (tools/mockups/screen-stills.cjs; re-run it when the section changes). The live page shrunk to a few
 * percent aliases into a pixelated, shimmering mess; a downsampled still reads like a real screen.
 * One per theme and layout width, so the still matches the live page that takes over across HANDOFF
 * (fractions of the scroll).
 *
 * From 1391px up the section's content stops growing (1280 wide, centred) and its type has stopped
 * scaling, so the 1440 still is the exact page there: it is placed at true size and centred, with its
 * side margins cropped or extended. Narrower, the nearest still is scaled to the width.
 */
const STILL_WIDTHS = [390, 768, 1024, 1152, 1280, 1366];
function screenStill(night: boolean, width: number) {
  const theme = night ? "dark" : "light";
  if (width >= 1391) {
    return { src: `/home/screen/${theme}-1440.webp`, width: `${(1440 / width) * 100}%`, left: `${((width - 1440) / 2 / width) * 100}%` };
  }
  const at = STILL_WIDTHS.reduce((best, x) => (Math.abs(x - width) < Math.abs(best - width) ? x : best));
  return { src: `/home/screen/${theme}-${at}.webp`, width: "100%", left: "0%" };
}
const HANDOFF: [number, number] = [0.24, 0.4];

export function HomeIntro({ next }: { next: ReactNode }) {
  const reduced = useReducedMotion();
  const [view, setView] = useState({ w: 1440, h: 900 });
  const nextRef = useRef<HTMLDivElement>(null);
  const [nextH, setNextH] = useState(2000);
  const progress = useMotionValue(0);
  const transform = useMotionValue("none");
  const clipPath = useMotionValue("none");
  const boxShadow = useMotionValue("none");
  // The still in the glass (see SCREEN), and the live page fading in over it as it grows.
  const coverOpacity = useMotionValue(0);
  const stillTransform = useMotionValue("none");
  const stillWidth = useMotionValue(0);
  const stillHeight = useMotionValue(0);
  const stillRadius = useMotionValue(0);
  const stillOpacity = useMotionValue(1);
  const imageOpacity = useMotionValue(1);
  const night = useTheme() === "dark";
  const still = screenStill(night, view.w);
  const { scrollY } = useScroll();

  useEffect(() => {
    // The hero's real box: the window minus any scrollbar, and the hero's own height (it has a minimum).
    const measure = () => {
      const hero = document.querySelector("[data-hero]");
      const r = hero?.getBoundingClientRect();
      setView({ w: r?.width || document.documentElement.clientWidth, h: r?.height || window.innerHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    const el = nextRef.current;
    const ro = el ? new ResizeObserver(() => setNextH(el.offsetHeight)) : null;
    if (el && ro) ro.observe(el);
    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, []);

  const glass = glassQuad(view.w, view.h);
  const focus = { x: glass.reduce((t, p) => t + p[0], 0) / 4, y: glass.reduce((t, p) => t + p[1], 0) / 4 };
  const update = (sy: number) => {
    const q = Math.min(1, Math.max(0, sy / view.h));
    progress.set(q);
    if (reduced) return;
    if (q >= 1) {
      transform.set("none");
      clipPath.set("none");
      boxShadow.set("none");
      coverOpacity.set(1);
      stillOpacity.set(0);
      return;
    }
    // The glass grows with the camera's zoom, around its centre; then the page opens out of it to fill
    // the screen, straightening from the glass's skew to a plain rectangle.
    const z = 1 + (ZOOM_END - 1) * q;
    const zoomed = glass.map(([gx, gy]) => [focus.x + (gx - focus.x) * z, focus.y + (gy - focus.y) * z] as Pt);
    const e = ease(q);
    const full: Pt[] = [
      [0, 0],
      [view.w, 0],
      [view.w, view.h],
      [0, view.h],
    ];
    const T = view.h - sy; // where the section's top would be without the effect
    const quad = zoomed.map(([gx, gy], i) => [lerp(gx, full[i][0], e), lerp(gy, full[i][1], e) - T] as Pt);
    // How much of the section shows: a slice with the quad's own proportions (a glass-shaped slice at first,
    // one full screen at the end), so the page scales evenly and is never squashed on the way.
    const quadW = (quad[1][0] - quad[0][0] + (quad[2][0] - quad[3][0])) / 2;
    const quadH = (quad[3][1] - quad[0][1] + (quad[2][1] - quad[1][1])) / 2;
    const shown = e >= 1 ? view.h : (view.w * quadH) / quadW;
    transform.set(quadMatrix(view.w, shown, quad));
    const r = lerp(view.w * 0.04, 0, e);
    // The section can be shorter than the slice the glass needs; its background then continues below it
    // (a solid shadow) so the screen is always filled. A negative inset reaches into that extension.
    const height = nextRef.current?.offsetHeight ?? nextH;
    // a copy of the box placed directly under it
    boxShadow.set(`0 ${Math.floor(height) - 1}px 0 0 var(--background)`);
    clipPath.set(`inset(0px 0px ${(height - shown).toFixed(1)}px 0px round ${r.toFixed(1)}px)`);

    // The still: laid out at the glass's own size on screen, so the transform barely scales it and the
    // browser's image downsampling does the work (crisp, and steady). The live page fades in over it once
    // it has grown big enough to draw cleanly, and the still steps aside when the page is fully there.
    const s = quadW / view.w;
    const w = view.w * s;
    const h = shown * s;
    stillWidth.set(w);
    stillHeight.set(h);
    stillRadius.set(r * s);
    stillTransform.set(quadMatrix(w, h, quad.map(([x, y]) => [x, y + T] as Pt)));
    // A dip, not a cross-fade: the still fades to the page's background, then the live page fades in, so the
    // two never show at once (between capture widths they differ slightly, and overlapping they ghost).
    const [a, b] = HANDOFF;
    const mid = (a + b) / 2;
    const f = smooth((q - mid) / (b - mid));
    imageOpacity.set(1 - smooth((q - a) / (mid - a)));
    coverOpacity.set(f);
    stillOpacity.set(f >= 1 ? 0 : 1);
  };
  useMotionValueEvent(scrollY, "change", update);
  useEffect(() => update(window.scrollY)); // keep in step after measuring

  const hero = (
    <ElsewhereHero
      daySrc={DAY}
      nightSrc={NIGHT}
      headerOffset={HEADER}
      progress={progress}
      focus={focus}
      headline={
        <>
          <span className="sr-only">I like orchestrating intentional designs: AI products, design systems and growth flows.</span>
          <span aria-hidden>I like orchestrating</span>{" "}
          <em className="font-serif text-[0.98em] font-normal italic tracking-[-0.02em]">
            <Typewriter words={["intentional designs.", "AI products.", "design systems.", "growth flows."]} />
          </em>
        </>
      }
    />
  );

  if (reduced) {
    return (
      <>
        <div className="-mt-[68px]">{hero}</div>
        {next}
      </>
    );
  }

  return (
    <>
      {/* Pinned for one screen of scrolling while the next section comes out of the monitor */}
      <div className="relative -mt-[68px] h-[200svh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {hero}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-[3] overflow-hidden bg-background"
            style={{
              width: stillWidth,
              height: stillHeight,
              borderRadius: stillRadius,
              transform: stillTransform,
              opacity: stillOpacity,
              transformOrigin: "0 0",
            }}
          >
            <motion.img
              src={still.src}
              alt=""
              className="relative block h-auto max-w-none"
              style={{ width: still.width, left: still.left, opacity: imageOpacity }}
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>
        </div>
      </div>
      <motion.div
        ref={nextRef}
        data-hero-cover=""
        className="relative z-10 -mt-[100svh] bg-background"
        style={{ transform, clipPath, boxShadow, opacity: coverOpacity, transformOrigin: "0 0" }}
      >
        {next}
      </motion.div>
    </>
  );
}
