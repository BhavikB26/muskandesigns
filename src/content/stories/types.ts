import type { Shot, Visual } from "@/content/case-studies";

/*
 * Case studies, editorial edition (after portfolio.designwithdaria.com): every project tells the same seven-part
 * story — Hero, Context, My role, Approach (three or four design decisions), an interactive piece, Outcome and
 * Reflection — with the work carrying most of it. Copy lives here; layout lives in components/story.
 *
 * Only verified facts go in these files. Anything still to confirm is listed under `sources.confirm`, which is
 * for the handover and never rendered.
 */

/** A labelled fact in the hero's info strip (Role, Company, Type, Timeline…). */
export type Fact = { k: string; v: string };

/** A screen shown in a gallery row: framed as a phone, a side panel, a laptop, or plain. */
export type GalleryItem = { shot: Shot; label?: string; frame?: "phone" | "panel" | "laptop" | "plain" };

export type StoryMedia =
  /** Any of the case-study visuals (device frames on the gem panel). */
  | { kind: "showcase"; v: Visual }
  /** Several boards behind tabs (foundations: colour, type, spacing). */
  /** frame: board (a white card, for boards) or browser (a browser window, for web screens shown whole). */
  | { kind: "tabs"; items: { label: string; shot: Shot }[]; caption?: string; frame?: "board" | "browser" }
  /** Screens side by side, each with an optional label, at a matching height. */
  | { kind: "gallery"; items: GalleryItem[]; caption?: string }
  /** Two web screens as overlapping browser windows on a desktop, each shown whole; labels name them. */
  | { kind: "windows"; shots: [Shot, Shot]; labels?: [string, string]; caption?: string }
  /** Animated states shown side by side (Natasha's voice orb), each still when motion is reduced. */
  | { kind: "states"; items: { label: string; note: string; anim: string; still: string }[]; caption?: string }
  /** Strips stacked on a white canvas (component states such as Natasha's voice bar). */
  | { kind: "strips"; items: { label: string; shot: Shot }[]; caption?: string };

export type Decision = {
  title: string;
  /** The problem or trade-off. */
  problem: string;
  /** What I explored or changed. */
  explored: string;
  /** Why this direction. */
  why: string;
  media?: StoryMedia[];
};

/** One step of a guided walkthrough: real screens, in the real order. */
/** device: a mockup that already includes its own frame (a transparent phone). */
export type Step = { title: string; body: string; shot: Shot; frame: "phone" | "laptop" | "panel" | "plain" | "device" | "browser" };

export type Interactive =
  | { id: "block-playground" }
  | { id: "natasha-modes" }
  | { id: "revenue-calculator" }
  | { id: "walkthrough"; steps: Step[] }
  /** Two or more journeys through the same product (job seeker / employer), switched by a toggle. */
  | { id: "paths"; paths: { label: string; steps: Step[] }[] }
  | { id: "before-after"; before: Shot; after: Shot; labels: [string, string]; frame?: "laptop" | "plain" };

export type Story = {
  slug: string;
  /** Projects beyond the main nine: listed under More projects on /work, never on the homepage. */
  more?: {
    /** The project name (these have no entry in case-studies.ts). */
    name: string;
    /** One line for the card on /work. */
    label: string;
    thumb: Shot;
    /** The project colour: [tint, ink]. */
    gem: [string, string];
  };
  hero: {
    /** The name as set in the hero (defaults to the case study's name). */
    name?: string;
    tags: string[];
    headline: string;
    line: string;
    facts: Fact[];
    media: StoryMedia;
  };
  context: { copy: string[]; media?: StoryMedia };
  /** ownedLabel: the heading over `owned` ("I owned" by default; team projects say where I contributed). */
  role: { statement: string; owned: string[]; ownedLabel?: string; with: string[]; constraints?: string[] };
  /** One line that frames the decisions. */
  approach?: string;
  decisions: Decision[];
  interactive: { title: string; prompt: string; note?: string; module: Interactive };
  outcome: { copy: string[]; metrics?: { value: string; label: string; note?: string }[]; media?: StoryMedia };
  reflection: string;
  links?: { label: string; href: string }[];
  /** For the handover only, never rendered. */
  sources: { figma: string[]; confirm?: string[] };
};
