import { block } from "./block";
import { natasha } from "./natasha";
import type { Story } from "./types";

export const stories: Record<string, Story> = Object.fromEntries([block, natasha].map((s) => [s.slug, s]));

export const getStory = (slug: string): Story | undefined => stories[slug];
