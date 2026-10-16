import { caseStudies } from "./case-studies";

/** One card on the work grid (home page and /work). */
export type WorkTile = {
  slug: string;
  href: string;
  label: string;
  headline: string;
  blurb: string;
};

/** How many cards the home page shows before "View all case studies". */
export const HOME_TILE_COUNT = 4;

/* Order of the grid; the first HOME_TILE_COUNT appear on the home page. */
const ORDER = [
  "gusto",
  "ai-mentor",
  "builder-design-system",
  "wildflower",
  "ratings-reviews",
  "therabody",
  "builder-university",
  "basecamp",
  "internshala",
  "swiping-loop",
  "studio-store",
];

export const WORK_TILES: WorkTile[] = ORDER.flatMap((slug) => {
  const c = caseStudies.find((x) => x.slug === slug);
  return c ? [{ slug, href: `/work/${slug}`, ...c.card }] : [];
});
