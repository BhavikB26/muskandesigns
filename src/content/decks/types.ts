/** A case study rebuilt from Muskan's own Figma deck: each slide's text (verbatim) and its visual. */
export type DeckItem = { kind: "h" | "p" | "note"; text: string } | { kind: "list"; items: string[] };
export type DeckSlide = {
  id: string;
  /** Where the visual sat relative to the text in the original slide. */
  side: "left" | "right" | "stack" | "none" | "visual" | "text";
  items: DeckItem[];
  /** anim: the original animated GIF (as animated WebP); src is a still used when motion is paused. */
  img?: { src: string; width: number; height: number; anim?: string };
};
export type Deck = DeckSlide[];
