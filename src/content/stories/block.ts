import { shot } from "@/content/case-studies";
import type { Story } from "./types";

const b = (f: string) => `/work/builder-design-system/${f}`;
const n = (f: string) => `/work/natasha/v2/${f}`;

export const block: Story = {
  slug: "builder-design-system",
  hero: {
    name: "BLOCK",
    tags: ["Design system", "Components", "AI patterns", "Interaction states"],
    headline: "One design language for the products around Natasha.",
    line: "I helped rebuild Builder.ai’s design system, BLOCK 4.0, so a new AI Product Manager could launch inside a workspace that behaved the same everywhere.",
    facts: [
      { k: "Role", v: "Product Designer" },
      { k: "Company", v: "Builder.ai" },
      { k: "Project", v: "BLOCK 4.0, a shared redesign" },
      { k: "Team", v: "Head of Design, seven designers" },
    ],
    media: {
      kind: "showcase",
      v: { kind: "laptop", shot: shot(b("img-workspace.webp"), "A BLOCK workspace: header, sidebar with Ask Natasha, cards and page controls in one layout"), scroll: false },
    },
  },
  context: {
    copy: [
      "Builder.ai’s products had each grown their own interface patterns. Then Natasha, an AI Product Manager, was about to arrive in all of them.",
      "An assistant placed on top of inconsistent screens would feel bolted on. So the launch became the reason to redesign the system underneath: where people navigate, review information, take action and ask for help.",
    ],
    media: { kind: "showcase", v: { kind: "embed", id: "block-bento", caption: "BLOCK 4.0 at a glance, rebuilt from the system’s own components" } },
  },
  role: {
    statement: "I worked with the Head of Design and a team of seven designers on BLOCK 4.0. Within that shared effort, I owned three of its most complex parts.",
    owned: ["Configurable cards", "Navigation and the workspace shell", "Natasha’s conversation and voice patterns"],
    with: ["Head of Design", "A team of seven designers", "Product teams who used the cards"],
    constraints: ["Products already in use, with different needs", "Natasha had to fit beside each product’s main task"],
  },
  approach: "Four decisions shaped my part of the system, from the foundations up to the assistant.",
  decisions: [
    {
      title: "Start from the values everyone shares",
      problem: "Larger patterns can’t stay consistent if every product picks its own colours, type and spacing.",
      explored: "Colour variables with Light, Dark and Error checker modes, a shared type scale, and spacing with desktop, tablet and mobile modes.",
      why: "Common references meant a card or a panel looked and resized the same in every product, with the layout rules written down rather than implied.",
      media: [
        {
          kind: "tabs",
          items: [
            { label: "Colour", shot: shot(b("v2/board-colors.webp"), "Foundational colours: brand, green, tertiary and cloud scales with their tokens") },
            { label: "Type", shot: shot(b("v2/board-type.webp"), "Display and heading type styles with weight, size and line height") },
            { label: "Spacing", shot: shot(b("v2/board-spacing.webp"), "The spacing scale, from 2px to 128px") },
          ],
          caption: "Foundations from the BLOCK file: colour, type and spacing",
        },
      ],
    },
    {
      title: "One card, many products",
      problem: "Different products needed different mixes of information, visuals and actions in the same component.",
      explored: "With the product teams I found a shared anatomy: configurable content regions, an optional visual, a bottom action area, horizontal and vertical layouts, and defined states.",
      why: "One base card now carries information, progress, Kanban, chart and list families across Cloud, Studio and Enterprise, and stays understandable to maintain.",
      media: [{ kind: "showcase", v: { kind: "board", shot: shot(b("v2/board-basecard.webp"), "The base card in its top-bottom and left-right layouts"), caption: "The base card in both layouts; hover and focused states are defined for each" } }],
    },
    {
      title: "Give Natasha a permanent address",
      problem: "Every pixel given to navigation or the assistant is taken from the product’s main task.",
      explored: "A workspace shell of header, sidebar, page controls and a flexible content area, with an “Ask Natasha” entry in both the expanded and collapsed sidebar.",
      why: "People always know where to reach the assistant, and collapsible navigation plus separate panels let each product trade space for context when it needs to.",
      media: [{ kind: "showcase", v: { kind: "board", shot: shot(b("v2/board-navstates.webp"), "The sidebar collapsed, then expanded in default, hover and focus states, with Ask Natasha at the bottom"), caption: "The sidebar: collapsed, default, hover and focus" } }],
    },
    {
      title: "Treat conversation states as components",
      problem: "A voice assistant changes what you can do moment to moment, and each product would otherwise draw those moments differently.",
      explored: "Reusable headers, prompts, composers, messages and responses that work in a side panel and an immersive view, plus a voice bar for every state.",
      why: "Listening, thinking and “click to interrupt” became parts of the system, specified once and recognisable wherever Natasha appears.",
      media: [
        {
          kind: "strips",
          items: [
            { label: "Start speaking", shot: shot(n("bar-start.webp"), "Voice bar: Start speaking") },
            { label: "Listening", shot: shot(n("bar-listening.webp"), "Voice bar: Listening") },
            { label: "Thinking", shot: shot(n("bar-thinking.webp"), "Voice bar: Thinking") },
            { label: "Click to interrupt", shot: shot(n("bar-interrupt.webp"), "Voice bar: Click to interrupt") },
          ],
          caption: "The in-page voice bar, one component with four states",
        },
      ],
    },
  ],
  interactive: {
    title: "Play with the real components",
    prompt: "Pick a component and a variant, then hover, press or tab to the preview. Every state is the exported Figma variant, not a redraw.",
    module: { id: "block-playground" },
  },
  outcome: {
    copy: [
      "BLOCK 4.0 gave Natasha’s launch a shared foundation: the workspace shell, configurable cards, side panels and tables, and conversation components with their states, documented in one file.",
      "Product teams could design and specify Natasha alongside their own workflows with the same patterns, instead of inventing them per product.",
    ],
    media: { kind: "showcase", v: { kind: "laptop", shot: shot(n("imm-inpage-l.webp"), "Natasha’s in-page voice bar on a Builder.ai page, built from BLOCK components"), scroll: false } },
  },
  reflection:
    "A launch reshapes a system’s priorities. The valuable work wasn’t the assistant’s components on their own, but connecting them to the navigation, cards and panels people already used.",
  sources: {
    figma: [
      "nyq6KkmQcbeUBx17MVWdNB / 🟢 Button 6449:85239 → component set 7252:11132 (playground variants)",
      "nyq6KkmQcbeUBx17MVWdNB / 🟢 Natasha 8628:94982 → voice bar 13207:80314, prompts 10406:111066, Natasha button 10406:120881",
      "Existing exports: img-workspace, img-colors, img-typography, img-spacing, img-cards, img-nav-states (BLOCK file)",
    ],
    confirm: ["Project timeline (not stated anywhere)", "Whether “more than ten products” is accurate (the brief says so; no source found)", "Any adoption or efficiency numbers (none found; none shown)"],
  },
};
