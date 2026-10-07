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
      <section className="w-full px-5 pb-14 pt-8 md:px-10 md:pb-24 md:pt-16 lg:pt-20">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8 md:gap-12">
          <div className="rise flex items-center gap-5 md:gap-8">
            {/* TODO(live-photo): swap in a short muted looping clip of Muskan here if she provides one. */}
            <div className="shrink-0 [perspective:700px]">
            <div className="portrait-swivel h-[64px] w-[52px] -rotate-[4deg] overflow-hidden rounded-[9px] md:h-[110px] md:w-[88px]">
              <Image
                src="/home/muskan-portrait-4x5.webp"
                alt="Muskan Bhatia smiling, in a black and white photo"
                width={400}
                height={500}
                sizes="(min-width: 768px) 88px, 52px"
                preload
                className="size-full object-cover object-[50%_30%]"
              />
            </div>
            </div>
            <p className="font-display text-[18px] font-light leading-[1.15] md:text-[32px]">
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
  );
}
