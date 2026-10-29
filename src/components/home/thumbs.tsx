import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { IosStatusIcons } from "@/components/ui/ios-status-icons";
import { BadgeCheck, Bell, Compass, Eye, Home, MessageCircle, Sparkles, Star, UserPlus } from "lucide-react";

/*
 * Case study thumbnails, each built on a component pattern from the 21st.dev libraries (Magic UI, Aceternity UI),
 * rewritten as light CSS loops so twelve can run at once: Animated Beam, Orbiting Circles, Animated List,
 * Circular Progress, Card Stack, Marquee, and the Safari / iPhone frames. Every piece is coded (crisp at any
 * size) from the case study's own content, rests in its finished state, and only animates while its tile
 * plays (see "Thumbnails" in globals.css). Sizes are in cqw: the tile is 100cqw wide, 4:3.
 */

const v = (o: Record<string, string | number>) => o as CSSProperties;
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/** Odometer digits: each digit rolls up from 0 to its value. */
function Roll({ value, delay = 0 }: { value: string; delay?: number }) {
  let n = 0;
  return (
    <span className="th-roll">
      {[...value].map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="th-digit">
            <span className="th-strip" style={v({ "--d": ch, "--delay": `${delay + n++ * 0.07}s` })}>
              {DIGITS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i}>{ch}</span>
        ),
      )}
    </span>
  );
}

/* ---------- Frames (after Magic UI's Safari and iPhone mockups) ---------- */

/** A laptop frame (the name is from when it was a Safari window). */
function Safari({ src, w, h, url, width, scroll = false, fit, className = "", style }: { src: string; w: number; h: number; url?: string; width: string; scroll?: boolean; /** Show the page whole on this colour (pages wider than the screen). */ fit?: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={`th-laptop ${className}`} style={{ width, ...style }} data-url={url}>
      <div className="th-laptop__lid">
        <div className="th-safari__view th-laptop__screen">
          <div className="th-laptop__page" style={fit ? { background: fit } : undefined}>
            <Image src={src} alt="" width={w} height={h} sizes="40vw" className={`block h-full w-full object-top ${fit ? "object-contain" : "object-cover"} ${scroll ? "th-pan" : ""}`} />
          </div>
        </div>
        <span aria-hidden className="th-laptop__notch" />
      </div>
      <div aria-hidden className="th-laptop__base" />
    </div>
  );
}

function IPhone({ src, w, h, width, className = "", style }: { src: string; w: number; h: number; width: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={`th-iphone ${className}`} style={{ width, ...style }}>
      <div className="th-iphone__screen">
        {/* A status bar for the Dynamic Island to sit in, so it never covers the page's own header. */}
        <div aria-hidden className="th-iphone__status">
          <span>9:41</span>
          <IosStatusIcons className="th-iphone__icons" />
        </div>
        <div className="th-iphone__page">
          <Image src={src} alt="" width={w} height={h} sizes="16vw" className="block h-full w-full object-cover object-top" />
        </div>
      </div>
      <span className="th-iphone__island" />
    </div>
  );
}

/* ---------- Gusto: Animated Beam through the new signup journey ---------- */

const GUSTO_NODES: { label: string; icon: ReactNode; x: number; y: number }[] = [
  { label: "Homepage", icon: <Home />, x: 10, y: 50 },
  { label: "How Gusto works", icon: <Compass />, x: 38, y: 22 },
  { label: "Lead", icon: <UserPlus />, x: 64, y: 22 },
  { label: "Account", icon: <BadgeCheck />, x: 90, y: 50 },
];

export function GustoThumb() {
  const beams = ["M70 170 Q 140 75 266 75", "M266 75 L448 75", "M448 75 Q 560 75 630 170"];
  return (
    <div className="th-beam" style={v({ "--accent": "#c4432d" })}>
      <svg viewBox="0 0 700 340" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <path d="M70 170 Q 350 330 630 170" className="th-beam__path th-beam__path--dash" />
        {beams.map((d, i) => (
          <g key={d}>
            <path d={d} className="th-beam__path" />
            <path d={d} pathLength={100} className="th-beam__pulse" style={v({ "--delay": `${0.2 + i * 0.7}s` })} />
          </g>
        ))}
      </svg>
      {GUSTO_NODES.map((n, i) => (
        <span key={n.label} className="th-node-card" style={v({ left: `${n.x}%`, top: `${n.y}%`, "--delay": `${i * 0.7}s` })}>
          <span className="th-node-card__icon">{n.icon}</span>
          {n.label}
        </span>
      ))}
      <span className="th-chip th-chip--solid th-in absolute bottom-[1cqw] left-1/2 -translate-x-1/2" style={v({ "--delay": "2.6s" })}>
        <Roll value="+25%" delay={2.6} />&nbsp;account creations
      </span>
    </div>
  );
}

