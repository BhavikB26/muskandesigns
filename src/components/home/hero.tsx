import Image from "next/image";
import { RollingHello } from "@/components/home/rolling-hello";
import { NowCard } from "@/components/home/now-card";
import { MaskedText } from "@/components/masked-text";
import { MotionToggle } from "@/components/motion";

// Headline text stays exactly: "I like orchestrating intentional designs."
const LEAD = "I like orchestrating";
const EMPHASIS = "intentional designs.";

export function Hero() {
  return (
    <section aria-label="Introduction" className="w-full px-page pt-2">
      <div className="sky relative mx-auto flex w-full max-w-[1760px] flex-col items-center gap-8 overflow-hidden rounded-[32px] px-5 py-14 text-center ring-1 ring-line sm:px-10 md:gap-10 md:py-24">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="pop-in shrink-0 [perspective:700px]">
            <div className="portrait-swivel h-[87px] w-[66px] -rotate-[5deg] overflow-hidden rounded-[6px] ring-4 ring-white/80 md:h-[118px] md:w-[90px]">
              <Image
                src="/home/muskan-portrait-4x5.webp"
                alt="Muskan Bhatia smiling, in a black and white photo"
                width={400}
                height={500}
                sizes="(min-width: 768px) 90px, 66px"
                preload
                className="size-full object-cover object-[50%_30%]"
              />
            </div>
          </div>
          <p className="settle text-left font-accent text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-medium leading-[1.05] text-ink [animation-delay:120ms]">
            <RollingHello />
            <br />
            I&rsquo;m Muskan Bhatia
          </p>
        </div>

        <h1 className="max-w-[14ch] text-[clamp(2.6rem,1.1rem+5.2vw,6.25rem)] leading-[1] text-ink">
          <MaskedText text={LEAD} delay={220} className="font-display font-medium tracking-[-0.045em]" />{" "}
          <MaskedText
            text={EMPHASIS}
            delay={220}
            start={3}
            className="font-serif text-[1.06em] font-normal italic tracking-[-0.01em] text-accent"
          />
        </h1>

        <p className="settle max-w-[46ch] text-[clamp(1.02rem,0.95rem+0.3vw,1.2rem)] leading-[1.55] text-ink-soft [animation-delay:380ms]">
          Product designer with a computer science background, working across UX, UI and design systems.
        </p>

        <div className="settle flex flex-wrap items-center justify-center gap-3 [animation-delay:500ms]">
          <a
            href="#work"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-[16px] font-medium text-background transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-accent focus-visible:bg-accent"
          >
            See my work <span aria-hidden>↓</span>
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong bg-card/70 px-6 text-[16px] font-medium text-ink backdrop-blur transition-[transform,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-ink focus-visible:border-ink"
          >
            Resume (PDF) <span aria-hidden>↗</span>
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center rounded-full border border-line-strong bg-card/70 px-6 text-[16px] font-medium text-ink backdrop-blur transition-[transform,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-ink focus-visible:border-ink"
          >
            Get in touch
          </a>
        </div>

        <div className="settle w-full max-w-[420px] [animation-delay:620ms]">
          <NowCard />
        </div>

        <MotionToggle className="absolute bottom-4 right-4" />
      </div>
    </section>
  );
}
