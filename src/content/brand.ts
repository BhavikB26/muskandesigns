/** Brand colours per project, shared by the home tiles and the case study pages. */
export type Brand = { base: string; deep: string; soft: string; ink: "light" | "dark" };

export const BRAND: Record<string, Brand> = {
  "ai-mentor": { base: "#4330b8", deep: "#1b1252", soft: "#ece9fb", ink: "light" },
  "builder-design-system": { base: "#2b2440", deep: "#0d0b16", soft: "#eeecf4", ink: "light" },
  "builder-university": { base: "#17706a", deep: "#073330", soft: "#e4f1ef", ink: "light" },
  "ratings-reviews": { base: "#d23a42", deep: "#6a1016", soft: "#fbe9e8", ink: "light" },
  internshala: { base: "#0d86d1", deep: "#04395e", soft: "#e3f2fb", ink: "light" },
  basecamp: { base: "#f3cd47", deep: "#1d1b16", soft: "#fbf4dc", ink: "dark" },
  natasha: { base: "#7c4dff", deep: "#2a0f6e", soft: "#f1ebff", ink: "light" },
  gusto: { base: "#f3a68d", deep: "#c7573f", soft: "#fcefe9", ink: "dark" },
};

export const brandOf = (slug: string): Brand => BRAND[slug] ?? { base: "#2a2733", deep: "#151412", soft: "#efede8", ink: "light" };