/* ---------- ProPilot: Orbiting Circles around the AI mentor ---------- */

export function MentorThumb() {
  const inner = ["LeetCode", "GeeksforGeeks", "YouTube"];
  const outer = ["Quiz", "Summary", "Easy Actions", "Hints"];
  return (
    <div className="th-orbit" style={v({ "--accent": "#5a46d6" })}>
      <span className="th-orbit__ring" style={v({ "--r": "15cqw" })} />
      <span className="th-orbit__ring" style={v({ "--r": "25cqw" })} />
      <span className="th-orbit__core">
        <Sparkles />
      </span>
      <span className="th-orbit__name">
        Leeco <span className="th-muted">AI mentor</span>
      </span>
      {inner.map((t, i) => (
        <span key={t} className="th-orbiter" style={v({ "--r": "15cqw", "--a": `${(360 / inner.length) * i}deg`, "--dur": "22s" })}>
          <span className="th-orbit-chip th-orbit-chip--strong">{t}</span>
        </span>
      ))}
      {outer.map((t, i) => (
        <span key={t} className="th-orbiter th-orbiter--rev" style={v({ "--r": "25cqw", "--a": `${(360 / outer.length) * i + 45}deg`, "--dur": "34s" })}>
          <span className="th-orbit-chip">{t}</span>
        </span>
      ))}
    </div>
  );
}

/* ---------- Internshala: Animated List of application updates ---------- */

