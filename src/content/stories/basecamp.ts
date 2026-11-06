import { shot } from "@/content/case-studies";
import type { Story } from "./types";

const b = (f: string) => `/work/basecamp/${f}`;

export const basecamp: Story = {
  slug: "basecamp",
  hero: {
    tags: ["Self-initiated", "Landing page", "Information architecture", "Visual design"],
    headline: "Explaining a feature-rich product in the right order.",
    line: "A self-initiated redesign of Basecamp’s landing page, reorganised around what visitors need to understand first, so the product’s breadth stops feeling complicated.",
    facts: [
      { k: "Role", v: "Product Designer (solo)" },
      { k: "Type", v: "Self-initiated concept" },
      { k: "Timeline", v: "Sep – Oct 2024" },
      { k: "Scope", v: "Audit, IA, visual design" },
    ],
    media: { kind: "showcase", v: { kind: "laptop", shot: shot(b("img-final-hero.webp"), "The redesigned hero: Your Projects, Perfectly Organized"), scroll: false } },
  },
  context: {
    copy: [
      "Basecamp is built on an opinionated idea: teams don’t need more tools, they need a simpler place to organise work and talk about it.",
      "Its product includes to-dos, chat, message boards, files, schedules, reporting, check-ins and integrations. That breadth is a strength in the product and a problem on a landing page.",
    ],
    media: { kind: "showcase", v: { kind: "board", shot: shot(b("img-why.webp"), "Four problems with the existing page"), caption: "My audit of the existing page" } },
  },
  role: {
    statement: "A solo concept: I audited the existing page, rebuilt its information architecture and designed the new page and its visual system.",
    owned: ["Audit of hierarchy, navigation, sequence and CTAs", "Information architecture", "Visual direction and the final page"],
    with: ["No one; a self-initiated project"],
    constraints: ["Keep Basecamp’s brand and plain-spoken personality", "No access to Basecamp’s data"],
  },
  approach: "The audit found four issues; the redesign answers them by changing the order, not the content.",
  decisions: [
    {
      title: "Lead with the job, not the inventory",
      problem: "The hero held so much information that understanding the core value took more reading than it should.",
      explored: "A hero about the outcome (centralise work, collaborate clearly, keep projects moving) with features arriving later as proof.",
      why: "It sets a better order: why should I care, then how does it work, then what exactly do I get.",
      media: [{ kind: "showcase", v: { kind: "board", shot: shot(b("img-ia.webp"), "Information architecture of the landing page"), caption: "The new page structure" } }],
    },
    {
      title: "Show the features working together",
      problem: "A to-do list isn’t a differentiator, and neither is chat. Basecamp’s value is those things living around the same project.",
      explored: "Interface moments that show messages, to-dos, files and updates operating together on one project, instead of a disconnected checklist.",
      why: "Visitors see the relationship between features, which is the thing Basecamp actually sells.",
      media: [{ kind: "showcase", v: { kind: "browser", shots: [shot(b("img-features.webp"), "The product shown in use")] } }],
    },
    {
      title: "Group capabilities by the job they do",
      problem: "Every capability at equal weight makes scanning into reading.",
      explored: "Groups people recognise: organise work, communicate, keep knowledge together, understand progress, protect focus, extend the workflow.",
      why: "Visitors get a mental model before they meet the long tail of features.",
      media: [{ kind: "showcase", v: { kind: "browser", shots: [shot(b("img-integrations.webp"), "Integrations and essential features")] } }],
    },
    {
      title: "Sell focus, and put proof beside claims",
      problem: "Notification control read like a setting, and testimonials sat in an isolated carousel.",
      explored: "Focus framed as philosophy (“your project tool doesn’t need to own your attention”), with evidence placed next to the claim it supports.",
      why: "The page reads as an argument, not a collection of sections, and testimonials become evidence rather than decoration.",
      media: [{ kind: "showcase", v: { kind: "board", shot: shot(b("img-palette.webp"), "The colour palette and gradients"), caption: "A clearer colour system, keeping Basecamp’s energy" } }],
    },
  ],
  interactive: {
    title: "Read the new page in order",
    prompt: "Step through the redesigned page section by section. Each one prepares you for the next.",
    note: "The final page design, cut at its section breaks. Tall sections scroll inside the frame.",
    module: {
      id: "walkthrough",
      steps: [
        { title: "The promise", body: "What does Basecamp help teams do? One line, one call to action, the jobs underneath.", frame: "plain", shot: shot(b("cs/bc-s1-promise.webp"), "The redesigned hero: Your Projects, Perfectly Organized") },
        { title: "A project in context", body: "Message board, docs, to-dos, card table, chat and check-ins working around one project.", frame: "plain", shot: shot(b("cs/bc-s2-project.webp"), "A project shown in context: the tools working together") },
        { title: "Fits your workflow", body: "The tools teams already use, connected, so Basecamp doesn’t ask anyone to start over.", frame: "plain", shot: shot(b("cs/bc-s3-integrations.webp"), "Integrations with the tools teams already use") },
        { title: "Essential jobs", body: "Hill Charts, schedules, lineups, timesheets and notification protection, grouped by what they do for you.", frame: "plain", shot: shot(b("cs/bc-s4-jobs.webp"), "Essential features, with Hill Charts") },
        { title: "Proof", body: "Testimonials from real teams, placed after the claims they support.", frame: "plain", shot: shot(b("cs/bc-s5-proof.webp"), "Testimonials from Shopify and WP Site Care") },
        { title: "A clear next step", body: "One conversion point to finish, once the argument is made.", frame: "plain", shot: shot(b("cs/bc-s6-next.webp"), "The closing newsletter call to action") },
      ],
    },
  },
  outcome: {
    copy: [
      "The redesign keeps all of Basecamp’s functionality and changes the order in which someone has to understand it.",
      "As a self-initiated concept it has no conversion data. I’d test it against the current page on how quickly people can explain what Basecamp does, feature comprehension, CTA confidence and which benefits they recall.",
    ],
    media: { kind: "showcase", v: { kind: "laptop", shot: shot(b("cs/bc-page.webp"), "The full redesigned landing page, scrolling"), scroll: true } },
  },
  reflection: "Landing-page design is mostly sequencing. A page can hold every correct fact and still communicate poorly if the facts arrive in the wrong order.",
  sources: {
    figma: ["Portfolio-projects KEABZM1GitiLCq9YTXJdu6 / my work / “basecamp” 130:24081 (original case study)", "public/work/basecamp/cs/bc-page.webp (full final page) cut into sections by tools/mockups/basecamp-sections.cjs"],
    confirm: ["No screenshot of the original Basecamp page exists apart from the audit board, so there’s no before/after slider"],
  },
};
