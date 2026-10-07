import Image from "next/image";
import { OpenToWork } from "@/components/site-header";

const HEADLINE = "Translating human insights to create experiences that scale for impact.";

/** Mint coin-and-chart badge inside the "scale" pill. Decorative only. */
function GrowthIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden focusable="false" className="size-[0.82em] shrink-0">
      <circle cx="16" cy="16" r="16" fill="#bff0dd" />
      <rect x="7.5" y="17" width="3.6" height="7" rx="1" fill="#13a37a" />
      <rect x="13.2" y="13" width="3.6" height="11" rx="1" fill="#13a37a" />
      <rect x="18.9" y="9" width="3.6" height="15" rx="1" fill="#13a37a" />
      <path d="M7 14.5 13.5 9.5l4 2.5L24 6.5" fill="none" stroke="#0b6e52" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24.5" cy="21.5" r="3.6" fill="#ffd166" stroke="#e0a400" strokeWidth="1.2" />
    </svg>
  );
}

// TODO(confirm): Muskan to confirm or change this aside (degree not yet confirmed).
const ASIDE = ["a CS grad", "who designs 🎨"];

export function Hero() {
  return (
    <>
      <section className="w-full px-5 pb-14 pt-12 md:px-10 md:pb-20 md:pt-24 lg:min-h-[calc(100svh-72px)] lg:pt-32">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8 md:gap-12">
          <div className="rise flex items-center gap-5 md:gap-8">
            <Image
              src="/home/about-photo.jpg"
              alt="Portrait of Muskan Bhatia"
              width={140}
              height={170}
              preload
              className="h-[88px] w-[72px] -rotate-[4deg] rounded-[8px] object-cover grayscale md:h-[170px] md:w-[140px]"
            />
            <p className="font-display text-[22px] font-normal leading-[1.15] tracking-[-0.02em] md:text-[40px]">
              Hi there,
              <br />
              I&rsquo;m Muskan Bhatia
            </p>
          </div>

          <div className="relative flex flex-col gap-6 lg:block">
            <h1 className="rise font-display text-[44px] font-normal leading-[0.98] tracking-[-0.055em] [animation-delay:80ms] sm:text-[64px] lg:pr-[220px] lg:text-[clamp(2.75rem,6.4vw,6.6rem)] lg:leading-[0.95]">
              <span className="sr-only">{HEADLINE}</span>
              <span aria-hidden>
                Translating human insights <br className="hidden lg:block" />
                to create experiences <br className="hidden lg:block" />
                that{" "}
                <span className="relative top-[-0.06em] inline-flex items-center gap-[0.14em] whitespace-nowrap rounded-full border-[0.03em] border-[#cdb2ff] bg-[#e9d9ff] py-[0.06em] pl-[0.1em] pr-[0.26em] align-middle text-[0.78em] leading-[1] tracking-[-0.04em] text-[#7c4ddb] transition-transform duration-300 hover:-translate-y-[0.03em] motion-reduce:transition-none">
                  <GrowthIcon />
                  scale
                </span>{" "}
                for impact.
              </span>
            </h1>
            <p className="rise font-display text-[18px] leading-[1.2] tracking-[-0.01em] [animation-delay:160ms] lg:absolute lg:bottom-[0.6em] lg:right-0 lg:text-[22px]">
              {ASIDE[0]}
              <br />
              {ASIDE[1]}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[620px] text-[18px] leading-[1.55] text-muted md:text-[20px]">
            Early in my career, with real products behind me. I&rsquo;ve designed an AI mentor extension at Preplaced
            and worked on a design system and a learning platform at Builder.ai.
          </p>
          <OpenToWork className="inline-flex self-start lg:hidden" />
        </div>
      </section>
    </>
  );
}
