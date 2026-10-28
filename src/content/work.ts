import { caseStudies } from "./case-studies";

/** One card on the work grid (home page and /work). */
export type WorkTile = {
  slug: string;
  href: string;
  /** Short project name, for the caption pill on the thumbnail. */
  name: string;
  label: string;
  headline: string;
  blurb: string;
};

/** The four case studies on the home page, in order (Muskan's pick). */
export const HOME_SLUGS = ["gusto", "ai-mentor", "zero-noise", "builder-design-system"];

/** /work follows the order of caseStudies (Muskan's order: 01 Gusto … 08 Basecamp). */
export const WORK_TILES: WorkTile[] = caseStudies.map((c) => ({
  slug: c.slug,
  href: `/work/${c.slug}`,
  name: c.name,
  label: c.label,
  headline: c.title,
  blurb: c.intro,
}));

export const HOME_TILES: WorkTile[] = HOME_SLUGS.flatMap((s) => WORK_TILES.filter((t) => t.slug === s));
