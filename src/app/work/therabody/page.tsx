import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CaseStudyHero } from "@/components/work/case-study-hero";
import { PrevNext } from "@/components/work/prev-next";
import {
  SectionShell,
  Eyebrow,
  SectionHeading,
  FullImage,
  KeepReading,
} from "@/components/work/sections";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Therabody — Muskan Designs",
  description:
    "Optimizing Therabody's PDP: Driving growth through iterative testing.",
};

const infoCards = [
  {
    label: "Context",
    body: "Therabody aimed to boost e-commerce performance by optimizing product detail pages (PDPs) to enhance clarity, reduce friction, and drive conversions.",
  },
  {
    label: "Problem Space",
    body: "Key product information, such as attachments and use cases, was buried deep in the PDP, causing user confusion and reducing conversion rates. Customers struggled to understand Theragun's unique value, especially compared to cheaper alternatives, which hurt purchasing confidence and revenue.",
  },
  {
    label: "Solution",
    body: "Using RICE scoring, I prioritized high-impact A/B tests to address key pain points. My approach included reorganizing critical information, simplifying content, and adding comparison tools to help users make confident purchasing decisions. All changes leveraged CMS capabilities to minimize engineering resources while maximizing impact.",
  },
  {
    label: "Impact",
    body: "+15% increase in PDP conversion rates, +31% boost in revenue per visitor, and improved user engagement by addressing customer pain points and simplifying the shopping experience.",
  },
];

const designGoals = [
  { icon: "/work/therabody/icon-goal-1.svg", text: "Highlight Theragun's unique benefits to justify its price." },
  { icon: "/work/therabody/icon-goal-2.svg", text: "Reorganize critical features for better visibility and skimmability." },
  { icon: "/work/therabody/icon-goal-3.svg", text: "Work within CMS constraints and design tests myself to deliver results quickly." },
];

const tests = [
  {
    label: "Test #1",
    hypothesis:
      "Moving the attachments section closer to the add-to-cart button would improve user focus on purchasing decisions.",
    execution:
      "Updated the page layout using the CMS to reposition the section just below the fold.",
    stats: [
      { value: "+15%", label: "increase in PDP conversion rate" },
      { value: "+12%", label: "boost in revenue per visitor" },
    ],
    image: "/work/therabody/test1.png",
    imageWidth: 656,
    imageHeight: 315,
  },
  {
    label: "Test #2",
    hypothesis:
      "Simplifying the app block would make its benefits clearer and improve engagement.",
    execution:
      "Replaced a busy animation with static app screen imagery and a clear headline using CMS tools.",
    stats: [
      { value: "+22%", label: "increase in PDP conversion rate" },
      { value: "+31%", label: "boost in revenue per visitor" },
    ],
    image: "/work/therabody/test2.png",
    imageWidth: 656,
    imageHeight: 459,
  },
  {
    label: "Test #3",
    hypothesis:
      "Adding a modal to compare Elite and PRO Theragun models would help users make informed decisions.",
    execution:
      "Implemented a modal using pre-built CMS components to allow on-page comparisons.",
    stats: [
      { value: "+12%", label: "increase in PDP conversion rate" },
      { value: "+13%", label: "boost in revenue per visitor" },
    ],
    image: "/work/therabody/test3.png",
    imageWidth: 656,
    imageHeight: 249,
  },
];

const learnings = [
  {
    q: "Scrappy solutions work",
    a: "I didn't need a full engineering build to prove or disprove a hypothesis — CMS-level changes were enough to move real metrics fast.",
  },
  {
    q: "Value of data-driven decisions",
    a: "RICE scoring kept the roadmap honest about what to test first, instead of chasing the loudest opinion in the room.",
  },
  {
    q: "User-centered design wins",
    a: "The tests that performed best were the ones that directly answered a confusion customers had already told us about in surveys.",
  },
  {
    q: "Adaptability matters",
    a: "Not every test won outright, and the follow-up design shows the process kept iterating even after the initial result.",
  },
];

const related = caseStudies
  .filter((s) => s.slug !== "therabody")
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

