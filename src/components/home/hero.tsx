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
    <section className="flex w-full flex-col justify-center px-page pb-16 pt-10 md:min-h-[calc(100svh-108px)] md:pb-0 md:pt-[86px]">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-[19px] md:gap-[22px]">
        <div className="rise flex items-center gap-4 md:gap-8">
          {/* TODO(live-photo): swap in a short muted looping clip of Muskan here if she provides one. */}
          <div className="shrink-0 [perspective:700px]">
            <div className="portrait-swivel h-[87px] w-[66px] -rotate-[5deg] overflow-hidden rounded-[8px] md:h-[127px] md:w-[96px]">
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
          <p className="font-display text-[32px] font-light leading-[1] tracking-[-1.6px] md:text-[40px]">
            <RollingHello />
            <br />
            I&rsquo;m Muskan Bhatia
          </p>
        </div>

        <h1 className="rise font-display text-[15.36vw] font-light leading-[0.95] tracking-[-0.0833em] text-[#111] [animation-delay:80ms] md:text-[8vw] md:leading-[0.9] md:tracking-[-0.0625em]">
          {HEADLINE.join(" ")}
        </h1>
      </div>
    </section>
  );
}
