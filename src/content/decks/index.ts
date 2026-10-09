import type { Deck } from "./types";
import { deck as ratingsReviews } from "./ratings-reviews";

/** Case studies rebuilt from Muskan's own Figma decks (text and order kept as she wrote them). */
export const decks: Record<string, Deck> = {
  "ratings-reviews": ratingsReviews,
};
