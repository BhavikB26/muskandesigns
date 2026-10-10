/** A case study rebuilt from Muskan's own Figma deck: each slide's text (verbatim) and its visual. */
export type DeckItem =
  | { kind: "h" | "sub" | "p" | "note"; text: string }
  | { kind: "list"; items: string[] }
  /** Small label above a section heading ("Solution (1/3)"). */
  | { kind: "eyebrow"; text: string }
  /** Store reviews she quoted (name, stars out of 5, date, text). */
  | { kind: "reviews"; reviews: { name: string; rating: number; date: string; text: string }[] }
  /** Status tags shown as coloured pills. */
  | { kind: "tags"; tags: { label: string; tone: "blue" | "green" | "amber" | "indigo" | "peach" | "red" }[] }
  /** A row of separate logos or app icons. */
  | { kind: "logos"; logos: { src: string; alt: string; width: number; height: number }[] }
  /** Separate elements laid out the way she placed them (positions in her slide's px; w/h = their bounding box). */
  | { kind: "pieces"; w: number; h: number; pieces: { src: string; x: number; y: number; w: number; h: number; alt: string; radius?: number; shadow?: boolean }[] }
  /** Research personas as cards. */
  | { kind: "personas"; personas: { name: string; meta: string; goals: string[]; challenges: string[] }[] }
  /** Team members as cards. */
  | { kind: "team"; members: { name: string; role: string; photo?: string }[] }
  /** A key statement (problem, How Might We) set apart from the body text. */
  | { kind: "highlight"; text: string }
  /** Label / value pairs (status, tools, timeline). */
  | { kind: "facts"; facts: { label: string; value: string }[] }
  /** A sticker-style callout from the deck (white pill). */
  | { kind: "pill"; text: string; sub?: string }
  /** Yellow sticky notes, laid out in a grid. */
  | { kind: "stickies"; notes: { title?: string; text: string }[]; tone?: "outline" }
  /** Big figures with a label and the source she cited. */
  | { kind: "stats"; stats: { value: string; label: string; source?: string }[] }
  /** A participant quote. */
  | { kind: "quote"; text: string; cite?: string }
  /** Small labelled tags; "on" marks the highlighted one. */
  | { kind: "chips"; items: string[]; on?: number }
  /** Full-width rows with a leading marker (📍, ✅). */
  | { kind: "rows"; marker: string; items: string[] };
export type DeckSlide = {
  id: string;
  /** Where the visual sat relative to the text in the original slide. */
  side: "left" | "right" | "stack" | "none" | "visual" | "text";
  items: DeckItem[];
  /** Text that sat below the visual in the original slide. */
  after?: DeckItem[];
  /** anim: the original animated GIF (as animated WebP); src is a still used when motion is paused. */
  /** frame "laptop": a long web page shown scrolling inside a laptop screen. */
  /** A click-through prototype: one laptop screen per step, with that step's text. */
  flow?: { label: string; items: DeckItem[]; img: { src: string; width: number; height: number; alt: string } }[];
  /** frame "phone": a long phone screen scrolling between its fixed top and bottom bars (parts). */
  img?: {
    src: string;
    width: number;
    height: number;
    anim?: string;
    alt?: string;
    frame?: "laptop" | "phone";
    parts?: { top?: { src: string; width: number; height: number }; bottom?: { src: string; width: number; height: number } };
  };
};
export type Deck = DeckSlide[];
