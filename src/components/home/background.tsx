import Image from "next/image";

type Row = { when: string; where: string; what: string };

// Matches the resume (Muskan Bhatia aug '26.pdf). Newest first.
const timeline: Row[] = [
  { when: "Jan 2025 – Apr 2026", where: "Global social platform", what: "Product Designer (contract)" },
  { when: "Mar – Sep 2024", where: "Builder.ai", what: "Product Designer" },
  { when: "Oct – Dec 2023", where: "Preplaced", what: "Product Designer" },
  { when: "Jun – Aug 2023", where: "Elda Health", what: "Product Design Intern" },
  { when: "2018 – 2022", where: "SRM Institute of Science & Technology", what: "B.Tech, Computer Science" },
];

const chips = [
  { label: "B.Tech, Computer Science", tint: "#fbe7e5" },
  { label: "Product designer", tint: "#ebe8f8" },
  { label: "Based in India", tint: "#e6f2ea" },
];

const strengths = ["UX & product design", "UI & visual design", "Prototyping", "Design systems", "Product thinking", "Working with engineers & PMs"];

export function Background() {
  return (
    <section id="about" aria-labelledby="about-heading" className="w-full scroll-mt-20 px-page pt-28 md:pt-40">
      <div className="mx-auto grid w-full max-w-[1760px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div data-reveal className="md:col-span-5">
          {/* Polaroid-style portrait, as on the live site. */}
          <figure className="mx-auto w-[min(78vw,400px)] -rotate-2 rounded-[6px] bg-white p-3 pb-14 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] ring-1 ring-black/5 md:sticky md:top-28 md:w-full md:max-w-[440px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
              <Image
                src="/home/muskan-portrait-full.webp"
                alt="Muskan Bhatia smiling, standing by a painted wall"
                fill
                sizes="(min-width: 768px) 440px, 78vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
          </figure>
        </div>

        <div className="flex flex-col gap-12 md:col-span-7">
          <div data-reveal className="flex flex-col gap-6">
            <p className="label-mono text-muted">(02) About</p>
            <h2 id="about-heading" className="font-display text-[clamp(2.2rem,1.4rem+2.8vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.045em]">
              A little background, if you&rsquo;re{" "}
              <em className="font-serif text-[1.06em] font-normal italic tracking-[-0.01em] text-accent">still here</em>
            </h2>
            <ul className="flex flex-wrap gap-2">
              {chips.map((c) => (
                <li
                  key={c.label}
                  className="tinted rounded-full px-3.5 py-1.5 text-[14px] font-medium text-ink ring-1 ring-line"
                  style={{ "--tint": c.tint } as React.CSSProperties}
                >
                  {c.label}
                </li>
              ))}
            </ul>
            <div className="flex max-w-[60ch] flex-col gap-4 text-[clamp(1.05rem,1rem+0.25vw,1.2rem)] leading-[1.6] text-ink-soft">
              <p>
                I&rsquo;ve always been better at making things than explaining myself. Design was the first place that
                made sense to me: a blank page doesn&rsquo;t need you to perform, it just needs you to be honest.
              </p>
              <p>
                I came to product design from computer science, so I care about how something gets built as much as how
                it looks. Right now I&rsquo;m focused on accessibility and inclusive design.
              </p>
            </div>
          </div>

          <div data-reveal className="flex flex-col gap-4 border-t border-line pt-6">
            <p className="label-mono text-muted">Where I&rsquo;ve been</p>
            <ol className="flex flex-col">
              {timeline.map((r) => (
                <li key={r.where} className="grid grid-cols-1 gap-1 border-b border-line py-4 text-[16px] last:border-b-0 sm:grid-cols-[170px_1fr] sm:gap-6">
                  <span className="text-muted">{r.when}</span>
                  <span>
                    <span className="font-medium text-ink">{r.where}</span>
                    <span className="text-ink-soft"> · {r.what}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div data-reveal className="flex flex-col gap-4 border-t border-line pt-6">
            <p className="label-mono text-muted">Things I lean on</p>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 text-[16px] sm:grid-cols-2">
              {strengths.map((s) => (
                <li key={s} className="flex items-center gap-3">
                  <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
