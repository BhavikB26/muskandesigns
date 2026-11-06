import { block } from "./block";
import { gusto } from "./gusto";
import { internshala } from "./internshala";
import { natasha } from "./natasha";
import { oyo } from "./oyo";
import { propilot } from "./propilot";
import { makemycareer } from "./makemycareer";
import { MORE_STORIES } from "./more";
import type { Story } from "./types";
import { zeroNoise } from "./zero-noise";

export const stories: Record<string, Story> = Object.fromEntries(
  [gusto, propilot, zeroNoise, block, internshala, natasha, oyo, makemycareer, ...MORE_STORIES].map((s) => [s.slug, s]),
);

export const getStory = (slug: string): Story | undefined => stories[slug];
