import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CaseStudyHero } from "@/components/work/case-study-hero";
import { PrevNext } from "@/components/work/prev-next";
import {
  SectionShell,
  Eyebrow,
  SectionHeading,
  BodyText,
  ResultLine,
  FullImage,
  TwoColImageText,
  StatCallout,
  PersonaCards,
  KeepReading,
} from "@/components/work/sections";
import { FaqAccordion } from "@/components/faq-accordion";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Wildflower — Muskan Designs",
  description:
    "From low engagement to personalized, scalable UX — a Wildflower Health case study.",
};

const faqs = [
  {
    q: "How did you balance user needs with business goals, especially in a health product?",
    a: [
      "Users often dropped off after giving birth because they didn't realize postpartum features were available. That meant they missed helpful trackers and support, and the business lost engagement right when it needed to grow adoption of postpartum care plans.",
      "To solve this, I added subtle moments in the design that showed what features would unlock after birth, like baby milestones and recovery tools. This helped educate users without distracting them from their pregnancy tasks. It kept them focused on what mattered now while setting up stronger engagement later.",
    ],
  },
  {
    q: "How did you handle ambiguity when requirements are still shifting?",
    a: [
      "The team was evolving beyond pregnancy into multiple care plans, but early workshops made it clear they hadn't fully defined how that would work yet. Instead of designing everything upfront, I paced my work to match their decision-making. I held off on finalizing certain flows until there was enough clarity to move forward with confidence.",
      "With a tight budget, I couldn't afford to redesign every time a new idea came up. I asked the right questions to separate long-term requirements from in-the-moment ideas. For example, one stakeholder wanted to introduce an avatar named Poppy to guide users. While creative, it wasn't connected to the core need—helping users manage multiple care plans like pregnancy, nutrition, and mental health without confusion. I focused on solving for that need first, building a system that could visually support and separate care plans without unnecessary complexity.",
      "This approach helped the team make progress even as things evolved, and kept the work grounded in what users and the business actually needed.",
    ],
  },
  {
    q: "How did you work within the existing tech stack and team capacity?",
    a: [
      "I worked within a tight budget and a fast-moving timeline while the team was still figuring out how to evolve their care plans beyond pregnancy. Instead of over-designing or creating throwaway UI, I built a flexible, modular component system (what they called “widgets”) that could scale as their roadmap evolved. This gave them a foundation to adapt and test new care plan logic without needing a full-time designer.",
      "I also kept their React stack in mind like avoiding overly custom UI, sticking to accessible patterns, and following WCAG best practices throughout. Every component was clearly labeled and annotated, with handoff documentation built for longevity. I knew it might be months before another designer joined, so I set them up with something clean, scalable, and easy for engineers to maintain and extend.",
    ],
  },
  {
    q: "How do you ensure your designs scale across complex user types?",
    a: [
      "The core challenge was information overload on a small screen. Engagement was already low, but the business wanted to add more features, care plans, and trackers. I restructured the UI to reduce cognitive load, prioritizing clarity, visual hierarchy, and contextual content, so users could focus on what mattered most without feeling overwhelmed.",
      "I also accounted for a wide range of user types and edge cases, from different insurance coverage and medical concerns to users who weren't pregnant at all. Rather than forcing a one-size-fits-all layout, I created a modular, personalized experience that adapted to the user's needs while staying accessible and intuitive.",
      "I built a flexible component system aligned with their React stack to ensure long-term scalability. I kept the UI simple and accessible, followed WCAG guidelines throughout, and provided clear annotations so the engineering team could maintain and evolve the product even without a designer on staff.",
    ],
  },
];

const related = caseStudies
  .filter((s) => s.slug !== "wildflower")
  .map((s) => ({
    slug: s.slug,
    logo: s.logo,
    logoWidth: s.logoWidth,
    logoHeight: s.logoHeight,
    title: s.title,
    summary: s.summary,
    gradientFrom: s.gradientFrom,
    gradientTo: s.gradientTo,
  }));

