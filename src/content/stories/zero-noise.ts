import { clip, shot } from "@/content/case-studies";
import type { Story } from "./types";

const zn = (f: string) => `/work/zero-noise/${f}`;

export const zeroNoise: Story = {
  slug: "zero-noise",
  hero: {
    tags: ["Web design", "Calculator UX", "Front-end build", "Claude Code"],
    headline: "Turning three answers into a revenue number you can believe.",
    line: "I designed and built Zero Noise’s website in one weekend with Claude Code: an email revenue calculator that leads into client proof, services and booking.",
    facts: [
      { k: "Role", v: "Solo design and development" },
      { k: "Client", v: "Zero Noise, email strategy" },
      { k: "Timeline", v: "One weekend" },
      { k: "Built with", v: "Claude Code" },
    ],
    media: { kind: "showcase", v: { kind: "browser", shots: [clip(zn("clip-desktop-still.webp"), zn("clip-desktop.webp"), "The calculator in use: picking a business type, setting the list size and offer price, then the estimate")] } },
  },
  links: [{ label: "Live site", href: "https://ishikaa-jain.vercel.app/" }],
  context: {
    copy: [
      "Zero Noise offers email strategy and delivery for coaches, consultants, creators and service businesses.",
      "The brief combined a revenue calculator, client results, service packages and call booking. Anyone can read about email marketing; the calculator was a way to see the opportunity in your own numbers, as long as it connected to everything after it.",
    ],
    media: {
      kind: "showcase",
      v: { kind: "phones", status: true, shots: [clip(zn("clip-mobile-still.webp"), zn("clip-mobile.webp"), "The three questions on a phone: tapping a business type, dragging the list size, then the estimate"), shot(zn("m-estimate-clean.webp"), "The first estimate on a phone")] },
    },
  },
  role: {
    statement: "I designed and built the whole site myself over one weekend, using Claude Code from the first implementation to the final refinements.",
    owned: ["The page’s journey and structure", "Calculator UX and its logic", "Build, review and launch"],
    with: ["Zero Noise (the client)"],
    constraints: ["One weekend", "A brief whose example maths didn’t add up"],
  },
  approach: "Three decisions about the calculator, and one about everything after it.",
  decisions: [
    {
      title: "Ask only what the number needs",
      problem: "A revenue projection can turn into a spreadsheet, and a spreadsheet is where visitors leave.",
      explored: "Three questions: what you sell as chips, then list size and offer price as sliders with editable numbers, so people can type an exact value or explore.",
      why: "Every answer feeds the estimate directly, so nothing feels like a form for the agency’s benefit.",
      media: [{ kind: "showcase", v: { kind: "phones", status: true, shots: [shot(zn("m-hero-clean.webp"), "The calculator’s three questions on a phone"), shot(zn("m-estimate-clean.webp"), "The first estimate on a phone")] } }],
    },
    {
      title: "Lead with the floor, not the ceiling",
      problem: "A big “you could make” number invites doubt; a range of scenarios up front invites confusion.",
      explored: "One annual estimate at a 1% buyer rate, the “Bare Minimum”, with its monthly equivalent. The fuller range, 1%, 2% and 3%, comes after, behind an opt-in.",
      why: "A conservative first number is easier to believe, and the result arrives before the form, giving people a reason to continue rather than a gate.",
      media: [{ kind: "showcase", v: { kind: "browser", shots: [shot(zn("range.webp"), "The fuller range, after the opt-in: Bare Minimum, Consistent and All Dialled In")], caption: "The full range, shown after the opt-in" } }],
    },
    {
      title: "Make the maths match the inputs",
      problem: "The brief’s 2% example labelled 2,500 subscribers × 2% × $1,500 as $30,000; those inputs actually make $75,000.",
      explored: "The build calculates from whatever the visitor enters: subscribers × buyer rate × offer price, shown beside the result, never a hard-coded figure.",
      why: "Correct arithmetic doesn’t validate the assumed buyer rate, but a wrong sum would undermine everything else on the page.",
    },
    {
      title: "Connect the estimate to proof and services",
      problem: "A number on its own is a curiosity; the visitor needs to see who can help them reach it.",
      explored: "Client result screenshots between the calculator and the services, then three ways to work together described by how involved the visitor is: Blueprint, Intensive, Done For You.",
      why: "Each section answers the question the last one raises: what could I make, has this worked for others, and how would we do it.",
      media: [
        { kind: "showcase", v: { kind: "browser", shots: [clip(zn("clip-results-still.webp"), zn("clip-results.webp"), "Client results: the carousel arrows, then a dashboard screenshot opened full size")], caption: "Client results; these are the agency’s results, not this website’s" } },
        { kind: "showcase", v: { kind: "browser", shots: [shot(zn("section-services.webp"), "Three ways to work with Zero Noise")] } },
      ],
    },
  ],
  interactive: {
    title: "Run your own numbers",
    prompt: "Pick what you sell, drag the sliders or type a number, then calculate. Open the full range the way visitors do after the opt-in.",
    note: "The same formula and buyer rates as the live site. Nothing you enter here is saved or sent.",
    module: { id: "revenue-calculator" },
  },
  outcome: {
    copy: [
      "In one weekend I shipped a live site that combines the calculator, client proof, a service comparison and booking links.",
      "To judge it as an enquiry journey I’d track calculator completion, progression into the opt-in, submissions and booked calls.",
    ],
    media: { kind: "showcase", v: { kind: "browser", shots: [clip(zn("clip-finale-still.webp"), zn("clip-finale.webp"), "The closing call to action: hovering each card in the stack brings it forward")] } },
  },
  reflection: "The design lived in the connections: how an input becomes an estimate, how the estimate is explained, and how the next step follows from it.",
  sources: {
    figma: ["Live site https://ishikaa-jain.vercel.app/ and its source (ishikaa-homepage/src/lib/calc.ts, Calculator.tsx)", "Existing recordings: clip-desktop, clip-mobile, clip-results, clip-finale"],
    confirm: [
      "The brief describes a 2% benchmark with Basic/Solid/Optimized tiers; the live code uses a 1% Bare Minimum floor with Bare Minimum / Consistent / All Dialled In at 1/2/3%. The page follows the live code.",
      "“Email Revenue Calculator” and “Zero Noise” in the brief are the same project, so they share one case study.",
      "No Figma file was found for Zero Noise.",
    ],
  },
};
