import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/*
 * Case-study tile art: signature UI pieces from each project, floating on a brand-coloured backdrop.
 * Pieces are crops of Muskan's real screens, or (where the source is too small to stay sharp)
 * faithful HTML rebuilds of the same component with the same text. Nothing here is invented.
 */

type Backdrop = { base: string; deep: string; light: string; dark?: boolean };

const BACKDROPS: Record<string, Backdrop> = {
  "ai-mentor": { base: "#3a27a6", deep: "#170f45", light: "rgba(160,140,255,0.55)" },
  "builder-design-system": { base: "#262036", deep: "#0b0a12", light: "rgba(140,110,255,0.5)" },
  "builder-university": { base: "#14625c", deep: "#062a28", light: "rgba(140,240,220,0.4)" },
  "ratings-reviews": { base: "#c4323a", deep: "#5c0d12", light: "rgba(255,170,160,0.5)" },
  "studio-store": { base: "#d9d1ee", deep: "#b3a6d8", light: "rgba(255,255,255,0.75)", dark: false },
  internshala: { base: "#0c7cc4", deep: "#043456", light: "rgba(150,215,255,0.5)" },
  "swiping-loop": { base: "#a5523a", deep: "#4a1d12", light: "rgba(255,190,160,0.45)" },
  basecamp: { base: "#f0c840", deep: "#c99a12", light: "rgba(255,245,200,0.7)", dark: false },
  gusto: { base: "#e9dfcf", deep: "#cdbfa8", light: "rgba(255,255,255,0.7)", dark: false },
};

function backdrop(slug: string): CSSProperties {
  const b = BACKDROPS[slug];
  return {
    backgroundImage: [
      `radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,${b.dark === false ? 0.12 : 0.38}) 100%)`,
      `radial-gradient(60% 45% at 50% 30%, ${b.light}, transparent 70%)`,
      `linear-gradient(180deg, ${b.base} 0%, ${b.deep} 100%)`,
    ].join(", "),
  };
}

/** One floating piece: position/size in % of the tile, a tilt, and a depth that sets its hover drift. */
function Piece({
  x, y, w, r = 0, d = 1, children, className = "",
}: { x: number; y: number; w: number; r?: number; d?: number; children: ReactNode; className?: string }) {
  return (
    <div
      className={`piece absolute ${className}`}
      style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, "--r": `${r}deg`, "--d": d } as CSSProperties}
    >
      <div className="overflow-hidden rounded-[8px] shadow-[0_24px_40px_-18px_rgba(0,0,0,0.55),0_2px_6px_rgba(0,0,0,0.15)]">{children}</div>
    </div>
  );
}

function Crop({ slug, name, w, h }: { slug: string; name: string; w: number; h: number }) {
  return <Image src={`/work/${slug}/el-${name}.webp`} alt="" width={w} height={h} sizes="(min-width: 1024px) 20vw, (min-width: 640px) 34vw, 70vw" className="block h-auto w-full" />;
}

/* ---------- faithful HTML rebuilds (text exactly as in Muskan's screens) ---------- */

function LeecoTone() {
  return (
    <div className="bg-[#22232a] p-[9%] text-white">
      <p className="text-[3.4cqw] font-semibold">Leeco&rsquo;s Tone</p>
      <div className="my-[8%] h-px bg-white/15" />
      {["Friendly", "Professional", "Casual", "Strict"].map((t, i) => (
        <p key={t} className="flex items-center gap-2 py-[5%] text-[3cqw] text-white/90">
          <span className={`inline-block size-[0.9em] rounded-full border-[0.25em] ${i === 0 ? "border-[#7b6cff] bg-white" : "border-white/40 bg-transparent"}`} />
          {t}
        </p>
      ))}
    </div>
  );
}

function InternshalaSearch() {
  return (
    <div className="flex items-center gap-2 bg-white px-[5%] py-[3.5%] text-[3cqw] text-[#8a8f98]">
      <span aria-hidden className="text-[1.1em] text-[#333]">⌕</span> Find Jobs and Internships…
    </div>
  );
}

function InternshalaChips() {
  return (
    <div className="flex gap-1.5 bg-[#f4f7fa] p-[3%] text-[2.5cqw] text-[#333]">
      {["Preferences", "Role", "Location", "Type"].map((c) => (
        <span key={c} className="rounded-full border border-[#d6dde4] bg-white px-[0.9em] py-[0.35em]">
          {c}
        </span>
      ))}
    </div>
  );
}

