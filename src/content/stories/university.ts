import { shot } from "@/content/case-studies";
import type { Story } from "./types";

const u = (f: string) => `/work/builder-university/${f}`;

export const university: Story = {
  slug: "builder-university",
  hero: {
    tags: ["0 → 1", "Internal product", "Learning platform", "Gamification"],
    headline: "Turning repeated onboarding into a product that teaches itself.",
    line: "At Builder.ai I designed Builder University from a quick WordPress pilot to a custom learning platform, so hundreds of new experts could learn the company without someone teaching them each time.",
    facts: [
      { k: "Role", v: "Product Designer" },
      { k: "Company", v: "Builder.ai" },
      { k: "Type", v: "0 → 1 internal product" },
      { k: "Status", v: "Beta, inside Builder Hive" },
    ],
    media: { kind: "showcase", v: { kind: "browser", shots: [shot(u("frame-1.webp"), "A role-based learning plan with ordered courses")] } },
  },
  context: {
    copy: [
      "Builder.ai delivered client projects with a large network of employees and third-party experts. New experts often joined while projects were already moving.",
      "The people best placed to teach them were busy doing their own work. Learning depended on people repeatedly teaching people, which doesn’t scale when hundreds of experts can be arriving.",
    ],
  },
  role: {
    statement: "This was one of my first products designed from zero: the pilot, the information architecture, every surface and its states, and close QA with engineering until it shipped.",
    owned: ["The pilot and what we learned from it", "IA, Learning Plans, dashboard and Learning Hub", "Gamification, plus QA rounds with developers"],
    with: ["Engineering and QA", "Course authors and internal teams"],
    constraints: ["The company needed something immediately", "Limited engineering for a points-heavy game system"],
  },
  approach: "The challenge wasn’t building an LMS; video lessons and quizzes are solved problems. It was direction.",
  decisions: [
    {
      title: "Don’t wait for the product",
      problem: "A custom platform first would have delayed any benefit and forced decisions before we’d seen how people learned.",
      explored: "A deliberately temporary WordPress pilot so authors could start producing content and real learners could use it.",
      why: "It solved the immediate need and became a research tool: people were new to Builder and to the platform, needed different material by role, and needed motivation.",
      media: [{ kind: "showcase", v: { kind: "browser", shots: [shot(u("img-pilot-screen.webp"), "The WordPress pilot")], caption: "The WordPress pilot" } }],
    },
    {
      title: "Answer “what should I do next?”",
      problem: "A course catalogue gives choice, and choice doesn’t help someone who has no idea what they need.",
      explored: "Learning Plans assigned by role or department, with sequenced courses, prerequisites and visible locked states.",
      why: "It turns “here is everything Builder knows” into “here is what you need next”, which is what onboarding actually is.",
      media: [{ kind: "showcase", v: { kind: "board", shot: shot(u("img-dashboard-clean.webp"), "Learning time, score and the plan tracker"), caption: "The dashboard: where you left off, what you’ve done, what’s next" } }],
    },
    {
      title: "Celebrate progress, not points",
      problem: "Assigned learning can feel like an endless list of corporate videos, but a full points economy would cost a lot and distract from the learning.",
      explored: "After studying LinkedIn Learning and Duolingo: tiers from a base level, badges at real milestones, completion screens, learning time and scores, and shareable certificates.",
      why: "People get a sense of momentum without a game system we couldn’t afford to build, and the reward never outranks the skill.",
      media: [{ kind: "showcase", v: { kind: "board", shot: shot(u("img-badges-clean.webp"), "Tiers, badges and course progress") } }],
    },
    {
      title: "Stay useful after onboarding",
      problem: "Interviews showed existing employees also needed to learn other Builder products, and had nowhere to do it.",
      explored: "A Learning Hub where anyone can browse the wider catalogue and enrol beyond their plan, with course previews covering length, level, curriculum and prerequisites.",
      why: "The platform becomes ongoing infrastructure rather than a checklist people abandon after week one, with room for what came next.",
      media: [{ kind: "showcase", v: { kind: "browser", shots: [shot(u("frame-2.webp"), "The Learning Hub")] } }],
    },
  ],
  interactive: {
    title: "Walk through a new expert’s first week",
    prompt: "Follow the path from the temporary pilot to the product that replaced it.",
    note: "Screens from the pilot and the custom platform.",
    module: {
      id: "walkthrough",
      steps: [
        { title: "Day zero: the pilot", body: "Before the product existed, a WordPress pilot let real learners use real content, and showed us what they struggled with.", frame: "laptop", shot: shot(u("img-pilot-screen.webp"), "The WordPress pilot") },
        { title: "Your plan, by role", body: "A learning plan assigned to your role, in order, with prerequisites that unlock as you go.", frame: "plain", shot: shot(u("frame-1.webp"), "A role-based learning plan with ordered courses") },
        { title: "Where you left off", body: "The dashboard shows plan completion, learning time, average score and what remains.", frame: "plain", shot: shot(u("img-dashboard-clean.webp"), "Learning time, score and the plan tracker") },
        { title: "Levelling up", body: "Tiers and badges mark real milestones, with certificates you can share.", frame: "plain", shot: shot(u("img-badges-clean.webp"), "Tiers, badges and course progress") },
        { title: "Beyond onboarding", body: "The Learning Hub opens the wider catalogue to anyone who wants to learn another part of Builder.", frame: "plain", shot: shot(u("frame-2.webp"), "The Learning Hub") },
      ],
    },
  },
  outcome: {
    copy: [
      "Builder University became an internal learning platform inside Builder Hive, moving onboarding away from repeated human instruction towards a self-serve system.",
      "It stayed in beta, so there’s no honest before/after engagement metric to show. The real outcome was operational: onboarding knowledge could finally scale independently of how many people were free to teach it.",
    ],
    media: { kind: "showcase", v: { kind: "board", shot: shot(u("img-flow.webp"), "The product flow: from the learning dashboard to the curriculum, the lesson, then tests and quizzes"), caption: "The whole product, designed from scratch: dashboard, curriculum, lesson, quiz" } },
  },
  reflection: "0 → 1 doesn’t mean 0 → perfect. The smartest first version was the one we already knew we’d replace, because it let us learn before investing in the real thing.",
  sources: {
    figma: ["Portfolio-projects KEABZM1GitiLCq9YTXJdu6 / my work / “builder university” 130:13129 (original case study)", "Existing exports in public/work/builder-university"],
    confirm: ["Project dates (not stated)", "No dated outcome metrics (the platform stayed in beta)"],
  },
};