export default function WildflowerCaseStudy() {
  return (
    <>
      <Nav />
      <main className="flex w-full flex-col items-center">
        <PrevNext slug="wildflower" />

        <SectionShell>
          <FullImage
            src="/work/wildflower/hero-carousel.png"
            width={1376.8}
            height={523}
            alt="Wildflower app screens: home, tasks, tracking, and learn"
            rounded={false}
            fit="contain"
          />
        </SectionShell>

        <CaseStudyHero
          logo="/work/wildflower/hero-logo.png"
          logoWidth={784}
          logoHeight={103}
          textFlex={656.4}
          detailsFlex={612.8}
          eyebrow="Cross-Platform Mobile App Redesign"
          title={
            <>
              One app, many journeys: Building a flexible system for
              healthcare users
            </>
          }
          paragraphs={[
            "Wildflower Health's white-labeled pregnancy and wellness app was in need of a rebuild, and the team had a tight timeline and a lean budget. Engagement was low, with monthly active users hovering around 25–30% across clients, well below the company's 50% target.",
            "I ran a focused UX audit and delivered a rapid redesign, streamlining navigation, tightening visual hierarchy, and prioritizing high-impact improvements that aligned with the constraints of the rebuild.",
          ]}
          result="Clearer workflows, improved usability, and a scalable foundation for their new tech stack to set the stage for stronger engagement and a path toward their goal."
          note="Note: The team is in development, so any ROI metrics are an estimate."
          details={[
            { label: "Role", value: "Fractional Product Designer" },
            { label: "Timeframe", value: "~6 weeks" },
            {
              label: "Team",
              value: "Senior Product Manager, Director of Content, VP of Marketing",
            },
            { label: "App Reach", value: "~50k users" },
          ]}
        />

        <SectionShell>
          <Eyebrow>The starting point</Eyebrow>
          <SectionHeading>
            Clarity through a UX audit and strategy workshops
          </SectionHeading>
          <div className="flex flex-col items-start gap-10 md:flex-row md:gap-16">
            <div className="flex-1">
              <BodyText>
                <p>
                  Wildflower&rsquo;s app was cluttered and hard to scale. I
                  reviewed internal journey maps, care plan workflows, and
                  engagement data to ensure recommendations balanced clinical
                  priorities with user needs.
                </p>
                <p>
                  From there, I ran a <strong>UX audit</strong> to uncover and
                  prioritize key issues, sharing a redesign plan that fit both
                  the tech stack and timeline.
                </p>
                <p>
                  I also led <strong>strategy workshops</strong> to align the
                  team on personas, user flows, and scope, ultimately focusing
                  on pregnancy users while deprioritizing general wellness to
                  keep the project manageable.
                </p>
              </BodyText>
            </div>
            <div className="flex-1">
              <FullImage
                src="/work/wildflower/personas-board.png"
                width={656}
                height={369}
                alt="Personas board"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16">
            <FullImage
              src="/work/wildflower/starting-point-2.png"
              width={656}
              height={334}
            />
            <FullImage
              src="/work/wildflower/starting-point-3.png"
              width={656}
              height={428}
            />
          </div>
        </SectionShell>

        <SectionShell>
          <SectionHeading center>
            Pregnant or not, there were two key mental models to consider:
          </SectionHeading>
          <PersonaCards
            cards={[
              {
                icon: "/work/wildflower/icon-persona-planner.svg",
                iconBg: "bg-purple/35",
                title: "The Task-Oriented Planner",
                body: "Whether pregnant or managing other health needs, they value structure and timely updates to keep care plans on track.",
              },
              {
                icon: "/work/wildflower/icon-persona-reassurance.svg",
                iconBg: "bg-pink/35",
                title: "The Reassurance Seeker",
                body: "Navigates anxiety, high-risk care, or major life transitions. They need clear guidance and frequent reassurance to feel confident in their next steps.",
              },
            ]}
          />
        </SectionShell>

        <SectionShell>
          <TwoColImageText
            heading="Defined a new visual system that is modern, warm, and scalable"
            body={
              <p>
                The old app felt dated and lacked a system to support key
                user needs. I created a modern,{" "}
                <strong>reusable visual system</strong> that makes health
                info clear, improves usability, and sets up a{" "}
                <strong>scalable foundation</strong> for future updates.
              </p>
            }
            image="/work/wildflower/visual-system-summary.png"
            imageWidth={656}
            imageHeight={455}
          />
          <FullImage
            src="/work/wildflower/visual-system-board.png"
            width={1376}
            height={636}
          />
        </SectionShell>

        <SectionShell>
          <SectionHeading>
            Redesigned the homepage to scale with any user state
          </SectionHeading>
          <BodyText>
            <p>
              This modular system adapts based on the user&rsquo;s needs,
              reordering and emphasizing components to reduce noise and
              surface the right actions at the right time.
            </p>
          </BodyText>
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex w-full flex-col gap-3 md:max-w-[420px]">
              <div className="rounded-2xl bg-gradient-to-b from-pink/30 to-pink/50 p-5">
                <p className="text-lg font-semibold tracking-[0.18px] text-ink">
                  Routine pregnancy
                </p>
                <p className="text-base tracking-[0.2px] text-ink-soft">
                  Highlights milestones and clinical to-dos, like appointment
                  reminders.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5">
                <p className="text-lg font-semibold tracking-[0.18px] text-ink">
                  High-risk pregnancy
                </p>
                <p className="text-base tracking-[0.2px] text-ink-soft">
                  Surfaces key alerts while keeping milestone content
                  accessible.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5">
                <p className="text-lg font-semibold tracking-[0.18px] text-ink">
                  Postpartum user
                </p>
                <p className="text-base tracking-[0.2px] text-ink-soft">
                  Shifts tone and layout to support recovery, with fewer
                  distractions.
                </p>
              </div>
            </div>
            <div className="flex flex-1 justify-center gap-[-40px]">
              <div className="relative -rotate-6">
                <Image
                  src="/work/wildflower/homepage-phone-3.png"
                  alt=""
                  width={270}
                  height={585}
                  className="rounded-2xl"
                />
              </div>
              <div className="relative -ml-10 rotate-9">
                <Image
                  src="/work/wildflower/homepage-phone-2.png"
                  alt=""
                  width={270}
                  height={585}
                  className="rounded-2xl"
                />
              </div>
              <div className="relative -ml-10 rotate-18">
                <Image
                  src="/work/wildflower/homepage-phone-1.png"
                  alt=""
                  width={270}
                  height={585}
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell>
          <SectionHeading>
            Reimagined tasks to reduce overwhelm and support multi-plan
            growth
          </SectionHeading>
          <BodyText>
            <p>
              The old to-do list showed everything at once, overwhelming
              users as care plans grew.
            </p>
            <p>
              I redesigned it with <strong>progressive disclosure</strong>:
              Urgent tasks first, others hidden until needed—creating a
              cleaner, <strong>modular system</strong> that scales without
              clutter.
            </p>
          </BodyText>
          <FullImage
            src="/work/wildflower/tasks-before-after.png"
            width={1056}
            height={468}
          />
          <BodyText>
            <p>
              The many <strong>iterations</strong> it took to get there …
            </p>
          </BodyText>
          <FullImage
            src="/work/wildflower/tasks-iterations.png"
            width={1056}
            height={468}
          />
        </SectionShell>

        <SectionShell bg="linear-gradient(to bottom, rgba(202,187,233,0.7), rgba(179,222,193,0.7))">
          <SectionHeading>
            Revamped trackers to boost engagement and retention
          </SectionHeading>
          <BodyText>
            <p>
              I reworked a cluttered, click-heavy system into a simple,
              inviting tracker experience.
            </p>
            <p>
              Users can now log items directly, see what matters most based
              on their care plan, and preview postpartum tools.
            </p>
            <p>
              The design also adapts for unique needs like chronic condition
              tracking.
            </p>
          </BodyText>
          <FullImage
            src="/work/wildflower/trackers-composite.png"
            width={1376}
            height={781}
            rounded={false}
          />
        </SectionShell>

        <SectionShell>
          <SectionHeading>
            Streamlined navigation with user &amp; business needs in mind
          </SectionHeading>
          <BodyText>
            <p>
              Users were getting lost in the original experience. Essential
              features were buried, editing key details like due dates took
              too many steps, and the cluttered menu caused frustration and
              drop-off. I prioritized navigation based on user needs and
              frequency, aligned the team on a simpler structure, and moved
              lower-priority items into a clean hamburger menu to reduce
              friction.
            </p>
          </BodyText>
          <ResultLine>
            A more focused, approachable app experience that feels easy to
            navigate because it&rsquo;s intuitive, not overwhelming.
          </ResultLine>
          <FullImage
            src="/work/wildflower/nav-before-after.png"
            width={1376}
            height={900}
          />
        </SectionShell>

        <SectionShell>
          <div className="flex flex-col items-start gap-10 md:flex-row md:gap-[100px]">
            <div className="flex flex-1 flex-col gap-4">
              <Eyebrow>Designing for impact</Eyebrow>
              <SectionHeading>
                Smarter UX leads to stronger outcomes
              </SectionHeading>
              <BodyText>
                <p>
                  This project was about solving business and user problems
                  through smart strategy and focused execution.
                </p>
              </BodyText>
              <ul className="flex list-disc flex-col gap-1 pl-6 text-base tracking-[0.2px] text-muted">
                <li>I started with strategy, not screens</li>
                <li>I prioritized business goals and user needs</li>
                <li>I designed a scalable system, not just static mocks</li>
                <li>
                  I delivered smart solutions (not just what was asked, but
                  what was needed)
                </li>
              </ul>
            </div>
            <div className="flex flex-1 items-center">
              <StatCallout
                title="Projected Results:"
                from="rgba(255,173,173,0.4)"
                to="rgba(202,187,233,0.4)"
                stats={[
                  { label: "Monthly Active Users", value: "28% → 50%" },
                  { label: "App Sessions", value: "4 → 8 per month" },
                  { label: "Task Completion", value: "+35–50%" },
                  { label: "Support Tickets", value: "–20–30%" },
                ]}
              />
            </div>
          </div>
        </SectionShell>

        <FaqAccordion title="Have questions?" items={faqs} />

        <KeepReading cases={related} />
      </main>
      <Footer />
    </>
  );
}
