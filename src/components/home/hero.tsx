import Image from "next/image";
import { RollingHello } from "@/components/home/rolling-hello";

/*
 * Hero headline, split into the two lines shown on large screens.
 * Not "I design and develop interfaces, products, and beyond." That line is
 * another designer's (joonassandell.com), so it isn't reused here.
 */
const HEADLINE = ["I design products, interfaces,", "and the systems behind them."];

export function Hero() {
  return (
    <>
      <section className="w-full px-5 pb-14 pt-8 md:px-10 md:pb-20 md:pt-16 lg:min-h-[calc(100svh-72px)] lg:pt-20">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8 md:gap-12">
          <div className="rise flex items-center gap-5 md:gap-8">
            {/* TODO(live-photo): swap in a short muted looping clip of Muskan here if she provides one. */}
            <div className="h-[80px] w-[64px] shrink-0 -rotate-[4deg] overflow-hidden rounded-[10px] md:h-[140px] md:w-[112px]">
              <Image
                src="/home/muskan-portrait-4x5.webp"
                alt="Muskan Bhatia smiling, in a black and white photo"
                width={400}
                height={500}
                sizes="(min-width: 768px) 112px, 64px"
                preload
                className="portrait-drift size-full object-cover object-[50%_30%]"
              />
            </div>
            <p className="font-display text-[22px] font-light leading-[1.15] md:text-[40px]">
              <RollingHello />
              <br />
              I&rsquo;m Muskan Bhatia
            </p>
          </div>

          <div>
            <h1 className="rise font-display text-[36px] font-normal leading-[1.15] tracking-[-0.01em] text-[#111] [animation-delay:80ms] sm:text-[48px] lg:text-[clamp(2.25rem,5.2vw,5rem)]">
              {HEADLINE[0]} <br className="hidden lg:block" />
              {HEADLINE[1]}
            </h1>
          </div>
        </div>
      </section>

      <section className="w-full px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[620px] text-[18px] leading-[1.55] text-muted md:text-[20px]">
            Early in my career, with real products behind me. I&rsquo;ve designed an AI mentor extension at Preplaced
            and worked on a design system and a learning platform at Builder.ai.
          </p>
        </div>
      </section>
    </>
  );
}