export default function TherabodyCaseStudy() {
  return (
    <>
      <Nav />
      <main className="flex w-full flex-col items-center">
        <PrevNext slug="therabody" />

        <SectionShell>
          <div className="mx-auto w-full max-w-[513px]">
            <FullImage
              src="/work/therabody/hero-devices.png"
              width={1024}
              height={888}
              rounded={false}
            />
          </div>
        </SectionShell>

        <CaseStudyHero
          logo="/work/therabody/hero-logo.png"
          logoWidth={512}
          logoHeight={101}
          columnGap={40}
          detailsWidth={248}
          detailsGap={40}
          eyebrow="Responsive Web Growth Experimentation • 2022"
          title={
            <>
              Optimizing Therabody&rsquo;s PDP: Driving growth through
              iterative testing
            </>
          }
          paragraphs={[
            "I optimized product detail pages through targeted A/B testing, increasing conversion rates by 12-15% and revenue per visitor by over 30%, while minimizing engineering needs.",
          ]}
          details={[
            { label: "Role", value: "Product Designer" },
            {
              label: "Team",
              value: (
                <>
                  Product Owner
                  <br />
                  Outsourced Engineering
                  <br />
                  QA Engineer
                </>
              ),
            },
            { label: "Timeframe", value: "~1-2 months" },
            { label: "Site reach", value: "~400k globally" },
          ]}
        />

        <SectionShell>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {infoCards.map((c) => (
              <div key={c.label} className="flex flex-col gap-4">
                <p className="text-lg font-semibold tracking-[0.18px] text-ink">
                  {c.label}
                </p>
                <p className="text-base tracking-[0.2px] text-ink-soft">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </SectionShell>

        <SectionShell>
          <div className="flex flex-col items-center gap-16 md:flex-row md:items-start md:gap-[72px]">
            <div className="flex flex-1 flex-col gap-6">
              <Eyebrow>STEP ONE</Eyebrow>
              <SectionHeading>
                Analyze qualitative and quantitative data
              </SectionHeading>
              <p className="text-lg font-semibold tracking-[0.18px] text-ink-soft">
                I categorized insights in Airtable to identify and prioritize
                top pain points.
              </p>
              <ul className="flex list-disc flex-col gap-4 pl-6 text-base tracking-[0.2px] text-muted">
                <li>
                  Post-purchase surveys revealed customers struggled to
                  understand Theragun&rsquo;s value versus cheaper
                  alternatives, seeking clearer explanations of its benefits
                  and use cases.
                </li>
                <li>
                  The PDP was cluttered, with critical details like
                  attachments buried at the bottom. Customers experienced
                  &ldquo;scroll fatigue,&rdquo; reducing conversions.{" "}
                  <em>
                    In the heat and click maps to the right, the attachments
                    section in particular was a key area of confusion for
                    customers but it lived at the very bottom of the page,
                    getting little engagement.
                  </em>
                </li>
                <li>
                  A lack of relatable imagery and practical examples
                  diminished the product&rsquo;s premium appeal.
                </li>
              </ul>
            </div>
            <div className="w-full max-w-[331px]">
              <FullImage
                src="/work/therabody/heatmap.png"
                width={331}
                height={768}
              />
            </div>
          </div>
        </SectionShell>

        <SectionShell>
          <div className="flex flex-col gap-10 md:flex-row">
            <div className="flex flex-col gap-1 md:w-[400px] md:shrink-0">
              <Eyebrow>personas</Eyebrow>
              <h2 className="text-[40px] leading-[1.15] tracking-[-0.56px] text-ink">
                Who I was designing for
              </h2>
            </div>
            <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-black/[0.08] bg-white shadow-[0px_2px_8px_1px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-4 bg-purple/10 p-6">
                <div className="flex size-[54px] shrink-0 items-center justify-center rounded-lg bg-purple/35">
                  <img
                    src="/work/therabody/icon-persona.svg"
                    alt=""
                    className="size-8 object-contain"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold tracking-[0.18px] text-ink">
                    The Everyday Pain Sufferer
                  </p>
                  <p className="text-base tracking-[0.2px] text-ink-soft">
                    Deals with chronic pain, recovery needs, or occasional
                    discomfort. Likely middle-aged or older.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 p-6">
                <div>
                  <p className="text-base font-semibold text-ink-soft">
                    Motivation
                  </p>
                  <p className="text-base tracking-[0.2px] text-ink-soft">
                    Wants an effective, easy-to-use solution for pain relief.
                    Trusts doctor recommendations.
                  </p>
                </div>
                <div>
                  <p className="text-base font-semibold text-ink-soft">
                    Behavior
                  </p>
                  <p className="text-base tracking-[0.2px] text-ink-soft">
                    Researches why Theragun is better than cheaper
                    alternatives. Reads reviews before buying.
                  </p>
                </div>
                <div>
                  <p className="text-base font-semibold text-ink-soft">
                    Pain Points
                  </p>
                  <p className="text-base tracking-[0.2px] text-ink-soft">
                    Overwhelmed by technical jargon and pricing concerns.
                    Unsure if it&rsquo;s worth the investment.
                  </p>
                </div>
                <div>
                  <p className="text-base font-semibold text-ink-soft">
                    Design Consideration
                  </p>
                  <p className="text-base tracking-[0.2px] text-ink-soft">
                    Needs clear, simple explanations of benefits without
                    heavy technical language.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell>
          <h2 className="mx-auto max-w-[700px] text-center text-[40px] leading-[1.15] tracking-[-0.56px] text-ink">
            How might we…
          </h2>
          <p className="mx-auto max-w-[700px] text-center text-base tracking-[0.2px] text-ink-soft">
            Create a PDP that drives engagement and conversion by enabling
            confident purchases while minimizing engineering reliance?
          </p>
        </SectionShell>

        <SectionShell>
          <Eyebrow>STEP TWO</Eyebrow>
          <h2 className="text-[40px] leading-[1.15] tracking-[-0.56px] text-ink">
            Test out ideas
          </h2>

          <p className="text-xl font-medium text-ink">My design goals</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-16">
            {designGoals.map((g) => (
              <div key={g.text} className="flex items-start gap-2">
                <img
                  src={g.icon}
                  alt=""
                  className="size-6 shrink-0 object-contain"
                />
                <p className="text-base tracking-[0.2px] text-ink-soft">
                  {g.text}
                </p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xl font-medium text-ink">Hypothesis</p>
            <p className="pt-2 text-base tracking-[0.2px] text-ink-soft">
              If we redesign the PDP to prioritize mobile-first usability,
              showcase product benefits through engaging multimedia content,
              and streamline information architecture, then we will increase
              user engagement, improve conversion rates, and enhance
              customer satisfaction.
            </p>
          </div>

          {tests.map((t) => (
            <div key={t.label} className="flex flex-col gap-6 border-t border-black/[0.16] py-8 md:flex-row md:gap-16">
              <div className="flex flex-1 flex-col gap-4">
                <p className="text-xl font-medium text-ink">{t.label}</p>
                <p className="text-base tracking-[0.2px] text-ink-soft">
                  <span className="font-semibold">Hypothesis:</span>{" "}
                  {t.hypothesis}
                </p>
                <p className="text-base tracking-[0.2px] text-ink-soft">
                  <span className="font-semibold">Execution:</span>{" "}
                  {t.execution}
                </p>
                <div className="flex gap-12">
                  {t.stats.map((s) => (
                    <div key={s.label}>
                      <p className="text-xl font-medium text-ink">
                        {s.value}
                      </p>
                      <p className="max-w-[200px] text-base tracking-[0.2px] text-ink-soft">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <FullImage
                  src={t.image}
                  width={t.imageWidth}
                  height={t.imageHeight}
                  rounded={false}
                />
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-6 border-t border-black/[0.16] pt-8 md:flex-row md:gap-16">
            <div className="flex flex-1 flex-col gap-4">
              <p className="text-xl font-medium text-ink">
                Follow up design
              </p>
              <p className="text-base font-semibold tracking-[0.2px] text-ink-soft">
                Moving the section higher proved successful, but the design
                was outdated and required too much friction to quickly view
                all attachments.
              </p>
              <p className="text-base tracking-[0.2px] text-ink-soft">
                I worked on a new component for the carousel that was
                implemented after I had left to improve usability and visual
                UI.
              </p>
            </div>
            <div className="flex-1">
              <FullImage
                src="/work/therabody/followup.png"
                width={1024}
                height={488}
                rounded={false}
              />
            </div>
          </div>
        </SectionShell>

        <SectionShell bg="linear-gradient(to bottom, rgba(202,187,233,0.4), rgba(179,222,193,0.4))">
          <h2 className="mx-auto max-w-[700px] text-center text-[40px] leading-[1.15] tracking-[-0.56px] text-ink">
            Learnings and takeaways
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {learnings.map((l) => (
              <div
                key={l.q}
                className="flex flex-col gap-2 rounded-2xl bg-white p-6"
              >
                <p className="text-base tracking-[0.2px] text-ink-soft">
                  {l.q}
                </p>
                <p className="text-sm tracking-[0.2px] text-muted">{l.a}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto max-w-[700px] text-base tracking-[0.2px] text-ink-soft">
            I applied these learnings to{" "}
            <strong>redesign the cart</strong> and checkout experience,
            focusing on simplifying the buy online, pick up in-store flow to
            reduce friction and improve the customer journey.
          </p>
        </SectionShell>

        <KeepReading cases={related} />
      </main>
      <Footer />
    </>
  );
}
