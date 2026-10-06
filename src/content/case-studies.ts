export type CaseStudyStat = {
  label: string;
  value: string;
};

export type CaseStudy = {
  slug: string;
  shortName: string;
  navLabel: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  title: string;
  summary: string;
  shot: string;
  shotWidth: number;
  shotHeight: number;
  gradientFrom: string;
  gradientTo: string;
  stats: CaseStudyStat[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-mentor",
    shortName: "ProPilot AI",
    navLabel: "ProPilot AI Mentor",
    logo: "",
    logoWidth: 560,
    logoHeight: 180,
    title: "Designing the AI Mentor experience from 0→1 for the first 50,000 learners",
    summary:
      "Designed ProPilot's always-available AI mentor across LeetCode, GFG, and YouTube, lifting message initiation from 17% to 84% and Week 4 retention from 3% to 38%.",
    shot: "/work/ai-mentor/shot.png",
    shotWidth: 606,
    shotHeight: 398,
    gradientFrom: "rgba(255,229,126,0.6)",
    gradientTo: "rgba(255,174,102,0.4)",
    stats: [],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getAdjacentCaseStudies(slug: string) {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];
  return { prev, next };
}
