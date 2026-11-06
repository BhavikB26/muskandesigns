import { shot } from "@/content/case-studies";
import type { Story } from "./types";

const n = (f: string) => `/work/natasha/v2/${f}`;

export const natasha: Story = {
  slug: "natasha",
  hero: {
    tags: ["Conversational UI", "Voice", "Interaction states", "Design system"],
    headline: "Making an AI Product Manager easy to talk to.",
    line: "I designed Natasha’s interface: a side panel, an immersive conversation and an in-page voice bar that share one interaction language.",
    facts: [
      { k: "Role", v: "Product Designer" },
      { k: "Company", v: "Builder.ai" },
      { k: "Project", v: "Natasha, part of BLOCK 4.0" },
      { k: "Covers", v: "Chat, voice, states" },
    ],
    media: { kind: "showcase", v: { kind: "laptop", shot: shot(n("imm-welcome-l.webp"), "Natasha’s immersive welcome: “Hi, I am Natasha. What would you like to build?” with a message field, Talk, and goal prompts"), scroll: false } },
  },
  context: {
    copy: [
      "Natasha was launching as Builder.ai’s AI Product Manager: a way to start building an app by describing an idea.",
      "It had to live in three places: beside the product in a panel, in a full-screen conversation, and as a voice while you browse. Each mode had to make sense on its own and still feel like the same assistant.",
    ],
    media: {
      kind: "gallery",
      items: [
        { shot: shot(n("panel-welcome.webp"), "Side panel: Natasha’s welcome and three starting prompts"), label: "Side panel", frame: "panel" },
        { shot: shot(n("imm-chat-l.webp"), "Immersive view: a response with controls and follow-up options"), label: "Immersive", frame: "laptop" },
        { shot: shot(n("panel-talk.webp"), "Voice: the listening orb with back and pause controls"), label: "Voice", frame: "panel" },
      ],
      caption: "Three ways to reach the same assistant",
    },
  },
  role: {
    statement: "I designed Natasha’s interface and its reusable patterns as part of the BLOCK redesign, from the welcome and prompts to responses and the full set of voice states.",
    owned: ["Welcome states and starting prompts", "Composer, messages and structured responses", "The voice state model and its controls"],
    with: ["Head of Design", "The BLOCK design team"],
    constraints: ["Same components in a 402px panel and a full-width view", "Had to sit inside existing Builder.ai products"],
  },
  approach: "Four decisions, each about a moment around the answer rather than the answer itself.",
  decisions: [
    {
      title: "Give people a way in",
      problem: "An empty chat box asks people to know what to say to a product manager they’ve never met.",
      explored: "A welcome that asks what you’d like to build, with goal prompts such as “Build app”, “Create store” and “Prototype”, and the message field still there for anyone ready to type.",
      why: "It shows what Natasha is for and how to begin in the same glance, so nobody has to work out the right phrasing first.",
      media: [
        {
          kind: "gallery",
          items: [
            { shot: shot(n("imm-welcome-l.webp"), "Immersive welcome with goal prompts: Build app, Create store, Prototype, More"), label: "Immersive welcome", frame: "laptop" },
            { shot: shot(n("panel-welcome.webp"), "Side-panel welcome with three starting prompts"), label: "Panel welcome", frame: "panel" },
          ],
        },
      ],
    },
    {
      title: "Same conversation, two sizes",
      problem: "A compact panel keeps the product in view but squeezes the conversation; a full screen gives room but hides the context.",
      explored: "One set of response and input components that adapts to a 402px side panel and a wide immersive canvas, with expand and close in the panel header.",
      why: "Rather than pick one, people can move between focus and context, and the conversation looks the same in both.",
      media: [
        {
          kind: "gallery",
          items: [
            { shot: shot(n("panel-chat.webp"), "Side panel conversation: a response with listen, dislike and copy controls and two follow-ups"), label: "Side panel", frame: "panel" },
            { shot: shot(n("imm-chat-l.webp"), "The same response in the immersive view"), label: "Immersive", frame: "laptop" },
          ],
        },
      ],
    },
    {
      title: "Make voice a visible choice",
      problem: "Voice is easy to miss if it hides behind a microphone icon, and easy to lose track of once you start browsing.",
      explored: "A labelled “Talk” button beside the composer, transcribed messages for spoken input, and an in-page voice bar that stays with you on any page.",
      why: "Speaking becomes a clear, equal option to typing, and the voice bar keeps the current state and the pause, close and interrupt controls in reach.",
      media: [
        {
          kind: "gallery",
          items: [
            { shot: shot(n("panel-talk.webp"), "Talk mode in the side panel: the orb with back and pause"), label: "Talk", frame: "panel" },
            { shot: shot(n("imm-inpage-l.webp"), "The in-page voice bar on a Builder.ai pricing page: Start speaking"), label: "In-page voice bar", frame: "laptop" },
          ],
        },
      ],
    },
    {
      title: "Always show what Natasha is doing",
      problem: "In a voice conversation, silence is ambiguous: is it listening, thinking or about to speak, and how do you take your turn back?",
      explored: "A distinct look for each state, with idle, loading and pause, animated transitions between them, and a “Click to interrupt” label while Natasha speaks.",
      why: "The orb’s shape tells you what’s happening and the label tells you what you can do, so interrupting never feels like guesswork.",
      media: [
        {
          kind: "states",
          items: [
            { label: "Listening", note: "Rings breathe while it hears you", anim: n("orb-listening.webp"), still: n("orb-listening-still.webp") },
            { label: "Thinking", note: "A thought bubble while it works", anim: n("orb-thinking.webp"), still: n("orb-thinking-still.webp") },
            { label: "Speaking", note: "Bars move with its voice", anim: n("orb-speaking.webp"), still: n("orb-speaking-still.webp") },
            { label: "Paused", note: "A solid orb waits for you", anim: n("orb-paused.webp"), still: n("orb-paused-still.webp") },
          ],
          caption: "The orb animations from the Figma file, exported as they were designed",
        },
      ],
    },
  ],
  interactive: {
    title: "Talk to Natasha (the walkthrough)",
    prompt: "Switch between the three modes, then press Start speaking and step through a voice turn. Interrupt it whenever you like.",
    note: "A walkthrough built from the final Figma screens and state animations; no real AI is answering.",
    module: { id: "natasha-modes" },
  },
  outcome: {
    copy: [
      "The work defined Natasha’s main surfaces, the response patterns they share and the state model around text and voice, delivered as part of BLOCK 4.0 for the launch.",
      "Next I’d test how easily people start a useful conversation, read the current voice state, interrupt a response and find the next action.",
    ],
    media: { kind: "showcase", v: { kind: "laptop", shot: shot(n("imm-talk-l.webp"), "Natasha listening in the immersive view"), scroll: false } },
  },
  reflection:
    "Most of a conversation happens around the answer. Starting, waiting, switching modes and taking your turn back needed as much design as the response itself.",
  sources: {
    figma: [
      "nyq6KkmQcbeUBx17MVWdNB / 🟢 Natasha 8628:94982 → Final panel 10289:79592 (side panel 10432:171491, immersive 14280:68199)",
      "→ Natasha components 10406:170726 (voice bar 13207:80314, prompts 10406:111066)",
      "→ all states videos 10783:103998 / Natasha gif 10442:172131 (orb animations: Listening, Thinking, Thinking to speaking, Pause)",
    ],
    confirm: [
      "No “Bin” page exists in the Hublot file, so there were no earlier Natasha versions for a before/after",
      "Exact scope of ownership versus the wider team (copy follows the existing case study: interface and reusable patterns)",
      "The Spline orb link in the file (my.spline.design/natasha-…) was not embedded; it’s an external scene",
    ],
  },
};
