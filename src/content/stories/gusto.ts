import { shot } from "@/content/case-studies";
import type { Story } from "./types";

const g = (f: string) => `/work/gusto/${f}`;

const TABS: [string, string, string][] = [
  ["Payroll", "carousel-1.png", "Run payroll in minutes: sync hours, review a summary, submit. Taxes and compliance are handled in the background."],
  ["Time and attendance", "carousel-2.png", "Time-off requests, project tracking, PTO policies and mobile time tracking, all combined with payroll."],
  ["Hiring and onboarding", "carousel-3.png", "Job postings, offer letters, onboarding checklists and e-signatures, from offer to first day."],
  ["Employee benefits", "carousel-4.png", "Health, 401(k), HSA and FSA options with licensed advisors, sized for a small team’s budget."],
  ["Talent management", "carousel-5.png", "Performance reviews and learning resources, with integrations to other performance tools."],
  ["Insights and reporting", "carousel-6.png", "Tax-credit identification, compliance alerts and workforce costing; this last tab hands off to Create account."],
];

// The live How Gusto Works page keeps its header and left column in place while the questions scroll.
const GUSTO_PIN = { x: 1441 / 2880, top: 152 / 2880 };

export const gusto: Story = {
  slug: "gusto",
  hero: {
    tags: ["Growth design", "Funnel strategy", "A/B testing", "Responsive UI"],
    headline: "Making signup work for people who weren’t ready to sign up.",
    line: "As an independent designer, I split Gusto’s signup funnel in two, so curious visitors could learn first and commit later without losing anyone who was ready to start.",
    facts: [
      { k: "Client", v: "Gusto (freelance)" },
      { k: "Traffic", v: "~200K organic visitors" },
    ],
    media: { kind: "showcase", v: { kind: "laptop", shot: { ...shot(g("howworks-desktop-hd.webp"), "How Gusto Works on desktop: get started, pick the areas you care about"), pin: GUSTO_PIN }, scroll: true } },
  },
  context: {
    copy: [
      "Gusto.com had healthy organic traffic. The trouble was what happened after people arrived.",
      "The funnel assumed everyone was ready to create an account: homepage, survey, account, email verification. But payroll is a high-consideration decision. Onboarding drop-off reached roughly 25%, and visitors who weren’t ready had no meaningful way to become a lead.",
    ],
    media: { kind: "showcase", v: { kind: "devices", shots: [shot(g("audit-flow.png"), "The original flow: homepage, survey, account creation and email verification")], caption: "The original flow, left to right" } },
  },
  role: {
    statement: "I was the product designer on the funnel from audit to rollout: the hypothesis, three rounds of experiments and the responsive UI, working across four teams.",
    owned: ["Funnel audit and hypothesis", "Experiment design and A/B variants", "The lead journey and responsive UI"],
    with: ["Product", "Sales", "Product marketing (PMM)", "Brand"],
    constraints: ["A revenue-critical surface", "Limited engineering capacity", "Existing CMS and Workbench components"],
  },
  approach: "Instead of asking for the perfect signup, I asked for the smallest change that could tell us something about intent.",
  decisions: [
    {
      title: "Two doors instead of one",
      problem: "The homepage had one dominant next step, Create account, as if every visitor had arrived with the same goal.",
      explored: "A second entry, How Gusto Works, beside Create account, tested as an A/B variation while the direct path stayed exactly where it was.",
      why: "It gave people who needed context a lower-pressure route without making signup any harder for those who were ready.",
      media: [{ kind: "showcase", v: { kind: "compare", frame: "browser", shots: [shot(g("ab-1-control-l.webp"), "Gusto.com homepage, control: Create account is the only button in the top navigation", "Control"), shot(g("ab-1-variation-l.webp"), "Gusto.com homepage, variation: How it works leads the top navigation, beside Create account", "Variation")] } }],
    },
    {
      title: "A lead without a password",
      problem: "Choosing “How Gusto Works” shouldn’t bounce people straight back into account creation.",
      explored: "A light journey: pick the product areas you care about, answer a few qualifying questions, leave contact details with no password, then see content tailored to those choices.",
      why: "The business gets a qualified lead even when the visitor isn’t ready for an account, and Sales gets context before the handoff.",
      media: [
        { kind: "showcase", v: { kind: "devices", shots: [shot(g("create-account-flow.png"), "The new flow: How Gusto Works, picking product areas, tailored content, then a prefilled account form")], caption: "The new journey, left to right" } },
        { kind: "showcase", v: { kind: "compare", frame: "plain", shots: [shot(g("ab-2-control.png"), "Product survey, control", "Control"), shot(g("ab-2-variation.png"), "Product survey, variation", "Variation")] } },
      ],
    },
    {
      title: "Carry everything forward",
      problem: "A separate learning path could easily become a dead end before signup.",
      explored: "Everything a visitor shared on the way carries into the account form, so at the end most of it is already filled in and they mainly need a password.",
      why: "It’s a gentler ramp into the same funnel, not a second marketing journey competing with it.",
      media: [{ kind: "showcase", v: { kind: "phones", shots: [shot(g("howworks-mobile.png"), "How Gusto Works on mobile"), shot(g("final-mobile.png"), "Account creation on mobile, prefilled")] } }],
    },
    {
      title: "Earn the right to scale",
      problem: "A big redesign would have been slower, riskier and impossible to attribute.",
      explored: "One behavioural hypothesis per test; questions trimmed with Sales to the ones that changed what happened next; then How Gusto Works promoted into the global navigation.",
      why: "Each change proved itself before the next, and the move into navigation brought about 80% more traffic into the journey.",
      media: [{ kind: "showcase", v: { kind: "laptop", scroll: true, shot: { ...shot(g("howworks-desktop-hd.webp"), "How Gusto Works on desktop, the full page"), pin: GUSTO_PIN } } }],
    },
  ],
  interactive: {
    title: "Browse How Gusto Works",
    prompt: "This is the education layer from experiment 02: one tab per product area. Step through it the way a visitor who picked those areas would.",
    note: "Screens from the shipped How Gusto Works page.",
    module: { id: "walkthrough", steps: TABS.map(([title, f, body]) => ({ title, body, frame: "laptop", shot: shot(g(f.replace(".png", "-l.webp")), `How Gusto Works, ${title} tab`) })) },
  },
  outcome: {
    copy: [
      "Across the final rounds of testing, separating “I’m ready” from “show me more” lifted both leads and signups.",
      "Sales also got better handoffs, because leads arrived described by the product areas they were actually evaluating.",
    ],
    metrics: [
      { value: "+15%", label: "Visits converting to leads" },
      { value: "+25%", label: "Account creations" },
      { value: "+1,000", label: "New businesses running payroll each month" },
      { value: "~80%", label: "More traffic into How Gusto Works", note: "After it joined the global navigation" },
    ],
  },
  reflection: "Growth design isn’t always about removing friction. Here the bigger problem was pressure, and the most useful change was letting people understand the product before asking them to commit. Learn first, commit second.",
  sources: {
    figma: ["Learning-Journey sPHh5TjCbu7QotJbYG5Fh7 (node 4002-90929), shared earlier", "Existing exports in public/work/gusto (A/B variants, flows, How Gusto Works tabs)"],
    confirm: ["Exact project dates (copy says about three months)", "Whether the metrics come from the same test window"],
  },
};
