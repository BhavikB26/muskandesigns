import { mediaDims } from "./media-dims";

/*
 * Case studies, in one short structure (after manojdesigner.framer.website):
 * context → problem → research → explorations & tradeoffs → solution (with the reasoning) → impact → learnings.
 * Copy and numbers come from Muskan's own case studies, decks and resume.
 *
 * Visuals are art-directed per image (after ngan-nguyen.com and dimpalgidwani.com): every one sits in a
 * gem-tinted panel. Bare phone screens get a phone frame, web screens a browser or laptop, mockups that already
 * have their own frame are shown whole, and research boards sit on a white card at their real proportions.
 */

/** clear: the image has a transparent background (a mockup that floats on the panel). */
export type Shot = { src: string; w: number; h: number; alt: string; label?: string; clear?: boolean };

export type Visual =
  /** Bare phone screens, each in a phone frame (1–4 in a row). */
  | { kind: "phones"; shots: Shot[]; caption?: string }
  /** Mockups that already include their device frame (often transparent PNGs), shown whole. */
  | { kind: "devices"; shots: Shot[]; caption?: string }
  /** Web screens in a browser window; a second one overlaps the first. */
  | { kind: "browser"; shots: Shot[]; caption?: string }
  /** One web page in a laptop. */
  | { kind: "laptop"; shot: Shot; caption?: string }
  /** Research boards, diagrams and flows, on a white card at their true ratio. */
  | { kind: "board"; shot: Shot; caption?: string }
  /** Before / after (or control / variation), side by side, each with its label. */
  | { kind: "compare"; shots: [Shot, Shot]; frame: "phone" | "browser" | "plain"; caption?: string }
  /** A structured slide from her deck (sticky notes, affinity map, loop, style guide, click-through). */
  | { kind: "deck"; id: string };

/** A small playful element next to a section title; transparent PNG/SVG, or a framed GIF. */
export type Sticker = { src: string; w: number; h: number; alt: string; anim?: string; framed?: boolean };

export type Section = {
  label: string;
  title: string;
  body?: string[];
  list?: string[];
  /** A key statement (problem, How Might We) set apart from the body. */
  highlight?: string;
  stats?: { value: string; label: string }[];
  quote?: { text: string; by: string };
  sticker?: Sticker;
  visuals?: Visual[];
};

export type CaseStudy = {
  slug: string;
  name: string;
  /** Card copy (to the point, after idoshitty.art): small label, outcome headline, one supporting line. */
  card: { label: string; headline: string; blurb: string };
  tagline: string;
  intro: string[];
  facts: { industry: string; company: string; role: string; timeline?: string; type: string };
  deliverables: string[];
  concept: boolean;
  links?: { label: string; href: string }[];
  sections: Section[];
};

function shot(src: string, alt: string, label?: string): Shot {
  const d = mediaDims[src];
  if (!d) throw new Error(`Missing image dimensions for ${src}`);
  return { src, w: d[0], h: d[1], alt, label, clear: d[2] === 1 };
}
function sticker(src: string, w: number, h: number, alt: string, anim?: string): Sticker {
  return { src, w, h, alt, anim, framed: Boolean(anim) };
}

const pp = (f: string) => `/work/ai-mentor/exact/${f}`;

