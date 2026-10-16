/* About section copy: Muskan's own words, from her live site. Skills and journey come from her resume. */
export const about = {
  headline: { lead: "I design like I have something to prove.", italic: "I do." },
  paragraphs: [
    "I’ve always been better at making things than explaining myself. Design was the first place that made sense to me, a blank page doesn’t need you to perform, it just needs you to be honest.",
    "I worked across products, brands, and industries that had nothing in common except they all needed someone who cared too much. Recently I’ve learned that being good at what you do isn’t the same as being known for it. This site is me closing that gap.",
  ],
  // Personality chips (decorative labels).
  chips: [
    { label: "ENFP-T", icon: "puzzle", tint: "#f8c9c6" },
    { label: "Cancer", icon: "cancer", tint: "#d9cff2" },
    { label: "Enneagram 5", icon: "brain", tint: "#c6e7d2" },
  ],
  stats: [
    { value: "3+", label: "years designing products" },
    { value: "50K", label: "learners on a product I designed" },
    { value: "11", label: "case studies" },
  ],
} as const;

/** What I can do for you (from her resume's skills), each with a preview from real work. */
export const skills = [
  {
    title: "UX research",
    items: ["User interviews", "Journey mapping", "Heuristic evaluation", "Desk research", "A/B testing"],
    preview: { src: "/work/ai-mentor/exact/finding-heatmap1.png", width: 1024, height: 679, alt: "A heatmap I sketched of where developers look on a LeetCode screen" },
  },
  {
    title: "Product & UX design",
    items: ["Information architecture", "End-to-end flows", "Wireframing & prototyping", "High-fidelity UI"],
    preview: { src: "/work/ratings-reviews/frame-1.webp", width: 370, height: 807, alt: "OYO's rate-your-experience screen" },
  },
  {
    title: "Design systems",
    items: ["Design tokens", "Component variants", "Dark mode", "Documentation"],
    preview: { src: "/work/builder-design-system/ds-buttons.webp", width: 1104, height: 478, alt: "BLOCK button variants in every state" },
  },
  {
    title: "AI & 0→1 products",
    items: ["MVP scoping", "AI interaction patterns", "Experimentation", "Analytics & PRDs"],
    preview: { src: "/work/ai-mentor/exact/sol1.png", width: 910, height: 648, alt: "ProPilot's Easy Actions next to a LeetCode problem" },
  },
] as const;

/** Journey (after ngan-nguyen.com and idoshitty.art), from her resume. */
export const journey = [
  { years: "Jan 2025 – Apr 2026", place: "Global social platform", role: "Contractual Product Designer" },
  { years: "Mar – Sep 2024", place: "Builder.ai", role: "Contractual Product Designer" },
  { years: "Oct – Dec 2023", place: "Preplaced", role: "Product Designer" },
  { years: "Jun – Aug 2023", place: "Women’s healthcare platform", role: "Product Design Intern" },
  { years: "2018 – 2022", place: "SRM Institute of Science & Technology", role: "B.Tech, Computer Science" },
] as const;