export function InternshalaThumb() {
  // Newest first; each arrives on top and pushes the rest down.
  const items = [
    { icon: <MessageCircle />, title: "New message", body: "A recruiter replied to your application", time: "now" },
    { icon: <BadgeCheck />, title: "Shortlisted", body: "UX Design Internship · Disney Plus", time: "1m" },
    { icon: <Eye />, title: "Application viewed", body: "Product design internship · Meesho", time: "4m" },
    { icon: <Bell />, title: "Pending review", body: "Product Designer Intern · Unacademy", time: "1h" },
  ];
  return (
    <div className="th-list" style={v({ "--accent": "#0b7fc7" })}>
      {items.map((it, i) => (
        <div key={it.title} className="th-li" style={v({ "--delay": `${(items.length - 1 - i) * 1.1}s` })}>
          <div className="th-li__inner">
            <span className="th-li__icon">{it.icon}</span>
            <span className="min-w-0 flex-1">
              <span className="th-text block font-semibold">
                {it.title} <span className="th-muted font-normal">· {it.time}</span>
              </span>
              <span className="th-muted block truncate">{it.body}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Builder University: Circular Progress to fully automated onboarding ---------- */

export function UniversityThumb() {
  const C = 2 * Math.PI * 45;
  return (
    <div className="flex items-center gap-[5cqw]" style={v({ "--accent": "#17706a" })}>
      <div className="th-gauge">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="45" className="th-gauge__track" />
          <circle cx="50" cy="50" r="45" className="th-gauge__value" style={v({ "--c": C, "--end": C * 0.28 })} strokeDasharray={C} />
        </svg>
        <span className="th-gauge__label">
          <span className="th-huge th-accent">
            <Roll value="72" />
            <span className="text-[0.5em]">%</span>
          </span>
          <span className="th-muted">of Learning Plan done</span>
        </span>
      </div>
      <ul className="flex flex-col gap-[1.6cqw]">
        {["Learning Plans by role", "Progress and scores", "Badges and tiers"].map((t, i) => (
          <li key={t} className="th-pillrow th-in" style={v({ "--delay": `${1.6 + i * 0.4}s` })}>
            <span className="th-pillrow__dot" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- OYO: Card Stack of stay reviews ---------- */

export function OyoThumb() {
  const reviews = [
    { text: "Very good place to hang out with friends.", stars: 4, who: "Friends trip" },
    { text: "Enjoyed the stay with great service.", stars: 5, who: "Business stay" },
    { text: "Excellent view from the balcony, enjoyed it.", stars: 5, who: "Couple stay" },
  ];
  return (
    <div className="flex flex-col items-center gap-[3cqw]" style={v({ "--accent": "#1a8754" })}>
      <div className="th-cardstack">
        {reviews.map((r, i) => (
          <div key={r.who} className="th-card th-cardstack__card" style={v({ "--i": i })}>
            <span className="flex gap-[0.5cqw] text-[#f5b301]">
              {Array.from({ length: 5 }, (_, k) => (
                <Star key={k} className={`size-[2.4cqw] ${k < r.stars ? "fill-current" : "fill-[var(--th-line)] text-[var(--th-line)]"}`} />
              ))}
            </span>
            <p className="th-title mt-[1.6cqw]">&ldquo;{r.text}&rdquo;</p>
            <p className="th-muted mt-[1.2cqw]">{r.who}</p>
          </div>
        ))}
      </div>
      <span className="th-chip th-chip--solid">
        <BadgeCheck className="th-ico" /> ₹25 Paytm cashback unlocked
      </span>
    </div>
  );
}

/* ---------- Browser + phone pairs (Safari / iPhone frames) ---------- */

export function ZeroNoiseThumb() {
  return (
    <div className="relative" style={v({ "--accent": "#d83a6c" })}>
      <Safari src="/work/thumbs/zero-noise-desktop.webp" w={1600} h={1039} url="ishikaa-jain.vercel.app" width="68cqw" />
      <div className="th-in absolute -bottom-[6cqw] -right-[6cqw]" style={v({ "--delay": "0.8s" })}>
        <IPhone src="/work/thumbs/zero-noise-mobile.webp" w={600} h={1300} width="16cqw" />
      </div>
    </div>
  );
}

export function BasecampThumb() {
  return <Safari src="/work/basecamp/img-final-hero.webp" w={1240} h={750} url="basecamp.com" width="76cqw" className="th-rise" />;
}

/* ---------- Natasha: the immersive welcome, with the compact side panel in front ---------- */

export function NatashaThumb() {
  return (
    <div className="relative" style={v({ "--accent": "#6d28d9" })}>
      <Safari src="/work/natasha/immersive-welcome.webp" w={1440} h={788} url="builder.ai" width="66cqw" fit="rgb(176, 128, 252)" />
      <div className="th-card th-in absolute -bottom-[7cqw] -right-[9cqw] w-[19cqw] overflow-hidden" style={v({ "--delay": "0.8s" })}>
        <Image src="/work/natasha/panel-conversation.webp" alt="" width={402} height={840} sizes="12vw" className="block h-auto w-full" />
      </div>
    </div>
  );
}

/* ---------- BLOCK: a grid of live primitives (after Magic UI's grid patterns) ---------- */

export function BlockThumb() {
  const cells: ReactNode[] = [
    <span key="b1" className="th-ds-btn">Button</span>,
    <span key="b2" className="th-ds-btn th-ds-btn--ghost">Secondary</span>,
    <span key="tg" className="th-ds-toggle"><i /></span>,
    <span key="cb" className="th-ds-check"><BadgeCheck /></span>,
    <span key="in" className="th-ds-input">Search components</span>,
    <span key="av" className="th-ds-avatars"><i /><i /><i /></span>,
    <span key="ch" className="th-ds-chip">Tokens</span>,
    <span key="tb" className="th-ds-tabs"><i className="on" /><i /><i /></span>,
    <span key="sl" className="th-ds-slider"><i /></span>,
  ];
  return (
    <div className="flex flex-col items-center gap-[2.6cqw]">
      <p className="th-ds-title">
        BLOCK <span>design system</span>
      </p>
      <div className="th-ds-grid">
        {cells.map((c, i) => (
          <span key={i} className="th-ds-cell" style={v({ "--delay": `${i * 0.28}s` })}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