export const caseStudies: CaseStudy[] = [
  // ─────────────────────────────── Gusto ───────────────────────────────
  {
    slug: "gusto",
    name: "Gusto",
    card: {
      label: "Gusto · Freelance · Growth design",
      headline: "Small businesses weren't ready to sign up. Letting them explore first lifted leads 15%.",
      blurb: "A password-free lead flow and phased A/B tests on Gusto.com's signup funnel.",
    },
    tagline: "Let people look before they leap.",
    intro: [
      "I redesigned Gusto's signup funnel: a password-free lead form, content tailored to what each visitor cared about, and phased A/B tests. Lead conversion went up, Sales got better handoffs, and the MQL pipeline grew.",
    ],
    facts: { industry: "HR & payroll SaaS", company: "Gusto (freelance)", role: "Product Designer", timeline: "~3 months", type: "Growth & conversion" },
    deliverables: ["Funnel audit", "Lead flow", "A/B tests", "Responsive UI"],
    concept: false,
    sections: [
      {
        label: "Context",
        title: "Context",
        body: [
          "Gusto's organic signup path ran from the homepage to a survey, account creation (which also made you a Sales lead) and email verification. It reached about 200k organic visitors. I worked with a product manager, the Head of Web Marketing and two engineers.",
        ],
        visuals: [{ kind: "devices", shots: [shot("/work/gusto/hero-devices.png", "Gusto's new How Gusto Works flow on a laptop and a phone")] }],
      },
      {
        label: "Problem",
        title: "Problem statement",
        highlight: "How might we bridge the gap between account creation and running payroll, so more organic visits turn into quality leads?",
        list: [
          "Drop-off in onboarding was above 25%.",
          "Visitors who weren't ready to commit had no way to become a lead.",
          "Most homepage visitors bounced after one page.",
        ],
        visuals: [{ kind: "devices", shots: [shot("/work/gusto/audit-flow.png", "The original flow: homepage, survey, account creation and email verification")], caption: "The original flow, left to right" }],
      },
      {
        label: "Research",
        title: "Research",
        body: [
          "A diary study showed small business owners need time to compare options. Our fast-track signup didn't give them that, so it asked for commitment far too early in their shopping journey.",
        ],
        sticker: sticker("/work/gusto/icon-persona-smallbiz.svg", 120, 120, "Small business owner icon"),
        visuals: [{ kind: "board", shot: shot("/work/gusto/shopping-journey-board.png", "Diary study board: the stages of a small business owner's shopping journey") }],
      },
      {
        label: "Explorations",
        title: "Explorations & tradeoffs",
        body: [
          "Hypothesis: if we reduce friction upfront and give people more context before asking them to commit, more of them will convert, either as leads or full signups.",
          "Progress needed tradeoffs. I met pushback and tight constraints, so I pitched a phased plan of light, high-impact changes and scrappy A/B tests instead of one big redesign.",
        ],
        list: ["Split intent with two CTAs.", "Add a password-free lead form before signup.", "Only show the content each person asked for.", "Replace content with an interactive Sales demo."],
        visuals: [
          { kind: "compare", frame: "browser", shots: [shot("/work/gusto/ab-1-control.png", "Homepage hero, control", "Control"), shot("/work/gusto/ab-1-variation.png", "Homepage hero with the new How Gusto Works CTA", "Variation")], caption: "Test 1: a second, low-commitment CTA" },
          { kind: "compare", frame: "plain", shots: [shot("/work/gusto/ab-2-control.png", "Product survey, control", "Control"), shot("/work/gusto/ab-2-variation.png", "Product survey with fewer, clearer questions", "Variation")], caption: "Test 2: asking only what Sales needs" },
        ],
      },
      {
        label: "Solution",
        title: "Solution, and why",
        body: [
          "A new primary CTA, “How Gusto Works”, let visitors learn on their own or talk to Sales before signing up. High-intent visitors kept the usual “Create account” path.",
        ],
        list: [
          "Pick only the features you care about.",
          "Leave your details, no password needed.",
          "See product content personalised to your answers.",
          "Then sign up, talk to Sales, or keep exploring. Creating an account later only needs a password; everything else is already filled in.",
        ],
        visuals: [
          { kind: "phones", shots: [shot("/work/gusto/howworks-mobile.png", "How Gusto Works on mobile"), shot("/work/gusto/final-mobile.png", "Account creation on mobile, prefilled")] },
          { kind: "browser", shots: [shot("/work/gusto/howworks-desktop.png", "How Gusto Works on desktop"), shot("/work/gusto/final-desktop.png", "Account creation on desktop, prefilled")] },
        ],
      },
      {
        label: "Impact",
        title: "Impact",
        body: [
          "Adding friction to account creation while lowering the barrier to becoming a lead worked better than combining the two into one step. Moving the flow into the global navigation sent 80% more traffic to it.",
        ],
        stats: [
          { value: "+15%", label: "visits converting to leads" },
          { value: "+25%", label: "account creations" },
          { value: "+1,000", label: "new businesses running payroll each month" },
          { value: "+80%", label: "traffic to the new journey" },
        ],
      },
      {
        label: "Learnings",
        title: "What I learned",
        body: ["Lean UX and careful testing go a long way. With limited resources, aligning stakeholders and using CMS tools well still delivered measurable growth."],
      },
    ],
  },

  // ─────────────────────────────── ProPilot ───────────────────────────────
  {
    slug: "ai-mentor",
    name: "ProPilot",
    card: {
      label: "Preplaced · Chrome extension, 0→1",
      headline: "Developers were stuck and alone. 50,000 now learn with a mentor right beside their code.",
      blurb: "An AI mentor on LeetCode, GFG and YouTube that asks before it answers.",
    },
    tagline: "A mentor that asks before it answers.",
    intro: [
      "50,000 developers who studied online alone found real mentorship without leaving the platforms they already used. 40% kept coming back after four weeks. I was the product designer on ProPilot AI, Preplaced's Chrome extension, from 0 to 1.",
    ],
    facts: { industry: "EdTech, AI", company: "Preplaced", role: "Product Designer", timeline: "Oct – Dec 2023", type: "Chrome extension, 0 → 1" },
    deliverables: ["Research", "Interaction design", "UI", "Analytics & PRDs"],
    concept: false,
    sections: [
      {
        label: "Context",
        title: "Context",
        body: [
          "ProPilot's first version generated AI lessons for career roadmaps. Focusing on content wasn't solving a real problem. So we asked: what if, instead of competing with content, we improved learning on the platforms that already have plenty of it?",
          "Some roadmap lessons already pointed to a YouTube video or a LeetCode/GFG problem. Our MVP extension travelled with the learner and opened right on top of that resource. We tested it with 100 people for 2 weeks.",
        ],
        visuals: [{ kind: "browser", shots: [shot(pp("mvp-screenshot.png"), "The MVP extension floating over a LeetCode problem")] }],
      },
      {
        label: "Problem",
        title: "Problem statement",
        highlight: "How might we give developers personal mentorship, so they feel supported enough to become independent, confident problem solvers?",
        list: [
          "Starting a conversation was hard. Message initiation was 17%, at 2 messages per user; W1 retention was ~10% and W2 ~3%.",
          "Learners switch tabs constantly and expected the mentor to follow. For >75% of interviewees, it didn't.",
          "On coding platforms, help (YouTube, the Solutions tab) wasn't personal to their code.",
          "On YouTube, people invested hours yet didn't feel confident they'd learned.",
        ],
        sticker: sticker(pp("problem3-char.png"), 512, 512, "A worried developer, sweating over a problem"),
      },
      {
        label: "Research",
        title: "Research",
        body: ["Over about 2 weeks, then validated throughout the project:"],
        list: [
          "I analysed 30+ hours of Preplaced's 1:1 mentorship recordings (with mentors' consent).",
          "I ran 20+ phone interviews with students, SDEs, SDETs and QA engineers.",
          "We ran WhatsApp study groups, and studied Reddit and Striver's (TUF) content to find common “stuck” points.",
        ],
        sticker: sticker(pp("problem4-char.png"), 512, 512, "A frustrated learner"),
        visuals: [
          { kind: "board", shot: shot(pp("finding-notebook.png"), "My notes reducing learners' questions to a few standard types"), caption: "Questions looked random until I reduced them to a few patterns" },
          { kind: "board", shot: shot(pp("finding-heatmap1.png"), "A heatmap I made of where developers focus on a LeetCode screen"), caption: "90%+ of developers highlight the same areas of the screen" },
        ],
      },
      {
        label: "Explorations",
        title: "Explorations & tradeoffs",
        body: [
          "I scored every problem by effort and impact. A personalised YouTube roadmap was high effort and medium impact, so we picked it up later. Building confidence (low effort, high impact) and faster revision (medium effort, high impact) came first.",
          "The hardest tradeoff was context versus screen space. The floating chat (design 1) felt present but covered the page. The split tab (design 2) fixed that but couldn't scale beyond chat. Design 3, now in production, adds a side navigation so new features get their own pages.",
        ],
        visuals: [{ kind: "devices", shots: [shot(pp("design1.png"), "Design 1: the floating tab", "Design 1"), shot(pp("design2.png"), "Design 2: the split tab", "Design 2"), shot(pp("design3.png"), "Design 3: the split tab with side navigation", "Design 3")] }],
      },
      {
        label: "Solution",
        title: "Solution, and why",
        list: [
          "Easy Actions inside LeetCode, right next to the code and errors, so starting a conversation needs no typing and feels 100% personal.",
          "A split side tab (the developers' answer to tab switching), so the mentor always knows the page and stays out of the working area.",
          "Dynamic follow-ups and quizzes on the free edges of the YouTube player, spaced out after a series of A/B tests.",
          "Downloadable, time-stamped summaries and key terms where recommendations usually sit, so revising doesn't mean scrubbing hours of video.",
        ],
        visuals: [
          { kind: "browser", shots: [shot(pp("sol1.png"), "Easy Actions next to the code editor on LeetCode")], caption: "Easy Actions on LeetCode" },
          { kind: "compare", frame: "plain", shots: [shot(pp("sol2-before-small.png"), "Before: the chat floated on top of the page", "Before"), shot(pp("sol2-after-small.png"), "After: the mentor opens as a split side tab", "After")], caption: "From a floating chat to a split side tab" },
          { kind: "browser", shots: [shot(pp("sol3-quiz.png"), "A quiz on top of a YouTube lecture"), shot(pp("sol4-summary.png"), "A time-stamped summary with key terms")], caption: "Quizzes, follow-ups and summaries on YouTube" },
        ],
      },
      {
        label: "Impact",
        title: "Impact",
        stats: [
          { value: "50,000", label: "users in 6 months, Featured by Chrome within 2 months" },
          { value: "5x", label: "message initiation, from 17% to 84% of installs" },
          { value: "50%", label: "Week 1 retention, up from 10%" },
          { value: "38%", label: "Week 4 retention, up from 3%" },
          { value: "4.6★", label: "rating from 600 users" },
          { value: "60", label: "NPS; “it always has context of what I'm doing” was the top reason" },
        ],
        quote: { text: "My solve time for a LeetCode problem has literally become half of before.", by: "Lokeswar M, SDE-1 at a product-based company" },
        visuals: [{ kind: "devices", shots: [shot(pp("achievements-phone.png"), "ProPilot AI on the Chrome Web Store: Featured, 4.6 stars, 50,000 users")] }],
      },
      {
        label: "Learnings",
        title: "What I learned",
        body: [
          "I owned more than design for the first time: research, analytics and Mixpanel reports, PRDs, product testing and even prompt engineering. Staying close to users told me what the market would pull for, and it shaped the roadmap with our co-founder and CPO.",
        ],
      },
    ],
  },

  // ─────────────────────────── Builder Design System ───────────────────────────
  {
    slug: "builder-design-system",
    name: "BLOCK",
    card: {
      label: "Builder.ai · Design system",
      headline: "10+ products, each designed separately. One system to make them feel like one.",
      blurb: "Tokens, foundations and Builder's most complex components: cards, navigation and the AI experience.",
    },
    tagline: "One language for ten products.",
    intro: [
      "Builder.ai's products had been designed separately by different designers, and it showed. I worked with the Head of Design and a team of seven designers on BLOCK, a shared design system, and built some of its most complex components.",
    ],
    facts: { industry: "AI, SaaS", company: "Builder.ai", role: "Product Designer", timeline: "Mar – Sep 2024", type: "Design system" },
    deliverables: ["Design tokens", "Component library", "Dark mode", "Documentation"],
    concept: false,
    sections: [
      {
        label: "Context",
        title: "Context",
        body: ["Builder.ai offered 10+ products, each designed independently. Interfaces and interactions didn't match, which weakened the brand, slowed development, raised maintenance costs and made moving between products harder."],
      },
      { label: "Problem", title: "Problem statement", highlight: "How might we create a unified design system that harmonises Builder.ai's diverse product suite?" },
      {
        label: "Foundations",
        title: "Foundations, and why",
        list: [
          "Spacing first: a token scale from 2px to 128px, with corner radii to match, so layouts line up across products.",
          "Typephase Pro, for its clean, geometric letterforms and many weights; it works for headings and dense SaaS body text alike.",
          "The Blank UI icon set: simple icons that stay readable on small screens and keep cognitive load low.",
          "Colour by role, not taste. Every colour has a job (hierarchy, state or meaning), so future changes stay predictable.",
        ],
        visuals: [
          { kind: "board", shot: shot("/work/builder-design-system/img-spacing.webp", "Spacing scale and corner radius tokens") },
          { kind: "board", shot: shot("/work/builder-design-system/img-typography.webp", "Display, heading and body type styles") },
          { kind: "board", shot: shot("/work/builder-design-system/img-colors.webp", "Foundational, semantic and basic colours") },
        ],
      },
      {
        label: "Explorations",
        title: "Explorations & tradeoffs",
        body: [
          "Cards were the hardest part: every product had its own. I sat with the teams, collected every card and the information on it, and found one smart layout built from small atoms could serve them all.",
          "Navigation had the same problem. We built one side nav that scales from a 5-item tool to an enterprise tool with three levels. A personalised nav might do better, but that call needs data, so it stayed out for now.",
        ],
        visuals: [
          { kind: "board", shot: shot("/work/builder-design-system/img-cards.webp", "The base card: layout, atoms and component properties") },
          { kind: "board", shot: shot("/work/builder-design-system/img-side-nav.webp", "Side navigation atoms, component and interactive states") },
        ],
      },
      {
        label: "Solution",
        title: "Components",
        body: ["Buttons come in primary, secondary, tertiary, quaternary and Natasha (Builder's AI assistant), each with every state and an icon version, so engineers aren't left guessing."],
        visuals: [{ kind: "board", shot: shot("/work/builder-design-system/img-buttons.webp", "Button variants in every state, with their Figma properties") }],
      },
      {
        label: "Impact",
        title: "Impact",
        list: [
          "Component variants, tokens and a dark-mode architecture adopted across multiple product teams, cutting design-to-build time.",
          "A release channel and usage documentation that reduced recurring design questions from product teams.",
        ],
      },
      { label: "Learnings", title: "What I learned", body: ["A design system is a living thing. Components are only one part; documentation, a visual language and brand guidelines make it usable, and it's meant to keep evolving."] },
    ],
  },

  // ─────────────────────────────── Wildflower ───────────────────────────────
  {
    slug: "wildflower",
    name: "Wildflower",
    card: {
      label: "Wildflower Health · Freelance · Mobile app",
      headline: "Only 25–30% of users were active. I rebuilt the app around what each of them needs today.",
      blurb: "A modular system for a white-labeled pregnancy and wellness app with growing care plans.",
    },
    tagline: "One app, many journeys.",
    intro: [
      "Wildflower Health's white-labeled pregnancy and wellness app needed a rebuild, on a tight timeline and a lean budget. Monthly active users hovered around 25–30% across clients, well below the company's 50% target.",
    ],
    facts: { industry: "Women's healthcare", company: "Wildflower Health (freelance)", role: "Product Designer", type: "Mobile app redesign" },
    deliverables: ["UX audit", "Workshops", "Visual system", "Mobile UI"],
    concept: false,
    sections: [
      {
        label: "Context",
        title: "Context",
        body: [
          "The app was cluttered and hard to scale. I reviewed internal journey maps, care plan workflows and engagement data, ran a UX audit, and led strategy workshops with the Senior PM, Director of Content and VP of Marketing.",
        ],
        visuals: [{ kind: "devices", shots: [shot("/work/wildflower/hero-carousel.png", "The redesigned Wildflower app: home, tasks, trackers and content")] }],
      },
      {
        label: "Problem",
        title: "Problem statement",
        highlight: "How might we help people manage several care plans (pregnancy, nutrition, mental health) without feeling overwhelmed, while the product keeps growing?",
        body: ["The business wanted more features, care plans and trackers, on a small screen where engagement was already low."],
        visuals: [{ kind: "board", shot: shot("/work/wildflower/starting-point-3.png", "How three types of users interact with the app") }],
      },
      {
        label: "Research",
        title: "Research",
        body: ["The workshops aligned the team on personas, flows and scope: focus on pregnancy users and deprioritise general wellness. Pregnant or not, there were two mental models to design for:"],
        list: [
          "The Task-Oriented Planner values structure and timely updates to keep care plans on track.",
          "The Reassurance Seeker is navigating anxiety, high-risk care or a big transition, and needs clear guidance and frequent reassurance.",
        ],
        sticker: sticker("/work/wildflower/icon-persona-reassurance.svg", 120, 120, "Reassurance seeker icon"),
        visuals: [{ kind: "board", shot: shot("/work/wildflower/personas-board.png", "Persona board from the strategy workshops") }],
      },
      {
        label: "Explorations",
        title: "Explorations & tradeoffs",
        body: [
          "Requirements kept shifting as the team moved beyond pregnancy, so I paced my work to their decisions instead of designing everything upfront.",
          "With a tight budget, I separated long-term needs from in-the-moment ideas. A guide avatar called Poppy was creative, but not tied to the core need (managing several care plans without confusion), so I solved for that first.",
          "Instead of bespoke screens, I built modular “widgets” on their React stack, with accessible patterns and WCAG guidance, documented so engineers could keep building without a designer on staff.",
        ],
        visuals: [{ kind: "board", shot: shot("/work/wildflower/tasks-iterations.png", "The many iterations of the tasks screen") }],
      },
      {
        label: "Solution",
        title: "Solution, and why",
        list: [
          "A reusable visual system that makes health information clear and gives future updates a scalable foundation.",
          "A modular home that reorders itself for routine pregnancy (milestones and to-dos), high-risk pregnancy (key alerts first) and postpartum (recovery, fewer distractions).",
          "Tasks with progressive disclosure: urgent tasks first, the rest hidden until needed, so the list scales as care plans grow.",
          "Trackers you log directly, prioritised by care plan, with a preview of postpartum tools so people know what's coming.",
          "Simpler navigation built around frequency of use, with lower-priority items moved into a clean menu.",
        ],
        visuals: [
          { kind: "board", shot: shot("/work/wildflower/visual-system-board.png", "Wildflower's visual system: text styles, colours and illustrations") },
          { kind: "phones", shots: [shot("/work/wildflower/homepage-phone-3.png", "Home for a routine pregnancy"), shot("/work/wildflower/homepage-phone-2.png", "Home for a high-risk pregnancy"), shot("/work/wildflower/homepage-phone-1.png", "Home for a postpartum user")], caption: "Routine, high-risk and postpartum homes" },
          { kind: "board", shot: shot("/work/wildflower/tasks-before-after.png", "Tasks before and after") },
          { kind: "devices", shots: [shot("/work/wildflower/trackers-composite.png", "The new trackers")] },
          { kind: "devices", shots: [shot("/work/wildflower/nav-before-after.png", "Navigation before and after")] },
        ],
      },
      {
        label: "Impact",
        title: "Impact",
        body: [
          "Clearer workflows, better usability and a scalable foundation for the new tech stack, setting the app up for stronger engagement on the way to the 50% goal. The team is still in development, so ROI figures are estimates.",
        ],
      },
      {
        label: "Learnings",
        title: "What I learned",
        list: ["Start with strategy, not screens.", "Weigh business goals and user needs together.", "Design a system, not static mocks.", "Deliver what's needed, not just what's asked."],
      },
    ],
  },

  // ─────────────────────────── OYO Ratings & Reviews ───────────────────────────
  {
    slug: "ratings-reviews",
    name: "OYO Reviews",
    card: {
      label: "OYO · Mobile app feature",
      headline: "Guests rated the app, not their stay. 77% of properties now cross 20 reviews.",
      blurb: "A reward-led review flow that asks at the right moment and makes writing a review feel easy.",
    },
    tagline: "Make leaving a review worth it.",
    intro: [
      "Guests were reviewing the OYO app on the Play Store and App Store, but almost no one reviewed the properties they stayed at. I designed a post-checkout flow that rewards guests for detailed reviews and photos.",
    ],
    facts: { industry: "Travel, hospitality", company: "OYO", role: "Product Designer", type: "Mobile app feature" },
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
        label: "Context",
        title: "Context",
        body: ["Ratings and reviews carry about 65% of the weight when people decide what to book. Guests clearly wanted to share their experience (they did it on the app stores), yet properties on OYO had almost no reviews."],
        sticker: sticker("/work/ratings-reviews/cs/12-296.webp", 541, 541, "GIF: C'mon son", "/work/ratings-reviews/cs/12-296-anim.webp"),
      },
      {
        label: "Problem",
        title: "Problem statement",
        highlight: "Encourage and reward guests to leave complete reviews, with L1 and L2 ratings and photos.",
        body: ["Goals: more reviews of at least 100 characters, and more properties with at least 20 reviews."],
        visuals: [{ kind: "devices", shots: [shot("/work/ratings-reviews/img-current.webp", "The old checked-out screen, where star rating was the only way to give feedback"), shot("/work/ratings-reviews/img-pain-points.webp", "Guests couldn't tell what a property's rating meant")] }],
      },
      {
        label: "Research",
        title: "Research",
        body: ["We watched UXCam sessions of guests using “Rate your stay”, interviewed guests and benchmarked competitors."],
        list: [
          "Guests only opened My Bookings to download an invoice or book again.",
          "They could leave stars, but there was nowhere to write a review.",
          "Ratings on the listing page were hard to understand, and very few guests used the star rating at all.",
        ],
        visuals: [{ kind: "board", shot: shot("/work/ratings-reviews/img-benchmark.webp", "Review management benchmarking against Booking.com, Airbnb, Uber, Amazon and MakeMyTrip") }],
      },
      {
        label: "Explorations",
        title: "Explorations & tradeoffs",
        body: [
          "With the product manager I mapped where to ask and how to collect reviews, then validated the flow with stakeholders. I explored layouts with a Crazy 8s exercise before settling on one.",
          "The main tradeoff was effort. A detailed review is more useful but more work for the guest, so the flow breaks it into small, rewarded steps.",
        ],
        sticker: sticker("/work/ratings-reviews/cs/12-438.webp", 325, 268, "Sketching ideas"),
        visuals: [
          { kind: "board", shot: shot("/work/ratings-reviews/img-sketches.webp", "Crazy 8s sketches") },
          { kind: "board", shot: shot("/work/ratings-reviews/img-user-flow.webp", "The final user flow for collecting reviews") },
        ],
      },
      {
        label: "Solution",
        title: "Solution, and why",
        list: [
          "Ask right after checkout, in a bottom sheet with just the stars first, while the stay is fresh (peak-end rule, anchoring).",
          "Show the reward upfront, with a progress bar towards it, so guests keep going (goal gradient).",
          "Rate room, cleanliness and location one at a time, so each step is one small task.",
          "Offer contextual quick suggestions instead of an empty text box, so writing feels easy.",
          "Ask for photos and trip type, both rewarded, because they help the next guest decide.",
          "End on a clear reward screen showing which wallet the cashback goes to, plus a nudge to rate the app.",
        ],
        visuals: [
          { kind: "phones", shots: [shot("/work/ratings-reviews/frame-1.webp", "Rate room, cleanliness and location"), shot("/work/ratings-reviews/img-write.webp", "Write a review with quick suggestions"), shot("/work/ratings-reviews/img-photos.webp", "Add photos and trip type")], caption: "One small, rewarded task at a time" },
          { kind: "devices", shots: [shot("/work/ratings-reviews/img-entry.webp", "The ask, right after checkout, with the reward up front")] },
          { kind: "phones", shots: [shot("/work/ratings-reviews/img-reward.webp", "Reward screen: cashback, rate the app, invite and earn")], caption: "The reward, and a nudge to rate the app" },
        ],
      },
      {
        label: "Impact",
        title: "Impact",
        stats: [
          { value: "$424K", label: "revenue OYO generated from Review SaaS" },
          { value: "77%", label: "of properties crossed the 20-review threshold" },
          { value: "76%", label: "relative lift in review coverage, new flow vs old" },
          { value: "18%", label: "of properties opted in to the Review SaaS programme" },
        ],
      },
      {
        label: "Learnings",
        title: "What I learned",
        list: ["If something adds value to their life, users will go the extra mile for it.", "It can be a win for everyone: guests, hotels and the platform.", "Fewer meetings, more focus. And how to read Google Analytics."],
      },
    ],
  },

  // ─────────────────────────────── Therabody ───────────────────────────────
  {
    slug: "therabody",
    name: "Therabody",
    card: {
      label: "Therabody · Freelance · E-commerce",
      headline: "Shoppers couldn't see why Theragun cost more. Three quick tests lifted conversion up to 22%.",
      blurb: "Lightweight A/B tests on Therabody's product pages, built with the CMS, not engineers.",
    },
    tagline: "Small tests, big lifts.",
    intro: [
      "I optimised Therabody's product detail pages (PDPs) through targeted A/B tests, increasing conversion by up to 22% and revenue per visitor by over 30%, while keeping engineering work to a minimum.",
    ],
    facts: { industry: "Wellness e-commerce", company: "Therabody (freelance)", role: "Product Designer", timeline: "~1–2 months", type: "Conversion optimisation" },
    deliverables: ["Insights", "Test design", "PDP UI", "Components"],
    concept: false,
    sections: [
      {
        label: "Context",
        title: "Context",
        body: ["Therabody wanted better e-commerce performance by making its PDPs clearer and easier to buy from. The site reached about 400k people globally. I worked with a product owner, an outsourced engineering team and a QA engineer."],
        visuals: [{ kind: "devices", shots: [shot("/work/therabody/frame-1.webp", "Therabody's product pages on a laptop and a phone")] }],
      },
      {
        label: "Problem",
        title: "Problem statement",
        highlight: "How might we create a PDP that drives engagement and conversion by enabling confident purchases, while minimising engineering reliance?",
        body: ["Key information like attachments and use cases was buried deep in the page. Customers struggled to understand Theragun's value next to cheaper alternatives, which hurt confidence and revenue."],
      },
      {
        label: "Research",
        title: "Research",
        body: ["I sorted qualitative and quantitative insights in Airtable to find and rank the top pain points."],
        list: [
          "Post-purchase surveys: customers wanted clearer explanations of Theragun's benefits and use cases.",
          "The PDP was cluttered, and critical details like attachments sat at the bottom, causing scroll fatigue.",
          "Heat and click maps showed the attachments section confused people, yet got little engagement where it lived.",
          "The main persona, the Everyday Pain Sufferer, wants simple explanations without technical jargon.",
        ],
        sticker: { src: "/work/therabody/icon-persona.svg", w: 120, h: 120, alt: "Persona icon" },
        visuals: [{ kind: "board", shot: shot("/work/therabody/heatmap.png", "Heat and click maps of the original PDP") }],
      },
      {
        label: "Explorations",
        title: "Explorations & tradeoffs",
        body: [
          "I used RICE scoring to pick the highest-impact tests. Everything had to be built with the CMS, so I traded custom UI for speed: reorganising information, simplifying content and adding comparison tools with pre-built components.",
          "Hypothesis: a mobile-first PDP that shows benefits through engaging content and a streamlined structure will lift engagement, conversion and satisfaction.",
        ],
        sticker: { src: "/work/therabody/icon-goal-2.svg", w: 120, h: 120, alt: "Goal icon" },
      },
      {
        label: "Solution",
        title: "Three tests, and why",
        list: [
          "Test 1: move attachments next to add-to-cart, so the purchase decision stays in focus. +15% PDP conversion, +12% revenue per visitor.",
          "Test 2: replace a busy animation in the app block with static screens and a clear headline. +22% conversion, +31% revenue per visitor.",
          "Test 3: a modal comparing Theragun Elite and PRO, so people can decide on the page. +12% conversion, +13% revenue per visitor.",
        ],
        visuals: [
          { kind: "devices", shots: [shot("/work/therabody/test1.png", "Test 1: attachments moved just below the fold")], caption: "Test 1: attachments, closer to the cart" },
          { kind: "board", shot: shot("/work/therabody/test2.png", "Test 2: the app block, before and after"), caption: "Test 2: a calmer app block" },
          { kind: "browser", shots: [shot("/work/therabody/test3.png", "Test 3: the Elite vs PRO comparison")], caption: "Test 3: compare models on the page" },
        ],
      },
      {
        label: "Impact",
        title: "Impact",
        body: ["Moving attachments higher worked, but the old component made it hard to see them all. I designed a new carousel, implemented after I left, and took these learnings into the cart and checkout redesign, simplifying buy-online-pick-up-in-store."],
        stats: [
          { value: "+22%", label: "PDP conversion rate (best test)" },
          { value: "+31%", label: "revenue per visitor" },
        ],
        visuals: [{ kind: "devices", shots: [shot("/work/therabody/followup.png", "The follow-up attachments carousel on desktop and mobile")] }],
      },
      {
        label: "Learnings",
        title: "What I learned",
        list: ["Scrappy solutions work: CMS tools let me iterate fast without heavy engineering.", "Working within constraints breeds creative solutions.", "Simplifying content around user needs drives real lifts."],
      },
    ],
  },

  // ─────────────────────────────── Builder University ───────────────────────────────
  {
    slug: "builder-university",
    name: "Builder University",
    card: {
      label: "Builder.ai · Web platform, 0→1",
      headline: "Hundreds of experts joining every day, and no one to teach them. Onboarding is now fully automated.",
      blurb: "A learning platform with role-based plans and game-like progress to bring new experts up to speed.",
    },
    tagline: "Onboarding that teaches itself.",
    intro: [
      "Builder.ai brings in employees and third-party experts to build apps for its clients, and they all need to learn Builder's products and processes fast. Builder University is the internal learning platform I designed from scratch to do that.",
    ],
    facts: { industry: "AI, internal tools", company: "Builder.ai", role: "Product Designer", timeline: "Mar – Sep 2024", type: "Web platform, 0 → 1" },
    deliverables: ["Pilot", "Product design", "Gamification", "QA"],
    concept: false,
    sections: [
      {
        label: "Context",
        title: "Context",
        body: ["Projects had tight turnarounds, and onboarding new experts took time and money. Someone had to teach the basics, which doesn't scale when hundreds of experts join a day. I worked with a product manager, the Head of Product and 15+ engineers."],
      },
      {
        label: "Problem",
        title: "Problem statement",
        highlight: "How might we bring experts from every field and country up to speed on Builder's systems as quickly as possible, while keeping them engaged?",
        list: ["Experts were overwhelmed by Builder's many products and didn't know which to focus on.", "New hires expected proper onboarding.", "Experienced people had nowhere to learn about processes."],
      },
      {
        label: "Explorations",
        title: "Explorations & tradeoffs",
        body: ["The need was urgent, and e-learning is a solved problem, so we didn't reinvent the wheel. We launched a pilot on a WordPress e-learning template first, then designed the full product from what we learned."],
        list: ["Authors started writing content while the real product was being built.", "We had a test pool to see how people actually used the platform.", "The company got something working right away: from 0 to 1, then build on top."],
        visuals: [{ kind: "browser", shots: [shot("/work/builder-university/img-pilot.webp", "The WordPress pilot: Builder 360 for Delivery")], caption: "The quick pilot on WordPress" }],
      },
      {
        label: "Solution",
        title: "Solution, and why",
        list: [
          "Learning plans. New learners don't know what to learn, but we do, so every role gets an ordered set of courses that unlock one after another.",
          "Gamification. Tiers from bronze up, badges, progress after every course, learning time and scores up front, and shareable achievements, so learners don't skip or abandon courses.",
          "A learning hub. Anyone can browse and enrol in any course, because employees also used it to learn about the product.",
        ],
        visuals: [
          { kind: "browser", shots: [shot("/work/builder-university/frame-1.webp", "Learning plan with ordered courses")], caption: "Learning plans" },
          { kind: "board", shot: shot("/work/builder-university/img-badges.webp", "Tiers, badges and course progress"), caption: "Gamification" },
          { kind: "board", shot: shot("/work/builder-university/img-dashboard.webp", "Dashboard with learning time, score and plan tracker") },
          { kind: "browser", shots: [shot("/work/builder-university/frame-2.webp", "The learning hub: explore all courses")], caption: "The learning hub" },
        ],
      },
      {
        label: "Impact",
        title: "Impact",
        stats: [{ value: "100%", label: "automated onboarding for external experts and internal employees" }],
        body: ["It was later connected to Builder Hive, where experts gather, for easier access and quicker onboarding. The platform is in beta and still growing."],
      },
      {
        label: "Learnings",
        title: "What I learned",
        list: ["Building from scratch meant understanding how backend data flows through the product.", "Getting the build to match the design took several rounds of my own QA and walkthroughs with developers.", "Studying how LinkedIn and Duolingo gamify learning, and scaling it down to our resources."],
      },
    ],
  },

  // ─────────────────────────────── Basecamp ───────────────────────────────
  {
    slug: "basecamp",
    name: "Basecamp",
    card: {
      label: "Personal project · Landing page",
      headline: "Basecamp's best features were buried. I redesigned the landing page to show them first.",
      blurb: "A concept redesign with one clear promise up top and the product shown, not described.",
    },
    tagline: "Show the product, not a wall of words.",
    intro: ["Basecamp is a project management tool where each project lives on a single page. Its landing page buried the most useful features, so I redesigned it as a personal B2B SaaS project."],
    facts: { industry: "SaaS", company: "Personal project", role: "Product Designer", timeline: "Sep – Oct 2024", type: "Concept redesign" },
    deliverables: ["Audit", "Information architecture", "Visual design"],
    concept: true,
    sections: [
      {
        label: "Problem",
        title: "Problem statement",
        list: ["Too much information in the hero, leading to decision fatigue.", "Valuable features buried behind scrolling and clicks.", "No hierarchy, so key features didn't stand out.", "A layout without a natural flow, where CTAs were easy to miss."],
        visuals: [{ kind: "board", shot: shot("/work/basecamp/img-why.webp", "Why redesign: four problems with the current page") }],
      },
      {
        label: "Explorations",
        title: "Explorations",
        body: ["I chose a new colour palette and gradients, then rebuilt the page's information architecture before designing the final layout."],
        visuals: [
          { kind: "board", shot: shot("/work/basecamp/img-palette.webp", "The chosen colour palette and gradients") },
          { kind: "board", shot: shot("/work/basecamp/img-ia.webp", "Information architecture of the landing page") },
        ],
      },
      {
        label: "Solution",
        title: "Solution, and why",
        list: [
          "A hero with one promise and two actions: watch a demo or start a free trial.",
          "Built-in tools shown as cards instead of hidden in menus.",
          "A section that shows the product in use (message board, docs, to-dos, card table, chat and check-ins) instead of describing it.",
          "Integrations and advanced features further down, for people ready to go deeper.",
        ],
        visuals: [
          { kind: "laptop", shot: shot("/work/basecamp/img-final-hero.webp", "The new hero") },
          { kind: "browser", shots: [shot("/work/basecamp/img-integrations.webp", "Integrations and essential features"), shot("/work/basecamp/img-features.webp", "The product shown in use")] },
        ],
      },
      { label: "Note", title: "A note", body: ["This is a self-initiated concept, not a shipped product. The designs show how I'd approach the problem."] },
    ],
  },

  // ─────────────────────────────── Internshala ───────────────────────────────
  {
    slug: "internshala",
    name: "Internshala",
    card: {
      label: "Personal project · Mobile app",
      headline: "Applicants never heard back. I redesigned search, applying and tracking so they always know where they stand.",
      blurb: "Preferences, drafts, saved responses and clear status tags for a popular internship app.",
    },
    tagline: "No more applying into the void.",
    intro: ["When I was hunting for a UX internship, Internshala's app left me tired and unsure where my applications stood. Years later I came back to fix it. This is a personal project, not done with Internshala."],
    facts: { industry: "Careers, EdTech", company: "Personal project", role: "Product Designer", type: "Concept redesign" },
    deliverables: ["Research", "UX flows", "Mobile UI", "Design system"],
    concept: true,
    sections: [
      {
        label: "Context",
        title: "Context",
        body: ["Students and freshers struggle to find suitable roles, fight with filters, and lose track of their applications. Play Store reviews said the same thing over and over."],
        sticker: sticker("/work/internshala/cs/in-adventure.webp", 414, 259, "GIF: I'm going on an adventure!", "/work/internshala/cs/in-adventure-anim.webp"),
        visuals: [{ kind: "deck", id: "in-context" }],
      },
      {
        label: "Problem",
        title: "Problem statement",
        highlight: "A hassle-ridden search, application and tracking experience makes students doubt the opportunities, assume they've been rejected, or leave the platform.",
      },
      {
        label: "Research",
        title: "Research",
        body: ["Secondary research, conversations with friends who use Internshala, and an audit of the current app."],
        list: [
          "Only 4–5 of an average 250 applications lead to an interview.",
          "48% of applicants find long waits for a response severely frustrating; 25% never get an acknowledgement.",
          "Clicks from Apply to Submit shape the whole experience.",
          "In the app: duplicate navigation, no hierarchy on home, long forms and no visible status.",
        ],
        sticker: sticker("/work/internshala/cs/in-problem.webp", 418, 274, "GIF: I can see the whole picture", "/work/internshala/cs/in-problem-anim.webp"),
      },
      {
        label: "Explorations",
        title: "Opportunities & tradeoffs",
        body: ["I turned the pain points into How Might We questions, then into jobs to be done. Two tradeoffs shaped the solution:"],
        list: [
          "Personal vs consistent: a resume can be edited for one application without changing the profile resume, so tailoring never breaks the profile.",
          "Speed vs care: saved responses cut repetitive typing but stay editable, so answers can still be personal.",
        ],
        visuals: [{ kind: "deck", id: "in-hmw" }],
      },
      {
        label: "Solution",
        title: "Solution, and why",
        list: [
          "Onboarding asks for preferences, so recommendations are relevant from day one.",
          "Filters became “preferences”, with a dedicated search page that shows them all at once.",
          "Applications reveal one step at a time with a status bar, and can be saved as drafts.",
          "Status tags (pending, viewed, shortlisted, assignment, interviewing, rejected) so applicants are never left guessing.",
          "Chats and notifications keep recruiters one tap away.",
        ],
        sticker: sticker("/work/internshala/cs/in-excited.webp", 273, 243, "GIF: Hell yes!!", "/work/internshala/cs/in-excited-anim.webp"),
        visuals: [
          { kind: "devices", shots: [shot("/work/internshala/cs/in-onboarding-2.webp", "New user home with recommendations"), shot("/work/internshala/cs/in-tracking.webp", "Applications with status tags"), shot("/work/internshala/cs/in-drafts-2.webp", "Application drafts"), shot("/work/internshala/cs/in-chats.webp", "Your chats")], caption: "Home, tracking, drafts and chats" },
          { kind: "devices", shots: [shot("/work/internshala/cs/in-search.webp", "Home, search and preference filters")], caption: "Search and preferences" },
          { kind: "devices", shots: [shot("/work/internshala/cs/in-saved.webp", "Application form with saved responses")], caption: "Saved responses" },
          { kind: "deck", id: "in-tags" },
        ],
      },
      {
        label: "Design system",
        title: "Design system",
        body: ["Built from scratch on Internshala's own colours, with Instrument Sans for better legibility and a cleaner look."],
        visuals: [{ kind: "deck", id: "in-ds" }],
      },
      {
        label: "Impact",
        title: "Expected impact",
        body: ["As a concept there are no shipped numbers. Personalised recommendations should lift adoption, profile investment should lift retention, and clear tracking should keep applicants engaged and trusting the platform."],
      },
    ],
  },

  // ─────────────────────────────── Swiping Loop ───────────────────────────────
  {
    slug: "swiping-loop",
    name: "The Swiping Loop",
    card: {
      label: "Self-initiated · UX research",
      headline: "Swiping keeps dating-app users busy, not connected. 32 surveys and 7 interviews showed why.",
      blurb: "A four-week study of the loop that tires people out, and three ways to break it.",
    },
    tagline: "Endless swiping, no conversations.",
    intro: ["Millions of young Indians use dating apps, yet many feel worse for it. Over four weeks I studied why swiping makes it hard to find meaningful conversations, and what designers could try instead."],
    facts: { industry: "Dating, social", company: "Self-initiated", role: "Solo UX researcher", timeline: "4 weeks", type: "UX research" },
    deliverables: ["Survey", "Interviews", "Affinity map", "Recommendations"],
    concept: true,
    sections: [
      {
        label: "Context",
        title: "Context",
        stats: [
          { value: "82.4M", label: "people use dating apps regularly in India (SmallCase)" },
          { value: "65%", label: "are not satisfied and don't want to rely on them (Times of India)" },
        ],
        body: ["Swipe-based apps have been linked to poorer mental health: long waits and compulsive swiping feed anxiety and depression."],
        sticker: { src: "/work/swiping-loop/cs/sw-swipe.webp", w: 500, h: 502, alt: "A hand swiping through profiles on a phone" },
      },
      { label: "Problem", title: "Problem statement", highlight: "The swiping system makes it harder to explore potential partners and start meaningful conversations. How might we put direct communication first?" },
      {
        label: "Research",
        title: "Research",
        body: ["A screening survey of 32 people aged 18–25, then 7 interviews (3 men, 4 women) over Google Meet."],
        list: ["30 of 32 used Tinder, 26 Bumble, 14 Hinge. 28 hadn't found a partner on them.", "All 32 said they use Instagram to find partners, mostly for its direct messages.", "People want direct communication and more control, not an algorithm deciding for them."],
        quote: { text: "There's no room for exploration or taking things slow on dating apps because you're constantly pressured to make a snap judgment on someone based on a single photo and a short bio.", by: "Vivek, 22" },
        visuals: [{ kind: "deck", id: "sw-affinity" }],
      },
      {
        label: "Insight",
        title: "The Swiping Loop",
        body: ["A recurring pattern: users enter hopeful, swipe until fatigue sets in, glimpse someone promising, then can't start a conversation without a match. Fatigue and the blocked conversation are where people disengage."],
        visuals: [{ kind: "deck", id: "sw-loop" }, { kind: "deck", id: "sw-stages" }],
      },
      {
        label: "Recommendations",
        title: "Recommendations, and why",
        list: ["Offer swipe-less browsing (scrolling or a grid) alongside swiping, to encourage deeper looks at profiles.", "Let users send a message request before matching, so interest can turn into a conversation.", "Give users a real search with filters, so they control who they look for."],
        visuals: [{ kind: "deck", id: "sw-personas" }],
      },
      { label: "Conclusion", title: "Conclusion", body: ["Small design changes that respect how people actually date could make these apps feel less like a slot machine and more like meeting someone."] },
    ],
  },

  // ─────────────────────────────── Studio Store ───────────────────────────────
  {
    slug: "studio-store",
    name: "Studio Store",
    card: {
      label: "Design task · Web dashboard",
      headline: "New store owners landed in an empty admin panel. Onboarding now gets them to a working dashboard.",
      blurb: "A short setup and tour for micro-business owners launching their first online store.",
    },
    tagline: "From sign-up to a store that's ready.",
    intro: ["Studio Store apps are digital starter kits that help micro businesses get online quickly. The brief: design the admin dashboard's onboarding in no more than three screens, from welcome to quick start to dashboard."],
    facts: { industry: "E-commerce", company: "Studio Store", role: "Product Designer", type: "Design task" },
    deliverables: ["Hypothesis", "Onboarding flow", "Dashboard UI"],
    concept: true,
    sections: [
      {
        label: "Problem",
        title: "Problem statement",
        highlight: "Entry-level business owners struggle to manage operations: tracking inventory, spotting low or expiring stock, and finding a simple way to run things.",
        body: ["Users: startup entrepreneurs, solopreneurs, home-based business owners and service providers. Platform: a web app."],
      },
      {
        label: "Research",
        title: "Research & analysis",
        list: ["Owners manage inventory by hand, ordering about once a month.", "They have no real-time view of stock, so low or expired items go unnoticed.", "They can't easily see best sellers, slow movers or buying patterns."],
      },
      {
        label: "Explorations",
        title: "Tradeoffs",
        body: ["The brief allowed three screens, but setup needs a few inputs. I kept the three stages (welcome, quick start, dashboard) and let the quick start ask for one small thing at a time.", "Testing was skipped because of time; it's the first thing I'd add."],
      },
      {
        label: "Solution",
        title: "Solution",
        body: ["Click through the flow: welcome, basic info, a celebration when setup is complete, optional details, a short tour, then the dashboard with inventory, sales and profit at a glance."],
        visuals: [{ kind: "deck", id: "ss-flow" }],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
