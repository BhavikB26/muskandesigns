import type { CSSProperties, ReactNode } from "react";
import { ThumbPlay } from "@/components/home/thumb-play";
import { Backdrop } from "@/components/home/backdrop";
import {
  BasecampThumb,
  BlockThumb,
  GustoThumb,
  InternshalaThumb,
  MentorThumb,
  NatashaThumb,
  OyoThumb,
  UniversityThumb,
  ZeroNoiseThumb,
} from "@/components/home/thumbs";

/*
 * Case study thumbnails: one shared soft base tinted by the case study's gem, a quiet moving motif drawn from
 * the project itself (backdrop.tsx), and a coded, animated piece built on a 21st.dev / Aceternity pattern
 * (thumbs.tsx). BLOCK's tile is the dark one.
 */

/** Gems: each case study's jewel tone (top, bottom of the gradient). */
export const GEM: Record<string, [string, string]> = {
  gusto: ["#f3a68d", "#c7573f"], // coral
  "zero-noise": ["#ff8fb0", "#c2335f"], // pink tourmaline (Zero Noise brand pink)
  "ai-mentor": ["#5a46d6", "#1b1252"], // amethyst
  "builder-design-system": ["#3a3158", "#0d0b16"], // onyx
  "ratings-reviews": ["#d23a42", "#6a1016"], // ruby
  "builder-university": ["#17706a", "#073330"], // emerald
  internshala: ["#0d86d1", "#04395e"], // sapphire
  basecamp: ["#f3cd47", "#cf9e14"], // topaz
  natasha: ["#c9a7ff", "#5b2bc4"], // lavender amethyst (Natasha violet)
  makemycareer: ["#7c86f8", "#22267a"], // periwinkle sapphire (MakeMyCareer indigo)
};

/** The gem backdrop shared by every thumbnail: a soft light at the top over the case study's gradient. */
export const gemBackdrop = (slug: string) =>
  `radial-gradient(70% 55% at 50% 30%, rgba(255,255,255,0.18), transparent 70%), linear-gradient(180deg, ${GEM[slug][0]}, ${GEM[slug][1]})`;

const ART: Record<string, { alt: string; node: ReactNode; dark?: boolean }> = {
  gusto: { node: <GustoThumb />, alt: "Gusto's new journey: homepage to How Gusto works, to lead, to account, with +25% account creations" },
  "zero-noise": { node: <ZeroNoiseThumb />, alt: "The Zero Noise page with its email revenue calculator in a browser, and the revenue estimate on a phone" },
  "ai-mentor": { node: <MentorThumb />, alt: "Leeco, ProPilot's AI mentor, with LeetCode, GeeksforGeeks and YouTube orbiting it, and its quiz, summary, hints and Easy Actions" },
  "ratings-reviews": { node: <OyoThumb />, alt: "A stack of OYO stay reviews with star ratings, and ₹25 Paytm cashback unlocked" },
  "builder-university": { node: <UniversityThumb />, alt: "Builder University: a learner 72% through their Learning Plan, with plans by role, progress and scores, and badges" },
  internshala: { node: <InternshalaThumb />, alt: "Internshala notifications arriving: pending review, application viewed, shortlisted, and a message from a recruiter" },
  "builder-design-system": { dark: true, node: <BlockThumb />, alt: "BLOCK, Builder.ai's design system: buttons, toggles, checkboxes, inputs, avatars, chips, tabs and sliders" },
  basecamp: { node: <BasecampThumb />, alt: "The redesigned Basecamp landing page in a browser" },
  natasha: { node: <NatashaThumb />, alt: "Natasha, Builder.ai's AI Product Manager: the immersive welcome in a browser and the compact side panel beside it" },
};

export const hasFeatureArt = (slug: string) => slug in ART;

/** The tile behind a thumbnail: class + the gem colour its glow uses. */
export function tileLook(slug: string): { className: string; style?: CSSProperties } {
  const dark = ART[slug].dark;
  return { className: `th-surface ${dark ? "th-surface--dark" : ""}`, style: { "--gem": dark ? "#8f7dff" : GEM[slug][1] } as CSSProperties };
}

/** bare: only the piece itself (when the tile around it already carries the surface from tileLook). */
export function FeatureArt({ slug, bare = false }: { slug: string; bare?: boolean }) {
  const art = ART[slug];
  const look = tileLook(slug);
  return (
    <ThumbPlay role="img" aria-label={art.alt} className={`tile-art absolute inset-0 ${bare ? "" : `overflow-hidden ${look.className}`}`} style={bare ? undefined : look.style}>
      {!bare && <Backdrop slug={slug} />}
      <div aria-hidden className="th-stage">
        {art.node}
      </div>
    </ThumbPlay>
  );
}
