import { imageDims } from "./image-dims";

/*
 * Every project on the site lives here.
 *
 * Sourcing rules (keep these when editing):
 * - Facts come only from Muskan's Figma decks or things she has confirmed.
 * - No invented research, users, numbers or outcomes. A number stays only if it
 *   comes from her own research with the sample size stated, or from a source
 *   that is cited next to it. Everything else is parked in a TODO(verify) note.
 * - Say plainly what she did versus what the team did.
 */

export type Img = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export type Block =
  | { kind: "text"; heading: string; body: string[]; list?: string[] }
  | { kind: "images"; images: Img[] }
  | { kind: "quote"; text: string; by: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  /** Grid tag: real shipped/team work vs. self-initiated or concept work. */
  tag: "Case study" | "Concept";
  meta: { company: string; role: string; timeline?: string; type: string };
  cover: Img;
  /** Show the whole cover on the work grid instead of filling the square. */
  coverFit?: "contain";
  links?: { label: string; href: string }[];
  /** Background colour behind the cover on the work grid. */
  tint: string;
  intro: string;
  blocks: Block[];
};

function img(src: string, alt: string, caption?: string): Img {
  const dims = imageDims[src];
  if (!dims) throw new Error(`Missing image dimensions for ${src}`);
  return { src, width: dims[0], height: dims[1], alt, caption };
}

const pp = (f: string) => `/work/ai-mentor/exact/${f}`;
const w = (slug: string, name: string) => `/work/${slug}/img-${name}.webp`;

