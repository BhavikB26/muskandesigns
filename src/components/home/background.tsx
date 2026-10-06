import type { ReactNode } from "react";

const isDev = process.env.NODE_ENV === "development";

type Row = { when: string; where: string; what: string; todo?: boolean };

// Only confirmed entries show on the live site. TODO rows show in `next dev` only.
const timeline: Row[] = [
  { when: "TODO: years", where: "TODO: college / university", what: "Degree in Computer Science", todo: true },
  // TODO(embee): add your design internship here if you want it on the timeline.
  { when: "Oct – Dec 2023", where: "Preplaced", what: "Product Designer" },
  { when: "Mar – Sep 2024", where: "Builder.ai", what: "Product Designer" },
];

const strengths = [
  "UX & product design",
  "UI & visual design",
  "Prototyping",
  "Design systems",
  "Product thinking",
  "Working with engineers & PMs",
];

function Row({ count, label, children }: { count: string; label: string; children: ReactNode }) {
  return (
    <div className="rise-on-scroll flex flex-col gap-8 border-t border-line pt-5 md:pt-6">
      <p className="flex items-center gap-3 text-[16px]">
        <span className="rounded-full bg-ink px-2.5 py-0.5 text-[12px] font-semibold text-white">{count}</span>
        {label}
      </p>
      <div className="md:pl-[33%]">{children}</div>
    </div>
  );
}

export function Background() {
  const rows = timeline.filter((r) => isDev || !r.todo);
  const companies = rows.filter((r) => r.where === "Preplaced" || r.where === "Builder.ai").length;

  return (
    <section id="about" aria-labelledby="about-heading" className="w-full scroll-mt-20 px-5 pt-28 md:px-10 md:pt-40">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-16 md:gap-20">
        <h2 id="about-heading" className="max-w-[640px] font-display text-[34px] leading-[1.08] tracking-[-0.8px] md:text-[44px] md:tracking-[-1.2px]">
          A little background, if you&rsquo;re still here
        </h2>

        <Row count={String(companies).padStart(2, "0")} label="Product teams I&rsquo;ve designed for">
          <div className="flex max-w-[720px] flex-col gap-5 text-[19px] leading-[1.55] md:text-[21px]">
            <p>
              I&rsquo;ve always been better at making things than explaining myself. Design was the first place that
              made sense to me: a blank page doesn&rsquo;t need you to perform, it just needs you to be honest.
            </p>
            <p className="text-muted">
              I came to product design from computer science, so I care about how something gets built as much as how
              it looks.
            </p>
            {isDev && (
              <p className="rounded-xl border border-dashed border-accent p-4 text-[15px] text-accent">
                TODO(embee): add what you&rsquo;re learning right now and the kind of teams and products you want to
                work on next. This note only shows in development.
              </p>
            )}
          </div>
        </Row>

        <Row count="Timeline" label="Where I&rsquo;ve been">
          <ol className="flex flex-col">
            {rows.map((r) => (
              <li
                key={r.where}
                className={`grid grid-cols-1 gap-1 border-b border-line/70 py-4 text-[17px] last:border-b-0 sm:grid-cols-[150px_1fr_1fr] sm:gap-6 ${
                  r.todo ? "text-accent" : ""
                }`}
              >
                <span className="text-muted">{r.when}</span>
                <span>{r.where}</span>
                <span>{r.what}</span>
              </li>
            ))}
          </ol>
        </Row>

        <Row count={String(strengths.length).padStart(2, "0")} label="Things I lean on">
          <ul className="grid grid-cols-1 gap-x-6 gap-y-3 text-[17px] sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Row>
      </div>
    </section>
  );
}
