import { MaskedText } from "@/components/masked-text";
import Image from "next/image";
import { about } from "@/content/about";

/** Simple line icons for the chips (drawn for this site). */
function ChipIcon({ name }: { name: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-[18px] shrink-0">
      {name === "puzzle" && <path {...p} d="M9 4h3v2a2 2 0 1 0 4 0V4h3v5h-2a2 2 0 1 0 0 4h2v7h-6v-2a2 2 0 1 0-4 0v2H4v-6h2a2 2 0 1 0 0-4H4V4z" />}
      {name === "cancer" && (
        <g {...p}>
          <circle cx="7.5" cy="9" r="2.6" />
          <circle cx="16.5" cy="15" r="2.6" />
          <path d="M10 9c2-3.4 7-3.6 10-1.2M14 15c-2 3.4-7 3.6-10 1.2" />
        </g>
      )}
      {name === "brain" && <path {...p} d="M12 5.5a3 3 0 0 0-5.6-1.3A3 3 0 0 0 4 9a3 3 0 0 0 .7 5.4A3.3 3.3 0 0 0 9 18.6a3 3 0 0 0 3 1.4M12 5.5a3 3 0 0 1 5.6-1.3A3 3 0 0 1 20 9a3 3 0 0 1-.7 5.4 3.3 3.3 0 0 1-4.3 4.2 3 3 0 0 1-3 1.4M12 5.5V20" />}
    </svg>
  );
}

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
            <h2 id="about-heading" className="font-display text-[clamp(2.2rem,1.4rem+2.8vw,4.25rem)] font-medium leading-[1.04] tracking-[0.01em]">
              <MaskedText text={about.headline.lead} onReveal />{" "}
              <em className="font-serif text-[1.06em] font-normal italic tracking-[-0.01em] text-accent">
                <MaskedText text={about.headline.italic} start={about.headline.lead.split(" ").length} onReveal />
              </em>
            </h2>
            <ul className="flex flex-wrap gap-2.5">
              {about.chips.map((c) => (
                <li
                  key={c.label}
                  className="tinted flex items-center gap-2 rounded-[8px] px-3 py-2 text-[15px] font-semibold text-ink ring-1 ring-line"
                  style={{ "--tint": c.tint } as React.CSSProperties}
                >
                  <ChipIcon name={c.icon} />
                  {c.label}
                </li>
              ))}
            </ul>
            <div className="flex max-w-[60ch] flex-col gap-4 text-[clamp(1.05rem,1rem+0.25vw,1.2rem)] leading-[1.6] text-ink-soft">
              {about.paragraphs.map((t) => (
                <p key={t.slice(0, 20)}>{t}</p>
              ))}
            </div>
          </div>

          <div data-reveal className="flex flex-col gap-4 border-t border-line pt-6">
            <p className="label-mono text-muted">Things I lean on</p>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 text-[16px] sm:grid-cols-2">
              {strengths.map((s) => (
                <li key={s}>
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
