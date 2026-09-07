import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CaseStudyHero } from "@/components/work/case-study-hero";
import { PrevNext } from "@/components/work/prev-next";
import {
  SectionShell,
  Eyebrow,
  SectionHeading,
  BodyText,
  FullImage,
  TwoColImageText,
  PersonaCards,
  ABTestPair,
  StatRow,
  KeepReading,
} from "@/components/work/sections";
import { ImageCarousel } from "@/components/work/image-carousel";
import { FaqAccordion } from "@/components/faq-accordion";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Gusto — Muskan Designs",
  description:
    "Boosting Gusto's signup flow: 15% conversion growth via iterative testing.",
};

const faqs = [
  {
    q: "What inspired the \"How Gusto Works\" CTA and content placement?",
    a: "Our research showed users wanted to understand Gusto's value upfront. The \"How Gusto Works\" CTA provided key product information in a concise format, which reduced friction and improved conversion rates by addressing user concerns before they signed up.",
  },
  {
    q: "How did you ensure the redesign wouldn't negatively impact the user journey?",
    a: "I carefully tested each iteration and used a phased approach to measure impact. By observing user behavior through tools like Fullstory, I was able to adjust quickly if issues arose, ensuring that the redesign improved rather than hindered the experience.",
  },
  {
    q: "How did you prioritize what information to include in the lead form experience?",
    a: "I carefully tested each iteration and used a phased approach to measure impact. By observing user behavior through tools like Fullstory, I was able to adjust quickly if issues arose, ensuring that the redesign improved rather than hindered the experience.",
  },
];

const related = caseStudies
  .filter((s) => s.slug !== "gusto")
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

