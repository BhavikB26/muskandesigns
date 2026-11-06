import { shot } from "@/content/case-studies";
import type { Story } from "./types";

const o = (f: string) => `/work/ratings-reviews/${f}`;

export const oyo: Story = {
  slug: "ratings-reviews",
  hero: {
    name: "OYO Reviews",
    tags: ["Product design", "Mobile app", "Behavioural design", "Marketplace"],
    headline: "Turning post-stay feedback into better reviews, and new revenue.",
    line: "Guests happily reviewed OYO’s app on the app stores, but rarely the hotels they stayed in. I designed a post-checkout review journey that made giving useful feedback feel small, finite and worth it.",
    facts: [
      { k: "Company", v: "OYO" },
      { k: "Project", v: "Ratings & Reviews, Review SaaS" },
      { k: "Platform", v: "Mobile app" },
    ],
    media: { kind: "showcase", v: { kind: "devices", maxWidth: 560, shots: [shot(o("img-entry-clear.webp"), "The bottom sheet on the first app visit after checkout")] } },
  },
  links: [
    {
      label: "Figma prototype",
      href: "https://www.figma.com/proto/EOAbRYT9pUIvK3PYtzVELG/Review-Saas-Phase-2?page-id=0%3A1&type=design&node-id=1-105091&viewport=3186%2C820%2C0.18&t=EjTU9kC59pMw0XkP-1&scaling=min-zoom&starting-point-node-id=1%3A105091&show-proto-sidebar=1&mode=design",
    },
  ],
  context: {
    copy: [
      "Ratings help travellers decide before they ever see a hotel. OYO’s rating lived in a corner of the app people visited for invoices and repeat bookings, and allowed little more than stars.",
      "Sparse property reviews cost everyone: travellers lost confidence, hotels lost structured feedback, and OYO lost a lever for marketplace trust.",
    ],
    media: {
      kind: "showcase",
      v: {
        kind: "annotated",
        panels: [
          {
            shot: shot(o("phone-current-clear.webp"), "The old checked-out screen, where a star rating was the only feedback"),
            phone: { x: 6, y: 34, w: 54 },
            notes: [{ text: "This is the section to give a rating (current flow)", x: 58, y: 7, w: 40, from: [68, 31], to: [0.62, 0.32], bend: 10, align: "center" }],
          },
          {
            shot: shot(o("phone-listing-clear.webp"), "Listing ratings guests found hard to interpret"),
            phone: { x: 36, y: 36, w: 54 },
            notes: [
              { text: "What will users understand from this star?", x: 2, y: 6, w: 36, from: [22, 27], to: [0.12, 0.15], bend: -9 },
              { text: "What does this 793 stand for?", x: 56, y: 5, w: 42, from: [70, 19], to: [0.27, 0.15], bend: 8, align: "center", tilt: 4 },
            ],
          },
        ],
      },
    },
  },
  role: {
    statement: "I designed the review journey end to end, mapping it with the product manager, validating it with stakeholders, then ideating, designing and prototyping the flow.",
    owned: ["The post-checkout user flow, mapped with the PM", "Ideation, mobile UI and the Figma prototype", "Research inputs: interviews, UXCam sessions, benchmarking"],
    with: ["Product manager", "Other OYO stakeholders"],
    constraints: ["Rewards had to pay for useful reviews, not positive ones", "Keep a long review from feeling long"],
  },
  approach: "Research showed three problems: the wrong moment, too little expression, and an invisible value exchange. Each decision answers one.",
  decisions: [
    {
      title: "Ask while the stay is fresh",
      problem: "The old rating waited to be rediscovered in My Bookings, long after the peak-end moment when people actually want to share.",
      explored: "A one-tap star rating in a bottom sheet the first time the guest opens the app after checkout, without exposing the full form.",
      why: "A tiny first commitment anchors the rest: “I’ve already started reviewing my stay.” Then the product can invite more.",
      media: [{ kind: "showcase", v: { kind: "board", shot: shot(o("img-user-flow.webp"), "The user flow for collecting reviews"), caption: "The post-checkout journey, mapped with the PM" } }],
    },
    {
      title: "Break one big review into small judgments",
      problem: "“Tell us about your stay” is a blank page, and a single star can’t say why a stay was good or bad.",
      explored: "Category ratings (Room, Cleanliness, Location) one at a time, follow-up themes that change with the rating, then a writing step with contextual prompts.",
      why: "Guests do one kind of judgment at a time, and OYO gets structured detail it can analyse instead of vague sentiment.",
      media: [
        { kind: "gallery", items: [{ shot: shot(o("img-rate-clear.webp"), "Category ratings for room, cleanliness and location"), label: "Category ratings" }, { shot: shot(o("img-write-clear.webp"), "Writing a review with contextual suggestions"), label: "Writing prompts" }, { shot: shot(o("img-photos-clear.webp"), "Adding photos and trip type"), label: "Photos and trip type" }] },
      ],
    },
    {
      title: "Make the value exchange visible",
      problem: "Writing a thoughtful review is real work, and the product never acknowledged it.",
      explored: "A reward explained up front, a progress indicator showing what’s left and when the reward lands, and a persistent reward cue throughout.",
      why: "The reward is for complete, useful feedback whether the stay was good or bad, which is what keeps it trustworthy rather than a bribe.",
      media: [{ kind: "showcase", v: { kind: "devices", maxWidth: 280, shots: [shot(o("img-reward-clear.webp"), "The cashback confirmation")] } }],
    },
    {
      title: "Earn the next ask",
      problem: "Post-stay is a tempting moment to ask for everything: app-store ratings, referrals and more.",
      explored: "Only after the property review is complete does the flow mention reviewing OYO itself or referral programmes.",
      why: "The product earns the right to another request once the primary contribution is done.",
      media: [{ kind: "showcase", v: { kind: "board", shot: shot(o("img-sketches.webp"), "Crazy 8s sketches"), caption: "Crazy 8s: breaking the review into smaller interactions" } }],
    },
  ],
  interactive: {
    title: "Leave a review, step by step",
    prompt: "Walk through the journey a guest takes after checkout, from the first tap to the cashback.",
    note: "Final screens. The full clickable Figma prototype is linked at the top of the page.",
    module: {
      id: "walkthrough",
      steps: [
        { title: "One tap after checkout", body: "The first time the guest opens the app after checking out, a bottom sheet asks for a single star rating.", frame: "device", shot: shot(o("img-entry-clear.webp"), "The bottom sheet on the first app visit after checkout") },
        { title: "Rate one thing at a time", body: "Room, Cleanliness and Location each get their own rating, with progress and the reward visible.", frame: "device", shot: shot(o("img-rate-clear.webp"), "Category ratings for room, cleanliness and location") },
        { title: "Get past the blank page", body: "Contextual prompts suggest what to talk about, while the words stay the guest’s own.", frame: "device", shot: shot(o("img-write-clear.webp"), "Writing a review with contextual suggestions") },
        { title: "Show it, and say who you are", body: "Photos show what the stay was really like; trip type tells the next guest whether it suits someone like them.", frame: "device", shot: shot(o("img-photos-clear.webp"), "Adding photos and trip type") },
        { title: "Close the loop", body: "The cashback is confirmed with where it will land. Only now do other asks appear.", frame: "device", shot: shot(o("img-reward-clear.webp"), "The cashback confirmation") },
      ],
    },
  },
  outcome: {
    copy: [
      "After the new flow went live, review coverage rose sharply and Review SaaS became a product hotels paid for.",
      "Guests were recognised for meaningful contribution, hotels got richer feedback, and future travellers got better information before booking.",
    ],
    metrics: [
      { value: "+76%", label: "Relative lift in review coverage", note: "Versus the old flow" },
      { value: "77%", label: "Of participating properties crossed 20 reviews" },
      { value: "18%", label: "Of properties opted into Review SaaS" },
      { value: "~$424K", label: "Revenue generated through Review SaaS" },
    ],
  },
  reflection: "The reward helped, but it wasn’t the design. What worked was the combination: the right timing, small commitments, clear progress and an obvious value exchange.",
  sources: {
    figma: ["Review-Saas-Phase-2 prototype EOAbRYT9pUIvK3PYtzVELG (node 1-105091)", "Portfolio-projects KEABZM1GitiLCq9YTXJdu6 / “Ratings & Reviews case study” 12:27"],
    confirm: ["Project dates (not stated anywhere)", "The Figma prototype is linked out; whether it’s public enough to embed is unknown, so it isn’t embedded"],
  },
};
