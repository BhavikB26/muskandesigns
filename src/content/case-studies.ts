import { mediaDims } from "./media-dims";

/*
 * Case studies. The copy is Muskan's final text, word for word — edit it here, not in the components.
 * Each one: title line, meta line, intro, a short summary list, then sections (a heading with paragraphs).
 *
 * Visuals are art-directed per image (after ngan-nguyen.com and dimpalgidwani.com): every one sits in a
 * gem-tinted panel. Bare phone screens get a phone frame, web screens a browser or laptop, mockups that
 * already have their own frame are shown whole, and research boards sit on a white card at their real ratio.
 */

/**
 * clear: the image has a transparent background (a mockup that floats on the panel).
 * clip: an animated recording of the screen (src is then its still frame, shown when motion is paused or reduced).
 */
export type Shot = { src: string; w: number; h: number; alt: string; label?: string; clear?: boolean; screens?: ScreenLabel[]; clip?: string };

/**
 * A screen name set as text on a mockup that shows several screens (instead of baked into the image).
 * x: the screen's centre, as a % of the image width. y: the top of the label, as a % of the image height;
 * 100 puts it just under the image.
 */
export type ScreenLabel = { text: string; x: number; y: number };

/** Screen names for a row of three phones (the Internshala flows), centred under each phone. */
const row3 = (a: string, b: string, c: string, y = 100): ScreenLabel[] => [
  { text: a, x: 12.9, y },
  { text: b, x: 49.6, y },
  { text: c, x: 86.9, y },
];

export type Visual =
  /** Bare phone screens, each in a phone frame (1–4 in a row). */
  /** status: add an iPhone status bar, for web screenshots that have none (so the Dynamic Island sits in it). */
  | { kind: "phones"; shots: Shot[]; caption?: string; status?: boolean }
  /** Mockups that already include their device frame (often transparent PNGs), shown whole. */
  | { kind: "devices"; shots: Shot[]; caption?: string; /** Cap on a single mockup's width, in px. */ maxWidth?: number }
  /** Web screens in a browser window; a second one overlaps the first. scroll: each page scrolls itself, top to bottom and back. */
  | { kind: "browser"; shots: Shot[]; caption?: string; scroll?: boolean; laptop?: boolean }
  /** One web page in a laptop. */
  | { kind: "laptop"; shot: Shot; caption?: string; scroll?: boolean }
  /** Research boards, diagrams and flows, on a white card at their true ratio. */
  | { kind: "board"; shot: Shot; caption?: string }
  /** Before / after (or control / variation), side by side, each with its label. */
  | { kind: "compare"; shots: [Shot, Shot]; frame: "phone" | "browser" | "plain"; caption?: string }
  /** A live, self-contained piece rendered in place of a panel (its own frame and background). */
  | { kind: "embed"; id: "block-bento"; caption?: string }
  /** A structured slide from her deck (sticky notes, affinity map, loop, style guide, click-through). */
  | { kind: "deck"; id: string }
  /** Phones with handwritten notes and red arrows drawn live (so nothing is cropped); side by side. */
  | { kind: "annotated"; panels: Annotated[]; caption?: string };

/**
 * One annotated phone. The panel is a 100 × 125 grid; the phone (a transparent cut-out) sits at `phone`
 * (x, y and width in grid units) and may run off the bottom. Each note's text box is at x, y with width w
 * (grid units); its arrow runs from `from` (grid units) to `to`, a point on the phone (fractions of its
 * width and height), bowing by `bend` (+ bows to the left of the direction of travel).
 */
export type Annotated = {
  shot: Shot;
  phone: { x: number; y: number; w: number };
  notes: { text: string; x: number; y: number; w: number; from: [number, number]; to: [number, number]; bend?: number; align?: "left" | "right" | "center"; tilt?: number }[];
};

/** A small playful element next to a section title; transparent PNG/SVG, or a framed GIF. */
export type Sticker = { src: string; w: number; h: number; alt: string; anim?: string; framed?: boolean };

export type Section = {
  title: string;
  /** A brief name for the side rail, when the title is too long or too generic there. */
  short?: string;
  body?: string[];
  list?: string[];
  /** Paragraphs after the list. */
  after?: string[];
  sticker?: Sticker;
  visuals?: Visual[];
};

export type CaseStudy = {
  slug: string;
  /** Project name, e.g. "Wildflower Health". */
  name: string;
  /** The one-line title under the name. */
  title: string;
  /** The meta line, split on " · " (role · type · timeline). */
  meta: string[];
  intro: string;
  /** The list right after the intro ("What I delivered", "Reported results"…). */
  summary: { heading: string; items: string[] };
  /** Card on the work grid: small label above the title. */
  label: string;
  deliverables: string[];
  concept: boolean;
  links?: { label: string; href: string }[];
  sections: Section[];
};

function shot(src: string, alt: string, label?: string, screens?: ScreenLabel[]): Shot {
  const d = mediaDims[src];
  if (!d) throw new Error(`Missing image dimensions for ${src}`);
  return { src, w: d[0], h: d[1], alt, label, clear: d[2] === 1, screens };
}
/** A screen recording in a device: the still frame plus the animated clip. */
function clip(still: string, anim: string, alt: string): Shot {
  return { ...shot(still, alt), clip: anim };
}
function gif(src: string, w: number, h: number, alt: string, anim: string): Sticker {
  return { src, w, h, alt, anim, framed: true };
}

const pp = (f: string) => `/work/ai-mentor/exact/${f}`;
const zn = (f: string) => `/work/zero-noise/${f}`;

