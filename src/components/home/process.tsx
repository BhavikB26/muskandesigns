import type { ReactNode } from "react";

type Step = {
  icon: string;
  lineColor: string;
  title: string;
  body: ReactNode;
};

const steps: Step[] = [
  {
    icon: "/home/icon-process-1.png",
    lineColor: "bg-pink",
    title: "Understand and align",
    body: (
      <>
        I don&rsquo;t just ask questions, I ask the <em>right</em> questions.
        I dig into user psychology, business constraints, team dynamics, and
        market signals to uncover what&rsquo;s really going on. I turn
        scattered insights, fuzzy ideas, and half-baked goals into clear,
        focused direction. If a brief doesn&rsquo;t exist, I&rsquo;ll help
        build it. If the strategy is murky, I&rsquo;ll clarify it. That&rsquo;s
        where the work <em>really</em> starts.
      </>
    ),
  },
  {
    icon: "/home/icon-process-2.png",
    lineColor: "bg-purple",
    title: "Design and collaborate",
    body: (
      <>
        I move from strategy to systems with speed and intention. Every
        screen I design is grounded in business goals, user insights, and
        practical constraints. I annotate clearly and structure files so
        cross-functional teams can easily follow along. I believe in
        collaboration that&rsquo;s honest and proactive, not just checking a
        box. You&rsquo;ll always know <em>why</em> I made a design decision,
        not just <em>what</em> I did.
      </>
    ),
  },
  {
    icon: "/home/icon-process-3.png",
    lineColor: "bg-green",
    title: "Test and adapt",
    body: (
      <>
        My work doesn&rsquo;t have to stop at the handoff. I validate designs
        through experimentation, testing, and ongoing iteration. Whether
        it&rsquo;s an A/B test, a usability study, or post-launch analysis, I
        believe in learning fast and improving faster. I&rsquo;m not afraid
        to change direction when the data demands it. I make sure insights
        feed directly into the next round of work.
      </>
    ),
  },
];

export function Process() {
  return (
    <section className="flex w-full flex-col items-start gap-10 px-6 py-16 md:gap-16 md:px-[72px] md:py-[100px]">
      <h2 className="text-[32px] leading-[1.15] tracking-[-0.4px] text-ink-soft md:text-[40px] md:leading-[46px]">
        My design process
      </h2>
      <div className="flex w-full max-w-[800px] flex-col gap-10">
        {steps.map((step) => (
          <div key={step.title} className="flex gap-6">
            <div className="flex shrink-0 flex-col items-center gap-2.5">
              <img
                src={step.icon}
                alt=""
                className="size-11 object-contain"
              />
              <div className={`w-1 flex-1 rounded ${step.lineColor}`} />
            </div>
            <div className="flex flex-col items-start gap-2 pb-4">
              <h3 className="text-xl font-medium leading-[26px] text-ink">
                {step.title}
              </h3>
              <p className="text-base tracking-[0.2px] text-muted">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
