import Image from "next/image";
import type { CSSProperties } from "react";
import { BENTOS, BentoCover } from "@/components/home/bento-cover";

/*
 * Case study covers (after ashpreetsingh.com/projects): one device front and centre, showing the real product
 * screen, over a wall of that same product's other screens, enlarged, tilted and washed in its brand colour.
 * Square, so they read as a set. Built from the case studies' own screenshots (no stock imagery); the
 * devices reuse the thumbnail frames (.th-iphone, .th-laptop) and size in cqw, so the cover scales as a whole.
 */

type Screen = { src: string; w: number; h: number };
export type CoverSpec = {
  /** phone: a screen in a phone frame (status: add a status bar for web screenshots without one).
   *  laptop: a screen in a laptop. framed: a mockup that already has its device frame. */
  device: "phone" | "laptop" | "framed";
  screen: Screen;
  status?: boolean;
  /** the screen is a whole page that scrolls itself, top to bottom and back (a moving prototype) */
  scroll?: boolean;
  /** the wall screens are cut-out phones (transparent): show them whole, with no tile behind */
  wallClear?: boolean;
  /** the wall is an even grid of phone screens (for covers whose device is a phone) */
  phoneWall?: boolean;
  /** screens for the wall behind */
  wall: string[];
  /** brand wash: light top, deep bottom */
  wash: [string, string];
};

export const COVERS: Record<string, CoverSpec> = {
  gusto: {
    device: "phone",
    screen: { src: "/work/covers/gusto-hd.webp", w: 1300, h: 5935 },
    phoneWall: true,
    wall: ["/work/gusto/howworks-mobile.png", "/work/gusto/final-mobile.png"],
    wash: ["#f6b49c", "#b8452d"],
  },
  "ai-mentor": {
    device: "laptop",
    // the ProPilot landing page from Muskan's Figma (Preplaced Mentee Dashboard 2.0, exported at 4x)
    screen: { src: "/work/covers/propilot-landing.webp", w: 2400, h: 9130 },
    scroll: true,
    wall: ["/work/ai-mentor/exact/sol1.png", "/work/ai-mentor/exact/sol3-quiz.png", "/work/ai-mentor/exact/sol4-summary.png", "/work/ai-mentor/exact/mvp-screenshot.png"],
    wash: ["#6c58e6", "#140d44"],
  },
  "zero-noise": {
    device: "phone",
    status: true,
    screen: { src: "/work/covers/zero-noise-hd.webp", w: 1300, h: 2817 },
    phoneWall: true,
    wall: ["/work/zero-noise/m-hero-clean.webp", "/work/zero-noise/m-estimate-clean.webp", "/work/zero-noise/clip-mobile-still.webp"],
    wash: ["#ffa3c0", "#b3264f"],
  },
  "builder-design-system": {
    device: "laptop",
    screen: { src: "/work/builder-design-system/img-workspace.webp", w: 1440, h: 950 },
    wall: ["/work/builder-design-system/img-nav-states.webp", "/work/builder-design-system/img-cards.webp", "/work/builder-design-system/img-buttons.webp", "/work/builder-design-system/img-colors.webp"],
    wash: ["#4b3f72", "#0d0b16"],
  },
  natasha: {
    device: "phone",
    status: true,
    screen: { src: "/work/covers/natasha-hd.webp", w: 1300, h: 2716 },
    phoneWall: true,
    wall: ["/work/natasha/panel-welcome.webp", "/work/natasha/panel-conversation.webp"],
    wash: ["#cdb2ff", "#4a1fb8"],
  },
  internshala: {
    device: "phone",
    screen: { src: "/work/covers/internshala-hd.webp", w: 984, h: 2212 },
    wallClear: true,
    phoneWall: true,
    wall: ["/work/internshala/cs/in-tracking-clean.webp", "/work/internshala/cs/in-chats-clean.webp"],
    wash: ["#3aa6e6", "#03304f"],
  },
  "ratings-reviews": {
    device: "phone",
    status: true,
    // the screen cut out of its baked frame, so it sits in the same phone as the other covers
    screen: { src: "/work/covers/oyo-screen-fit.webp", w: 1300, h: 2510 },
    wallClear: true,
    phoneWall: true,
    wall: ["/work/ratings-reviews/img-rate-clear.webp", "/work/ratings-reviews/img-write-clear.webp", "/work/ratings-reviews/img-photos-clear.webp", "/work/ratings-reviews/img-reward-clear.webp"],
    wash: ["#e2555c", "#5a0c12"],
  },
  "builder-university": {
    device: "laptop",
    screen: { src: "/work/covers/university-hd.webp", w: 1300, h: 887 },
    wall: ["/work/builder-university/frame-2.webp", "/work/builder-university/img-dashboard-clean.webp", "/work/builder-university/img-badges-clean.webp", "/work/builder-university/img-pilot-clean.webp"],
    wash: ["#2a8f87", "#04302c"],
  },
  basecamp: {
    device: "laptop",
    screen: { src: "/work/covers/basecamp-hd.webp", w: 1300, h: 786 },
    wall: ["/work/basecamp/img-features.webp", "/work/basecamp/img-integrations.webp", "/work/basecamp/img-palette.webp", "/work/basecamp/img-ia.webp"],
    wash: ["#f6d35c", "#7a5a05"],
  },
};

