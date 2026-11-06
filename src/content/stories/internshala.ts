import { shot, type ScreenLabel } from "@/content/case-studies";
import type { Story } from "./types";

const i = (f: string) => `/work/internshala/cs/${f}`;
const row3 = (a: string, b: string, c: string, y = 100): ScreenLabel[] => [
  { text: a, x: 12.9, y },
  { text: b, x: 49.6, y },
  { text: c, x: 86.9, y },
];

export const internshala: Story = {
  slug: "internshala",
  hero: {
    tags: ["Self-initiated", "Mobile app", "Research", "UX flows"],
    headline: "Making internship hunting feel less like a black hole.",
    line: "A self-initiated redesign of Internshala’s app around three connected moments: finding an opportunity, applying to it, and knowing what happens after you press Submit.",
    facts: [
      { k: "Type", v: "Self-initiated concept" },
      { k: "Platform", v: "Mobile app" },
      { k: "Scope", v: "Research, flows, UI" },
    ],
    media: { kind: "showcase", v: { kind: "devices", shots: [shot(i("in-search-hd.webp"), "Home, search and preferences", undefined, row3("Home", "Search", "Preferences"))] } },
  },
  context: {
    copy: [
      "I used Internshala constantly while looking for UX internships. The opportunities were useful; finding and applying to them often wasn’t.",
      "Searching felt repetitive, filtering took effort, similar questions came back on every application, and after Submit there was usually silence. For a student, a week of silence reads as “I’ve been rejected” or “this company isn’t real”.",
    ],
    media: { kind: "showcase", v: { kind: "board", shot: shot(i("in-ui-hd.webp"), "My audit of the existing app: each screen beside the problems I found on it"), caption: "My audit of the existing app, screen by screen" } },
  },
  role: {
    statement: "This was my own project, end to end: research, the problem framing, flows, the mobile UI and a small design system.",
    owned: ["Secondary research and user conversations", "Interface audit and problem mapping", "Flows, mobile UI and design system"],
    with: ["Friends who used Internshala, as interviewees"],
    constraints: ["No access to Internshala’s data or team", "Outcomes are hypotheses, not measured results"],
  },
  approach: "Research reframed the job: the hardest part wasn’t the forms, it was the uncertainty. Four decisions followed.",
  decisions: [
    {
      title: "Show value before asking for a profile",
      problem: "New users want to browse before investing time in a full profile, but recommendations need to know what they’re after.",
      explored: "Lightweight preference capture during onboarding (role, location, work type, skills, stipend) that immediately shapes recommendations.",
      why: "The product earns deeper profile completion by first proving “we understand what you’re looking for”.",
      media: [{ kind: "showcase", v: { kind: "devices", shots: [shot(i("in-onboarding-clean.webp"), "Onboarding: sign-up and preference steps", undefined, [...row3("Splash screen", "Sign-up", "Onboarding slides", 44.4), ...row3("Preferences: role", "Preferences: work type", "Preferences: skills")])] } }],
    },
    {
      title: "Stop rewriting the same answer",
      problem: "“Why are you interested?” and “Tell us about a project” come up on almost every application, each time from a blank page.",
      explored: "Saved Responses: reuse a previous answer as a starting point, then tailor it. The reusable profile stays separate from what each application sends.",
      why: "It removes the blank-page work so effort goes into editing for relevance, without making every application generic.",
      media: [{ kind: "showcase", v: { kind: "devices", shots: [shot(i("in-saved-hd.webp"), "Application form with saved responses", undefined, row3("Application form", "Saved responses", "Save a response"))] } }],
    },
    {
      title: "Let drafts behave like drafts",
      problem: "Applicants often leave mid-form to find a link, rewrite an answer or finish after class, and leaving meant losing work.",
      explored: "Applications broken into steps with visible progress, auto-saved when abandoned and surfaced in a dedicated Drafts area.",
      why: "Interruption becomes a normal part of the workflow instead of a failure.",
      media: [{ kind: "showcase", v: { kind: "devices", shots: [shot(i("in-drafts-hd.webp"), "Saving an application as a draft", undefined, row3("Application form", "Save as draft pop-up", "Home"))] } }],
    },
    {
      title: "Make what happens after Submit visible",
      problem: "Good hiring UX can’t control the recruiter’s decision, but silence makes candidates assume the worst.",
      explored: "Application states (submitted, viewed, shortlisted, interviewing, rejected), notifications when they change, and recruiter chat inside the same experience.",
      why: "It doesn’t remove rejection; it removes the unnecessary guessing around it, and keeps Internshala useful after Apply.",
      media: [
        {
          kind: "showcase",
          v: {
            kind: "devices",
            shots: [
              shot(i("in-tracking-hd.webp"), "Applications with status tags", undefined, [{ text: "Applications", x: 50, y: 100 }]),
              shot(i("in-chats-hd.webp"), "Messages with recruiters", undefined, [{ text: "Chats", x: 50, y: 100 }]),
              shot(i("in-notify-hd.webp"), "Status notifications", undefined, [{ text: "Notifications", x: 50, y: 100 }]),
            ],
          },
        },
      ],
    },
  ],
  interactive: {
    title: "Follow one application",
    prompt: "Step through the journey of a single application: from a home that knows what you want, to a draft you came back to, to hearing back.",
    note: "Final screens from the concept.",
    module: {
      id: "walkthrough",
      steps: [
        { title: "A home that knows you", body: "Preferences from onboarding drive the recommendations, with a nudge to complete the profile once it’s clearly worth it.", frame: "device", shot: shot(i("in-onboarding-2-hd.webp"), "A new user’s home with recommended internships and profile strength") },
        { title: "Come back to a draft", body: "Left halfway? The application waits in Drafts, marked Incomplete, one tap from where you stopped.", frame: "device", shot: shot(i("in-drafts-2-hd.webp"), "Applications, Drafts tab: an incomplete application to finish") },
        { title: "See where each one stands", body: "Every application carries its state, from Pending review to Application viewed to Shortlisted.", frame: "device", shot: shot(i("in-tracking-hd.webp"), "Applications with status tags") },
        { title: "Hear it when it changes", body: "A shortlist or a recruiter’s message arrives as a notification, instead of waiting to be discovered.", frame: "device", shot: shot(i("in-notify-hd.webp"), "Lock-screen notifications: shortlisted, and a message from a recruiter") },
        { title: "Talk to a real person", body: "Recruiter messages live inside the application experience, so discovering, applying, tracking and talking stay connected.", frame: "device", shot: shot(i("in-chats-hd.webp"), "Chats with recruiters, tagged with application status") },
      ],
    },
  },
  outcome: {
    copy: [
      "The concept connects areas that used to be fragmented: onboarding, home, search, job detail, application, profile, tracker and chat.",
      "Because it’s self-initiated, these are hypotheses. I’d validate recommendation relevance, application completion, repeat-application effort and candidate trust in testing before calling it a success.",
    ],
    media: { kind: "showcase", v: { kind: "deck", id: "in-ds" } },
  },
  reflection: "I started out thinking the worst part of internship hunting was filling forms. Research showed it was uncertainty: what fits me, what’s left to do, and what happened after I took the risk of applying.",
  sources: {
    figma: ["Portfolio-projects KEABZM1GitiLCq9YTXJdu6 / my work / “Desktop - 3” 130:28407 (original Internshala case study); audit board fill “image 7” 130:29075 at 1816 × 952"],
    confirm: ["No Figma file of the Internshala design screens themselves was found (only the case-study board)"],
  },
};
