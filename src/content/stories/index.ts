import { basecamp } from "./basecamp";
import { block } from "./block";
import { gusto } from "./gusto";
import { internshala } from "./internshala";
import { natasha } from "./natasha";
import { oyo } from "./oyo";
import { propilot } from "./propilot";
import type { Story } from "./types";
import { university } from "./university";
import { zeroNoise } from "./zero-noise";

export const stories: Record<string, Story> = Object.fromEntries(
  [gusto, propilot, zeroNoise, block, internshala, natasha, oyo, university, basecamp].map((s) => [s.slug, s]),
);

export const getStory = (slug: string): Story | undefined => stories[slug];
