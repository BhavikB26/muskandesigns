export type CaseStudyStat = {
  label: string;
  value: string;
};

export type CaseStudy = {
  slug: string;
  shortName: string;
  navLabel: string;
  /** Short context tag shown above the title, e.g. the company or "Personal project". */
  label?: string;
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
  {
    slug: "builder-design-system",
    shortName: "Builder Design System",
    navLabel: "Builder.ai Design System",
    label: "Builder.ai · Product Designer · Mar – Sep 2024",
    logo: "",
    logoWidth: 0,
    logoHeight: 0,
    title: "Building and scaling a Design System",
    summary:
      "Helped the design team with Head of design to build the design system. Created complex components like Cards, AI experience, Navigation etc.",
    shot: "/work/builder-design-system/slide-01.webp",
    shotWidth: 1920,
    shotHeight: 1080,
    gradientFrom: "rgba(202,187,233,0.4)",
    gradientTo: "rgba(202,187,233,0.6)",
    stats: [],
  },
  {
    slug: "builder-university",
    shortName: "Builder University",
    navLabel: "Builder University",
    label: "Builder.ai",
    logo: "",
    logoWidth: 0,
    logoHeight: 0,
    title: "Product to streamline onboarding new hires and third parties & more",
    summary:
      "A platform called Builder University that can onboard users into our platform and bring them up to speed automated & in a engaging way.",
    shot: "/work/builder-university/slide-01.webp",
    shotWidth: 1805,
    shotHeight: 1015,
    gradientFrom: "rgba(179,222,193,0.6)",
    gradientTo: "rgba(179,222,193,0.4)",
    stats: [],
  },
  {
    slug: "ratings-reviews",
    shortName: "Ratings & Reviews",
    navLabel: "Ratings & Reviews (Review SaaS)",
    label: "Review SaaS",
    logo: "",
    logoWidth: 0,
    logoHeight: 0,
    title: "Rating and review system aka REVIEW SAAS",
    summary:
      "Reward program to collect guest’s quality review post checkout.",
    shot: "/work/ratings-reviews/slide-01.webp",
    shotWidth: 1920,
    shotHeight: 1080,
    gradientFrom: "rgba(255,173,173,0.6)",
    gradientTo: "rgba(255,173,173,0.4)",
    stats: [],
  },
  {
    slug: "studio-store",
    shortName: "Studio Store",
    navLabel: "Studio Store",
    label: "Concept redesign",
    logo: "",
    logoWidth: 0,
    logoHeight: 0,
    title: "Studio Store",
    summary:
      "Studio Store apps are 'digital starter kits' to enable micro SME businesses to get online quickly and cost effectively.",
    shot: "/work/studio-store/slide-01.webp",
    shotWidth: 1920,
    shotHeight: 1080,
    gradientFrom: "rgba(202,187,233,0.4)",
    gradientTo: "rgba(202,187,233,0.6)",
    stats: [],
  },
  {
    slug: "internshala",
    shortName: "Internshala",
    navLabel: "Internshala App Revamp",
    label: "Personal project, not affiliated with Internshala",
    logo: "",
    logoWidth: 0,
    logoHeight: 0,
    title: "A Case Study on revamping the Internshala App",
    summary:
      "Bringing more clarity to the internship search, application and tracking experience along with a UI refresh.",
    shot: "/work/internshala/slide-01.webp",
    shotWidth: 1243,
    shotHeight: 1381,
    gradientFrom: "rgba(179,222,193,0.6)",
    gradientTo: "rgba(179,222,193,0.4)",
    stats: [],
  },
  {
    slug: "swiping-loop",
    shortName: "The Swiping Loop",
    navLabel: "The Swiping Loop (UX research)",
    label: "Self-initiated · Solo UX researcher · 4 weeks",
    logo: "",
    logoWidth: 0,
    logoHeight: 0,
    title: "The swiping loop",
    summary:
      "How the traditional swiping system in dating apps is making it increasingly challenging for users to explore potential partners & meaningful interactions and how might we prioritize direct communication between users.",
    shot: "/work/swiping-loop/slide-01.webp",
    shotWidth: 1440,
    shotHeight: 1042,
    gradientFrom: "rgba(255,173,173,0.6)",
    gradientTo: "rgba(255,173,173,0.4)",
    stats: [],
  },
  {
    slug: "basecamp",
    shortName: "Basecamp",
    navLabel: "Basecamp Landing Page",
    label: "Concept redesign",
    logo: "",
    logoWidth: 0,
    logoHeight: 0,
    title: "Re-Designing Basecamp's Landing Page",
    summary:
      "A B2B SaaS UI/UX case study. Important features or benefits were buried too deep, requiring excessive scrolling or clicks.",
    shot: "/work/basecamp/slide-01.webp",
    shotWidth: 1440,
    shotHeight: 1600,
    gradientFrom: "rgba(202,187,233,0.4)",
    gradientTo: "rgba(202,187,233,0.6)",
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
