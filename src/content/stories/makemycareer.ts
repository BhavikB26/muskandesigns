import { shot } from "@/content/case-studies";
import type { Step, Story } from "./types";

const m = (f: string) => `/work/makemycareer/${f}.webp`;
const s = (f: string, alt: string) => shot(m(f), alt);
/** The same screen at the laptop's exact ratio (tools/mockups/makemycareer-laptop.cjs), so laptops never trim its sides. */
const l = (f: string, alt: string) => shot(m(`${f}-l`), alt);

const seeker: Step[] = [
  { title: "Start from the dashboard", body: "Interviews coming up, recommended jobs and featured companies, all in one place.", frame: "browser", shot: s("js-dashboard", "Job-seeker dashboard: stats, upcoming interviews, recommended jobs and featured companies") },
  { title: "Scan the openings", body: "Each row shows the role, number of openings, monthly salary and location, with Apply Now and save on the row itself.", frame: "browser", shot: s("js-jobs", "Opening jobs: a list of roles with salary, location, Apply Now and save") },
  { title: "Read the details", body: "The job page brings the description, required skills, the company and contact details together, with Apply Now at the top.", frame: "browser", shot: s("js-jobdetails", "Job details for a Junior UX Designer role at Edge Studios") },
  { title: "Apply", body: "A short summary confirms who you are applying as and which resume goes with it, with an option to update it before submitting.", frame: "browser", shot: s("js-applysummary", "Apply Job: applicant details, attached resume and Submit Application") },
  { title: "Track your applications", body: "Every application with its company, type, position and status (Accepted, On Hold, Pending) plus a way to get in touch.", frame: "browser", shot: s("js-applications", "Applications table with status for each application") },
];

const employer: Step[] = [
  { title: "Start from the dashboard", body: "Applications received, shortlisted and on hold, today’s interviews and recommended candidates.", frame: "browser", shot: s("em-dashboard", "Employer dashboard: application counts, interviews and recommended candidates") },
  { title: "Basic details", body: "Step one of four: title, job type, shift, salary range, openings, working days and hours.", frame: "browser", shot: s("em-post-basic", "Add Job, step 1: basic details") },
  { title: "Candidate requirements", body: "Preferred skills as removable chips, then the job description and any additional requirements.", frame: "browser", shot: s("em-post-requirements", "Add Job, step 2: candidate requirements") },
  { title: "Interview information", body: "Who candidates will meet and where: contact person, phone, email and the company address.", frame: "browser", shot: s("em-post-interview", "Add Job, step 3: interview information") },
  { title: "Review and post", body: "Everything from the three steps on one page, with a code-of-conduct confirmation before the job goes live.", frame: "browser", shot: s("em-post-review", "Add Job, step 4: review your job post") },
  { title: "Publish from drafts", body: "Unpublished jobs wait in Drafts with a Publish button on each row.", frame: "browser", shot: s("em-drafts", "Jobs, Drafts: unpublished jobs with Publish") },
  { title: "Manage applications", body: "Applicants in one table with their resume, and Accept, Hold or Reject on each row.", frame: "browser", shot: s("em-applications-a", "Applications table with Accept, Hold and Reject actions") },
  { title: "Open a candidate", body: "The full profile: contact details, about, work experience, education, software and skills, with the same three decisions at the top.", frame: "browser", shot: s("em-applications-b", "Candidate detail: Neha Gautham’s profile with Accept, Hold and Reject") },
];

