import Image from "next/image";
import { Nav } from "@/components/nav";
import { PillButton } from "@/components/ui/pill-button";
import { NowCard } from "@/components/home/now-card";

export function Hero() {
  return (
    <section
      id="hero"
      className="flex w-full justify-center px-4 pb-6 pt-5 md:px-[72px] md:pb-8 md:pt-8"
    >
      <div className="relative flex w-full max-w-[1376.8px] flex-col rounded-[24px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] md:min-h-[570px] md:rounded-[33.6px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px] md:rounded-[33.6px]">
          <Image
            src="/home/hero-sky.jpg"
            alt=""
            fill
            priority
            quality={90}
            sizes="(min-width: 1520px) 1377px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(245,245,245,0.4)]" />
        </div>

        <Nav variant="overlay" />

        <div className="relative flex flex-1 items-center justify-center px-6 py-14 md:py-0">
          <div className="flex w-full max-w-[864.8px] flex-col items-center gap-10 text-center">
            <div className="flex flex-col items-center gap-3.5 md:gap-5">
              <p className="font-script text-[13px] leading-[22px] tracking-[0.4px] md:text-[15px] md:leading-6 text-ink-soft">
                Hi there! I&rsquo;m
              </p>
              <h1 className="font-[family-name:var(--font-instrument)] whitespace-nowrap text-[clamp(24px,calc((100vw-80px)/9.4),56px)] italic leading-[1] tracking-[-0.03em] text-[#003399] [-webkit-text-stroke:0.5px_#003399] md:[-webkit-text-stroke:1px_#003399] md:-my-[8.5px] md:text-[60px] md:leading-[60px] md:tracking-[-2px]">
                <span className="block">muskan bhatia.</span>
                <span className="block">i build thoughtful products.</span>
              </h1>
              <p className="-mx-3 text-[clamp(11px,calc((100vw-70px)/21.7),16px)] font-medium leading-[22px] tracking-[0.2px] text-ink-soft md:mx-0 md:leading-6 md:text-[15px]">
                I build mobile + web products used by millions,
                <br className="md:hidden" /> across consumer and B2B SaaS.
              </p>
            </div>
            <div className="flex w-full max-w-[420px] flex-col gap-10">
              <div className="flex w-full flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-center md:gap-4">
                <PillButton href="#work" variant="white" className="w-full md:w-auto">
                  View my work
                </PillButton>
                <PillButton
                  href="https://cal.com/muskandesigns/30min"
                  variant="pink"
                  target="_blank"
                  className="w-full md:w-auto"
                >
                  Book a free discovery call
                </PillButton>
              </div>
              <NowCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