export const caseStudies: CaseStudy[] = [
  // ─────────────────────────────── 01. Gusto ───────────────────────────────
  {
    slug: "gusto",
    name: "Gusto",
    title: "Making signup work for people who weren’t ready to sign up",
    meta: ["Independent Product Designer", "Growth Design", "~3 months", "~200K organic visitors"],
    intro:
      "Gusto.com already had healthy organic traffic. The problem was what happened after people arrived. The opportunity wasn’t simply to make signup faster. It was to make the funnel recognise different levels of intent.",
    summary: {
      heading: "Outcome",
      items: [
        "+15% visits converting to leads.",
        "+25% account creations.",
        "+1,000 new businesses running payroll each month.",
        "~80% more traffic into How Gusto Works once it joined global navigation.",
      ],
    },
    label: "Gusto · Freelance · Growth design",
    deliverables: ["Funnel audit", "Lead flow", "A/B tests", "Responsive UI"],
    concept: false,
    sections: [
      {
        title: "The funnel assumed everyone was ready",
        body: [
          "The primary funnel assumed that visiting the site meant someone was ready to create an account almost immediately: Homepage → survey → account creation → email verification.",
          "But payroll is a high-consideration decision for a small business.",
        ],
        list: [
          "Some visitors were ready to start.",
          "Others wanted to understand the product.",
          "Some were comparing providers.",
          "Others wanted reassurance around compliance, integrations or what switching payroll would involve.",
        ],
        after: [
          "The funnel treated all four groups like the first one.",
          "Drop-off during onboarding climbed to roughly 25%, and visitors who weren’t ready to create an account had almost no meaningful way to become a lead.",
        ],
        visuals: [{ kind: "devices", shots: [shot("/work/gusto/audit-flow.png", "The original flow: homepage, survey, account creation and email verification")], caption: "The original flow, left to right" }],
      },
      {
        title: "What the data was telling us",
        body: [
          "Homepage analytics showed that a large percentage of organic visitors left after a single page. Our initial growth target was relatively modest: find a path that could improve lead capture by at least 5%.",
          "But behavioural context mattered. A diary study showed that small-business owners frequently needed time to compare products before committing.",
          "That made the existing journey feel backwards. We were asking for commitment before giving some visitors enough information to feel confident making the decision.",
          "Two broad user needs were particularly useful:",
        ],
        list: [
          "The small-business owner. Often new to payroll and compliance. They need straightforward explanations and confidence that they aren’t setting something up incorrectly.",
          "The growing startup founder. More comfortable with software and automation. They are more likely to evaluate integrations, scalability and whether the product can keep up as the business grows.",
        ],
        after: ["Neither necessarily needs less information. They need the right information before the commitment point."],
        visuals: [{ kind: "board", shot: shot("/work/gusto/shopping-journey-board.png", "Diary study board: the stages of a small-business owner’s shopping journey") }],
      },
      {
        title: "Reframing the funnel",
        body: [
          "My original question was: how might we bridge the gap between account creation and payroll initiation so more organic visitors become quality leads that eventually run payroll?",
          "The working hypothesis became: if we reduce the commitment required at the beginning and give visitors context first, more people will move forward, either as qualified leads or as full account signups.",
          "That meant separating two things the original funnel had combined: interest, and account creation.",
        ],
      },
      {
        title: "The constraint: no giant rebuild",
        body: [
          "This was a revenue-critical surface. Engineering capacity was limited.",
          "A large redesign would have taken longer to build, created more implementation risk and made it harder to learn which change actually affected conversion. I proposed a phased approach instead.",
        ],
        list: [
          "Use the existing CMS and Workbench components.",
          "Test one behavioural hypothesis at a time.",
          "Keep the original high-intent path available.",
          "Measure before expanding.",
        ],
        after: [
          "This constraint shaped the project for the better. Instead of asking “What is the perfect signup experience?” we asked: “What is the smallest change that can tell us something useful about intent?”",
        ],
      },
      {
        title: "Experiment 01: separate “I’m ready” from “show me more”",
        body: ["The original experience gave visitors one dominant next step: create an account. I introduced a parallel path:"],
        list: ["Create Account for high-intent visitors.", "How Gusto Works for visitors who needed context."],
        after: [
          "This wasn’t meant to make signup harder. It was meant to stop pretending everyone had arrived with the same goal.",
          "The second CTA created a lower-pressure path into product education while preserving the direct route for people who were already convinced.",
        ],
        visuals: [
          {
            kind: "compare",
            frame: "browser",
            shots: [shot("/work/gusto/ab-1-control.png", "Homepage hero, control", "Control"), shot("/work/gusto/ab-1-variation.png", "Homepage hero with the How Gusto Works entry point", "Variation")],
          },
        ],
      },
      {
        title: "Experiment 02: capture interest without demanding a password",
        body: [
          "The next question was what should happen after someone chose “How Gusto Works.” Instead of immediately turning that interaction back into account creation, I designed a lightweight lead journey. Visitors could:",
        ],
        list: [
          "identify which product areas they cared about",
          "answer a small set of qualifying questions",
          "submit contact information without creating a password",
          "see product content tailored to their interests",
          "decide later whether to sign up, speak to Sales or continue exploring",
        ],
        after: [
          "This gave the business something the previous experience couldn’t: a qualified lead even when the visitor wasn’t ready to become an account holder.",
          "It also gave Sales more useful context before the handoff.",
        ],
        visuals: [
          { kind: "devices", shots: [shot("/work/gusto/create-account-flow.png", "The new flow: How Gusto Works, picking product areas, tailored content, then a prefilled account form")], caption: "The new journey, left to right" },
          {
            kind: "compare",
            frame: "plain",
            shots: [shot("/work/gusto/ab-2-control.png", "Product survey, control", "Control"), shot("/work/gusto/ab-2-variation.png", "Product survey, variation", "Variation")],
          },
        ],
      },
      {
        title: "Making the eventual signup easier, not harder",
        body: [
          "The lower-commitment path wasn’t a dead end. If someone reached the end of the journey and decided Gusto was right for them, the information they had already provided carried forward.",
          "At that point, most of the account information was already complete. They primarily needed to create a password.",
          "This was important because we weren’t simply adding another marketing journey. We were creating a gentler ramp into the same conversion funnel.",
        ],
        visuals: [
          { kind: "phones", shots: [shot("/work/gusto/howworks-mobile.png", "How Gusto Works on mobile"), shot("/work/gusto/final-mobile.png", "Account creation on mobile, prefilled")] },
          { kind: "laptop", scroll: true, shot: shot("/work/gusto/howworks-desktop-page.png", "How Gusto Works on desktop") },
        ],
      },
      {
        title: "Experiment 03: personalise the education layer",
        body: [
          "Once someone tells us what they care about, showing them generic product content wastes that signal. The journey therefore adapted based on the features or needs the visitor selected.",
          "A business interested in payroll and benefits didn’t need the same story as one evaluating integrations or trying to understand compliance. The personalised path had two jobs:",
        ],
        list: ["For the user, make exploration more relevant.", "For Sales, provide a clearer picture of what the lead was actually evaluating."],
        after: ["I worked across Product, Sales, PMM and Brand to make sure the content and qualifying questions supported both."],
      },
      {
        title: "Iterating the questions",
        body: [
          "The first version wasn’t automatically the final one. I worked with Sales to refine which questions actually helped qualify leads and which simply created additional effort.",
          "This is an important distinction in growth design. A field isn’t valuable because the company could use the information. It’s valuable when the information meaningfully changes what happens next.",
          "So the form evolved around signal rather than completeness.",
        ],
      },
      {
        title: "Taking the winning behaviour into global navigation",
        body: [
          "Once the lower-pressure path showed promise, we expanded How Gusto Works beyond the original entry point. It became part of the global navigation.",
          "Traffic into the journey increased by approximately 80%, giving more users access to the exploratory path and creating a larger pool of qualified leads.",
          "That expansion was also useful validation. A concept that began as a contained experiment had demonstrated enough value to become part of the site’s broader acquisition architecture.",
        ],
      },
      {
        title: "What the tests taught us",
        body: [
          "The unintuitive lesson from the work was that conversion didn’t improve because we removed every step. In one sense, we added separation between visiting, becoming a lead and creating an account.",
          "But we lowered the psychological commitment required at the beginning. That distinction mattered. People could move forward without being forced to make the final decision too early.",
        ],
      },
      {
        title: "Outcome",
        body: ["Across the final rounds of testing:"],
        list: ["+15% visits converting to leads.", "+25% account creations.", "+1,000 new businesses running payroll each month."],
        after: ["The work also created a better Sales handoff because lead information was captured around actual product interest rather than only basic account details."],
      },
      {
        title: "What I took away",
        body: [
          "Growth design isn’t always an exercise in removing friction. Some friction protects decision quality. Some friction improves qualification.",
          "And sometimes the bigger conversion problem is pressure. The most useful change in this project was giving people permission to understand the product before asking them to commit to it.",
          "Learn first. Commit second.",
        ],
      },
    ],
  },

  // ─────────────────────────────── 02. ProPilot AI ───────────────────────────────
  {
    slug: "ai-mentor",
    name: "ProPilot AI",
    title: "Designing an AI mentor that meets developers where they already learn",
    meta: ["Product Designer", "0→1 AI Mentor", "Oct–Dec 2023", "Chrome Extension"],
    intro:
      "Developers already had an extraordinary amount of learning content. The problem wasn’t access to another explanation. The problem appeared at the exact moment someone got stuck. At Preplaced, we were exploring ProPilot, an AI mentor that could accompany developers while they learned.",
    summary: {
      heading: "Outcome",
      items: ["50K users in six months.", "Chrome Featured status.", "4.6 rating from ~600 users.", "Message initiation from 17% to 84%."],
    },
    label: "Preplaced · AI assistant, 0→1",
    deliverables: ["Research", "Interaction design", "UI", "Specs & analytics"],
    concept: false,
    sections: [
      {
        title: "The help existed. It wasn’t contextual.",
        body: [
          "YouTube tutorials. LeetCode solutions. GeeksForGeeks. Reddit. ChatGPT.",
          "A developer could spend twenty minutes on a LeetCode problem, hit a conceptual block, open YouTube, search for a relevant video, discover that the instructor couldn’t see their code, return to the problem, then eventually paste everything into an LLM that might simply reveal the answer.",
          "The initial MVP proved people liked the idea of an always-available mentor. It also proved that putting a chat window beside the learner wasn’t enough.",
        ],
        list: ["Only 17% of installs initiated a conversation.", "Users averaged roughly 2 messages.", "Week-one retention was around 10%, with later retention falling sharply."],
        after: [
          "A mentor that waits silently for someone to formulate the perfect prompt is still, fundamentally, a chatbot.",
          "So the project became a larger question: what would an AI product look like if it behaved more like a mentor and less like an empty text box?",
        ],
        sticker: { src: pp("problem3-char.png"), w: 512, h: 512, alt: "A worried developer, stuck on a problem" },
        visuals: [{ kind: "browser", shots: [shot(pp("mvp-screenshot.png"), "The MVP’s floating chat over a LeetCode problem")] }],
      },
      {
        title: "Researching mentorship before designing AI",
        body: [
          "Before deciding what the AI should do, I studied what good human mentors already did. The research ran intensively for roughly two weeks and continued through later interviews and product iterations.",
          "30+ hours of mentorship sessions. Preplaced had a large archive of one-to-one mentorship sessions. With mentor consent, I analysed more than 30 hours of sessions to understand:",
        ],
        list: [
          "what learners ask when they’re stuck",
          "how mentors diagnose the actual problem",
          "when mentors give an answer versus another question",
          "how technical guidance changes with learner ability",
          "how mentors maintain confidence and momentum",
        ],
        after: ["The important thing wasn’t merely the content of the answers. It was when and how mentors intervened."],
        sticker: { src: pp("problem4-char.png"), w: 512, h: 512, alt: "A learner looking unsure" },
      },
      {
        title: "20+ user interviews",
        body: [
          "I spoke with developers across different stages: college students, early-career engineers, SDEs, SDETs, QA professionals, interview candidates and people simply upskilling.",
          "YouTube was common across nearly all of them, but the problems changed by experience level.",
          "Beginners often worried about whether they were progressing fast enough. More experienced developers cared more about alternative approaches, optimisation and whether their reasoning would hold up in an interview.",
        ],
      },
      {
        title: "Study groups and existing communities",
        body: [
          "We also observed WhatsApp study-group discussions to understand the emotional side of learning alone. Questions that looked technical on the surface often contained something else underneath:",
        ],
        list: ["“Am I too slow?”", "“Is my approach stupid?”", "“Did I actually understand this?”", "“Everyone else seems further ahead.”"],
        after: [
          "I studied developer discussions and learning communities, including Reddit and popular educator ecosystems such as Striver’s content. This helped validate recurring “stuck” points and the language learners naturally used when asking for help.",
        ],
        visuals: [
          { kind: "devices", maxWidth: 260, shots: [shot(pp("research-whatsapp-hd.png"), "A LeetCode study group on WhatsApp, names blurred")] },
        ],
      },
      {
        title: "Finding 01: technical questions were less random than they looked",
        body: [
          "At first, the questions people asked mentors seemed highly specific. Once I started grouping them, patterns appeared. Learners repeatedly needed help with things like:",
        ],
        list: [
          "understanding the problem",
          "starting an approach",
          "identifying an error",
          "getting a hint",
          "comparing approaches",
          "optimising a solution",
          "checking their reasoning",
        ],
        after: [
          "That meant the interface didn’t always need to wait for a free-form prompt. The product could anticipate useful categories of help.",
          "This became the basis for Easy Actions.",
        ],
        visuals: [{ kind: "board", shot: shot(pp("finding-notebook.png"), "My notes grouping learners’ questions into a few patterns") }],
      },
      {
        title: "Finding 02: learners didn’t need AI to make them more dependent on AI",
        body: [
          "A recurring fear around tools such as ChatGPT was that receiving the complete answer felt efficient in the moment but damaged the learning experience. Users wanted help without losing the act of thinking.",
          "Human mentors often do this naturally. They ask another question. They point to the part of the code worth inspecting. They give a nudge. They allow the learner to reach the answer themselves.",
          "That became a product principle: ProPilot should optimise for learner independence, not maximum answer speed.",
        ],
      },
      {
        title: "Finding 03: context was the product",
        body: [
          "The MVP followed learners across websites through a floating chat. But users switched browser tabs constantly. When the learner moved to another problem or resource, they naturally expected the mentor to understand that new context. It didn’t always do so reliably.",
          "In interviews, this became one of the strongest sources of disappointment. A generic AI response inside the right-looking panel still felt wrong if it didn’t understand the page the learner was looking at.",
          "So contextual awareness wasn’t another feature. It was a prerequisite for trust.",
        ],
      },
      {
        title: "Finding 04: YouTube created a different mentorship problem",
        body: ["Coding platforms are often about being blocked. YouTube is often about something subtler:"],
        list: [
          "losing focus",
          "wondering whether you understood something",
          "forgetting a question before the video ends",
          "later needing to revise hours of content quickly",
        ],
        after: [
          "The same AI interaction couldn’t solve both contexts. On coding platforms, the product needed to help users unstick themselves. On YouTube, it needed to help them stay engaged, test understanding and retrieve learning later.",
        ],
        visuals: [{ kind: "board", shot: shot(pp("finding-heatmap1.png"), "A heatmap of where developers focus on screen") }],
      },
      {
        title: "Prioritising what was actually feasible",
        body: [
          "The research produced more opportunities than the team could build. For example, a deeply personalised video roadmap could potentially reduce the overwhelming amount of content learners face. But it required significantly more product and engineering effort.",
          "Other opportunities had a better impact-to-effort ratio:",
        ],
        list: [
          "Confidence after watching a video could be addressed with spaced quizzes and contextual questions.",
          "Revision could be supported through timestamped summaries and key terms.",
          "Conversation initiation could be addressed through contextual Easy Actions.",
        ],
        after: ["Those became the areas we chose to solve first. This prevented the project from becoming “AI can do everything.”"],
      },
      {
        title: "Build a destination or augment the existing workflow?",
        body: [
          "A standalone AI learning platform would have given us complete control over the interface. It would also have asked developers to abandon the tools, content, saved progress and habits they already had.",
          "The alternative was technically messier: bring ProPilot into LeetCode, GeeksForGeeks and YouTube.",
          "We chose the second. Instead of competing with the places developers already learned, we would add mentorship on top of them.",
        ],
      },
      {
        title: "Solution 01: Easy Actions, let the product speak first",
        body: ["The MVP required the learner to realise they needed help, move to the extension, formulate a question, type it and hope the mentor understood. That’s a lot of effort at the exact moment someone is already stuck.",
          "I designed contextual Easy Actions directly beside the problem-solving environment. Actions such as asking for a hint or explanation give the learner an obvious starting point while preserving the ability to continue with open-ended conversation.",
          "Placement mattered as much as wording. Because the actions appeared next to the learner’s code, problem and errors, the assistance felt tied to their work rather than a generic AI assistant sitting elsewhere.",
          "Impact:",
        ],
        list: ["17% → 84% message initiation", "2 → 20 messages per user", "10% → 50% week-one retention", "3% → 38% week-four retention"],
        after: ["The biggest improvement wasn’t a better chat response. It was reducing the effort required to start the conversation."],
        visuals: [{ kind: "browser", shots: [shot(pp("sol1.png"), "Easy Actions next to the code editor on LeetCode")] }],
      },
      {
        title: "Solution 02: turning a technical constraint into a better product",
        body: [
          "The floating MVP sat on top of the active webpage. It created two problems. It consumed working space. And reliable context switching between tabs was technically difficult.",
          "Engineering proposed moving the experience into a second split browser tab. Initially, this looked like a constraint I would have to design around. It became an improvement. The new side-tab architecture:",
        ],
        list: [
          "kept the learner’s main working area clear",
          "made the mentor visually distinct",
          "allowed the product to follow context more reliably",
          "created a more stable home for the interface",
        ],
        after: [
          "Impact: the product reached an NPS of 60. In interviews, 92% of users highlighted the mentor knowing what page they were on as a meaningful part of the experience.",
          "The lesson was useful: sometimes engineering doesn’t hand design a limitation. It hands design the beginning of a better interaction model.",
        ],
        visuals: [{ kind: "browser", shots: [shot(pp("sol2-after.png"), "The split side tab next to an article the learner is reading")] }],
      },
      {
        title: "Solution 03: quizzes and dynamic follow-ups on YouTube",
        body: [
          "YouTube learners weren’t always blocked enough to open chat. Often they simply became passive. So waiting for an explicit question reproduced the same problem we saw in the original chat MVP.",
          "We introduced dynamic follow-up prompts directly around the video experience. The questions could:",
        ],
        list: [
          "surface a likely doubt",
          "invite the learner to go deeper",
          "connect an idea to another example",
          "test whether they understood what they had just watched",
        ],
        after: [
          "Quizzes appeared at deliberate intervals. Their frequency was refined through experimentation so they could restore attention without becoming another interruption. I also deliberately used lower-content areas around the player, based on observations of where learners focused during sessions.",
          "Impact: 51K quizzes taken, 10.5K dynamic follow-ups clicked and +23% interactions. Users frequently described the interactivity as the reason ProPilot felt different from simply opening another AI tab.",
        ],
        visuals: [{ kind: "browser", shots: [shot(pp("sol3-quiz.png"), "A quiz on top of a YouTube lecture")] }],
      },
      {
        title: "Solution 04: make long-form learning retrievable",
        body: [
          "A two-hour video may be useful the first time and terrible as a revision interface. Interviews repeatedly surfaced the same behaviour: people saved videos, made notes, then struggled to find the exact idea again before an exam or interview.",
          "I designed on-demand, timestamped summaries and Key Terms. Instead of replacing the source content, these features act as an index back into it. Follow-up questions inside the summaries keep the mentorship layer available even during revision.",
          "Impact: 15.5K summaries and Key-Term sets generated, with a 25% download rate. Users also described using summaries to filter long videos and revise before important events.",
        ],
        visuals: [{ kind: "browser", shots: [shot(pp("sol4-summary.png"), "A time-stamped summary with key terms")] }],
      },
      {
        title: "Three production iterations",
        body: [
          "The product itself evolved alongside the feature set.",
          "Version 01: prove the mentor concept. The first MVP was deliberately lightweight. It could be handed to engineering quickly and tested with roughly 100 users. What worked: the mentor felt persistently available, and the simple build let us test behaviour quickly. What didn’t: it covered active content, mentor and learner messages lacked enough distinction, minimise/maximise behaviour was confusing, even the collapsed state occupied too much space, and the visual system wasn’t mature enough to support a larger product.",
          "Version 02: fix context and usability. The split-tab version solved the biggest problems. The interface stopped covering the user’s work. Mentor and learner messages were clearer. Controls were simplified. The experience felt substantially more mature.",
          "But success created another issue. We began adding capabilities beyond chat. The architecture had nowhere for them to go. The input area started accumulating actions and the product risked becoming another crowded AI sidebar.",
          "Version 03: design for the product ProPilot was becoming. The third production iteration introduced dedicated navigation and clearer hierarchy. Primary features could now own their own spaces. Secondary actions moved away from the input field. New capabilities, such as learning Paths, could grow without turning the chat composer into the product’s entire IA.",
          "This was the point where the extension stopped feeling like “a chat tool on top of another website” and started feeling like “an extensible learning product.”",
        ],
        visuals: [
          {
            kind: "devices",
            shots: [shot(pp("design1.png"), "Version 01: the floating tab", "1"), shot(pp("design2.png"), "Version 02: the split side tab", "2"), shot(pp("design3.png"), "Version 03: the side tab with navigation", "3")],
            caption: "Three versions: floating tab, split side tab, side tab with navigation",
          },
        ],
      },
      {
        title: "Outcome",
        body: ["ProPilot reached:"],
        list: ["50K users in six months", "Chrome Featured status", "4.6 rating from ~600 users"],
        after: [
          "But my favourite signal wasn’t one of the headline metrics. Users described the mentor as part of their existing workflow. Some told us they stopped relying on the LeetCode Solutions tab. Others said it helped them solve problems in less time.",
          "And, importantly, users repeatedly recognised that the product was designed to help them think, not simply reveal the answer.",
          "My role also grew beyond interface design. I contributed to research, analytics setup, Mixpanel reports, PRDs, product testing and prompt behaviour as we learned what users wanted from the mentor.",
        ],
      },
      {
        title: "What I took away",
        body: [
          "This project changed how I think about AI products. The default interaction pattern is often: blank prompt → user asks → AI answers. But the user may already be doing something before they ever open the AI.",
          "The design opportunity is understanding that context well enough to know:",
        ],
        list: ["when to offer help", "what kind of help is useful", "how much help is too much", "when the product should simply stay out of the way"],
        after: [
          "The strongest AI interaction isn’t always another prompt box.",
          "Sometimes the design work is deciding when the product should speak first.",
        ],
      },
    ],
  },

  // ─────────────────────────────── 03. Zero Noise ───────────────────────────────
  {
    slug: "zero-noise",
    name: "Zero Noise",
    title: "Making email revenue potential tangible in three questions",
    meta: ["Solo design and development", "One weekend", "Claude Code", "Live website"],
    intro:
      "Zero Noise offers email strategy and delivery for coaches, consultants, creators, and service businesses. I designed and built its website from scratch over one weekend, using Claude Code throughout.",
    summary: {
      heading: "What shipped",
      items: [
        "An interactive calculator based on business type, list size, and offer price.",
        "An initial annual estimate with a monthly equivalent.",
        "A separate opt-in for exploring the fuller revenue range.",
        "Client proof, three service options, and direct booking links.",
      ],
    },
    label: "Zero Noise · Design & build · Live site",
    deliverables: ["Web design", "Calculator", "Build", "Claude Code"],
    concept: false,
    links: [{ label: "Live site", href: "https://ishikaa-jain.vercel.app/" }],
    sections: [
      {
        title: "Connect the service to the visitor’s situation",
        body: [
          "The brief combined a revenue calculator, client results, service packages, and call booking. I brought those elements into a journey that starts with the visitor’s own business and leads into the support available.",
          "A visitor could read about email marketing services, while the calculator gave them a way to explore the opportunity using their own numbers. The design challenge was connecting that first interaction with the rest of the page.",
          "I organised the experience around a sequence: calculate, understand the estimate, review the evidence, and explore support.",
        ],
        visuals: [{ kind: "browser", shots: [clip(zn("clip-desktop-still.webp"), zn("clip-desktop.webp"), "The calculator in use: picking a business type, setting the list size and offer price, then the estimate")] }],
      },
      {
        title: "Three questions, one starting point",
        body: [
          "The calculator asks what visitors sell, how many subscribers they have, and what their main offer costs.",
          "Business types appear as selectable chips. List size and offer price combine sliders with editable values, allowing people to enter a specific number or explore different scenarios.",
          "The initial output focuses on one annual estimate, supported by its monthly equivalent. This gives the interaction a clear endpoint before introducing a deeper comparison.",
        ],
        visuals: [{ kind: "phones", status: true, shots: [clip(zn("clip-mobile-still.webp"), zn("clip-mobile.webp"), "The three questions on a phone: tapping a business type, dragging the list size, then the estimate"), shot(zn("m-estimate-clean.webp"), "The first estimate on a phone")] }],
      },
      {
        title: "Let the first result come before the form",
        body: [
          "The contact form appears after the initial estimate, alongside an invitation to explore the list’s full potential.",
          "That ordering gives visitors a useful starting point before asking them to share their details. It also creates a specific reason to continue: understanding the wider range of outcomes.",
          "The trade-off is an additional step before the fuller comparison. Whether that exchange produces useful enquiries needs to be assessed through completion and booking data.",
        ],
        visuals: [{ kind: "browser", shots: [shot(zn("range.webp"), "The fuller range, after the opt-in")] }],
      },
      {
        title: "Make the estimate clear",
        body: [
          "An early build surfaced a mismatch in the brief’s 2% scenario: 2,500 subscribers multiplied by a 2% buyer rate and a $1,500 offer was labelled as $30,000, although those inputs produce $75,000.",
          "The implementation calculated from the entered values. Those figures remain scenarios based on an assumed buyer rate; correct arithmetic alone does not validate the revenue assumption.",
          "Annual and monthly figures give visitors two ways to interpret the same estimate.",
        ],
      },
      {
        title: "Compare services through the visitor’s involvement",
        body: [
          "Email Growth Blueprint provides strategy the visitor implements. Email Growth Intensive offers collaborative support. Done For You provides managed delivery.",
          "This gives visitors a concrete way to distinguish the offers alongside their features.",
          "Client screenshots sit between the calculator and services, connecting the estimated opportunity with examples of Zero Noise’s existing email work. Those client results are evidence of the agency’s work, not performance results for this website.",
        ],
        visuals: [
          { kind: "browser", shots: [clip(zn("clip-results-still.webp"), zn("clip-results.webp"), "Client results: the carousel arrows, then a dashboard screenshot opened full size")] },
          { kind: "browser", shots: [shot(zn("section-services.webp"), "Three ways to work with Zero Noise")] },
        ],
      },
      {
        title: "Build and review in Claude Code",
        body: [
          "I used Claude Code from the first implementation through final refinements, directing the page structure, interactions, and visual presentation.",
          "Reviewing the working page surfaced details that needed correction. The intended heading font, for example, was loading while heading styles still referenced the previous typeface.",
          "These checks covered the interaction, calculations, and what actually appeared on screen.",
        ],
      },
      {
        title: "Outcome and reflection",
        body: [
          "Over one weekend, I delivered a live website combining the calculator, client proof, service comparison, and booking links.",
          "To assess its effectiveness as an enquiry journey, I would examine calculator completion, progression into the contact form, successful submissions, and bookings.",
          "The project reinforced the importance of reviewing the connections between elements: how an input becomes an estimate, how that estimate is explained, and how the next action follows from it.",
        ],
        visuals: [{ kind: "browser", shots: [clip(zn("clip-finale-still.webp"), zn("clip-finale.webp"), "The closing call to action: hovering each card in the stack brings it forward")] }],
      },
    ],
  },

  // ─────────────────────────────── 04. Builder Design System — BLOCK ───────────────────────────────
  {
    slug: "builder-design-system",
    name: "BLOCK Design System",
    title: "Rebuilding Builder.ai’s design system for Natasha’s launch",
    meta: ["Product Designer", "Builder.ai", "BLOCK 4.0", "Shared design-system redesign"],
    intro:
      "Natasha’s launch was the driver for redesigning Builder.ai’s design system. Introducing an AI Product Manager meant creating a coherent foundation for the assistant and the products around it: where people navigate, review information, take action, and ask for help. I contributed to BLOCK 4.0 with the Head of Design and a team of seven designers. My work focused on complex cards, navigation, and the AI experience within that shared effort.",
    summary: {
      heading: "The launch priorities",
      items: [
        "A consistent workspace structure with a clear place for Natasha.",
        "Configurable cards for different products, information types, and actions.",
        "Reusable conversational patterns across compact and immersive experiences.",
        "Defined interaction states, supported by shared colour and layout foundations.",
      ],
    },
    label: "Builder.ai · Design system",
    deliverables: ["Cards", "Navigation", "AI patterns", "States"],
    concept: false,
    sections: [
      {
        title: "The launch changed what the system needed to support",
        body: [
          "Builder.ai’s products had developed their own interface patterns. Natasha needed to sit within that wider environment while also supporting a dedicated conversation experience.",
          "That made the surrounding product structure a priority. The system had to account for the relationship between navigation, content, contextual panels, and the assistant. A consistent visual language needed equally consistent behaviour.",
        ],
        visuals: [
          { kind: "embed", id: "block-bento" },
          {
            kind: "browser",
            shots: [shot("/work/builder-design-system/img-workspace.webp", "Workspace example: the header, sidebar, cards, and persistent Ask Natasha entry form one working layout")],
            caption: "The header, sidebar, cards, and persistent Ask Natasha entry form one working layout",
          },
        ],
      },
      {
        title: "Give the workspace a stable structure",
        body: [
          "The shared layout brings together a header, sidebar, secondary page controls, and a flexible content area. The file documents how those regions resize and how cards wrap within the available space.",
          "The sidebar includes an “Ask Natasha” entry in both expanded and collapsed forms. This establishes a recognisable place to reach the assistant while accommodating different navigation densities.",
          "The trade-off was available workspace. Navigation and assistant access needed to remain understandable while leaving room for the product’s main task. Collapsible navigation and separate panel patterns gave the system ways to manage that balance.",
        ],
        visuals: [
          {
            kind: "board",
            shot: shot("/work/builder-design-system/img-nav-states.webp", "Expanded and collapsed navigation, with default, hover, and focus examples"),
            caption: "Expanded and collapsed navigation, with default, hover, and focus examples. These are component states, not chronological versions.",
          },
        ],
      },
      {
        title: "Build cards from a shared anatomy",
        body: [
          "Cards were one of the most complex parts of my contribution because different products needed different combinations of information and actions.",
          "I worked with the teams to identify that shared anatomy. The resulting base card supports configurable content regions, visuals, and a bottom action area, with horizontal and vertical arrangements and defined interaction states.",
          "That foundation supports information, progress, Kanban, chart, and list-card families. Examples in the file apply those patterns to Cloud, Studio, and Enterprise contexts.",
          "The goal was useful flexibility. Product teams needed enough configuration to represent their work while keeping the underlying component understandable and maintainable.",
        ],
        visuals: [{ kind: "board", shot: shot("/work/builder-design-system/img-cards.webp", "The base card: layout, atoms and component properties") }],
      },
      {
        title: "Carry consistency into complex product patterns",
        body: [
          "The wider redesign also covers tables, summary tables, and side panels. These are substantial parts of the working interface: they organise dense information, reveal detail, and support actions in context.",
          "Table patterns are assembled from shared cells, rows, and headers. Side panels define common header, content, and footer regions across several widths. These patterns give the products surrounding Natasha a common structural vocabulary.",
        ],
        visuals: [{ kind: "board", shot: shot("/work/builder-design-system/img-side-nav.webp", "Side navigation atoms, component and states") }],
      },
      {
        title: "Treat conversation states as part of the system",
        body: [
          "Natasha required reusable headers, prompts, composers, user messages, responses, and voice controls. Those patterns needed to work across a side panel and an immersive view.",
          "The system defines response hierarchy and interaction states alongside the main screens. Loading, listening, thinking, speaking, and interruption all need a clear representation because they change what the user can do next.",
          "This gave the AI experience a component model that could be applied across contexts. The separate Natasha case study examines the user-facing decisions behind those patterns.",
        ],
        visuals: [{ kind: "board", shot: shot("/work/natasha/voice-states.webp", "Voice controls: Start speaking, Listening, Thinking, and Click to interrupt") }],
      },
      {
        title: "Support the larger patterns with shared foundations",
        body: [
          "Colour variables include Light, Dark, and Error checker modes. The file also contains shared typography, spacing, and responsiveness values, including desktop, tablet, and mobile modes.",
          "These foundations provide common references for the larger patterns. The documented layout rules make the intended relationships between fixed, flexible, and wrapping regions explicit.",
        ],
        visuals: [
          { kind: "board", shot: shot("/work/builder-design-system/img-colors.webp", "Foundational, semantic and basic colours") },
          { kind: "board", shot: shot("/work/builder-design-system/img-typography.webp", "Display, heading and body type styles") },
          { kind: "board", shot: shot("/work/builder-design-system/img-spacing.webp", "Spacing scale and corner-radius tokens") },
        ],
      },
      {
        title: "Outcome and reflection",
        body: [
          "The design work established a shared foundation for Natasha’s launch and the surrounding Builder.ai experience. Its scope extends from the workspace shell and complex cards to conversational components and their states.",
          "The component and interaction framework gives the team a consistent set of patterns to design and specify Natasha alongside the surrounding product workflows.",
          "The project showed me how a major feature launch can reshape a design system’s priorities. The important work is connecting the new capability to the product structures people already use, then making those relationships reusable.",
        ],
      },
    ],
  },

  // ─────────────────────────────── 05. Internshala ───────────────────────────────
  {
    slug: "internshala",
    name: "Internshala",
    title: "Making internship hunting feel less like sending applications into a black hole",
    meta: ["Self-initiated", "Product Redesign", "Mobile"],
    intro:
      "This project started with a very personal frustration. While looking for UX internships, I used Internshala extensively. The opportunities were useful. The experience of finding and applying to them often wasn’t. A few years later, I returned to that experience as a self-initiated redesign.",
    summary: {
      heading: "What I rethought",
      items: ["Finding an opportunity.", "Applying to it.", "Understanding what happens afterward."],
    },
    label: "Self-initiated concept · Mobile app",
    deliverables: ["Research", "UX flows", "Mobile UI", "Design system"],
    concept: true,
    sections: [
      {
        title: "After pressing Submit, silence",
        body: [
          "Searching could feel repetitive. Filtering required effort. Applications became tiring when similar questions appeared again and again. And after pressing Submit, the experience often transformed into silence.",
          "For someone already navigating the uncertainty of an early-career job search, the product was adding another layer of uncertainty instead of reducing it.",
          "The goal wasn’t to make Internshala prettier. It was to rethink three connected moments: finding an opportunity, applying to it, and understanding what happens afterward.",
        ],
        sticker: gif("/work/internshala/cs/in-adventure.webp", 414, 259, "GIF: I’m going on an adventure!", "/work/internshala/cs/in-adventure-anim.webp"),
      },
      {
        title: "Why this matters more for early-career candidates",
        body: [
          "Students and fresh graduates are doing two difficult things simultaneously. They’re trying to get hired. And they’re often learning how hiring works for the first time.",
          "That makes ambiguity especially costly. An experienced applicant may know that a week of silence means very little. A student may interpret the exact same silence as:",
        ],
        list: ["“I’ve been rejected.”", "“My profile isn’t good enough.”", "“This company isn’t real.”", "“The platform doesn’t work.”"],
        after: ["Good hiring UX cannot control the recruiter’s decision. It can reduce how much the candidate has to guess."],
      },
      {
        title: "Understanding the problem",
        body: [
          "Secondary research. I reviewed research around online job applications to understand common friction beyond my own experience. Repeated themes included long response times, lack of acknowledgement, very low application-to-interview ratios, too many application steps, and a desire for more human contact. Rather than treating my own frustration as universal, this helped establish that uncertainty and application effort were broader candidate problems.",
          "Conversations with Internshala users. I spoke with friends who had used Internshala and other internship platforms. Their experiences reinforced several patterns: finding truly relevant opportunities took work, editing a profile or resume around an application was cumbersome, repetitive application questions became exhausting, and application status was rarely clear enough.",
          "App-store feedback and interface audit. I also reviewed user feedback and audited the existing application for usability and visual inconsistencies. The audit surfaced issues including redundancy between bottom navigation and the hamburger menu, weak hierarchy on the homepage, small interaction areas, long scrolling pages, limited visibility of system status, and information-heavy job/application surfaces.",
        ],
        visuals: [{ kind: "deck", id: "in-context" }, { kind: "board", shot: shot("/work/internshala/cs/in-ui.webp", "Audit of the existing app’s interface") }],
      },
      {
        title: "Mapping the experience into three problem areas",
        body: ["The research became much clearer once I separated it by stage."],
        list: [
          "Finding: users needed more useful recommendations and easier refinement of search results.",
          "Applying: the product needed to reduce repeated work without making every application generic.",
          "Waiting: applicants needed enough visibility to understand whether anything was happening after submission.",
        ],
        after: [
          "The redesign therefore became less about isolated screens and more about the continuity of the internship hunt.",
          "The design question: how might Internshala reduce the work required to apply while giving early-career candidates more confidence about what’s happening throughout the journey?",
        ],
      },
      {
        title: "Opportunity 01: show value before asking for a detailed profile",
        short: "Value before profile",
        body: [
          "Some users want to browse opportunities before investing time completing a full profile. The redesign therefore begins with lightweight preference capture rather than immediately requiring detailed setup.",
          "A new user can tell the product things such as role, location, work type, skills, industry, stipend expectations and other relevant preferences. Those inputs immediately improve recommendations.",
          "The product earns deeper profile completion by first demonstrating: “We understand what you’re looking for.”",
        ],
        visuals: [
          { kind: "devices", shots: [shot("/work/internshala/cs/in-onboarding-clean.webp", "Onboarding: sign-up and preference steps", undefined, [...row3("Splash screen", "Sign-up", "Onboarding slides", 44.4), ...row3("Preferences: role", "Preferences: work type", "Preferences: skills")])] },
        ],
      },
      {
        title: "Opportunity 02: make searching feel like refinement",
        short: "Smarter search",
        body: [
          "The original search experience could require too much configuration. I simplified the search hierarchy and reframed filters around the user’s preferences. Common dimensions remain easy to reach. Past searches can stay accessible. Recommended opportunities become more prominent.",
          "The goal wasn’t to maximise the number of filters. It was to help someone move from “There are hundreds of internships” to “These are the few worth opening.”",
        ],
        visuals: [{ kind: "devices", shots: [shot("/work/internshala/cs/in-search-clean.webp", "Home, search and preferences", undefined, row3("Home", "Search", "Preferences (filters)"))] }],
      },
      {
        title: "Opportunity 03: make the profile reusable but the application personal",
        short: "Reusable profile",
        body: [
          "A candidate shouldn’t have to rebuild their professional information for every application. But forcing every company to receive exactly the same application also isn’t ideal.",
          "The redesign separates those concerns. The central profile and resume become reusable foundations. During a specific application, users can make relevant edits without unintentionally changing everything in the profile. Document parsing can reduce manual profile creation further.",
          "The principle: your information should be reusable. Your application should still be adaptable.",
        ],
      },
      {
        title: "Opportunity 04: break applications into smaller steps",
        short: "Step-by-step applying",
        body: [
          "Long forms feel longer when the user has no idea how much remains. I replaced the wall-of-form pattern with progressive steps and visible progress. Each stage asks for a manageable amount of information.",
          "The applicant can understand where they are, what is left, and whether they have enough time to finish. This reduces cognitive load without pretending the employer doesn’t need information.",
        ],
      },
      {
        title: "Opportunity 05: stop making people rewrite the same answer",
        short: "Saved responses",
        body: ["Internship applications often ask variations of the same questions:"],
        list: ["Why are you interested?", "Tell us about a relevant project.", "Why are you a good fit?"],
        after: [
          "Starting from zero every time adds repetitive labour without necessarily improving application quality.",
          "I introduced Saved Responses. Applicants can reuse a previous answer as a starting point and then tailor it to the new opportunity.",
          "The feature isn’t intended to encourage generic applications. It removes the blank-page work so candidates can spend their effort editing for relevance instead.",
        ],
        visuals: [{ kind: "devices", shots: [shot("/work/internshala/cs/in-saved-clean.webp", "Application form with saved responses", undefined, row3("Application form", "Saved responses", "Save a response"))] }],
      },
      {
        title: "Opportunity 06: drafts should behave like drafts",
        short: "Auto-saved drafts",
        body: [
          "Applicants frequently need information they don’t have immediately. Maybe they want to check a portfolio link. Rewrite an answer. Come back after class. Or finish from another device.",
          "Leaving shouldn’t mean losing the application. Incomplete applications are therefore automatically preserved and surfaced inside a dedicated Drafts area.",
          "That turns interruption from failure into a normal state of the workflow.",
        ],
        visuals: [{ kind: "devices", shots: [shot("/work/internshala/cs/in-drafts-clean.webp", "Saving an application as a draft", undefined, row3("Application form", "Save as draft pop-up", "Home"))] }],
      },
      {
        title: "Opportunity 07: make post-application status visible",
        short: "Application status",
        body: ["This became one of the most important changes. Applications can move through states such as:"],
        list: ["Submitted", "Viewed", "Shortlisted", "Interviewing", "Rejected, or another next step"],
        after: [
          "Those states give candidates a much clearer picture of what the employer has actually done. It doesn’t eliminate rejection. It eliminates some of the unnecessary ambiguity around it.",
          "And visible system status gives Internshala a stronger role after submission rather than effectively disappearing once the candidate clicks Apply.",
        ],
      },
      {
        title: "Opportunity 08: create a path to human contact",
        short: "Recruiter contact",
        body: [
          "Research also suggested that candidates value contact with real people inside the organisations they are applying to. The redesign explores two ways of bringing the employer closer.",
          "Relevant company contacts can be surfaced when appropriate. And recruiter messages can live directly inside the application experience.",
          "This creates continuity between discovering the role, submitting, tracking, and actually speaking to someone.",
        ],
        visuals: [
          {
            kind: "devices",
            shots: [
              shot("/work/internshala/cs/in-tracking-clean.webp", "Applications with status tags", undefined, [{ text: "Applications", x: 50, y: 100 }]),
              shot("/work/internshala/cs/in-chats-clean.webp", "Messages with recruiters", undefined, [{ text: "Chats", x: 50, y: 100 }]),
              shot("/work/internshala/cs/in-notify-clean.webp", "Status notifications", undefined, [{ text: "Notifications", x: 50, y: 100 }]),
            ],
          },
        ],
      },
      {
        title: "Designing the full flow",
        body: ["The final concept connects several previously fragmented areas:"],
        list: [
          "Onboarding: capture enough preference to personalise the product quickly.",
          "Home: show relevant internships and jobs with stronger hierarchy.",
          "Search: refine without excessive configuration.",
          "Job detail: make requirements, compensation and key information easier to scan.",
          "Application: reduce perceived form burden and preserve work.",
          "Profile and resume: maintain reusable information without preventing application-specific changes.",
          "Application tracker: show the status of submitted work.",
          "Chat: bring recruiter communication into the same ecosystem.",
        ],
        after: ["The value is less in any one screen than in removing friction between those stages."],
        visuals: [{ kind: "deck", id: "in-ds" }],
      },
      {
        title: "Expected impact",
        body: ["Because this is a self-initiated project, these are design hypotheses rather than measured product results. I would expect the redesign to improve:"],
        list: [
          "recommendation relevance, through preference-led onboarding",
          "application completion, through progressive disclosure and drafts",
          "repeat application efficiency, through Saved Responses and reusable profile data",
          "candidate trust, through clearer application states",
          "ongoing engagement, through communication and stronger post-submission utility",
        ],
        after: ["Those would be the behaviours I would validate in testing before treating the redesign as successful."],
      },
      {
        title: "What I took away",
        body: [
          "I began this project thinking the most frustrating part of internship hunting was filling forms. Research changed that. The deeper problem was uncertainty.",
          "Candidates don’t only need a faster way to apply. They need the product to help them understand what fits them, what remains to be done, and what happened after they took the risk of applying.",
          "Good hiring UX cannot guarantee the outcome. It can make the journey feel substantially less like a black hole.",
        ],
      },
    ],
  },

  // ─────────────────────────────── 06. Natasha ───────────────────────────────
  {
    slug: "natasha",
    name: "Natasha",
    title: "Designing Builder.ai’s AI Product Manager across chat, voice, and the workspace",
    meta: ["Product Designer", "Builder.ai", "Conversational interface design", "Part of the BLOCK redesign"],
    intro:
      "Natasha was being introduced as Builder.ai’s AI Product Manager: a conversational way to help people begin building an app or explore an idea. I worked on the interface and reusable patterns for that experience as part of the wider design-system redesign supporting its launch. The design spans a compact side panel, an immersive conversation view, and an in-page voice bar. The challenge was to make each mode understandable while preserving a recognisable interaction language.",
    summary: {
      heading: "What the design covered",
      items: [
        "Welcome states and starting prompts that make the assistant’s purpose concrete.",
        "Text input, voice entry, and transcribed user-message patterns.",
        "Structured responses with follow-up actions and response-level controls.",
        "Listening, thinking, speaking, pause, loading, and interruption states.",
      ],
    },
    label: "Builder.ai · AI product",
    deliverables: ["Conversation UI", "Voice states", "Components", "Interaction design"],
    concept: false,
    sections: [
      {
        title: "Make the first conversation easier to begin",
        body: [
          "The opening experience introduces Natasha and asks what the person would like to build. Suggested starting points such as “Build app”, “Create store”, and “Prototype” connect the assistant to recognisable goals.",
          "This gives someone a starting point even if they have not worked out how to phrase their request. The message field remains available for people ready to describe their own idea.",
          "The design intention was to communicate both purpose and possibility: what Natasha can help with, and how to start.",
        ],
        visuals: [
          {
            kind: "browser",
            shots: [shot("/work/natasha/immersive-welcome-screen.webp", "Immersive welcome: the opening question, message field, Talk control, and goal-based prompts")],
            caption: "The opening question, message field, Talk control, and goal-based prompts introduce the experience",
          },
        ],
      },
      {
        title: "Give conversation the space it needs",
        body: [
          "The side panel keeps Natasha close to the surrounding product. Its header includes controls to expand or close the experience, while the composer remains at the bottom of the conversation.",
          "The immersive view gives the same conversation patterns a wider canvas. Shared response and input components adapt to that space, keeping the interaction recognisable across both formats.",
          "The trade-off is focus against context. A compact panel leaves more of the existing workspace available; the immersive format gives the conversation more room. The design provides both layouts without assuming one will suit every moment.",
        ],
        visuals: [
          {
            kind: "devices",
            shots: [shot("/work/natasha/panel-welcome.webp", "The compact side panel: Natasha’s welcome and starting prompts"), shot("/work/natasha/panel-conversation.webp", "The compact side panel: a response with controls and follow-ups")],
            caption: "Compact welcome and conversation examples from the final component family. Example response text is illustrative.",
          },
        ],
      },
      {
        title: "Make text and voice visible choices",
        body: [
          "“Talk” is presented beside the message composer as an explicit entry into the voice experience. The component model also accounts for transcribed user messages, with distinct formats for spoken and typed input.",
          "An in-page voice bar provides another way to keep the interaction available alongside page content. Its controls expose the current state and ways to pause, close, or interrupt the exchange.",
        ],
      },
      {
        title: "Show what Natasha is doing",
        body: [
          "A voice interface needs to distinguish listening from processing and speaking. The design includes explicit “Listening” and “Thinking” states, along with a “Click to interrupt” state during output.",
          "The file also defines idle, loading, pause, and transitions between the main voice states. That state coverage makes the moments between responses part of the experience specification.",
          "Interruption is particularly important: people need an understandable way to take their turn again. A changing visual treatment is supported by a clear action label.",
        ],
        visuals: [{ kind: "board", shot: shot("/work/natasha/voice-states.webp", "Voice controls: Start speaking, Listening, Thinking, and Click to interrupt"), caption: "Voice controls: Start speaking, Listening, Thinking, and Click to interrupt" }],
      },
      {
        title: "Give responses structure and a next step",
        body: [
          "Natasha’s responses are built from body text, headings, subheadings, bullets, and numbered lists, with corresponding compact and immersive variants.",
          "Response-level controls provide playback, copying, and feedback affordances. Suggested follow-ups let people indicate whether a response works for them and continue the exchange.",
          "This makes the response an interaction point. The user can read it, respond to it, and decide how to proceed.",
        ],
      },
      {
        title: "Set expectations within the experience",
        body: [
          "The compact interface includes a reminder that Natasha can make mistakes and that responses should be checked. Combined with feedback and interruption controls, this makes room for the user to question or redirect the assistant.",
        ],
      },
      {
        title: "Outcome and reflection",
        body: [
          "The delivered design work defined the main conversation surfaces, reusable response patterns, and the state model around text and voice as part of the launch-focused redesign.",
          "I would validate how easily people start a useful conversation, understand the current voice state, interrupt a response, and interpret the next available action.",
          "The project reinforced how much of a conversational experience happens around the answer. Starting, waiting, switching modes, and taking control again all need the same level of design attention as the response itself.",
        ],
      },
    ],
  },

  // ─────────────────────────────── 07. OYO Review SaaS ───────────────────────────────
  {
    slug: "ratings-reviews",
    name: "OYO Review SaaS",
    title: "Turning post-stay feedback into better reviews, and a new revenue opportunity",
    meta: ["Product Design", "Ratings & Reviews"],
    intro:
      "Ratings help travellers make decisions before they ever see a hotel in person. But OYO had an unusual gap. Guests were already willing to leave feedback about the OYO app on the Play Store and App Store. Far fewer were leaving useful feedback about the property they had actually stayed at inside OYO.",
    summary: {
      heading: "Outcome",
      items: [
        "+76% relative lift in review coverage versus the old flow.",
        "77% of participating properties crossed the minimum threshold of 20 reviews.",
        "18% of properties opted into the Review SaaS programme.",
        "~$424K revenue generated through Review SaaS.",
      ],
    },
    label: "OYO · Mobile app feature",
    deliverables: ["Research", "User flow", "Mobile UI", "Prototype"],
    concept: false,
    links: [
      {
        label: "Prototype",
        href: "https://www.figma.com/proto/EOAbRYT9pUIvK3PYtzVELG/Review-Saas-Phase-2?page-id=0%3A1&type=design&node-id=1-105091&viewport=3186%2C820%2C0.18&t=EjTU9kC59pMw0XkP-1&scaling=min-zoom&starting-point-node-id=1%3A105091&show-proto-sidebar=1&mode=design",
      },
    ],
    sections: [
      {
        title: "A star rating in the wrong place",
        body: [
          "The existing experience allowed little more than a star rating. It lived inside a part of the app users primarily visited for invoices or repeat bookings.",
          "There was no meaningful review-writing flow, very little context around what the rating represented, and no strong reason for someone to return after checkout just to provide feedback.",
          "That affected more than review volume. Sparse property reviews reduce confidence for future travellers. Hotels lose a source of structured feedback. And OYO loses a mechanism that can improve both marketplace trust and hotel participation.",
          "The challenge became: how might we collect richer post-stay reviews without turning feedback into another long form users don’t want to complete?",
        ],
        sticker: gif("/work/ratings-reviews/cs/12-296.webp", 541, 541, "GIF: C’mon son", "/work/ratings-reviews/cs/12-296-anim.webp"),
        visuals: [
          {
            kind: "annotated",
            panels: [
              {
                shot: shot("/work/ratings-reviews/phone-current-clear.webp", "The old checked-out screen, where a star rating was the only feedback"),
                phone: { x: 6, y: 34, w: 54 },
                notes: [{ text: "This is the section to give a rating (current flow)", x: 58, y: 7, w: 40, from: [68, 31], to: [0.62, 0.32], bend: 10, align: "center" }],
              },
              {
                shot: shot("/work/ratings-reviews/phone-listing-clear.webp", "Listing ratings guests found hard to interpret"),
                phone: { x: 36, y: 36, w: 54 },
                notes: [
                  { text: "What will users understand from this star?", x: 2, y: 6, w: 36, from: [22, 27], to: [0.12, 0.15], bend: -9 },
                  { text: "What does this 793 stand for?", x: 56, y: 5, w: 42, from: [70, 19], to: [0.27, 0.15], bend: 8, align: "center", tilt: 4 },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Why timing mattered as much as interface design",
        body: [
          "One of the most useful behavioural ideas in the project was the peak-end rule. People tend to remember experiences disproportionately through emotionally significant moments and how the experience ended.",
          "That was relevant because reviews are rarely neutral acts. Someone who had an excellent stay may want to celebrate it. Someone who had a poor stay may strongly want to explain what went wrong. An average experience creates much less motivation.",
          "The existing experience waited for the user to rediscover rating inside the product. By then, the strongest moment of intent might already have passed.",
          "So the first design principle became: ask while the stay is still fresh.",
        ],
      },
      {
        title: "Understanding why the existing flow wasn’t converting",
        body: [
          "I combined several inputs.",
          "User conversations. We spoke with users to understand what they thought the existing rating represented and why they weren’t completing it. A recurring issue was ambiguity. A star score could mean different things to different people, and users couldn’t always tell what a number on a listing actually represented.",
          "UXCam sessions. We watched anonymised session recordings to understand how people interacted with the existing “Rate your stay” area. Very few users actively sought it out. The feature wasn’t failing because people couldn’t technically tap the stars. It was failing much earlier: the product wasn’t creating enough intention to participate.",
          "Competitive benchmarking. We also studied how other travel and marketplace products collected reviews. The useful question wasn’t simply “what fields do they ask for?” It was how they reduced the perceived effort of contributing while still collecting information valuable to future customers.",
        ],
        sticker: { src: "/work/ratings-reviews/cs/12-438.webp", w: 325, h: 268, alt: "A sketch of someone drawing ideas" },
        visuals: [{ kind: "board", shot: shot("/work/ratings-reviews/img-benchmark.webp", "Review management benchmarking across platforms") }],
      },
      {
        title: "The existing experience had three structural problems",
        list: [
          "01, wrong moment. Users weren’t naturally returning to My Bookings to leave detailed feedback.",
          "02, too little expression. A star rating couldn’t explain why a stay was good or bad.",
          "03, the value exchange was invisible. A thoughtful review benefits future travellers, the property and the platform. The user was doing real work, but the product didn’t meaningfully recognise that contribution.",
        ],
        after: ["That led us to explore an incentive-led Review SaaS flow."],
      },
      {
        title: "Designing the review journey with the PM",
        body: [
          "During conceptualisation, I worked closely with the product manager to map how review collection could happen after checkout. We validated the proposed journey with other stakeholders before going deeper into UI.",
          "I then used rapid ideation exercises, including Crazy 8s, to explore ways of breaking a potentially long review into a sequence of smaller interactions.",
          "The goal wasn’t to create the shortest form possible. It was to make the work feel progressive and finite.",
        ],
        visuals: [
          { kind: "board", shot: shot("/work/ratings-reviews/img-user-flow.webp", "The user flow for collecting reviews") },
          { kind: "board", shot: shot("/work/ratings-reviews/img-sketches.webp", "Crazy 8s sketches") },
        ],
      },
      {
        title: "Step 01: start with one tiny commitment",
        body: [
          "Immediately after checkout, the app asks for a simple star rating in a bottom sheet. That first interaction intentionally doesn’t expose the entire review form. A user can respond with very little effort.",
          "This works as an anchor for the rest of the journey: I’ve already started reviewing my stay. Once the intent is established, the product can invite more detailed feedback.",
        ],
        visuals: [{ kind: "devices", maxWidth: 520, shots: [shot("/work/ratings-reviews/img-entry-clear.webp", "The bottom sheet on the first app visit after checkout")] }],
      },
      {
        title: "Step 02: explain the reward before asking for more work",
        body: ["The experience clearly communicates that a high-quality review can earn a reward. Progress indicators show:"],
        list: ["where the guest is in the journey", "how much remains", "when the reward will be received"],
        after: [
          "A persistent reward cue reinforces the value exchange without forcing the user to remember it.",
          "The psychology wasn’t “bribe someone for a positive review.” The reward was for completing useful feedback, regardless of whether the experience was good or bad. That distinction was important for trust.",
        ],
      },
      {
        title: "Step 03: turn one giant review into smaller judgments",
        body: [
          "Instead of asking “Tell us about your stay,” the experience breaks the review into categories such as Room, Cleanliness and Location. Each category receives its own rating.",
          "This gives OYO more structured information while reducing the amount the guest has to formulate from scratch.",
          "I used a sequential task pattern here deliberately. People complete one kind of judgment at a time rather than mentally switching between rating, writing, uploading and categorising.",
        ],
        visuals: [{ kind: "devices", maxWidth: 280, shots: [shot("/work/ratings-reviews/img-rate-clear.webp", "Category ratings for room, cleanliness and location")] }],
      },
      {
        title: "Step 04: let the interface respond to the rating",
        body: [
          "A five-star room and a two-star room shouldn’t produce exactly the same follow-up questions. After a rating, the interface surfaces contextual options that help the guest describe what worked or what didn’t.",
          "Instead of forcing someone to construct a paragraph, they can first select relevant themes. This has two benefits: it reduces cognitive effort for the reviewer, and it turns unstructured sentiment into information the business can actually analyse.",
        ],
      },
      {
        title: "Step 05: help users through the blank-page problem",
        body: [
          "Writing is a much bigger commitment than tapping a rating. To reduce that barrier, the writing step includes contextual prompts and quick suggestions.",
          "These aren’t meant to write the review for the guest. They answer the much smaller question: “What could I talk about?” That gives people a starting point while keeping the content genuinely theirs.",
          "The design also aimed to encourage reviews of meaningful length rather than one-word responses.",
        ],
        visuals: [{ kind: "devices", maxWidth: 280, shots: [shot("/work/ratings-reviews/img-write-clear.webp", "Writing a review with contextual suggestions")] }],
      },
      {
        title: "Step 06 and 07: photos and traveller context",
        body: [
          "Text tells someone what a guest thought. Photos can show what they actually experienced. The flow therefore asks users to upload property images and recognises that contribution within the reward experience. This makes the review more useful to the next person evaluating the hotel.",
          "The same property can be evaluated differently by a business traveller, a couple, a family, a student group, or a solo traveller. So the review also captures trip type.",
          "That context helps future guests decide “Is this hotel good for someone travelling like me?” rather than simply “Does this hotel have a good average score?”",
        ],
        visuals: [{ kind: "devices", maxWidth: 280, shots: [shot("/work/ratings-reviews/img-photos-clear.webp", "Adding photos and trip type")] }],
      },
      {
        title: "Closing the loop",
        body: [
          "The completion state makes the reward explicit and shows where the cashback will be deposited.",
          "Only after the guest has completed the property-review experience do we introduce adjacent asks such as reviewing OYO itself on the app store or participating in referral programmes.",
          "That sequencing matters. The product earns the right to make another request after the primary contribution is complete.",
        ],
        visuals: [{ kind: "devices", maxWidth: 280, shots: [shot("/work/ratings-reviews/img-reward-clear.webp", "The cashback confirmation")] }],
      },
      {
        title: "Outcome",
        body: ["After the new flow went live:"],
        list: [
          "+76% relative lift in review coverage versus the old flow",
          "77% of participating properties crossed the minimum threshold of 20 reviews",
          "18% of properties opted into the Review SaaS programme",
          "~$424K revenue generated through Review SaaS",
        ],
        after: [
          "The experience created value on all three sides of the marketplace. Guests were recognised for meaningful contribution. Hotels received richer feedback and stronger review coverage. Future travellers received more useful information before booking.",
        ],
      },
      {
        title: "What I took away",
        body: ["The reward helped. But the reward wasn’t the whole design. The strongest experience came from combining:"],
        list: ["the right timing", "small progressive commitments", "clear progress", "an obvious value exchange"],
        after: ["People are willing to do more when the product makes it clear that the effort matters."],
      },
    ],
  },

  // ─────────────────────────────── 08. Builder University ───────────────────────────────
  {
    slug: "builder-university",
    name: "Builder University",
    title: "Turning repeated onboarding into a scalable internal learning product",
    meta: ["Product Designer", "0→1 Internal Product", "Builder.ai"],
    intro:
      "Builder.ai combined technology with a large network of internal employees and third-party experts who helped deliver client projects. As the organisation scaled, one operational problem became increasingly expensive: a lot of people needed to understand Builder, its products and its processes, and they needed to understand them quickly. Builder University became our attempt to convert that repeated knowledge into a self-serve learning product.",
    summary: {
      heading: "What the platform introduced",
      items: [
        "Learning Plans that answer “what should I do next?”",
        "Progress and lightweight gamification.",
        "A broader Learning Hub for learning beyond onboarding.",
        "Integration with Builder Hive, as part of the onboarding ecosystem.",
      ],
    },
    label: "Builder.ai · Web platform, 0→1",
    deliverables: ["Pilot", "Product design", "Gamification", "QA"],
    concept: false,
    sections: [
      {
        title: "People repeatedly teaching people",
        body: [
          "New experts could be joining while projects were already moving. The people most qualified to teach them were also busy doing their own work.",
          "Some hires needed product knowledge. Others needed role-specific processes. Experienced employees sometimes needed a place to learn about a part of Builder they hadn’t worked with before.",
          "The existing model relied too heavily on people repeatedly teaching people. That doesn’t scale when hundreds of experts can be entering the ecosystem.",
        ],
      },
      {
        title: "The challenge wasn’t simply “build an LMS”",
        body: [
          "E-learning is a mature category. Video lessons, quizzes, course pages and certificates are not novel interface problems. Our specific problem was organisational.",
          "A new person could arrive and see an enormous amount of Builder knowledge without knowing:",
        ],
        list: ["What applies to my role?", "Where do I start?", "What is mandatory?", "What can I explore later?", "What do I need before I can move to the next thing?"],
        after: ["So the core challenge wasn’t access to courses. It was direction."],
      },
      {
        title: "The first product decision: don’t wait for the product",
        body: [
          "The company needed a solution immediately. Building a fully custom learning platform first would have delayed the operational benefit and forced us to make product decisions without observing how people actually learned the material.",
          "So we launched an initial pilot using WordPress. This wasn’t a compromised final solution. It was an intentional temporary one.",
        ],
        list: [
          "Content could start immediately. Course authors didn’t have to wait for the custom platform before producing onboarding material.",
          "We created a testing pool. People could interact with real onboarding content, giving us evidence for the product we were about to build.",
          "The company got something useful quickly. We moved from no central learning experience to a functional starting point while the more robust system was being designed.",
        ],
        after: ["That made the pilot a research tool as much as a delivery shortcut."],
        visuals: [{ kind: "browser", shots: [shot("/work/builder-university/img-pilot-screen.webp", "The WordPress pilot")] }],
      },
      {
        title: "What the pilot clarified",
        body: [
          "The basic mechanics of e-learning worked as expected. The more important questions appeared around the edges.",
          "Users were new both to Builder and to Builder University. Many didn’t know what they were supposed to learn. People from different roles needed different material. And the platform still needed enough motivation and progress feedback to prevent assigned learning from feeling like an endless list of corporate videos.",
          "That produced three product opportunities:",
        ],
        list: ["Learning Plans", "Progress and lightweight gamification", "A broader Learning Hub"],
      },
      {
        title: "Solution 01: Learning Plans answer “what should I do next?”",
        body: [
          "A traditional course catalogue gives learners choice. Choice isn’t automatically helpful when someone has no idea what they need.",
          "Learning Plans assign a structured curriculum based on role or department. Instead of entering Builder University and deciding among dozens of courses, a new expert receives a path designed for what they need to function effectively.",
          "Courses can be sequenced. Prerequisites can prevent someone from entering later material before completing the fundamentals. Locked states make that dependency visible.",
          "The experience turns “Here is everything Builder knows” into “Here is what you need next.” That is a much more useful onboarding product.",
        ],
        visuals: [{ kind: "browser", shots: [shot("/work/builder-university/frame-1.webp", "A role-based learning plan with ordered courses")] }],
      },
      {
        title: "Designing progress into the dashboard",
        body: [
          "A long learning plan feels less intimidating when progress is visible. The dashboard therefore makes completion concrete through information such as:",
        ],
        list: ["percentage of the Learning Plan complete", "courses finished", "learning time", "average score", "what remains"],
        after: [
          "The design is intentionally action-oriented. A returning learner should understand within seconds where they left off, what they have achieved, and what they should continue.",
        ],
        visuals: [{ kind: "board", shot: shot("/work/builder-university/img-dashboard-clean.webp", "Learning time, score and the plan tracker") }],
      },
      {
        title: "Solution 02: gamification without making work feel childish",
        body: [
          "We wanted assigned learning to feel motivating. We didn’t want the product to become an elaborate points economy that required significant engineering and distracted from the actual learning.",
          "I studied how products such as LinkedIn Learning and Duolingo use progress and reward systems, then reduced those ideas to something appropriate for Builder.",
        ],
        list: [
          "Users begin at a base tier and progress through levels as they complete learning.",
          "Badges appear at meaningful milestones.",
          "Completion screens communicate progress toward the next level.",
          "Learning time and scores create additional signals of momentum.",
          "Certificates and achievements live in a dedicated profile area and can be shared externally where appropriate.",
        ],
        after: [
          "The principle: celebrate progress. Don’t make the reward more important than the skill.",
          "This also fit our resource constraints. We could create a sense of progression without building an enormous game system.",
        ],
        visuals: [{ kind: "board", shot: shot("/work/builder-university/img-badges-clean.webp", "Tiers, badges and course progress") }],
      },
      {
        title: "Solution 03: don’t let the product become useless after onboarding",
        body: [
          "The original business problem was onboarding. But interviews and product discussions revealed a second use case. Existing employees sometimes needed to understand another Builder product or internal process. There was no single place to do that.",
          "So Builder University evolved beyond assigned curricula. Every learner can browse the wider course catalogue and independently enrol in material outside their Learning Plan.",
          "Course preview pages explain what someone will learn, course length, level, curriculum, prerequisites, instructor, and other context before enrolment.",
          "This turns the platform into ongoing organisational infrastructure instead of a one-time checklist new hires abandon after week one.",
        ],
        visuals: [{ kind: "browser", shots: [shot("/work/builder-university/frame-2.webp", "The Learning Hub")] }],
      },
      {
        title: "Designing the complete product from scratch",
        body: ["The final system had to connect several layers."],
        list: [
          "Dashboard: what am I supposed to learn now?",
          "Learning Plan: what sequence has been assigned to me?",
          "Course detail: what will I learn and what is required first?",
          "Learning experience: how do I consume the material and move through lessons?",
          "Assessments: how do I demonstrate understanding?",
          "Achievements: what have I completed?",
          "Learning Hub: what else can I explore independently?",
        ],
        after: [
          "Because the product was new, I wasn’t simply redesigning an existing surface. Information architecture, states, progress logic and the relationship between these surfaces had to be established together.",
        ],
      },
      {
        title: "Working closely with QA and engineering",
        body: [
          "Designing the interface was only one part of shipping the product. One of the biggest implementation challenges was keeping the final build close to the intended experience.",
          "I worked through multiple rounds of QA myself and shared knowledge transfers directly with developers to reduce information getting lost between design and implementation.",
          "This became especially important in a product with locked states, course progress, prerequisites, assessment states, tier progression and dynamic content.",
          "A static handoff file couldn’t communicate every condition. The collaboration around the build became part of the design work.",
        ],
      },
      {
        title: "Outcome",
        body: [
          "Builder University became an internal learning platform integrated with Builder Hive, where experts could access the learning experience as part of the broader onboarding ecosystem.",
          "It helped move expert upskilling and onboarding away from a model dependent entirely on repeated human instruction toward a more automated system.",
          "The platform remained in beta, so I wouldn’t use a fabricated before/after engagement metric here. The more meaningful outcome was operational: Builder now had a place where onboarding knowledge could scale independently of the number of people available to teach it.",
        ],
      },
      {
        title: "Future scope",
        body: ["Because the underlying need extended beyond onboarding, the beta roadmap also included opportunities such as:"],
        list: ["webinars", "internal event catalogues", "bookmarking", "notifications", "additional learning experiences"],
        after: ["That reinforced why the Learning Hub architecture mattered. The product needed somewhere to grow."],
      },
      {
        title: "What I took away",
        body: [
          "This was one of my first opportunities to design an entire product from zero. The most useful lesson happened before the polished product existed.",
          "0→1 doesn’t mean 0→perfect.",
          "The temporary WordPress pilot let us solve an immediate business need, learn from real behaviour, start content production early and then invest in the custom product with much more context.",
          "Sometimes the smartest first version is the one you already know you’re going to replace.",
        ],
      },
    ],
  },
  // ─────────────────────────────── 09. Basecamp ───────────────────────────────
  {
    slug: "basecamp",
    name: "Basecamp",
    title: "Reorganising a feature-rich product around what visitors need to understand first",
    meta: ["Self-initiated", "Web & Product Communication", "Sep–Oct 2024"],
    intro:
      "Basecamp is a project-management product built around a relatively opinionated idea: teams don’t necessarily need more tools. They need a simpler place to organise work, communicate and understand what is happening. For this self-initiated redesign, I explored how Basecamp could explain a feature-rich product without making visitors understand every feature before understanding the product.",
    summary: {
      heading: "What I did",
      items: [
        "Audited hierarchy, navigation, content sequence, CTAs and feature communication.",
        "Grouped capabilities around jobs people recognise.",
        "Restructured the page into a seven-step narrative.",
        "A clearer type scale, spacing, CTA distinction and colour system.",
      ],
    },
    label: "Self-initiated · Landing page",
    deliverables: ["Audit", "Information architecture", "Visual design"],
    concept: true,
    sections: [
      {
        title: "Breadth is a strength, and a communication problem",
        body: [
          "Its product includes to-dos, chat, message boards, files, schedules, reporting, check-ins, project history, integrations and more.",
          "That breadth is a product strength. On a landing page, it can also become a communication problem.",
        ],
      },
      {
        title: "Auditing the existing experience",
        body: [
          "I reviewed the original page through several lenses: hierarchy, navigation, content sequence, CTA prominence, feature communication, and the relationship between marketing copy and actual product UI. Four issues appeared repeatedly.",
        ],
        list: [
          "01, too much to process early. The hero contained enough information that understanding the core value required more reading than it should. The product needed a stronger first answer to “What does Basecamp help my team accomplish?” before introducing everything it contains.",
          "02, important product value appeared too deep. Some of the strongest benefits were buried inside a long page. A visitor could technically discover them, but only after substantial scrolling. That made page depth determine product understanding.",
          "03, the hierarchy didn’t always tell visitors where to look. Information with very different importance sometimes competed visually. Without enough hierarchy, scanning becomes reading. And a landing page for a familiar but complex category needs to work for both.",
          "04, the journey felt more like a collection of sections than an argument. The page contained useful content. What it lacked was a stronger narrative progression. Visitors shouldn’t have to assemble the positioning themselves. Each section should prepare them for the next.",
        ],
        visuals: [{ kind: "board", shot: shot("/work/basecamp/img-why.webp", "Four problems with the existing page") }],
      },
      {
        title: "Reframing the landing page",
        body: [
          "The redesign wasn’t about inventing a new Basecamp brand. It was about giving the existing product story a clearer sequence.",
          "The central question became: how might we communicate Basecamp’s breadth without making the experience feel broad and complicated?",
        ],
      },
      {
        title: "Principle 01: lead with the job, not the inventory",
        short: "Job before features",
        body: [
          "Instead of opening with a large amount of product detail, the redesigned hero focuses on the larger outcome: centralise work, collaborate clearly and keep projects moving.",
          "Features can then prove the promise. This creates a better information order: Why should I care? then How does it work? then What exactly do I get?",
        ],
        visuals: [{ kind: "laptop", shot: shot("/work/basecamp/img-final-hero.webp", "The redesigned hero") }],
      },
      {
        title: "Principle 02: let the interface explain the relationship between features",
        short: "Features in context",
        body: [
          "A to-do list isn’t an interesting differentiator by itself. Neither is chat. Neither are files. Basecamp’s value comes from those things existing around the same project.",
          "So the redesign relies more heavily on interface moments to show that relationship. A visitor can see how communication, tasks, project updates and files operate together rather than encountering them as a disconnected feature checklist.",
        ],
        visuals: [{ kind: "browser", shots: [shot("/work/basecamp/img-features.webp", "The product shown in use")] }],
      },
      {
        title: "Principle 03: group capabilities around jobs people recognise",
        short: "Grouped by job",
        body: ["Instead of presenting every capability at equal weight, I organised the page around understandable product jobs."],
        list: [
          "Organise work: to-dos, scheduling and project structure.",
          "Communicate: message boards, pings and team discussion.",
          "Keep knowledge together: docs, files and project history.",
          "Understand progress: reports, check-ins and activity.",
          "Protect focus: notification control and quieter work.",
          "Extend the workflow: integrations with the tools teams already use.",
        ],
        after: ["This gives visitors a mental model before they meet the long tail of features."],
        visuals: [{ kind: "browser", shots: [shot("/work/basecamp/img-integrations.webp", "Integrations and essential features")] }],
      },
      {
        title: "Principle 04: treat notification control as a benefit, not a setting",
        short: "Focus as a benefit",
        body: [
          "One of Basecamp’s more interesting ideas is that collaboration software shouldn’t demand everyone’s attention all day. Notification protection can easily be presented as another settings feature. I elevated it as part of the product philosophy.",
          "The value isn’t “You can configure notifications.” It’s “Your project-management tool doesn’t need to own your attention.” That tells a much stronger product story.",
        ],
      },
      {
        title: "Principle 05: put proof beside the claim it supports",
        short: "Proof beside claims",
        body: [
          "Social proof becomes less persuasive when testimonials live in an isolated carousel disconnected from the rest of the page. The redesign uses evidence closer to relevant product claims.",
          "If a section explains organisation, the proof should reinforce organisation. If the section explains collaboration, the supporting story should relate to collaboration. That turns testimonials into evidence rather than decoration.",
        ],
      },
      {
        title: "Restructuring the information architecture",
        body: ["The final page follows a clearer sequence:"],
        list: [
          "01, core product promise: what does Basecamp help teams accomplish?",
          "02, a project in context: how does work actually come together?",
          "03, essential product jobs: what are the major capability groups?",
          "04, integrations: how does Basecamp fit into an existing workflow?",
          "05, focus and notification control: how does it avoid becoming another source of noise?",
          "06, social proof: does this work for real teams?",
          "07, clear conversion point: what should I do next?",
        ],
        after: ["This doesn’t reduce Basecamp’s functionality. It changes the order in which someone has to understand it."],
        visuals: [{ kind: "board", shot: shot("/work/basecamp/img-ia.webp", "Information architecture of the landing page") }],
      },
      {
        title: "Visual direction",
        body: [
          "I also explored a stronger hierarchy and more contemporary visual system while preserving Basecamp’s straightforward personality. The visual work supported the communication strategy through a clearer type scale, more deliberate spacing, stronger CTA distinction, product UI shown in context, and a consistent colour system.",
          "The goal wasn’t visual novelty for its own sake. The page should feel energetic enough to invite exploration without fighting the product explanation.",
        ],
        visuals: [{ kind: "board", shot: shot("/work/basecamp/img-palette.webp", "The colour palette and gradients") }],
      },
      {
        title: "What I would validate",
        body: [
          "Because this was a self-initiated concept rather than work commissioned or shipped by Basecamp, I would not attach fabricated conversion metrics to it.",
          "The next useful validation would be to compare the redesigned page against the existing experience on measures such as:",
        ],
        list: ["time to correctly explain what Basecamp does", "feature comprehension", "CTA confidence", "which product benefits visitors recall after scanning"],
      },
      {
        title: "What I took away",
        body: [
          "Landing-page design is largely an exercise in sequencing. A page can contain every correct fact and still communicate poorly if those facts appear in the wrong order.",
          "The question I kept returning to was: what does someone need to understand before the next thing will make sense?",
          "Once that order is right, visual design has a much easier job.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
