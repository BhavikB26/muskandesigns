import Image from "next/image";
import { RollingHello } from "@/components/home/rolling-hello";
import { MaskedText } from "@/components/masked-text";
import { MotionToggle } from "@/components/motion";
import { Magnetic } from "@/components/magnetic";

// Headline text stays exactly: "I like orchestrating intentional designs."
const LEAD = "I like orchestrating";
const EMPHASIS = "intentional designs.";
const SKILLS = ["UX & product design", "UI & visual design", "Design systems", "Prototyping", "Product thinking", "Research", "Working with engineers"];

function Marquee() {
  const row = SKILLS.map((s) => (
    <span key={s} className="flex items-center gap-6 pr-6">
      {s}
      <span aria-hidden className="text-accent">
        ✦
      </span>
    </span>
  ));
  return (
    <div className="overflow-hidden border-y border-line py-4">
      <ul className="sr-only">
        {SKILLS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div aria-hidden className="marquee-track label-mono flex w-max text-ink-soft motion-reduce:w-auto motion-reduce:flex-wrap">
        <div className="flex">{row}</div>
        <div className="flex motion-reduce:hidden">{row}</div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-label="Introduction" className="flex w-full flex-col md:min-h-[calc(100svh-108px)]">
      <div className="px-page">
        <div className="mx-auto grid w-full max-w-[1760px] grid-cols-2 gap-4 border-t border-line pt-3 md:grid-cols-4">
          <p className="label-mono text-muted">(00) Intro</p>
          <p className="label-mono hidden text-muted md:block">Product designer</p>
          <p className="label-mono hidden text-muted md:block">UX · UI · Design systems</p>
          <p className="label-mono text-right text-muted">Case studies 01–08 ↓</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-page py-12 md:py-16">
        <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-8 md:gap-10">
          <div className="flex items-center gap-4 md:gap-7">
            {/* TODO(live-photo): swap in a short muted looping clip of Muskan here if she provides one. */}
            <div className="pop-in shrink-0 [perspective:700px]">
              <div className="portrait-swivel h-[87px] w-[66px] -rotate-[5deg] overflow-hidden rounded-[6px] ring-1 ring-line md:h-[127px] md:w-[96px]">
                <Image
                  src="/home/muskan-portrait-4x5.webp"
                  alt="Muskan Bhatia smiling, in a black and white photo"
                  width={400}
                  height={500}
                  sizes="(min-width: 768px) 96px, 66px"
                  preload
                  className="size-full object-cover object-[50%_30%]"
                />
              </div>
            </div>
            <p className="settle font-accent text-[clamp(1.75rem,1.2rem+1.6vw,2.6rem)] font-medium leading-[1.05] text-ink [animation-delay:120ms]">
              <RollingHello />
              <br />
              I&rsquo;m Muskan Bhatia
            </p>
          </div>

          <h1 className="max-w-[16ch] text-[clamp(2.9rem,0.9rem+7.4vw,9.75rem)] leading-[0.98] text-ink">
            <MaskedText
              text={LEAD}
              delay={220}
              className="font-display font-medium tracking-[-0.045em]"
            />{" "}
            <MaskedText
              text={EMPHASIS}
              delay={220}
              start={3}
              className="font-serif text-[1.06em] font-normal italic tracking-[-0.01em] text-accent"
            />
          </h1>

          <div className="settle flex flex-wrap items-center gap-3 [animation-delay:520ms] md:gap-4">
            <Magnetic>
              <a
                href="#work"
                className="inline-flex min-h-14 items-center gap-3 rounded-full bg-ink px-7 text-[17px] font-medium text-background transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-accent focus-visible:bg-accent"
              >
                See my work <span aria-hidden>↓</span>
              </a>
              </Magnetic>
            <Magnetic>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center gap-3 rounded-full border border-line-strong px-7 text-[17px] font-medium text-ink transition-colors duration-500 hover:border-ink focus-visible:border-ink"
              >
                Resume (PDF) <span aria-hidden>↗</span>
              </a>
              </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex min-h-14 items-center gap-3 rounded-full border border-line-strong px-7 text-[17px] font-medium text-ink transition-colors duration-500 hover:border-ink focus-visible:border-ink"
              >
                Get in touch
              </a>
              </Magnetic>
            <MotionToggle className="sm:ml-auto" />
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
