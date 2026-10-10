import Image from "next/image";
import { RollingHello } from "@/components/home/rolling-hello";
import { HeroLens } from "@/components/home/hero-lens";
import { MaskedText } from "@/components/masked-text";

// Headline text stays exactly: "I like orchestrating intentional designs."
const LEAD = "I like orchestrating";
const EMPHASIS = "intentional designs.";

export function Hero() {
  return (
    <section aria-label="Introduction" className="w-full px-page pt-2">
      <div className="sky relative isolate mx-auto flex w-full max-w-[1760px] flex-col items-center gap-fr-xl overflow-hidden rounded-fr-xxl px-fr-lg py-16 text-center sm:px-8 md:gap-fr-xxl md:py-fr-section">
        <HeroLens />
        {/* Soft scrim so the text stays readable over the moving field. */}
        <div aria-hidden className="hero-scrim pointer-events-none absolute inset-0 -z-[5]" />
        <div className="relative flex items-center gap-fr-md md:gap-fr-lg">
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
          <p className="settle t-display-md text-left text-ink [animation-delay:120ms]">
            <RollingHello />
            <br />
            I&rsquo;m Muskan Bhatia
          </p>
        </div>

        <h1 className="t-display-xxl max-w-[14ch] text-ink">
          <MaskedText text={LEAD} delay={220} className="" />{" "}
          <MaskedText
            text={EMPHASIS}
            delay={220}
            start={3}
            className="font-serif text-[1.06em] font-normal italic tracking-[-0.03em]"
          />
        </h1>

        <div className="settle mt-fr-xxs flex flex-wrap items-center justify-center gap-fr-xs [animation-delay:420ms] md:mt-fr-xs">
          <a
            href="#work"
            className="btn btn-primary"
          >
            See my work
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Resume (PDF)<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a
            href="#contact"
            className="btn btn-secondary"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