export const makemycareer: Story = {
  slug: "makemycareer",
  hero: {
    tags: ["Recruitment platform", "Web app", "Two audiences", "Team project"],
    headline: "Making hiring and job discovery work together.",
    line: "A recruitment platform with two connected sides: job seekers find and apply for roles, and employers publish openings and manage the applications that come in.",
    facts: [
      { k: "Role", v: "Product Designer, team project" },
      { k: "Platform", v: "Web app" },
      { k: "Audiences", v: "Job seekers and employers" },
      { k: "Scope", v: "Dashboards, posting, applications" },
    ],
    media: {
      kind: "showcase",
      v: { kind: "laptop", shot: l("em-dashboard", "MakeMyCareer’s employer dashboard: applications, interviews and recommended candidates"), scroll: false },
    },
  },
  context: {
    copy: [
      "Recruitment is two journeys that depend on each other.",
      "Candidates need to find relevant roles, understand what’s being asked and apply with confidence. Employers need to publish openings, say what they expect and keep track of who applied. We designed MakeMyCareer as one platform with a workspace for each side, built on the same sidebar, search and card patterns.",
    ],
    media: {
      kind: "windows",
      shots: [s("js-jobs", "Job seekers: opening jobs with Apply Now"), s("em-jobs", "Employers: their jobs with Unpublish and Detail")],
      labels: ["Job seeker", "Employer"],
      caption: "The same jobs, seen from both sides",
    },
  },
  role: {
    statement:
      "I worked as part of the design team on MakeMyCareer, contributing interface design and design iterations across the platform. This case study focuses on the workflows those screens describe.",
    ownedLabel: "Where I contributed",
    owned: ["Interface design for job-seeker and employer screens", "Design iterations on the platform’s workflows"],
    with: ["The MakeMyCareer design team"],
  },
  approach: "Four decisions, two for each side of the platform.",
  decisions: [
    {
      title: "Compare roles without opening every listing",
      problem: "Job seekers lose time when they have to open each listing just to learn the salary or location.",
      explored: "Listing rows that carry the role, number of openings, monthly salary and location, with Apply Now and save on the row. A job page then holds everything else: description, skills, company and contacts.",
      why: "People can shortlist from the list and only open the roles worth reading in full.",
      media: [
        {
          kind: "tabs",
          frame: "browser",
          items: [
            { label: "Opening jobs", shot: s("js-jobs", "Opening jobs list") },
            { label: "Job details", shot: s("js-jobdetails", "Job details page") },
            { label: "Dashboard", shot: s("js-dashboard", "Job-seeker dashboard with recommended jobs and featured companies") },
          ],
          caption: "Job-seeker screens: the list, the detail and the dashboard",
        },
      ],
    },
    {
      title: "Break job posting into four steps",
      problem: "A job post mixes very different information (logistics, requirements, interview details), which makes one long form tiring to fill in.",
      explored: "Four steps with a progress bar: basic details, candidate requirements, interview information, then a review of everything before posting.",
      why: "Each step asks for one kind of information, and the review catches mistakes before candidates ever see the post.",
      media: [
        {
          kind: "tabs",
          frame: "browser",
          items: [
            { label: "1 · Basic details", shot: s("em-post-basic", "Add Job, step 1: basic details") },
            { label: "2 · Requirements", shot: s("em-post-requirements", "Add Job, step 2: candidate requirements") },
            { label: "3 · Interview", shot: s("em-post-interview", "Add Job, step 3: interview information") },
            { label: "4 · Review", shot: s("em-post-review", "Add Job, step 4: review your job post") },
          ],
          caption: "The Add Job flow, step by step",
        },
      ],
    },
    {
      title: "Keep every job in a clear state",
      problem: "Once several jobs exist, employers need to know which are live, which are drafts and which to take down.",
      explored: "Jobs filtered into All, Drafts and Active, with Publish on drafts and Unpublish on live jobs, plus a published-job page that mirrors what candidates see.",
      why: "The state of each job is visible on the row, and changing it is one click.",
      media: [
        {
          kind: "tabs",
          frame: "browser",
          items: [
            { label: "Drafts", shot: s("em-drafts", "Jobs, Drafts with Publish") },
            { label: "Active", shot: s("em-active", "Jobs, Active with Unpublish") },
            { label: "Published job", shot: s("em-published", "A published job’s detail page") },
          ],
        },
      ],
    },
    {
      title: "Decide on applications where you read them",
      problem: "Reviewing applicants means moving between a list, a resume and a decision.",
      explored: "An applications table with the resume and Accept, Hold and Reject on every row, and a candidate page with experience, education and skills that keeps the same three actions at the top.",
      why: "Employers can decide from the list when it’s clear, or open the profile when it isn’t, without changing tools.",
      media: [{ kind: "windows", shots: [s("em-applications-a", "Applications table with Accept, Hold and Reject"), s("em-applications-b", "Candidate detail with Accept, Hold and Reject")], labels: ["Applications", "Candidate"] }],
    },
  ],
  interactive: {
    title: "Walk both sides of the platform",
    prompt: "Switch between the job seeker and the employer, then step through each journey in its original order.",
    note: "Final screens from the Figma file.",
    module: { id: "paths", paths: [{ label: "Job seeker", steps: seeker }, { label: "Employer", steps: employer }] },
  },
  outcome: {
    copy: [
      "The designs connect job discovery, job posting and application management in one platform, with a dedicated workspace for each audience.",
      "The two journeys meet in the middle: what an employer writes in the posting flow is exactly what a candidate reads on the job page.",
    ],
    media: { kind: "showcase", v: { kind: "laptop", shot: s("home", "MakeMyCareer’s landing page, scrolling"), scroll: true } },
  },
  reflection:
    "Designing both sides together kept the product honest. Every field we asked employers to fill in had to earn its place on the page a candidate would read.",
  sources: {
    figma: [
      "Projects EfTqrb7VfQ01dMO4kDo2pD / websites 1:3",
      "Job seeker: 1:48317 dashboard, 1:49400 jobs, 1:55522 job details, 1:55682 apply summary, 1:50669 applications, 1:56451 profile",
      "Employer: 1:48873 dashboard, 1:49841 jobs, 1:49723 / 1:50193 / 1:50319 / 1:50460 Add Job steps, 1:58051 drafts, 1:58388 active, 1:58926 published, 1:51001 applications, 1:51362 candidate",
      "Landing: 1:53271 home page; registration 1:59739",
    ],
    confirm: ["Muskan’s exact screens and responsibilities", "Client / company and dates", "Whether it shipped"],
  },
};