export const projects: Project[] = [
  // ───────────────────────────────── ProPilot ─────────────────────────────────
  {
    slug: "ai-mentor",
    name: "ProPilot AI Mentor",
    tagline: "An AI mentor that sits on top of LeetCode, GFG and YouTube.",
    tag: "Case study",
    meta: {
      company: "Preplaced",
      role: "Product Designer",
      timeline: "Oct – Dec 2023",
      type: "Chrome extension, 0 → 1",
    },
    cover: img(pp("hero3.png"), "ProPilot's Easy Actions panel open next to a LeetCode problem"),
    coverFit: "contain",
    tint: "#f3e7c9",
    intro:
      "Developers learning on their own get stuck on coding problems and long videos, and the help they find is generic. At Preplaced I designed ProPilot's AI mentor as a browser extension that meets them on the platforms they already use, and nudges them to think instead of handing over the answer.",
    /*
     * TODO(verify): metrics from the previous version of this page, kept out
     * until Muskan confirms each one (and its source):
     * - "first 50,000 learners" / "50,000 users in 6 months"
     * - message initiation 17% → 84% of installs ("5x"); 2 → 20 messages per user ("10x")
     * - Week 1 retention 10% → 50%; Week 2 ~3%; Week 4 retention 3% → 38%; "40% kept coming back after 4 weeks"
     * - NPS 60; 92% of interviewees said "it always knows what page I'm on"
     * - 87% mention more confidence; 23% more interactions; 51K quizzes; 10.5K follow-ups clicked
     * - 15.5K summaries/key terms; 50% find revising easier; 30% filter long videos; 25% download rate
     * - ">75% of users interviewed", ">92% of aspiring SDEs use LeetCode/GFG", ">95% learn on YouTube", ">90% highlight parts of the screen"
     * - "Featured" by Chrome in 2 months; rated 4.6 by 600 users
     * - "30+ hours" of mentorship recordings analysed; "20+" phone interviews; MVP "tested by 100 people"; design #2 "tested for 2 months"
     * - The old page said the work happened "in 2024" and "early 2025"; that conflicts with Oct – Dec 2023, so dates were removed from the story.
     */
    blocks: [
      {
        kind: "text",
        heading: "The problem",
        body: [
          "When developers get stuck on a LeetCode problem or lose the thread of a long YouTube lecture, they fall back on the Solutions tab, another video, or pasting everything into a chatbot. None of it sees their own code, and a chatbot usually gives the full answer, so they move on without learning much.",
        ],
      },
      {
        kind: "text",
        heading: "Context",
        body: [
          "ProPilot was Preplaced's AI mentor. Some of its roadmap lessons pointed learners to a YouTube video or a LeetCode/GFG problem. Instead of competing with that content, the team asked a different question: what if the mentor came along to the platforms learners already use?",
          "An early beta of the extension opened right on top of the resource, so learners could ask about the problem in front of them or something the creator had just said. A short test of that MVP showed two clear problems. Learners didn't want to type to start a conversation, and they expected the mentor to keep up when they switched tabs.",
        ],
      },
      {
        kind: "images",
        images: [
          img(pp("mvp-screenshot.png"), "The first version of the extension floating over a LeetCode problem"),
          img(pp("problem2.png"), "The MVP chat panel on top of a YouTube video"),
        ],
      },
      {
        kind: "text",
        heading: "My role",
        body: [
          "I was the product designer on the extension. I led the research, designed the interactions and screens, and went through three design iterations with the developers. Along the way I also set up analytics reports, wrote PRDs, tested builds and helped shape the mentor's prompts and tone.",
        ],
      },
      {
        kind: "text",
        heading: "Research",
        body: [
          "With mentors' consent, I studied recordings of Preplaced's 1:1 mentorship sessions to see how good mentors actually help. I also ran phone interviews with learners at different stages (college students, SDEs, SDETs, QA engineers), ran WhatsApp study groups, and read through the questions developers post on Reddit.",
          "Three findings shaped the design. Learners' questions, however technical, fell into a small set of patterns. Solo learners blamed themselves for losing focus and not feeling confident, which mentors usually handle with check-ins and quizzes. And in screen-shared sessions, people kept highlighting the same areas of the screen, which showed me where help should appear.",
        ],
      },
      {
        kind: "images",
        images: [
          img(pp("finding-notebook.png"), "My notes grouping learners' questions into a few standard types"),
          img(pp("finding-heatmap1.png"), "A heatmap I sketched of where developers focus on a LeetCode screen"),
          img(pp("finding-heatmap2.png"), "A heatmap of where attention goes on a YouTube player"),
        ],
      },
      {
        kind: "text",
        heading: "Key decisions",
        body: [
          "I scored each problem we heard by effort and impact. A personalised YouTube roadmap was valuable but too expensive for the team at the time, so we parked it. Instead we focused on helping learners feel confident and revise faster.",
        ],
        list: [
          "Easy Actions on LeetCode. One-click prompts sit right next to the learner's code and errors, so starting a conversation needs no typing, and the help feels personal from the first click.",
          "A split side tab instead of a floating chat. The developers proposed a side panel to solve the tab-switching problem. I redesigned the extension around it, which also kept the learner's working area clear.",
          "Follow-ups and quizzes on the edges of the video player. These are the parts of the screen without main content, so prompts and quizzes keep people engaged without covering the lecture.",
          "Time-stamped summaries and key terms. They sit where the recommendations usually are, so learners can revise without scrubbing through hours of video.",
        ],
      },
      {
        kind: "images",
        images: [
          img(pp("sol1.png"), "Easy Actions next to the code editor on LeetCode"),
          img(pp("sol2-before-small.png"), "Before: the chat floated on top of the page", "Before"),
          img(pp("sol2-after-small.png"), "After: the mentor opens as a split side tab", "After"),
          img(pp("sol3-quiz.png"), "A quiz appearing on top of a YouTube lecture"),
          img(pp("sol4-summary.png"), "A time-stamped summary with key terms next to a YouTube video"),
        ],
      },
      {
        kind: "text",
        heading: "Iterations",
        body: [
          "The first design, a floating tab, was quick to build and made the mentor feel present. But it covered the page, mentor and learner messages were hard to tell apart, and the window controls confused people. The second design, a split tab, fixed those problems, but it couldn't hold features beyond chat. The third adds a side navigation, so new features get their own pages and secondary actions don't crowd the input.",
        ],
      },
      {
        kind: "images",
        images: [
          img(pp("design1.png"), "Design 1: the floating tab"),
          img(pp("design2.png"), "Design 2: the split tab"),
          img(pp("design3.png"), "Design 3: the split tab with side navigation"),
        ],
      },
      {
        kind: "quote",
        text: "I use Propilot AI because it follows step by step approach in response and the options on the LeetCode screen itself make it very easy for me to get help where I'm stuck only.",
        by: "A 4th-year computer science student, from a user interview",
      },
      {
        kind: "text",
        heading: "What I learned",
        body: [
          "This was the first time I owned a product end to end, from research and design to analytics, specs and testing. The biggest lesson was that an AI mentor works better when it asks the right question at the right moment than when it gives the answer.",
        ],
      },
    ],
  },

  // ─────────────────────────────── Builder DS ────────────────────────────────
  {
    slug: "builder-design-system",
    name: "Builder Design System",
    tagline: "One design system for Builder.ai's suite of products.",
    tag: "Case study",
    meta: {
      company: "Builder.ai",
      role: "Product Designer",
      timeline: "Mar – Sep 2024",
      type: "Design system (BLOCK 4.0)",
    },
    cover: img(w("builder-design-system", "cover"), "Typography, colour and button tokens from the Builder design system"),
    tint: "#1b1730",
    intro:
      "Builder.ai's products had been designed separately by different teams, and it showed. I worked with the Head of Design and the design team on BLOCK 4.0, a shared design system, and built some of its most complex components.",
    blocks: [
      {
        kind: "text",
        heading: "The problem",
        body: [
          "Because each product was designed on its own, visual styles, components and interactions didn't match. That made the products harder to learn, slowed design and development, and weakened the Builder.ai brand.",
          "The question we worked from was: how might we create one design system that brings Builder.ai's whole product suite together?",
        ],
      },
      {
        kind: "text",
        heading: "My role",
        body: [
          "The system was a team effort led by our Head of Design, with a team of seven designers. I helped build the foundations and was responsible for some of the most complex components: cards, the AI experience and navigation.",
        ],
      },
      {
        kind: "text",
        heading: "Foundations first",
        body: [
          "Before any component, we set up spacing, corner radius, colour, icons and type as Figma variables, so every component would build on the same base.",
          "We chose Typephase Pro because its geometric letterforms read well both in headings and in body text. For icons we chose the Blank UI library for its simple, clear shapes. Colour is assigned by role (hierarchy, interactive states, feedback), not by preference, so it stays consistent across products.",
        ],
      },
      {
        kind: "images",
        images: [
          img(w("builder-design-system", "spacing"), "Spacing and corner-radius variables"),
          img(w("builder-design-system", "typography"), "Typography scale and text styles"),
          img(w("builder-design-system", "colors"), "Foundational, semantic and gradient colour tokens"),
          img(w("builder-design-system", "icons"), "Part of the icon library"),
        ],
      },
      {
        kind: "text",
        heading: "Key decisions",
        body: [],
        list: [
          "Buttons come in six types: primary, secondary, tertiary, quaternary, and one for Natasha, Builder's AI assistant. Each has every state and an icon option, so engineers aren't left guessing.",
          "Cards were the hardest part, because one card had to work across every product. The team and I gathered every card from every product, listed what they showed, and built one base card whose parts can be switched on or off.",
          "Side navigation followed the same approach. We collected the navigation from each product and designed one side nav that works for a simple five-item tool as well as an enterprise tool with three levels of hierarchy.",
        ],
      },
      {
        kind: "images",
        images: [
          img(w("builder-design-system", "buttons"), "Button types and states, with the component properties panel"),
          img(w("builder-design-system", "cards"), "The configurable base card and examples built from it"),
          img(w("builder-design-system", "side-nav"), "Side navigation at different levels of complexity"),
        ],
      },
      {
        kind: "text",
        heading: "Where it landed",
        body: [
          "BLOCK 4.0 was still a work in progress when I wrote this up, and design systems should keep evolving. The plan covered documentation, a visual language, a pattern library and brand guidelines.",
        ],
        // TODO(embee): add what you learned from this project, or what you'd do next.
      },
    ],
  },

  // ───────────────────────────── Builder University ───────────────────────────
  {
    slug: "builder-university",
    name: "Builder University",
    tagline: "A learning platform to onboard new hires and third-party experts.",
    tag: "Case study",
    meta: {
      company: "Builder.ai",
      role: "Product Designer",
      // TODO(embee): confirm the timeline for this project.
      type: "Web platform, 0 → 1 (beta)",
    },
    cover: img(w("builder-university", "cover"), "Builder University's learner dashboard"),
    tint: "#2b2140",
    intro:
      "Builder.ai brings in a steady stream of new employees and third-party experts to deliver client projects. I designed Builder University, an internal learning platform that gets them up to speed without someone teaching every person by hand.",
    blocks: [
      {
        kind: "text",
        heading: "The problem",
        body: [
          "Client projects move fast, but every new expert first has to learn Builder.ai and how it works. Teaching that one person at a time takes time and costs money, and it doesn't scale when lots of people join at once.",
        ],
        list: [
          "Experts were overwhelmed by Builder.ai's many products and didn't know which ones to focus on.",
          "New hires expected proper onboarding with everything they needed for their role.",
          "Even experienced people had nowhere to go to learn about internal processes.",
        ],
      },
      {
        kind: "text",
        heading: "My role",
        body: [
          "This was my first time designing a product from scratch. I was the product designer, working with a product manager, the Head of Product and the engineering team. I designed the platform end to end and ran several rounds of QA testing myself, then walked the developers through the details so less got lost in translation.",
        ],
      },
      {
        kind: "text",
        heading: "Start with a pilot",
        body: [
          "The company needed something right away, so we launched a quick MVP on WordPress first. That let course authors start writing content early, gave us a group of people to watch using it, and met the immediate need while the full product was built.",
        ],
      },
      {
        kind: "images",
        images: [
          img(w("builder-university", "pilot"), "The WordPress pilot used while the full product was being built"),
          img(w("builder-university", "flow"), "From the learning dashboard to curriculum, lessons and quizzes"),
        ],
      },
      {
        kind: "text",
        heading: "Key decisions",
        body: [
          "The pilot showed that learners were new to both Builder.ai and the platform. They didn't know what to learn, and we needed them to stay engaged instead of dropping off.",
        ],
        list: [
          "Learning plans. Each person gets a curriculum based on their role or department, and courses unlock in order. That gives them a clear direction.",
          "Gamification. Badges move from bronze upwards, and learners see their learning time, average score and plan progress. I looked at how LinkedIn and Duolingo use gamification and scaled it down to what we could build.",
          "A learning hub. Every course can be browsed and previewed before enrolling. That also served a second purpose: teams across the company could use it to learn more about the product.",
        ],
      },
      {
        kind: "images",
        images: [
          img(w("builder-university", "learning-plan"), "A role-based learning plan with courses unlocking in order"),
          img(w("builder-university", "badges"), "Badge levels and the progress shown after finishing a course"),
          img(w("builder-university", "dashboard"), "Dashboard with learning time, average score and plan tracker"),
          img(w("builder-university", "hub"), "The learning hub listing all courses"),
        ],
      },
      {
        kind: "text",
        heading: "Outcome",
        body: [
          "The platform mattered to the company's onboarding goals. After launch, onboarding moved onto it alongside Builder Hive, the platform where experts work. When I documented it, it was in beta, with plans for webinars, more catalogue sections, bookmarks and in-app notifications.",
        ],
        // TODO(verify): the deck's "100% automated upskilling experts" figure was left out until confirmed.
      },
      {
        kind: "text",
        heading: "What I learned",
        body: [],
        list: [
          "Building from scratch meant understanding how the backend data would flow through the product, not just how the screens look.",
          "Working closely with QA was what made the shipped product match the design.",
          "Gamification doesn't need a huge team. Learning from bigger products and scaling the idea down worked.",
        ],
      },
    ],
  },

  // ───────────────────────────── Ratings & Reviews ────────────────────────────
  {
    slug: "ratings-reviews",
    name: "Ratings & Reviews",
    tagline: "A reward-led flow that gets guests to leave fuller reviews after checkout.",
    tag: "Case study",
    meta: {
      // TODO(embee): confirm the company you did this at, your title and the timeline.
      company: "OYO (Review SaaS)",
      role: "Product Designer",
      type: "Mobile app feature",
    },
    cover: img(w("ratings-reviews", "cover"), "Screens from the review flow: star ratings, reward and confirmation"),
    links: [
      {
        label: "Interactive prototype",
        href: "https://www.figma.com/proto/EOAbRYT9pUIvK3PYtzVELG/Review-Saas-Phase-2?page-id=0%3A1&type=design&node-id=1-105091&viewport=3186%2C820%2C0.18&t=EjTU9kC59pMw0XkP-1&scaling=min-zoom&starting-point-node-id=1%3A105091&show-proto-sidebar=1&mode=design",
      },
    ],
    tint: "#f7e6dc",
    intro:
      "Guests were rating the OYO app on the app stores, but hardly anyone reviewed the hotels themselves. Working with the product manager, I designed a post-checkout review flow that rewards guests for detailed, useful reviews.",
    /*
     * TODO(verify): the deck's outcomes slide lists $424,000 revenue from Review SaaS,
     * 18% of properties opting in, 77% of properties crossing 20 reviews and a 76%
     * lift in review coverage. Its "65% weightage" / "83%" claim about reviews has no
     * source. All are left out until confirmed.
     */
    blocks: [
      {
        kind: "text",
        heading: "The problem",
        body: [
          "Guests clearly wanted to share their experience; they were doing it on the Play Store and App Store. But inside the app, the only option was a bare star rating on the booking screen. Most guests only opened their bookings to download an invoice or book again, so very few rated anything.",
          "The brief was to get more complete reviews (category ratings, written feedback and photos) and to reward the good ones. Our targets were more reviews of at least 100 characters and more properties with at least 20 reviews.",
        ],
      },
      {
        kind: "images",
        images: [
          img(w("ratings-reviews", "current"), "The existing flow: the star rating was the only way to rate a stay"),
          img(w("ratings-reviews", "pain-points"), "The listing page: users couldn't tell what the rating and count meant"),
        ],
      },
      {
        kind: "text",
        heading: "Research",
        body: [
          "We interviewed users to find out why they weren't rating, and watched session recordings of how people used the existing \"Rate your stay\" section. They couldn't tell what the rating on a listing page meant, ratings felt subjective, and after a stay they could only leave stars, not words.",
          "We also compared how Booking.com, Zomato, Airbnb, Uber, Amazon and MakeMyTrip collect reviews: how many they gather, how they reassure users, and whether they use tags, filters and incentives.",
        ],
      },
      {
        kind: "images",
        images: [img(w("ratings-reviews", "benchmark"), "Benchmarking how other platforms collect and show reviews")],
      },
      {
        kind: "text",
        heading: "My role and process",
        body: [
          "I worked with the product manager to map out the user flow and how reviews would be collected, then validated it with other stakeholders. I explored layouts with Crazy 8s sketches, refined them through feedback, and designed the final screens and prototype.",
        ],
      },
      {
        kind: "images",
        images: [
          img(w("ratings-reviews", "user-flow"), "The agreed user flow, from the bottom sheet to the reward"),
          img(w("ratings-reviews", "sketches"), "Crazy 8s sketches exploring the flow"),
        ],
      },
      {
        kind: "text",
        heading: "Key decisions",
        body: [],
        list: [
          "Ask at the right moment. The flow opens as a bottom sheet the first time a guest opens the app after checkout, with just the star rating, so a small first step leads into the rest.",
          "Make the reward visible. A progress bar shows each step and when the cashback unlocks, and a badge shows what the guest will get.",
          "Lower the effort of writing. Quick suggestions help people start a review. Room, cleanliness and location are rated one at a time. Tags change with the star rating, so guests can tap instead of typing a paragraph.",
          "Make reviews useful to other guests. People are asked to add photos and their trip type (family, couple, friends, business), which helps the next person decide.",
          "Close the loop. The final screen confirms which wallet the cashback goes to, offers to share the review on the app store, and invites guests to refer friends.",
        ],
      },
      {
        kind: "images",
        images: [
          img(w("ratings-reviews", "entry"), "The review prompt on the home screen and as a bottom sheet"),
          img(w("ratings-reviews", "write"), "Writing a review with quick suggestions and a reward progress bar"),
          img(w("ratings-reviews", "rate"), "Rating room, cleanliness and location one at a time"),
          img(w("ratings-reviews", "photos"), "Adding photos and choosing a trip type"),
          img(w("ratings-reviews", "reward"), "The reward confirmation with options to share and refer friends"),
        ],
      },
      {
        kind: "text",
        heading: "What I learned",
        body: [],
        list: [
          "People will go the extra mile when something adds value to them.",
          "I learned how to use Google Analytics to follow what users actually do.",
          "Fewer, better meetings kept the project moving.",
          "Good design here was a win for everyone: guests, hotels and the platform.",
        ],
      },
    ],
  },

  // ─────────────────────────────── Studio Store ───────────────────────────────
  {
    slug: "studio-store",
    name: "Studio Store",
    tagline: "Onboarding micro-business owners into their new store dashboard.",
    tag: "Concept",
    meta: {
      company: "Studio Store",
      role: "Product Designer",
      // TODO(embee): add the timeline.
      type: "Concept redesign",
    },
    cover: img(w("studio-store", "cover"), "Studio Store cover: dashboard cards and the brand"),
    tint: "#ece5fb",
    intro:
      "Studio Store apps are \"digital starter kits\" that help micro businesses get online quickly and cheaply. The brief was to design the admin dashboard onboarding in no more than three screens: a welcome, a quick-start guide, and the dashboard itself.",
    blocks: [
      {
        kind: "text",
        heading: "The problem",
        body: [
          "Entry-level small business owners struggle to run their operations: tracking inventory, knowing what's running low, and seeing what sells. Many manage stock by hand and reorder about once a month, with no real-time view and no clear picture of their customers.",
        ],
        list: [
          "Startup entrepreneurs in the early stages of a new business",
          "Solopreneurs running a business on their own",
          "Home-based business owners",
          "Service providers who need to manage clients, projects and tasks",
        ],
      },
      {
        kind: "text",
        heading: "Process",
        body: [
          "I broke the problem down into what I already knew and what I needed to find out. Then I researched the audience and built personas, wrote a design hypothesis, analysed the gaps, and designed and prototyped a solution. I didn't get to test it with users because of time.",
        ],
      },
      {
        kind: "text",
        heading: "Key decisions",
        body: [
          "The goal was a simple web app that takes a new owner from sign-up to a working dashboard without feeling lost.",
        ],
        list: [
          "Personalise first. Business name, team members and logo are collected up front, so the dashboard feels like theirs from the first screen.",
          "Celebrate, then guide. A clear success state leads into a setup guide that adapts to what the owner has already shared.",
          "A short tour, then the data. A brief walkthrough introduces the dashboard: sales, orders, top products and tasks in one place.",
        ],
      },
      {
        kind: "images",
        images: [
          img(w("studio-store", "welcome"), "Welcome and sign-up screen"),
          img(w("studio-store", "storefront"), "Setting up the business name, team and logo"),
          img(w("studio-store", "setup-done"), "Account setup complete"),
          img(w("studio-store", "setup-guide"), "A setup guide based on what the owner has shared"),
          img(w("studio-store", "tour"), "The dashboard tour"),
          img(w("studio-store", "dashboard"), "The Studio Store dashboard"),
        ],
        // The figures inside these dashboard mockups are placeholder data.
      },
      {
        kind: "text",
        heading: "What I'd do next",
        body: [
          "Test the flow with real small business owners. The design is based on research and a hypothesis, not on testing.",
        ],
      },
    ],
  },

  // ─────────────────────────────── Internshala ────────────────────────────────
  {
    slug: "internshala",
    name: "Internshala",
    tagline: "Clearer internship search, applications and tracking.",
    tag: "Concept",
    meta: {
      company: "Personal project (not affiliated with Internshala)",
      role: "Product Designer",
      // TODO(embee): add the timeline.
      type: "Concept redesign",
    },
    cover: img(w("internshala", "cover"), "A case study on revamping the Internshala app"),
    coverFit: "contain",
    tint: "#dceff6",
    intro:
      "When I was hunting for a UX internship, applying through Internshala felt hectic, and I came away from sessions tired and unsure where I stood. This self-initiated project redesigns how students search for, apply to and track internships. It isn't affiliated with Internshala.",
    blocks: [
      {
        kind: "text",
        heading: "The problem",
        body: [
          "Students apply to lots of internships but rarely hear back, and the app gives them little sense of where each application stands. Some come to feel the opportunities aren't real and stop applying.",
          "Secondary research I reviewed pointed the same way: long waits for a response, no acknowledgement that an application was received, and too many steps between \"Apply\" and \"Submit\" all made the experience worse (Business News Daily; SHRM).",
        ],
      },
      {
        kind: "text",
        heading: "Research",
        body: [
          "Along with that literature review, I talked to friends and peers who had applied through the app, read through Play Store reviews, and audited the app for visual inconsistencies that were causing usability problems. I then turned the pain points into \"How might we\" statements and a list of jobs to be done.",
        ],
      },
      {
        kind: "images",
        images: [
          img(w("internshala", "process"), "My process: research, opportunities, ideas, prototypes, validation"),
          img(w("internshala", "hmw"), "\"How might we\" statements from the research"),
        ],
      },
      {
        kind: "text",
        heading: "Key decisions",
        body: [],
        list: [
          "Onboarding that asks about the role, the type of work and skills, so recommendations are relevant from day one.",
          "Search with saved preferences and filters, so students don't start from scratch every time.",
          "A simpler application form, with saved answers for common questions and drafts that can be finished later.",
          "Application tracking with clear status tags, chats with recruiters, and notifications when something changes.",
          "A light design system built from scratch, using Instrument Sans for legibility.",
        ],
      },
      {
        kind: "images",
        images: [
          img(w("internshala", "onboarding"), "Onboarding and preference screens"),
          img(w("internshala", "search"), "Search with preferences and filters"),
          img(w("internshala", "application"), "The new application experience"),
          img(w("internshala", "drafts"), "Saving an application as a draft"),
          img(w("internshala", "tracking"), "Tracking applications and chatting with recruiters"),
          img(w("internshala", "design-system"), "Typography and colour palette"),
        ],
      },
      {
        kind: "text",
        heading: "What I learned",
        body: [
          "This was the most ambitious personal project I've taken on. It taught me to look for UX patterns and gaps in an existing product, to iterate on features based on feedback, and to use psychology principles on purpose rather than by accident.",
        ],
      },
    ],
  },

  // ─────────────────────────────── Swiping Loop ───────────────────────────────
  {
    slug: "swiping-loop",
    name: "The Swiping Loop",
    tagline: "Research into why swiping leaves dating-app users tired, and what to try instead.",
    tag: "Concept",
    meta: {
      company: "Self-initiated",
      role: "Solo UX researcher",
      timeline: "4 weeks",
      type: "UX research",
    },
    cover: img(w("swiping-loop", "cover"), "The swiping loop: a UX research project"),
    tint: "#1f1f1f",
    intro:
      "A four-week research project, done on my own, into why so many people use dating apps but don't want to rely on them. The question was how the swipe mechanism gets in the way of meaningful connection, and how apps could put direct communication first.",
    blocks: [
      {
        kind: "text",
        heading: "Method",
        body: [
          "I recruited participants through social media and online communities and ran an online mixed-method survey with 32 people. The survey also screened for follow-up interviews, which I ran over Google Meet. I mapped the standard journey on Tinder, Bumble and Hinge, and organised the interview data with affinity mapping.",
        ],
      },
      {
        kind: "text",
        heading: "What the survey showed",
        body: [
          "Of the 32 participants, 30 used Tinder, 26 used Bumble and 14 used Hinge. 28 hadn't found a partner through these apps, though many had been on dates, and 4 had. Every participant said they also use Instagram to meet potential partners.",
        ],
      },
      {
        kind: "images",
        images: [img(w("swiping-loop", "journey"), "The typical journey on swipe-based dating apps")],
      },
      {
        kind: "text",
        heading: "Insights",
        body: [
          "In the interviews, people kept coming back to the same complaints: the swiping algorithm, and wanting more communication and control. When I asked why Instagram works for them, the answer was direct messages. You see someone you like and you just talk.",
        ],
      },
      {
        kind: "images",
        images: [img(w("swiping-loop", "affinity"), "Affinity map of interview themes")],
      },
      {
        kind: "text",
        heading: "The swipe loop",
        body: [
          "Putting it together, I saw a repeating cycle. People start swiping, get tired of it, see a glimpse of a possible match, can't start a conversation, and end up swiping again. Those stages are where the frustration and drop-off happen.",
        ],
      },
      {
        kind: "images",
        images: [img(w("swiping-loop", "loop"), "The swipe loop: entry, swiping, fatigue, a glimpse of potential, inability to start a conversation")],
      },
      {
        kind: "text",
        heading: "Recommendations",
        body: [
          "I don't expect dating apps to become less popular, so I wanted to give designers concrete ideas, not just a diagnosis.",
        ],
        list: [
          "Experiment with swipe-less browsing, such as scrolling or a grid, so people engage with profiles more deeply.",
          "Give people more control over how they search, so their matches fit what they're actually looking for.",
          "Put communication first, making it easier to start a conversation and get to a date.",
        ],
      },
    ],
  },

  // ───────────────────────────────── Basecamp ─────────────────────────────────
  {
    slug: "basecamp",
    name: "Basecamp",
    tagline: "A landing page that shows what Basecamp can do, faster.",
    tag: "Concept",
    meta: {
      company: "Personal project",
      role: "Product Designer",
      timeline: "Sep – Oct 2024",
      type: "Concept redesign",
    },
    cover: img(w("basecamp", "cover"), "Redesigned Basecamp landing page on a tablet"),
    tint: "#14121f",
    intro:
      "Basecamp is a project management tool where each project lives on a single page. Its landing page buried the most useful features, so I redesigned it as a personal B2B SaaS project.",
    blocks: [
      {
        kind: "text",
        heading: "The problem",
        body: [
          "Important features and benefits were buried too deep, behind a lot of scrolling and clicking. When I audited the page, I found four main issues.",
        ],
        list: [
          "Too much information up front, leading to decision fatigue.",
          "Navigation that hid valuable content.",
          "A lack of hierarchy, so key benefits didn't stand out.",
          "A confusing layout without a natural flow.",
        ],
      },
      {
        kind: "images",
        images: [img(w("basecamp", "why"), "The four problems from my audit of the original page")],
      },
      {
        kind: "text",
        heading: "Process",
        body: [
          "I set a new colour palette and gradients, then rebuilt the page's information architecture before designing the final layout.",
        ],
      },
      {
        kind: "images",
        images: [
          img(w("basecamp", "palette"), "The colour palette and gradients"),
          img(w("basecamp", "ia"), "The new information architecture for the landing page"),
        ],
      },
      {
        kind: "text",
        heading: "Key decisions",
        body: [],
        list: [
          "A hero with one clear promise and two actions: watch a demo or start a free trial.",
          "Built-in tools shown up front as cards, instead of hidden in menus.",
          "An interactive section that shows the product in use (message board, docs, to-dos, card table, chat and check-ins) instead of describing it.",
          "Integrations and advanced features further down, for people ready to go deeper.",
        ],
      },
      {
        kind: "images",
        images: [
          img(w("basecamp", "final-hero"), "The redesigned hero", "Figures in this mockup are placeholders."),
          img(w("basecamp", "features"), "Showing Basecamp's tools in use"),
          img(w("basecamp", "integrations"), "Integrations and advanced features"),
        ],
      },
      // TODO(embee): add what you learned from this project.
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
