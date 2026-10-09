import type { Deck } from "./types";
import { deck as ratingsReviews } from "./ratings-reviews";
import { deck as builderDesignSystem } from "./builder-design-system";
import { deck as builderUniversity } from "./builder-university";
import { deck as basecamp } from "./basecamp";
import { deck as internshala } from "./internshala";

/** Case studies rebuilt from Muskan's own Figma decks (text and order kept as she wrote them). */
export const decks: Record<string, Deck> = {
  "ratings-reviews": ratingsReviews,
  "builder-design-system": builderDesignSystem,
  "builder-university": builderUniversity,
  basecamp,
  internshala,
};
