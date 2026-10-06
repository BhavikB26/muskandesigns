import Image from "next/image";
import { OpenToWork } from "@/components/site-header";

/*
 * Headline options offered to Muskan (swap HEADLINE to change):
 * A. "Product designer with a computer science brain and a visual designer's eye."
 * B. "Product designer turning messy problems into products people can use."
 * C. "I design products people can figure out, and I know how they get built."
 */
const HEADLINE = "Product designer with a computer science brain and a visual designer’s eye.";

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
          className="rise max-w-[1180px] font-display text-[44px] font-normal leading-[1.02] tracking-[-1.6px] [animation-delay:80ms] sm:text-[60px] md:text-[84px] md:tracking-[-3.4px]"
        >
          {HEADLINE}
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