function Phone({ s, status }: { s: Screen; status?: boolean }) {
  return (
    <div className="th-iphone cv-phone">
      <div className="th-iphone__screen">
        {status && (
          <div aria-hidden className="th-iphone__status">
            <span>9:41</span>
            <span className="th-iphone__icons">
              <i />
              <i />
              <i />
              <b />
            </span>
          </div>
        )}
        <div className="th-iphone__page">
          <Image src={s.src} alt="" width={s.w} height={s.h} sizes="(min-width: 768px) 18vw, 60vw" quality={95} className="block h-full w-full object-cover object-top" />
        </div>
      </div>
      <span className="th-iphone__island" />
    </div>
  );
}

function Laptop({ s, scroll }: { s: Screen; scroll?: boolean }) {
  return (
    <div className="th-laptop cv-laptop">
      <div className="th-laptop__lid">
        <div className="th-safari__view th-laptop__screen">
          <div className={scroll ? "th-laptop__page cv-scroll" : "th-laptop__page"}>
            {scroll ? (
              <div className="cv-scroll__page" style={{ "--r": s.h / s.w } as CSSProperties}>
                <Image src={s.src} alt="" width={s.w} height={s.h} sizes="(min-width: 768px) 36vw, 100vw" quality={95} className="block h-auto w-full" />
              </div>
            ) : (
              <Image src={s.src} alt="" width={s.w} height={s.h} sizes="(min-width: 768px) 36vw, 100vw" quality={95} className="block h-full w-full object-cover object-top" />
            )}
          </div>
        </div>
        <span aria-hidden className="th-laptop__notch" />
      </div>
      <div aria-hidden className="th-laptop__base" />
    </div>
  );
}

/** The cover art for a case study; fills its (square, container-sized) parent. */
export function Cover({ slug }: { slug: string }) {
  // BLOCK and Builder University: an animated bento of their domain (bento-cover.tsx).
  if (BENTOS[slug]) return <BentoCover slug={slug} />;
  const c = COVERS[slug];
  if (!c) return null;
  // An even grid: 15 phone screens (5 × 3) in turn, or 6 landscape tiles.
  const count = c.phoneWall ? 15 : 6;
  const wall = Array.from({ length: count }, (_, i) => c.wall[i % c.wall.length]);
  return (
    <div className={["cv", c.wallClear && "cv--clear", c.phoneWall && "cv--phones"].filter(Boolean).join(" ")} style={{ "--wash-a": c.wash[0], "--wash-b": c.wash[1] } as CSSProperties}>
      <div aria-hidden className="cv-wall">
        {wall.map((src, i) => (
          <div key={i} className="cv-wall__tile">
            <Image src={src} alt="" fill sizes="24vw" className={c.wallClear ? "object-contain" : "object-cover object-top"} />
          </div>
        ))}
      </div>
      <div aria-hidden className="cv-wash" />
      <div className="cv-device">
        {c.device === "phone" && <Phone s={c.screen} status={c.status} />}
        {c.device === "laptop" && <Laptop s={c.screen} scroll={c.scroll} />}
        {c.device === "framed" && (
          <div className="cv-framed">
            <Image src={c.screen.src} alt="" width={c.screen.w} height={c.screen.h} sizes="(min-width: 768px) 18vw, 60vw" quality={95} className="block h-auto w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
