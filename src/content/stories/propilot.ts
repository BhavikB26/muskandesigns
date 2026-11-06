import { clip, shot } from "@/content/case-studies";
import type { Story } from "./types";

const pp = (f: string) => `/work/ai-mentor/exact/${f}`;

export const propilot: Story = {
  slug: "ai-mentor",
  hero: {
    name: "ProPilot",
    tags: ["AI product", "0 → 1", "Research", "Chrome extension"],
    headline: "An AI mentor that speaks first.",
    line: "At Preplaced I designed ProPilot, a Chrome extension that brings mentorship into LeetCode, GeeksforGeeks and YouTube instead of waiting behind an empty text box.",
    facts: [
      { k: "Role", v: "Product Designer" },
      { k: "Company", v: "Preplaced" },
      { k: "Timeline", v: "Oct – Dec 2023" },
      { k: "Platform", v: "Chrome extension" },
    ],
    media: { kind: "showcase", v: { kind: "laptop", shot: shot(pp("sol1-screen.webp"), "Easy Actions next to the code editor on LeetCode"), scroll: false } },
  },
  context: {
    copy: [
      "Developers already had endless learning content. The problem appeared at the exact moment they got stuck.",
      "ProPilot’s MVP put a chat window beside the learner, and the numbers said that wasn’t enough: only 17% of installs started a conversation, people averaged about two messages, and week-one retention sat around 10%.",
    ],
    media: { kind: "showcase", v: { kind: "laptop", shot: shot(pp("mvp-screen.webp"), "The MVP’s floating chat over a LeetCode problem"), caption: "The MVP: a floating chat over the problem", scroll: false } },
  },
  role: {
    statement: "I was ProPilot’s product designer from research to production, and the role grew into analytics, specs and prompt behaviour as we learned what users wanted from a mentor.",
    owned: ["Research: 30+ hours of mentor sessions, 20+ interviews", "Interaction design and UI", "PRDs, Mixpanel reports and product testing"],
    with: ["Preplaced’s product and engineering team", "Mentors, whose sessions we analysed with consent"],
    constraints: ["Living inside third-party sites", "More ideas than engineering capacity"],
  },
  approach: "Four decisions, each about when and how a mentor should step in, not what it should say.",
  decisions: [
    {
      title: "Let the product speak first",
      problem: "A blank chat asks a stuck learner to notice they need help, switch context and phrase the perfect prompt.",
      explored: "Grouping 30+ hours of mentor questions showed a few repeat needs: understand, start, find the error, get a hint, compare, optimise. They became Easy Actions beside the code.",
      why: "Message initiation rose from 17% to 84%, messages per user from 2 to 20, and week-one retention from 10% to 50%.",
      media: [
        { kind: "showcase", v: { kind: "board", shot: shot(pp("finding-notebook.png"), "My notes grouping learners’ questions into a few patterns"), caption: "My notes: learners’ questions grouped into patterns" } },
        { kind: "showcase", v: { kind: "laptop", shot: shot(pp("sol1-screen.webp"), "Easy Actions next to the code editor on LeetCode"), scroll: false } },
      ],
    },
    {
      title: "Turn a constraint into a layout",
      problem: "The floating MVP covered the learner’s work and lost track of context as they switched tabs.",
      explored: "Engineering proposed moving ProPilot into a split side tab. I treated it as the new interaction model: a clear workspace, a visually distinct mentor and a stable home.",
      why: "Context became reliable. NPS reached 60, and 92% of interviewees mentioned the mentor knowing what page they were on.",
      media: [{ kind: "showcase", v: { kind: "compare", frame: "plain", shots: [shot(pp("sol2-before-small.png"), "Before: the floating tab", "Before"), shot(pp("sol2-after-small.png"), "After: the split side tab", "After")] } }],
    },
    {
      title: "Keep video learners thinking",
      problem: "On YouTube people weren’t blocked; they drifted. Waiting for a question repeated the MVP’s mistake.",
      explored: "Dynamic follow-ups and quizzes at deliberate intervals, placed in the lower-content areas around the player where sessions showed attention went.",
      why: "51K quizzes taken, 10.5K follow-ups clicked and 23% more interactions. Users called the interactivity what made ProPilot feel different.",
      media: [{ kind: "showcase", v: { kind: "laptop", shot: shot(pp("sol3-quiz-screen.webp"), "A quiz on top of a YouTube lecture"), scroll: false } }],
    },
    {
      title: "Make long videos retrievable",
      problem: "A two-hour lecture is useful once and terrible for revision; people saved videos and couldn’t find the idea again.",
      explored: "On-demand timestamped summaries and Key Terms that index back into the source, with follow-up questions kept inside the summary.",
      why: "15.5K summaries and Key-Term sets generated, with a 25% download rate; people used them to filter videos and revise before exams.",
      media: [{ kind: "showcase", v: { kind: "browser", shots: [clip(pp("sol4-summary-screen.webp"), pp("sol4-clip.webp"), "A long-form lecture playing on YouTube: Saptarshi Prakash introduces 12 key UX laws and principles")], caption: "Video: 12 UI/UX Laws You MUST KNOW, by Saptarshi Prakash" } }],
    },
  ],
  interactive: {
    title: "See it grow up, version by version",
    prompt: "Three production versions, each fixing what the last one taught us. Step through them and see what worked and what didn’t.",
    note: "Final designs from each production iteration.",
    module: {
      id: "walkthrough",
      steps: [
        { title: "Prove the mentor concept", body: "A lightweight floating tab, tested with about 100 users. Always available and quick to build, but it covered active content, messages lacked distinction and the minimise controls confused people.", frame: "panel", shot: shot(pp("design1.png"), "Version 01: the floating tab") },
        { title: "Fix context and usability", body: "The split side tab stopped covering work, made messages clearer and simplified the controls. It also exposed a gap: there was no home for new capabilities, and the input area got crowded.", frame: "panel", shot: shot(pp("design2.png"), "Version 02: the split side tab") },
        { title: "Design for what it was becoming", body: "Dedicated navigation gave each feature its own space and moved secondary actions out of the composer, so Learning Paths and more could grow without the chat becoming the whole IA.", frame: "panel", shot: shot(pp("design3.png"), "Version 03: the side tab with navigation") },
      ],
    },
  },
  outcome: {
    copy: [
      "ProPilot became part of developers’ existing workflow. Some told us they stopped relying on LeetCode’s Solutions tab; others said they solved problems faster.",
      "Most importantly, users kept recognising that it was designed to help them think, not just reveal the answer.",
    ],
    metrics: [
      { value: "50K", label: "Users in six months" },
      { value: "4.6", label: "Rating from ~600 users", note: "Chrome Featured status" },
      { value: "17→84%", label: "Message initiation" },
      { value: "10→50%", label: "Week-one retention" },
    ],
    media: { kind: "showcase", v: { kind: "laptop", shot: shot(pp("sol2-after-screen.webp"), "The split side tab next to an article the learner is reading"), scroll: false } },
  },
  reflection: "The default AI pattern is a blank prompt waiting for a question. Often the design work is deciding when the product should speak first, how much help is too much, and when to stay out of the way.",
  sources: {
    figma: ["Preplaced UBmUmvPZuuVFXQgr1tzjgu (node 14108-19550, laptop prototype frame), shared earlier", "Existing exports in public/work/ai-mentor/exact"],
    confirm: ["Saptarshi Prakash’s permission for the re-hosted YouTube clip (credited in the caption)"],
  },
};