export default function GustoCaseStudy() {
  return (
    <>
      <Nav />
      <main className="flex w-full flex-col items-center">
        <PrevNext slug="gusto" />

        <SectionShell>
          <FullImage
            src="/work/gusto/hero-devices.png"
            width={1376}
            height={666}
            rounded={false}
          />
        </SectionShell>

        <CaseStudyHero
          logo="/work/gusto/hero-logo.png"
          logoWidth={512}
          logoHeight={194}
          textFlex={1088.8}
          detailsFlex={612.8}
          eyebrow="Responsive Web Growth Experimentation"
          title={
            <>
              Boosting Gusto&rsquo;s signup flow: 15% conversion growth via
              iterative testing
            </>
          }
          paragraphs={[
            "I drove business growth by redesigning Gusto's signup funnel, introducing a password-free lead form, tailoring content to user needs, and optimizing the funnel through phased A/B testing. These changes increased lead conversion, improved Sales handoff, and strengthened our MQL pipeline.",
            "This work reinforced the value of lean UX and thoughtful testing. Even with limited resources, I was able to deliver measurable growth by aligning stakeholders, using CMS tools effectively, and designing experiences that met users where they were.",
          ]}
          details={[
            { label: "Role", value: "Product Designer" },
            { label: "Timeframe", value: "~3 months" },
            {
              label: "Team",
              value: (
                <>
                  Product Manager
                  <br />
                  Head of Web Marketing
                  <br />
                  Software Engineers (2)
                </>
              ),
            },
            { label: "Site Reach", value: "~200k organic" },
          ]}
        />

        <SectionShell bg="linear-gradient(to bottom, rgba(255,173,173,0.7), rgba(202,187,233,0.7))">
          <Eyebrow>Up first…</Eyebrow>
          <SectionHeading center>
            Audit the original flow and identify key pain points and areas of
            opportunity
          </SectionHeading>
          <FullImage
            src="/work/gusto/audit-flow.png"
            width={1376}
            height={554}
            rounded={false}
          />
          <p className="text-center text-[13px] italic tracking-[0.13px] text-muted">
            From left to right: Homepage (Organic visitors) → Survey →
            Account Creation (also becomes a Sales Lead) → Email Verification
          </p>
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex-1 rounded-2xl bg-white px-6 py-4 text-base tracking-[0.2px] text-ink-soft">
              Drop-off in onboarding was too high, upwards of 25%
            </div>
            <div className="flex-1 rounded-2xl bg-white px-6 py-4 text-base tracking-[0.2px] text-ink-soft">
              Users who were not ready to commit had no way of becoming a
              lead
            </div>
          </div>
        </SectionShell>

        <SectionShell>
          <TwoColImageText
            heading="Turning data into design opportunities"
            body={
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl bg-pink/[0.15] p-6 text-base tracking-[0.2px] text-ink-soft">
                  Homepage data showed most users bounced after one page. I
                  prioritized redesigns to reduce drop-off and boost lead
                  capture by 5%+.
                </div>
                <div className="rounded-2xl bg-purple/[0.16] p-6 text-base tracking-[0.2px] text-ink-soft">
                  A diary study revealed small biz owners needed time to
                  compare options—something our fast-track sign-up
                  didn&rsquo;t allow.
                </div>
              </div>
            }
            image="/work/gusto/shopping-journey-board.png"
            imageWidth={656}
            imageHeight={363}
            reverse
          />
        </SectionShell>

        <SectionShell>
          <SectionHeading>Who I was designing for</SectionHeading>
          <PersonaCards
            cards={[
              {
                icon: "/work/gusto/icon-persona-smallbiz.svg",
                iconBg: "bg-green/35",
                title: "The Small Business Owner",
                body: "New to payroll; overwhelmed by compliance. Needed clarity and step-by-step support.",
              },
              {
                icon: "/work/gusto/icon-persona-startup.svg",
                iconBg: "bg-pink/35",
                title: "The Growing Startup Founder",
                body: "Scaling fast; tech-savvy. Needed robust automation and integration info.",
              },
            ]}
          />
        </SectionShell>

        <SectionShell>
          <SectionHeading center>How might we …</SectionHeading>
          <p className="mx-auto max-w-[700px] text-center text-base tracking-[0.2px] text-ink-soft">
            Bridge the gap between account creation and payroll initiation to
            increase organic visits converting to quality leads, that
            actually run payroll?
          </p>
        </SectionShell>

        <SectionShell>
          <SectionHeading>
            Brainstorming with impact: Designing a better entry point
          </SectionHeading>
          <BodyText>
            <p className="font-semibold text-ink-soft">Design hypothesis:</p>
            <p>
              If we reduce friction upfront and give users more context
              before asking them to commit, more of them will convert—either
              as leads or full signups.
            </p>
            <p>
              I partnered with my PM to rethink the early shopping journey.
              Instead of forcing account creation, we tested lower-friction
              paths that aligned better with how small business owners
              actually make decisions.
            </p>
            <p className="font-semibold text-ink-soft">Key design goals:</p>
          </BodyText>
          <ul className="flex max-w-[700px] list-disc flex-col gap-1 pl-6 text-base tracking-[0.2px] text-muted">
            <li>Capture interest with low-commitment CTAs</li>
            <li>Let users explore the product without pressure</li>
            <li>Support Sales with better-qualified leads</li>
            <li>Make conversion feel natural—not forced</li>
          </ul>
          <div className="flex max-w-[700px] flex-col gap-2 pt-4">
            <p className="text-xl font-medium text-ink">
              But progress required tradeoffs.
            </p>
            <p className="text-base tracking-[0.2px] text-muted">
              I faced pushback, ran scrappy A/B tests, and worked around
              tight constraints. So I pitched a phased approach focused on
              lightweight, high-impact UX changes based on behavioral
              insights.
            </p>
          </div>
          <div className="flex flex-col gap-6 pt-4">
            <p className="text-base font-semibold tracking-[0.2px] text-ink-soft">
              My 4-step solution:
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              {[
                "Split intent with dual CTAs",
                "Add password-free lead form pre-sign up",
                "Only show content the user asked for",
                "Replace content with an interactive Sales demo",
              ].map((step, i) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="text-2xl font-semibold text-pink">
                    {i + 1}
                  </span>
                  <p className="text-base font-semibold tracking-[0.2px] text-ink-soft">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell bg="linear-gradient(to bottom, rgba(255,173,173,0.4), rgba(255,173,173,0.7))">
          <FullImage
            src="/work/gusto/create-account-flow.png"
            width={1376}
            height={554}
            rounded={false}
          />
        </SectionShell>

        <SectionShell>
          <Eyebrow>my process</Eyebrow>
          <SectionHeading>
            Design and test lead capture funnels, no sign-up required
          </SectionHeading>
          <BodyText>
            <p className="font-semibold text-ink-soft">Problem:</p>
            <p>
              Most visitors dropped off before creating an account. We needed
              a way to let them explore without committing upfront.
            </p>
            <p className="font-semibold text-ink-soft">What I did:</p>
            <p>
              I introduced a new primary CTA,{" "}
              <strong>&ldquo;How Gusto Works,&rdquo;</strong> so users could
              self-educate or connect with Sales before signing up.
              Meanwhile, high-intent users still had access to the
              traditional &ldquo;Create Account&rdquo; path.
            </p>
            <p className="font-semibold text-ink-soft">
              How the new flow worked:
            </p>
          </BodyText>
          <ul className="flex max-w-[700px] list-disc flex-col gap-1 pl-6 text-base tracking-[0.2px] text-muted">
            <li>Users selected only the features they cared about</li>
            <li>
              Submitted lead info <strong>(no password required)</strong>
            </li>
            <li>Saw personalized product content based on intent</li>
            <li>Then chose to sign up, talk to Sales, or just keep exploring</li>
          </ul>
          <BodyText>
            <p className="font-semibold text-ink-soft">Why it worked:</p>
            <p>
              This lowered friction, helped Sales capture more leads, and met
              users where they were in their decision-making journey, so
              that when they were instructed to create an account, they were
              more confident in their decision.
            </p>
            <p>
              I built the flow using CMS components for speed and worked
              closely with Sales, PMM, and Brand to align content and
              messaging across the funnel.
            </p>
          </BodyText>

          <ABTestPair
            control="/work/gusto/ab-1-control.png"
            variation="/work/gusto/ab-1-variation.png"
            controlWidth={644}
            controlHeight={298}
            variationWidth={644}
            variationHeight={298}
          />

          <p className="text-lg font-semibold tracking-[0.18px] text-ink-soft">
            What users saw after clicking &ldquo;How Gusto Works&rdquo;
          </p>
          <div className="flex w-full flex-col gap-6 md:flex-row md:gap-16">
            <div className="flex flex-col gap-2 md:w-[194px]">
              <p className="text-[13px] italic tracking-[0.13px] text-muted">
                Mobile
              </p>
              <FullImage
                src="/work/gusto/howworks-mobile.png"
                width={162}
                height={748}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <p className="text-[13px] italic tracking-[0.13px] text-muted">
                Desktop
              </p>
              <FullImage
                src="/work/gusto/howworks-desktop.png"
                width={572}
                height={663}
              />
            </div>
          </div>

          <p className="text-lg font-semibold tracking-[0.18px] text-ink-soft">
            &ldquo;At the end of the series, if they were ready to create
            their account, all they had to do was create a password.
            Everything else was already filled in.&rdquo;
          </p>
          <div className="flex w-full flex-col gap-6 md:flex-row md:gap-16">
            <div className="flex flex-col gap-2 md:w-[200px]">
              <p className="text-[13px] italic tracking-[0.13px] text-muted">
                Mobile
              </p>
              <FullImage
                src="/work/gusto/final-mobile.png"
                width={168}
                height={738}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <p className="text-[13px] italic tracking-[0.13px] text-muted">
                Desktop
              </p>
              <FullImage
                src="/work/gusto/final-desktop.png"
                width={1080}
                height={801}
              />
            </div>
          </div>

          <ImageCarousel
            caption='What they saw after clicking "Let’s go"'
            images={[
              "/work/gusto/carousel-1.png",
              "/work/gusto/carousel-2.png",
              "/work/gusto/carousel-3.png",
              "/work/gusto/carousel-4.png",
              "/work/gusto/carousel-5.png",
              "/work/gusto/carousel-6.png",
            ]}
            width={1171}
            height={580}
          />

          <SectionHeading>
            Testing variations and learning fast
          </SectionHeading>
          <BodyText>
            <p>
              I worked with Sales to define better qualifying questions and
              used Workbench components to keep it fast and scalable.
            </p>
          </BodyText>
          <ABTestPair
            control="/work/gusto/ab-2-control.png"
            variation="/work/gusto/ab-2-variation.png"
            controlWidth={1192}
            controlHeight={1364}
            variationWidth={857}
            variationHeight={2048}
          />

          <p className="max-w-[700px] text-base tracking-[0.2px] text-muted">
            I then expanded the flow to the global navigation, changing that
            CTA with the new &ldquo;How Gusto Works&rdquo; flow, increasing
            traffic to the journey by 80% and driving more high-quality
            leads.
          </p>
          <ABTestPair
            control="/work/gusto/ab-3-control.png"
            variation="/work/gusto/ab-3-variation.png"
            controlWidth={1024}
            controlHeight={89}
            variationWidth={1024}
            variationHeight={87}
          />
        </SectionShell>

        <SectionShell bg="linear-gradient(to bottom, rgba(202,187,233,0.7), rgba(179,222,193,0.7))">
          <SectionHeading>Analyze impact</SectionHeading>
          <BodyText>
            <p>
              Adding friction to account creation while lowering the barrier
              to becoming a lead proved more effective than combining lead
              capture and account creation into one step. From our last
              round of testing, we saw:
            </p>
          </BodyText>
          <StatRow
            stats={[
              { value: "+15%", label: "visits converting to leads" },
              { value: "+25%", label: "increase in account creations" },
              {
                value: "+1,000",
                label: "new businesses running payroll each month",
              },
            ]}
          />
        </SectionShell>

        <FaqAccordion title="Have questions?" items={faqs} />

        <KeepReading cases={related} />
      </main>
      <Footer />
    </>
  );
}
