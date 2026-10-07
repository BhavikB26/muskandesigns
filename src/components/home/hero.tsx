import Image from "next/image";
import { RollingHello } from "@/components/home/rolling-hello";

/*
 * Hero headline, split into the two lines shown on large screens.
 * Not "I design and develop interfaces, products, and beyond." That line is
 * another designer's (joonassandell.com), so it isn't reused here.
 */
const HEADLINE = "I like orchestrating intentional designs.";

export function Hero() {
  return (
    <section className="flex w-full flex-col justify-center px-page pb-16 pt-10 md:pb-24 md:pt-[96px]">
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
          <p className="font-display text-[32px] font-normal leading-[1.05] md:text-[40px]">
            <RollingHello />
            <br />
            I&rsquo;m Muskan Bhatia
          </p>
        </div>

        <h1 className="rise font-editorial text-[11vw] font-light italic leading-[1.05] tracking-[-0.01em] text-[#111] [animation-delay:80ms] [font-variation-settings:'opsz'_144,'SOFT'_0] md:text-[5.4vw] md:leading-[1.02]">
          {HEADLINE}
        </h1>
      </div>
    </section>
  );
}
