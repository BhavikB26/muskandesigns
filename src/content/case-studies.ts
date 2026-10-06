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
    slug: "wildflower",
    shortName: "Wildflower",
    navLabel: "Wildflower App Redesign",
    logo: "/home/wildflower-logo.png",
    logoWidth: 512,
    logoHeight: 67,
    title: "From low engagement to personalized, scalable UX",
    summary:
      "Redesigned a white-labeled B2C mobile app, creating a flexible, user-centered experience that's projected to increase engagement, satisfaction, and long-term retention.",
    shot: "/home/wildflower-shot.png",
    shotWidth: 1438,
    shotHeight: 948,
    gradientFrom: "rgba(255,173,173,0.6)",
    gradientTo: "rgba(255,173,173,0.4)",
    stats: [],
  },
  {
    slug: "gusto",
    shortName: "Gusto",
    navLabel: "Gusto Sign Up Testing",
    logo: "/home/gusto-logo.png",
    logoWidth: 512,
    logoHeight: 194,
    title: "Boosting Gusto.com's signup funnel via iterative testing",
    summary:
      "Introduced a password-free lead form and tailored content, increasing visits converting to leads by 15% and boosting sign-ups by 25%.",
    shot: "/home/gusto-shot.png",
    shotWidth: 1800,
    shotHeight: 1200,
    gradientFrom: "rgba(202,187,233,0.4)",
    gradientTo: "rgba(202,187,233,0.6)",
    stats: [],
  },
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
  {
    slug: "therabody",
    shortName: "Therabody PLP",
    navLabel: "Therabody PDP Testing",
    logo: "/home/therabody-logo.png",
    logoWidth: 512,
    logoHeight: 99,
    title: "Optimizing Therabody.com's PDP for conversion",
    summary:
      "Used lightweight A/B testing to increase product page conversion rates by up to 22%—without bloating engineering timelines.",
    shot: "/home/therabody-shot.png",
    shotWidth: 1800,
    shotHeight: 1200,
    gradientFrom: "rgba(179,222,193,0.6)",
    gradientTo: "rgba(179,222,193,0.4)",
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
