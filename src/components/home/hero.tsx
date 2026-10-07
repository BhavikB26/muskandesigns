import Image from "next/image";
import { OpenToWork } from "@/components/site-header";

const HEADLINE = "Translating human insights to create experiences that scale for impact.";

/** Mint coin-and-chart badge inside the "scale" pill. Decorative only. */
function GrowthIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden focusable="false" className="size-[0.78em] shrink-0">
      <circle cx="16" cy="16" r="16" fill="#bff0dd" />
      <rect x="7.5" y="17" width="3.6" height="7" rx="1" fill="#13a37a" />
      <rect x="13.2" y="13" width="3.6" height="11" rx="1" fill="#13a37a" />
      <rect x="18.9" y="9" width="3.6" height="15" rx="1" fill="#13a37a" />
      <path d="M7 14.5 13.5 9.5l4 2.5L24 6.5" fill="none" stroke="#0b6e52" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24.5" cy="21.5" r="3.6" fill="#ffd166" stroke="#e0a400" strokeWidth="1.2" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="w-full px-5 pb-16 pt-14 md:px-10 md:pb-24 md:pt-28">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8 md:gap-10">
        <div className="rise flex items-center gap-4">
          <Image
            src="/home/about-photo.jpg"
            alt="Portrait of Muskan Bhatia"
            width={72}
            height={72}
            preload
            className="size-14 -rotate-3 rounded-xl object-cover shadow-[0_8px_20px_-8px_rgba(0,0,0,0.35)] md:size-[72px]"
          />
          <p className="font-display text-[19px] leading-[1.25] md:text-[22px]">
            Hi there,
            <br />
            I&rsquo;m Muskan Bhatia.
          </p>
        </div>
        <h1
          className="rise mx-auto max-w-[1180px] text-center font-display text-[40px] font-normal leading-[1.12] tracking-[-1.4px] [animation-delay:80ms] sm:text-[58px] md:text-[80px] md:tracking-[-3px]"
        >
          <span className="sr-only">{HEADLINE}</span>
          <span aria-hidden>
            Translating human insights <br className="hidden md:block" />
            to create experiences <br className="hidden md:block" />
            that{" "}
            <span className="inline-flex translate-y-[0.06em] items-center gap-[0.18em] whitespace-nowrap rounded-full border-[1.5px] border-[#cdb2ff] bg-[#e9d9ff] py-[0.04em] pl-[0.12em] pr-[0.34em] align-baseline text-[0.92em] leading-[1] text-[#7c4ddb] transition-transform duration-300 hover:-translate-y-[0.02em] motion-reduce:transition-none">
              <GrowthIcon />
              scale
            </span>{" "}
            for impact.
          </span>
        </h1>
        <div className="rise flex flex-col gap-6 [animation-delay:160ms] md:flex-row md:items-end md:justify-between">
          <p className="max-w-[560px] text-[18px] leading-[1.55] text-muted">
            Early in my career, with real products behind me. I&rsquo;ve designed an AI mentor extension at Preplaced
            and worked on a design system and a learning platform at Builder.ai.
          </p>
          <OpenToWork className="inline-flex self-start lg:hidden" />
        </div>
      </div>
    </section>
  );
}