function InternshalaJob() {
  return (
    <div className="bg-white p-[6%] text-[2.5cqw] leading-[1.45] text-[#333]">
      <p className="text-[1.3em] font-medium text-[#222]">Product Designer Intern</p>
      <p className="mt-[4%] flex items-center justify-between">
        <span className="font-medium">Unacademy</span>
        <span className="text-[#008bdc]">Website</span>
      </p>
      <p className="mt-[4%] text-[#666]">Unacademy opens it&rsquo;s doors for this year&rsquo;s summer internship program for talented freshers.</p>
      <div className="mt-[6%] grid grid-cols-4 gap-1">
        {[["Internship", "Type"], ["On-site", "Mode"], ["30K/mo", "Stipend"], ["3 months", "Duration"]].map(([a, b]) => (
          <p key={b}>
            <span className="block font-medium">{a}</span>
            <span className="block text-[#999]">{b}</span>
          </p>
        ))}
      </div>
      <p className="mt-[6%] flex items-center justify-between">
        <span className="rounded-full bg-[#e9f7ee] px-[0.8em] py-[0.25em] text-[#1f8a4c]">1 week ago</span>
        <span className="text-[#008bdc]">Details</span>
      </p>
    </div>
  );
}

/* Gusto: recreated wireframes only (no Gusto UI, text, numbers or logo). */
function WireBar({ w, dark }: { w: string; dark?: boolean }) {
  return <span className={`block h-[0.55em] rounded-full ${dark ? "bg-[#8f8a82]" : "bg-[#d4d0c9]"}`} style={{ width: w }} />;
}
function GustoForm() {
  return (
    <div className="flex flex-col gap-[0.7em] bg-[#fafaf9] p-[8%] text-[3cqw]">
      <WireBar w="55%" dark />
      {[0, 1, 2].map((k) => (
        <span key={k} className="flex flex-col gap-[0.35em]">
          <WireBar w="30%" />
          <span className="block h-[1.8em] rounded-[5px] border border-[#c9c5be] bg-white" />
        </span>
      ))}
      <span className="mt-[0.4em] block h-[2em] rounded-full bg-[#3a3733]" />
    </div>
  );
}
function GustoCtas() {
  return (
    <div className="flex gap-[0.6em] bg-[#fafaf9] p-[6%] text-[3cqw]">
      <span className="block h-[2.2em] flex-1 rounded-full bg-[#3a3733]" />
      <span className="block h-[2.2em] flex-1 rounded-full border-2 border-[#8f8a82]" />
    </div>
  );
}
function GustoPicker() {
  return (
    <div className="flex flex-col gap-[0.6em] bg-[#fafaf9] p-[8%] text-[3cqw]">
      <WireBar w="60%" dark />
      {[1, 0, 1].map((on, k) => (
        <span key={k} className="flex items-center gap-[0.6em] rounded-[6px] border border-[#d4d0c9] p-[0.5em]">
          <span className={`block size-[1em] rounded-[3px] ${on ? "bg-[#3a3733]" : "border border-[#8f8a82]"}`} />
          <WireBar w="60%" />
        </span>
      ))}
    </div>
  );
}

/* ---------- compositions ---------- */

