import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { GustoPhone, GustoTablet, InternshalaJob, LeecoTone } from "@/components/home/tile-art";

/*
 * Landscape (4:3) thumbnail art for every case study: a gem-tone backdrop with several real pieces of the
 * project, placed so the tile works as a preview of the story (after idoshitty.art and dimpalgidwani.com).
 * Positions are in cqw (the tile is 100cqw wide and 75cqw tall).
 */

/** Gems: each case study's jewel tone (top, bottom of the gradient). */
export const GEM: Record<string, [string, string]> = {
  gusto: ["#f3a68d", "#c7573f"], // coral
  wildflower: ["#f0b2a8", "#b5574e"], // rose quartz
  therabody: ["#3d6ad6", "#142a66"], // sapphire
  "ai-mentor": ["#5a46d6", "#1b1252"], // amethyst
  "builder-design-system": ["#3a3158", "#0d0b16"], // onyx
  "ratings-reviews": ["#d23a42", "#6a1016"], // ruby
  "builder-university": ["#17706a", "#073330"], // emerald
  basecamp: ["#f3cd47", "#cf9e14"], // topaz
  internshala: ["#0d86d1", "#04395e"], // sapphire
  "swiping-loop": ["#e8a090", "#b5574e"], // rose quartz
  "studio-store": ["#b9a8f0", "#7d66d6"], // lavender amethyst
};

const SHADOW = "shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]";

function At({ style, className = "", children }: { style: CSSProperties; className?: string; children: ReactNode }) {
  return (
    <div className={`absolute ${className}`} style={style}>
      {children}
    </div>
  );
}

/** One of Muskan's screens at its true ratio. panel = rounded corners and a soft ring. */
function Shot({ src, w, h, panel = false, sizes = "30vw" }: { src: string; w: number; h: number; panel?: boolean; sizes?: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={w}
      height={h}
      sizes={sizes}
      className={`block h-auto w-full ${panel ? `rounded-[1.6cqw] ring-1 ring-white/20 ${SHADOW}` : ""}`}
    />
  );
}

/** Slim phone outline around a bare screen. */
function Phone({ src, w, h }: { src: string; w: number; h: number }) {
  return (
    <div className={`rounded-[4.4cqw] bg-[#121212] p-[0.9cqw] ${SHADOW}`}>
      <Image src={src} alt="" width={w} height={h} sizes="18vw" className="block h-auto w-full rounded-[3.6cqw]" />
    </div>
  );
}

/** Browser window with traffic lights. */
function Browser({ src, w, h }: { src: string; w: number; h: number }) {
  return (
    <div className={`overflow-hidden rounded-[1.4cqw] bg-white ${SHADOW}`}>
      <div className="flex gap-[0.8cqw] bg-[#ececec] px-[1.6cqw] py-[1.1cqw]">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} className="block size-[1.3cqw] rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
      <Image src={src} alt="" width={w} height={h} sizes="35vw" className="block h-auto w-full" />
    </div>
  );
}

