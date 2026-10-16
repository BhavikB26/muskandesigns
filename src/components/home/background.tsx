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


export function Background() {
  return (
    <section id="about" aria-labelledby="about-heading" className="w-full scroll-mt-20 px-page pt-fr-section md:pt-[144px]">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-fr-xxl md:grid-cols-12 md:gap-x-fr-xxl lg:gap-x-[72px]">
        <div data-reveal className="md:col-span-5">
          {/* Polaroid-style portrait, as on the live site. */}
          <figure className="relative mx-auto w-[min(78vw,400px)] -rotate-2 rounded-fr-sm bg-white p-fr-sm pb-14 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] ring-1 ring-black/5 md:sticky md:top-28 md:w-full md:max-w-[440px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
              <Image
                src="/home/muskan-portrait-full.webp"
                alt="Muskan Bhatia smiling, standing by a painted wall"
                fill
                sizes="(min-width: 768px) 440px, 78vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
            {/* The "Hi" bubble that waves (after mishikasbubble.framer.website). */}
            <span aria-hidden className="wave-bubble absolute -bottom-8 -left-8 flex size-24 rotate-2 items-center justify-center rounded-full bg-[var(--gem-amethyst)] text-white shadow-[0_18px_40px_-16px_rgba(58,40,170,0.7)] md:size-28">
              <span className="wave-hi font-display text-[32px] font-semibold md:text-[38px]">Hi</span>
              <span className="wave-hand absolute text-[38px] md:text-[44px]">👋</span>
            </span>
          </figure>
        </div>

        <div className="flex flex-col gap-fr-xxl md:col-span-7">
          <div data-reveal className="flex flex-col gap-fr-lg">
                        <h2 id="about-heading" className="t-display-xl">
              <MaskedText text={about.headline.lead} onReveal />{" "}
              <em className="font-serif text-[0.96em] font-normal italic tracking-[-0.03em] text-ink">
                <MaskedText text={about.headline.italic} start={about.headline.lead.split(" ").length} onReveal />
              </em>
            </h2>
            <ul className="flex flex-wrap gap-fr-xs">
              {about.chips.map((c) => (
                <li
                  key={c.label}
                  className="tinted t-body-sm flex items-center gap-fr-xs rounded-fr-sm px-fr-sm py-fr-xs text-ink"
                  style={{ "--tint": c.tint } as React.CSSProperties}
                >
                  <ChipIcon name={c.icon} />
                  {c.label}
                </li>
              ))}
            </ul>
            <div className="t-body-lg flex max-w-[60ch] flex-col gap-fr-md text-ink">
              {about.paragraphs.map((t) => (
                <p key={t.slice(0, 20)}>{t}</p>
              ))}
            </div>
          </div>

          <dl data-reveal className="grid grid-cols-3 gap-fr-lg border-t border-line pt-fr-lg">
            {about.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-fr-xxs">
                <dt className="t-body-sm text-muted">{s.label}</dt>
                <dd className="font-display text-[clamp(2.2rem,1.6rem+2vw,3.4rem)] font-semibold leading-none tracking-[-0.03em] text-accent">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div data-reveal className="flex flex-wrap gap-fr-xs">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Resume (PDF)<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href="#journey" className="btn btn-secondary">My journey</a>
          </div>
        </div>
      </div>
    </section>
  );
}