const ART: Record<string, { alt: string; pieces: ReactNode }> = {
  "ai-mentor": {
    alt: "ProPilot's AI mentor in conversation: a learner's question, the mentor's reply, and the tone picker",
    pieces: (
      <>
        <Piece x={6} y={26} w={60} r={-3} d={1}><Crop slug="ai-mentor" name="answer" w={409} h={271} /></Piece>
        <Piece x={30} y={10} w={62} r={2} d={2}><Crop slug="ai-mentor" name="ask" w={419} h={90} /></Piece>
        <Piece x={64} y={50} w={30} r={4} d={3}><LeecoTone /></Piece>
      </>
    ),
  },
  "ratings-reviews": {
    alt: "OYO review flow pieces: the star rating card, the cashback reward and quick review suggestions",
    pieces: (
      <>
        <Piece x={5} y={30} w={58} r={-4} d={1}><Crop slug="ratings-reviews" name="rating" w={370} h={282} /></Piece>
        <Piece x={48} y={7} w={46} r={5} d={2}><Crop slug="ratings-reviews" name="reward" w={355} h={266} /></Piece>
        <Piece x={34} y={62} w={52} r={-2} d={3}><Crop slug="ratings-reviews" name="chips" w={315} h={216} /></Piece>
      </>
    ),
  },
  "builder-design-system": {
    alt: "Design system pieces: a button properties panel, the foundational colour palette and button variants",
    pieces: (
      <>
        <Piece x={6} y={10} w={28} r={-4} d={1}><Crop slug="builder-design-system" name="panel" w={232} h={435} /></Piece>
        <Piece x={34} y={14} w={58} r={3} d={2}><Crop slug="builder-design-system" name="colors" w={324} h={288} /></Piece>
        <Piece x={14} y={72} w={76} r={-2} d={3}><Crop slug="builder-design-system" name="buttons" w={672} h={173} /></Piece>
      </>
    ),
  },
  "builder-university": {
    alt: "Builder University pieces: onboarding course cards and a bronze badge progress card",
    pieces: (
      <>
        <Piece x={8} y={12} w={70} r={-3} d={1}><Crop slug="builder-university" name="courses" w={504} h={348} /></Piece>
        <Piece x={32} y={66} w={60} r={3} d={2}><Crop slug="builder-university" name="badge" w={400} h={126} /></Piece>
      </>
    ),
  },
  internshala: {
    alt: "Internshala redesign pieces: the search bar, filter chips and an internship listing card",
    pieces: (
      <>
        <Piece x={10} y={9} w={74} r={-2} d={2}><InternshalaSearch /></Piece>
        <Piece x={18} y={24} w={70} r={2} d={1}><InternshalaChips /></Piece>
        <Piece x={12} y={40} w={64} r={-3} d={3}><InternshalaJob /></Piece>
      </>
    ),
  },
  "studio-store": {
    alt: "Studio Store pieces: the store setup guide, an email results chart and dashboard stats",
    pieces: (
      <>
        <Piece x={5} y={14} w={70} r={-3} d={1}><Crop slug="studio-store" name="guide" w={641} h={344} /></Piece>
        <Piece x={62} y={40} w={32} r={4} d={3}><Crop slug="studio-store" name="pie" w={217} h={230} /></Piece>
        <Piece x={10} y={72} w={78} r={-1} d={2}><Crop slug="studio-store" name="stats" w={650} h={92} /></Piece>
      </>
    ),
  },
  "swiping-loop": {
    alt: "Affinity-mapping sticky notes from the swiping loop research",
    pieces: (
      <>
        <Piece x={4} y={6} w={52} r={-5} d={1}><Crop slug="swiping-loop" name="notes1" w={567} h={504} /></Piece>
        <Piece x={44} y={22} w={52} r={4} d={2}><Crop slug="swiping-loop" name="notes2" w={567} h={504} /></Piece>
        <Piece x={14} y={50} w={50} r={-2} d={3}><Crop slug="swiping-loop" name="notes3" w={567} h={504} /></Piece>
      </>
    ),
  },
  basecamp: {
    alt: "Basecamp landing page pieces: the hero headline, integration icons and the feature cards",
    pieces: (
      <>
        <Piece x={7} y={9} w={80} r={-2} d={2}><Crop slug="basecamp" name="hero" w={868} h={263} /></Piece>
        <Piece x={50} y={40} w={44} r={4} d={3}><Crop slug="basecamp" name="icons" w={620} h={396} /></Piece>
        <Piece x={5} y={56} w={60} r={-3} d={1}><Crop slug="basecamp" name="features" w={1116} h={525} /></Piece>
      </>
    ),
  },
  gusto: {
    alt: "Recreated wireframes of a signup flow: two calls to action, a feature picker and a short lead form",
    pieces: (
      <>
        <Piece x={10} y={12} w={44} r={-4} d={1}><GustoPicker /></Piece>
        <Piece x={46} y={22} w={44} r={4} d={3}><GustoForm /></Piece>
        <Piece x={14} y={70} w={50} r={-2} d={2}><GustoCtas /></Piece>
      </>
    ),
  },
};

export function TileArt({ slug }: { slug: string }) {
  const art = ART[slug];
  return (
    <div role="img" aria-label={art.alt} className="tile-art absolute inset-0" style={backdrop(slug)}>
      <div aria-hidden className="tile-grain absolute inset-0" />
      {art.pieces}
    </div>
  );
}