/** Slim flat laptop; the page fills a 16:10 screen from the top. */
function Laptop({ src }: { src: string }) {
  return (
    <div>
      <div className={`rounded-t-[2cqw] bg-[#121212] p-[1.1cqw] pb-[1.4cqw] ${SHADOW}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.7cqw] bg-white">
          <Image src={src} alt="" fill sizes="(min-width: 640px) 35vw, 70vw" className="object-cover object-left-top" />
        </div>
      </div>
      <div className="relative -mx-[6%] h-[2cqw] rounded-b-[1.8cqw] bg-[linear-gradient(#d9dbdf,#a9acb2)]">
        <span className="absolute left-1/2 top-0 block h-[0.8cqw] w-[16%] -translate-x-1/2 rounded-b-[1cqw] bg-[#8d9096]" />
      </div>
    </div>
  );
}

/** A small white card with one real fact from the case study. */
function FactCard({ value, label }: { value: string; label: string }) {
  return (
    <div className={`rounded-[1.6cqw] bg-white px-[3cqw] py-[2.4cqw] text-[#1f1f1f] ${SHADOW}`}>
      <p className="font-display text-[6cqw] font-semibold leading-none tracking-[-0.02em]">{value}</p>
      <p className="mt-[1cqw] text-[2.1cqw] leading-[1.3] text-[#4a4a4a]">{label}</p>
    </div>
  );
}

const drop = "drop-shadow-[0_24px_24px_rgba(0,0,0,0.3)]";

function GustoResults() {
  return (
    <div className={`rounded-[2.4cqw] bg-white p-[4.5cqw] text-[#1f1f1f] ${SHADOW}`}>
      <p className="font-mono text-[2.4cqw] uppercase tracking-[0.08em] text-[#6b605a]">A/B tests · Gusto.com signup</p>
      <div className="mt-[3cqw] grid grid-cols-2 gap-[3cqw]">
        {[["+15%", "visits converting to leads"], ["+25%", "account creations"]].map(([v, l]) => (
          <p key={l} className="flex flex-col gap-[0.8cqw]">
            <span className="font-display text-[8cqw] font-semibold leading-none tracking-[-0.02em] text-[#c4432d]">{v}</span>
            <span className="text-[2.9cqw] leading-[1.3] text-[#4a4a4a]">{l}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

const ART: Record<string, { node: ReactNode; alt: string }> = {
  gusto: {
    alt: "Gusto's signup screens on a tablet and a phone, with the A/B test results: +15% visits converting to leads and +25% account creations",
    node: (
      <>
        <At style={{ left: "5cqw", top: "7cqw" }} className="origin-top-left -rotate-[3deg] scale-[0.68]"><GustoTablet /></At>
        <At style={{ left: "7cqw", width: "66cqw", top: "50cqw" }} className="origin-top-left scale-[0.62]"><GustoResults /></At>
        <At style={{ right: "7cqw", top: "6cqw" }} className="origin-top-right rotate-[4deg] scale-[0.86]"><GustoPhone /></At>
      </>
    ),
  },
  wildflower: {
    alt: "Three Wildflower app screens fanned out: home, tasks by care plan, and trackers",
    node: (
      <>
        <At style={{ left: "7cqw", width: "27cqw", top: "12cqw" }} className={`-rotate-[7deg] ${drop}`}><Shot src="/work/wildflower/frame-2.webp" w={436} h={900} sizes="14vw" /></At>
        <At style={{ right: "7cqw", width: "27cqw", top: "12cqw" }} className={`rotate-[7deg] ${drop}`}><Shot src="/work/wildflower/frame-3.webp" w={436} h={898} sizes="14vw" /></At>
        <At style={{ left: "34.5cqw", width: "31cqw", top: "5cqw" }} className={drop}><Shot src="/work/wildflower/frame-1.webp" w={437} h={900} sizes="16vw" /></At>
      </>
    ),
  },
  therabody: {
    alt: "Therabody's product pages on a laptop and phone, the Theragun comparison modal, and +31% revenue per visitor",
    node: (
      <>
        <At style={{ left: "4cqw", width: "58cqw", top: "10cqw" }} className={drop}><Shot src="/work/therabody/frame-1.webp" w={1394} h={1129} sizes="30vw" /></At>
        <At style={{ right: "5cqw", width: "34cqw", top: "8cqw" }}><Shot src="/work/therabody/frame-3.webp" w={737} h={626} panel sizes="17vw" /></At>
        <At style={{ right: "8cqw", width: "26cqw", top: "47cqw" }}><FactCard value="+31%" label="revenue per visitor" /></At>
      </>
    ),
  },
  "ai-mentor": {
    alt: "ProPilot's mentor panel docked beside a LeetCode problem on a laptop, with its tone picker",
    node: (
      <>
        <At style={{ left: "5cqw", width: "64cqw", top: "9cqw" }}><Laptop src="/work/ai-mentor/exact/sol1.png" /></At>
        <At style={{ right: "5cqw", width: "28cqw", top: "7cqw" }}><Shot src="/work/ai-mentor/frame-4.webp" w={425} h={932} panel sizes="14vw" /></At>
        <At style={{ left: "4cqw", top: "40cqw" }} className="origin-top-left scale-[0.6]"><LeecoTone /></At>
      </>
    ),
  },
  "builder-design-system": {
    alt: "Pieces of the BLOCK design system: button variants, foundational colours and corner radius tokens",
    node: (
      <>
        <At style={{ left: "5cqw", width: "60cqw", top: "6cqw" }}><Shot src="/work/builder-design-system/ds-buttons.webp" w={1104} h={478} panel sizes="30vw" /></At>
        <At style={{ left: "5cqw", width: "60cqw", top: "36cqw" }}><Shot src="/work/builder-design-system/frame-11.webp" w={467} h={206} panel sizes="30vw" /></At>
        <At style={{ right: "5cqw", width: "26cqw", top: "6cqw" }}><Shot src="/work/builder-design-system/frame-7.webp" w={354} h={769} panel /></At>
      </>
    ),
  },
  "ratings-reviews": {
    alt: "Three OYO review screens: rate your experience, cashback reward and write-a-review with quick suggestions",
    node: (
      <>
        <At style={{ left: "14cqw", width: "21cqw", top: "15cqw" }} className="-rotate-[7deg]"><Phone src="/work/ratings-reviews/frame-2.webp" w={370} h={807} /></At>
        <At style={{ right: "14cqw", width: "21cqw", top: "15cqw" }} className="rotate-[7deg]"><Phone src="/work/ratings-reviews/frame-3.webp" w={370} h={801} /></At>
        <At style={{ left: "37cqw", width: "26cqw", top: "7cqw" }}><Phone src="/work/ratings-reviews/frame-1.webp" w={370} h={807} /></At>
      </>
    ),
  },
  "builder-university": {
    alt: "Builder University's learning path and course catalogue in two browser windows, with a 100% automated onboarding card",
    node: (
      <>
        <At style={{ left: "5cqw", width: "60cqw", top: "7cqw" }}><Browser src="/work/builder-university/frame-1.webp" w={698} h={476} /></At>
        <At style={{ right: "5cqw", width: "50cqw", top: "30cqw" }}><Browser src="/work/builder-university/frame-2.webp" w={699} h={475} /></At>
        <At style={{ left: "7cqw", width: "26cqw", top: "51cqw" }}><FactCard value="100%" label="automated onboarding" /></At>
      </>
    ),
  },
  basecamp: {
    alt: "The redesigned Basecamp landing page on a laptop, with the integrations section beside it",
    node: (
      <>
        <At style={{ left: "6cqw", width: "66cqw", top: "9cqw" }}><Laptop src="/work/basecamp/frame-1.webp" /></At>
        <At style={{ right: "5cqw", width: "25cqw", top: "30cqw" }}><Shot src="/work/basecamp/frame-2.webp" w={1065} h={1198} panel sizes="13vw" /></At>
      </>
    ),
  },
  internshala: {
    alt: "Redesigned Internshala screens: the applications tracker and new-user home on phones, and a job card",
    node: (
      <>
        <At style={{ left: "6cqw", top: "12cqw" }} className="origin-top-left scale-[0.62]"><InternshalaJob /></At>
        <At style={{ right: "29cqw", width: "21cqw", top: "6cqw" }} className={`-rotate-[5deg] ${drop}`}><Shot src="/work/internshala/cs/in-onboarding-2.webp" w={266} h={584} /></At>
        <At style={{ right: "6cqw", width: "24cqw", top: "9cqw" }} className={`rotate-[4deg] ${drop}`}><Shot src="/work/internshala/cs/in-tracking.webp" w={266} h={589} /></At>
      </>
    ),
  },
  "swiping-loop": {
    alt: "Collage of two hands holding phones with pixel hearts, a hand swiping profiles, and a card: 28 of 32 hadn't found a partner",
    node: (
      <>
        <At style={{ left: "5cqw", width: "62cqw", top: "8cqw" }}><Shot src="/work/swiping-loop/illustration.webp" w={736} h={387} panel sizes="32vw" /></At>
        <At style={{ right: "4cqw", width: "34cqw", top: "22cqw" }} className={drop}><Shot src="/work/swiping-loop/cs/sw-swipe.webp" w={500} h={502} sizes="17vw" /></At>
        <At style={{ left: "8cqw", width: "30cqw", top: "47cqw" }}><FactCard value="28 / 32" label="hadn't found a partner on dating apps" /></At>
      </>
    ),
  },
  "studio-store": {
    alt: "Studio Store's setup guide on a laptop, with the sales dashboard beside it",
    node: (
      <>
        <At style={{ left: "5cqw", width: "64cqw", top: "9cqw" }}><Laptop src="/work/studio-store/frame-4.webp" /></At>
        <At style={{ right: "5cqw", width: "40cqw", top: "38cqw" }}><Shot src="/work/studio-store/frame-5.webp" w={833} h={548} panel sizes="20vw" /></At>
      </>
    ),
  },
};

export const hasFeatureArt = (slug: string) => slug in ART;

export function FeatureArt({ slug }: { slug: string }) {
  const art = ART[slug];
  const [g0, g1] = GEM[slug];
  return (
    <div
      role="img"
      aria-label={art.alt}
      className="tile-art absolute inset-0 overflow-hidden"
      style={{ backgroundImage: `radial-gradient(70% 55% at 50% 30%, rgba(255,255,255,0.18), transparent 70%), linear-gradient(180deg, ${g0}, ${g1})` }}
    >
      <div aria-hidden className="tile-grain absolute inset-0" />
      <div aria-hidden className="absolute inset-0">{art.node}</div>
    </div>
  );
}
