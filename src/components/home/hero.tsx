import Image from "next/image";
import { PillButton } from "@/components/ui/pill-button";
import { NowCard } from "@/components/home/now-card";

export function Hero() {
  return (
    <section className="flex w-full flex-col items-center gap-10 px-6 pb-16 pt-16 md:flex-row md:justify-center md:gap-[72px] md:px-[72px] md:pb-[100px] md:pt-[60px]">
      <div className="flex w-full max-w-[960px] flex-col items-center gap-6 text-center md:items-start md:text-left">
        <p className="font-script text-base tracking-[0.4px] text-muted">
          Hi, I&rsquo;m Muskan 👋
        </p>
        <h1 className="text-[36px] leading-[1.1] tracking-[-0.4px] text-ink md:text-[56px] md:leading-[64.4px]">
          A product designer who <span className="font-bold italic">ships.</span>
        </h1>
        <p className="text-base tracking-[0.2px] text-muted">
          I build mobile + web products used by millions, across consumer
          and B2B SaaS.
        </p>
        <div className="flex w-full flex-col items-stretch gap-3 md:w-auto md:flex-row md:items-center md:justify-start md:gap-4">
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
      <div className="relative size-[220px] shrink-0 overflow-hidden rounded-full md:size-[345px]">
        <Image
          src="/home/hero-illustration.png"
          alt="Illustration of Muskan"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
