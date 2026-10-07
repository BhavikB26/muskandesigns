import Image from "next/image";
import { RollingHello } from "@/components/home/rolling-hello";
import { MotionToggle } from "@/components/motion";

const HEADLINE = "I like orchestrating intentional designs.";

export function Hero() {
  return (
    <section className="flex w-full flex-col justify-center px-page pb-16 pt-10 md:pb-24 md:pt-[96px]">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-[19px] md:gap-[22px]">
        <div className="settle flex items-center gap-4 md:gap-8">
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
          <p className="font-accent text-[clamp(1.75rem,1.2rem+1.6vw,2.6rem)] font-medium leading-[1.05]">
            <RollingHello />
            <br />
            I&rsquo;m Muskan Bhatia
          </p>
        </div>

        <h1 className="settle font-editorial text-[clamp(2.4rem,1rem+5.2vw,6.4rem)] font-light italic leading-[1.04] tracking-[-0.01em] text-[#111] [animation-delay:80ms] [font-variation-settings:'opsz'_144]">
          {HEADLINE}
        </h1>

        <div className="settle mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 [animation-delay:160ms] md:mt-8">
          <a
            href="#work"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#111] px-5 text-[15px] font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            See my work <span aria-hidden>↓</span>
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#111]/25 px-5 text-[15px] font-medium transition-colors duration-300 hover:border-[#111]"
          >
            Resume (PDF) <span aria-hidden>↗</span>
          </a>
          <a href="#contact" className="inline-flex min-h-11 items-center text-[15px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111]">
            Get in touch
          </a>
          <MotionToggle className="ml-auto" />
        </div>
      </div>
    </section>
  );
}
