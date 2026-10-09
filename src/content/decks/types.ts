/** A case study rebuilt from Muskan's own Figma deck: each slide's text (verbatim) and its visual. */
export type DeckItem =
  | { kind: "h" | "sub" | "p" | "note"; text: string }
  | { kind: "list"; items: string[] }
  /** A sticker-style callout from the deck (white pill). */
  | { kind: "pill"; text: string; sub?: string }
  /** Yellow sticky notes, laid out in a grid. */
  | { kind: "stickies"; notes: { title?: string; text: string }[] }
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
  img?: { src: string; width: number; height: number; anim?: string; alt?: string; frame?: "laptop" };
};
export type Deck = DeckSlide[];
